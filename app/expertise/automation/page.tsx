'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  Workflow,
  Zap,
  Layers,
  Shield,
  TrendingUp,
  ChevronRight,
} from 'lucide-react'
import { getExpertiseByPillar } from '@/content/expertise'

const ACCENT = '#36C0CF'

const pathVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: [0, 1, 1],
    opacity: [0, 0.2, 0.08],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      times: [0, 0.5, 1] as [number, number, number],
    },
  },
}

function RouteMapPaths() {
  const reduced = useReducedMotion() ?? false
  if (reduced) return null
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="automationPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.6" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 40 60 Q 100 60 160 80 T 280 100 T 360 120"
        fill="none"
        stroke="url(#automationPathGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        variants={pathVariants}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M 40 150 Q 120 150 200 160 T 360 170"
        fill="none"
        stroke="url(#automationPathGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={pathVariants}
        initial="initial"
        animate="animate"
        transition={{ ...pathVariants.animate.transition, delay: 0.6 }}
      />
      <motion.path
        d="M 40 240 Q 100 240 180 220 T 360 200"
        fill="none"
        stroke="url(#automationPathGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        variants={pathVariants}
        initial="initial"
        animate="animate"
        transition={{ ...pathVariants.animate.transition, delay: 1.2 }}
      />
    </svg>
  )
}

const CHALLENGES = [
  'Manual processes eating team capacity',
  'Data silos across MAP, CRM, and analytics',
  'Inconsistent nurturing and lifecycle sequences',
  'Low velocity from broken lead routing',
]

const ROUTE_STEPS = [
  {
    num: 1,
    title: 'Platform selection & architecture',
    desc: 'Evaluate and align MAP to your stack, data model, and scaling needs.',
    icon: Layers,
  },
  {
    num: 2,
    title: 'Journey & workflow design',
    desc: 'Design multi-touch sequences, scoring models, and trigger-based flows.',
    icon: Workflow,
  },
  {
    num: 3,
    title: 'Build & testing',
    desc: 'Implement, validate, and optimize automation with rigorous QA.',
    icon: Zap,
  },
  {
    num: 4,
    title: 'Governance & compliance',
    desc: 'Data governance, consent management, and audit-ready processes.',
    icon: Shield,
  },
  {
    num: 5,
    title: 'Continuous optimization & scaling',
    desc: 'Monitor performance, iterate on journeys, and scale to new segments.',
    icon: TrendingUp,
  },
]

const EXECUTION_STACK = ['Marketo', 'Pardot', 'HubSpot', 'ActiveCampaign', 'Salesforce Pardot', 'Eloqua']

const RESULTS = [
  { value: '2x', label: 'GTM efficiency', suffix: 'x' },
  { value: '80%', label: 'Recovered pipeline', suffix: '%' },
  { value: '33%', label: 'Faster sales cycle', suffix: '%' },
]

export default function MarketingAutomationPage() {
  const challengesRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const isChallengesInView = useInView(challengesRef, { once: true, margin: '-10% 0px' })
  const isResultsInView = useInView(resultsRef, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false

  const [resultValues, setResultValues] = useState(RESULTS.map((r) => r.value))
  const relatedItems = getExpertiseByPillar('systems-operations')
    .filter((i) => i.slug !== 'marketing-automation')
    .slice(0, 4)

  const jitter = useCallback(() => {
    if (shouldReduceMotion) return
    setResultValues([
      `${(2 + (Math.random() - 0.5) * 0.15).toFixed(1)}x`,
      `${Math.round(80 + (Math.random() - 0.5) * 4)}%`,
      `${Math.round(33 + (Math.random() - 0.5) * 3)}%`,
    ])
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!isResultsInView || shouldReduceMotion) return
    const t = setInterval(jitter, 2500 + Math.random() * 2000)
    return () => clearInterval(t)
  }, [isResultsInView, jitter, shouldReduceMotion])

  return (
    <div className="min-h-screen bg-[#0A0F2D] text-white">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0F2D] via-[#1E2A5E]/90 to-[#0A0F2D] pt-14 pb-10 md:pt-20 md:pb-12">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-50">
          <svg viewBox="0 0 1200 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="automationHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={ACCENT} stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00A8A8" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <g stroke="url(#automationHeroGrad)" strokeWidth="0.8" fill="none" strokeLinecap="round">
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
                transition={{ ...pathVariants.animate.transition, delay: 0.8 }}
              />
            </g>
          </svg>
        </div>
        <div className="container-width relative z-10">
          <nav className="flex items-center gap-2 text-sm mb-6 text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#36C0CF] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/expertise" className="hover:text-[#36C0CF] transition-colors">
              Expertise
            </Link>
            <span>/</span>
            <span className="text-white">Marketing Automation</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2"
              style={{ borderColor: `${ACCENT}60`, backgroundColor: `${ACCENT}20` }}
            >
              <Workflow className="w-7 h-7" style={{ color: ACCENT }} />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-white"
              >
                Marketing Automation Expertise
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-lg text-slate-200 max-w-2xl"
              >
                Intelligent workflows that scale personalization & efficiency
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(54,192,207,0.4)]"
                  style={{ backgroundColor: '#00A8A8' }}
                >
                  Book a Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CHALLENGES ========== */}
      <section ref={challengesRef} className="relative py-10 md:py-12 bg-[#0A0F2D]">
        <div className="container-width">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
            Common Challenges
          </h2>
          <motion.ul
            initial="hidden"
            animate={isChallengesInView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid sm:grid-cols-2 gap-3"
          >
            {CHALLENGES.map((item, i) => (
              <motion.li
                key={item}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: { opacity: 1, x: 0 },
                }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-[#36C0CF]/40 bg-[#1E2A5E]/40 border-white/10"
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: ACCENT }}
                />
                <span className="text-slate-200">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ========== ROUTE MAP ========== */}
      <section className="relative py-10 md:py-12 bg-gradient-to-b from-[#0A0F2D] via-[#1E2A5E]/50 to-[#0A0F2D] overflow-hidden">
        <div className="container-width relative">
          <RouteMapPaths />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8 relative z-10">
            Route Map
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {ROUTE_STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="rounded-xl border p-5 backdrop-blur-sm transition-all hover:border-[#36C0CF]/50 hover:shadow-[0_8px_32px_rgba(54,192,207,0.15)] bg-[#1E2A5E]/50 border-white/10"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${ACCENT}25`, color: ACCENT }}
                  >
                    <motion.div
                      animate={shouldReduceMotion ? {} : { rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <span className="text-[#36C0CF] font-bold text-sm">Step {step.num}</span>
                  <h3 className="font-bold text-white mt-1 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== EXECUTION STACK ========== */}
      <section className="relative py-10 md:py-12 bg-[#0A0F2D]">
        <div className="container-width">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
            Execution Stack
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {EXECUTION_STACK.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-lg border text-slate-200 text-sm font-medium transition-colors hover:border-[#36C0CF]/50 hover:text-white"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== RESULTS ========== */}
      <section ref={resultsRef} className="relative py-10 md:py-12 bg-gradient-to-b from-[#0A0F2D] via-[#1E2A5E]/40 to-[#0A0F2D]">
        <div className="container-width">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8">
            Results
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {RESULTS.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 24 }}
                animate={isResultsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 0 50px rgba(255,215,0,0.2)',
                  borderColor: 'rgba(255,215,0,0.4)',
                }}
                className="rounded-2xl border-2 p-8 text-center backdrop-blur-sm transition-all bg-[#1E2A5E]/60 border-[#FFD700]/30"
              >
                <motion.span
                  key={resultValues[i]}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  className="block text-4xl md:text-5xl font-bold text-[#FFD700] tabular-nums mb-2"
                >
                  {resultValues[i] ?? r.value}
                </motion.span>
                <p className="text-slate-300 font-medium">{r.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== RELATED ========== */}
      <section className="relative py-10 md:py-12 bg-[#0A0F2D]">
        <div className="container-width">
          <h2 className="font-display text-2xl font-bold text-white mb-6">
            Related Expertise
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedItems.map((item, i) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, borderColor: `${ACCENT}50` }}
              >
                <Link
                  href={`/expertise/${item.slug}`}
                  className="block rounded-xl border p-5 bg-[#1E2A5E]/40 border-white/10 hover:bg-[#1E2A5E]/60 transition-all duration-300 group"
                >
                  <h4 className="font-semibold text-white group-hover:text-[#36C0CF] transition-colors mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-400 line-clamp-2">{item.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#36C0CF]">
                    Explore
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/expertise"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-[#36C0CF] hover:underline focus-visible:underline transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Expertise
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FOOTER CTA ========== */}
      <section className="relative py-14 md:py-16 bg-gradient-to-b from-[#1E2A5E] via-[#0A0F2D] to-[#0A0F2D]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-width text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to automate revenue?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(0,168,168,0.45)]"
            style={{ backgroundColor: '#00A8A8' }}
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
