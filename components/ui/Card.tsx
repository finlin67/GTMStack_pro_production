'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Activity } from 'lucide-react'
import { HoverScale } from '@/components/motion/FadeIn'
import { IconBadge } from '@/components/ui/IconBadge'
import { getLucideIcon } from '@/lib/lucideIconMap'
import { cn } from '@/lib/utils'

interface CardProps {
  title: string
  description: string
  href: string
  icon?: string
  tags?: string[]
  badge?: string
  variant?: 'default' | 'featured' | 'compact'
  external?: boolean
  className?: string
}

export function Card({
  title,
  description,
  href,
  icon,
  tags,
  badge,
  variant = 'default',
  external = false,
  className,
}: CardProps) {
  const IconComponent = getLucideIcon(icon)

  const cardContent = (
    <div
      className={cn(
        'card card-hover group h-full p-6 md:p-7',
        variant === 'featured' && 'border-cyan-300/18 bg-[linear-gradient(180deg,rgba(13,26,42,0.96),rgba(9,18,32,0.98))]',
        variant === 'compact' && 'p-5 md:p-6',
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          {IconComponent && (
            <IconBadge
              icon={IconComponent}
              size="lg"
              tone={variant === 'featured' ? 'brand' : 'neutral'}
              className={cn(
                'transition-colors',
                variant !== 'featured' && 'group-hover:border-brand-100 group-hover:bg-brand-50 group-hover:text-brand-600'
              )}
            />
          )}
          {badge && (
            <span className="badge badge-brand text-xs">{badge}</span>
          )}
        </div>

        {/* Content */}
        <h3 className="mb-3 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-100">
          {title}
        </h3>
        <p className="flex-grow text-[15px] leading-7 text-slate-300/88">
          {description}
        </p>

        {/* Footer */}
        <div className="card-footer-row">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 2).map((tag) => (
                <span key={tag} className="card-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-cyan-200">
            {external ? 'View' : 'Learn more'}
            {external ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            )}
          </span>
        </div>
      </div>
    </div>
  )

  if (external) {
    return (
      <HoverScale>
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
          {cardContent}
        </a>
      </HoverScale>
    )
  }

  return (
    <HoverScale>
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    </HoverScale>
  )
}

interface MetricCardProps {
  label: string
  value: string
  change?: string
  icon?: string
  className?: string
}

export function MetricCard({ label, value, change, icon, className }: MetricCardProps) {
  const IconComponent = getLucideIcon(icon)

  return (
    <div className={cn('card p-5 md:p-6', className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-sm text-slate-400">{label}</p>
          <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
          {change && (
            <p className="text-sm font-medium text-emerald-600 mt-1">{change}</p>
          )}
        </div>
        {IconComponent && (
          <IconBadge icon={IconComponent} tone="brand" size="md" />
        )}
      </div>
    </div>
  )
}

const HUB_STRIP_PALETTE = ['#FFDB58', '#E8A040', '#AED6F1', '#36C0CF'] as const

function hubStripColor(slug: string): string {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i) * (i + 1)) % 997
  return HUB_STRIP_PALETTE[h % HUB_STRIP_PALETTE.length]
}

interface CaseStudyCardProps {
  title: string
  client: string
  description: string
  href: string
  tags: string[]
  metrics: { label: string; value: string }[]
  featured?: boolean
  /** Stitch hub layout: colored top strip, single headline metric, compact tags */
  variant?: 'default' | 'hub'
  slug?: string
  className?: string
}

export function CaseStudyCard({
  title,
  client,
  description,
  href,
  tags,
  metrics,
  featured,
  variant = 'default',
  slug = '',
  className,
}: CaseStudyCardProps) {
  const strip = slug ? hubStripColor(slug) : HUB_STRIP_PALETTE[0]
  const primary = metrics[0]

  if (variant === 'hub') {
    return (
      <HoverScale>
        <Link href={href} className="block h-full">
          <div
            className={cn(
            'group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(9,16,32,0.96))] shadow-[0_20px_50px_rgba(2,6,23,0.26)] transition-all hover:-translate-y-1 hover:border-cyan-300/22 hover:shadow-[0_28px_68px_rgba(8,145,178,0.18)]',
            featured && 'ring-1 ring-cyan-300/18',
            className
          )}
        >
          <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: strip }} />
            <div className="flex flex-1 flex-col p-5 md:p-6">
              <div className="mb-3 flex flex-wrap gap-2">
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="card-tag text-[10px] font-bold uppercase tracking-[0.14em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-2 font-display text-lg font-bold leading-tight text-white transition-colors group-hover:text-cyan-100 md:text-xl">
                {title}
              </h3>
              <p className="mb-5 flex-1 text-[15px] leading-7 text-slate-300/88">
                {description}
              </p>
              {primary && (
                <div className="mb-4 flex items-center gap-3">
                  <IconBadge
                    icon={Activity}
                    tone="soft"
                    size="sm"
                    className="border-white/10 bg-white/[0.06]"
                    iconClassName="text-slate-300"
                  />
                  <div
                    className="text-3xl font-extrabold"
                    style={{ color: strip }}
                  >
                    {primary.value}
                  </div>
                </div>
              )}
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-cyan-200 transition-all group-hover:gap-3">
                Read case study
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      </HoverScale>
    )
  }

  return (
    <HoverScale>
      <Link href={href} className="block h-full">
        <div
          className={cn(
            'card card-hover group h-full overflow-hidden',
            featured && 'border-cyan-300/18',
            className
          )}
        >
          {/* Decorative header */}
          <div className="h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-300" />
          
          <div className="flex h-full flex-col p-6 md:p-7">
            {/* Client badge */}
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              {client}
            </span>

            <h3 className="mb-3 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-100">
              {title}
            </h3>

            <p className="mb-5 flex-grow text-[15px] leading-7 text-slate-300/88">
              {description}
            </p>

            {/* Metrics */}
            <div className="mb-4 grid grid-cols-3 gap-2 border-y border-white/10 py-4">
              {metrics.slice(0, 3).map((metric) => (
                <div key={metric.label} className="card-metric-chip">
                  <p className="text-lg font-bold tracking-tight text-cyan-200">{metric.value}</p>
                  <p className="text-xs text-slate-400">{metric.label}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-auto flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className="card-tag text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </HoverScale>
  )
}

