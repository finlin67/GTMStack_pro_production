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
  // TODO: Replace with explicit template content interface once shared schema is finalized.
  content: any; 
  pageTitle?: string; 
  theme?: string; 
  heroVisualId?: string 
};

type NavigationItem = {
  label: string;
  href: string;
  active?: boolean;
};

type MetricItem = {
  label: string;
  value: string;
  subtext?: string;
  trend?: string;
};

type CapabilityItem = {
  title: string;
  description: string;
  iconName?: string;
  linkLabel?: string;
  href?: string;
};

type PrincipleItem = {
  title: string;
  description: string;
};

type GrowthItem = {
  title: string;
  description: string;
  tag?: string;
  image: string;
  href?: string;
};

type GrowthMetricItem = {
  value: string;
  label: string;
};

type FooterLink = {
  label: string;
  href?: string;
};

type FooterSection = {
  title: string;
  links?: Array<string | FooterLink>;
};

type LinkIntent = 'exploration' | 'proof' | 'contact' | 'generic';

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

const hasUsableHref = (rawHref?: string): rawHref is string => {
  if (!rawHref) return false;
  const href = rawHref.trim();
  return href.length > 0 && href !== '#';
};

const explicitHrefByIntent = (intent: LinkIntent): string | null => {
  if (intent === 'proof') return '/case-studies';
  if (intent === 'contact') return '/contact';
  if (intent === 'exploration') return '/expertise';
  return null;
};

const explicitHrefByLabel = (label?: string): string | null => {
  const lower = (label ?? '').toLowerCase();
  if (!lower) return null;

  if (/(proof|result|outcome|case study|see our work|view results)/.test(lower)) return '/case-studies';
  if (/(contact|conversation|talk|get in touch|connect|work with me|start|audit)/.test(lower)) return '/contact';
  if (/(explore|deep dive|capabilit|topic|expertise|how i work|service|storytelling|methodology)/.test(lower)) return '/expertise';
  if (/(blog|read|article|insight)/.test(lower)) return '/blog';
  if (/(home|back|overview)/.test(lower)) return '/';

  return null;
};

const resolveExplicitHref = (
  rawHref: string | undefined,
  intent: LinkIntent,
  label?: string
): string | null => {
  if (hasUsableHref(rawHref)) return rawHref.trim();
  return explicitHrefByLabel(label) ?? explicitHrefByIntent(intent);
};

export default function DemandGrowthTemplate({
  content,
  pageTitle,
  theme = 'dark',
  heroVisualId,
}: Props) {
  if (!content) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#0A1628]/90 backdrop-blur-md border-b border-white/10">
        <div className="container-width">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-12">
              <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-gradient-to-r from-[#C2440F] to-[#FFDB58] flex items-center justify-center text-[#020617] font-extrabold text-lg">
                  {content.brand?.logoText || 'G'}
                </span>
                {content.brand?.name}
                <span className="font-light text-slate-400">{content.brand?.suffix}</span>
              </Link>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {(content.navigation ?? []).map((item: NavigationItem) => {
                    const navHref = resolveExplicitHref(item.href, 'exploration', item.label);
                    return navHref ? (
                      <Link
                        key={item.label}
                        href={navHref}
                        className={`${
                          item.active ? "text-white border-b-2 border-[#FFDB58]" : "text-slate-300 hover:text-white"
                        } px-3 py-2 text-sm font-medium transition-colors`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        key={item.label}
                        aria-disabled="true"
                        className={`${
                          item.active ? "text-white border-b-2 border-[#FFDB58]" : "text-slate-300 hover:text-white"
                        } px-3 py-2 text-sm font-medium transition-colors cursor-default`}
                      >
                        {item.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              {resolveExplicitHref(content.navCta?.href, 'contact', content.navCta?.label) ? (
                <Link href={resolveExplicitHref(content.navCta?.href, 'contact', content.navCta?.label)!} className="nav-cta">
                  {content.navCta?.label}
                </Link>
              ) : (
                <span aria-disabled="true" className="nav-cta cursor-default">
                  {content.navCta?.label}
                </span>
              )}
            </div>

            {/* Mobile menu toggle - would need state if interactive */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0A1628]">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[800px] h-[800px] bg-[#C2440F]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[600px] h-[600px] bg-[#FFDB58]/5 rounded-full blur-3xl" />

        <div className="relative container-width flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FFDB58] text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FFDB58] animate-pulse" />
              {content.hero?.badge}
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              <span className="proof-gradient-text">
                {content.hero?.title?.[0] || content.hero?.headline}
              </span>
              <span className="block text-white mt-2">{content.hero?.title?.[1] || content.hero?.subheadline}</span>
            </h1>

            <p className="text-xl text-slate-300 mb-10 font-light max-w-2xl leading-relaxed">
              {content.hero?.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {resolveExplicitHref(
                content.hero?.ctaPrimary?.href || content.hero?.primaryCTA?.link,
                'exploration',
                content.hero?.ctaPrimary?.label || content.hero?.primaryCTA?.text
              ) ? (
                <Link
                  href={resolveExplicitHref(
                    content.hero?.ctaPrimary?.href || content.hero?.primaryCTA?.link,
                    'exploration',
                    content.hero?.ctaPrimary?.label || content.hero?.primaryCTA?.text
                  )!}
                  className="nav-cta text-lg px-8 py-3.5"
                >
                  {content.hero?.ctaPrimary?.label || content.hero?.primaryCTA?.text}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span aria-disabled="true" className="nav-cta text-lg px-8 py-3.5 cursor-default">
                  {content.hero?.ctaPrimary?.label || content.hero?.primaryCTA?.text}
                </span>
              )}

              {resolveExplicitHref(
                content.hero?.ctaSecondary?.href || content.hero?.secondaryCTA?.link,
                'contact',
                content.hero?.ctaSecondary?.label || content.hero?.secondaryCTA?.text
              ) ? (
                <Link
                  href={resolveExplicitHref(
                    content.hero?.ctaSecondary?.href || content.hero?.secondaryCTA?.link,
                    'contact',
                    content.hero?.ctaSecondary?.label || content.hero?.secondaryCTA?.text
                  )!}
                  className="btn-hero-outline text-lg px-8 py-3.5"
                >
                  {content.hero?.ctaSecondary?.label || content.hero?.secondaryCTA?.text}
                </Link>
              ) : (
                <span aria-disabled="true" className="btn-hero-outline text-lg px-8 py-3.5 cursor-default">
                  {content.hero?.ctaSecondary?.label || content.hero?.secondaryCTA?.text}
                </span>
              )}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] bg-[#0D2137]">
              <Image
                src={content.hero?.image || heroVisualId || '/images/heroes/placeholder.svg'}
                alt={content.hero?.title?.join(' ') || 'Hero Visual'}
                fill
                className="object-cover opacity-60 mix-blend-overlay"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />

              {/* Hero metric overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <div className="text-slate-400 text-sm font-medium mb-1">{content.hero?.metric?.label}</div>
                      <div className="text-3xl font-bold text-white">
                        {content.hero?.metric?.value}
                        <span className="text-lg text-[#FFDB58] font-normal ml-1">{content.hero?.metric?.change}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-[#C2440F] to-[#FFDB58]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="section-padding bg-[#020617]">
        <div className="container-width">
          <h2 className="mb-16 text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {content.metricsSection?.headline || 'Proven Impact'}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {((content.metricsSection?.items || content.metricsSection?.stats) ?? []).map((item: MetricItem, i: number) => (
              <div key={i} className="glass-card-surface p-8 text-center">
                <span className="proof-gradient-text block text-4xl font-extrabold tracking-tight mb-2">
                  {item.value}
                </span>
                <p className="text-sm font-semibold text-slate-300">{item.label}</p>
                {item.subtext ? <p className="mt-1 text-xs text-slate-400">{item.subtext}</p> : null}
                {item.trend === 'up' ? (
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#22C55E] uppercase tracking-wider">
                    <ArrowUp className="w-3 h-3" /> Up
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section-padding bg-[#0A1628]">
        <div className="container-width">
          <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                {content.capabilitiesSection?.title || content.capabilitiesSection?.headline || 'Core Capabilities'}
              </h2>
              {content.capabilitiesSection?.description ? (
                <p className="mt-4 max-w-2xl text-slate-300">{content.capabilitiesSection.description}</p>
              ) : null}
            </div>
            {content.capabilitiesSection?.link ? (
              resolveExplicitHref(content.capabilitiesSection.link.href, 'exploration', content.capabilitiesSection.link.label) ? (
                <Link
                  href={resolveExplicitHref(content.capabilitiesSection.link.href, 'exploration', content.capabilitiesSection.link.label)!}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#FFDB58] shrink-0"
                >
                  {content.capabilitiesSection.link.label} <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span aria-disabled="true" className="inline-flex items-center gap-2 text-sm font-bold text-[#FFDB58] shrink-0 cursor-default">
                  {content.capabilitiesSection.link.label} <ChevronRight className="w-4 h-4" />
                </span>
              )
            ) : null}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(content.capabilitiesSection?.items ?? []).map((item: CapabilityItem, i: number) => {
              const CapIcon = item.iconName ? (IconMap[item.iconName] || TrendingUp) : TrendingUp;
              return (
                <div key={i} className="glass-card-surface p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C2440F]/15 text-[#E8A040]">
                    <CapIcon className="w-6 h-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300">{item.description}</p>
                  {item.href ? (
                    resolveExplicitHref(item.href, 'exploration', item.linkLabel || item.title) ? (
                      <Link
                        href={resolveExplicitHref(item.href, 'exploration', item.linkLabel || item.title)!}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#FFDB58] hover:text-white transition-colors"
                      >
                        {item.linkLabel || 'Learn more'} <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#FFDB58] transition-colors cursor-default"
                      >
                        {item.linkLabel || 'Learn more'} <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    )
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-[#020617]">
        <div className="container-width">
          {content.philosophySection?.quote ? (
            <div className="mx-auto max-w-4xl text-center">
              {content.philosophySection.badge ? (
                <span className="mb-6 inline-block rounded-full border border-[#FFDB58]/30 bg-[#FFDB58]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FFDB58]">
                  {content.philosophySection.badge}
                </span>
              ) : null}
              <blockquote className="proof-gradient-text mb-6 text-3xl font-extrabold leading-tight md:text-4xl">
                &ldquo;{content.philosophySection.highlight || content.philosophySection.quote}&rdquo;
              </blockquote>
              <p className="mx-auto max-w-2xl text-lg text-slate-300">{content.philosophySection.description}</p>
            </div>
          ) : (
            <div>
              <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                {content.philosophySection?.headline || 'Our Approach'}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {(content.philosophySection?.principles ?? []).map((item: PrincipleItem, i: number) => (
                  <div key={i} className="glass-card-surface-alt p-8">
                    <h3 className="mb-3 text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Growth Section */}
      <section className="section-padding bg-[#0A1628]">
        <div className="container-width">
          <h2 className="mb-16 text-center text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {content.growthSection?.title || content.growthSection?.headline || 'Transforming Demand Into Growth'}
          </h2>
          {content.growthSection?.items?.length ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {content.growthSection.items.map((item: GrowthItem, i: number) => (
                resolveExplicitHref(item.href, 'proof', item.title) ? (
                  <Link
                    key={i}
                    href={resolveExplicitHref(item.href, 'proof', item.title)!}
                    className="group glass-card-surface overflow-hidden"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent" />
                    </div>
                    <div className="p-6">
                      {item.tag ? (
                        <span className="mb-3 inline-block rounded-full bg-[#FFDB58]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#FFDB58]">
                          {item.tag}
                        </span>
                      ) : null}
                      <h3 className="text-lg font-bold text-white group-hover:text-[#FFDB58] transition-colors">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                    </div>
                  </Link>
                ) : (
                  <span key={i} aria-disabled="true" className="group glass-card-surface overflow-hidden cursor-default">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent" />
                    </div>
                    <div className="p-6">
                      {item.tag ? (
                        <span className="mb-3 inline-block rounded-full bg-[#FFDB58]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#FFDB58]">
                          {item.tag}
                        </span>
                      ) : null}
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                    </div>
                  </span>
                )
              ))}
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-2 items-start">
              {content.growthSection?.narrative ? (
                <p className="text-lg leading-relaxed text-slate-300">{content.growthSection.narrative}</p>
              ) : null}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1">
                {(content.growthSection?.metrics ?? []).map((m: GrowthMetricItem, i: number) => (
                  <div key={i} className="glass-card-surface p-6">
                    <span className="proof-gradient-text block text-3xl font-extrabold">{m.value}</span>
                    <p className="mt-1 text-sm font-semibold text-slate-300">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[#020617]">
        <div className="container-width text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            {content.ctaSection?.title}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
            {content.ctaSection?.description || content.ctaSection?.subtitle}
          </p>
          {resolveExplicitHref(
            content.ctaSection?.button?.href || content.ctaSection?.button?.link,
            'contact',
            content.ctaSection?.button?.label || content.ctaSection?.button?.text
          ) ? (
            <Link
              href={resolveExplicitHref(
                content.ctaSection?.button?.href || content.ctaSection?.button?.link,
                'contact',
                content.ctaSection?.button?.label || content.ctaSection?.button?.text
              )!}
              className="nav-cta text-lg px-10 py-4"
            >
              {content.ctaSection?.button?.label || content.ctaSection?.button?.text}
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <span aria-disabled="true" className="nav-cta text-lg px-10 py-4 cursor-default inline-flex items-center gap-2">
              {content.ctaSection?.button?.label || content.ctaSection?.button?.text}
              <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#020617] pb-8 pt-16">
        <div className="container-width">
          {content.footer?.sections?.length ? (
            <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="col-span-2 md:col-span-1">
                <p className="text-sm leading-relaxed text-slate-400">{content.footer?.description}</p>
              </div>
              {(content.footer.sections ?? []).map((section: FooterSection, i: number) => (
                <div key={i}>
                  <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-white">{section.title}</h4>
                  <ul className="space-y-2">
                    {(section.links ?? []).map((link: string | FooterLink, j: number) => (
                      <li key={j}>
                        {typeof link === 'string' || !link.href ? (
                          <span
                            aria-disabled="true"
                            className="text-sm text-slate-400 transition-colors cursor-default"
                          >
                            {typeof link === 'string' ? link : link.label}
                          </span>
                        ) : !resolveExplicitHref(link.href, 'generic', link.label) ? (
                          <span
                            aria-disabled="true"
                            className="text-sm text-slate-400 transition-colors cursor-default"
                          >
                            {link.label}
                          </span>
                        ) : (
                          <Link
                            href={resolveExplicitHref(link.href, 'generic', link.label)!}
                            className="text-sm text-slate-400 transition-colors hover:text-white"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
          <p className="mt-8 text-center text-sm text-slate-500">
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