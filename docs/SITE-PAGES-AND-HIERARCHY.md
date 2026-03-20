# Site Hierarchy Reference

A simple, non-technical view of what’s on the site and how it’s organized.

---

## Main menu (top level)

| What you see | What it is |
|--------------|------------|
| **Home** | Main landing page |
| **About** | About GTMStack.pro / the team |
| **Expertise** | How we help (services and capabilities) — has a submenu |
| **Industries** | Who we help (by industry) — has a submenu |
| **Case Studies** | Proof: client stories and results |
| **Animation Gallery** | 100+ Tailwind animations — hub (landing) and individual animation pages |
| **Blog** | Insights and articles — hub (landing) and individual post pages |
| **Resume** | Professional resume |
| **Contact** | Get in touch |

---

## Expertise (how we help)

**Expertise hub**  
One page that introduces all expertise areas and links to the four pillars below.

**Four pillars (categories)**  
Each pillar has its own landing page plus individual topic pages under it.

### 1. Content & Engagement
- Content & Engagement (pillar page)
- Content Creation & Personalization
- Event & Tradeshow Management
- Search Engine Optimization & Management (SEO & SEM)
- Social Media & Reputation Management
- Responsive Web Design & UI/UX

### 2. Demand & Growth
- Demand & Growth (pillar page)
- Account-Based Marketing (ABM)
- Demand Generation Campaigns
- Lead Generation & Scoring
- Paid Media & Funnel Optimization
- Upsell/Cross-Sell Strategies (Sales Enablement)

### 3. Strategy & Insights
- Strategy & Insights (pillar page)
- Competitive Intelligence & Positioning
- Customer Marketing & Journey Mapping
- GTM Strategy
- Product Marketing
- ROI & Break-Even Analysis

### 4. Systems & Operations
- Systems & Operations (pillar page)
- Reporting Dashboards & Attribution (Analytics)
- CRM Management & Integration
- Marketing Analytics & Reporting
- Marketing Automation & Workflows
- Tech Stack Optimization & Enablement (Martech)

---

## Industries (who we help)

**Industries hub**  
One page that lists all industries and links to each industry page.

**Individual industry pages**  
Each has its own page with industry-specific focus:

- B2B SaaS (Technology & SaaS)
- Cybersecurity
- Developer Tools & DevOps
- Energy & Utilities
- Financial Services
- Fleet & Logistics
- Healthcare & Health Technology
- Manufacturing
- Non-Profit & Education
- Public Sector & Government
- Retail & Consumer
- Supply Chain & Logistics
- Technology & SaaS

---

## Case Studies

**Case Studies hub**  
One page that lists all case studies and links to each story.

**Individual case study pages**  
Each case study has its own page (e.g. ABM system launch, Red Hat ABM activation, Salesforce demand gen analytics, event-to-store retail lift, marketing flight planner, 4D resume, and others).

There is also a sub-area: **AI Visualizations** (showcase of animation/visual work).

### Naming note: Case Studies vs Projects

- Public-facing copy may use either **Case Studies** or **Projects** depending on section context.
- Canonical route and mapping decisions are controlled by the registry and routing documentation, not legacy page-list snapshots.

---

## Animation Gallery

The Animation Gallery has the same importance as the Blog: a major content hub and a browsable library of **100+ Tailwind-based animations**.

- **Gallery landing page** — One page that lists or browses all animations (categories, search, or grid).
- **Single animation page** — Each animation has its own detail page so you can view it full-size, see the code or usage, and (where applicable) try it or copy it.

**AI Visualizations**  
A dedicated sub-area within the gallery for AI-driven or data-visualization style animations.

---

## Blog / Insights

Blog has the same importance as the Animation Gallery: a major content hub with a landing page and single-post pages.

- **Blog landing page** — Lists or browses all posts in one place.
- **Single post** — Each post has its own page (content can come from a CMS).

---

## Other pages

| Page | Purpose |
|------|--------|
| **Privacy** | Privacy policy |
| **Terms** | Terms of use |

---

## Simple hierarchy diagram

```
Home
About
Contact
Resume

Expertise (hub)
├── Content & Engagement (pillar) → topic pages
├── Demand & Growth (pillar) → topic pages
├── Strategy & Insights (pillar) → topic pages
└── Systems & Operations (pillar) → topic pages

Industries (hub)
└── Individual industry pages (B2B SaaS, Healthcare, etc.)

Case Studies (hub)
├── Individual case study pages
└── AI Visualizations

Animation Gallery (landing + single animation pages)
├── Gallery landing page
├── Individual animation pages (100+ Tailwind animations)
└── AI Visualizations

Blog (landing + single post pages)
├── Blog landing page
└── Individual blog posts

Privacy / Terms
```

---

*This document describes the site structure in plain language. For technical routing and templates, see the developer docs and page registry.*

> **Note:** `gtmstackpro-page-review.md`, `CURRENT_SITEMAP.md`, and `PAGE LISTG.txt` have been consolidated into this canonical document and archived under `docs/archive/2026-03-16/`.
