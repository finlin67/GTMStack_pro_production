import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  expertiseItems,
  getExpertiseBySlug,
  getExpertiseByPillar,
} from '@/content/expertise'
import { getCaseStudiesByExpertise } from '@/content/case-studies'
import { industryItems } from '@/content/industries'
import { getExpertiseHeroConfig } from '@/content/expertiseHeroConfigs'
import { getPageBySlug } from '@/lib/pageRegistry'
import { getContentByKey, getExpertiseContentByKey } from '@/src/content/registry'
import ExpertiseCategoryTemplate from '@/src/templates/expertise/ExpertiseCategoryTemplate'
import ExpertiseTopicTemplate from '@/src/templates/expertise/ExpertiseTopicTemplate'
import { ExpertiseDetailContent, type PillarId } from './ExpertiseDetailContent'
import Uploaded_DemandGrowth_v1 from '@/src/templates/Uploaded_DemandGrowth_v1'
import Uploaded_ContentEngagement_v1 from '@/src/templates/Uploaded_ContentEngagement_v1'
import Uploaded_StratInsights_v1 from '@/src/templates/Uploaded_StratInsights_v1'
import Uploaded_SystemOperations_v1 from '@/src/templates/Uploaded_SystemOperations_v1'

const SLUG_TO_PILLAR: Record<string, PillarId> = {
  'analytics': 'systems-operations',
  'account-based-marketing': 'strategy-insights',
  'account-based-marketing-abm': 'strategy-insights',
  'ai-in-marketing': 'systems-operations',
  'attribution-and-measurement': 'systems-operations',
  'bi-data-engineering': 'systems-operations',
  'channel-partner-marketing': 'demand-growth',
  'competitive-intel': 'strategy-insights',
  'content-engagement': 'content-engagement',
  'content-marketing': 'content-engagement',
  'content-strategy-systems': 'content-engagement',
  'crm-management': 'systems-operations',
  'customer-experience': 'strategy-insights',
  'customer-experience-cx': 'strategy-insights',
  'customer-marketing': 'strategy-insights',
  'data-governance': 'systems-operations',
  'demand-generation': 'demand-growth',
  'digital-marketing': 'demand-growth',
  'email-marketing': 'content-engagement',
  'event-field-marketing': 'demand-growth',
  'event-marketing': 'demand-growth',
  'growth-marketing': 'demand-growth',
  'lead-gen-scoring': 'demand-growth',
  'lifecycle-marketing': 'strategy-insights',
  'marketing-analytics-reporting': 'systems-operations',
  'marketing-automation': 'systems-operations',
  'marketing-operations': 'systems-operations',
  'martech-optimization': 'systems-operations',
  'omnichannel-marketing': 'content-engagement',
  'paid-advertising': 'demand-growth',
  'paid-advertising-sem': 'demand-growth',
  'product-marketing': 'strategy-insights',
  'revenue-operations': 'systems-operations',
  'roi-analysis': 'strategy-insights',
  'sales-enablement': 'strategy-insights',
  'sales-enablement-alignment': 'strategy-insights',
  'search-engine-optimization': 'demand-growth',
  'social-media': 'content-engagement',
  'social-media-marketing': 'content-engagement',
  'video-marketing': 'content-engagement',
  'web-design-ui-ux': 'content-engagement',
}

const PILLAR_TITLES: Record<PillarId, string> = {
  'content-engagement': 'Content & Engagement',
  'demand-growth': 'Demand & Growth',
  'strategy-insights': 'Strategy & Insights',
  'systems-operations': 'Systems & Operations',
}

/** Stitch reference styling: only these 5 detail pages + content-engagement pillar */
const STITCH_SLUGS = [
  'content-marketing',
  'email-marketing',
  'social-media-marketing',
  'video-marketing',
  'omnichannel-marketing',
]

/** PMM.AI reference styling: only these 5 detail pages + demand-growth pillar */
const PMM_AI_SLUGS = [
  'demand-generation',
  'growth-marketing',
  'paid-advertising-sem',
  'event-marketing',
  'search-engine-optimization',
]

/** Strategy & Insights reference styling: only these 5 detail pages + strategy-insights pillar */
const STRATEGY_INSIGHTS_SLUGS = [
  'customer-experience-cx',
  'customer-marketing',
  'account-based-marketing-abm',
  'lifecycle-marketing',
  'product-marketing',
]

/** Systems & Operations reference styling: only these 5 detail pages + systems-operations pillar */
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

const DEFAULT_RESULTS = [
  { value: '3-5x', label: 'Pipeline efficiency uplift' },
  { value: '30-50%', label: 'Faster time-to-signal' },
  { value: '2-3x', label: 'Lift in qualified pipeline' },
]

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return expertiseItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getExpertiseBySlug(slug)
  if (!item) return { title: 'Not Found' }
  const registryRow = getPageBySlug('expertise', slug)
  const title = registryRow?.pageTitle ?? `${item.title} Expertise`
  return {
    title,
    description: item.description ?? item.positioning,
  }
}

export default async function ExpertiseDetailPage({ params }: Props) {
  const { slug } = await params
  const item = getExpertiseBySlug(slug)

  if (!item) {
    notFound()
  }

  const registryRow = getPageBySlug('expertise', slug)

  const pageTitle = registryRow?.pageTitle ?? item.title
  const resolvedItem =
    registryRow?.contentKey ? getExpertiseContentByKey(registryRow.contentKey) : null

  // Option A: Only the four pillar category pages use the new Uploaded_* templates.
  // Strategy-insights is handled here (no static page); others use static pages with registry.
  if (slug === 'strategy-insights') {
    const pillarContent = getContentByKey('pillar:strategy-insights')
    return <Uploaded_StratInsights_v1 pageTitle={pageTitle} content={pillarContent} />
  }
  if (slug === 'content-engagement') {
    return <Uploaded_ContentEngagement_v1 pageTitle={pageTitle} content={null} />
  }
  if (slug === 'demand-growth') {
    return <Uploaded_DemandGrowth_v1 pageTitle={pageTitle} content={null} />
  }
  if (slug === 'systems-operations') {
    return <Uploaded_SystemOperations_v1 pageTitle={pageTitle} content={null} />
  }

  const pillarId: PillarId =
    (item.pillar as PillarId) ?? SLUG_TO_PILLAR[item.slug] ?? 'strategy-insights'
  const pillarTitle = PILLAR_TITLES[pillarId]

  const challenges =
    item.challenges && item.challenges.length > 0
      ? item.challenges.slice(0, 6)
      : DEFAULT_CHALLENGES

  const executionStack =
    item.tags && item.tags.length > 0 ? item.tags : DEFAULT_EXECUTION_STACK

  const parsedResults = parseProofMetrics(item.proof?.metrics)
  const results =
    parsedResults.length >= 3 ? parsedResults : DEFAULT_RESULTS

  const relatedExpertise = item.pillar
    ? getExpertiseByPillar(item.pillar)
        .filter((e) => e.slug !== item.slug)
        .slice(0, 4)
    : []

  const relatedCaseStudies = getCaseStudiesByExpertise(slug).slice(0, 3)

  const relatedIndustries = industryItems.filter(
    (i) => i.featuredExpertise?.includes(slug)
  ).slice(0, 3)

  const heroConfig = getExpertiseHeroConfig(slug)

  const pillarTintOverlay =
    {
      'content-engagement': '#0E1748',
      'demand-growth': '#0D1645',
      'strategy-insights': '#0C1442',
      'systems-operations': '#0D1650',
    }[pillarId]

  const useStitchTheme = STITCH_SLUGS.includes(slug)
  const usePmmAiTheme = PMM_AI_SLUGS.includes(slug)
  const useStrategyInsightsTheme = STRATEGY_INSIGHTS_SLUGS.includes(slug)
  const useSystemsOperationsTheme =
    SYSTEMS_OPERATIONS_SLUGS.includes(slug) || pillarId === 'systems-operations'

  const resolved = resolvedItem
  const defaultContent = (
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
      heroConfig={heroConfig ? { tagline: heroConfig.tagline, metrics: heroConfig.metrics } : undefined}
      useStitchTheme={useStitchTheme}
      usePmmAiTheme={usePmmAiTheme}
      useStrategyInsightsTheme={useStrategyInsightsTheme}
      useSystemsOperationsTheme={useSystemsOperationsTheme}
    />
  )

  if (registryRow) {
    const registryProps = {
      pageTitle: registryRow.pageTitle,
      theme: registryRow.theme ?? undefined,
      heroVisualId: registryRow.heroVisualId ? registryRow.heroVisualId : undefined,
      contentKey: registryRow.contentKey || undefined,
    }
    if (registryRow.templateId === 'expertise.topic') {
      return (
        <ExpertiseTopicTemplate
          item={resolved ?? item}
          {...registryProps}
        />
      )
    }
    if (registryRow.templateId === 'expertise.category') {
      const categoryPillarId =
        registryRow.contentKey?.startsWith('pillar:')
          ? (registryRow.contentKey.replace('pillar:', '') as PillarId)
          : (slug as PillarId)
      return (
        <ExpertiseCategoryTemplate pillarId={categoryPillarId} {...registryProps}>
          {defaultContent}
        </ExpertiseCategoryTemplate>
      )
    }
  }

  return defaultContent
}
