'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ArrowRight, ArrowLeft, Compass, Sparkles, Layers, LineChart, ChevronRight } from 'lucide-react'
import { ExpertiseItem } from '@/lib/types'
import { CaseStudyItem } from '@/lib/types'
import { IndustryItem } from '@/lib/types'

/* Preserved: Animated dashboard element in hero upper right — do not delete or modify */
const ExpertiseHeroVisual = dynamic(
  () => import('@/components/expertise/ExpertiseHeroVisual.client').then((m) => m.ExpertiseHeroVisual),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 rounded-2xl bg-[#0A0F2D]/80 animate-pulse flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#36C0CF]/40 border-t-[#36C0CF] rounded-full animate-spin" />
      </div>
    ),
  }
)

const CYAN = '#36C0CF'
const BLUE = '#146EF5'
const TEAL = '#00A8A8'
const GOLD = '#FFD700'

export type PillarId = 'content-engagement' | 'demand-growth' | 'strategy-insights' | 'systems-operations'

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: [0, 1, 0.7],
    opacity: [0, 0.7, 0.4],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      times: [0, 0.4, 1] as [number, number, number],
    },
  },
}

const ROUTE_STEPS = [
  { title: 'Map signals & ICP', detail: 'Clarify ICP tiers, buying triggers, and leading signals tied to this expertise.', icon: Compass },
  { title: 'Design the play', detail: 'Define the core motion, offer, and success criteria with measurable checkpoints.', icon: Sparkles },
  { title: 'Instrument & launch', detail: 'Wire data, routing, and orchestration; launch with gated stages and dashboards.', icon: Layers },
  { title: 'Optimize to proof', detail: 'Run sprints, tune levers, and lock proof points before scaling spend.', icon: LineChart },
]

interface ExpertiseDetailContentProps {
  item: ExpertiseItem
  pillarId: PillarId
  pillarTitle: string
  pillarTintOverlay: string
  challenges: string[]
  executionStack: string[]
  results: { value: string; label: string }[]
  relatedExpertise: ExpertiseItem[]
  relatedCaseStudies: CaseStudyItem[]
  relatedIndustries: IndustryItem[]
  heroConfig?: { tagline?: string; metrics?: { label: string; value: string }[] }
}

export function ExpertiseDetailContent({
  item,
  pillarId,
  pillarTitle,
  pillarTintOverlay,
  challenges,
  executionStack,
  results,
  relatedExpertise,
  relatedCaseStudies,
  relatedIndustries,
  heroConfig,
}: ExpertiseDetailContentProps) {
  const challengesRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const isChallengesInView = useInView(challengesRef, { once: true, margin: '-5% 0px' })
  const isResultsInView = useInView(resultsRef, { once: true, margin: '-5% 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false

  const [resultValues, setResultValues] = useState(results.map((r) => r.value))

  const jitter = useCallback(() => {
    if (shouldReduceMotion) return
    setResultValues((prev) =>
      prev.map((v) => {
        const m = v.match(/^([^0-9.-]*)([0-9.,]+)(.*)$/)
        if (!m) return v
        const [, pre = '', num, suf = ''] = m
        const n = parseFloat(num.replace(/,/g, ''))
        const jittered = n + (Math.random() - 0.5) * 0.18 * Math.max(n, 1)
        return `${pre}${Math.round(Math.max(jittered, 0))}${suf}`
      })
    )
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!isResultsInView || shouldReduceMotion) return
    const t = setInterval(jitter, 1800 + Math.random() * 1200)
    return () => clearInterval(t)
  }, [isResultsInView, jitter, shouldReduceMotion])

  type IconName = keyof typeof Icons
  const IconComponent = Icons[(item.icon || 'Sparkles') as IconName] as React.ComponentType<{ className?: string }> | undefined
  const tagline = heroConfig?.tagline ?? item.description ?? item.positioning ?? ''

  return (
    <div className="min-h-screen bg-[#0A0F2D] text-white">
      {/* ========== HERO ========== */}
      <section
        className="relative overflow-hidden pt-8 pb-6 md:pt-12 md:pb-8"
        style={{
          background: `linear-gradient(135deg, #0A0F2D 0%, #0D1540 30%, ${pillarTintOverlay} 50%, #0D1540 70%, #0A0F2D 100%)`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
          <svg viewBox="0 0 1200 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id={`heroGrad-${pillarId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={BLUE} stopOpacity="0.6" />
                <stop offset="50%" stopColor={CYAN} stopOpacity="0.7" />
                <stop offset="100%" stopColor={BLUE} stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <g stroke={`url(#heroGrad-${pillarId})`} strokeWidth="2.5" fill="none" strokeLinecap="round">
              <motion.path
                d="M 0 150 C 300 120, 600 180, 900 150 C 1100 130, 1200 160, 1200 150"
                variants={pathVariants}
                initial="initial"
                animate="animate"
              />
              <motion.path
                d="M 0 350 C 400 320, 800 380, 1200 350"
                variants={pathVariants}
                initial="initial"
                animate="animate"
                transition={{ ...pathVariants.animate.transition, delay: 0.4 }}
              />
              <motion.path
                d="M 0 480 C 350 450, 700 500, 1200 470"
                variants={pathVariants}
                initial="initial"
                animate="animate"
                transition={{ ...pathVariants.animate.transition, delay: 0.8 }}
              />
            </g>
          </svg>
        </div>
        <div className="container-width relative z-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm mb-3 text-[#F0F0F0]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#36C0CF] transition-colors">Home</Link>
            <span className="text-white/60">/</span>
            <Link href="/expertise" className="hover:text-[#36C0CF] transition-colors">Expertise</Link>
            <span className="text-white/60">/</span>
            <Link href={`/expertise/${pillarId}`} className="hover:text-[#36C0CF] transition-colors">
              {pillarTitle}
            </Link>
            <span className="text-white/60">/</span>
            <span className="text-white font-medium">{item.title}</span>
          </nav>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-4 lg:gap-6 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs mb-2"
                style={{ borderColor: `${CYAN}60`, backgroundColor: `${CYAN}20` }}
              >
                {IconComponent && (
                  <span className="inline-flex text-[#36C0CF]">
                    <IconComponent className="w-3.5 h-3.5" />
                  </span>
                )}
                <span className="text-[#36C0CF] font-medium">{pillarTitle}</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white"
                style={{ textShadow: `0 0 40px rgba(54,192,207,0.5), 0 0 80px rgba(54,192,207,0.3)` }}
              >
                {item.title} Expertise
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="mt-2 text-base md:text-lg text-[#F0F0F0] max-w-2xl font-medium"
              >
                {tagline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="mt-4 flex flex-wrap gap-2"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(0,168,168,0.6)]"
                  style={{ backgroundColor: TEAL }}
                >
                  Book a Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              {heroConfig?.metrics && heroConfig.metrics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 grid grid-cols-2 gap-2 max-w-sm"
                >
                  {heroConfig.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg border p-2.5 backdrop-blur-sm bg-[#0A0F2D]/80"
                      style={{ borderColor: `${CYAN}50` }}
                    >
                      <div className="text-[10px] text-[#F0F0F0] uppercase tracking-wide">{m.label}</div>
                      <div className="text-base font-bold text-[#FFD700]">{m.value}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
            {/* Preserved: Animated dashboard element in upper right */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div
                className="relative mx-auto w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden border-2"
                style={{ borderColor: `${CYAN}60`, boxShadow: `0 0 60px ${CYAN}30` }}
              >
                <ExpertiseHeroVisual
                  config={heroConfig ? { engine: 'scan', accent: 'cyan', metrics: heroConfig.metrics ?? [], tagline: heroConfig.tagline ?? '' } : undefined}
                  borderClassName="border-white/20"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pulsing cyan divider */}
      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ========== CHALLENGES ========== */}
      <section ref={challengesRef} className="relative py-4 md:py-6 bg-[#080B1E]">
        <div className="container-width">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-3">Common Challenges</h2>
          <motion.ul
            initial="hidden"
            animate={isChallengesInView ? 'visible' : 'hidden'}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
            className="grid sm:grid-cols-2 gap-2"
          >
            {challenges.map((c) => (
              <motion.li
                key={c}
                variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
                whileHover={{ x: 4, scale: 1.01 }}
                className="flex items-center gap-2 rounded-lg border p-3 transition-colors bg-[#0A0F2D]/90"
                style={{ borderColor: `${CYAN}50` }}
              >
                <div className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#FFD700]" />
                <span className="text-sm text-white">{c}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />

      {/* ========== ROUTE MAP ========== */}
      <section className="relative py-4 md:py-6 bg-[#0A0F2D] overflow-hidden">
        <div className="container-width relative">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <svg viewBox="0 0 500 180" className="w-full h-32 md:h-40" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`routeGrad-${pillarId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={BLUE} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={CYAN} stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 10 40 Q 125 40 250 70 T 490 90"
                fill="none"
                stroke={`url(#routeGrad-${pillarId})`}
                strokeWidth="3"
                strokeLinecap="round"
                variants={pathVariants}
                initial="initial"
                animate="animate"
              />
              <motion.path
                d="M 10 120 Q 150 120 300 100 T 490 80"
                fill="none"
                stroke={`url(#routeGrad-${pillarId})`}
                strokeWidth="2.5"
                strokeLinecap="round"
                variants={pathVariants}
                initial="initial"
                animate="animate"
                transition={{ ...pathVariants.animate.transition, delay: 0.6 }}
              />
            </svg>
          </div>
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4 relative z-10">Route Map</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 relative z-10">
            {ROUTE_STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -6, boxShadow: `0 12px 40px ${CYAN}50` }}
                  className="rounded-xl border-2 p-4 backdrop-blur-sm transition-all bg-[#0D1540]/90"
                  style={{ borderColor: `${CYAN}50` }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
                    style={{ backgroundColor: `${CYAN}30`, borderColor: `${CYAN}60`, borderWidth: 1 }}
                  >
                    <motion.div
                      animate={shouldReduceMotion ? {} : { rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-[#36C0CF]"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <span className="text-xs font-bold text-[#36C0CF]">Step {i + 1}</span>
                  <h3 className="font-bold text-white mt-0.5 mb-1 text-sm">{step.title}</h3>
                  <p className="text-xs text-[#F0F0F0] leading-snug">{step.detail}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />

      {/* ========== EXECUTION STACK ========== */}
      <section className="relative py-4 md:py-6 bg-[#080B1E]">
        <div className="container-width">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-3">Execution Stack</h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
          >
            {executionStack.map((tool, i) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, rotateY: -8 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                whileHover={{ scale: 1.06, boxShadow: `0 0 24px ${CYAN}40` }}
                className="rounded-lg border-2 p-3 text-center text-white text-sm font-medium transition-colors bg-[#0A0F2D]/90"
                style={{ borderColor: `${CYAN}40` }}
              >
                {tool}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* ========== RESULTS ========== */}
      <section ref={resultsRef} className="relative py-4 md:py-6 bg-[#0A0F2D]">
        <div className="container-width">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4">Results</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {results.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isResultsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                whileHover={{
                  scale: 1.06,
                  boxShadow: `0 0 60px ${GOLD}40`,
                  borderColor: `${GOLD}70`,
                }}
                className="rounded-xl border-2 p-6 text-center backdrop-blur-sm transition-all bg-[#0D1540]/80"
                style={{ borderColor: `${CYAN}40` }}
              >
                <motion.span
                  key={resultValues[i]}
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 1 }}
                  className="block text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFD700] tabular-nums mb-1 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                >
                  {resultValues[i] ?? r.value}
                </motion.span>
                <p className="text-sm text-[#F0F0F0] font-medium">{r.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />

      {/* ========== RELATED ========== */}
      <section className="relative py-4 md:py-6 bg-[#080B1E]">
        <div className="container-width">
          <h2 className="font-display text-xl font-bold text-white mb-3">Related</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            {relatedExpertise.slice(0, 3).map((e, i) => (
              <motion.div
                key={e.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                whileHover={{ y: -6, boxShadow: `0 8px 32px ${CYAN}40` }}
              >
                <Link
                  href={`/expertise/${e.slug}`}
                  className="block rounded-xl border-2 p-4 bg-[#0A0F2D]/90 transition-all duration-300 group"
                  style={{ borderColor: `${CYAN}50` }}
                >
                  <h4 className="font-semibold text-white group-hover:text-[#36C0CF] transition-colors mb-0.5 text-sm">
                    {e.title}
                  </h4>
                  <p className="text-xs text-[#F0F0F0] line-clamp-2">{e.description}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#36C0CF]">
                    Explore <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
            {relatedCaseStudies.slice(0, 2).map((cs, i) => (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: (3 + i) * 0.04 }}
                whileHover={{ y: -6, boxShadow: `0 8px 32px ${CYAN}40` }}
              >
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="block rounded-xl border-2 p-4 bg-[#0A0F2D]/90 transition-all duration-300 group"
                  style={{ borderColor: `${CYAN}50` }}
                >
                  <h4 className="font-semibold text-white group-hover:text-[#36C0CF] transition-colors mb-0.5 text-sm">
                    {cs.title}
                  </h4>
                  <p className="text-xs text-[#F0F0F0] line-clamp-2">{cs.description}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#36C0CF]">
                    View Case Study <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
            {relatedIndustries.slice(0, 2).map((ind, i) => (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: (5 + i) * 0.04 }}
                whileHover={{ y: -6, boxShadow: `0 8px 32px ${CYAN}40` }}
              >
                <Link
                  href={`/industries/${ind.slug}`}
                  className="block rounded-xl border-2 p-4 bg-[#0A0F2D]/90 transition-all duration-300 group"
                  style={{ borderColor: `${CYAN}50` }}
                >
                  <h4 className="font-semibold text-white group-hover:text-[#36C0CF] transition-colors mb-0.5 text-sm">
                    {ind.title}
                  </h4>
                  <p className="text-xs text-[#F0F0F0] line-clamp-2">{ind.description}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#36C0CF]">
                    Explore <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/expertise"
              className="inline-flex items-center gap-2 text-[#F0F0F0] hover:text-[#36C0CF] transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Expertise
            </Link>
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />

      {/* ========== FOOTER CTA ========== */}
      <section
        className="relative py-8 md:py-10"
        style={{ background: 'linear-gradient(180deg, #0D1540 0%, #0A0F2D 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-width text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-3">
            Ready for {item.title} results?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_60px_rgba(54,192,207,0.6)]"
            style={{ backgroundColor: TEAL }}
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
