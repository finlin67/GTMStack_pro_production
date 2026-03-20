'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export type ExpertiseBreadcrumbPillarId =
  | 'content-engagement'
  | 'demand-growth'
  | 'strategy-insights'
  | 'systems-operations'

const BUBBLE_BY_PILLAR: Record<
  ExpertiseBreadcrumbPillarId,
  { border: string; bg: string; text: string; chevron: string }
> = {
  'content-engagement': {
    border: 'border-[#FFDB58]/35',
    bg: 'bg-[#FFDB58]/10',
    text: 'text-[#FFDB58]',
    chevron: 'text-[#FFDB58]/80',
  },
  'demand-growth': {
    border: 'border-[#16A34A]/35',
    bg: 'bg-[#16A34A]/10',
    text: 'text-[#22C55E]',
    chevron: 'text-[#22C55E]/80',
  },
  'strategy-insights': {
    border: 'border-[#AED6F1]/35',
    bg: 'bg-[#AED6F1]/10',
    text: 'text-[#AED6F1]',
    chevron: 'text-[#AED6F1]/80',
  },
  'systems-operations': {
    border: 'border-[#36C0CF]/35',
    bg: 'bg-[#36C0CF]/10',
    text: 'text-[#36C0CF]',
    chevron: 'text-[#36C0CF]/80',
  },
}

export type ExpertiseTopicBreadcrumbProps = {
  pillarId: ExpertiseBreadcrumbPillarId
  pillarLabel: string
  topicLabel: string
  className?: string
}

/**
 * Single-line pill breadcrumb: Pillar › "Topic" with pillar accent (stylepack).
 */
export default function ExpertiseTopicBreadcrumb({
  pillarId,
  pillarLabel,
  topicLabel,
  className = '',
}: ExpertiseTopicBreadcrumbProps) {
  const t = BUBBLE_BY_PILLAR[pillarId]
  const pillarHref = `/expertise/${pillarId}`

  return (
    <div
      className={`inline-flex max-w-full min-w-0 ${className}`}
      title={`${pillarLabel} → ${topicLabel}`}
    >
      <div
        className={`inline-flex max-w-full min-w-0 flex-nowrap items-center gap-1 rounded-full border px-2.5 py-1 font-['Outfit',_sans-serif] ${t.border} ${t.bg}`}
      >
        <Link
          href={pillarHref}
          className={`shrink-0 text-[9px] font-bold uppercase leading-none tracking-[0.08em] ${t.text} hover:opacity-90 sm:text-[10px]`}
        >
          {pillarLabel}
        </Link>
        <ChevronRight
          className={`h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3 ${t.chevron}`}
          aria-hidden
          strokeWidth={2.5}
        />
        <span
          className={`min-w-0 truncate text-[9px] font-bold uppercase leading-none tracking-[0.06em] ${t.text} sm:text-[10px]`}
        >
          &ldquo;{topicLabel}&rdquo;
        </span>
      </div>
    </div>
  )
}
