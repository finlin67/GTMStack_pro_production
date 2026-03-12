import type { Metadata } from 'next'
import ExpertiseDetailPage, { generateMetadata as generateDetailMetadata } from '../[slug]/page'

const STRATEGY_INSIGHTS_SLUG = 'strategy-insights' as const

export async function generateMetadata(): Promise<Metadata> {
  return generateDetailMetadata({
    params: Promise.resolve({ slug: STRATEGY_INSIGHTS_SLUG }),
  })
}

export default function StrategyInsightsPage() {
  return (
    <ExpertiseDetailPage
      params={Promise.resolve({ slug: STRATEGY_INSIGHTS_SLUG })}
    />
  )
}
