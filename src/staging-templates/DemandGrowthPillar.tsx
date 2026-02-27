'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  motion, 
  AnimatePresence 
} from 'framer-motion';
import { 
  Menu, 
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
  X,
  Activity,
  Heart,
  Stethoscope,
  ShieldCheck,
  ClipboardList
} from 'lucide-react';

/* Expected content shape:
{
  brand: {
    name: string;
    suffix: string;
    logoText: string;
  };
  navigation: Array<{
    label: string;
    href: string;
    active?: boolean;
  }>;
  navCta: {
    label: string;
    href: string;
  };
  hero: {
    badge: string;
    title: string[];
    description: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    image: string;
    metric: {
      label: string;
      value: string;
      change: string;
    };
  };
  metricsSection: {
    items: Array<{
      label: string;
      value: string;
      subtext: string;
      trend: 'up' | 'down';
    }>;
  };
  capabilitiesSection: {
    title: string;
    description: string;
    link: { label: string; href: string };
    items: Array<{
      title: string;
      description: string;
      iconName: string;
      linkLabel: string;
      href: string;
    }>;
  };
  philosophySection: {
    badge: string;
    quote: string;
    highlight: string;
    description: string;
    image: string;
  };
  growthSection: {
    title: string;
    items: Array<{
      title: string;
      description: string;
      tag: string;
      image: string;
      href: string;
    }>;
  };
  ctaSection: {
    title: string;
    description: string;
    button: { label: string; href: string };
  };
  footer: {
    description: string;
    sections: Array<{
      title: string;
      links: Array<{ label: string; href: string }>;
    }>;
    socials: Array<{ platform: string; href: string }>;
    copyright: string;
  };
}
*/

type Props = { 
  content: any; 
  pageTitle?: string; 
  theme?: string; 
  heroVisualId?: string 
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
  stethoscope: Stethoscope,
  shield: ShieldCheck,
  clipboard: ClipboardList
};

export default function HealthcareTemplate({ content, pageTitle, theme, heroVisualId }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!content) return null;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-sans antialiased min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-navy-base/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-12">
              <div className="flex-shrink-0">
                <Link className="text-2xl font-bold tracking-tight text-white flex items-center gap-2" href="/">
                  <span className="w-8 h-8 rounded bg-growth-gradient flex items-center justify-center text-navy-base font-extrabold text-lg">
                    {content.brand?.logoText || 'H'}
                  </span>
                  {content.brand?.name}<span className="font-light text-slate-400">{content.brand?.suffix}</span>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {content.navigation?.map((item: any) => (
                    <Link
                      key={item.label}
                      className={`${
                        item.active 
                          ? "text-white border-b-2 border-primary" 
                          : "text-slate-300 hover:text-white"
                      } px-3 py-2 text-sm font-medium transition-colors`}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <motion.div whileHover={{ y: -2 }}>
                <Link
                  className="bg-growth-gradient hover:bg-growth-gradient-hover text-navy-base font-bold px-6 py-2.5 rounded shadow-lg shadow-orange-500/20 transition-all block"
                  href={content.navCta?.href || "#"}
                >
                  {content.navCta?.label}
                </Link>
              </motion.div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none"
                type="button"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-navy-base border-b border-white/10 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {content.navigation?.map((item: any) => (
                  <Link
                    key={item.label}
                    className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link 
                  className="bg-growth-gradient text-navy-base font-bold block px-3 py-2 rounded-md text-base text-center" 
                  href={content.navCta?.href || "#"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {content.navCta?.label}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-navy-base">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-lime-muted text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-lime-muted animate-pulse"></span>
              {content.hero?.badge}
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              <span className="text-gradient">{content.hero?.title?.[0]}</span>
              <span className="block text-white mt-2">{content.hero?.title?.[1]}</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 font-light max-w-2xl leading-relaxed">
              {content.hero?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={content.hero?.ctaPrimary?.href || "#"}
                className="bg-primary hover:bg-blue-600 text-white px-8 py-3.5 rounded font-semibold text-lg transition-colors shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                {content.hero?.ctaPrimary?.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href={content.hero?.ctaSecondary?.href || "#"}
                className="px-8 py-3.5 rounded border border-white/20 hover:border-white/40 text-white font-semibold text-lg transition-colors flex items-center justify-center gap-2 hover:bg-white/5"
              >
                {content.hero?.ctaSecondary?.label}
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] bg-navy-card">
              <Image 
                alt={content.hero?.title?.join(' ') || "Hero Visual"} 
                className="object-cover opacity-60 mix-blend-overlay" 
                src={content.hero?.image || "https://picsum.photos/1200/800"}
                width={1200}
                height={800}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-base via-transparent to-transparent"></div>
              
              {/* Overlay Metrics visual */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <div className="text-slate-400 text-sm font-medium mb-1">{content.hero?.metric?.label}</div>
                      <div className="text-3xl font-bold text-white">{content.hero?.metric?.value} <span className="text-lg text-lime-muted font-normal">{content.hero?.metric?.change}</span></div>
                    </div>
                    <div className="h-12 w-24 flex items-end gap-1">
                      <div className="w-1/4 h-1/3 bg-white/20 rounded-t-sm"></div>
                      <div className="w-1/4 h-1/2 bg-white/20 rounded-t-sm"></div>
                      <div className="w-1/4 h-3/4 bg-white/20 rounded-t-sm"></div>
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-1/4 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-t-sm"
                      ></motion.div>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-orange-500 to-lime-muted"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="py-12 bg-slate-soft border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-300">
            {content.metricsSection?.items?.map((metric: any, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center p-4"
              >
                <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <ArrowUp className={`w-6 h-6 text-lime-600 transform ${metric.trend === 'down' ? 'rotate-180' : '-rotate-45'}`} />
                  <span className="text-5xl font-bold text-navy-base">{metric.value}</span>
                </div>
                <p className="text-slate-600 text-sm mt-2 text-center">{metric.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-24 bg-navy-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 md:flex md:items-end md:justify-between">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.capabilitiesSection?.title}</h2>
              <p className="text-lg text-slate-400">{content.capabilitiesSection?.description}</p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link className="text-primary hover:text-white transition-colors flex items-center gap-2 font-medium" href={content.capabilitiesSection?.link?.href || "#"}>
                {content.capabilitiesSection?.link?.label} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.capabilitiesSection?.items?.map((cap: any, idx: number) => {
              const Icon = IconMap[cap.iconName] || TrendingUp;
              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="group bg-navy-card hover:bg-[#1c2d59] rounded-xl p-8 border border-white/5 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="scale-[4] origin-top-right text-lime-muted">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 text-lime-muted border border-white/10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{cap.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {cap.description}
                  </p>
                  <Link className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-white transition-colors" href={cap.href || "#"}>
                    {cap.linkLabel} <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-slate-lighter border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-6 block">
            {content.philosophySection?.badge}
          </span>
          <blockquote className="text-4xl md:text-6xl font-extrabold text-navy-base leading-tight mb-8">
            &quot;{content.philosophySection?.quote} <span className="text-gradient">{content.philosophySection?.highlight}</span>.&quot;
          </blockquote>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {content.philosophySection?.description}
          </p>
          <div className="mt-10">
            <Image 
              alt="Philosophy Visual" 
              className="w-full h-16 object-cover rounded-lg opacity-20 grayscale" 
              src={content.philosophySection?.image || "https://picsum.photos/1200/64"}
              width={1200}
              height={64}
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Content Teasers */}
      <section className="py-24 bg-navy-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">{content.growthSection?.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.growthSection?.items?.map((item: any, idx: number) => (
              <Link key={idx} className="group block" href={item.href || "#"}>
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-video bg-navy-card">
                  <Image 
                    alt={item.title} 
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                    src={item.image}
                    fill
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 bg-navy-base/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded border border-white/10">
                    {item.tag}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-dark"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-growth-gradient opacity-5 blur-3xl transform translate-x-1/2"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">{content.ctaSection?.title}</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            {content.ctaSection?.description}
          </p>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href={content.ctaSection?.button?.href || "#"}
                className="bg-growth-gradient hover:bg-growth-gradient-hover text-navy-base font-bold text-lg px-10 py-4 rounded-lg shadow-xl shadow-orange-500/20 transition-all inline-block"
              >
                {content.ctaSection?.button?.label}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-base border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link className="text-xl font-bold tracking-tight text-white flex items-center gap-2 mb-6" href="/">
                <span className="w-6 h-6 rounded bg-growth-gradient flex items-center justify-center text-navy-base font-extrabold text-xs">
                  {content.brand?.logoText || 'H'}
                </span>
                {content.brand?.name}<span className="font-light text-slate-400">{content.brand?.suffix}</span>
              </Link>
              <p className="text-slate-500 text-sm">
                {content.footer?.description}
              </p>
            </div>
            {content.footer?.sections?.map((section: any, idx: number) => (
              <div key={idx}>
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  {section.links?.map((link: any, lIdx: number) => (
                    <li key={lIdx}>
                      <Link className="hover:text-primary transition-colors" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {content.footer?.socials?.map((social: any, idx: number) => {
                  const Icon = IconMap[social.platform.toLowerCase()] || Mail;
                  return (
                    <Link key={idx} className="text-slate-400 hover:text-white transition-colors" href={social.href}>
                      <span className="sr-only">{social.platform}</span>
                      <Icon className="w-6 h-6" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center md:text-left">
            <p className="text-slate-600 text-sm">{content.footer?.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* MOVE TO globals.css:
@theme {
  --color-primary: #0d9488;
  --color-navy-base: #0f172a;
  --color-navy-dark: #020617;
  --color-navy-card: #1e293b;
  --color-slate-soft: #f1f5f9;
  --color-slate-lighter: #f8fafc;
  --color-lime-muted: #2dd4bf;
  --color-gold: #38bdf8;
  --color-background-light: #ffffff;
  --color-background-dark: #0f172a;

  --background-image-growth-gradient: linear-gradient(to right, #0d9488, #2dd4bf);
  --background-image-growth-gradient-hover: linear-gradient(to right, #0f766e, #14b8a6);
}

@layer utilities {
  .text-gradient {
    background: linear-gradient(to right, #0d9488, #2dd4bf);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .text-gradient-lime {
    background: linear-gradient(to right, #2dd4bf, #38bdf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
*/
