'use client'

import Link from 'next/link'
import { Search, ChevronDown } from 'lucide-react'
import type {
  StitchBlogFeedContent,
  StitchPostCard,
} from '@/lib/blog-adapter'

export type BlogStitchFeedTemplateProps = {
  data: StitchBlogFeedContent
  selectedCategorySlug: string
  onCategorySelect: (slug: string) => void
  selectedTagSlug: string
  onTagSelect: (slug: string) => void
  searchValue: string
  onSearchChange: (value: string) => void
  error?: string
}

// Maps a category name to a Tailwind badge class pair (bg + text)
const CATEGORY_BADGE: Record<string, string> = {
  systems: 'bg-blue-50 text-blue-600',
  execution: 'bg-amber-50 text-amber-600',
  strategy: 'bg-emerald-50 text-emerald-600',
  demand: 'bg-indigo-50 text-indigo-600',
}

function categoryBadge(name: string) {
  const key = name.toLowerCase().replace(/\s+/g, '-')
  return CATEGORY_BADGE[key] ?? 'bg-blue-50 text-blue-600'
}

// Arrow icon shared by both post card variants
function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
  )
}

// Featured post — full-width with 21:9 hero image
function FeaturedPost({ post }: { post: StitchPostCard }) {
  return (
    <article className="group">
      <div className="mb-6 aspect-[21/9] overflow-hidden rounded-2xl bg-slate-100">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.imageAlt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0A1628] to-[#154360] text-sm text-slate-400">
            No image
          </div>
        )}
      </div>
      <div className="space-y-4">
        <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
          {post.categoryName}
        </span>
        <h2 className="font-display text-4xl leading-tight text-slate-900 transition-colors group-hover:text-[#0d5cab]">
          <Link href={post.href} className="focus:outline-none">
            {post.title}
          </Link>
        </h2>
        <p className="max-w-3xl text-base font-light text-slate-500">{post.excerpt}</p>
        <div className="flex items-center gap-6 pt-2">
          <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
            {post.date}&nbsp;•&nbsp;{post.readTimeLabel}
          </span>
          <Link href={post.href} className="group/link flex items-center gap-1 text-sm font-bold text-[#0d5cab]">
            Read Full Blueprint
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  )
}

// Secondary post — horizontal image + content layout
function SecondaryPost({ post }: { post: StitchPostCard }) {
  return (
    <article className="group">
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 md:w-2/5">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.imageAlt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0A1628] to-[#154360] text-sm text-slate-400">
              No image
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center py-2">
          <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {post.categoryName}
          </span>
          <h3 className="mb-4 font-display text-3xl leading-tight text-slate-900 transition-colors group-hover:text-[#0d5cab]">
            <Link href={post.href} className="focus:outline-none">
              {post.title}
            </Link>
          </h3>
          <p className="mb-6 text-base font-light text-slate-500">{post.excerpt}</p>
          <div className="flex items-center gap-6">
            <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
              {post.date}&nbsp;•&nbsp;{post.readTimeLabel}
            </span>
            <Link href={post.href} className="group/link flex items-center gap-1 text-sm font-bold text-[#0d5cab]">
              Read Article
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * Blog index — layout and visual tokens from sandbox/stitch-html/blog.html.
 * Nav/footer are injected by root layout.tsx. Data comes from WordPress via
 * `adaptStitchBlogFeedData` → `BlogIndexClient`.
 */
export default function BlogStitchFeedTemplate({
  data,
  selectedCategorySlug,
  onCategorySelect,
  selectedTagSlug,
  onTagSelect,
  searchValue,
  onSearchChange,
  error,
}: BlogStitchFeedTemplateProps) {
  const { hero, grid, featuredLarge, categoryPills, tagPills, sidebar } = data

  // All posts for the Editor's Picks sidebar list
  const allPosts: StitchPostCard[] = [...grid, ...featuredLarge]
  const featuredPost = grid[0]
  const secondaryPosts = grid.slice(1)

  return (
    <div className="min-h-screen bg-[#f4f6f8] font-sans text-slate-900 antialiased">
      {error && (
        <div className="border-b border-amber-500/40 bg-amber-500/10 px-6 py-3 text-center text-sm text-amber-900">
          {error}
        </div>
      )}

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] to-[#154360] px-8 pb-32 pt-20">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="mb-6 block text-xs font-medium uppercase tracking-[0.2em] text-[#FFDB58]">
              The Strategic Architect&apos;s Journal
            </span>
            <h1 className="mb-8 font-display text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">
              Precision Engineering for B2B SaaS Growth.
            </h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-slate-300 md:text-xl">
              {hero.subtitle}
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 top-0 h-[600px] w-[600px] rounded-full bg-[#0d5cab]/20 blur-[120px]" />
      </section>

      {/* ── Category / Search filter bar ─────────────────────────────────── */}
      <section className="relative z-30 mx-auto -mt-8 max-w-7xl px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-full border border-slate-100 bg-white px-6 py-3 shadow-lg md:flex-row">
          {/* Category pills */}
          <div className="flex w-full items-center gap-2 overflow-x-auto md:w-auto" style={{ scrollbarWidth: 'none' }}>
            {categoryPills.map((pill) => {
              const active = pill.slug === '' ? !selectedCategorySlug : selectedCategorySlug === pill.slug
              return (
                <button
                  key={pill.slug || 'all'}
                  type="button"
                  onClick={() => onCategorySelect(pill.slug)}
                  className={`whitespace-nowrap rounded-full px-5 py-2 text-sm transition-all ${
                    active
                      ? 'bg-[#0d5cab] font-semibold text-white shadow-md'
                      : 'font-medium text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pill.label}
                </button>
              )
            })}
          </div>

          {/* Search */}
          <div className="group relative w-full md:w-72">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#0d5cab]"
              aria-hidden
            />
            <input
              className="w-full rounded-full border-none bg-slate-50 py-2 pl-11 pr-6 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#0d5cab]/20"
              placeholder="Search the archives..."
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ── Main grid + sidebar ───────────────────────────────────────────── */}
      <section className="mx-auto mb-32 mt-16 max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

          {/* Left column — posts */}
          <div className="space-y-20 lg:col-span-8">
            {/* No results */}
            {grid.length === 0 && (
              <p className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
                No posts match your filters yet.
              </p>
            )}

            {/* Featured post */}
            {featuredPost && <FeaturedPost post={featuredPost} />}

            {/* Dividers + secondary posts */}
            {secondaryPosts.map((post, idx) => (
              <div key={post.id}>
                <div className="mb-20 w-full border-t border-slate-200" />
                <SecondaryPost post={post} />
              </div>
            ))}

            {/* Load more */}
            {grid.length > 0 && (
              <div className="mt-16 flex justify-center">
                <button type="button" className="group flex flex-col items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#0d5cab]/20 transition-all group-hover:border-[#0d5cab] group-hover:bg-[#0d5cab]">
                    <ChevronDown className="h-5 w-5 text-[#0d5cab] transition-colors group-hover:text-white" aria-hidden />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-slate-900">
                    Load More Articles
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Right column — sidebar */}
          <aside className="hidden space-y-8 lg:col-span-4 lg:block">
            <div className="sticky top-32 space-y-8">

              {/* Terminal: Editor's Picks */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between border-b border-slate-50 pb-3">
                  <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#0d5cab]" />
                    Terminal: Editor&apos;s Picks
                  </h4>
                  <span className="font-mono text-[9px] text-slate-300">v.2.4.0</span>
                </div>
                <div
                  className="max-h-[360px] space-y-4 overflow-y-auto pr-2"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#e2e8f0 transparent' }}
                >
                  {allPosts.slice(0, 8).map((post, idx) => (
                    <Link
                      key={post.id}
                      href={post.href}
                      className="group block rounded-xl p-2 transition-all hover:bg-slate-50"
                    >
                      <div className="mb-1 flex gap-2">
                        <span className={`rounded px-2 py-0.5 text-[8px] font-bold uppercase tracking-tighter ${categoryBadge(post.categoryName)}`}>
                          {post.categoryName}
                        </span>
                        <span className="font-mono text-[9px] text-slate-300">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h5 className="line-clamp-2 text-xs leading-tight text-slate-900 transition-colors group-hover:text-[#0d5cab]">
                        {post.title}
                      </h5>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Semantic Index */}
              {(categoryPills.length > 1 || tagPills.length > 0) && (
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h4 className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Semantic Index
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Top categories as larger links */}
                    {categoryPills.filter((p) => p.slug).slice(0, 2).map((pill) => (
                      <button
                        key={pill.slug}
                        type="button"
                        onClick={() => onCategorySelect(pill.slug)}
                        className="text-lg font-bold text-[#0d5cab] hover:underline"
                      >
                        {pill.label}
                      </button>
                    ))}
                    {/* Tag pills at varying weights */}
                    {tagPills.filter((p) => p.slug).slice(0, 8).map((pill, idx) => {
                      const styles = [
                        'text-xs font-medium text-slate-400',
                        'text-base font-semibold text-slate-700',
                        'text-sm font-medium text-slate-500',
                        'text-xs font-medium text-slate-400',
                        'text-lg font-bold text-slate-900',
                        'text-sm font-medium text-slate-500',
                        'text-base font-semibold text-[#0d5cab]/80',
                        'text-xs font-medium text-slate-400',
                      ]
                      return (
                        <button
                          key={pill.slug}
                          type="button"
                          onClick={() => onTagSelect(pill.slug)}
                          className={`transition-colors hover:text-[#0d5cab] ${styles[idx % styles.length]}`}
                        >
                          {pill.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* CTA block */}
              <div className="group relative overflow-hidden rounded-3xl bg-[#0047AB] p-8 shadow-xl shadow-blue-500/20">
                <div className="relative z-10">
                  <h4 className="mb-3 font-display text-xl font-bold text-white">Marketing Assessment Tool</h4>
                  <p className="mb-6 text-sm font-medium leading-relaxed text-blue-100">
                    Quantify Your GTM Stack: Start Assessment Now
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full rounded-xl bg-white py-3 text-center text-xs font-bold uppercase tracking-widest text-[#0047AB] shadow-lg transition-all hover:bg-slate-100 active:scale-[0.98]"
                  >
                    Launch Terminal
                  </Link>
                </div>
                <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />
              </div>

              {/* Expert Contributors */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Expert Contributors
                </h4>
                <div className="space-y-4">
                  <div className="flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-all hover:bg-white">
                    {sidebar.authorImage ? (
                      <img
                        src={sidebar.authorImage}
                        alt={sidebar.authorName}
                        className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-slate-200">
                        <span className="text-[10px] font-bold text-slate-500">
                          {sidebar.authorName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <h5 className="text-[11px] text-slate-900">{sidebar.authorName}</h5>
                      <p className="font-mono text-[9px] uppercase tracking-tighter text-slate-400">
                        {sidebar.authorRole}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Newsletter CTA ─────────────────────────────────────────────────── */}
      <section className="relative mx-auto mb-32 max-w-7xl overflow-hidden rounded-3xl bg-[#0A1628] px-8 py-24">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-display text-4xl font-bold text-white">Master the SaaS Architecture.</h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-slate-400">
            Join 15,000+ Founders and GTM Leaders receiving our weekly tactical blueprint for scaling enterprise revenue.
          </p>
          <form className="mx-auto flex max-w-lg flex-col gap-4 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              className="flex-grow rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[#FFDB58]/50"
              placeholder="professional@company.com"
              type="email"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-full bg-[#FFDB58] px-10 py-4 text-sm font-bold tracking-tight text-[#0A1628] transition-all hover:shadow-lg active:scale-95"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-6 text-[10px] uppercase tracking-widest text-slate-500">Tactical insights only. No fluff.</p>
        </div>
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#0d5cab]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#FFDB58]/5 blur-2xl" />
      </section>
    </div>
  )
}
