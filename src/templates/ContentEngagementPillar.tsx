import React from 'react'

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
        { label: 'Methodology', href: '/methodology', active: false },
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
        primaryCTA: { label: 'Explore Storytelling', href: '/storytelling' },
        secondaryCTA: { label: 'Request Audit', href: '/audit' },
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
        viewAllHref: '/all',
        cards: [
            {
                category: 'BLOG',
                title: 'The Future of Content ROI',
                description:
                    'How AI is reshaping the way we measure engagement and attribution in B2B markets.',
                image:
                    'https://images.unsplash.com/photo-1499750310159-5b600aaf0378?q=80&w=2069&auto=format&fit=crop',
                ctaLabel: 'Read Article',
                href: '/blog/content-roi',
            },
            {
                category: 'PROJECTS',
                title: 'SaaS Unicorn Growth',
                description:
                    'Case study: Scaling content production by 400% while maintaining brand integrity.',
                image:
                    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
                ctaLabel: 'View Case Study',
                href: '/projects/saas-growth',
            },
            {
                category: 'GALLERY',
                title: 'Visual Systems Design',
                description: 'A collection of high-fidelity visual assets created for enterprise clients.',
                image:
                    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
                ctaLabel: 'Browse Gallery',
                href: '/gallery/visual-systems',
            },
        ],
    },
    ctaSection: {
        title: 'Ready to Build Your Narrative Engine?',
        subtitle: 'Stop publishing noise. Start engineering growth.',
        buttonLabel: 'Schedule Audit',
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

function A({ children }: { href: string; children: React.ReactNode; className?: string }) {
    // simple anchor (safe for server render); you can switch to next/link later
    return <a href="#" onClick={(e) => e.preventDefault()}>{children}</a>
}

export default function ContentEngagementPillarTemplate(props: TemplateProps) {
    const c = CONTENT_ENGAGEMENT_CONTENT
    const title = props.pageTitle ?? c.metadata.title

    return (
        <div style={{ padding: 24, maxWidth: 980, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center' }}>
                <div>
                    <div style={{ fontWeight: 800 }}>{c.metadata.siteName}</div>
                    <div style={{ opacity: 0.7, marginTop: 4 }}>{title}</div>
                </div>
                <nav style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {c.navigation.map((n) => (
                        <span key={n.href} style={{ fontWeight: n.active ? 800 : 500, opacity: n.active ? 1 : 0.75 }}>
              {n.label}
            </span>
                    ))}
                </nav>
            </header>

            <main style={{ marginTop: 28 }}>
                <section style={{ padding: 18, border: '1px solid #e5e7eb', borderRadius: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, opacity: 0.7 }}>
                        {c.hero.badge}
                    </div>
                    <h1 style={{ marginTop: 10, fontSize: 42, lineHeight: 1.1 }}>
                        {c.hero.headline.main} <span style={{ fontWeight: 800 }}>{c.hero.headline.highlight}</span>
                    </h1>
                    <p style={{ marginTop: 12, fontSize: 16, opacity: 0.8 }}>{c.hero.description}</p>

                    <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                        <button style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid #111827', background: '#111827', color: 'white' }}>
                            {c.hero.primaryCTA.label}
                        </button>
                        <button style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid #111827', background: 'transparent' }}>
                            {c.hero.secondaryCTA.label}
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                        {c.hero.floatingBadges.map((b) => (
                            <span key={b.label} style={{ padding: '6px 10px', borderRadius: 999, border: '1px solid #e5e7eb', fontSize: 13 }}>
                {b.label}
              </span>
                        ))}
                    </div>
                </section>

                <section style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
                    {c.stats.map((s) => (
                        <div key={s.label} style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 12 }}>
                            <div style={{ fontSize: 28, fontWeight: 900 }}>{s.value}</div>
                            <div style={{ marginTop: 6, fontWeight: 700 }}>{s.label}</div>
                            <div style={{ marginTop: 4, opacity: 0.75, fontSize: 13 }}>{s.subtext}</div>
                        </div>
                    ))}
                </section>

                <section style={{ marginTop: 18, padding: 18, border: '1px solid #e5e7eb', borderRadius: 12 }}>
                    <h2 style={{ margin: 0, fontSize: 22 }}>{c.services.title}</h2>
                    <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
                        {c.services.items.map((it) => (
                            <div key={it.title} style={{ padding: 14, border: '1px solid #e5e7eb', borderRadius: 12 }}>
                                <div style={{ fontWeight: 800 }}>{it.title}</div>
                                <div style={{ marginTop: 6, opacity: 0.8, fontSize: 14 }}>{it.description}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginTop: 18, padding: 18, border: '1px solid #e5e7eb', borderRadius: 12 }}>
                    <blockquote style={{ margin: 0 }}>
                        <div style={{ fontSize: 20, fontWeight: 900 }}>{c.quote.text}</div>
                        <div style={{ marginTop: 10, opacity: 0.8 }}>{c.quote.subtext}</div>
                    </blockquote>
                </section>

                <section style={{ marginTop: 18, padding: 18, border: '1px solid #e5e7eb', borderRadius: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <h2 style={{ margin: 0, fontSize: 22 }}>{c.explore.title}</h2>
                        <span style={{ opacity: 0.75 }}>View all →</span>
                    </div>

                    <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
                        {c.explore.cards.map((card) => (
                            <div key={card.title} style={{ padding: 14, border: '1px solid #e5e7eb', borderRadius: 12 }}>
                                <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 1, opacity: 0.7 }}>{card.category}</div>
                                <div style={{ marginTop: 6, fontWeight: 800 }}>{card.title}</div>
                                <div style={{ marginTop: 6, opacity: 0.8, fontSize: 14 }}>{card.description}</div>
                                <div style={{ marginTop: 10, fontWeight: 800 }}>{card.ctaLabel} →</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginTop: 18, padding: 18, border: '1px solid #e5e7eb', borderRadius: 12, textAlign: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: 24 }}>{c.ctaSection.title}</h2>
                    <p style={{ marginTop: 10, opacity: 0.8 }}>{c.ctaSection.subtitle}</p>
                    <button style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid #111827', background: '#111827', color: 'white' }}>
                        {c.ctaSection.buttonLabel}
                    </button>
                </section>
            </main>

            <footer style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #e5e7eb' }}>
                <div style={{ opacity: 0.8 }}>{c.footer.description}</div>
                <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>{c.footer.copyright}</div>
            </footer>
        </div>
    )
}