'use client'

import React, { useState, useMemo, useEffect } from 'react'
import AdminGate from '@/components/admin/AdminGate'

interface PageInfo {
  route: string
  pageTitle: string
  templateId: string
  contentKey: string
  fileRef: string
  status: string
  inRegistry: boolean
  inSitemap: boolean
  inFs: boolean
}

const TEMPLATE_OPTIONS = [
  { value: 'expertise.category', label: 'Expertise Pillar (Category)' },
  { value: 'expertise.topic', label: 'Expertise Topic' },
  { value: 'expertise.main', label: 'Expertise Main Index' },
  { value: 'industry.base', label: 'Industry Detail' },
  { value: 'industries.main', label: 'Industries Main Index' },
  { value: 'caseStudy.base', label: 'Case Study' },
  { value: 'projects.main', label: 'Projects Index' },
  { value: 'gallery.main', label: 'Gallery Index' },
  { value: 'home.main', label: 'Standard Page (Home/About/Contact)' },
  { value: 'home.base', label: 'Legacy Home' },
]

const STATUS_LABELS: Record<string, string> = {
  'IN_REGISTRY': 'Registered',
  'IN_SITEMAP_MISSING_REGISTRY': 'In Sitemap, Missing Registry',
  'IN_REGISTRY_MISSING_SITEMAP': 'In Registry, Missing Sitemap',
  'BROKEN_MAPPING': 'Broken Mapping',
  'IN_FS_ONLY': 'Filesystem Only'
}

const STATUS_COLORS: Record<string, string> = {
  'IN_REGISTRY': 'bg-green-500/20 text-green-400 border-green-500/30',
  'IN_SITEMAP_MISSING_REGISTRY': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'IN_REGISTRY_MISSING_SITEMAP': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'BROKEN_MAPPING': 'bg-red-500/20 text-red-400 border-red-500/30',
  'IN_FS_ONLY': 'bg-slate-500/20 text-slate-400 border-slate-500/30'
}

export default function AdminPage() {
  const [pages, setPages] = useState<PageInfo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  
  const [editingPage, setEditingPage] = useState<PageInfo | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadTemplateId, setUploadTemplateId] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/pages')
      const data = await res.json()
      if (res.ok) {
        setPages(data.pages || [])
      }
    } catch (err) {
      console.error('Failed to fetch pages:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const categories = useMemo(() => {
    const cats = new Set(pages.map(p => {
      if (p.route.startsWith('/expertise')) return 'Expertise'
      if (p.route.startsWith('/industries')) return 'Industries'
      if (p.route.startsWith('/case-studies')) return 'Case Studies'
      if (p.route.startsWith('/services')) return 'Services'
      if (p.route.startsWith('/p/')) return 'Custom'
      return 'Main'
    }))
    return ['All', ...Array.from(cats)].sort()
  }, [pages])

  const filteredPages = useMemo(() => {
    return pages.filter(p => {
      const matchesSearch = p.route.toLowerCase().includes(search.toLowerCase()) || 
                            p.pageTitle.toLowerCase().includes(search.toLowerCase())
      
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter
      
      let cat = 'Main'
      if (p.route.startsWith('/expertise')) cat = 'Expertise'
      else if (p.route.startsWith('/industries')) cat = 'Industries'
      else if (p.route.startsWith('/case-studies')) cat = 'Case Studies'
      else if (p.route.startsWith('/services')) cat = 'Services'
      else if (p.route.startsWith('/p/')) cat = 'Custom'
      
      const matchesCategory = categoryFilter === 'All' || cat === categoryFilter
      
      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [pages, search, statusFilter, categoryFilter])

  const handleEdit = (page: PageInfo) => {
    setEditingPage({ ...page })
    setUploadFile(null)
    setUploadTemplateId('')
    setUploadError(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadFile(file)
      // Auto-fill templateId from filename without extension
      const id = file.name.replace('.tsx', '').replace(/[^a-zA-Z0-9_-]/g, '')
      setUploadTemplateId(id)
    }
  }

  const handleUpload = async () => {
    if (!editingPage || !uploadFile || !uploadTemplateId) return
    setIsUploading(true)
    setUploadError(null)

    const formData = new FormData()
    formData.append('route', editingPage.route)
    formData.append('templateId', uploadTemplateId)
    formData.append('file', uploadFile)

    try {
      const res = await fetch('/api/admin/templates/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (res.ok) {
        setEditingPage({ ...editingPage, templateId: uploadTemplateId })
        setSuccessMessage('Template uploaded and mapped successfully.')
        setUploadFile(null)
        setUploadTemplateId('')
        fetchData()
        setTimeout(() => setSuccessMessage(null), 3000)
      } else {
        setUploadError(data.error || 'Upload failed')
      }
    } catch (err) {
      console.error('Upload error:', err)
      setUploadError('Failed to upload template')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSave = async () => {
    if (!editingPage) return
    setIsSaving(true)
    
    const formData = new FormData()
    formData.append('route', editingPage.route)
    formData.append('templateId', editingPage.templateId)
    formData.append('contentKey', editingPage.contentKey)
    formData.append('pageTitle', editingPage.pageTitle)
    formData.append('fileRef', editingPage.fileRef)

    try {
      const res = await fetch('/api/admin/manager', {
        method: 'POST',
        body: formData
      })
      if (res.ok) {
        setSuccessMessage('Successfully updated registry.')
        setEditingPage(null)
        fetchData()
        setTimeout(() => setSuccessMessage(null), 3000)
      } else {
        const data = await res.json()
        alert(`Error: ${data.error || 'Failed to save'}`)
      }
    } catch (err) {
      console.error('Save error:', err)
      alert('Failed to save')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminGate>
      <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">Page Index CMS</h1>
            <p className="text-slate-400 mt-2">Unified list of pages across registry, sitemap, and filesystem.</p>
          </div>
          <button 
            onClick={fetchData}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            Refresh
          </button>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg animate-in fade-in slide-in-from-top-2">
            {successMessage}
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <input 
              type="text"
              placeholder="Search by URL or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 focus:outline-none"
          >
            {categories.map(c => <option key={c} value={c}>{c} Category</option>)}
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            {Object.entries(STATUS_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Page Title & URL</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300">Mapping (Template / Content)</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">Loading pages...</td>
                </tr>
              ) : filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">No pages found.</td>
                </tr>
              ) : (
                filteredPages.map((page) => (
                  <tr key={page.route} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-100">{page.pageTitle || 'Untitled'}</div>
                      <div className="text-xs text-slate-500 mt-1 font-mono">{page.route}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${STATUS_COLORS[page.status] || STATUS_COLORS['IN_FS_ONLY']}`}>
                        {STATUS_LABELS[page.status] || page.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {page.inRegistry ? (
                        <div className="space-y-1">
                          <div className="text-xs text-slate-300">
                            <span className="text-slate-500">T:</span> {page.templateId}
                          </div>
                          <div className="text-xs text-slate-300">
                            <span className="text-slate-500">C:</span> {page.contentKey}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-600 italic">Not registered</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleEdit(page)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          page.inRegistry 
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                            : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20'
                        }`}
                      >
                        {page.inRegistry ? 'Edit Mapping' : 'Add to Registry'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-xs text-slate-600 flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-500"></div> Filesystem
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div> Registry
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Sitemap
          </div>
        </div>
      </div>

      {/* Edit Modal Overlay */}
      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-100 truncate pr-4">
                {editingPage.inRegistry ? `Edit: ${editingPage.pageTitle || editingPage.route}` : 'Add to Registry'}
              </h3>
              <button 
                onClick={() => setEditingPage(null)}
                className="text-slate-500 hover:text-slate-300 flex-shrink-0"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Page Title</label>
                  <input 
                    type="text"
                    value={editingPage.pageTitle}
                    onChange={(e) => setEditingPage({ ...editingPage, pageTitle: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-100"
                    placeholder="Enter page title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Route</label>
                  <div className="px-3 py-2 bg-slate-800/50 border border-slate-800 rounded-lg text-slate-500 text-sm font-mono truncate">
                    {editingPage.route}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Template (Page Layout)</label>
                <div className="space-y-2">
                  {TEMPLATE_OPTIONS.map((opt) => (
                    <label 
                      key={opt.value}
                      className={`flex items-center px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                        editingPage.templateId === opt.value 
                          ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-100' 
                          : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 text-slate-400'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="templateId"
                        value={opt.value}
                        checked={editingPage.templateId === opt.value}
                        onChange={(e) => setEditingPage({ ...editingPage, templateId: e.target.value })}
                        className="hidden"
                      />
                      <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center flex-shrink-0 ${
                        editingPage.templateId === opt.value ? 'border-cyan-400' : 'border-slate-600'
                      }`}>
                        {editingPage.templateId === opt.value && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{opt.label}</span>
                        <span className="text-[10px] opacity-50 font-mono">{opt.value}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Upload New Template Zone */}
                <div className="mt-6 p-4 border border-dashed border-slate-700 rounded-xl bg-slate-800/20">
                  <h4 className="text-sm font-bold text-slate-300 mb-4">Or Upload Custom Template (.tsx)</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Select .tsx File</label>
                      <input 
                        type="file" 
                        accept=".tsx"
                        onChange={handleFileChange}
                        className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20"
                      />
                    </div>
                    
                    {uploadFile && (
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Template ID</label>
                        <input 
                          type="text"
                          value={uploadTemplateId}
                          onChange={(e) => setUploadTemplateId(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                          placeholder="e.g. custom-promo-v1"
                        />
                      </div>
                    )}

                    {uploadError && (
                      <div className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 p-2 rounded">
                        {uploadError}
                      </div>
                    )}

                    <button
                      onClick={handleUpload}
                      disabled={!uploadFile || !uploadTemplateId || isUploading}
                      className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      {isUploading ? 'Uploading...' : 'Upload & Map Template'}
                    </button>
                    
                    <p className="text-[10px] text-slate-500 italic">
                      Note: After upload, restart dev server to load new template.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 pt-2">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Content Key</label>
                    <span className="text-[10px] text-cyan-500/70 font-mono">Required</span>
                  </div>
                  <input 
                    type="text"
                    placeholder="e.g. industries:healthcare"
                    value={editingPage.contentKey}
                    onChange={(e) => setEditingPage({ ...editingPage, contentKey: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-100"
                  />
                  <p className="text-[11px] text-slate-400 mt-2 bg-slate-950/30 p-2 rounded border border-slate-800/50">
                    <strong className="text-slate-300">Purpose:</strong> Connects this page to a specific data object in the content registry.
                    <br />
                    <span className="text-slate-500 italic mt-1 block">
                      {editingPage.templateId.startsWith('expertise') ? 'Tip: Use "expertise:slug" for topics or "pillar:slug" for categories.' : 
                       editingPage.templateId.startsWith('industry') ? 'Tip: Use "industries:slug".' :
                       'Tip: Format is usually "prefix:slug".'}
                    </span>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Content File (Ref)</label>
                  <input 
                    type="text"
                    value={editingPage.fileRef}
                    onChange={(e) => setEditingPage({ ...editingPage, fileRef: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-slate-100 font-mono"
                    placeholder="e.g. content/expertise.ts"
                  />
                  <p className="text-[10px] text-slate-500 mt-1 italic">The source file containing the page data.</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-800 flex justify-end gap-3">
              <button 
                onClick={() => setEditingPage(null)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving || !editingPage.templateId || !editingPage.contentKey}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-cyan-900/20"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminGate>
  )
}