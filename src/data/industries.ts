import type { IndustryItem } from '@/lib/types'
import {
  industryItems,
  getIndustryBySlug,
  getFeaturedIndustries,
  getAllIndustryTags,
} from '@/content/industries'

export type { IndustryItem }

/** Typed list of all industries. Single source for list/detail templates. */
export { industryItems }

export { getIndustryBySlug, getFeaturedIndustries, getAllIndustryTags }
