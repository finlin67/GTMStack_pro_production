
"use client";

import React from "react";
import { 
  ScanSearch, 
  Layers, 
  Settings2, 
  Gauge, 
  TrendingUp, 
  Map, 
  Share2, 
  Cpu, 
  Quote, 
  ExternalLink, 
  Landmark, 
  Cloud, 
  Rocket, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

// --- Types ---

export interface StatItem {
  label: string;
  value: string;
}

export interface MethodologyStep {
  number: string;
  title: string;
  description: string;
  icon: string;
  progress: string;
}

export interface ExpertiseItem {
  title: string;
  icon: string;
  tags: string[];
  description: string;
}

export interface CaseStudy {
  title: string;
  description: string;
  outcomeLabel: string;
  outcomeValue: string;
  industry?: string;
  quote?: string;
}

export interface FounderTimelineItem {
  icon: string;
  title: string;
  description: string;
}

export interface PageContent {
  hero: {
    badge: string;
    titleStart: string;
    titleGradient: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  stats: StatItem[];
  methodology: {
    title: string;
    description: string;
    steps: MethodologyStep[];
  };
  expertise: {
    title: string;
    items: ExpertiseItem[];
  };
  quote: {
    text: string;
    highlight: string;
  };
  caseStudies: {
    title: string;
    subtitle: string;
    items: CaseStudy[];
    industries: CaseStudy[];
  };
  founder: {
    name: string;
    role: string;
    image: string;
    bio: string;
    yearsExperience: string;
    timeline: FounderTimelineItem[];
  };
  ctaBottom: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

// --- Icon Helper ---

const IconMap = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    troubleshoot: <ScanSearch className={className} />,
    layers: <Layers className={className} />,
    settings_suggest: <Settings2 className={className} />,
    speed: <Gauge className={className} />,
    trending_up: <TrendingUp className={className} />,
    map: <Map className={className} />,
    hub: <Share2 className={className} />,
    precision_manufacturing: <Cpu className={className} />,
    account_balance: <Landmark className={className} />,
    cloud_done: <Cloud className={className} />,
    rocket_launch: <Rocket className={className} />,
    quote: <Quote className={className} />,
    check: <CheckCircle2 className={className} />,
  };
  return <>{icons[name] || <Cpu className={className} />}</>;
};

// --- Sections ---

const Hero = ({ content }: { content: PageContent }) => {
  return (
    <section className="relative pt-24 pb-32 px-6 overflow-hidden bg-[#0B132B]">
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text Content */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            {content.hero.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-8 text-white">
            {content.hero.titleStart}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-emerald-500">
              {content.hero.titleGradient}
            </span>.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
            {content.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all">
              {content.hero.ctaPrimary}
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-all">
              {content.hero.ctaSecondary}
            </button>
          </div>
        </div>

        {/* Right Column: Animation Slot */}
        <div className="hidden md:flex justify-center items-center h-[600px]">
          <div className="w-full h-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
             <span className="text-white/20 font-bold uppercase tracking-widest">Animation Slot</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = ({ content }: { content: PageContent }) => {
  return (
    <section className="py-20 px-6 bg-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {content.stats.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
              <h3 className="text-4xl font-black text-amber-500">{stat.value}</h3>
              <div className="mt-4 h-1 w-12 bg-amber-500/20"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MethodologySection = ({ content }: { content: PageContent }) => {
  return (
    <section className="py-24 px-6 bg-[#071024] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">{content.methodology.title}</h2>
            <p className="text-slate-400 max-w-xl text-lg">{content.methodology.description}</p>
          </div>
          <div className="hidden md:block h-px flex-1 mx-12 bg-white/10 mb-6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
          {content.methodology.steps.map((step, index) => (
            <div key={index} className="bg-[#071024] p-10 hover:bg-[#162447] transition-colors group">
              <div className="text-blue-600 mb-6">
                <IconMap name={step.icon} className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.number} {step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{step.description}</p>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-blue-600 ${step.progress} group-hover:w-full transition-all duration-500`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExpertiseSection = ({ content }: { content: PageContent }) => {
  return (
    <section className="py-24 px-6 bg-slate-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 text-center md:text-left">{content.expertise.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.expertise.items.map((item, index) => (
            <div key={index} className="bg-white p-10 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-blue-600/10 text-blue-600">
                  <IconMap name={item.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded uppercase">{tag}</span>
                ))}
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed">{item.description}</p>
              <div className="inline-flex items-center text-blue-600 font-bold hover:gap-2 transition-all cursor-pointer">
                Learn More <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const QuoteSection = ({ content }: { content: PageContent }) => {
  return (
    <section className="py-32 px-6 bg-[#0B132B] relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Quote className="text-amber-500 w-16 h-16 mb-8 opacity-50 mx-auto" />
        <blockquote className="text-3xl md:text-5xl font-black text-white leading-tight italic">
          &ldquo;{content.quote.text} <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-emerald-500">{content.quote.highlight}</span>.&rdquo;
        </blockquote>
      </div>
    </section>
  );
};

const CaseStudiesSection = ({ content }: { content: PageContent }) => {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 text-center md:text-left">{content.caseStudies.title}</h2>
        <p className="text-slate-500 mb-12 text-center md:text-left text-lg">{content.caseStudies.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {content.caseStudies.items.map((item, index) => (
            <div key={index} className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
              <div className="h-48 w-full bg-[#162447] p-8 flex items-end">
                <h4 className="text-white text-xl font-bold">{item.title}</h4>
              </div>
              <div className="p-8">
                <p className="text-slate-600 text-sm mb-6">{item.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">{item.outcomeLabel}</p>
                    <p className="text-lg font-black text-amber-500">{item.outcomeValue}</p>
                  </div>
                  <ExternalLink className="text-slate-300 w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 pt-16">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 text-center">Industries Served</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {content.caseStudies.industries.map((ind, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-6 max-w-sm flex-1">
                <h4 className="font-bold text-slate-900 mb-1">{ind.title}</h4>
                <p className="text-slate-500 text-sm italic">{ind.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FounderSection = ({ content }: { content: PageContent }) => {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden grayscale">
            <img alt={content.founder.name} className="w-full h-full object-cover" src={content.founder.image} />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-blue-600 p-6 rounded-xl text-white shadow-xl">
            <p className="text-3xl font-black">{content.founder.yearsExperience}</p>
            <p className="text-xs font-bold uppercase tracking-widest">Years Experience</p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{content.founder.name}</h2>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">
            {content.founder.bio}
          </p>
          <div className="space-y-8">
            {content.founder.timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="size-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <IconMap name={item.icon} className="w-5 h-5" />
                  </div>
                  {index !== content.founder.timeline.length - 1 && (
                    <div className="flex-1 w-px bg-slate-200 my-2"></div>
                  )}
                </div>
                <div className={index !== content.founder.timeline.length - 1 ? "pb-4" : ""}>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = ({ content }: { content: PageContent }) => {
  return (
    <section className="py-24 px-6 bg-[#0B132B] text-white text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-8">{content.ctaBottom.title}</h2>
        <p className="text-slate-400 text-lg md:text-xl mb-12">{content.ctaBottom.subtitle}</p>
        <button className="px-12 py-5 bg-blue-600 text-white font-black text-lg rounded-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20">
          {content.ctaBottom.buttonText}
        </button>
      </div>
    </section>
  );
};

// --- Main Component ---

export default function HomePage({ content }: { content: PageContent }) {
  return (
    <main className="w-full font-sans">
      <Hero content={content} />
      <StatsSection content={content} />
      <MethodologySection content={content} />
      <ExpertiseSection content={content} />
      <QuoteSection content={content} />
      <CaseStudiesSection content={content} />
      <FounderSection content={content} />
      <CTASection content={content} />
    </main>
  );
}
