'use client'

import dynamic from 'next/dynamic'

const ContentMarketingHero = dynamic(
  () => import('@/src/components/animations/ContentMarketingHero'),
  { ssr: false }
)

export { ContentMarketingHero }
