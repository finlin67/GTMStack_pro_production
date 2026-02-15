import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { caseStudyItems, getCaseStudyBySlug } from '@/content/case-studies'
import { getPageBySlug } from '@/lib/pageRegistry'
import CaseStudyTemplate from '@/src/templates/caseStudies/CaseStudyTemplate'
import RenderCaseStudy from '@/lib/renderCaseStudy'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return caseStudyItems.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getCaseStudyBySlug(params.slug)
  if (!item) return { title: 'Not Found' }
  const registryRow =
    getPageBySlug('case-studies', params.slug) ?? getPageBySlug('projects', params.slug)
  const title = registryRow?.pageTitle ?? `${item.title} Case Study | GTMstack.pro`
  return {
    title,
    description: item.description,
  }
}

export default function CaseStudyDetailPage({ params }: Props) {
  const caseStudy = getCaseStudyBySlug(params.slug)

  if (!caseStudy) {
    notFound()
  }

  const registryRow =
    getPageBySlug('case-studies', params.slug) ?? getPageBySlug('projects', params.slug)
  const defaultContent = <RenderCaseStudy caseStudy={caseStudy} routeKind="case-studies" />

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
