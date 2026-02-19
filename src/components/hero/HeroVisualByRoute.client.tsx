'use client'

import { usePathname } from 'next/navigation'
import { getHeroVisualForPath } from '@/lib/heroVisualRegistry'

/**
 * Renders the route-based hero visual from heroVisualRegistry.
 * Uses getHeroVisualForPath(pathname) - no hardcoded selection.
 * Hidden on mobile (lg:block), 600x600 container.
 */
export default function HeroVisualByRoute() {
  const pathname = usePathname()
  const entry = pathname ? getHeroVisualForPath(pathname) : null

  if (!entry?.component) return null

  const Component = entry.component

  return (
    <div className="hidden lg:block w-[600px] h-[600px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
      <Component />
    </div>
  )
}
