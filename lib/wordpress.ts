/**
 * WordPress REST API v2 — server-side only (uses WORDPRESS_API_URL).
 * Use for Server Components and API routes. For client, use lib/wp-client.ts.
 * Fetches use next.revalidate for ISR; ensure categories/posts are set up in WP.
 */

import type { WPPost, WPTerm, FetchPostsParams } from './wp-client'
import type { BlogPostSummary, BlogPost } from './blog-types'

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

/** Map WP post to normalized BlogPostSummary for list/feed. */
export function mapWpPostToBlogPostSummary(wp: WPPost): BlogPostSummary {
  const terms = wp._embedded?.['wp:term']
  const categories = terms?.[0] ?? []
  const tags = terms?.[1] ?? []
  const media = wp._embedded?.['wp:featuredmedia']?.[0]
  return {
    id: wp.id,
    slug: wp.slug,
    title: wp.title?.rendered ? stripHtml(wp.title.rendered) : '',
    excerpt: wp.excerpt?.rendered ? stripHtml(wp.excerpt.rendered) : '',
    date: wp.date ?? '',
    author: 'Staff',
    categoryNames: categories.map((c: { name?: string }) => c.name ?? '').filter(Boolean),
    tagNames: tags.map((t: { name?: string }) => t.name ?? '').filter(Boolean),
    heroImageUrl: media?.source_url ?? null,
  }
}

/** Map WP post to normalized BlogPost for detail. */
export function mapWpPostToBlogPost(wp: WPPost): BlogPost {
  const summary = mapWpPostToBlogPostSummary(wp)
  const content = wp.content?.rendered ?? ''
  return { ...summary, content }
}

async function parseJsonResponse<T>(res: Response, context: string): Promise<T> {
  const raw = await res.text()
  if (!raw.trim()) {
    throw new Error(`${context}: empty JSON response body`)
  }
  try {
    return JSON.parse(raw) as T
  } catch {
    throw new Error(`${context}: invalid JSON response`)
  }
}

function getBaseUrl(): string {
  const raw = process.env.WORDPRESS_API_URL ?? process.env.NEXT_PUBLIC_WORDPRESS_API_URL
  if (!raw) throw new Error('Missing WORDPRESS_API_URL (or NEXT_PUBLIC_WORDPRESS_API_URL) env var')

  // Normalize and ensure we point at the WP REST API root.
  // Accepted inputs:
  // - Site root:              https://example.com
  // - API root:               https://example.com/wp-json/wp/v2
  // - Partial API roots:      https://example.com/wp-json or .../wp-json/wp
  let base = raw.replace(/\r/g, '').trim().replace(/\/+$/, '')
  if (!base.startsWith('http')) throw new Error('WORDPRESS_API_URL must start with http(s)')
  if (base.endsWith('/wp-json/wp/v2')) {
    // Already pointing at the v2 REST root.
  } else if (base.endsWith('/wp-json/wp')) {
    base = `${base}/v2`
  } else if (base.endsWith('/wp-json')) {
    base = `${base}/wp/v2`
  } else {
    // Treat as site root (or some non-API path); append full REST prefix.
    base = `${base}/wp-json/wp/v2`
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[wordpress:getBaseUrl] resolved base URL:', base)
  }

  return base
}

export type { WPPost, WPTerm, FetchPostsParams, BlogPostSummary, BlogPost }

export async function fetchPostsWithTotal(
  params: FetchPostsParams = {}
): Promise<{ posts: WPPost[]; totalPages: number }> {
  const { search, categoryIds, tagIds, page = 1, per_page = 10 } = params
  const url = new URL(`${getBaseUrl()}/posts`)
  url.searchParams.set('per_page', String(per_page))
  url.searchParams.set('page', String(page))
  url.searchParams.set('_embed', '1')
  if (search?.trim()) url.searchParams.set('search', search.trim())
  if (categoryIds?.length) url.searchParams.set('categories', categoryIds.join(','))
  if (tagIds?.length) url.searchParams.set('tags', tagIds.join(','))

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[wordpress:fetchPostsWithTotal] URL:', url.toString())
  }

  const res = await fetch(url.toString(), { next: { revalidate: 60 } })
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[wordpress:fetchPostsWithTotal] status:', res.status, 'x-total-pages:', res.headers.get('X-WP-TotalPages'))
  }
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to fetch posts: ${res.status} ${text.slice(0, 200)}`)
  }
  const posts = await parseJsonResponse<WPPost[]>(res, 'Failed to parse posts response')
  const totalPages = Math.max(1, parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10))
  return { posts, totalPages }
}

export async function fetchCategories(): Promise<WPTerm[]> {
  const url = `${getBaseUrl()}/categories?per_page=100&orderby=count&order=desc`
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[wordpress:fetchCategories] URL:', url)
  }

  const res = await fetch(url, { next: { revalidate: 60 } })
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[wordpress:fetchCategories] status:', res.status)
  }
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`)
  const data = await parseJsonResponse<Array<{ id: number; name: string; slug: string; count: number }>>(
    res,
    'Failed to parse categories response'
  )
  return data.map((c) => ({ id: c.id, name: c.name, slug: c.slug, taxonomy: 'category', count: c.count }))
}

export async function fetchTags(): Promise<WPTerm[]> {
  const url = `${getBaseUrl()}/tags?per_page=100&orderby=count&order=desc`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Failed to fetch tags: ${res.status}`)
  const data = await parseJsonResponse<Array<{ id: number; name: string; slug: string; count: number }>>(
    res,
    'Failed to parse tags response'
  )
  return data.map((t) => ({ id: t.id, name: t.name, slug: t.slug, taxonomy: 'post_tag', count: t.count }))
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const url = `${getBaseUrl()}/posts?slug=${encodeURIComponent(slug)}&_embed=1&context=view`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Failed to fetch post: ${res.status} ${text.slice(0, 200)}`)
  }
  const posts = await parseJsonResponse<WPPost[]>(res, 'Failed to parse post response')
  return posts[0] ?? null
}

/** Fetch posts and return normalized BlogPostSummary[] with totalPages (ISR). */
export async function fetchBlogPostsWithTotal(
  params: FetchPostsParams = {}
): Promise<{ posts: BlogPostSummary[]; totalPages: number }> {
  const { posts, totalPages } = await fetchPostsWithTotal(params)
  return { posts: posts.map(mapWpPostToBlogPostSummary), totalPages }
}

/** Fetch single post by slug as normalized BlogPost (ISR). */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const wp = await getPostBySlug(slug)
  return wp ? mapWpPostToBlogPost(wp) : null
}

export async function getPosts(params: FetchPostsParams = {}): Promise<WPPost[]> {
  const { posts } = await fetchPostsWithTotal(params)
  return posts
}
