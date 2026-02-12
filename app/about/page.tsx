'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Briefcase,
  Building2,
  Globe,
  Target,
  Zap,
  BarChart3,
  Layers,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
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
          <linearGradient id="aboutTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A8A8" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <g stroke="url(#aboutTealGrad)" strokeWidth="0.8" fill="none" strokeLinecap="round">
          <motion.path
            d="M 0 200 C 250 170, 500 210, 750 190 C 1000 170, 1150 210, 1200 190"
            variants={pathVariants}
            initial="initial"
            animate="animate"
          />
          <motion.path
            d="M 0 450 C 300 420, 550 470, 850 450 C 1050 430, 1180 460, 1200 450"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{ ...pathVariants.animate.transition, delay: 0.8 }}
          />
          <motion.path
            d="M 0 650 C 280 620, 600 680, 900 650 C 1100 630, 1190 660, 1200 650"
            variants={pathVariants}
            initial="initial"
            animate="animate"
            transition={{ ...pathVariants.animate.transition, delay: 1.6 }}
          />
        </g>
      </svg>
    </div>
  )
}

const MILESTONES = [
  {
    years: '1998–2005',
    title: 'Wall Street – Enterprise LMS',
    impact: 'Built enterprise LMS platforms for financial services. Early data-driven foundations in B2B learning & enablement.',
    metric: 'Enterprise scale',
    icon: Building2,
    industry: ['financial'],
    expertise: ['strategy'],
  },
  {
    years: '2006–2012',
    title: 'Silicon Valley – Salesforce',
    impact: 'Scaled ABM & field marketing for retail and healthcare. Drove integrated demand strategies across global verticals.',
    metric: 'ABM pioneer',
    icon: Target,
    industry: ['saas', 'retail', 'healthcare'],
    expertise: ['abm', 'demand'],
  },
  {
    years: '2013–2018',
    title: 'PRGX – Unified RevOps',
    impact: 'Unified ABM + RevOps engine from the ground up. Closed attribution gaps and automated routing.',
    metric: '87% YoY pipeline',
    icon: Zap,
    industry: ['saas'],
    expertise: ['abm', 'revops'],
  },
  {
    years: '2016–2019',
    title: 'Red Hat / Enterprise Tech',
    impact: 'Verticalized demand programs and event strategies for enterprise software. Scaled field and partner motions.',
    metric: '4x pipeline',
    icon: BarChart3,
    industry: ['enterprise'],
    expertise: ['demand', 'events'],
  },
  {
    years: '2019–2023',
    title: 'Global Consulting',
    impact: '$45M pipelines, 208% revenue uplift for clients. Strategic advisory across SaaS, manufacturing, financial services.',
    metric: '208% uplift',
    icon: Globe,
    industry: ['saas', 'manufacturing', 'financial'],
    expertise: ['strategy', 'abm'],
  },
  {
    years: '2024–Present',
    title: 'GTMStack – Growth Architect',
    impact: 'Helping B2B leaders build their own growth engines. Founder-led GTM systems: strategy, data, automation as one stack.',
    metric: 'Founder',
    icon: Briefcase,
    industry: ['all'],
    expertise: ['all'],
  },
]

const VALUE_HIGHLIGHTS = [
  {
    icon: Layers,
    title: 'Unified Revenue Systems',
    benefit: 'ABM + RevOps + intent = predictable scale',
    metric: '$45M+',
  },
  {
    icon: BarChart3,
    title: 'Enterprise Results',
    benefit: '$45M pipelines • 340% engagement • 2.5x velocity',
    metric: '2.5x',
  },
  {
    icon: Target,
    title: 'Cross-Functional Mastery',
    benefit: 'Sales, Marketing, CS, Finance alignment',
    metric: '4 teams',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    benefit: 'Wall Street to Silicon Valley to worldwide clients',
    metric: '20+ yrs',
  },
]

function jitterNum(base: number, amount = 0.03): number {
  return base + (Math.random() - 0.5) * 2 * amount * Math.max(base, 1)
}

export default function AboutPage() {
  const [industryFilter, setIndustryFilter] = useState<string>('all')
  const [expertiseFilter, setExpertiseFilter] = useState<string>('all')
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false)
  const [showExpertiseDropdown, setShowExpertiseDropdown] = useState(false)
  const [valueMetrics, setValueMetrics] = useState(['$45M+', '2.5x', '4 teams', '20+ yrs'])
  const [timelineMetrics, setTimelineMetrics] = useState<Record<string, string>>({})
  const timelineRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLDivElement>(null)
  const isValueInView = useInView(valueRef, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false

  const updateValueJitter = useCallback(() => {
    if (shouldReduceMotion) return
    setValueMetrics([
      `$${Math.round(jitterNum(45))}M+`,
      `${jitterNum(2.5, 0.02).toFixed(1)}x`,
      `${Math.round(jitterNum(4, 0.05))} teams`,
      `${Math.round(jitterNum(20, 0.03))}+ yrs`,
    ])
  }, [shouldReduceMotion])

  const updateTimelineJitter = useCallback(() => {
    if (shouldReduceMotion) return
    setTimelineMetrics((prev) => {
      const next = { ...prev }
      MILESTONES.forEach((m) => {
        const pct = m.metric.match(/(\d+)%/)
        const mult = m.metric.match(/([\d.]+)x/)
        if (pct) {
          const n = parseInt(pct[1], 10)
          next[m.title] = m.metric.replace(/\d+%/, `${Math.round(n + (Math.random() - 0.5) * 3)}%`)
        } else if (mult) {
          const n = parseFloat(mult[1])
          next[m.title] = (n + (Math.random() - 0.5) * 0.15).toFixed(1) + 'x pipeline'
        }
      })
      return next
    })
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!isValueInView || shouldReduceMotion) return
    const t = setInterval(updateValueJitter, 2500 + Math.random() * 2000)
    return () => clearInterval(t)
  }, [isValueInView, updateValueJitter, shouldReduceMotion])

  useEffect(() => {
    if (!isValueInView || shouldReduceMotion) return
    const t = setInterval(updateTimelineJitter, 3000 + Math.random() * 2000)
    return () => clearInterval(t)
  }, [isValueInView, updateTimelineJitter, shouldReduceMotion])

  const filteredMilestones = MILESTONES.filter((m) => {
    if (industryFilter !== 'all' && !m.industry.includes(industryFilter)) return false
    if (expertiseFilter !== 'all' && !m.expertise.includes(expertiseFilter)) return false
    return true
  })

  const scrollTimeline = (dir: 'left' | 'right') => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
    }
  }

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
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">
            <div className="flex flex-col md:flex-row lg:flex-col gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 flex justify-center lg:justify-start"
              >
                <div
                  className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#00A8A8]/40 shadow-[0_0_40px_rgba(0,168,168,0.25),inset_0_0_30px_rgba(255,215,0,0.1)]"
                  style={{
                    boxShadow: shouldReduceMotion
                      ? undefined
                      : '0 0 50px rgba(0,168,168,0.3), 0 0 80px rgba(255,215,0,0.15)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1E2A5E] to-[#0A0F2D] flex items-center justify-center">
                    <User className="w-16 h-16 md:w-20 md:h-20 text-[#00A8A8]/60" aria-hidden />
                  </div>
                </div>
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight text-white"
                >
                  Michael – Global GTM Strategist & Revenue Architect
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-base md:text-lg text-slate-200 leading-relaxed"
                >
                  20+ years building scalable B2B growth engines. From Wall Street LMS platforms to
                  Silicon Valley RevOps mastery. I&apos;ve driven $45M+ pipelines, 340% engagement
                  lifts, and 2.5x velocity for enterprise leaders in SaaS, manufacturing, financial
                  services, and more. I bridge strategy and execution — turning fragmented demand
                  into predictable revenue.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-5 flex flex-wrap gap-4"
                >
                  <Link
                    href="/expertise"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-[#00A8A8] hover:bg-[#00C4C4] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,168,168,0.4)]"
                  >
                    View My Expertise
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#0A0F2D] bg-[#FFD700] hover:bg-[#FFE44D] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,215,0,0.35)]"
                  >
                    See Proven Projects
                  </Link>
                </motion.div>
              </div>
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

      {/* ========== CAREER TIMELINE ========== */}
      <section className="relative py-10 md:py-12 bg-[#0A0F2D] overflow-hidden">
        <div className="container-width">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
              Career Journey
            </h2>
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                  onBlur={() => setTimeout(() => setShowIndustryDropdown(false), 150)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-[#6A4C93]/20 hover:border-[#6A4C93]/40 hover:text-white transition-all text-sm font-medium"
                  aria-haspopup="listbox"
                  aria-expanded={showIndustryDropdown}
                >
                  Filter by Industry
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showIndustryDropdown && (
                  <div className="absolute top-full left-0 mt-1 py-2 rounded-lg bg-[#1E2A5E] border border-white/10 shadow-xl z-20 min-w-[180px]">
                    {['all', 'saas', 'enterprise', 'financial', 'retail', 'healthcare', 'manufacturing'].map(
                      (opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setIndustryFilter(opt)
                            setShowIndustryDropdown(false)
                          }}
                          className={`block w-full px-4 py-2 text-left text-sm capitalize hover:bg-[#6A4C93]/30 ${
                            industryFilter === opt ? 'text-[#FFD700]' : 'text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowExpertiseDropdown(!showExpertiseDropdown)}
                  onBlur={() => setTimeout(() => setShowExpertiseDropdown(false), 150)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-[#6A4C93]/20 hover:border-[#6A4C93]/40 hover:text-white transition-all text-sm font-medium"
                  aria-haspopup="listbox"
                  aria-expanded={showExpertiseDropdown}
                >
                  Filter by Expertise
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showExpertiseDropdown && (
                  <div className="absolute top-full left-0 mt-1 py-2 rounded-lg bg-[#1E2A5E] border border-white/10 shadow-xl z-20 min-w-[180px]">
                    {['all', 'strategy', 'abm', 'revops', 'demand', 'events'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setExpertiseFilter(opt)
                          setShowExpertiseDropdown(false)
                        }}
                        className={`block w-full px-4 py-2 text-left text-sm capitalize hover:bg-[#6A4C93]/30 ${
                          expertiseFilter === opt ? 'text-[#FFD700]' : 'text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="hidden sm:flex gap-1">
                <button
                  onClick={() => scrollTimeline('left')}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-[#6A4C93]/20 text-slate-400 hover:text-white transition-all"
                  aria-label="Scroll timeline left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollTimeline('right')}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-[#6A4C93]/20 text-slate-400 hover:text-white transition-all"
                  aria-label="Scroll timeline right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div
            ref={timelineRef}
            className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="region"
            aria-label="Career timeline"
          >
            {filteredMilestones.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="flex-shrink-0 w-[280px] md:w-[300px] rounded-xl border border-white/10 bg-gradient-to-br from-[#1E2A5E]/70 to-[#0A0F2D] p-5 backdrop-blur-sm hover:border-[#6A4C93]/40 hover:shadow-[0_8px_32px_rgba(106,76,147,0.2)] transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[#FFD700] font-bold text-sm">{m.years}</span>
                    <motion.div
                      animate={shouldReduceMotion ? {} : { rotate: 360 }}
                      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                      className="w-9 h-9 rounded-full bg-[#00A8A8]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon className="w-4 h-4 text-[#00A8A8]" />
                    </motion.div>
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{m.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-3">{m.impact}</p>
                  <motion.span
                    key={timelineMetrics[m.title] ?? m.metric}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    className="inline-block text-xs font-semibold text-[#FFD700] tabular-nums"
                  >
                    {timelineMetrics[m.title] ?? m.metric}
                  </motion.span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== VALUE HIGHLIGHTS ========== */}
      <section ref={valueRef} className="relative py-10 md:py-12 bg-gradient-to-b from-[#0A0F2D] via-[#1E2A5E]/40 to-[#0A0F2D]">
        <div className="container-width">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {VALUE_HIGHLIGHTS.map((card, i) => {
              const Icon = card.icon
              const displayMetric = valueMetrics[i] ?? card.metric
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4, boxShadow: '0 0 40px rgba(255,215,0,0.12)' }}
                  className="group rounded-xl border border-white/10 bg-[#1E2A5E]/50 p-5 md:p-6 backdrop-blur-sm hover:border-[#FFD700]/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00A8A8]/20 flex items-center justify-center mb-3 group-hover:bg-[#00A8A8]/30 transition-colors">
                    <Icon className="w-5 h-5 text-[#00A8A8]" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-3">{card.benefit}</p>
                  <motion.span
                    key={displayMetric}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    className="text-[#FFD700] font-bold text-lg tabular-nums"
                  >
                    {displayMetric}
                  </motion.span>
                </motion.div>
              )
            })}
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
            Ready to Build or Accelerate Your GTM Engine?
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            Whether you&apos;re hiring a Senior Director of Marketing or need strategic consulting to
            hit next-level growth — let&apos;s talk.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-cta-teal"
            >
              Start a Conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex gap-3">
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[#0A0F2D] bg-[#FFD700] hover:bg-[#FFE44D] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,215,0,0.35)]"
              >
                Download Resume
              </Link>
              <a
                href="https://www.linkedin.com/in/gtmstack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                View LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
