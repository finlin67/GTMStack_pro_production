'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ChevronRight,
  Layers,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { SectionDark } from '@/components/layout/SectionDark'
import { SectionLight } from '@/components/layout/SectionLight'
import { CaseStudyCard } from '@/components/ui/Card'
import { CardGrid, CardGridItem } from '@/components/ui/CardGrid'
import { FadeIn } from '@/components/motion/FadeIn'
import { Reveal } from '@/components/ui/Reveal'
import { caseStudyItems, getAllCaseStudyTags } from '@/src/data/caseStudies'
import { industryItems } from '@/src/data/industries'
import { SignalField } from '@/components/motifs'

const dataLinePattern =
  'bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:24px_24px]'

const heroMiniStats = [
  { icon: TrendingUp, value: '240%', label: 'Pipeline growth', className: 'text-brand-400' },
  { icon: Layers, value: '12.4x', label: 'ROAS scaled', className: 'text-emerald-400' },
  { icon: Sparkles, value: '-45%', label: 'CAC reduction', className: 'text-sky-400' },
  { icon: TrendingUp, value: '3.2M', label: 'Revenue attributed', className: 'text-violet-400' },
]

const proofBandStats = [
  { value: '$250M+', label: 'Revenue influenced' },
  { value: '4.2x', label: 'Average ROI' },
  { value: '85+', label: 'Active deployments' },
  { value: '32%', label: 'Efficiency lift' },
]

const marqueeLabels = [
  'Fintech leaders',
  'Enterprise SaaS',
  'Global manufacturing',
  'Healthcare technology',
  'Cybersecurity',
]

export default function CaseStudiesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const allTags = getAllCaseStudyTags()

  const industriesWithCases = useMemo(() => {
    const slugs = new Set(caseStudyItems.map((c) => c.industry))
    return industryItems.filter((ind) => slugs.has(ind.slug)).sort((a, b) => a.title.localeCompare(b.title))
  }, [])

  const filteredItems = useMemo(() => {
    return caseStudyItems.filter((item) => {
      if (selectedIndustry && item.industry !== selectedIndustry) return false
      if (selectedTag && !item.tags.includes(selectedTag)) return false
      return true
    })
  }, [selectedIndustry, selectedTag])

  const featuredStudies = caseStudyItems.filter((item) => item.featured)
  const flagshipPair = featuredStudies.slice(0, 2)

  const clearFilters = () => {
    setSelectedIndustry(null)
    setSelectedTag(null)
  }

  return (
    <>
      <Reveal>
        <section className={`relative bg-[#020617] overflow-hidden py-12 md:py-16 ${dataLinePattern}`}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
            <SignalField intensity="subtle" pattern="constellation" density="sparse" />
          </div>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-16 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
                Case studies
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight text-white">
                Selected{' '}
                <span className="bg-gradient-to-r from-slate-200 via-cyan-100 to-slate-300 bg-clip-text text-transparent">
                  GTM work.
                </span>
              </h1>
              <p className="text-base text-slate-400 max-w-lg leading-relaxed">
                Real GTM programs, reporting rebuilds, ABM systems, and portfolio artifacts tied to measurable outcomes.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <Link
                  href="#browse"
                  className="nav-cta text-sm"
                >
                  Browse case studies
                </Link>
                <Link
                  href="/expertise"
                  className="border border-slate-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors text-sm"
                >
                  Explore expertise
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {heroMiniStats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`bg-[#0D2137] p-4 md:p-5 rounded-xl border border-slate-700 shadow-2xl flex flex-col gap-1 ${
                      i % 2 === 1 ? 'translate-y-4 md:translate-y-6' : ''
                    }`}
                  >
                    <s.icon className={`w-5 h-5 ${s.className}`} aria-hidden />
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <SectionLight variant="white" className="overflow-hidden py-12 md:py-16" id="browse">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Filter by what matters to you
            </h2>
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
              <aside className="w-full lg:w-64 shrink-0">
                <div className="lg:sticky lg:top-24 space-y-8">
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
                      Industry
                    </h3>
                    <div className="flex flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedIndustry(null)}
                        className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm font-semibold text-left transition-colors ${
                          selectedIndustry === null
                            ? 'bg-brand-600 text-white'
                            : 'bg-transparent text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        All industries
                        <ChevronRight className="w-4 h-4 shrink-0 opacity-70" />
                      </button>
                      {industriesWithCases.map((ind) => (
                        <button
                          key={ind.slug}
                          type="button"
                          onClick={() => setSelectedIndustry(ind.slug)}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold text-left transition-colors ${
                            selectedIndustry === ind.slug
                              ? 'bg-brand-600 text-white'
                              : 'bg-transparent text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {ind.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
                      Topic
                    </h3>
                    <div className="flex flex-col gap-1.5 max-h-[280px] overflow-y-auto pr-1">
                      <button
                        type="button"
                        onClick={() => setSelectedTag(null)}
                        className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm font-semibold text-left transition-colors ${
                          selectedTag === null
                            ? 'bg-brand-600 text-white'
                            : 'bg-transparent text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        All topics
                        <ChevronRight className="w-4 h-4 shrink-0 opacity-70" />
                      </button>
                      {allTags.slice(0, 12).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSelectedTag(tag)}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold text-left transition-colors ${
                            selectedTag === tag
                              ? 'bg-brand-600 text-white'
                              : 'bg-transparent text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  {(selectedIndustry !== null || selectedTag !== null) && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-sm font-semibold text-brand-600 hover:text-brand-700"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </aside>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <p className="text-sm text-slate-600">
                    Showing{' '}
                    <span className="font-semibold text-slate-900">{filteredItems.length}</span> case
                    studies
                  </p>
                  <Link
                    href="/case-studies/ai-visualizations"
                    className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-500 transition-colors text-sm"
                  >
                    AI visualizations
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <CardGrid columns={2}>
                  {filteredItems.map((study) => (
                    <CardGridItem key={study.slug}>
                      <CaseStudyCard
                        variant="hub"
                        slug={study.slug}
                        title={study.title}
                        client={study.client}
                        description={study.description}
                        href={`/case-studies/${study.slug}`}
                        tags={study.tags}
                        metrics={study.metrics}
                        featured={study.featured}
                      />
                    </CardGridItem>
                  ))}
                </CardGrid>

                {filteredItems.length === 0 && (
                  <FadeIn>
                    <div className="text-center py-12 rounded-xl border border-dashed border-slate-200 bg-slate-50">
                      <p className="text-slate-500">No case studies match these filters.</p>
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-3 text-brand-600 font-semibold hover:text-brand-700"
                      >
                        Clear filters
                      </button>
                    </div>
                  </FadeIn>
                )}
              </div>
            </div>
          </div>
        </SectionLight>
      </Reveal>

      <Reveal delay={0.06}>
        <section className="bg-[#020617] py-14 md:py-16 border-y border-slate-800">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
              {proofBandStats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="text-2xl md:text-3xl font-extrabold text-white font-display">{s.value}</span>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 border-t border-slate-800/50 py-6 overflow-hidden">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-center">
              {marqueeLabels.map((label) => (
                <span
                  key={label}
                  className="text-sm md:text-base font-display font-bold text-slate-500 italic uppercase tracking-widest"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {flagshipPair.length > 0 && (
        <Reveal delay={0.07}>
          <SectionLight variant="white" className="py-14 md:py-16">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-16 flex flex-col gap-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
                Featured flagship results
              </h2>
              {flagshipPair.map((study, idx) => {
                const m = study.metrics[0]
                const m2 = study.metrics[1]
                const reverse = idx % 2 === 1
                return (
                  <div
                    key={study.slug}
                    className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} rounded-xl overflow-hidden border border-slate-200 shadow-lg`}
                  >
                    <div className="w-full md:w-[40%] bg-[#0D2137] p-8 md:p-10 text-white flex flex-col justify-center">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-brand-400 uppercase mb-3">
                        {study.tags[0] ?? 'Spotlight'}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold mb-3 font-display">{study.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{study.description}</p>
                    </div>
                    <div className="w-full md:w-[60%] bg-white p-8 md:p-10 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-8 mb-6">
                        {m && (
                          <div>
                            <div className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
                              {m.value}
                            </div>
                            <div className="text-xs text-slate-500 uppercase font-bold mt-1">{m.label}</div>
                          </div>
                        )}
                        {m2 && (
                          <div>
                            <div className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
                              {m2.value}
                            </div>
                            <div className="text-xs text-slate-500 uppercase font-bold mt-1">{m2.label}</div>
                          </div>
                        )}
                      </div>
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="bg-brand-600 text-white font-bold py-2.5 px-6 rounded-lg self-start text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                      >
                        Read case study
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </SectionLight>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <SectionDark
          variant="cta"
          motif="signal"
          padding="lg"
          accentOrb
          className="relative overflow-hidden bg-[#020617] border-t border-slate-800"
        >
          <div className="absolute inset-0 pointer-events-none opacity-15">
            <SignalField intensity="subtle" pattern="mesh" density="sparse" />
          </div>
          <div className="absolute inset-0 pointer-events-none bg-brand-600/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 max-w-[600px] mx-auto" />
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-16 relative z-10 text-center flex flex-col items-center gap-6">
            <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white max-w-2xl text-balance">
              If the work resonates, keep exploring
            </h2>
            <p className="text-slate-400 text-base max-w-xl">
              Start with the case studies, then move into expertise or industries if you want more context.
            </p>
            <Link
              href="/expertise"
              className="nav-cta text-base"
            >
              Explore expertise
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </SectionDark>
      </Reveal>
    </>
  )
}
