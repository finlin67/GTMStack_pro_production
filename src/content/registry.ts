import type { ExpertiseItem, IndustryItem } from '@/lib/types'
import type { HomeTemplateContent } from '@/src/templates/home/HomeTemplate'

import { HOME_CONTENT } from '@/content/home'
import { ABOUT_CONTENT } from '@/content/about'
import { CONTACT_CONTENT } from '@/content/contact'
import { RESUME_CONTENT } from '@/content/resume'
import { DEMAND_GENERATION_EXPERTISE } from '@/content/expertise/demand-generation'
import { EXPERTISE_MAIN_CONTENT } from '@/content/expertise/main'
import INDUSTRIES_MAIN_CONTENT from '@/content/industries/main'
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
