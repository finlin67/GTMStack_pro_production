'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { HeroTileAnimation, TileVariant } from '@/components/ui/HeroTileAnimation.client'
import { ExpertiseHeroConfig } from '@/content/expertiseHeroConfigs'
import { getTileVariantForPath } from '@/lib/heroTilePresets'
import { getHeroVisualForPath } from '@/lib/heroVisualRegistry'
import {
  getAnimationsByFunction,
  getAnimationById,
  getRotatedAnimation,
  type MarketingFunction,
} from '@/src/data/animations'
import LeadGenTileAnimation from '@/src/components/animations/LeadGenTileAnimation'
import { Shuffle } from 'lucide-react'

const DEBUG_TILE = false

type ResolvedMode = 'CUSTOM_ANIMATION' | 'TILE_ANIMATION'

interface ExpertiseHeroVisualProps {
  animation?: React.ReactNode
  config?: ExpertiseHeroConfig
  borderClassName: string
  tileVariant?: TileVariant
}

/**
 * Maps route paths to marketing functions for animation rotation
 */
function getMarketingFunctionFromPath(pathname: string): MarketingFunction | null {
  const routeToFunction: Record<string, MarketingFunction> = {
    '/expertise/video-marketing': 'video-marketing',
    '/expertise/search-engine-optimization': 'search-engine-optimization',
    '/expertise/marketing-operations': 'marketing-operations',
    '/expertise/marketing-automation': 'marketing-automation',
    '/expertise/account-based-marketing-abm': 'account-based-marketing-abm',
    '/expertise/content-marketing': 'content-marketing',
    '/expertise/demand-generation': 'demand-generation',
    '/expertise/email-marketing': 'email-marketing',
    '/expertise/omnichannel-marketing': 'omnichannel-marketing',
    '/expertise/customer-experience-cx': 'customer-experience-cx',
    '/expertise/customer-marketing': 'customer-marketing',
    '/expertise/event-marketing': 'event-marketing',
    '/expertise/growth-marketing': 'growth-marketing',
    '/expertise/lifecycle-marketing': 'lifecycle-marketing',
    '/': 'home',
  }
  return routeToFunction[pathname] || null
}

export function ExpertiseHeroVisual({ animation, config, borderClassName, tileVariant }: ExpertiseHeroVisualProps) {
  const shouldReduceMotion = useReducedMotion()
  const pathname = usePathname() || ''
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentAnimId, setCurrentAnimId] = useState<string | null>(null)
  const [isShuffling, setIsShuffling] = useState(false)

  const registryEntry = getHeroVisualForPath(pathname)
  const resolvedTileVariant = tileVariant || getTileVariantForPath(pathname)
  const marketingFunction = getMarketingFunctionFromPath(pathname)

  // Check for ?anim= query param or use registry entry
  useEffect(() => {
    const animParam = searchParams.get('anim')
    if (animParam) {
      const anim = getAnimationById(animParam)
      if (anim) {
        setCurrentAnimId(anim.id)
        return
      }
    }

    // If no ?anim= param, check if we have multiple animations for this function
    if (marketingFunction) {
      const animations = getAnimationsByFunction(marketingFunction)
      if (animations.length > 0) {
        // Use the one marked with this route, or pick randomly
        const routeMatch = animations.find((a) => a.route === pathname)
        if (routeMatch) {
          setCurrentAnimId(routeMatch.id)
        } else {
          // Random selection on first load (avoid repeats via sessionStorage)
          const lastAnimId = typeof window !== 'undefined' ? sessionStorage.getItem(`lastAnim_${marketingFunction}`) : null
          const rotated = getRotatedAnimation(marketingFunction, lastAnimId || undefined)
          if (rotated) {
            setCurrentAnimId(rotated.id)
            if (typeof window !== 'undefined') {
              sessionStorage.setItem(`lastAnim_${marketingFunction}`, rotated.id)
            }
          }
        }
      }
    }
  }, [pathname, searchParams, marketingFunction])

  const resolvedMode: ResolvedMode = animation ? 'CUSTOM_ANIMATION' : 'TILE_ANIMATION'

  const renderContent = () => {
    if (resolvedMode === 'CUSTOM_ANIMATION' && animation) {
      return animation
    }
    return (
      <HeroTileAnimation
        variant={resolvedTileVariant}
        seed={pathname}
        intensity="medium"
      />
    )
  }

  const handleShuffle = () => {
    if (!marketingFunction || !currentAnimId) return

    setIsShuffling(true)
    const rotated = getRotatedAnimation(marketingFunction, currentAnimId)

    if (rotated) {
      // Update URL with ?anim= param
      const newUrl = `${pathname}?anim=${rotated.id}`
      router.push(newUrl, { scroll: false })
      setTimeout(() => {
        setCurrentAnimId(rotated.id)
        setIsShuffling(false)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(`lastAnim_${marketingFunction}`, rotated.id)
        }
      }, 300)
    } else {
      setIsShuffling(false)
    }
  }

  // Try animation registry first (new system with rotation support)
  const animationEntry = currentAnimId ? getAnimationById(currentAnimId) : null
  const availableAnimations = marketingFunction ? getAnimationsByFunction(marketingFunction) : []
  const hasMultipleVariants = availableAnimations.length > 1
  const isDemandGeneration = marketingFunction === 'demand-generation'

  if (animationEntry?.component) {
    const Component = animationEntry.component
    return (
      <div className="relative hidden lg:block">
        <div className="absolute -left-10 -top-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl animate-drift-slow" />
        <div className="relative">
          {hasMultipleVariants && (
            <button
              onClick={handleShuffle}
              disabled={isShuffling}
              className="absolute -top-12 right-0 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-medium hover:bg-white/20 transition-all duration-300 disabled:opacity-50 backdrop-blur-sm"
              title="Shuffle to another variant"
            >
              <Shuffle className={`w-3 h-3 ${isShuffling ? 'animate-spin' : ''}`} />
              <span>Shuffle</span>
            </button>
          )}
          <div
            className={`relative mx-auto w-full max-w-[600px] h-[600px] overflow-hidden rounded-2xl ${borderClassName}`}
            data-reduced-motion={shouldReduceMotion ? 'true' : undefined}
          >
            {shouldReduceMotion ? (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                <p className="text-sm">Animation disabled (reduced motion)</p>
              </div>
            ) : (
              <Component />
            )}
          </div>
        </div>
      </div>
    )
  }

  // Fallback to old registry system
  if (registryEntry?.mediaType === 'animation' && registryEntry.component) {
    const Component = registryEntry.component
    return (
      <div className="relative hidden lg:block">
        <div className="absolute -left-10 -top-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl animate-drift-slow" />
        <div
          className={`relative mx-auto w-full max-w-[600px] h-[600px] overflow-hidden rounded-2xl ${borderClassName}`}
          data-reduced-motion={shouldReduceMotion ? 'true' : undefined}
        >
          <Component />
        </div>
      </div>
    )
  }

  if (isDemandGeneration) {
    return (
      <div className="relative hidden lg:block">
        <div className="absolute -left-10 -top-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl animate-drift-slow" />
        <LeadGenTileAnimation />
      </div>
    )
  }

  return (
    <div className="relative hidden lg:block">
      <div className="absolute -left-10 -top-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl animate-drift-slow" />
      <div
        className={`relative mx-auto aspect-square max-w-[500px] bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden ${borderClassName}`}
        data-reduced-motion={shouldReduceMotion ? 'true' : undefined}
      >
        {DEBUG_TILE && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-50 font-mono max-w-[220px]">
            <div className="font-bold">TILE DEBUG ON</div>
            <div className="truncate">path: {pathname}</div>
            <div>variant: {resolvedTileVariant}</div>
            <div>mode: {resolvedMode}</div>
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  )
}

