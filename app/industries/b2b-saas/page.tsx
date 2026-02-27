import type { ComponentType } from 'react'
import { notFound } from 'next/navigation'
import { getPageByRoute } from '@/lib/pageRegistry'
import { getContentByKey } from '@/src/content/registry'
import { getTemplate } from '@/src/templates/registry'

// Thin wrapper delegating to registry-driven renderer so clean URL uses templates

type RegistryTemplateProps = {
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  content: unknown
}

export default function B2BSaaSPage() {
  const row = getPageByRoute('/industries/b2b-saas')
  if (!row) notFound()

  const Template = getTemplate(row.templateId as Parameters<typeof getTemplate>[0]) as ComponentType<RegistryTemplateProps>
  const content = row.contentKey ? getContentByKey(row.contentKey) : null

  return (
    <Template
      pageTitle={row.pageTitle}
      theme={row.theme ?? undefined}
      heroVisualId={row.heroVisualId ?? undefined}
      content={content}
    />
  )
}
