import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogStitchPostTemplate from '@/src/templates/blog/BlogStitchPostTemplate'
import HowToPostTemplate from '@/src/templates/blog/HowToPostTemplate'
import InsightPostTemplate from '@/src/templates/blog/InsightPostTemplate'
import { getPostBySlug, getPosts, fetchPostsWithTotal, type WPPost } from '@/lib/wordpress'
import { adaptBlogSinglePostData, adaptHowToPostData, adaptInsightPostData } from '@/lib/blog-adapter'

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

async function getPostAndRelated(slug: string): Promise<{ post: WPPost; relatedPosts: WPPost[] } | null> {
  const post = await getPostBySlug(slug)
  if (!post) return null

  const relatedMap = new Map<number, WPPost>()
  const pushRelated = (items: WPPost[]) => {
    for (const item of items) {
      if (item.id === post.id || relatedMap.has(item.id)) continue
      relatedMap.set(item.id, item)
      if (relatedMap.size >= 4) break
    }
  }

  if (post.categories?.length) {
    const byCategory = await getPosts({
      categoryIds: post.categories,
      per_page: 6,
    })
    pushRelated(byCategory)
  }

  if (relatedMap.size < 4 && post.tags?.length) {
    const byTag = await getPosts({
      tagIds: post.tags,
      per_page: 6,
    })
    pushRelated(byTag)
  }

  if (relatedMap.size < 4) {
    const latest = await getPosts({
      per_page: 8,
    })
    pushRelated(latest)
  }

  return { post, relatedPosts: Array.from(relatedMap.values()).slice(0, 4) }
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const first = await fetchPostsWithTotal({ page: 1, per_page: 100 })
  const all = [...first.posts]

  for (let page = 2; page <= first.totalPages; page += 1) {
    const next = await fetchPostsWithTotal({ page, per_page: 100 })
    all.push(...next.posts)
  }

  return all
    .map((post) => post.slug?.trim())
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Blog Post',
      robots: { index: false, follow: true },
    }
  }

  const title = stripHtml(post.title?.rendered || post.slug)
  const description = stripHtml(post.excerpt?.rendered || post.content?.rendered || '').slice(0, 180)
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/og-default.png'

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${encodeURIComponent(post.slug)}`,
    },
    openGraph: {
      type: 'article',
      url: `/blog/${encodeURIComponent(post.slug)}`,
      title,
      description,
      images: [
        {
          url: featuredImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [featuredImage],
    },
  }
}

export default async function BlogSlugPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const data = await getPostAndRelated(slug)
  if (!data) notFound()

  const { post, relatedPosts } = data
  const layoutType = post.acf?.layout_type

  if (layoutType === 'how-to') {
    return <HowToPostTemplate post={adaptHowToPostData(post, relatedPosts)} />
  }

  if (layoutType === 'insight') {
    return <InsightPostTemplate post={adaptInsightPostData(post, relatedPosts)} />
  }

  return <BlogStitchPostTemplate content={adaptBlogSinglePostData({ post, relatedPosts })} />
}

