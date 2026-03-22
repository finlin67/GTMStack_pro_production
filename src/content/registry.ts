import type { ExpertiseItem, IndustryItem } from '@/lib/types'
import type { HomeTemplateContent } from '@/src/templates/home/HomeTemplate'

import { CaseStudyItemSchema } from '@/src/lib/content-schemas/CaseStudyItem'
import { ExpertiseItemSchema } from '@/src/lib/content-schemas/ExpertiseItem'
import { ExpertisePageContentSchema } from '@/src/lib/content-schemas/ExpertisePageContent'
import { IndustryItemSchema } from '@/src/lib/content-schemas/IndustryItem'

import { HOME_CONTENT, HOME_STITCH_CONTENT } from '@/content/home'
import { ABOUT_CONTENT } from '@/content/about'
import { CONTACT_CONTENT } from '@/content/contact'
import { RESUME_CONTENT } from '@/content/resume'
import { DEMAND_GENERATION_CONTENT } from '@/content/expertise/demand-generation'
import { DIGITAL_MARKETING_CONTENT } from '@/content/expertise/digital-marketing'
import { DEMAND_GROWTH_CONTENT } from '@/content/expertise/demand-growth'
import { STRATEGY_INSIGHTS_CONTENT } from '@/content/expertise/strategy-insights'
import { CONTENT_ENGAGEMENT_CONTENT } from '@/content/expertise/content-engagement'
import { GTM_SYSTEMS_OPERATIONS_CONTENT } from '@/content/expertise/systems-operations'
import { CONTENT_MARKETING_PERSONALIZATION_CONTENT as CONTENT_MARKETING_CONTENT } from '@/content/expertise/content-marketing'
import { EVENT_TRADESHOW_MANAGEMENT_CONTENT as EVENT_MARKETING_CONTENT } from '@/content/expertise/event-marketing'
import { SOCIAL_MEDIA_AND_REPUTATION_MANAGEMENT_CONTENT as SOCIAL_MEDIA_MARKETING_CONTENT } from '@/content/expertise/social-media-marketing'
import { ACCOUNT_BASED_MARKETING_CONTENT } from '@/content/expertise/account-based-marketing'
import { PAID_ADVERTISING_SEM_CONTENT } from '@/content/expertise/paid-advertising-sem'
import { SALES_ENABLEMENT_CONTENT } from '@/content/expertise/sales-enablement'
import { CUSTOMER_MARKETING_JOURNEY_MAPPING_CONTENT as CUSTOMER_MARKETING_CONTENT } from '@/content/expertise/customer-marketing'
import { PRODUCT_MARKETING_CONTENT } from '@/content/expertise/product-marketing'
import { REPORTING_DASHBOARDS_ATTRIBUTION_CONTENT as MARKETING_ANALYTICS_REPORTING_CONTENT } from '@/content/expertise/marketing-analytics-reporting'
import { MARKETING_AUTOMATION_CONTENT } from '@/content/expertise/marketing-automation'
import { TECH_STACK_OPTIMIZATION_ENABLEMENT_CONTENT as MARTECH_OPTIMIZATION_CONTENT } from '@/content/expertise/martech-optimization'
import { EXPERTISE_MAIN_CONTENT } from '@/content/expertise/main'
import { COMPETITIVE_INTELLIGENCE_POSITIONING_CONTENT } from '@/content/expertise/competitive-intel'
import { CRM_MANAGEMENT_CONTENT } from '@/content/expertise/crm-management'
import { LEAD_GEN_SCORING_CONTENT } from '@/content/expertise/lead-gen-scoring'
import { REPORTING_DASHBOARDS_ATTRIBUTION_CONTENT as ANALYTICS_PAGE_CONTENT } from '@/content/expertise/analytics'
import { RESPONSIVE_WEB_DESIGN_UI_UX_CONTENT } from '@/content/expertise/web-design-ui-ux'
import { ROI_AND_BREAK_EVEN_ANALYSIS_CONTENT } from '@/content/expertise/roi-analysis'
import { GTM_STRATEGY_CONTENT } from '@/content/expertise/strategy'
import { SEARCH_ENGINE_OPTIMIZATION_AND_MANAGEMENT_CONTENT } from '@/content/expertise/search-engine-optimization'
import { INDUSTRIES_MAIN_CONTENT } from '@/content/industries/main'
import { industryItems } from '@/content/industries'
import { expertiseItems } from '@/content/expertise'
import { PROJECTS_MAIN_CONTENT } from '@/content/projects/main'
import { GALLERY_MAIN_CONTENT } from '@/content/gallery/main'
import { caseStudyItems } from '@/content/case-studies'
import {
  mapExpertiseContentToContentEngagementTemplate,
  mapExpertiseContentToDemandGrowthTemplate,
  mapExpertiseContentToStrategyInsightsTemplate,
  mapExpertiseContentToSystemOperationsTemplate,
} from '@/src/content/adapters/expertiseMapper'

export type ContentKey = string

const caseStudyByKey: Record<string, unknown> = Object.fromEntries(
  caseStudyItems.map((item) => [`case-studies:${item.slug}`, item])
)

const industryByKey: Record<string, IndustryItem> = Object.fromEntries(
  industryItems.map((item) => [`industries:${item.slug}`, item])
)

const expertiseByKey: Record<string, ExpertiseItem> = Object.fromEntries(
  expertiseItems.map((item) => [`expertise:${item.slug}`, item])
)

const contentByKey: Record<string, unknown> = {
  'home:index': HOME_CONTENT,
  'home:main': HOME_CONTENT,
  'home:stitch': HOME_STITCH_CONTENT,
  'about:main': ABOUT_CONTENT,
  'contact:main': CONTACT_CONTENT,
  'resume:main': RESUME_CONTENT,
  'expertise:main': EXPERTISE_MAIN_CONTENT,
  // Use null to trigger Uploaded_Expertise_v1 built-in defaults for stitch parity.
  'expertise:stitch-main': null,
  'case-studies:main': caseStudyItems,
  // Expertise page content should override the expertiseItems index entries.
  ...expertiseByKey,
  'expertise:account-based-marketing': mapExpertiseContentToDemandGrowthTemplate(
    ACCOUNT_BASED_MARKETING_CONTENT
  ),
  'expertise:demand-generation': mapExpertiseContentToDemandGrowthTemplate(
    DEMAND_GENERATION_CONTENT
  ),
  'expertise:digital-marketing': mapExpertiseContentToDemandGrowthTemplate(
    DIGITAL_MARKETING_CONTENT
  ),
  'expertise:content-marketing': mapExpertiseContentToContentEngagementTemplate(
    CONTENT_MARKETING_CONTENT
  ),
  'expertise:event-marketing': mapExpertiseContentToContentEngagementTemplate(
    EVENT_MARKETING_CONTENT
  ),
  'expertise:social-media-marketing': mapExpertiseContentToContentEngagementTemplate(
    SOCIAL_MEDIA_MARKETING_CONTENT
  ),
  'expertise:paid-advertising-sem': mapExpertiseContentToDemandGrowthTemplate(
    PAID_ADVERTISING_SEM_CONTENT
  ),
  'expertise:sales-enablement': mapExpertiseContentToDemandGrowthTemplate(
    SALES_ENABLEMENT_CONTENT
  ),
  'expertise:customer-marketing': mapExpertiseContentToStrategyInsightsTemplate(
    CUSTOMER_MARKETING_CONTENT
  ),
  'expertise:product-marketing': mapExpertiseContentToStrategyInsightsTemplate(
    PRODUCT_MARKETING_CONTENT
  ),
  'expertise:marketing-analytics-reporting': mapExpertiseContentToSystemOperationsTemplate(
    MARKETING_ANALYTICS_REPORTING_CONTENT
  ),
  'expertise:marketing-automation': mapExpertiseContentToSystemOperationsTemplate(
    MARKETING_AUTOMATION_CONTENT
  ),
  'expertise:martech-optimization': mapExpertiseContentToSystemOperationsTemplate(
    MARTECH_OPTIMIZATION_CONTENT
  ),
  'expertise:competitive-intel': mapExpertiseContentToStrategyInsightsTemplate(
    COMPETITIVE_INTELLIGENCE_POSITIONING_CONTENT
  ),
  'expertise:crm-management': mapExpertiseContentToSystemOperationsTemplate(
    CRM_MANAGEMENT_CONTENT
  ),
  'expertise:lead-gen-scoring': mapExpertiseContentToDemandGrowthTemplate(
    LEAD_GEN_SCORING_CONTENT
  ),
  'expertise:analytics': ANALYTICS_PAGE_CONTENT,
  'expertise:web-design-ui-ux': mapExpertiseContentToContentEngagementTemplate(
    RESPONSIVE_WEB_DESIGN_UI_UX_CONTENT
  ),
  'expertise:roi-analysis': mapExpertiseContentToStrategyInsightsTemplate(
    ROI_AND_BREAK_EVEN_ANALYSIS_CONTENT
  ),
  'expertise:gtm-strategy-development': mapExpertiseContentToStrategyInsightsTemplate(
    GTM_STRATEGY_CONTENT
  ),
  'expertise:search-engine-optimization': mapExpertiseContentToContentEngagementTemplate(
    SEARCH_ENGINE_OPTIMIZATION_AND_MANAGEMENT_CONTENT
  ),
  'pillar:content-engagement': mapExpertiseContentToContentEngagementTemplate(
    CONTENT_ENGAGEMENT_CONTENT
  ),
  'pillar:demand-growth': mapExpertiseContentToDemandGrowthTemplate(
    DEMAND_GROWTH_CONTENT
  ),
  'pillar:strategy-insights': mapExpertiseContentToStrategyInsightsTemplate(
    STRATEGY_INSIGHTS_CONTENT
  ),
  'pillar:systems-operations': mapExpertiseContentToSystemOperationsTemplate(
    GTM_SYSTEMS_OPERATIONS_CONTENT
  ),
  'industries:main': INDUSTRIES_MAIN_CONTENT,
  'projects:main': PROJECTS_MAIN_CONTENT,
  'gallery:main': GALLERY_MAIN_CONTENT,
  ...caseStudyByKey,
  ...industryByKey,
}

function shouldValidateRuntimeContent(): boolean {
  // Default on in development to catch mismatches early.
  // For other envs, allow explicit opt-in (CONTENT_VALIDATE=1).
  if (process.env.CONTENT_VALIDATE === '1') return true
  return process.env.NODE_ENV === 'development'
}

function formatZodIssues(
  issues: { path: ReadonlyArray<string | number | symbol>; message: string }[]
): string {
  return issues
    .map((i) => {
      const p = i.path.length
        ? i.path.map((seg) => (typeof seg === 'symbol' ? seg.toString() : String(seg))).join('.')
        : '(root)'
      return `${p}: ${i.message}`
    })
    .join('\n')
}

function isDemandGrowthTemplateLike(value: unknown): boolean {
  return (
    !!value &&
    typeof value === 'object' &&
    'nav' in value &&
    'hero' in value &&
    'subDisciplines' in value
  )
}

function isContentEngagementTemplateLike(value: unknown): boolean {
  return (
    !!value &&
    typeof value === 'object' &&
    'disciplinesItems' in value &&
    'journeyTimeline' in value
  )
}

function isStrategyInsightsTemplateLike(value: unknown): boolean {
  return (
    !!value &&
    typeof value === 'object' &&
    'subDisciplines' in value &&
    'nodeDiagram' in value &&
    'lifecycle' in value
  )
}

function isSystemOperationsTemplateLike(value: unknown): boolean {
  return (
    !!value &&
    typeof value === 'object' &&
    'services' in value &&
    'martech' in value &&
    'aiExecution' in value
  )
}

function validateContentByKey(key: string, value: unknown): unknown {
  // Only validate key families that have strict schemas today.
  if (key.startsWith('industries:') && key !== 'industries:main') {
    const parsed = IndustryItemSchema.safeParse(value)
    if (!parsed.success) {
      throw new Error(`Invalid content for ${key} (IndustryItem)\n${formatZodIssues(parsed.error.issues)}`)
    }
    const data = parsed.data
    for (const slug of data.featuredCaseStudies ?? []) {
      const refKey = `case-studies:${slug}`
      if (!(refKey in contentByKey)) {
        throw new Error(`Invalid content for ${key}: featuredCaseStudies references missing '${refKey}'`)
      }
    }
    for (const slug of data.featuredExpertise ?? []) {
      const refKey = `expertise:${slug}`
      if (!(refKey in contentByKey)) {
        throw new Error(`Invalid content for ${key}: featuredExpertise references missing '${refKey}'`)
      }
    }
    return data
  }

  if (key === 'case-studies:main') {
    const parsed = CaseStudyItemSchema.array().safeParse(value)
    if (!parsed.success) {
      throw new Error(
        `Invalid content for ${key} (CaseStudyItem[])\n${formatZodIssues(parsed.error.issues)}`
      )
    }
    return parsed.data
  }

  if (key.startsWith('case-studies:') && key !== 'case-studies:main') {
    const parsed = CaseStudyItemSchema.safeParse(value)
    if (!parsed.success) {
      throw new Error(`Invalid content for ${key} (CaseStudyItem)\n${formatZodIssues(parsed.error.issues)}`)
    }
    const data = parsed.data
    const industryKey = `industries:${data.industry}`
    if (!(industryKey in contentByKey)) {
      throw new Error(`Invalid content for ${key}: industry references missing '${industryKey}'`)
    }
    for (const slug of data.expertise ?? []) {
      const refKey = `expertise:${slug}`
      if (!(refKey in contentByKey)) {
        throw new Error(`Invalid content for ${key}: expertise references missing '${refKey}'`)
      }
    }
    return data
  }

  if (key.startsWith('expertise:') && key !== 'expertise:main') {
    if (
      isDemandGrowthTemplateLike(value) ||
      isContentEngagementTemplateLike(value) ||
      isStrategyInsightsTemplateLike(value) ||
      isSystemOperationsTemplateLike(value)
    ) {
      return value
    }

    const pageParsed = ExpertisePageContentSchema.safeParse(value)
    if (pageParsed.success) {
      return pageParsed.data
    }

    const itemParsed = ExpertiseItemSchema.safeParse(value)
    if (!itemParsed.success) {
      throw new Error(
        `Invalid content for ${key} (ExpertisePageContent | ExpertiseItem)\n` +
          `ExpertisePageContent:\n${formatZodIssues(pageParsed.error.issues)}\n\n` +
          `ExpertiseItem:\n${formatZodIssues(itemParsed.error.issues)}`
      )
    }

    const data = itemParsed.data
    for (const slug of data.relevant_case_study_slugs ?? []) {
      const refKey = `case-studies:${slug}`
      if (!(refKey in contentByKey)) {
        throw new Error(`Invalid content for ${key}: relevant_case_study_slugs references missing '${refKey}'`)
      }
    }
    for (const slug of data.relevant_expertise_slugs ?? []) {
      const refKey = `expertise:${slug}`
      if (!(refKey in contentByKey)) {
        throw new Error(`Invalid content for ${key}: relevant_expertise_slugs references missing '${refKey}'`)
      }
    }
    return data
  }

  if (key.startsWith('pillar:')) {
    return value
  }

  return value
}

export function getContentByKey(key: string): unknown | null {
  if (!(key in contentByKey)) return null
  const value = contentByKey[key]
  if (!shouldValidateRuntimeContent()) return value
  return validateContentByKey(key, value)
}

export function getHomeContentByKey(key: string): HomeTemplateContent | null {
  if (!key.startsWith('home:')) return null
  const content = getContentByKey(key)
  return content != null ? (content as HomeTemplateContent) : null
}

export function getExpertiseContentByKey(key: string): ExpertiseItem | null {
  if (!key.startsWith('expertise:')) return null
  const content = getContentByKey(key)
  return content != null ? (content as ExpertiseItem) : null
}

export function getIndustryContentByKey(key: string): IndustryItem | null {
  if (!key.startsWith('industries:')) return null
  const content = getContentByKey(key)
  return content != null ? (content as IndustryItem) : null
}
