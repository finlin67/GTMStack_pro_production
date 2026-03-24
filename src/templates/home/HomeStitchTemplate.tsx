'use client'

import React from 'react'
import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroVisualByRoute from '@/src/components/hero/HeroVisualByRoute.client'
import {
  getHomeStitchContent,
  type HomeStitchAccent,
  type HomeStitchContent,
  type HomeStitchInsightsBlock,
} from '@/content/home'

type HomeStitchTemplateProps = {
  content: unknown
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
}

const COLORS = {
  backgroundLight: '#f6f7f8',
  backgroundDark: '#0D2137',
  deepNavy: '#112B46',
  midNavy: '#0D2137',
  primary: '#1e3f66',
  saffron: '#F9C74F',
  signalBlue: '#6FAFE0',
} as const

const ACCENT: Record<HomeStitchAccent, string> = {
  signalBlue: COLORS.signalBlue,
  saffron: COLORS.saffron,
  midNavy: COLORS.midNavy,
  primary: COLORS.primary,
}

export default function HomeStitchTemplate({ content, heroVisualId }: HomeStitchTemplateProps) {
  const c = getHomeStitchContent(content)

  return (
    <main className="w-full">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-anim {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
      `}</style>
      <HeroSection c={c} heroVisualId={heroVisualId} />
      <ProofSection c={c} />
      <PillarSection c={c} />
      <MethodologySection c={c} />
      <CaseStudySection c={c} />
      <MarqueeSection c={c} />
      {c.insights ? <InsightsSection insights={c.insights} /> : null}
      {c.ticker.length > 0 ? <TickerSection ticker={c.ticker} /> : null}
      <FinalCtaSection c={c} />
    </main>
  )
}

function HeroSection({ c, heroVisualId }: { c: HomeStitchContent; heroVisualId?: string }) {
  const { hero } = c
  return (
    <section
      className="relative min-h-0 overflow-hidden border-b border-white/5 py-8 md:py-10 lg:py-12"
      style={{ backgroundColor: COLORS.backgroundDark }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(111,175,224,0.15) 0%, rgba(13,33,55,0) 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(111,175,224,1) 50%, rgba(0,0,0,0) 100%)',
            transform: 'rotate(-45deg) translateY(20px)',
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(111,175,224,1) 50%, rgba(0,0,0,0) 100%)',
            transform: 'rotate(-45deg) translateY(60px)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-10 items-start lg:items-center px-6 lg:px-20 pt-1 pb-4 md:pb-6">
        <div className="space-y-4 md:space-y-5">
          <div className="flex flex-wrap gap-2">
            {hero.badges.map((b, i) =>
              b.variant === 'accent' ? (
                <span
                  key={i}
                  className="backdrop-blur-sm border px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2"
                  style={{
                    backgroundColor: `${COLORS.signalBlue}1A`,
                    borderColor: `${COLORS.signalBlue}4D`,
                    color: COLORS.signalBlue,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: COLORS.signalBlue }}
                  />
                  {b.text}
                </span>
              ) : (
                <span
                  key={i}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.signalBlue }} />
                  {b.text}
                </span>
              )
            )}
          </div>

          <h1 className="max-w-xl font-display text-4xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-7xl font-black leading-[1.08] text-white tracking-tight">
            {hero.titleLine1}{' '}
            <span
              style={{
                background: `linear-gradient(90deg, ${COLORS.signalBlue} 0%, ${COLORS.saffron} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {hero.titleLine2Gradient}
            </span>{' '}
            <span className="text-white">{hero.titleLine3}</span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-xl leading-relaxed border-l-2 border-[#6FAFE0]/40 pl-3">
            {hero.thesis}
          </p>

          <p className="text-base md:text-lg text-slate-400 max-w-lg leading-relaxed">{hero.subtitle}</p>
          <p className="text-sm text-slate-500 max-w-lg leading-relaxed">{hero.authorshipLine}</p>

          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{hero.focusLabel}</p>
            <div className="flex flex-wrap gap-2">
              {hero.focusTopics.map((t) => (
                <span
                  key={t}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-xs md:text-sm transition-all"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href={hero.ctaPrimary.href}
              className="bg-[#F9C74F] text-[#0D2137] font-black px-8 py-4 rounded-xl text-lg hover:scale-105 transition-transform shadow-xl shadow-[#F9C74F]/20 inline-flex items-center gap-2"
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="bg-white/5 border border-white/10 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-all inline-flex items-center gap-2"
            >
              {hero.ctaSecondary.label} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block">
          {heroVisualId ? (
            <HeroVisualByRoute heroVisualId={heroVisualId} />
          ) : (
            <div
              className="bg-[#163A59] border border-white/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden group"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}
            >
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(239,68,68,0.5)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(234,179,8,0.5)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(34,197,94,0.5)' }} />
                </div>
                <div className="text-[10px] font-mono text-signal-blue/60 uppercase tracking-tighter">
                  {c.commandPanel.version}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {c.commandPanel.pillars.map((p) => (
                  <PillarCard
                    key={p.index}
                    color={ACCENT[p.accent]}
                    icon={p.icon}
                    index={p.index}
                    label={p.label}
                    barWidth={p.barWidth}
                  />
                ))}
              </div>

              <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{c.commandPanel.outputLabel}</span>
                  <span className="text-xl font-display font-black text-white">{c.commandPanel.outputValue}</span>
                </div>
                <div className="h-12 w-24 bg-mid-navy rounded border border-white/10 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6FAFE0]/20 to-transparent animate-pulse" />
                  <div className="flex items-end h-full gap-1 p-1">
                    {[20, 40, 30, 70, 60].map((h) => (
                      <div
                        key={h}
                        className="flex-1"
                        style={{ height: `${h}%`, backgroundColor: 'rgba(111,175,224,0.4)' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F9C74F]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#6FAFE0]/20 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  )
}

function ProofSection({ c }: { c: HomeStitchContent }) {
  return (
    <section
      className="bg-[#112B46] pt-8 pb-12 md:pt-10 md:pb-14 px-6 lg:px-20 border-b border-white/5"
      style={{ backgroundColor: COLORS.deepNavy }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {c.proofStats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center space-y-2">
            <span className="text-4xl md:text-5xl font-display font-black text-white">{s.value}</span>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function PillarSection({ c }: { c: HomeStitchContent }) {
  const s = c.pillarSection
  return (
    <section className="bg-[#f6f7f8] py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span
              className="text-primary font-bold tracking-[0.2em] uppercase text-xs"
              style={{ color: COLORS.primary }}
            >
              {s.kicker}
            </span>
            <h2 className="text-[#0D2137] text-4xl md:text-5xl font-display font-black leading-tight tracking-tighter whitespace-pre-line">
              {s.title}
            </h2>
          </div>
          <p className="text-slate-600 max-w-md">{s.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {s.tiles.map((tile) => (
            <PillarTile
              key={tile.title}
              accent={ACCENT[tile.accent]}
              icon={tile.icon}
              pill={tile.pill}
              title={tile.title}
              desc={tile.desc}
              bullets={tile.bullets}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function MethodologySection({ c }: { c: HomeStitchContent }) {
  return (
    <section
      className="bg-[#0D2137] py-24 px-6 lg:px-20 overflow-hidden relative"
      style={{ backgroundColor: COLORS.backgroundDark }}
    >
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-white text-4xl md:text-5xl font-display font-black mb-6">{c.methodology.title}</h2>
        <div className="w-24 h-1 bg-[#F9C74F] mx-auto" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="hidden lg:block absolute top-10 left-0 w-full h-px border-t border-dashed border-white/20 z-0" />
        <div className="grid lg:grid-cols-4 gap-12 relative z-10">
          {c.methodology.steps.map((step) => (
            <MethodStep
              key={step.step}
              bg="#112B46"
              border="rgba(255,255,255,0.10)"
              accent={ACCENT[step.accent]}
              icon={step.icon}
              step={step.step}
              desc={step.desc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function MarqueeSection({ c }: { c: HomeStitchContent }) {
  const reduceMotion = useReducedMotion() ?? false
  const items = [...c.marqueeIndustries, ...c.marqueeIndustries]
  return (
    <section
      className="bg-[#f6f7f8] py-12 overflow-hidden border-y border-slate-200"
      style={{ backgroundColor: COLORS.backgroundLight }}
    >
      <div className="overflow-hidden">
        <div
          className={
            reduceMotion
              ? 'flex flex-wrap items-center justify-center gap-8'
              : 'marquee-anim flex gap-8 items-center'
          }
        >
          {items.map((t, idx) => (
            <span
              key={`${t}-${idx}`}
              className="text-2xl font-display font-black/20 whitespace-nowrap"
              style={{ color: COLORS.midNavy, opacity: 0.2 }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseStudySection({ c }: { c: HomeStitchContent }) {
  const cs = c.caseStudy
  return (
    <section className="bg-[#112B46] py-24 px-6 lg:px-20 overflow-hidden" style={{ backgroundColor: COLORS.deepNavy }}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0D2137] rounded-3xl overflow-hidden border border-white/5 flex flex-col lg:flex-row shadow-2xl">
          <div className="lg:w-1/3 bg-[#6FAFE0]/10 p-12 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r border-white/5">
            <span
              className="text-[120px] font-display font-black leading-none"
              style={{
                background: 'linear-gradient(90deg, #6FAFE0 0%, #F9C74F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {cs.multiplier}
            </span>
            <span className="text-white text-xl font-bold uppercase tracking-widest mt-4">{cs.metricLabel}</span>
            <p className="text-slate-400 mt-2 text-sm">{cs.clientLabel}</p>
          </div>
          <div className="lg:w-2/3 p-12 flex flex-col justify-center">
            <div className="bg-[#F9C74F]/20 text-[#F9C74F] text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-6 tracking-widest uppercase">
              {cs.tag}
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-6">{cs.title}</h3>
            <p className="text-slate-400 leading-relaxed mb-8">{cs.body}</p>
            <div className="border-l-4 border-[#6FAFE0] pl-6 mb-8 italic text-white/90 text-lg">{cs.quote}</div>
            <Link
              href={cs.ctaHref}
              className="text-[#6FAFE0] font-bold flex items-center gap-2 hover:translate-x-2 transition-transform w-fit"
            >
              {cs.ctaLabel} <span className="material-symbols-outlined" aria-hidden="true">east</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function InsightsSection({ insights }: { insights: HomeStitchInsightsBlock }) {
  const ins = insights
  return (
    <section className="bg-white py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[#6FAFE0] font-bold tracking-[0.2em] uppercase text-xs">{ins.kicker}</span>
            <h2 className="text-[#0D2137] text-4xl font-display font-black mt-2">{ins.title}</h2>
          </div>
          <Link
            href={ins.viewAllHref}
            className="hidden md:block text-[#0D2137] font-bold border-b-2 border-[#0D2137] pb-1"
          >
            {ins.viewAllLabel}
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ins.cards.map((card: HomeStitchInsightsBlock['cards'][number]) => (
            <InsightCard key={card.title} tag={card.tag} title={card.title} img={card.img} href={card.href} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TickerSection({ ticker }: { ticker: string[] }) {
  const reduceMotion = useReducedMotion() ?? false
  const rows = [ticker, ticker]
  return (
    <section className="bg-[#112B46] py-8 overflow-hidden" style={{ backgroundColor: COLORS.deepNavy }}>
      {rows.map((row, ri) => (
        <div key={ri} className={reduceMotion ? '' : 'marquee gap-16'}>
          <div
            className={
              reduceMotion
                ? 'flex flex-wrap items-center justify-center gap-16 px-4 py-2'
                : 'marquee-anim flex gap-16 items-center'
            }
          >
            {row.map((t, ti) => (
              <span key={`${t}-${ri}-${ti}`} className="text-sm font-bold text-white/40 flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

function FinalCtaSection({ c }: { c: HomeStitchContent }) {
  const f = c.finalCta
  return (
    <section
      className="bg-[#0D2137] py-32 px-6 lg:px-20 relative overflow-hidden text-center"
      style={{ backgroundColor: COLORS.backgroundDark }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none opacity-20">
        <div className="absolute inset-0 rounded-full border" style={{ borderColor: 'rgba(111,175,224,1)' }} />
        <div className="absolute inset-[20px] rounded-full border" style={{ borderColor: 'rgba(111,175,224,0.5)' }} />
        <div className="absolute inset-[40px] rounded-full border" style={{ borderColor: 'rgba(111,175,224,0.3)' }} />
        <div className="absolute inset-[60px] rounded-full border" style={{ borderColor: 'rgba(111,175,224,0.1)' }} />
      </div>

      <div className="relative max-w-3xl mx-auto space-y-10">
        <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-tight tracking-tighter">
          {f.title}
        </h2>
        <p className="text-xl text-slate-400">{f.subtitle}</p>
        <div className="flex flex-col items-center gap-8">
          <Link
            href={f.primaryCta.href}
            className="bg-[#F9C74F] text-[#0D2137] font-black px-12 py-6 rounded-2xl text-2xl hover:scale-110 transition-transform shadow-[0_0_50px_rgba(249,199,79,0.3)] inline-flex items-center gap-2"
          >
            {f.primaryCta.label}
            <ArrowRight className="w-5 h-5" />
          </Link>
          {f.pathways.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 w-full text-center">
                Go deeper
              </span>
              {f.pathways.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="text-sm font-semibold text-[#6FAFE0] hover:text-white transition-colors"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function PillarCard({
  color,
  icon,
  index,
  label,
  barWidth,
}: {
  color: string
  icon: string
  index: string
  label: string
  barWidth: string
}) {
  return (
    <div
      className="border p-4 rounded-xl hover:border transition-colors bg-[#0D2137]/40 border-white/20"
      style={{ borderColor: `${color}40`, backgroundColor: `${color}0f` }}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="material-symbols-outlined" style={{ color }}>
          {icon}
        </span>
        <span className="text-[10px] font-mono" style={{ color: `${color}88` }}>
          {index}
        </span>
      </div>
      <div className="text-xs font-bold mb-1" style={{ color }}>
        {label}
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full"
          style={{
            width: barWidth,
            backgroundColor: color,
            opacity: 0.9,
          }}
        />
      </div>
    </div>
  )
}

function PillarTile({
  accent,
  icon,
  pill,
  title,
  desc,
  bullets,
}: {
  accent: string
  icon: string
  pill: string
  title: string
  desc: string
  bullets: string[]
}) {
  return (
    <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
        style={{ backgroundColor: `${accent}1A`, color: accent }}
      >
        <span className="material-symbols-outlined text-3xl" aria-hidden="true">
          {icon}
        </span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest mb-2 block" style={{ color: accent }}>
        {pill}
      </span>
      <h3 className="text-xl font-display font-bold mb-4" style={{ color: COLORS.midNavy }}>
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>
      <ul className="text-[11px] font-bold text-slate-400 space-y-2 uppercase tracking-tight">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

function MethodStep({
  bg,
  border,
  accent,
  icon,
  step,
  desc,
}: {
  bg: string
  border: string
  accent: string
  icon: string
  step: string
  desc: string
}) {
  return (
    <div className="text-center group">
      <div
        className="w-20 h-20 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white transition-colors relative"
        style={{
          backgroundColor: bg,
          borderColor: border,
          color: accent,
        }}
      >
        <span className="material-symbols-outlined text-4xl" aria-hidden="true" style={{ color: accent }}>
          {icon}
        </span>
      </div>
      <h4 className="text-white font-bold text-xl mb-2">{step}</h4>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  )
}

function InsightCard({
  tag,
  title,
  img,
  href,
}: {
  tag: string
  title: string
  img: string
  href?: string
}) {
  const inner = (
    <>
      <div className="aspect-[16/10] bg-slate-100 rounded-xl mb-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0D2137]/20 to-transparent" />
        <img alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={img} />
      </div>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">{tag}</span>
      <h3 className="text-xl font-display font-bold text-[#0D2137] group-hover:text-[#6FAFE0] transition-colors">
        {title}
      </h3>
    </>
  )
  return href ? (
    <Link href={href} className="group block cursor-pointer">
      {inner}
    </Link>
  ) : (
    <div className="group cursor-pointer">{inner}</div>
  )
}
