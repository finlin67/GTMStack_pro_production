import { notFound } from 'next/navigation'
import { getPageByRoute } from '@/lib/pageRegistry'
import { getExpertiseContentByKey } from '@/src/content/registry'
import { getTemplate } from '@/src/templates/registry'

export default function ExpertisePage() {
  const row = getPageByRoute('/expertise')
  if (!row) notFound()

  const Template = getTemplate(row.templateId as any)
  const content = row.contentKey ? getExpertiseContentByKey(row.contentKey) : null

  return (
    <Template
      pageTitle={row.pageTitle}
      theme={row.theme ?? undefined}
      heroVisualId={row.heroVisualId ?? undefined}
      content={content}
    />
  )
}
