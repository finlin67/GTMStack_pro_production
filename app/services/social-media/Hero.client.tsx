'use client'

import dynamic from 'next/dynamic'

const SocialMediaHero = dynamic(
  () => import('@/src/components/animations/SocialMediaHero'),
  { ssr: false }
)

export { SocialMediaHero }
