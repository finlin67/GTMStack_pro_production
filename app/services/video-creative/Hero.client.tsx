'use client'

import dynamic from 'next/dynamic'

const VideoCreativeHero = dynamic(
  () => import('@/src/components/animations/VideoCreativeHero'),
  { ssr: false }
)

export { VideoCreativeHero }
