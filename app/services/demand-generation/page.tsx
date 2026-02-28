import type { ComponentType } from 'react'
import { notFound } from 'next/navigation'
import { getPageByRoute } from '@/lib/pageRegistry'
import { getContentByKey } from '@/src/content/registry'
import { getTemplate } from '@/src/templates/registry'
import type { ExpertiseItem } from '@/lib/types'

// Thin wrapper delegating to registry-driven renderer so clean URL uses templates

type RegistryTemplateProps = {
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  content?: unknown
  item?: ExpertiseItem
}

export default function DemandGenerationServicePage() {
  const row = getPageByRoute('/services/demand-generation')
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

  if (row.templateId === 'expertise.topic') {
    return <Template {...commonProps} item={content as ExpertiseItem} />
  }

  return <Template {...commonProps} content={content} />
}

