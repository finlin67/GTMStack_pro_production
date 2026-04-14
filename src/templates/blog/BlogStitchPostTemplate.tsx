'use client'

import React from 'react'
import Link from 'next/link'
import { Clock, ChevronDown } from 'lucide-react'
import { sanitizeHtml } from '@/lib/sanitize-html'
import type { AdaptedBlogSinglePostContent } from '@/lib/blog-adapter'

function stripInner(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

function calloutTone(style?: string): string {
  const value = (style || '').trim().toLowerCase()

  if (value === 'warning') {
    return 'border-amber-200 bg-amber-50 text-amber-950'
  }
  if (value === 'success') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-950'
  }
  if (value === 'highlight') {
    return 'border-[#F9C74F] bg-[#FFF8DB] text-[#0D2137]'
  }
  if (value === 'info') {
    return 'border-[#9BC4E2] bg-[#EAF4FB] text-[#0D2137]'
  }

  return 'border-slate-200 bg-slate-50 text-slate-900'
}

function renderLegacyArticle(article: AdaptedBlogSinglePostContent['article']) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-p:font-light prose-p:text-slate-500 prose-strong:text-slate-900 prose-a:text-[#0d5cab]">
      {article.sections.map((section, idx) => {
        if (section.type === 'callout') {
          return (
            <div
              key={idx}
              className="my-10 rounded-r-xl border-l-4 border-[#0d5cab] bg-slate-50 p-6 italic text-slate-700"
            >
              {stripInner(section.content)}
            </div>
          )
        }

        return (
          <div key={idx}>
            {section.title && (
              <h2 className="mb-4 mt-10 font-display text-3xl font-bold text-slate-900">
                {section.title}
              </h2>
            )}
            <div
              className="gtm-wp-content gtm-post-body prose prose-slate max-w-none lg:prose-lg"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content) }}
            />
            {section.type === 'list' && section.items && section.items.length > 0 && (
              <ul className="mt-8 list-none space-y-6 pl-0">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0d5cab]/10 text-xs font-bold text-[#0d5cab]">
                      {'>'}
                    </span>
                    <div>
                      <p className="font-bold leading-tight text-slate-900">{item.title}</p>
                      <p className="text-slate-500">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}

function renderModularArticle(article: AdaptedBlogSinglePostContent['article']) {
  return (
    <div className="space-y-8 md:space-y-9">
      {article.dek && (
        <div className="rounded-[28px] border border-[#D7E6F2] bg-[#F8FBFD] p-7 md:p-8">
          {article.heroKicker && (
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#0d5cab]">
              {article.heroKicker}
            </p>
          )}
          <p className="text-[1.15rem] font-light leading-8 text-slate-700 md:text-[1.45rem] md:leading-9">
            {article.dek}
          </p>
        </div>
      )}

      {article.featuredQuote && (
        <blockquote className="rounded-[28px] border border-[#C7DFF1] bg-gradient-to-br from-[#0A1628] to-[#154360] p-7 text-white shadow-lg shadow-[#0A1628]/10 md:p-8">
          <p className="text-[1.6rem] font-light leading-9 md:text-[2rem] md:leading-[1.35]">
            "{article.featuredQuote}"
          </p>
          {article.quoteSource && (
            <footer className="mt-5 text-xs uppercase tracking-[0.2em] text-[#9BC4E2]">
              {article.quoteSource}
            </footer>
          )}
        </blockquote>
      )}

      {article.modularSections?.map((section, idx) => {
        if (section.type === 'callout') {
          return (
            <section
              key={idx}
              className={`relative overflow-hidden rounded-lg border p-7 shadow-sm md:p-9 ${calloutTone(section.style)}`}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-current opacity-20" />
              {section.heading && (
                <h2 className="mb-3 font-display text-[1.9rem] font-bold tracking-tight">
                  {section.heading}
                </h2>
              )}
              {section.body && (
                <div
                  className="gtm-wp-content prose max-w-none prose-headings:font-display prose-p:my-4 prose-p:text-[1.02rem] prose-p:leading-8 prose-p:text-current prose-strong:text-current"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.body) }}
                />
              )}
            </section>
          )
        }

        if (section.type === 'checklist') {
          return (
            <section key={idx}>
              {section.heading && (
                <h2 className="mb-3 font-display text-[1.9rem] font-bold tracking-tight text-slate-900">
                  {section.heading}
                </h2>
              )}
              {section.body && (
                <div
                  className="gtm-wp-content prose prose-slate mb-6 max-w-none prose-p:my-4 prose-p:text-[1.02rem] prose-p:leading-8"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.body) }}
                />
              )}
              {section.items.length > 0 && (
                <ul className="space-y-3.5">
                  {section.items.map((item, itemIdx) => (
                    <li key={`${item}-${itemIdx}`} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0d5cab] text-xs font-bold text-white">
                        ✓
                      </span>
                      <span className="pt-0.5 text-[1rem] leading-7 text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        }

        if (section.type === 'image') {
          const hasImage = Boolean(section.imageUrl)

          return (
            <section key={idx}>
              {section.heading && (
                <h2 className="mb-3 font-display text-[1.9rem] font-bold tracking-tight text-slate-900">
                  {section.heading}
                </h2>
              )}
              {section.body && (
                <div
                  className="gtm-wp-content prose prose-slate mb-6 max-w-none prose-p:my-4 prose-p:text-[1.02rem] prose-p:leading-8"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.body) }}
                />
              )}
              {hasImage ? (
                <figure className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
                  <img
                    src={section.imageUrl}
                    alt={section.imageAlt || section.heading || 'Article image'}
                    className="h-full w-full object-cover"
                  />
                </figure>
              ) : (
                <div className="rounded-[24px] border border-dashed border-[#BDD8EA] bg-[linear-gradient(180deg,#F7FBFE_0%,#EEF6FB_100%)] px-8 py-12 text-center">
                  <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
                    <span className="inline-flex rounded-full border border-[#9BC4E2] bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0d5cab]">
                      Image concept
                    </span>
                    <p className="text-sm leading-7 text-slate-500">
                      A visual has not been attached to this section yet.
                    </p>
                  </div>
                </div>
              )}
              {(section.imageCaption || (!hasImage && section.imagePrompt)) && (
                <div className="mt-4 space-y-1.5">
                  {section.imageCaption && (
                    <p className="text-sm text-slate-500">{section.imageCaption}</p>
                  )}
                  {!hasImage && section.imagePrompt && (
                    <p className="text-sm italic leading-6 text-slate-500">{section.imagePrompt}</p>
                  )}
                </div>
              )}
            </section>
          )
        }

        return (
          <section key={idx}>
            {section.heading && (
              <h2 className="mb-3 font-display text-[1.9rem] font-bold tracking-tight text-slate-900">
                {section.heading}
              </h2>
            )}
            {section.body && (
              <div
                className="gtm-wp-content prose prose-slate max-w-none prose-headings:font-display prose-p:my-4 prose-p:text-[1.04rem] prose-p:leading-8 prose-a:text-[#0d5cab]"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.body) }}
              />
            )}
          </section>
        )
      })}

      {article.faqItems && article.faqItems.length > 0 && (
        <section className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm md:p-9">
          <div className="mb-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#0d5cab]">FAQ</p>
            <h2 className="mt-3 font-display text-[1.9rem] font-bold tracking-tight text-slate-900">
              Common questions
            </h2>
          </div>
          <div className="space-y-3">
            {article.faqItems.map((item, idx) => (
              <details
                key={`${item.question}-${idx}`}
                className="group rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[1rem] font-semibold text-slate-900">
                  <span>{item.question}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div
                  className="gtm-wp-content prose prose-slate mt-4 max-w-none border-t border-slate-200 pt-4 prose-p:my-3 prose-p:leading-7"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.answer) }}
                />
              </details>
            ))}
          </div>
        </section>
      )}

      {article.cta && (
        <section className="relative overflow-hidden rounded-[32px] bg-[#0047AB] p-7 text-white shadow-xl shadow-blue-500/20 md:p-9">
          <div className="relative z-10 max-w-2xl">
            {article.cta.headline && (
              <h2 className="font-display text-[2rem] font-bold tracking-tight">
                {article.cta.headline}
              </h2>
            )}
            {article.cta.body && (
              <div
                className="gtm-wp-content prose prose-invert mt-4 max-w-none prose-p:my-4 prose-p:leading-8 prose-p:text-blue-100"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.cta.body) }}
              />
            )}
            <Link
              href={article.cta.buttonUrl}
              className="mt-7 inline-flex rounded-full bg-white px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#0047AB] transition-all hover:bg-slate-100"
            >
              {article.cta.buttonLabel}
            </Link>
          </div>
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        </section>
      )}

      {article.authorNote && (
        <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-7 md:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">Author note</p>
          <div
            className="gtm-wp-content prose prose-slate mt-4 max-w-none prose-p:my-4 prose-p:leading-8"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.authorNote) }}
          />
        </section>
      )}
    </div>
  )
}

export default function BlogStitchPostTemplate({ content }: { content: AdaptedBlogSinglePostContent }) {
  const { hero, article, sidebar } = content
  const isModularArticle = article.layoutType === 'modular_article'
  const showHeroImage = article.showFeaturedImage ?? true

  return (
    <div className="min-h-screen bg-[#f4f6f8] font-sans text-slate-900 antialiased">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] to-[#154360] px-8 pb-24 pt-16">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <nav className="mb-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <Link href="/blog" className="transition-colors hover:text-[#FFDB58]">Journal</Link>
              {hero.breadcrumbs.slice(1).map((crumb) => (
                <React.Fragment key={crumb.label}>
                  <span>/</span>
                  <Link href={crumb.href} className="transition-colors hover:text-[#FFDB58]">
                    {crumb.label}
                  </Link>
                </React.Fragment>
              ))}
            </nav>

            {isModularArticle && article.heroKicker && (
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.24em] text-[#9BC4E2]">
                {article.heroKicker}
              </p>
            )}

            <h1 className="mb-8 font-display text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">
              {hero.title}
            </h1>

            {!isModularArticle && article.dek && (
              <p className="mb-8 max-w-3xl text-xl font-light leading-relaxed text-slate-300">
                {article.dek}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-slate-300">
              <div className="flex items-center gap-3">
                <img
                  src={hero.author.image}
                  alt={hero.author.name ? `${hero.author.name} avatar` : 'Author'}
                  className="h-10 w-10 rounded-full border-2 border-white/10 object-cover"
                />
                <span className="text-sm font-medium">{hero.author.name}</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-sm font-light">{hero.publishedDate}</span>
              <div className="h-4 w-px bg-white/20" />
              <span className="flex items-center gap-1 text-sm font-light">
                <Clock className="h-3 w-3" aria-hidden />
                {hero.readingTime}
              </span>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 top-0 h-[600px] w-[600px] rounded-full bg-[#0d5cab]/20 blur-[120px]" />
      </section>

      <section className="relative z-30 mx-auto -mt-12 max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-12 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm lg:col-span-8 md:p-12">
            {showHeroImage && (
              <div className="mb-12 aspect-[21/9] overflow-hidden rounded-2xl">
                <img
                  src={article.featuredImage.src}
                  alt={article.featuredImage.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {article.intro && (
              <p className="mb-12 text-xl font-light leading-relaxed text-slate-600">
                {article.intro}
              </p>
            )}

            {isModularArticle ? renderModularArticle(article) : renderLegacyArticle(article)}

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-12">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Share:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Share on X (Twitter)"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all hover:border-[#0d5cab] hover:text-[#0d5cab]"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Share on LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all hover:border-[#0d5cab] hover:text-[#0d5cab]"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex gap-4">
                <button type="button" className="rounded-full border border-slate-200 px-6 py-2 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50">
                  Previous
                </button>
                <button type="button" className="rounded-full border border-slate-200 px-6 py-2 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50">
                  Next
                </button>
              </div>
            </div>
          </div>

          <aside className="hidden space-y-8 lg:col-span-4 lg:block">
            <div className="sticky top-28 space-y-8">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/40">
                <div className="mb-4 flex items-center justify-between border-b border-slate-50 pb-3">
                  <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#0d5cab]" />
                    Related Articles
                  </h4>
                  <span className="font-mono text-[9px] text-slate-300">v.2.4.0</span>
                </div>
                {sidebar.relatedInsights.length > 0 ? (
                  <div className="space-y-4">
                    {sidebar.relatedInsights.map((insight, idx) => (
                      <Link
                        key={idx}
                        href={insight.href}
                        className="group block cursor-pointer rounded-xl p-2 transition-all hover:bg-slate-50"
                      >
                        <h5 className="line-clamp-2 text-xs font-semibold leading-tight text-slate-900 transition-colors group-hover:text-[#0d5cab]">
                          {insight.title}
                        </h5>
                        <span className="mt-1 block text-[9px] text-slate-400">{insight.date}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5">
                    <p className="text-sm leading-6 text-slate-500">
                      More insights are on the way. Browse the latest writing from the journal.
                    </p>
                    <Link
                      href="/blog"
                      className="mt-4 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-[#0d5cab] transition-colors hover:text-[#0a4b8b]"
                    >
                      View all insights
                    </Link>
                  </div>
                )}
              </div>

              {article.tags.length > 0 && (
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-200/40">
                  <h4 className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Semantic Index
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    {article.tags.map((tag, idx) => {
                      const styles = [
                        'text-lg font-bold text-[#0d5cab]',
                        'text-xs font-medium text-slate-400',
                        'text-base font-semibold text-slate-700',
                        'text-sm font-medium text-slate-500',
                        'text-xs font-medium text-slate-400',
                      ]
                      return (
                        <span key={tag} className={styles[idx % styles.length]}>
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="group relative overflow-hidden rounded-3xl bg-[#0047AB] p-7 shadow-lg shadow-blue-500/15">
                <div className="relative z-10">
                  <h4 className="mb-3 font-display text-xl font-bold text-white">Marketing Assessment Tool</h4>
                  <p className="mb-6 text-sm font-medium leading-relaxed text-blue-100">
                    Quantify Your GTM Stack: Start Assessment Now
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full rounded-xl bg-white py-3 text-center text-xs font-bold uppercase tracking-widest text-[#0047AB] shadow-lg transition-all hover:bg-slate-100 active:scale-[0.98]"
                  >
                    Launch Terminal
                  </Link>
                </div>
                <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm shadow-slate-200/30">
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Expert Author</h4>
                <div className="space-y-4 text-center">
                  <img
                    src={hero.author.image}
                    alt={hero.author.name ? `${hero.author.name} portrait` : 'Author portrait'}
                    className="mx-auto h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
                  />
                  <div>
                    <h5 className="font-display text-lg font-bold text-slate-900">{hero.author.name}</h5>
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#0d5cab]">
                      {hero.author.role}
                    </p>
                    {hero.author.bio && (
                      <p className="text-xs italic leading-relaxed text-slate-500">
                        &ldquo;{hero.author.bio}&rdquo;
                      </p>
                    )}
                  </div>
                  <div className="flex justify-center gap-4 pt-4">
                    <Link
                      href={hero.author.profileLink}
                      className="text-sm font-medium text-slate-400 transition-colors hover:text-[#0d5cab]"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative mx-auto mb-32 mt-16 max-w-7xl overflow-hidden rounded-3xl bg-[#0A1628] px-8 py-24">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-display text-4xl font-bold text-white">Master the SaaS Architecture.</h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-slate-400">
            Join 15,000+ Founders and GTM Leaders receiving our weekly tactical blueprint for scaling enterprise revenue.
          </p>
          <form className="mx-auto flex max-w-lg flex-col gap-4 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              className="flex-grow rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[#FFDB58]/50"
              placeholder="professional@company.com"
              type="email"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-full bg-[#FFDB58] px-10 py-4 text-sm font-bold tracking-tight text-[#0A1628] transition-all hover:shadow-lg active:scale-95"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-6 text-[10px] uppercase tracking-widest text-slate-500">Tactical insights only. No fluff.</p>
        </div>
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#0d5cab]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#FFDB58]/5 blur-2xl" />
      </section>
    </div>
  )
}
