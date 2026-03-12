'use client'

import React from 'react'
import { ArrowRight, CheckCircle2, Quote } from 'lucide-react'

export type IndustriesMainContent = {
  brand: { name: string; logoIcon: string }
  hero: {
    badge: string
    title: string
    description: string
    metrics: Array<{ value: string; label: string }>
    backgroundImage: string
    dashboardImage: string
  }
  challenges: {
    sectionTitle: string
    sectionDescription: string
    items: Array<{
      icon: string
      title: string
      description: string
      statValue: string
      statLabel: string
      colorClass: string
    }>
  }
  industries: {
    sectionTitle: string
    items: Array<{
      icon: string
      name: string
      description: string
      outcome: string
    }>
  }
  proofStrip: Array<{ label: string; value: string }>
  comparison: {
    title: string
    description: string
    badPoints: string[]
    goodPoints: string[]
  }
  testimonial: {
    quote: string
    author: string
    role: string
    avatar: string
    logos: string[]
  }
}

function isIndustriesMainContent(value: unknown): value is IndustriesMainContent {
  return !!value && typeof value === 'object' && 'hero' in value && 'industries' in value
}

export default function Template(props: { content?: unknown; pageTitle?: string }) {
  const data = isIndustriesMainContent(props.content) ? props.content : null
  if (!data) return null

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main>
        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-grid-dark opacity-50" aria-hidden="true" />
          <div className="absolute inset-0 bg-mesh opacity-70" aria-hidden="true" />
          <div className="container-width section-padding relative z-10">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-2 animate-ping rounded-full bg-cyan-400 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-cyan-300" />
                  </span>
                  {data.hero.badge}
                </div>
                <div>
                  <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                    {data.hero.title}
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
                    {data.hero.description}
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {data.hero.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                    >
                      <div className="text-2xl font-semibold text-white">{metric.value}</div>
                      <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-cta-primary">
                    Explore Industries
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button className="btn-hero-outline">Request Industry Audit</button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 rounded-3xl bg-hero-gradient opacity-60" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_rgba(15,23,42,0.6)]">
                  <img
                    src={data.hero.dashboardImage}
                    alt="Industry dashboard"
                    className="h-[420px] w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white text-slate-900">
          <div className="container-width section-padding">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Challenges</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                {data.challenges.sectionTitle}
              </h2>
              <p className="mt-4 text-base text-slate-600">
                {data.challenges.sectionDescription}
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {data.challenges.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.colorClass}`}>
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                  <div className="mt-6 rounded-xl bg-slate-50 p-4">
                    <div className="text-xl font-semibold text-slate-900">{item.statValue}</div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {item.statLabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 text-slate-900">
          <div className="container-width section-padding">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Industries</p>
                <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                  {data.industries.sectionTitle}
                </h2>
              </div>
              <span className="text-sm font-semibold text-slate-500">Select a vertical to explore.</span>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {data.industries.items.map((industry) => (
                <div
                  key={industry.name}
                  className="group rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <span className="material-symbols-outlined text-2xl">{industry.icon}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-slate-900">{industry.name}</h3>
                  <p className="mt-3 text-sm text-slate-600">{industry.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {industry.outcome}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {data.proofStrip.length > 0 ? (
          <section className="bg-slate-950">
            <div className="container-width section-padding">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {data.proofStrip.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {item.label}
                    </div>
                    <div className="mt-3 text-xl font-semibold text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-white text-slate-900">
          <div className="container-width section-padding">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Comparison</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{data.comparison.title}</h2>
              <p className="mt-4 text-base text-slate-600">{data.comparison.description}</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Generic playbooks</div>
                <ul className="mt-4 space-y-3">
                  {data.comparison.badPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Industry architecture</div>
                <ul className="mt-4 space-y-3">
                  {data.comparison.goodPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 flow-curved opacity-20" aria-hidden="true" />
          <div className="container-width section-padding relative z-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
              <div className="space-y-6">
                <Quote className="h-10 w-10 text-cyan-300" />
                <blockquote className="text-2xl font-semibold leading-relaxed md:text-3xl">
                  {data.testimonial.quote}
                </blockquote>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                    {data.testimonial.author}
                  </div>
                  <div className="text-sm text-slate-400">{data.testimonial.role}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.testimonial.logos.map((logo) => (
                    <span key={logo} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                      {logo}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="h-72 w-72 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <img
                    src={data.testimonial.avatar}
                    alt={data.testimonial.author}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
