"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { Target, Search, MousePointerClick, TrendingUp, Calendar, FlaskConical, ArrowRight } from 'lucide-react';
import ExpertiseTopicBreadcrumb, {
  type ExpertiseTopicBreadcrumbProps,
} from '@/src/components/expertise/ExpertiseTopicBreadcrumb';

export interface NavLink {
  label: string;
  href: string;
}

export interface Discipline {
  title: string;
  body: string;
  icon: 'Target' | 'Search' | 'MousePointerClick' | 'TrendingUp' | 'Calendar';
}

export interface FunnelStage {
  label: string;
}

export interface KPI {
  value: string;
  label: string;
}

export interface ScaleColumn {
  value: string;
  title: string;
  description: string;
  icon: 'Search' | 'MousePointerClick' | 'FlaskConical';
}

export interface TemplateContent {
  nav: {
    logoText: string;
    logoHighlight: string;
    links: NavLink[];
    buttonText: string;
    buttonHref: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText: string;
    secondaryButtonHref: string;
    imageSrc: string;
    imageAlt: string;
  };
  subDisciplines: {
    eyebrow: string;
    items: Discipline[];
  };
  funnel: {
    titleLine1: string;
    titleLine2: string;
    stages: FunnelStage[];
    kpis: KPI[];
  };
  scale: {
    title: string;
    description: string;
    columns: ScaleColumn[];
  };
  cta: {
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryLinkText: string;
    secondaryLinkHref: string;
  };
}

const DEFAULT_CONTENT: TemplateContent = {
  nav: {
    logoText: "GTMStack",
    logoHighlight: ".pro",
    links: [
      { label: "Strategy", href: "#" },
      { label: "Demand & Growth", href: "#" },
      { label: "RevOps", href: "#" },
      { label: "About", href: "#" }
    ],
    buttonText: "Explore the framework",
    buttonHref: "#"
  },
  hero: {
    eyebrow: "Demand & Growth",
    titleLine1: "Transform Market Attention Into",
    titleLine2: "Engineered Intent",
    description: "We build scalable demand generation engines that capture, nurture, and convert high-value accounts with precision.",
    primaryButtonText: "Build My Pipeline",
    primaryButtonHref: "#",
    secondaryButtonText: "View Case Studies",
    secondaryButtonHref: "#",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "Isometric Funnel Visualization"
  },
  subDisciplines: {
    eyebrow: "What We Do",
    items: [
      { title: "Demand Generation", body: "Full-funnel strategies to capture and convert.", icon: "Target" },
      { title: "SEO", body: "Technical and content-driven organic growth.", icon: "Search" },
      { title: "Paid Advertising", body: "High-ROI campaigns across search and social.", icon: "MousePointerClick" },
      { title: "Growth Marketing", body: "Data-driven experiments for rapid scaling.", icon: "TrendingUp" },
      { title: "Event Marketing", body: "Strategic field marketing and webinars.", icon: "Calendar" }
    ]
  },
  funnel: {
    titleLine1: "From ",
    titleLine2: "Signal to Pipeline",
    stages: [
      { label: "Awareness" },
      { label: "Intent" },
      { label: "Engagement" },
      { label: "Pipeline" }
    ],
    kpis: [
      { value: "312%", label: "Increase in Qualified Pipeline" },
      { value: "45%", label: "Reduction in CAC" },
      { value: "2.4x", label: "Faster Sales Cycle" }
    ]
  },
  scale: {
    title: "Growth Experimentation at Scale",
    description: "We deploy rapid testing frameworks across all channels to identify and scale what works, discarding what doesn't.",
    columns: [
      { icon: "Search", value: "10x", title: "SEO Growth", description: "Compounding organic traffic through programmatic and editorial content." },
      { icon: "MousePointerClick", value: "-40%", title: "Paid / SEM", description: "Optimized bidding and creative testing to drive down acquisition costs." },
      { icon: "FlaskConical", value: "50+", title: "Growth Experiments", description: "Continuous A/B testing across landing pages, emails, and product flows." }
    ]
  },
  cta: {
    titleLine1: "Turn Attention Into ",
    titleLine2: "Engineered Intent",
    description: "Ready to build a scalable demand generation engine? Let's discuss your growth targets and how we can engineer the pipeline to hit them.",
    primaryButtonText: "Start Building Pipeline",
    primaryButtonHref: "#",
    secondaryLinkText: "See Demand Gen Case Studies",
    secondaryLinkHref: "#"
  }
};

const GROWTH_BG = '#121b2f';
const GROWTH_BG_ALT = '#19243a';
const GROWTH_PANEL_SOLID = '#1a2539';
const GROWTH_SURFACE = '#f8f9fa';
const GROWTH_TEXT_DARK = '#191c1d';
const GROWTH_TEXT_MUTED = '#7a849d';
const GROWTH_TEXT_SOFT = '#45464d';
const GROWTH_AMBER = '#FCD34D';
const GROWTH_GOLD = '#F59E0B';
const GROWTH_OUTLINE = '#c6c6cd';
const GROWTH_GREEN = '#10B981';
const GROWTH_BLUE = '#0EA5E9';
const GROWTH_BLUE_DEEP = '#1E40AF';

const IconMap = {
  Target,
  Search,
  MousePointerClick,
  TrendingUp,
  Calendar,
  FlaskConical
};

function isDemandGrowthTemplateContent(c: unknown): c is TemplateContent {
  return (
    !!c &&
    typeof c === 'object' &&
    'hero' in c &&
    typeof (c as TemplateContent).hero === 'object' &&
    'eyebrow' in (c as TemplateContent).hero
  );
}

export default function Template({ 
  content, 
  pageTitle,
  expertiseBreadcrumb,
}: { 
  content?: unknown; 
  pageTitle?: string; 
  expertiseBreadcrumb?: ExpertiseTopicBreadcrumbProps;
}) {
  const data = isDemandGrowthTemplateContent(content) ? content : DEFAULT_CONTENT;
  const isDemandGrowthPillar =
    pageTitle === 'Demand & Growth' ||
    data.hero.titleLine1.trim() === 'Demand & Growth' ||
    data.hero.eyebrow.toLowerCase().includes('demand & growth');

  const demandGenSteps = [
    { id: '01', label: 'Awareness', color: '#D97706', offset: 'ml-0' },
    { id: '02', label: 'Interest', color: '#84CC16', offset: 'ml-3' },
    { id: '03', label: 'Consideration', color: '#059669', offset: 'ml-6' },
    { id: '04', label: 'MQL', color: '#0D9488', offset: 'ml-9' },
    { id: '05', label: 'SQL', color: '#0EA5E9', offset: 'ml-12' },
    { id: '06', label: 'Opportunity', color: '#2563EB', offset: 'ml-16' },
    { id: '07', label: 'Customer', color: '#1E40AF', offset: 'ml-20' },
  ];

  const abmOrbitLabels = [
    { label: 'Target Account List', className: '-top-2 left-2 md:-top-3 md:left-0', bg: '#D97706', text: '#ffffff' },
    { label: 'Research', className: 'top-[22%] -right-2 md:-right-3', bg: '#059669', text: '#ffffff' },
    { label: 'Personalized Outreach', className: 'bottom-[30%] -left-3 md:-left-5', bg: '#ffffff', text: '#111111' },
    { label: 'Multi-Thread Engagement', className: '-bottom-2 right-[14%] md:-bottom-3 md:right-[18%]', bg: '#0D9488', text: '#ffffff' },
    { label: 'Account Engagement', className: 'top-[58%] -right-4 md:-right-6', bg: '#0EA5E9', text: '#ffffff' },
    { label: 'Opportunity', className: 'top-1 right-[16%] md:top-0 md:right-[18%]', bg: '#ffffff', text: '#111111' },
  ];

  return (
    <div className="min-h-screen text-white font-sans" style={{ backgroundColor: GROWTH_BG }}>
      {pageTitle && <title>{pageTitle}</title>}
      <style
        // Local gradient for Demand & Growth accents (orange → amber gold)
        dangerouslySetInnerHTML={{
          __html: `
          .demand-text-gradient {
            background: linear-gradient(90deg, #F59E0B 0%, #FCD34D 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .demand-glass {
            backdrop-filter: blur(20px);
            background: rgba(18, 27, 47, 0.6);
            border: 1px solid rgba(252, 211, 77, 0.14);
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.08),
              0 24px 80px rgba(0, 0, 0, 0.24);
          }
        `,
        }}
      />
      
      <main>
        <section className="relative flex min-h-[620px] items-center overflow-hidden" style={{ backgroundColor: GROWTH_BG }}>
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(252,211,77,0.35) 0, rgba(252,211,77,0.35) 1px, transparent 1px, transparent 16px)' }}
          />
          <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-16 md:px-16 md:py-18">
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-8">
              <div className="w-full lg:w-[52%]">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  {expertiseBreadcrumb ? (
                    <ExpertiseTopicBreadcrumb {...expertiseBreadcrumb} className="mb-6" />
                  ) : (
                    <div className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 inline-block rounded-sm px-2.5 py-1" style={{ backgroundColor: 'rgba(252,211,77,0.12)', color: GROWTH_AMBER }}>
                      {data.hero.eyebrow}
                    </div>
                  )}
                  <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] mb-3 max-w-3xl">
                    <span className="block text-white">{data.hero.titleLine1}</span>
                    {data.hero.titleLine2 ? (
                      <span className="mt-2 block text-2xl md:text-3xl lg:text-4xl demand-text-gradient">
                        {data.hero.titleLine2}
                      </span>
                    ) : null}
                  </h1>
                  <p className="mb-8 max-w-[520px] whitespace-pre-line text-base leading-relaxed md:text-lg" style={{ color: GROWTH_TEXT_MUTED }}>
                    {data.hero.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={data.hero.primaryButtonHref}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-heading font-semibold transition-all duration-300 hover:scale-[1.03]"
                      style={{ backgroundColor: GROWTH_AMBER, color: GROWTH_TEXT_DARK }}
                    >
                      {data.hero.primaryButtonText} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link 
                      href={data.hero.secondaryButtonHref}
                      className="h-12 px-8 border-[1.5px] hover:border-white text-white font-heading font-bold text-[15px] rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ borderColor: 'rgba(255,255,255,0.45)' }}
                    >
                      {data.hero.secondaryButtonText}
                    </Link>
                  </div>
                </motion.div>
              </div>
              <div className="w-full lg:w-[48%]">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="demand-glass w-full max-w-[580px] aspect-[580/460] rounded-2xl relative overflow-hidden flex items-center justify-center mx-auto"
                >
                  <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(circle_at_center, rgba(252,211,77,0.1) 0%, transparent 70%)' }} />
                  <img 
                    src={data.hero.imageSrc} 
                    alt={data.hero.imageAlt} 
                    className="w-full h-full object-cover opacity-20 mix-blend-screen relative z-0"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 min-h-[220px] md:py-18" style={{ backgroundColor: GROWTH_SURFACE }}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-16">
            <div className="font-heading text-[11px] font-semibold uppercase tracking-[0.2em] mb-8" style={{ color: GROWTH_TEXT_MUTED }}>
              {data.subDisciplines.eyebrow}
            </div>
            <div className="flex flex-col lg:flex-row gap-4 overflow-x-auto pb-4 snap-x">
              {data.subDisciplines.items.map((item, i) => {
                const IconComponent = IconMap[item.icon];
                return (
                  <div 
                    key={i}
                    className="flex-none w-[280px] lg:flex-1 rounded-xl p-5 pl-6 transition-all duration-300 hover:-translate-y-1 snap-start cursor-pointer group"
                    style={{ backgroundColor: '#ffffff', borderLeft: `4px solid ${GROWTH_GOLD}`, boxShadow: '0 4px 18px rgba(0,0,0,0.04)' }}
                  >
                    <div className="w-8 h-8 rounded flex items-center justify-center mb-4 transition-colors" style={{ backgroundColor: 'rgba(245,158,11,0.1)' }}>
                      <IconComponent className="w-4 h-4 transition-colors" style={{ color: GROWTH_GOLD }} />
                    </div>
                    <h3 className="font-heading font-semibold text-[15px] mb-2" style={{ color: GROWTH_TEXT_DARK }}>
                      {item.title}
                    </h3>
                    <p className="font-sans text-[13px] leading-relaxed" style={{ color: GROWTH_TEXT_SOFT }}>
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {isDemandGrowthPillar ? (
          <section className="py-16 md:py-18" style={{ backgroundColor: GROWTH_BG }}>
            <div className="max-w-[1200px] mx-auto px-6 md:px-16">
              <div className="grid gap-5 lg:grid-cols-2">
                <div
                  className="relative overflow-hidden rounded-[20px] border p-7 md:p-8"
                  style={{ backgroundColor: GROWTH_BG_ALT, borderColor: 'rgba(252,211,77,0.12)', boxShadow: '0 18px 48px rgba(0,0,0,0.18)' }}
                >
                  <div className="absolute right-0 top-0 h-24 w-24 blur-3xl" style={{ backgroundColor: 'rgba(245,158,11,0.14)' }} />
                  <div className="relative z-10">
                    <h2 className="mb-2 font-heading text-2xl font-extrabold uppercase tracking-tight text-white md:text-[2rem]">
                      Demand Generation
                    </h2>
                    <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.22em] md:text-[11px]" style={{ color: GROWTH_GREEN }}>
                      Broad audience capture and qualification
                    </p>

                    <div className="mx-auto flex max-w-sm flex-col gap-2 py-3 md:py-4">
                      {demandGenSteps.map((step) => (
                        <div
                          key={step.id}
                          className={`flex h-11 items-center px-4 shadow-sm transition-transform duration-200 hover:translate-x-1 md:h-[52px] ${step.offset}`}
                          style={{ backgroundColor: step.color }}
                        >
                          <span className="mr-4 text-[10px] font-black opacity-60">{step.id}</span>
                          <span className="text-[11px] font-black uppercase tracking-[0.16em] text-white md:text-[12px]">
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: GROWTH_AMBER }}>
                        Core Philosophy
                      </p>
                      <p className="text-sm leading-6 md:text-[15px] md:leading-7" style={{ color: GROWTH_TEXT_MUTED }}>
                        Optimized for volume and velocity. Uses content and automated lead scoring to filter a broader market into a qualified sales pipeline.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="relative overflow-hidden rounded-[20px] border p-7 md:p-8"
                  style={{ backgroundColor: GROWTH_BG_ALT, borderColor: 'rgba(252,211,77,0.12)', boxShadow: '0 18px 48px rgba(0,0,0,0.18)' }}
                >
                  <div className="absolute bottom-0 left-0 h-24 w-24 blur-3xl" style={{ backgroundColor: 'rgba(14,165,233,0.14)' }} />
                  <div className="relative z-10">
                    <h2 className="mb-2 font-heading text-2xl font-extrabold uppercase tracking-tight text-white md:text-[2rem]">
                      Account-Based Marketing
                    </h2>
                    <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.22em] md:text-[11px]" style={{ color: GROWTH_BLUE }}>
                      Focused engagement within high-value accounts
                    </p>

                    <div className="flex items-center justify-center py-2 md:py-3">
                      <div className="relative aspect-square w-full max-w-[300px] md:max-w-[320px]">
                        <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: 'rgba(217,119,6,0.4)' }} />
                        <div className="absolute inset-[12%] rounded-full border-2" style={{ borderColor: 'rgba(5,150,105,0.4)' }} />
                        <div className="absolute inset-[24%] rounded-full border-2" style={{ borderColor: 'rgba(13,148,136,0.4)' }} />
                        <div className="absolute inset-[36%] rounded-full border-2" style={{ borderColor: 'rgba(14,165,233,0.4)' }} />
                        <div className="absolute inset-[48%] rounded-full border-2" style={{ borderColor: 'rgba(30,64,175,0.4)' }} />

                        <div
                          className="absolute left-1/2 top-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 p-3 text-center shadow-lg md:h-28 md:w-28"
                          style={{ backgroundColor: GROWTH_BLUE_DEEP, borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                          <span className="text-[9px] font-black uppercase leading-tight tracking-[0.16em] text-white md:text-[10px]">
                            Expansion
                            <br />&amp; Success
                          </span>
                        </div>

                        {abmOrbitLabels.map((item) => (
                          <div
                            key={item.label}
                            className={`absolute rounded-sm px-2.5 py-1.5 shadow-lg md:px-3 md:py-2 ${item.className}`}
                            style={{ backgroundColor: item.bg, color: item.text }}
                          >
                            <span className="text-[8px] font-black uppercase tracking-[0.1em] md:text-[9px]">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: GROWTH_GREEN }}>
                        Core Philosophy
                      </p>
                      <p className="text-sm leading-6 md:text-[15px] md:leading-7" style={{ color: GROWTH_TEXT_MUTED }}>
                        Optimized for contract value and retention. Treats individual accounts as markets of one, aligning marketing and sales to penetrate and expand.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-[2fr_1fr]">
                <div
                  className="relative overflow-hidden rounded-[20px] border p-7 md:p-8"
                  style={{ background: 'linear-gradient(135deg, #18315f 0%, #111a2e 100%)', borderColor: 'rgba(14,165,233,0.18)', boxShadow: '0 18px 48px rgba(0,0,0,0.16)' }}
                >
                  <div className="absolute right-5 top-5 text-4xl opacity-20" style={{ color: GROWTH_BLUE }}>
                    ϟ
                  </div>
                  <div className="relative z-10">
                    <h3 className="mb-4 font-heading text-[1.7rem] font-extrabold uppercase tracking-tight text-white md:text-2xl">
                      The Hybrid Advantage
                    </h3>
                    <p className="mb-7 max-w-xl text-sm leading-6 md:text-[15px] md:leading-7" style={{ color: '#a1a1aa' }}>
                      The most successful organizations don&apos;t choose one. They synchronize both: Demand Gen to build brand authority and fill the mid-market, while ABM secures the whale accounts.
                    </p>
                    <div className="flex flex-wrap items-center gap-6 md:gap-8">
                      <div className="flex flex-col">
                        <span className="text-4xl font-black tracking-tight md:text-5xl" style={{ color: GROWTH_BLUE }}>
                          45%
                        </span>
                        <span className="mt-2 text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'rgba(14,165,233,0.65)' }}>
                          Efficiency Lift
                        </span>
                      </div>
                      <div className="hidden h-12 w-px md:block" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                      <div className="flex flex-col">
                        <span className="text-4xl font-black tracking-tight md:text-5xl" style={{ color: GROWTH_GREEN }}>
                          3x
                        </span>
                        <span className="mt-2 text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'rgba(16,185,129,0.65)' }}>
                          ACV Growth
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="relative flex flex-col justify-center overflow-hidden rounded-[20px] border p-7"
                  style={{ backgroundColor: GROWTH_BG_ALT, borderColor: 'rgba(252,211,77,0.12)', boxShadow: '0 18px 48px rgba(0,0,0,0.16)' }}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm" style={{ backgroundColor: GROWTH_BLUE }}>
                    <span className="text-3xl font-black text-white">↗</span>
                  </div>
                  <h3 className="mb-3 font-heading text-lg font-extrabold uppercase tracking-[0.18em] text-white">
                    Metrics Matter
                  </h3>
                  <p className="text-sm leading-6" style={{ color: GROWTH_TEXT_MUTED }}>
                    Track CPL and velocity for Demand Gen. For ABM, focus on Account Engagement Score and multi-threaded relationship depth.
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="py-16 min-h-[480px] md:py-20" style={{ backgroundColor: GROWTH_BG }}>
            <div className="max-w-[1200px] mx-auto px-6 md:px-16">
              <h2 className="font-heading font-bold text-4xl md:text-[48px] text-center mb-16">
                <span className="text-white">{data.funnel.titleLine1}</span>
                <span className="demand-text-gradient">{data.funnel.titleLine2}</span>
              </h2>
              <div className="relative max-w-[600px] mx-auto mb-24 flex flex-col items-center">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
                  <div className="absolute bottom-0 left-[30%] w-px h-[120%] origin-bottom -rotate-15" style={{ backgroundColor: 'rgba(252,211,77,0.26)' }} />
                  <div className="absolute bottom-0 left-[50%] w-px h-[150%] origin-bottom -rotate-15" style={{ backgroundColor: 'rgba(252,211,77,0.26)' }} />
                  <div className="absolute bottom-0 left-[70%] w-px h-[100%] origin-bottom -rotate-15" style={{ backgroundColor: 'rgba(252,211,77,0.26)' }} />
                </div>
                <div className="relative z-10 flex flex-col gap-1 items-center w-full">
                  <div className="relative flex justify-center w-full">
                    <div className="w-[460px] h-[72px] border" style={{ backgroundColor: 'rgba(252,211,77,0.12)', borderColor: 'rgba(252,211,77,0.28)', clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }} />
                    <div className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 font-sans font-semibold text-[13px] translate-x-full" style={{ color: GROWTH_AMBER }}>
                      {data.funnel.stages[0]?.label}
                    </div>
                  </div>
                  <div className="relative flex justify-center w-full">
                    <div className="w-[340px] h-[72px] border" style={{ backgroundColor: 'rgba(245,158,11,0.18)', borderColor: 'rgba(245,158,11,0.4)', clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }} />
                    <div className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 font-sans font-semibold text-[13px] translate-x-full" style={{ color: GROWTH_AMBER }}>
                      {data.funnel.stages[1]?.label}
                    </div>
                  </div>
                  <div className="relative flex justify-center w-full">
                    <div className="w-[240px] h-[72px] border" style={{ backgroundColor: 'rgba(245,158,11,0.26)', borderColor: 'rgba(252,211,77,0.5)', clipPath: 'polygon(0 0, 100% 0, 70% 100%, 30% 100%)' }} />
                    <div className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 font-sans font-semibold text-[13px] translate-x-full" style={{ color: GROWTH_AMBER }}>
                      {data.funnel.stages[2]?.label}
                    </div>
                  </div>
                  <div className="relative flex justify-center w-full">
                    <div className="w-[140px] h-[72px] border" style={{ backgroundColor: 'rgba(252,211,77,0.9)', borderColor: GROWTH_AMBER, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
                    <div className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 font-sans font-semibold text-[13px] translate-x-full" style={{ color: GROWTH_AMBER }}>
                      {data.funnel.stages[3]?.label}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.funnel.kpis.map((kpi, idx) => (
                  <div
                    key={idx}
                    className="border rounded-xl p-7 relative overflow-hidden group hover:-translate-y-1 transition-transform"
                    style={{ backgroundColor: GROWTH_PANEL_SOLID, borderColor: 'rgba(252,211,77,0.14)' }}
                  >
                    <div className="absolute top-0 left-0 w-full h-[3px]" style={{ background: 'linear-gradient(90deg, #F59E0B, #FCD34D)' }} />
                    <div className="font-heading font-bold text-[40px] demand-text-gradient mb-2">{kpi.value}</div>
                    <div className="font-sans text-[13px]" style={{ color: GROWTH_TEXT_MUTED }}>{kpi.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-white py-16 min-h-[420px] md:py-20">
          <div className="max-w-[1200px] mx-auto px-6 md:px-16">
            <div className="mb-10 md:mb-12">
              <h2 className="font-heading font-bold text-4xl md:text-[40px] mb-4" style={{ color: GROWTH_TEXT_DARK }}>
                {data.scale.title}
              </h2>
              <p className="font-sans text-base max-w-[600px]" style={{ color: GROWTH_TEXT_SOFT }}>
                {data.scale.description}
              </p>
            </div>
            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
              <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px" style={{ backgroundColor: GROWTH_OUTLINE }} />
              <div className="hidden md:block absolute top-0 bottom-0 left-2/3 w-px" style={{ backgroundColor: GROWTH_OUTLINE }} />
              
              {data.scale.columns.map((col, idx) => {
                const IconComponent = IconMap[col.icon];
                return (
                  <div key={idx} className={`md:p${idx === 0 ? 'r' : idx === 1 ? 'x' : 'l'}-10`}>
                    <div className="w-10 h-10 rounded flex items-center justify-center mb-8" style={{ backgroundColor: 'rgba(245,158,11,0.1)' }}>
                      <IconComponent className="w-5 h-5" style={{ color: GROWTH_GOLD }} />
                    </div>
                    <div className="flex items-end gap-2 h-24 mb-8">
                      <div className={`w-8 ${idx === 0 ? 'h-[30%]' : idx === 1 ? 'h-[40%]' : 'h-[20%]'} rounded-t-sm`} style={{ backgroundColor: 'rgba(245,158,11,0.28)' }} />
                      <div className={`w-8 ${idx === 0 ? 'h-[50%]' : idx === 1 ? 'h-[60%]' : 'h-[45%]'} rounded-t-sm`} style={{ backgroundColor: 'rgba(245,158,11,0.42)' }} />
                      <div className={`w-8 ${idx === 0 ? 'h-[70%]' : idx === 1 ? 'h-[80%]' : 'h-[75%]'} rounded-t-sm`} style={{ backgroundColor: 'rgba(245,158,11,0.6)' }} />
                      <div className="w-8 h-[100%] rounded-t-sm" style={{ backgroundColor: GROWTH_AMBER }} />
                    </div>
                    <div className="font-heading font-bold text-[32px] demand-text-gradient mb-2">{col.value}</div>
                    <h3 className="font-heading font-semibold text-base mb-2" style={{ color: GROWTH_TEXT_DARK }}>{col.title}</h3>
                    <p className="font-sans text-[14px]" style={{ color: GROWTH_TEXT_SOFT }}>{col.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative flex min-h-[280px] items-center overflow-hidden py-16 md:py-20" style={{ backgroundColor: GROWTH_BG }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-[10%] w-px h-[150%] origin-top rotate-45" style={{ backgroundColor: 'rgba(252,211,77,0.08)' }} />
            <div className="absolute top-0 right-[20%] w-px h-[150%] origin-top rotate-45" style={{ backgroundColor: 'rgba(252,211,77,0.08)' }} />
            <div className="absolute top-0 right-[30%] w-px h-[150%] origin-top rotate-45" style={{ backgroundColor: 'rgba(252,211,77,0.08)' }} />
          </div>
          <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative z-10 text-center flex flex-col items-center w-full">
            <h2 className="font-heading font-bold text-4xl md:text-[40px] mb-6">
              <span className="text-white">{data.cta.titleLine1}</span>
              <span className="demand-text-gradient">{data.cta.titleLine2}</span>
            </h2>
            <p className="font-sans text-base max-w-[560px] mb-10" style={{ color: GROWTH_TEXT_MUTED }}>
              {data.cta.description}
            </p>
            <Link 
              href={data.cta.primaryButtonHref}
              className="h-14 px-8 font-heading font-bold text-[15px] rounded-lg transition-colors flex items-center justify-center gap-2 mb-6"
              style={{ backgroundColor: GROWTH_AMBER, color: GROWTH_TEXT_DARK }}
            >
              {data.cta.primaryButtonText} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href={data.cta.secondaryLinkHref}
              className="font-sans text-[14px] hover:text-white transition-colors flex items-center gap-1"
              style={{ color: GROWTH_AMBER }}
            >
              {data.cta.secondaryLinkText} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

