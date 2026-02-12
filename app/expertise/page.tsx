'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  FileText,
  TrendingUp,
  Target,
  Settings,
  ChevronRight,
} from 'lucide-react'

/* Preserved: Animated dashboard element in hero upper right — do not delete or modify */
const HeroAbstract = dynamic(
  () =>
    import('@/components/visuals/HeroAbstract').then((m) => ({
      default: () => <m.HeroAbstract variant="topLevel" />,
    })),
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
    <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
      <svg viewBox="0 0 1200 800" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="expertiseTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A8A8" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <g stroke="url(#expertiseTealGrad)" strokeWidth="0.8" fill="none" strokeLinecap="round">
          <motion.path
            d="M 0 220 C 240 190, 480 230, 720 210 C 960 190, 1120 230, 1200 210"
            variants={pathVariants}
            initial="initial"
            animate="animate"
          />
          <motion.path
            d="M 0 450 C 280 420, 560 470, 840 450 C 1000 430, 1160 460, 1200 450"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{ ...pathVariants.animate.transition, delay: 0.7 }}
          />
          <motion.path
            d="M 0 680 C 260 650, 620 700, 900 680 C 1080 660, 1170 690, 1200 680"
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

const PILLAR_CARDS = [
  {
    id: 'content-engagement',
    title: 'Content & Engagement',
    valueProp:
      'Authoritative content + omnichannel plays that fuel demand and trust. 500% SEO growth • 571% lead surges.',
    metric: '500% SEO',
    href: '/expertise/content-engagement',
    icon: FileText,
    accent: '#FFDB58',
  },
  {
    id: 'demand-growth',
    title: 'Demand & Growth',
    valueProp:
      'Multi-channel engines that fill pipelines predictably. 126% pipeline increases • 6x boosts via intent.',
    metric: '126% pipeline',
    href: '/expertise/demand-growth',
    icon: TrendingUp,
    accent: '#1FCB97',
  },
  {
    id: 'strategy-insights',
    title: 'Strategy & Insights',
    valueProp:
      'ABM, CX, lifecycle mastery that wins enterprise accounts. 87% YoY growth • $45M pipelines generated.',
    metric: '87% YoY',
    href: '/expertise/strategy-insights',
    icon: Target,
    accent: '#3A3776',
  },
  {
    id: 'systems-operations',
    title: 'Systems & Operations',
    valueProp:
      'MarTech, RevOps, AI automation that scales everything. 2x efficiency • 80% recovered pipeline.',
    metric: '2x efficiency',
    href: '/expertise/systems-operations',
    icon: Settings,
    accent: '#36C0CF',
  },
]

const CROSS_LINK_ITEMS = [
  { title: 'Manufacturing', metric: '208% revenue uplift', href: '/industries/manufacturing' },
  { title: 'Financial Services', metric: '126% pipeline growth', href: '/industries/financial-services' },
  { title: 'B2B SaaS', metric: '87% YoY pipeline', href: '/industries/b2b-saas' },
  { title: 'FinTech', metric: '$1.2M in 90 days', href: '/industries/fintech' },
  { title: 'HealthTech', metric: 'HIPAA-ready GTM', href: '/industries/healthtech' },
  { title: 'Enterprise Software', metric: '4x pipeline', href: '/projects' },
]

export default function ExpertisePage() {
  const pillarsRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLDivElement>(null)
  const isPillarsInView = useInView(pillarsRef, { once: true, margin: '-10% 0px' })
  const isValueInView = useInView(valueRef, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false

  const [pillarMetrics, setPillarMetrics] = useState(PILLAR_CARDS.map((p) => p.metric))
  const [crossLinkMetrics, setCrossLinkMetrics] = useState(
    CROSS_LINK_ITEMS.map((c) => c.metric)
  )

  const scrollToPillars = () => {
    pillarsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const jitterNum = useCallback((base: number, suffix: string): string => {
    const jittered = base + (Math.random() - 0.5) * 0.03 * base
    const rounded = base >= 10 ? Math.round(jittered) : jittered.toFixed(1)
    return `${rounded}${suffix}`
  }, [])

  useEffect(() => {
    if (!isPillarsInView || shouldReduceMotion) return
    const t = setInterval(() => {
      setPillarMetrics([
        jitterNum(500, '% SEO'),
        jitterNum(126, '% pipeline'),
        jitterNum(87, '% YoY'),
        jitterNum(2, 'x efficiency'),
      ])
    }, 2800 + Math.random() * 2000)
    return () => clearInterval(t)
  }, [isPillarsInView, jitterNum, shouldReduceMotion])

  useEffect(() => {
    if (!isValueInView || shouldReduceMotion) return
    const t = setInterval(() => {
      setCrossLinkMetrics((prev) =>
        CROSS_LINK_ITEMS.map((c, i) => {
          const m = c.metric
          if (m.includes('%')) {
            const n = parseInt(m, 10)
            if (!isNaN(n)) return `${Math.round(n + (Math.random() - 0.5) * 3)}% ${m.split('%')[1]?.trim() || ''}`
          }
          return prev[i] ?? m
        })
      )
    }, 3200 + Math.random() * 2000)
    return () => clearInterval(t)
  }, [isValueInView, shouldReduceMotion])

  return (
    <div className="min-h-screen bg-[#0A0F2D] text-white">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0F2D] via-[#1E2A5E]/90 to-[#0A0F2D] pt-14 pb-10 md:pt-20 md:pb-12 lg:pt-24 lg:pb-14">
        <HeroPulseBackground />
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.5 }
              : { opacity: [0.4, 0.7, 0.5, 0.7] }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.3 }
              : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }
          className="absolute inset-0 bg-gradient-to-r from-[#00A8A8]/5 via-transparent to-[#FFD700]/5 pointer-events-none z-0"
        />
        <div className="container-width relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white"
              >
                GTM Expertise That Drives Real Revenue
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl"
              >
                Four interconnected pillars of B2B mastery — Content & Engagement, Demand & Growth,
                Strategy & Insights, Systems & Operations. We bridge strategy and execution to build
                scalable revenue engines. $45M pipelines. 340% engagement lifts. 2.5x velocity.
                Proven across SaaS, manufacturing, financial services, and more.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 flex flex-wrap gap-4"
              >
                <button
                  onClick={scrollToPillars}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-[#00A8A8] hover:bg-[#00C4C4] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,168,168,0.4)]"
                >
                  Explore All Services
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[#0A0F2D] bg-[#FFD700] hover:bg-[#FFE44D] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,215,0,0.35)]"
                >
                  View Proven Projects
                </Link>
              </motion.div>
            </div>

            {/* Preserved: Animated dashboard in upper right — do not delete or modify */}
            <div className="relative hidden lg:block h-[300px] lg:h-[340px] xl:h-[380px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0A0F2D]/60 shadow-[0_0_60px_-15px_rgba(0,168,168,0.25)]">
                <HeroAbstract />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOUR-PILLAR GRID ========== */}
      <section
        ref={pillarsRef}
        id="pillars"
        className="relative py-10 md:py-12 bg-[#0A0F2D]"
      >
        <div className="container-width">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {PILLAR_CARDS.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isPillarsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    boxShadow: `0 12px 40px ${pillar.accent}30`,
                  }}
                  className="group rounded-xl border border-white/10 bg-gradient-to-br from-[#1E2A5E]/70 to-[#0A0F2D] p-5 md:p-6 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-3 transition-colors"
                    style={{
                      backgroundColor: `${pillar.accent}25`,
                      color: pillar.accent,
                    }}
                  >
                    <motion.div
                      animate={shouldReduceMotion ? {} : { rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-white mb-2">{pillar.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">{pillar.valueProp}</p>
                  <motion.span
                    key={pillarMetrics[i]}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    className="inline-block text-[#FFD700] font-bold text-sm mb-4 tabular-nums"
                  >
                    {pillarMetrics[i] ?? pillar.metric}
                  </motion.span>
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#00A8A8] hover:text-[#6A4C93] transition-colors group/link"
                  >
                    Dive In
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== CROSS-LINK SECTION ========== */}
      <section
        ref={valueRef}
        className="relative py-10 md:py-12 bg-gradient-to-b from-[#0A0F2D] via-[#1E2A5E]/40 to-[#0A0F2D] overflow-hidden"
      >
        <div className="container-width">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
            See Expertise in Action
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CROSS_LINK_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={isValueInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2, borderColor: 'rgba(106, 76, 147, 0.4)' }}
              >
                <Link
                  href={item.href}
                  className="block rounded-xl border border-[#6A4C93]/30 bg-[#1E2A5E]/40 p-4 md:p-5 backdrop-blur-sm hover:bg-[#1E2A5E]/60 transition-all duration-300 group"
                >
                  <h4 className="font-semibold text-white mb-1 group-hover:text-[#00A8A8] transition-colors">
                    {item.title}
                  </h4>
                  <motion.span
                    key={crossLinkMetrics[i]}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    className="text-[#FFD700] text-sm font-bold tabular-nums"
                  >
                    {crossLinkMetrics[i] ?? item.metric}
                  </motion.span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm text-[#00A8A8] font-medium">
                    Explore
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BOTTOM CTA ========== */}
      <section className="relative py-14 md:py-16 bg-gradient-to-b from-[#1E2A5E] via-[#0A0F2D] to-[#0A0F2D]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-width text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Build Your Revenue Engine?
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            From fragmented demand to predictable scale — let&apos;s map your path.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-cta-teal"
            >
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[#0A0F2D] bg-[#FFD700] hover:bg-[#FFE44D] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,215,0,0.35)]"
            >
              Book a Strategy Call
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
