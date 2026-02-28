'use client'

import dynamic from 'next/dynamic'

const PaidAdvertisingHero = dynamic(
  () => import('@/src/components/animations/PaidAdvertisingHero'),
  { ssr: false }
)

export { PaidAdvertisingHero }
