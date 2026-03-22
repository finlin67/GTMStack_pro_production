"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PILLARS } from "@/lib/types"
import { getExpertiseByPillar } from "@/content/expertise"
import { getLucideIcon } from "@/lib/lucideIconMap"

const getIcon = (name?: string) => {
  const IconComponent = getLucideIcon(name)
  return IconComponent
    ? (IconComponent as React.ComponentType<{ className?: string }>)
    : null
}

type MegaMenuProps = {
  /** Anchor for `aria-controls` on the nav trigger when the panel is open */
  id?: string
  /** `id` of the menu button that labels this region */
  labelledBy?: string
}

export default function MegaMenu({ id, labelledBy }: MegaMenuProps) {
  // Prevent clicks inside menu from closing it
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      id={id}
      className="rounded-2xl border border-slate-700/70 bg-slate-950/95 backdrop-blur-2xl shadow-[0_35px_100px_rgba(15,23,42,0.85)]"
      onClick={handleClick}
      role="region"
      aria-label={labelledBy ? undefined : "Expertise: pillars and topics"}
      aria-labelledby={labelledBy}
    >
      <div className="px-7 pt-6 pb-0 md:px-7 md:pt-7 md:pb-0">
        <p className="max-w-3xl text-[13px] leading-relaxed text-slate-300">
          This is how the GTM model is organized—pillars you can read as a map, with topics underneath each. Not a list of services.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 p-7 pt-5">
        {PILLARS.map((pillar) => {
          const Icon = getIcon(pillar.icon)
          const items = getExpertiseByPillar(pillar.id)
          return (
            <div key={pillar.title} className="space-y-3.5">
              <div className="space-y-1.5">
                <Link href={pillar.href} className="flex items-center gap-3 text-[13px] font-semibold text-slate-50">
                  <span className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(59,130,246,0.25)]">
                    {Icon && <Icon className="h-4 w-4 text-brand-200" aria-hidden="true" />}
                  </span>
                  {pillar.title}
                </Link>
                <p className="text-[12px] leading-relaxed text-slate-400">
                  {pillar.description}
                </p>
              </div>
              <div className="h-px w-full bg-white/5" />
              <ul className="grid grid-cols-1 gap-1.5">
                {items.map((item, index) => (
                  <li key={`${item.slug}-${index}`}>
                    <Link
                      href={`/expertise/${item.slug}`}
                      className="flex items-center gap-2 text-[13px] text-slate-300 hover:text-white hover:translate-x-0.5 transition-transform"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <div className="border-t border-white/10 px-7 py-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[12px] text-slate-400">Browse the full index if you want every topic in one place.</p>
          <Link
            href="/expertise"
            className="text-[13px] text-brand-300 hover:text-white inline-flex items-center gap-1 shrink-0 sm:ml-auto"
          >
            Browse full Expertise index <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 border-t border-white/5">
          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">See also</span>
          <Link href="/case-studies" className="text-[12px] text-slate-400 hover:text-brand-200 transition-colors">
            Case Studies
          </Link>
          <Link href="/industries" className="text-[12px] text-slate-400 hover:text-brand-200 transition-colors">
            Industries
          </Link>
          <Link href="/blog" className="text-[12px] text-slate-400 hover:text-brand-200 transition-colors">
            Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
