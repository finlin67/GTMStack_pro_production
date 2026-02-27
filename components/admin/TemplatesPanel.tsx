'use client'

import React, { useEffect, useState } from 'react'
import { Loader2, Plus } from 'lucide-react'

/** Detect pillar-style path (e.g. .../pillars/demand-growth.tsx or .../demand-growth.tsx) and return slug or null */
function detectPillarSlugFromPath(importPath: string): string | null {
  const normalized = importPath.replace(/\\/g, '/').trim().toLowerCase()
  const pillarsMatch = normalized.match(/pillars\/([a-z0-9-]+)(\.tsx?)?$/i)
  if (pillarsMatch) return pillarsMatch[1]
  const slugMatch = normalized.match(/([a-z0-9-]+)\.tsx?$/i)
  if (slugMatch && !slugMatch[1].includes('template') && !slugMatch[1].includes('main')) return slugMatch[1]
  return null
}

export type TemplateEntry = {
  templateId: string
  componentName: string
  importPath?: string
}

type TemplatesPanelProps = {
  onTemplatesUpdated?: (templates: TemplateEntry[]) => void
}

export default function TemplatesPanel({ onTemplatesUpdated }: TemplatesPanelProps) {
  const [templates, setTemplates] = useState<TemplateEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [templateId, setTemplateId] = useState('')
  const [importPath, setImportPath] = useState('')
  const [componentName, setComponentName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [log, setLog] = useState<string | null>(null)

  const pillarSlug = detectPillarSlugFromPath(importPath)
  const pillarSuggestion =
    pillarSlug
      ? { templateId: `expertise.${pillarSlug}`, importPath: `src/templates/expertise/pillars/${pillarSlug}.tsx` }
      : null

  const loadTemplates = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/templates')
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Failed to load templates')
      setTemplates(data.templates || [])
      onTemplatesUpdated?.(data.templates || [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load templates')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadTemplates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLog(null)
    if (!window.confirm('Add template to TEMPLATE_BY_ID and run gen:registry?')) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, importPath, componentName }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to add template')
      }
      setLog(data.log || 'gen:registry completed.')
      setTemplateId('')
      setImportPath('')
      setComponentName('')
      await loadTemplates()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Templates</h2>
        <button
          type="button"
          onClick={loadTemplates}
          className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-white/5 transition-colors"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-slate-400">
          <Loader2 size={18} className="animate-spin" />
          Loading templates…
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-200">
          {error}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 text-left">
                <th className="px-4 py-3 font-semibold">Template ID</th>
                <th className="px-4 py-3 font-semibold">Component</th>
                <th className="px-4 py-3 font-semibold">Import</th>
              </tr>
            </thead>
            <tbody>
              {templates.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-slate-500 text-center">
                    No templates found.
                  </td>
                </tr>
              ) : (
                templates.map((t) => (
                  <tr key={t.templateId} className="border-t border-slate-700/80">
                    <td className="px-4 py-3 font-mono text-slate-200">{t.templateId}</td>
                    <td className="px-4 py-3 text-slate-300">{t.componentName}</td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{t.importPath || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="rounded-xl border border-slate-700 bg-[#1E2A5E]/40 p-6 max-w-2xl">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Plus size={18} className="text-[#36C0CF]" /> Add New Template
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Template ID</label>
            <input
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              placeholder="e.g. industry.healthcare"
              className="w-full px-3 py-2 rounded-lg bg-[#0A0F2D] border border-slate-700 text-white font-mono placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Import path</label>
            <input
              value={importPath}
              onChange={(e) => setImportPath(e.target.value)}
              placeholder="e.g. src/templates/industries/HealthcareTemplate.tsx or .../pillars/demand-growth.tsx"
              className="w-full px-3 py-2 rounded-lg bg-[#0A0F2D] border border-slate-700 text-white font-mono placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
              required
            />
            {pillarSuggestion && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p className="text-xs text-gray-500">
                  Looks like an Expertise pillar. Suggest: templateId <code className="rounded bg-slate-700 px-1">{pillarSuggestion.templateId}</code>, path <code className="rounded bg-slate-700 px-1">{pillarSuggestion.importPath}</code>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setTemplateId(pillarSuggestion.templateId)
                    setImportPath(pillarSuggestion.importPath)
                  }}
                  className="text-xs px-2 py-1 rounded border border-[#36C0CF]/50 text-[#36C0CF] hover:bg-[#36C0CF]/10 transition-colors"
                >
                  Use pillar suggestion
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Component name</label>
            <input
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              placeholder="Default export identifier"
              className="w-full px-3 py-2 rounded-lg bg-[#0A0F2D] border border-slate-700 text-white font-mono placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 rounded-lg bg-[#36C0CF] hover:bg-[#00A8A8] text-white font-semibold disabled:opacity-50 flex items-center gap-2 transition-colors"
          >
            {submitting && <Loader2 size={18} className="animate-spin" />}
            {submitting ? 'Adding…' : 'Add template'}
          </button>
        </form>

        {log && (
          <pre className="mt-4 p-4 rounded-lg bg-[#0A0F2D] border border-slate-700 text-xs text-slate-300 overflow-auto max-h-64 whitespace-pre-wrap">
            {log}
          </pre>
        )}
      </div>
    </div>
  )
}

