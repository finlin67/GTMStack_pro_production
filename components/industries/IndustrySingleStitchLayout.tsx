'use client'

import React, { type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import type { IndustryItem, CaseStudyItem } from '@/lib/types'
import { industryItems } from '@/content/industries'

/** Matches sandbox/stitch-html/industries/industry-single.html (GTM cobalt + lime system). */
const LAYOUT_STYLES = `
  .ind-single-dot-grid {
    background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 30px 30px;
  }
  .ind-single-glow-left {
    background: radial-gradient(circle at 0% 50%, rgba(0, 127, 255, 0.15) 0%, transparent 50%);
  }
  .ind-single-glow-right {
    background: radial-gradient(circle at 100% 50%, rgba(168, 230, 29, 0.1) 0%, transparent 50%);
  }
  .ind-single-text-gradient {
    background: linear-gradient(90deg, #007FFF, #A8E61D);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  @keyframes ind-single-pulse-node {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
  }
  .ind-single-pulse-node {
    animation: ind-single-pulse-node 3s infinite ease-in-out;
  }
  .ind-single-lat-lon {
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .ind-stitch-root {
    font-family: var(--font-stitch-rubik), ui-sans-serif, system-ui, sans-serif;
  }
  .ind-stitch-root h1,
  .ind-stitch-root h2,
  .ind-stitch-root h3,
  .ind-stitch-root h4 {
    font-family: var(--font-stitch-montserrat), ui-sans-serif, sans-serif;
  }
`

const PILLAR_ACCENTS = [
  { border: 'border-t-[#A8E61D]', key: 'lime-a' },
  { border: 'border-t-[#A8E61D]', key: 'lime-b' },
  { border: 'border-t-[#007FFF]', key: 'cobalt' },
  { border: 'border-t-[#36C0CF]', key: 'systems' },
] as const

const PILLAR_COPY = [
  {
    title: 'Content & Engagement',
    desc: 'Compliance-aware thought leadership for executive buyers. Insights that build trust in complex buying cycles.',
    href: '/expertise/content-engagement',
  },
  {
    title: 'Demand & Growth',
    desc: 'Intent-driven ABM, lifecycle orchestration, and demand programs tuned to your vertical signals.',
    href: '/expertise/demand-growth',
  },
  {
    title: 'Strategy & Insights',
    desc: 'Market intelligence, positioning, and GTM strategy that align product, sales, and marketing.',
    href: '/expertise/strategy-insights',
  },
  {
    title: 'Systems & Operations',
    desc: 'RevOps, automation, and analytics stacks optimized for visibility across long, complex deal cycles.',
    href: '/expertise/systems-operations',
  },
] as const

const TAG_DOT_COLORS = [
  'bg-[#007FFF]',
  'bg-[#A8E61D]',
  'bg-[#AED6F1]',
  'bg-green-500',
  'bg-purple-500',
]

function splitLongDescription(text: string): [string, string] {
  const parts = text.split(/\n\n+/).filter(Boolean)
  if (parts.length >= 2) return [parts[0]!, parts.slice(1).join('\n\n')]
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean)
  if (sentences.length >= 2) {
    const mid = Math.ceil(sentences.length / 2)
    return [sentences.slice(0, mid).join(' '), sentences.slice(mid).join(' ')]
  }
  return [text, '']
}

function chunkPairs<T>(arr: T[]): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += 2) out.push(arr.slice(i, i + 2))
  return out
}

export type IndustrySingleStitchLayoutProps = {
  industry: IndustryItem
  whyNowText: string
  /** Animation or custom visual inside the hero card; omit to use tag “ecosystem” grid (per stitch HTML). */
  heroRight?: ReactNode | null
  featuredCaseStudies?: CaseStudyItem[]
  /** When true, render heroRight inside the card (animations). Otherwise ecosystem + stats only. */
  heroRightIsVisual?: boolean
}

export default function IndustrySingleStitchLayout({
  industry,
  whyNowText,
  heroRight,
  featuredCaseStudies,
  heroRightIsVisual,
}: IndustrySingleStitchLayoutProps) {
  const [para1, para2] = splitLongDescription(industry.longDescription || industry.description)
  const stats = industry.stats?.length ? industry.stats : []
  const displayStats = stats.slice(0, 3)
  const tags = (industry.tags ?? []).slice(0, 5)
  const related = industryItems.filter((i) => i.slug !== industry.slug).slice(0, 4)

  const proofBandStats =
    displayStats.length >= 3
      ? displayStats
      : [
          ...displayStats,
          ...Array.from({ length: 3 - displayStats.length }, (_, i) => ({
            label: industry.proof?.[i]?.outcome?.slice(0, 32) ?? 'Outcome',
            value: '—',
          })),
        ].slice(0, 3)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LAYOUT_STYLES }} />

      <div className="ind-stitch-root font-sans text-slate-900 antialiased">
        {/* Breadcrumbs bar — gtmDeepBlue */}
        <section className="border-b border-white/5 bg-[#0D2137]" aria-label="Breadcrumb">
          <div className="container-width section-padding py-4">
            <nav className="text-xs font-medium uppercase tracking-widest text-white/50">
              <Link href="/industries" className="transition-colors hover:text-white">
                Industries
              </Link>
              <span className="mx-2" aria-hidden>
                →
              </span>
              <span className="text-[#AED6F1]">{industry.title}</span>
            </nav>
          </div>
        </section>

        {/* Hero */}
        <section className="relative overflow-hidden bg-[#0A1628] py-16 ind-single-dot-grid md:py-24 lg:py-32">
          <div className="pointer-events-none absolute inset-0 ind-single-glow-left" aria-hidden />
          <div className="pointer-events-none absolute inset-0 ind-single-glow-right" aria-hidden />
          <div className="relative z-10 container-width section-padding">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <Link
                  href="/industries"
                  className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 transition-colors hover:text-white"
                >
                  <span className="text-lg" aria-hidden>
                    ←
                  </span>
                  All industries
                </Link>
                <h1 className="mb-6 text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-7xl">
                  GTM built for{' '}
                  <span className="ind-single-text-gradient block lg:inline">
                    {industry.title}&apos;s
                  </span>{' '}
                  complexity.
                </h1>
                <p className="mb-10 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
                  {whyNowText}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/case-studies"
                    className="rounded-md bg-[#007FFF] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:shadow-[#007FFF]/20"
                  >
                    View Case Studies
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-[#007FFF]/30 bg-[#0D2137] p-6 shadow-2xl md:p-8">
                  {heroRightIsVisual && heroRight ? (
                    <div className="min-h-[280px] w-full overflow-hidden rounded-xl lg:min-h-[360px]">
                      {heroRight}
                    </div>
                  ) : (
                    <div className="mb-8">
                      <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#AED6F1]">
                        {industry.title} ecosystem
                      </span>
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {tags.map((tag, idx) => (
                          <div
                            key={tag}
                            className={`ind-single-pulse-node flex items-center gap-3 rounded-lg border border-white/5 bg-[#0A1628]/50 p-3 md:p-4 ${idx === tags.length - 1 && tags.length % 2 === 1 ? 'col-span-2' : ''}`}
                            style={{ animationDelay: `${idx * 0.5}s` }}
                          >
                            <div
                              className={`h-2 w-2 shrink-0 rounded-full ${TAG_DOT_COLORS[idx % TAG_DOT_COLORS.length]}`}
                            />
                            <span className="text-sm font-medium text-white">{tag}</span>
                          </div>
                        ))}
                        {tags.length === 0 && (
                          <p className="col-span-2 text-sm text-white/50">
                            Vertical-specific motions tailored to your buyers and compliance context.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {displayStats.length > 0 && (
                    <div
                      className={`grid grid-cols-3 gap-4 border-t border-white/10 pt-8 ${heroRightIsVisual && heroRight ? 'mt-8' : ''}`}
                    >
                      {displayStats.map((s) => (
                        <div key={s.label}>
                          <p className="font-['Montserrat',sans-serif] text-xl font-bold ind-single-text-gradient md:text-2xl">
                            {s.value}
                          </p>
                          <p className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge */}
        <section className="bg-[#F4F6F8] py-20 md:py-24">
          <div className="container-width section-padding">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-[#007FFF]">
                  The challenge
                </span>
                <h2 className="mb-6 text-3xl font-bold text-[#0A1628] md:text-4xl">
                  Why generic GTM breaks in {industry.title}
                </h2>
                <div className="space-y-6 leading-relaxed text-slate-600">
                  {para1 && <p>{para1}</p>}
                  {para2 && <p>{para2}</p>}
                </div>
                {industry.gtmRealities && industry.gtmRealities.length > 0 && (
                  <ul className="mt-8 space-y-3">
                    {industry.gtmRealities.slice(0, 5).map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#007FFF]" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {displayStats.length > 0 && (
                <div className="rounded-3xl bg-[#0A1628] p-8 text-white shadow-xl md:p-10">
                  <div className="space-y-8">
                    {displayStats.map((s, idx) => (
                      <div
                        key={s.label}
                        className={`flex items-center justify-between pb-6 ${
                          idx < displayStats.length - 1 ? 'border-b border-white/10' : ''
                        }`}
                      >
                        <span className="text-lg text-white/70">{s.label}</span>
                        <span className="font-['Montserrat',sans-serif] text-2xl font-bold text-[#A8E61D] md:text-3xl">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Playbook (optional) */}
        {industry.playbook && industry.playbook.length > 0 && (
          <section className="border-y border-slate-200 bg-white py-16 md:py-20">
            <div className="container-width section-padding">
              <h2 className="mb-8 text-center text-2xl font-bold text-[#0A1628] md:text-3xl">
                GTM patterns for {industry.title}
              </h2>
              <ul className="mx-auto max-w-3xl space-y-4">
                {industry.playbook.map((play, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#A8E61D]" />
                    <span className="leading-relaxed">{play}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Architecture — 4 pillars */}
        <section className="bg-[#0D2137] py-20 md:py-24">
          <div className="container-width section-padding mb-12 text-center md:mb-16">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              The{' '}
              <span className="ind-single-text-gradient">{industry.title} GTM</span> architecture
            </h2>
          </div>
          <div className="container-width section-padding">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {PILLAR_COPY.map((p, idx) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className={`group rounded-xl border-t-4 ${PILLAR_ACCENTS[idx]!.border} bg-[#112B3C] p-6 transition-transform duration-300 hover:-translate-y-2 md:p-8`}
                >
                  <h3 className="mb-4 text-xl font-bold text-white">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{p.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#A8E61D] opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Proof band — big numbers */}
        <section className="bg-white py-20 md:py-24">
          <div className="container-width section-padding">
            <div className="grid gap-10 md:grid-cols-3 md:gap-12">
              {proofBandStats.map((s, idx) => (
                <div key={`${s.label}-${idx}`} className="text-center">
                  <span className="mb-2 block font-['Montserrat',sans-serif] text-5xl font-bold ind-single-text-gradient md:text-6xl">
                    {s.value}
                  </span>
                  <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof cards (enterprise wins) */}
        {industry.proof && industry.proof.length > 0 && (
          <section className="border-t border-white/5 bg-[#0D2137] py-16 md:py-20">
            <div className="container-width section-padding">
              <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-3xl">
                Relevant proof
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {industry.proof.slice(0, 6).map((p, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/10 bg-[#112B3C] p-6"
                  >
                    {p.company && (
                      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#A8E61D]">
                        {p.company}
                      </p>
                    )}
                    <h3 className="mb-2 font-bold text-white">{p.outcome}</h3>
                    {p.metrics && <p className="text-sm text-white/60">{p.metrics}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Case studies — paired cards */}
        {featuredCaseStudies && featuredCaseStudies.length > 0 && (
          <section className="bg-[#0D2137] py-16 md:py-24">
            <div className="container-width section-padding space-y-10 md:space-y-12">
              {chunkPairs(featuredCaseStudies).map((pair, rowIdx) => (
                <div
                  key={rowIdx}
                  className="grid overflow-hidden rounded-2xl shadow-2xl lg:grid-cols-2 lg:gap-0"
                >
                  {pair.map((cs, i) => {
                    const borderAccent = i === 0 ? 'border-[#A8E61D]' : 'border-[#007FFF]'
                    const labelAccent = i === 0 ? 'text-[#A8E61D]' : 'text-[#007FFF]'
                    const linkAccent =
                      i === 0 ? 'border-[#A8E61D] hover:text-[#A8E61D]' : 'border-[#007FFF] hover:text-[#007FFF]'
                    const bg = i === 0 ? 'bg-[#0A1628]' : 'bg-[#112B3C]'
                    return (
                      <div key={cs.slug} className={`border-t-4 ${borderAccent} p-8 md:p-12 ${bg}`}>
                        <span
                          className={`mb-4 block text-xs font-bold uppercase tracking-widest ${labelAccent}`}
                        >
                          {rowIdx === 0 && i === 0 ? 'Featured' : 'Case study'} · {cs.client}
                        </span>
                        <h3 className="mb-6 font-['Montserrat',sans-serif] text-2xl font-bold text-white md:text-3xl">
                          {cs.title}
                        </h3>
                        <p className="mb-8 leading-relaxed text-white/60">{cs.description}</p>
                        <Link
                          href={`/case-studies/${cs.slug}`}
                          className={`inline-block border-b pb-1 text-sm font-bold text-white transition-colors ${linkAccent}`}
                        >
                          View case study →
                        </Link>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related industries */}
        {related.length > 0 && (
          <section className="bg-[#F4F6F8] py-20 md:py-24">
            <div className="container-width section-padding">
              <h2 className="mb-10 text-3xl font-bold text-[#0A1628] md:mb-12">
                Other industries covered
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {related.map((item, idx) => {
                  const border = idx % 2 === 0 ? 'border-t-[#007FFF]' : 'border-t-[#A8E61D]'
                  return (
                    <Link
                      key={item.slug}
                      href={`/industries/${item.slug}`}
                      className={`rounded-lg border-t-4 ${border} bg-white p-6 shadow-sm transition-shadow hover:shadow-md`}
                    >
                      <h4 className="mb-2 font-['Montserrat',sans-serif] font-bold text-[#0A1628]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-3">{item.description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <section className="relative overflow-hidden bg-[#112B3C] py-24 ind-single-lat-lon md:py-32">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
            aria-hidden
          />
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <h2 className="mb-8 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              See more GTM work for{' '}
              <span className="ind-single-text-gradient">{industry.title}</span>
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-lg text-white/60">
              Use the related expertise and case studies to keep moving through the portfolio.
            </p>
            <div className="flex justify-center">
              <Link
                href="/case-studies"
                className="rounded-lg bg-[#007FFF] px-10 py-5 text-xl font-bold text-white shadow-xl shadow-[#007FFF]/30 transition-transform hover:scale-105"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
