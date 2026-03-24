import React from 'react';
import { CONTENT_ENGAGEMENT_CONTENT } from '@/content/expertise/pillars/content-engagement';

// Mocking Link and Image for Vite environment preview
// In a real Next.js project, these would be imported from 'next/link' and 'next/image'
const Link = ({ href, children, className }: any) => (
  <a href={href} className={className}>
    {children}
  </a>
);

const Image = ({ src, alt, className, fill, width, height }: any) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={`${className} ${fill ? 'absolute inset-0 w-full h-full object-cover' : ''}`}
  />
);

type Props = {
  content: typeof CONTENT_ENGAGEMENT_CONTENT;
};

export const ContentEngagement: React.FC<Props> = ({ content }) => {
  return (
    <div className="bg-dark-base text-white overflow-x-hidden antialiased font-body min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-dark-base/95 backdrop-blur px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-900 shadow-lg shadow-blue-900/20">
            <span className="material-symbols-outlined text-white text-xl">{content.metadata.logoIcon}</span>
          </div>
          <h2 className="text-white text-xl font-bold tracking-tight uppercase font-display">{content.metadata.siteName}</h2>
        </div>
        <nav className="hidden lg:flex items-center gap-10">
          {content.navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                item.active
                  ? "text-white font-semibold border-b-2 border-accent-cyan pb-1 transition-all"
                  : "text-gray-300 hover:text-white text-sm font-medium transition-colors"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="hidden sm:flex items-center justify-center rounded-xl h-12 px-8 bg-accent-cyan hover:bg-cyan-600 text-white text-sm font-bold shadow-xl shadow-cyan-500/20 transition-all transform hover:scale-105 active:scale-95">
          Get Audited
        </button>
        <button className="lg:hidden text-white p-2">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative w-full py-24 lg:py-40 px-6 lg:px-24 overflow-hidden bg-dark-base">
        <div className="absolute inset-0 bg-hero-glow opacity-30 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-radial-gradient from-blue-900/20 to-transparent opacity-40 blur-3xl pointer-events-none"></div>

        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 w-fit">
              <span className="size-2.5 rounded-full bg-accent-cyan animate-pulse"></span>
              <span className="text-xs font-bold text-cyan-50 uppercase tracking-widest">{content.hero.badge}</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[1.1] tracking-tighter text-white font-display">
              {content.hero.headline.main} <br />
              <span className="text-gradient-engagement">
                {content.hero.headline.highlight}
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 font-light max-w-xl leading-relaxed">
              {content.hero.description}
            </p>
            <div className="flex flex-wrap gap-6 pt-6">
              <Link
                href={content.hero.primaryCTA.href}
                className="flex items-center justify-center h-14 px-10 rounded-xl bg-primary hover:bg-blue-700 text-white font-bold text-lg transition-all shadow-2xl shadow-blue-500/30 group active:scale-95"
              >
                <span>{content.hero.primaryCTA.label}</span>
                <span className="material-symbols-outlined ml-3 text-lg group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </Link>
              <Link
                href={content.hero.secondaryCTA.href}
                className="flex items-center justify-center h-14 px-10 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-bold text-lg transition-all active:scale-95"
              >
                {content.hero.secondaryCTA.label}
              </Link>
            </div>
          </div>

          <div className="relative h-[450px] lg:h-[600px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-dark-surface/50 backdrop-blur-md group">
            <Image
              src={content.hero.image.src}
              alt={content.hero.image.alt}
              fill
              className="object-cover opacity-40 mix-blend-screen transition-all duration-1000 group-hover:opacity-60 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-transparent to-transparent"></div>

            {content.hero.floatingBadges.map((badge, idx) => (
              <div
                key={badge.label}
                className={
                  idx === 0
                    ? "absolute top-1/4 left-1/4 p-5 bg-dark-surface/90 backdrop-blur-xl rounded-2xl border border-accent-cyan/30 shadow-2xl animate-bounce"
                    : "absolute bottom-1/4 right-12 p-5 bg-dark-surface/90 backdrop-blur-xl rounded-2xl border border-accent-cyan/30 shadow-2xl animate-pulse"
                }
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-accent-cyan text-2xl">{badge.icon}</span>
                  <span className="text-base font-bold tracking-tight">{badge.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="w-full bg-light-slate border-y border-black/5 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-8 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 text-center divide-y md:divide-y-0 md:divide-x divide-gray-400/30">
          {content.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-3 px-6">
              <p className="text-6xl lg:text-8xl font-black text-gradient-gold tracking-tighter font-display">
                {stat.value}
              </p>
              <p className="text-slate-800 font-extrabold uppercase tracking-widest text-sm mt-4">{stat.label}</p>
              <p className="text-slate-600 text-base font-medium">{stat.subtext}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section className="py-28 lg:py-40 px-6 bg-[#071024]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 lg:mb-28 text-center lg:text-left">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 font-display tracking-tight">{content.services.title}</h2>
            <div className="h-1.5 w-24 bg-accent-cyan rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)] mx-auto lg:mx-0"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {content.services.items.map((service) => (
              <div
                key={service.title}
                className="group relative p-10 rounded-3xl bg-dark-surface border border-white/5 hover:border-accent-cyan/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(6,182,212,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="size-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 text-accent-cyan group-hover:text-white group-hover:bg-accent-cyan transition-all duration-300 shadow-inner">
                    <span className="material-symbols-outlined text-4xl">{service.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-cyan transition-colors font-display tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 lg:py-48 px-6 bg-light-slate-surface text-center flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent"></div>
        <div className="max-w-5xl relative z-10">
          <span className="material-symbols-outlined text-8xl text-gray-300/50 mb-10 select-none">format_quote</span>
          <h2 className="text-5xl lg:text-8xl font-black text-slate-900 leading-[1.1] tracking-tighter font-display">
            {content.quote.text.split(" — ")[0]} <br />
            <span className="text-gradient-engagement">
              {content.quote.text.split(" — ")[1]}
            </span>
          </h2>
          <p className="mt-12 text-slate-600 text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-light italic">
            &ldquo;{content.quote.subtext}&rdquo;
          </p>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-28 lg:py-40 px-6 bg-dark-base border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-4xl lg:text-5xl font-black text-white font-display tracking-tight">{content.explore.title}</h2>
              <div className="h-1 w-16 bg-accent-cyan mt-4 mx-auto md:mx-0"></div>
            </div>
            <Link
              href={content.explore.viewAllHref}
              className="text-accent-cyan hover:text-cyan-400 text-lg font-bold flex items-center gap-2 group transition-all"
            >
              View All <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {content.explore.cards.map((card) => (
              <div
                key={card.title}
                className="group flex flex-col gap-0 rounded-3xl overflow-hidden bg-dark-surface border border-white/5 hover:border-accent-cyan/50 transition-all duration-500 hover:shadow-2xl"
              >
                <div className="h-64 w-full bg-gray-800 relative overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 bg-accent-cyan text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg tracking-widest">
                    {card.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-cyan transition-colors font-display tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-base mb-8 line-clamp-3 font-light leading-relaxed">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className="mt-auto text-base font-bold text-white flex items-center gap-3 group/link"
                  >
                    <span className="border-b-2 border-white/20 group-hover/link:border-accent-cyan transition-colors pb-1">
                      {card.ctaLabel}
                    </span>
                    <span className="material-symbols-outlined text-xl group-hover/link:translate-x-2 transition-transform text-accent-cyan">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 lg:py-48 px-6 bg-gradient-to-br from-dark-base to-[#0f172a] text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent-cyan/5 opacity-50 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-10 font-display tracking-tighter leading-tight">
            {content.ctaSection.title}
          </h2>
          <p className="text-gray-400 text-xl lg:text-2xl mb-12 font-light tracking-wide italic">
            &ldquo;{content.ctaSection.subtitle}&rdquo;
          </p>
          <button className="inline-flex items-center justify-center h-16 px-12 rounded-2xl bg-accent-cyan hover:bg-cyan-600 text-white font-black text-xl transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] transform hover:scale-110 active:scale-95">
            {content.ctaSection.buttonLabel}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-base border-t border-white/10 pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-white text-3xl">{content.metadata.logoIcon}</span>
                <span className="text-white font-black text-2xl font-display tracking-tight">{content.metadata.siteName}</span>
              </div>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed font-light">
                {content.footer.description}
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-8 font-display">Services</h4>
              <ul className="space-y-4 text-base text-gray-400">
                {content.footer.services.map((s) => (
                  <li key={s}>
                    <Link href="/expertise" className="hover:text-accent-cyan transition-colors font-medium">
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-8 font-display">Company</h4>
              <ul className="space-y-4 text-base text-gray-400">
                {content.footer.company.map((c) => (
                  <li key={c}>
                    {c.toLowerCase().includes('contact') ? (
                      <Link href="/contact" className="hover:text-accent-cyan transition-colors font-medium">
                        {c}
                      </Link>
                    ) : (
                      <span aria-disabled="true" className="hover:text-accent-cyan transition-colors font-medium cursor-default">
                        {c}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-gray-500 text-base font-medium">{content.footer.copyright}</p>
            <div className="flex gap-8">
              <span aria-disabled="true" className="text-gray-400 hover:text-white transition-all transform hover:scale-125 cursor-default">
                <i className="material-symbols-outlined text-2xl">public</i>
              </span>
              <span aria-disabled="true" className="text-gray-400 hover:text-white transition-all transform hover:scale-125 cursor-default">
                <i className="material-symbols-outlined text-2xl">mail</i>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
