'use client'

import React, { useEffect, useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Search, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import { fetchPosts, WPPost } from '@/lib/wp-client'

const TEAL = '#00A8A8'
const CYAN = '#36C0CF'
const GOLD = '#FFD700'
const PURPLE = '#6A4C93'
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

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'abm', label: 'ABM' },
  { id: 'revops', label: 'RevOps' },
  { id: 'demand', label: 'Demand' },
  { id: 'product', label: 'Product Marketing' },
  { id: 'revenue', label: 'Revenue' },
]

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').trim()
}

function getFeaturedImageUrl(post: WPPost): string | null {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null
}

function matchesFilter(post: WPPost, filterId: string): boolean {
  if (filterId === 'all') return true
  const text = `${stripHtml(post.title?.rendered || '')} ${stripHtml(post.excerpt?.rendered || '')}`.toLowerCase()
  const keywords: Record<string, string[]> = {
    abm: ['abm', 'account-based', 'account based'],
    revops: ['revops', 'revenue ops', 'operations'],
    demand: ['demand', 'lead gen', 'pipeline'],
    product: ['product marketing', 'product-led', 'plg'],
    revenue: ['revenue', 'pipeline', 'growth'],
  }
  const terms = keywords[filterId]
  return terms ? terms.some((t) => text.includes(t)) : true
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

export default function BlogPage() {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const gridRef = React.useRef<HTMLDivElement>(null)
  const isGridInView = useInView(gridRef, { once: true, margin: '-50px 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false

  useEffect(() => {
    ;(async () => {
      try {
        const data = await fetchPosts()
        setPosts(data)
      } catch (e: unknown) {
        setError((e as Error)?.message || 'Failed to load posts')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filteredPosts = useMemo(() => {
    let result = posts.filter((p) => matchesFilter(p, filter))
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          stripHtml(p.title?.rendered || '').toLowerCase().includes(q) ||
          stripHtml(p.excerpt?.rendered || '').toLowerCase().includes(q)
      )
    }
    return result
  }, [posts, filter, searchQuery])

  const featuredPost = filteredPosts[0] ?? null
  const gridPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts
    return filteredPosts.filter((p) => p.id !== featuredPost.id)
  }, [filteredPosts, featuredPost])

  const totalPages = Math.max(1, Math.ceil(gridPosts.length / POSTS_PER_PAGE))
  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE
    return gridPosts.slice(start, start + POSTS_PER_PAGE)
  }, [gridPosts, page])

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  const inferCategory = useCallback((post: WPPost): string => {
    const text = `${stripHtml(post.title?.rendered || '')} ${stripHtml(post.excerpt?.rendered || '')}`.toLowerCase()
    if (text.includes('abm') || text.includes('account-based')) return 'ABM'
    if (text.includes('revops') || text.includes('revenue ops')) return 'RevOps'
    if (text.includes('demand') || text.includes('pipeline')) return 'Demand'
    if (text.includes('product') || text.includes('product-led') || text.includes('plg')) return 'Product'
    if (text.includes('revenue') || text.includes('growth')) return 'Revenue'
    return 'Insights'
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0F2D] text-white">
      {/* ========== HERO ========== */}
      <section
        className="relative overflow-hidden pt-6 pb-5 md:pt-10 md:pb-6"
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, ${MIDNIGHT} 40%, #0d1338 60%, ${NAVY} 100%)`,
        }}
      >
        <HeroPulseBackground />
        <div className="container-width relative z-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm mb-3 text-[#F0F0F0]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#00A8A8] transition-colors">Home</Link>
            <span className="text-white/50">/</span>
            <span className="text-white font-medium">Blog</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-white"
            style={{ textShadow: `0 0 30px rgba(54,192,207,0.3)` }}
          >
            GTM Insights & Strategies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-1.5 text-base md:text-lg text-[#E8E8E8] max-w-2xl"
          >
            Latest thinking on ABM, RevOps, demand gen, product marketing, and revenue scale
          </motion.p>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, ${TEAL}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ========== MAIN CONTENT ========== */}
      <div className="container-width py-5 md:py-6">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-12 h-12 border-2 border-[#36C0CF]/40 border-t-[#36C0CF] rounded-full animate-spin" aria-hidden="true" />
            <span className="sr-only">Loading posts</span>
          </div>
        )}

        {!loading && error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border-2 border-red-500/50 bg-red-500/10 p-6 text-red-200"
            role="alert"
          >
            {error}
          </motion.div>
        )}

        {!loading && !error && posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border-2 border-white/20 bg-[#1E2A5E]/40 p-12 text-center text-[#F0F0F0]"
          >
            No posts yet.
          </motion.div>
        )}

        {!loading && !error && posts.length > 0 && (
          <>
            {/* Filters + Search Row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-5"
            >
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                {FILTER_OPTIONS.map((opt) => (
                  <motion.button
                    key={opt.id}
                    onClick={() => {
                      setFilter(opt.id)
                      setPage(1)
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      filter === opt.id
                        ? 'text-white'
                        : 'bg-[#1E2A5E]/60 border border-white/10 text-[#E8E8E8] hover:border-[#6A4C93]/60'
                    }`}
                    style={
                      filter === opt.id
                        ? { backgroundColor: PURPLE, boxShadow: `0 0 20px ${PURPLE}40` }
                        : {}
                    }
                  >
                    {opt.label}
                    {filter === opt.id && (
                      <motion.span
                        layoutId="filterActive"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                        style={{ backgroundColor: CYAN, boxShadow: `0 0 8px ${CYAN}` }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
              <div className="relative shrink-0 w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F0F0F0]/60" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1E2A5E]/70 border-2 border-white/10 text-white placeholder-[#F0F0F0]/50 focus:outline-none focus:border-[#36C0CF]/60 transition-colors"
                  aria-label="Search blog posts"
                />
              </div>
            </motion.div>

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
                      scale: 1.01,
                      boxShadow: `0 0 50px ${CYAN}35, 0 0 80px ${TEAL}20`,
                    }}
                    transition={{ duration: 0.3 }}
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
                          style={{ backgroundColor: `${GOLD}25`, color: GOLD, borderWidth: 1, borderColor: `${GOLD}50` }}
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
                          <span>GTMStack</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 md:p-5 flex items-center justify-between bg-[#0D1540]/60">
                      <span className="text-xs text-[#E8E8E8]/80">{inferCategory(featuredPost)}</span>
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
              {paginatedPosts.map((post, i) => (
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
                        y: -6,
                        scale: 1.02,
                        boxShadow: `0 16px 48px ${CYAN}25`,
                      }}
                      transition={{ duration: 0.25 }}
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
                        <motion.span
                          animate={shouldReduceMotion ? {} : { opacity: [1, 0.9, 1] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.1 }}
                          className="inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-2"
                          style={{
                            backgroundColor: `${TEAL}20`,
                            color: TEAL,
                            borderWidth: 1,
                            borderColor: `${TEAL}40`,
                          }}
                        >
                          {inferCategory(post)}
                        </motion.span>
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
            {totalPages > 1 && (
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 flex items-center justify-center gap-3"
                aria-label="Blog pagination"
              >
                <motion.button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  whileHover={page > 1 ? { scale: 1.05, boxShadow: `0 0 24px ${TEAL}50` } : {}}
                  whileTap={page > 1 ? { scale: 0.98 } : {}}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: page > 1 ? TEAL : '#1E2A5E',
                    color: 'white',
                  }}
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  Previous
                </motion.button>
                <span className="text-[#E8E8E8] text-sm px-4 font-medium">
                  Page {page} of {totalPages}
                </span>
                <motion.button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  whileHover={page < totalPages ? { scale: 1.05, boxShadow: `0 0 24px ${TEAL}50` } : {}}
                  whileTap={page < totalPages ? { scale: 0.98 } : {}}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: page < totalPages ? TEAL : '#1E2A5E',
                    color: 'white',
                  }}
                >
                  Next
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </motion.button>
              </motion.nav>
            )}

            {/* Compact Latest Posts */}
            {posts.length > 3 && (
              <motion.aside
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 pt-6 border-t border-white/10"
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#E8E8E8]/70 mb-3">
                  Quick Links
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {posts.slice(0, 5).map((p) => (
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
          </>
        )}
      </div>
    </div>
  )
}
