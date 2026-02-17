'use client';

import React from 'react';
import Link from 'next/link';
import {
  DraftingCompass,
  Handshake,
  Rocket,
  TrendingUp,
  Map as MapIcon,
  Network,
  Settings,
  Zap,
  Quote,
  ArrowRight,
  Search,
  ExternalLink,
} from 'lucide-react';

// --- Types & Interfaces (PageContent / RevenueArchitect-style) ---

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

export interface ExpertiseItemContent {
  title: string;
  icon: string;
  tags: string[];
  description: string;
}

export interface CaseStudyItem {
  title: string;
  description: string;
  outcomeLabel?: string;
  outcomeValue?: string;
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
    items: ExpertiseItemContent[];
  };
  quote: {
    text: string;
    highlight: string;
  };
  caseStudies: {
    title: string;
    subtitle: string;
    items: CaseStudyItem[];
    industries?: CaseStudyItem[];
  };
  founder?: {
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

/** Content type for the Home template (RevenueArchitect-style layout). */
export type HomeTemplateContent = PageContent;

export type HomeTemplateProps = {
  theme?: 'dark' | 'light';
  content: HomeTemplateContent;
  pageTitle?: string;
  heroVisualId?: string;
};

// --- Icon Mapping Helper (Lucide + string keys for content) ---

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  DraftingCompass,
  Handshake,
  Rocket,
  TrendingUp,
  Map: MapIcon,
  Network,
  Settings,
  troubleshoot: Search,
  layers: DraftingCompass,
  settings_suggest: Settings,
  speed: Rocket,
  trending_up: TrendingUp,
  map: MapIcon,
  hub: Network,
  precision_manufacturing: Settings,
};

const blueprintBg = {
  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(36,99,235,0.06) 31px, rgba(36,99,235,0.06) 32px),
    repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(36,99,235,0.06) 31px, rgba(36,99,235,0.06) 32px)`,
};

const progressByIndex = ['w-1/4', 'w-2/4', 'w-3/4', 'w-full'] as const;

// --- Template Component (body only; layout provides header/footer) ---

export default function HomeTemplate({ content, theme = 'dark', pageTitle: _pageTitle, heroVisualId: _heroVisualId }: HomeTemplateProps) {
  return (
    <main className={`w-full font-sans ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Hero */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden bg-[#0B132B]">
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
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
              <Link
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
                href="/contact"
              >
                {content.hero.ctaPrimary}
              </Link>
              <Link
                className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-all"
                href="#methodology"
              >
                {content.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Right Column: existing hero visual tile (600px, rounded-2xl) */}
          <div className="hidden md:flex justify-center items-center h-[600px]">
            <div className="w-full h-full overflow-hidden rounded-2xl relative bg-[#071024] border border-white/10 shadow-2xl">
              <div className="absolute inset-0 opacity-50" style={blueprintBg} />
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-[#2463eb]/30 rounded-lg" />
              <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-[#EAB308]/30 rounded-lg" />
              <div className="absolute bottom-10 right-10 p-4 bg-[#0B132B]/90 backdrop-blur border border-white/10 rounded max-w-xs z-10">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="text-[#EAB308] w-4 h-4" />
                  <span className="text-xs text-slate-400 uppercase tracking-wider">System Status</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#2463eb] to-[#F97316] w-3/4" />
                </div>
                <div className="flex justify-between mt-2 text-xs font-mono text-white">
                  <span>Optimization</span>
                  <span>98.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {content.stats.map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                <h3 className="text-4xl font-black text-amber-500">{stat.value}</h3>
                <div className="mt-4 h-1 w-12 bg-amber-500/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 px-6 bg-[#071024] text-white" id="methodology">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">{content.methodology.title}</h2>
              <p className="text-slate-400 max-w-xl text-lg">{content.methodology.description}</p>
            </div>
            <div className="hidden md:block h-px flex-1 mx-12 bg-white/10 mb-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
            {content.methodology.steps.map((step, index) => {
              const IconComponent = IconMap[step.icon] ?? Settings;
              const progress = step.progress || progressByIndex[index] || 'w-full';
              return (
                <div key={index} className="bg-[#071024] p-10 hover:bg-[#162447] transition-colors group">
                  <div className="text-blue-600 mb-6">
                    <IconComponent className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.number} {step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{step.description}</p>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full bg-blue-600 ${progress} group-hover:w-full transition-all duration-500`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 px-6 bg-slate-100" id="expertise">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 text-center md:text-left">{content.expertise.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.expertise.items.map((item, index) => {
              const IconComponent = IconMap[item.icon] ?? Settings;
              return (
                <div key={index} className="bg-white p-10 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-blue-600/10 text-blue-600">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded uppercase">{tag}</span>
                    ))}
                  </div>
                  <p className="text-slate-600 mb-8 leading-relaxed">{item.description}</p>
                  <Link
                    className="inline-flex items-center text-blue-600 font-bold hover:gap-2 transition-all"
                    href="/expertise"
                  >
                    Learn More <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-32 px-6 bg-[#0B132B] relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Quote className="text-amber-500 w-16 h-16 mb-8 opacity-50 mx-auto" />
          <blockquote className="text-3xl md:text-5xl font-black text-white leading-tight italic">
            &quot;{content.quote.text} <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-emerald-500">{content.quote.highlight}</span>.&quot;
          </blockquote>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 text-center md:text-left">{content.caseStudies.title}</h2>
          <p className="text-slate-500 mb-12 text-center md:text-left text-lg">{content.caseStudies.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {content.caseStudies.items.map((item, index) => (
              <Link
                key={index}
                className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-lg transition-all"
                href="/projects"
              >
                <div className="h-48 w-full bg-[#162447] p-8 flex items-end">
                  <h4 className="text-white text-xl font-bold">{item.title}</h4>
                </div>
                <div className="p-8">
                  <p className="text-slate-600 text-sm mb-6">{item.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                      {item.outcomeLabel != null && <p className="text-xs font-bold text-slate-400 uppercase">{item.outcomeLabel}</p>}
                      {item.outcomeValue != null && <p className="text-lg font-black text-amber-500">{item.outcomeValue}</p>}
                    </div>
                    <ExternalLink className="text-slate-300 w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {content.caseStudies.industries != null && content.caseStudies.industries.length > 0 && (
            <div className="border-t border-slate-200 pt-16">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 text-center">Industries Served</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {content.caseStudies.industries.map((ind, index) => (
                  <div key={index} className="bg-white border border-slate-200 rounded-lg p-6 max-w-sm flex-1">
                    <h4 className="font-bold text-slate-900 mb-1">{ind.title}</h4>
                    {ind.quote != null && <p className="text-slate-500 text-sm italic">{ind.quote}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#0B132B] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-8">{content.ctaBottom.title}</h2>
          <p className="text-slate-400 text-lg md:text-xl mb-12">{content.ctaBottom.subtitle}</p>
          <Link
            className="inline-flex items-center gap-2 px-12 py-5 bg-blue-600 text-white font-black text-lg rounded-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20"
            href="/contact"
          >
            {content.ctaBottom.buttonText}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
