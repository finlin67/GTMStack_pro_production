'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * REVENUE ARCHITECT - INDUSTRIES MAIN PAGE
 * Content Shape: brand, hero, challenges, industries, proofStrip, comparison, testimonial
 */
export interface IndustriesMainContent {
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

export type IndustriesMainTemplateProps = {
  content: IndustriesMainContent | null
  pageTitle?: string
  theme?: string
  heroVisualId?: string
}

function PageTemplate({ content }: { content: IndustriesMainContent }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .text-gradient-gold {
          background: linear-gradient(to right, #EAB308, #F97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .industry-card:hover {
          box-shadow: 0 0 20px rgba(234, 179, 8, 0.15);
          border-color: rgba(234, 179, 8, 0.4);
        }
        .animate-spin-slow {
          animation: RA_spin 8s linear infinite;
        }
        @keyframes RA_spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />

      <div className="dark">
        <div className="bg-slate-50 dark:bg-[#0B132B] text-slate-900 dark:text-white font-sans selection:bg-[#1c6ef2] selection:text-white">
          <header className="sticky top-0 z-50 w-full border-b border-[#223149] bg-[#0B132B]/95 backdrop-blur-md">
            <div className="px-4 lg:px-12 py-3 flex items-center justify-between max-w-[1400px] mx-auto">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-white text-3xl">
                  {content.brand.logoIcon}
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                    Architecture
                  </span>
                  <h2 className="text-xl font-black tracking-tighter text-white">
                    REVENUE<span className="text-[#1c6ef2]">ARCHITECT</span>
                  </h2>
                </div>
              </div>
              <nav className="hidden lg:flex items-center gap-8">
                {['Home', 'Methodology', 'Expertise', 'Projects', 'Industries', 'About Me'].map(
                  (link) => (
                    <Link
                      key={link}
                      className={`text-sm font-medium transition-colors ${link === 'Industries' ? 'text-white border-b-2 border-[#1c6ef2] pb-1' : 'text-gray-300 hover:text-white'}`}
                      href={link === 'Home' ? '/' : link === 'Industries' ? '/industries' : '#'}
                    >
                      {link}
                    </Link>
                  )
                )}
              </nav>
              <Link
                href="/contact"
                className="bg-[#F97316] hover:bg-orange-600 text-white text-sm font-bold py-2.5 px-6 rounded transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
              >
                <span>Get in Touch</span>
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </Link>
            </div>
          </header>

          <section className="relative bg-[#0B132B] min-h-[680px] flex items-center overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none grayscale">
              <Image
                src={content.hero.backgroundImage}
                alt="Background"
                unoptimized
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B] via-[#0B132B] to-transparent pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 lg:px-12 w-full relative z-10 py-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
                    <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
                    <span className="text-[10px] font-bold text-[#EAB308] uppercase tracking-wider">
                      {content.hero.badge}
                    </span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
                    {content.hero.title.split('by')[0]}
                    <br />
                    <span className="text-gradient-gold">
                      by {content.hero.title.split('by')[1]?.trim()}
                    </span>
                  </h1>
                  <p className="text-lg text-gray-400 max-w-xl font-light leading-relaxed">
                    {content.hero.description}
                  </p>

                  <div className="flex flex-wrap gap-8 py-4 border-t border-white/10">
                    {content.hero.metrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-3xl font-bold text-white">{m.value}</span>
                        <span className="text-sm text-[#EAB308] font-medium">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-2">
                    <Link
                      href="#industries-grid"
                      className="bg-[#1c6ef2] hover:bg-blue-600 text-white font-bold py-3 px-8 rounded flex items-center gap-2 transition-all"
                    >
                      Explore Industries
                    </Link>
                    <Link
                      href="/methodology"
                      className="bg-transparent border border-gray-600 text-white hover:border-white hover:bg-white/5 font-bold py-3 px-8 rounded flex items-center gap-2 transition-all"
                    >
                      View Methodology
                    </Link>
                  </div>
                </div>

                <div className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 to-transparent rounded-full blur-3xl" />
                  <div className="relative w-full h-full p-8 border border-white/5 bg-white/5 backdrop-blur-sm rounded-xl flex flex-col justify-between overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="flex justify-between items-start z-10">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase">Active Node</span>
                        <span className="text-xl font-bold text-white">Global Markets</span>
                      </div>
                      <span className="material-symbols-outlined text-[#EAB308] animate-spin-slow">
                        hub
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                      <Image
                        src={content.hero.dashboardImage}
                        alt="Dashboard Interface"
                        unoptimized
                        fill
                        className="object-cover mix-blend-screen opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>

                    <div className="flex gap-4 mt-auto z-10">
                      <div className="bg-black/40 backdrop-blur px-4 py-2 rounded border border-white/10 flex-1">
                        <div className="text-[10px] text-gray-400 uppercase">Sector Growth</div>
                        <div className="text-[#EAB308] font-mono font-bold">+14.2%</div>
                      </div>
                      <div className="bg-black/40 backdrop-blur px-4 py-2 rounded border border-white/10 flex-1">
                        <div className="text-[10px] text-gray-400 uppercase">Efficiency</div>
                        <div className="text-[#1c6ef2] font-mono font-bold">98.4%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#E8EDF4] py-20">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-black text-3xl font-bold mb-4">
                    {content.challenges.sectionTitle}
                  </h2>
                  <p className="text-slate-600 text-lg">
                    {content.challenges.sectionDescription}
                  </p>
                </div>
                <Link
                  className="text-[#1c6ef2] font-bold flex items-center gap-1 hover:gap-2 transition-all"
                  href="/expertise"
                >
                  See All Challenges{' '}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {content.challenges.items.map((challenge, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div
                      className={`${challenge.colorClass.split(' ')[0]} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}
                    >
                      <span
                        className={`material-symbols-outlined ${challenge.colorClass.split(' ')[1]}`}
                      >
                        {challenge.icon}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{challenge.title}</h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      {challenge.description}
                    </p>
                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-100">
                      <span className="text-[#EAB308] font-bold">{challenge.statValue}</span>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">
                        {challenge.statLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="industries-grid" className="bg-[#071024] py-24 border-y border-white/5">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
              <div className="text-center mb-16">
                <span className="text-[#1c6ef2] font-semibold tracking-wider text-sm uppercase mb-2 block">
                  Our Expertise
                </span>
                <h2 className="text-white text-4xl font-bold">
                  {content.industries.sectionTitle}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.industries.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group industry-card bg-[#162447] border border-white/10 rounded-lg p-6 flex flex-col h-full transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#1c6ef2]/20 transition-colors">
                      <span className="material-symbols-outlined text-white group-hover:text-[#1c6ef2] transition-colors">
                        {item.icon}
                      </span>
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-6 flex-grow">{item.description}</p>
                    <div className="pt-4 border-t border-white/5 mt-auto">
                      <p className="text-[#EAB308] text-sm font-bold mb-3">
                        Outcome: {item.outcome}
                      </p>
                      <Link
                        className="text-white text-sm font-medium flex items-center gap-2 group-hover:text-[#1c6ef2] transition-colors"
                        href="/industries"
                      >
                        Explore Sector{' '}
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="bg-[#F1F4F8] border-y border-gray-200 overflow-hidden py-4">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-12 flex items-center justify-between gap-12 text-sm font-medium text-slate-600 whitespace-nowrap overflow-x-auto no-scrollbar">
              {content.proofStrip.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 shrink-0">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>
                    {item.label}: <strong className="text-slate-900">{item.value}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <section className="bg-[#0B132B] py-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                alt="Network Texture"
                unoptimized
                fill
                className="object-cover grayscale"
              />
            </div>
            <div className="max-w-5xl mx-auto px-4 lg:px-12 relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-white text-3xl font-bold mb-4">{content.comparison.title}</h2>
                <p className="text-gray-400">{content.comparison.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
                  <h3 className="text-gray-400 font-bold text-lg mb-6 border-b border-white/10 pb-4">
                    Generalist Growth Agencies
                  </h3>
                  <ul className="space-y-4">
                    {content.comparison.badPoints.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-400">
                        <span className="material-symbols-outlined text-red-500 text-xl shrink-0">
                          close
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#162447] border border-[#1c6ef2]/30 rounded-xl p-8 relative shadow-2xl shadow-[#1c6ef2]/10">
                  <div className="absolute -top-3 -right-3 bg-[#EAB308] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    The Standard
                  </div>
                  <h3 className="text-white font-bold text-lg mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1c6ef2]">verified</span>
                    REVENUEARCHITECT
                  </h3>
                  <ul className="space-y-4">
                    {content.comparison.goodPoints.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white">
                        <span className="material-symbols-outlined text-green-500 text-xl shrink-0">
                          check
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#F1F4F8] py-16">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-12 text-center">
              <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest mb-8">
                Trusted by Revenue Leaders At
              </p>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {content.testimonial.logos.map((logo) => (
                  <h3 key={logo} className="text-2xl font-black text-slate-800">
                    {logo}
                  </h3>
                ))}
              </div>

              <div className="mt-16 max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200 relative">
                <span className="material-symbols-outlined absolute -top-4 left-8 bg-[#EAB308] text-white p-2 rounded-full text-2xl shadow-lg">
                  format_quote
                </span>
                <p className="text-slate-800 text-xl font-medium leading-relaxed italic mb-6">
                  &quot;{content.testimonial.quote}&quot;
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={content.testimonial.avatar}
                      alt={content.testimonial.author}
                      unoptimized
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-slate-900 font-bold text-sm">{content.testimonial.author}</p>
                    <p className="text-slate-500 text-[10px]">{content.testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="bg-gradient-to-b from-[#0B132B] to-black pt-20 pb-10 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-12">
              <div className="flex flex-col items-center text-center mb-20">
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 tracking-tight">
                  Ready to Architect <br />
                  <span className="text-[#1c6ef2]">Predictable Revenue?</span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="bg-[#F97316] hover:bg-orange-600 text-white font-bold text-lg py-4 px-10 rounded-lg shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-1"
                  >
                    Get in Touch
                  </Link>
                  <Link
                    href="/case-studies"
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-lg py-4 px-10 rounded-lg backdrop-blur-sm border border-white/10 transition-all transform hover:-translate-y-1"
                  >
                    Read Case Studies
                  </Link>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-white">
                      {content.brand.logoIcon}
                    </span>
                    <span className="text-white font-bold text-lg">{content.brand.name}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">
                    The premier revenue architecture firm for high-growth B2B enterprises in
                    regulated industries.
                  </p>
                  <div className="flex gap-4">
                    <span aria-disabled="true" className="text-gray-400 hover:text-white transition-colors cursor-default">
                      <span className="material-symbols-outlined text-xl">share</span>
                    </span>
                    <span aria-disabled="true" className="text-gray-400 hover:text-white transition-colors cursor-default">
                      <span className="material-symbols-outlined text-xl">mail</span>
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4">Expertise</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {['Methodology', 'Audit Process', 'Tech Stack Review', 'Data Modeling'].map(
                      (item) => (
                        <li key={item}>
                          <Link
                            className="hover:text-[#1c6ef2] transition-colors"
                            href="/expertise"
                          >
                            {item}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4">Industries</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {['FinTech', 'Cybersecurity', 'Healthcare', 'Manufacturing'].map((item) => (
                      <li key={item}>
                        <Link
                          className="hover:text-[#1c6ef2] transition-colors"
                          href="/industries"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {['About', 'Careers', 'Contact', 'Privacy Policy'].map((item) => (
                      <li key={item}>
                        <Link
                          className="hover:text-[#1c6ef2] transition-colors"
                          href={item === 'Contact' ? '/contact' : item === 'About' ? '/about' : '#'}
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/5 mt-12 pt-8 text-center text-gray-600 text-[10px]">
                © {new Date().getFullYear()} Revenue Architect Inc. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default function IndustriesMainTemplate({
  content,
}: IndustriesMainTemplateProps) {
  if (!content) return null
  return <PageTemplate content={content} />
}
