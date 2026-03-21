'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { WPPost, WPTerm } from '@/lib/wp-client'
import { fetchPostsWithTotal } from '@/lib/wp-client'
import BlogStitchFeedTemplate from '@/src/templates/blog/BlogStitchFeedTemplate'
import { adaptStitchBlogFeedData } from '@/lib/blog-adapter'

const DEBOUNCE_MS = 400
const POSTS_PER_PAGE = 9

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
  error: postsOrCategoriesError,
}: BlogIndexClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchInput, setSearchInput] = useState(initialQuery.q ?? '')
  const q = searchParams?.get('q') ?? ''
  const category = searchParams?.get('category') ?? ''
  const pageParam = searchParams?.get('page') ?? '1'
  const currentPage = Math.max(1, parseInt(pageParam, 10) || 1)

  // Always refetch on mount/query changes so static-exported /blog can still show the latest WP posts.
  const [urlDrivenData, setUrlDrivenData] = useState<{ posts: WPPost[]; totalPages: number } | null>(null)
  const [isRefreshingFromWp, setIsRefreshingFromWp] = useState(false)
  const [hasCompletedInitialWpRefresh, setHasCompletedInitialWpRefresh] = useState(false)
  const [lastWpSyncAt, setLastWpSyncAt] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsRefreshingFromWp(true)
    const categoryId = category ? categories.find((c) => c.slug === category)?.id : undefined
    fetchPostsWithTotal({
      search: q || undefined,
      categoryIds: categoryId != null ? [categoryId] : undefined,
      page: currentPage,
      per_page: POSTS_PER_PAGE,
    })
      .then(({ posts, totalPages }) => {
        if (!cancelled) {
          setUrlDrivenData({ posts, totalPages })
          setLastWpSyncAt(new Date().toISOString())
        }
      })
      .catch(() => {
        if (!cancelled) setUrlDrivenData(null)
      })
      .finally(() => {
        if (!cancelled) {
          setIsRefreshingFromWp(false)
          setHasCompletedInitialWpRefresh(true)
        }
      })
    return () => {
      cancelled = true
    }
  }, [q, category, currentPage, categories])

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

  const stitchFeed = useMemo(() => {
    return adaptStitchBlogFeedData({
      posts: displayedPosts,
      categories,
      selectedCategory: category,
      searchQuery: searchInput,
    })
  }, [displayedPosts, categories, category, searchInput])

  const wpSyncLabel = useMemo(() => {
    if (!lastWpSyncAt) return null
    return new Date(lastWpSyncAt).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }, [lastWpSyncAt])

  return (
    <>
      <BlogStitchFeedTemplate
        data={stitchFeed}
        selectedCategorySlug={category}
        onCategorySelect={(slug) => updateUrl({ category: slug || undefined, page: '1' })}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        error={postsOrCategoriesError}
      />

      {!hasCompletedInitialWpRefresh && isRefreshingFromWp && (
        <div className="pointer-events-none fixed right-4 top-20 z-40 w-44 rounded-lg border border-cyan-300/30 bg-[#0A0F2D]/85 p-3 backdrop-blur-sm">
          <div className="mb-2 h-2 w-24 animate-pulse rounded bg-cyan-300/35" />
          <div className="h-2 w-full animate-pulse rounded bg-cyan-300/20" />
        </div>
      )}

      {wpSyncLabel && (
        <div className="pointer-events-none fixed bottom-3 right-3 z-40 rounded-md border border-cyan-300/25 bg-[#0A0F2D]/80 px-2.5 py-1 text-[11px] text-cyan-200/90 backdrop-blur-sm">
          Last updated from WP: {wpSyncLabel}
        </div>
      )}
    </>
  )
}
