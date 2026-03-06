'use client'

import React, { useState, useMemo } from 'react'
import { ExternalLink, Pencil, Search, ChevronDown, ChevronUp, Trash2, FileText } from 'lucide-react'
import type { TemplateEntry } from './TemplatesPanel'

export type PageRow = Record<string, string>

type SortKey =
  | 'route'
  | 'pageTitle'
  | 'section'
  | 'pageType'
  | 'templateId'
  | 'contentKey'

type SortDir = 'asc' | 'desc'

type PageListProps = {
  rows: PageRow[]
  templates?: TemplateEntry[]
  sectionFilter?: string
  auditStatus?: 'Passed' | 'Failed' | 'Unknown'
  onEdit: (row: PageRow) => void
  onAdd: () => void
  onPreview: (route: string) => void
  onRemove?: (row: PageRow) => void
  onEditTemplate?: (row: PageRow) => void
  onEditContent?: (row: PageRow) => void
}

function getRouteSection(route: string): string {
  const trimmed = (route || '').trim()
  if (!trimmed || trimmed === '/') return 'home'
  const parts = trimmed.split('/').filter(Boolean)
  return parts[0] || 'home'
}

function getPageType(route: string): 'Hub' | 'Category' | 'Topic' {
  const trimmed = (route || '').trim()
  if (!trimmed || trimmed === '/') return 'Hub'
  const parts = trimmed.split('/').filter(Boolean)
  if (parts.length <= 1) return 'Hub'
  if (parts.length === 2) return 'Category'
  return 'Topic'
}

function normalizeSortValue(value: string): string {
  return (value || '').toLowerCase()
}

export default function PageList({
  rows,
  templates = [],
  sectionFilter,
  auditStatus = 'Unknown',
  onEdit,
  onAdd,
  onPreview,
  onRemove,
  onEditTemplate,
  onEditContent,
}: PageListProps) {
  const [search, setSearch] = useState('')
  const [templateFilter, setTemplateFilter] = useState('all')
  const [contentPrefix, setContentPrefix] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('route')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const templatesById = useMemo(() => {
    const map = new Map<string, TemplateEntry>()
    templates.forEach((t) => map.set(t.templateId, t))
    return map
  }, [templates])

  const templateOptions = useMemo(() => {
    const set = new Set<string>()
    rows.forEach((row) => {
      if (row.templateId) set.add(row.templateId)
    })
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [rows])

  const stats = useMemo(() => {
    const total = rows.length
    const withTemplate = rows.filter((r) => (r.templateId || '').trim()).length
    const withContent = rows.filter((r) => (r.contentKey || '').trim()).length
    return { total, withTemplate, withContent }
  }, [rows])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const prefix = contentPrefix.trim().toLowerCase()

    return rows.filter((row) => {
      const route = row.route || ''
      const section = getRouteSection(route)

      if (sectionFilter && sectionFilter !== 'templates' && sectionFilter !== 'blog') {
        if (sectionFilter === 'home' && section !== 'home') return false
        if (sectionFilter !== 'home' && sectionFilter !== section) return false
      }

      if (templateFilter !== 'all' && (row.templateId || '') !== templateFilter) return false

      if (prefix && !(row.contentKey || '').toLowerCase().startsWith(prefix)) return false

      if (!q) return true

      return (
        (route || '').toLowerCase().includes(q) ||
        (row.pageTitle || '').toLowerCase().includes(q) ||
        (row.contentKey || '').toLowerCase().includes(q) ||
        (row.templateId || '').toLowerCase().includes(q) ||
        route.replace(/\//g, ' ').toLowerCase().includes(q)
      )
    })
  }, [rows, search, contentPrefix, templateFilter, sectionFilter])

  const sorted = useMemo(() => {
    const sortedRows = [...filtered]
    const dir = sortDir === 'asc' ? 1 : -1

    sortedRows.sort((a, b) => {
      const routeA = a.route || ''
      const routeB = b.route || ''

      const values: Record<SortKey, [string, string]> = {
        route: [routeA, routeB],
        pageTitle: [a.pageTitle || '', b.pageTitle || ''],
        section: [getRouteSection(routeA), getRouteSection(routeB)],
        pageType: [getPageType(routeA), getPageType(routeB)],
        templateId: [a.templateId || '', b.templateId || ''],
        contentKey: [a.contentKey || '', b.contentKey || ''],
      }

      const [left, right] = values[sortKey]
      return normalizeSortValue(left).localeCompare(normalizeSortValue(right)) * dir
    })

    return sortedRows
  }, [filtered, sortKey, sortDir])

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(key)
    setSortDir('asc')
  }

  const renderSortIcon = (key: SortKey) => {
    if (key !== sortKey) return <ChevronDown size={14} className="text-slate-500" />
    return sortDir === 'asc'
      ? <ChevronUp size={14} className="text-slate-200" />
      : <ChevronDown size={14} className="text-slate-200" />
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Registry pages</h2>
          <p className="text-sm text-slate-400 mt-1">
            Total pages: {stats.total} | With template: {stats.withTemplate} | With content: {stats.withContent} | Audit status: {auditStatus}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onAdd}
            className="px-4 py-2 rounded-lg bg-[#36C0CF] hover:bg-[#00A8A8] text-white font-medium transition-colors whitespace-nowrap"
          >
            Add page
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row xl:items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by URL, title, slug, template..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none text-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={templateFilter}
            onChange={(e) => setTemplateFilter(e.target.value)}
            className="px-3 py-2.5 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white text-sm focus:ring-2 focus:ring-[#36C0CF] outline-none"
          >
            <option value="all">All templates</option>
            {templateOptions.map((id) => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
          <input
            type="text"
            value={contentPrefix}
            onChange={(e) => setContentPrefix(e.target.value)}
            placeholder="Content key prefix"
            className="px-3 py-2.5 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white text-sm placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-[#0B1233] shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-sm">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 text-left">
                <th className="px-4 py-3 font-semibold">
                  <button type="button" onClick={() => handleSort('route')} className="flex items-center gap-2">
                    Route / URL
                    {renderSortIcon('route')}
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <button type="button" onClick={() => handleSort('pageTitle')} className="flex items-center gap-2">
                    Title
                    {renderSortIcon('pageTitle')}
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <button type="button" onClick={() => handleSort('section')} className="flex items-center gap-2">
                    Section
                    {renderSortIcon('section')}
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <button type="button" onClick={() => handleSort('pageType')} className="flex items-center gap-2">
                    Page type
                    {renderSortIcon('pageType')}
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <button type="button" onClick={() => handleSort('templateId')} className="flex items-center gap-2">
                    Template ID
                    {renderSortIcon('templateId')}
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold">Template file</th>
                <th className="px-4 py-3 font-semibold">
                  <button type="button" onClick={() => handleSort('contentKey')} className="flex items-center gap-2">
                    Content key
                    {renderSortIcon('contentKey')}
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold">Content file / export</th>
                <th className="px-4 py-3 w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-slate-500 text-center">
                    {rows.length === 0
                      ? 'No pages in registry.'
                      : 'No matching pages. Try a different filter.'}
                  </td>
                </tr>
              ) : (
                sorted.map((row, i) => {
                  const route = row.route || '—'
                  const section = getRouteSection(row.route || '')
                  const pageType = getPageType(row.route || '')
                  const templateMissing = !(row.templateId || '').trim()
                  const contentMissing = !(row.contentKey || '').trim()
                  const templatePath = row.templateId
                    ? templatesById.get(row.templateId)?.importPath || ''
                    : ''
                  const contentFile = row.fileRef || ''
                  const contentExport = row.contentExport || ''

                  return (
                    <tr
                      key={row.route || i}
                      className={`group border-t border-slate-700/80 transition-colors ${templateMissing ? 'bg-slate-900/40 text-slate-500' : 'hover:bg-white/5'}`}
                    >
                      <td className="px-4 py-3 font-mono text-slate-200">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onPreview(row.route || '#')}
                            className="text-[#36C0CF] hover:underline"
                          >
                            {route}
                          </button>
                          <ExternalLink size={14} className="text-slate-500" />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-200">{row.pageTitle || '—'}</td>
                      <td className="px-4 py-3 text-slate-300">{section}</td>
                      <td className="px-4 py-3 text-slate-300">{pageType}</td>
                      <td className="px-4 py-3 text-slate-300">
                        <div className="flex items-center gap-2">
                          <span>{row.templateId || '—'}</span>
                          {templateMissing && (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-700 text-slate-300">No template assigned</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                        {templatePath ? templatePath.replace(/^@\//, '') : '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        <div className="flex items-center gap-2">
                          <span>{row.contentKey || '—'}</span>
                          {contentMissing && (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-900/30 text-yellow-300">Content missing</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {contentFile || contentExport ? (
                          <div className="space-y-1">
                            {contentFile && <div className="font-mono">{contentFile}</div>}
                            {contentExport && <div className="text-slate-500">export: {contentExport}</div>}
                          </div>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onEdit(row)}
                            className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                            title="Edit page"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => onPreview(row.route || '#')}
                            className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                            title="Preview"
                          >
                            <ExternalLink size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => (onRemove ? onRemove(row) : undefined)}
                            disabled={!onRemove}
                            className="p-2 rounded-md text-slate-500 hover:text-red-300 hover:bg-white/10 transition-colors disabled:opacity-40"
                            title={onRemove ? 'Remove from registry' : 'Remove not available'}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => (onEditTemplate ? onEditTemplate(row) : onEdit(row))}
                            className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                          >
                            Edit template
                          </button>
                          <button
                            type="button"
                            onClick={() => (onEditContent ? onEditContent(row) : onEdit(row))}
                            className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 inline-flex items-center gap-1"
                          >
                            <FileText size={12} />
                            Edit content
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
