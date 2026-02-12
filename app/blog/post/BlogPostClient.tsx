'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, FileText, MessageSquare, User } from 'lucide-react'
import { fetchPostBySlug, fetchPosts, WPPost, getPostCategories } from '@/lib/wp-client'
import { getFeaturedImageUrl } from '@/lib/wp-media'
import { sanitizeHtml } from '@/lib/sanitize-html'

const TEAL = '#00A8A8'
const CYAN = '#36C0CF'
const GOLD = '#FFD700'
const PURPLE = '#6A4C93'
const NAVY = '#0A0F2D'
const MIDNIGHT = '#1E2A5E'

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').trim()
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
  const shouldReduceMotion = useReducedMotion() ?? false

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

  const primaryCategory = useCallback((p: WPPost): string => {
    const cats = getPostCategories(p)
    return cats[0]?.name ?? 'Insights'
  }, [])

  const displayDate = post ? formatDate(post.date) : ''

  return (
    <div className="min-h-screen bg-[#0A0F2D] text-white">
      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-32" aria-busy="true">
          <div className="w-12 h-12 border-2 border-[#36C0CF]/40 border-t-[#36C0CF] rounded-full animate-spin" aria-hidden="true" />
          <span className="sr-only">Loading post</span>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
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
                  <FileText className="w-24 h-24 text-[#36C0CF]/25" aria-hidden="true" />
                </div>
              )}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, #0A0F2D 0%, rgba(10,15,45,0.92) 15%, transparent 50%), linear-gradient(to right, rgba(10,15,45,0.5) 0%, transparent 30%)',
                }}
              />
              <div className="absolute inset-0 flex items-end">
                <div className="container-width pb-5 md:pb-8">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-xs md:text-sm text-[#E8E8E8] hover:text-[#00A8A8] transition-colors mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    Back to Blog
                  </Link>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className="inline-block px-3 py-1 rounded-lg text-xs font-bold"
                      style={{ backgroundColor: `${PURPLE}50`, color: '#C4B5FD' }}
                    >
                      {primaryCategory(post)}
                    </span>
                    <motion.span
                      animate={shouldReduceMotion ? {} : { opacity: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block px-3 py-1 rounded-lg text-xs font-bold"
                      style={{ backgroundColor: `${GOLD}25`, color: GOLD, borderWidth: 1, borderColor: `${GOLD}40` }}
                    >
                      {displayDate}
                    </motion.span>
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold text-[#E8E8E8]/90">
                      GTMStack
                    </span>
                  </div>
                  <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-display font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl tracking-tight text-white max-w-4xl leading-tight"
                    style={{
                      textShadow: `0 0 40px rgba(54,192,207,0.5), 0 0 80px rgba(54,192,207,0.25)`,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(post.title?.rendered || post.slug),
                    }}
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-2 md:mt-3 text-base md:text-lg text-[#E8E8E8] max-w-3xl line-clamp-2"
                  >
                    {stripHtml(post.excerpt?.rendered || '')}
                  </motion.p>
                </div>
              </div>
            </div>
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, ${TEAL}, transparent)` }}
              animate={shouldReduceMotion ? {} : { opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </section>

          {/* TOC Top (mobile) */}
          {toc.length > 0 && (
            <nav
              aria-label="Table of contents"
              className="lg:hidden border-b border-white/10 py-3 overflow-x-auto"
            >
              <div className="container-width flex gap-2 min-w-max pb-1">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium text-[#E8E8E8] hover:text-[#00A8A8] hover:bg-[#1E2A5E]/60 transition-colors"
                  >
                    {item.text}
                  </a>
                ))}
              </div>
            </nav>
          )}

          {/* Main content + TOC sidebar */}
          <div className="container-width py-5 md:py-8">
            <div className="grid lg:grid-cols-[1fr_220px] gap-6 lg:gap-8">
              {/* Article body */}
              <div ref={bodyRef} className="min-w-0">
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  ref={contentRef}
                  className={`
                    prose prose-invert prose-lg max-w-none
                    prose-headings:font-display prose-headings:font-bold prose-headings:text-white prose-headings:scroll-mt-28
                    prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:lg:text-[1.75rem] prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-1
                    prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-[#E8E8E8] prose-p:leading-[1.7] prose-p:mb-4 prose-p:text-[15px] md:prose-p:text-base
                    prose-a:text-[#00A8A8] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                    prose-strong:text-white prose-strong:font-semibold
                    prose-ul:text-[#E8E8E8] prose-ol:text-[#E8E8E8] prose-li:my-1
                    prose-blockquote:border-l-4 prose-blockquote:border-[#FFD700] prose-blockquote:bg-[#1E2A5E]/50 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:text-[#FFD700] prose-blockquote:italic prose-blockquote:font-medium prose-blockquote:shadow-[0_0_30px_rgba(255,215,0,0.15)]
                    prose-pre:bg-[#0D1540] prose-pre:border-2 prose-pre:border-[#36C0CF]/50 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:shadow-[0_0_20px_rgba(54,192,207,0.1)]
                    prose-code:text-[#36C0CF] prose-code:bg-[#0D1540]/90 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[13px] prose-code:before:content-none prose-code:after:content-none
                    prose-img:rounded-xl prose-img:border prose-img:border-white/10
                  `}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(post.content?.rendered || ''),
                  }}
                />

                <style jsx global>{`
                  .prose iframe,
                  .prose [data-oembed] iframe,
                  .prose .wp-block-embed iframe {
                    aspect-ratio: 16/9;
                    width: 100%;
                    max-width: 100%;
                    border-radius: 0.75rem;
                    border: 2px solid rgba(54, 192, 207, 0.4);
                    box-shadow: 0 0 24px rgba(54, 192, 207, 0.15);
                  }
                  .prose .wp-block-embed,
                  .prose [data-oembed] {
                    margin: 1.5rem 0;
                  }
                  .prose blockquote {
                    animation: blockquote-glow 3s ease-in-out infinite;
                  }
                  @keyframes blockquote-glow {
                    0%, 100% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.15); }
                    50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.25); }
                  }
                  @media (prefers-reduced-motion: reduce) {
                    .prose blockquote { animation: none; }
                  }
                `}</style>
              </div>

              {/* TOC Sidebar (desktop) */}
              {toc.length > 0 && (
                <motion.aside
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="hidden lg:block"
                >
                  <div className="sticky top-24 rounded-xl border-2 border-white/10 bg-[#1E2A5E]/50 p-4">
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4">On this page</h3>
                    <nav className="space-y-2" aria-label="Article sections">
                      {toc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block text-sm transition-colors hover:text-[#00A8A8] py-0.5 border-l-2 border-transparent hover:border-[#00A8A8] pl-3 -ml-px ${
                            item.level === 3 ? 'pl-5 text-[#E8E8E8]/90' : 'font-medium text-[#E8E8E8]'
                          }`}
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
          <section className="border-t border-white/10 py-5 md:py-6">
            <div className="container-width">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                className="flex flex-wrap items-center gap-4 rounded-xl border-2 border-white/10 bg-[#1E2A5E]/40 p-5"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${TEAL}30`, borderWidth: 2, borderColor: `${TEAL}50` }}
                >
                  <User className="w-6 h-6" style={{ color: TEAL }} aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-white text-sm">GTMStack.pro</h4>
                  <p className="text-sm text-[#E8E8E8] mt-0.5 max-w-xl leading-relaxed">
                    Strategic GTM consulting—ABM, RevOps, demand gen, and revenue scale. 20+ years building predictable growth engines.
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 mt-2 text-sm font-semibold hover:underline"
                    style={{ color: TEAL }}
                  >
                    View More from Author
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Related posts (by category when available) */}
          {relatedPosts.length > 0 && (
            <section className="py-5 md:py-8 bg-[#080B1E]" aria-label="Related posts">
              <div className="container-width">
                <h2 className="font-display font-bold text-xl md:text-2xl text-white mb-5">Expand Your Knowledge</h2>
                <p className="text-sm text-white/80 mb-5">More insights from the GTMStack team.</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedPosts.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link href={`/blog/post?slug=${p.slug}`}>
                    <motion.div
                      whileHover={{
                        y: -4,
                        scale: 1.02,
                        boxShadow: `0 12px 32px ${CYAN}25`,
                      }}
                      transition={{ duration: 0.2 }}
                          className="h-full rounded-xl overflow-hidden border-2 border-white/[0.08] bg-[#1E2A5E]/50 transition-all duration-300 hover:border-[#36C0CF]/50"
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
                                <FileText className="w-12 h-12 text-[#36C0CF]/25" aria-hidden="true" />
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <span
                              className="inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-1.5"
                              style={{ backgroundColor: `${TEAL}25`, color: TEAL }}
                            >
                              {primaryCategory(p)}
                            </span>
                            <h3 className="font-bold text-white text-sm line-clamp-2 leading-snug">
                              {stripHtml(p.title?.rendered || p.slug)}
                            </h3>
                            <p className="mt-1 text-xs text-[#E8E8E8] line-clamp-2">
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

          {/* Join the Conversation — TODO: wire to WP comments API when available */}
          <section className="py-5 md:py-8 bg-[#080B1E]" aria-label="Comments">
            <div className="container-width">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border-2 border-white/[0.08] bg-[#1E2A5E]/50 p-6 md:p-8 text-center max-w-2xl mx-auto"
              >
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-[#36C0CF]" aria-hidden="true" />
                <h2 className="font-display font-bold text-xl md:text-2xl text-white mb-2">Join the Conversation</h2>
                <p className="text-sm text-white/80 mb-5">
                  Have thoughts on this topic? Our community of GTM experts is discussing this post.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href={`/blog/post?slug=${slug}#comments`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
                    style={{ backgroundColor: TEAL }}
                  >
                    View comments
                  </Link>
                  <Link
                    href={`/blog/post?slug=${slug}#comments`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/15 transition-colors"
                  >
                    Post a thought
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Footer */}
          <section
            className="py-8 md:py-12"
            style={{ background: `linear-gradient(180deg, ${MIDNIGHT} 0%, ${NAVY} 100%)` }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="container-width text-center max-w-2xl mx-auto"
            >
              <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-2">
                Ready to discuss this strategy?
              </h2>
              <p className="text-[#E8E8E8] text-sm md:text-base mb-5">
                Book a call to map your GTM route.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="btn-cta-teal"
                >
                  Book a Call
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </motion.div>
            </motion.div>
          </section>
        </>
      )}
    </div>
  )
}
