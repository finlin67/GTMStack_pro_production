'use client'

import { usePathname } from 'next/navigation'
import { getHeroVisualForPath } from '@/lib/heroVisualRegistry'
import { getAnimationById } from '@/src/data/animations'

/**
 * Renders hero visual by heroVisualId (from page-registry.csv) when provided,
 * otherwise falls back to getHeroVisualForPath(pathname).
 * If heroVisualId is set but animation not found: renders null, logs in dev only.
 */
export default function HeroVisualByRoute({ heroVisualId }: { heroVisualId?: string }) {
  const pathname = usePathname()

  // heroVisualId from page-registry.csv is source of truth
  if (heroVisualId?.trim()) {
    const anim = getAnimationById(heroVisualId.trim())
    if (anim?.component) {
      const Component = anim.component
      return (
        <div className="hidden lg:block w-[600px] h-[600px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
          <Component />
        </div>
      )
    }
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[HeroVisualByRoute] heroVisualId "${heroVisualId}" not found in ANIMATION_REGISTRY; rendering null`)
    }
    return null
  }

  // Fallback: route-based registry (existing behavior)
  const entry = pathname ? getHeroVisualForPath(pathname) : null
  if (!entry?.component) return null

  const Component = entry.component
  return (
    <div className="hidden lg:block w-[600px] h-[600px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
      <Component />
    </div>
  )
}
