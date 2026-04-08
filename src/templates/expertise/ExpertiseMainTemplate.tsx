import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Twitter } from 'lucide-react'
import HeroVisualByRoute from '@/src/components/hero/HeroVisualByRoute.client'

type Props = {
  content: unknown
  pageTitle?: string
  theme?: string
  heroVisualId?: string
}

type NavLink = { label: string; href: string; active?: boolean }

type LogoContent = { icon?: string; label?: string; subLabel?: string }

type HeroContent = { badge?: string; title?: string; subtitle?: string; ctaPrimary?: string; ctaSecondary?: string }

type PillarItem = {
  title?: string
  description?: string
  icon?: string
  color?: string
  bgStart?: string
  ringColor?: string
  glowColor?: string
}

type InsightsItem = { type?: string; title?: string; description?: string; image?: string; date?: string; cta?: string }

type TemplateContent = {
  logo?: LogoContent
  navLinks?: NavLink[]
  hero?: HeroContent
  pillars?: { title?: string; subtitle?: string; items?: PillarItem[] }
  philosophy?: { quote?: string; highlight?: string }
  insights?: { title?: string; subtitle?: string; cta?: string; items?: InsightsItem[] }
  ctaBand?: { title?: string; subtitle?: string; ctaPrimary?: string; ctaSecondary?: string }
  footer?: { columns?: Array<{ title?: string; links?: Array<{ label: string; href: string }> }>; copyright?: string; tagline?: string }
}

function normalizeExternalProfile(url?: string): string | null {
  if (!url) return null
  const trimmed = url.trim()
  if (!trimmed) return null
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export default function ExpertiseMainTemplate({
  content: rawContent,
  theme = 'dark',
  heroVisualId,
}: Props) {
  const content = (rawContent as TemplateContent) ?? null
  if (!content) return null

  const isDark = theme === 'dark'
  const logo = content.logo ?? {}
  const hero = content.hero ?? {}
  const pillars = content.pillars ?? {}
  const philosophy = content.philosophy ?? {}
  const insights = content.insights ?? {}
  const ctaBand = content.ctaBand ?? {}
  const footer = content.footer ?? {}
  const linkedinUrl = normalizeExternalProfile(process.env.NEXT_PUBLIC_LINKEDIN_URL)
  const twitterUrl = normalizeExternalProfile(process.env.NEXT_PUBLIC_TWITTER_URL)
  const pillarFallbackRoutes = [
    '/expertise/content-engagement',
    '/expertise/demand-growth',
    '/expertise/strategy-insights',
    '/expertise/systems-operations',
  ]

  return (
    <div
      className={`min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}
    >
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="container-width flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-950">
              <span className="material-symbols-outlined text-xl font-bold">
                {logo.icon ?? 'architecture'}
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                {logo.subLabel ?? 'Architecture'}
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">
                {logo.label ?? 'REVENUEARCHITECT'}
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {(content.navLinks ?? []).map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.active
                    ? 'text-white underline decoration-cyan-400 decoration-2 underline-offset-8'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden items-center justify-center rounded-xl bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-200 sm:flex">
              {hero.ctaPrimary ?? 'Explore the framework'}
            </button>
            <button className="p-2 text-slate-300 hover:text-white md:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-grid-dark opacity-50" aria-hidden="true" />
          <div className="absolute inset-0 bg-mesh opacity-60" aria-hidden="true" />
          <div className="container-width section-padding relative z-10">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="max-w-2xl space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-2 animate-ping rounded-full bg-cyan-400 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-cyan-300" />
                  </span>
                  {hero.badge}
                </div>
                <h1 className="font-display text-[2.7rem] font-semibold leading-[0.98] tracking-tight text-white md:text-[4.4rem] whitespace-pre-line">
                  {hero.title}
                </h1>
                <p className="max-w-[38rem] text-[15px] leading-8 text-slate-300/90 md:text-[1.05rem]">
                  {hero.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-cta-primary">{hero.ctaPrimary}</button>
                  <button className="btn-hero-outline">{hero.ctaSecondary}</button>
                </div>
              </div>
              <div className="hidden lg:flex justify-center">
                <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="absolute inset-0 bg-hero-gradient opacity-80" aria-hidden="true" />
                  <div className="relative z-10 h-[420px]">
                    <HeroVisualByRoute heroVisualId={heroVisualId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
          <div className="container-width section-padding">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Systems</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">
                {pillars.title}
              </h2>
              <p className="mt-4 max-w-[42rem] text-[15px] leading-8 text-slate-600 dark:text-slate-300">
                {pillars.subtitle}
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {(pillars.items ?? []).map((pillar, idx) => (
                pillarFallbackRoutes[idx] ? (
                  <Link
                    key={idx}
                    href={pillarFallbackRoutes[idx]}
                    className={`group relative flex h-full flex-col rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(9,16,32,0.96))] p-8 shadow-[0_20px_50px_rgba(2,6,23,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:shadow-[0_28px_68px_rgba(8,145,178,0.14)] ${pillar.ringColor ?? ''}`}
                  >
                    <div className={`absolute right-6 top-6 h-20 w-20 rounded-full blur-3xl opacity-0 transition-opacity group-hover:opacity-100 ${pillar.glowColor ?? ''}`} />
                    <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-xl ${pillar.bgStart ?? ''} ${pillar.color ?? ''}`}>
                      <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                    </div>
                    <div className="relative z-10 mt-6">
                      <h3 className="font-display text-xl font-semibold text-white">{pillar.title}</h3>
                      <p className="mt-3 flex-grow text-[15px] leading-7 text-slate-300/88">{pillar.description}</p>
                      <span className={`mt-6 inline-flex items-center text-sm font-semibold ${pillar.color ?? ''}`}>
                        View work
                        <span className="material-symbols-outlined ml-2 text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                      </span>
                    </div>
                  </Link>
                ) : (
                  <span
                    key={idx}
                    aria-disabled="true"
                    className={`group relative flex h-full flex-col rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(9,16,32,0.96))] p-8 shadow-[0_20px_50px_rgba(2,6,23,0.18)] transition-all duration-300 cursor-default ${pillar.ringColor ?? ''}`}
                  >
                    <div className={`absolute right-6 top-6 h-20 w-20 rounded-full blur-3xl opacity-0 transition-opacity ${pillar.glowColor ?? ''}`} />
                    <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-xl ${pillar.bgStart ?? ''} ${pillar.color ?? ''}`}>
                      <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                    </div>
                    <div className="relative z-10 mt-6">
                      <h3 className="font-display text-xl font-semibold text-white">{pillar.title}</h3>
                      <p className="mt-3 flex-grow text-[15px] leading-7 text-slate-300/88">{pillar.description}</p>
                      <span className={`mt-6 inline-flex items-center text-sm font-semibold ${pillar.color ?? ''}`}>
                        View work
                        <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </span>
                )
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 flow-curved opacity-20" aria-hidden="true" />
          <div className="container-width section-padding relative z-10">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Philosophy</p>
              <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.02] md:text-5xl">
                {(() => {
                  const quote = philosophy.quote ?? ''
                  const highlight = philosophy.highlight ?? ''
                  if (!highlight) return quote
                  const parts = quote.split(highlight)
                  return parts.map((part, i) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < parts.length - 1 ? <span className="text-gradient">{highlight}</span> : null}
                    </React.Fragment>
                  ))
                })()}
              </h2>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
          <div className="container-width section-padding">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Insights</p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-4xl">{insights.title}</h2>
                <p className="mt-3 max-w-[40rem] text-[15px] leading-8 text-slate-600 dark:text-slate-300">{insights.subtitle}</p>
              </div>
              <Link className="hidden items-center text-sm font-semibold text-cyan-600 hover:underline md:inline-flex" href="/blog">
                {insights.cta}
                <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {(insights.items ?? []).map((item, idx) => (
                <div key={idx} className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(9,16,32,0.96))] shadow-[0_20px_50px_rgba(2,6,23,0.18)] transition-all hover:-translate-y-1 hover:border-cyan-300/20 hover:shadow-[0_28px_68px_rgba(8,145,178,0.14)]">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={item.image ?? '/images/placeholder.webp'}
                      alt={item.title ?? 'Insight'}
                      unoptimized
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                    {item.type ? (
                      <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                        {item.type}
                      </span>
                    ) : null}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-slate-300/88">{item.description}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      <span>{item.date}</span>
                      <span>{item.cta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-hero-gradient opacity-80" aria-hidden="true" />
          <div className="container-width section-padding relative z-10 text-center">
            <h2 className="font-display text-3xl font-semibold leading-[1.02] md:text-5xl">{ctaBand.title}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-slate-300/90 md:text-[1.05rem]">
              {ctaBand.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="btn-cta-primary">{ctaBand.ctaPrimary}</button>
              <button className="btn-hero-outline">{ctaBand.ctaSecondary}</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-white">
        <div className="container-width section-padding">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white">architecture</span>
                <span className="font-semibold tracking-tight">{logo.label ?? 'REVENUEARCHITECT'}</span>
              </div>
              {footer.tagline ? (
                <p className="mt-4 text-sm text-slate-400">{footer.tagline}</p>
              ) : null}
              {linkedinUrl || twitterUrl ? (
                <div className="mt-6 flex gap-4">
                  {linkedinUrl ? (
                    <a
                      className="text-slate-400 hover:text-white"
                      href={linkedinUrl}
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  ) : null}
                  {twitterUrl ? (
                    <a
                      className="text-slate-400 hover:text-white"
                      href={twitterUrl}
                      aria-label="Twitter"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>

            {(footer.columns ?? []).map((col, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{col.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {(col.links ?? []).map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link className="hover:text-cyan-300" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-500">
            {footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  )
}
