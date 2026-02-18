import { notFound } from 'next/navigation'
import { getPageByRoute } from '@/lib/pageRegistry'
import { getContentByKey } from '@/src/content/registry'
import { getTemplate } from '@/src/templates/registry'

export default function Page() {
  const row = getPageByRoute('/')
  if (!row) notFound()

  const Template = getTemplate(row.templateId as Parameters<typeof getTemplate>[0])
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
