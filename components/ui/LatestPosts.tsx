'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
import { fetchLatestPosts, WPPost, getPostCategories } from '@/lib/wp-client'
import { getFeaturedImageUrl } from '@/lib/wp-media'

const TEAL = '#00A8A8'
const CYAN = '#36C0CF'
const GOLD = '#FFD700'

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').trim()
}

function primaryCategory(post: WPPost): string {
  const cats = getPostCategories(post)
  return cats[0]?.name ?? 'Insights'
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export interface LatestPostsProps {
  /** Number of posts to fetch (4–6). Default: 6 */
  limit?: number
  /** Optional section title */
  title?: string
  /** Optional "View all" link href. If provided, shows link. */
  viewAllHref?: string
  /** Optional className for the wrapper */
  className?: string
}

export default function LatestPosts({
  limit = 6,
  title,
  viewAllHref = '/blog',
  className = '',
}: LatestPostsProps) {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: true, margin: '-50px 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false

  useEffect(() => {
    const count = Math.min(6, Math.max(4, limit))
    fetchLatestPosts(count)
      .then(setPosts)
      .catch((e) => setError((e as Error)?.message ?? 'Failed to load posts'))
      .finally(() => setLoading(false))
  }, [limit])

  if (loading) {
    return (
      <section
        className={`rounded-2xl border-2 border-white/10 bg-navy-deep p-8 md:p-10 ${className}`}
        aria-busy="true"
      >
        <div className="flex items-center justify-center py-16">
          <div
            className="w-12 h-12 rounded-full border-2 border-cyan-400/40 border-t-cyan-400 animate-spin"
            aria-hidden="true"
          />
          <span className="sr-only">Loading latest posts</span>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section
        className={`rounded-2xl border-2 border-red-500/30 bg-red-500/5 p-6 md:p-8 ${className}`}
        role="alert"
      >
        <p className="text-red-200 text-sm">{error}</p>
        <Link
          href={viewAllHref}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: TEAL }}
        >
          View blog
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </section>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <section
      ref={gridRef}
      className={`rounded-2xl border-2 border-white/10 bg-navy-deep p-6 md:p-8 ${className}`}
      aria-label="Latest blog posts"
    >
      {(title || viewAllHref) && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          {title && (
            <h2 className="font-display font-bold text-xl md:text-2xl text-white">
              {title}
            </h2>
          )}
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
              style={{ color: TEAL }}
            >
              View all posts
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: shouldReduceMotion ? 0 : i * 0.06,
              duration: 0.35,
            }}
            className="h-full"
          >
            <Link href={`/blog/post?slug=${post.slug}`} className="block h-full">
              <motion.div
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  boxShadow: `0 16px 48px rgba(54,192,207,0.2)`,
                }}
                transition={{ duration: 0.25 }}
                className="h-full rounded-xl overflow-hidden border-2 border-white/[0.08] bg-brand-800/50 transition-all duration-300 hover:border-cyan-400/50"
              >
                <div className="aspect-video relative bg-brand-800">
                  {getFeaturedImageUrl(post) ? (
                    <img
                      src={getFeaturedImageUrl(post)!}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-14 h-14 text-cyan-400/25" aria-hidden="true" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span
                      className="inline-block px-2 py-0.5 rounded text-[10px] font-bold"
                      style={{
                        backgroundColor: `${TEAL}25`,
                        color: TEAL,
                        borderWidth: 1,
                        borderColor: `${TEAL}40`,
                      }}
                    >
                      {primaryCategory(post)}
                    </span>
                    {i === 0 && (
                      <span
                        className="inline-block px-2 py-0.5 rounded text-[10px] font-bold"
                        style={{
                          backgroundColor: `${GOLD}20`,
                          color: GOLD,
                          borderWidth: 1,
                          borderColor: `${GOLD}40`,
                        }}
                      >
                        Latest
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-white text-sm line-clamp-2 leading-snug">
                    {stripHtml(post.title?.rendered || post.slug)}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-200 line-clamp-2">
                    {stripHtml(post.excerpt?.rendered || '')}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-400">
                    <span>{formatDate(post.date)}</span>
                    <span>GTMStack</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
