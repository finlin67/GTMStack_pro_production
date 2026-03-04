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
      className="rounded-3xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl"
      onClick={handleClick}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {PILLARS.map((pillar) => {
          const Icon = getIcon(pillar.icon)
          const items = getExpertiseByPillar(pillar.id)
          return (
            <div key={pillar.title} className="space-y-3">
              <Link href={pillar.href} className="flex items-center gap-2 text-white font-semibold">
                <span className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center">
                  {Icon && <Icon className="h-5 w-5 text-brand-300" />}
                </span>
                {pillar.title}
              </Link>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/expertise/${item.slug}`}
                      className="block text-sm text-slate-300 hover:text-white hover:translate-x-0.5 transition"
                    >
                      {item.title}
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

