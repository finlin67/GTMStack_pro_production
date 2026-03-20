import IndustryPageContent from '@/components/industries/IndustryPageContent'
import type { IndustryItem, ExpertiseItem, CaseStudyItem } from '@/lib/types'

export interface IndustryTemplateProps {
  /** Industry item (same as app/industries/[slug] page) */
  industry: IndustryItem
  featuredExpertise: ExpertiseItem[]
  featuredCaseStudies?: CaseStudyItem[]
  whyNow?: string
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  contentKey?: string
  /** Defaults to stitch (sandbox industry.html aesthetic). */
  heroVariant?: 'default' | 'stitch'
}

/**
 * Minimal v1 template for industry.base pages.
 * Reuses IndustryPageContent with same props as app/industries/[slug].
 */
export default function IndustryTemplate({
  industry,
  featuredExpertise,
  featuredCaseStudies,
  whyNow,
  heroVariant = 'stitch',
}: IndustryTemplateProps) {
  return (
    <IndustryPageContent
      industry={industry}
      featuredExpertise={featuredExpertise}
      featuredCaseStudies={featuredCaseStudies}
      whyNow={whyNow}
      heroVariant={heroVariant}
    />
  )
}
