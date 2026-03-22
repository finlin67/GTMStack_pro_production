"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  RefreshCw,
  Users,
  BarChart3,
  Database,
  Edit3,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import type { ExpertiseItem } from "@/lib/types";
import type { PillarId } from "./pillarMap";
import { SYSTEMS_OPERATIONS_CONTENT } from "@/content/expertise/pillars/systems-operations";
import type { SystemsOperationsService } from "@/content/expertise/pillars/systems-operations";

// NOTE: Move to globals/layout:
// - <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
// - body { font-family: 'Inter', sans-serif; }
// - .bg-clip-text { -webkit-background-clip: text; background-clip: text; }
// - .hover-glow:hover { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }

const ICON_MAP: Record<string, React.ReactNode> = {
  zap: <Zap className="w-6 h-6 text-[#3B82F6]" />,
  "refresh-cw": <RefreshCw className="w-6 h-6 text-[#3B82F6]" />,
  users: <Users className="w-6 h-6 text-[#3B82F6]" />,
  "bar-chart-3": <BarChart3 className="w-6 h-6 text-[#3B82F6]" />,
  database: <Database className="w-6 h-6 text-[#3B82F6]" />,
  "edit-3": <Edit3 className="w-6 h-6 text-[#3B82F6]" />,
};

function getServiceIcon(service: SystemsOperationsService) {
  return ICON_MAP[service.iconKey] ?? <Zap className="w-6 h-6 text-[#3B82F6]" />;
}

const FadeInSection = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      <div>{children}</div>
    </motion.section>
  );
};

export interface SystemsOperationsPillarCategoryProps {
  kind: "category";
  children: React.ReactNode;
  pillarId: PillarId;
  pageTitle?: string;
  theme?: "dark" | "light";
  heroVisualId?: string;
}

export interface SystemsOperationsPillarTopicProps {
  kind: "topic";
  item: ExpertiseItem;
  pillarId: PillarId;
  pageTitle?: string;
  theme?: "dark" | "light";
  heroVisualId?: string;
}

export type SystemsOperationsPillarProps =
  | SystemsOperationsPillarCategoryProps
  | SystemsOperationsPillarTopicProps;

function SystemsOperationsPillar(props: SystemsOperationsPillarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const content = SYSTEMS_OPERATIONS_CONTENT;

  const isCategory = props.kind === "category";
  const pageTitle = props.pageTitle ?? "Systems & Operations";

  return (
    <div className="dark min-h-screen bg-[#0B132B] text-white font-sans antialiased overflow-x-hidden">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0B132B]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-xl font-bold tracking-tighter uppercase"
              >
                Revenue<span className="text-[#3B82F6]">Architect</span>
              </Link>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <Link
                className="text-[#3B82F6] font-semibold border-b-2 border-[#3B82F6] pb-1"
                href="/"
              >
                Expertise
              </Link>
              <Link
                className="text-gray-300 hover:text-white transition-colors"
                href="/"
              >
                Services
              </Link>
              <Link
                className="text-gray-300 hover:text-white transition-colors"
                href="/"
              >
                Methodology
              </Link>
              <Link
                className="text-gray-300 hover:text-white transition-colors"
                href="/"
              >
                Insights
              </Link>
              <Link
                className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-6 py-2 rounded-md font-medium transition-all"
                href="/"
              >
                Let&apos;s Talk
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#071024] border-b border-white/10 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-4">
                <Link
                  className="block text-white font-semibold"
                  href="/"
                >
                  Expertise
                </Link>
                <Link className="block text-gray-300" href="/">
                  Services
                </Link>
                <Link className="block text-gray-300" href="/">
                  Methodology
                </Link>
                <Link className="block text-gray-300" href="/">
                  Insights
                </Link>
                <Link
                  className="block bg-[#2563EB] text-center text-white px-6 py-2 rounded-md"
                  href="/"
                >
                  Let&apos;s Talk
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40 bg-[#0B132B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                {isCategory ? (
                  <>
                    Systems & <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F97316] to-[#EAB308]">
                      Operations
                    </span>
                  </>
                ) : (
                  <>
                    {props.item.title}
                  </>
                )}
              </h1>
              <p className="mt-6 text-xl text-gray-400 max-w-xl leading-relaxed">
                {isCategory
                  ? "Enterprise-grade infrastructure that unifies RevOps, governs AI workflows, and makes growth predictable and scalable at enterprise velocity."
                  : props.item.description ??
                    props.item.positioning ??
                    "Systems & Operations expertise."}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  className="bg-[#2563EB] hover:bg-[#1E40AF] text-white px-8 py-4 rounded-md font-bold text-lg transition-all"
                  href="/"
                >
                  Explore Infrastructure
                </Link>
                <Link
                  className="border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-md font-bold text-lg transition-all"
                  href="/"
                >
                  Request Systems Audit
                </Link>
              </div>
            </motion.div>

            {/* Hero Visual Animation Component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-md aspect-square bg-[#162447]/30 rounded-2xl border border-white/10 p-8 relative flex items-center justify-center">
                <svg
                  className="w-full h-full text-[#3B82F6]/40"
                  viewBox="0 0 200 200"
                >
                  <path
                    d="M20 50 H180 M20 100 H180 M20 150 H180 M50 20 V180 M100 20 V180 M150 20 V180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                  <motion.path
                    d="M50 50 Q100 20 150 50"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeDasharray="20 10"
                    animate={{ strokeDashoffset: [0, 60] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                  <motion.path
                    d="M50 150 Q100 180 150 150"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeDasharray="20 10"
                    animate={{ strokeDashoffset: [60, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                  <circle cx="50" cy="50" fill="#3B82F6" r="4" />
                  <circle cx="150" cy="50" fill="#EAB308" r="4" />
                  <motion.circle
                    cx="100"
                    cy="100"
                    fill="#3B82F6"
                    r="6"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                  <circle cx="50" cy="150" fill="#3B82F6" r="4" />
                  <circle cx="150" cy="150" fill="#3B82F6" r="4" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#0B132B]/80 border border-[#3B82F6]/30 p-4 rounded-lg backdrop-blur shadow-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                        className="h-2 w-2 rounded-full bg-[#EAB308]"
                      />
                      <span className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase">
                        AI Signal Active
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Metrics Strip */}
      <section className="bg-[#E8EDF4] py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-[#0B132B]">
            {content.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-[#EAB308] text-3xl font-bold">
                  {metric.value}
                </span>
                <span className="text-[#0B132B]/70 text-sm font-semibold uppercase mt-1">
                  {metric.label}
                </span>
                <div className="w-8 h-1 bg-[#3B82F6] mt-3 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insertion point: category mode – page-specific content (children) */}
      {isCategory && (
        <section className="bg-[#0B132B] py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {props.children}
          </div>
        </section>
      )}

      {/* Insertion point: topic mode – placeholder (replace later) */}
      {!isCategory && (
        <section className="bg-[#071024] py-16 lg:py-24 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              {props.item.title}
            </h2>
            <p className="text-gray-400 max-w-3xl leading-relaxed">
              {props.item.description ??
                props.item.positioning ??
                'Add the topic narrative in content to surface the full methodology for this layer.'}
            </p>
          </div>
        </section>
      )}

      {/* Core Services Grid */}
      <FadeInSection className="bg-[#071024] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Core Systems Architectures
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Precision-engineered solutions for the modern enterprise GTM
              stack.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-[#162447] p-8 rounded-xl border border-white/10 hover-glow group transition-all"
              >
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center mb-6 border border-[#3B82F6]/20">
                  {getServiceIcon(service)}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  className="text-[#3B82F6] font-semibold text-sm flex items-center group-hover:underline"
                  href="/"
                >
                  View Details <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Philosophy Section */}
      <FadeInSection className="bg-[#F1F4F8] py-24 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#0B132B]">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0B132B] leading-tight tracking-tight">
            Systems aren&apos;t tools — they&apos;re <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F97316] to-[#EAB308]">
              engineered power.
            </span>
          </h2>
          <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We move beyond tactical &quot;tool management&quot; to architectural
            engineering. Our focus is on creating a resilient framework where
            data flows without friction and AI acts as a multiplier, not a
            liability.
          </p>
        </div>
      </FadeInSection>

      {/* Ops Intelligence (Related Content) */}
      <FadeInSection className="bg-[#0B132B] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Ops Intelligence</h2>
              <p className="text-gray-400">
                Latest transformation projects and architectural insights.
              </p>
            </div>
            <Link
              className="text-[#3B82F6] font-semibold border-b border-[#3B82F6] pb-1 hover:text-[#2563EB] transition-colors"
              href="/"
            >
              View All Insights
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.insights.map((insight, idx) => (
              <motion.div
                key={idx}
                whileHover={{ borderColor: "rgba(59, 130, 246, 0.5)" }}
              >
                <Link
                  className="group block bg-[#162447] rounded-xl overflow-hidden border border-white/5 transition-all h-full"
                  href="/"
                >
                  <div
                    className={`h-40 bg-gray-800 relative overflow-hidden bg-gradient-to-br ${insight.gradient}`}
                  >
                    <div className="absolute inset-4 border border-dashed border-white/10 rounded"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 opacity-20 bg-[#3B82F6] blur-2xl rounded-full"></div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-mono text-[#3B82F6] uppercase">
                      {insight.category}
                    </span>
                    <h4 className="text-lg font-bold mt-2 group-hover:text-[#3B82F6] transition-colors">
                      {insight.title}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* CTA Section */}
      <section className="bg-[#0B132B] py-20 lg:py-32 border-t border-white/10 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-5xl font-extrabold mb-8 leading-tight"
          >
            Ready to Build a Unified, <br />
            AI-Governed Revenue Engine?
          </motion.h2>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              className="inline-block bg-[#2563EB] hover:bg-[#1E40AF] text-white px-10 py-5 rounded-md font-bold text-xl transition-all shadow-lg hover:shadow-[#3B82F6]/20"
              href="/"
            >
              Schedule Systems Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#071024] py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold tracking-tighter uppercase">
                Revenue<span className="text-[#3B82F6]">Architect</span>
              </span>
              <p className="mt-4 text-gray-500 max-w-sm leading-relaxed">
                Architecting the future of enterprise GTM. Systems, strategy,
                and execution at the intersection of revenue and technology.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">
                Expertise
              </h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="/"
                  >
                    Strategy & Growth
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors text-[#3B82F6] font-medium"
                    href="/"
                  >
                    Systems & Ops
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="/"
                  >
                    Revenue Engineering
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="/"
                  >
                    AI Transformation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">
                Connect
              </h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="/"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="/"
                  >
                    Twitter / X
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="/"
                  >
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors"
                    href="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© 2023 RevenueArchitect. All rights reserved.</p>
            <p>Engineered for Enterprise Performance.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function SystemsOperationsPillarCategory(
  props: import("./pillarMap").PillarCategoryProps
) {
  return (
    <SystemsOperationsPillar kind="category" pillarId={props.pillarId}>
      {props.children}
    </SystemsOperationsPillar>
  );
}

export function SystemsOperationsPillarTopic(
  props: import("./pillarMap").PillarTopicProps
) {
  return (
    <SystemsOperationsPillar
      kind="topic"
      pillarId={props.pillarId}
      item={props.item}
    />
  );
}

export default SystemsOperationsPillar;
