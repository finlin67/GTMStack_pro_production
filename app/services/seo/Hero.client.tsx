'use client'

import dynamic from 'next/dynamic'

const SEOHero = dynamic(() => import('@/src/components/animations/SEOHero'), { ssr: false })

export { SEOHero }
