'use client'

import Link from 'next/link'
import type { StitchBlogFeedContent, StitchPostCard } from '@/lib/blog-adapter'

export type BlogStitchFeedTemplateProps = {
  data: StitchBlogFeedContent
  selectedCategorySlug: string
  onCategorySelect: (slug: string) => void
  searchValue: string
  onSearchChange: (value: string) => void
  error?: string
}

function PostCard({ post, large }: { post: StitchPostCard; large?: boolean }) {
  const img = post.imageUrl
  return (
    <Link
      href={post.href}
      className={`group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl ${large ? '' : ''}`}
    >
      <div className="relative aspect-video overflow-hidden bg-slate-200">
        {img ? (
          <img
            src={img}
            alt={post.imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1e3a5f] to-[#0a122a] text-sm text-white/70">
            No image
          </div>
        )}
        <div
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${post.categoryBadgeClass}`}
        >
          {post.categoryName}
        </div>
      </div>
      <div className="p-6">
        {post.tagNames.length > 0 ? (
          <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            {post.tagNames.slice(0, 3).map((t) => (
              <span key={t} className="text-[#2563eb]">
                #{t}
              </span>
            ))}
          </div>
        ) : null}
        <h3
          className={`font-display mb-3 font-bold text-[#0f172a] transition-colors group-hover:text-[#2563eb] ${large ? 'text-xl md:text-2xl' : 'text-xl'}`}
        >
          {post.title}
        </h3>
        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <span>{post.readTimeLabel}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{post.date}</span>
        </div>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2563eb]">
          Read more <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}

/**
 * Blog index — visual language from sandbox/stitch-html/blog.html (hero, featured row, filters, grid).
 * Data comes from WordPress via `adaptStitchBlogFeedData` (`_embed=1` for images, categories, tags, author).
 */
export default function BlogStitchFeedTemplate({
  data,
  selectedCategorySlug,
  onCategorySelect,
  searchValue,
  onSearchChange,
  error,
}: BlogStitchFeedTemplateProps) {
  const { hero, featured, grid, categoryPills, sidebar } = data

  return (
    <div className="min-h-screen bg-[#0a122a] font-sans text-[#dbe1ff]">
      {error ? (
        <div className="border-b border-amber-500/40 bg-amber-500/10 px-6 py-3 text-center text-sm text-amber-100">
          {error}
        </div>
      ) : null}

      {/* Hero — stitch “GTM Insights” */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1628] to-[#1e2a3c] pb-24 pt-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(180, 197, 255, 0.12) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(circle at 20% 30%, rgba(255, 219, 88, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(22, 163, 74, 0.1) 0%, transparent 40%), radial-gradient(circle at 50% 80%, rgba(46, 124, 246, 0.15) 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-8 lg:grid-cols-[2fr_1fr]">
          <div className="max-w-2xl">
            <span className="mb-1 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#4a86d8]">
              {hero.kicker}
            </span>
            <h1 className="mb-2 font-display text-5xl font-extrabold leading-[1.05] tracking-tight lg:text-7xl">
              <span
                className="bg-gradient-to-r from-[#6FAFE0] to-[#F9C74F] bg-clip-text text-transparent"
                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {hero.titleGradient}
              </span>
            </h1>
            <p className="text-lg leading-tight text-[#D1DDE8]">{hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Featured — first 3 posts */}
      {featured.length > 0 ? (
        <section className="bg-white py-24 text-[#0f172a]">
          <div className="mx-auto max-w-7xl px-8">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="font-display text-4xl font-extrabold tracking-tight">
                Featured Insights{' '}
                <span className="text-[#2563eb]">That Moved the Needle</span>
              </h2>
              <div className="mx-8 hidden h-px flex-1 bg-slate-200 md:block" />
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {featured.map((p) => (
                <PostCard key={p.id} post={p} large />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Filters + grid + sidebar */}
      <section className="bg-[#F8FAFC] py-12">
        <div className="mx-auto max-w-7xl px-8">
          <div className="sticky top-20 z-40 mb-12 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 p-2 shadow-sm backdrop-blur-md">
            {categoryPills.map((pill) => {
              const active =
                pill.slug === ''
                  ? !selectedCategorySlug
                  : selectedCategorySlug === pill.slug
              return (
                <button
                  key={pill.slug || 'all'}
                  type="button"
                  onClick={() => onCategorySelect(pill.slug)}
                  className={`rounded-xl px-6 py-2 text-sm font-bold transition-all ${
                    active
                      ? 'bg-[#2563eb] text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {pill.label}
                </button>
              )
            })}
            <div className="ml-auto flex min-w-[200px] flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 md:max-w-xs">
              <span className="text-slate-400">⌕</span>
              <input
                type="search"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search insights…"
                className="w-full border-0 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
            <div className="grid gap-8 md:grid-cols-2">
              {grid.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>

            <aside className="h-fit space-y-8 lg:sticky lg:top-32">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#171e37] p-8 text-[#dbe1ff] shadow-xl">
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-12 translate-x-12 rounded-full bg-[#2563eb]/10 blur-3xl" />
                <div className="relative z-10">
                  {sidebar.authorImage ? (
                    <div className="mb-4 h-16 w-16 overflow-hidden rounded-full border-2 border-[#2563eb]/30">
                      <img
                        src={sidebar.authorImage}
                        alt=""
                        className="h-full w-full object-cover grayscale"
                      />
                    </div>
                  ) : null}
                  <h5 className="font-display mb-1 text-xl font-bold">{sidebar.authorName}</h5>
                  <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#b4c5ff]">
                    {sidebar.authorRole}
                  </p>
                  <p className="mb-6 text-sm leading-relaxed text-[#c3c6d7]">{sidebar.authorBio}</p>
                  <a
                    href={sidebar.linkedInHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#dbe1ff] hover:text-white"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              <div>
                <h6 className="mb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Trending Now
                </h6>
                <div className="space-y-6 px-4">
                  {sidebar.trending.map((t) => (
                    <Link key={t.href} href={t.href} className="group block">
                      <div className={`mb-1 text-[10px] font-bold uppercase tracking-widest ${t.accentClass}`}>
                        {t.rank}
                      </div>
                      <p className="text-sm font-bold leading-snug text-slate-800 transition-colors group-hover:text-[#2563eb]">
                        {t.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

    </div>
  )
}
