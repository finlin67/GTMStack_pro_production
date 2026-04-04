import { NextResponse } from 'next/server'
import { fetchPostsWithTotal, mapWpPostToBlogPostSummary } from '@/lib/wordpress'

export const revalidate = 300 // cache for 5 minutes

export async function GET() {
  try {
    const { posts } = await fetchPostsWithTotal({ per_page: 3 })
    const summaries = posts.map(mapWpPostToBlogPostSummary).map((p) => ({
      slug: p.slug,
      title: p.title,
      categoryNames: p.categoryNames.slice(0, 1),
      date: p.date,
    }))
    return NextResponse.json(summaries)
  } catch {
    // If WP is unreachable, return empty array — panel degrades gracefully
    return NextResponse.json([])
  }
}
