import type { ExpertiseItem } from '@/lib/types'
import { expertiseItems } from '@/content/expertise'

/**
 * Content object for the Demand & Growth expertise pillar.
 * Mirrors the existing entry in `content/expertise.ts` (slug: "demand-growth").
 */
export const DEMAND_GROWTH_CONTENT: ExpertiseItem =
  expertiseItems.find((item) => item.slug === 'demand-growth') as ExpertiseItem
