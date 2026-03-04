import type { ComponentType } from 'react'
import { notFound } from 'next/navigation'
import { getPageByRoute } from '@/lib/pageRegistry'
import { getContentByKey } from '@/src/content/registry'
import { getTemplate } from '@/src/templates/registry'
import type { IndustryItem } from '@/lib/types'

// Thin wrapper delegating to registry-driven renderer so clean URL uses templates

type RegistryTemplateProps = {
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  // Support both registry-driven "content" and specific template props
  content?: unknown
  industry?: IndustryItem
  featuredExpertise?: unknown[]
  featuredCaseStudies?: unknown[]
  whyNow?: string
}

export default function ManufacturingPage() {
  const row = getPageByRoute('/industries/manufacturing')
  if (!row) notFound()

  const Template = getTemplate(row.templateId as Parameters<typeof getTemplate>[0]) as ComponentType<RegistryTemplateProps>

  if (!row.contentKey) notFound()
  const content = getContentByKey(row.contentKey)
  if (!content) notFound()

  const commonProps = {
    pageTitle: row.pageTitle,
    theme: (row.theme as 'dark' | 'light') ?? undefined,
    heroVisualId: row.heroVisualId ?? undefined,
  }

  if ([
    'industry.base',
    'Uploaded_B2BTechIndustry_v1',
    'Uploaded_IndustrialIndustry_v1',
    'Uploaded_Sector_v1',
    'Uploaded_Healthcare_v1',
    'Uploaded_EDUtech_v1',
  ].includes(row.templateId)) {
    return (
      <Template
        {...commonProps}
        industry={content as IndustryItem}
        featuredExpertise={[]}
        featuredCaseStudies={undefined}
        whyNow={undefined}
      />
    )
  }

  return (
    <Template
      {...commonProps}
      content={content}
    />
  )
}
