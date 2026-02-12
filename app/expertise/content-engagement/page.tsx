import { Metadata } from 'next'
import { getExpertiseByPillar, getExpertiseBySlug } from '@/content/expertise'
import { getCaseStudiesByExpertise } from '@/content/case-studies'
import { industryItems } from '@/content/industries'
import { getExpertiseHeroConfig } from '@/content/expertiseHeroConfigs'
import { ExpertiseDetailContent } from '@/app/expertise/[slug]/ExpertiseDetailContent'
import type { ExpertiseItem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Content & Engagement',
  description:
    'Content marketing, email, omnichannel, social, and video that drive engagement and conversion.',
}

export default function ContentEngagementPillarPage() {
  // Synthetic ExpertiseItem for the Content & Engagement pillar,
  // so we can render this route through the same Stitch theme pipeline
  // used by the Stitch-styled detail pages.
  const pillarItem: ExpertiseItem = {
    slug: 'content-engagement-pillar',
    title: 'Content & Engagement',
    description:
      'Content marketing, email, omnichannel, social, and video programs that map to buyer journeys and deliver measurable pipeline impact.',
    pillar: 'content-engagement',
    pillarLabel: 'Content & Engagement',
    tags: [
      'content marketing',
      'email',
      'omnichannel',
      'social',
      'video',
    ],
    challenges: [
      'Content publishes but attribution shows minimal pipeline.',
      'Sales complains about lack of enablement content.',
      'Content metrics focus on traffic but revenue impact is unclear.',
      'Competitive content outperforming despite similar topics.',
    ],
    proof: {
      outcome: 'Content programs that drive pipeline, MQL growth, and visibility.',
      metrics:
        '$1.2M pipeline in 90 days; +85% MQLs; +60% organic traffic; +40% conference visibility',
    },
  }

  const challenges =
    pillarItem.challenges && pillarItem.challenges.length > 0
      ? pillarItem.challenges
      : [
          'Traditional approaches focus on volume over strategic impact.',
          'Teams lack alignment on ICP, signals, and success definitions.',
          'Orchestration across channels is inconsistent, hurting conversion.',
        ]

  const executionStack: string[] = [
    'Content strategy & pillars',
    'Email & lifecycle journeys',
    'Social & community',
    'Video & storytelling',
    'Omnichannel orchestration',
    'Attribution & measurement',
  ]

  const results = [
    { value: '$1.2M', label: 'Pipeline in 90 days' },
    { value: '+85%', label: 'MQL increase' },
    { value: '+60%', label: 'Organic traffic' },
    { value: '+40%', label: 'Conference visibility' },
  ]

  const relatedExpertise = getExpertiseByPillar('content-engagement').slice(0, 4)
  const relatedCaseStudies = getCaseStudiesByExpertise('content-engagement').slice(0, 3)
  const relatedIndustries = industryItems.filter((ind) =>
    ind.featuredExpertise?.some((slug) => slug && slug.includes('content')),
  ).slice(0, 3)

  const heroConfigSource = getExpertiseBySlug('content-marketing') || getExpertiseBySlug('email-marketing')
  const heroConfigRaw = heroConfigSource ? getExpertiseHeroConfig(heroConfigSource.slug) : null
  const heroConfig = heroConfigRaw
    ? { tagline: heroConfigRaw.tagline, metrics: heroConfigRaw.metrics }
    : undefined

  const pillarTintOverlay = '#0E1748'

  return (
    <ExpertiseDetailContent
      item={pillarItem}
      pillarId="content-engagement"
      pillarTitle="Content & Engagement"
      pillarTintOverlay={pillarTintOverlay}
      challenges={challenges}
      executionStack={executionStack}
      results={results}
      relatedExpertise={relatedExpertise}
      relatedCaseStudies={relatedCaseStudies}
      relatedIndustries={relatedIndustries}
      heroConfig={heroConfig}
      useStitchTheme
    />
  )
}

