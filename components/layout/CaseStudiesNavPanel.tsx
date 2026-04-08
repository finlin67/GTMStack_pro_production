"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { CaseStudyItem } from "@/lib/types"

type CaseStudiesNavPanelProps = {
  items: CaseStudyItem[]
  id?: string
  labelledBy?: string
}

export function CaseStudiesNavPanel({ items, id, labelledBy }: CaseStudiesNavPanelProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      id={id}
      className="overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.98))] backdrop-blur-2xl shadow-[0_36px_110px_rgba(2,6,23,0.78)]"
      onClick={handleClick}
      role="region"
      aria-label={labelledBy ? undefined : "Featured case studies"}
      aria-labelledby={labelledBy}
    >
      <div className="border-b border-white/[0.06] px-7 pb-4 pt-6 md:px-7 md:pt-7">
        <p className="max-w-3xl text-[13px] leading-relaxed text-slate-300">
          A sample of how GTM systems show up in the field: strategy, execution, and measurable outcomes.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 p-7 md:grid-cols-3 md:gap-5">
        {items.map((cs) => (
          <Link
            key={cs.slug}
            href={`/case-studies/${cs.slug}`}
            className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5 hover:border-cyan-500/25 hover:bg-white/[0.05]"
          >
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{cs.client}</p>
            <p className="mt-1.5 text-[14px] font-semibold leading-snug text-slate-50 group-hover:text-white">
              {cs.title}
            </p>
            <p className="mt-2 line-clamp-3 text-[12px] leading-relaxed text-slate-400">{cs.description}</p>
            {cs.metrics[0] && (
              <p className="mt-3 text-[12px] text-cyan-200/80">
                <span className="font-medium text-cyan-100/90">{cs.metrics[0].value}</span>
                {cs.metrics[0].label ? ` ${cs.metrics[0].label}` : ""}
                {cs.metrics[0].change ? ` · ${cs.metrics[0].change}` : ""}
              </p>
            )}
          </Link>
        ))}
      </div>
      <div className="space-y-3 border-t border-white/10 px-7 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-slate-400">See the full library of engagements and industries.</p>
          <Link
            href="/case-studies"
            className="inline-flex shrink-0 items-center gap-1 text-[13px] text-brand-300 hover:text-white sm:ml-auto"
          >
            View all case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-white/5 pt-1">
          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">See also</span>
          <Link href="/expertise" className="text-[12px] text-slate-400 transition-colors hover:text-brand-200">
            Expertise
          </Link>
          <Link href="/industries" className="text-[12px] text-slate-400 transition-colors hover:text-brand-200">
            Industries
          </Link>
          <Link href="/blog" className="text-[12px] text-slate-400 transition-colors hover:text-brand-200">
            Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
