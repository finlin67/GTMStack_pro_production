import type { ExpertiseItem } from '@/lib/types'
import { expertiseItems, getExpertiseBySlug } from '@/content/expertise'
import type { PillarId } from '@/src/data/pillars'
import { PILLAR_IDS } from '@/src/data/pillars'

/**
 * Slug-to-pillar mapping for expertise topics that do not have pillar set on the item.
 * Ensures every topic can be themed by pillar (PILLAR_PALETTES).
 */
export const SLUG_TO_PILLAR: Record<string, PillarId> = {
  'content-marketing': 'content-engagement',
  'content-strategy-systems': 'content-engagement',
  'email-marketing': 'content-engagement',
  'event-marketing': 'content-engagement',
  'omnichannel-marketing': 'content-engagement',
  'search-engine-optimization': 'content-engagement',
  'social-media': 'content-engagement',
  'social-media-marketing': 'content-engagement',
  'video-marketing': 'content-engagement',
  'web-design-ui-ux': 'content-engagement',
  'account-based-marketing': 'demand-growth',
  'account-based-marketing-abm': 'demand-growth',
  'channel-partner-marketing': 'demand-growth',
  'demand-generation': 'demand-growth',
  'digital-marketing': 'demand-growth',
  'event-field-marketing': 'demand-growth',
  'growth-marketing': 'demand-growth',
  'lead-gen-scoring': 'demand-growth',
  'paid-advertising': 'demand-growth',
  'paid-advertising-sem': 'demand-growth',
  'sales-enablement': 'demand-growth',
  'customer-experience': 'strategy-insights',
  'customer-experience-cx': 'strategy-insights',
  'customer-marketing': 'strategy-insights',
  'lifecycle-marketing': 'strategy-insights',
  'product-marketing': 'strategy-insights',
  'roi-analysis': 'strategy-insights',
  'competitive-intel': 'strategy-insights',
  'strategy': 'strategy-insights',
  'ai-in-marketing': 'systems-operations',
  'attribution-and-measurement': 'systems-operations',
  'bi-data-engineering': 'systems-operations',
  'data-governance': 'systems-operations',
  'marketing-analytics-reporting': 'systems-operations',
  'marketing-automation': 'systems-operations',
  'marketing-operations': 'systems-operations',
  'martech-optimization': 'systems-operations',
  'revenue-operations': 'systems-operations',
  'crm-management': 'systems-operations',
}

export interface ExpertiseTopic {
  slug: string
  title: string
  summary: string
  pillarId: PillarId
  item: ExpertiseItem
}

function getPillarIdForSlug(slug: string): PillarId {
  const item = getExpertiseBySlug(slug)
  if (item?.pillar) return item.pillar as PillarId
  return SLUG_TO_PILLAR[slug] ?? 'strategy-insights'
}

/**
 * Single source of truth for expertise topics with resolved pillarId.
 * Use for list views, filters, and pillar-based theming.
 */
export const EXPERTISE_TOPICS: ExpertiseTopic[] = expertiseItems
  .filter((item) => PILLAR_IDS.includes(item.slug as PillarId) === false)
  .map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.description ?? item.positioning ?? '',
    pillarId: getPillarIdForSlug(item.slug),
    item,
  }))

export function getTopicBySlug(slug: string): ExpertiseTopic | undefined {
  return EXPERTISE_TOPICS.find((t) => t.slug === slug)
}

export function getTopicsByPillar(pillarId: PillarId): ExpertiseTopic[] {
  return EXPERTISE_TOPICS.filter((t) => t.pillarId === pillarId)
}

export function getPillarIdForTopic(slug: string): PillarId {
  const topic = getTopicBySlug(slug)
  return topic?.pillarId ?? getPillarIdForSlug(slug)
}
