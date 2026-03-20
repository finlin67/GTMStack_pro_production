'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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

export default function HomeStitchTemplate(_props: HomeStitchTemplateProps) {
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
      {/* SECTION 1: HERO */}
      <section
        className="relative min-h-[85vh] flex items-center overflow-hidden border-b border-white/5"
        style={{ backgroundColor: COLORS.backgroundDark }}
      >
        {/* glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(111,175,224,0.15) 0%, rgba(13,33,55,0) 70%)',
          }}
        />

        {/* grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* diagonal velocity lines */}
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

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-6 lg:px-20 py-20">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.signalBlue }} />
                50+ B2B Companies
              </span>
              <span
                className="bg-signal-blue/10 backdrop-blur-sm border border-signal-blue/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-2"
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
                Available Now
              </span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-black leading-[0.9] text-white tracking-tighter">
              Engineered <br />
              <span
                style={{
                  background: `linear-gradient(90deg, ${COLORS.signalBlue} 0%, ${COLORS.saffron} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Revenue
              </span>{' '}
              <br />
              Architecture.
            </h1>

            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              GTMStack.pro is a founder-led B2B GTM consulting practice helping companies build scalable revenue
              engines through precision engineering and data-forward methodology.
            </p>

            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">I need help with:</p>
              <div className="flex flex-wrap gap-2">
                {['Building Pipeline', 'Content Strategy', 'Sales Systems'].map((t) => (
                  <button
                    key={t}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm transition-all"
                    type="button"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contact"
                className="bg-[#F9C74F] text-[#0D2137] font-black px-8 py-4 rounded-xl text-lg hover:scale-105 transition-transform shadow-xl shadow-[#F9C74F]/20 inline-flex items-center gap-2"
              >
                Start a Conversation
              </Link>
              <Link
                href="/projects"
                className="bg-white/5 border border-white/10 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                Explore the Work <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Command panel UI */}
          <div className="relative hidden lg:block">
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
                  Revenue Engine Control // v4.0.2
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <PillarCard
                  color={COLORS.signalBlue}
                  icon="auto_awesome"
                  index="01"
                  label="CONTENT"
                  barWidth="66%"
                />
                <PillarCard
                  color={COLORS.saffron}
                  icon="bolt"
                  index="02"
                  label="DEMAND"
                  barWidth="50%"
                />
                <PillarCard
                  color={COLORS.midNavy}
                  icon="insights"
                  index="03"
                  label="STRATEGY"
                  barWidth="33%"
                />
                <PillarCard
                  color={COLORS.signalBlue}
                  icon="settings_suggest"
                  index="04"
                  label="SYSTEMS"
                  barWidth="75%"
                />
              </div>

              <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">System Output</span>
                  <span className="text-xl font-display font-black text-white">$4.2M Pipeline</span>
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
          </div>

          {/* decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F9C74F]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#6FAFE0]/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* SECTION 2: PROOF NUMBERS */}
      <section
        className="bg-[#112B46] py-16 px-6 lg:px-20 border-b border-white/5"
        style={{ backgroundColor: COLORS.deepNavy }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: '$500M+', label: 'Pipeline Generated' },
            { value: '50+', label: 'Companies Helped' },
            { value: '47%', label: 'Avg Growth Rate' },
            { value: '25Yrs', label: 'Experience' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center space-y-2">
              <span className="text-4xl md:text-5xl font-display font-black text-white">{s.value}</span>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: FOUR PILLARS */}
      <section className="bg-[#f6f7f8] py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs" style={{ color: COLORS.primary }}>
                Our Core Architecture
              </span>
              <h2 className="text-[#0D2137] text-4xl md:text-5xl font-display font-black leading-tight tracking-tighter">
                Four Pillars. <br />
                One Revenue Architecture.
              </h2>
            </div>
            <p className="text-slate-600 max-w-md">
              We don't just "do marketing." We architect systemic, repeatable revenue growth using a cross-functional stack.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PillarTile
              icon="edit_note"
              accent={COLORS.signalBlue}
              pill="Engineered"
              title="Content & Engagement"
              desc="Building the narrative engine that captures mindshare and creates category authority."
              bullets={['ICP Definition', 'Narrative Design', 'Social Velocity']}
            />
            <PillarTile
              icon="bolt"
              accent={COLORS.saffron}
              pill="Engineered"
              title="Demand & Growth"
              desc="Precision targeting and multi-channel orchestration to scale high-intent pipeline."
              bullets={['ABM Execution', 'Paid Precision', 'Lead Capture']}
            />
            <PillarTile
              icon="query_stats"
              accent={COLORS.midNavy}
              pill="Engineered"
              title="Strategy & Insights"
              desc="Data-driven roadmaps that align your market position with actual buyer behavior."
              bullets={['Market Analysis', 'GTM Audit', 'Attribution']}
            />
            <PillarTile
              icon="layers"
              accent={COLORS.primary}
              pill="Engineered"
              title="Systems & Operations"
              desc="A frictionless tech stack designed to eliminate data silos and accelerate sales velocity."
              bullets={['CRM Optimization', 'Automation', 'Analytics Stack']}
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: METHODOLOGY */}
      <section
        className="bg-[#0D2137] py-24 px-6 lg:px-20 overflow-hidden relative"
        style={{ backgroundColor: COLORS.backgroundDark }}
      >
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-white text-4xl md:text-5xl font-display font-black mb-6">
            How We Build a Revenue Architecture
          </h2>
          <div className="w-24 h-1 bg-[#F9C74F] mx-auto" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="hidden lg:block absolute top-10 left-0 w-full h-px border-t border-dashed border-white/20 z-0" />
          <div className="grid lg:grid-cols-4 gap-12 relative z-10">
            <MethodStep
              bg="#112B46"
              border="rgba(255,255,255,0.10)"
              accent={COLORS.signalBlue}
              icon="map"
              step="01. Map"
              desc="Auditing current GTM gaps and mapping the future state architecture."
            />
            <MethodStep
              bg="#112B46"
              border="rgba(255,255,255,0.10)"
              accent={COLORS.saffron}
              icon="architecture"
              step="02. Design"
              desc="Prototyping campaigns, playbooks, and systems for growth."
            />
            <MethodStep
              bg="#112B46"
              border="rgba(255,255,255,0.10)"
              accent={COLORS.midNavy}
              icon="precision_manufacturing"
              step="03. Instrument"
              desc="Building out the tech stack and deploying content engines."
            />
            <MethodStep
              bg="#112B46"
              border="rgba(255,255,255,0.10)"
              accent={COLORS.signalBlue}
              icon="rocket_launch"
              step="04. Run"
              desc="Iterating based on live signals to compound revenue results."
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: INDUSTRIES (Marquee) */}
      <section
        className="bg-[#f6f7f8] py-12 overflow-hidden border-y border-slate-200"
        style={{ backgroundColor: COLORS.backgroundLight }}
      >
        <div className="overflow-hidden">
          <div className="marquee-anim flex gap-8 items-center">
            {[
              'B2B SAAS',
              'FINTECH',
              'CYBERSECURITY',
              'HEALTH TECH',
              'MANUFACTURING',
              'HR TECH',
              'LOGISTICS',
              'MARTECH',
              'B2B SAAS',
              'FINTECH',
              'CYBERSECURITY',
              'HEALTH TECH',
              'MANUFACTURING',
              'HR TECH',
              'LOGISTICS',
              'MARTECH',
            ].map((t, idx) => (
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

      {/* SECTION 6: CASE STUDY */}
      <section className="bg-[#112B46] py-24 px-6 lg:px-20 overflow-hidden" style={{ backgroundColor: COLORS.deepNavy }}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0D2137] rounded-3xl overflow-hidden border border-white/5 flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-1/3 bg-[#6FAFE0]/10 p-12 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r border-white/5">
              <span className="text-[120px] font-display font-black leading-none" style={{ background: 'linear-gradient(90deg, #6FAFE0 0%, #F9C74F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                8.4x
              </span>
              <span className="text-white text-xl font-bold uppercase tracking-widest mt-4">Pipeline Growth</span>
              <p className="text-slate-400 mt-2 text-sm">Series B FinTech Client</p>
            </div>
            <div className="lg:w-2/3 p-12 flex flex-col justify-center">
              <div className="bg-[#F9C74F]/20 text-[#F9C74F] text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-6 tracking-widest uppercase">
                Case Study: Flagship Result
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-6">
                From Fragmented Tactics to a Unified Revenue Engine.
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                The challenge was a disjointed GTM strategy that failed to bridge the gap between marketing interest and sales conversion.
                We re-architected their entire ICP targeting and content delivery mechanism.
              </p>
              <div className="border-l-4 border-[#6FAFE0] pl-6 mb-8 italic text-white/90 text-lg">
                "GTMStack.pro didn't just give us a strategy; they built the actual machinery. Our sales velocity increased by 40% in the first two quarters."
              </div>
              <button className="text-[#6FAFE0] font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
                Read the Full Narrative <span className="material-symbols-outlined" aria-hidden="true">east</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: INSIGHTS */}
      <section className="bg-white py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[#6FAFE0] font-bold tracking-[0.2em] uppercase text-xs">Architect's Journal</span>
              <h2 className="text-[#0D2137] text-4xl font-display font-black mt-2">Latest Insights</h2>
            </div>
            <button className="hidden md:block text-[#0D2137] font-bold border-b-2 border-[#0D2137] pb-1">
              View all posts
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <InsightCard
              tag="Strategy"
              title="The Content Engine: How to build a compounding asset."
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuD6dikHIKEBSi0gTC2mFqRG-br58NZWQbdrvOwea_vTBxFfNRh0wEc6FsWPmXYOrawofBqeMM4aCu89o--1bMAnfpofNAfFTAHLIHRoJLqEqgT5mQ3E4yuxPg2UBu5_L4c9Ulu4lPRU4OZPWpoZ0m2gbEy8ateGz6ppizj3iEQazh1yoUVPdrOfqk31gM_nqKLHWS9AZ2eEVJAyZ_kcP4ftGxkz-VduYJI9CciaZY3SNmlKO55AZ9tp1TBmfVB1x0fy_D6CRsDiqqo"
            />
            <InsightCard
              tag="Insights"
              title="Why your ICP is lying to you (and what to do about it)."
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuDhdmOVYs4v5tGyiugqkEh2bAp2_T7JAbSgOyBgSbrhM9S-ulAFyqaLIFZERrwvBBKmWZ7FspmRRH2hf4zIN462Ggl6kfmmkCHiQvG95o1AAgWpcoABvnWIlPmXeJEBIJvbSABkPeed3Pba6J8zLRvtV6KIqkP6S3ZrVumY-Bk21mDjfW6Tvam1pKKzUTzDNcy6plxWTZL5_HzY1fYPqDWWFXHs6aF6KASfNFigwz3vls62LBYjleSy2XafuO08tRikBpXW1jds0_o"
            />
            <InsightCard
              tag="Systems"
              title="Headless MarTech: The future of revenue operations."
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuCkk9p_ImQ3-t0n5zpj-0Oler5s5QPDhgO7IvBpyUd00Non9prRqORflPkJgp-NmVGujJ1iW5R7VIaRG1WNHIxP2jHKqW16boF0H7mHJOlsXQlOTK9ptjZGEZKc9UK7hNffZ27fgHN11najyCTCEgSoTl9KGOFQ89v_nQ01uYwMATao9SG3Da4wwFQ_M5yBKWNrGqHY9d3z7g8-vxQzHYIu5Lr5m3NpGnmTjLxealb7w8wYuwuUSbjBrPuhczgrFgdCX_0XO-w7Dj8"
            />
          </div>
        </div>
      </section>

      {/* SECTION 8: SOCIAL PROOF TICKER */}
      <section className="bg-[#112B46] py-8 overflow-hidden" style={{ backgroundColor: COLORS.deepNavy }}>
        <div className="marquee gap-16">
          <div className="marquee-anim flex gap-16 items-center">
            {[
              '2.5X PIPELINE FOR SAAS INC',
              '40% COST REDUCTION IN ACQUISITION',
              '+$12M ARR ADDED IN 12 MONTHS',
              '60% IMPROVEMENT IN LTV/CAC',
            ].map((t) => (
              <span key={t} className="text-sm font-bold text-white/40 flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }} />
                {t}
              </span>
            ))}
          </div>
          <div className="marquee-anim flex gap-16 items-center">
            {[
              '2.5X PIPELINE FOR SAAS INC',
              '40% COST REDUCTION IN ACQUISITION',
              '+$12M ARR ADDED IN 12 MONTHS',
              '60% IMPROVEMENT IN LTV/CAC',
            ].map((t) => (
              <span key={`${t}-dup`} className="text-sm font-bold text-white/40 flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="bg-[#0D2137] py-32 px-6 lg:px-20 relative overflow-hidden text-center" style={{ backgroundColor: COLORS.backgroundDark }}>
        {/* concentric ring background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none opacity-20">
          <div className="absolute inset-0 rounded-full border" style={{ borderColor: 'rgba(111,175,224,1)' }} />
          <div className="absolute inset-[20px] rounded-full border" style={{ borderColor: 'rgba(111,175,224,0.5)' }} />
          <div className="absolute inset-[40px] rounded-full border" style={{ borderColor: 'rgba(111,175,224,0.3)' }} />
          <div className="absolute inset-[60px] rounded-full border" style={{ borderColor: 'rgba(111,175,224,0.1)' }} />
        </div>

        <div className="relative max-w-3xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-tight tracking-tighter">
            Ready to Build a Revenue Architecture That Compounds?
          </h2>
          <p className="text-xl text-slate-400">Stop testing tactics. Start engineering growth.</p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="bg-[#F9C74F] text-[#0D2137] font-black px-12 py-6 rounded-2xl text-2xl hover:scale-110 transition-transform shadow-[0_0_50px_rgba(249,199,79,0.3)] inline-flex items-center gap-2"
            >
              Start a Conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
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
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${accent}1A`, color: accent }}>
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

function InsightCard({ tag, title, img }: { tag: string; title: string; img: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[16/10] bg-slate-100 rounded-xl mb-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0D2137]/20 to-transparent" />
        <img alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={img} />
      </div>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">{tag}</span>
      <h3 className="text-xl font-display font-bold text-[#0D2137] group-hover:text-[#6FAFE0] transition-colors">
        {title}
      </h3>
    </div>
  )
}

