/**
 * Shared render for project/case study detail pages.
 * Canonical implementation used by both /projects/[slug] and /case-studies/[slug].
 */
import Link from 'next/link'
import { ArrowRight, CheckCircle2, TrendingUp, Target, Zap, BarChart3 } from 'lucide-react'
import { SectionDark } from '@/components/layout/SectionDark'
import { SectionLight } from '@/components/layout/SectionLight'
import { SectionHeader } from '@/components/layout/Section'
import { ConnectedTopics, RelatedCaseStudies, RelatedExpertise } from '@/components/ui/RelatedItems'
import { HeroDark } from '@/components/ui/HeroDark'
import { AnimatedStatCard } from '@/components/ui/AnimatedStatCard'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'
import { caseStudyItems } from '@/src/data/caseStudies'
import { expertiseItems } from '@/content/expertise'
import { industryItems } from '@/src/data/industries'
import {
  dedupeConnectedLinks,
  filterPublicCaseStudyItems,
  filterPublicExpertiseItems,
  getPublicCaseStudyHref,
  getPublicIndustryHref,
} from '@/lib/internalLinks'
import { HERO_VISUALS } from '@/lib/heroVisuals'
import { ensureHeroVisualWithImage } from '@/lib/heroVisualDefaults'
import type { CaseStudyItem, CaseStudyRouteKind } from '@/lib/types'
import RenderCaseStudyStitch from '@/lib/renderCaseStudyStitch'

export type { CaseStudyRouteKind }

const ROUTE_CONFIG: Record<
  CaseStudyRouteKind,
  { viewAllHref: string; viewAllLabel: string; relatedTitle: string }
> = {
  projects: { viewAllHref: '/projects', viewAllLabel: 'View All Projects', relatedTitle: 'Related Projects' },
  'case-studies': {
    viewAllHref: '/case-studies',
    viewAllLabel: 'View All Case Studies',
    relatedTitle: 'Related Case Studies',
  },
}

export type RenderCaseStudyVariant = 'classic' | 'stitch'

export interface RenderCaseStudyProps {
  caseStudy: CaseStudyItem
  routeKind: CaseStudyRouteKind
  /** Stitch HTML layout for case study hub detail pages */
  variant?: RenderCaseStudyVariant
}

export default function RenderCaseStudy({
  caseStudy,
  routeKind,
  variant = 'classic',
}: RenderCaseStudyProps) {
  if (variant === 'stitch') {
    return <RenderCaseStudyStitch caseStudy={caseStudy} routeKind={routeKind} />
  }

  const config = ROUTE_CONFIG[routeKind]
  const industry = industryItems.find((i) => i.slug === caseStudy.industry)
  const relatedExpertise = filterPublicExpertiseItems(
    expertiseItems
    .filter((e) => caseStudy.expertise.includes(e.slug))
    .slice(0, 3)
  )
  const relatedCaseStudies = filterPublicCaseStudyItems(
    caseStudyItems
    .filter((c) => c.slug !== caseStudy.slug && c.industry === caseStudy.industry)
    .slice(0, 2),
    routeKind
  )

  const industryHref = industry ? getPublicIndustryHref(industry.slug) : null
  const connectedTopics = dedupeConnectedLinks([
    ...(industry && industryHref
      ? [{
          href: industryHref,
          label: `${industry.title} market context`,
          description: `See the adjacent industry page for the buying environment and GTM constraints around this work.`,
          icon: industry.icon,
        }]
      : []),
    ...(relatedExpertise[0]
      ? [{
          href: `/expertise/${relatedExpertise[0].slug}`,
          label: `Applied expertise: ${relatedExpertise[0].title}`,
          description: `Go one layer deeper into the operating capability that supported this result.`,
          icon: relatedExpertise[0].icon,
        }]
      : []),
    ...(relatedCaseStudies[0]
      ? [{
          href: getPublicCaseStudyHref(relatedCaseStudies[0].slug, routeKind) ?? config.viewAllHref,
          label: `Adjacent proof: ${relatedCaseStudies[0].title}`,
          description: `Compare this outcome with another engagement in a similar market or motion.`,
          icon: 'FileText',
        }]
      : []),
    {
      href: '/blog',
      label: 'Field notes on GTM execution',
      description: 'Browse the blog for strategic context, systems thinking, and lessons behind the work.',
      icon: 'BookOpen',
    },
  ]).slice(0, 4)

  const outcomeHeadline = caseStudy.title
  const outcomeSubhead = caseStudy.description

  const solutionSteps = caseStudy.solution
    .split(/[.!?]\s+/)
    .filter((s) => s.trim().length > 20)
    .slice(0, 5)
    .map((step, idx) => ({
      number: idx + 1,
      title: step.split(',')[0].trim(),
      description: step.trim(),
    }))
  const keyDecisions = caseStudy.keyDecisions ?? []

  const executionStack = [
    { category: 'Channels', items: caseStudy.tags.slice(0, 3) },
    { category: 'Tools', items: ['HubSpot', 'Salesforce', 'Looker'] },
    { category: 'MarTech', items: ['Attribution', 'Analytics', 'Automation'] },
  ]

  return (
    <>
      <HeroDark
        label={caseStudy.client}
        title={outcomeHeadline}
        description={outcomeSubhead}
        primaryCta={{ label: config.viewAllLabel, href: config.viewAllHref }}
        secondaryCta={{ label: 'Explore Expertise', href: '/expertise' }}
        align="left"
        size="default"
        motif={HERO_VISUALS.defaults.detail.motif || 'signal'}
        rightVisual={ensureHeroVisualWithImage(HERO_VISUALS.defaults.detail, 'caseStudies')}
        className="relative"
        slug={caseStudy.slug}
        kind="projects"
      >
        <div className="flex flex-wrap items-center gap-3 mt-6">
          {industry && (
            <Link
              href={industryHref ?? `/industries/${industry.slug}`}
              className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              {industry.title}
            </Link>
          )}
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-sm backdrop-blur-sm">
            {caseStudy.year}
          </span>
          {caseStudy.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </HeroDark>

      <SectionLight variant="white" padding="lg">
        <div className="max-w-4xl">
          <SectionHeader label="Context" title="The Challenge" className="mb-8" />
          <FadeIn>
            <div className="prose-brand max-w-3xl">
              <p className="text-lg text-slate-700 leading-relaxed">{caseStudy.challenge}</p>
            </div>
          </FadeIn>
        </div>
      </SectionLight>

      <SectionDark variant="theater" padding="lg" motif="pathway" accentOrb>
        <div className="mb-12 max-w-3xl">
          <span className="inline-block text-sm font-semibold text-brand-400 tracking-wide uppercase mb-3">
            Approach
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance mb-4">
            The Route Map
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            How the work moved from problem to outcome.
          </p>
        </div>
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutionSteps.map((step, idx) => (
            <StaggerItem key={idx}>
              <div className="relative group">
                <div className="dark-card p-6 h-full hover:border-brand-500/30 transition-all duration-300 hover:shadow-glow-violet">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-300 font-bold text-lg shrink-0">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionDark>

      {keyDecisions.length > 0 && (
        <SectionLight variant="white" padding="lg">
          <div className="mb-10 max-w-3xl">
            <span className="inline-block text-sm font-semibold text-brand-600 tracking-wide uppercase mb-3">
              Strategic choices
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-balance mb-3">
              Key Decisions and Why
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              The highest-leverage choices that shaped execution and outcomes.
            </p>
          </div>
          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {keyDecisions.map((item, idx) => (
              <StaggerItem key={`${item.decision}-${idx}`}>
                <div className="card p-6 h-full">
                  <h3 className="font-semibold text-slate-900 mb-2">{item.decision}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{item.rationale}</p>
                  {item.impact && (
                    <p className="text-sm font-semibold text-brand-700">Impact: {item.impact}</p>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </SectionLight>
      )}

      <SectionLight variant="slate" padding="lg">
        <SectionHeader
          label="Execution"
          title="The Stack"
          description="Channels, tools, and MarTech used to deliver results."
          className="mb-12"
        />
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {executionStack.map((stack, idx) => (
            <StaggerItem key={idx}>
              <div className="card p-6 h-full hover:shadow-medium transition-all duration-300">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-600" />
                  {stack.category}
                </h3>
                <ul className="space-y-2">
                  {stack.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionLight>

      <SectionDark variant="theater" padding="lg" motif="signal" accentOrb>
        <div className="mb-12 max-w-3xl">
          <span className="inline-block text-sm font-semibold text-brand-400 tracking-wide uppercase mb-3">
            Results
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
            Outcomes Delivered
          </h2>
        </div>
        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-12">
          {caseStudy.metrics.map((metric, idx) => (
            <AnimatedStatCard key={metric.label} index={idx}>
              <div className="dark-card p-8 text-center border-brand-500/20 hover:border-brand-500/40 transition-all duration-300">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <TrendingUp className="w-6 h-6 text-brand-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-400 via-cool-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <p className="text-sm text-slate-300 mb-1">{metric.label}</p>
                {metric.change && (
                  <p className="text-xs text-gold-400 font-medium">{metric.change}</p>
                )}
              </div>
            </AnimatedStatCard>
          ))}
        </StaggerContainer>
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {caseStudy.results.map((result, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-200">{result}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </SectionDark>

      <SectionLight variant="white" padding="lg">
        <div className="max-w-4xl">
          <SectionHeader
            label="Lessons"
            title="What's Next"
            description="A short read on what changed and what mattered most."
            className="mb-8"
          />
          <FadeIn>
            <div className="prose-brand max-w-3xl">
              <p className="text-lg text-slate-700 leading-relaxed">
                The value here is not just the headline metric. It is the combination of clearer operating
                choices, better instrumentation, and tighter execution that made the result repeatable.
                {industry && industryHref && (
                  <>
                    {' '}If you want the market context, start with{' '}
                    <Link href={industryHref} className="font-medium text-brand-600 underline decoration-brand-200 underline-offset-4">
                      the {industry.title} industry page
                    </Link>.
                  </>
                )}
                {relatedExpertise[0] && (
                  <>
                    {' '}For the underlying capability, review{' '}
                    <Link
                      href={`/expertise/${relatedExpertise[0].slug}`}
                      className="font-medium text-brand-600 underline decoration-brand-200 underline-offset-4"
                    >
                      {relatedExpertise[0].title}
                    </Link>.
                  </>
                )}
              </p>
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-brand-600" />
                    What changed
                  </h3>
                  <p className="text-sm text-slate-600">
                    A clearer system, better signal quality, and less ambiguity in execution.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-brand-600" />
                    Why it matters
                  </h3>
                  <p className="text-sm text-slate-600">
                    The same underlying choices often transfer well to adjacent teams, markets, or motions.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionLight>

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
            title="Expertise Applied"
            viewAllHref="/expertise"
          />
        </SectionLight>
      )}

      {connectedTopics.length > 0 && (
        <SectionLight variant="slate" padding="md">
          <ConnectedTopics
            title="Keep Exploring"
            intro="Follow the adjacent market, capability, and proof links that connect this case study to the rest of the site."
            links={connectedTopics}
          />
        </SectionLight>
      )}

      <SectionDark variant="cta" padding="lg" motif="signal" accentOrb>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
              Explore more work like this
            </h2>
            <p className="text-lg text-white/90">
              Continue through the case studies or jump into the related expertise behind this project.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={config.viewAllHref}
              className="btn bg-white text-brand-700 hover:bg-white/90 shadow-lg px-6 py-3 text-base rounded-xl group"
            >
              {config.viewAllLabel}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/expertise" className="btn-hero-outline">
              Explore Expertise
            </Link>
          </div>
        </div>
      </SectionDark>
    </>
  )
}
