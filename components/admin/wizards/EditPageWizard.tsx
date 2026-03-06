'use client'

import React, { useState, useMemo } from 'react'
import WizardModal, { type WizardStep } from '../WizardModal'
import type { TemplateEntry } from '../TemplatesPanel'
import type { PageRow } from '../PageList'
import { HelpCircle, Unlink, Upload } from 'lucide-react'

const STEPS: WizardStep[] = [
  { id: 'details', title: 'Page details', description: 'Route and title' },
  { id: 'template', title: 'Change template?', description: 'Assign, detach, or upload new' },
  { id: 'content', title: 'Update content?', description: 'Upload or edit content file' },
  { id: 'review', title: 'Review & confirm', description: 'Run upsert and audit' },
]

const DETACH_ID = 'base.fallback'

type EditPageWizardProps = {
  page: PageRow
  templates: TemplateEntry[]
  onClose: () => void
  onSuccess: (message: string) => void
  onUploadNewTemplate?: () => void
}

function Help({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-500 mt-0.5" title={children}>
      <HelpCircle size={12} />
      {children}
    </span>
  )
}

function templateToFilePath(t: TemplateEntry | undefined): string {
  if (!t?.importPath) return ''
  const p = (t.importPath || '').replace(/^@\//, '').replace(/\/$/, '')
  return (p.startsWith('src/') ? p : `src/${p}`) + '.tsx'
}

export default function EditPageWizard({
  page,
  templates,
  onClose,
  onSuccess,
  onUploadNewTemplate,
}: EditPageWizardProps) {
  const [step, setStep] = useState(0)
  const [pageTitle, setPageTitle] = useState(page.pageTitle || '')
  const [templateId, setTemplateId] = useState(page.templateId || DETACH_ID)
  const [contentText, setContentText] = useState('')
  const [contentTouched, setContentTouched] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const selectedTemplate = useMemo(() => templates.find((t) => t.templateId === templateId), [templates, templateId])
  const templateFilePath = useMemo(() => templateToFilePath(selectedTemplate), [selectedTemplate])
  const effectiveTemplateFile = templateId === DETACH_ID ? 'src/templates/FallbackTemplate.tsx' : templateFilePath
  const contentPath = page.fileRef || ''
  const contentKey = page.contentKey || ''

  const handleContentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadFile(file)
    setContentTouched(true)
    const reader = new FileReader()
    reader.onload = () => setContentText(String(reader.result ?? ''))
    reader.readAsText(file)
  }

  const canNext =
    step === 0 ||
    (step === 1 && !!templateId) ||
    step === 2 ||
    step === 3

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }
    if (!window.confirm('Apply changes and run upsert? This will update the registry and CSV.')) return
    setSubmitting(true)
    try {
      if (contentTouched && contentText && contentPath) {
        const writeRes = await fetch('/api/admin/write-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: contentPath, content: contentText }),
        })
        const writeData = await writeRes.json().catch(() => ({}))
        if (!writeRes.ok) {
          onSuccess(`Content write failed: ${writeData.error || 'Unknown'}. No changes applied.`)
          setSubmitting(false)
          return
        }
      }
      const upsertRes = await fetch('/api/admin/page-upsert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          route: page.route,
          templateId: templateId === DETACH_ID ? 'base.fallback' : templateId,
          contentKey,
          templateFile: effectiveTemplateFile,
          contentFile: contentPath,
          contentExport: undefined,
          pageTitle: pageTitle || page.pageTitle,
          theme: page.theme,
          heroVisualId: page.heroVisualId,
        }),
      })
      const upsertData = await upsertRes.json().catch(() => ({}))
      if (!upsertRes.ok) {
        const msg = upsertData.error || upsertData.detail || 'Upsert failed'
        onSuccess(msg.includes('not in the registry')
          ? `Template is not in the registry. Add it under Templates first, or choose another.`
          : msg)
        setSubmitting(false)
        return
      }
      const auditRes = await fetch('/api/admin/registry-audit', { method: 'POST' })
      const auditData = await auditRes.json().catch(() => ({}))
      onSuccess(auditData.ok ? 'Page updated and audit passed.' : 'Page updated. Audit: ' + (auditData.log || auditData.error || 'run manually'))
      onClose()
    } catch (err) {
      onSuccess(err instanceof Error ? err.message : 'Request failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <WizardModal
      title="Edit page"
      steps={STEPS}
      currentStepIndex={step}
      onClose={onClose}
      onBack={() => setStep((s) => Math.max(0, s - 1))}
      onNext={handleNext}
      canGoNext={canNext}
      isSubmitting={submitting}
    >
      {step === 0 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">Update page title. Route is fixed for this page.</p>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Route (read-only)</label>
            <input
              type="text"
              value={page.route || ''}
              readOnly
              className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 font-mono cursor-not-allowed"
            />
            <Help>URL path for this page. Change route by adding a new page instead.</Help>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Page title</label>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="Display title"
              className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
            />
            <Help>Shown in nav, breadcrumbs, and meta.</Help>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">Assign a template, detach to use the fallback layout, or upload a new template file.</p>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Template</label>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white focus:ring-2 focus:ring-[#36C0CF] outline-none"
            >
              <option value={DETACH_ID}>— Detached (base fallback) —</option>
              {templates.filter((t) => t.templateId !== DETACH_ID).map((t) => (
                <option key={t.templateId} value={t.templateId}>{t.templateId}</option>
              ))}
            </select>
            <Help>Design/layout for this page. Detach to remove a custom template.</Help>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTemplateId(DETACH_ID)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-white/5"
            >
              <Unlink size={16} />
              Detach template
            </button>
            {onUploadNewTemplate && (
              <button
                type="button"
                onClick={onUploadNewTemplate}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#36C0CF]/50 text-[#36C0CF] hover:bg-[#36C0CF]/10"
              >
                <Upload size={16} />
                Upload new template
              </button>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">Optionally update the content file (text/sections). Leave empty to keep current content.</p>
          <label className="block text-sm font-medium text-slate-300">
            Content file: <code className="text-[#36C0CF]">{contentPath || '—'}</code>
          </label>
          <input
            type="file"
            accept=".ts,.tsx,.json"
            onChange={handleContentFileChange}
            className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#36C0CF] file:text-white file:font-medium"
          />
          <textarea
            value={contentText}
            onChange={(e) => { setContentText(e.target.value); setContentTouched(true) }}
            placeholder="Paste or edit content here (optional). Upload a file to load it."
            rows={10}
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none font-mono text-sm"
          />
          <p className="text-xs text-gray-500">Leave empty to keep existing content. Export name is auto-detected from the file.</p>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">Summary. Click Confirm to run upsert, gen:registry, and audit.</p>
          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>Route: <strong className="text-white">{page.route}</strong></li>
            <li>Title: {pageTitle || page.pageTitle || '—'}</li>
            <li>Template: <strong className="text-white">{templateId === DETACH_ID ? 'Detached (base.fallback)' : templateId}</strong></li>
            <li>Content: {contentTouched && contentText ? 'Will update file' : 'No change'}</li>
          </ul>
          {page.route && page.route !== '#' && (
            <a
              href={typeof window !== 'undefined' ? `${window.location.origin}${page.route}` : page.route}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#36C0CF] hover:underline"
            >
              Preview page →
            </a>
          )}
        </div>
      )}
    </WizardModal>
  )
}
