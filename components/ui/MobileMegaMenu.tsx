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
          className="bg-slate-950/95 backdrop-blur-2xl border-b border-white/10"
        >
          <div className="container-width py-4 space-y-1">
            {/* Quick links */}
            <div className="flex flex-wrap gap-2 pb-4 mb-4 border-b border-white/10">
              <Link href="/case-studies" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10">
                Case Studies
              </Link>
              <Link href="/gallery" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10">
                Gallery
              </Link>
              <Link href="/industries" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10">
                Industries
              </Link>
              <Link href="/about" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10">
                About
              </Link>
              <Link href="/contact" onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-500/20 text-brand-300 hover:bg-brand-500/30">
                Contact
              </Link>
            </div>
            {/* Pillar Accordions */}
            {pillars.map((pillar) => {
              const PillarIcon = getIcon(pillar.icon)
              const isExpanded = expandedPillar === pillar.id

              return (
                <div key={pillar.id} className="border-b border-white/5 last:border-0 pb-2 last:pb-0">
                  {/* Pillar Header */}
                  <button
                    onClick={() => togglePillar(pillar.id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                    aria-expanded={isExpanded}
                    aria-controls={`pillar-${pillar.id}`}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${pillar.title} menu`}
                  >
                    <div className="flex items-center gap-3">
                      {PillarIcon && (
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500/25 via-brand-400/10 to-slate-900/80 border border-brand-500/40 flex items-center justify-center text-brand-300 shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.45)]" aria-hidden="true">
                          <PillarIcon className="w-4 h-4" />
                        </div>
                      )}
                      <span>{pillar.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 transition-transform rotate-180" aria-hidden="true" />
                    ) : (
                      <ChevronRight className="w-4 h-4 transition-transform" aria-hidden="true" />
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
                        className="ml-12 mt-1 space-y-1"
                      >
                        {pillar.items.map((item) => {
                          const ItemIcon = getIcon(item.icon)

                          return (
                            <li key={item.slug}>
                              <Link
                                href={`/expertise/${item.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                aria-label={`Navigate to ${item.title}`}
                              >
                                {ItemIcon && (
                                  <ItemIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
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
            <div className="pt-4 mt-4 border-t border-white/10">
              <Link
                href="/expertise"
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-brand-400 hover:text-brand-300 hover:bg-brand-500/10 transition-colors"
                aria-label="View all Expertise services"
              >
                View all Expertise
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Industries Section */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <div className="px-4 py-2 mb-2">
                <h3 className="text-sm font-semibold text-white mb-3">Industries</h3>
                <Link
                  href="/industries"
                  onClick={onClose}
                  className="block px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors mb-2"
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
                          className="block px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
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

