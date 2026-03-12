"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import { Target, Search, MousePointerClick, TrendingUp, Calendar, FlaskConical, ArrowRight } from 'lucide-react';

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
    buttonText: "Get Started",
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
  pageTitle 
}: { 
  content?: unknown; 
  pageTitle?: string; 
}) {
  const data = isDemandGrowthTemplateContent(content) ? content : DEFAULT_CONTENT;
  return (
    <div className="min-h-screen bg-[#0A1628] text-white font-sans selection:bg-azure/30">
      {pageTitle && <title>{pageTitle}</title>}
      <style
        // Local gradient for Demand & Growth accents (lighter green → aqua)
        dangerouslySetInnerHTML={{
          __html: `
          .demand-text-gradient {
            background: linear-gradient(135deg, #A3FF78 0%, #22C55E 40%, #4ADE80 70%, #A5B4FC 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `,
        }}
      />
      
      <main>
        <section className="relative bg-[#0E1E2C] min-h-[700px] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #1B4FD8 0, #1B4FD8 1px, transparent 1px, transparent 16px)' }}
          />
          <div className="max-w-[1200px] mx-auto px-6 md:px-16 w-full relative z-10 py-20">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
              <div className="w-full lg:w-[52%]">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <div className="demand-text-gradient font-heading text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 inline-block">
                    {data.hero.eyebrow}
                  </div>
                  <h1 className="font-heading font-bold text-5xl md:text-[64px] leading-[1.1] mb-6">
                    <span className="block text-white">{data.hero.titleLine1}</span>
                    <span className="block demand-text-gradient">{data.hero.titleLine2}</span>
                  </h1>
                  <p className="text-white/75 text-lg max-w-[480px] leading-[1.6] mb-10">
                    {data.hero.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href={data.hero.primaryButtonHref}
                      className="btn-cta-primary"
                    >
                      {data.hero.primaryButtonText} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link 
                      href={data.hero.secondaryButtonHref}
                      className="h-12 px-8 border-[1.5px] border-white/40 hover:border-white text-white font-heading font-bold text-[15px] rounded-lg transition-colors flex items-center justify-center gap-2"
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
                  className="w-full max-w-[580px] aspect-[580/460] bg-[#0D2137] border border-cobalt/25 rounded-2xl relative overflow-hidden flex items-center justify-center mx-auto"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,79,216,0.08)_0%,transparent_70%)] z-10" />
                  <img 
                    src={data.hero.imageSrc} 
                    alt={data.hero.imageAlt} 
                    className="w-full h-full object-cover opacity-30 mix-blend-overlay relative z-0"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F4F6F8] py-20 min-h-[240px]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-16">
            <div className="text-cobalt font-heading text-[11px] font-semibold uppercase tracking-[0.2em] mb-8">
              {data.subDisciplines.eyebrow}
            </div>
            <div className="flex flex-col lg:flex-row gap-4 overflow-x-auto pb-4 snap-x">
              {data.subDisciplines.items.map((item, i) => {
                const IconComponent = IconMap[item.icon];
                return (
                  <div 
                    key={i}
                    className="flex-none w-[280px] lg:flex-1 bg-white border-l-4 border-cobalt rounded-xl p-5 pl-6 transition-all duration-300 hover:border-azure hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(27,79,216,0.12)] snap-start cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded bg-cobalt/10 flex items-center justify-center mb-4 group-hover:bg-azure/10 transition-colors">
                      <IconComponent className="w-4 h-4 text-cobalt group-hover:text-azure transition-colors" />
                    </div>
                    <h3 className="font-heading font-semibold text-[15px] text-[#0A1628] mb-2">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[13px] text-[#3D4B5C] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#0D2137] py-24 min-h-[560px]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-16">
            <h2 className="font-heading font-bold text-4xl md:text-[48px] text-center mb-16">
              <span className="text-white">{data.funnel.titleLine1}</span>
              <span className="demand-text-gradient">{data.funnel.titleLine2}</span>
            </h2>
            <div className="relative max-w-[600px] mx-auto mb-24 flex flex-col items-center">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute bottom-0 left-[30%] w-px h-[120%] bg-azure/40 origin-bottom -rotate-15" />
                <div className="absolute bottom-0 left-[50%] w-px h-[150%] bg-azure/40 origin-bottom -rotate-15" />
                <div className="absolute bottom-0 left-[70%] w-px h-[100%] bg-azure/40 origin-bottom -rotate-15" />
              </div>
              <div className="relative z-10 flex flex-col gap-1 items-center w-full">
                <div className="relative flex justify-center w-full">
                  <div className="w-[460px] h-[72px] bg-cobalt/8 border border-cobalt/30" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }} />
                  <div className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 font-sans font-semibold text-[13px] text-ice-blue translate-x-full">
                    {data.funnel.stages[0]?.label}
                  </div>
                </div>
                <div className="relative flex justify-center w-full">
                  <div className="w-[340px] h-[72px] bg-cobalt/14 border border-cobalt/50" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }} />
                  <div className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 font-sans font-semibold text-[13px] text-ice-blue translate-x-full">
                    {data.funnel.stages[1]?.label}
                  </div>
                </div>
                <div className="relative flex justify-center w-full">
                  <div className="w-[240px] h-[72px] bg-cobalt/20 border border-cobalt/70" style={{ clipPath: 'polygon(0 0, 100% 0, 70% 100%, 30% 100%)' }} />
                  <div className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 font-sans font-semibold text-[13px] text-ice-blue translate-x-full">
                    {data.funnel.stages[2]?.label}
                  </div>
                </div>
                <div className="relative flex justify-center w-full">
                  <div className="w-[140px] h-[72px] bg-cobalt/28 border border-cobalt" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
                  <div className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 font-sans font-semibold text-[13px] text-ice-blue translate-x-full">
                    {data.funnel.stages[3]?.label}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.funnel.kpis.map((kpi, idx) => (
                <div
                  key={idx}
                  className="bg-[#112B3C] border border-white/7 rounded-xl p-7 relative overflow-hidden group hover:-translate-y-1 transition-transform"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-cobalt" />
                  <div className="font-heading font-bold text-[40px] demand-text-gradient mb-2">{kpi.value}</div>
                  <div className="font-sans text-[13px] text-white/45">{kpi.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24 min-h-[480px]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-16">
            <div className="mb-16">
              <h2 className="font-heading font-bold text-4xl md:text-[40px] text-[#0A1628] mb-4">
                {data.scale.title}
              </h2>
              <p className="font-sans text-base text-[#3D4B5C] max-w-[600px]">
                {data.scale.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 relative">
              <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px bg-[#E2E8F0]" />
              <div className="hidden md:block absolute top-0 bottom-0 left-2/3 w-px bg-[#E2E8F0]" />
              
              {data.scale.columns.map((col, idx) => {
                const IconComponent = IconMap[col.icon];
                return (
                  <div key={idx} className={`md:p${idx === 0 ? 'r' : idx === 1 ? 'x' : 'l'}-10`}>
                    <div className="w-10 h-10 rounded bg-cobalt/10 flex items-center justify-center mb-8">
                      <IconComponent className="w-5 h-5 text-cobalt" />
                    </div>
                    <div className="flex items-end gap-2 h-24 mb-8">
                      <div className={`w-8 bg-cobalt ${idx === 0 ? 'h-[30%]' : idx === 1 ? 'h-[40%]' : 'h-[20%]'} rounded-t-sm`} />
                      <div className={`w-8 bg-cobalt ${idx === 0 ? 'h-[50%]' : idx === 1 ? 'h-[60%]' : 'h-[45%]'} rounded-t-sm`} />
                      <div className={`w-8 bg-cobalt ${idx === 0 ? 'h-[70%]' : idx === 1 ? 'h-[80%]' : 'h-[75%]'} rounded-t-sm`} />
                      <div className="w-8 bg-azure h-[100%] rounded-t-sm" />
                    </div>
                    <div className="font-heading font-bold text-[32px] demand-text-gradient mb-2">{col.value}</div>
                    <h3 className="font-heading font-semibold text-base text-[#0A1628] mb-2">{col.title}</h3>
                    <p className="font-sans text-[14px] text-[#3D4B5C]">{col.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative bg-[#112B3C] py-24 min-h-[320px] overflow-hidden flex items-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-[10%] w-px h-[150%] bg-cobalt/6 origin-top rotate-45" />
            <div className="absolute top-0 right-[20%] w-px h-[150%] bg-cobalt/6 origin-top rotate-45" />
            <div className="absolute top-0 right-[30%] w-px h-[150%] bg-cobalt/6 origin-top rotate-45" />
          </div>
          <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative z-10 text-center flex flex-col items-center w-full">
            <h2 className="font-heading font-bold text-4xl md:text-[40px] mb-6">
              <span className="text-white">{data.cta.titleLine1}</span>
              <span className="demand-text-gradient">{data.cta.titleLine2}</span>
            </h2>
            <p className="font-sans text-base text-white/60 max-w-[560px] mb-10">
              {data.cta.description}
            </p>
            <Link 
              href={data.cta.primaryButtonHref}
              className="h-14 px-8 bg-cobalt hover:bg-azure text-white font-heading font-bold text-[15px] rounded-lg transition-colors flex items-center justify-center gap-2 mb-6"
            >
              {data.cta.primaryButtonText} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href={data.cta.secondaryLinkHref}
              className="font-sans text-[14px] text-ice-blue hover:text-white transition-colors flex items-center gap-1"
            >
              {data.cta.secondaryLinkText} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

