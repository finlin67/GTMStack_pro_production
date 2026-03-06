'use client'

import React, { useState, useMemo, useEffect } from 'react'
import WizardModal, { type WizardStep } from '../WizardModal'
import type { TemplateEntry } from '../TemplatesPanel'
import type { PageRow } from '../PageList'
import { HelpCircle } from 'lucide-react'

const PAGE_TYPES = [
  { value: 'hub', label: 'Top level / Hub', description: 'Main section page (e.g. /expertise, /industries)' },
  { value: 'pillar', label: 'Sub-category / Expertise pillar', description: 'Category page (e.g. /expertise/demand-growth)' },
  { value: 'topic', label: 'Topic / Detail', description: 'Detail page (e.g. /expertise/demand-generation)' },
] as const

const SECTIONS = [
  { id: 'expertise', label: 'Expertise', routePrefix: '/expertise' },
  { id: 'industries', label: 'Industries', routePrefix: '/industries' },
  { id: 'case-studies', label: 'Case Studies', routePrefix: '/case-studies' },
  { id: 'home', label: 'Home', routePrefix: '/' },
  { id: 'gallery', label: 'Gallery', routePrefix: '/gallery' },
] as const

const STEPS: WizardStep[] = [
  { id: 'type', title: 'What kind of page?', description: 'Hub, pillar, or topic' },
  { id: 'section', title: 'Section', description: 'Expertise, Industries, etc.' },
  { id: 'slug', title: 'Slug', description: 'URL-friendly name' },
  { id: 'upload', title: 'Upload design', description: '.tsx or .html file' },
  { id: 'apply', title: 'Apply to pages', description: 'Optional' },
  { id: 'review', title: 'Review & confirm', description: 'Register and run' },
]

function slugToConst(slug: string): string {
  if (!slug) return ''
  return slug.replace(/-/g, '_').toUpperCase() + '_CONTENT'
}

function slugToPascal(slug: string): string {
  return slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

type AddTemplateWizardProps = {
  templates: TemplateEntry[]
  pages: PageRow[]
  slugs: { industries: string[]; expertise: string[]; caseStudies: string[] }
  onClose: () => void
  onSuccess: (message: string) => void
  onTemplatesUpdated: (t: TemplateEntry[]) => void
}

function Help({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-500 mt-0.5" title={children}>
      <HelpCircle size={12} />
      {children}
    </span>
  )
}

export default function AddTemplateWizard({
  templates,
  pages,
  slugs,
  onClose,
  onSuccess,
  onTemplatesUpdated,
}: AddTemplateWizardProps) {
  const [step, setStep] = useState(0)
  const [pageType, setPageType] = useState<'hub' | 'pillar' | 'topic'>('topic')
  const [sectionId, setSectionId] = useState('expertise')
  const [slug, setSlug] = useState('')
  const [slugIsNew, setSlugIsNew] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadContent, setUploadContent] = useState('')
  const [applyToRoutes, setApplyToRoutes] = useState<Set<string>>(new Set())
  const [submitting, setSubmitting] = useState(false)

  const sectionOptions = useMemo(() => {
    if (pageType === 'hub') return SECTIONS.filter((s) => ['expertise', 'industries', 'home', 'gallery'].includes(s.id))
    if (pageType === 'pillar') return SECTIONS.filter((s) => s.id === 'expertise')
    return SECTIONS
  }, [pageType])

  const slugOptions = useMemo(() => {
    if (sectionId === 'industries') return slugs.industries
    if (sectionId === 'expertise') return slugs.expertise
    if (sectionId === 'case-studies') return slugs.caseStudies
    return []
  }, [sectionId, slugs])

  const computedTemplateId = useMemo(() => {
    if (!slug) return ''
    if (pageType === 'hub') return `${sectionId}.main`
    if (pageType === 'pillar') return `expertise.${slug}`
    return sectionId === 'expertise' ? `expertise.${slug}` : sectionId === 'industries' ? 'industry.base' : 'caseStudy.base'
  }, [pageType, sectionId, slug])

  const computedTemplatePath = useMemo(() => {
    if (!slug && pageType !== 'hub') return ''
    if (pageType === 'hub') return `src/templates/${sectionId}/${sectionId === 'home' ? 'Home' : slugToPascal(sectionId)}MainTemplate.tsx`
    if (pageType === 'pillar') return `src/templates/expertise/pillars/${slug}.tsx`
    return `src/templates/${sectionId}/${slugToPascal(slug)}.tsx`
  }, [pageType, sectionId, slug])

  const computedContentPath = useMemo(() => {
    if (pageType === 'hub') return `content/${sectionId}/main.ts`
    if (pageType === 'pillar') return `content/expertise/pillars/${slug}.ts`
    return `content/${sectionId === 'expertise' ? 'expertise' : sectionId}.ts`
  }, [pageType, sectionId, slug])

  const pagesToApply = useMemo(() => {
    const prefix = SECTIONS.find((s) => s.id === sectionId)?.routePrefix ?? ''
    if (prefix === '/') return pages.filter((p) => p.route === '/')
    return pages.filter((p) => (p.route || '').startsWith(prefix))
  }, [pages, sectionId])

  const toggleApply = (route: string) => {
    setApplyToRoutes((prev) => {
      const next = new Set(prev)
      if (next.has(route)) next.delete(route)
      else next.add(route)
      return next
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadFile(file)
    const reader = new FileReader()
    reader.onload = () => setUploadContent(String(reader.result ?? ''))
    reader.readAsText(file)
  }

  const componentName = useMemo(() => {
    if (uploadContent) {
      const m = uploadContent.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/) || uploadContent.match(/export\s+default\s+([A-Za-z0-9_]+)/)
      if (m) return m[1]
    }
    if (slug) return slugToPascal(slug) + (pageType === 'pillar' ? 'Pillar' : 'Template')
    return 'Template'
  }, [uploadContent, slug, pageType])

  const canNext =
    (step === 0 && !!pageType) ||
    (step === 1 && !!sectionId) ||
    (step === 2 && !!slug) ||
    (step === 3 && uploadContent.length > 0) ||
    step === 4 ||
    step === 5

  const handleNext = async () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }
    if (!computedTemplateId || !computedTemplatePath || !uploadContent) return
    if (!window.confirm('Register this template and write the file? This will update the registry and optionally apply to selected pages.')) return
    setSubmitting(true)
    try {
      const importPath = computedTemplatePath.replace(/\.tsx?$/, '').replace(/^src\//, '@/src/')
      const writeRes = await fetch('/api/admin/write-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: computedTemplatePath, content: uploadContent }),
      })
      const writeData = await writeRes.json().catch(() => ({}))
      if (!writeRes.ok) {
        onSuccess(`Write failed: ${writeData.error || 'Unknown'}`)
        setSubmitting(false)
        return
      }
      let postRes = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: computedTemplateId,
          importPath: importPath.startsWith('@/') ? importPath : `@/${importPath}`,
          componentName,
        }),
      })
      let postData = await postRes.json().catch(() => ({}))
      if (!postRes.ok && postData.error?.includes('already exists')) {
        if (!window.confirm(`Template "${computedTemplateId}" already exists. Overwrite with the new file?`)) {
          setSubmitting(false)
          return
        }
        postRes = await fetch('/api/admin/templates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateId: computedTemplateId,
            importPath: importPath.startsWith('@/') ? importPath : `@/${importPath}`,
            componentName,
            overwrite: true,
          }),
        })
        postData = await postRes.json().catch(() => ({}))
      }
      if (!postRes.ok) {
        onSuccess(`Registry update failed: ${postData.error || 'Unknown'}. File was written.`)
        setSubmitting(false)
        return
      }
      const listRes = await fetch('/api/admin/templates')
      const listData = await listRes.json().catch(() => ({}))
      if (listRes.ok && listData.templates) onTemplatesUpdated(listData.templates)
      if (applyToRoutes.size > 0) {
        for (const route of Array.from(applyToRoutes)) {
          const row = pages.find((p) => p.route === route)
          if (!row) continue
          await fetch('/api/admin/page-upsert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              route: row.route,
              templateId: computedTemplateId,
              contentKey: row.contentKey,
              templateFile: computedTemplatePath,
              contentFile: row.fileRef || computedContentPath,
              contentExport: row.contentKey?.includes('pillar') ? slugToConst(slug) : undefined,
              pageTitle: row.pageTitle,
              theme: row.theme,
              heroVisualId: row.heroVisualId,
            }),
          })
        }
      }
      onSuccess(`Template registered: ${computedTemplateId}. ${applyToRoutes.size > 0 ? `Applied to ${applyToRoutes.size} page(s).` : ''}`)
      onClose()
    } catch (err) {
      onSuccess(err instanceof Error ? err.message : 'Request failed')
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (step === 1 && sectionOptions.length > 0 && !sectionOptions.some((s) => s.id === sectionId)) {
      setSectionId(sectionOptions[0].id)
    }
  }, [step, sectionOptions, sectionId])

  return (
    <WizardModal
      title="Add / register a new template"
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
          <p className="text-slate-300 text-sm">Choose the type of page this template is for.</p>
          <label className="block text-sm font-medium text-slate-300">
            What kind of page?
            <Help>Hub = section home; Pillar = expertise category; Topic = detail page.</Help>
          </label>
          <div className="space-y-2">
            {PAGE_TYPES.map((p) => (
              <label key={p.value} className="flex items-start gap-3 p-3 rounded-lg border border-slate-700 hover:bg-white/5 cursor-pointer">
                <input
                  type="radio"
                  name="pageType"
                  value={p.value}
                  checked={pageType === p.value}
                  onChange={() => setPageType(p.value)}
                  className="mt-1 border-slate-600 text-[#36C0CF] focus:ring-[#36C0CF]"
                />
                <div>
                  <span className="text-white font-medium">{p.label}</span>
                  <p className="text-xs text-gray-500">{p.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">Pick the section (main area of the site).</p>
          <label className="block text-sm font-medium text-slate-300">
            Section
            <Help>Expertise, Industries, Case Studies, Home, or Gallery.</Help>
          </label>
          <select
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white focus:ring-2 focus:ring-[#36C0CF] outline-none"
          >
            {sectionOptions.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            Slug is the short name at the end of the URL (e.g. demand-growth, healthcare).
          </p>
          <label className="block text-sm font-medium text-slate-300">
            Slug
            <Help>Short URL-friendly name, e.g. demand-growth. Pick from list or type a new one.</Help>
          </label>
          {!slugIsNew && slugOptions.length > 0 && (
            <select
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white focus:ring-2 focus:ring-[#36C0CF] outline-none mb-2"
            >
              <option value="">— Select or choose &quot;New&quot; below —</option>
              {slugOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. demand-growth"
              className="flex-1 px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
            />
            <label className="flex items-center gap-2 text-slate-300 text-sm whitespace-nowrap">
              <input
                type="checkbox"
                checked={slugIsNew}
                onChange={(e) => setSlugIsNew(e.target.checked)}
                className="rounded border-slate-600 text-[#36C0CF] focus:ring-[#36C0CF]"
              />
              New
            </label>
          </div>
          {slug && (
            <p className="text-xs text-gray-500">
              Template ID will be: <code className="text-[#36C0CF]">{computedTemplateId}</code>
            </p>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">Upload the design file from Stitch, AI Studio, or your editor.</p>
          <label className="block text-sm font-medium text-slate-300">
            Upload design (.tsx or .html)
            <Help>React template file. It will be saved to the path shown below.</Help>
          </label>
          <input
            type="file"
            accept=".tsx,.ts,.html"
            onChange={handleFileChange}
            className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#36C0CF] file:text-white file:font-medium"
          />
          {computedTemplatePath && (
            <p className="text-xs text-gray-500">Will be saved to: <code className="text-[#36C0CF]">{computedTemplatePath}</code></p>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">Optionally apply this new template to existing pages now.</p>
          <label className="block text-sm font-medium text-slate-300">
            Apply to these pages now?
            <Help>Check the pages that should use this template after registration.</Help>
          </label>
          {pagesToApply.length === 0 ? (
            <p className="text-slate-500 text-sm rounded-lg border border-slate-700 p-3">No matching pages yet — add one first, then you can assign this template in Edit Page.</p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto rounded-lg border border-slate-700 p-3">
              {pagesToApply.map((row) => (
                <label key={row.route} className="flex items-center gap-2 cursor-pointer text-slate-200">
                  <input
                    type="checkbox"
                    checked={applyToRoutes.has(row.route || '')}
                    onChange={() => toggleApply(row.route || '')}
                    className="rounded border-slate-600 bg-[#1E2A5E] text-[#36C0CF] focus:ring-[#36C0CF]"
                  />
                  <span className="font-mono text-sm">{row.route}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">Summary. Click &quot;Confirm & run&quot; to register the template and optionally apply to pages.</p>
          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>Type: {pageType}</li>
            <li>Section: {sectionId}</li>
            <li>Slug: {slug || '—'}</li>
            <li>Template ID: <strong className="text-white">{computedTemplateId}</strong></li>
            <li>Template path: <code className="text-[#36C0CF]">{computedTemplatePath}</code></li>
            <li>Content path: <code className="text-[#36C0CF]">{computedContentPath}</code></li>
            <li>Apply to: {applyToRoutes.size} page(s)</li>
          </ul>
        </div>
      )}
    </WizardModal>
  )
}
