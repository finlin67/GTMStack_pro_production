'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Target, Zap, Users, Settings, Cloud, ChevronRight, Compass, Layers, LineChart, Sparkles } from 'lucide-react'
import { getExpertiseBySlug } from '@/content/expertise'
import { getCaseStudyBySlug } from '@/content/case-studies'

/* Preserved: Animated dashboard element in hero upper right — do not delete or modify */
const DemandGenFlow = dynamic(
  () => import('@/src/components/animations/DemandGenFlow'),
  { ssr: false, loading: () => <div className="w-full aspect-square bg-[#0A0F2D]/80 animate-pulse rounded-2xl flex items-center justify-center"><div className="w-10 h-10 border-2 border-[#36C0CF]/40 border-t-[#36C0CF] rounded-full animate-spin" /></div> }
)

const BLUE = '#146EF5'
const CYAN = '#36C0CF'
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
  { title: 'Verticalized ABM', detail: 'Industry-specific account-based plays that reach buying committees. Tiered targeting, intent signals, and multichannel orchestration for enterprise velocity.', icon: Target },
  { title: 'Demand Generation', detail: 'Multi-channel pipeline engines with attribution and scoring. From PLG to sales-led—integrated demand plays that compound.', icon: Zap },
  { title: 'Sales Enablement & Alignment', detail: 'Unified messaging, playbooks, and pipeline intelligence. Cross-functional tiger teams aligned on ICP, SLAs, and revenue outcomes.', icon: Users },
  { title: 'MarTech Stack Optimization', detail: 'Right-sized stacks, governed integrations, and data flows that enable velocity. Salesforce, Marketo, Demandbase, 6sense—built for scale.', icon: Settings },
]

const STAT_CARDS = [
  { value: '87%', label: 'YoY pipeline growth' },
  { value: '180%', label: 'MQL-to-SQL lift' },
  { value: '25%', label: 'NRR increase' },
  { value: '65%', label: 'SQL lift' },
  { value: '2x', label: 'GTM efficiency' },
]

const METHODOLOGY_STEPS = [
  { title: 'Diagnose & align', detail: 'Map current state, ICP, and alignment gaps. Define revenue outcomes with Sales Leaders and PE stakeholders.', icon: Compass },
  { title: 'Design the model', detail: 'Architect unified revenue operating model—ABM, demand gen, attribution, and sales enablement integrated.', icon: Layers },
  { title: 'Build & instrument', detail: 'Deploy MarTech stack, data flows, and orchestration. Wire dashboards and governance.', icon: LineChart },
  { title: 'Optimize & scale', detail: 'Run sprints, tune levers, lock proof points. Scale spend and team execution.', icon: Sparkles },
]

const EXPERTISE_SLUGS = [
  'account-based-marketing-abm',
  'revenue-operations',
  'demand-generation',
  'ai-in-marketing',
]

const CASE_STUDY_SLUGS = [
  'prgx-unified-revenue-operating-model',
  'redhat-global-abm-activation',
  'salesforce-demandgen-analytics-platform',
]

export default function B2BSaaSPage() {
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
        return `${pre}${Math.round(Math.max(jittered, 0))}${suf}`
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
          background: 'linear-gradient(135deg, #0A0F2D 0%, #0D1540 30%, #0E1748 50%, #0D1540 70%, #0A0F2D 100%)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
          <svg viewBox="0 0 1200 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="heroGradSaaS" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={BLUE} stopOpacity="0.6" />
                <stop offset="50%" stopColor={CYAN} stopOpacity="0.7" />
                <stop offset="100%" stopColor={BLUE} stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <g stroke="url(#heroGradSaaS)" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <motion.path d="M 0 150 C 300 120, 600 180, 900 150 C 1100 130, 1200 160, 1200 150" variants={pathVariants} initial="initial" animate="animate" />
              <motion.path d="M 0 350 C 400 320, 800 380, 1200 350" variants={pathVariants} initial="initial" animate="animate" transition={{ ...pathVariants.animate.transition, delay: 0.4 }} />
              <motion.path d="M 0 480 C 350 450, 700 500, 1200 470" variants={pathVariants} initial="initial" animate="animate" transition={{ ...pathVariants.animate.transition, delay: 0.8 }} />
            </g>
          </svg>
        </div>
        <div className="container-width relative z-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm mb-3 text-[#F0F0F0]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#36C0CF] transition-colors">Home</Link>
            <span className="text-white/60">/</span>
            <Link href="/industries" className="hover:text-[#36C0CF] transition-colors">Industries</Link>
            <span className="text-white/60">/</span>
            <span className="text-white font-medium">B2B SaaS & Enterprise Software</span>
          </nav>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-4 lg:gap-6 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs mb-2"
                style={{ borderColor: `${CYAN}60`, backgroundColor: `${CYAN}20` }}
              >
                <Cloud className="w-3.5 h-3.5 text-[#36C0CF]" />
                <span className="text-[#36C0CF] font-medium">The Revenue Architect</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white"
                style={{ textShadow: `0 0 40px rgba(54,192,207,0.5), 0 0 80px rgba(20,110,245,0.3)` }}
              >
                GTM Strategies for B2B SaaS & Enterprise Software
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="mt-2 text-base md:text-lg text-[#F0F0F0] max-w-2xl font-medium"
              >
                Revenue architecture that turns chaotic marketing into predictable pipeline velocity — from random acts to unified revenue engines.
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
                style={{ borderColor: `${CYAN}60`, boxShadow: `0 0 60px ${CYAN}30` }}
              >
                <DemandGenFlow />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ========== CORE PILLARS (4) ========== */}
      <section className="relative py-4 md:py-6 bg-[#080B1E]">
        <div className="container-width">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4">Unified Revenue Operating Model</h2>
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
                  whileHover={{ scale: 1.02, boxShadow: `0 8px 32px ${CYAN}30` }}
                  className="rounded-xl border-2 p-4 bg-[#0A0F2D]/90 transition-all"
                  style={{ borderColor: `${CYAN}50` }}
                >
                  <div className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${CYAN}30`, borderColor: `${CYAN}60`, borderWidth: 1 }}>
                      <motion.div animate={shouldReduceMotion ? {} : { rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                        <Icon className="w-5 h-5 text-[#36C0CF]" />
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
        style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />

      {/* ========== METHODOLOGY: 4 PHASES ========== */}
      <section className="relative py-4 md:py-6 bg-[#0A0F2D] overflow-hidden">
        <div className="container-width relative">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <svg viewBox="0 0 500 120" className="w-full h-24 md:h-32" preserveAspectRatio="none">
              <defs>
                <linearGradient id="routeGradSaaS" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={BLUE} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={CYAN} stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 10 30 Q 125 30 250 60 T 490 60"
                fill="none"
                stroke="url(#routeGradSaaS)"
                strokeWidth="3"
                strokeLinecap="round"
                variants={pathVariants}
                initial="initial"
                animate="animate"
              />
            </svg>
          </div>
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4 relative z-10">The 4-Phase Methodology</h2>
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
                  whileHover={{ scale: 1.05, y: -4, boxShadow: `0 12px 40px ${CYAN}50` }}
                  className="rounded-xl border-2 p-4 backdrop-blur-sm bg-[#0D1540]/90"
                  style={{ borderColor: `${CYAN}50` }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${CYAN}30`, borderColor: `${CYAN}60`, borderWidth: 1 }}>
                    <Icon className="w-5 h-5 text-[#36C0CF]" />
                  </div>
                  <span className="text-xs font-bold text-[#36C0CF]">Phase {i + 1}</span>
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
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />

      {/* ========== HIGHLIGHT STATS (GOLD, JITTER) ========== */}
      <section ref={statsRef} className="relative py-4 md:py-6 bg-[#080B1E]">
        <div className="container-width">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4">Proven Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {STAT_CARDS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 48px ${CYAN}40, 0 0 24px ${GOLD}25` }}
                className="rounded-xl border-2 p-5 text-center backdrop-blur-sm transition-all bg-[#0A0F2D]/90"
                style={{ borderColor: `${CYAN}40` }}
              >
                <motion.span
                  key={s.label}
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 1 }}
                  className="block text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFD700] tabular-nums mb-1 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]"
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
        style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }}
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
                whileHover={{ y: -4, boxShadow: `0 8px 32px ${CYAN}40` }}
              >
                <Link
                  href={`/expertise/${e.slug}`}
                  className="block rounded-xl border-2 p-4 bg-[#0D1540]/90 transition-all duration-300 group"
                  style={{ borderColor: `${CYAN}50` }}
                >
                  <h4 className="font-semibold text-white group-hover:text-[#36C0CF] transition-colors mb-0.5 text-sm">{e.title}</h4>
                  <p className="text-xs text-[#F0F0F0] line-clamp-2">{e.description ?? e.positioning}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#36C0CF]">
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
        style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }}
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
                      style={{ borderColor: `${CYAN}50` }}
                    >
                      <div className="text-xs font-semibold text-[#36C0CF] mb-1">{cs.client}</div>
                      <h4 className="font-semibold text-white group-hover:text-[#36C0CF] transition-colors mb-1 text-sm">{cs.title}</h4>
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
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#36C0CF]">
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
            style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }}
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
            <Link href="/industries" className="inline-flex items-center gap-2 text-[#F0F0F0] hover:text-[#36C0CF] transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to All Industries
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
      <section className="relative py-8 md:py-10" style={{ background: 'linear-gradient(180deg, #0D1540 0%, #0A0F2D 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-width text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-3">
            Ready to architect predictable revenue?
          </h2>
          <p className="text-[#F0F0F0] mb-5">Let&apos;s map your route from chaos to unified revenue engines.</p>
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
