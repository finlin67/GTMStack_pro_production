Site Content Inventory
Here's the full structured inventory from scanning the project:

HOME — /
Headline: "Real GTM work for complex B2B teams."
Key Messages: Operator-built portfolio of GTM systems, case studies, and working artifacts. Real work across Salesforce, PRGX, AMCS, Red Hat. 20+ years experience.
CTA: "Browse case studies" → /case-studies | "Explore expertise" → /expertise
Data Source: content/home.ts (HOME_STITCH_CONTENT)
Components: Hero with badges, Command Panel (4 pillars: Signals/Orchestration/Content/Attribution), Proof Stats (87% YoY pipeline), Pillar Section, Methodology (Diagnose→Design→Deploy→Optimize), Marquee industries, Featured case study, Blog insights block, Final CTA
SEO Meta: Title: "Home", Visual ID: "growth-ai-animation"
ABOUT — /about
Headline: "The operator behind GTMStack.pro"
Key Messages: 12+ years B2B GTM. Career timeline: Solution Consultant (2014) → Marketing Ops Lead (2017) → Sr. Revenue Manager (2019) → Director Demand Gen (2021–present).
CTA: "View Case Studies" | "Explore Expertise"
Data Source: content/about.ts
Components: Hero, Performance benchmarks (6 metrics), Operating track record timeline (4 entries), Systems applied section, Stats section
SEO Meta: Title: "About GTM Stack", Theme: dark, Visual ID: "gtmstack-hero-tile-v2"
EXPERTISE INDEX — /expertise
Headline: "Expertise" / Capability map
Key Messages: 4-pillar structure + 22+ individual topic pages
Data Source: content/expertise.ts (expertiseItems array); content/expertiseHeroConfigs.ts
Components: Expertise grid, pillar nav, topic cards with icons
Pillar: Demand & Growth — /expertise/demand-growth
Headline: "Demand & Growth - High-potential account acquisition and ROI-focused pipeline"
Key Messages: Quality over quantity. Strategic account prioritization, data-driven precision, relationship-centric growth, integrated sales/marketing alignment.
CTA: "See related work" → /case-studies | "View the methodology" → /demand-growth#philosophy
Data Source: content/expertise/demand-growth.ts
Components: Hero, Metrics (20% lead increase, 15% volume increase, 10% conversion improvement), 5 capability items, 4 philosophy principles, Growth narrative, CTA
Pillar: Content & Engagement — /expertise/content-engagement
Headline: "Content & Engagement"
Key Messages: Narrative that converts. Topics: content-marketing, email-marketing, omnichannel-marketing, social-media-marketing, video-marketing
Data Source: content/expertise/content-engagement.ts + MDX files
Pillar: Strategy & Insights — /expertise/strategy-insights
Headline: "Strategy & Insights"
Key Messages: Decisions with evidence. Topics: account-based-marketing-abm, customer-experience-cx, customer-marketing, lifecycle-marketing
Data Source: content/expertise/strategy-insights.ts + MDX files
Pillar: Systems & Operations — /expertise/systems-operations
Headline: "Systems & Operations"
Key Messages: Stack that stays governable. Topics: ai-in-marketing, marketing-automation, marketing-operations, martech-optimization, sales-enablement
Data Source: content/expertise/systems-operations.ts + MDX files
Individual Expertise Topic Pages (22+ pages) — /expertise/{slug}
Each follows the pattern: positioning statement, challenges list, modern plays list, proof block (company/role/outcome/metrics), related expertise slugs, related case study slugs. Topics include:

ABM, Competitive Intelligence, Content Creation & Personalization, CRM Management, Customer Marketing & Journey Mapping, Demand Generation Campaigns, Digital Marketing, Event & Tradeshow Management, GTM Strategy, Lead Generation & Scoring, Marketing Analytics, Marketing Automation, Paid Media & Funnel Optimization, Product Marketing, Reporting Dashboards & Attribution, Responsive Web Design & UI/UX, ROI & Break-Even Analysis, SEO & SEM, Social Media & Reputation Management, Tech Stack Optimization, Upsell/Cross-Sell Strategies
INDUSTRIES INDEX — /industries
Headline: "Architecting Growth by Industry"
Key Messages: Navigate by 13 industry verticals. Each includes GTM realities, playbook, and proof points.
Data Source: content/industries.ts (industryItems array); content/industries/main.ts
Components: Industry grid (featured highlighted), stats, playbook section, proof points
Individual Industry Pages (13 pages) — /industries/{slug}
Verticals: B2B SaaS, FinTech & Payments, Cybersecurity, Developer Tools & DevOps, Energy & Utilities, Financial Services, Fleet & Logistics, Healthcare & Health Technology, Manufacturing, Non-Profit & Education, Public Sector & Gov, Retail & Consumer, Supply Chain & Logistics

Sample — B2B SaaS /industries/b2b-saas:

GTM Realities: Balancing PLG/sales-led, scaling SMB→enterprise, reducing churn
Playbook: Unified GTM, PLG engines, lifecycle marketing, attribution, enterprise enablement
Proof: PRGX (87% YoY), Red Hat (33% pipeline, 40% upsell), Salesforce (76% YoY lift)
Visual ID: "rev-ops-dashboard"
CASE STUDIES INDEX — /case-studies
Headline: "Selected GTM work."
Key Messages: Real programs tied to measurable outcomes. 240% pipeline growth, 12.4x ROAS, -45% CAC, $3.2M revenue attributed.
CTA: "Browse case studies" → #browse | "Explore expertise" → /expertise
Data Source: content/case-studies.ts (caseStudyItems array)
Components: Hero with mini-stats, Filter sidebar (industry + topic), Case study card grid (2-col), Proof band ($250M+ influenced, 4.2x ROI, 85+ deployments, 32% efficiency lift), Marquee labels, Featured flagship results, Final CTA
Interactive Elements: Industry filter, Topic filter, Clear filters
SEO Meta: Title: "Case Studies", Theme: dark, Visual ID: "gtm-strategy-audience-tile-v2"
Individual Case Study Pages (35+ pages) — /case-studies/{slug}
All follow: Challenge → Solution → Results pattern with tags, industry, year, featured flag, related expertise.

Sample — ABM System Launch (PRGX) /case-studies/abm-system-launch-prgx:

Headline: "ABM System Launch"
Client: PRGX Global
Challenge: No ABM program, ICP model, or personalization. Marketing/Sales/Ops siloed.
Solution: ABM Operating System, Intent & Signal Integration (Demandbase, CRM, MAP), Multi-Threaded Sales Alignment, Personalization Infrastructure, Measurement Framework
Results: 87% YoY pipeline, 180% MQL→SQL lift, 200% strategic account engagement increase
Tags: ABM, Enterprise GTM, Sales Alignment, Account Intelligence
Related Expertise: account-based-marketing, marketing-operations, demand-generation, sales-enablement, ai-in-marketing
Other documented case studies include: Discrete Manufacturing ABM (PRGX), PRGX Unified Revenue Operating Model, AMCS Verticalized ABM, Red Hat Global ABM, Salesforce Analytics Rebuild, Event-to-Store Retail Lift, Healthcare Cloud Adoption, and 27+ more.

BLOG — /blog
Headline: "Blog"
Key Messages: Field notes on B2B go-to-market: demand generation, marketing operations, revenue systems, ABM, practitioner-level GTM thinking.
Data Source: WordPress integration (lib/wordpress.ts) — dynamically fetched
Components: Post index with pagination (9 per page), category filters, tag filters, search, client-side filtering with URL params
Interactive Elements: Search, category filter, tag filter, pagination
SEO Meta: Title: "Blog", Description: "Field notes on B2B go-to-market..."
GALLERY — /gallery
Headline: "Animation Gallery"
Key Messages: Explore 50+ marketing dashboard animations. Built with React, Framer Motion, Tailwind.
CTA: "Request custom animations" → /contact
Data Source: content/gallery/main.ts (GALLERY_MAIN_CONTENT)
SEO Meta: Title: "Animation Gallery", Visual ID: (empty) [INCOMPLETE]
RESUME — /resume
Headline: "Expertise in GTM Execution"
Key Messages: 20+ years building and scaling revenue organizations. M&A roots → Salesforce era → GTM Stack founder → Global advisor.
Stats: 20+ years experience, M&A analyst origins, SFDC lead strategist, Founder
CTA: "Download PDF" | "View Projects"
Data Source: content/resume.ts
Components: Hero, Career evolution (4 steps), Core competencies (Enterprise GTM, Strategy & Ops, RevOps Stack, Leadership)
SEO Meta: Title: "Resume", Theme: light
PROJECTS — /projects
Headline: "Outcome-First Blueprints"
Key Messages: Real client transformations shipped like products. $500M+ pipeline, 47% revenue lift, 2.8x velocity, 100% attribution.
CTA: "View All Projects" | "Request Similar Blueprint"
Data Source: content/projects/main.ts (PROJECTS_MAIN_CONTENT)
Components: Hero, 4 metrics, 4 featured projects (PRGX/AMCS/Red Hat/Salesforce), quote block, nav list
SEO Meta: Title: "Projects", Visual ID: (empty) [INCOMPLETE]
CONTACT — /contact
Status: Redirects to /about#resume
Key Messages: 24h response time, 100% founder-led, global availability.
Data Source: content/contact.ts (CONTACT_CONTENT)
Components: Hero, Useful first exchange (4 steps: Context→Signal→Response→Next Step), Good reasons to reach out (4 items), What helps in first message (3 items), Founder info, Final CTA
SEO Meta: Title: "Contact Us", Theme: light
Structure Summary
Layer	Count	Data Source
Top-level pages	9	Static TS content files
Expertise pillars	4	content/expertise/
Expertise topics	22+	content/expertise/{slug}.ts
Industry pages	13	content/industries.ts
Case study pages	35+	content/case-studies/{slug}.ts
Blog posts	Dynamic	WordPress API via lib/wordpress.ts
Content architecture: All static pages driven by TypeScript content files in /content/. Template-based rendering via page registry. Expertise, Industries, and Case Studies are cross-linked by slug references. Blog is the only CMS-sourced content.

Flagged items needing attention:

/gallery — Visual ID empty, copy appears thin [INCOMPLETE]
/projects — Visual ID empty [INCOMPLETE]
/contact — Redirects rather than renders own page [INCOMPLETE]
Demand & Growth metrics (20%/15%/10%) appear generic/placeholder [INCOMPLETE]
Several expertise topic pages may have boilerplate proof blocks — verify against actual case study data