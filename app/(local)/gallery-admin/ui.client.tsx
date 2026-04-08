'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Search, RefreshCcw, Save, UploadCloud, Play } from 'lucide-react'

type AdminItem = {
  id: string
  title: string
  componentPath: string
  thumbnailSrc: string
  repoUrl?: string
  usedOnPages: boolean
  description: string
  keywords: string[]
  hasOverride: boolean
}

type ApiResp = {
  count: number
  overridesCount: number
  items: AdminItem[]
}

function cx(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(' ')
}

export default function GalleryAdminClient() {
  const [data, setData] = useState<ApiResp | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/local/animations', { cache: 'no-store' })
      const json = (await res.json()) as ApiResp
      setData(json)
      if (json.items.length) {
        setSelectedId((prev) => prev ?? json.items[0].id)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const items = useMemo(() => data?.items ?? [], [data])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((i) => {
      return (
        i.id.includes(q) ||
        i.title.toLowerCase().includes(q) ||
        (i.description ?? '').toLowerCase().includes(q) ||
        (i.keywords ?? []).some((k) => k.toLowerCase().includes(q))
      )
    })
  }, [items, query])

  const selected = useMemo(
    () => filtered.find((i) => i.id === selectedId) ?? filtered[0] ?? null,
    [filtered, selectedId],
  )

  const [draft, setDraft] = useState<{
    title: string
    description: string
    keywordsCsv: string
    repoUrl: string
  }>({ title: '', description: '', keywordsCsv: '', repoUrl: '' })

  useEffect(() => {
    if (!selected) return
    setDraft({
      title: selected.title ?? '',
      description: selected.description ?? '',
      keywordsCsv: (selected.keywords ?? []).join(', '),
      repoUrl: selected.repoUrl ?? '',
    })
  }, [selected])

  async function saveMeta(id: string) {
    setSaving(id)
    try {
      const keywords = draft.keywordsCsv
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

      const res = await fetch('/api/local/animations', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          id,
          patch: {
            title: draft.title,
            description: draft.description,
            keywords,
            repoUrl: draft.repoUrl,
          },
        }),
      })

      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error((j as { error?: string })?.error ?? 'Save failed')
      }

      setToast('Saved overrides.')
      void load()
    } catch (e: unknown) {
      setToast(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(null)
      window.setTimeout(() => setToast(null), 2000)
    }
  }

  async function uploadThumb(id: string, file: File) {
    setSaving(id)
    try {
      const fd = new FormData()
      fd.set('id', id)
      fd.set('file', file)

      const res = await fetch('/api/local/animations/thumbnail', {
        method: 'POST',
        body: fd,
      })

      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error((j as { error?: string })?.error ?? 'Upload failed')
      }

      setToast('Thumbnail uploaded.')
      void load()
    } catch (e: unknown) {
      setToast(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setSaving(null)
      window.setTimeout(() => setToast(null), 2000)
    }
  }

  async function runGen() {
    setLoading(true)
    try {
      const res = await fetch('/api/local/animations/run-gen', { method: 'POST' })
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !j?.ok) throw new Error(j?.error ?? 'Generator failed')
      setToast('Ran gen:animations.')
      void load()
    } catch (e: unknown) {
      setToast(e instanceof Error ? e.message : 'Generator failed')
    } finally {
      setLoading(false)
      window.setTimeout(() => setToast(null), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b1224] text-white">
      <div className="border-b border-white/10 bg-[#0f172a]">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Animation Admin (Local Only)</h1>
            <p className="text-sm text-slate-400">
              Overrides only{' '}
              <code className="text-slate-300">src/data/animationMeta.overrides.ts</code>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void load()}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </button>

            <button
              type="button"
              onClick={() => void runGen()}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold hover:bg-blue-500"
            >
              <Play className="h-4 w-4" />
              Run gen:animations
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left list */}
        <div className="lg:col-span-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search id/title/keywords..."
                className="w-full rounded-xl bg-slate-800/40 border border-white/10 pl-9 pr-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="text-xs text-slate-400 shrink-0">
              {loading ? 'Loading...' : `${filtered.length}/${items.length}`}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-900/30 overflow-hidden">
            <div className="max-h-[70vh] overflow-y-auto">
              {filtered.map((i) => {
                const active = i.id === selected?.id
                return (
                  <div
                    key={i.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedId(i.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedId(i.id)
                    }}
                    className={cx(
                      'px-4 py-3 border-b border-white/5 cursor-pointer hover:bg-white/5 outline-none',
                      active && 'bg-blue-500/10',
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">{i.title}</div>
                        <div className="text-xs text-slate-500 truncate">{i.id}</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {i.usedOnPages && (
                          <span className="rounded bg-emerald-500/[0.15] text-emerald-300 text-[10px] px-2 py-0.5">
                            Used
                          </span>
                        )}
                        {i.hasOverride && (
                          <span className="rounded bg-amber-500/[0.15] text-amber-300 text-[10px] px-2 py-0.5">
                            Override
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-slate-500 text-sm">No matches.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right editor */}
        <div className="lg:col-span-7">
          {!selected ? (
            <div className="rounded-xl border border-white/10 bg-slate-900/30 p-6 text-slate-400">
              Select an animation.
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-slate-900/30 overflow-hidden">
              <div className="p-5 border-b border-white/10 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-lg font-semibold truncate">{selected.title}</div>
                  <div className="text-xs text-slate-500">
                    ID: <code className="text-slate-300">{selected.id}</code>
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    Component: <code className="text-slate-300">{selected.componentPath}</code>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => void saveMeta(selected.id)}
                  disabled={saving === selected.id}
                  className={cx(
                    'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold shrink-0',
                    saving === selected.id
                      ? 'bg-white/10 text-slate-300'
                      : 'bg-blue-600 hover:bg-blue-500',
                  )}
                >
                  <Save className="h-4 w-4" />
                  {saving === selected.id ? 'Saving...' : 'Save'}
                </button>
              </div>

              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Title</label>
                    <input
                      value={draft.title}
                      onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                      className="w-full rounded-lg bg-slate-800/40 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Repo URL</label>
                    <input
                      value={draft.repoUrl}
                      onChange={(e) => setDraft((d) => ({ ...d, repoUrl: e.target.value }))}
                      placeholder="https://github.com/..."
                      className="w-full rounded-lg bg-slate-800/40 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Keywords (comma-separated)
                    </label>
                    <input
                      value={draft.keywordsCsv}
                      onChange={(e) => setDraft((d) => ({ ...d, keywordsCsv: e.target.value }))}
                      placeholder="abm, radar, pipeline"
                      className="w-full rounded-lg bg-slate-800/40 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs text-slate-400">Thumbnail</div>
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-slate-950/40">
                    <Image
                      src={selected.thumbnailSrc}
                      alt={selected.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <label className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 cursor-pointer">
                    <UploadCloud className="h-4 w-4" />
                    Upload PNG
                    <input
                      type="file"
                      accept="image/png"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0]
                        if (f) void uploadThumb(selected.id, f)
                        e.currentTarget.value = ''
                      }}
                    />
                  </label>

                  <div className="text-xs text-slate-500">
                    Saved to{' '}
                    <code className="text-slate-300">
                      public/animation-thumbs/{selected.id}.png
                    </code>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Description</label>
                  <textarea
                    value={draft.description}
                    onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                    rows={4}
                    className="w-full rounded-lg bg-slate-800/40 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              {toast && (
                <div className="px-5 pb-5">
                  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 inline-flex items-center gap-2">
                    <RefreshCcw className="h-4 w-4" />
                    {toast}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 text-xs text-slate-500">
            Local-only: disabled in production and requires{' '}
            <code className="text-slate-300">LOCAL_ADMIN=1</code>.
          </div>
        </div>
      </div>
    </div>
  )
}
