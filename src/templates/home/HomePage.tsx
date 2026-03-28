'use client'

import React from 'react'
import Link from 'next/link'
import HeroVisualByRoute from '@/src/components/hero/HeroVisualByRoute.client'
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Compass,
  Cpu,
  ExternalLink,
  Landmark,
  Layers,
  Map,
  Quote,
  Rocket,
  Search,
  Settings,
  Settings2,
  Share2,
  TrendingUp,
} from 'lucide-react'

// --- Types ---

export interface StatItem {
  label: string
  value: string
}

export interface MethodologyStep {
  number: string
  title: string
  description: string
  icon: string
  progress: string
}

export interface ExpertiseItem {
  title: string
  icon: string
  tags: string[]
  description: string
}

export interface CaseStudy {
  title: string
  description: string
  outcomeLabel: string
  outcomeValue: string
  industry?: string
  quote?: string
}

export interface FounderTimelineItem {
  icon: string
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
    description: string
    steps: MethodologyStep[]
  }
  expertise: {
    title: string
    items: ExpertiseItem[]
  }
  quote: {
    text: string
    highlight: string
  }
  caseStudies: {
    title: string
    subtitle: string
    items: CaseStudy[]
    industries?: CaseStudy[]
  }
  founder: {
    name: string
    role: string
    image: string
    bio: string
    yearsExperience: string
    timeline: FounderTimelineItem[]
  }
  ctaBottom: {
    title: string
    subtitle: string
    buttonText: string
  }
}

// --- Icon Helper ---

type IconComponent = React.ComponentType<{ className?: string }>

const ICONS: Record<string, IconComponent> = {
  Search,
  DraftingCompass: Compass,
  Rocket,
  Settings,
  TrendingUp,
  Map,
  Network: Share2,
  account_balance: Landmark,
  cloud_done: Cloud,
  rocket_launch: Rocket,
  troubleshoot: Search,
  layers: Layers,
  settings_suggest: Settings2,
  speed: TrendingUp,
  trending_up: TrendingUp,
  map: Map,
  hub: Share2,
  precision_manufacturing: Cpu,
  quote: Quote,
  check: CheckCircle2,
}

const IconMap = ({ name, className }: { name: string; className?: string }) => {
  const Icon = ICONS[name] ?? Cpu
  return <Icon className={className} aria-hidden="true" />
}

// --- Sections ---

const Hero = ({ content, heroVisualId }: { content: PageContent; heroVisualId?: string }) => {
  return (
    <section className="relative overflow-hidden bg-[#0B132B] text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-70" aria-hidden="true" />
      <div className="container-width relative z-10 py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 items-center">
          <div className="space-y-5 md:space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-2 animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-cyan-300" />
              </span>
              {content.hero.badge}
            </div>
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
                <span className="text-white">{content.hero.titleStart}</span>
                <span className="text-gradient">{content.hero.titleGradient}</span>
              </h1>
              <p className="max-w-xl text-base text-slate-300 leading-relaxed md:text-lg">
                {content.hero.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/expertise" className="btn-cta-primary">
                {content.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="btn-hero-outline">
                {content.hero.ctaSecondary}
              </Link>
            </div>
          </div>
          <div className="hidden items-center justify-center lg:flex">
            <div className="relative w-full max-w-[22rem] overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_30px_120px_rgba(15,23,42,0.6)] md:p-5">
              <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-80" aria-hidden="true" />
              <div className="relative z-10 h-[300px] md:h-[340px]">
                <HeroVisualByRoute heroVisualId={heroVisualId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const StatsSection = ({ content }: { content: PageContent }) => {
  return (
    <section className="bg-[#0B132B] text-white">
      <div className="container-width py-8 md:py-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card-surface-alt p-4 md:p-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                {stat.label}
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {stat.value}
              </p>
              <div className="mt-4 h-px w-10 bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const MethodologySection = ({ content }: { content: PageContent }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 topo-sparse opacity-30" aria-hidden="true" />
      <div className="container-width relative z-10 py-12 md:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between md:gap-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Methodology</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">{content.methodology.title}</h2>
            <p className="mt-4 text-base text-slate-300 md:text-lg">{content.methodology.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {content.methodology.steps.map((step) => (
              <span
                key={step.number}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-300" />
                {step.title}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2">
          {content.methodology.steps.map((step) => (
            <div
              key={step.number}
              className="border-gradient rounded-2xl bg-white/5 p-5 backdrop-blur md:p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                  <IconMap name={step.icon} className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{step.number}</p>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-300">{step.description}</p>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: step.progress }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ExpertiseSection = ({ content }: { content: PageContent }) => {
  return (
    <section className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="container-width py-12 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Expertise</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{content.expertise.title}</h2>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-300">
            Strategy, activation, and optimization working as one system.
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {content.expertise.items.map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5 md:p-6"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300">
                    <IconMap name={item.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-300 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 dark:text-slate-400" />
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200/70 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const QuoteSection = ({ content }: { content: PageContent }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 flow-curved opacity-20" aria-hidden="true" />
      <div className="container-width relative z-10 py-12 md:py-16">
        <div className="max-w-4xl">
          <Quote className="h-10 w-10 text-cyan-300" />
          <blockquote className="mt-4 text-2xl font-semibold leading-tight md:text-4xl">
            {content.quote.text}
            <span className="text-gradient">{content.quote.highlight}</span>.
          </blockquote>
        </div>
      </div>
    </section>
  )
}

const CaseStudiesSection = ({ content }: { content: PageContent }) => {
  const industries = content.caseStudies.industries ?? []

  return (
    <section className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="container-width py-12 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Case Studies</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{content.caseStudies.title}</h2>
          </div>
          <p className="max-w-xl text-base text-slate-500 dark:text-slate-300">
            {content.caseStudies.subtitle}
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.caseStudies.items.map((item, index) => (
            <div
              key={index}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="relative h-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white">
                <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
                <div className="relative z-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Outcome</p>
                  <p className="mt-3 text-2xl font-semibold">{item.outcomeValue}</p>
                </div>
              </div>
              <div className="flex h-full flex-col gap-4 p-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:border-white/10 dark:text-slate-400">
                  {item.outcomeLabel}
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {industries.length > 0 ? (
          <div className="mt-10 border-t border-slate-200 pt-8 dark:border-white/10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-400">Industries Served</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/70 bg-slate-50 p-6 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                >
                  <p className="text-base font-semibold text-slate-900 dark:text-white">{industry.title}</p>
                  {industry.quote ? <p className="mt-3 italic">{industry.quote}</p> : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

const FounderSection = ({ content }: { content: PageContent }) => {
  return (
    <section className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="container-width py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-slate-200 shadow-xl dark:bg-white/10">
              <img
                alt={content.founder.name}
                className="h-full w-full object-cover"
                src={content.founder.image}
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-slate-900 px-6 py-4 text-white shadow-2xl dark:bg-white">
              <p className="text-3xl font-semibold text-white dark:text-slate-900">{content.founder.yearsExperience}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300 dark:text-slate-600">Years Experience</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Founder</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{content.founder.name}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{content.founder.role}</p>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300">{content.founder.bio}</p>
            <div className="mt-6 space-y-4">
              {content.founder.timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                      <IconMap name={item.icon} className="h-4 w-4" />
                    </div>
                    {index !== content.founder.timeline.length - 1 ? (
                      <div className="mt-2 h-full w-px bg-slate-200 dark:bg-white/20" />
                    ) : null}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CTASection = ({ content }: { content: PageContent }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-hero-gradient opacity-80" aria-hidden="true" />
      <div className="container-width relative z-10 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Next Step</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-5xl">{content.ctaBottom.title}</h2>
          <p className="mt-4 text-base text-slate-300 md:text-lg">{content.ctaBottom.subtitle}</p>
          <button className="btn-cta-primary mt-6">
            {content.ctaBottom.buttonText}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

// --- Main Component ---

export default function HomePage({ content, heroVisualId }: { content: PageContent; heroVisualId?: string }) {
  return (
    <main className="w-full">
      <Hero content={content} heroVisualId={heroVisualId} />
      <StatsSection content={content} />
      <MethodologySection content={content} />
      <ExpertiseSection content={content} />
      <QuoteSection content={content} />
      <CaseStudiesSection content={content} />
      <FounderSection content={content} />
      <CTASection content={content} />
    </main>
  )
}
