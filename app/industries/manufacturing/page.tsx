'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Cog, Zap, Truck, Server, ChevronRight, Layers, Box, Factory } from 'lucide-react'
import { getExpertiseBySlug } from '@/content/expertise'
import { getCaseStudyBySlug } from '@/content/case-studies'

/* Preserved: Animated dashboard element in hero upper right — do not delete or modify */
const IndustrialDashboard = dynamic(
  () => import('@/src/components/animations/IndustrialDashboard'),
  { ssr: false, loading: () => <div className="w-full aspect-square bg-[#0A0F2D]/80 animate-pulse rounded-2xl flex items-center justify-center"><div className="w-10 h-10 border-2 border-[#FFB96B]/40 border-t-[#FFB96B] rounded-full animate-spin" /></div> }
)

const ORANGE = '#FFB96B'
const TEAL = '#00A8A8'
const GOLD = '#FFD700'
const PURPLE = '#6A4C93'

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: [0, 1, 0.7],
    opacity: [0, 0.7, 0.4],
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const, times: [0, 0.4, 1] as [number, number, number] },
  },
}

const CORE_PILLARS = [
  { title: 'Smart Factory & Field Service (IoT)', detail: 'Connect OT data to commercial outcomes. IoT-driven visibility, predictive maintenance, and field service intelligence.', icon: Cog },
  { title: 'Supply Chain Resilience', detail: 'Multi-tier visibility, demand signals, and disruption readiness. Bridge procurement, logistics, and commercial planning.', icon: Truck },
  { title: 'Fleet & Logistics Efficiency', detail: 'Route optimization, telematics, and asset utilization. Turn fleet data into revenue and cost savings.', icon: Zap },
  { title: 'Legacy Modernization (2-Speed)', detail: 'Stable core systems + agile engagement layer. Run operations reliably while modernizing commercial GTM.', icon: Server },
]

const POWER_METRICS = [
  { value: '$1.2M', label: 'Pipeline in 90 days' },
  { value: '190%', label: 'Faster reporting' },
  { value: '35%', label: 'MQL increase' },
  { value: '2x', label: 'Asset monetization' },
]

const METHODOLOGY_STEPS = [
  { title: 'Agile for Heavy Industry', detail: 'Iterative GTM sprints that respect long cycles. Pilot, learn, scale.', icon: Layers },
  { title: '2-Speed Architecture', detail: 'Legacy stability + modern engagement. OT/IT integration without disruption.', icon: Server },
  { title: 'Digital Twin Marketing', detail: 'Model factory and supply chain data for commercial intelligence and targeting.', icon: Box },
]

const DISCRETE_HIGHLIGHTS = [
  { metric: '200%+', label: 'Account engagement lift', detail: 'Engineering, procurement, operations alignment' },
  { metric: 'Long cycle', label: 'Custom build expertise', detail: 'Aerospace, computers, appliances' },
  { metric: 'Multi-thread', label: 'Buying committee coverage', detail: 'Plant + corporate decision structures' },
]

const REPETITIVE_HIGHLIGHTS = [
  { metric: '$1.2M', label: 'Pipeline in 90 days', detail: 'High-volume vertical ABM' },
  { metric: '35%', label: 'MQL increase', detail: 'Speed-to-market demand gen' },
  { metric: '87%', label: 'Marketing-sourced growth', detail: 'Supply chain resilience focus' },
]

const DISCRETE_EXPERTISE = ['account-based-marketing-abm', 'product-marketing', 'sales-enablement']
const REPETITIVE_EXPERTISE = ['demand-generation', 'marketing-automation', 'revenue-operations']

const CASE_STUDY_SLUGS = [
  'abm-journey-discrete-manufacturing-prgx',
  'amcs-verticalized-abm-launch',
  'prgx-unified-revenue-operating-model',
]

export default function ManufacturingPage() {
  const statsRef = useRef<HTMLDivElement>(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: '-5% 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false
  const [activeSegment, setActiveSegment] = useState<'discrete' | 'repetitive'>('discrete')
  const [statValues, setStatValues] = useState(POWER_METRICS.map((s) => s.value))

  const jitter = useCallback(() => {
    if (shouldReduceMotion) return
    setStatValues((prev) =>
      prev.map((v) => {
        const m = v.match(/^([^0-9.-]*)([0-9.,]+)(.*)$/)
        if (!m) return v
        const [, pre = '', num, suf = ''] = m
        const n = parseFloat(num.replace(/,/g, ''))
        const jittered = n + (Math.random() - 0.5) * 0.35 * Math.max(n, 1)
        const rounded = Math.round(Math.max(jittered, 0))
        return `${pre}${rounded}${suf}`
      })
    )
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!isStatsInView || shouldReduceMotion) return
    const t = setInterval(jitter, 1300 + Math.random() * 900)
    return () => clearInterval(t)
  }, [isStatsInView, jitter, shouldReduceMotion])

  const discreteExpertise = DISCRETE_EXPERTISE.map((s) => getExpertiseBySlug(s)).filter((x): x is NonNullable<typeof x> => Boolean(x))
  const repetitiveExpertise = REPETITIVE_EXPERTISE.map((s) => getExpertiseBySlug(s)).filter((x): x is NonNullable<typeof x> => Boolean(x))
  const caseStudies = CASE_STUDY_SLUGS.map((s) => getCaseStudyBySlug(s)).filter((x): x is NonNullable<typeof x> => Boolean(x))

  return (
    <div className="min-h-screen bg-[#0A0F2D] text-white">
      {/* ========== HERO ========== */}
      <section
        className="relative overflow-hidden pt-8 pb-6 md:pt-12 md:pb-8"
        style={{
          background: 'linear-gradient(135deg, #0A0F2D 0%, #0D1540 30%, #1a1510 50%, #0D1540 70%, #0A0F2D 100%)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
          <svg viewBox="0 0 1200 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="heroGradMfg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={ORANGE} stopOpacity="0.5" />
                <stop offset="50%" stopColor={ORANGE} stopOpacity="0.65" />
                <stop offset="100%" stopColor={ORANGE} stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <g stroke="url(#heroGradMfg)" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <motion.path d="M 0 150 C 300 120, 600 180, 900 150 C 1100 130, 1200 160, 1200 150" variants={pathVariants} initial="initial" animate="animate" />
              <motion.path d="M 0 350 C 400 320, 800 380, 1200 350" variants={pathVariants} initial="initial" animate="animate" transition={{ ...pathVariants.animate.transition, delay: 0.4 }} />
              <motion.path d="M 0 480 C 350 450, 700 500, 1200 470" variants={pathVariants} initial="initial" animate="animate" transition={{ ...pathVariants.animate.transition, delay: 0.8 }} />
            </g>
          </svg>
        </div>
        <div className="container-width relative z-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm mb-3 text-[#F0F0F0]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#FFB96B] transition-colors">Home</Link>
            <span className="text-white/60">/</span>
            <Link href="/industries" className="hover:text-[#FFB96B] transition-colors">Industries</Link>
            <span className="text-white/60">/</span>
            <span className="text-white font-medium">Manufacturing</span>
          </nav>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-4 lg:gap-6 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs mb-2"
                style={{ borderColor: `${ORANGE}60`, backgroundColor: `${ORANGE}20` }}
              >
                <Factory className="w-3.5 h-3.5 text-[#FFB96B]" />
                <span className="text-[#FFB96B] font-medium">Physical-to-Digital Growth Architect</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white"
                style={{ textShadow: `0 0 40px rgba(255,185,107,0.5), 0 0 80px rgba(255,185,107,0.25)` }}
              >
                GTM Strategies for Manufacturing
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="mt-2 text-base md:text-lg text-[#F0F0F0] max-w-2xl font-medium"
              >
                Physical-to-digital revenue architecture for industrial leaders — connecting factory floor data to predictable revenue.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  className="btn-cta-teal-sm"
                >
                  Discuss Your Challenges
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
            {/* Preserved: Animated dashboard element in upper right */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="relative hidden lg:block">
              <div
                className="relative mx-auto w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden border-2"
                style={{ borderColor: `${ORANGE}60`, boxShadow: `0 0 60px ${ORANGE}30` }}
              >
                <IndustrialDashboard />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ========== OVERVIEW + 2-SPEED EXPLAINER ========== */}
      <section className="relative py-4 md:py-6 bg-[#080B1E]">
        <div className="container-width">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-3">Manufacturing Types & 2-Speed Architecture</h2>
          <p className="text-[#E8E8E8] text-sm md:text-base mb-4 max-w-3xl">
            Industrial manufacturing splits into two core models: <strong className="text-white">Discrete</strong> (complex, custom builds, long cycles — aerospace, computers, appliances) and <strong className="text-white">Repetitive</strong> (high-volume, standardized — automotive, consumer electronics). The 2-Speed Architecture bridges legacy OT/IT with modern commercial engagement: stable core systems power operations while agile cloud layers drive demand gen, attribution, and revenue visibility.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {CORE_PILLARS.map((point, i) => {
              const Icon = point.icon
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, boxShadow: `0 8px 32px ${ORANGE}30` }}
                  className="rounded-xl border-2 p-4 bg-[#0A0F2D]/90 transition-all"
                  style={{ borderColor: `${ORANGE}50` }}
                >
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${ORANGE}25`, borderColor: `${ORANGE}60`, borderWidth: 1 }}>
                      <motion.div animate={shouldReduceMotion ? {} : (point.title.includes('Smart Factory') ? { rotate: [0, 360] } : { rotate: [0, 5, -5, 0] })} transition={{ duration: point.title.includes('Smart Factory') ? 10 : 3, repeat: Infinity, ease: point.title.includes('Smart Factory') ? 'linear' : 'easeInOut' }}>
                        <Icon className="w-5 h-5 text-[#FFB96B]" />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm mb-0.5">{point.title}</h3>
                      <p className="text-xs text-[#F0F0F0] leading-snug">{point.detail}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />

      {/* ========== SEGMENTED TABS: DISCRETE vs REPETITIVE ========== */}
      <section className="relative py-4 md:py-6 bg-[#0A0F2D]">
        <div className="container-width">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4">Manufacturing Segments</h2>
          <div className="flex gap-2 mb-6" role="tablist" aria-label="Manufacturing segment">
            <button
              onClick={() => setActiveSegment('discrete')}
              role="tab"
              aria-selected={activeSegment === 'discrete'}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeSegment === 'discrete' ? '' : 'opacity-70 hover:opacity-100'
              }`}
              style={
                activeSegment === 'discrete'
                  ? { backgroundColor: ORANGE, color: '#0A0F2D', boxShadow: `0 0 24px ${ORANGE}50` }
                  : { backgroundColor: 'rgba(255,255,255,0.08)', color: '#E8E8E8', borderWidth: 2, borderColor: `${ORANGE}40` }
              }
            >
              Discrete (Aerospace, Computers, Appliances)
            </button>
            <button
              onClick={() => setActiveSegment('repetitive')}
              role="tab"
              aria-selected={activeSegment === 'repetitive'}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeSegment === 'repetitive' ? '' : 'opacity-70 hover:opacity-100'
              }`}
              style={
                activeSegment === 'repetitive'
                  ? { backgroundColor: ORANGE, color: '#0A0F2D', boxShadow: `0 0 24px ${ORANGE}50` }
                  : { backgroundColor: 'rgba(255,255,255,0.08)', color: '#E8E8E8', borderWidth: 2, borderColor: `${ORANGE}40` }
              }
            >
              Repetitive (Automotive, Consumer Electronics)
            </button>
          </div>

          {/* Discrete segment */}
          {activeSegment === 'discrete' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <p className="text-[#E8E8E8] text-sm max-w-3xl">
                Complex custom builds, long sales cycles, high-value contracts. Engineering, procurement, and plant operations drive multi-year deals. ABM journeys must map to both corporate and plant-level decision structures.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                {DISCRETE_HIGHLIGHTS.map((h, i) => (
                  <motion.div
                    key={h.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.03, boxShadow: `0 8px 32px ${GOLD}25` }}
                    className="rounded-xl border-2 p-4 bg-[#0D1540]/90"
                    style={{ borderColor: `${ORANGE}40` }}
                  >
                    <span className="block text-2xl font-bold text-[#FFD700] mb-1">{h.metric}</span>
                    <span className="block text-sm font-semibold text-white">{h.label}</span>
                    <p className="text-xs text-[#E8E8E8]/90 mt-1">{h.detail}</p>
                  </motion.div>
                ))}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-2">Relevant Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {discreteExpertise.map((e) => (
                    <Link
                      key={e.slug}
                      href={`/expertise/${e.slug}`}
                      className="rounded-lg border-2 px-3 py-2 text-xs font-medium transition-all hover:scale-[1.02] hover:shadow-[0_0_16px_rgba(255,185,107,0.3)]"
                      style={{ borderColor: `${ORANGE}50`, color: '#E8E8E8' }}
                    >
                      {e.title}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Repetitive segment */}
          {activeSegment === 'repetitive' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <p className="text-[#E8E8E8] text-sm max-w-3xl">
                High-volume, standardized production. Speed-to-market and supply chain resilience are critical. Demand gen and marketing automation scale across automotive and consumer electronics verticals.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                {REPETITIVE_HIGHLIGHTS.map((h, i) => (
                  <motion.div
                    key={h.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.03, boxShadow: `0 8px 32px ${GOLD}25` }}
                    className="rounded-xl border-2 p-4 bg-[#0D1540]/90"
                    style={{ borderColor: `${ORANGE}40` }}
                  >
                    <span className="block text-2xl font-bold text-[#FFD700] mb-1">{h.metric}</span>
                    <span className="block text-sm font-semibold text-white">{h.label}</span>
                    <p className="text-xs text-[#E8E8E8]/90 mt-1">{h.detail}</p>
                  </motion.div>
                ))}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm mb-2">Relevant Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {repetitiveExpertise.map((e) => (
                    <Link
                      key={e.slug}
                      href={`/expertise/${e.slug}`}
                      className="rounded-lg border-2 px-3 py-2 text-xs font-medium transition-all hover:scale-[1.02] hover:shadow-[0_0_16px_rgba(255,185,107,0.3)]"
                      style={{ borderColor: `${ORANGE}50`, color: '#E8E8E8' }}
                    >
                      {e.title}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />

      {/* ========== METHODOLOGY ========== */}
      <section className="relative py-4 md:py-6 bg-[#080B1E] overflow-hidden">
        <div className="container-width relative">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <svg viewBox="0 0 500 120" className="w-full h-24 md:h-32" preserveAspectRatio="none">
              <defs>
                <linearGradient id="routeGradMfg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={ORANGE} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={ORANGE} stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 10 30 Q 125 30 250 60 T 490 60"
                fill="none"
                stroke="url(#routeGradMfg)"
                strokeWidth="3"
                strokeLinecap="round"
                variants={pathVariants}
                initial="initial"
                animate="animate"
              />
            </svg>
          </div>
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4 relative z-10">Methodology</h2>
          <div className="grid md:grid-cols-3 gap-3 relative z-10">
            {METHODOLOGY_STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -4, boxShadow: `0 12px 40px ${ORANGE}50` }}
                  className="rounded-xl border-2 p-4 backdrop-blur-sm bg-[#0D1540]/90"
                  style={{ borderColor: `${ORANGE}50` }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${ORANGE}30`, borderColor: `${ORANGE}60`, borderWidth: 1 }}>
                    <Icon className="w-5 h-5 text-[#FFB96B]" />
                  </div>
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
        style={{ background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* ========== POWER METRICS (JITTER) ========== */}
      <section ref={statsRef} className="relative py-4 md:py-6 bg-[#0A0F2D]">
        <div className="container-width">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4">Power Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {POWER_METRICS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 48px ${ORANGE}40, 0 0 24px ${GOLD}25` }}
                className="rounded-xl border-2 p-5 text-center backdrop-blur-sm transition-all bg-[#0D1540]/90"
                style={{ borderColor: `${ORANGE}40` }}
              >
                <motion.span
                  key={s.label}
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 1 }}
                  className="block text-2xl md:text-3xl lg:text-4xl font-bold text-[#FFD700] tabular-nums mb-1 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                >
                  {statValues[i] ?? s.value}
                </motion.span>
                <p className="text-xs text-white font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />

      {/* ========== FEATURED CASE STUDIES ========== */}
      {caseStudies.length > 0 && (
        <>
          <section className="relative py-4 md:py-6 bg-[#080B1E]">
            <div className="container-width">
              <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4">Featured Case Studies</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {caseStudies.map((cs, i) => (
                  <motion.div
                    key={cs.slug}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    whileHover={{ y: -4, boxShadow: `0 8px 32px ${GOLD}30` }}
                  >
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="block rounded-xl border-2 p-4 bg-[#0A0F2D]/90 transition-all duration-300 group"
                      style={{ borderColor: `${ORANGE}50` }}
                    >
                      <div className="text-xs font-semibold text-[#FFB96B] mb-1">{cs.client}</div>
                      <h4 className="font-semibold text-white group-hover:text-[#FFB96B] transition-colors mb-1 text-sm">{cs.title}</h4>
                      <p className="text-xs text-[#F0F0F0] line-clamp-2 mb-2">{cs.description}</p>
                      {cs.metrics && cs.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {cs.metrics.slice(0, 2).map((m) => (
                            <span key={m.label} className="text-[10px] font-bold text-[#FFD700] bg-[#FFD700]/10 px-1.5 py-0.5 rounded">
                              {m.value} {m.change}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#FFB96B]">
                        View Case Study <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <motion.div
            className="h-0.5 w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)` }}
            animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </>
      )}

      {/* ========== CROSS-LINKS ========== */}
      <section className="relative py-4 md:py-6 bg-[#0A0F2D]">
        <div className="container-width">
          <h2 className="font-display text-lg font-bold text-white mb-3">Related</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/case-studies"
              className="rounded-lg border-2 px-4 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(106,76,147,0.4)]"
              style={{ borderColor: `${PURPLE}60`, backgroundColor: `${PURPLE}15` }}
            >
              All Case Studies
            </Link>
            <Link
              href="/expertise"
              className="rounded-lg border-2 px-4 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(106,76,147,0.4)]"
              style={{ borderColor: `${PURPLE}60`, backgroundColor: `${PURPLE}15` }}
            >
              All Expertise
            </Link>
            <Link
              href="/industries"
              className="rounded-lg border-2 px-4 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(106,76,147,0.4)]"
              style={{ borderColor: `${PURPLE}60`, backgroundColor: `${PURPLE}15` }}
            >
              All Industries
            </Link>
          </div>
          <div className="mt-4">
            <Link href="/industries" className="inline-flex items-center gap-2 text-[#F0F0F0] hover:text-[#FFB96B] transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to All Industries
            </Link>
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />

      {/* ========== FOOTER CTA ========== */}
      <section className="relative py-8 md:py-10" style={{ background: 'linear-gradient(180deg, #0D1540 0%, #0A0F2D 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-width text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-3">
            Ready to bridge your OT and IT?
          </h2>
          <p className="text-[#F0F0F0] mb-5">Let&apos;s map your route with 2-Speed Architecture — stable operations + agile commercial engagement.</p>
          <Link
            href="/contact"
            className="btn-cta-teal"
          >
            Let&apos;s map your route
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
