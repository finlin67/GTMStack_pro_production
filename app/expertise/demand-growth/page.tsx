import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Zap, Search, Rocket, Megaphone, Calendar, Compass, Layers, Sparkles, LineChart } from 'lucide-react'
import { SectionHeader } from '@/components/layout/Section'
import { SectionDark } from '@/components/layout/SectionDark'
import { SectionLight } from '@/components/layout/SectionLight'
import { Card } from '@/components/ui/Card'
import { CardGrid, CardGridItem } from '@/components/ui/CardGrid'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'
import { getExpertiseByPillar } from '@/content/expertise'
import { HeroDark } from '@/components/ui/HeroDark'
import { HERO_VISUALS } from '@/lib/heroVisuals'
import { ensureHeroVisualWithImage } from '@/lib/heroVisualDefaults'
import { AnimatedStatCard } from '@/components/ui/AnimatedStatCard'

export const metadata: Metadata = {
  title: 'Demand & Growth',
  description:
    'Demand generation, SEO, growth marketing, paid advertising, and events that scale pipeline.',
}

export default function DemandGrowthPillarPage() {
  const expertiseItems = getExpertiseByPillar('demand-growth')
  const featuredModules = expertiseItems.slice(0, 5)

  const framework = [
    { title: 'Map demand gen to buyer journey', description: 'Identify demand gen touchpoints at each stage—awareness, consideration, decision—and build frameworks aligned to journey and personas.' },
    { title: 'Build multi-channel programs', description: 'Develop integrated programs combining content, email, advertising, events, and sales outreach orchestrated at account and persona level.' },
    { title: 'Instrument attribution & measurement', description: 'Set up multi-touch attribution models tracking demand gen influence. Build dashboards showing performance by channel, campaign, and revenue.' },
    { title: 'Launch & optimize programs', description: 'Launch programs and optimize based on performance data. Test channels, messaging, offers, and CTAs. Scale successful programs.' },
    { title: 'Scale demand gen operations', description: 'Build operations that scale. Establish workflows, approval processes, and distribution channels integrated with automation and enablement.' },
  ]

  const proof = [
    { value: '+180%', label: 'MQL→SQL conversion', detail: 'Marketo + Paid Social (PRGX)' },
    { value: '+65%', label: 'SQL lift', detail: 'KPI dashboards + targeting (Salesforce)' },
    { value: '25%+', label: 'Pipeline growth', detail: 'demand programs repeatedly' },
    { value: '4 months', label: 'Time to results', detail: 'SQL lift achieved' },
  ]

  const pmmAiVars = `
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

  return (
    <div className="theme-demand-growth">
      <style dangerouslySetInnerHTML={{ __html: pmmAiVars }} />
      {/* Hero (Dark) */}
      <HeroDark
        className="pillar-dg-hero"
        label="Demand & Growth"
        title="Pipeline-building programs"
        titleHighlight="that scale"
        description="Demand generation, SEO, growth marketing, paid advertising, and events that combine multiple channels orchestrated to drive pipeline."
        primaryCta={{ label: 'View Expertise', href: '#expertise' }}
        secondaryCta={{ label: 'Get in Touch', href: '/contact' }}
        align="left"
        size="default"
        motif={(HERO_VISUALS.expertise['demand-growth']?.motif || HERO_VISUALS.defaults.subLevel.motif || 'signal')}
        rightVisual={ensureHeroVisualWithImage(HERO_VISUALS.expertise['demand-growth'] || HERO_VISUALS.defaults.subLevel, 'expertise')}
        slug="demand-growth"
      />

      {/* Pillar Promise + Signals (Light) */}
      <SectionLight variant="white" padding="lg">
        <div className="max-w-4xl">
          <SectionHeader
            label="Promise"
            title="Demand gen that generates the right leads, not just more leads"
            description="Marketo + Paid Social + lifecycle tuning delivered +180% MQL→SQL conversion YoY at PRGX. KPI dashboards + targeting improvements drove +65% SQL lift in 4 months at Salesforce. SEO/SEM leadership across multiple roles; demand programs delivered 25%+ pipeline growth repeatedly. The difference is systematic programs tied to revenue outcomes."
            className="mb-12"
          />

          <FadeIn>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Who this is for</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                    B2B SaaS scaling from founder-led to systematic demand gen
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                    Companies with marketing automation but low pipeline contribution
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                    Organizations needing multi-channel programs that orchestrate
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                    Sales-led companies requiring demand gen that supports sales
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Signals you need this</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                    Marketing generating leads but low conversion to opportunities
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                    High lead volume but sales says &quot;not qualified&quot; or &quot;not ready&quot;
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                    Single-channel programs running but not scaling or converting
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                    Lead gen costs increasing but pipeline not growing proportionally
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionLight>

      {/* Expertise Modules (Dark) */}
      <SectionDark className="pillar-dg-dark" variant="theater" padding="lg" motif="signal" accentOrb id="expertise">
        <SectionHeader
          label="Expertise"
          title="Demand & Growth Capabilities"
          description={`${expertiseItems.length} specialized areas within Demand & Growth.`}
          className="mb-12 text-white"
        />

        <CardGrid columns={3}>
          {expertiseItems.map((item) => (
            <CardGridItem key={item.slug}>
              <Card
                title={item.title}
                description={item.description ?? item.positioning ?? ''}
                href={`/expertise/${item.slug}`}
                icon={item.icon}
                tags={item.tags}
                badge={item.pillarLabel}
                variant={item.featured ? 'featured' : 'default'}
              />
            </CardGridItem>
          ))}
        </CardGrid>
      </SectionDark>

      {/* Mini Framework (Light) */}
      <SectionLight variant="slate" padding="lg">
        <SectionHeader
          label="Framework"
          title="How we build demand gen that scales"
          description="Systematic approach to multi-channel demand generation and optimization."
          className="mb-12"
        />

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {framework.map((step, idx) => (
            <StaggerItem key={idx}>
              <div className="card p-6 h-full hover:shadow-medium transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-lg shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionLight>

      {/* Proof Band (Dark) */}
      <SectionDark className="pillar-dg-dark" variant="stats" padding="lg" motif="signal" accentOrb>
        <SectionHeader
          label="Proof"
          title="Outcomes delivered"
          className="mb-12 text-white"
        />

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proof.map((stat, idx) => (
            <AnimatedStatCard key={idx} index={idx}>
              <div className="dark-card p-8 text-center transition-all duration-300">
                <div className="pmm-accent-text text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <p className="text-sm pmm-muted mb-1">{stat.label}</p>
                <p className="text-xs pmm-muted">{stat.detail}</p>
              </div>
            </AnimatedStatCard>
          ))}
        </StaggerContainer>
      </SectionDark>

      {/* CTA (Dark) */}
      <SectionDark className="pillar-dg-dark pillar-dg-cta" variant="cta" padding="lg" motif="signal" accentOrb>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
              Ready to scale demand gen?
            </h2>
            <p className="text-lg text-white/90">
              Let&apos;s discuss how demand & growth can drive pipeline for your business.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="pmm-cta-primary btn shadow-lg px-6 py-3 text-base rounded-xl group hover:opacity-90"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/expertise"
              className="btn-hero-outline"
            >
              View All Expertise
            </Link>
          </div>
        </div>
      </SectionDark>
    </div>
  )
}

