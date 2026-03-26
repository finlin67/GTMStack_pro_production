'use client'
import React from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUp, 
  Megaphone, 
  Search, 
  DollarSign, 
  Share2, 
  TrendingUp, 
  ChevronRight,
  Mail,
  Twitter,
  Linkedin,
  Activity,
  Heart,
  ShieldCheck,
  ClipboardList
} from 'lucide-react';

/**
 * Expected content shape for the CMS:
 * {
 *   brand: { name: string; suffix: string; logoText: string; };
 *   hero: {
 *     badge: string;
 *     title: string[];
 *     description: string;
 *     ctaPrimary: { label: string; href: string };
 *     ctaSecondary: { label: string; href: string };
 *     image: string;
 *     metric: { label: string; value: string; change: string; };
 *   };
 *   metricsSection: {
 *     items: Array<{ label: string; value: string; subtext: string; trend: 'up' | 'down'; }>;
 *   };
 *   capabilitiesSection: {
 *     title: string;
 *     description: string;
 *     link: { label: string; href: string };
 *     items: Array<{ title: string; description: string; iconName: string; linkLabel: string; href: string; }>;
 *   };
 *   philosophySection: {
 *     badge: string;
 *     quote: string;
 *     highlight: string;
 *     description: string;
 *     image: string;
 *   };
 *   growthSection: {
 *     title: string;
 *     items: Array<{ title: string; description: string; tag: string; image: string; href: string; }>;
 *   };
 *   ctaSection: {
 *     title: string;
 *     description: string;
 *     button: { label: string; href: string };
 *   };
 *   footer: {
 *     description: string;
 *     sections: Array<{ title: string; links: Array<{ label: string; href: string }>; }>;
 *     socials: Array<{ platform: string; href: string }>;
 *     copyright: string;
 *   };
 * }
 */

const DEFAULT_CONTENT = {
  brand: {
    name: "REVENUE",
    suffix: "ENGAGEMENT",
    logoText: "R"
  },
  hero: {
    badge: "Demand Generation & Engagement",
    title: ["Predictable Growth", "Engineered Engagement"],
    description: "We build high-performance demand engines that transform passive interest into active revenue. Our methodology combines data-driven architecture with psychological engagement triggers.",
    ctaPrimary: { label: "Start Your Audit", href: "#" },
    ctaSecondary: { label: "View Methodology", href: "#" },
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    metric: {
      label: "Engagement Velocity",
      value: "+145%",
      change: "vs last quarter"
    }
  },
  metricsSection: {
    items: [
      { label: "Conversion Lift", value: "3.2x", subtext: "Average improvement in high-intent leads", trend: 'up' },
      { label: "CAC Efficiency", value: "-28%", subtext: "Reduction in customer acquisition cost", trend: 'down' },
      { label: "Pipeline Velocity", value: "+52%", subtext: "Increase in sales cycle speed", trend: 'up' }
    ]
  },
  capabilitiesSection: {
    title: "Engagement Capabilities",
    description: "Our framework synchronizes every touchpoint to create a seamless journey from awareness to advocacy.",
    link: { label: "Explore Our Framework", href: "#" },
    items: [
      { 
        title: "Intent-Based Demand", 
        description: "Capturing and creating demand by identifying high-intent signals across the digital ecosystem.",
        iconName: "campaign",
        linkLabel: "Learn More",
        href: "#"
      },
      { 
        title: "Behavioral SEO", 
        description: "Content architecture designed around user intent and search behavior to dominate commercial keywords.",
        iconName: "search",
        linkLabel: "Learn More",
        href: "#"
      },
      { 
        title: "Performance Media", 
        description: "Precision-targeted paid campaigns optimized for engagement depth and conversion quality.",
        iconName: "paid",
        linkLabel: "Learn More",
        href: "#"
      },
      { 
        title: "Revenue Operations", 
        description: "Unifying your tech stack and data to provide a single source of truth for growth attribution.",
        iconName: "hub",
        linkLabel: "Learn More",
        href: "#"
      },
      { 
        title: "Growth Engineering", 
        description: "Building viral loops and friction-free conversion paths directly into your product experience.",
        iconName: "auto_graph",
        linkLabel: "Learn More",
        href: "#"
      }
    ]
  },
  philosophySection: {
    badge: "The Philosophy",
    quote: "Engagement isn't an accident — it's",
    highlight: "architected momentum",
    description: "We believe that sustainable growth is the byproduct of removing friction and adding value at every stage of the customer lifecycle. We don't just find customers; we build relationships.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
  },
  growthSection: {
    title: "Success Stories",
    items: [
      {
        title: "Scaling Fintech to $100M",
        description: "How we rebuilt the engagement engine for a Series B startup, resulting in 4x pipeline growth.",
        tag: "CASE STUDY",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        href: "#"
      },
      {
        title: "The Future of B2B Demand",
        description: "Why traditional lead gen is dying and the shift towards intent-driven engagement models.",
        tag: "INSIGHTS",
        image: "https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&w=800&q=80",
        href: "#"
      },
      {
        title: "Data-Driven Personalization",
        description: "Leveraging first-party data to create hyper-relevant experiences at scale for enterprise clients.",
        tag: "TECHNICAL",
        image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&w=800&q=80",
        href: "#"
      }
    ]
  },
  ctaSection: {
    title: "Ready to Engineer Your Growth?",
    description: "Share where demand or engagement is breaking down—we can compare notes and point you to the right next step.",
    button: { label: "Contact", href: "/contact" }
  },
  footer: {
    description: "Building the infrastructure for the next generation of high-growth enterprise companies.",
    sections: [
      {
        title: "Expertise",
        links: [
          { label: "Demand Gen", href: "#" },
          { label: "SEO Strategy", href: "#" },
          { label: "Paid Media", href: "#" },
          { label: "RevOps", href: "#" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "#" },
          { label: "Methodology", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Contact", href: "#" }
        ]
      }
    ],
    socials: [
      { platform: "LinkedIn", href: "#" },
      { platform: "Twitter", href: "#" },
      { platform: "Mail", href: "#" }
    ],
    copyright: "© 2024 RevenueEngagement Inc. All rights reserved."
  }
};

const IconMap: Record<string, React.ElementType> = {
  campaign: Megaphone,
  search: Search,
  paid: DollarSign,
  hub: Share2,
  auto_graph: TrendingUp,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  activity: Activity,
  heart: Heart,
  shield: ShieldCheck,
  clipboard: ClipboardList
};

type Props = { 
  content?: unknown; 
  pageTitle?: string 
};

export default function Template(props: Props) {
  // Safe data access with fallback to DEFAULT_CONTENT
  const content: any = props.content || DEFAULT_CONTENT;

  return (
    <div className="bg-[#020617] text-slate-50 font-sans antialiased min-h-screen selection:bg-orange-500/30">
      {/* Sophisticated Background Layers */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/5 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-32 lg:pt-40 lg:pb-48 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-3/5"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-widest uppercase mb-10">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                {content.hero?.badge}
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[0.95]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-400">
                  {content.hero?.title?.[0]}
                </span>
                <span className="block mt-4">{content.hero?.title?.[1]}</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-400 mb-12 font-medium max-w-2xl leading-relaxed">
                {content.hero?.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href={content.hero?.ctaPrimary?.href || "#"}
                  className="group bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
                >
                  {content.hero?.ctaPrimary?.label}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href={content.hero?.ctaSecondary?.href || "#"}
                  className="px-10 py-5 rounded-xl border border-white/10 hover:border-white/30 text-white font-bold text-lg transition-all hover:bg-white/5 flex items-center justify-center"
                >
                  {content.hero?.ctaSecondary?.label}
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:w-2/5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] bg-[#162447]">
                <img 
                  alt={content.hero?.title?.join(' ') || "Hero Visual"} 
                  className="w-full h-full object-cover opacity-40 mix-blend-luminosity" 
                  src={content.hero?.image || "https://picsum.photos/1200/800"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                
                {/* Floating Metric Card */}
                <div className="absolute bottom-10 left-6 right-6">
                  <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">{content.hero?.metric?.label}</div>
                        <div className="text-4xl font-black text-white flex items-baseline gap-2">
                          {content.hero?.metric?.value}
                          <span className="text-lg text-orange-400 font-bold">{content.hero?.metric?.change}</span>
                        </div>
                      </div>
                      <div className="h-16 w-32 flex items-end gap-1.5">
                        {[0.3, 0.5, 0.4, 0.7, 0.6, 0.9, 0.8, 1].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                            className={`flex-1 rounded-t-sm ${i === 7 ? 'bg-orange-500' : 'bg-white/10'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-blue-600 to-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Metrics Strip */}
        <section className="py-24 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {content.metricsSection?.items?.map((metric: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mb-4">{metric.label}</div>
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${metric.trend === 'up' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      <ArrowUp className={`w-8 h-8 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                    </div>
                    <span className="text-6xl font-black text-white tracking-tighter">{metric.value}</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-4 font-medium leading-relaxed">{metric.subtext}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="py-32 lg:py-48 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
              <div className="max-w-3xl">
                <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
                  {content.capabilitiesSection?.title}
                </h2>
                <p className="text-xl text-slate-400 font-medium leading-relaxed">
                  {content.capabilitiesSection?.description}
                </p>
              </div>
              <a 
                className="inline-flex items-center gap-3 text-orange-400 font-bold text-lg hover:text-orange-300 transition-colors group" 
                href={content.capabilitiesSection?.link?.href || "#"}
              >
                {content.capabilitiesSection?.link?.label} 
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.capabilitiesSection?.items?.map((cap: any, idx: number) => {
                const Icon = IconMap[cap.iconName] || TrendingUp;
                return (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -10 }}
                    className="group relative bg-white/[0.03] hover:bg-white/[0.06] rounded-3xl p-10 border border-white/5 hover:border-orange-500/30 transition-all duration-500"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-10 text-orange-500 border border-orange-500/20 group-hover:scale-110 transition-transform">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{cap.title}</h3>
                    <p className="text-slate-400 font-medium leading-relaxed mb-10">
                      {cap.description}
                    </p>
                    <a 
                      className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 group-hover:text-white transition-colors" 
                      href={cap.href || "#"}
                    >
                      {cap.linkLabel} <ChevronRight size={18} />
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-32 lg:py-48 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent border-y border-white/5 px-6 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-orange-500 font-black tracking-[0.4em] uppercase text-xs mb-10 block">
              {content.philosophySection?.badge}
            </span>
            <blockquote className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-12 tracking-tight">
              "{content.philosophySection?.quote} <span className="text-orange-500">{content.philosophySection?.highlight}</span>."
            </blockquote>
            <p className="text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed mb-16">
              {content.philosophySection?.description}
            </p>
            <div className="relative h-24 w-full overflow-hidden rounded-2xl opacity-20">
              <img 
                alt="Philosophy Visual" 
                className="w-full h-full object-cover grayscale" 
                src={content.philosophySection?.image || "https://picsum.photos/1200/200"}
              />
            </div>
          </div>
        </section>

        {/* Content Teasers */}
        <section className="py-32 lg:py-48 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-20 tracking-tight">{content.growthSection?.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {content.growthSection?.items?.map((item: any, idx: number) => (
                <a key={idx} className="group flex flex-col" href={item.href || "#"}>
                  <div className="relative overflow-hidden rounded-3xl mb-8 aspect-[16/10] bg-[#162447] border border-white/5">
                    <img 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                      src={item.image}
                    />
                    <div className="absolute top-6 left-6 bg-[#020617]/80 backdrop-blur-md text-white text-[10px] font-black tracking-[0.2em] px-4 py-2 rounded-lg border border-white/10 uppercase">
                      {item.tag}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors leading-tight">{item.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">{item.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 lg:py-48 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="relative max-w-5xl mx-auto text-center">
            <h2 className="text-5xl lg:text-8xl font-black text-white mb-10 tracking-tight leading-[0.95]">
              {content.ctaSection?.title}
            </h2>
            <p className="text-xl lg:text-2xl text-slate-400 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
              {content.ctaSection?.description}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a 
                href={content.ctaSection?.button?.href || "#"}
                className="bg-gradient-to-r from-orange-500 to-yellow-400 text-[#020617] font-black text-xl px-16 py-6 rounded-2xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center gap-4"
              >
                {content.ctaSection?.button?.label}
                <ArrowRight size={24} />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#020617] border-t border-white/5 pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-10 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-[#020617] font-black text-sm group-hover:scale-105 transition-transform">
                  {content.brand?.logoText || 'R'}
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-bold tracking-tight text-white">{content.brand?.name}</span>
                  <span className="text-[10px] font-medium text-slate-500 tracking-[0.2em] uppercase mt-1">{content.brand?.suffix}</span>
                </div>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed mb-10">
                {content.footer?.description}
              </p>
              <div className="flex gap-6">
                {content.footer?.socials?.map((social: any, idx: number) => {
                  const Icon = IconMap[social.platform.toLowerCase()] || Mail;
                  return (
                    <a key={idx} className="text-slate-500 hover:text-orange-500 transition-colors" href={social.href}>
                      <span className="sr-only">{social.platform}</span>
                      <Icon size={24} />
                    </a>
                  );
                })}
              </div>
            </div>

            {content.footer?.sections?.map((section: any, idx: number) => (
              <div key={idx}>
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-10">{section.title}</h4>
                <ul className="space-y-6">
                  {section.links?.map((link: any, lIdx: number) => (
                    <li key={lIdx}>
                      <a className="text-slate-500 hover:text-white font-bold transition-colors" href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-600 text-sm font-medium">{content.footer?.copyright}</p>
            <div className="flex gap-10 text-slate-600 text-sm font-medium">
              <span aria-disabled="true" className="hover:text-white transition-colors cursor-default">Privacy Policy</span>
              <span aria-disabled="true" className="hover:text-white transition-colors cursor-default">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
