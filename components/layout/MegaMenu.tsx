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
      className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-[linear-gradient(180deg,rgba(15,23,42,0.985),rgba(2,6,23,0.98))] backdrop-blur-2xl shadow-[0_36px_110px_rgba(2,6,23,0.72)]"
      onClick={handleClick}
      role="region"
      aria-label={labelledBy ? undefined : "Expertise: pillars and topics"}
      aria-labelledby={labelledBy}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent"
      />
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:p-7 lg:grid-cols-4 lg:gap-7 lg:p-8">
        {PILLARS.map((pillar) => {
          const Icon = getIcon(pillar.icon)
          const items = getExpertiseByPillar(pillar.id)
          return (
            <div
              key={pillar.title}
              className="rounded-2xl border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <div>
                <Link
                  href={pillar.href}
                  className="group flex items-center gap-3 text-[13px] font-semibold tracking-[0.015em] text-white/92 transition-colors hover:text-cyan-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] shadow-[0_0_24px_rgba(34,211,238,0.08)] transition-colors group-hover:border-cyan-300/25 group-hover:bg-white/[0.1]">
                    {Icon && <Icon className="h-3.5 w-3.5 text-brand-300 group-hover:text-cyan-200" aria-hidden="true" />}
                  </span>
                  {pillar.title}
                </Link>
              </div>
              <div className="mt-4 h-px w-full bg-white/[0.06]" />
              <ul className="mt-4 space-y-1">
                {items.map((item, index) => (
                  <li key={`${item.slug}-${index}`}>
                    <Link
                      href={`/expertise/${item.slug}`}
                      className="group flex items-center gap-2 rounded-xl px-2.5 py-2 text-[13px] text-slate-300 transition-all duration-200 hover:bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(255,255,255,0.03))] hover:text-white"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-cyan-300/65 transition-colors group-hover:bg-cyan-200" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.06] px-6 py-4 md:px-7 lg:px-8">
        <Link
          href="/expertise"
          className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-200 transition-colors hover:text-cyan-50"
        >
          Browse full index
          <ArrowRight className="h-3.5 w-3.5 text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:text-cyan-200" />
        </Link>
      </div>
    </div>
  )
}
