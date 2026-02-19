import type { ComponentType } from 'react'
import type { ExpertiseItem } from '@/lib/types'
import { ContentEngagementPillarCategory, ContentEngagementPillarTopic } from './ContentEngagementPillar'
import { DemandGrowthPillarCategory, DemandGrowthPillarTopic } from './DemandGrowthPillar'
import { StrategyInsightsPillarCategory, StrategyInsightsPillarTopic } from './StrategyInsightsPillar'
import { SystemsOperationsPillarCategory, SystemsOperationsPillarTopic } from './SystemsOperationsPillar'

/**
 * Pillar IDs for expertise category and topic pages.
 * Used to dispatch to per-pillar templates.
 */
export type PillarId =
  | 'content-engagement'
  | 'demand-growth'
  | 'strategy-insights'
  | 'systems-operations'

export const PILLAR_IDS: PillarId[] = [
  'content-engagement',
  'demand-growth',
  'strategy-insights',
  'systems-operations',
]

export const PILLAR_TITLES: Record<PillarId, string> = {
  'content-engagement': 'Content & Engagement',
  'demand-growth': 'Demand & Growth',
  'strategy-insights': 'Strategy & Insights',
  'systems-operations': 'Systems & Operations',
}

export interface PillarCategoryProps {
  pillarId: PillarId
  children: React.ReactNode
}

export interface PillarTopicProps {
  item: ExpertiseItem
  pillarId: PillarId
  children?: React.ReactNode
}

const PILLAR_CATEGORY_MAP: Record<PillarId, ComponentType<PillarCategoryProps>> = {
  'content-engagement': ContentEngagementPillarCategory,
  'demand-growth': DemandGrowthPillarCategory,
  'strategy-insights': StrategyInsightsPillarCategory,
  'systems-operations': SystemsOperationsPillarCategory,
}

const PILLAR_TOPIC_MAP: Record<PillarId, ComponentType<PillarTopicProps>> = {
  'content-engagement': ContentEngagementPillarTopic,
  'demand-growth': DemandGrowthPillarTopic,
  'strategy-insights': StrategyInsightsPillarTopic,
  'systems-operations': SystemsOperationsPillarTopic,
}

export function getPillarCategoryComponent(pillarId: PillarId): ComponentType<PillarCategoryProps> {
  return PILLAR_CATEGORY_MAP[pillarId] ?? ContentEngagementPillarCategory
}

export function getPillarTopicComponent(pillarId: PillarId): ComponentType<PillarTopicProps> {
  return PILLAR_TOPIC_MAP[pillarId] ?? StrategyInsightsPillarTopic
}
