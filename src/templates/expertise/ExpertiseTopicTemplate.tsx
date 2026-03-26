import { getCaseStudiesByExpertise } from '@/content/case-studies'
import { industryItems } from '@/src/data/industries'
import { getExpertiseHeroConfig } from '@/content/expertiseHeroConfigs'
import { ExpertiseDetailContent } from '@/app/expertise/[slug]/ExpertiseDetailContent'
import type { ExpertiseItem } from '@/lib/types'
import { getPillarTopicComponent, PILLAR_TITLES, type PillarId } from './pillars/pillarMap'
import { PILLAR_PALETTES } from '@/src/data/pillars'
import { getPillarIdForTopic, getTopicsByPillar } from '@/src/data/expertiseTopics'

const STITCH_SLUGS = [
  'content-marketing',
  'email-marketing',
  'social-media-marketing',
  'video-marketing',
  'omnichannel-marketing',
]
const PMM_AI_SLUGS = [
  'demand-generation',
  'growth-marketing',
  'paid-advertising-sem',
  'event-marketing',
  'search-engine-optimization',
]
const STRATEGY_INSIGHTS_SLUGS = [
  'customer-experience-cx',
  'customer-marketing',
  'account-based-marketing-abm',
  'lifecycle-marketing',
  'product-marketing',
]
const SYSTEMS_OPERATIONS_SLUGS = [
  'sales-enablement',
  'ai-in-marketing',
  'market-research',
  'marketing-automation',
  'martech-optimization',
]

const DEFAULT_CHALLENGES = [
  'Traditional approaches focus on volume over strategic impact.',
  'Teams lack alignment on ICP, signals, and success definitions.',
  'Orchestration across channels is inconsistent, hurting conversion.',
  'Measurement defaults to vanity metrics instead of pipeline impact.',
  'Strategy and execution are disconnected.',
]

const DEFAULT_EXECUTION_STACK = [
  'ABM & outbound',
  'Lifecycle / email',
  'Paid search & social',
  'Web personalization',
  'Attribution & enrichment',
  'Intent & firmographic',
  'Journeys & triggers',
  'Pipeline quality',
]

const DEFAULT_RESULTS = [
  { value: '3-5x', label: 'Pipeline efficiency uplift' },
  { value: '30-50%', label: 'Faster time-to-signal' },
  { value: '2-3x', label: 'Lift in qualified pipeline' },
]

function parseProofMetrics(metrics?: string): { value: string; label: string }[] {
  if (!metrics) return []
  const parts = metrics.split(/[;,]+\s*/).filter(Boolean).slice(0, 5)
  return parts.map((p) => {
    const m = p.match(/^([\d.]+[x%]?\+?)\s+(.+)$/i) || p.match(/^([^a-zA-Z]+)\s+(.+)$/)
    if (m) return { value: m[1].trim(), label: m[2].trim() }
    const numMatch = p.match(/([\d.]+[x%]?\+?)/)
    if (numMatch) return { value: numMatch[1], label: p.replace(numMatch[1], '').trim() || 'Impact' }
    return { value: p.trim().slice(0, 12), label: 'Impact' }
  })
}

export interface ExpertiseTopicTemplateProps {
  /** Expertise item (same as app/expertise/[slug] page) */
  item: ExpertiseItem
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  contentKey?: string
}

/**
 * Minimal v1 template for expertise.topic (detail) pages.
 * Reuses ExpertiseDetailContent with same data derivation as app/expertise/[slug].
 */
export default function ExpertiseTopicTemplate({
  item,
  heroVisualId,
}: ExpertiseTopicTemplateProps) {
  const pillarId = getPillarIdForTopic(item.slug)
  const pillarTitle = PILLAR_TITLES[pillarId]

  const challenges =
    item.challenges && item.challenges.length > 0
      ? item.challenges.slice(0, 6)
      : DEFAULT_CHALLENGES

  const executionStack =
    item.tags && item.tags.length > 0 ? item.tags : DEFAULT_EXECUTION_STACK

  const parsedResults = parseProofMetrics(item.proof?.metrics)
  const results = parsedResults.length >= 3 ? parsedResults : DEFAULT_RESULTS

  const relatedExpertise = getTopicsByPillar(pillarId)
    .map((t) => t.item)
    .filter((e) => e.slug !== item.slug)
    .slice(0, 4)

  const relatedCaseStudies = getCaseStudiesByExpertise(item.slug).slice(0, 3)

  const relatedIndustries = industryItems.filter((i) =>
    i.featuredExpertise?.includes(item.slug)
  ).slice(0, 3)

  const heroConfig = getExpertiseHeroConfig(item.slug)

  const pillarTintOverlay = PILLAR_PALETTES[pillarId].overlay

  const useStitchTheme = STITCH_SLUGS.includes(item.slug)
  const usePmmAiTheme = PMM_AI_SLUGS.includes(item.slug)
  const useStrategyInsightsTheme = STRATEGY_INSIGHTS_SLUGS.includes(item.slug)
  const useSystemsOperationsTheme =
    SYSTEMS_OPERATIONS_SLUGS.includes(item.slug) || pillarId === 'systems-operations'

  const detailContent = (
    <ExpertiseDetailContent
      item={item}
      pillarId={pillarId}
      pillarTitle={pillarTitle}
      pillarTintOverlay={pillarTintOverlay}
      challenges={challenges}
      executionStack={executionStack}
      results={results}
      relatedExpertise={relatedExpertise}
      relatedCaseStudies={relatedCaseStudies}
      relatedIndustries={relatedIndustries}
      heroConfig={
        heroConfig
          ? { tagline: heroConfig.tagline, metrics: heroConfig.metrics }
          : undefined
      }
      useStitchTheme={useStitchTheme}
      usePmmAiTheme={usePmmAiTheme}
      useStrategyInsightsTheme={useStrategyInsightsTheme}
      useSystemsOperationsTheme={useSystemsOperationsTheme}
      heroVisualId={heroVisualId}
    />
  )

  const PillarComponent = getPillarTopicComponent(pillarId)
  return (
    <PillarComponent item={item} pillarId={pillarId}>
      {detailContent}
    </PillarComponent>
  )
}
