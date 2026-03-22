import Link from 'next/link';
import ExpertiseTopicBreadcrumb, {
  type ExpertiseTopicBreadcrumbProps,
} from '@/src/components/expertise/ExpertiseTopicBreadcrumb';
import {
  Waypoints,
  Network,
  Database,
  Sliders,
  BarChart3,
  Bot,
  Zap,
  Building2,
  Mail,
  TrendingUp,
  Brain,
  Tag,
  ArrowRight
} from 'lucide-react';

export interface TemplateContent {
  hero: {
    badge: string;
    headlinePart1: string;
    headlineHighlight: string;
    /** One-sentence deck under H1/accent (mapped from subheadline when accent exists). */
    deck?: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
    videoBgSrc: string;
    animationText: string;
  };
  services: {
    sectionLabel: string;
    items: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  martech: {
    headlinePart1: string;
    headlineHighlight: string;
    nodes: {
      icon: string;
      label: string;
      isCenter?: boolean;
    }[];
    kpis: {
      label: string;
      value: string;
      description: string;
      comparison: string;
    }[];
  };
  aiExecution: {
    headline: string;
    description: string;
    columns: {
      items: {
        title: string;
        description: string;
      }[];
    }[];
  };
  cta: {
    headlinePart1: string;
    headlineHighlight: string;
    description: string;
    buttonText: string;
  };
  footer: {
    logoText: string;
    links: { label: string; href: string }[];
    copyright: string;
  };
}

const DEFAULT_CONTENT: TemplateContent = {
  hero: {
    badge: "SYSTEMS & OPERATIONS",
    headlinePart1: "The Revenue Engine's",
    headlineHighlight: "Engineered Infrastructure",
    deck: "",
    description: "High-performance engineered infrastructure for modern revenue teams. We architect, deploy, and scale the systems that power your growth.",
    primaryButton: "Explore the framework",
    secondaryButton: "Learn More",
    videoBgSrc: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-elements-and-circuits-4416-large.mp4",
    animationText: "[Animation: Circuit Board Integration Web]",
  },
  services: {
    sectionLabel: "WHAT WE DO",
    items: [
      { icon: "Database", title: "CRM Architecture", description: "Deep structural optimization for Salesforce and HubSpot platforms." },
      { icon: "Sliders", title: "Marketing Ops", description: "Advanced automation flows for multi-channel lead generation." },
      { icon: "BarChart3", title: "Data Pipeline", description: "ETL processes and warehouse sync for real-time reporting." },
      { icon: "Bot", title: "AI Integration", description: "Deploying LLMs and agents across the revenue stack." },
      { icon: "Zap", title: "Sales Enablement", description: "Streamlining prospecting and outreach tools for high velocity." },
    ],
  },
  martech: {
    headlinePart1: "The Unified",
    headlineHighlight: "MarTech Stack",
    nodes: [
      { icon: "Building2", label: "CRM" },
      { icon: "Mail", label: "MAP" },
      { icon: "TrendingUp", label: "Analytics", isCenter: true },
      { icon: "Brain", label: "AI Layer" },
      { icon: "Tag", label: "Sales Tools" },
    ],
    kpis: [
      { label: "Efficiency Gain", value: "+42%", description: "Average increase in pipeline velocity after stack audit.", comparison: "vs. industry avg" },
      { label: "Data Integrity", value: "99.9%", description: "Match rate across primary and secondary data nodes.", comparison: "vs. industry avg" },
      { label: "ROI Impact", value: "3.5x", description: "Return on technology spend through consolidation.", comparison: "vs. industry avg" },
    ],
  },
  aiExecution: {
    headline: "AI-Powered Execution at Scale",
    description: "Bridging the gap between strategy and automated results through engineered intelligence.",
    columns: [
      {
        items: [
          { title: "Pattern Recognition", description: "ML models identify high-intent account behavior across silos." },
          { title: "Dynamic Scoring", description: "Real-time ICP alignment adjusting bid strategies instantly." },
        ],
      },
      {
        items: [
          { title: "Neural Personalization", description: "LLM-driven content generation tailored to unique personas." },
          { title: "Automated Follow-up", description: "AI agents handle initial discovery and meeting scheduling." },
        ],
      },
      {
        items: [
          { title: "Predictive Forecasting", description: "Removing bias from sales cycles with data-driven probability." },
          { title: "Churn Prevention", description: "Early warning signals detected via product usage entropy." },
        ],
      },
    ],
  },
  cta: {
    headlinePart1: "Build Your",
    headlineHighlight: "Engineered Infrastructure",
    description: "Stop struggling with fragmented data and broken workflows. Deploy the stack that scales with your ambition.",
    buttonText: "Audit My Stack",
  },
  footer: {
    logoText: "GTMStack.pro",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "System Status", href: "#" },
    ],
    copyright: "© 2024 GTMStack. All systems operational.",
  },
};

function isSystemOperationsContent(c: unknown): c is TemplateContent {
  return (
    !!c &&
    typeof c === 'object' &&
    'hero' in c &&
    typeof (c as TemplateContent).hero === 'object' &&
    'videoBgSrc' in (c as TemplateContent).hero
  );
}

export default function Template({
  content,
  pageTitle,
  expertiseBreadcrumb,
}: {
  content?: unknown
  pageTitle?: string
  expertiseBreadcrumb?: ExpertiseTopicBreadcrumbProps
}) {
  const data = isSystemOperationsContent(content) ? content : DEFAULT_CONTENT;

  const getIcon = (iconName: string, className?: string) => {
    const icons: Record<string, any> = {
      Database,
      Sliders,
      BarChart3,
      Bot,
      Zap,
      Building2,
      Mail,
      TrendingUp,
      Brain,
      Tag,
    };
    const Icon = icons[iconName] || Database;
    return <Icon className={className} />;
  };

  return (
    <div className="bg-[#f6f8f8] dark:bg-[#0A1628] font-sans text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden min-h-screen flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@700;800;900&display=swap');
        
        .font-display { font-family: 'Outfit', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        .circuit-bg {
            background-image: radial-gradient(circle at 2px 2px, rgba(54, 191, 206, 0.04) 1px, transparent 0);
            background-size: 32px 32px;
        }
        .gradient-text {
            background: linear-gradient(90deg, #0B3D6B 0%, #A8D8EA 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        .animate-pulse-ring {
          animation: pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}} />

      <main>
        {/* Hero Section */}
        <section className="circuit-bg relative flex min-h-[800px] items-center overflow-hidden bg-[#0A1628] px-6 md:px-10">
          <video autoPlay className="absolute inset-0 h-full w-full object-cover opacity-30 z-0" loop muted playsInline>
            <source src={data.hero.videoBgSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#0A1628]/40 z-[1]"></div>
          
          <div className="mx-auto flex flex-col lg:flex-row w-full max-w-[1440px] items-center gap-12 relative z-10 py-20 lg:py-0">
            {/* Left: Content */}
            <div className="w-full lg:w-[52%] space-y-8">
              {expertiseBreadcrumb ? (
                <ExpertiseTopicBreadcrumb {...expertiseBreadcrumb} />
              ) : (
                <div className="inline-flex items-center rounded-full border border-[#36bfce]/30 bg-[#36bfce]/10 px-4 py-1 text-xs font-bold tracking-widest text-[#36bfce] uppercase">
                  {data.hero.badge}
                </div>
              )}
              <h1 className="font-display text-4xl md:text-5xl lg:text-[2.75rem] font-black leading-[1.12] text-white max-w-3xl">
                {data.hero.headlinePart1}
                {data.hero.headlineHighlight ? (
                  <>
                    <br />
                    <span className="gradient-text text-2xl md:text-3xl lg:text-[2rem] font-bold">
                      {data.hero.headlineHighlight}
                    </span>
                  </>
                ) : null}
              </h1>
              {data.hero.deck ? (
                <p className="font-display max-w-xl text-lg md:text-xl font-semibold leading-snug text-white/85">
                  {data.hero.deck}
                </p>
              ) : null}
              <p className="max-w-xl text-base md:text-[1.05rem] leading-relaxed text-white/70 whitespace-pre-line">
                {data.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="flex h-14 items-center justify-center rounded-lg bg-[#36bfce] px-10 text-lg font-bold text-[#0A1628] hover:scale-105 transition-transform">
                  {data.hero.primaryButton}
                </button>
                <button className="flex h-14 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-10 text-lg font-bold text-white hover:bg-white/10 transition-all">
                  {data.hero.secondaryButton}
                </button>
              </div>
            </div>
            
            {/* Right: Visual */}
            <div className="relative w-full lg:w-[48%] flex justify-center lg:justify-end mt-12 lg:mt-0">
              <div className="relative h-[300px] md:h-[460px] w-full max-w-[580px] overflow-hidden rounded-2xl border border-[#36bfce]/20 bg-[#0D2137] shadow-2xl shadow-[#36bfce]/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute h-64 w-64 rounded-full bg-[#36bfce]/20 blur-[100px]"></div>
                  <div className="relative z-10 text-center flex flex-col items-center">
                    <Network className="w-24 h-24 text-[#36bfce]/40" />
                    <p className="font-display mt-4 text-sm font-bold tracking-widest text-[#36bfce]/60 uppercase">
                      {data.hero.animationText}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#36bfce]/5 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Sub-Disciplines Section */}
        <section className="bg-slate-50 dark:bg-[#F4F6F8] py-24 px-6 md:px-10">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-display mb-12 text-sm font-black tracking-[0.2em] text-slate-400 uppercase">{data.services.sectionLabel}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {data.services.items.map((item, idx) => (
                <div key={idx} className="group flex flex-col gap-4 border-r-4 border-[#36bfce] bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                  {getIcon(item.icon, "w-10 h-10 text-[#36bfce]")}
                  <h3 className="font-display text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Web Section */}
        <section className="bg-[#0D2137] py-32 px-6 md:px-10 overflow-hidden">
          <div className="mx-auto max-w-[1440px] text-center">
            <h2 className="font-display mx-auto mb-20 max-w-2xl text-4xl md:text-5xl font-black leading-tight text-white">
              {data.martech.headlinePart1} <span className="gradient-text">{data.martech.headlineHighlight}</span>
            </h2>
            
            {/* Integration Arc Visualization */}
            <div className="relative mb-32 hidden h-[300px] w-full items-center justify-center md:flex">
              {/* Connecting Arc */}
              <div className="absolute h-[600px] w-[1000px] rounded-[100%] border-t-2 border-dashed border-[#36bfce]/30 top-1/2"></div>
              
              {/* Nodes */}
              <div className="absolute flex w-[1000px] justify-between">
                {data.martech.nodes.map((node, idx) => {
                  const isCenter = node.isCenter;
                  let translateY = "translate-y-0";
                  if (idx === 1 || idx === 3) translateY = "-translate-y-16";
                  if (idx === 2) translateY = "-translate-y-24";

                  return (
                    <div key={idx} className={`group relative flex flex-col items-center gap-4 ${translateY}`}>
                      {isCenter ? (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#36bfce] text-[#0A1628] shadow-[0_0_40px_rgba(54,191,206,0.4)] relative">
                          <div className="absolute inset-0 bg-[#36bfce]/20 rounded-full animate-pulse-ring"></div>
                          {getIcon(node.icon, "w-10 h-10 relative z-10")}
                        </div>
                      ) : (
                        <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-[#0B3D6B] border ${idx === 3 ? 'border-2 border-[#36bfce]/60 shadow-[0_0_25px_rgba(54,192,207,0.3)]' : 'border-[#36bfce]/50 shadow-[0_0_20px_rgba(54,191,206,0.2)]'} text-[#36bfce]`}>
                          {getIcon(node.icon, "w-8 h-8")}
                        </div>
                      )}
                      <span className={`text-sm font-bold tracking-widest uppercase ${isCenter ? 'text-[#36bfce] text-base font-black' : 'text-white'}`}>
                        {node.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Nodes (Fallback) */}
            <div className="flex flex-col gap-8 mb-20 md:hidden">
               {data.martech.nodes.map((node, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-left bg-[#0A1628] p-4 rounded-xl border border-[#36bfce]/20">
                     <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${node.isCenter ? 'bg-[#36bfce] text-[#0A1628]' : 'bg-[#0B3D6B] border border-[#36bfce]/50 text-[#36bfce]'}`}>
                        {getIcon(node.icon, "w-6 h-6")}
                     </div>
                     <span className={`text-sm font-bold tracking-widest uppercase ${node.isCenter ? 'text-[#36bfce]' : 'text-white'}`}>
                        {node.label}
                     </span>
                  </div>
               ))}
            </div>

            {/* KPI Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.martech.kpis.map((kpi, idx) => (
                <div key={idx} className="rounded-xl border border-[#36bfce]/40 bg-[#0A1628] p-10 text-left">
                  <p className="text-xs font-bold tracking-widest text-[#36bfce] uppercase mb-2">{kpi.label}</p>
                  <h4 className="font-display text-5xl font-black text-[#A8D8EA]">{kpi.value}</h4>
                  <p className="mt-4 text-slate-400">{kpi.description}</p>
                  <p className="text-white/30 text-[10px] mt-1 uppercase tracking-wider">{kpi.comparison}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Execution Section */}
        <section className="bg-white py-32 px-6 md:px-10">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-20 text-center">
              <h2 className="font-display text-4xl md:text-5xl font-black leading-tight text-slate-900">
                <span className="bg-gradient-to-r from-[#0D2137] to-[#36bfce] bg-clip-text text-transparent">
                  {data.aiExecution.headline}
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
                {data.aiExecution.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
              {data.aiExecution.columns.map((col, colIdx) => (
                <div key={colIdx} className="relative flex gap-8">
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-4 rounded-full bg-[#36bfce] shadow-[0_0_10px_rgba(54,191,206,0.5)] shrink-0"></div>
                    <div className="h-32 w-[3px] bg-[#36bfce]/20"></div>
                    <div className="h-4 w-4 rounded-full border-2 border-[#36bfce] bg-white shrink-0"></div>
                    <div className="h-32 w-[3px] bg-[#36bfce]/20"></div>
                    <div className="h-4 w-4 rounded-full border-2 border-[#36bfce] bg-white shrink-0"></div>
                    <div className="h-32 w-[3px] bg-[#36bfce]/20 hidden md:block"></div>
                    <div className="h-4 w-4 rounded-full border-2 border-[#36bfce] bg-white shrink-0 hidden md:block"></div>
                  </div>
                  <div className="space-y-16 pt-0">
                    {col.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="space-y-2">
                        <h4 className="font-display text-xl font-bold text-slate-900">{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#112B3C] py-24 px-6 md:px-10">
          <div className="mx-auto max-w-[1440px] text-center">
            <div className="relative overflow-hidden rounded-3xl bg-[#0D2137] px-6 md:px-12 py-20 border border-white/10 shadow-2xl">
              {/* Abstract Background Detail */}
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#36bfce]/10 blur-[100px]"></div>
              <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-[#A8D8EA]/5 blur-[100px]"></div>
              
              <div className="relative z-10">
                <h2 className="font-display text-4xl md:text-5xl font-black leading-tight text-white">
                  {data.cta.headlinePart1} <span className="gradient-text">{data.cta.headlineHighlight}</span>
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-300">
                  {data.cta.description}
                </p>
                <div className="mt-12 flex justify-center">
                  <button className="group flex h-16 items-center justify-center gap-3 rounded-lg bg-[#36bfce] px-8 md:px-12 text-lg md:text-xl font-black text-[#0A1628] hover:scale-105 transition-transform">
                    {data.cta.buttonText}
                    <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A1628] py-12 px-6 md:px-10 border-t border-white/5 mt-auto">
        <div className="mx-auto flex flex-col md:flex-row max-w-[1440px] items-center justify-between text-slate-500 text-sm gap-6 md:gap-0">
          <div className="flex items-center gap-2">
            <Waypoints className="w-5 h-5 text-[#36bfce]" />
            <span className="font-display font-bold text-slate-300">{data.footer.logoText}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {data.footer.links.map((link, idx) => (
              <Link key={idx} href={link.href} className="hover:text-[#36bfce] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="text-center md:text-right">
            {data.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}

