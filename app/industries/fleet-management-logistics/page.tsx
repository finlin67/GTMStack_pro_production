'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Route, Radio, Shield, Leaf, Truck, ChevronRight, Compass, Layers, Activity, Gauge } from 'lucide-react'
import { getExpertiseBySlug } from '@/content/expertise'
import { getCaseStudyBySlug } from '@/content/case-studies'

/* Preserved: Animated dashboard element in hero upper right — do not delete or modify */
const EocLogisticsDashboard = dynamic(
  () => import('@/src/components/animations/EocLogisticsDashboard'),
  { ssr: false, loading: () => <div className="w-full aspect-square bg-[#0A0F2D]/80 animate-pulse rounded-2xl flex items-center justify-center"><div className="w-10 h-10 border-2 border-[#2E865F]/40 border-t-[#2E865F] rounded-full animate-spin" /></div> }
)

const FOREST_GREEN = '#2E865F'
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

const OVERVIEW_PILLARS = [
  { title: 'Intelligent Route Optimization', detail: 'Data-driven routing that reduces empty miles and fuel waste. Turn telematics and IoT signals into actionable route decisions for VP of Fleet Operations.', icon: Route },
  { title: 'Telematics & IoT Data', detail: 'Connect vehicle, driver, and cargo data into a unified intelligence layer. Real-time visibility for Director of Logistics and operations teams.', icon: Radio },
  { title: 'Supply Chain Resilience', detail: 'Predictive capacity, demand signals, and multi-tier visibility. Built for complex logistics networks and disruption-ready operations.', icon: Shield },
  { title: 'Sustainability & Safety', detail: 'Emissions tracking, safety metrics, and ESG reporting. Align fleet performance with Sustainability Officers and regulatory requirements.', icon: Leaf },
]

const STAT_CARDS = [
  { value: '$1.2M', label: 'Pipeline in 90 days' },
  { value: '35%', label: 'MQL increase' },
  { value: '87%', label: 'Marketing-sourced pipeline growth' },
  { value: '15%', label: 'Reduction in empty miles' },
]

const METHODOLOGY_STEPS = [
  { title: 'Assess fleet & data gaps', detail: 'Map current telematics, TMS, and logistics systems. Align with VP of Fleet Operations and Director of Logistics.', icon: Compass },
  { title: 'Build digital twin foundation', detail: 'Design data model for supply chain digital twin. Integrate IoT, routing, and sustainability data.', icon: Layers },
  { title: 'Deploy connected intelligence', detail: 'Implement route optimization, visibility dashboards, and orchestration workflows. Measure empty miles and engagement.', icon: Activity },
  { title: 'Scale & sustain', detail: 'Expand across fleets and regions. Governance, safety, and sustainability reporting for Sustainability Officers.', icon: Gauge },
]

const EXPERTISE_SLUGS = [
  'revenue-operations',
  'account-based-marketing-abm',
  'marketing-automation',
  'omnichannel-marketing',
]

const CASE_STUDY_SLUGS = [
  'amcs-verticalized-abm-launch',
  'end-to-end-abm-framework-amcs',
  'prgx-unified-revenue-operating-model',
]

export default function FleetManagementLogisticsPage() {
  const statsRef = useRef<HTMLDivElement>(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: '-5% 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false

  const [statValues, setStatValues] = useState(STAT_CARDS.map((s) => s.value))

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

  const expertiseItems = EXPERTISE_SLUGS.map((s) => getExpertiseBySlug(s)).filter((x): x is NonNullable<typeof x> => Boolean(x))
  const caseStudies = CASE_STUDY_SLUGS.map((s) => getCaseStudyBySlug(s)).filter((x): x is NonNullable<typeof x> => Boolean(x))

  return (
    <div className="min-h-screen bg-[#0A0F2D] text-white">
      {/* ========== HERO ========== */}
      <section
        className="relative overflow-hidden pt-8 pb-6 md:pt-12 md:pb-8"
        style={{
          background: 'linear-gradient(135deg, #0A0F2D 0%, #0D1540 30%, #0a1a12 50%, #0D1540 70%, #0A0F2D 100%)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
          <svg viewBox="0 0 1200 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="heroGradFleet" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={FOREST_GREEN} stopOpacity="0.5" />
                <stop offset="50%" stopColor={FOREST_GREEN} stopOpacity="0.65" />
                <stop offset="100%" stopColor={FOREST_GREEN} stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <g stroke="url(#heroGradFleet)" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <motion.path d="M 0 150 C 300 120, 600 180, 900 150 C 1100 130, 1200 160, 1200 150" variants={pathVariants} initial="initial" animate="animate" />
              <motion.path d="M 0 350 C 400 320, 800 380, 1200 350" variants={pathVariants} initial="initial" animate="animate" transition={{ ...pathVariants.animate.transition, delay: 0.4 }} />
              <motion.path d="M 0 480 C 350 450, 700 500, 1200 470" variants={pathVariants} initial="initial" animate="animate" transition={{ ...pathVariants.animate.transition, delay: 0.8 }} />
            </g>
          </svg>
        </div>
        <div className="container-width relative z-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm mb-3 text-[#F0F0F0]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#2E865F] transition-colors">Home</Link>
            <span className="text-white/60">/</span>
            <Link href="/industries" className="hover:text-[#2E865F] transition-colors">Industries</Link>
            <span className="text-white/60">/</span>
            <span className="text-white font-medium">Fleet Management & Logistics</span>
          </nav>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-4 lg:gap-6 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs mb-2"
                style={{ borderColor: `${FOREST_GREEN}60`, backgroundColor: `${FOREST_GREEN}20` }}
              >
                <Truck className="w-3.5 h-3.5 text-[#2E865F]" />
                <span className="text-[#2E865F] font-medium">Connected Fleet Expert</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white"
                style={{ textShadow: `0 0 40px rgba(46,134,95,0.5), 0 0 80px rgba(46,134,95,0.25)` }}
              >
                GTM Strategies for Fleet Management & Logistics
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="mt-2 text-base md:text-lg text-[#F0F0F0] max-w-2xl font-medium"
              >
                Connected fleet intelligence and operational velocity for logistics and supply chain leaders — turning data into route optimization and revenue.
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
                style={{ borderColor: `${FOREST_GREEN}60`, boxShadow: `0 0 60px ${FOREST_GREEN}30` }}
              >
                <EocLogisticsDashboard />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${FOREST_GREEN}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ========== CORE PILLARS (4) ========== */}
      <section className="relative py-4 md:py-6 bg-[#080B1E]">
        <div className="container-width">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4">The Connected Fleet Framework</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {OVERVIEW_PILLARS.map((point, i) => {
              const Icon = point.icon
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, boxShadow: `0 8px 32px ${FOREST_GREEN}30` }}
                  className="rounded-xl border-2 p-4 bg-[#0A0F2D]/90 transition-all"
                  style={{ borderColor: `${FOREST_GREEN}50` }}
                >
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${FOREST_GREEN}25`, borderColor: `${FOREST_GREEN}60`, borderWidth: 1 }}>
                      <motion.div animate={shouldReduceMotion ? {} : { rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                        <Icon className="w-5 h-5 text-[#2E865F]" />
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
        style={{ background: `linear-gradient(90deg, transparent, ${FOREST_GREEN}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />

      {/* ========== METHODOLOGY: DIGITAL TWIN ========== */}
      <section className="relative py-4 md:py-6 bg-[#0A0F2D] overflow-hidden">
        <div className="container-width relative">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <svg viewBox="0 0 500 120" className="w-full h-24 md:h-32" preserveAspectRatio="none">
              <defs>
                <linearGradient id="routeGradFleet" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={FOREST_GREEN} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={FOREST_GREEN} stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 10 30 Q 125 30 250 60 T 490 60"
                fill="none"
                stroke="url(#routeGradFleet)"
                strokeWidth="3"
                strokeLinecap="round"
                variants={pathVariants}
                initial="initial"
                animate="animate"
              />
            </svg>
          </div>
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4 relative z-10">Methodology: Digital Twin of the Supply Chain</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
            {METHODOLOGY_STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -4, boxShadow: `0 12px 40px ${FOREST_GREEN}50` }}
                  className="rounded-xl border-2 p-4 backdrop-blur-sm bg-[#0D1540]/90"
                  style={{ borderColor: `${FOREST_GREEN}50` }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${FOREST_GREEN}30`, borderColor: `${FOREST_GREEN}60`, borderWidth: 1 }}>
                    <Icon className="w-5 h-5 text-[#2E865F]" />
                  </div>
                  <span className="text-xs font-bold text-[#2E865F]">Step {i + 1}</span>
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
        style={{ background: `linear-gradient(90deg, transparent, ${FOREST_GREEN}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />

      {/* ========== HIGHLIGHT STATS (GOLD, JITTER) ========== */}
      <section ref={statsRef} className="relative py-4 md:py-6 bg-[#080B1E]">
        <div className="container-width">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4">Proven Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STAT_CARDS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 48px ${FOREST_GREEN}40, 0 0 24px ${GOLD}25` }}
                className="rounded-xl border-2 p-5 text-center backdrop-blur-sm transition-all bg-[#0A0F2D]/90"
                style={{ borderColor: `${FOREST_GREEN}40` }}
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
        style={{ background: `linear-gradient(90deg, transparent, ${FOREST_GREEN}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* ========== RELEVANT EXPERTISE ========== */}
      <section className="relative py-4 md:py-6 bg-[#0A0F2D]">
        <div className="container-width">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4">Relevant Expertise</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {expertiseItems.map((e, i) => (
              <motion.div
                key={e.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                whileHover={{ y: -4, boxShadow: `0 8px 32px ${FOREST_GREEN}40` }}
              >
                <Link
                  href={`/expertise/${e.slug}`}
                  className="block rounded-xl border-2 p-4 bg-[#0D1540]/90 transition-all duration-300 group"
                  style={{ borderColor: `${FOREST_GREEN}50` }}
                >
                  <h4 className="font-semibold text-white group-hover:text-[#2E865F] transition-colors mb-0.5 text-sm">{e.title}</h4>
                  <p className="text-xs text-[#F0F0F0] line-clamp-2">{e.description ?? e.positioning}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#2E865F]">
                    Explore <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${FOREST_GREEN}, transparent)` }}
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
                      style={{ borderColor: `${FOREST_GREEN}50` }}
                    >
                      <div className="text-xs font-semibold text-[#2E865F] mb-1">{cs.client}</div>
                      <h4 className="font-semibold text-white group-hover:text-[#2E865F] transition-colors mb-1 text-sm">{cs.title}</h4>
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
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#2E865F]">
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
            style={{ background: `linear-gradient(90deg, transparent, ${FOREST_GREEN}, transparent)` }}
            animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </>
      )}

      {/* ========== CROSS-LINKS (MUTED PURPLE) ========== */}
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
            <Link href="/industries" className="inline-flex items-center gap-2 text-[#F0F0F0] hover:text-[#2E865F] transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to All Industries
            </Link>
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${FOREST_GREEN}, transparent)` }}
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
            Ready to optimize your fleet operations?
          </h2>
          <p className="text-[#F0F0F0] mb-5">Let&apos;s map your route with Connected Fleet intelligence — data into route optimization and revenue.</p>
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
