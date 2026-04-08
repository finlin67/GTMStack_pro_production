'use client'

const DEBUG_HERO_VARIANT = false

import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Rocket, Zap, BarChart3 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { FadeIn, HoverScale, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'
import { cn } from '@/lib/utils'
import { TopoBackdrop, PathwayOverlay, SignalField } from '@/components/motifs'
import { HeroAbstract } from '@/components/visuals/HeroAbstract'
import type { HeroVisual as HeroVisualType } from '@/lib/heroVisuals'
import { heroVisualFallbacks, heroVisualMap } from '@/lib/hero-visual-map'
import { heroOverlayMap } from '@/lib/hero-overlay-map'
import { heroVisualPresets } from '@/lib/hero-visual-presets'
import { HeroBackground, type HeroBackgroundVariant, type HeroBackgroundIntensity } from '@/components/ui/HeroBackground'
import { HeroParticleOverlay } from '@/components/ui/HeroParticleOverlay'
import { getHeroBackgroundVariant } from '@/lib/heroPresets'

function getDefaultIntensity(pathname: string): HeroBackgroundIntensity {
  if (pathname === '/') return 'medium'
  if (pathname.startsWith('/expertise')) return 'medium'
  if (pathname.startsWith('/industries')) return 'medium'
  if (pathname.startsWith('/case-studies')) return 'medium'
  if (pathname.startsWith('/projects')) return 'medium'
  return 'medium'
}

const HeroVisual = dynamic(
  () => import('@/components/ui/HeroVisual').then((m) => m.HeroVisual),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-900/30 via-slate-900/20 to-cyan-900/20 animate-pulse" />
    ),
  }
)

interface HeroDarkProps {
  label?: string
  title: string
  titleHighlight?: string
  description: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  align?: 'left' | 'center'
  size?: 'default' | 'large'
  className?: string
  children?: React.ReactNode
  motif?: 'topo' | 'pathway' | 'signal' | 'grid' | 'none' | 'flow'
  rightVisual?: React.ReactNode | HeroVisualType
  backgroundVariant?: HeroBackgroundVariant
  particleOverlay?: boolean
  titleGlow?: boolean
  orbitingIcons?: boolean
  backgroundIntensity?: HeroBackgroundIntensity
  slug?: string
  kind?: 'expertise' | 'industries' | 'projects'
}

export function HeroDark({
  label,
  title,
  titleHighlight,
  description,
  primaryCta,
  secondaryCta,
  align = 'center',
  size = 'default',
  className,
  children,
  motif = 'topo',
  backgroundVariant,
  backgroundIntensity,
  rightVisual,
  slug,
  kind,
  particleOverlay = false,
  titleGlow = false,
  orbitingIcons = false,
}: HeroDarkProps) {
  const isLarge = size === 'large'
  const shouldReduceMotion = useReducedMotion() ?? false
  const isCentered = align === 'center'
  const pathname = usePathname() ?? (slug ? `/${kind ?? 'expertise'}/${slug}` : '/')

  const resolvedBackgroundVariant = backgroundVariant ?? getHeroBackgroundVariant(pathname)
  const resolvedIntensity = backgroundIntensity ?? getDefaultIntensity(pathname)

  const autoImage = slug
    ? (heroVisualMap[slug] ?? (kind ? heroVisualFallbacks[kind] : undefined))
    : undefined
  const autoOverlay = slug ? heroOverlayMap[slug] : undefined

  const preset = kind ? heroVisualPresets[kind] : undefined
  const presetClassName = preset?.className

  let resolvedRightVisual: React.ReactNode | null = null

  // If rightVisual isn't provided, always render HeroVisual for slug pages (even if image is undefined)
  if (rightVisual === undefined || rightVisual === null) {
    if (slug) {
      resolvedRightVisual = (
        <HeroVisual image={autoImage} pathwaySvg={autoOverlay} className={presetClassName} />
      )
    } else {
      resolvedRightVisual = null
    }
  } else if (
    React.isValidElement(rightVisual) ||
    typeof rightVisual === 'string' ||
    typeof rightVisual === 'number'
  ) {
    resolvedRightVisual = rightVisual
  } else {
    const visualObject = rightVisual as HeroVisualType
    if (visualObject.useAbstract) {
      const variant = size === 'large' ? 'topLevel' : 'detail'
      resolvedRightVisual = <HeroAbstract variant={variant} />
    } else if (visualObject.variant) {
      resolvedRightVisual = (
        <HeroVisual
          variant={visualObject.variant}
          className={presetClassName}
        />
      )
    } else {
      resolvedRightVisual = (
        <HeroVisual
          image={visualObject.image}
          pathwaySvg={visualObject.pathwaySvg}
          className={presetClassName}
        />
      )
    }
  }

  // For slug pages, never allow the right visual to collapse to null.
  // Even if autoImage is undefined, HeroVisual will render its decorative/skeleton state.
  if (slug && (resolvedRightVisual === null || resolvedRightVisual === undefined)) {
    resolvedRightVisual = (
      <HeroVisual image={autoImage} pathwaySvg={autoOverlay} className={presetClassName} />
    )
  }

  // IMPORTANT: Always render the right visual column wrapper to keep SSR/CSR DOM identical.
  // The content inside can change, but the wrapper must always exist.
  const hasRightVisual = true

  const MotifComponent = {
    topo: TopoBackdrop,
    pathway: PathwayOverlay,
    signal: SignalField,
    grid: () => null,
    none: () => null,
    flow: () => null,
  }[motif]

  return (
    <section
      className={cn(
        'page-header-shell',
        'bg-gradient-to-b from-slate-950 via-brand-950 to-slate-950',
        'text-white',
        isLarge ? 'page-header-shell-large' : 'page-header-shell-default',
        className
      )}
    >
      {DEBUG_HERO_VARIANT && (
        <div className="absolute top-4 left-4 z-50 px-3 py-1.5 text-xs font-mono bg-white/10 border border-white/[0.15] rounded backdrop-blur-sm pointer-events-none">
          <div className="text-white/70">{pathname}</div>
          <div className="text-cyan-300">{resolvedBackgroundVariant}</div>
        </div>
      )}
      <HeroBackground variant={resolvedBackgroundVariant} intensity={resolvedIntensity} seed={pathname} />
      {particleOverlay && <HeroParticleOverlay />}

      {/* Ambient gradient orbs with drift */}
      <div className="absolute z-0 top-0 left-1/4 w-[600px] h-[600px] bg-brand-500/20 rounded-full blur-3xl animate-drift-slow pointer-events-none" />
      <div className="absolute z-0 top-20 right-1/4 w-[400px] h-[400px] bg-cool-400/[0.15] rounded-full blur-3xl animate-drift-medium pointer-events-none" />
      <div className="absolute z-0 bottom-0 left-1/2 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl animate-drift-fast pointer-events-none" />

      {/* Motif overlay */}
      {motif === 'topo' && <TopoBackdrop intensity="subtle" variant="sparse" />}
      {motif === 'pathway' && <PathwayOverlay intensity="subtle" paths="simple" accent />}
      {motif === 'signal' && <SignalField intensity="subtle" pattern="constellation" density="sparse" />}

      <div className="container-width relative z-10">
        <div
          className={cn(
            'page-header-grid',
            hasRightVisual && 'page-header-grid-with-visual'
          )}
        >
          {/* Left: Text Content */}
          <StaggerContainer
            className={cn(
              hasRightVisual ? 'page-header-copy' : 'page-header-copy max-w-[42rem]',
              isCentered && !hasRightVisual && 'mx-auto text-center'
            )}
          >
            {label && (
              <StaggerItem>
                <span className="page-header-kicker mb-4 text-brand-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                  {label}
                </span>
              </StaggerItem>
            )}

            <StaggerItem>
              <div className={cn('relative', hasRightVisual ? 'max-w-[34rem]' : 'max-w-[42rem]')}>
                {titleGlow && !shouldReduceMotion && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.3, 1] }}
                    className="absolute -inset-8 -z-10 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-brand-500/15 to-cool-500/20 blur-2xl"
                  />
                )}
                <h1
                  className={cn(
                    'page-header-title relative text-white',
                    isLarge ? 'page-header-title-large' : 'page-header-title-default'
                  )}
                >
                  {title}
                  {titleHighlight && (
                    <>
                      {' '}
                      <span className="bg-gradient-to-r from-brand-400 via-cool-400 to-cyan-400 bg-clip-text text-transparent">
                        {titleHighlight}
                      </span>
                    </>
                  )}
                </h1>
              </div>
            </StaggerItem>

            <StaggerItem>
              <p
                className={cn(
                  'page-header-body text-slate-300',
                  isLarge && 'max-w-[42rem]',
                  !isLarge && 'max-w-[38rem]',
                  isCentered && !hasRightVisual && 'mx-auto'
                )}
              >
                {description}
              </p>
            </StaggerItem>

            {(primaryCta || secondaryCta) && (
              <StaggerItem>
                <div className="relative mt-6">
                  {orbitingIcons && !shouldReduceMotion && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 pointer-events-none"
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-500/20 border border-brand-400/30 flex items-center justify-center">
                        <Rocket className="w-4 h-4 text-cyan-400/80" />
                      </div>
                      <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-7 h-7 rounded-full bg-cool-500/[0.15] border border-cool-400/25 flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5 text-cool-300/70" />
                      </div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-cyan-500/[0.15] border border-cyan-400/25 flex items-center justify-center">
                        <BarChart3 className="w-3.5 h-3.5 text-cyan-300/70" />
                      </div>
                    </motion.div>
                  )}
                  <StaggerContainer
                    className={cn(
                      'page-header-actions relative',
                      isCentered && !hasRightVisual && 'justify-center'
                    )}
                  >
                    {primaryCta && (
                      <StaggerItem>
                        <HoverScale scale={1.01}>
                          <Link
                            href={primaryCta.href}
                            className="btn bg-brand-500 text-white hover:bg-brand-400 px-5 py-2.5 text-sm md:text-base rounded-xl group shadow-glow transition-all duration-300 hover:shadow-glow-violet"
                          >
                            {primaryCta.label}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </HoverScale>
                      </StaggerItem>
                    )}
                    {secondaryCta && (
                      <StaggerItem>
                        <HoverScale scale={1.01}>
                          <Link
                            href={secondaryCta.href}
                            className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 px-5 py-2.5 text-sm md:text-base rounded-xl backdrop-blur-sm transition-all duration-300"
                          >
                            {secondaryCta.label}
                          </Link>
                        </HoverScale>
                      </StaggerItem>
                    )}
                  </StaggerContainer>
                </div>
              </StaggerItem>
            )}

            {children && (
              <StaggerItem className="mt-8 md:mt-10">
                {children}
              </StaggerItem>
            )}
          </StaggerContainer>

          {/* Right: Visual (always render wrapper to prevent hydration mismatch) */}
          <div className="page-header-visual">
            <div
              className={cn(
                'page-header-visual-frame',
                isLarge && 'page-header-visual-frame-large'
              )}
            >
              <div className="page-header-visual-inner">
                {resolvedRightVisual ?? (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/40 via-cool-400/30 to-cyan-400/30 animate-float" />
                )}
              </div>
              <div className="page-header-visual-glow" />
              
              {/* Decorative accent orbs */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-400/24 rounded-full blur-2xl" />
              <div className="absolute -bottom-5 -left-5 w-28 h-28 bg-cyan-400/18 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
