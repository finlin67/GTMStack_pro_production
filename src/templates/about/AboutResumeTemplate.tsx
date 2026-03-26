'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, CheckCircle2, Quote } from 'lucide-react'
import HeroVisualByRoute from '@/src/components/hero/HeroVisualByRoute.client'
import type { HomeTemplateContent } from '@/src/templates/home/HomeTemplate'

type AboutResumeTemplateProps = {
  content: unknown
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
}

function splitBullets(raw: string): { header: string; bullets: string[] } {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)

  const header = lines[0] ?? ''
  const bullets = lines
    .slice(1)
    .map((l) => l.replace(/^•\s?/, '').trim())
    .filter(Boolean)

  return { header, bullets }
}

function extractImpact(tags: unknown): string | null {
  // Our about content uses tags like: "Impact: 40% Conversion Lift"
  if (!Array.isArray(tags)) return null
  const t = tags.find((x) => typeof x === 'string' && x.toLowerCase().startsWith('impact:'))
  return typeof t === 'string' ? t : null
}

const STACK_FILTERS = [
  { id: 'all', label: 'All Skills' },
  { id: 'rev-ops', label: 'RevOps & CRM' },
  { id: 'demand-gen', label: 'Demand Gen' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'ai-ml', label: 'AI & ML' },
  { id: 'analytics-data', label: 'Analytics & Data' },
] as const

type StackCategory = (typeof STACK_FILTERS)[number]['id']

// Palette copied from sandbox/stitch-html/about.html (tailwind.config theme.brand.*)
const BRAND_PRIMARY = '#2c7af6'
const BRAND_DARK = '#0A1628'
const BRAND_ACCENT = '#0D1F38'
const BRAND_GOLD = '#E8A040'
const BRAND_AI = '#36C0CF'
const RESUME_GRADIENT = 'linear-gradient(90deg, #2c7af6, #60a5fa)'
const PROOF_GRADIENT = 'linear-gradient(90deg, #C2440F, #E8A040, #FFDB58)'

const STACK_SKILLS: Array<{ name: string; cat: Exclude<StackCategory, 'all'> }> = [
  { name: 'Salesforce Admin', cat: 'rev-ops' },
  { name: 'HubSpot Pro', cat: 'rev-ops' },
  { name: 'LeanData', cat: 'rev-ops' },
  { name: 'Marketo Engage', cat: 'rev-ops' },
  { name: 'Outreach.io', cat: 'rev-ops' },
  { name: 'SQL/BigQuery', cat: 'rev-ops' },

  { name: 'Google Ads', cat: 'demand-gen' },
  { name: 'ABM Strategy', cat: 'demand-gen' },
  { name: 'SEO/SEM', cat: 'demand-gen' },
  { name: 'Metadata.io', cat: 'demand-gen' },
  { name: 'Pardot', cat: 'demand-gen' },
  { name: 'Content Syndication', cat: 'demand-gen' },

  { name: 'Team Coaching', cat: 'leadership' },
  { name: 'Budget Mgmt', cat: 'leadership' },
  { name: 'Public Speaking', cat: 'leadership' },
  { name: 'Cross-Functional Alignment', cat: 'leadership' },

  { name: 'OpenAI API', cat: 'ai-ml' },
  { name: 'LangChain', cat: 'ai-ml' },
  { name: 'Pinecone', cat: 'ai-ml' },
  { name: 'Anthropic (Claude)', cat: 'ai-ml' },
  { name: 'Weights & Biases', cat: 'ai-ml' },
  { name: 'Hugging Face', cat: 'ai-ml' },
  { name: 'TensorFlow', cat: 'ai-ml' },
  { name: 'PyTorch', cat: 'ai-ml' },
  { name: 'Scikit-learn', cat: 'ai-ml' },
  { name: 'Keras', cat: 'ai-ml' },

  { name: 'Pandas', cat: 'ai-ml' },

  { name: 'Tableau', cat: 'analytics-data' },
  { name: 'Power BI', cat: 'analytics-data' },
  { name: 'Looker', cat: 'analytics-data' },
  { name: 'D3.js', cat: 'analytics-data' },
  { name: 'Google Looker Studio', cat: 'analytics-data' },
]

export default function AboutResumeTemplate({ content, heroVisualId }: AboutResumeTemplateProps) {
  const data = content as HomeTemplateContent | null
  const [activeFilter, setActiveFilter] = useState<StackCategory>('all')

  const timelineCards = useMemo(() => {
    if (!data) return []
    return data.methodology.steps.map((step) => {
      const { header, bullets } = splitBullets(step.description)
      return {
        dateRange: step.number,
        role: step.title,
        org: header,
        bullets,
        icon: step.icon,
      }
    })
  }, [data])

  const aiCards = useMemo(() => {
    if (!data) return []
    return data.expertise.items.map((item) => {
      const impact = extractImpact(item.tags)
      return { title: item.title, description: item.description, impact, icon: item.icon }
    })
  }, [data])

  const performanceCards = useMemo(() => {
    if (!data) return []
    return data.caseStudies.items.map((item) => ({
      label: item.title,
      value: item.outcomeValue,
    }))
  }, [data])

  const heroStats = useMemo(() => {
    if (!data) return []
    return data.stats.map((s) => ({ label: s.label, value: s.value }))
  }, [data])

  const initials = useMemo(() => {
    const n = data?.founder?.name ?? ''
    const parts = n.split(/\s+/).filter(Boolean)
    const letters = (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
    return letters.toUpperCase() || 'MF'
  }, [data])

  const founderLine = data?.founder?.role ?? ''
  const [founderLocation, founderHighlight] = founderLine.split('•').map((s) => s.trim())

  if (!data) return null

  return (
    <main className="w-full">
      {/* Hero (resume-style) */}
      <section className="min-h-[680px] bg-[#0A1628] text-white pt-16">
        <div className="container-width section-padding relative">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="space-y-8">
              <div
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: BRAND_PRIMARY }}
              >
                {data.hero.badge}
              </div>
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-semibold leading-tight">
                  <span className="text-white">{data.hero.titleStart}</span>
                  <span
                    style={{
                      backgroundImage: RESUME_GRADIENT,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {data.hero.titleGradient}
                  </span>
                </h1>
                <blockquote className="border-l-4 border-[#2c7af6] pl-6 py-2 italic text-slate-300 text-lg max-w-2xl">
                  {data.hero.subtitle}
                </blockquote>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <div
                      className="text-3xl font-bold"
                      style={{
                        backgroundImage: PROOF_GRADIENT,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center relative min-h-[420px]">
              {heroVisualId ? (
                <div className="w-full max-w-[600px]">
                  <HeroVisualByRoute heroVisualId={heroVisualId} />
                </div>
              ) : (
              <>
              <div className="relative">
                <div
                  className="absolute -top-6 -left-6 w-[184px] h-[184px] border-2 border-dashed border-white/10 rounded-full animate-spin"
                  style={{ animationDuration: '12s' }}
                  aria-hidden="true"
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: BRAND_GOLD }} />
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: '#4ade80' }} />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: '#60a5fa' }} />
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: '#22d3ee' }} />
                  </div>

                <div
                  className="relative w-[148px] h-[148px] rounded-full bg-slate-800 border-2 flex items-center justify-center text-3xl font-bold z-10"
                  style={{ borderColor: BRAND_PRIMARY }}
                >
                  {initials}
                </div>
              </div>

              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-center">
                <h2 className="text-2xl font-semibold text-white">{data.founder?.name}</h2>
                <p className="text-slate-400 text-sm">
                  {founderLocation}{' '}
                  {founderHighlight ? (
                    <>
                      • <span className="font-semibold" style={{ color: BRAND_PRIMARY }}>{founderHighlight}</span>
                    </>
                  ) : null}
                </p>
              </div>
              </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Benchmarks */}
      <section className="bg-white py-20 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-center text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-12">
            Selected Outcomes
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {performanceCards.map((stat) => (
              <div key={stat.label}>
                <span className="block text-4xl font-bold text-slate-900/90">{stat.value}</span>
                <p className="text-[10px] uppercase font-bold text-brand-600/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Evolution */}
      <section className="py-24 px-6 lg:px-24 relative overflow-hidden bg-[#0D1F38] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-20">Operating Background</h2>

          <div className="relative">
            {/* vertical spine */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

            <div className="space-y-8">
              {timelineCards.map((card, idx) => (
                <StrategicTimelineCard
                  key={`${card.role}-${idx}`}
                  card={card}
                  index={idx}
                  defaultExpanded={idx === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI & Machine Learning */}
      <section className="bg-white py-32 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-4 block" style={{ color: BRAND_AI }}>
              AI &amp; MACHINE LEARNING
            </span>
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4" style={{ color: BRAND_DARK }}>Architecting Intelligent Revenue Systems</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiCards.map((card, idx) => (
              <div
                key={card.title}
                className="bg-slate-50 border border-slate-200 rounded-[12px] p-8 relative overflow-hidden group"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-6"
                  style={{
                    backgroundColor:
                      idx === 0 ? `${BRAND_AI}1A` : idx === 1 ? `${BRAND_PRIMARY}1A` : `${BRAND_GOLD}1A`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: idx === 0 ? BRAND_AI : idx === 1 ? BRAND_PRIMARY : BRAND_GOLD,
                    }}
                  />
                </div>
                <h4 className="font-bold text-[18px] mb-3" style={{ color: BRAND_DARK }}>{card.title}</h4>
                <p className="text-[14px] text-slate-600 leading-relaxed mb-6">{card.description}</p>
                {card.impact ? (
                  <span className="font-semibold text-[12px] uppercase tracking-wider" style={{ color: BRAND_PRIMARY }}>
                    {card.impact}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Matrix */}
      <section className="bg-[#0A1628] py-24 px-6 lg:px-24">
        <div className="max-w-6xl mx-auto text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Tools and Systems</h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {STACK_FILTERS.map((f) => {
              const active = activeFilter === f.id
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-6 py-2 rounded-full border text-sm font-medium transition-all ${
                    active
                      ? 'bg-[#2c7af6] border-[#2c7af6] text-white'
                      : 'border-white/20 text-slate-300 hover:border-[#2c7af6]'
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {STACK_SKILLS.filter((s) => activeFilter === 'all' || s.cat === activeFilter).map((skill) => (
              <span
                key={skill.name}
                className="skill-pill px-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-sm text-slate-300"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Validation + Academic Foundation */}
      <section className="bg-white py-24 px-6 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold mb-6">Selected Credentials</h2>
              <div className="space-y-4">
                <ValidationRow title="Salesforce Certified Administrator" meta="Credential ID: 192837465" />
                <ValidationRow title="HubSpot Revenue Operations" meta="Expert Level Certified" />
                <ValidationRow title="Google Analytics IQ" meta="Valid through 2025" />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold mb-6">Academic Background</h2>
                <div className="bg-slate-50 p-6 rounded-xl border-t-4" style={{ borderTopColor: BRAND_GOLD }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-red-800 flex items-center justify-center text-white font-bold rounded">
                    BU
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Boston University</h3>
                    <p className="text-slate-500 text-sm">Questrom School of Business</p>
                  </div>
                </div>
                <p className="font-medium text-slate-900">B.S. Business Administration &amp; Management</p>
                <p className="text-slate-500 text-sm mt-2">
                  Concentration in Management Information Systems. Graduated Cum Laude.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D1F38] py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">{data.ctaBottom.title}</h2>
          <p className="text-slate-300 text-lg mb-12">{data.ctaBottom.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@gtmstack.pro"
              className="hover:bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
              style={{ backgroundColor: BRAND_PRIMARY, boxShadow: `0 0 30px ${BRAND_PRIMARY}66` }}
            >
              {data.ctaBottom.buttonText}
              <span className="ml-2 inline-flex align-middle">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
            <button
              onClick={() => window.print()}
              className="border border-white/20 hover:bg-white/10 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all"
            >
              Print Page
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

function ValidationRow({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="bg-slate-50 p-6 border-l-4 shadow-sm rounded-xl" style={{ borderLeftColor: BRAND_PRIMARY }}>
      <h5 className="font-bold text-slate-900">{title}</h5>
      <p className="text-slate-500 text-sm">{meta}</p>
    </div>
  )
}

function StrategicTimelineCard({
  card,
  index,
  defaultExpanded,
}: {
  card: {
    dateRange: string
    role: string
    org: string
    bullets: string[]
    icon: string
  }
  index: number
  defaultExpanded?: boolean
}) {
  const [expanded, setExpanded] = useState(!!defaultExpanded)

  // Color accents roughly matching the stitch HTML timeline.
  const accent =
    index === 0
      ? 'border-[#2c7af6]'
      : index === 1
        ? 'border-[#E8A040]'
        : index === 2
          ? 'border-red-500'
          : 'border-[#36C0CF]'

  return (
    <div className="relative flex justify-center">
      <div className={`w-full max-w-xl bg-[#0A1628] p-6 rounded-xl border-l-4 ${accent} shadow-xl`}>
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <span className="text-xs font-bold mb-2 block italic text-white/80">{card.dateRange}</span>
            <h4 className="text-xl font-bold text-white">{card.role}</h4>
            <p className="text-slate-300 font-medium mb-4">{card.org}</p>
          </div>
        </div>

        {expanded ? (
          <div className="space-y-3 text-sm text-slate-300">
            {card.bullets.map((b, i) => (
              <p key={`${b}-${i}`}>• {b}</p>
            ))}
          </div>
        ) : (
          <div className="text-sm text-slate-400 italic mb-4">Details hidden</div>
        )}

        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 text-[10px] font-bold uppercase tracking-widest hover:underline cursor-pointer text-white/80"
        >
          {expanded ? 'See Less ↑' : 'See Details ↓'}
        </button>
      </div>
    </div>
  )
}

