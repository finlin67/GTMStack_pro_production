'use client'

import { usePathname } from 'next/navigation'
import { getHeroVisualForPath } from '@/lib/heroVisualRegistry'
import { getAnimationById } from '@/src/data/animations'

const HERO_VISUAL_ID_MAP: Record<string, string> = {
  'gtmstack-hero-tile-v2': 'gtmstack-pro',
  'gtm-strategy-audience-tile-v2': 'gtm-audience-tile-hero',
}

function renderAnimationShell(Component: React.ComponentType) {
  return (
    <div className="hidden lg:block w-[600px] h-[600px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
      <Component />
    </div>
  )
}

/**
 * Renders hero visual by heroVisualId (from page-registry.csv) when provided,
 * otherwise falls back to getHeroVisualForPath(pathname).
 * If heroVisualId is set but animation not found: renders null, logs in dev only.
 */
export default function HeroVisualByRoute({ heroVisualId }: { heroVisualId?: string }) {
  const pathname = usePathname()

  // heroVisualId from page-registry.csv is source of truth
  if (heroVisualId?.trim()) {
    const requestedId = heroVisualId.trim()
    const resolvedId = HERO_VISUAL_ID_MAP[requestedId] ?? requestedId
    const anim = getAnimationById(resolvedId)
    if (anim?.component) {
      const Component = anim.component
      return renderAnimationShell(Component)
    }
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `[HeroVisualByRoute] heroVisualId "${requestedId}" not found in ANIMATION_REGISTRY; falling back to route registry`
      )
    }
  }

  // Fallback: route-based registry (existing behavior)
  const entry = pathname ? getHeroVisualForPath(pathname) : null
  if (!entry?.component) return null

  const Component = entry.component
  return renderAnimationShell(Component)
}
