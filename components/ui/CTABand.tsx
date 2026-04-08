'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { FadeIn } from '@/components/motion/FadeIn'
import { cn } from '@/lib/utils'

interface CTABandProps {
  title: string
  description?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  variant?: 'default' | 'dark' | 'gradient'
  className?: string
}

export function CTABand({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = 'default',
  className,
}: CTABandProps) {
  const variantStyles = {
    default: 'bg-slate-950 text-white',
    dark: 'bg-slate-900 text-white',
    gradient: 'bg-slate-950 text-white',
  }

  const buttonStyles = {
    default: {
      primary: 'btn btn-primary',
      secondary: 'btn btn-secondary',
    },
    dark: {
      primary: 'btn bg-white text-slate-900 hover:bg-slate-100 shadow-lg',
      secondary: 'btn text-slate-300 hover:text-white hover:bg-white/10',
    },
    gradient: {
      primary: 'btn bg-white text-brand-700 hover:bg-white/90 shadow-lg',
      secondary: 'btn text-white/90 hover:text-white hover:bg-white/10',
    },
  }

  return (
    <section className={cn(variantStyles[variant], 'py-12 md:py-16 lg:py-[4.5rem]', className)}>
      <div className="container-width">
        <FadeIn>
          <div
            className={cn(
              'template-cta-shell',
              variant === 'default' && 'surface-panel-dark border-white/10',
              variant === 'dark' && 'surface-panel-dark border-white/10',
              variant === 'gradient' && 'border-white/10 bg-gradient-to-r from-brand-700 via-brand-600 to-accent-500 shadow-[0_26px_80px_rgba(37,99,235,0.28)]'
            )}
          >
            <div className="template-cta-copy">
              {variant === 'gradient' && (
                <Sparkles className="mb-3 h-6 w-6 opacity-80" />
              )}
              <h2
                className={cn(
                  'template-cta-title',
                  variant === 'default' ? 'text-white' : ''
                )}
              >
                {title}
              </h2>
              {description && (
                <p
                  className={cn(
                    'template-cta-body',
                    variant === 'default' ? 'text-slate-300/90' : 'opacity-90'
                  )}
                >
                  {description}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <Link
                href={primaryCta.href}
                className={cn(
                  buttonStyles[variant].primary,
                  'group rounded-xl px-5 py-2.5 text-sm md:px-6 md:py-3 md:text-base'
                )}
              >
                {primaryCta.label}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className={cn(
                    buttonStyles[variant].secondary,
                    'rounded-xl px-5 py-2.5 text-sm md:px-6 md:py-3 md:text-base'
                  )}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

