import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { industryItems, getIndustryBySlug } from '@/content/industries'
import { getExpertiseBySlug } from '@/content/expertise'
import { getCaseStudyBySlug } from '@/content/case-studies'
import { getPageBySlug } from '@/lib/pageRegistry'
import { getIndustryContentByKey } from '@/src/content/registry'
import IndustryTemplate from '@/src/templates/industries/IndustryTemplate'
import IndustryPageContent from '@/components/industries/IndustryPageContent'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return industryItems.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getIndustryBySlug(params.slug)
  if (!item) return { title: 'Not Found' }
  const registryRow = getPageBySlug('industries', params.slug)
  const title = registryRow?.pageTitle ?? `${item.title} Industry Solutions | GTMstack.pro`
  return {
    title,
    description: item.description,
  }
}

export default function IndustryDetailPage({ params }: Props) {
  const industry = getIndustryBySlug(params.slug)

  if (!industry) {
    notFound()
  }

  // Get featured expertise items
  const featuredExpertise = industry.featuredExpertise
    ?.map(slug => getExpertiseBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item)) || []

  // Get featured case studies
  const featuredCaseStudies = industry.featuredCaseStudies
    ?.map(slug => getCaseStudyBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item)) || []

  // Generate "why now" text based on industry
  const whyNowText = industry.positioning 
    ? `${industry.title} companies face unique GTM challenges. ${industry.positioning} Modern growth plays and proven frameworks can accelerate pipeline while navigating industry-specific constraints.`
    : `${industry.title} companies face unique GTM challenges. Modern growth plays and proven frameworks can accelerate pipeline while navigating industry-specific constraints.`

  const registryRow = getPageBySlug('industries', params.slug)
  const resolved =
    registryRow?.contentKey ? getIndustryContentByKey(registryRow.contentKey) : null
  const defaultContent = (
    <IndustryPageContent
      industry={industry}
      featuredExpertise={featuredExpertise}
      featuredCaseStudies={featuredCaseStudies.length > 0 ? featuredCaseStudies : undefined}
      whyNow={whyNowText}
    />
  )

  if (registryRow) {
    return (
      <IndustryTemplate
        industry={resolved ?? industry}
        featuredExpertise={featuredExpertise}
        featuredCaseStudies={featuredCaseStudies.length > 0 ? featuredCaseStudies : undefined}
        whyNow={whyNowText}
        pageTitle={registryRow.pageTitle}
        theme={registryRow.theme ?? undefined}
        heroVisualId={registryRow.heroVisualId ? registryRow.heroVisualId : undefined}
        contentKey={registryRow.contentKey || undefined}
      />
    )
  }

  return defaultContent
}
