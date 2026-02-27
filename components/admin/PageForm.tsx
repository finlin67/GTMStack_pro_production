'use client'

import React, { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import type { PageRow } from './PageList'
import type { TemplateEntry } from './TemplatesPanel'

const SECTIONS = [
  { id: 'expertise', label: 'Expertise', routePrefix: '/expertise' },
  { id: 'industries', label: 'Industries', routePrefix: '/industries' },
  { id: 'case-studies', label: 'Case Studies', routePrefix: '/case-studies' },
  { id: 'home', label: 'Home', routePrefix: '/' },
  { id: 'gallery', label: 'Gallery', routePrefix: '/gallery' },
] as const

const PAGE_TYPES = [
  { value: 'Hub', label: 'Hub' },
  { value: 'Category', label: 'Category' },
  { value: 'Topic', label: 'Topic' },
] as const

const CONTENT_FILE_SUGGESTIONS = [
  'content/home.ts',
  'content/expertise.ts',
  'content/expertise/main.ts',
  'content/industries.ts',
  'content/industries/main.ts',
  'content/case-studies.ts',
  'content/gallery/main.ts',
]

const TEMPLATE_FILE_SUGGESTIONS: Record<string, string> = {
  'expertise.main': 'src/templates/expertise/ExpertiseMainTemplate.tsx',
  'expertise.category': 'src/templates/expertise/ExpertiseCategoryTemplate.tsx',
  'expertise.topic': 'src/templates/expertise/ExpertiseTopicTemplate.tsx',
  'industries.main': 'src/templates/industries/IndustriesMainTemplate.tsx',
  'industry.base': 'src/templates/industries/IndustryTemplate.tsx',
  'caseStudy.base': 'src/templates/caseStudies/CaseStudyTemplate.tsx',
  'home.main': 'src/templates/home/HomeTemplate.tsx',
  'gallery.main': 'src/templates/gallery/GalleryMainTemplate.client.tsx',
}

/** Slug to content export name, e.g. demand-growth → DEMAND_GROWTH_CONTENT */
function slugToContentExport(slug: string): string {
  if (!slug) return ''
  return slug.replace(/-/g, '_').toUpperCase() + '_CONTENT'
}

function inferTemplateFileFromImport(importPath?: string): string {
  if (!importPath) return ''
  if (importPath.startsWith('@/')) return importPath.slice(2) + '.tsx'
  if (importPath.startsWith('src/')) return importPath + '.tsx'
  if (importPath.startsWith('/')) return importPath.slice(1) + '.tsx'
  return importPath + '.tsx'
}

/** Generate suggested Template ID based on Section, Page Type, and Slug */
function generateSuggestedTemplateId(
  section: string,
  pageType: 'Hub' | 'Category' | 'Topic',
  slug: string
): string {
  const isPillar = section === 'expertise' && pageType === 'Category'

  // If no slug or slug is "(main)", default to section.main
  if (!slug || slug === '(main)') {
    return `${section}.main`
  }

  // Hub pages: section.main
  if (pageType === 'Hub') {
    return `${section}.main`
  }

  // Expertise Pillar: section.slugpillar (e.g. expertise.demand-growthpillar)
  if (isPillar) {
    return `${section}.${slug}pillar`
  }

  // Gallery Topic: gallery.slug
  if (section === 'gallery') {
    return `gallery.${slug}`
  }

  // Default Topic: section.slug (e.g. industries.healthcare)
  return `${section}.${slug}`
}

type PageFormProps = {
  initial?: PageRow | null
  slugs: { industries: string[]; expertise: string[]; caseStudies: string[] }
  templates: TemplateEntry[]
  onSuccess: (log: string) => void
  onCancel: () => void
}

export default function PageForm({ initial, slugs, templates, onSuccess, onCancel }: PageFormProps) {
  const [section, setSection] = useState(initial?.route?.startsWith('/expertise') ? 'expertise' : initial?.route?.startsWith('/industries') ? 'industries' : initial?.route?.startsWith('/case-studies') ? 'case-studies' : initial?.route === '/' ? 'home' : 'gallery')
  const [pageType, setPageType] = useState<'Hub' | 'Category' | 'Topic'>(
    initial?.contentKey?.startsWith('pillar:') ? 'Category' : 'Topic'
  )
  const [slug, setSlug] = useState(initial?.route?.split('/').filter(Boolean).pop() || '')
  const [route, setRoute] = useState(initial?.route || '')
  const [theme, setTheme] = useState(initial?.theme || 'dark')
  const [heroVisualId, setHeroVisualId] = useState(initial?.heroVisualId || '')
  const [pageTitle, setPageTitle] = useState(initial?.pageTitle || '')
  const [templateId, setTemplateId] = useState(initial?.templateId || templates[0]?.templateId || 'expertise.topic')
  const [templateIdTouched, setTemplateIdTouched] = useState(false)
  const [suggestedTemplateId, setSuggestedTemplateId] = useState('')
  const [templateIdWarning, setTemplateIdWarning] = useState('')
  const [templateFile, setTemplateFile] = useState(initial?.templateId ? (TEMPLATE_FILE_SUGGESTIONS[initial.templateId] || '') : '')
  const [templateFileTouched, setTemplateFileTouched] = useState(false)
  const [contentFileTouched, setContentFileTouched] = useState(false)
  const [contentExportTouched, setContentExportTouched] = useState(false)
  const [contentKey, setContentKey] = useState(initial?.contentKey || '')
  const [contentFile, setContentFile] = useState(initial?.fileRef || '')
  const [contentExport, setContentExport] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const isPillarMode = section === 'expertise' && pageType === 'Category'

  // Auto-suggest Template ID based on Section, Page Type, and Slug
  useEffect(() => {
    const suggested = generateSuggestedTemplateId(section, pageType, slug)
    setSuggestedTemplateId(suggested)

    // Auto-fill the Template ID if user hasn't manually edited it
    if (!templateIdTouched) {
      setTemplateId(suggested)
      setTemplateIdWarning('')
    }
  }, [section, pageType, slug, templateIdTouched])

  useEffect(() => {
    if (templateFileTouched) return
    const fromSuggestions = TEMPLATE_FILE_SUGGESTIONS[templateId] || ''
    if (fromSuggestions) {
      setTemplateFile(fromSuggestions)
      return
    }
    // Don't overwrite pillar-suggested path when templateId is expertise.[slug] and not yet in registry
    if (isPillarMode && slug && templateId === `expertise.${slug}`) return
    const found = templates.find((t) => t.templateId === templateId)
    const inferred = inferTemplateFileFromImport(found?.importPath)
    if (inferred) setTemplateFile(inferred)
  }, [templateId, templates, templateFileTouched, isPillarMode, slug])

  useEffect(() => {
    const prefix = SECTIONS.find((s) => s.id === section)?.routePrefix ?? ''
    if (prefix === '/') {
      setRoute('/')
      setSlug('')
    } else if (slug) {
      setRoute(prefix + '/' + slug)
    } else {
      setRoute(prefix)
    }
  }, [section, slug])

  useEffect(() => {
    if (section === 'industries' && slug) setContentKey(`industries:${slug}`)
    else if (section === 'case-studies' && slug) setContentKey(`case-studies:${slug}`)
    else if (section === 'expertise') {
      if (isPillarMode && slug) setContentKey(`pillar:${slug}`)
      else if (slug) setContentKey(`expertise:${slug}`)
    } else if (section === 'gallery') setContentKey('gallery:main')
    else if (section === 'home') setContentKey('home:main')
  }, [section, slug, isPillarMode])

  // Expertise Category (pillar): suggest templateId, template file, content file, content export
  useEffect(() => {
    if (!isPillarMode || !slug) return
    setTemplateId(`expertise.${slug}`)
    setTemplateFile(`src/templates/expertise/pillars/${slug}.tsx`)
    setContentFile(`content/expertise/pillars/${slug}.ts`)
    setContentExport(slugToContentExport(slug))
    setTemplateFileTouched(false)
    setContentFileTouched(false)
    setContentExportTouched(false)
  }, [isPillarMode, slug])

  const slugOptions = section === 'industries' ? slugs.industries : section === 'expertise' ? slugs.expertise : section === 'case-studies' ? slugs.caseStudies : []

  // When pillar mode, show expertise.[slug] first and group expertise.* at top of Template ID dropdown
  const templateIdOptions = (() => {
    const list = [...templates]
    if (!list.some((t) => t.templateId === templateId)) list.push({ templateId, componentName: '', importPath: undefined })
    if (!isPillarMode || !slug) return list
    const pillarId = `expertise.${slug}`
    const expertiseEntries = list.filter((t) => t.templateId.startsWith('expertise.'))
    const rest = list.filter((t) => !t.templateId.startsWith('expertise.'))
    const sorted = [...expertiseEntries.sort((a, b) => (a.templateId === pillarId ? -1 : b.templateId === pillarId ? 1 : a.templateId.localeCompare(b.templateId))), ...rest]
    return sorted
  })()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!window.confirm('Run page:upsert and regenerate registry? This will modify CSV and registry files.')) return
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/page-upsert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          route,
          templateId,
          contentKey,
          templateFile: templateFile || undefined,
          contentFile: contentFile || undefined,
          contentExport: contentExport || undefined,
          pageTitle,
          theme,
          heroVisualId,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || data.detail || 'Request failed')
        return
      }
      onSuccess(data.log || 'Page upserted successfully.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-bold text-white">{initial ? 'Edit page' : 'Add page'}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Section</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value as typeof section)}
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white focus:ring-2 focus:ring-[#36C0CF] outline-none"
          >
            {SECTIONS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Main category of the page (Expertise, Industries, etc.)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Page type</label>
          <select
            value={pageType}
            onChange={(e) => setPageType(e.target.value as typeof pageType)}
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white focus:ring-2 focus:ring-[#36C0CF] outline-none"
          >
            {PAGE_TYPES.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Hub, Category, or Topic—used for grouping only.</p>
        </div>
      </div>

      {isPillarMode && (
        <p className="text-xs text-gray-500 rounded-lg bg-slate-800/60 border border-slate-700/80 px-3 py-2">
          Note: Expertise Categories use &apos;pillar:&apos; prefix and pillars/[slug] folders for template and content paths.
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          list="slug-list"
          placeholder="e.g. demand-generation"
          className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
        />
        <p className="text-xs text-gray-500 mt-1">Short URL-friendly name, e.g. healthcare, demand-growth. Pick from suggestions or type a new one.</p>
        {slugOptions.length > 0 && (
          <datalist id="slug-list">
            {slugOptions.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Route</label>
        <input
          type="text"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white font-mono focus:ring-2 focus:ring-[#36C0CF] outline-none"
        />
        <p className="text-xs text-gray-500 mt-1">Full URL path (e.g. /expertise/demand-growth). Auto-filled from Section + Slug; edit if needed.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white focus:ring-2 focus:ring-[#36C0CF] outline-none"
          >
            <option value="">—</option>
            <option value="dark">dark</option>
            <option value="light">light</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Page color scheme (dark or light).</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Hero visual ID</label>
          <input
            type="text"
            value={heroVisualId}
            onChange={(e) => setHeroVisualId(e.target.value)}
            placeholder="Optional"
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Optional animation or hero component ID for the page header.</p>
        </div>
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
        <p className="text-xs text-gray-500 mt-1">Display name shown in nav, breadcrumbs, and meta.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Template ID</label>
          <input
            type="text"
            value={templateId}
            onChange={(e) => {
              setTemplateIdTouched(true)
              setTemplateId(e.target.value)
              setTemplateIdWarning('')
            }}
            onBlur={() => {
              // Validate on blur: warn if Template ID doesn't start with section + dot
              if (templateId && section && !templateId.startsWith(section + '.')) {
                setTemplateIdWarning(
                  `Template ID usually starts with your section (e.g. ${section}.). Recommended: ${suggestedTemplateId}`
                )
              }
            }}
            placeholder={suggestedTemplateId}
            list="template-id-suggestions"
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
          />
          <datalist id="template-id-suggestions">
            {templateIdOptions.map((t) => (
              <option key={t.templateId} value={t.templateId} />
            ))}
          </datalist>
          <p className="text-xs text-gray-400 mt-2">
            Auto-suggested format: section.slug (or section.main for main pages). Examples:<br />
            • <span className="text-gray-300">expertise.demand-growthpillar</span> (Expertise pillar)<br />
            • <span className="text-gray-300">industries.healthcare</span> (Industry topic)<br />
            • <span className="text-gray-300">expertise.main</span> (Expertise hub)<br />
            • <span className="text-gray-300">home.main</span> (Home page)<br />
            Keep it unique and lowercase with hyphens.
          </p>
          {templateIdWarning && (
            <p className="text-xs text-yellow-400 mt-2 p-2 bg-yellow-400/10 rounded border border-yellow-400/30">
              ⚠️ {templateIdWarning}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Template file</label>
          <input
            type="text"
            value={templateFile}
            onChange={(e) => {
              setTemplateFileTouched(true)
              setTemplateFile(e.target.value)
            }}
            placeholder="src/templates/..."
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white font-mono placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Path to the template component (e.g. src/templates/industries/IndustryTemplate.tsx).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Content key</label>
          <input
            type="text"
            value={contentKey}
            onChange={(e) => setContentKey(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white font-mono focus:ring-2 focus:ring-[#36C0CF] outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Key used to look up content in the content registry (e.g. expertise:demand-generation, industries:healthcare).</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Content file</label>
          <input
            type="text"
            value={contentFile}
            onChange={(e) => {
              setContentFileTouched(true)
              setContentFile(e.target.value)
            }}
            list="content-files"
            placeholder="content/expertise.ts"
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white font-mono focus:ring-2 focus:ring-[#36C0CF] outline-none"
          />
          <datalist id="content-files">
            {CONTENT_FILE_SUGGESTIONS.map((f) => (
              <option key={f} value={f} />
            ))}
            {isPillarMode && slug && (
              <option value={`content/expertise/pillars/${slug}.ts`} />
            )}
          </datalist>
          <p className="text-xs text-gray-500 mt-1">Path to the content module that exports this page&apos;s data (e.g. content/industries.ts).</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Content export (optional)</label>
        <input
          type="text"
            value={contentExport}
            onChange={(e) => {
              setContentExportTouched(true)
              setContentExport(e.target.value)
            }}
            placeholder="e.g. DEMAND_GENERATION_EXPERTISE"
          className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
        />
        <p className="text-xs text-gray-500 mt-1">Named export from the content file if the module has multiple exports; leave blank to auto-detect.</p>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 rounded-lg bg-[#36C0CF] hover:bg-[#00A8A8] text-white font-semibold disabled:opacity-50 flex items-center gap-2 transition-colors"
        >
          {submitting && <Loader2 size={18} className="animate-spin" />}
          {submitting ? 'Running page:upsert…' : 'Submit'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
