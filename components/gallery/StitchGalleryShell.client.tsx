'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

export type StitchGalleryItem = {
  id: string
  title: string
  summary?: string | null
  category: string
  tags: string[]
  thumbnailUrl?: string
  previewMode?: 'live-component' | 'iframe-entry-html' | 'thumbnail-fallback' | 'explicit-fallback-message'
  placeholderPreview?: boolean
}

function normalizeCategory(value: string): string {
  return value.trim().toLowerCase()
}

function titleCase(value: string): string {
  return value
    .replace(/[-_/]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function initials(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

// Pillar color palette — mirrors gallery.html pillar-* colors
const PILLAR_COLORS = [
  { bg: '#F5C542', text: '#0A1628' },  // analytics / gold
  { bg: '#10b981', text: '#ffffff' },  // ops / emerald
  { bg: '#38bdf8', text: '#ffffff' },  // layout / sky
  { bg: '#22d3ee', text: '#ffffff' },  // ui / cyan
  { bg: '#8b5cf6', text: '#ffffff' },  // viz / violet
  { bg: '#fb7185', text: '#ffffff' },  // atmos / rose
]

const CATEGORY_PALETTE_INDEX: Record<string, number> = {
  'dashboard-tiles': 0, 'analytics': 0, 'marketing': 0,
  'operations': 1,
  'industries': 2, 'layout': 2, 'content': 2,
  'digital-demand': 3, 'demand': 3, 'ui': 3,
  'events-media': 4, 'strategy': 4, 'viz': 4,
  'abm': 5,
}

function getCategoryPalette(category: string) {
  const lower = category.toLowerCase()
  for (const [key, idx] of Object.entries(CATEGORY_PALETTE_INDEX)) {
    if (lower === key || lower.includes(key.split('-')[0])) return PILLAR_COLORS[idx]
  }
  // hash fallback
  let h = 0
  for (let i = 0; i < lower.length; i++) h = (h * 31 + lower.charCodeAt(i)) >>> 0
  return PILLAR_COLORS[h % PILLAR_COLORS.length]
}

// Tag pill color — similar hash-to-pillar mapping
function getTagPalette(tag: string) {
  const lower = tag.toLowerCase()
  const MAP: Record<string, number> = {
    dashboard: 0, analytics: 0, reporting: 0, kpi: 0, metrics: 0,
    operations: 1, 'svg morph': 1, pipeline: 1, workflow: 1,
    layout: 2, tailwind: 2, bento: 2, grid: 2, content: 2,
    'ui kit': 3, glassmorphism: 3, hover: 3, interactive: 3,
    'data visualization': 4, lottie: 4, chart: 4, motion: 4,
    parallax: 5, atmospheric: 5, ambient: 5,
  }
  for (const [key, idx] of Object.entries(MAP)) {
    if (lower === key || lower.includes(key)) return PILLAR_COLORS[idx]
  }
  let h = 0
  for (let i = 0; i < lower.length; i++) h = (h * 31 + lower.charCodeAt(i)) >>> 0
  return PILLAR_COLORS[h % PILLAR_COLORS.length]
}

export function StitchGalleryShell({
  items,
  onSelect,
  showThumbnails = false,
}: {
  items: StitchGalleryItem[]
  onSelect: (id: string) => void
  showThumbnails?: boolean
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'ALL' | string>('ALL')
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [section, setSection] = useState<
    'ALL' | 'LIVE_COMPONENTS' | 'INTERACTIVE_HTML' | 'THUMBNAIL_FALLBACK' | 'NO_PREVIEW'
  >('ALL')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(36)

  const categories = useMemo(() => {
    const set = new Set<string>()
    items.forEach((i) => { if (i.category) set.add(i.category) })
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [items])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    items.forEach((i) => (i.tags || []).forEach((t) => t && set.add(t)))
    return Array.from(set).sort((a, b) => a.localeCompare(b)).slice(0, 24)
  }, [items])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const cat = category === 'ALL' ? null : normalizeCategory(category)
    const tags = activeTags.map((t) => t.toLowerCase())

    return items.filter((item) => {
      if (section === 'LIVE_COMPONENTS' && item.previewMode !== 'live-component') return false
      if (section === 'INTERACTIVE_HTML' && item.previewMode !== 'iframe-entry-html') return false
      if (section === 'THUMBNAIL_FALLBACK' && item.previewMode !== 'thumbnail-fallback') return false
      if (section === 'NO_PREVIEW' && item.previewMode !== 'explicit-fallback-message') return false
      if (cat && normalizeCategory(item.category) !== cat) return false
      if (tags.length) {
        const itemTags = (item.tags || []).map((t) => t.toLowerCase())
        if (!tags.every((t) => itemTags.includes(t))) return false
      }
      if (!q) return true
      const hay = [item.title, item.summary ?? '', item.category, ...(item.tags || [])].join(' ').toLowerCase()
      return hay.includes(q)
    })
  }, [activeTags, category, items, query, section])

  useEffect(() => { setPage(1) }, [activeTags, category, query, section, pageSize])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageSafe = Math.min(page, totalPages)
  const pageStart = (pageSafe - 1) * pageSize
  const pageEnd = pageStart + pageSize
  const paged = filtered.slice(pageStart, pageEnd)
  const pageWindowStart = Math.max(1, pageSafe - 2)
  const pageWindowEnd = Math.min(totalPages, pageWindowStart + 4)
  const pageNumbers = Array.from({ length: Math.max(0, pageWindowEnd - pageWindowStart + 1) }, (_, i) => pageWindowStart + i)

  const sectionCounts = useMemo(() => {
    let live = 0, html = 0, thumb = 0, none = 0
    for (const item of items) {
      if (item.previewMode === 'live-component') live++
      else if (item.previewMode === 'iframe-entry-html') html++
      else if (item.previewMode === 'thumbnail-fallback') thumb++
      else none++
    }
    return { live, html, thumb, none }
  }, [items])

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])
  }

  return (
    <div className="sgs-root">
      <style jsx global>{`
        /* ─── Root ─────────────────────────────────────────────── */
        .sgs-root {
          --gold: #F5C542;
          --gold-dark: #3b2f00;
          --bg: #00142a;
          --bg-nav: rgba(0,20,42,0.95);
          --bg-header: #0A1628;
          --bg-sidebar: #0b1729;
          --bg-stage: #182b41;
          --text-on-dark: #d2e4ff;
          --text-muted: #AED6F1;
          --border-subtle: rgba(255,255,255,0.08);
          min-height: 100vh;
          background: var(--bg);
          color: var(--text-on-dark);
          font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
        }

        /* ─── Hero Header ───────────────────────────────────────── */
        .sgs-header {
          background: var(--bg-header);
          height: 180px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--border-subtle);
        }
        .sgs-header-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 32px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sgs-header-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          display: block;
          margin-bottom: 10px;
        }
        .sgs-header-h1 {
          font-family: 'Manrope', 'Outfit', sans-serif;
          font-size: 44px;
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: white;
          margin-bottom: 10px;
        }
        .sgs-header-h1-em {
          background: linear-gradient(90deg, #84CC16, #2DD4BF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-style: italic;
        }
        .sgs-header-sub {
          font-size: 13px;
          color: rgba(174,214,241,0.7);
          line-height: 1.6;
          max-width: 460px;
        }
        .sgs-header-svg {
          display: none;
          position: relative;
          width: 300px;
          height: 200px;
          opacity: 0.2;
          mask-image: linear-gradient(to left, black, transparent);
          -webkit-mask-image: linear-gradient(to left, black, transparent);
        }
        @media (min-width: 1024px) { .sgs-header-svg { display: block; } }

        /* ─── Body layout ───────────────────────────────────────── */
        .sgs-body {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          min-height: calc(100vh - 180px);
        }

        /* ─── Sidebar ───────────────────────────────────────────── */
        .sgs-sidebar {
          width: 300px;
          flex-shrink: 0;
          background: var(--bg-sidebar);
          border-left: 3px solid var(--gold);
          padding: 32px 24px;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          scrollbar-width: none;
          z-index: 10;
          box-shadow: 4px 0 24px rgba(0,0,0,0.2);
        }
        .sgs-sidebar::-webkit-scrollbar { display: none; }

        .sgs-search-wrap {
          position: relative;
          margin-bottom: 10px;
        }
        .sgs-search-input {
          width: 100%;
          padding: 12px 48px 12px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.9);
          font-size: 13px;
          outline: none;
          transition: border-color 200ms, box-shadow 200ms;
        }
        .sgs-search-input::placeholder { color: rgba(100,116,139,0.8); }
        .sgs-search-input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(245,197,66,0.15);
        }
        .sgs-search-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--gold);
          border: none;
          color: var(--gold-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 15px;
          line-height: 1;
        }

        .sgs-count {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 32px;
          display: block;
          padding-left: 4px;
        }

        /* details/summary filter groups */
        .sgs-filter-group { }
        .sgs-filter-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 16px;
          list-style: none;
          user-select: none;
        }
        .sgs-filter-summary::-webkit-details-marker { display: none; }
        .sgs-filter-label {
          font-family: 'Manrope', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .sgs-filter-chevron {
          font-size: 18px;
          color: rgba(100,116,139,0.8);
          transition: transform 200ms;
          line-height: 1;
        }
        details[open] .sgs-filter-chevron { transform: rotate(180deg); }

        /* Category buttons */
        .sgs-cat-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 8px 0 16px;
        }
        .sgs-cat-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          text-align: left;
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid transparent;
          font-size: 12px;
          font-weight: 500;
          color: rgba(203,213,225,0.8);
          background: transparent;
          cursor: pointer;
          transition: all 150ms;
        }
        .sgs-cat-btn:hover {
          border-color: var(--gold);
          background: rgba(245,197,66,0.05);
          color: rgba(255,255,255,0.9);
        }
        .sgs-cat-btn.active {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--gold-dark);
          font-weight: 700;
        }
        .sgs-cat-check { font-size: 14px; line-height: 1; }

        /* Tag pills */
        .sgs-tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 8px 0 16px;
        }
        .sgs-tag-pill {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          transition: opacity 150ms, box-shadow 150ms;
          opacity: 0.8;
        }
        .sgs-tag-pill:hover { opacity: 1; }
        .sgs-tag-pill.active {
          opacity: 1;
          box-shadow: 0 0 0 2px white, 0 0 0 4px currentColor;
        }

        /* ─── Main ──────────────────────────────────────────────── */
        .sgs-main {
          flex: 1;
          min-width: 0;
          background: var(--bg);
          padding: 24px;
        }

        /* stage container */
        .sgs-stage {
          width: 100%;
          background: var(--bg-stage);
          border-radius: 2rem;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          padding: 40px 32px 32px;
          position: relative;
          background-image: radial-gradient(circle at 50% 0%, rgba(245,197,66,0.04) 0%, transparent 70%);
        }

        /* section chips */
        .sgs-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .sgs-chip {
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
          color: rgba(255,255,255,0.55);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 150ms;
        }
        .sgs-chip:hover { border-color: rgba(255,255,255,0.28); color: rgba(255,255,255,0.85); }
        .sgs-chip.active {
          border-color: rgba(74,134,216,0.65);
          background: rgba(74,134,216,0.16);
          color: #e8f1ff;
        }

        /* grid header */
        .sgs-grid-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .sgs-grid-title { font-size: 13px; font-weight: 800; color: white; }
        .sgs-grid-count {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          font-family: ui-monospace, monospace;
        }

        /* card grid — 3 columns matching gallery.html lg:grid-cols-3 */
        .sgs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          padding-bottom: 12px;
        }
        @media (max-width: 1200px) { .sgs-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 800px) { .sgs-grid { grid-template-columns: 1fr; } }

        /* ─── Cards ─────────────────────────────────────────────── */
        .sgs-card {
          position: relative;
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #E8EDF2;
          overflow: hidden;
          cursor: pointer;
          /* pt-[16px] equivalent: top padding via accent bar */
          padding-top: 16px;
          transition: transform 280ms cubic-bezier(0.4,0,0.2,1), box-shadow 280ms cubic-bezier(0.4,0,0.2,1);
        }
        .sgs-card:hover { transform: translateY(-3px); }
        .sgs-card:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

        /* colored accent bar positioned absolutely at top */
        .sgs-card-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 16px;
        }

        .sgs-card-body { padding: 16px; }

        .sgs-card-thumb {
          position: relative;
          aspect-ratio: 16/9;
          border-radius: 8px;
          background: #0D2137;
          overflow: hidden;
          margin-bottom: 14px;
        }
        .sgs-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
          transition: transform 500ms ease;
        }
        .sgs-card:hover .sgs-card-img { transform: scale(1.05); }

        .sgs-card-hover-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,20,42,0.4);
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 250ms;
        }
        .sgs-card:hover .sgs-card-hover-overlay { opacity: 1; }
        .sgs-card-hover-label {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
        }

        .sgs-card-initials-area {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background:
            radial-gradient(circle at 20% 25%, rgba(74,134,216,0.22), transparent 55%),
            radial-gradient(circle at 80% 70%, rgba(174,214,241,0.16), transparent 60%);
        }
        .sgs-card-initials-badge {
          width: 46px; height: 46px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.85);
          font-size: 14px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
        }
        .sgs-card-initials-cat {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .sgs-card-no-preview {
          position: absolute; top: 10px; left: 10px; z-index: 3;
          font-size: 9px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 999px;
          background: rgba(120,53,15,0.85);
          border: 1px solid rgba(251,191,36,0.45);
          color: rgba(254,240,138,0.96);
        }

        .sgs-card-title-row {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;
          margin-bottom: 6px;
        }
        .sgs-card-title { font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 700; color: #0A1628; line-height: 1.3; }
        .sgs-card-desc { font-size: 13px; color: #3D4B5C; line-height: 1.55; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        .sgs-card-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .sgs-card-tag { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.04em; }

        .sgs-preview-btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 6px 16px;
          border: 1px solid #4A86D8; color: #4A86D8;
          border-radius: 6px; font-size: 12px; font-weight: 700;
          transition: background 200ms, color 200ms;
        }
        .sgs-card:hover .sgs-preview-btn {
          background: #4A86D8; color: #ffffff;
        }

        /* ─── Pagination ────────────────────────────────────────── */
        .sgs-pager {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          margin-top: 40px; padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.1);
          flex-wrap: wrap;
        }
        .sgs-pager-left {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; color: rgba(255,255,255,0.45);
        }
        .sgs-page-size-select {
          border-radius: 6px;
          border: none;
          background: transparent;
          color: white;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
        }
        .sgs-pager-controls { display: flex; align-items: center; gap: 6px; }
        .sgs-pager-btn {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.7);
          font-size: 12px; font-weight: 600;
          cursor: pointer;
          transition: border-color 150ms, color 150ms;
        }
        .sgs-pager-btn:hover:not(:disabled) { border-color: var(--gold); color: var(--gold); }
        .sgs-pager-btn:disabled { opacity: 0.3; cursor: default; }
        .sgs-pager-btn.active {
          background: var(--gold); border-color: var(--gold);
          color: #0A1628; font-weight: 800;
          box-shadow: 0 4px 12px rgba(245,197,66,0.25);
        }
        .sgs-pager-meta { font-size: 12px; color: rgba(255,255,255,0.45); }

        .sgs-empty { padding: 64px 24px; text-align: center; color: rgba(255,255,255,0.4); font-size: 13px; }

        /* ─── Responsive ────────────────────────────────────────── */
        @media (max-width: 900px) {
          .sgs-body { flex-direction: column; }
          .sgs-sidebar {
            width: 100%; position: static; height: auto;
            border-left: none; border-bottom: 3px solid var(--gold);
          }
          .sgs-header-h1 { font-size: 30px; }
        }
      `}</style>

      {/* ── Full-width hero header ── */}
      <header className="sgs-header">
        <div className="sgs-header-inner">
          <div style={{ maxWidth: '640px' }}>
            <span className="sgs-header-eyebrow">Animation Registry</span>
            <h1 className="sgs-header-h1">
              Production-Grade Motion{' '}
              <span className="sgs-header-h1-em">Engineered</span>
            </h1>
            <p className="sgs-header-sub">
              Tailwind &amp; React animations optimized for strategic dashboards, high-fidelity
              pitch decks, and enterprise GTM interfaces.
            </p>
          </div>
          <div className="sgs-header-svg" aria-hidden="true">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#AED6F1"
              fill="none"
              strokeWidth="2"
              style={{ width: '100%', height: '100%' }}
            >
              <path d="M10,100 Q50,20 100,100 T190,100" />
              <circle cx="10" cy="100" r="4" fill="#F5C542" stroke="none" />
              <circle cx="190" cy="100" r="4" fill="#56D8E7" stroke="none" />
            </svg>
          </div>
        </div>
      </header>

      {/* ── Body: sidebar + main ── */}
      <div className="sgs-body">

        {/* Sidebar */}
        <aside className="sgs-sidebar">
          <div className="sgs-search-wrap">
            <input
              className="sgs-search-input"
              type="search"
              placeholder="Search components..."
              aria-label="Search animations"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="sgs-search-btn" type="button" aria-label="Search">
              ⌕
            </button>
          </div>

          <span className="sgs-count">{filtered.length} components</span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <details open>
              <summary className="sgs-filter-summary">
                <span className="sgs-filter-label">Categories</span>
                <span className="sgs-filter-chevron">▾</span>
              </summary>
              <div className="sgs-cat-list">
                <button
                  type="button"
                  className={`sgs-cat-btn ${category === 'ALL' ? 'active' : ''}`}
                  onClick={() => setCategory('ALL')}
                >
                  All
                  {category === 'ALL' && <span className="sgs-cat-check">✓</span>}
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`sgs-cat-btn ${category === c ? 'active' : ''}`}
                    onClick={() => setCategory(c)}
                  >
                    {titleCase(c)}
                    {category === c && <span className="sgs-cat-check">✓</span>}
                  </button>
                ))}
              </div>
            </details>

            <details open>
              <summary className="sgs-filter-summary">
                <span className="sgs-filter-label">Tags</span>
                <span className="sgs-filter-chevron">▾</span>
              </summary>
              <div className="sgs-tag-row">
                {allTags.map((t) => {
                  const pal = getTagPalette(t)
                  const isActive = activeTags.includes(t)
                  return (
                    <button
                      key={t}
                      type="button"
                      className={`sgs-tag-pill ${isActive ? 'active' : ''}`}
                      style={{ backgroundColor: pal.bg, color: pal.text }}
                      onClick={() => toggleTag(t)}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            </details>
          </div>
        </aside>

        {/* Main */}
        <main className="sgs-main">
          <div className="sgs-stage">

            {/* Section chips */}
            <div className="sgs-chips" role="tablist" aria-label="Preview sections">
              {(
                [
                  { key: 'ALL', label: `All (${items.length})` },
                  { key: 'LIVE_COMPONENTS', label: `Live Components (${sectionCounts.live})` },
                  { key: 'INTERACTIVE_HTML', label: `Interactive HTML (${sectionCounts.html})` },
                  { key: 'THUMBNAIL_FALLBACK', label: `Thumbnail (${sectionCounts.thumb})` },
                  { key: 'NO_PREVIEW', label: `No Preview (${sectionCounts.none})` },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  className={`sgs-chip ${section === key ? 'active' : ''}`}
                  onClick={() => setSection(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Grid header */}
            <div className="sgs-grid-header">
              <div className="sgs-grid-title">Browse</div>
              <div className="sgs-grid-count">
                {filtered.length} results · page {pageSafe} of {totalPages}
              </div>
            </div>

            {/* Card grid */}
            <div className="sgs-grid">
              {paged.map((item) => {
                const pal = getCategoryPalette(item.category)
                const tagBg = `${pal.bg}22`

                return (
                  <div
                    key={item.id}
                    className="sgs-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelect(item.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(item.id) }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      const r = parseInt(pal.bg.slice(1, 3), 16)
                      const g = parseInt(pal.bg.slice(3, 5), 16)
                      const b = parseInt(pal.bg.slice(5, 7), 16)
                      el.style.boxShadow = `0 20px 25px -5px rgba(${r},${g},${b},0.18)`
                    }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '' }}
                  >
                    {/* Accent color bar at top */}
                    <div className="sgs-card-bar" style={{ backgroundColor: pal.bg }} />

                    <div className="sgs-card-body">
                      {/* Thumbnail / preview area */}
                      <div className="sgs-card-thumb">
                        {item.placeholderPreview && (
                          <div className="sgs-card-no-preview">No Live Preview Yet</div>
                        )}
                        {showThumbnails && item.thumbnailUrl ? (
                          <Image
                            src={item.thumbnailUrl}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="sgs-card-img"
                          />
                        ) : (
                          <div className="sgs-card-initials-area" aria-hidden="true">
                            <div className="sgs-card-initials-badge">{initials(item.title)}</div>
                            <div className="sgs-card-initials-cat">{titleCase(item.category)}</div>
                          </div>
                        )}
                        <div className="sgs-card-hover-overlay" aria-hidden="true">
                          <span
                            className="sgs-card-hover-label"
                            style={{ backgroundColor: pal.bg, color: pal.text }}
                          >
                            Quick Preview
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="sgs-card-title-row">
                        <div className="sgs-card-title">{item.title}</div>
                      </div>

                      {/* Description */}
                      <div className="sgs-card-desc">{item.summary || '—'}</div>

                      {/* Tags */}
                      <div className="sgs-card-tags">
                        {(item.tags || []).slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="sgs-card-tag"
                            style={{ backgroundColor: tagBg, color: pal.bg }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <span className="sgs-preview-btn">Preview →</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Empty state */}
            {items.length > 0 && filtered.length === 0 && (
              <div className="sgs-empty">No animations match your filters.</div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="sgs-pager">
                <div className="sgs-pager-left">
                  <span>Show:</span>
                  <select
                    className="sgs-page-size-select"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    aria-label="Items per page"
                  >
                    <option value={24}>24 per page</option>
                    <option value={36}>36 per page</option>
                    <option value={48}>48 per page</option>
                    <option value={72}>72 per page</option>
                  </select>
                </div>
                <div className="sgs-pager-controls">
                  <button
                    type="button"
                    className="sgs-pager-btn"
                    disabled={pageSafe <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                  >
                    ‹
                  </button>
                  {pageNumbers.map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`sgs-pager-btn ${n === pageSafe ? 'active' : ''}`}
                      onClick={() => setPage(n)}
                      aria-current={n === pageSafe ? 'page' : undefined}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="sgs-pager-btn"
                    disabled={pageSafe >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    aria-label="Next page"
                  >
                    ›
                  </button>
                </div>
                <div className="sgs-pager-meta">
                  Viewing {pageStart + 1}–{Math.min(pageEnd, filtered.length)} of {filtered.length}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
