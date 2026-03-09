import type { WPPost } from './wp-client'

/**
 * Safe helper to read the featured image URL from a WP post.
 * Relies on `_embed=1` so that `_embedded['wp:featuredmedia'][0].source_url` is present.
 */
export function getFeaturedImageUrl(post: WPPost | null | undefined): string | null {
  if (!post) return null
  const media = (post as WPPost)._embedded?.['wp:featuredmedia']
  const url = media?.[0]?.source_url
  return typeof url === 'string' && url.trim().length > 0 ? url : null
}

