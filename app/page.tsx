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
  Layers,
  Cpu,
  Rocket,
  TrendingUp,
  Workflow,
  DollarSign,
  ChevronRight,
} from 'lucide-react'
import { getHeroVisualForPath } from '@/lib/heroVisualRegistry'

/* New palette constants */
const NAVY_DEEP = '#0A0F2D'
const NAVY_DARK = '#020617'
const ACCENT_CYAN = '#00D4FF'
const ACCENT_BLUE = '#3B82F6'
const GRADIENT_PINK = '#C026D3'
const SUCCESS_GREEN = '#22C55E'
const TEXT_CYAN = '#67E8F9'

/* Preserved: Animated dashboard element in hero upper right — do not delete or modify */
const HeroDashboardVisual = dynamic(
  () =>
    import('@/lib/heroVisualRegistry').then((mod) => {
      const entry = mod.getHeroVisualForPath('/')
      if (entry?.mediaType === 'animation' && entry.component) {
        const C = entry.component
        return { default: () => <C /> }
      }
      return import('@/components/ui/HeroVisual').then((m) => ({
        default: () => <m.HeroVisual variant="signatureConstellation" />,
      }))
    }),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 rounded-2xl bg-[#0A0F2D]/80 animate-pulse flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00D4FF]/40 border-t-[#00D4FF] rounded-full animate-spin" />
      </div>
    ),
  }
)

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: [0, 1, 1],
    opacity: [0, 0.5, 0.15],
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
    <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
      <svg viewBox="0 0 1200 800" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="cyanBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ACCENT_CYAN} stopOpacity="0.6" />
            <stop offset="50%" stopColor={ACCENT_BLUE} stopOpacity="0.5" />
            <stop offset="100%" stopColor={ACCENT_CYAN} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g stroke={`url(#cyanBlueGrad)`} strokeWidth="1.2" fill="none" strokeLinecap="round">
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

export default function HomePage() {
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
    <div className="min-h-screen text-white" style={{ background: `linear-gradient(180deg, ${NAVY_DEEP} 0%, ${NAVY_DARK} 50%, ${NAVY_DEEP} 100%)` }}>
      {/* ========== HERO ========== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20"
        style={{
          background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, #0d1338 30%, ${NAVY_DARK} 60%, ${NAVY_DEEP} 100%)`,
        }}
      >
        <HeroFlowBackground />
        <div className="container-width relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.08] tracking-tight"
                style={{
                  background: `linear-gradient(135deg, ${GRADIENT_PINK} 0%, ${ACCENT_BLUE} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                }}
              >
                Turn Your Go-To-Market Into a Revenue Machine
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-5 text-lg md:text-xl leading-relaxed max-w-2xl"
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
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[#020617] transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: ACCENT_CYAN,
                    boxShadow: `0 0 30px rgba(0,212,255,0.35)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 50px rgba(0,212,255,0.5), 0 0 80px rgba(59,130,246,0.2)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px rgba(0,212,255,0.35)`
                  }}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] border-2"
                  style={{
                    borderColor: `${ACCENT_CYAN}60`,
                    color: TEXT_CYAN,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = ACCENT_CYAN
                    e.currentTarget.style.boxShadow = `0 0 30px rgba(0,212,255,0.2)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${ACCENT_CYAN}60`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  View Proven Projects
                </Link>
              </motion.div>
            </div>

            {/* Preserved: Animated dashboard in upper right — do not delete or modify */}
            <div className="relative hidden lg:block h-[320px] lg:h-[380px] xl:h-[420px]">
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden border-2 backdrop-blur-sm"
                style={{
                  borderColor: 'rgba(0,212,255,0.2)',
                  backgroundColor: 'rgba(10,15,45,0.6)',
                  boxShadow: `0 0 60px -15px rgba(0,212,255,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
                }}
              >
                <HeroDashboardVisual />
              </div>
            </div>
          </div>
        </div>

        {/* Glowing divider */}
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
        className="relative py-12 md:py-16"
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `0 0 40px rgba(0,212,255,0.2), 0 0 80px rgba(0,212,255,0.1)`,
                  }}
                  className="relative rounded-xl border-2 p-5 md:p-6 backdrop-blur-sm transition-all duration-300"
                  style={{
                    borderColor: 'rgba(0,212,255,0.15)',
                    backgroundColor: 'rgba(10,15,45,0.5)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5" style={{ color: ACCENT_CYAN }} />
                  </div>
                  <p
                    className="text-3xl md:text-4xl lg:text-5xl font-bold tabular-nums"
                    style={{
                      color: SUCCESS_GREEN,
                      textShadow: `0 0 20px rgba(34,197,94,0.3)`,
                    }}
                  >
                    {statValues[i] ?? stat.value}
                  </p>
                  <p className="text-xs md:text-sm font-medium mt-1" style={{ color: TEXT_CYAN }}>
                    {stat.label}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== VALUE CARDS ========== */}
      <section
        className="relative py-12 md:py-16"
        style={{ background: NAVY_DARK }}
      >
        <div className="container-width">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-10"
            style={{
              background: `linear-gradient(135deg, ${GRADIENT_PINK} 0%, ${ACCENT_BLUE} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            How We Drive Growth
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {VALUE_CARDS.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    boxShadow: `0 12px 40px rgba(0,212,255,0.15), 0 0 60px rgba(0,212,255,0.08)`,
                  }}
                  className="group rounded-xl border-2 p-5 md:p-6 transition-all duration-300"
                  style={{
                    borderColor: 'rgba(0,212,255,0.15)',
                    backgroundColor: 'rgba(10,15,45,0.6)',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors"
                    style={{ backgroundColor: 'rgba(0,212,255,0.15)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: ACCENT_CYAN }} />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{card.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: TEXT_CYAN }}>
                    {card.copy}
                  </p>
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold transition-colors group-hover:gap-2"
                    style={{ color: ACCENT_CYAN }}
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== INTERACTIVE TIMELINE TEASER ========== */}
      <section
        className="relative py-12 md:py-16 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${NAVY_DEEP} 0%, rgba(2,6,23,0.95) 50%, ${NAVY_DEEP} 100%)`,
        }}
      >
        <div className="container-width">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
              Proven Track Record
            </h2>
            <div className="flex gap-2">
              {(['all', 'industry', 'expertise'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTimelineFilter(f)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
                    timelineFilter === f
                      ? 'text-[#020617]'
                      : 'border-2 text-[#67E8F9] hover:border-[#00D4FF]/50'
                  }`}
                  style={
                    timelineFilter === f
                      ? { backgroundColor: ACCENT_CYAN, boxShadow: `0 0 24px rgba(0,212,255,0.4)` }
                      : { borderColor: 'rgba(0,212,255,0.2)', backgroundColor: 'transparent' }
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div
            ref={timelineScrollRef}
            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TIMELINE_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  scale: 1.03,
                  y: -4,
                  boxShadow: `0 8px 32px rgba(0,212,255,0.12)`,
                }}
                className="flex-shrink-0 w-[260px] md:w-[300px] rounded-xl border-2 p-5 transition-all duration-300 group"
                style={{
                  borderColor: 'rgba(0,212,255,0.15)',
                  backgroundColor: 'rgba(10,15,45,0.5)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold" style={{ color: SUCCESS_GREEN }}>
                    {item.year}
                  </span>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: 'rgba(0,212,255,0.2)' }}
                  >
                    <Rocket className="w-4 h-4" style={{ color: ACCENT_CYAN }} />
                  </motion.div>
                </div>
                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                <span className="text-xs" style={{ color: TEXT_CYAN }}>{item.tag}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section
        className="relative py-16 md:py-24"
        style={{
          background: `linear-gradient(180deg, ${NAVY_DEEP} 0%, ${NAVY_DARK} 50%, ${NAVY_DEEP} 100%)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-width text-center max-w-3xl mx-auto"
        >
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5"
            style={{
              background: `linear-gradient(135deg, ${GRADIENT_PINK} 0%, ${ACCENT_BLUE} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Ready to Build Your Growth Engine?
          </h2>
          <p className="text-lg md:text-xl mb-10" style={{ color: TEXT_CYAN }}>
            From strategy to execution — let&apos;s map your route to predictable revenue.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-[#020617] transition-all duration-300 hover:scale-[1.03]"
              style={{
                backgroundColor: ACCENT_CYAN,
                boxShadow: `0 0 40px rgba(0,212,255,0.4)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 60px rgba(0,212,255,0.5), 0 0 100px rgba(59,130,246,0.2)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 40px rgba(0,212,255,0.4)`
              }}
            >
              Start a Conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-semibold text-white border-2 transition-all duration-300 hover:scale-[1.03]"
              style={{
                borderColor: `${ACCENT_CYAN}80`,
                color: TEXT_CYAN,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ACCENT_CYAN
                e.currentTarget.style.boxShadow = `0 0 30px rgba(0,212,255,0.25)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${ACCENT_CYAN}80`
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
