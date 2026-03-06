'use client'

import React, { useState, useMemo } from 'react'
import WizardModal, { type WizardStep } from '../WizardModal'
import type { TemplateEntry } from '../TemplatesPanel'
import type { PageRow } from '../PageList'
import { HelpCircle } from 'lucide-react'

const STEPS: WizardStep[] = [
  { id: 'page', title: 'Choose page', description: 'Which page to update content for' },
  { id: 'content', title: 'Content', description: 'Upload file or paste content' },
  { id: 'review', title: 'Review & confirm', description: 'Update content only' },
]

type UpdateContentWizardProps = {
  templates: TemplateEntry[]
  pages: PageRow[]
  onClose: () => void
  onSuccess: (message: string) => void
}

function Help({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-500 mt-0.5" title={children}>
      <HelpCircle size={12} />
      {children}
    </span>
  )
}

export default function UpdateContentWizard({
  templates,
  pages,
  onClose,
  onSuccess,
}: UpdateContentWizardProps) {
  const [step, setStep] = useState(0)
  const [search, setSearch] = useState('')
  const [selectedRoute, setSelectedRoute] = useState('')
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [contentText, setContentText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const filteredPages = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return pages
    return pages.filter((p) => (p.route || '').toLowerCase().includes(q) || (p.pageTitle || '').toLowerCase().includes(q))
  }, [pages, search])

  const selectedPage = useMemo(() => pages.find((p) => p.route === selectedRoute), [pages, selectedRoute])

  const templateFilePath = useMemo(() => {
    if (!selectedPage?.templateId) return ''
    const t = templates.find((x) => x.templateId === selectedPage.templateId)
    if (!t?.importPath) return ''
    const p = (t.importPath || '').replace(/^@\//, '').replace(/\/$/, '')
    return (p.startsWith('src/') ? p : `src/${p}`) + '.tsx'
  }, [selectedPage, templates])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadFile(file)
    const reader = new FileReader()
    reader.onload = () => setContentText(String(reader.result ?? ''))
    reader.readAsText(file)
  }

  const canNext =
    (step === 0 && !!selectedRoute) ||
    (step === 1 && contentText.length > 0) ||
    step === 2

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }
    if (!selectedPage || !contentText) return
    const contentPath = selectedPage.fileRef || ''
    if (!contentPath) {
      onSuccess('Selected page has no content file path.')
      return
    }
    if (!window.confirm('Overwrite the content file and update the registry? Design (template) will not change.')) return
    setSubmitting(true)
    try {
      const writeRes = await fetch('/api/admin/write-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: contentPath, content: contentText }),
      })
      const writeData = await writeRes.json().catch(() => ({}))
      if (!writeRes.ok) {
        onSuccess(`Write failed: ${writeData.error || 'Unknown'}`)
        setSubmitting(false)
        return
      }
      const upsertRes = await fetch('/api/admin/page-upsert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          route: selectedPage.route,
          templateId: selectedPage.templateId,
          contentKey: selectedPage.contentKey,
          templateFile: templateFilePath,
          contentFile: contentPath,
          contentExport: undefined,
          pageTitle: selectedPage.pageTitle,
          theme: selectedPage.theme,
          heroVisualId: selectedPage.heroVisualId,
        }),
      })
      const upsertData = await upsertRes.json().catch(() => ({}))
      if (!upsertRes.ok) {
        onSuccess(`Content written but registry update failed: ${upsertData.error || 'Unknown'}. You may need to run gen:registry.`)
      } else {
        onSuccess('Content updated successfully. Text/sections changed; design unchanged.')
        onClose()
      }
    } catch (err) {
      onSuccess(err instanceof Error ? err.message : 'Request failed')
    } finally {
      setSubmitting(false)
    }
  };

  return (
    <WizardModal
      title="Update content on a page"
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
          <p className="text-slate-300 text-sm">
            Pick the page whose text or sections you want to change. The design (template) will stay the same.
          </p>
          <label className="block text-sm font-medium text-slate-300">
            Which page?
            <Help>Search by URL path or page title.</Help>
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by route or title..."
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none mb-2"
          />
          <select
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white focus:ring-2 focus:ring-[#36C0CF] outline-none"
            size={Math.min(8, Math.max(3, filteredPages.length))}
          >
            <option value="">— Select page —</option>
            {filteredPages.map((p) => (
              <option key={p.route} value={p.route || ''}>
                {p.route} — {p.pageTitle || 'Untitled'}
              </option>
            ))}
          </select>
          {selectedPage && (
            <p className="text-xs text-gray-500">
              Content file: <code className="text-[#36C0CF]">{selectedPage.fileRef}</code>
            </p>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            Upload a new content file (.ts) or paste content below. This updates text and sections only.
          </p>
          <label className="block text-sm font-medium text-slate-300">
            File upload or paste content
            <Help>Content file (e.g. .ts with exported data). Design/template is not changed.</Help>
          </label>
          <input
            type="file"
            accept=".ts,.tsx,.json"
            onChange={handleFileChange}
            className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#36C0CF] file:text-white file:font-medium mb-2"
          />
          <textarea
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            placeholder="Paste content here (e.g. export const ...)"
            rows={12}
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none font-mono text-sm"
          />
          {selectedPage?.fileRef && (
            <p className="text-xs text-gray-500">Will be written to: <code className="text-[#36C0CF]">{selectedPage.fileRef}</code></p>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">Summary. Only the content file will be updated; the template (design) stays the same.</p>
          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>Page: <strong className="text-white">{selectedPage?.route}</strong> — {selectedPage?.pageTitle}</li>
            <li>Content file: <code className="text-[#36C0CF]">{selectedPage?.fileRef}</code></li>
            <li>Content length: {contentText.length} characters</li>
          </ul>
          {selectedPage?.route && selectedPage.route !== '#' && (
            <a
              href={typeof window !== 'undefined' ? `${window.location.origin}${selectedPage.route}` : selectedPage.route}
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
