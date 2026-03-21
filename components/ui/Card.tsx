'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import * as Icons from 'lucide-react'
import { HoverScale } from '@/components/motion/FadeIn'
import { cn } from '@/lib/utils'

type IconName = keyof typeof Icons

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
  const IconComponent = icon && Icons[icon as IconName] 
    ? (Icons[icon as IconName] as React.ComponentType<{ className?: string }>) 
    : null

  const cardContent = (
    <div
      className={cn(
        'card card-hover group h-full p-6',
        variant === 'featured' && 'border-brand-200/60 bg-gradient-to-br from-white to-brand-50/30',
        variant === 'compact' && 'p-4',
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          {IconComponent && (
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
                variant === 'featured'
                  ? 'bg-brand-100 text-brand-600'
                  : 'bg-slate-100 text-slate-600 group-hover:bg-brand-100 group-hover:text-brand-600'
              )}
            >
              <IconComponent className="w-5 h-5" />
            </div>
          )}
          {badge && (
            <span className="badge badge-brand text-xs">{badge}</span>
          )}
        </div>

        {/* Content */}
        <h3 className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 ml-auto">
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
  const IconComponent = icon ? (Icons[icon as IconName] as React.ComponentType<{ className?: string }>) : null

  return (
    <div className={cn('card p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {change && (
            <p className="text-sm font-medium text-emerald-600 mt-1">{change}</p>
          )}
        </div>
        {IconComponent && (
          <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
            <IconComponent className="w-5 h-5" />
          </div>
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
              'group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow h-full',
              featured && 'ring-1 ring-brand-200/60',
              className
            )}
          >
            <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: strip }} />
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <div className="flex gap-2 mb-4 flex-wrap">
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-500 uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-slate-900 dark:text-white leading-tight group-hover:text-brand-600 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1 leading-relaxed">
                {description}
              </p>
              {primary && (
                <div
                  className="text-3xl font-extrabold mb-6"
                  style={{ color: strip }}
                >
                  {primary.value}
                </div>
              )}
              <span className="inline-flex items-center gap-2 text-brand-600 font-bold text-sm group-hover:gap-3 transition-all mt-auto">
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
            featured && 'border-brand-200/60',
            className
          )}
        >
          {/* Decorative header */}
          <div className="h-2 bg-gradient-to-r from-brand-500 via-brand-400 to-accent-400" />
          
          <div className="p-6">
            {/* Client badge */}
            <span className="inline-block text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
              {client}
            </span>

            <h3 className="font-semibold text-lg text-slate-900 group-hover:text-brand-600 transition-colors mb-2">
              {title}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-100 mb-4">
              {metrics.slice(0, 3).map((metric) => (
                <div key={metric.label} className="text-center">
                  <p className="text-lg font-bold text-brand-600">{metric.value}</p>
                  <p className="text-xs text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className="badge text-xs">
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

