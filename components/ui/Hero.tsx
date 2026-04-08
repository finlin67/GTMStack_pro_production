'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/FadeIn.client'
import { cn } from '@/lib/utils'

interface HeroProps {
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
}

export function Hero({
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
}: HeroProps) {
  const isLarge = size === 'large'
  const isCentered = align === 'center'

  return (
    <section
      className={cn(
        'page-header-shell',
        'bg-gradient-to-b from-slate-950 via-[#071424] to-slate-950 text-white',
        isLarge ? 'page-header-shell-large' : 'page-header-shell-default',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="absolute inset-0 bg-mesh opacity-25" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-3xl" />

      <div className="container-width relative">
        <StaggerContainer className={cn('page-header-copy max-w-[42rem]', isCentered && 'mx-auto text-center')}>
          {label && (
            <StaggerItem>
              <span className="section-eyebrow mb-5 border-white/10 bg-white/[0.05] text-slate-200 shadow-[0_12px_30px_rgba(2,6,23,0.18)]">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
                {label}
              </span>
            </StaggerItem>
          )}

          <StaggerItem>
            <h1
              className={cn(
                'page-header-title text-white',
                isLarge ? 'page-header-title-large' : 'page-header-title-default'
              )}
            >
              {title}
              {titleHighlight && (
                <>
                  {' '}
                  <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-300 bg-clip-text text-transparent">{titleHighlight}</span>
                </>
              )}
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p
              className={cn(
                'page-header-body',
                isLarge && 'max-w-[35rem]',
                !isLarge && 'max-w-[34rem]',
                isCentered && 'mx-auto'
              )}
            >
              {description}
            </p>
          </StaggerItem>

          {(primaryCta || secondaryCta) && (
            <StaggerItem>
              <div
                className={cn(
                  'page-header-actions',
                  isCentered && 'justify-center'
                )}
              >
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="btn btn-primary px-6 py-3 text-sm md:text-base rounded-xl group"
                  >
                    {primaryCta.label}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="btn btn-secondary px-6 py-3 text-sm md:text-base rounded-xl"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            </StaggerItem>
          )}

          {children && (
            <StaggerItem className="mt-8 md:mt-10">
              {children}
            </StaggerItem>
          )}
        </StaggerContainer>
      </div>
    </section>
  )
}

interface PageHeroProps {
  title: string
  description?: string
  breadcrumbs?: { label: string; href: string }[]
}

export function PageHero({ title, description, breadcrumbs }: PageHeroProps) {
  return (
    <section className="page-header-shell page-header-shell-default">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#071424] to-slate-950" />
      <div className="absolute inset-0 bg-grid-dark opacity-30" />

      <div className="container-width relative">
        <StaggerContainer className="page-header-copy max-w-[40rem]">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <StaggerItem>
              <nav className="mb-3 flex items-center gap-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <span key={crumb.href} className="flex items-center gap-2">
                    {index > 0 && <span className="text-slate-300">/</span>}
                    <Link
                      href={crumb.href}
                      className="text-slate-400 hover:text-cyan-200 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  </span>
                ))}
              </nav>
            </StaggerItem>
          )}

          <StaggerItem>
            <h1 className="page-header-title page-header-title-default text-white">
              {title}
            </h1>
          </StaggerItem>

          {description && (
            <StaggerItem>
              <p className="page-header-body max-w-[34rem]">
                {description}
              </p>
            </StaggerItem>
          )}
        </StaggerContainer>
      </div>
    </section>
  )
}

