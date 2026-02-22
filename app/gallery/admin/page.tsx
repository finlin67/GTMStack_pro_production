/**
 * LOCAL-ONLY Animation Gallery Admin — /gallery/admin
 *
 * Edit flow:
 *   1. Select an animation and edit its metadata / upload a thumbnail.
 *   2. Click "Save Metadata" — writes to src/data/animationMeta.overrides.json.
 *   3. Click "Run gen:animations" (or run `npm run gen:animations` in terminal)
 *      to regenerate src/data/animationCatalog.generated.ts.
 *   4. Reload /gallery to see the updated catalog.
 *
 * Shortcut: `npm run gen:all` runs gen:registry + gen:animations in one step.
 */
'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import {
  Save,
  Upload,
  RefreshCw,
  ChevronDown,
  CheckCircle,
  XCircle,
  Loader2,
  ImageIcon,
  Terminal,
} from 'lucide-react'

interface AnimationMeta {
  id: string
  title: string
  description: string
  keywords: string[]
  repoUrl: string
  thumbnailSrc: string
  usedOnPages: boolean
}

type ToastType = 'success' | 'error'

interface Toast {
  id: number
  message: string
  type: ToastType
}

let toastCounter = 0

function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = ++toastCounter
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  return { toasts, addToast }
}

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-medium pointer-events-auto transition-all duration-300 ${
            t.type === 'success'
              ? 'bg-emerald-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {t.type === 'success' ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 shrink-0" />
          )}
          {t.message}
        </div>
      ))}
    </div>
  )
}

export default function AnimationAdminPage() {
  const [animations, setAnimations] = useState<AnimationMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string>('')
  const [form, setForm] = useState<Omit<AnimationMeta, 'id' | 'usedOnPages'>>({
    title: '',
    description: '',
    keywords: [],
    repoUrl: '',
    thumbnailSrc: '',
  })
  const [keywordsRaw, setKeywordsRaw] = useState('')
  const [saving, setSaving] = useState(false)
  const [thumbFile, setThumbFile] = useState<File | null>(null)
  const [thumbPreview, setThumbPreview] = useState<string | null>(null)
  const [uploadingThumb, setUploadingThumb] = useState(false)
  const [genRunning, setGenRunning] = useState(false)
  const [genOutput, setGenOutput] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toasts, addToast } = useToasts()

  const fetchAnimations = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/animations/meta')
      if (!res.ok) {
        if (res.status === 404) {
          addToast('Admin API not available — are you running in dev mode on localhost?', 'error')
        } else {
          addToast(`Failed to load animations: ${res.status}`, 'error')
        }
        return
      }
      const data = await res.json() as { animations: AnimationMeta[] }
      setAnimations(data.animations)
      if (data.animations.length > 0 && !selectedId) {
        const first = data.animations[0]
        setSelectedId(first.id)
        populateForm(first)
      }
    } catch (e) {
      addToast('Network error loading animations', 'error')
    } finally {
      setLoading(false)
    }
  }, [selectedId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    void fetchAnimations()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function populateForm(anim: AnimationMeta) {
    setForm({
      title: anim.title,
      description: anim.description,
      keywords: anim.keywords,
      repoUrl: anim.repoUrl,
      thumbnailSrc: anim.thumbnailSrc,
    })
    setKeywordsRaw(anim.keywords.join(', '))
    setThumbFile(null)
    setThumbPreview(null)
  }

  function handleSelectAnimation(id: string) {
    setSelectedId(id)
    const anim = animations.find((a) => a.id === id)
    if (anim) populateForm(anim)
    setGenOutput(null)
  }

  function handleFormChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleKeywordsChange(raw: string) {
    setKeywordsRaw(raw)
    const parsed = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    setForm((prev) => ({ ...prev, keywords: parsed }))
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setThumbFile(file)
    if (file) {
      const url = URL.createObjectURL(file)
      setThumbPreview(url)
    } else {
      setThumbPreview(null)
    }
  }

  async function handleSaveMeta() {
    if (!selectedId) return
    setSaving(true)
    try {
      const res = await fetch('/api/animations/meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedId,
          title: form.title,
          description: form.description,
          keywords: form.keywords,
          repoUrl: form.repoUrl,
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        addToast(`Save failed: ${err.error ?? res.statusText}`, 'error')
        return
      }
      addToast('Metadata saved successfully', 'success')
      // Refresh list to reflect updated title
      const updated = animations.map((a) =>
        a.id === selectedId
          ? { ...a, title: form.title, description: form.description, keywords: form.keywords, repoUrl: form.repoUrl }
          : a
      )
      setAnimations(updated)
    } catch {
      addToast('Network error saving metadata', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleUploadThumbnail() {
    if (!selectedId || !thumbFile) return
    setUploadingThumb(true)
    try {
      const fd = new FormData()
      fd.append('id', selectedId)
      fd.append('file', thumbFile)
      const res = await fetch('/api/animations/thumbnail', {
        method: 'POST',
        body: fd,
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }))
        addToast(`Upload failed: ${err.error ?? res.statusText}`, 'error')
        return
      }
      const data = await res.json() as { thumbnailSrc: string }
      addToast('Thumbnail uploaded successfully', 'success')
      setForm((prev) => ({ ...prev, thumbnailSrc: data.thumbnailSrc }))
      setAnimations((prev) =>
        prev.map((a) => (a.id === selectedId ? { ...a, thumbnailSrc: data.thumbnailSrc } : a))
      )
      setThumbFile(null)
      setThumbPreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch {
      addToast('Network error uploading thumbnail', 'error')
    } finally {
      setUploadingThumb(false)
    }
  }

  async function handleRunGenerator() {
    setGenRunning(true)
    setGenOutput(null)
    try {
      const res = await fetch('/api/animations/gen', { method: 'POST' })
      const data = await res.json() as { ok: boolean; output?: string; error?: string; stderr?: string }
      if (data.ok) {
        addToast('Generator ran successfully', 'success')
        setGenOutput(data.output ?? '(no output)')
        await fetchAnimations()
      } else {
        addToast(`Generator failed: ${data.error ?? 'unknown error'}`, 'error')
        setGenOutput([data.error, data.stderr].filter(Boolean).join('\n'))
      }
    } catch {
      addToast('Network error running generator', 'error')
    } finally {
      setGenRunning(false)
    }
  }

  const selectedAnim = animations.find((a) => a.id === selectedId)
  const displayThumb = thumbPreview ?? (form.thumbnailSrc || null)

  return (
    <div className="min-h-screen bg-[#0b1224] text-white">
      <ToastContainer toasts={toasts} />

      {/* Header */}
      <div className="border-b border-white/10 bg-slate-900/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white">Animation Gallery Admin</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Local-only · edits{' '}
              <code className="text-brand-300 bg-white/5 px-1 rounded">
                src/data/animationMeta.overrides.ts
              </code>
            </p>
          </div>
          <button
            onClick={handleRunGenerator}
            disabled={genRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors border border-white/10"
          >
            {genRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Run gen:animations
          </button>
        </div>
      </div>

      {/* Generator output */}
      {genOutput && (
        <div className="max-w-7xl mx-auto px-6 pt-4">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-800/60 border border-white/10 text-xs font-mono text-slate-300">
            <Terminal className="w-4 h-4 shrink-0 mt-0.5 text-slate-500" />
            <pre className="whitespace-pre-wrap break-all">{genOutput}</pre>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left: animation selector */}
        <aside className="lg:w-72 shrink-0">
          <div className="sticky top-24">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Select Animation ({animations.length})
            </label>
            {loading ? (
              <div className="flex items-center gap-2 text-slate-500 text-sm py-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading…
              </div>
            ) : (
              <div className="relative">
                <select
                  value={selectedId}
                  onChange={(e) => handleSelectAnimation(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 pr-8 rounded-lg bg-slate-800 border border-white/10 text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  size={1}
                >
                  {animations.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.title} ({a.id})
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            )}

            {/* Thumbnail preview in sidebar */}
            {selectedAnim && (
              <div className="mt-4 rounded-lg overflow-hidden border border-white/10 bg-slate-800/50 aspect-video relative">
                {displayThumb ? (
                  <Image
                    src={displayThumb}
                    alt={form.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-slate-600" />
                  </div>
                )}
                {thumbPreview && (
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-amber-500/90 text-[10px] font-bold text-white uppercase">
                    Preview
                  </div>
                )}
              </div>
            )}

            {selectedAnim && (
              <div className="mt-3 space-y-1 text-xs text-slate-500">
                <div>
                  <span className="text-slate-400">ID:</span>{' '}
                  <code className="text-slate-300">{selectedAnim.id}</code>
                </div>
                {selectedAnim.usedOnPages && (
                  <div className="text-emerald-400">✓ Used on pages</div>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Right: edit form */}
        <main className="flex-1 min-w-0">
          {!selectedId && !loading && (
            <div className="text-slate-500 text-sm py-8 text-center">
              Select an animation to edit.
            </div>
          )}

          {selectedId && (
            <div className="space-y-6">
              {/* Metadata card */}
              <section className="rounded-xl border border-white/10 bg-slate-800/40 p-6">
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5">
                  Metadata
                </h2>
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Title
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-white/10 text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder-slate-500"
                      placeholder="Animation title"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Description
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-white/10 text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder-slate-500 resize-y"
                      placeholder="Short description of what this animation visualizes"
                    />
                  </div>

                  {/* Tags / Keywords */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Tags / Keywords{' '}
                      <span className="text-slate-600">(comma-separated)</span>
                    </label>
                    <input
                      type="text"
                      value={keywordsRaw}
                      onChange={(e) => handleKeywordsChange(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-white/10 text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder-slate-500"
                      placeholder="e.g. abm, pipeline, dashboard"
                    />
                    {form.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {form.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 text-xs"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* GitHub repoUrl */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      GitHub Repo URL
                    </label>
                    <input
                      type="url"
                      value={form.repoUrl}
                      onChange={(e) => handleFormChange('repoUrl', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-slate-900/60 border border-white/10 text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder-slate-500"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    onClick={handleSaveMeta}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors shadow-lg shadow-brand-500/20"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Metadata
                  </button>
                </div>
              </section>

              {/* Thumbnail card */}
              <section className="rounded-xl border border-white/10 bg-slate-800/40 p-6">
                <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5">
                  Thumbnail
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {/* Current / preview */}
                  <div className="w-full sm:w-48 shrink-0 rounded-lg overflow-hidden border border-white/10 bg-slate-900/60 aspect-video relative">
                    {displayThumb ? (
                      <Image
                        src={displayThumb}
                        alt="Thumbnail"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                        <ImageIcon className="w-6 h-6 text-slate-600" />
                        <span className="text-xs text-slate-600">No thumbnail</span>
                      </div>
                    )}
                    {thumbPreview && (
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-amber-500/90 text-[10px] font-bold text-white uppercase">
                        New
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">
                        Current path
                      </label>
                      <code className="text-xs text-slate-400 bg-slate-900/60 px-2 py-1.5 rounded block break-all">
                        {form.thumbnailSrc || '(none)'}
                      </code>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">
                        Upload new thumbnail{' '}
                        <span className="text-slate-600">(png / jpg / webp)</span>
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-slate-700 file:text-white hover:file:bg-slate-600 cursor-pointer"
                      />
                    </div>

                    {thumbFile && (
                      <button
                        onClick={handleUploadThumbnail}
                        disabled={uploadingThumb}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
                      >
                        {uploadingThumb ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                        Upload Thumbnail
                      </button>
                    )}
                  </div>
                </div>
              </section>

              {/* Info card */}
              <section className="rounded-xl border border-white/10 bg-slate-800/20 p-4 text-xs text-slate-500 space-y-1">
                <p>
                  <span className="text-slate-400 font-medium">Overrides file:</span>{' '}
                  <code className="text-slate-300">src/data/animationMeta.overrides.json</code>
                </p>
                <p>
                  <span className="text-slate-400 font-medium">Thumbnail dir:</span>{' '}
                  <code className="text-slate-300">public/animation-thumbs/</code>
                </p>
                <p>
                  After saving, click <span className="text-slate-300 font-medium">Run gen:animations</span>{' '}
                  (or run <code className="text-slate-300">npm run gen:all</code> in terminal) to regenerate
                  the catalog, then reload <code className="text-slate-300">/gallery</code> to see changes.
                </p>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
