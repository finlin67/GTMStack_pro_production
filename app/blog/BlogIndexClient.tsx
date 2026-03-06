'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Search, FileText, ChevronLeft, ChevronRight, Flame, Mail } from 'lucide-react'
import type { WPPost, WPTerm } from '@/lib/wp-client'
import { getPostCategories, fetchPostsWithTotal } from '@/lib/wp-client'
import { getFeaturedImageUrl } from '@/lib/wp-media'
import Uploaded_BlogFeed_v1 from '@/src/templates/Uploaded_BlogFeed_v1'
import { adaptBlogFeedData } from '@/lib/blog-adapter'

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

  // Adapt WP data to new template props
  const adaptedContent = useMemo(() => {
    return adaptBlogFeedData({
      posts: displayedPosts,
      categories,
      selectedCategory: category,
      searchQuery: searchInput,
    })
  }, [displayedPosts, categories, category, searchInput])

  return (
    <Uploaded_BlogFeed_v1 
      content={adaptedContent}
    />
  )
}
