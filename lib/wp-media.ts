import type { WPPost } from './wp-client'

/**
 * Local fallback shown when a post has no featured image (featured_media === 0 or
 * _embedded['wp:featuredmedia'] is absent). Avoids depending on third-party placeholder services.
 */
export const BLOG_FALLBACK_IMAGE = '/images/heroes/_placeholder.webp'

/**
 * Safe helper to read the featured image URL from a WP post.
 * Relies on `_embed=1` so that `_embedded['wp:featuredmedia'][0].source_url` is present.
 * Returns null (not the fallback) so callers can choose their own fallback rendering.
 */
export function getFeaturedImageUrl(post: WPPost | null | undefined): string | null {
  if (!post) return null
  const media = (post as WPPost)._embedded?.['wp:featuredmedia']
  const url = media?.[0]?.source_url
  return typeof url === 'string' && url.trim().length > 0 ? url : null
}

