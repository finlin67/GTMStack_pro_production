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

export function StitchGalleryShell({
  items,
  onSelect,
  showThumbnails = false,
}: {
  items: StitchGalleryItem[]
  onSelect: (id: string) => void
  /** The original Stitch design can render without thumbnails. */
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
    items.forEach((i) => {
      if (i.category) set.add(i.category)
    })
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
      const hay = [
        item.title,
        item.summary ?? '',
        item.category,
        ...(item.tags || []),
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [activeTags, category, items, query, section])

  useEffect(() => {
    setPage(1)
  }, [activeTags, category, query, section, pageSize])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageSafe = Math.min(page, totalPages)
  const pageStart = (pageSafe - 1) * pageSize
  const pageEnd = pageStart + pageSize
  const paged = filtered.slice(pageStart, pageEnd)
  const pageWindowStart = Math.max(1, pageSafe - 2)
  const pageWindowEnd = Math.min(totalPages, pageWindowStart + 4)
  const pageNumbers = Array.from(
    { length: Math.max(0, pageWindowEnd - pageWindowStart + 1) },
    (_, idx) => pageWindowStart + idx
  )

  const sectionCounts = useMemo(() => {
    let live = 0
    let html = 0
    let thumb = 0
    let none = 0

    for (const item of items) {
      if (item.previewMode === 'live-component') live += 1
      else if (item.previewMode === 'iframe-entry-html') html += 1
      else if (item.previewMode === 'thumbnail-fallback') thumb += 1
      else none += 1
    }

    return { live, html, thumb, none }
  }, [items])

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="stitch-gallery">
      <style jsx global>{`
        .stitch-gallery {
          --bg-darkest: #030213;
          --bg-primary: #0b1220;
          --bg-mid: #101827;
          --bg-deep: #151d2e;
          --text-primary: #f5f7fb;
          --text-muted: #9aa4b2;
          --text-soft: #717182;
          --surface-border: rgba(255, 255, 255, 0.1);
          --sidebar-bg: #121826;
          --sidebar-border: rgba(255, 255, 255, 0.1);
          --search-bg: rgba(255, 255, 255, 0.03);
          --hub: #4a86d8;
          --nav-h: 54px;
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial,
            'Apple Color Emoji', 'Segoe UI Emoji';
        }

        .stitch-gallery a {
          color: inherit;
          text-decoration: none;
        }

        .sg-progress {
          position: fixed;
          top: var(--nav-h);
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, #1b4fd8, #4a86d8);
          width: 100%;
          opacity: 0.18;
          z-index: 20;
        }

        .sg-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          height: var(--nav-h);
          background: rgba(3, 2, 19, 0.92);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--surface-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
        }
        .sg-nav-logo {
          font-size: 15px;
          font-weight: 800;
          color: white;
          letter-spacing: -0.02em;
        }
        .sg-nav-logo span {
          background: linear-gradient(90deg, #154360, #aed6f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sg-nav-center {
          display: flex;
          gap: 6px;
          align-items: center;
          background: rgba(74, 134, 216, 0.08);
          border: 1px solid rgba(74, 134, 216, 0.2);
          border-radius: 100px;
          padding: 5px 14px;
        }
        .sg-nav-dot {
          width: 6px;
          height: 6px;
          background: #4a86d8;
          border-radius: 50%;
          animation: sg-pulse-dot 2s ease-in-out infinite;
        }
        @keyframes sg-pulse-dot {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }
        .sg-nav-badge {
          font-size: 10px;
          font-weight: 700;
          color: #4a86d8;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .sg-nav-right {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .sg-nav-tag {
          font-size: 10px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.5);
        }
        .sg-nav-count {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.35);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
        }

        .sg-hero {
          padding: 42px 30px 28px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--surface-border);
        }
        .sg-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              ellipse 700px 420px at 60% 36%,
              rgba(74, 134, 216, 0.18) 0%,
              transparent 60%
            ),
            radial-gradient(
              ellipse 360px 240px at 12% 74%,
              rgba(46, 124, 246, 0.12) 0%,
              transparent 62%
            );
        }
        .sg-hero-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #4a86d8;
          margin-bottom: 12px;
          position: relative;
        }
        .sg-hero-h1 {
          font-size: 50px;
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: white;
          margin-bottom: 10px;
          position: relative;
        }
        .sg-hero-h1 span {
          background: linear-gradient(90deg, #154360, #aed6f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sg-hero-sub {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.58;
          max-width: 680px;
          margin-bottom: 8px;
          position: relative;
        }

        .sg-hero-search {
          position: relative;
          margin-top: 16px;
          display: flex;
          gap: 10px;
          align-items: center;
          max-width: 720px;
        }

        .sg-shell {
          display: grid;
          grid-template-columns: 265px minmax(0, 1fr);
          gap: 14px;
          padding: 16px 18px 24px;
          align-items: start;
        }

        .sg-left {
          position: sticky;
          top: calc(var(--nav-h) + 10px);
          background: linear-gradient(
            180deg,
            color-mix(in oklab, var(--sidebar-bg) 92%, #1c2942 8%) 0%,
            var(--sidebar-bg) 100%
          );
          border: 1px solid var(--sidebar-border);
          border-radius: 12px;
          padding: 13px;
        }

        .sg-left-title {
          font-size: 28px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }

        .sg-filter-title {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-soft);
          margin-bottom: 6px;
        }

        .sg-search-row {
          display: flex;
          gap: 6px;
          margin-bottom: 10px;
        }

        .sg-input {
          width: 100%;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: var(--search-bg);
          color: rgba(255, 255, 255, 0.9);
          font-size: 12px;
          padding: 8px 10px;
        }
        .sg-input::placeholder {
          color: rgba(255, 255, 255, 0.34);
        }

        .sg-btn {
          border: 0;
          border-radius: 10px;
          padding: 0 13px;
          font-size: 12px;
          font-weight: 700;
          color: #04101f;
          background: #ffdb58;
          cursor: pointer;
        }

        .sg-pill-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 6px;
        }
        .sg-pill {
          font-size: 11px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.55);
          cursor: pointer;
          transition: all 150ms ease;
          background: transparent;
        }
        .sg-pill:hover {
          color: rgba(255, 255, 255, 0.75);
          border-color: rgba(255, 255, 255, 0.25);
        }
        .sg-pill.active {
          color: white;
          border-color: #4a86d8;
          background: rgba(74, 134, 216, 0.12);
        }

        .sg-select {
          width: 100%;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: var(--search-bg);
          color: rgba(255, 255, 255, 0.92);
          padding: 8px 10px;
          font-size: 12px;
        }

        .sg-content {
          padding: 18px 12px 0;
        }

        .sg-grid-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .sg-grid-title {
          font-size: 14px;
          font-weight: 800;
          color: white;
        }
        .sg-grid-count {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.35);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
        }

        .sg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 10px;
          padding-bottom: 26px;
        }

        .sg-section-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .sg-section-chip {
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: transparent;
          color: rgba(255, 255, 255, 0.65);
          padding: 6px 10px;
          font-size: 10px;
          cursor: pointer;
        }

        .sg-section-chip.active {
          border-color: rgba(74, 134, 216, 0.6);
          background: rgba(74, 134, 216, 0.16);
          color: #e8f1ff;
        }

        .sg-pager {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .sg-pager-meta {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.55);
        }

        .sg-pager-controls {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .sg-pager-btn {
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.9);
          padding: 6px 9px;
          font-size: 11px;
          cursor: pointer;
        }

        .sg-pager-btn:disabled {
          opacity: 0.45;
          cursor: default;
        }

        .sg-pager-btn.active {
          border-color: rgba(74, 134, 216, 0.85);
          background: rgba(74, 134, 216, 0.22);
        }

        .sg-page-size {
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.9);
          padding: 6px 8px;
          font-size: 11px;
        }

        .sg-card {
          background: var(--bg-deep);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          cursor: pointer;
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
          position: relative;
        }
        .sg-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
          border-color: rgba(74, 134, 216, 0.35);
        }
        .sg-preview {
          position: relative;
          height: 176px;
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .sg-preview-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 3;
          border-radius: 999px;
          border: 1px solid rgba(251, 191, 36, 0.45);
          background: rgba(120, 53, 15, 0.8);
          color: rgba(254, 240, 138, 0.96);
          padding: 3px 8px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .sg-preview-image {
          object-fit: contain;
          object-position: center;
          padding: 10px;
          background: radial-gradient(circle at 50% 35%, rgba(74, 134, 216, 0.12), transparent 60%);
        }
        .sg-preview-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background:
            radial-gradient(circle at 20% 25%, rgba(74, 134, 216, 0.18), transparent 55%),
            radial-gradient(circle at 80% 70%, rgba(174, 214, 241, 0.14), transparent 60%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.06));
        }
        .sg-preview-initials {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.8);
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sg-preview-meta {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .sg-info {
          padding: 10px 12px;
        }
        .sg-title {
          font-size: 12px;
          font-weight: 700;
          color: white;
          margin-bottom: 6px;
        }
        .sg-desc {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.38);
          line-height: 1.4;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .sg-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .sg-tag {
          font-size: 9px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.55);
        }

        @media (max-width: 960px) {
          .sg-shell {
            grid-template-columns: 1fr;
            padding: 14px 12px 20px;
          }
          .sg-left {
            position: static;
          }
          .sg-hero {
            padding: 28px 16px 20px;
          }
          .sg-hero-h1 {
            font-size: 34px;
          }
          .sg-nav {
            padding: 0 18px;
          }
        }
      `}</style>

      <div className="sg-progress" aria-hidden="true" />

      <nav className="sg-nav">
        <div className="sg-nav-logo">
          GTM<span>Stack</span>.pro
        </div>
        <div className="sg-nav-center">
          <div className="sg-nav-dot" />
          <span className="sg-nav-badge">Animation Registry</span>
        </div>
        <div className="sg-nav-right">
          <span className="sg-nav-tag">Dev Reference</span>
          <span className="sg-nav-count">{items.length} animations</span>
        </div>
      </nav>

      <section className="sg-hero">
        <div className="sg-hero-eyebrow">Animation Registry — GTMStack.pro</div>
        <h1 className="sg-hero-h1">
          Production-Grade Motion <span>Engineered Authority</span>
        </h1>
        <p className="sg-hero-sub">
          Tailwind &amp; React animations. Interactive. Copy-paste ready. Browse by category from
          the left and search directly in the library controls.
        </p>

        <div className="sg-hero-search">
          <input
            className="sg-input"
            type="search"
            placeholder="Search animations..."
            aria-label="Search animations"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="sg-btn" type="button">
            Search
          </button>
        </div>
      </section>

      <div className="sg-shell">
        <aside className="sg-left">
          <div className="sg-left-title">Browse the Library</div>

          <div className="sg-filter-title">Category</div>
          <select
            className="sg-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Category"
          >
            <option value="ALL">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {titleCase(c)}
              </option>
            ))}
          </select>

          <div style={{ marginTop: 12 }}>
            <div className="sg-filter-title">Tags</div>
            <div className="sg-pill-row">
              {allTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`sg-pill ${activeTags.includes(t) ? 'active' : ''}`}
                  onClick={() => toggleTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div className="sg-filter-title">Sort</div>
            <select className="sg-select" aria-label="Sort" disabled value="Newest">
              <option>Newest</option>
            </select>
            <div style={{ marginTop: 6, fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
              Sort is display-only in this preview.
            </div>
          </div>

          <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
            Showing <strong style={{ color: 'rgba(255,255,255,0.8)' }}>{filtered.length}</strong> of{' '}
            {items.length}
          </div>
        </aside>

        <div className="sg-content">
          <div className="sg-grid-header">
            <div className="sg-grid-title">Browse</div>
            <div className="sg-grid-count">
              {filtered.length} results · page {pageSafe} of {totalPages}
            </div>
          </div>

          <div className="sg-section-row" role="tablist" aria-label="Preview sections">
            <button
              type="button"
              className={`sg-section-chip ${section === 'ALL' ? 'active' : ''}`}
              onClick={() => setSection('ALL')}
            >
              All ({items.length})
            </button>
            <button
              type="button"
              className={`sg-section-chip ${section === 'LIVE_COMPONENTS' ? 'active' : ''}`}
              onClick={() => setSection('LIVE_COMPONENTS')}
            >
              Live Components ({sectionCounts.live})
            </button>
            <button
              type="button"
              className={`sg-section-chip ${section === 'INTERACTIVE_HTML' ? 'active' : ''}`}
              onClick={() => setSection('INTERACTIVE_HTML')}
            >
              Interactive HTML ({sectionCounts.html})
            </button>
            <button
              type="button"
              className={`sg-section-chip ${section === 'THUMBNAIL_FALLBACK' ? 'active' : ''}`}
              onClick={() => setSection('THUMBNAIL_FALLBACK')}
            >
              Thumbnail Fallback ({sectionCounts.thumb})
            </button>
            <button
              type="button"
              className={`sg-section-chip ${section === 'NO_PREVIEW' ? 'active' : ''}`}
              onClick={() => setSection('NO_PREVIEW')}
            >
              No Preview ({sectionCounts.none})
            </button>
          </div>

          <div className="sg-grid">
            {paged.map((item) => (
              <div
                key={item.id}
                className="sg-card"
                role="button"
                tabIndex={0}
                onClick={() => onSelect(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelect(item.id)
                }}
              >
                <div className="sg-preview">
                  {item.placeholderPreview ? (
                    <div className="sg-preview-badge">No Live Preview Yet</div>
                  ) : null}
                  {showThumbnails && item.thumbnailUrl ? (
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 240px"
                      className="sg-preview-image"
                    />
                  ) : (
                    <div className="sg-preview-fallback" aria-hidden="true">
                      <div className="sg-preview-initials">{initials(item.title)}</div>
                      <div className="sg-preview-meta">{titleCase(item.category)}</div>
                    </div>
                  )}
                </div>
                <div className="sg-info">
                  <div className="sg-title">{item.title}</div>
                  <div className="sg-desc">{item.summary || '—'}</div>
                  <div className="sg-tags">
                    {(item.tags || []).slice(0, 4).map((t) => (
                      <span className="sg-tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="sg-pager">
              <div className="sg-pager-meta">
                Showing {pageStart + 1}-{Math.min(pageEnd, filtered.length)} of {filtered.length}
              </div>
              <div className="sg-pager-controls">
                <label htmlFor="page-size" className="sg-pager-meta">
                  Per page
                </label>
                <select
                  id="page-size"
                  className="sg-page-size"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  <option value={24}>24</option>
                  <option value={36}>36</option>
                  <option value={48}>48</option>
                  <option value={72}>72</option>
                </select>
                <button
                  type="button"
                  className="sg-pager-btn"
                  disabled={pageSafe <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </button>
                {pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    className={`sg-pager-btn ${pageNumber === pageSafe ? 'active' : ''}`}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  type="button"
                  className="sg-pager-btn"
                  disabled={pageSafe >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            </div>
          ) : null}

          {items.length > 0 && filtered.length === 0 ? (
            <div style={{ padding: 24, color: 'rgba(255,255,255,0.5)' }}>
              No animations match your search.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

