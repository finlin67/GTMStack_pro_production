'use client'

import React, { useState, useMemo, useEffect } from 'react'
import WizardModal, { type WizardStep } from '../WizardModal'
import type { TemplateEntry } from '../TemplatesPanel'
import type { PageRow } from '../PageList'
import { HelpCircle } from 'lucide-react'

const STEPS: WizardStep[] = [
  { id: 'template', title: 'Choose template', description: 'Which template to update' },
  { id: 'pages', title: 'Choose pages', description: 'Which pages use this template' },
  { id: 'upload', title: 'Upload new file', description: 'New .tsx or .html design file' },
  { id: 'review', title: 'Review & confirm', description: 'Check and run' },
]

type UpdateTemplateWizardProps = {
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

export default function UpdateTemplateWizard({
  templates,
  pages,
  onClose,
  onSuccess,
}: UpdateTemplateWizardProps) {
  const [step, setStep] = useState(0)
  const [selectedTemplateId, setSelectedTemplateId] = useState('')
  const [selectedRouteIds, setSelectedRouteIds] = useState<Set<string>>(new Set())
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadContent, setUploadContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const selectedTemplate = useMemo(
    () => templates.find((t) => t.templateId === selectedTemplateId),
    [templates, selectedTemplateId]
  )

  const templateFilePath = useMemo(() => {
    if (!selectedTemplate?.importPath) return ''
    const p = selectedTemplate.importPath.replace(/^@\//, '').replace(/\/$/, '')
    return p.startsWith('src/') ? `${p}.tsx` : `src/${p}.tsx`
  }, [selectedTemplate])

  const pagesUsingTemplate = useMemo(
    () => pages.filter((r) => (r.templateId || '') === selectedTemplateId),
    [pages, selectedTemplateId]
  )

  useEffect(() => {
    if (step === 1 && selectedTemplateId && pagesUsingTemplate.length > 0) {
      setSelectedRouteIds(new Set(pagesUsingTemplate.map((p) => p.route || '').filter(Boolean)))
    }
  }, [step, selectedTemplateId, pagesUsingTemplate])

  const togglePage = (route: string) => {
    setSelectedRouteIds((prev) => {
      const next = new Set(prev)
      if (next.has(route)) next.delete(route)
      else next.add(route)
      return next
    })
  }

  const selectAllPages = () => {
    if (selectedRouteIds.size === pagesUsingTemplate.length) {
      setSelectedRouteIds(new Set())
    } else {
      setSelectedRouteIds(new Set(pagesUsingTemplate.map((p) => p.route || '').filter(Boolean)))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadFile(file)
    const reader = new FileReader()
    reader.onload = () => setUploadContent(String(reader.result ?? ''))
    reader.readAsText(file)
  }

  const canNext =
    (step === 0 && !!selectedTemplateId) ||
    step === 1 ||
    (step === 2 && (uploadContent.length > 0 || !!uploadFile)) ||
    step === 3

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }
    if (!selectedTemplateId || !templateFilePath || !uploadContent) return
    if (!window.confirm('Overwrite the template file and refresh the registry? This will update the design for the selected pages.')) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/write-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: templateFilePath, content: uploadContent }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        onSuccess(`Error: ${data.error || data.detail || 'Write failed'}`)
        return
      }
      const regRes = await fetch('/api/admin/run-gen-registry', { method: 'POST' })
      const regData = await regRes.json().catch(() => ({}))
      if (regRes.ok) {
        onSuccess(`Template file updated and registry refreshed. ${selectedRouteIds.size} page(s) use this template.`)
        onClose()
      } else {
        onSuccess(`File written but registry refresh failed: ${regData.error || 'Unknown'}. Check the console.`)
      }
    } catch (err) {
      onSuccess(err instanceof Error ? err.message : 'Request failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <WizardModal
      title="Update an existing template"
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
            Pick the template whose design you want to replace. The list comes from your registry.
          </p>
          <label className="block text-sm font-medium text-slate-300">
            Which template?
            <Help>Template ID from registry (e.g. expertise.topic, industry.base)</Help>
          </label>
          <select
            value={selectedTemplateId}
            onChange={(e) => {
              setSelectedTemplateId(e.target.value)
              setSelectedRouteIds(new Set())
            }}
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white focus:ring-2 focus:ring-[#36C0CF] outline-none"
          >
            <option value="">— Select template —</option>
            {templates.map((t) => (
              <option key={t.templateId} value={t.templateId}>
                {t.templateId}
              </option>
            ))}
          </select>
          {templateFilePath && (
            <p className="text-xs text-gray-500">File path: {templateFilePath}</p>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            These pages currently use the selected template. Check the ones that should get the updated design.
          </p>
          <label className="block text-sm font-medium text-slate-300">
            Which pages should use this updated template?
            <Help>Pages that use this template will show the new design after you upload.</Help>
          </label>
          {pagesUsingTemplate.length === 0 ? (
            <p className="text-slate-500 text-sm rounded-lg border border-slate-700 p-3">No matching pages yet — add one first via &quot;Add page&quot; or assign this template in Edit Page.</p>
          ) : (
            <>
              <button
                type="button"
                onClick={selectAllPages}
                className="text-xs text-[#36C0CF] hover:underline"
              >
                {selectedRouteIds.size === pagesUsingTemplate.length ? 'Deselect all' : 'Select all'}
              </button>
              <div className="space-y-2 max-h-64 overflow-y-auto rounded-lg border border-slate-700 p-3">
                {pagesUsingTemplate.map((row) => (
                  <label key={row.route} className="flex items-center gap-2 cursor-pointer text-slate-200">
                    <input
                      type="checkbox"
                      checked={selectedRouteIds.has(row.route || '')}
                      onChange={() => togglePage(row.route || '')}
                      className="rounded border-slate-600 bg-[#1E2A5E] text-[#36C0CF] focus:ring-[#36C0CF]"
                    />
                    <span className="font-mono text-sm">{row.route}</span>
                    <span className="text-slate-500 text-xs">{row.pageTitle || ''}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            Upload the new design file (.tsx or .html). It will replace the current template file.
          </p>
          <label className="block text-sm font-medium text-slate-300">
            Upload new .tsx or .html
            <Help>Your Stitch or AI Studio export, or any React template file.</Help>
          </label>
          <input
            type="file"
            accept=".tsx,.ts,.html"
            onChange={handleFileChange}
            className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#36C0CF] file:text-white file:font-medium"
          />
          {uploadFile && (
            <p className="text-xs text-gray-500">
              {uploadFile.name} ({uploadContent.length} characters)
            </p>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">Summary. Click &quot;Confirm & run&quot; to write the file and refresh the registry.</p>
          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>Template: <strong className="text-white">{selectedTemplateId}</strong></li>
            <li>File path: <code className="text-[#36C0CF]">{templateFilePath}</code></li>
            <li>Pages affected: {selectedRouteIds.size}</li>
            <li>New file: {uploadFile?.name ?? '—'}</li>
          </ul>
        </div>
      )}
    </WizardModal>
  )
}
