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
      className="rounded-3xl border border-slate-700/80 bg-slate-950/95 backdrop-blur-2xl shadow-[0_40px_120px_rgba(15,23,42,0.9)]"
      onClick={handleClick}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {PILLARS.map((pillar) => {
          const Icon = getIcon(pillar.icon)
          const items = getExpertiseByPillar(pillar.id)
          return (
            <div key={pillar.title} className="space-y-3">
              <Link href={pillar.href} className="flex items-center gap-3 text-sm font-semibold text-slate-50">
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500/20 via-brand-400/10 to-slate-900/80 border border-brand-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.45)]">
                  {Icon && <Icon className="h-5 w-5 text-brand-300" aria-hidden="true" />}
                </span>
                {pillar.title}
              </Link>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/expertise/${item.slug}`}
                      className="flex items-center gap-2 text-sm text-slate-300 hover:text-white hover:translate-x-0.5 transition-transform"
                    >
                      <span className="h-1 w-1 rounded-full bg-slate-500" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <div className="border-t border-white/10 px-6 py-4 flex justify-end">
        <Link href="/expertise" className="text-sm text-brand-300 hover:text-white inline-flex items-center gap-1">
          View all expertise <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

