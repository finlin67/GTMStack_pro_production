import type { ExpertiseItem, IndustryItem } from '@/lib/types'
import type { HomeTemplateContent } from '@/src/templates/home/HomeTemplate'

import { HOME_CONTENT } from '@/content/home'
import { ABOUT_CONTENT } from '@/content/about'
import { CONTACT_CONTENT } from '@/content/contact'
import { RESUME_CONTENT } from '@/content/resume'
import { DEMAND_GENERATION_EXPERTISE } from '@/content/expertise/demand-generation'
import { DEMAND_GROWTH_CONTENT } from '@/content/expertise/demand-growth'
import { STRATEGY_INSIGHTS_CONTENT } from '@/content/expertise/strategy-insights'
import { CONTENT_ENGAGEMENT_CONTENT } from '@/content/expertise/content-engagement'
import { GTM_SYSTEMS_OPERATIONS_CONTENT } from '@/content/expertise/systems-operations'
import { CONTENT_MARKETING_CONTENT } from '@/content/expertise/content-marketing'
import { EVENT_MARKETING_CONTENT } from '@/content/expertise/event-marketing'
import { SOCIAL_MEDIA_MARKETING_CONTENT } from '@/content/expertise/social-media-marketing'
import { ACCOUNT_BASED_MARKETING_CONTENT } from '@/content/expertise/account-based-marketing'
import { PAID_ADVERTISING_SEM_CONTENT } from '@/content/expertise/paid-advertising-sem'
import { SALES_ENABLEMENT_CONTENT } from '@/content/expertise/sales-enablement'
import { CUSTOMER_MARKETING_CONTENT } from '@/content/expertise/customer-marketing'
import { PRODUCT_MARKETING_CONTENT } from '@/content/expertise/product-marketing'
import { MARKETING_ANALYTICS_REPORTING_CONTENT } from '@/content/expertise/marketing-analytics-reporting'
import { MARKETING_AUTOMATION_CONTENT } from '@/content/expertise/marketing-automation'
import { MARTECH_OPTIMIZATION_CONTENT } from '@/content/expertise/martech-optimization'
import { EXPERTISE_MAIN_CONTENT } from '@/content/expertise/main'
import { INDUSTRIES_MAIN_CONTENT } from '@/content/industries/main'
import { industryItems } from '@/content/industries'
import { expertiseItems } from '@/content/expertise'
import { PROJECTS_MAIN_CONTENT } from '@/content/projects/main'
import { GALLERY_MAIN_CONTENT } from '@/content/gallery/main'

export type ContentKey = string

const industryByKey: Record<string, IndustryItem> = Object.fromEntries(
  industryItems.map((item) => [`industries:${item.slug}`, item])
)

const expertiseByKey: Record<string, ExpertiseItem> = Object.fromEntries(
  expertiseItems.map((item) => [`expertise:${item.slug}`, item])
)

const contentByKey: Record<string, unknown> = {
  'home:index': HOME_CONTENT,
  'home:main': HOME_CONTENT,
  'about:main': ABOUT_CONTENT,
  'contact:main': CONTACT_CONTENT,
  'resume:main': RESUME_CONTENT,
  'expertise:main': EXPERTISE_MAIN_CONTENT,
  'expertise:demand-generation': DEMAND_GENERATION_EXPERTISE,
  'expertise:content-marketing': CONTENT_MARKETING_CONTENT,
  'expertise:event-marketing': EVENT_MARKETING_CONTENT,
  'expertise:social-media-marketing': SOCIAL_MEDIA_MARKETING_CONTENT,
  'expertise:account-based-marketing': ACCOUNT_BASED_MARKETING_CONTENT,
  'expertise:paid-advertising-sem': PAID_ADVERTISING_SEM_CONTENT,
  'expertise:sales-enablement': SALES_ENABLEMENT_CONTENT,
  'expertise:customer-marketing': CUSTOMER_MARKETING_CONTENT,
  'expertise:product-marketing': PRODUCT_MARKETING_CONTENT,
  'expertise:marketing-analytics-reporting': MARKETING_ANALYTICS_REPORTING_CONTENT,
  'expertise:marketing-automation': MARKETING_AUTOMATION_CONTENT,
  'expertise:martech-optimization': MARTECH_OPTIMIZATION_CONTENT,
  'pillar:content-engagement': CONTENT_ENGAGEMENT_CONTENT,
  'pillar:demand-growth': DEMAND_GROWTH_CONTENT,
  'pillar:strategy-insights': STRATEGY_INSIGHTS_CONTENT,
  'pillar:systems-operations': GTM_SYSTEMS_OPERATIONS_CONTENT,
  'industries:main': INDUSTRIES_MAIN_CONTENT,
  'projects:main': PROJECTS_MAIN_CONTENT,
  'gallery:main': GALLERY_MAIN_CONTENT,
  ...industryByKey,
  ...expertiseByKey,
}

export function getContentByKey(key: string): unknown | null {
  return key in contentByKey ? contentByKey[key] : null
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
