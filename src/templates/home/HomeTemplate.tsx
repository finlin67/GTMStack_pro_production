'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// === Content Types (Industries Overview) ===

export interface StatItem {
  label: string
  value: string
}

export interface MethodologyStep {
  label: string
  description: string
  exampleLabel: string
  exampleDetail: string
}

export interface SectorCard {
  title: string
  description: string
}

export interface PageContent {
  hero: {
    badge: string
    titleStart: string
    titleGradient: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
  }
  stats: StatItem[]
  methodology: {
    title: string
    subtitle: string
    steps: MethodologyStep[]
  }
  sectors: {
    sectionTitle: string
    sectionSubtitle: string
    cards: SectorCard[]
  }
  quoteBand: {
    quoteLine: string
    kicker: string
  }
  bottomCta: {
    title: string
    subtitle: string
    buttonLabel: string
  }
}

/** Content type for the Home template (now used as Industries overview layout). */
export type HomeTemplateContent = PageContent

export type HomeTemplateProps = {
  theme?: 'dark' | 'light'
  content: HomeTemplateContent
  pageTitle?: string
  heroVisualId?: string
}

// === Template Component (layout only; header/footer from app layout) ===

export default function HomeTemplate({
  content,
  theme = 'dark',
  pageTitle: _pageTitle,
  heroVisualId: _heroVisualId,
}: HomeTemplateProps) {
  const isDark = theme === 'dark'

  return (
    <main
      className={`w-full font-display ${
        isDark ? 'bg-navy-dark text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-gradient-bg-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left content */}
          <div className="lg:w-1/2 text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-6">
              {content.hero.badge}
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              {content.hero.titleStart}{' '}
              <span className="bg-gradient-to-r from-accent-500 to-gold-500 bg-clip-text text-transparent">
                {content.hero.titleGradient}
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#sectors"
                className="bg-primary hover:bg-primary-600 text-white px-8 py-3.5 rounded text-sm font-semibold transition-colors shadow-md shadow-primary/40 text-center"
              >
                {content.hero.ctaPrimary}
              </Link>
              <Link
                href="/contact"
                className="border border-white/20 hover:bg-white/5 text-white px-8 py-3.5 rounded text-sm font-semibold transition-colors text-center"
              >
                {content.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Right column — 600x600 Animation Slot (no animation logic) */}
          <div className="lg:w-1/2 w-full flex justify-center">
            <div className="w-full max-w-[600px] h-[360px] sm:h-[420px] lg:h-[480px] xl:h-[600px] rounded-2xl border border-cyan-glow bg-gradient-bg-vertical/80 shadow-glow-cyan flex items-center justify-center">
              <div className="text-center px-6">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-2">
                  Animation Slot
                </p>
                <p className="text-lg font-semibold text-slate-100">
                  Right-side hero animation or interactive visual can be mounted here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="bg-slate-100 py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center divide-x divide-slate-200/60">
            {content.stats.map((stat) => (
              <div key={stat.label} className="px-2">
                <div className="text-3xl font-bold text-gold-500 mb-1">{stat.value}</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-[#071024] py-20 text-white border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{content.methodology.title}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {content.methodology.subtitle}
            </p>
          </div>
          <div className="grid lg:grid-cols-4 gap-6">
            {content.methodology.steps.map((step) => (
              <div
                key={step.label}
                className="bg-[#162447] p-6 rounded-lg border border-white/10 hover:border-primary/50 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-primary font-bold text-lg">{step.label}</span>
                </div>
                <p className="text-sm text-slate-400 mb-4">{step.description}</p>
                <div className="text-xs bg-[#020617] p-3 rounded border border-white/5">
                  <span className="text-gold-500 font-medium block mb-1">
                    {step.exampleLabel}
                  </span>
                  <span className="text-slate-500">{step.exampleDetail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section id="sectors" className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                {content.sectors.sectionTitle}
              </h3>
              <p className="text-slate-500 mt-2">
                {content.sectors.sectionSubtitle}
              </p>
            </div>
            <Link
              href="/case-studies"
              className="hidden md:inline-flex items-center text-primary font-semibold text-sm hover:underline"
            >
              View All Case Studies
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.sectors.cards.map((card) => (
              <div
                key={card.title}
                className="bg-white p-6 rounded shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-transform duration-300"
              >
                <h4 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h4>
                <p className="text-sm text-slate-500 mb-4 line-clamp-3">
                  {card.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-gold-500">
                    {/* Optional per-sector metric slot (content-driven in future) */}
                  </span>
                  <span className="text-xs font-semibold text-primary">
                    View Projects
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center md:hidden">
            <Link
              href="/case-studies"
              className="inline-flex items-center text-primary font-bold text-sm"
            >
              View All Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Band */}
      <section className="bg-navy-deep py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-6 text-4xl text-slate-600">“</div>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-8">
            {content.quoteBand.quoteLine}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-slate-700" />
            <p className="text-slate-400 uppercase tracking-[0.3em] text-xs font-semibold">
              {content.quoteBand.kicker}
            </p>
            <div className="h-px w-12 bg-slate-700" />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-100 py-20 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-[0.3em] mb-3">
            {content.bottomCta.title}
          </h3>
          <p className="text-xl text-slate-700 mb-8">
            {content.bottomCta.subtitle}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded text-sm font-semibold bg-primary text-white hover:bg-primary-600 transition-colors"
          >
            {content.bottomCta.buttonLabel}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  )
}
