'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, FileText, User } from 'lucide-react'
import { fetchPostBySlug, fetchPosts, WPPost } from '@/lib/wp-client'

const TEAL = '#00A8A8'
const CYAN = '#36C0CF'
const GOLD = '#FFD700'
const PURPLE = '#6A4C93'

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: [0, 1, 0.8],
    opacity: [0, 0.2, 0.08],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      times: [0, 0.5, 1] as [number, number, number],
    },
  },
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').trim()
}

function getFeaturedImageUrl(post: WPPost): string | null {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function BlogPostClient() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug') || ''
  const [post, setPost] = useState<WPPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([])
  const contentRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const isBodyInView = useInView(bodyRef, { once: true, margin: '-50px 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false

  useEffect(() => {
    if (!slug) {
      setError('Missing ?slug=')
      setLoading(false)
      return
    }
    ;(async () => {
      try {
        const [postData, allPosts] = await Promise.all([
          fetchPostBySlug(slug),
          fetchPosts(),
        ])
        setPost(postData)
        if (!postData) {
          setError('Post not found')
        } else {
          const related = allPosts
            .filter((p) => p.id !== postData.id)
            .slice(0, 3)
          setRelatedPosts(related)
        }
      } catch (e: unknown) {
        setError((e as Error)?.message || 'Failed to load post')
      } finally {
        setLoading(false)
      }
    })()
  }, [slug])

  useEffect(() => {
    if (!post) return
    const container = contentRef.current
    if (!container) return
    const headings = container.querySelectorAll('h2, h3')
    const items: { id: string; text: string; level: number }[] = []
    headings.forEach((el, i) => {
      const text = el.textContent || ''
      const id = el.id || `heading-${i}`
      if (!el.id) el.id = slugify(text) || id
      items.push({
        id: el.id,
        text,
        level: el.tagName === 'H2' ? 2 : 3,
      })
    })
    setToc(items)
  }, [post])

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

  const inferCategory = useCallback((p: WPPost): string => {
    const text = `${stripHtml(p.title?.rendered || '')} ${stripHtml(p.excerpt?.rendered || '')}`.toLowerCase()
    if (text.includes('abm') || text.includes('account-based')) return 'ABM'
    if (text.includes('revops') || text.includes('revenue ops')) return 'RevOps'
    if (text.includes('demand') || text.includes('pipeline')) return 'Demand'
    if (text.includes('revenue') || text.includes('growth')) return 'Revenue'
    return 'Insights'
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0F2D] text-white">
      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-32">
          <div className="w-10 h-10 border-2 border-[#36C0CF]/40 border-t-[#36C0CF] rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="container-width py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#F0F0F0] hover:text-[#00A8A8] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-6 text-red-200">
            {error}
          </div>
        </div>
      )}

      {!loading && post && (
        <>
          {/* Hero */}
          <section className="relative overflow-hidden">
            <div className="relative aspect-[21/9] md:aspect-[3/1] w-full bg-[#0D1540]">
              {getFeaturedImageUrl(post) ? (
                <img
                  src={getFeaturedImageUrl(post)!}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileText className="w-24 h-24 text-[#36C0CF]/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F2D] via-[#0A0F2D]/60 to-transparent" />
              <div className="absolute inset-0 flex items-end">
                <div className="container-width pb-6 md:pb-10">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-[#F0F0F0] hover:text-[#00A8A8] transition-colors mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                  </Link>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className="inline-block px-3 py-1 rounded-lg text-xs font-bold"
                      style={{ backgroundColor: `${PURPLE}40`, color: '#C4B5FD' }}
                    >
                      {inferCategory(post)}
                    </span>
                    <span
                      className="inline-block px-3 py-1 rounded-lg text-xs font-bold"
                      style={{ backgroundColor: `${GOLD}25`, color: GOLD }}
                    >
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-display font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-white max-w-4xl"
                    style={{
                      textShadow: `0 0 60px rgba(54,192,207,0.4), 0 0 100px rgba(54,192,207,0.2)`,
                    }}
                    dangerouslySetInnerHTML={{ __html: post.title?.rendered || post.slug }}
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-3 text-lg text-[#F0F0F0] max-w-3xl line-clamp-2"
                  >
                    {stripHtml(post.excerpt?.rendered || '')}
                  </motion.p>
                </div>
              </div>
            </div>
            {/* Pulsing path accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
              <motion.div
                className="h-full w-full"
                style={{ background: `linear-gradient(90deg, transparent, ${CYAN}80, transparent)` }}
                animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </section>

          {/* Main content + TOC */}
          <div className="container-width py-6 md:py-10">
            <div className="grid lg:grid-cols-[1fr_240px] gap-8">
              {/* Article body */}
              <div ref={bodyRef} className="min-w-0">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={isBodyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  ref={contentRef}
                  className={`
                    prose prose-invert prose-lg max-w-none
                    prose-headings:font-display prose-headings:font-bold prose-headings:text-white
                    prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:scroll-mt-24
                    prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-24
                    prose-p:text-[#F0F0F0] prose-p:leading-relaxed prose-p:mb-4
                    prose-a:text-[#00A8A8] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white
                    prose-ul:text-[#F0F0F0] prose-ol:text-[#F0F0F0]
                    prose-blockquote:border-l-[#FFD700] prose-blockquote:border-l-4 prose-blockquote:bg-[#1E2A5E]/40 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-[#FFD700] prose-blockquote:italic
                    prose-pre:bg-[#0D1540] prose-pre:border prose-pre:border-[#36C0CF]/40 prose-pre:rounded-xl prose-pre:overflow-x-auto
                    prose-code:text-[#36C0CF] prose-code:bg-[#0D1540]/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                    prose-img:rounded-xl prose-img:border prose-img:border-white/10
                  `}
                  dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }}
                />

                {/* Article content styling */}
                <style jsx global>{`
                  .prose iframe,
                  .prose [data-oembed] iframe {
                    aspect-ratio: 16/9;
                    width: 100%;
                    max-width: 100%;
                    border-radius: 0.75rem;
                    border: 1px solid rgba(54, 192, 207, 0.3);
                  }
                  .prose blockquote {
                    box-shadow: 0 0 30px rgba(255, 215, 0, 0.15);
                  }
                `}</style>
              </div>

              {/* TOC Sidebar */}
              {toc.length > 0 && (
                <motion.aside
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="hidden lg:block"
                >
                  <div className="sticky top-24 rounded-xl border border-white/10 bg-[#1E2A5E]/40 p-5">
                    <h3 className="font-bold text-white text-sm mb-4">On this page</h3>
                    <nav aria-label="Table of contents" className="space-y-2">
                      {toc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block text-sm transition-colors hover:text-[#00A8A8] ${
                            item.level === 3 ? 'pl-4' : ''
                          }`}
                          style={{ color: '#F0F0F0' }}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                </motion.aside>
              )}
            </div>
          </div>

          {/* Author bio */}
          <section className="border-t border-white/10 py-6 md:py-8">
            <div className="container-width">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center gap-4 rounded-xl border border-white/10 bg-[#1E2A5E]/40 p-6"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${TEAL}30` }}
                >
                  <User className="w-7 h-7" style={{ color: TEAL }} />
                </div>
                <div>
                  <h4 className="font-bold text-white">GTMStack.pro</h4>
                  <p className="text-sm text-[#F0F0F0] mt-0.5 max-w-xl">
                    Strategic GTM consulting—ABM, RevOps, demand gen, and revenue scale. 20+ years building predictable growth engines.
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 mt-2 text-sm font-medium hover:underline"
                    style={{ color: TEAL }}
                  >
                    View More from Author
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="py-6 md:py-10 bg-[#080B1E]">
              <div className="container-width">
                <h2 className="font-display font-bold text-2xl text-white mb-6">Related Posts</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedPosts.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Link href={`/blog/post?slug=${p.slug}`}>
                        <motion.div
                          whileHover={{ y: -4, scale: 1.02, boxShadow: `0 12px 40px ${CYAN}30` }}
                          className="rounded-xl overflow-hidden border border-white/10 bg-[#1E2A5E]/50 transition-all duration-300 hover:border-[#36C0CF]/50"
                        >
                          <div className="aspect-video relative bg-[#0D1540]">
                            {getFeaturedImageUrl(p) ? (
                              <img
                                src={getFeaturedImageUrl(p)!}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FileText className="w-12 h-12 text-[#36C0CF]/30" />
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <span
                              className="inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-2"
                              style={{ backgroundColor: `${TEAL}25`, color: TEAL }}
                            >
                              {inferCategory(p)}
                            </span>
                            <h3 className="font-bold text-white text-sm line-clamp-2">
                              {stripHtml(p.title?.rendered || p.slug)}
                            </h3>
                            <p className="mt-1 text-xs text-[#F0F0F0] line-clamp-2">
                              {stripHtml(p.excerpt?.rendered || '')}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA Footer */}
          <section
            className="py-10 md:py-14"
            style={{ background: 'linear-gradient(180deg, #0D1540 0%, #0A0F2D 100%)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="container-width text-center max-w-2xl mx-auto"
            >
              <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-3">
                Ready to discuss this strategy?
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_50px_rgba(0,168,168,0.5)]"
                style={{ backgroundColor: TEAL }}
              >
                Book a Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </section>
        </>
      )}
    </div>
  )
}
