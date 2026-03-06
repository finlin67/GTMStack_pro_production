export const dynamic = 'force-dynamic'
export const revalidate = 0

import type { ComponentType } from 'react'
import { notFound } from 'next/navigation'
import { getPageByRoute } from '@/lib/pageRegistry'
import { getContentByKey } from '@/src/content/registry'
import { getTemplate } from '@/src/templates/registry'

/** Common props passed by registry-driven pages; template-specific props are optional at call site. */
type RegistryTemplateProps = {
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  content: unknown
}

export default function GalleryPage() {
  const row = getPageByRoute('/gallery')
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
