/**
 * Stitch-inspired layout for /case-studies/[slug] (sandbox/stitch-html/case-studies/case-studies-single.html).
 */
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Factory,
  Quote,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { SectionLight } from '@/components/layout/SectionLight'
import { RelatedCaseStudies, RelatedExpertise } from '@/components/ui/RelatedItems'
import { caseStudyItems } from '@/src/data/caseStudies'
import { expertiseItems } from '@/content/expertise'
import { industryItems } from '@/src/data/industries'
import type { CaseStudyItem, CaseStudyRouteKind } from '@/lib/types'

const ROUTE_COPY: Record<
  CaseStudyRouteKind,
  { viewAllHref: string; viewAllLabel: string; relatedTitle: string }
> = {
  projects: { viewAllHref: '/projects', viewAllLabel: 'View all projects', relatedTitle: 'Related projects' },
  'case-studies': {
    viewAllHref: '/case-studies',
    viewAllLabel: 'View all case studies',
    relatedTitle: 'Related case studies',
  },
}

const heroPattern =
  'bg-[repeating-linear-gradient(0deg,rgba(184,200,216,0.04),rgba(184,200,216,0.04)_1px,transparent_1px,transparent_32px)]'

function parseSolutionSteps(solution: string) {
  return solution
    .split(/[.!?]\s+/)
    .filter((s) => s.trim().length > 20)
    .slice(0, 6)
    .map((step, idx) => ({
      number: idx + 1,
      title: step.split(',')[0].trim(),
      description: step.trim(),
    }))
}

export interface RenderCaseStudyStitchProps {
  caseStudy: CaseStudyItem
  routeKind: CaseStudyRouteKind
}

export default function RenderCaseStudyStitch({ caseStudy, routeKind }: RenderCaseStudyStitchProps) {
  const config = ROUTE_COPY[routeKind]
  const industry = industryItems.find((i) => i.slug === caseStudy.industry)
  const relatedExpertise = expertiseItems
    .filter((e) => caseStudy.expertise.includes(e.slug))
    .slice(0, 3)
  const relatedCaseStudies = caseStudyItems
    .filter((c) => c.slug !== caseStudy.slug && c.industry === caseStudy.industry)
    .slice(0, 2)

  const solutionSteps = parseSolutionSteps(caseStudy.solution)
  const keyDecisions = caseStudy.keyDecisions ?? []
  const headlineMetrics = caseStudy.metrics.slice(0, 3)
  const outcomeBullets = caseStudy.results.slice(0, 3)
  const quoteText =
    caseStudy.results[0] ??
    caseStudy.description

  return (
    <>
      <section className={`relative overflow-hidden bg-[#0A1628] py-16 md:py-24 px-4 sm:px-6 ${heroPattern}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <p className="text-emerald-500 font-bold tracking-widest text-sm mb-4 uppercase">
              {caseStudy.tags[0] ? `${caseStudy.tags[0]} · case study` : 'Case study'}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {caseStudy.title}
            </h1>
            <div className="flex flex-wrap gap-6 md:gap-8 text-slate-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-500 shrink-0" aria-hidden />
                <span>Client: {caseStudy.client}</span>
              </div>
              {industry && (
                <div className="flex items-center gap-2">
                  <Factory className="w-5 h-5 text-emerald-500 shrink-0" aria-hidden />
                  <span>Industry: {industry.title}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500 shrink-0" aria-hidden />
                <span>Year: {caseStudy.year}</span>
              </div>
            </div>
          </div>

          {headlineMetrics.length > 0 && (
            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-700 border border-slate-700 rounded-xl overflow-hidden">
              {headlineMetrics.map((m, i) => (
                <div
                  key={`${m.label}-${i}`}
                  className="p-6 md:p-8 flex flex-col items-center md:items-start bg-[#0D2137]"
                >
                  <span className="text-slate-400 text-sm font-semibold mb-1">{m.label}</span>
                  <span
                    className={`text-3xl md:text-4xl font-black text-white ${
                      i === headlineMetrics.length - 1 ? 'text-emerald-400' : ''
                    }`}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <main className="bg-white py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="lg:w-[70%] space-y-14 md:space-y-16">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="size-2 bg-brand-600 rounded-full shrink-0" aria-hidden />
                The challenge
              </h2>
              <div className="prose-brand max-w-3xl space-y-4">
                <p className="text-slate-600 leading-relaxed text-lg">{caseStudy.challenge}</p>
              </div>
            </section>

            {solutionSteps.length > 0 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="size-2 bg-brand-600 rounded-full shrink-0" aria-hidden />
                  Our methodology
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {solutionSteps.map((step) => (
                    <div
                      key={step.number}
                      className="p-6 border border-slate-100 rounded-xl bg-slate-50"
                    >
                      <h3 className="font-bold text-slate-900 mb-2">
                        {step.number}. {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {keyDecisions.length > 0 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="size-2 bg-brand-600 rounded-full shrink-0" aria-hidden />
                  Key decisions and why they mattered
                </h2>
                <div className="space-y-4">
                  {keyDecisions.map((item, idx) => (
                    <div key={`${item.decision}-${idx}`} className="p-6 border border-slate-200 rounded-xl bg-white">
                      <h3 className="font-bold text-slate-900 mb-2">{item.decision}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-3">{item.rationale}</p>
                      {item.impact && (
                        <p className="text-sm font-semibold text-emerald-700">Impact: {item.impact}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="size-2 bg-brand-600 rounded-full shrink-0" aria-hidden />
                The execution
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">{caseStudy.solution}</p>
              <div
                className="rounded-xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200 aspect-[21/9] flex items-center justify-center text-slate-500 text-sm font-medium"
                role="img"
                aria-label="Program visualization placeholder"
              >
                Outcome instrumentation &amp; delivery
              </div>
            </section>
          </div>

          <aside className="lg:w-[30%] space-y-8">
            <div className="bg-slate-50 rounded-xl p-6 md:p-8 border border-slate-200 lg:sticky lg:top-28">
              <h3 className="text-xl font-bold text-slate-900 mb-6">At a glance</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                    Engagement
                  </p>
                  <p className="text-slate-800 font-semibold">{caseStudy.client}</p>
                  <p className="text-sm text-slate-600 mt-1">{caseStudy.year}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                    Tech &amp; motion tags
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {caseStudy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                    Explore
                  </p>
                  <ul className="space-y-2 mt-2">
                    <li>
                      <Link
                        href={config.viewAllHref}
                        className="inline-flex items-center gap-2 text-sm text-brand-600 font-semibold hover:underline"
                      >
                        {config.viewAllLabel}
                      </Link>
                    </li>
                    {industry && (
                      <li>
                        <Link
                          href={`/industries/${industry.slug}`}
                          className="inline-flex items-center gap-2 text-sm text-brand-600 font-semibold hover:underline"
                        >
                          {industry.title} industry
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <section className="bg-[#F4F6F8] py-16 md:py-24 px-4 sm:px-6 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">The outcome</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Measurable impact across pipeline, efficiency, and growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
            <div className="space-y-8">
              {outcomeBullets.map((text, idx) => {
                const Icon = [TrendingUp, Wallet, CheckCircle2][idx % 3]
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="size-12 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-emerald-600" aria-hidden />
                    </div>
                    <div>
                      <p className="text-slate-700 leading-relaxed">{text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-200">
              <div className="h-56 flex items-end gap-2 sm:gap-4 justify-between px-1">
                <div className="w-full bg-slate-100 rounded-t-lg h-12" />
                <div className="w-full bg-slate-200 rounded-t-lg h-24" />
                <div className="w-full bg-brand-500/40 rounded-t-lg h-36" />
                <div className="w-full bg-brand-600 rounded-t-lg h-[13.5rem]" />
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between text-slate-400 font-bold text-xs uppercase tracking-wide">
                <span>Impact trajectory</span>
                <span>Key metrics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-14 h-14 mx-auto text-brand-500/25 mb-6" aria-hidden />
          <blockquote className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-8">
            &ldquo;{quoteText}&rdquo;
          </blockquote>
          <p className="text-slate-900 font-bold text-lg">{caseStudy.client}</p>
          <p className="text-slate-500 text-sm mt-1">Outcome summary</p>
        </div>
      </section>

      {relatedCaseStudies.length > 0 && (
        <SectionLight variant="slate" padding="lg">
          <RelatedCaseStudies
            items={relatedCaseStudies}
            title={config.relatedTitle}
            viewAllHref={config.viewAllHref}
          />
        </SectionLight>
      )}

      {relatedExpertise.length > 0 && (
        <SectionLight variant="white" padding="lg">
          <RelatedExpertise
            items={relatedExpertise}
            title="Expertise applied"
            viewAllHref="/expertise"
          />
        </SectionLight>
      )}

      <section
        className={`py-16 md:py-20 px-4 sm:px-6 bg-[#0A1628] text-center relative overflow-hidden ${heroPattern}`}
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Ready for similar results?
          </h2>
          <p className="text-slate-300 text-lg md:text-xl mb-10">
            Let&apos;s talk about your GTM stack and how we can accelerate your next proof point.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-sky-400 text-[#0A1628] px-8 py-4 rounded-xl font-black text-base hover:scale-[1.02] transition-transform shadow-lg shadow-sky-400/20"
            >
              Start a conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href={config.viewAllHref} className="text-slate-300 hover:text-white text-sm font-semibold underline-offset-4 hover:underline">
              {config.viewAllLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
