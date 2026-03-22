"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  Settings2,
  Target,
  Network,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Zap,
  PieChart,
  ArrowRight,
  Quote,
  Factory,
  Brain,
  Newspaper,
  LayoutGrid,
} from "lucide-react";

/**
 * Content Shape:
 * {
 *   hero: { badge, title, subtitle, primaryCta, secondaryCta },
 *   metrics: Array<{ value, label }>,
 *   projects: Array<{ id, category, title, description, icon, badge, achievement }>,
 *   quote: { text, highlight },
 *   navigation: string[]
 * }
 * icon/badge are Lucide icon names (e.g. "Settings2", "Target"); template maps to components.
 */
export interface ProjectsTemplateContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  metrics: Array<{ value: string; label: string }>;
  projects: Array<{
    id: number;
    category: string;
    title: string;
    description: string;
    icon: string;
    badge: string;
    achievement: string;
  }>;
  quote: { text: string; highlight: string };
  navigation: string[];
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Settings2,
  Target,
  Network,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Zap,
  PieChart,
  ArrowRight,
  Quote,
  Factory,
  Brain,
  Newspaper,
  LayoutGrid,
};

export type ProjectsTemplateProps = {
  content: ProjectsTemplateContent | null;
  pageTitle?: string;
  theme?: string;
  heroVisualId?: string;
};

function PageTemplate({ content }: { content: ProjectsTemplateContent }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="bg-[#071024] font-display text-slate-200 antialiased min-h-screen">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .text-gradient-orange {
            background: linear-gradient(to right, #F97316, #EAB308);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .bg-gradient-orange {
            background: linear-gradient(to right, #F97316, #EAB308);
        }
        .blueprint-grid {
            background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 32px 32px;
        }
      `,
        }}
      />

      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B132B]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
              <Building2 className="text-white w-5 h-5" />
            </div>
            <h2 className="text-xl font-black tracking-tighter text-white">
              REVENUEARCHITECT
            </h2>
          </Link>
          <div className="hidden items-center gap-8 lg:flex">
            {content.navigation.map((item, idx) => (
              <Link
                key={idx}
                href="#"
                className={`text-sm font-medium transition-colors hover:text-white ${
                  item.includes("Active")
                    ? "text-primary underline underline-offset-8 decoration-2 font-semibold"
                    : "text-slate-400"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
          <button className="bg-gradient-orange rounded-lg px-5 py-2 text-sm font-bold text-white transition-transform active:scale-95 shadow-lg shadow-orange-500/20">
            Get Audited
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B132B] blueprint-grid py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span
              variants={itemVariants}
              className="mb-6 inline-flex items-center rounded border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary"
            >
              {content.hero.badge}
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="mb-6 text-5xl font-black leading-[1.1] tracking-tight text-white lg:text-7xl"
            >
              <span className="text-gradient-orange">Outcome-First</span> Blueprints
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mb-10 text-lg leading-relaxed text-slate-400 lg:text-xl"
            >
              {content.hero.subtitle}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <button className="bg-primary rounded-lg px-8 py-4 text-base font-bold text-white transition-all hover:bg-blue-700 shadow-xl shadow-primary/30">
                {content.hero.primaryCta}
              </button>
              <button className="rounded-lg border border-white/20 bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/5">
                {content.hero.secondaryCta}
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative dashboard element */}
        <div className="absolute -right-20 top-1/2 hidden -translate-y-1/2 opacity-20 lg:block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="h-96 w-96 rounded-full border border-primary/30 p-8"
          >
            <div className="h-full w-full rounded-full border border-primary/20 p-8">
              <div className="h-full w-full rounded-full border border-primary/10"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Ribbon */}
      <section className="bg-[#E8EDF4] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
            {content.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                className="flex flex-col gap-1 border-l border-[#0B132B]/10 pl-6"
              >
                <span className="text-4xl font-black text-gold-metric lg:text-5xl">
                  {metric.value}
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-[#0B132B]/60">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Projects Grid */}
      <section className="bg-[#071024] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-black text-white lg:text-4xl">
                Selected Projects
              </h2>
              <p className="mt-2 text-slate-500 italic">
                Engineering the engines of modern growth.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {content.projects.map((project) => {
              const IconComponent = ICON_MAP[project.icon] ?? Settings2;
              const BadgeComponent = ICON_MAP[project.badge] ?? TrendingUp;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#162447] p-8 transition-all hover:border-primary/50 cursor-pointer"
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white">
                        {project.title}
                      </h3>
                    </div>
                    <div className="text-white/20 transition-colors group-hover:text-primary">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="mb-8 text-slate-400">{project.description}</p>
                  <div className="flex items-center gap-2 border-t border-white/5 pt-6">
                    <div className="text-gold-metric">
                      <BadgeComponent className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gold-metric">
                      {project.achievement}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 flex justify-center">
            <button className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-10 py-4 font-bold text-white transition-all hover:bg-white/10 hover:border-white/20">
              View All Case Studies
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-[#E8EDF4] py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Quote className="w-12 h-12 text-[#0B132B]/20 mb-8 mx-auto" />
          <h2 className="text-3xl font-black italic leading-tight text-[#0B132B] lg:text-5xl">
            {content.quote.text}
            <span className="text-gradient-orange not-italic">
              {content.quote.highlight}
            </span>{" "}
            that prove strategy becomes execution.
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            className="mt-10 h-1 bg-primary mx-auto"
          />
        </div>
      </section>

      {/* Related Teasers */}
      <section className="bg-[#0B132B] py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Industries", icon: Factory },
              { label: "Expertise", icon: Brain },
              { label: "Blog", icon: Newspaper },
              { label: "Gallery", icon: LayoutGrid },
            ].map(({ label, icon: Icon }) => (
              <Link
                key={label}
                href="#"
                className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-6 transition-all hover:bg-primary/10 hover:border-primary/30"
              >
                <span className="font-bold text-white">{label}</span>
                <div className="text-slate-500 group-hover:text-primary">
                  <Icon className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="bg-[#0B132B] py-24 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <h2 className="mb-8 text-4xl font-black text-white lg:text-5xl">
            Ready to Ship Your Next Revenue Blueprint?
          </h2>
          <button className="bg-primary hover:bg-blue-700 transition-all rounded-lg px-12 py-5 text-lg font-black text-white shadow-xl shadow-primary/20 active:scale-95">
            See project methodology
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B132B] py-16 text-slate-500">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            <div className="col-span-1 lg:col-span-2">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                  <Building2 className="text-white w-4 h-4" />
                </div>
                <h2 className="text-lg font-black tracking-tighter text-white">
                  REVENUEARCHITECT
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed">
                The partner for enterprise organizations who require architectural
                precision in their go-to-market systems. Proven at the highest
                level of scale.
              </p>
            </div>
            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
                Systems
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="#"
                  >
                    Revenue Operations
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="#"
                  >
                    Account-Based Growth
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="#"
                  >
                    Demand Generation
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="#"
                  >
                    Sales Enablement
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
                Connect
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="#"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="#"
                  >
                    Newsletter
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="#"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="#"
                  >
                    Project Inquiries
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-white/5 pt-8 text-xs font-medium">
            © 2024 REVENUEARCHITECT. All Rights Reserved. Engineered for
            Performance.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ProjectsTemplate({
  content,
}: ProjectsTemplateProps) {
  if (!content) return null;
  return <PageTemplate content={content} />;
}
