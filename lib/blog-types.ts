/**
 * Normalized blog types for templates and app code.
 * WordPress responses are mapped into these shapes in lib/wordpress.ts.
 */

export interface BlogPostSummary {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  categoryNames: string[]
  tagNames: string[]
  heroImageUrl: string | null
}

export interface BlogPost extends BlogPostSummary {
  content: string
}
