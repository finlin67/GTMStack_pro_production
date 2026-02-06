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
const POSTS_PER_PAGE = 9

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: [0, 1, 0.8],
    opacity: [0, 0.25, 0.1],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      times: [0, 0.5, 1] as [number, number, number],
    },
  },
}

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'abm', label: 'ABM' },
  { id: 'revops', label: 'RevOps' },
  { id: 'demand', label: 'Demand' },
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
    revenue: ['revenue', 'pipeline', 'growth'],
  }
  const terms = keywords[filterId]
  return terms ? terms.some((t) => text.includes(t)) : true
}

function HeroPulseBackground() {
  const reduced = useReducedMotion() ?? false
  if (reduced) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
      <svg viewBox="0 0 1200 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="blogHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={CYAN} stopOpacity="0.5" />
            <stop offset="100%" stopColor={TEAL} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g stroke="url(#blogHeroGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round">
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

  const featuredPost = posts[0]
  const gridPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts
    return filteredPosts.filter((p) => p.id !== featuredPost.id)
  }, [filteredPosts, featuredPost])

  const totalPages = Math.max(1, Math.ceil(gridPosts.length / POSTS_PER_PAGE))
  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE
    return gridPosts.slice(start, start + POSTS_PER_PAGE)
  }, [gridPosts, page])
  const latestPosts = posts.slice(0, 5)

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const inferCategory = useCallback((post: WPPost): string => {
    const text = `${stripHtml(post.title?.rendered || '')} ${stripHtml(post.excerpt?.rendered || '')}`.toLowerCase()
    if (text.includes('abm') || text.includes('account-based')) return 'ABM'
    if (text.includes('revops') || text.includes('revenue ops')) return 'RevOps'
    if (text.includes('demand') || text.includes('pipeline')) return 'Demand'
    if (text.includes('revenue') || text.includes('growth')) return 'Revenue'
    return 'Insights'
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0F2D] text-white">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden pt-10 pb-8 md:pt-14 md:pb-10 bg-gradient-to-b from-[#0A0F2D] via-[#1E2A5E]/80 to-[#0A0F2D]">
        <HeroPulseBackground />
        <div className="container-width relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-4 text-[#F0F0F0]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#00A8A8] transition-colors">Home</Link>
            <span className="text-white/50">/</span>
            <span className="text-white font-medium">Blog</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-white"
          >
            GTM Insights & Strategies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-lg text-[#F0F0F0] max-w-2xl"
          >
            Latest thinking on ABM, RevOps, demand gen, and revenue scale
          </motion.p>
        </div>
      </section>

      {/* ========== MAIN CONTENT ========== */}
      <div className="container-width py-6 md:py-8">
        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          {/* Left: Featured + Grid */}
          <div>
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-2 border-[#36C0CF]/40 border-t-[#36C0CF] rounded-full animate-spin" />
              </div>
            )}

            {!loading && error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-red-500/50 bg-red-500/10 p-6 text-red-200"
              >
                {error}
              </motion.div>
            )}

            {!loading && !error && posts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-white/20 bg-[#1E2A5E]/40 p-10 text-center text-[#F0F0F0]"
              >
                No posts yet.
              </motion.div>
            )}

            {!loading && !error && posts.length > 0 && (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <motion.article
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link href={`/blog/post?slug=${featuredPost.slug}`}>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="rounded-2xl overflow-hidden border-2 border-[#36C0CF]/40 bg-[#1E2A5E]/60 transition-all duration-300 hover:border-[#36C0CF]/70 hover:shadow-[0_0_40px_rgba(54,192,207,0.25)]"
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
                              <FileText className="w-16 h-16 text-[#36C0CF]/40" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F2D] via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <span
                              className="inline-block px-3 py-1 rounded-lg text-xs font-bold mb-2"
                              style={{ backgroundColor: `${GOLD}30`, color: GOLD }}
                            >
                              Featured
                            </span>
                            <h2 className="text-xl md:text-2xl font-bold text-white">
                              {stripHtml(featuredPost.title?.rendered || featuredPost.slug)}
                            </h2>
                            <p className="mt-2 text-[#F0F0F0] text-sm line-clamp-2">
                              {stripHtml(featuredPost.excerpt?.rendered || '')}
                            </p>
                          </div>
                        </div>
                        <div className="p-5 flex items-center justify-between">
                          <span className="text-xs text-[#F0F0F0]/80">
                            {formatDate(featuredPost.date)}
                          </span>
                          <span
                            className="inline-flex items-center gap-2 font-semibold"
                            style={{ color: TEAL }}
                          >
                            Read More
                            <ArrowRight className="w-5 h-5" />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.article>
                )}

                {/* Filters */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {FILTER_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setFilter(opt.id)
                        setPage(1)
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        filter === opt.id
                          ? 'bg-[#6A4C93] text-white'
                          : 'bg-[#1E2A5E]/60 border border-white/10 text-[#F0F0F0] hover:border-[#6A4C93]/60'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>

                {/* Blog Grid */}
                <div ref={gridRef} className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                          whileHover={{ y: -4, scale: 1.02, boxShadow: `0 12px 40px ${CYAN}30` }}
                          className="h-full rounded-xl overflow-hidden border border-white/10 bg-[#1E2A5E]/50 transition-all duration-300 hover:border-[#36C0CF]/50"
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
                                <FileText className="w-12 h-12 text-[#36C0CF]/30" />
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <span
                              className="inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-2"
                              style={{ backgroundColor: `${TEAL}25`, color: TEAL }}
                            >
                              {inferCategory(post)}
                            </span>
                            <h3 className="font-bold text-white text-sm line-clamp-2">
                              {stripHtml(post.title?.rendered || post.slug)}
                            </h3>
                            <p className="mt-1 text-xs text-[#F0F0F0] line-clamp-2">
                              {stripHtml(post.excerpt?.rendered || '')}
                            </p>
                            <span className="mt-2 block text-[10px] text-[#F0F0F0]/70">
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 flex items-center justify-center gap-2"
                  >
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                      style={{
                        backgroundColor: page > 1 ? TEAL : '#1E2A5E',
                        color: 'white',
                      }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <span className="text-[#F0F0F0] text-sm px-4">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                      style={{
                        backgroundColor: page < totalPages ? TEAL : '#1E2A5E',
                        color: 'white',
                      }}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          {!loading && posts.length > 0 && (
            <aside className="space-y-6">
              {/* Search */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F0F0F0]/60" />
                <input
                  type="search"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1E2A5E]/60 border border-white/10 text-white placeholder-[#F0F0F0]/50 focus:outline-none focus:border-[#36C0CF]/50 transition-colors"
                  aria-label="Search blog posts"
                />
              </motion.div>

              {/* Latest Posts */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-xl border border-white/10 bg-[#1E2A5E]/40 p-5"
              >
                <h3 className="font-bold text-white text-sm mb-4">Latest Posts</h3>
                <ul className="space-y-3">
                  {latestPosts.map((p, i) => (
                    <li key={p.id}>
                      <Link
                        href={`/blog/post?slug=${p.slug}`}
                        className="group flex gap-2 text-sm text-[#F0F0F0] hover:text-[#00A8A8] transition-colors"
                      >
                        <span className="text-[#6A4C93] font-medium shrink-0">{i + 1}.</span>
                        <span className="line-clamp-1 group-hover:underline">
                          {stripHtml(p.title?.rendered || p.slug)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-white/10 bg-[#1E2A5E]/40 p-5"
              >
                <h3 className="font-bold text-white text-sm mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {FILTER_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setFilter(opt.id)
                        setPage(1)
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        filter === opt.id
                          ? 'bg-[#6A4C93] text-white'
                          : 'bg-[#0A0F2D]/80 text-[#F0F0F0] border border-white/10 hover:border-[#6A4C93]/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
