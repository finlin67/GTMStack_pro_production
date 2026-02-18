'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Zap,
  Target,
  BarChart3,
  Cpu,
  Rocket,
  TrendingUp,
  Workflow,
  DollarSign,
  ChevronRight,
} from 'lucide-react'

/* Palette — main.png style: navy, cyan, gradient, green */
const NAVY_DEEP = '#0A0F2D'
const NAVY_DARK = '#020617'
const ACCENT_CYAN = '#00CFFF'
const ACCENT_BLUE = '#3B82F6'
const GRADIENT_PINK = '#C026D3'
const SUCCESS_GREEN = '#22C55E'
const TEXT_CYAN = '#67E8F9'

/* AIGrowth animated tile — hero right side, used as-is */
const AIGrowth = dynamic(() => import('@/src/components/animations/AIGrowth'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 rounded-2xl bg-navy-deep/80 animate-pulse flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent-cyan/40 border-t-accent-cyan rounded-full animate-spin" aria-hidden="true" />
    </div>
  ),
})

/* Path variants — EnterpriseSalesMotionDashboard style */
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
          <linearGradient id="cyanBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ACCENT_CYAN} stopOpacity="0.6" />
            <stop offset="50%" stopColor={ACCENT_BLUE} stopOpacity="0.5" />
            <stop offset="100%" stopColor={ACCENT_CYAN} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g stroke={`url(#cyanBlueGrad)`} strokeWidth="1.5" fill="none" strokeLinecap="round">
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

function jitterStatValue(value: string, amount = 0.035): string {
  const match = value.match(/^([^0-9.-]*)([0-9.,]+)(.*)$/)
  if (!match) return value
  const [, prefix = '', numStr, suffix = ''] = match
  const num = parseFloat(numStr.replace(/,/g, ''))
  const jittered = num + (Math.random() - 0.5) * 2 * amount * Math.max(num, 1)
  const rounded = numStr.includes('.') ? parseFloat(jittered.toFixed(1)) : Math.round(Math.max(jittered, 0))
  return `${prefix}${String(rounded)}${suffix}`
}

const STATS = [
  { value: '$45M+', label: 'Pipeline Generated', icon: DollarSign },
  { value: '87%', label: 'YoY Growth', icon: TrendingUp },
  { value: '340%', label: 'Engagement Lift', icon: Zap },
  { value: '2.5x', label: 'Deal Velocity', icon: Rocket },
  { value: '98.1%', label: 'Success Rate on Routed Leads', icon: Target },
]

const VALUE_CARDS = [
  {
    icon: Workflow,
    title: 'Unified ABM + RevOps Engine',
    copy: 'Break silos, automate routing, close attribution gaps. See 126% pipeline increases.',
    href: '/expertise',
  },
  {
    icon: Target,
    title: 'Intent-Driven Prioritization',
    copy: 'Focus sales on in-market accounts. Generate 74 SQLs from high-intent signals.',
    href: '/expertise',
  },
  {
    icon: BarChart3,
    title: 'Scalable Content & Demand',
    copy: 'From 500% SEO growth to 571% lead surges — we build engines that compound.',
    href: '/expertise',
  },
  {
    icon: Cpu,
    title: 'Enterprise-Grade Execution',
    copy: 'MarTech optimization, AI automation, sales enablement — 2–3x faster workflows.',
    href: '/expertise',
  },
]

const TIMELINE_ITEMS = [
  { year: '2024', title: 'GTMStack Pro Launch', tag: 'Founder' },
  { year: '2019', title: 'VP Growth · $45M ARR', tag: 'Series C' },
  { year: '2016', title: 'Director Demand Gen', tag: 'Enterprise' },
  { year: '2012', title: 'Early Growth Roles', tag: 'Startups' },
]

export default function HomeDefaultClient() {
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false

  const [statValues, setStatValues] = useState(STATS.map((s) => s.value))
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const updateJitter = useCallback(() => {
    if (shouldReduceMotion) return
    setStatValues((prev) => STATS.map((s, i) => jitterStatValue(prev[i] ?? s.value)))
    timerRef.current = setTimeout(updateJitter, 2200 + Math.random() * 2500)
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!isStatsInView || shouldReduceMotion) return
    updateJitter()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isStatsInView, updateJitter, shouldReduceMotion])

  const [timelineFilter, setTimelineFilter] = useState<'all' | 'industry' | 'expertise'>('all')
  const timelineScrollRef = useRef<HTMLDivElement>(null)

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
          background: `linear-gradient(135deg, var(--color-background-alt) 0%, var(--color-background-alt) 25%, var(--color-background) 55%, var(--color-background-alt) 100%)`,
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
                className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.06] tracking-tight text-white"
              >
                Turn Your{' '}
                <span
                  className="inline-block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${GRADIENT_PINK} 0%, ${ACCENT_BLUE} 100%)`,
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  Go-To-Market
                </span>{' '}
                Into a{' '}
                <span
                  className="inline-block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${GRADIENT_PINK} 0%, ${ACCENT_BLUE} 100%)`,
                    WebkitBackgroundClip: 'text',
                  }}
                >
                  Revenue Machine
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl"
                style={{ color: TEXT_CYAN }}
              >
                Strategic B2B GTM consulting that bridges strategy & execution. We build scalable
                systems — unified ABM + RevOps + intent data — that deliver predictable, measurable
                growth. $45M pipelines. 340% engagement lifts. 2.5x velocity. Real results, not theory.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-navy-dark transition-all duration-300 hover:scale-[1.03]"
                  style={{
                    backgroundColor: ACCENT_CYAN,
                    boxShadow: `0 0 30px rgba(0,207,255,0.2)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 50px rgba(0,207,255,0.2), 0 0 90px rgba(59,130,246,0.12)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px rgba(0,207,255,0.2)`
                  }}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/projects"
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
                  View Proven Projects
                </Link>
              </motion.div>
            </div>

            {/* DO NOT MODIFY: animated dashboard block (must remain byte-for-byte identical).
                Surrounding layout may change, but this JSX must not be edited, moved, or refactored. */}
            <div className="relative hidden lg:block h-[320px] lg:h-[380px] xl:h-[420px]">
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden border-2 backdrop-blur-sm"
                style={{
                  borderColor: `${ACCENT_CYAN}66`,
                  boxShadow: `0 0 60px ${ACCENT_CYAN}30`,
                }}
              >
                <AIGrowth />
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${ACCENT_CYAN}, ${ACCENT_BLUE}, transparent)` }}
          animate={shouldReduceMotion ? {} : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </section>

      {/* ========== STATS PROOF GRID ========== */}
      <section
        ref={statsRef}
        className="relative py-16 md:py-20"
        style={{
          background: `linear-gradient(180deg, ${NAVY_DARK} 0%, ${NAVY_DEEP} 50%, ${NAVY_DARK} 100%)`,
        }}
      >
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isStatsInView ? { opacity: 1 } : {}}
            className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {STATS.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: `0 0 50px rgba(0,207,255,0.2), 0 0 90px rgba(0,207,255,0.1)`,
                  }}
                  className="relative glass-card-surface-alt p-6 md:p-8"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5" style={{ color: ACCENT_CYAN }} aria-hidden="true" />
                        </div>
                  <p
                    className="text-3xl md:text-4xl lg:text-5xl font-bold tabular-nums"
                    style={{
                      color: SUCCESS_GREEN,
                      textShadow: `0 0 24px rgba(34,197,94,0.2)`,
                    }}
                  >
                    {statValues[i] ?? stat.value}
                  </p>
                  <p className="text-xs md:text-sm font-medium mt-1.5" style={{ color: TEXT_CYAN }}>
                    {stat.label}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== VALUE CARDS — Glassmorphism ========== */}
      <section
        className="relative py-16 md:py-24"
        style={{ background: 'var(--color-background)' }}
      >
        <div className="container-width">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-14 text-white"
          >
            How We <span className="text-gradient">Drive Growth</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {VALUE_CARDS.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: `0 16px 48px rgba(0,207,255,0.18), 0 0 70px rgba(0,207,255,0.1)`,
                  }}
                  className="group glass-card-surface p-6 md:p-7"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors"
                    style={{ backgroundColor: 'rgba(0,207,255,0.12)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: ACCENT_CYAN }} aria-hidden="true" />
        </div>
                  <h3 className="font-bold text-lg text-white mb-2.5">{card.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: TEXT_CYAN }}>
                    {card.copy}
                  </p>
            <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                    style={{ color: ACCENT_CYAN }}
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== INTERACTIVE TIMELINE TEASER ========== */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, var(--color-background-alt) 0%, var(--color-background) 50%, var(--color-background-alt) 100%)`,
        }}
      >
        <div className="container-width">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Proven Track Record
            </h2>
            <div className="flex gap-2" role="group" aria-label="Filter timeline">
              {(['all', 'industry', 'expertise'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTimelineFilter(f)}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold capitalize transition-all ${
                    timelineFilter === f ? 'text-navy-dark' : 'border-2 text-text-cyan hover:border-accent-cyan/60'
                  }`}
                  style={
                    timelineFilter === f
                      ? { backgroundColor: ACCENT_CYAN, boxShadow: `0 0 28px rgba(0,207,255,0.2)` }
                      : { borderColor: 'rgba(0,207,255,0.25)', backgroundColor: 'transparent' }
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div
            ref={timelineScrollRef}
            className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TIMELINE_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{
                  scale: 1.04,
                  y: -6,
                  boxShadow: `0 12px 40px rgba(0,207,255,0.15)`,
                }}
                className="flex-shrink-0 w-[280px] md:w-[320px] glass-card-surface-alt p-6 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold" style={{ color: SUCCESS_GREEN }}>
                    {item.year}
                  </span>
                  <motion.div
                    animate={shouldReduceMotion ? {} : { rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: 'rgba(0,207,255,0.15)' }}
                  >
                    <Rocket className="w-5 h-5" style={{ color: ACCENT_CYAN }} aria-hidden="true" />
                  </motion.div>
                </div>
                <h4 className="font-semibold text-white mb-1.5">{item.title}</h4>
                <span className="text-xs" style={{ color: TEXT_CYAN }}>{item.tag}</span>
              </motion.div>
            ))}
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
            Ready to Build Your Growth Engine?
            </h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-12" style={{ color: TEXT_CYAN }}>
            From strategy to execution — let&apos;s map your route to predictable revenue.
            </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-navy-dark transition-all duration-300 hover:scale-[1.04]"
              style={{
                backgroundColor: ACCENT_CYAN,
                boxShadow: `0 0 45px rgba(0,207,255,0.2)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 65px rgba(0,207,255,0.2), 0 0 110px rgba(59,130,246,0.12)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 45px rgba(0,207,255,0.2)`
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
                e.currentTarget.style.boxShadow = `0 0 35px rgba(0,207,255,0.2)`
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
