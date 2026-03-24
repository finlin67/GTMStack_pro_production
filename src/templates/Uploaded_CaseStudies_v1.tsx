'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import HeroVisualByRoute from '@/src/components/hero/HeroVisualByRoute.client'
import type { CaseStudyItem } from '@/lib/types'

function isCaseStudyList(value: unknown): value is CaseStudyItem[] {
  return Array.isArray(value)
}

export default function Template(props: { content?: unknown; pageTitle?: string; heroVisualId?: string }) {
  const items = isCaseStudyList(props.content) ? props.content : []
  const featured = items.filter((item) => item.featured)
  const allItems = items.length > 0 ? items : featured

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main>
        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0 bg-grid-dark opacity-50" aria-hidden="true" />
          <div className="absolute inset-0 bg-mesh opacity-70" aria-hidden="true" />
          <div className="container-width section-padding relative z-10">
            <div className="grid gap-12 items-center lg:grid-cols-[1.1fr_0.9fr]">
              <div className="max-w-3xl space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">Case studies</p>
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl">Outcome-first GTM results</h1>
              <p className="text-lg text-slate-300 md:text-xl">
                {items.length > 0
                  ? `Outcomes across ${items.length} engagements, spanning industry GTM, revenue operations, and growth systems.`
                  : 'Curated GTM outcomes and proof points.'}
              </p>
              <div className="flex flex-wrap gap-3">
                {featured.slice(0, 3).map((study) => (
                  <span
                    key={study.slug}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
                  >
                    {study.client}
                  </span>
                ))}
              </div>
            </div>
              {props.heroVisualId ? (
                <div className="hidden lg:flex justify-center">
                  <HeroVisualByRoute heroVisualId={props.heroVisualId} />
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {featured.length > 0 ? (
          <section className="bg-white text-slate-900">
            <div className="container-width section-padding">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Featured</p>
                  <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Standout results</h2>
                </div>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-500"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {featured.slice(0, 4).map((study) => (
                  <Link
                    key={study.slug}
                    href={`/case-studies/${study.slug}`}
                    className="group rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {study.client}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-cyan-600">
                      {study.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600">{study.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {study.metrics.slice(0, 2).map((metric) => (
                        <span
                          key={metric.label}
                          className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
                        >
                          {metric.value} {metric.label}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-slate-50 text-slate-900">
          <div className="container-width section-padding">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">All case studies</p>
                <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Browse outcomes</h2>
              </div>
              <span className="text-sm text-slate-500">{items.length} total engagements</span>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allItems.map((study) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {study.client} · {study.year}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-cyan-600">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">{study.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {study.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

