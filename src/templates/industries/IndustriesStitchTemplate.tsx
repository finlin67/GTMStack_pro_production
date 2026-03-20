'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { industryItems } from '@/content/industries'
import type { IndustriesMainContent } from '@/src/templates/industries/IndustriesMainTemplate'

export type IndustriesStitchTemplateProps = {
  content?: unknown
  pageTitle?: string
  theme?: string
  heroVisualId?: string
}

function isIndustriesMainContent(value: unknown): value is IndustriesMainContent {
  return !!value && typeof value === 'object' && 'hero' in value && 'industries' in value
}

/** Map Lucide-style icon names from content to Material Symbols */
const MATERIAL_BY_ICON: Record<string, string> = {
  Cloud: 'cloud_sync',
  Landmark: 'account_balance',
  Heart: 'favorite',
  Factory: 'factory',
  Terminal: 'terminal',
  ShoppingBag: 'shopping_bag',
  Zap: 'bolt',
  GraduationCap: 'school',
  Truck: 'local_shipping',
  Shield: 'encrypted',
  Leaf: 'eco',
  Cpu: 'memory',
}

function materialIcon(icon: string): string {
  return MATERIAL_BY_ICON[icon] ?? 'domain'
}

const STITCH_STYLES = `
  .industries-stitch-noise {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
  }
  .industries-stitch-hero-gradient {
    background: linear-gradient(90deg, #ffffff 0%, #3b82f6 50%, #fbbf24 85%, #ffffff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .industries-stitch-gold-emissive {
    text-shadow: 0 0 10px rgba(251, 191, 36, 0.6), 0 0 20px rgba(251, 191, 36, 0.4);
  }
  .industries-stitch-card {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .industries-stitch-card:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 20px 40px -10px rgba(251, 191, 36, 0.2);
  }
  .industries-stitch-gold-card-glow {
    box-shadow: inset 0 0 20px rgba(251, 191, 36, 0.05);
  }
  .industries-stitch-card:hover .industries-stitch-gold-card-glow {
    box-shadow: inset 0 0 30px rgba(251, 191, 36, 0.15);
  }
  .industries-stitch-horizon-curve {
    border-radius: 50% 50% 0 0 / 10% 10% 0 0;
  }
`

export default function IndustriesStitchTemplate({
  content,
}: IndustriesStitchTemplateProps) {
  if (!isIndustriesMainContent(content)) return null

  const sortedItems = [...industryItems].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.title.localeCompare(b.title)
  })

  const proofMetrics =
    content.hero.metrics.length >= 3
      ? content.hero.metrics.slice(0, 3)
      : [
          ...content.hero.metrics,
          { value: String(sortedItems.length), label: 'Vertical coverage' },
          { value: 'GTM', label: 'Intelligence nodes' },
        ].slice(0, 3)

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: STITCH_STYLES }} />

      <div className="bg-[#0f1723] text-slate-100 antialiased">
        {/* Hero — stitch industry.html */}
        <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-[#000f24] pt-8 pb-16 md:pt-12">
          <div className="industries-stitch-noise absolute inset-0" aria-hidden />
          <div
            className="absolute top-1/4 -right-20 h-[600px] w-[600px] rounded-full bg-[#3b82f6]/10 blur-[120px]"
            aria-hidden
          />
          <div
            className="absolute bottom-1/4 -left-20 h-[400px] w-[400px] rounded-full bg-[#fbbf24]/5 blur-[100px]"
            aria-hidden
          />

          <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-12 px-6 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#fbbf24]/30 bg-[#fbbf24]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#fbbf24] shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fbbf24] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#fbbf24]" />
                </span>
                {content.hero.badge}
              </div>

              <h1 className="mb-8 text-4xl font-black leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
                <span className="industries-stitch-hero-gradient">{content.hero.title}</span>
              </h1>

              <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-400 md:text-xl">
                {content.hero.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="#industries-stitch-grid"
                  className="rounded-xl bg-white px-8 py-4 text-lg font-extrabold text-[#000f24] shadow-xl transition-all hover:scale-105 hover:bg-[#fbbf24]"
                >
                  Enter the system
                </Link>
                <Link
                  href="/case-studies"
                  className="rounded-xl border border-slate-700 px-8 py-4 text-lg font-extrabold text-white transition-colors hover:bg-slate-800"
                >
                  View intelligence
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative flex h-[min(500px,70vw)] w-[min(500px,70vw)] items-center justify-center">
                <div className="absolute inset-0 animate-pulse rounded-full border border-[#3b82f6]/20" />
                <div className="absolute inset-12 animate-pulse rounded-full border border-[#fbbf24]/10 [animation-duration:6s]" />
                <div className="absolute inset-24 animate-pulse rounded-full border border-[#3b82f6]/5 [animation-duration:8s]" />
                <div className="relative h-72 w-72 md:h-80 md:w-80">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3b82f6]/30 to-[#fbbf24]/20 opacity-50 blur-2xl" />
                  <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10">
                    <Image
                      src={content.hero.dashboardImage}
                      alt="Industry intelligence dashboard preview"
                      fill
                      unoptimized
                      sizes="320px"
                      className="object-cover opacity-80 mix-blend-screen"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proof band */}
        <section className="relative overflow-hidden border-y border-slate-200 bg-white py-16 md:py-20">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 text-center md:grid-cols-3">
            {proofMetrics.slice(0, 3).map((m, idx) => (
              <div key={idx} className="group">
                <p className="mb-2 text-4xl font-black tracking-tighter text-[#000f24] transition-colors duration-300 group-hover:text-[#fbbf24] md:text-5xl">
                  {m.value}
                </p>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-500">{m.label}</p>
                <div className="mx-auto mt-4 h-1 w-0 bg-[#fbbf24] transition-all duration-500 group-hover:w-12" />
              </div>
            ))}
          </div>
        </section>

        {/* Industry grid — live links from industryItems */}
        <section
          id="industries-stitch-grid"
          className="relative bg-[#0f1723] py-24 md:py-32"
        >
          <div className="industries-stitch-noise absolute inset-0" aria-hidden />
          <div className="relative z-10 mx-auto max-w-[1280px] px-6">
            <div className="mb-16 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
              <div>
                <h2 className="mb-6 text-3xl font-black text-white md:text-5xl">
                  {content.industries.sectionTitle}
                </h2>
                <p className="max-w-2xl text-lg text-slate-400">
                  Modular GTM frameworks for vertical dynamics. Select a sector to open its{' '}
                  <span className="font-semibold text-[#fbbf24]">intelligence motion</span>.
                </p>
              </div>
              <div className="font-mono text-sm tracking-tighter text-[#fbbf24] industries-stitch-gold-emissive">
                STATUS: ALL_NODES_OPERATIONAL
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sortedItems.map((item, idx) => {
                const kpi =
                  item.stats?.[0] != null
                    ? `KPI: ${item.stats[0].value} ${item.stats[0].label}`
                    : 'KPI: Pipeline lift'
                const motion = item.tags?.[0] ?? 'GTM motion'
                const mat = materialIcon(item.icon)

                return (
                  <Link
                    key={item.slug}
                    href={`/industries/${item.slug}`}
                    className="industries-stitch-card group relative block overflow-hidden rounded-xl border border-slate-800 bg-[#1a2638] p-6"
                  >
                    <div className="industries-stitch-gold-card-glow pointer-events-none absolute inset-0 transition-all" />
                    <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#fbbf24] via-[#fbbf24]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="mb-8 flex items-start justify-between">
                      <span className="material-symbols-outlined text-[#fbbf24] industries-stitch-gold-emissive">
                        {mat}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        NODE_{String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                    <p className="mb-6 line-clamp-3 text-sm text-slate-400">{item.description}</p>
                    <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#fbbf24] industries-stitch-gold-emissive">
                        {kpi}
                      </span>
                      <span className="text-xs text-slate-500 transition-colors group-hover:text-white">
                        {motion}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-bold text-[#fbbf24] transition-colors hover:text-white industries-stitch-gold-emissive"
              >
                Initialize vertical audit{' '}
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Intelligence architecture */}
        <section className="relative overflow-hidden bg-white py-24 md:py-32">
          <div className="relative mx-auto max-w-[1280px] px-6">
            <h2 className="mb-20 text-center text-3xl font-black text-[#000f24] md:mb-24 md:text-5xl">
              Intelligence architecture
            </h2>
            <div className="relative grid gap-16 lg:grid-cols-3">
              <div className="absolute left-[15%] right-[15%] top-1/3 z-0 hidden h-0.5 bg-slate-100 lg:block">
                <div className="h-full w-1/3 animate-pulse bg-[#fbbf24] [animation-duration:3s]" />
              </div>

              {[
                {
                  n: '01',
                  icon: 'analytics',
                  title: 'System audit',
                  body: 'Deconstruct data silos and identify leakage in current pipeline architecture.',
                  box: 'bg-[#000f24]',
                  iconOnGold: false,
                },
                {
                  n: '02',
                  icon: 'architecture',
                  title: 'Motion design',
                  body: 'Engineer tactical playbooks and integrations for market saturation.',
                  box: 'bg-[#fbbf24]',
                  iconOnGold: true,
                },
                {
                  n: '03',
                  icon: 'speed',
                  title: 'Scale protocol',
                  body: 'Deploy growth loops and real-time vertical intelligence dashboards.',
                  box: 'bg-[#000f24]',
                },
              ].map((step) => (
                <div
                  key={step.n}
                  className="group relative z-10 flex flex-col items-center text-center"
                >
                  <div className="absolute -top-12 text-8xl font-black text-slate-50 transition-colors group-hover:text-[#fbbf24]/20">
                    {step.n}
                  </div>
                  <div
                    className={`mb-8 flex h-20 w-20 items-center justify-center rounded-2xl shadow-xl transition-all ${step.box}`}
                  >
                    <span
                      className={`material-symbols-outlined text-3xl ${step.iconOnGold ? 'text-[#000f24]' : 'text-white'}`}
                    >
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="mb-4 text-2xl font-extrabold text-[#000f24]">{step.title}</h3>
                  <p className="leading-relaxed text-slate-500">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dark CTA */}
        <section className="relative overflow-hidden bg-[#000f24] pb-32 pt-24 md:pb-48 md:pt-32">
          <div className="industries-stitch-noise absolute inset-0" aria-hidden />
          <div
            className="industries-stitch-horizon-curve absolute -bottom-[20%] left-1/2 h-[400px] w-[120%] -translate-x-1/2 bg-[#fbbf24]/10 blur-[120px]"
            aria-hidden
          />
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
            <div className="relative mb-12">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
                <div className="h-[300px] w-[300px] animate-ping rounded-full border border-[#fbbf24]" />
                <div className="absolute h-[450px] w-[450px] rounded-full border border-[#fbbf24]" />
              </div>
              <h2 className="mb-8 text-4xl font-black tracking-tighter text-white md:text-6xl lg:text-7xl">
                Ready to enter <br />
                <span className="text-[#fbbf24] industries-stitch-gold-emissive">the system?</span>
              </h2>
              <p className="mx-auto mb-12 max-w-xl text-lg text-slate-400 md:text-xl">
                {content.comparison.description}
              </p>
            </div>
            <Link
              href="/contact"
              className="group relative inline-block rounded-2xl bg-[#fbbf24] px-10 py-5 text-xl font-black text-[#000f24] shadow-[0_0_50px_rgba(251,191,36,0.4)] transition-all hover:-translate-y-1 hover:bg-[#ffd700] hover:shadow-[0_0_80px_rgba(251,191,36,0.6)]"
            >
              <span className="relative z-10">Initialize connection</span>
              <div className="absolute inset-0 rounded-2xl bg-white opacity-0 transition-opacity group-hover:opacity-10" />
            </Link>

            {content.testimonial?.logos?.length ? (
              <div className="mt-16 flex flex-wrap items-center justify-center gap-10 opacity-50 grayscale md:mt-20">
                {content.testimonial.logos.map((logo) => (
                  <span key={logo} className="text-lg font-black text-white">
                    {logo}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </>
  )
}
