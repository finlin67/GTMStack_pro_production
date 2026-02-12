/**
 * Blog index — server-rendered with WP taxonomy filters and search.
 * WP setup: create categories in WordPress (Posts → Categories) and assign to posts so filter pills and _embed=wp:term work.
 */
import { Suspense } from 'react'
import BlogIndexClient from './BlogIndexClient'
import {
  fetchPostsWithTotal,
  fetchCategories,
} from '@/lib/wordpress'

const POSTS_PER_PAGE = 9

type SearchParams = { q?: string; category?: string; tag?: string; page?: string }

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams
}) {
  const params = await Promise.resolve(searchParams)
  const q = typeof params?.q === 'string' ? params.q : undefined
  const categorySlug = typeof params?.category === 'string' ? params.category : undefined
  const pageParam = typeof params?.page === 'string' ? params.page : '1'
  const page = Math.max(1, parseInt(pageParam, 10) || 1)

  let posts: Awaited<ReturnType<typeof fetchPostsWithTotal>>['posts'] = []
  let totalPages = 1
  let categories: Awaited<ReturnType<typeof fetchCategories>> = []

  try {
    categories = await fetchCategories()
    const categoryId = categorySlug ? categories.find((c) => c.slug === categorySlug)?.id : undefined
    const postsResult = await fetchPostsWithTotal({
      search: q,
      categoryIds: categoryId ? [categoryId] : undefined,
      page,
      per_page: POSTS_PER_PAGE,
    })
    posts = postsResult.posts
    totalPages = postsResult.totalPages
  } catch (e) {
    console.error('Blog fetch error:', e)
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0F2D] flex items-center justify-center">
          <div
            className="w-12 h-12 border-2 border-[#36C0CF]/40 border-t-[#36C0CF] rounded-full animate-spin"
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
        initialQuery={{ q, category: categorySlug, page: pageParam }}
      />
    </Suspense>
  )
}
