'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ArrowRight, ArrowLeft, Compass, Sparkles, Layers, LineChart, ChevronRight, Search, MessageSquare, Rocket, BookOpen, RefreshCw } from 'lucide-react'
import { ExpertiseItem, CaseStudyItem, IndustryItem } from '@/lib/types'

/* Preserved: Animated dashboard element in hero upper right — do not delete or modify */
const ExpertiseHeroVisual = dynamic(
  () => import('@/components/expertise/ExpertiseHeroVisual.client').then((m) => m.ExpertiseHeroVisual),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 rounded-2xl bg-navy-deep/80 animate-pulse flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400/40 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    ),
  }
)

const CYAN = '#36C0CF'
const BLUE = '#146EF5'
const TEAL = '#00A8A8'
const GOLD = '#FFDB58'

/** Demand & Growth pillar theme — stylepack/expertise/growth/theme.tokens.json */
const DG_THEME = {
  background: '#102040',
  backgroundAlt: '#203050',
  foreground: '#FFFFFF',
  muted: '#20a0a0',
  accentPrimary: '#205060',
  accentSecondary: '#404060',
  gradientStart: '#20a0a0',
  gradientEnd: '#404060',
  success: '#22C55E',
  highlight: '#FACC15',
  ctaGradient: false,
}

/** Stitch reference — only for 6 Content & Engagement pages (exact tokens) */
const STITCH_THEME = {
  background: '#0f172a',
  backgroundAlt: '#1e40af',
  foreground: '#FFFFFF',
  muted: '#3b82f6',
  accentPrimary: 'var(--orange-grad)',
  accentSecondary: '#7dd3fc',
  gradientStart: '#1e3a8a',
  gradientEnd: '#7dd3fc',
  success: '#22C55E',
  highlight: '#fbbf24',
  ctaGradient: true,
}

const STITCH_CSS = `
.stitch-content-engagement {
  --primary: #3b82f6;
  --background-dark: #0f172a;
  --blue-grad: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #7dd3fc 100%);
  --orange-grad: linear-gradient(135deg, #f97316 0%, #fbbf24 100%);
  --header-footer-grad: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
}
.stitch-content-engagement { background: var(--background-dark); min-height: 100vh; }
.stitch-content-engagement section[class*="from-slate"],
.stitch-content-engagement section[class*="from-brand"] { background: var(--background-dark) !important; }
.stitch-content-engagement .stitch-accent-text { background: var(--blue-grad); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
`

/** PMM.AI reference — only for 6 Demand & Growth pages (exact tokens) */
const PMM_AI_THEME = {
  background: '#0b1720',
  backgroundAlt: '#0f2632',
  foreground: '#FFFFFF',
  muted: '#2ea7ff',
  accentPrimary: 'var(--orange-grad)',
  accentSecondary: '#7dd3fc',
  gradientStart: '#1e3a8a',
  gradientEnd: '#7dd3fc',
  success: '#22C55E',
  highlight: '#fbbf24',
  ctaGradient: true,
}

const PMM_AI_CSS = `
.theme-demand-growth {
  --primary: #2ea7ff;
  --background-dark: #0b1720;
  --panel-bg: #0f2632;
  --muted-text: rgba(255,255,255,0.70);
  --blue-grad: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #7dd3fc 100%);
  --orange-grad: linear-gradient(135deg, #f97316 0%, #fbbf24 100%);
  --header-footer-grad: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
}
.theme-demand-growth { background: var(--background-dark); min-height: 100vh; }
/* Force PMM.AI canvas on all dark sections */
.theme-demand-growth section:not([class*="bg-white"]):not([class*="bg-slate-50"]) { background: var(--background-dark) !important; }
.theme-demand-growth section[class*="from-slate"],
.theme-demand-growth section[class*="from-brand"],
.theme-demand-growth section[class*="bg-gradient"] { background: var(--background-dark) !important; }
/* Panels/cards use panel-bg */
.theme-demand-growth .dark-card,
.theme-demand-growth [class*="border-brand"] { background-color: var(--panel-bg) !important; border-color: rgba(255,255,255,0.1) !important; }
/* Blue gradient for emphasized text only */
.theme-demand-growth .pmm-accent-text { background: var(--blue-grad); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
/* Orange gradient for primary CTAs only */
.theme-demand-growth .pmm-cta-primary { background: var(--orange-grad) !important; color: #fff; }
/* Muted text */
.theme-demand-growth .pmm-muted { color: var(--muted-text); }
`

/** Strategy & Insights reference — only for 6 pages (pillar + 5 detail slugs); deep teal-navy + cyan/blue */
const SI_THEME = {
  background: '#071C22',
  backgroundAlt: '#0B2A33',
  foreground: '#E6F0F3',
  muted: '#7FA1AA',
  accentPrimary: '#2EAADC',
  accentSecondary: '#22D3EE',
  highlight: '#22D3EE',
}

const STRATEGY_INSIGHTS_CSS = `
.theme-strategy-insights {
  --bg-primary: #071C22;
  --bg-secondary: #0B2A33;
  --bg-card: #132F38;
  --brand-primary: #2EAADC;
  --brand-primary-hover: #38BDF8;
  --brand-cyan: #22D3EE;
  --text-primary: #E6F0F3;
  --text-secondary: #A9C0C8;
  --text-muted: #7FA1AA;
  --border-subtle: #16424D;
}
.theme-strategy-insights { background: var(--bg-primary); min-height: 100vh; }
.theme-strategy-insights section:not([class*="bg-white"]):not([class*="bg-slate-50"]) { background: var(--bg-secondary) !important; }
.theme-strategy-insights section[class*="from-slate"],
.theme-strategy-insights section[class*="from-brand"],
.theme-strategy-insights section[class*="bg-gradient"] { background: var(--bg-secondary) !important; }
.theme-strategy-insights .dark-card,
.theme-strategy-insights [class*="border-brand"] { background-color: var(--bg-card) !important; border-color: var(--border-subtle) !important; }
.theme-strategy-insights .si-cta-primary { background: var(--brand-primary) !important; color: #fff; }
.theme-strategy-insights .si-cta-primary:hover { background: var(--brand-primary-hover) !important; }
.theme-strategy-insights .si-accent-text { color: var(--brand-cyan); }
.theme-strategy-insights .si-muted { color: var(--text-muted); }
`

/** Systems & Operations reference — only for 6 pages (pillar + 5 detail slugs); deep navy + cyan + orange/amber */
const SO_THEME = {
  background: '#020617',
  backgroundAlt: '#071229',
  foreground: '#F8FAFC',
  muted: '#22D3EE',
  accentPrimary: '#F97316',
  accentSecondary: '#22D3EE',
  highlight: '#FACC15',
}

const SYSTEMS_OPERATIONS_CSS = `
.theme-systems-operations {
  --bg-primary: #020617;
  --bg-secondary: #071229;
  --bg-card: #0B1633;
  --brand-cyan: #22D3EE;
  --brand-cyan-hover: #06B6D4;
  --brand-orange: #F97316;
  --brand-amber: #FACC15;
  --text-primary: #F8FAFC;
  --text-muted: #94A3B8;
  --text-dim: #64748B;
  --border-subtle: #1E293B;
}
.theme-systems-operations { background: var(--bg-primary); min-height: 100vh; }
.theme-systems-operations section:not([class*="bg-white"]):not([class*="bg-slate-50"]) { background: var(--bg-secondary) !important; }
.theme-systems-operations section[class*="from-slate"],
.theme-systems-operations section[class*="from-brand"],
.theme-systems-operations section[class*="bg-gradient"] { background: var(--bg-secondary) !important; }
.theme-systems-operations .dark-card,
.theme-systems-operations [class*="border-brand"] { background-color: var(--bg-card) !important; border-color: var(--border-subtle) !important; }
.theme-systems-operations .so-cta-primary { background: var(--brand-orange) !important; color: #fff; }
.theme-systems-operations .so-cta-primary:hover { background: var(--brand-amber) !important; }
.theme-systems-operations .so-accent-text { color: var(--brand-cyan); }
.theme-systems-operations .so-muted { color: var(--text-muted); }
`

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

const ROUTE_STEPS_BY_SLUG: Record<string, { title: string; detail: string; icon: React.ComponentType<{ className?: string }> }[]> = {
  'product-marketing': [
    { title: 'Market & buyer research', detail: 'Understand buyer needs, competitive landscape, and market positioning opportunities.', icon: Search },
    { title: 'Positioning & messaging framework', detail: 'Define clear positioning, value props, and messaging hierarchy for the product.', icon: MessageSquare },
    { title: 'Launch & GTM playbook', detail: 'Coordinate cross-functional launch campaigns, timelines, and success metrics.', icon: Rocket },
    { title: 'Sales enablement & collateral', detail: 'Create battlecards, demo scripts, and collateral that accelerate deals.', icon: BookOpen },
    { title: 'Adoption & feedback loops', detail: 'Instrument adoption metrics and close feedback loops with product and sales.', icon: RefreshCw },
  ],
}

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
  useStitchTheme?: boolean
  usePmmAiTheme?: boolean
  useStrategyInsightsTheme?: boolean
  useSystemsOperationsTheme?: boolean
  /** ID from page-registry.csv — forwarded to ExpertiseHeroVisual to override path-based selection */
  heroVisualId?: string
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
  useStitchTheme = false,
  usePmmAiTheme = false,
  useStrategyInsightsTheme = false,
  useSystemsOperationsTheme = false,
  heroVisualId,
}: ExpertiseDetailContentProps) {
  const challengesRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const isChallengesInView = useInView(challengesRef, { once: true, margin: '-5% 0px' })
  const isResultsInView = useInView(resultsRef, { once: true, margin: '-5% 0px' })
  const shouldReduceMotion = useReducedMotion() ?? false

  const [resultValues, setResultValues] = useState(results.map((r) => r.value))

  const jitterIntensity = item.slug === 'product-marketing' ? 0.42 : 0.18
  const jitter = useCallback(() => {
    if (shouldReduceMotion) return
    setResultValues((prev) =>
      prev.map((v) => {
        const m = v.match(/^([^0-9.-]*)([0-9.,]+)(.*)$/)
        if (!m) return v
        const [, pre = '', num, suf = ''] = m
        const n = parseFloat(num.replace(/,/g, ''))
        const jittered = n + (Math.random() - 0.5) * jitterIntensity * Math.max(n, 1)
        return `${pre}${Math.round(Math.max(jittered, 0))}${suf}`
      })
    )
  }, [shouldReduceMotion, jitterIntensity])

  useEffect(() => {
    if (!isResultsInView || shouldReduceMotion) return
    const intervalMs = item.slug === 'product-marketing' ? 1200 + Math.random() * 800 : 1800 + Math.random() * 1200
    const t = setInterval(jitter, intervalMs)
    return () => clearInterval(t)
  }, [isResultsInView, jitter, shouldReduceMotion, item.slug])

  type IconName = keyof typeof Icons
  const IconComponent = Icons[(item.icon || 'Sparkles') as IconName] as React.ComponentType<{ className?: string }> | undefined
  const tagline = heroConfig?.tagline ?? item.description ?? item.positioning ?? ''

  const isDemandGrowth = pillarId === 'demand-growth'
  const theme = usePmmAiTheme
    ? PMM_AI_THEME
    : useStitchTheme
      ? STITCH_THEME
      : useStrategyInsightsTheme
        ? SI_THEME
        : useSystemsOperationsTheme
          ? SO_THEME
          : isDemandGrowth
            ? DG_THEME
            : null
  const bg = theme ? theme.background : 'var(--color-background-alt)'
  const bgAlt = theme ? theme.backgroundAlt : 'var(--color-background-alt)'
  const bgDark = theme ? theme.background : 'var(--color-background)'
  const accent = theme ? theme.muted : CYAN
  const accent2 = theme ? theme.accentSecondary : BLUE
  const ctaBg = theme ? theme.accentPrimary : TEAL
  const ctaGradient = theme && 'ctaGradient' in theme && theme.ctaGradient
  const highlightColor = theme ? theme.highlight : GOLD
  const heroGradient =
    usePmmAiTheme || useStitchTheme
      ? 'var(--background-dark)'
      : useStrategyInsightsTheme || useSystemsOperationsTheme
        ? 'var(--bg-primary)'
        : theme && isDemandGrowth
          ? `linear-gradient(135deg, ${theme.background} 0%, ${theme.backgroundAlt} 30%, ${theme.background} 50%, ${theme.backgroundAlt} 70%, ${theme.background} 100%)`
          : `linear-gradient(135deg, var(--color-background-alt) 0%, var(--color-background-alt) 30%, ${pillarTintOverlay} 50%, var(--color-background-alt) 70%, var(--color-background-alt) 100%)`

  const content = (
    <div className="min-h-screen text-white" style={theme ? { backgroundColor: bg } : { backgroundColor: 'var(--color-background-alt)' }}>
      {/* ========== HERO ========== */}
      <section
        className="relative overflow-hidden pt-8 pb-6 md:pt-12 md:pb-8"
        style={{ background: heroGradient }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
          <svg viewBox="0 0 1200 600" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id={`heroGrad-${pillarId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={accent2} stopOpacity="0.6" />
                <stop offset="50%" stopColor={accent} stopOpacity="0.7" />
                <stop offset="100%" stopColor={accent2} stopOpacity="0.5" />
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
          <nav className="flex items-center gap-2 text-xs md:text-sm mb-3 text-white/90" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:opacity-90" style={{ color: accent }}>Home</Link>
            <span className="text-white/60">/</span>
            <Link href="/expertise" className="transition-colors hover:opacity-90" style={{ color: accent }}>Expertise</Link>
            <span className="text-white/60">/</span>
            <Link href={`/expertise/${pillarId}`} className="transition-colors hover:opacity-90" style={{ color: accent }}>
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
                style={{ borderColor: `${accent}99`, backgroundColor: `${accent}33` }}
              >
                {IconComponent && (
                  <span className="inline-flex" style={{ color: accent }}>
                    <IconComponent className="w-3.5 h-3.5" />
                  </span>
                )}
                <span className="font-medium" style={{ color: accent }}>{pillarTitle}</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-white"
                style={{ textShadow: theme ? `0 0 40px ${accent}80, 0 0 80px ${accent}33` : `0 0 40px rgba(54,192,207,0.2), 0 0 80px rgba(54,192,207,0.15)` }}
              >
                {item.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="mt-2 text-base md:text-lg text-white/90 max-w-2xl font-medium"
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
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.04] ${usePmmAiTheme ? 'pmm-cta-primary' : ''} ${useStrategyInsightsTheme ? 'si-cta-primary' : ''} ${useSystemsOperationsTheme ? 'so-cta-primary' : ''}`}
                  style={
                    usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme
                      ? undefined
                      : ctaGradient
                        ? { background: ctaBg, color: '#fff' }
                        : { backgroundColor: ctaBg, boxShadow: theme ? undefined : '0 0 40px rgba(0,168,168,0.2)' }
                  }
                >
                  View case studies
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
                      className={`rounded-lg border p-2.5 backdrop-blur-sm ${usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? 'dark-card' : ''}`}
                      style={usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? undefined : { borderColor: `${accent}80`, backgroundColor: `${bg}CC` }}
                    >
                      <div className="text-[10px] text-white/90 uppercase tracking-wide">{m.label}</div>
                      <div className="text-base font-bold" style={{ color: highlightColor }}>{m.value}</div>
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
                style={{ borderColor: `${accent}99`, boxShadow: theme ? `0 0 60px ${accent}33` : `0 0 60px ${CYAN}20` }}
              >
                <ExpertiseHeroVisual
                  config={heroConfig ? { engine: 'scan', accent: 'cyan', metrics: heroConfig.metrics ?? [], tagline: heroConfig.tagline ?? '' } : undefined}
                  borderClassName="border-white/20"
                  heroVisualId={heroVisualId}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pulsing accent divider */}
      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ========== CHALLENGES ========== */}
      <section ref={challengesRef} className="relative py-4 md:py-6" style={{ backgroundColor: bgDark }}>
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
                className={`flex items-center gap-2 rounded-lg border p-3 transition-colors ${usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? 'dark-card' : ''}`}
                style={usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? undefined : { borderColor: `${accent}80`, backgroundColor: `${bg}E6` }}
              >
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: highlightColor }} />
                <span className={`text-sm ${usePmmAiTheme ? 'pmm-muted' : useStrategyInsightsTheme ? 'si-muted' : useSystemsOperationsTheme ? 'so-muted' : 'text-white'}`}>{c}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />

      {/* ========== ROUTE MAP ========== */}
      <section className="relative py-4 md:py-6 overflow-hidden" style={{ backgroundColor: bg }}>
        <div className="container-width relative">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <svg viewBox="0 0 500 180" className="w-full h-32 md:h-40" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`routeGrad-${pillarId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={accent2} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={accent} stopOpacity="0.8" />
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
          <div className={`grid gap-2 relative z-10 ${(ROUTE_STEPS_BY_SLUG[item.slug] ?? ROUTE_STEPS).length === 5 ? 'md:grid-cols-2 lg:grid-cols-5' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
            {(ROUTE_STEPS_BY_SLUG[item.slug] ?? ROUTE_STEPS).map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -6, boxShadow: `0 12px 40px ${accent}80` }}
                  className={`rounded-xl border-2 p-4 backdrop-blur-sm transition-all ${usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? 'dark-card' : ''}`}
                  style={usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? undefined : { borderColor: `${accent}80`, backgroundColor: `${bgAlt}E6` }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-2"
                    style={{ backgroundColor: `${accent}4D`, borderColor: `${accent}99`, borderWidth: 1 }}
                  >
                    <motion.div
                      animate={shouldReduceMotion ? {} : { rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ color: accent }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <span className="text-xs font-bold" style={{ color: accent }}>Step {i + 1}</span>
                  <h3 className="font-bold text-white mt-0.5 mb-1 text-sm">{step.title}</h3>
                  <p className={`text-xs leading-snug ${usePmmAiTheme ? 'pmm-muted' : useStrategyInsightsTheme ? 'si-muted' : useSystemsOperationsTheme ? 'so-muted' : 'text-white/90'}`}>{step.detail}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />

      {/* ========== EXECUTION STACK ========== */}
      <section className="relative py-4 md:py-6" style={{ backgroundColor: bgDark }}>
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
                whileHover={{ scale: 1.06, boxShadow: `0 0 24px ${accent}66` }}
                className={`rounded-lg border-2 p-3 text-center text-white text-sm font-medium transition-colors ${usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? 'dark-card' : ''}`}
                style={usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? undefined : { borderColor: `${accent}66`, backgroundColor: `${bg}E6` }}
              >
                {tool}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* ========== RESULTS ========== */}
      <section ref={resultsRef} className="relative py-4 md:py-6" style={{ backgroundColor: bg }}>
        <div className="container-width">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-4">Results</h2>
          <div className={`grid gap-4 ${results.length >= 5 ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' : 'md:grid-cols-3'}`}>
            {results.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isResultsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                whileHover={{
                  scale: 1.06,
                  boxShadow: item.slug === 'product-marketing' ? `0 0 48px ${accent}80, 0 0 24px ${highlightColor}4D` : `0 0 60px ${highlightColor}66`,
                  borderColor: item.slug === 'product-marketing' ? `${accent}B3` : `${highlightColor}B3`,
                }}
                className={`rounded-xl border-2 text-center backdrop-blur-sm transition-all ${item.slug === 'product-marketing' ? 'p-8 md:p-10' : 'p-6'} ${usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? 'dark-card' : ''}`}
                style={usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? undefined : { borderColor: `${accent}66`, backgroundColor: `${bgAlt}CC` }}
              >
                <motion.span
                  key={resultValues[i]}
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 1 }}
                  className={`block font-bold tabular-nums mb-1 ${usePmmAiTheme ? 'pmm-accent-text ' : useStitchTheme ? 'stitch-accent-text ' : useStrategyInsightsTheme ? 'si-accent-text ' : useSystemsOperationsTheme ? 'so-accent-text ' : ''}${item.slug === 'product-marketing' ? 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl' : 'text-4xl md:text-5xl lg:text-6xl'}`}
                  style={usePmmAiTheme || useStitchTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? undefined : { color: highlightColor, textShadow: theme ? undefined : '0 0 20px rgba(255,215,0,0.2)' }}
                >
                  {resultValues[i] ?? r.value}
                </motion.span>
                <p className={`font-medium ${usePmmAiTheme ? 'pmm-muted' : useStrategyInsightsTheme ? 'si-muted' : useSystemsOperationsTheme ? 'so-muted' : 'text-white'} ${item.slug === 'product-marketing' ? 'text-base' : 'text-sm'}`}>{r.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />

      {/* ========== RELATED ========== */}
      <section className="relative py-4 md:py-6" style={{ backgroundColor: bgDark }}>
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
                whileHover={{ y: -6, boxShadow: `0 8px 32px ${accent}66` }}
              >
                <Link
                  href={`/expertise/${e.slug}`}
                  className={`block rounded-xl border-2 p-4 transition-all duration-300 group ${usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? 'dark-card' : ''}`}
                  style={usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? undefined : { borderColor: `${accent}80`, backgroundColor: `${bg}E6` }}
                >
                  <h4 className="font-semibold text-white transition-colors mb-0.5 text-sm group-hover:opacity-90" style={{ color: 'inherit' }}>
                    {e.title}
                  </h4>
                  <p className={`text-xs line-clamp-2 ${usePmmAiTheme ? 'pmm-muted' : useStrategyInsightsTheme ? 'si-muted' : useSystemsOperationsTheme ? 'so-muted' : 'text-white/90'}`}>{e.description}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium" style={{ color: accent }}>
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
                whileHover={{ y: -6, boxShadow: `0 8px 32px ${accent}66` }}
              >
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className={`block rounded-xl border-2 p-4 transition-all duration-300 group ${usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? 'dark-card' : ''}`}
                  style={usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? undefined : { borderColor: `${accent}80`, backgroundColor: `${bg}E6` }}
                >
                  <h4 className="font-semibold text-white transition-colors mb-0.5 text-sm group-hover:opacity-90">
                    {cs.title}
                  </h4>
                  <p className={`text-xs line-clamp-2 ${usePmmAiTheme ? 'pmm-muted' : useStrategyInsightsTheme ? 'si-muted' : useSystemsOperationsTheme ? 'so-muted' : 'text-white/90'}`}>{cs.description}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium" style={{ color: accent }}>
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
                whileHover={{ y: -6, boxShadow: `0 8px 32px ${accent}66` }}
              >
                <Link
                  href={`/industries/${ind.slug}`}
                  className={`block rounded-xl border-2 p-4 transition-all duration-300 group ${usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? 'dark-card' : ''}`}
                  style={usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? undefined : { borderColor: `${accent}80`, backgroundColor: `${bg}E6` }}
                >
                  <h4 className="font-semibold text-white transition-colors mb-0.5 text-sm group-hover:opacity-90">
                    {ind.title}
                  </h4>
                  <p className={`text-xs line-clamp-2 ${usePmmAiTheme ? 'pmm-muted' : useStrategyInsightsTheme ? 'si-muted' : useSystemsOperationsTheme ? 'so-muted' : 'text-white/90'}`}>{ind.description}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium" style={{ color: accent }}>
                    Explore <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/expertise"
              className="inline-flex items-center gap-2 transition-colors text-sm hover:opacity-90 text-white/90"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Expertise
            </Link>
          </div>
        </div>
      </section>

      <motion.div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        animate={shouldReduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />

      {/* ========== FOOTER CTA ========== */}
      <section
        className="relative py-8 md:py-10"
        style={{ background: theme ? `linear-gradient(180deg, ${bgAlt} 0%, ${bg} 100%)` : 'linear-gradient(180deg, var(--color-background-alt) 0%, var(--color-background-alt) 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container-width text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-3">
            {item.slug === 'product-marketing' ? 'Explore related product marketing work' : `See more around ${item.title}`}
          </h2>
          <Link
            href="/case-studies"
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.05] ${usePmmAiTheme ? 'pmm-cta-primary' : ''} ${useStrategyInsightsTheme ? 'si-cta-primary' : ''} ${useSystemsOperationsTheme ? 'so-cta-primary' : ''}`}
            style={usePmmAiTheme || useStrategyInsightsTheme || useSystemsOperationsTheme ? undefined : ctaGradient ? { background: ctaBg, color: '#fff' } : { backgroundColor: ctaBg }}
          >
            View Case Studies
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )

  if (usePmmAiTheme) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: PMM_AI_CSS }} />
        <div className="theme-demand-growth">{content}</div>
      </>
    )
  }
  if (useStitchTheme) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: STITCH_CSS }} />
        <div className="stitch-content-engagement">{content}</div>
      </>
    )
  }
  if (useStrategyInsightsTheme) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: STRATEGY_INSIGHTS_CSS }} />
        <div className="theme-strategy-insights">{content}</div>
      </>
    )
  }
  if (useSystemsOperationsTheme) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: SYSTEMS_OPERATIONS_CSS }} />
        <div className="theme-systems-operations">{content}</div>
      </>
    )
  }
  return content
}
