'use client'

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { fetchPostBySlug, fetchPosts, WPPost, getPostCategories } from '@/lib/wp-client'
import { sanitizeHtml } from '@/lib/sanitize-html'
import BlogStitchPostTemplate from '@/src/templates/blog/BlogStitchPostTemplate'
import HowToPostTemplate from '@/src/templates/blog/HowToPostTemplate'
import InsightPostTemplate from '@/src/templates/blog/InsightPostTemplate'
import { adaptBlogSinglePostData, adaptHowToPostData, adaptInsightPostData } from '@/lib/blog-adapter'

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').trim()
}

export default function BlogPostClient() {
  const searchParams = useSearchParams()
  const slug = searchParams?.get('slug') || ''
  const [post, setPost] = useState<WPPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!slug) {
      setError('Missing ?slug=')
      setLoading(false)
      return
    }
    ;(async () => {
      try {
        const postData = await fetchPostBySlug(slug)
        if (postData && process.env.NODE_ENV !== 'production') {
          const contentLen = postData.content?.rendered?.length ?? 0
          const excerptLen = postData.excerpt?.rendered?.length ?? 0
          const sanitizedLen = contentLen ? sanitizeHtml(postData.content?.rendered || '').length : 0
          // eslint-disable-next-line no-console
          console.log('[BlogPostClient] content.rendered length:', contentLen, 'excerpt:', excerptLen, 'sanitized length:', sanitizedLen)
        }
        setPost(postData)
        if (!postData) {
          setError('Post not found')
        } else {
          // Related posts by same category (WP taxonomy); fallback to latest if no categories
          const categoryIds = postData.categories?.length
            ? postData.categories
            : undefined
          const relatedResult = await fetchPosts({
            categoryIds,
            per_page: 5,
          })
          const related = relatedResult
            .filter((p) => p.id !== postData.id)
            .slice(0, 4)
          setRelatedPosts(related)
        }
      } catch (e: unknown) {
        setError((e as Error)?.message || 'Failed to load post')
      } finally {
        setLoading(false)
      }
    })()
  }, [slug])

  // Adapt WP data to new template props
  const adaptedContent = useMemo(() => {
    if (!post) return null
    return adaptBlogSinglePostData({
      post,
      relatedPosts,
    })
  }, [post, relatedPosts])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 min-h-screen bg-white dark:bg-[#020617]" aria-busy="true">
        <div className="w-12 h-12 border-2 border-blue-400/40 border-t-blue-600 rounded-full animate-spin" aria-hidden="true" />
        <span className="sr-only">Loading post</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-white">
        <div className="container-width py-12 px-6 lg:px-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Insights
          </Link>
          <div className="rounded-xl border-2 border-red-500/50 bg-red-500/10 p-6 text-red-700 dark:text-red-200" role="alert">
            {error}
          </div>
        </div>
      </div>
    )
  }

  if (!adaptedContent) return null

  const layoutType = post?.acf?.layout_type

  if (layoutType === 'how-to' && post) {
    return <HowToPostTemplate post={adaptHowToPostData(post, relatedPosts)} />
  }

  if (layoutType === 'insight' && post) {
    return <InsightPostTemplate post={adaptInsightPostData(post, relatedPosts)} />
  }

  return <BlogStitchPostTemplate content={adaptedContent} />
}
