'use client'

import { useMemo, useState } from 'react'
import InteractiveResume from '@/components/sections/InteractiveResume'
import { Brain, Database, Settings } from 'lucide-react'
import HeroVisualByRoute from '@/src/components/hero/HeroVisualByRoute.client'
import type { HomeTemplateContent } from '@/src/templates/home/HomeTemplate'

type AboutResumeTemplateProps = {
  content: unknown
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
}

function splitBullets(raw: string): { header: string; bullets: string[] } {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)

  const header = lines[0] ?? ''
  const bullets = lines
    .slice(1)
    .map((l) => l.replace(/^•\s?/, '').trim())
    .filter(Boolean)

  return { header, bullets }
}

function extractImpact(tags: unknown): string | null {
  // Our about content uses tags like: "Impact: 40% Conversion Lift"
  if (!Array.isArray(tags)) return null
  const t = tags.find((x) => typeof x === 'string' && x.toLowerCase().startsWith('impact:'))
  return typeof t === 'string' ? t : null
}

// Palette copied from sandbox/stitch-html/about.html (tailwind.config theme.brand.*)
const BRAND_PRIMARY = '#2c7af6'
const BRAND_GOLD = '#E8A040'
const BRAND_AI = '#36C0CF'
const RESUME_GRADIENT = 'linear-gradient(90deg, #2c7af6, #60a5fa)'

export default function AboutResumeTemplate({ content, heroVisualId }: AboutResumeTemplateProps) {
  const data = content as HomeTemplateContent | null

  const timelineCards = useMemo(() => {
    if (!data) return []
    return data.methodology.steps.map((step) => {
      const { header, bullets } = splitBullets(step.description)
      return {
        dateRange: step.number,
        role: step.title,
        org: header,
        bullets,
        icon: step.icon,
      }
    })
  }, [data])

  const aiCards = useMemo(() => {
    if (!data) return []
    return data.expertise.items.map((item) => {
      const impact = extractImpact(item.tags)
      return { title: item.title, description: item.description, impact, icon: item.icon }
    })
  }, [data])

  const performanceCards = useMemo(() => {
    if (!data) return []
    return data.caseStudies.items.map((item) => ({
      label: item.title,
      value: item.outcomeValue,
      description: item.description ?? '',
    }))
  }, [data])

  const heroStats = useMemo(() => {
    if (!data) return []
    return data.stats.map((s) => ({ label: s.label, value: s.value }))
  }, [data])

  const initials = useMemo(() => {
    const n = data?.founder?.name ?? ''
    const parts = n.split(/\s+/).filter(Boolean)
    const letters = (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
    return letters.toUpperCase() || 'MF'
  }, [data])

  if (!data) return null

  return (
    <main className="w-full">
      {/* Hero (resume-style) */}
      <section className="bg-[#0A1628] text-white pt-6 md:pt-7">
        <div className="container-width relative py-7 md:py-8 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-7 items-center">
            <div className="space-y-3 md:space-y-4">
              <div
                className="inline-flex items-center gap-3 rounded-full bg-[#FFDB58]/10 text-[#FFDB58] px-4 py-1.5 text-[9px] font-bold tracking-[0.15em] uppercase"
              >
                {data.hero.badge}
              </div>
              <div className="space-y-3">
                <h1 className="max-w-[10ch] text-[2rem] md:text-[2.55rem] xl:text-[3.15rem] font-semibold leading-[0.96] tracking-[-0.03em]">
                  <span className="text-white">{data.hero.titleStart}</span>
                  <span
                    style={{
                      backgroundImage: RESUME_GRADIENT,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {data.hero.titleGradient}
                  </span>
                </h1>
                <blockquote className="max-w-[32rem] border-l-4 border-[#2c7af6] pl-4 py-0.5 italic text-slate-300 text-[14px] md:text-[15px] leading-[1.45]">
                  {data.hero.subtitle}
                </blockquote>
              </div>

              {/* KPI stats moved into a dedicated section below the hero for parity with stitch-html/about.html */}
            </div>

            <div className="relative flex min-h-[170px] items-center justify-center md:min-h-[210px]">
              {heroVisualId ? (
                <div className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[28px] border border-white/8 bg-[#0F2138] shadow-[0_24px_80px_rgba(5,12,25,0.45)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute -inset-4 rounded-[32px] bg-primary/15 blur-2xl pointer-events-none" />
                  <div className="relative aspect-[5/4]">
                    <HeroVisualByRoute heroVisualId={heroVisualId} />
                  </div>
                </div>
              ) : (
                <div className="relative z-10 group">
                  <div className="absolute -inset-3 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-all duration-500" />

                  {data.founder?.image ? (
                    <div className="relative aspect-[4/5] max-w-[260px] overflow-hidden rounded-2xl border border-white/10 md:max-w-[290px]">
                      <img
                        alt="Founder Portrait"
                        className="w-full h-full object-cover"
                        src={data.founder.image}
                      />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <span className="bg-white text-[#081c32] px-5 py-1.5 rounded-full font-bold text-[10px] tracking-widest uppercase shadow-2xl">
                          FOUNDER
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-[220px] h-[270px] rounded-2xl overflow-hidden border border-white/10 bg-slate-800 flex items-center justify-center">
                      <span className="text-5xl font-bold" style={{ color: BRAND_PRIMARY }}>
                        {initials}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* KPI stats (stitch-html/about.html: Pipeline / ROI / DB Acq / etc.) */}
      <section className="bg-[#F4F6F8] border-y border-slate-200/60 overflow-hidden">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 px-6 py-6 md:flex-row md:gap-0 md:px-8 md:py-7">
          {heroStats.slice(0, 6).map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex-1 flex flex-col items-center justify-center px-4 ${idx < 5 ? 'border-r border-slate-200/60' : 'last:border-0'}`}
            >
              <div className="text-2xl font-extrabold mb-1" style={{ color: BRAND_PRIMARY }}>
                {stat.value}
              </div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Built to Prove It (stitch-html/about.html) */}
      <section id="proof" className="bg-[#0D2137] py-16 md:py-20 text-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-8">
          <h2 className="mb-8 text-4xl font-extrabold tracking-tight md:mb-10">Built to Prove It...</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {performanceCards.slice(0, 2).map((card, idx) => (
              <div
                key={card.label}
                className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group"
              >
                <div
                  className={`h-1.5 ${
                    idx === 0
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                  }`}
                />
                <div className="p-5 md:p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-2xl font-bold">{card.label}</h3>
                    <span className={idx === 0 ? 'text-emerald-400' : 'text-blue-400'} aria-hidden="true">
                      {idx === 0 ? '🚀' : '✦'}
                    </span>
                  </div>
                  <div className="relative mb-5 aspect-video overflow-hidden rounded-xl border border-white/10">
                    {/* No per-card image in ABOUT_CONTENT; use a simple visual placeholder. */}
                    <img
                      alt="Dashboard preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={idx === 1 ? "/images/heroes/flight.svg" : "/images/heroes/placeholder.svg"}
                    />
                  </div>
                  <p className="mb-5 text-slate-400 leading-relaxed">{card.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {idx === 0 ? (
                      <>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                          Revenue Ops
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                          4D Modeling
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                          Cloud Native
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
                          AI Diagnostic
                        </span>
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
                          Predictive
                        </span>
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">
                          Strategic
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume (stitch-html/about.html: interactive experience mapping container) */}
      <section id="resume" className="bg-[#F4F6F8] py-14 md:py-16">
        <div className="mx-auto max-w-[1280px] px-6 md:px-8">
          <div className="mb-6 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.07)] md:mb-8">
            <div className="grid items-stretch gap-0 lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="relative min-h-[220px] overflow-hidden bg-[#112B3C]">
                {data.founder?.image ? (
                  <>
                    <img
                      alt={data.founder.name}
                      className="h-full w-full object-cover"
                      src={data.founder.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081423]/70 via-[#081423]/20 to-transparent" />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-5xl font-bold" style={{ color: BRAND_PRIMARY }}>
                      {initials}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 rounded-full bg-white/92 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#112B3C] shadow-sm">
                  Michael Findling
                </div>
              </div>

              <div className="p-6 md:p-7 lg:p-8">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                  Career Snapshot
                </p>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl">
                    <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-[#112B3C] md:text-4xl">
                      Selected Operating Roles
                    </h2>
                    <p className="text-[15px] leading-7 text-slate-600">
                      A direct starting point for the operating record, supporting proof points, and the best ways to continue the conversation.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 lg:max-w-[30rem] lg:justify-end">
                    <a
                      href="mailto:hello@gtmstack.pro"
                      className="inline-flex items-center justify-center rounded-xl bg-[#112B3C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0D2137]"
                    >
                      Email Michael
                    </a>
                    <a
                      href="https://linkedin.com/in/michaelfindling"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
                    >
                      Connect on LinkedIn
                    </a>
                    <a
                      href="#proof"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900"
                    >
                      View Case Studies
                    </a>
                    <a
                      href="#systems"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900"
                    >
                      Explore Expertise
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InteractiveResume />
        </div>
      </section>

      {/* Architecting Intelligent Revenue Systems */}
      <section id="systems" className="bg-[#0A1628] py-16 md:py-20 text-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-8">
          <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight md:mb-10">
            Architecting Intelligent Revenue Systems
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {aiCards.map((card, idx) => (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10 md:p-7"
              >
                <div
                  className="absolute right-6 top-6 flex h-12 w-12 rotate-45 items-center justify-center md:right-7 md:top-7"
                  style={{
                    backgroundColor:
                      idx === 0 ? `${BRAND_PRIMARY}33` : idx === 1 ? `${BRAND_AI}33` : `${BRAND_GOLD}33`,
                  }}
                >
                  {idx === 0 ? (
                    <Brain className="w-6 h-6 -rotate-45 text-blue-400" aria-hidden="true" />
                  ) : idx === 1 ? (
                    <Database className="w-6 h-6 -rotate-45 text-cyan-300" aria-hidden="true" />
                  ) : (
                    <Settings className="w-6 h-6 -rotate-45 text-amber-300" aria-hidden="true" />
                  )}
                </div>
                <h3 className="mt-10 mb-3 text-xl font-bold">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Validation + Academic Foundation */}
      <section className="bg-white px-6 py-14 md:py-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold mb-4">Professional Certifications</h2>
              <div className="space-y-4">
                <ValidationRow title="Salesforce Certified Architect" meta="ENTERPRISE SYSTEMS" />
                <ValidationRow title="HubSpot Platform Consultant" meta="INBOUND ARCHITECTURE" />
                <ValidationRow title="Google Analytics Expert" meta="MEASUREMENT &amp; DATA" />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <h2 className="text-lg font-bold mb-4">Academic Background</h2>
                <div className="bg-slate-50 p-5 rounded-xl border-t-4" style={{ borderTopColor: BRAND_GOLD }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-red-800 flex items-center justify-center text-white font-bold rounded">
                    BU
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Boston University</h3>
                    <p className="text-slate-500 text-sm">Questrom School of Business</p>
                  </div>
                </div>
                <p className="font-medium text-slate-900">B.S. in Business Administration</p>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8A040]/15 text-[#E8A040] font-bold text-xs shadow-sm">
                  Cum Laude Honors
                </div>
                <p className="mt-6 font-medium text-slate-600 leading-relaxed italic text-sm">
                  &quot;Specialized focus on Information Systems and Operations Management, bridging the gap between technical infrastructure and market strategy.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#112B3C] py-16 text-center text-white md:py-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-[140px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">{data.ctaBottom.title}</h2>
          <p className="mx-auto mb-7 max-w-2xl text-lg leading-relaxed text-slate-400 md:mb-8">{data.ctaBottom.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@gtmstack.pro"
              className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 transition-all active:scale-95"
              style={{ backgroundColor: BRAND_PRIMARY }}
            >
              {data.ctaBottom.buttonText}
            </a>
            <a
              href="/expertise"
              className="bg-white/5 hover:bg-white/10 border border-white/20 px-10 py-4 rounded-xl font-bold text-lg transition-all"
            >
              View Frameworks
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function ValidationRow({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="bg-slate-50 p-5 border-l-4 shadow-sm rounded-xl" style={{ borderLeftColor: BRAND_PRIMARY }}>
      <h5 className="font-bold text-slate-900">{title}</h5>
      <p className="text-slate-500 text-sm">{meta}</p>
    </div>
  )
}

function StrategicTimelineCard({
  card,
  index,
  defaultExpanded,
}: {
  card: {
    dateRange: string
    role: string
    org: string
    bullets: string[]
    icon: string
  }
  index: number
  defaultExpanded?: boolean
}) {
  const [expanded, setExpanded] = useState(!!defaultExpanded)

  // Color accents roughly matching the stitch HTML timeline.
  const accent =
    index === 0
      ? 'border-[#2c7af6]'
      : index === 1
        ? 'border-[#E8A040]'
        : index === 2
          ? 'border-red-500'
          : 'border-[#36C0CF]'

  return (
    <div className="relative flex justify-center">
      <div className={`w-full max-w-[46rem] bg-[#0A1628] p-5 md:p-6 rounded-xl border-l-4 ${accent} shadow-xl`}>
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <span className="text-xs font-bold mb-2 block italic text-white/80">{card.dateRange}</span>
            <h4 className="text-xl font-bold text-white">{card.role}</h4>
            <p className="text-slate-300 font-medium mb-3">{card.org}</p>
          </div>
        </div>

        {expanded ? (
          <div className="space-y-2.5 text-sm leading-6 text-slate-300">
            {card.bullets.map((b, i) => (
              <p key={`${b}-${i}`}>• {b}</p>
            ))}
          </div>
        ) : (
          <div className="text-sm text-slate-400 italic mb-3">Details hidden</div>
        )}

        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 text-[10px] font-bold uppercase tracking-widest hover:underline cursor-pointer text-white/80"
        >
          {expanded ? 'See Less ↑' : 'See Details ↓'}
        </button>
      </div>
    </div>
  )
}

