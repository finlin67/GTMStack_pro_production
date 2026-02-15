'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Search, FileText, ChevronLeft, ChevronRight, Flame, Mail } from 'lucide-react'
import type { WPPost, WPTerm } from '@/lib/wp-client'
import { getPostCategories, fetchPostsWithTotal } from '@/lib/wp-client'
import { getFeaturedImageUrl } from '@/lib/wp-media'

const TEAL = '#00A8A8'
const CYAN = '#36C0CF'
const GOLD = '#FFD700'
const NAVY = '#0A0F2D'
const MIDNIGHT = '#1E2A5E'
const POSTS_PER_PAGE = 9

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: [0, 1, 0.75],
    opacity: [0, 0.6, 0.25],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      times: [0, 0.45, 1] as [number, number, number],
    },
  },
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').trim()
}

function HeroPulseBackground() {
  const reduced = useReducedMotion() ?? false
  if (reduced) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
      <svg viewBox="0 0 1200 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="blogHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={CYAN} stopOpacity="0.55" />
            <stop offset="50%" stopColor={TEAL} stopOpacity="0.5" />
            <stop offset="100%" stopColor={CYAN} stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <g stroke="url(#blogHeroGrad)" strokeWidth="2" fill="none" strokeLinecap="round">
          <motion.path
            d="M 0 120 C 300 90, 600 150, 900 120 C 1100 100, 1200 130, 1200 120"
            variants={pathVariants}
            initial="initial"
            animate="animate"
          />
          <motion.path
            d="M 0 280 C 350 250, 700 310, 1200 280"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{ ...pathVariants.animate.transition, delay: 0.6 }}
          />
          <motion.path
            d="M 0 420 C 400 390, 800 450, 1200 410"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{ ...pathVariants.animate.transition, delay: 1.2 }}
          />
        </g>
      </svg>
    </div>
  )
}

const DEBOUNCE_MS = 400

export type BlogIndexClientProps = {
  initialPosts: WPPost[]
  totalPages: number
  categories: WPTerm[]
  initialQuery: { q?: string; category?: string; tag?: string; page?: string }
  error?: string
}

export default function BlogIndexClient({
  initialPosts,
  totalPages,
  categories,
  initialQuery,
  error,
}: BlogIndexClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchInput, setSearchInput] = useState(initialQuery.q ?? '')
  const gridRef = React.useRef<HTMLDivElement>(null)
  const isGridInView = useInView(gridRef, { once: true, margin: '-50px 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false

  const q = searchParams?.get('q') ?? ''
  const category = searchParams?.get('category') ?? ''
  const pageParam = searchParams?.get('page') ?? '1'
  const currentPage = Math.max(1, parseInt(pageParam, 10) || 1)

  // When URL params differ from server-provided initial (e.g. /blog?q=foo), refetch so first paint shows correct data.
  const [urlDrivenData, setUrlDrivenData] = useState<{ posts: WPPost[]; totalPages: number } | null>(null)
  const initialQ = initialQuery.q ?? ''
  const initialCategory = initialQuery.category ?? ''
  const initialPage = initialQuery.page ?? '1'
  const urlMatchesInitial = q === initialQ && category === initialCategory && pageParam === initialPage

  useEffect(() => {
    if (urlMatchesInitial) {
      setUrlDrivenData(null)
      return
    }
    let cancelled = false
    const categoryId = category ? categories.find((c) => c.slug === category)?.id : undefined
    fetchPostsWithTotal({
      search: q || undefined,
      categoryIds: categoryId != null ? [categoryId] : undefined,
      page: currentPage,
      per_page: POSTS_PER_PAGE,
    })
      .then(({ posts, totalPages }) => {
        if (!cancelled) setUrlDrivenData({ posts, totalPages })
      })
      .catch(() => {
        if (!cancelled) setUrlDrivenData(null)
      })
    return () => {
      cancelled = true
    }
  }, [q, category, pageParam, currentPage, urlMatchesInitial, categories])

  const displayedPosts = urlDrivenData?.posts ?? initialPosts
  const displayedTotalPages = urlDrivenData?.totalPages ?? totalPages

  useEffect(() => {
    setSearchInput(q)
  }, [q])

  const updateUrl = useCallback(
    (updates: { q?: string; category?: string; tag?: string; page?: string }) => {
      const params = new URLSearchParams(searchParams?.toString() ?? '')
      if (updates.q !== undefined) {
        if (updates.q) params.set('q', updates.q)
        else params.delete('q')
      }
      if (updates.category !== undefined) {
        if (updates.category) params.set('category', updates.category)
        else params.delete('category')
      }
      if (updates.tag !== undefined) {
        if (updates.tag) params.set('tag', updates.tag)
        else params.delete('tag')
      }
      if (updates.page !== undefined) {
        const p = String(updates.page)
        if (p === '1') params.delete('page')
        else params.set('page', p)
      }
      const query = params.toString()
      router.replace(query ? `/blog?${query}` : '/blog', { scroll: true })
    },
    [router, searchParams]
  )

  useEffect(() => {
    const t = setTimeout(() => {
      if (searchInput !== q) updateUrl({ q: searchInput || undefined, page: '1' })
    }, DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [searchInput, q, updateUrl])

  const featuredPost = displayedPosts[0] ?? null
  const gridPosts = useMemo(() => {
    if (!featuredPost) return displayedPosts
    return displayedPosts.filter((p) => p.id !== featuredPost.id)
  }, [displayedPosts, featuredPost])

  const formatDate = useCallback((dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }, [])

  const primaryCategory = useCallback((post: WPPost): string => {
    const cats = getPostCategories(post)
    return cats[0]?.name ?? 'Insights'
  }, [])

  const filterPills = useMemo(() => {
    const all = { slug: '', name: 'All Posts' }
    const fromApi = categories.map((c) => ({ slug: c.slug, name: c.name }))
    return [all, ...fromApi]
  }, [categories])

  return (
    <div className="min-h-screen bg-[#0A0F2D] text-white">
      <section
        className="relative overflow-hidden pt-6 pb-5 md:pt-10 md:pb-6"
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, ${MIDNIGHT} 40%, #0d1338 60%, ${NAVY} 100%)`,
        }}
      >
        <HeroPulseBackground />
        <div className="container-width relative z-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm mb-3 text-[#F0F0F0]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#00A8A8] hover:underline focus-visible:underline transition-colors">
              Home
            </Link>
            <span className="text-white/50">/</span>
            <span className="text-white font-medium">Blog</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-white"
            style={{ textShadow: `0 0 30px rgba(54,192,207,0.3)` }}
          >
            Insights That Drive Growth
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-1.5 text-base md:text-lg text-[#E8E8E8] max-w-2xl"
          >
            Tactical guides, teardowns, and frameworks for modern GTM teams. Scale your revenue engine with data-backed strategies.
          </motion.p>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, ${TEAL}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-width py-5 md:py-6">
        {/* Filters + Search */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-5"
        >
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {filterPills.map((opt) => {
              const isActive = opt.slug ? category === opt.slug : !category
              return (
                <motion.button
                  key={opt.slug || 'all'}
                  onClick={() => {
                    updateUrl({ category: opt.slug || undefined, page: '1' })
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive ? 'text-white' : 'bg-[#1E2A5E]/60 border border-white/10 text-[#E8E8E8] hover:border-[#36C0CF]/40'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: TEAL, boxShadow: `0 0 20px ${TEAL}50` }
                      : {}
                  }
                >
                  {opt.name}
                  {isActive && (
                    <motion.span
                      layoutId="filterActive"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ backgroundColor: CYAN, boxShadow: `0 0 8px ${CYAN}` }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
          <div className="relative shrink-0 w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F0F0F0]/60" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search insights..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1E2A5E]/70 border-2 border-white/10 text-white placeholder-[#E8E8E8] focus:outline-none focus:border-[#36C0CF]/60 focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F2D] transition-colors"
              aria-label="Search blog posts"
            />
          </div>
        </motion.div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        {!error && displayedPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border-2 border-white/20 bg-[#1E2A5E]/40 p-12 text-center text-[#F0F0F0]"
          >
            No posts found.
          </motion.div>
        )}

        {displayedPosts.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-8">
            <main className="lg:flex-1 min-w-0">
            {/* Featured Post */}
            {featuredPost && (
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <Link href={`/blog/post?slug=${featuredPost.slug}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      boxShadow: `0 0 40px ${CYAN}30`,
                    }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl overflow-hidden border-2 bg-[#1E2A5E]/50 transition-all duration-300"
                    style={{ borderColor: `${CYAN}50` }}
                  >
                    <div className="aspect-[21/9] md:aspect-[3/1] relative bg-[#0D1540]">
                      {getFeaturedImageUrl(featuredPost) ? (
                        <img
                          src={getFeaturedImageUrl(featuredPost)!}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText className="w-20 h-20 text-[#36C0CF]/30" aria-hidden="true" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F2D] via-[#0A0F2D]/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                        <motion.span
                          animate={shouldReduceMotion ? {} : { opacity: [1, 0.85, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="inline-block px-3 py-1 rounded-lg text-xs font-bold mb-2"
                          style={{
                            backgroundColor: `${GOLD}25`,
                            color: GOLD,
                            borderWidth: 1,
                            borderColor: `${GOLD}50`,
                          }}
                        >
                          Featured
                        </motion.span>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                          {stripHtml(featuredPost.title?.rendered || featuredPost.slug)}
                        </h2>
                        <p className="mt-2 text-[#E8E8E8] text-sm md:text-base line-clamp-2 max-w-3xl">
                          {stripHtml(featuredPost.excerpt?.rendered || '')}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-[#E8E8E8]/90">
                          <span>{formatDate(featuredPost.date)}</span>
                          <span>{primaryCategory(featuredPost)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 md:p-5 flex items-center justify-between bg-[#0D1540]/60">
                      <span className="text-xs text-[#E8E8E8]/80">{primaryCategory(featuredPost)}</span>
                      <span className="inline-flex items-center gap-2 font-semibold text-[#00A8A8] group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.article>
            )}

            {/* Blog Grid */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gridPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isGridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  className="h-full"
                >
                  <Link href={`/blog/post?slug=${post.slug}`}>
                    <motion.div
                      whileHover={{
                        y: -4,
                        scale: 1.02,
                        boxShadow: `0 12px 32px ${CYAN}25`,
                      }}
                      transition={{ duration: 0.2 }}
                      className="h-full rounded-xl overflow-hidden border-2 border-white/[0.08] bg-[#1E2A5E]/50 transition-all duration-300 hover:border-[#36C0CF]/50"
                    >
                      <div className="aspect-video relative bg-[#0D1540]">
                        {getFeaturedImageUrl(post) ? (
                          <img
                            src={getFeaturedImageUrl(post)!}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-14 h-14 text-[#36C0CF]/25" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <span
                          className="inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-2"
                          style={{
                            backgroundColor: `${TEAL}20`,
                            color: TEAL,
                            borderWidth: 1,
                            borderColor: `${TEAL}40`,
                          }}
                        >
                          {primaryCategory(post)}
                        </span>
                        <h3 className="font-bold text-white text-sm line-clamp-2 leading-snug">
                          {stripHtml(post.title?.rendered || post.slug)}
                        </h3>
                        <p className="mt-1.5 text-xs text-[#E8E8E8] line-clamp-2">
                          {stripHtml(post.excerpt?.rendered || '')}
                        </p>
                        <span className="mt-2 block text-[10px] text-[#E8E8E8]/70">
                          {formatDate(post.date)}
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {displayedTotalPages > 1 && (
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 flex items-center justify-center gap-3"
                aria-label="Blog pagination"
              >
                <motion.button
                  onClick={() => updateUrl({ page: String(Math.max(1, currentPage - 1)) })}
                  disabled={currentPage <= 1}
                  whileHover={
                    currentPage > 1 ? { scale: 1.03 } : {}
                  }
                  whileTap={currentPage > 1 ? { scale: 0.98 } : {}}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: currentPage > 1 ? TEAL : '#1E2A5E',
                    color: 'white',
                  }}
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  Previous
                </motion.button>
                <span className="text-[#E8E8E8] text-sm px-4 font-medium">
                  Page {currentPage} of {displayedTotalPages}
                </span>
                <motion.button
                  onClick={() => updateUrl({ page: String(Math.min(displayedTotalPages, currentPage + 1)) })}
                  disabled={currentPage >= displayedTotalPages}
                  whileHover={
                    currentPage < displayedTotalPages ? { scale: 1.03 } : {}
                  }
                  whileTap={currentPage < displayedTotalPages ? { scale: 0.98 } : {}}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: currentPage < displayedTotalPages ? TEAL : '#1E2A5E',
                    color: 'white',
                  }}
                >
                  Next
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </motion.button>
              </motion.nav>
            )}
            </main>

            {/* Sidebar: Trending, Newsletter, Categories (Stitch-style) */}
            <aside className="lg:w-72 shrink-0 space-y-6">
              {/* Trending Now — TODO: replace with view counts if WP or analytics provide */}
              <section className="rounded-2xl border border-white/10 bg-[#1E2A5E]/40 p-4">
                <h3 className="flex items-center gap-2 font-display font-bold text-white mb-3">
                  <Flame className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  Trending Now
                </h3>
                <ol className="space-y-3">
                  {displayedPosts.slice(0, 4).map((p, idx) => (
                    <li key={p.id}>
                      <Link
                        href={`/blog/post?slug=${p.slug}`}
                        className="text-sm font-medium text-white hover:text-[#36C0CF] transition-colors line-clamp-2"
                      >
                        {stripHtml(p.title?.rendered || p.slug)}
                      </Link>
                      <p className="text-xs text-[#E8E8E8]/70 mt-0.5">Recent</p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Get the GTM Weekly — TODO: wire to newsletter signup */}
              <section className="rounded-2xl border border-white/10 bg-[#1E2A5E]/40 p-4">
                <Mail className="w-10 h-10 text-[#36C0CF]/80 mx-auto mb-2 block" aria-hidden="true" />
                <h3 className="font-display font-bold text-white text-center mb-1">Get the GTM Weekly</h3>
                <p className="text-xs text-[#E8E8E8]/80 text-center mb-4">
                  Join growth professionals getting our best tactics every Tuesday.
                </p>
                <form
                  className="space-y-2"
                  onSubmit={(e) => e.preventDefault()}
                  aria-label="Newsletter signup"
                >
                  <input
                    type="email"
                    placeholder="work@email.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0A0F2D]/80 border border-white/10 text-white text-sm placeholder-[#E8E8E8]/50 focus:outline-none focus:border-[#36C0CF]/50"
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl font-semibold text-[#0A0F2D] bg-white hover:bg-white/90 transition-colors"
                  >
                    Subscribe Free
                  </button>
                </form>
                <p className="text-[10px] text-[#E8E8E8]/60 text-center mt-2">No spam. Unsubscribe anytime.</p>
              </section>

              {/* Categories with counts */}
              <section className="rounded-2xl border border-white/10 bg-[#1E2A5E]/40 p-4">
                <h3 className="font-display font-bold text-white mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={category === c.slug ? '/blog' : `/blog?category=${encodeURIComponent(c.slug)}`}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        category === c.slug
                          ? 'text-white'
                          : 'text-[#E8E8E8] hover:text-[#36C0CF] bg-white/5 hover:bg-white/10'
                      }`}
                      style={category === c.slug ? { backgroundColor: TEAL } : {}}
                    >
                      {c.name} {typeof c.count === 'number' ? `(${c.count})` : ''}
                    </Link>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        )}

        {displayedPosts.length > 3 && (
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 pt-6 border-t border-white/10"
            aria-label="Quick links"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#E8E8E8]/70 mb-3">
              Quick Links
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {displayedPosts.slice(0, 5).map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/post?slug=${p.slug}`}
                  className="text-sm text-[#E8E8E8] hover:text-[#00A8A8] transition-colors line-clamp-1"
                >
                  {stripHtml(p.title?.rendered || p.slug)}
                </Link>
              ))}
            </div>
          </motion.aside>
        )}
      </div>
    </div>
  )
}
