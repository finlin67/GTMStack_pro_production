import type { WPAcfArticleFields } from '@/src/types/blog'

/**
 * WordPress REST API v2 client (browser + server).
 * Uses NEXT_PUBLIC_WORDPRESS_API_URL (client) or WORDPRESS_API_URL (server).
 * WP setup: ensure categories/tags exist; _embed=1 includes featured media and wp:term.
 */

export type WPTerm = {
  id: number
  name: string
  slug: string
  taxonomy: string
  count?: number
}

export type WPAuthor = {
  name?: string
  description?: string
  avatar_urls?: Record<string, string>
}

export type WPPost = {
  id: number
  slug: string
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  categories?: number[]
  tags?: number[]
  acf?: WPAcfArticleFields
  _embedded?: {
    author?: WPAuthor[]
    'wp:featuredmedia'?: Array<{
      source_url?: string
      alt_text?: string
    }>
    'wp:term'?: Array<Array<{ id?: number; name?: string; slug?: string }>>
  }
}

export type FetchPostsParams = {
  search?: string
  categoryIds?: number[]
  tagIds?: number[]
  page?: number
  per_page?: number
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
  const raw =
    typeof window !== 'undefined'
      ? process.env.NEXT_PUBLIC_WORDPRESS_API_URL
      : process.env.WORDPRESS_API_URL ?? process.env.NEXT_PUBLIC_WORDPRESS_API_URL

  if (!raw) {
    throw new Error(
      'WORDPRESS_API_URL is not configured. Set WORDPRESS_API_URL (server) or NEXT_PUBLIC_WORDPRESS_API_URL (client) in your environment.'
    )
  }

  let base = raw.replace(/\r/g, '').trim().replace(/\/+$/, '')

  if (!base.startsWith('http')) {
    throw new Error('WORDPRESS_API_URL must start with http(s)')
  }

  if (base.endsWith('/wp-json/wp/v2')) {
    return base
  }
  if (base.endsWith('/wp-json/wp')) {
    return `${base}/v2`
  }
  if (base.endsWith('/wp-json')) {
    return `${base}/wp/v2`
  }
  return `${base}/wp-json/wp/v2`
}

export async function fetchPosts(params: FetchPostsParams = {}): Promise<WPPost[]> {
  const { search, categoryIds, tagIds, page = 1, per_page = 10 } = params
  const url = new URL(`${getBaseUrl()}/posts`)
  url.searchParams.set('per_page', String(per_page))
  url.searchParams.set('page', String(page))
  url.searchParams.set('_embed', '1')
  if (search?.trim()) url.searchParams.set('search', search.trim())
  if (categoryIds?.length) url.searchParams.set('categories', categoryIds.join(','))
  if (tagIds?.length) url.searchParams.set('tags', tagIds.join(','))

  let res: Response
  try {
    res = await fetch(url.toString(), { cache: 'no-store' })
  } catch (err) {
    throw new Error(`WordPress fetch failed (network error): ${err instanceof Error ? err.message : String(err)}`)
  }
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`)
  return await parseJsonResponse<WPPost[]>(res, 'Failed to parse posts response')
}

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

  let res: Response
  try {
    res = await fetch(url.toString(), { cache: 'no-store' })
  } catch (err) {
    throw new Error(`WordPress fetch failed (network error): ${err instanceof Error ? err.message : String(err)}`)
  }
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`)
  const posts = await parseJsonResponse<WPPost[]>(res, 'Failed to parse posts response')
  const totalPages = Math.max(1, parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10))
  return { posts, totalPages }
}

export async function fetchLatestPosts(perPage = 6): Promise<WPPost[]> {
  const url = `${getBaseUrl()}/posts?per_page=${perPage}&_embed=1`
  let res: Response
  try {
    res = await fetch(url, { cache: 'no-store' })
  } catch (err) {
    throw new Error(`WordPress fetch failed (network error): ${err instanceof Error ? err.message : String(err)}`)
  }
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`)
  return await parseJsonResponse<WPPost[]>(res, 'Failed to parse latest posts response')
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const url = `${getBaseUrl()}/posts?slug=${encodeURIComponent(slug)}&_embed=1&context=view`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`)
  const posts = await parseJsonResponse<WPPost[]>(res, 'Failed to parse post response')
  return posts[0] ?? null
}

export async function fetchCategories(): Promise<WPTerm[]> {
  const url = `${getBaseUrl()}/categories?per_page=100&orderby=count&order=desc`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`)
  const data = await parseJsonResponse<Array<{ id: number; name: string; slug: string; count: number }>>(
    res,
    'Failed to parse categories response'
  )
  return data.map((c) => ({ id: c.id, name: c.name, slug: c.slug, taxonomy: 'category', count: c.count }))
}

export async function fetchTags(): Promise<WPTerm[]> {
  const url = `${getBaseUrl()}/tags?per_page=100&orderby=count&order=desc`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch tags: ${res.status}`)
  const data = await parseJsonResponse<Array<{ id: number; name: string; slug: string; count: number }>>(
    res,
    'Failed to parse tags response'
  )
  return data.map((t) => ({ id: t.id, name: t.name, slug: t.slug, taxonomy: 'post_tag', count: t.count }))
}

export function getPostCategories(post: WPPost): WPTerm[] {
  const terms = post._embedded?.['wp:term']
  if (!terms || !Array.isArray(terms)) return []
  const first = terms[0]
  if (!Array.isArray(first)) return []
  return first
    .filter((item): item is { id?: number; name?: string; slug?: string } => Boolean(item))
    .map((item) => ({
      id: item.id ?? 0,
      name: item.name ?? '',
      slug: item.slug ?? '',
      taxonomy: 'category',
    }))
    .filter((item) => item.id > 0 || item.name.length > 0 || item.slug.length > 0)
}

export function getPostTags(post: WPPost): WPTerm[] {
  const terms = post._embedded?.['wp:term']
  if (!terms || !Array.isArray(terms) || terms.length < 2) return []
  const second = terms[1]
  if (!Array.isArray(second)) return []
  return second
    .filter((item): item is { id?: number; name?: string; slug?: string } => Boolean(item))
    .map((item) => ({
      id: item.id ?? 0,
      name: item.name ?? '',
      slug: item.slug ?? '',
      taxonomy: 'post_tag',
    }))
    .filter((item) => item.id > 0 || item.name.length > 0 || item.slug.length > 0)
}

export function getEmbeddedAuthor(post: WPPost): WPAuthor | null {
  return post._embedded?.author?.[0] ?? null
}

export function getAuthorAvatarUrl(author: WPAuthor | null | undefined): string | undefined {
  if (!author?.avatar_urls) return undefined
  return (
    author.avatar_urls['96'] ||
    author.avatar_urls['48'] ||
    author.avatar_urls['24'] ||
    Object.values(author.avatar_urls)[0]
  )
}

export function estimateReadTimeMinutesFromHtml(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  if (!text) return 1
  const words = text.split(' ').filter(Boolean).length
  return Math.max(1, Math.ceil(words / 225))
}
