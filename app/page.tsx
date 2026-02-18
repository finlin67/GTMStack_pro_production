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
        <div className="w-8 h-8 border-2 border-[#00A8A8]/40 border-t-[#00A8A8] rounded-full animate-spin" />
      </div>
    ),
  }
)

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: [0, 1, 1],
    opacity: [0, 0.18, 0.08],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      times: [0, 0.5, 1] as [number, number, number],
    },
  },
}

function HeroPulseBackground() {
  const reduced = useReducedMotion() ?? false
  if (reduced) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
      <svg viewBox="0 0 1200 800" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A8A8" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <g stroke="url(#tealGrad)" strokeWidth="0.9" fill="none" strokeLinecap="round">
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

function jitterStatValue(value: string, amount = 0.025): string {
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
    <div className="min-h-screen bg-[#0A0F2D] text-white">
      {/* ========== HERO ========== */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-b from-[#0A0F2D] via-[#1E2A5E]/80 to-[#0A0F2D] pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20"
      >
        <HeroPulseBackground />
        <div className="container-width relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white"
              >
                Turn Your Go-To-Market Into a Revenue Machine
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-5 text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl"
              >
                Strategic B2B GTM consulting that bridges strategy & execution. We build scalable
                systems — unified ABM + RevOps + intent data — that deliver predictable, measurable
                growth. $45M pipelines. 340% engagement lifts. 2.5x velocity. Real results, not theory.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 flex flex-wrap gap-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-[#00A8A8] hover:bg-[#00C4C4] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,168,168,0.4)]"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[#0A0F2D] bg-[#FFD700] hover:bg-[#FFE44D] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,215,0,0.35)]"
                >
                  View Proven Projects
                </Link>
              </motion.div>
            </div>

            {/* Preserved: Animated dashboard in upper right — do not delete or modify */}
            <div className="relative hidden lg:block h-[320px] lg:h-[380px] xl:h-[420px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0A0F2D]/60 shadow-[0_0_60px_-15px_rgba(0,168,168,0.3)]">
                <HeroDashboardVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS PROOF GRID ========== */}
      <section
        ref={statsRef}
        className="relative py-10 md:py-12 bg-gradient-to-b from-[#0A0F2D] via-[#1E2A5E]/50 to-[#0A0F2D]"
      >
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isStatsInView ? { opacity: 1 } : {}}
            className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5"
          >
            {STATS.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255,215,0,0.15)' }}
                  className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 md:p-6 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-[#00A8A8]" />
                  </div>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFD700] tabular-nums">
                    {statValues[i] ?? stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-slate-400 font-medium mt-1">{stat.label}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== VALUE CARDS ========== */}
      <section className="relative py-10 md:py-12 bg-[#0A0F2D]">
        <div className="container-width">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {VALUE_CARDS.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group rounded-xl border border-white/10 bg-gradient-to-br from-[#1E2A5E]/60 to-[#0A0F2D] p-5 md:p-6 transition-all duration-300 hover:border-[#6A4C93]/40 hover:shadow-[0_8px_32px_rgba(106,76,147,0.15)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00A8A8]/20 flex items-center justify-center mb-3 group-hover:bg-[#00A8A8]/30 transition-colors">
                    <Icon className="w-5 h-5 text-[#00A8A8]" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">{card.copy}</p>
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#00A8A8] hover:text-[#6A4C93] transition-colors"
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
      <section className="relative py-10 md:py-12 bg-gradient-to-b from-[#0A0F2D] via-[#1E2A5E]/40 to-[#0A0F2D] overflow-hidden">
        <div className="container-width">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
              Proven Track Record
            </h2>
            <div className="flex gap-2">
              {(['all', 'industry', 'expertise'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTimelineFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    timelineFilter === f
                      ? 'bg-[#6A4C93] text-white'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 border border-white/10'
                  }`}
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
                whileHover={{ scale: 1.03, y: -2 }}
                className="flex-shrink-0 w-[260px] md:w-[300px] rounded-xl border border-white/10 bg-[#1E2A5E]/50 p-5 backdrop-blur-sm hover:border-[#6A4C93]/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#FFD700] font-bold">{item.year}</span>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 rounded-full bg-[#00A8A8]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Rocket className="w-4 h-4 text-[#00A8A8]" />
                  </motion.div>
                </div>
                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                <span className="text-xs text-slate-400">{item.tag}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="relative py-14 md:py-16 bg-gradient-to-b from-[#1E2A5E] via-[#0A0F2D] to-[#0A0F2D]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-width text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Build Your Growth Engine?
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            From strategy to execution — let&apos;s map your route to predictable revenue.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-[#00A8A8] hover:bg-[#00C4C4] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,168,168,0.45)]"
            >
              Start a Conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[#0A0F2D] bg-[#FFD700] hover:bg-[#FFE44D] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,215,0,0.35)]"
            >
              View Case Studies
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
