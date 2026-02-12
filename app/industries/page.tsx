'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import * as Icons from 'lucide-react'
import { industryItems } from '@/content/industries'
import { PILLARS } from '@/lib/types'

type IconName = keyof typeof Icons

/* Global palette — matches main page */
const NAVY_DEEP = '#0A0F2D'
const NAVY_DARK = '#020617'
const ACCENT_CYAN = '#00CFFF'
const ACCENT_BLUE = '#3B82F6'
const GRADIENT_PINK = '#C026D3'
const SUCCESS_GREEN = '#22C55E'
const TEXT_WHITE = '#FFFFFF'
const TEXT_CYAN = '#67E8F9'

/* Path variants — pulsing flow lines */
const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: [0, 1, 1],
    opacity: [0, 0.6, 0.2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      times: [0, 0.5, 1] as [number, number, number],
    },
  },
}

function HeroFlowBackground() {
  const reduced = useReducedMotion() ?? false
  if (reduced) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-90">
      <svg viewBox="0 0 1200 800" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="industriesCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ACCENT_CYAN} stopOpacity="0.6" />
            <stop offset="50%" stopColor={ACCENT_BLUE} stopOpacity="0.5" />
            <stop offset="100%" stopColor={ACCENT_CYAN} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g stroke="url(#industriesCyanGrad)" strokeWidth="1.5" fill="none" strokeLinecap="round">
          <motion.path
            d="M 0 180 C 220 160, 450 200, 700 180 C 950 160, 1100 200, 1200 180"
            variants={pathVariants}
            initial="initial"
            animate="animate"
          />
          <motion.path
            d="M 0 400 C 280 370, 520 430, 800 400 C 1000 380, 1150 420, 1200 400"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{ ...pathVariants.animate.transition, delay: 0.7 }}
          />
          <motion.path
            d="M 0 620 C 300 590, 600 650, 900 620 C 1080 590, 1180 640, 1200 620"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{ ...pathVariants.animate.transition, delay: 1.4 }}
          />
        </g>
      </svg>
    </div>
  )
}

const featuredIndustries = industryItems.filter((item) => item.featured)
const allIndustries = [...industryItems].sort((a, b) => a.title.localeCompare(b.title))

export default function IndustriesPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const allRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)
  const isFeaturedInView = useInView(featuredRef, { once: true, margin: '-80px 0px' })
  const isAllInView = useInView(allRef, { once: true, margin: '-80px 0px' })
  const isPillarsInView = useInView(pillarsRef, { once: true, margin: '-80px 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: `linear-gradient(180deg, ${NAVY_DEEP} 0%, ${NAVY_DARK} 50%, ${NAVY_DEEP} 100%)`,
      }}
    >
      {/* ========== HERO ========== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24"
        style={{
          background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, #0d1338 25%, ${NAVY_DARK} 55%, ${NAVY_DEEP} 100%)`,
        }}
      >
        <HeroFlowBackground />
        <div className="container-width relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.06] tracking-tight"
                style={{
                  background: `linear-gradient(135deg, ${GRADIENT_PINK} 0%, ${ACCENT_BLUE} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                }}
              >
                Industries where GTMstack has delivered{' '}
                <span style={{ WebkitTextFillColor: TEXT_CYAN }}>pipeline outcomes</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl"
                style={{ color: TEXT_CYAN }}
              >
                Deep vertical expertise across B2B technology sectors. Each industry has unique GTM
                challenges—and I&apos;ve solved them with measurable results.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link
                  href="#industries"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[#020617] transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    backgroundColor: ACCENT_CYAN,
                    boxShadow: `0 0 30px rgba(0,207,255,0.4)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 50px rgba(0,207,255,0.6), 0 0 90px rgba(59,130,246,0.25)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px rgba(0,207,255,0.4)`
                  }}
                >
                  Explore industries
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.03] border-2"
                  style={{
                    borderColor: 'rgba(0,207,255,0.5)',
                    color: TEXT_CYAN,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ACCENT_CYAN
                    e.currentTarget.style.boxShadow = `0 0 35px rgba(0,207,255,0.25)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,207,255,0.5)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  View case studies
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block h-[280px] lg:h-[340px] xl:h-[380px] rounded-2xl overflow-hidden border-2 backdrop-blur-sm"
              style={{
                borderColor: 'rgba(0,207,255,0.2)',
                backgroundColor: 'rgba(10,15,45,0.6)',
                boxShadow: `0 0 60px -15px rgba(0,207,255,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
              }}
            >
              <Image
                src="/images/heroes/industries-default.webp"
                alt="Industries GTM expertise"
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 1024px) 0vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${ACCENT_CYAN}, ${ACCENT_BLUE}, transparent)` }}
          animate={shouldReduceMotion ? {} : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </section>

      {/* ========== FEATURED INDUSTRIES ========== */}
      {featuredIndustries.length > 0 && (
        <section
          ref={featuredRef}
          id="industries"
          className="relative py-16 md:py-24"
          style={{
            background: `linear-gradient(180deg, ${NAVY_DARK} 0%, ${NAVY_DEEP} 50%, ${NAVY_DARK} 100%)`,
          }}
        >
          <div className="container-width">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{
                background: `linear-gradient(135deg, ${GRADIENT_PINK} 0%, ${ACCENT_BLUE} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Featured Industries
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 }}
              className="text-lg max-w-2xl mb-12"
              style={{ color: TEXT_CYAN }}
            >
              Real GTM experience across these verticals, with measurable results and proven playbooks.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
              {featuredIndustries.map((industry, i) => {
                const IconComponent = Icons[industry.icon as IconName] as
                  | React.ComponentType<{ className?: string; style?: React.CSSProperties }>
                  | undefined
                return (
                  <motion.div
                    key={industry.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isFeaturedInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      boxShadow: `0 16px 48px rgba(0,207,255,0.18), 0 0 70px rgba(0,207,255,0.1)`,
                    }}
                  >
                    <Link href={`/industries/${industry.slug}`} className="block h-full">
                      <div className="h-full glass-card-surface p-6 md:p-8 group">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                          style={{ backgroundColor: 'rgba(0,207,255,0.12)' }}
                        >
                          {IconComponent && (
                            <IconComponent
                              className="w-6 h-6"
                              style={{ color: ACCENT_CYAN }}
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <h3 className="font-bold text-xl text-white mb-2.5 group-hover:text-[#67E8F9] transition-colors">
                          {industry.title}
                        </h3>
                        <p className="text-sm leading-relaxed mb-5" style={{ color: TEXT_CYAN }}>
                          {industry.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {industry.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                              style={{
                                backgroundColor: 'rgba(0,207,255,0.12)',
                                color: ACCENT_CYAN,
                                borderWidth: 1,
                                borderColor: 'rgba(0,207,255,0.25)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3" style={{ color: ACCENT_CYAN }}>
                          Explore industry
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========== ALL INDUSTRIES ========== */}
      <section
        ref={allRef}
        className="relative py-16 md:py-24"
        style={{ background: NAVY_DARK }}
      >
        <div className="container-width">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isAllInView ? { opacity: 1, y: 0 } : {}}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              background: `linear-gradient(135deg, ${GRADIENT_PINK} 0%, ${ACCENT_BLUE} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Complete industry coverage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isAllInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
            className="text-lg max-w-2xl mb-12"
            style={{ color: TEXT_CYAN }}
          >
            Browse all industries where I&apos;ve delivered GTM results and built proven frameworks.
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {allIndustries.map((industry, i) => {
              const IconComponent = Icons[industry.icon as IconName] as
                | React.ComponentType<{ className?: string; style?: React.CSSProperties }>
                | undefined
              return (
                <motion.div
                  key={industry.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isAllInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.4 }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    boxShadow: `0 12px 40px rgba(0,207,255,0.15), 0 0 60px rgba(0,207,255,0.08)`,
                  }}
                >
                  <Link href={`/industries/${industry.slug}`} className="block h-full">
                    <div
                      className="h-full rounded-2xl border-2 p-5 md:p-6 backdrop-blur-md transition-all duration-300 group"
                      style={{
                        borderColor: 'rgba(0,207,255,0.15)',
                        backgroundColor: 'rgba(10,15,45,0.55)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: 'rgba(0,207,255,0.1)' }}
                      >
                        {IconComponent && (
                          <IconComponent
                            className="w-5 h-5"
                            style={{ color: ACCENT_CYAN }}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <h3 className="font-bold text-lg text-white mb-2 group-hover:text-[#67E8F9] transition-colors">
                        {industry.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: TEXT_CYAN }}>
                        {industry.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {industry.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: 'rgba(0,207,255,0.1)',
                              color: TEXT_CYAN,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== EXPLORE RELATED EXPERTISE ========== */}
      <section
        ref={pillarsRef}
        className="relative py-16 md:py-24"
        style={{
          background: `linear-gradient(180deg, ${NAVY_DEEP} 0%, rgba(2,6,23,0.95) 50%, ${NAVY_DEEP} 100%)`,
        }}
      >
        <div className="container-width">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isPillarsInView ? { opacity: 1, y: 0 } : {}}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              background: `linear-gradient(135deg, ${GRADIENT_PINK} 0%, ${ACCENT_BLUE} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            GTM capabilities that power industry outcomes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isPillarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
            className="text-lg max-w-2xl mb-12"
            style={{ color: TEXT_CYAN }}
          >
            These four pillars work together to deliver pipeline results across all industries.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {PILLARS.map((pillar, i) => {
              const IconComponent = Icons[pillar.icon as IconName] as
                | React.ComponentType<{ className?: string; style?: React.CSSProperties }>
                | undefined
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isPillarsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    boxShadow: `0 12px 40px rgba(0,207,255,0.15), 0 0 60px rgba(0,207,255,0.08)`,
                  }}
                >
                  <Link href={pillar.href} className="block h-full">
                    <div
                      className="h-full rounded-2xl border-2 p-5 md:p-6 backdrop-blur-md transition-all duration-300 group"
                      style={{
                        borderColor: 'rgba(0,207,255,0.15)',
                        backgroundColor: 'rgba(10,15,45,0.55)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: 'rgba(0,207,255,0.12)' }}
                      >
                        {IconComponent && (
                          <IconComponent
                            className="w-5 h-5"
                            style={{ color: ACCENT_CYAN }}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <h3 className="font-bold text-lg text-white mb-2 group-hover:text-[#67E8F9] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: TEXT_CYAN }}>
                        {pillar.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3" style={{ color: ACCENT_CYAN }}>
                        Explore
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section
        className="relative py-20 md:py-32"
        style={{
          background: `linear-gradient(180deg, ${NAVY_DEEP} 0%, ${NAVY_DARK} 50%, ${NAVY_DEEP} 100%)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-width text-center max-w-3xl mx-auto"
        >
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
            style={{
              background: `linear-gradient(135deg, ${GRADIENT_PINK} 0%, ${ACCENT_BLUE} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Don&apos;t see your industry?
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-12" style={{ color: TEXT_CYAN }}>
            I work across all B2B technology verticals. Let&apos;s discuss your specific context and
            how we can deliver pipeline outcomes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-[#020617] transition-all duration-300 hover:scale-[1.04]"
              style={{
                backgroundColor: ACCENT_CYAN,
                boxShadow: `0 0 45px rgba(0,207,255,0.45)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 65px rgba(0,207,255,0.6), 0 0 110px rgba(59,130,246,0.2)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 45px rgba(0,207,255,0.45)`
              }}
            >
              Start a Conversation
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-white border-2 transition-all duration-300 hover:scale-[1.04]"
              style={{
                borderColor: 'rgba(0,207,255,0.6)',
                color: TEXT_CYAN,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ACCENT_CYAN
                e.currentTarget.style.boxShadow = `0 0 35px rgba(0,207,255,0.3)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,207,255,0.6)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              View Case Studies
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
