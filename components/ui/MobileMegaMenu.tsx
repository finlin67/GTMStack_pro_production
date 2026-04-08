'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { industryItems } from '@/content/industries'
import { PILLARS } from '@/lib/types'
import { getExpertiseByPillar } from '@/content/expertise'
import * as Icons from 'lucide-react'

type IconName = keyof typeof Icons

interface MobileMegaMenuProps {
  isOpen: boolean
  onClose: () => void
}

const getIcon = (name?: string) => {
  if (!name) return null
  const IconComponent = Icons[name as IconName]
  return typeof IconComponent === 'function'
    ? (IconComponent as React.ComponentType<{ className?: string }>)
    : null
}

export function MobileMegaMenu({ isOpen, onClose }: MobileMegaMenuProps) {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null)

  const pillars = PILLARS.map((pillar) => ({
    ...pillar,
    items: getExpertiseByPillar(pillar.id),
  }))

  const togglePillar = (pillarId: string) => {
    setExpandedPillar(expandedPillar === pillarId ? null : pillarId)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="border-b border-white/10 bg-slate-950/96 backdrop-blur-2xl shadow-[0_24px_70px_rgba(15,23,42,0.68)]"
        >
          <div className="container-width space-y-3 py-4">
            {/* Quick links */}
            <div className="relative mb-4 overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-2 shadow-[0_16px_40px_rgba(2,6,23,0.24),inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent"
              />
              <div className="mb-2 px-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
                Explore
              </div>
              <div className="flex flex-wrap gap-2">
              <Link
                href="/case-studies"
                onClick={onClose}
                className="rounded-xl border border-white/[0.05] bg-white/[0.03] px-4 py-3 text-[13px] font-semibold text-white/82 transition-all duration-200 hover:border-cyan-400/18 hover:bg-cyan-400/[0.12] hover:text-cyan-50"
              >
                Case Studies
              </Link>
              <Link
                href="/gallery"
                onClick={onClose}
                className="rounded-xl border border-white/[0.05] bg-white/[0.03] px-4 py-3 text-[13px] font-semibold text-white/82 transition-all duration-200 hover:border-cyan-400/18 hover:bg-cyan-400/[0.12] hover:text-cyan-50"
              >
                Gallery
              </Link>
              <Link
                href="/industries"
                onClick={onClose}
                className="rounded-xl border border-white/[0.05] bg-white/[0.03] px-4 py-3 text-[13px] font-semibold text-white/82 transition-all duration-200 hover:border-cyan-400/18 hover:bg-cyan-400/[0.12] hover:text-cyan-50"
              >
                Industries
              </Link>
              <Link
                href="/about"
                onClick={onClose}
                className="rounded-xl border border-white/[0.05] bg-white/[0.03] px-4 py-3 text-[13px] font-semibold text-white/82 transition-all duration-200 hover:border-cyan-400/18 hover:bg-cyan-400/[0.12] hover:text-cyan-50"
              >
                About
              </Link>
              </div>
            </div>
            {/* Pillar Accordions */}
            {pillars.map((pillar) => {
              const PillarIcon = getIcon(pillar.icon)
              const isExpanded = expandedPillar === pillar.id

              return (
                <div
                  key={pillar.id}
                  className="rounded-[1.15rem] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                >
                  {/* Pillar Header */}
                  <button
                    onClick={() => togglePillar(pillar.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[13px] font-semibold transition-all duration-200",
                      isExpanded
                        ? "bg-[linear-gradient(180deg,rgba(34,211,238,0.14),rgba(255,255,255,0.04))] text-white shadow-[0_12px_28px_rgba(8,145,178,0.14),inset_0_1px_0_rgba(255,255,255,0.06)]"
                        : "text-white/88 hover:bg-white/10 hover:text-white",
                    )}
                    aria-expanded={isExpanded}
                    aria-controls={`pillar-${pillar.id}`}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${pillar.title} menu`}
                  >
                    <div className="flex items-center gap-3">
                      {PillarIcon && (
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-[0_0_18px_rgba(59,130,246,0.25)] transition-colors",
                            isExpanded ? "text-cyan-100" : "text-brand-200",
                          )}
                          aria-hidden="true"
                        >
                          <PillarIcon className="w-4 h-4" />
                        </div>
                      )}
                      <span>{pillar.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 rotate-180 text-cyan-200 transition-transform" aria-hidden="true" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500 transition-transform" aria-hidden="true" />
                    )}
                  </button>

                  {/* Sublinks */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        id={`pillar-${pillar.id}`}
                        className="ml-12 mt-2 space-y-1 pb-2"
                      >
                        <li className="px-3 pb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                          Topics
                        </li>
                        {pillar.description && (
                          <li className="px-3 pb-2 text-[12px] text-slate-400 leading-relaxed">
                            {pillar.description}
                          </li>
                        )}
                        {pillar.items.map((item) => {
                          const ItemIcon = getIcon(item.icon)

                          return (
                            <li key={item.slug}>
                              <Link
                                href={`/expertise/${item.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-slate-300 transition-colors hover:bg-cyan-400/[0.1] hover:text-white"
                                aria-label={`Navigate to ${item.title}`}
                              >
                                {ItemIcon && (
                                  <ItemIcon className="h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
                                )}
                                <span>{item.title}</span>
                              </Link>
                            </li>
                          )
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

            {/* View All Link */}
            <div className="mt-4 border-t border-white/10 pt-4">
              <Link
                href="/expertise"
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400/14 bg-cyan-400/[0.08] px-4 py-3 text-[13px] font-semibold text-cyan-100 transition-colors hover:bg-cyan-400/[0.14]"
                aria-label="View all Expertise services"
              >
                View all Expertise
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Industries Section */}
            <div className="mt-6 border-t border-white/10 pt-6">
              <div className="px-4 py-2 mb-2">
                <h3 className="text-[13px] font-semibold text-white mb-3 tracking-[0.12em] uppercase">Industries</h3>
                <Link
                  href="/industries"
                  onClick={onClose}
                  className="mb-2 block rounded-xl border border-white/[0.05] bg-white/[0.03] px-4 py-2.5 text-[13px] font-semibold text-white/82 transition-colors hover:border-cyan-400/18 hover:bg-cyan-400/[0.12] hover:text-cyan-50"
                >
                  All Industries
                </Link>
                <ul className="space-y-1">
                  {[...industryItems]
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map((industry) => (
                      <li key={industry.slug}>
                        <Link
                          href={`/industries/${industry.slug}`}
                          onClick={onClose}
                          className="block rounded-xl px-4 py-2 text-[13px] text-slate-300 transition-colors hover:bg-cyan-400/[0.1] hover:text-white"
                        >
                          {industry.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

