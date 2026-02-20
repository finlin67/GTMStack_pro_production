'use client'

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { fetchPostBySlug, fetchPosts, WPPost, getPostCategories } from '@/lib/wp-client'
import { sanitizeHtml } from '@/lib/sanitize-html'
import BlogPostTemplate from '@/src/templates/blog/BlogPostTemplate'

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

  const formatDate = useCallback((dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }, [])

  const primaryCategory = useCallback((p: WPPost): string => {
    const cats = getPostCategories(p)
    return cats[0]?.name ?? 'Insights'
  }, [])

  const displayDate = post ? formatDate(post.date) : ''

  // Build content object for BlogPostTemplate
  const content = useMemo(() => {
    if (!post) return null

    const cats = getPostCategories(post)
    const primaryCat = cats[0]?.name ?? 'Insights'

    return {
      header: {
        logoText: 'GTMStack',
        navLinks: [
          { label: 'Insights', href: '/blog', active: false },
          { label: 'Methodology', href: '/methodology', active: false },
          { label: 'Gallery', href: '/gallery', active: false },
          { label: 'Contact', href: '/contact', active: false },
        ],
      },
      hero: {
        tag: primaryCat,
        title: stripHtml(post.title?.rendered || post.slug),
        highlight: '',
        date: displayDate,
        readTime: '5 min',
        author: 'GTMStack.pro',
      },
      article: {
        summaryTag: 'GTM Insights',
        categoryBadge: primaryCat,
        efficiencyDelta: '+45%',
        efficiencyLabel: 'Performance Gain',
        leadParagraph: stripHtml(post.excerpt?.rendered || ''),
        bodyHtml: sanitizeHtml(post.content?.rendered || ''),
        bodyParagraphs: [],
        quote: '',
        metrics: [
          {
            category: 'Efficiency',
            value: '+45%',
            label: 'Performance Gain',
            description: 'Measured improvement in GTM operations',
            accentColor: 'teal',
          },
          {
            category: 'Scale',
            value: '10x',
            label: 'Revenue Growth',
            description: 'Scalable revenue engine capabilities',
            accentColor: 'cyan',
          },
          {
            category: 'Precision',
            value: '99%',
            label: 'Accuracy Rate',
            description: 'Data-driven decision making',
            accentColor: 'gold',
          },
        ],
      },
      sidebar: {
        telemetry: {
          index: 'Medium',
          actionability: 85,
        },
        cta: {
          title: 'Get Your GTM Audit',
          description: 'Discover hidden revenue opportunities in your go-to-market systems.',
          buttonText: 'Schedule Audit',
        },
        newsletter: {
          title: 'GTM Weekly',
          description: 'Get tactical insights delivered to your inbox every Tuesday.',
          buttonText: 'Subscribe',
        },
        relatedSpecs: relatedPosts.slice(0, 4).map((p) => ({
          title: stripHtml(p.title?.rendered || p.slug),
          category: primaryCategory(p),
          duration: '5 min',
          href: `/blog/post?slug=${p.slug}`,
        })),
      },
    }
  }, [post, displayDate, primaryCategory, relatedPosts])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 min-h-screen bg-[#0A0F2D]" aria-busy="true">
        <div className="w-12 h-12 border-2 border-[#36C0CF]/40 border-t-[#36C0CF] rounded-full animate-spin" aria-hidden="true" />
        <span className="sr-only">Loading post</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0F2D] text-white">
        <div className="container-width py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#E8E8E8] hover:text-[#00A8A8] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Blog
          </Link>
          <div className="rounded-xl border-2 border-red-500/50 bg-red-500/10 p-6 text-red-200" role="alert">
            {error}
          </div>
        </div>
      </div>
    )
  }

  if (!content) return null

  return (
    <BlogPostTemplate content={content} theme="dark" />
  )
}
