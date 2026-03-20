import type { CaseStudyItem } from '@/lib/types'
import {
  caseStudyItems,
  getCaseStudyBySlug,
  getFeaturedCaseStudies,
  getCaseStudiesByIndustry,
  getCaseStudiesByExpertise,
  getAllCaseStudyTags,
} from '@/content/case-studies'

export type { CaseStudyItem }

/** Typed list of all case studies. Single source for list/detail templates. */
export { caseStudyItems }

export {
  getCaseStudyBySlug,
  getFeaturedCaseStudies,
  getCaseStudiesByIndustry,
  getCaseStudiesByExpertise,
  getAllCaseStudyTags,
}
