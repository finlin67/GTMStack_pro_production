'use client'

import Link from 'next/link'
import { ArrowRight, Building2, Compass, FileText, Link2 } from 'lucide-react'
import { FadeIn } from '@/components/motion/FadeIn'
import { Card, CaseStudyCard } from '@/components/ui/Card'
import { CardGrid, CardGridItem } from '@/components/ui/CardGrid'
import { IconBadge } from '@/components/ui/IconBadge'
import {
  type ConnectedPageLink,
  getPublicCaseStudyHref,
  getPublicExpertiseHref,
  getPublicIndustryHref,
} from '@/lib/internalLinks'
import { ExpertiseItem, CaseStudyItem, IndustryItem } from '@/lib/types'
import { cn } from '@/lib/utils'

interface RelatedExpertiseProps {
  items: ExpertiseItem[]
  title?: string
  viewAllHref?: string
  className?: string
}

export function RelatedExpertise({
  items,
  title = 'Related Expertise',
  viewAllHref,
  className,
}: RelatedExpertiseProps) {
  if (items.length === 0) return null

  return (
    <div className={className}>
      <FadeIn>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconBadge icon={Compass} tone="soft" size="sm" />
            <h3 className="font-display text-2xl font-bold text-slate-900">
              {title}
            </h3>
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </FadeIn>

      <CardGrid columns={3} className="gap-5 md:gap-6">
        {items.slice(0, 3).map((item) => (
          <CardGridItem key={item.slug}>
            <Card
              title={item.title}
              description={item.description ?? item.positioning ?? ''}
              href={getPublicExpertiseHref(item.slug) ?? `/expertise/${item.slug}`}
              icon={item.icon}
              tags={item.tags}
              badge={item.featured ? 'Featured' : undefined}
            />
          </CardGridItem>
        ))}
      </CardGrid>
    </div>
  )
}

interface RelatedCaseStudiesProps {
  items: CaseStudyItem[]
  title?: string
  viewAllHref?: string
  className?: string
}

export function RelatedCaseStudies({
  items,
  title = 'Related Case Studies',
  viewAllHref,
  className,
}: RelatedCaseStudiesProps) {
  if (items.length === 0) return null

  return (
    <div className={className}>
      <FadeIn>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconBadge icon={FileText} tone="soft" size="sm" />
            <h3 className="font-display text-2xl font-bold text-slate-900">
              {title}
            </h3>
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </FadeIn>

      <CardGrid columns={2} className="gap-5 md:gap-6">
        {items.slice(0, 2).map((item) => (
          <CardGridItem key={item.slug}>
            <CaseStudyCard
              title={item.title}
              client={item.client}
              description={item.description}
              href={getPublicCaseStudyHref(item.slug) ?? `/case-studies/${item.slug}`}
              tags={item.tags}
              metrics={item.metrics}
              featured={item.featured}
            />
          </CardGridItem>
        ))}
      </CardGrid>
    </div>
  )
}

interface RelatedIndustriesProps {
  items: IndustryItem[]
  title?: string
  viewAllHref?: string
  className?: string
}

export function RelatedIndustries({
  items,
  title = 'Related Industries',
  viewAllHref,
  className,
}: RelatedIndustriesProps) {
  if (items.length === 0) return null

  return (
    <div className={className}>
      <FadeIn>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconBadge icon={Building2} tone="soft" size="sm" />
            <h3 className="font-display text-2xl font-bold text-slate-900">
              {title}
            </h3>
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </FadeIn>

      <CardGrid columns={4}>
        {items.slice(0, 4).map((item) => (
          <CardGridItem key={item.slug}>
            <Card
              title={item.title}
              description={item.description}
              href={getPublicIndustryHref(item.slug) ?? `/industries/${item.slug}`}
              icon={item.icon}
              tags={item.tags}
              variant="compact"
            />
          </CardGridItem>
        ))}
      </CardGrid>
    </div>
  )
}

interface QuickLinksProps {
  links: { label: string; href: string; description?: string; icon?: string }[]
  title?: string
  className?: string
}

export function QuickLinks({ links, title, className }: QuickLinksProps) {
  return (
    <div className={cn('card p-5 md:p-6', className)}>
      {title && (
        <div className="mb-4 flex items-center gap-3">
          <IconBadge icon={Link2} tone="soft" size="sm" />
          <h4 className="font-semibold text-slate-900">{title}</h4>
        </div>
      )}
      <div className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between gap-3 rounded-[1rem] border border-transparent px-3 py-3 transition-all duration-200 hover:border-slate-200/90 hover:bg-slate-50/90"
          >
            <div className="flex items-start gap-3">
              <IconBadge icon={link.icon ?? Link2} tone="soft" size="sm" className="mt-0.5" />
              <div>
                <span className="text-sm font-medium text-slate-900 transition-colors group-hover:text-brand-600">
                  {link.label}
                </span>
                {link.description && (
                  <p className="mt-0.5 text-xs leading-5 text-slate-500">{link.description}</p>
                )}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-brand-600" />
          </Link>
        ))}
      </div>
    </div>
  )
}

interface ConnectedTopicsProps {
  links: ConnectedPageLink[]
  title?: string
  intro?: string
  tone?: 'light' | 'dark'
  className?: string
}

export function ConnectedTopics({
  links,
  title = 'Connected Topics',
  intro,
  tone = 'light',
  className,
}: ConnectedTopicsProps) {
  if (links.length === 0) return null

  const isDark = tone === 'dark'

  return (
    <div
      className={cn(
        isDark ? 'surface-panel-dark p-5 md:p-6 text-white' : 'surface-panel p-5 md:p-6 text-slate-900',
        className
      )}
    >
      <div className="mb-5 flex items-center gap-3">
        <IconBadge icon={Link2} tone={isDark ? 'dark' : 'soft'} size="sm" />
        <div>
          <h3 className={cn('font-display text-xl font-bold tracking-tight', isDark ? 'text-white' : 'text-slate-900')}>
            {title}
          </h3>
          {intro && (
            <p className={cn('mt-1 max-w-2xl text-sm leading-6', isDark ? 'text-slate-300' : 'text-slate-600')}>
              {intro}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'group flex items-start justify-between gap-3 rounded-[1.15rem] border p-4 transition-all duration-200',
              isDark
                ? 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.14] hover:bg-white/[0.06]'
                : 'border-slate-200/80 bg-white/80 hover:border-slate-300/90 hover:bg-slate-50'
            )}
          >
            <div className="flex items-start gap-3">
              <IconBadge icon={link.icon ?? Link2} tone={isDark ? 'dark' : 'soft'} size="sm" className="mt-0.5" />
              <div>
                <p className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-slate-900')}>{link.label}</p>
                <p className={cn('mt-1 text-sm leading-6', isDark ? 'text-slate-300' : 'text-slate-600')}>
                  {link.description}
                </p>
              </div>
            </div>
            <ArrowRight
              className={cn(
                'mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5',
                isDark ? 'text-slate-400 group-hover:text-white' : 'text-slate-400 group-hover:text-brand-600'
              )}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

