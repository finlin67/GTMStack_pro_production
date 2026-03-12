import Link from 'next/link';
import {
  MessageSquare,
  TrendingUp,
  BarChart3,
  Settings,
  Brain,
  Rocket,
  PieChart,
  Cog,
  ArrowRight,
  Zap,
  LayoutGrid,
  Database,
  CheckCircle,
} from 'lucide-react';

export interface TemplateContent {
  nav: {
    logo: string;
    links: { label: string; href: string }[];
    cta: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  pillars: {
    title: string;
    exploreText: string;
    items: { icon: any; title: string; desc: string }[];
  };
  stats: { value: string; label: string }[];
  methodology: {
    title: string;
    steps: { num: string; title: string; desc: string }[];
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    copyright: string;
    links: { label: string; href: string }[];
  };
}

const DEFAULT_CONTENT: TemplateContent = {
  nav: {
    logo: 'GTMStack.pro',
    links: [
      { label: 'Expertise', href: '#' },
      { label: 'Pillars', href: '#' },
      { label: 'Methodology', href: '#' },
      { label: 'Case Studies', href: '#' },
    ],
    cta: 'Start a Conversation',
  },
  hero: {
    title: 'Four Pillars. One Revenue Architecture',
    subtitle: 'Master your revenue engine with our comprehensive strategic framework designed for high-growth SaaS. We align your tech, data, and teams.',
    cta1: 'Get Started',
    cta2: 'View Framework',
  },
  pillars: {
    title: 'What We Build',
    exploreText: 'Explore',
    items: [
      { icon: Brain, title: 'Engagement', desc: 'Advanced content frameworks and community-led growth strategies that convert.' },
      { icon: Rocket, title: 'Growth', desc: 'Demand generation engines built for predictable pipeline and scalable ROI.' },
      { icon: BarChart3, title: 'Insights', desc: 'Full-funnel attribution and strategic analytics to drive data-backed decisions.' },
      { icon: Settings, title: 'Operations', desc: 'Seamless systems and automation that eliminate friction and tech debt.' },
    ],
  },
  stats: [
    { value: '145%', label: 'Revenue Growth' },
    { value: '40%', label: 'Efficiency Gain' },
    { value: '92%', label: 'Retention Rate' },
    { value: '99.9%', label: 'System Uptime' },
  ],
  methodology: {
    title: 'Our Methodology',
    steps: [
      { num: '01', title: 'Map the Terrain', desc: 'Deep audit of existing tech stack, customer journeys, and data silos.' },
      { num: '02', title: 'Design the System', desc: 'Blueprinting the ideal architecture for seamless cross-functional flow.' },
      { num: '03', title: 'Instrument & Automate', desc: 'Precision implementation of tools, tagging, and automated workflows.' },
      { num: '04', title: 'Run Accountable Plays', desc: 'Operationalizing the stack with clear governance and KPI tracking.' },
    ],
  },
  cta: {
    title: 'Ready to Build Your Revenue Architecture?',
    subtitle: 'Stop guessing and start scaling. Join 50+ high-growth SaaS companies using GTMStack.pro.',
    button: 'Get Started Now',
  },
  footer: {
    copyright: '© 2024 GTMStack.pro - All Rights Reserved.',
    links: [
      { label: 'LinkedIn', href: '#' },
      { label: 'Twitter', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
};

export default function Template({ content, pageTitle }: { content?: unknown; pageTitle?: string }) {
  const data = (content as TemplateContent) || DEFAULT_CONTENT;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <nav className="fixed top-0 w-full h-16 bg-slate-900/90 backdrop-blur-md z-50 border-b border-white/10 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white">
            {data.nav.logo}
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {data.nav.links.map((link) => (
              <Link key={link.label} href={link.href} className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
            {data.nav.cta} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main>
        <section className="bg-slate-900 pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-white text-5xl md:text-6xl font-black leading-tight">
                {data.hero.title}
              </h1>
              <p className="text-slate-400 text-lg max-w-xl">{data.hero.subtitle}</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-amber-500 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition-all">{data.hero.cta1}</button>
                <button className="border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all">{data.hero.cta2}</button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-slate-900 text-4xl font-bold mb-16 text-center">{data.pillars.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.pillars.items.map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-amber-500 flex flex-col group hover:shadow-md transition-all">
                  <item.icon className="w-10 h-10 text-amber-500 mb-6" />
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 mb-8 flex-grow">{item.desc}</p>
                  <Link href="#" className="text-amber-600 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    {data.pillars.exploreText} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {data.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-slate-900 text-4xl font-bold mb-16 text-center">{data.methodology.title}</h2>
            <div className="grid lg:grid-cols-4 gap-12">
              {data.methodology.steps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="text-7xl font-black text-slate-100 absolute -top-10 -left-4">{step.num}</div>
                  <h4 className="text-slate-900 font-bold text-xl mb-3 relative z-10">{step.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed relative z-10">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-24 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-white text-4xl md:text-5xl font-black leading-tight">{data.cta.title}</h2>
            <p className="text-slate-400 text-lg">{data.cta.subtitle}</p>
            <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-10 py-5 rounded-xl text-xl font-black transition-all">{data.cta.button}</button>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 py-12 px-6 border-t border-white/5 text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-bold text-lg text-white">{data.nav.logo}</div>
          <div className="text-sm">{data.footer.copyright}</div>
          <div className="flex gap-6">
            {data.footer.links.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
