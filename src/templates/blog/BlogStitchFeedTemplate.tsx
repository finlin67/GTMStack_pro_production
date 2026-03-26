'use client'

import Link from 'next/link'
import {
  ArrowRight,
  ExternalLink,
  LayoutGrid,
  Rocket,
  Search,
  TrendingUp,
  User,
} from 'lucide-react'
import type {
  StitchBlogFeedContent,
  StitchFeaturedLargeCard,
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

function GridPostCard({ post }: { post: StitchPostCard }) {
  const img = post.imageUrl
  return (
    <Link
      href={post.href}
      className={`group block overflow-hidden rounded-xl bg-white shadow-[0_20px_40px_rgba(13,33,55,0.25)] transition-all duration-300 hover:-translate-y-2 ${post.borderBottomClass}`}
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
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#112B46] to-[#0D2137] text-sm text-white/70">
            No image
          </div>
        )}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${post.categoryBadgeClass}`}
        >
          {post.categoryName}
        </span>
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-tighter text-slate-400">
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{post.readTimeLabel}</span>
        </div>
        <h3 className="mb-3 font-display text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-[#6FAFE0]">
          {post.title}
        </h3>
        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
            <User className="h-4 w-4 text-[#6FAFE0]" aria-hidden />
          </div>
          <span className="text-xs font-semibold text-slate-900">{post.authorName}</span>
        </div>
      </div>
    </Link>
  )
}

function FeaturedLargeCard({ post }: { post: StitchFeaturedLargeCard }) {
  const img = post.imageUrl
  return (
    <Link
      href={post.href}
      className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_40px_rgba(13,33,55,0.25)] transition-all duration-300 hover:-translate-y-2 ${post.bottomBorderClass}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
        {img ? (
          <img
            src={img}
            alt={post.imageAlt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#112B46] to-[#0D2137] text-slate-300">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <span
          className={`absolute left-6 top-6 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${post.ribbonClass}`}
        >
          {post.ribbonLabel}
        </span>
      </div>
      <div className="flex flex-grow flex-col p-10">
        <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
          <span>{post.editionMeta}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{post.secondaryMeta}</span>
        </div>
        <h3 className="mb-5 font-display text-3xl font-bold leading-tight text-slate-900">{post.title}</h3>
        <p className="mb-8 text-lg leading-relaxed text-slate-600">{post.excerptLong}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <User className="h-7 w-7 text-[#6FAFE0]" aria-hidden />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-900">{post.authorName}</span>
              <span className="block text-[10px] uppercase tracking-widest text-slate-400">
                {post.authorSubtitle}
              </span>
            </div>
          </div>
          <ArrowRight
            className="h-6 w-6 text-slate-300 transition-all group-hover:translate-x-2 group-hover:text-[#6FAFE0]"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  )
}

/**
 * Blog index — layout and tokens from sandbox/stitch-html/blog.html (hero, sticky filters, 8+4 grid, featured row, promos).
 * Nav/footer come from root layout. Data from WordPress via `adaptStitchBlogFeedData`.
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

  return (
    <div className="min-h-screen bg-[#f6f7f8] font-sans text-slate-900">
      {error ? (
        <div className="border-b border-amber-500/40 bg-amber-500/10 px-6 py-3 text-center text-sm text-amber-900">
          {error}
        </div>
      ) : null}

      {/* Hero — stitch: deep navy, centered gradient title */}
      <section className="relative flex h-[min(380px,70vh)] items-center justify-center overflow-hidden bg-[#112B46] px-6 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(111, 175, 224, 0.15) 0%, transparent 70%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(111, 175, 224, 0.1) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6FAFE0]/5 blur-[120px]" />
        <div className="relative z-10 max-w-4xl">
          <h1 className="mb-8 font-display text-6xl font-bold leading-none tracking-tight md:text-8xl">
            <span
              className="bg-gradient-to-r from-[#6FAFE0] to-[#F9C74F] bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {hero.titleGradient}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-[#6FAFE0] opacity-90 md:text-2xl">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* Sticky category pills + search — stitch bar */}
      <section className="sticky top-[84px] z-40 border-y border-slate-200 bg-[#f6f7f8]/90 px-8 py-4 backdrop-blur-md md:top-[100px] lg:top-[112px]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          {/* Category pills row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              {categoryPills.map((pill) => {
                const active =
                  pill.slug === '' ? !selectedCategorySlug : selectedCategorySlug === pill.slug
                return (
                  <button
                    key={pill.slug || 'all'}
                    type="button"
                    onClick={() => onCategorySelect(pill.slug)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-[#6FAFE0] text-white'
                        : 'font-medium text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {pill.label}
                  </button>
                )
              })}
            </div>
            <div className="relative w-full md:w-auto">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                type="search"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search insights..."
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-6 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6FAFE0]/20 md:w-64"
              />
            </div>
          </div>

          {/* Tag pills row — shown only when WP tags are available */}
          {tagPills.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tags:</span>
              {tagPills.map((pill) => {
                const active =
                  pill.slug === '' ? !selectedTagSlug : selectedTagSlug === pill.slug
                return (
                  <button
                    key={pill.slug || 'all-tags'}
                    type="button"
                    onClick={() => onTagSelect(pill.slug)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                      active
                        ? 'border-[#F9C74F] bg-[#F9C74F] text-[#0D2137]'
                        : 'border-slate-200 text-slate-500 hover:border-[#F9C74F]/60 hover:text-slate-800'
                    }`}
                  >
                    #{pill.label.replace(/^#/, '')}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Main grid + sidebar */}
      <section className="relative overflow-hidden bg-[#f6f7f8] py-16 pl-8 pr-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(111, 175, 224, 0.1) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:col-span-8">
            {grid.length === 0 ? (
              <p className="col-span-full rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500">
                No posts match your filters yet.
              </p>
            ) : (
              grid.map((p) => <GridPostCard key={p.id} post={p} />)
            )}
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <div className="lg:sticky lg:top-[188px] lg:space-y-8">
              <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <h4 className="mb-6 flex items-center gap-2 text-[14px] font-bold uppercase tracking-widest text-[#0D2137]">
                  <span className="h-2 w-2 rounded-full bg-[#6FAFE0]" aria-hidden />
                  Trending Topics
                </h4>
                <div className="flex flex-col gap-3">
                  {sidebar.trendingTags.map((t) => (
                    <button
                      key={t.slug}
                      type="button"
                      onClick={() => onTagSelect(t.slug)}
                      className={`group flex cursor-pointer items-center justify-between rounded-xl border px-6 py-5 text-base font-bold shadow-sm transition-all ${
                        selectedTagSlug === t.slug
                          ? 'border-transparent bg-[#6FAFE0] text-white'
                          : 'border-slate-50 bg-slate-100 text-slate-800 hover:border-transparent hover:bg-[#6FAFE0] hover:text-white'
                      }`}
                    >
                      {t.label}
                      <TrendingUp className="h-5 w-5 opacity-40 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-[#0D2137] p-8">
                <div
                  className="pointer-events-none absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 2px 2px, rgba(111, 175, 224, 0.1) 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div className="relative z-10">
                  <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6FAFE0]">
                    Recommended Tool
                  </span>
                  <h3 className="mb-4 font-display text-2xl font-bold text-white">Flight Assessment Tool</h3>
                  <p className="mb-8 text-sm leading-relaxed text-white/70">
                    Audit your GTM readiness with our custom technical scorecard. Identify friction points in under 10
                    minutes.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full rounded-lg bg-[#6FAFE0] py-3 text-center text-sm font-bold text-white transition-transform hover:scale-105"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              <div className="rounded-xl border border-white/50 bg-white/85 p-8 shadow-lg backdrop-blur-md">
                <div className="mb-6 flex items-center gap-4">
                  {sidebar.authorImage ? (
                    <img
                      src={sidebar.authorImage}
                      alt=""
                      className="h-16 w-16 rounded-xl object-cover grayscale"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100">
                      <User className="h-8 w-8 text-[#6FAFE0]" aria-hidden />
                    </div>
                  )}
                  <div>
                    <h4 className="font-display font-bold text-[#0D2137]">{sidebar.authorName}</h4>
                    <p className="text-xs text-slate-500">{sidebar.authorRole}</p>
                  </div>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-slate-600">{sidebar.authorBio}</p>
                <a
                  href={sidebar.linkedInHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-[#6FAFE0]"
                >
                  Connect on LinkedIn
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Featured large — stitch second section */}
      {featuredLarge.length > 0 ? (
        <section className="bg-[#f6f7f8] py-20">
          <div className="mx-auto max-w-7xl px-8">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              {featuredLarge.map((p) => (
                <FeaturedLargeCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Built for Fun — stitch promo band */}
      <section className="border-t border-white/5 bg-[#0D2137] px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-white md:text-5xl">
              Built for Fun. Shipped for Real.
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-[#6FAFE0]" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Link
              href="/contact"
              className="group cursor-pointer rounded-2xl border border-white/5 bg-[rgba(17,43,70,0.6)] p-10 backdrop-blur-md transition-all hover:bg-[#112B46]"
            >
              <div className="mb-8">
                <Rocket className="h-10 w-10 text-[#F9C74F]" aria-hidden />
              </div>
              <h3 className="mb-4 font-display text-2xl font-bold text-white">Flight Assessment Tool</h3>
              <p className="mb-8 leading-relaxed text-slate-400">
                A custom interactive dashboard that measures GTM operational maturity across 48 critical benchmarks.
              </p>
              <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider text-[#6FAFE0]">
                Explore Tool <ExternalLink className="h-4 w-4" aria-hidden />
              </div>
            </Link>
            <Link
              href="/resume"
              className="group cursor-pointer rounded-2xl border border-white/5 bg-[rgba(17,43,70,0.6)] p-10 backdrop-blur-md transition-all hover:bg-[#112B46]"
            >
              <div className="mb-8">
                <LayoutGrid className="h-10 w-10 text-[#6FAFE0]" aria-hidden />
              </div>
              <h3 className="mb-4 font-display text-2xl font-bold text-white">Resume CV Theme Park</h3>
              <p className="mb-8 leading-relaxed text-slate-400">
                A highly opinionated, design-forward UI kit for GTM leaders and technical architects shipping in public.
              </p>
              <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider text-[#6FAFE0]">
                View Demo <ExternalLink className="h-4 w-4" aria-hidden />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — stitch glass card */}
      <section className="flex justify-center bg-[#0D2137] px-8 pb-32 pt-16 text-center">
        <div className="relative max-w-3xl overflow-hidden rounded-3xl border border-white/5 bg-[rgba(17,43,70,0.6)] p-12 shadow-[0_20px_40px_rgba(13,33,55,0.25)] backdrop-blur-md md:p-20">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#6FAFE0]/10 to-transparent" />
          <h2 className="relative z-10 mb-8 font-display text-3xl font-bold leading-tight text-white md:text-5xl">
            Ready to Optimize Your Revenue Engine?
          </h2>
          <p className="relative z-10 mx-auto mb-12 max-w-xl text-lg leading-relaxed text-[#6FAFE0] opacity-80">
            Share what you&apos;re working on—we can compare notes and point you to the right next step.
          </p>
          <div className="relative z-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-lg bg-[#6FAFE0] px-10 py-4 text-lg font-bold text-white shadow-[0_10px_30px_rgba(111,175,224,0.2)] transition-transform hover:scale-105"
            >
              Contact
            </Link>
            <Link
              href="/resume"
              className="rounded-lg border border-white/20 px-10 py-4 text-lg font-bold text-white transition-all hover:bg-white/10"
            >
              View Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
