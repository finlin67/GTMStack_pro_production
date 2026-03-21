'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { sanitizeHtml } from '@/lib/sanitize-html'
import type { AdaptedBlogSinglePostContent } from '@/lib/blog-adapter'

const Icons = {
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
  Share2: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
  ),
  CheckCircle2: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
}

/**
 * Single post — Stitch-inspired dark theme; content from `adaptBlogSinglePostData`
 * (WP `_embed`: featured media, wp:term for tags/categories, author for byline).
 * Site `layout.tsx` already provides Navbar/Footer — this template does not duplicate them.
 */
export default function BlogStitchPostTemplate({ content }: { content: AdaptedBlogSinglePostContent }) {
  const { hero, article, sidebar } = content

  return (
    <div className="min-h-screen bg-[#0a122a] font-sans text-[#dbe1ff] antialiased">
      <div className="border-b border-white/5 px-6 py-4 lg:px-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#6FAFE0] transition-colors hover:text-[#F9C74F]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Insights
        </Link>
      </div>

      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#0a1628] to-[#0a122a] px-6 pb-16 pt-10 lg:px-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(180, 197, 255, 0.12) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8d90a0]">
            {hero.breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.label}>
                {idx > 0 ? <Icons.ChevronRight /> : null}
                <Link
                  href={crumb.href}
                  className={
                    idx === hero.breadcrumbs.length - 1
                      ? 'text-[#6FAFE0]'
                      : 'hover:text-[#6FAFE0]'
                  }
                >
                  {crumb.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>
          <h1 className="mb-10 font-display text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <div className="flex flex-wrap items-center gap-8 md:gap-10">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-[#6FAFE0]/40 p-0.5">
                <img
                  src={hero.author.image}
                  alt={hero.author.name ? `${hero.author.name} avatar` : 'Author avatar'}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{hero.author.name}</p>
                <p className="text-sm font-medium text-[#c3c6d7]">{hero.author.role}</p>
              </div>
            </div>
            <div className="hidden h-10 w-px bg-white/10 sm:block" />
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8d90a0]">Published</span>
              <p className="mt-1 text-sm font-bold text-[#dbe1ff]">{hero.publishedDate}</p>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8d90a0]">Reading time</span>
              <p className="mt-1 text-sm font-bold text-[#dbe1ff]">{hero.readingTime}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-20">
        <div className="flex flex-col gap-16 lg:flex-row">
          <article className="w-full lg:w-[65%]">
            <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src={article.featuredImage.src}
                alt={article.featuredImage.alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {article.intro ? (
              <p className="mb-12 border-l-4 border-[#2563eb] py-2 pl-8 text-2xl font-medium leading-relaxed text-[#e2e8f0]">
                {article.intro}
              </p>
            ) : null}

            <div
              className="prose prose-invert prose-lg max-w-none space-y-10 prose-headings:font-black prose-headings:tracking-tight prose-p:text-[#c3c6d7] prose-p:leading-[1.8] prose-strong:text-white prose-a:text-[#6FAFE0]"
            >
              {article.sections.map((section, idx) => {
                if (section.type === 'callout') {
                  return (
                    <div
                      key={idx}
                      className="relative overflow-hidden rounded-2xl border border-[#2563eb]/30 bg-[#2563eb]/10 p-10"
                    >
                      <h4 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-[#6FAFE0]">Key takeaway</h4>
                      <p className="relative z-10 text-2xl font-bold italic leading-snug text-white">
                        &ldquo;{stripInner(section.content)}&rdquo;
                      </p>
                    </div>
                  )
                }
                return (
                  <div key={idx} className="space-y-8">
                    {section.title ? (
                      <h2 className="pt-6 font-display text-3xl font-black text-white md:text-4xl">{section.title}</h2>
                    ) : null}
                    <div
                      className="article-body text-lg text-[#c3c6d7]"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content) }}
                    />
                    {section.type === 'list' && section.items ? (
                      <ul className="mt-8 list-none space-y-6 pl-0">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-5">
                            <div className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/20 text-[#6FAFE0]">
                              <Icons.CheckCircle2 />
                            </div>
                            <div>
                              <p className="text-lg font-black leading-tight text-white">{item.title}</p>
                              <p className="text-[#94a3b8]">{item.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                )
              })}
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-between gap-8 border-t border-white/10 pt-10">
              <button
                type="button"
                className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#8d90a0] hover:text-[#6FAFE0]"
              >
                <Icons.Share2 />
                Share
              </button>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-wider text-[#c3c6d7]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <aside className="w-full space-y-12 lg:w-[35%] lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-[#171e37] p-8">
              <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#8d90a0]">About the author</h4>
              <p className="mb-6 text-base leading-relaxed text-[#c3c6d7]">{hero.author.bio}</p>
              <Link
                href={hero.author.profileLink}
                className="inline-flex items-center gap-2 text-sm font-black text-[#6FAFE0] hover:text-[#F9C74F]"
              >
                View profile
                <span className="transition-transform group-hover:translate-x-1">
                  <Icons.ArrowRight />
                </span>
              </Link>
            </div>

            <div>
              <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#8d90a0]">Related</h4>
              <div className="space-y-8">
                {sidebar.relatedInsights.map((insight, idx) => (
                  <Link key={idx} href={insight.href} className="group flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                      <img
                        src={insight.image}
                        alt={insight.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h5 className="line-clamp-2 font-bold leading-tight text-white group-hover:text-[#6FAFE0]">
                        {insight.title}
                      </h5>
                      <p className="mt-1 text-xs font-black uppercase tracking-widest text-[#64748b]">{insight.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1e3a8a] p-8 shadow-xl">
              <h4 className="mb-3 text-2xl font-black leading-tight text-white">{sidebar.newsletter.title}</h4>
              <p className="mb-6 text-sm font-medium text-blue-100">{sidebar.newsletter.description}</p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white/40"
                  placeholder="work@company.com"
                  type="email"
                />
                <button
                  className="w-full rounded-xl bg-white py-3 text-sm font-black text-[#2563eb] transition hover:bg-blue-50"
                  type="submit"
                >
                  {sidebar.newsletter.buttonText}
                </button>
              </form>
              <p className="mt-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-blue-200/70">
                {sidebar.newsletter.subscriberCount}
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function stripInner(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}
