/**
 * Blog index — server-rendered with WP taxonomy filters and search.
 * WP setup: create categories in WordPress (Posts → Categories) and assign to posts so filter pills and _embed=wp:term work.
 */
import type { Metadata } from 'next'
import { Suspense } from 'react'
import BlogIndexClient from './BlogIndexClient'
import {
  fetchPostsWithTotal,
  fetchCategories,
  fetchTags,
} from '@/lib/wordpress'

const POSTS_PER_PAGE = 9

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Field notes on B2B go-to-market: demand generation, marketing operations, revenue systems, ABM, and practitioner-level GTM thinking.',
  openGraph: {
    title: 'GTM Blog | GTMStack.pro',
    description:
      'Field notes on B2B go-to-market: demand generation, marketing operations, revenue systems, ABM, and practitioner-level GTM thinking.',
  },
}

export default async function BlogPage() {
  // Static export: do not read searchParams here so /blog can be prerendered.
  // BlogIndexClient uses useSearchParams() for q/category/page and refetches when URL differs.
  const q: string | undefined = undefined
  const categorySlug: string | undefined = undefined
  const pageParam = '1'
  const page = 1

  let posts: Awaited<ReturnType<typeof fetchPostsWithTotal>>['posts'] = []
  let totalPages = 1
  let categories: Awaited<ReturnType<typeof fetchCategories>> = []
  let tags: Awaited<ReturnType<typeof fetchTags>> = []
  let categoriesError: string | undefined
  let postsError: string | undefined

  // Fetch categories first; surface errors but don't block posts.
  try {
    categories = await fetchCategories()
  } catch (e) {
    console.error('Blog categories fetch error:', e)
    categories = []
    categoriesError =
      e instanceof Error ? e.message : 'Failed to load blog categories'
  }

  // Fetch tags (best-effort; filter UI degrades gracefully if missing).
  try {
    tags = await fetchTags()
  } catch (e) {
    console.error('Blog tags fetch error:', e)
    tags = []
  }

  // Fetch posts with optional category filter.
  try {
    const categoryId = categorySlug
      ? categories.find((c) => c.slug === categorySlug)?.id
      : undefined
    const postsResult = await fetchPostsWithTotal({
      search: q,
      categoryIds: categoryId ? [categoryId] : undefined,
      page,
      per_page: POSTS_PER_PAGE,
    })
    posts = postsResult.posts
    totalPages = postsResult.totalPages
  } catch (e) {
    console.error('Blog posts fetch error:', e)
    postsError = e instanceof Error ? e.message : 'Failed to load blog posts'
  }

  const errorMessage =
    postsError && categoriesError
      ? `Posts: ${postsError} — Categories: ${categoriesError}`
      : postsError || categoriesError

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
          <div
            className="w-12 h-12 border-2 border-[#4A86D8]/40 border-t-[#4A86D8] rounded-full animate-spin"
            aria-hidden="true"
          />
          <span className="sr-only">Loading blog</span>
        </div>
      }
    >
      <BlogIndexClient
        initialPosts={posts}
        totalPages={totalPages}
        categories={categories}
        tags={tags}
        initialQuery={{ q, category: categorySlug, page: pageParam }}
        error={errorMessage}
      />
    </Suspense>
  )
}
