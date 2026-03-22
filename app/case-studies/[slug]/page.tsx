import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { caseStudyItems, getCaseStudyBySlug } from '@/src/data/caseStudies'
import { getPageBySlug } from '@/lib/pageRegistry'
import CaseStudyTemplate from '@/src/templates/caseStudies/CaseStudyTemplate'
import RenderCaseStudy from '@/lib/renderCaseStudy'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudyItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getCaseStudyBySlug(slug)
  if (!item) return { title: 'Not Found' }
  const registryRow =
    getPageBySlug('case-studies', slug) ?? getPageBySlug('projects', slug)
  const title = registryRow?.pageTitle ?? `${item.title} Case Study | GTMStack.pro`
  return {
    title,
    description: item.description,
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  const registryRow =
    getPageBySlug('case-studies', slug) ?? getPageBySlug('projects', slug)
  const defaultContent = (
    <RenderCaseStudy caseStudy={caseStudy} routeKind="case-studies" variant="stitch" />
  )

  if (registryRow) {
    return (
      <CaseStudyTemplate
        pageTitle={registryRow.pageTitle}
        theme={registryRow.theme ?? undefined}
        heroVisualId={registryRow.heroVisualId ? registryRow.heroVisualId : undefined}
      >
        {defaultContent}
      </CaseStudyTemplate>
    )
  }

  return defaultContent
}
