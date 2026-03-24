import { PreviewClient } from './PreviewClient'

// Never statically generated — this route exists only for screenshot tooling.
export const dynamic = 'force-dynamic'

// Exclude from sitemaps and search indexing.
export const metadata = {
  robots: { index: false, follow: false },
}

interface Props {
  params: Promise<{ animationId: string }>
}

export default async function PreviewPage({ params }: Props) {
  const { animationId } = await params
  return <PreviewClient animationId={animationId} />
}
