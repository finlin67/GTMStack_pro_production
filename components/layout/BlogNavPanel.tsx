"use client"

import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"

type BlogNavPanelProps = {
  id?: string
  labelledBy?: string
}

export function BlogNavPanel({ id, labelledBy }: BlogNavPanelProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      id={id}
      className="rounded-2xl border border-slate-700/70 bg-slate-950/95 backdrop-blur-2xl shadow-[0_35px_100px_rgba(15,23,42,0.85)]"
      onClick={handleClick}
      role="region"
      aria-label={labelledBy ? undefined : "Blog and insights"}
      aria-labelledby={labelledBy}
    >
      <div className="grid gap-6 p-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            <BookOpen className="h-3.5 w-3.5 text-cyan-400/80" aria-hidden />
            Insights
          </div>
          <p className="max-w-xl text-[13px] leading-relaxed text-slate-300">
            Articles, frameworks, and breakdowns on GTM systems, RevOps, and demand—written for operators who ship, not
            slide decks.
          </p>
          <ul className="grid gap-1.5 pt-1 text-[13px] text-slate-400">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
              Search and category filters on the main index
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
              Long-form posts with practical takeaways
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 md:items-end md:pt-1">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500/15 px-4 py-2.5 text-sm font-medium text-cyan-100 ring-1 ring-cyan-500/30 transition-colors hover:bg-cyan-500/25 hover:text-white"
          >
            Browse all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-center text-[11px] text-slate-500 md:text-right">Updated from WordPress</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-7 py-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">See also</span>
          <Link href="/expertise" className="text-[12px] text-slate-400 transition-colors hover:text-brand-200">
            Expertise
          </Link>
          <Link href="/case-studies" className="text-[12px] text-slate-400 transition-colors hover:text-brand-200">
            Case studies
          </Link>
          <Link href="/industries" className="text-[12px] text-slate-400 transition-colors hover:text-brand-200">
            Industries
          </Link>
        </div>
      </div>
    </div>
  )
}
