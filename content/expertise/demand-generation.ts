import type { ExpertiseItem } from '@/lib/types'
import { expertiseItems } from '@/content/expertise'

/**
 * Content object for the Demand Generation expertise topic.
 * Mirrors the existing entry in `content/expertise.ts` (slug: "demand-generation").
 */
export const DEMAND_GENERATION_EXPERTISE: ExpertiseItem =
  expertiseItems.find((item) => item.slug === 'demand-generation') as ExpertiseItem

