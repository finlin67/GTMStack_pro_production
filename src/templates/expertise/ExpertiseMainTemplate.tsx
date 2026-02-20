/**
 * ExpertiseMainTemplate Component
 *
 * Expected Content Prop Shape:
 * {
 *   logo: { icon: string, label: string, subLabel: string },
 *   navLinks: Array<{ label: string, href: string, active?: boolean }>,
 *   hero: { badge: string, title: string, subtitle: string, ctaPrimary: string, ctaSecondary: string },
 *   pillars: {
 *     title: string,
 *     subtitle: string,
 *     items: Array<{ title: string, description: string, icon: string, color: string, bgStart: string, ringColor: string, glowColor: string }>
 *   },
 *   philosophy: { quote: string, highlight: string },
 *   insights: {
 *     title: string,
 *     subtitle: string,
 *     cta: string,
 *     items: Array<{ type: string, title: string, description: string, image: string, date: string, cta: string }>
 *   },
 *   ctaBand: { title: string, subtitle: string, ctaPrimary: string, ctaSecondary: string },
 *   footer: {
 *     columns: Array<{ title: string, links: Array<{ label: string, href: string }> }>,
 *     copyright: string,
 *     tagline: string
 *   }
 * }
 */

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Twitter } from 'lucide-react'
import HeroVisualByRoute from '@/src/components/hero/HeroVisualByRoute.client'

type Props = {
  content: unknown
  pageTitle?: string
  theme?: string
  heroVisualId?: string
}

export default function ExpertiseMainTemplate({
  content: rawContent,
  theme = 'dark',
  heroVisualId,
}: Props) {
  const content = rawContent as Record<string, unknown> | null
  if (!content) return null

  return (
    <div
      className={`font-sans min-h-screen ${theme === 'dark' ? 'dark bg-[#0B132B] text-white' : 'bg-white text-slate-900'}`}
    >
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e293b] bg-[#0B132B]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-[#0B132B]">
              <span className="material-symbols-outlined text-xl font-bold">
                {(content.logo as Record<string, string> | undefined)?.icon ?? 'architecture'}
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {(content.logo as Record<string, string> | undefined)?.subLabel ?? 'Architecture'}
              </span>
              <span className="text-lg font-black tracking-tight text-white">
                {(content.logo as Record<string, string> | undefined)?.label ?? 'REVENUEARCHITECT'}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {((content.navLinks as Array<{ label: string; href: string; active?: boolean }>) ?? []).map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className={`text-sm font-medium transition-colors ${link.active ? 'text-white decoration-[#2463eb] decoration-2 underline-offset-8 underline font-bold' : 'text-slate-300 hover:text-white'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center justify-center rounded bg-[#F97316] hover:bg-[#ea580c] transition-colors px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-900/20">
              Get Audited
            </button>
            <button className="md:hidden p-2 text-slate-300 hover:text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center">
          <div className="absolute inset-0 blueprint-grid opacity-[0.07]"></div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
              <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded border border-[#2463eb]/30 bg-[#2463eb]/10 px-3 py-1 text-xs font-bold tracking-widest text-[#2463eb] uppercase backdrop-blur-sm">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#2463eb] animate-pulse"></span>
                {(content.hero as Record<string, string> | undefined)?.badge}
              </div>

              <h1 className="mb-6 text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl whitespace-pre-line">
                {(content.hero as Record<string, string> | undefined)?.title}
              </h1>

              <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-400 font-light">
                {(content.hero as Record<string, string> | undefined)?.subtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="group flex items-center justify-center gap-2 rounded bg-[#2463eb] px-8 py-4 text-base font-bold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-900/20">
                  {(content.hero as Record<string, string> | undefined)?.ctaPrimary}
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                </button>
                <button className="flex items-center justify-center gap-2 rounded border border-slate-600 bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/5 hover:border-slate-400">
                  {(content.hero as Record<string, string> | undefined)?.ctaSecondary}
                </button>
              </div>
              </div>
              <div className="hidden lg:flex justify-center items-center">
                <HeroVisualByRoute heroVisualId={heroVisualId} />
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="bg-[#E8EDF4] py-20 lg:py-28 text-[#0B132B]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 md:mb-16">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-[#0B132B] sm:text-4xl">
                {(content.pillars as Record<string, string> | undefined)?.title}
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-600">
                {(content.pillars as Record<string, string> | undefined)?.subtitle}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {((content.pillars as Record<string, unknown> | undefined)?.items as Array<Record<string, string>> ?? []).map((pillar, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-lg bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-2 ${pillar.ringColor ?? ''}`}
                >
                  <div className={`absolute right-0 top-0 h-24 w-24 blur-3xl transition-opacity group-hover:opacity-100 ${pillar.glowColor ?? 'opacity-0'}`}></div>
                  <div className={`relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded ${pillar.bgStart ?? ''} ${pillar.color ?? ''}`}>
                    <span className="material-symbols-outlined text-3xl">{pillar.icon}</span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="mb-2 text-xl font-bold text-[#0B132B]">{pillar.title}</h3>
                    <p className="mb-6 text-slate-600">{pillar.description}</p>
                    <span className={`flex items-center text-sm font-bold ${pillar.color ?? ''}`}>
                      Explore System
                      <span className="material-symbols-outlined ml-2 text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Quote Section */}
        <section className="bg-[#0F1C3F] py-24 text-center">
          <div className="mx-auto max-w-4xl px-4">
            <span className="material-symbols-outlined mb-6 text-4xl text-[#2463eb]/50">format_quote</span>
            <h2 className="text-3xl font-medium leading-tight text-white md:text-5xl">
              {(() => {
                const philosophy = content.philosophy as Record<string, string> | undefined
                const quote = philosophy?.quote ?? ''
                const highlight = philosophy?.highlight ?? ''
                if (!highlight) return quote
                const parts = quote.split(highlight)
                return parts.map((part: string, i: number, arr: string[]) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="text-[#2463eb] font-bold">{highlight}</span>}
                  </React.Fragment>
                ))
              })()}
            </h2>
            <div className="mt-8 h-1 w-20 bg-[#2463eb] mx-auto rounded-full"></div>
          </div>
        </section>

        {/* Insights Section */}
        <section className="bg-[#F1F4F8] py-20 text-[#0B132B]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-[#0B132B]">
                  {(content.insights as Record<string, string> | undefined)?.title}
                </h2>
                <p className="mt-2 text-slate-600">{(content.insights as Record<string, string> | undefined)?.subtitle}</p>
              </div>
              <Link className="hidden sm:inline-flex items-center text-sm font-bold text-[#2463eb] hover:underline" href="#">
                {(content.insights as Record<string, string> | undefined)?.cta}
                <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {((content.insights as Record<string, unknown> | undefined)?.items as Array<Record<string, string>> ?? []).map((item, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 w-full bg-slate-200 relative overflow-hidden">
                    <Image
                      src={item.image ?? '/images/placeholder.webp'}
                      alt={item.title}
                      unoptimized
                      width={600}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-[#0B132B] text-white text-xs font-bold px-2 py-1 rounded">{item.type}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[#0B132B] mb-2 leading-tight group-hover:text-[#2463eb] transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-3">{item.description}</p>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">{item.date}</span>
                      <span className="text-xs font-bold text-[#2463eb] uppercase">{item.cta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Band Section */}
        <section className="bg-[#0B132B] border-t border-[#1e293b] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {(content.ctaBand as Record<string, string> | undefined)?.title}
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              {(content.ctaBand as Record<string, string> | undefined)?.subtitle}
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-[#2463eb] hover:bg-blue-600 text-white font-bold py-3 px-8 rounded transition-colors shadow-lg shadow-blue-900/20">
                {(content.ctaBand as Record<string, string> | undefined)?.ctaPrimary}
              </button>
              <button className="bg-transparent border border-slate-600 hover:bg-white/5 text-white font-bold py-3 px-8 rounded transition-colors">
                {(content.ctaBand as Record<string, string> | undefined)?.ctaSecondary}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-[#0B132B] border-t border-[#1e293b] pt-16 pb-8 text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-white">architecture</span>
                <span className="text-white font-black tracking-tight">
                  {(content.logo as Record<string, string> | undefined)?.label ?? 'REVENUEARCHITECT'}
                </span>
              </div>
              <p className="text-slate-400 mb-4">Engineered GTM systems for the modern enterprise. Scale with structure.</p>
              <div className="flex gap-4">
                <Link className="text-slate-400 hover:text-white" href="#" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link className="text-slate-400 hover:text-white" href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {((content.footer as Record<string, unknown> | undefined)?.columns as Array<Record<string, unknown>> ?? []).map((col, idx) => (
              <div key={idx} className="col-span-1">
                <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">{col.title as string}</h3>
                <ul className="space-y-2 text-slate-400">
                  {((col.links as Array<Record<string, string>>) ?? []).map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link className="hover:text-[#2463eb] transition-colors" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-[#1e293b] pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-xs">{(content.footer as Record<string, string> | undefined)?.copyright}</p>
            <p className="text-slate-600 text-xs mt-2 md:mt-0">{(content.footer as Record<string, string> | undefined)?.tagline}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
