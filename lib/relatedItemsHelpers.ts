// lib/relatedItemsHelpers.ts
/**
 * Utility functions for fetching related expertise, case studies, and industries.
 * Supports the shared RelatedItems component across page types.
 */

import { ExpertiseItem, IndustryItem, CaseStudyItem } from '@/lib/types'
import { expertiseItems, getExpertiseBySlug, getExpertiseByPillar } from '@/content/expertise'
import { industryItems, getIndustryBySlug } from '@/content/industries'
import { caseStudyItems, getCaseStudyBySlug, getCaseStudiesByIndustry } from '@/content/case-studies'

/**
 * Get expertise items by an array of slugs
 */
export function getExpertiseBySlugs(slugs: string[]): ExpertiseItem[] {
  return slugs
    .map(slug => getExpertiseBySlug(slug))
    .filter((item): item is ExpertiseItem => Boolean(item))
}

/**
 * Get case studies by an array of slugs
 */
export function getCaseStudiesBySlugs(slugs: string[]): CaseStudyItem[] {
  return slugs
    .map(slug => getCaseStudyBySlug(slug))
    .filter((item): item is CaseStudyItem => Boolean(item))
}

/**
 * Get industries by an array of slugs
 */
export function getIndustriesBySlugs(slugs: string[]): IndustryItem[] {
  return slugs
    .map(slug => getIndustryBySlug(slug))
    .filter((item): item is IndustryItem => Boolean(item))
}

/**
 * Get case studies related to a specific expertise
 * (Case studies that have this expertise in their expertise array)
 */
export function getCaseStudiesByExpertiseSlug(
  expertiseSlug: string,
  limit?: number
): CaseStudyItem[] {
  const filtered = caseStudyItems.filter(cs =>
    cs.expertise?.includes(expertiseSlug)
  )
  return limit ? filtered.slice(0, limit) : filtered
}

/**
 * Get case studies for a specific industry, excluding a given case study
 */
export function getRelatedCaseStudiesByIndustry(
  industrySlug: string,
  excludeSlug?: string,
  limit?: number
): CaseStudyItem[] {
  const filtered = caseStudyItems.filter(cs =>
    cs.industry === industrySlug && cs.slug !== excludeSlug
  )
  return limit ? filtered.slice(0, limit) : filtered
}

/**
 * Get industries that feature a specific expertise
 */
export function getIndustriesByFeaturedExpertise(
  expertiseSlug: string,
  limit?: number
): IndustryItem[] {
  const filtered = industryItems.filter(ind =>
    ind.featuredExpertise?.includes(expertiseSlug)
  )
  return limit ? filtered.slice(0, limit) : filtered
}

/**
 * Get related expertise for an expertise item (same pillar)
 */
export function getRelatedExpertiseByPillar(
  expertiseSlug: string,
  limit?: number
): ExpertiseItem[] {
  const expertise = getExpertiseBySlug(expertiseSlug)
  if (!expertise) return []

  const pillar = expertise.pillar || 'strategy-insights'
  const filtered = getExpertiseByPillar(pillar as any)
    .filter(e => e.slug !== expertiseSlug)

  return limit ? filtered.slice(0, limit) : filtered
}

/**
 * Get all related items for an expertise page
 */
export function getExpertisePageRelatedItems(expertiseSlug: string) {
  const expertise = getExpertiseBySlug(expertiseSlug)
  if (!expertise) return { relatedExpertise: [], relatedCaseStudies: [], relatedIndustries: [] }

  const pillar = expertise.pillar || 'strategy-insights'

  return {
    relatedExpertise: getExpertiseByPillar(pillar as any)
      .filter(e => e.slug !== expertiseSlug)
      .slice(0, 3),
    relatedCaseStudies: getCaseStudiesByExpertiseSlug(expertiseSlug, 3),
    relatedIndustries: getIndustriesByFeaturedExpertise(expertiseSlug, 2),
  }
}

/**
 * Get all related items for an industry page
 */
export function getIndustryPageRelatedItems(industrySlug: string) {
  const industry = getIndustryBySlug(industrySlug)
  if (!industry) return { relatedExpertise: [], relatedCaseStudies: [] }

  return {
    relatedExpertise: industry.featuredExpertise
      ? getExpertiseBySlugs(industry.featuredExpertise).slice(0, 3)
      : [],
    relatedCaseStudies: industry.featuredCaseStudies
      ? getCaseStudiesBySlugs(industry.featuredCaseStudies).slice(0, 2)
      : [],
  }
}

/**
 * Get all related items for a case study page
 */
export function getCaseStudyPageRelatedItems(caseStudySlug: string) {
  const caseStudy = getCaseStudyBySlug(caseStudySlug)
  if (!caseStudy) return { relatedExpertise: [], relatedCaseStudies: [], relatedIndustry: null }

  return {
    relatedExpertise: caseStudy.expertise
      ? getExpertiseBySlugs(caseStudy.expertise).slice(0, 2)
      : [],
    relatedCaseStudies: caseStudy.industry
      ? getRelatedCaseStudiesByIndustry(caseStudy.industry, caseStudySlug, 2)
      : [],
    relatedIndustry: caseStudy.industry
      ? getIndustryBySlug(caseStudy.industry)
      : null,
  }
}

/**
 * Validate cross-links for a case study
 * Returns warnings if expertise or industry slugs don't resolve
 */
export function validateCaseStudyCrossLinks(caseStudy: CaseStudyItem): {
  warnings: string[]
  valid: boolean
} {
  const warnings: string[] = []

  // Check expertise slugs
  if (caseStudy.expertise?.length) {
    caseStudy.expertise.forEach(slug => {
      if (!getExpertiseBySlug(slug)) {
        warnings.push(`Expertise slug not found: ${slug}`)
      }
    })
  }

  // Check industry slug
  if (caseStudy.industry) {
    if (!getIndustryBySlug(caseStudy.industry)) {
      warnings.push(`Industry slug not found: ${caseStudy.industry}`)
    }
  }

  return {
    warnings,
    valid: warnings.length === 0,
  }
}

/**
 * Validate cross-links for an expertise item
 * Returns warnings if case study or industry slugs don't resolve
 */
export function validateExpertiseCrossLinks(expertise: ExpertiseItem): {
  warnings: string[]
  valid: boolean
} {
  const warnings: string[] = []

  // Check case study slugs
  if (expertise.relevant_case_study_slugs?.length) {
    expertise.relevant_case_study_slugs.forEach(slug => {
      if (!getCaseStudyBySlug(slug)) {
        warnings.push(`Case study slug not found in relevant_case_study_slugs: ${slug}`)
      }
    })
  }

  // Check expertise slugs
  if (expertise.relevant_expertise_slugs?.length) {
    expertise.relevant_expertise_slugs.forEach(slug => {
      if (!getExpertiseBySlug(slug)) {
        warnings.push(`Expertise slug not found in relevant_expertise_slugs: ${slug}`)
      }
    })
  }

  return {
    warnings,
    valid: warnings.length === 0,
  }
}

/**
 * Validate cross-links for an industry item
 * Returns warnings if expertise or case study slugs don't resolve
 */
export function validateIndustryCrossLinks(industry: IndustryItem): {
  warnings: string[]
  valid: boolean
} {
  const warnings: string[] = []

  // Check featured expertise slugs
  if (industry.featuredExpertise?.length) {
    industry.featuredExpertise.forEach(slug => {
      if (!getExpertiseBySlug(slug)) {
        warnings.push(`Expertise slug not found in featuredExpertise: ${slug}`)
      }
    })
  }

  // Check featured case study slugs
  if (industry.featuredCaseStudies?.length) {
    industry.featuredCaseStudies.forEach(slug => {
      if (!getCaseStudyBySlug(slug)) {
        warnings.push(`Case study slug not found in featuredCaseStudies: ${slug}`)
      }
    })
  }

  return {
    warnings,
    valid: warnings.length === 0,
  }
}

/**
 * Generate a full cross-link audit report
 * Shows all warnings across expertise, industries, and case studies
 */
export function generateCrossLinkAuditReport(): {
  totalItems: number
  issuesFound: number
  expertise: Array<{ slug: string; warnings: string[] }>
  industries: Array<{ slug: string; warnings: string[] }>
  caseStudies: Array<{ slug: string; warnings: string[] }>
} {
  const expertiseIssues = expertiseItems
    .map(e => ({ slug: e.slug, ...validateExpertiseCrossLinks(e) }))
    .filter(e => !e.valid)

  const industryIssues = industryItems
    .map(i => ({ slug: i.slug, ...validateIndustryCrossLinks(i) }))
    .filter(i => !i.valid)

  const caseStudyIssues = caseStudyItems
    .map(cs => ({ slug: cs.slug, ...validateCaseStudyCrossLinks(cs) }))
    .filter(cs => !cs.valid)

  return {
    totalItems: expertiseItems.length + industryItems.length + caseStudyItems.length,
    issuesFound: expertiseIssues.length + industryIssues.length + caseStudyIssues.length,
    expertise: expertiseIssues.map(e => ({
      slug: e.slug,
      warnings: e.warnings,
    })),
    industries: industryIssues.map(i => ({
      slug: i.slug,
      warnings: i.warnings,
    })),
    caseStudies: caseStudyIssues.map(cs => ({
      slug: cs.slug,
      warnings: cs.warnings,
    })),
  }
}
