import type { MetadataRoute } from 'next'
import { expertiseItems } from '@/content/expertise'
import { industryItems } from '@/content/industries'
import { caseStudyItems } from '@/content/case-studies'

export const dynamic = 'force-static'

const BASE_URL = 'https://gtmstack.pro'

// ─── Pillar slugs (static routes under app/expertise/) ───────────────────────
const PILLAR_SLUGS = [
  'content-engagement',
  'demand-growth',
  'strategy-insights',
  'systems-operations',
] as const

// ─── Static service routes under app/services/ ───────────────────────────────
const SERVICE_SLUGS = [
  'content-marketing',
  'demand-generation',
  'paid-advertising',
  'seo',
  'social-media',
  'video-creative',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // ── Static / top-level pages ──────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                         lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/about`,              lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`,            lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/resume`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/blog`,               lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE_URL}/gallery`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/case-studies`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/expertise`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/industries`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/projects`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/case-studies/ai-visualizations`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  // ── Service pages (e.g. /services/seo) ───────────────────────────────────
  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // ── Expertise pillar pages (e.g. /expertise/content-engagement) ───────────
  const pillarPages: MetadataRoute.Sitemap = PILLAR_SLUGS.map((slug) => ({
    url: `${BASE_URL}/expertise/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  // ── Expertise topic pages (e.g. /expertise/account-based-marketing) ───────
  const expertisePages: MetadataRoute.Sitemap = expertiseItems.map((item) => ({
    url: `${BASE_URL}/expertise/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  // ── Industry pages (e.g. /industries/b2b-saas) ────────────────────────────
  const industryPages: MetadataRoute.Sitemap = industryItems.map((item) => ({
    url: `${BASE_URL}/industries/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  // ── Case study pages (e.g. /case-studies/abm-system-launch-prgx) ──────────
  const caseStudyPages: MetadataRoute.Sitemap = caseStudyItems.map((item) => ({
    url: `${BASE_URL}/case-studies/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...pillarPages,
    ...expertisePages,
    ...industryPages,
    ...caseStudyPages,
  ]
}
