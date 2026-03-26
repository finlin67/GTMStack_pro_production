"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Target,
  Share2,
  RefreshCw,
  Users,
  Search,
  Database,
  Layers,
  Radio,
  GitPullRequest,
  TrendingUp,
  Hexagon,
  ArrowRight,
  Mail,
  Network
} from "lucide-react";

export interface SubDiscipline {
  id: string;
  icon: string;
  title: string;
  description: string;
  borderColor: string;
}

export interface NodeItem {
  id: string;
  icon: string;
  label: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface LifecycleStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface SocialLink {
  icon: string;
  href: string;
}

export interface TemplateContent {
  hero: {
    tagline: string;
    headlineLine1: string;
    headlineGradient: string;
    headlineLine2: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    activeLabel: string;
  };
  subDisciplines: {
    title: string;
    items: SubDiscipline[];
  };
  nodeDiagram: {
    title: string;
    nodes: NodeItem[];
    stats: StatItem[];
  };
  lifecycle: {
    title: string;
    description: string;
    steps: LifecycleStep[];
    vizLabels: {
      tier1: string;
      retention: string;
      revenue: string;
    };
  };
  cta: {
    headlineLine1: string;
    headlineGradient: string;
    description: string;
    buttonText: string;
  };
  footer: {
    logoText: string;
    copyright: string;
    socialLinks: SocialLink[];
  };
}

const DEFAULT_CONTENT: TemplateContent = {
  hero: {
    tagline: "Strategy & Insights",
    headlineLine1: "Data That Drives",
    headlineGradient: "Engineered Relevance",
    headlineLine2: "at Every Stage",
    description:
      "High-trust consultancy for enterprise-grade B2B GTM strategy. We turn architectural complexity into revenue performance through account intelligence.",
    primaryCta: "Get Started",
    secondaryCta: "View Case Studies",
    activeLabel: "ACTIVE",
  },
  subDisciplines: {
    title: "Strategic Sub-disciplines",
    items: [
      {
        id: "sd-1",
        icon: "Target",
        title: "ABM",
        description: "Targeted account excellence through precision orchestration.",
        borderColor: "border-t-indigo-500",
      },
      {
        id: "sd-2",
        icon: "Share2",
        title: "CX Strategy",
        description: "Experience optimization at every digital touchpoint.",
        borderColor: "border-t-sky-400",
      },
      {
        id: "sd-3",
        icon: "RefreshCw",
        title: "Lifecycle",
        description: "End-to-end journey management for complex sales.",
        borderColor: "border-t-indigo-500",
      },
      {
        id: "sd-4",
        icon: "Users",
        title: "Customer Marketing",
        description: "Expansion & advocacy strategies for retained growth.",
        borderColor: "border-t-sky-400",
      },
      {
        id: "sd-5",
        icon: "Search",
        title: "Market Research",
        description: "Data-driven intelligence to guide market entry.",
        borderColor: "border-t-indigo-500",
      },
    ],
  },
  nodeDiagram: {
    title: "From Account Intelligence to Revenue",
    nodes: [
      { id: "nd-1", icon: "Database", label: "ICP" },
      { id: "nd-2", icon: "Layers", label: "Account Tiers" },
      { id: "nd-3", icon: "Radio", label: "Buying Signals" },
      { id: "nd-4", icon: "GitPullRequest", label: "Lifecycle Stage" },
      { id: "nd-5", icon: "TrendingUp", label: "Expansion" },
    ],
    stats: [
      { id: "st-1", value: "42%", label: "Pipeline Efficiency Increase" },
      { id: "st-2", value: "3.1x", label: "ACV Growth for Tier 1" },
      { id: "st-3", value: "18%", label: "Reduction in Sales Cycle" },
    ],
  },
  lifecycle: {
    title: "Executive-Ready GTM Lifecycle",
    description:
      "Our systematic approach to GTM strategy is designed for workshop collaboration and executive buy-in. We map every node of your buyer's journey to a measurable stage.",
    steps: [
      {
        id: "lc-1",
        number: "01",
        title: "Market Discovery",
        description: "Defining the universe of potential.",
      },
      {
        id: "lc-2",
        number: "02",
        title: "Demand Capture",
        description: "Activating intent-driven accounts.",
      },
      {
        id: "lc-3",
        number: "03",
        title: "Conversion Mapping",
        description: "Optimizing the handshake to sales.",
      },
    ],
    vizLabels: {
      tier1: "TIER 1 TARGETS",
      retention: "RETENTION LOOP",
      revenue: "REVENUE",
    },
  },
  cta: {
    headlineLine1: "Ready to Engineer",
    headlineGradient: "Your Next Stage?",
    description:
      "Join enterprise leaders who have replaced guessing with architectural precision. Let's map your strategy.",
    buttonText: "Map Your Strategy",
  },
  footer: {
    logoText: "GTMStack",
    copyright: "© 2024 GTMStack Consultancy. All rights reserved. Engineering Relevance since 2018.",
    socialLinks: [
      { icon: "Share2", href: "#" },
      { icon: "Mail", href: "#" },
    ],
  },
};

const IconMap: Record<string, any> = {
  Target,
  Share2,
  RefreshCw,
  Users,
  Search,
  Database,
  Layers,
  Radio,
  GitPullRequest,
  TrendingUp,
  Mail,
};

export default function Template({ content, pageTitle }: { content?: unknown; pageTitle?: string }) {
  const data = (content as TemplateContent) || DEFAULT_CONTENT;

  return (
    <main className="bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center overflow-hidden bg-slate-950 py-24 px-6 md:px-12">
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {},
            }}
            className="flex flex-col gap-6"
          >
            <motion.span
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
              className="text-sky-400 font-bold tracking-[0.2em] text-sm uppercase"
            >
              {data.hero.tagline}
            </motion.span>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
              className="text-5xl md:text-6xl font-black leading-[1.1] tracking-tight text-white"
            >
              {data.hero.headlineLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300">
                {data.hero.headlineGradient}
              </span>{" "}
              <br />
              {data.hero.headlineLine2}
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
              className="text-slate-400 text-lg max-w-lg leading-relaxed"
            >
              {data.hero.description}
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-4"
            >
              <button className="w-full sm:w-auto bg-sky-400 text-slate-950 px-8 py-4 rounded-lg font-bold hover:bg-white transition-all">
                {data.hero.primaryCta}
              </button>
              <button className="w-full sm:w-auto border border-slate-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition-all">
                {data.hero.secondaryCta}
              </button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative group hidden md:block"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-sky-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-xl min-h-[400px] flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-2 w-24 bg-slate-700 rounded-full"></div>
                  <div className="h-2 w-16 bg-slate-800 rounded-full"></div>
                </div>
                <Activity className="text-sky-400 w-6 h-6" />
              </div>
              <div className="flex-1 flex items-center justify-center py-8">
                <div className="w-full aspect-video bg-slate-950/50 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]"></div>
                  <div className="relative z-10 flex gap-4">
                    <div className="size-12 rounded-full border-2 border-indigo-500/50 flex items-center justify-center">
                      <div className="size-4 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]"></div>
                    </div>
                    <div className="size-12 rounded-full border-2 border-sky-400/30 flex items-center justify-center">
                      <div className="size-4 bg-sky-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-8 flex-1 bg-slate-800/50 rounded flex items-center px-3">
                  <div className="h-1 w-full bg-indigo-500/40 rounded"></div>
                </div>
                <div className="h-8 w-20 bg-indigo-900/30 rounded flex items-center justify-center text-[10px] font-bold text-sky-400">{data.hero.activeLabel}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sub-disciplines Section */}
      <section className="bg-white dark:bg-slate-950 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{data.subDisciplines.title}</h2>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.subDisciplines.items.map((item) => {
              const IconComponent = IconMap[item.icon] || Target;
              return (
                <div key={item.id} className={`group bg-slate-50 dark:bg-slate-900 rounded-xl shadow-sm border-t-4 ${item.borderColor} p-6 hover:shadow-xl transition-all duration-300`}>
                  <IconComponent className="text-indigo-600 dark:text-indigo-400 w-8 h-8 mb-4" />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Node Diagram Section */}
      <section className="bg-slate-900 py-24 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-20">{data.nodeDiagram.title}</h2>
          <div className="relative flex flex-col md:flex-row justify-between items-center mb-16 gap-8 md:gap-0">
            {/* Connector Lines Layer (Desktop Only) */}
            <div className="hidden md:flex absolute inset-0 items-center px-12 pointer-events-none z-0">
              <div className="h-[2px] bg-slate-800 flex-1"></div>
              <div className="h-[2px] bg-slate-800 flex-1"></div>
              <div className="h-[2px] bg-slate-800 flex-1"></div>
              <div className="h-[2px] bg-slate-800 flex-1"></div>
            </div>
            {/* Nodes */}
            {data.nodeDiagram.nodes.map((node) => {
              const IconComponent = IconMap[node.icon] || Database;
              return (
                <div key={node.id} className="relative z-10 flex flex-col items-center gap-4 group">
                  <div className="size-16 rounded-full bg-slate-950 border border-indigo-500/50 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                    <IconComponent className="text-white w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-slate-400 uppercase text-center">{node.label}</span>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 md:mt-24">
            {data.nodeDiagram.stats.map((stat) => (
              <div key={stat.id} className="bg-slate-950/50 p-8 rounded-xl border border-slate-800 text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300 mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifecycle Progress System */}
      <section className="bg-white dark:bg-slate-950 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">{data.lifecycle.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-lg">{data.lifecycle.description}</p>
            <div className="space-y-6">
              {data.lifecycle.steps.map((step) => (
                <div key={step.id} className="flex items-start md:items-center gap-6 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800">
                  <div className="shrink-0 size-10 rounded bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">{step.number}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{step.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative items-center justify-center hidden md:flex">
            {/* Concentric Ring Tier Visualization */}
            <div className="relative size-[400px] flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-slate-200 dark:border-slate-800 border-dashed animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-8 rounded-full border border-slate-200 dark:border-slate-700"></div>
              <div className="absolute inset-20 rounded-full border border-slate-300 dark:border-slate-600"></div>
              <div className="absolute inset-32 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
                <div className="size-20 rounded-full bg-indigo-600 flex items-center justify-center shadow-2xl">
                  <Hexagon className="text-white w-8 h-8" />
                </div>
              </div>
              {/* Floating Labels */}
              <div className="absolute top-0 right-0 bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-xs font-bold text-slate-900 dark:text-white">{data.lifecycle.vizLabels.tier1}</div>
              <div className="absolute bottom-10 left-0 bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-xs font-bold text-slate-900 dark:text-white">{data.lifecycle.vizLabels.retention}</div>
              <div className="absolute top-1/2 -right-10 bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold">{data.lifecycle.vizLabels.revenue}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-slate-950 py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/50 via-slate-950 to-slate-950"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            {data.cta.headlineLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-300">
              {data.cta.headlineGradient}
            </span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            {data.cta.description}
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-lg text-lg font-bold flex items-center justify-center gap-3 mx-auto transition-all transform hover:scale-105 w-full sm:w-auto">
            {data.cta.buttonText}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-indigo-600/20 rounded flex items-center justify-center text-indigo-400">
              <Network className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg text-white">
              {data.footer.logoText}
            </span>
          </div>
          <div className="text-slate-500 text-sm text-center md:text-left">
            {data.footer.copyright}
          </div>
          <div className="flex gap-6">
            {data.footer.socialLinks.map((link, idx) => {
              const SocialIcon = IconMap[link.icon] || Share2;
              return (
                <Link key={idx} href={link.href} className="text-slate-400 hover:text-white transition-colors">
                  <SocialIcon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </footer>
    </main>
  );
}
