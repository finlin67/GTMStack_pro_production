"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import * as Icons from "lucide-react"
import { PILLARS } from "@/lib/types"
import { getExpertiseByPillar } from "@/content/expertise"

type IconName = keyof typeof Icons

const getIcon = (name?: string) => {
  if (!name) return null
  const IconComponent = Icons[name as IconName]
  return typeof IconComponent === "function"
    ? (IconComponent as React.ComponentType<{ className?: string }>)
    : null
}

export default function MegaMenu() {
  // Prevent clicks inside menu from closing it
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className="rounded-2xl border border-slate-700/70 bg-slate-950/95 backdrop-blur-2xl shadow-[0_35px_100px_rgba(15,23,42,0.85)]"
      onClick={handleClick}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 p-7">
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
      <div className="border-t border-white/10 px-7 py-4 flex justify-end">
        <Link href="/expertise" className="text-[13px] text-brand-300 hover:text-white inline-flex items-center gap-1">
          View all expertise <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
