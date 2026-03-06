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

export type WPPost = {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  date: string
  categories?: number[]
  tags?: number[]
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string
      alt_text?: string
    }>
    /** [categories[], tags[]] — order per WP: first categories, then post_tag */
    'wp:term'?: [WPTerm[], WPTerm[]]
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
  const base = (raw ?? 'https://m.gtmstack.pro/wp-json/wp/v2')
    .replace(/\r/g, '')
    .trim()
    .replace(/\/+$/, '')
  return base
}

/**
 * GET /posts with optional search, categories, tags, pagination.
 * _embed=1 includes wp:featuredmedia and wp:term (categories + tags).
 */
export async function fetchPosts(params: FetchPostsParams = {}): Promise<WPPost[]> {
  const { search, categoryIds, tagIds, page = 1, per_page = 10 } = params
  const url = new URL(`${getBaseUrl()}/posts`)
  url.searchParams.set('per_page', String(per_page))
  url.searchParams.set('page', String(page))
  url.searchParams.set('_embed', '1')
  if (search?.trim()) url.searchParams.set('search', search.trim())
  if (categoryIds?.length) url.searchParams.set('categories', categoryIds.join(','))
  if (tagIds?.length) url.searchParams.set('tags', tagIds.join(','))

  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`)
  return await parseJsonResponse<WPPost[]>(res, 'Failed to parse posts response')
}

/**
 * Fetch posts for index: returns list and total pages (from X-WP-TotalPages header).
 */
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

  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`)
  const posts = await parseJsonResponse<WPPost[]>(res, 'Failed to parse posts response')
  const totalPages = Math.max(1, parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10))
  return { posts, totalPages }
}

export async function fetchLatestPosts(perPage = 6): Promise<WPPost[]> {
  const url = `${getBaseUrl()}/posts?per_page=${perPage}&_embed=1`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`)
  return await parseJsonResponse<WPPost[]>(res, 'Failed to parse latest posts response')
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const url = `${getBaseUrl()}/posts?slug=${encodeURIComponent(slug)}&_embed=1&context=view`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`)
  const posts = await parseJsonResponse<WPPost[]>(res, 'Failed to parse post response')
  const post = posts[0] ?? null
  if (post && typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
    const contentLen = post.content?.rendered?.length ?? 0
    const excerptLen = post.excerpt?.rendered?.length ?? 0
    // eslint-disable-next-line no-console
    console.log('[wp-client fetchPostBySlug]', { slug, contentLen, excerptLen })
  }
  return post
}

/** GET /categories — for filter pills and slug→id mapping */
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

/** GET /tags — for filter pills and slug→id mapping */
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

/** Get category terms for a post from _embedded['wp:term'] */
export function getPostCategories(post: WPPost): WPTerm[] {
  const terms = post._embedded?.['wp:term']
  if (!terms || !Array.isArray(terms)) return []
  const first = terms[0]
  return Array.isArray(first) ? first : []
}

/** Get tag terms for a post from _embedded['wp:term'] */
export function getPostTags(post: WPPost): WPTerm[] {
  const terms = post._embedded?.['wp:term']
  if (!terms || !Array.isArray(terms) || terms.length < 2) return []
  const second = terms[1]
  return Array.isArray(second) ? second : []
}
