'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import WizardModal, { type WizardStep } from '../WizardModal'
import URLValidationInput from '../URLValidationInput'
import type { TemplateEntry } from '../TemplatesPanel'
import type { PageRow } from '../PageList'
import { useLookupPage } from '@/lib/use-lookup-page'
import { normalizeRoute } from '@/lib/route-validation'
import {
  RefreshCw,
  FileText,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Loader2,
} from 'lucide-react'

const CHOICE_OPTIONS = [
  {
    id: 'update-template' as const,
    label: 'Replace / Update the Template',
    description: 'Change the design or layout of the page',
    icon: RefreshCw,
  },
  {
    id: 'update-content' as const,
    label: 'Update the Content only',
    description: 'Change text, sections, or copy — design stays the same',
    icon: FileText,
  },
  {
    id: 'new-template' as const,
    label: 'Register a completely New Template',
    description: 'Add a new design and assign it to this page',
    icon: PlusCircle,
  },
]

type QuickPageUpdateWizardProps = {
  templates: TemplateEntry[]
  pages: PageRow[]
  slugs: { industries: string[]; expertise: string[]; caseStudies: string[] }
  onClose: () => void
  onSuccess: (message: string) => void
  onTemplatesUpdated?: (t: TemplateEntry[]) => void
  /** Optional initial route (e.g. from Sitemap View) to pre-fill the URL step. */
  initialRoute?: string
}

function routeToSectionAndSlug(route: string): { section: string; slug: string } {
  const n = normalizeRoute(route)
  if (!n || n === '/') return { section: 'home', slug: 'main' }
  const parts = n.split('/').filter(Boolean)
  const section = parts[0] || 'expertise'
  const slug = parts[1] || parts[0] || 'main'
  return { section, slug }
}

function slugToConst(slug: string): string {
  if (!slug) return ''
  return slug.replace(/-/g, '_').toUpperCase() + '_CONTENT'
}

function slugToPascal(slug: string): string {
  return slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

function suggestTemplateIdAndContentKey(route: string): { templateId: string; contentKey: string; templatePath: string; contentPath: string } {
  const { section, slug } = routeToSectionAndSlug(route)
  if (section === 'home') {
    return {
      templateId: 'home.main',
      contentKey: 'home:main',
      templatePath: 'src/templates/home/HomeMainTemplate.tsx',
      contentPath: 'content/home/main.ts',
    }
  }
  if (section === 'expertise') {
    if (slug === 'main' || !slug) {
      return {
        templateId: 'expertise.main',
        contentKey: 'expertise:main',
        templatePath: 'src/templates/expertise/ExpertiseMainTemplate.tsx',
        contentPath: 'content/expertise/main.ts',
      }
    }
    return {
      templateId: `expertise.${slug}`,
      contentKey: `expertise:${slug}`,
      templatePath: `src/templates/expertise/${slugToPascal(slug)}.tsx`,
      contentPath: 'content/expertise.ts',
    }
  }
  if (section === 'industries') {
    return {
      templateId: 'industry.base',
      contentKey: `industries:${slug}`,
      templatePath: 'src/templates/industries/IndustryBase.tsx',
      contentPath: 'content/industries.ts',
    }
  }
  if (section === 'case-studies') {
    return {
      templateId: 'caseStudy.base',
      contentKey: `case-studies:${slug}`,
      templatePath: 'src/templates/case-studies/CaseStudyBase.tsx',
      contentPath: 'content/case-studies.ts',
    }
  }
  if (section === 'gallery') {
    return {
      templateId: 'gallery.main',
      contentKey: 'gallery:main',
      templatePath: 'src/templates/gallery/GalleryMainTemplate.tsx',
      contentPath: 'content/gallery/main.ts',
    }
  }
  return {
    templateId: `${section}.base`,
    contentKey: `${section}:${slug}`,
    templatePath: `src/templates/${section}/${slugToPascal(slug)}.tsx`,
    contentPath: `content/${section}.ts`,
  }
}

export default function QuickPageUpdateWizard({
  templates,
  pages,
  slugs,
  onClose,
  onSuccess,
  onTemplatesUpdated,
  initialRoute,
}: QuickPageUpdateWizardProps) {
  // URL lookup with validation
  const lookupPage = useLookupPage({ debounceMs: 300 })

  const [notFoundAddAnyway, setNotFoundAddAnyway] = useState<boolean | null>(null)
  const [choice, setChoice] = useState<'update-template' | 'update-content' | 'new-template' | null>(null)

  const [templateUploadFile, setTemplateUploadFile] = useState<File | null>(null)
  const [templateUploadContent, setTemplateUploadContent] = useState('')
  const [relatedRouteIds, setRelatedRouteIds] = useState<Set<string>>(new Set())

  const [contentUploadFile, setContentUploadFile] = useState<File | null>(null)
  const [contentText, setContentText] = useState('')
  const [contentKeyValues, setContentKeyValues] = useState<Record<string, string>>({})

  const [newTemplateUploadContent, setNewTemplateUploadContent] = useState('')
  const [newTemplateApplyRoutes, setNewTemplateApplyRoutes] = useState<Set<string>>(new Set())

  const [submitting, setSubmitting] = useState(false)
  const [backToUrl, setBackToUrl] = useState(false)
  const [branchSubStep, setBranchSubStep] = useState(0)

  const route = lookupPage.normalizedPath
  const suggested = useMemo(() => suggestTemplateIdAndContentKey(route), [route])

  // Find the page in the registry if it was found
  const effectivePage = useMemo(() => {
    if (!lookupPage.pageFound || !lookupPage.pageData) return null
    // Construct a PageRow-like object from the API response
    return lookupPage.pageData as PageRow
  }, [lookupPage.pageFound, lookupPage.pageData])

  const pageExists = lookupPage.pageFound
  const urlTouched = lookupPage.validationState !== 'empty'

  const selectedTemplate = useMemo(() => {
    if (!effectivePage?.templateId) return null
    return templates.find((t) => t.templateId === effectivePage.templateId)
  }, [templates, effectivePage])

  const templateFilePath = useMemo(() => {
    if (!selectedTemplate?.importPath) return ''
    const p = (selectedTemplate.importPath || '').replace(/^@\//, '').replace(/\/$/, '')
    return (p.startsWith('src/') ? p : `src/${p}`) + '.tsx'
  }, [selectedTemplate])

  const pagesUsingSameTemplate = useMemo(() => {
    if (!effectivePage?.templateId) return []
    return pages.filter((p) => (p.templateId || '') === effectivePage.templateId)
  }, [pages, effectivePage])

  const similarRoutesForNewTemplate = useMemo(() => {
    const { section } = routeToSectionAndSlug(route)
    const prefix = section === 'home' ? '/' : `/${section}`
    return pages.filter((p) => (p.route || '').startsWith(prefix))
  }, [pages, route])

  const componentNameFromUpload = (content: string): string => {
    const m = content.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/) || content.match(/export\s+default\s+([A-Za-z0-9_]+)/)
    if (m) return m[1]
    return suggested.templateId ? slugToPascal(suggested.templateId.split('.').pop() || 'Template') + 'Template' : 'Template'
  }

  // Updated logic for validation state transitions
  const canProceedFromUrl = lookupPage.isValid && (pageExists || notFoundAddAnyway === true)
  const isNewPage = urlTouched && route && lookupPage.validationState === 'not-found' && notFoundAddAnyway === true
  const showNotFoundChoice = urlTouched && route && lookupPage.validationState === 'not-found' && notFoundAddAnyway === null
  
  const stage = (() => {
    if (!canProceedFromUrl) return 'url'
    if (choice === null) return 'choice'
    return choice
  })()

  const branchStep = branchSubStep

  const stepsForStage = useMemo((): WizardStep[] => {
    const urlStep: WizardStep = { id: 'url', title: 'Enter the page URL', description: 'We’ll check if it’s in the registry' }
    const choiceStep: WizardStep = { id: 'choice', title: 'What do you want to change?', description: 'Template, content, or new design' }
    if (stage === 'url') return [urlStep]
    if (stage === 'choice') return [urlStep, choiceStep]
    if (stage === 'update-template') {
      return [
        urlStep,
        choiceStep,
        { id: 'upload', title: 'Upload new template file', description: '.tsx or .html' },
        { id: 'related', title: 'Apply to related pages?', description: 'Optional' },
        { id: 'review', title: 'Review & confirm', description: 'Run update' },
      ]
    }
    if (stage === 'update-content') {
      return [
        urlStep,
        choiceStep,
        { id: 'content', title: 'Content', description: 'Upload or edit' },
        { id: 'review', title: 'Review & confirm', description: 'Update content only' },
      ]
    }
    if (stage === 'new-template') {
      return [
        urlStep,
        choiceStep,
        { id: 'upload', title: 'Upload new template', description: 'We’ll suggest ID and content key' },
        { id: 'apply', title: 'Apply to page(s)', description: 'This page + optional others' },
        { id: 'review', title: 'Review & confirm', description: 'Register and assign' },
      ]
    }
    return [urlStep]
  }, [stage])

  const currentStepIndex = backToUrl ? 0 : stage === 'url' ? 0 : stage === 'choice' ? 1 : 2 + branchStep
  const stepsWhenBackToUrl = useMemo(() => [{ id: 'url', title: 'Enter the page URL', description: 'We’ll check if it’s in the registry' }], [])
  const effectiveSteps = backToUrl ? stepsWhenBackToUrl : stepsForStage
  const clampedStepIndex = Math.min(currentStepIndex, effectiveSteps.length - 1)

  const canGoNext = (() => {
    if (stage === 'url') return canProceedFromUrl
    if (stage === 'choice') return choice !== null
    if (stage === 'update-template') {
      if (branchStep === 0) return templateUploadContent.length > 0
      if (branchStep === 1) return true
      return true
    }
    if (stage === 'update-content') {
      if (branchStep === 0) return contentText.length > 0
      return true
    }
    if (stage === 'new-template') {
      if (branchStep === 0) return newTemplateUploadContent.length > 0
      return true
    }
    return false
  })()

  const handleBack = () => {
    if (backToUrl) return
    if (stage === 'choice') {
      setBackToUrl(true)
      return
    }
    if (stage === 'update-template' || stage === 'update-content' || stage === 'new-template') {
      if (branchSubStep > 0) {
        setBranchSubStep((s) => s - 1)
        return
      }
      setChoice(null)
      setBranchSubStep(0)
    }
  }

  const handleNext = async () => {
    if (backToUrl) {
      setBackToUrl(false)
      return
    }
    if (stage === 'url' && canProceedFromUrl) return
    if (stage === 'choice' && choice) return
    if (stage === 'update-template' && branchStep < 2) {
      setBranchSubStep((s) => s + 1)
      return
    }
    if (stage === 'update-content' && branchStep < 1) {
      setBranchSubStep((s) => s + 1)
      return
    }
    if (stage === 'new-template' && branchStep < 2) {
      setBranchSubStep((s) => s + 1)
      return
    }

    if (stage === 'update-template' && branchStep === 2) {
      if (!effectivePage || !templateUploadContent || !templateFilePath) return
      if (!window.confirm('Overwrite the template file and refresh the registry? This will update the design for the selected pages.')) return
      setSubmitting(true)
      try {
        const writeRes = await fetch('/api/admin/write-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: templateFilePath, content: templateUploadContent }),
        })
        const writeData = await writeRes.json().catch(() => ({}))
        if (!writeRes.ok) {
          onSuccess(`Error: ${writeData.error || writeData.detail || 'Write failed'}`)
          setSubmitting(false)
          return
        }
        const regRes = await fetch('/api/admin/run-gen-registry', { method: 'POST' })
        const regData = await regRes.json().catch(() => ({}))
        if (regRes.ok) {
          onSuccess(`Template updated and registry refreshed. ${relatedRouteIds.size || 1} page(s) use this template.`)
          onClose()
        } else {
          onSuccess(`File written but registry refresh failed: ${regData.error || 'Unknown'}. Check the console.`)
        }
      } catch (err) {
        onSuccess(err instanceof Error ? err.message : 'Request failed')
      } finally {
        setSubmitting(false)
      }
      return
    }

    if (stage === 'update-content' && branchStep === 1) {
      if (!effectivePage || !contentText) {
        onSuccess('Please provide content to update.')
        return
      }
      const contentPath = effectivePage.fileRef || ''
      if (!contentPath) {
        onSuccess('This page has no content file path.')
        return
      }
      if (!window.confirm('Overwrite the content file and update the registry? Design will not change.')) return
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
        const templatePath = selectedTemplate
          ? (() => { const p = (selectedTemplate.importPath || '').replace(/^@\//, '').replace(/\/$/, ''); return (p.startsWith('src/') ? p : `src/${p}`) + '.tsx' })()
          : 'src/templates/FallbackTemplate.tsx'
        const upsertRes = await fetch('/api/admin/page-upsert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            route: effectivePage.route,
            templateId: effectivePage.templateId,
            contentKey: effectivePage.contentKey,
            templateFile: templatePath,
            contentFile: contentPath,
            contentExport: undefined,
            pageTitle: effectivePage.pageTitle,
            theme: effectivePage.theme,
            heroVisualId: effectivePage.heroVisualId,
          }),
        })
        const upsertData = await upsertRes.json().catch(() => ({}))
        if (!upsertRes.ok) {
          onSuccess(`Content written but registry update failed: ${upsertData.error || 'Unknown'}.`)
        } else {
          const auditRes = await fetch('/api/admin/registry-audit', { method: 'POST' })
          const auditData = await auditRes.json().catch(() => ({}))
          onSuccess(auditData.ok ? 'Content updated and audit passed.' : 'Content updated. Audit: ' + (auditData.log || auditData.error || 'run manually'))
          onClose()
        }
      } catch (err) {
        onSuccess(err instanceof Error ? err.message : 'Request failed')
      } finally {
        setSubmitting(false)
      }
      return
    }

    if (stage === 'new-template' && branchStep === 2) {
      const computedTemplateId = suggested.templateId
      const computedTemplatePath = suggested.templatePath
      const importPath = computedTemplatePath.replace(/\.tsx?$/, '').replace(/^src\//, '@/src/')
      const componentName = componentNameFromUpload(newTemplateUploadContent)
      if (!computedTemplateId || !computedTemplatePath || !newTemplateUploadContent) return
      if (!window.confirm('Register this template and write the file? This will update the registry and optionally apply to selected pages.')) return
      setSubmitting(true)
      try {
        const writeRes = await fetch('/api/admin/write-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: computedTemplatePath, content: newTemplateUploadContent }),
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
          if (!window.confirm(`Template "${computedTemplateId}" already exists. Overwrite?`)) {
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
        if (onTemplatesUpdated) {
          const listRes = await fetch('/api/admin/templates')
          const listData = await listRes.json().catch(() => ({}))
          if (listRes.ok && listData.templates) onTemplatesUpdated(listData.templates)
        }
        const routesToApply = new Set(newTemplateApplyRoutes)
        if (pageExists && effectivePage?.route) routesToApply.add(effectivePage.route)
        if (isNewPage && route) routesToApply.add(route)
        const computedContentPath = suggested.contentPath
        const defaultPageTitle = routeToSectionAndSlug(route).slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
        for (const r of Array.from(routesToApply)) {
          const row = pages.find((p) => p.route === r)
          const payload = row
            ? {
                route: row.route,
                templateId: computedTemplateId,
                contentKey: row.contentKey,
                templateFile: computedTemplatePath,
                contentFile: row.fileRef || computedContentPath,
                contentExport: row.contentKey?.includes('pillar') ? slugToConst(routeToSectionAndSlug(row.route || '').slug) : undefined,
                pageTitle: row.pageTitle,
                theme: row.theme,
                heroVisualId: row.heroVisualId,
              }
            : {
                route: r,
                templateId: computedTemplateId,
                contentKey: suggested.contentKey,
                templateFile: computedTemplatePath,
                contentFile: computedContentPath,
                contentExport: undefined,
                pageTitle: defaultPageTitle,
                theme: '',
                heroVisualId: '',
              }
          await fetch('/api/admin/page-upsert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        }
        onSuccess(`Template registered: ${computedTemplateId}. Applied to ${routesToApply.size} page(s).`)
        onClose()
      } catch (err) {
        onSuccess(err instanceof Error ? err.message : 'Request failed')
      } finally {
        setSubmitting(false)
      }
      return
    }
  }

  const handleFileChangeTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setTemplateUploadFile(file)
    const reader = new FileReader()
    reader.onload = () => setTemplateUploadContent(String(reader.result ?? ''))
    reader.readAsText(file)
  }

  const handleFileChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setContentUploadFile(file)
    const reader = new FileReader()
    reader.onload = () => setContentText(String(reader.result ?? ''))
    reader.readAsText(file)
  }

  const handleFileChangeNewTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setNewTemplateUploadContent(String(reader.result ?? ''))
    reader.readAsText(file)
  }

  useEffect(() => {
    if (stage === 'update-template' && pagesUsingSameTemplate.length > 0 && relatedRouteIds.size === 0) {
      setRelatedRouteIds(new Set(pagesUsingSameTemplate.map((p) => p.route || '').filter(Boolean)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, pagesUsingSameTemplate])

  useEffect(() => {
    setBranchSubStep(0)
  }, [choice])

  // If an initialRoute is provided (e.g. from the Sitemap View in admin),
  // pre-fill the URL input and kick off validation for that route.
  useEffect(() => {
    if (initialRoute && !lookupPage.input) {
      lookupPage.setInput(initialRoute)
    }
  }, [initialRoute, lookupPage])

  useEffect(() => {
    if (stage === 'new-template' && route && similarRoutesForNewTemplate.length > 0 && newTemplateApplyRoutes.size === 0) {
      const current = pages.find((p) => normalizeRoute(p.route || '') === route)
      if (current) setNewTemplateApplyRoutes(new Set([current.route || '']))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, route, similarRoutesForNewTemplate, pages])

  return (
    <WizardModal
      title="Quick Page Update"
      steps={effectiveSteps}
      currentStepIndex={clampedStepIndex}
      onClose={onClose}
      onBack={handleBack}
      onNext={handleNext}
      canGoNext={backToUrl ? canProceedFromUrl : canGoNext}
      isSubmitting={submitting}
      nextLabel={clampedStepIndex === effectiveSteps.length - 1 ? 'Confirm & run' : 'Next'}
    >
      {(backToUrl || stage === 'url') && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            Enter the URL path of the page you want to update. We’ll check if it’s already in the registry.
          </p>
          <URLValidationInput
            value={lookupPage.input}
            onChange={(value) => {
              lookupPage.setInput(value)
              setNotFoundAddAnyway(null)
            }}
            onBlur={lookupPage.handleBlur}
            placeholder="/expertise/video-marketing"
            label="Page URL"
            validationState={lookupPage.validationState}
            isValid={lookupPage.isValid}
            error={lookupPage.error}
            suggestion={lookupPage.suggestion}
            disabled={false}
          />
          {urlTouched && route && pageExists && (
            <div className="flex items-start gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
              <CheckCircle size={20} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Great! This page is already in the system.</p>
                <p className="text-sm mt-1 text-slate-300">
                  Route: <code className="text-[#36C0CF]">{effectivePage?.route}</code>
                  {effectivePage?.templateId && <> · Template: <code className="text-[#36C0CF]">{effectivePage.templateId}</code></>}
                  {effectivePage?.contentKey && <> · Content: <code className="text-[#36C0CF]">{effectivePage.contentKey}</code></>}
                </p>
              </div>
            </div>
          )}
          {showNotFoundChoice && (
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
              <div className="flex items-start gap-2">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <p className="font-medium">This page isn’t registry-managed yet. Want to add it?</p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setNotFoundAddAnyway(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#36C0CF] hover:bg-[#00A8A8] text-white font-medium transition-colors"
                >
                  Yes, add it
                </button>
                <button
                  type="button"
                  onClick={() => setNotFoundAddAnyway(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-white/5 transition-colors"
                >
                  No
                </button>
              </div>
              {notFoundAddAnyway === true && (
                <p className="text-sm text-slate-300">New page — we’ll add it to the registry when you register a new template.</p>
              )}
            </div>
          )}
        </div>
      )}

      {stage === 'choice' && (
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            {isNewPage
              ? 'This page will be added to the registry. Register a new template and we’ll assign it to this URL.'
              : 'Choose what you want to do for this page.'}
          </p>
          <div className="grid gap-3">
            {(isNewPage ? CHOICE_OPTIONS.filter((o) => o.id === 'new-template') : CHOICE_OPTIONS).map((opt) => {
              const Icon = opt.icon
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setChoice(opt.id)}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    choice === opt.id
                      ? 'border-[#36C0CF] bg-[#36C0CF]/10 text-white'
                      : 'border-slate-700 bg-[#1E2A5E]/50 text-slate-200 hover:border-slate-600 hover:bg-white/5'
                  }`}
                >
                  <Icon size={24} className="shrink-0 text-[#36C0CF]" />
                  <div>
                    <p className="font-semibold">{opt.label}</p>
                    <p className="text-sm text-slate-400 mt-0.5">{opt.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {stage === 'update-template' && (
        <>
          {branchStep === 0 && (
            <div className="space-y-4">
              {effectivePage?.templateId && (
                <p className="text-slate-300 text-sm">
                  Current template: <strong className="text-white">{effectivePage.templateId}</strong>
                  {templateFilePath && <> · File: <code className="text-[#36C0CF] text-xs">{templateFilePath}</code></>}
                </p>
              )}
              <label className="block text-sm font-medium text-slate-300">Upload new .tsx or .html</label>
              <input
                type="file"
                accept=".tsx,.ts,.html"
                onChange={handleFileChangeTemplate}
                className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#36C0CF] file:text-white file:font-medium"
              />
              {templateUploadFile && (
                <p className="text-xs text-slate-500">{templateUploadFile.name} ({templateUploadContent.length} characters)</p>
              )}
            </div>
          )}
          {branchStep === 1 && (
            <div className="space-y-4">
              <p className="text-slate-300 text-sm">Apply to these related pages too? (They use the same template.)</p>
              {pagesUsingSameTemplate.length === 0 ? (
                <p className="text-slate-500 text-sm rounded-lg border border-slate-700 p-3">No other pages use this template.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto rounded-lg border border-slate-700 p-3">
                  {pagesUsingSameTemplate.map((row) => (
                    <label key={row.route} className="flex items-center gap-2 cursor-pointer text-slate-200">
                      <input
                        type="checkbox"
                        checked={relatedRouteIds.has(row.route || '')}
                        onChange={() => {
                          setRelatedRouteIds((prev) => {
                            const next = new Set(prev)
                            if (next.has(row.route || '')) next.delete(row.route || '')
                            else next.add(row.route || '')
                            return next
                          })
                        }}
                        className="rounded border-slate-600 bg-[#1E2A5E] text-[#36C0CF] focus:ring-[#36C0CF]"
                      />
                      <span className="font-mono text-sm">{row.route}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
          {branchStep === 2 && (
            <div className="space-y-4">
              <p className="text-slate-300 text-sm">Review. Click &quot;Confirm & run&quot; to write the file and refresh the registry.</p>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                <li>Page: <strong className="text-white">{effectivePage?.route}</strong></li>
                <li>Template: <strong className="text-white">{effectivePage?.templateId}</strong></li>
                <li>File: <code className="text-[#36C0CF]">{templateFilePath}</code></li>
                <li>Pages affected: {Math.max(1, relatedRouteIds.size)}</li>
              </ul>
              {effectivePage?.route && (
                <a
                  href={typeof window !== 'undefined' ? `${window.location.origin}${effectivePage.route}` : effectivePage.route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#36C0CF] hover:underline"
                >
                  <ExternalLink size={16} />
                  Preview page
                </a>
              )}
            </div>
          )}
        </>
      )}

      {stage === 'update-content' && (
        <>
          {branchStep === 0 && (
            <div className="space-y-4">
              {effectivePage && (
                <p className="text-slate-300 text-sm">
                  Current content key: <code className="text-[#36C0CF]">{effectivePage.contentKey}</code>
                  {effectivePage.fileRef && <> · File: <code className="text-[#36C0CF] text-xs">{effectivePage.fileRef}</code></>}
                </p>
              )}
              <label className="block text-sm font-medium text-slate-300">Upload .ts/.json or paste content</label>
              <input
                type="file"
                accept=".ts,.tsx,.json"
                onChange={handleFileChangeContent}
                className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#36C0CF] file:text-white file:font-medium mb-2"
              />
              <textarea
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                placeholder="Paste content here (e.g. export const ...)"
                rows={10}
                className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none font-mono text-sm"
              />
            </div>
          )}
          {branchStep === 1 && (
            <div className="space-y-4">
              <p className="text-slate-300 text-sm">Review. Only the content file will be updated; the template stays the same.</p>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                <li>Page: <strong className="text-white">{effectivePage?.route}</strong></li>
                <li>Content file: <code className="text-[#36C0CF]">{effectivePage?.fileRef}</code></li>
                <li>Content length: {contentText.length} characters</li>
              </ul>
              {effectivePage?.route && (
                <a
                  href={typeof window !== 'undefined' ? `${window.location.origin}${effectivePage.route}` : effectivePage.route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#36C0CF] hover:underline"
                >
                  <ExternalLink size={16} />
                  Preview page
                </a>
              )}
            </div>
          )}
        </>
      )}

      {stage === 'new-template' && (
        <>
          {branchStep === 0 && (
            <div className="space-y-4">
              <p className="text-slate-300 text-sm">
                We’ll suggest a Template ID and Content Key from the URL. Upload your .tsx or .html design file.
              </p>
              <p className="text-sm text-slate-400">
                Suggested: <strong className="text-white">{suggested.templateId}</strong> · Content: <code className="text-[#36C0CF]">{suggested.contentKey}</code>
              </p>
              <input
                type="file"
                accept=".tsx,.ts,.html"
                onChange={handleFileChangeNewTemplate}
                className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#36C0CF] file:text-white file:font-medium"
              />
              {newTemplateUploadContent && (
                <p className="text-xs text-slate-500">Will be saved to: <code className="text-[#36C0CF]">{suggested.templatePath}</code></p>
              )}
            </div>
          )}
          {branchStep === 1 && (
            <div className="space-y-4">
              <p className="text-slate-300 text-sm">Apply to this page? (pre-checked) You can also apply to other similar pages.</p>
              {similarRoutesForNewTemplate.length === 0 ? (
                <p className="text-slate-500 text-sm rounded-lg border border-slate-700 p-3">No similar pages in registry. We’ll add this page when you confirm.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto rounded-lg border border-slate-700 p-3">
                  {similarRoutesForNewTemplate.map((row) => (
                    <label key={row.route} className="flex items-center gap-2 cursor-pointer text-slate-200">
                      <input
                        type="checkbox"
                        checked={newTemplateApplyRoutes.has(row.route || '')}
                        onChange={() => {
                          setNewTemplateApplyRoutes((prev) => {
                            const next = new Set(prev)
                            if (next.has(row.route || '')) next.delete(row.route || '')
                            else next.add(row.route || '')
                            return next
                          })
                        }}
                        className="rounded border-slate-600 bg-[#1E2A5E] text-[#36C0CF] focus:ring-[#36C0CF]"
                      />
                      <span className="font-mono text-sm">{row.route}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
          {branchStep === 2 && (
            <div className="space-y-4">
              <p className="text-slate-300 text-sm">Review. We’ll register the template and assign it to the selected page(s).</p>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                <li>Template ID: <strong className="text-white">{suggested.templateId}</strong></li>
                <li>Content key: <code className="text-[#36C0CF]">{suggested.contentKey}</code></li>
                <li>Template path: <code className="text-[#36C0CF] text-xs">{suggested.templatePath}</code></li>
                <li>Apply to: {newTemplateApplyRoutes.size + (isNewPage ? 1 : 0)} page(s)</li>
              </ul>
              {route && (
                <a
                  href={typeof window !== 'undefined' ? `${window.location.origin}${route}` : route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#36C0CF] hover:underline"
                >
                  <ExternalLink size={16} />
                  Preview page
                </a>
              )}
            </div>
          )}
        </>
      )}
    </WizardModal>
  )
}
