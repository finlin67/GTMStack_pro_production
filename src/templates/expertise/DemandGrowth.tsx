// demand-growth.tsx

import React from 'react';
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

export default function DemandGrowthTemplate({
  content,
  pageTitle,
  theme = 'dark',
  heroVisualId,
}: Props) {
  const isDark = theme === 'dark';

  if (!content) return null;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} font-sans antialiased`}>
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-navy-base/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-12">
              <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-gradient-to-r from-orange-500 to-yellow-400 flex items-center justify-center text-navy-base font-extrabold text-lg">
                  {content.brand?.logoText || 'R'}
                </span>
                {content.brand?.name}
                <span className="font-light text-slate-400">{content.brand?.suffix}</span>
              </Link>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {content.navigation?.map((item: any) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`${
                        item.active ? "text-white border-b-2 border-primary" : "text-slate-300 hover:text-white"
                      } px-3 py-2 text-sm font-medium transition-colors`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <Link
                href={content.navCta?.href || "#"}
                className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-navy-base font-bold px-6 py-2.5 rounded shadow-lg shadow-orange-500/20 transition-all"
              >
                {content.navCta?.label}
              </Link>
            </div>

            {/* Mobile menu toggle - would need state if interactive */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-navy-base">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-lime-muted text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-lime-muted animate-pulse" />
              {content.hero?.badge}
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
                {content.hero?.title?.[0]}
              </span>
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
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] bg-navy-card">
              <Image 
                src={content.hero?.image || heroVisualId || "https://picsum.photos/1200/800"}
                alt={content.hero?.title?.join(' ') || "Hero Visual"}
                fill
                className="object-cover opacity-60 mix-blend-overlay"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-base via-transparent to-transparent" />

              {/* Hero metric overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <div className="text-slate-400 text-sm font-medium mb-1">{content.hero?.metric?.label}</div>
                      <div className="text-3xl font-bold text-white">
                        {content.hero?.metric?.value} 
                        <span className="text-lg text-lime-muted font-normal">{content.hero?.metric?.change}</span>
                      </div>
                    </div>
                    {/* Simplified chart - keep animation if needed */}
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-orange-500 to-lime-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ... (rest of sections inlined similarly - metrics, capabilities, philosophy, growth teasers, CTA, footer) ... */}

      {/* Footer (example inlined) */}
      <footer className="bg-navy-base border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer content using content.footer props */}
          <p className="text-slate-600 text-sm text-center mt-12">
            {content.footer?.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}

/* MOVE TO globals.css:
@theme {
  --color-primary: #2463eb;
  --color-navy-base: #0B132B;
  --color-navy-dark: #071024;
  --color-navy-card: #162447;
  --color-slate-soft: #E8EDF4;
  --color-slate-lighter: #F1F4F8;
  --color-lime-muted: #A3E635;
  --color-gold: #EAB308;
  --color-background-light: #f6f6f8;
  --color-background-dark: #0B132B;

  --background-image-growth-gradient: linear-gradient(to right, #F97316, #FDE047);
  --background-image-growth-gradient-hover: linear-gradient(to right, #ea580c, #facc15);
}

@layer utilities {
  .text-gradient {
    background: linear-gradient(to right, #F97316, #FDE047);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .text-gradient-lime {
    background: linear-gradient(to right, #A3E635, #EAB308);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
*/

/* To register:
import DemandGrowthTemplate from '@/staging-templates/demand-growth';
TEMPLATE_BY_ID['expertise.demand-growthpillar'] = DemandGrowthTemplate;
Run gen:registry
*/