import React from 'react'
import Link from 'next/link'

export type PillarCategoryProps = { children: React.ReactNode }
export type PillarTopicProps = { children: React.ReactNode }

/**
 * These named exports exist because other pillar plumbing may import them.
 * For now they just render children.
 */
export function ContentEngagementPillarCategory({ children }: PillarCategoryProps) {
    return <>{children}</>
}

export function ContentEngagementPillarTopic({ children }: PillarTopicProps) {
    return <>{children}</>
}

const CONTENT_ENGAGEMENT_CONTENT = {
    metadata: {
        title: 'Content & Engagement - RevenueArchitect',
        siteName: 'REVENUEARCHITECT',
        logoIcon: 'architecture',
    },
    navigation: [
        { label: 'Home', href: '/', active: false },
        { label: 'Methodology', href: '/expertise', active: false },
        { label: 'Expertise', href: '/expertise', active: true },
        { label: 'Projects', href: '/projects', active: false },
        { label: 'Industries', href: '/industries', active: false },
        { label: 'About Me', href: '/about', active: false },
        { label: 'Blog', href: '/blog', active: false },
        { label: 'Gallery', href: '/gallery', active: false },
    ],
    hero: {
        badge: 'Expertise Category',
        headline: {
            main: 'Content &',
            highlight: 'Engagement',
        },
        description:
            'Storytelling engines that build trust, demand, and lifetime value. We re-engineer how your brand speaks to the market.',
        primaryCTA: { label: 'Explore Storytelling', href: '/expertise' },
        secondaryCTA: { label: 'Request Audit', href: '/contact' },
        image: {
            src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
            alt: 'Abstract digital particle flow representing data streams',
        },
        floatingBadges: [
            { icon: 'insights', label: 'High Velocity' },
            { icon: 'hub', label: 'Connected' },
        ],
    },
    stats: [
        { value: '343%', label: 'Engagement Lift', subtext: 'Year-over-year growth' },
        { value: '4.2x', label: 'Content ROI', subtext: 'Return on ad spend' },
        { value: '180%', label: 'Audience Growth', subtext: 'Organic reach expansion' },
    ],
    services: {
        title: 'Core Services',
        items: [
            {
                icon: 'campaign',
                title: 'Content Marketing',
                description:
                    "Strategic narratives that drive organic growth. We build the architecture for your brand's voice in a crowded market.",
            },
            {
                icon: 'mail',
                title: 'Email Marketing',
                description:
                    'Automated flows for lifecycle engagement. Turn subscribers into loyal advocates with precision timing.',
            },
            {
                icon: 'all_inclusive',
                title: 'Omnichannel Marketing',
                description:
                    'Unified messaging across all touchpoints. Seamless experiences whether they find you on mobile, web, or social.',
            },
            {
                icon: 'thumb_up',
                title: 'Social Media Marketing',
                description:
                    'Community building and brand awareness. We turn passive scrollers into active community members.',
            },
            {
                icon: 'play_circle',
                title: 'Video Marketing',
                description:
                    'High-impact visual storytelling. Captivate your audience with production-grade video assets.',
            },
        ],
    },
    quote: {
        text: "Content isn't filler — it's engineered connection.",
        subtext:
            'In a world of noise, signal is the only currency. We apply rigorous data science to the art of storytelling to ensure every piece of content performs a specific revenue function.',
    },
    explore: {
        title: 'Explore Further',
        viewAllHref: '/expertise',
        cards: [
            {
                category: 'BLOG',
                title: 'The Future of Content ROI',
                description:
                    'How AI is reshaping the way we measure engagement and attribution in B2B markets.',
                image:
                    'https://images.unsplash.com/photo-1499750310159-5b600aaf0378?q=80&w=2069&auto=format&fit=crop',
                ctaLabel: 'Read Article',
                href: '/blog',
            },
            {
                category: 'PROJECTS',
                title: 'SaaS Unicorn Growth',
                description:
                    'Case study: Scaling content production by 400% while maintaining brand integrity.',
                image:
                    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
                ctaLabel: 'View Case Study',
                href: '/case-studies',
            },
            {
                category: 'GALLERY',
                title: 'Visual Systems Design',
                description: 'A collection of high-fidelity visual assets created for enterprise clients.',
                image:
                    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
                ctaLabel: 'Browse Gallery',
                href: '/gallery',
            },
        ],
    },
    ctaSection: {
        title: 'Ready to Build Your Narrative Engine?',
        subtitle: 'Stop publishing noise. Start engineering growth.',
        buttonLabel: 'See the diagnostic framework',
    },
    footer: {
        description:
            'Combining data science with creative strategy to build revenue engines for the modern enterprise.',
        services: ['Content Strategy', 'SEO & Performance', 'Lead Gen Operations', 'Brand Identity'],
        company: ['About Us', 'Careers', 'Contact', 'Privacy Policy'],
        copyright: '© 2023 RevenueArchitect Inc. All rights reserved.',
    },
} as const

type TemplateProps = {
    content?: unknown
    pageTitle?: string
}

export default function ContentEngagementPillarTemplate(props: TemplateProps) {
    const c = CONTENT_ENGAGEMENT_CONTENT
    const title = props.pageTitle ?? c.metadata.title

    return (
        <div className="min-h-screen bg-[#0A1628] text-white">
            <div className="container-width section-padding">
                <header className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="font-display text-lg font-bold tracking-tight text-white">{c.metadata.siteName}</div>
                        <div className="mt-2 text-sm text-slate-400">{title}</div>
                    </div>
                    <nav className="flex flex-wrap gap-3 text-sm text-slate-400">
                        {c.navigation.map((n) => (
                            <Link
                                key={n.href}
                                href={n.href}
                                className={n.active ? 'font-semibold text-[#FFDB58]' : 'font-medium'}
                            >
                                {n.label}
                            </Link>
                        ))}
                    </nav>
                </header>

                <main className="mt-10 space-y-8">
                    <section className="card-dark border-[#FFDB58]/20 bg-[#112B3C]/70 p-8 lg:p-10">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFDB58]">
                            {c.hero.badge}
                        </div>
                        <h1 className="font-display mt-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                            {c.hero.headline.main}{' '}
                            <span className="text-gradient-cobalt-ice">{c.hero.headline.highlight}</span>
                        </h1>
                        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{c.hero.description}</p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href={c.hero.primaryCTA.href} className="nav-cta">
                                {c.hero.primaryCTA.label}
                            </a>
                            <a href={c.hero.secondaryCTA.href} className="btn-hero-outline">
                                {c.hero.secondaryCTA.label}
                            </a>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {c.hero.floatingBadges.map((b) => (
                                <span
                                    key={b.label}
                                    className="rounded-full border border-[#FFDB58]/25 bg-[#FFDB58]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#FFDB58]"
                                >
                                    {b.label}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="grid gap-4 md:grid-cols-3">
                        {c.stats.map((s) => (
                            <div key={s.label} className="card-dark border-white/10 bg-[#0D2137] p-6">
                                <div className="proof-gradient-text font-display text-3xl font-extrabold md:text-4xl">{s.value}</div>
                                <div className="mt-3 text-base font-semibold text-white">{s.label}</div>
                                <div className="mt-2 text-sm leading-relaxed text-slate-400">{s.subtext}</div>
                            </div>
                        ))}
                    </section>

                    <section className="card-dark border-white/10 bg-[#0D2137] p-8 lg:p-10">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFDB58]">Execution</div>
                        <h2 className="font-display mt-3 text-3xl font-bold text-white">{c.services.title}</h2>
                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                            {c.services.items.map((it) => (
                                <div key={it.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                    <div className="font-display text-lg font-semibold text-white">{it.title}</div>
                                    <div className="mt-2 text-sm leading-relaxed text-slate-300">{it.description}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-[#FFDB58]/20 bg-[#112B3C] p-8 lg:p-10">
                        <blockquote className="max-w-4xl">
                            <div className="font-display text-2xl font-semibold leading-tight text-white md:text-3xl">{c.quote.text}</div>
                            <div className="mt-4 text-base leading-relaxed text-slate-300">{c.quote.subtext}</div>
                        </blockquote>
                    </section>

                    <section className="card-dark border-white/10 bg-[#0D2137] p-8 lg:p-10">
                        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                            <div>
                                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFDB58]">Related</div>
                                <h2 className="font-display mt-3 text-3xl font-bold text-white">{c.explore.title}</h2>
                            </div>
                            <a href={c.explore.viewAllHref} className="text-sm font-semibold text-[#AED6F1] hover:text-white">
                                View all
                            </a>
                        </div>

                        <div className="mt-8 grid gap-4 lg:grid-cols-3">
                            {c.explore.cards.map((card) => (
                                <a
                                    key={card.title}
                                    href={card.href}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-[#AED6F1]/35"
                                >
                                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FFDB58]">{card.category}</div>
                                    <div className="mt-3 font-display text-lg font-semibold text-white">{card.title}</div>
                                    <div className="mt-2 text-sm leading-relaxed text-slate-300">{card.description}</div>
                                    <div className="mt-4 text-sm font-semibold text-[#AED6F1]">{card.ctaLabel}</div>
                                </a>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-[#FFDB58]/25 bg-[#112B3C] px-8 py-10 text-center lg:px-10">
                        <h2 className="font-display text-3xl font-bold text-white">{c.ctaSection.title}</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">{c.ctaSection.subtitle}</p>
                        <div className="mt-8">
                            <button className="nav-cta">{c.ctaSection.buttonLabel}</button>
                        </div>
                    </section>
                </main>

                <footer className="mt-10 border-t border-white/10 pt-8">
                    <div className="max-w-3xl text-sm leading-relaxed text-slate-400">{c.footer.description}</div>
                    <div className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">{c.footer.copyright}</div>
                </footer>
            </div>
        </div>
    )
}