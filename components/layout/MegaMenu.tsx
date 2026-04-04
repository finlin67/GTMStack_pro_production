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
      className="rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      onClick={handleClick}
      role="region"
      aria-label={labelledBy ? undefined : "Expertise: pillars and topics"}
      aria-labelledby={labelledBy}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {PILLARS.map((pillar) => {
          const Icon = getIcon(pillar.icon)
          const items = getExpertiseByPillar(pillar.id)
          return (
            <div key={pillar.title} className="space-y-3">
              <div>
                <Link href={pillar.href} className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-50 hover:text-white transition-colors group">
                  <span className="h-8 w-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    {Icon && <Icon className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" />}
                  </span>
                  {pillar.title}
                </Link>
              </div>
              <div className="h-px w-full bg-white/[0.06]" />
              <ul className="space-y-0.5">
                {items.map((item, index) => (
                  <li key={`${item.slug}-${index}`}>
                    <Link
                      href={`/expertise/${item.slug}`}
                      className="flex items-center gap-2 px-1 py-1 rounded-lg text-[13px] text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="h-1 w-1 rounded-full bg-slate-600 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <div className="border-t border-white/[0.06] px-6 py-3 flex items-center justify-between">
        <Link
          href="/expertise"
          className="text-[13px] text-slate-300 hover:text-white inline-flex items-center gap-1.5 transition-colors group"
        >
          Browse full index
          <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>
    </div>
  )
}
