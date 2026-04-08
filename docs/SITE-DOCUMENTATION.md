# SITE-DOCUMENTATION.md
**GTMStack.pro — Complete Site Documentation**
*Generated: 2026-04-05 | Based on: Site Content Inventory v1*

---

## Table of Contents

1. [Section A — Web Developer / Technical Contributor](#section-a--web-developer--technical-contributor)
2. [Section B — Marketing Professional / Content Strategist](#section-b--marketing-professional--content-strategist)
3. [Section C — Business Stakeholder / Agency Principal](#section-c--business-stakeholder--agency-principal)
4. [Section D — Prospective Client / Buyer](#section-d--prospective-client--buyer)
5. [Site-Wide Summary](#site-wide-summary)
6. [Glossary of Site-Specific Terms](#glossary-of-site-specific-terms)
7. [Recommended Next Steps](#recommended-next-steps)

---

# Section A — Web Developer / Technical Contributor

> This section covers routing, component architecture, data sources, dynamic patterns, interactive elements, and known issues. Use this section when building features, debugging, or onboarding to the codebase.

---

## A.1 Architecture Overview

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Content model:** Static TypeScript content files under `/content/` — no headless CMS for core pages
- **Blog:** WordPress REST API integration via `lib/wordpress.ts`
- **Routing model:** Mix of file-based App Router routes (`/app/`) and a page registry catch-all for dynamic/generated pages
- **Dynamic routing:** `[[...slug]]` catch-all resolves slugs against `pageRegistry` to select template + content key
- **Reserved route prefixes (not rendered):** `api`, `admin`, `_next`, `favicon.ico`, `sitemap.xml`, `robots.txt`

---

## A.2 Page-by-Page Technical Reference

---

### HOME — `/`

| Property | Value |
|---|---|
| Route | `/` |
| File location | `app/page.tsx` (assumed) |
| Data source | `content/home.ts` → `HOME_STITCH_CONTENT` |
| Rendering | Static / SSG |

**Component architecture:**
1. `Hero` — with badge overlay; visual ID: `"growth-ai-animation"`
2. Command Panel — 4-pillar display (Signals, Orchestration, Content, Attribution)
3. Proof Stats block — single stat highlight (87% YoY pipeline)
4. Pillar Section — 4 tile grid linking to expertise pillars
5. Methodology block — 4-step flow (Diagnose → Design → Deploy → Optimize)
6. Marquee — scrolling industry labels
7. Featured Case Study block — links to individual case study
8. Blog Insights block — [UNKNOWN - VERIFY] whether this pulls live from WordPress or is static
9. Final CTA block

**Interactive/animated elements:**
- Marquee scroll animation (Framer Motion or CSS)
- `"growth-ai-animation"` visual — confirm animation component wired to this visual ID
- Command Panel may have hover states or transitions

**Navigation relationships:**
- Links out to: `/case-studies`, `/expertise`, `/industries`, `/blog`, `/contact`
- Entry point for all primary navigation paths
- No parent page

**Known issues / flags:**
- [UNKNOWN - VERIFY] Blog Insights block data source — static snapshot or live WP query?
- [UNKNOWN - VERIFY] Visual ID `"growth-ai-animation"` — confirm animation component is registered and renders correctly

---

### ABOUT — `/about`

| Property | Value |
|---|---|
| Route | `/about` |
| File location | `app/about/page.tsx` (assumed) |
| Data source | `content/about.ts` |
| Rendering | Static / SSG |
| Theme | Dark |
| Visual ID | `"gtmstack-hero-tile-v2"` |

**Component architecture:**
1. `Hero` (dark theme) — visual ID: `"gtmstack-hero-tile-v2"`
2. Performance benchmarks block — 6 metric items
3. Operating track record timeline — 4 entries (2014, 2017, 2019, 2021)
4. Systems applied section
5. Stats section

**Interactive/animated elements:**
- Timeline component — verify scroll-triggered animation or static render
- Performance benchmark counters — [UNKNOWN - VERIFY] whether numbers animate on scroll

**Navigation relationships:**
- Linked from: Home (implied), Navbar
- Links out to: `/case-studies`, `/expertise`
- `/contact` redirects here (`/about#resume`)

**Known issues / flags:**
- Contact page redirects to `/about#resume` — ensure this anchor ID exists in the rendered DOM
- [UNKNOWN - VERIFY] whether `#resume` anchor is implemented

---

### EXPERTISE INDEX — `/expertise`

| Property | Value |
|---|---|
| Route | `/expertise` |
| File location | `app/expertise/page.tsx` (assumed) |
| Data source | `content/expertise.ts` → `expertiseItems[]`; `content/expertiseHeroConfigs.ts` |
| Rendering | Static / SSG |

**Component architecture:**
1. Hero — visual ID from `expertiseHeroConfigs.ts` (`"g-t-m-audience-tile"`)
2. Expertise grid — renders `expertiseItems[]` as topic cards with icons
3. Pillar navigation — 4 pillar links

**Navigation relationships:**
- Parent of all `/expertise/{slug}` and `/expertise/{pillar}` pages
- Linked from: Navbar, Home pillar section

---

### EXPERTISE PILLAR — `/expertise/demand-growth`

| Property | Value |
|---|---|
| Route | `/expertise/demand-growth` |
| File location | `app/expertise/demand-growth/page.tsx` or catch-all |
| Data source | `content/expertise/demand-growth.ts` → `DEMAND_GROWTH_CONTENT` |
| Rendering | Static / SSG |

**Component architecture:**
1. `Hero` — visual ID: `"demand-gen-flow"`
2. Metrics block — 3 stats (20% lead increase, 15% volume increase, 10% conversion improvement)
3. Capabilities section — 5 items
4. Philosophy section — 4 principles
5. Growth narrative block
6. CTA section

**Known issues / flags:**
- [INCOMPLETE] Metrics (20%/15%/10%) appear generic — likely placeholder values. Replace with real program data before client-facing use.

---

### EXPERTISE PILLAR — `/expertise/content-engagement`

| Property | Value |
|---|---|
| Route | `/expertise/content-engagement` |
| Data source | `content/expertise/content-engagement.ts` + MDX files in `/content/expertise/content-engagement/` |
| Rendering | Static / SSG + MDX parsing |

**Notes:**
- MDX source files present — confirm MDX renderer is configured and all MDX files compile without errors
- Topics: `content-marketing`, `email-marketing`, `omnichannel-marketing`, `social-media-marketing`, `video-marketing`

---

### EXPERTISE PILLAR — `/expertise/strategy-insights`

| Property | Value |
|---|---|
| Route | `/expertise/strategy-insights` |
| Data source | `content/expertise/strategy-insights.ts` + MDX files |
| Rendering | Static / SSG + MDX parsing |
| Visual ID | `"quantum-dashboard"` |

**Topics:** `account-based-marketing-abm`, `customer-experience-cx`, `customer-marketing`, `lifecycle-marketing`

---

### EXPERTISE PILLAR — `/expertise/systems-operations`

| Property | Value |
|---|---|
| Route | `/expertise/systems-operations` |
| Data source | `content/expertise/systems-operations.ts` + MDX files |
| Rendering | Static / SSG + MDX parsing |
| Visual ID | `"engineering-workflow-system"` |

**Topics:** `ai-in-marketing`, `marketing-automation`, `marketing-operations`, `martech-optimization`, `sales-enablement`

---

### EXPERTISE TOPIC PAGES — `/expertise/{slug}` (22+ pages)

| Property | Value |
|---|---|
| Route pattern | `/expertise/[slug]` or catch-all |
| Data source | `content/expertise/{slug}.ts` — one file per topic |
| Rendering | Static / SSG with `generateStaticParams()` (assumed) |

**Content shape per topic file:**
```ts
{
  slug: string
  positioning: string
  challenges: string[]
  modernPlays: string[]
  proof: { company, role, outcome, metrics }
  relatedExpertise: string[]        // slugs
  relatedCaseStudies: string[]      // slugs
}
```

**Navigation relationships:**
- Parent: `/expertise` index and relevant pillar page
- Cross-links: `relatedExpertise[]` and `relatedCaseStudies[]` slugs resolve to internal links
- [UNKNOWN - VERIFY] How cross-links are rendered — confirm slug resolution doesn't 404 for any entry

**Known issues / flags:**
- [INCOMPLETE] Several proof blocks may contain boilerplate data — audit `proof.metrics` fields against actual case study results
- [UNKNOWN - VERIFY] All 22+ topic `content/expertise/{slug}.ts` files exist and export valid shapes

---

### INDUSTRIES INDEX — `/industries`

| Property | Value |
|---|---|
| Route | `/industries` |
| File location | `app/industries/page.tsx` (assumed) |
| Data source | `content/industries.ts` → `industryItems[]`; `content/industries/main.ts` |
| Rendering | Static / SSG |
| Visual ID | `"industrial-dashboard"` |

**Component architecture:**
1. Hero — visual ID: `"industrial-dashboard"`
2. Industry grid — renders `industryItems[]`, featured items highlighted
3. Stats section
4. Playbook section
5. Proof points block

**Navigation relationships:**
- Parent of all `/industries/{slug}` pages
- Linked from: Navbar, Home marquee section

---

### INDUSTRY PAGES — `/industries/{slug}` (13 pages)

| Property | Value |
|---|---|
| Route pattern | `/industries/[slug]` or catch-all |
| Data source | `content/industries.ts` — industry records keyed by slug |
| Rendering | Static / SSG |

**Content shape per industry:**
```ts
{
  slug: string
  headline: string
  gtmRealities: string[]
  playbook: string[]
  proof: { client, metric }[]
  visualId: string
  featuredCaseStudies: string[]     // slugs
  relatedExpertise: string[]        // slugs
}
```

**Verticals and visual IDs:**

| Slug | Visual ID |
|---|---|
| `b2b-saas` | `"rev-ops-dashboard"` |
| `manufacturing` | `"manufacturing-lifecycle-dashboard"` |
| Others (11) | [UNKNOWN - VERIFY] |

**Known issues / flags:**
- [UNKNOWN - VERIFY] Visual IDs for all 13 industry pages — confirm all are registered in animation/visual ID system
- [UNKNOWN - VERIFY] Cross-links to `featuredCaseStudies` resolve without 404

---

### CASE STUDIES INDEX — `/case-studies`

| Property | Value |
|---|---|
| Route | `/case-studies` |
| File location | `app/case-studies/page.tsx` (assumed) |
| Data source | `content/case-studies.ts` → `caseStudyItems[]` |
| Rendering | Static / SSG |
| Theme | Dark |
| Visual ID | `"gtm-strategy-audience-tile-v2"` |

**Component architecture:**
1. `HeroDark` — visual ID: `"gtm-strategy-audience-tile-v2"`; mini-stats overlay
2. Filter sidebar — Industry filter (dropdown/select), Topic filter (dropdown/select), Clear filters button
3. Case study card grid — 2-column layout
4. Proof band — 4 aggregate stats
5. Marquee — industry label scroll
6. Featured flagship results section
7. Final CTA block

**Interactive elements:**
- Industry filter — client-side state, filters `caseStudyItems[]` by industry field
- Topic filter — client-side state, filters by tags/expertise
- Clear filters button — resets both filters
- [UNKNOWN - VERIFY] Whether filters update URL params or are pure in-memory state

**Navigation relationships:**
- Parent of all `/case-studies/{slug}` pages
- Linked from: Home (both CTAs), About, all expertise topic pages, all industry pages

---

### CASE STUDY PAGES — `/case-studies/{slug}` (35+ pages)

| Property | Value |
|---|---|
| Route pattern | `/case-studies/[slug]` or catch-all |
| Data source | `content/case-studies/{slug}.ts` — one file per study |
| Rendering | Static / SSG |

**Content shape per case study:**
```ts
{
  slug: string
  headline: string
  client: string
  industry: string                  // slug
  year: number
  featured: boolean
  tags: string[]
  challenge: string
  solution: string[]
  results: { metric, value }[]
  relatedExpertise: string[]        // slugs
  relatedCaseStudies: string[]      // slugs (optional)
}
```

**Navigation relationships:**
- Parent: `/case-studies` index
- Cross-links: `relatedExpertise[]` → expertise topic pages; `industry` → industry page
- [UNKNOWN - VERIFY] Rendered related links on individual study pages — confirm template includes related expertise sidebar

---

### BLOG — `/blog`

| Property | Value |
|---|---|
| Route | `/blog` |
| File location | `app/blog/page.tsx` or `app/(local)/blog/page.tsx` (assumed) |
| Data source | WordPress REST API via `lib/wordpress.ts` — dynamically fetched |
| Rendering | SSR or ISR (WordPress data) |

**Component architecture:**
1. Blog index grid — 9 posts per page
2. Category filter
3. Tag filter
4. Search input
5. Pagination controls

**Interactive elements:**
- Search — client-side filtering with URL params
- Category filter — URL param driven
- Tag filter — URL param driven
- Pagination — page param in URL

**Data dependencies:**
- `lib/wordpress.ts` — must be configured with correct WP REST API endpoint
- [UNKNOWN - VERIFY] WP REST API base URL and authentication (if private)
- [UNKNOWN - VERIFY] Whether blog index uses `getStaticProps` with revalidation or server-side fetch per request

**Navigation relationships:**
- Linked from: Navbar, Home blog insights block
- Individual posts: `/blog/{slug}` — [UNKNOWN - VERIFY] routing for individual post pages

---

### GALLERY — `/gallery`

| Property | Value |
|---|---|
| Route | `/gallery` |
| File location | `app/gallery/page.tsx` or `app/(local)/gallery-admin/` (admin variant) |
| Data source | `content/gallery/main.ts` → `GALLERY_MAIN_CONTENT` |
| Rendering | Static / SSG |
| Visual ID | (empty) [INCOMPLETE] |

**Component architecture:**
- Animation showcase grid — 50+ animation components
- Built with: React, Framer Motion, Tailwind CSS

**Known issues / flags:**
- [INCOMPLETE] Visual ID field is empty — Hero visual will not render correctly
- [INCOMPLETE] Copy is thin — headline and supporting copy need expansion
- Note: `app/(local)/gallery-admin/ui.client.tsx` exists — appears to be an admin/management view, not public-facing

---

### RESUME — `/resume`

| Property | Value |
|---|---|
| Route | `/resume` |
| Data source | `content/resume.ts` |
| Rendering | Static / SSG |
| Theme | Light |

**Component architecture:**
1. Hero (light theme)
2. Career evolution — 4-step horizontal or vertical timeline
3. Core competencies — 4 items

**CTAs:** "Download PDF" — [UNKNOWN - VERIFY] PDF file path and whether it is current; "View Projects" → `/projects`

---

### PROJECTS — `/projects`

| Property | Value |
|---|---|
| Route | `/projects` |
| Data source | `content/projects/main.ts` → `PROJECTS_MAIN_CONTENT` |
| Rendering | Static / SSG |
| Visual ID | (empty) [INCOMPLETE] |

**Component architecture:**
1. Hero
2. Metrics block — 4 stats
3. Featured projects — 4 cards (PRGX, AMCS, Red Hat, Salesforce)
4. Quote block
5. Navigation list

**Known issues / flags:**
- [INCOMPLETE] Visual ID empty — Hero visual will not render

---

### CONTACT — `/contact`

| Property | Value |
|---|---|
| Route | `/contact` |
| Status | Redirects to `/about#resume` |
| Data source | `content/contact.ts` → `CONTACT_CONTENT` |
| Rendering | Redirect (no page rendered) |
| Theme | Light |

**Known issues / flags:**
- [INCOMPLETE] Contact page content exists in `content/contact.ts` but the route redirects away — content is never rendered
- Decision required: implement `/contact` as a standalone page, or keep redirect and remove orphaned content file
- [UNKNOWN - VERIFY] Redirect implementation location — Next.js `next.config.js` redirect, or middleware

---

## A.3 Data Architecture Summary

| Content type | Storage | Update method |
|---|---|---|
| Core pages | `content/*.ts` TypeScript files | Code edit + redeploy |
| Expertise pillars + topics | `content/expertise/*.ts` + MDX | Code edit + redeploy |
| Industry pages | `content/industries.ts` | Code edit + redeploy |
| Case studies | `content/case-studies/*.ts` | Code edit + redeploy |
| Blog posts | WordPress REST API | WP admin — no redeploy needed |
| Gallery animations | `content/gallery/main.ts` + animation components | Code edit + redeploy |
| Navigation | [UNKNOWN - VERIFY] — likely `components/layout/Navbar.tsx` and `MegaMenu.tsx` | Code edit + redeploy |

---

## A.4 Known Issues Register

| ID | Location | Issue | Severity |
|---|---|---|---|
| DEV-01 | `/expertise/demand-growth` | Placeholder metrics (20%/15%/10%) | Medium |
| DEV-02 | `/gallery` | Visual ID empty — Hero broken | High |
| DEV-03 | `/projects` | Visual ID empty — Hero broken | High |
| DEV-04 | `/contact` | Route redirects — content never rendered | Medium |
| DEV-05 | `/about#resume` | Anchor must exist for contact redirect | High |
| DEV-06 | Multiple expertise topics | Proof blocks may contain boilerplate | Medium |
| DEV-07 | Blog | Individual post routing unverified | Medium |
| DEV-08 | Resume CTA | PDF file path unverified | Low |

---

# Section B — Marketing Professional / Content Strategist

> This section covers buyer journey positioning, persona targeting, messaging, CTA intent, content gaps, funnel connections, and SEO intent for each page. Use this section when planning content updates, auditing messaging consistency, or mapping the site to campaign goals.

---

## B.1 Funnel Architecture Overview

GTMStack.pro operates as a **portfolio + authority site** for a solo B2B GTM operator. The funnel is not transactional — it is a trust-building sequence that moves buyers from **awareness** (expertise content, blog) through **evaluation** (case studies, industries) to **intent** (about, resume, contact).

```
AWARENESS          CONSIDERATION         INTENT             ACTION
/blog              /expertise            /case-studies       /contact (→ /about)
/expertise         /industries           /about              /resume → PDF
/gallery           /case-studies         /projects
```

---

## B.2 Page-by-Page Marketing Reference

---

### HOME — `/`

**Buyer journey stage:** Awareness → Consideration
**Persona:** Senior B2B marketing leader, VP/Director of Revenue, or RevOps leader evaluating GTM support
**Primary value proposition:** Operator-built GTM systems with documented, measurable results — not a generalist agency

**Message analysis:**
- Headline "Real GTM work for complex B2B teams" leads with specificity (real, complex, B2B) — differentiates from theoretical consultants
- Command Panel (4 pillars) gives immediate taxonomy of capabilities — reduces cognitive load for first-time visitors
- 87% YoY pipeline stat as social proof in hero — high credibility signal if sourced
- Methodology section (Diagnose → Design → Deploy → Optimize) signals structured process thinking

**CTA analysis:**
- "Browse case studies" — strong intent signal CTA; directs to evidence
- "Explore expertise" — educational CTA for earlier-stage buyers
- Both CTAs serve different funnel stages simultaneously — appropriate for mixed traffic

**Content gaps / optimization opportunities:**
- No explicit industry targeting on home page — consider adding "Working with [industry]?" signal for segment recognition
- Blog insights block: if static, it will go stale — should pull live from WordPress
- No testimonial or social proof quote on home — case study stats are present but a named quote would strengthen trust
- Meta title is just "Home" — missed SEO opportunity; recommend updating to brand + value prop

**SEO intent:**
- Primary: Brand terms ("GTMStack", "GTM Stack pro")
- Secondary: Informational ("B2B GTM strategy", "revenue operations consultant")
- Current meta title "Home" has no keyword value — [INCOMPLETE]

**Funnel connection:**
- Feeds: `/case-studies` (primary), `/expertise` (secondary), `/industries`, `/blog`
- Receives traffic from: direct, brand search, referral

---

### ABOUT — `/about`

**Buyer journey stage:** Consideration → Intent
**Persona:** Decision-maker doing due diligence; wants to evaluate the person, not just the service
**Primary value proposition:** 12+ years of documented operator experience — this person has done it, not just advised on it

**Message analysis:**
- "The operator behind GTMStack.pro" — positions as practitioner, not consultant; resonates with buyers burned by theory-heavy agencies
- Career timeline anchors credibility with real employers and roles
- Performance benchmarks (6 metrics) give quantified proof of competence
- "Systems applied" section signals specific platform expertise (Salesforce, etc.)

**CTA analysis:**
- "View Case Studies" — moves buyer toward evidence
- "Explore Expertise" — moves buyer toward capability understanding
- Both appropriate for consideration stage — no hard sell

**Content gaps / optimization opportunities:**
- No named client testimonials or quotes — a quote from a PRGX or Red Hat contact would significantly increase trust
- "12+ years" in inventory but "20+ years" mentioned in resume/home — **inconsistency to resolve**
- Contact redirect (`/contact` → `/about#resume`) makes About a de facto contact page — ensure the page has a clear "how to reach me" section
- No LinkedIn or social proof link visible in inventory

**SEO intent:**
- "B2B GTM consultant", "revenue operations expert", "demand generation specialist"
- [UNKNOWN - VERIFY] meta description content

---

### EXPERTISE INDEX — `/expertise`

**Buyer journey stage:** Awareness → Consideration
**Persona:** Marketing leader exploring capability fit; evaluating whether GTMStack's expertise matches their problem
**Primary value proposition:** Structured, comprehensive GTM capability across four interconnected pillars — not siloed services

**Message analysis:**
- 4-pillar structure mirrors how mature GTM orgs think (Demand, Content, Strategy, Systems)
- 22+ topic pages signal depth of coverage
- Capability map format enables self-navigation to most relevant expertise area

**Content gaps / optimization opportunities:**
- Index page headline "Expertise" is generic — recommend a value-prop headline (e.g., "The GTM capability map for complex B2B teams")
- No entry-point copy explaining *why* the pillar structure exists — add a 2-sentence orientation paragraph
- No recommended path for different personas ("If you're a VP Demand Gen, start here...")

**SEO intent:**
- Pillar pages can target: "B2B demand generation strategy", "marketing operations consulting", "ABM strategy framework", "revenue attribution model"
- Index page: "B2B GTM expertise", "go-to-market consulting services"

---

### EXPERTISE PILLARS — `/expertise/{pillar}` (4 pages)

**Demand & Growth** — `/expertise/demand-growth`
- **Stage:** Consideration
- **Persona:** Demand gen leader, pipeline-focused CMO
- **Message:** Quality pipeline over volume — strategic account prioritization
- **Gap:** [INCOMPLETE] Placeholder metrics undermine credibility. Replace 20%/15%/10% with real program numbers from case studies before any promotion.
- **SEO target:** "demand generation strategy B2B", "pipeline growth consulting"

**Content & Engagement** — `/expertise/content-engagement`
- **Stage:** Awareness → Consideration
- **Persona:** Content or campaign marketer looking for strategic guidance
- **Message:** "Narrative that converts" — content tied to sales cycles
- **Gap:** [UNKNOWN - VERIFY] No metrics visible in inventory — confirm supporting stats exist in content file

**Strategy & Insights** — `/expertise/strategy-insights`
- **Stage:** Consideration
- **Persona:** CMO, VP Marketing, or revenue strategist evaluating methodology
- **Message:** "Decisions with evidence" — ABM and lifecycle models grounded in buyer reality
- **Gap:** [UNKNOWN - VERIFY] Supporting proof metrics not visible in inventory

**Systems & Operations** — `/expertise/systems-operations`
- **Stage:** Consideration → Intent
- **Persona:** Marketing ops, RevOps, or tech-stack evaluator
- **Message:** "Stack that stays governable" — automation and reporting leadership can trust
- **Gap:** [UNKNOWN - VERIFY] Supporting proof metrics not visible in inventory

---

### EXPERTISE TOPIC PAGES — `/expertise/{slug}` (22+ pages)

**Buyer journey stage:** Awareness → Consideration (long-tail entry points)
**Persona:** Practitioner searching for a specific capability or solution
**Primary value proposition:** Deep, documented experience in a specific GTM discipline

**Message pattern (consistent across all topics):**
1. Positioning — what this expertise enables
2. Challenges — names the buyer's pain (qualification signal)
3. Modern plays — signals methodology maturity
4. Proof — specific result anchored to a real program

**Content gaps / optimization opportunities:**
- Proof blocks must be audited — generic proof here undermines the specificity of the site's overall positioning
- Each topic page is a potential SEO entry point — ensure `<title>` and meta descriptions are keyword-optimized per topic
- Internal linking from topic pages to case studies should be explicit and bidirectional
- Consider adding a "related resources" block pulling live blog posts by category tag

**SEO intent (topic-level):**
- Each slug maps to a long-tail keyword cluster: "ABM strategy", "marketing attribution model", "B2B lead scoring", "CRM integration services", etc.
- These pages should be the highest-traffic organic entry points if properly optimized

---

### INDUSTRIES INDEX — `/industries`

**Buyer journey stage:** Awareness → Consideration
**Persona:** Industry-specific buyer who self-identifies by vertical before function
**Primary value proposition:** GTM expertise applied to your specific industry context — not generic frameworks

**Message analysis:**
- "Architecting Growth by Industry" — positions as strategic architect, not vendor
- 13 verticals show breadth
- Featured industries signal depth in prioritized verticals

**Content gaps / optimization opportunities:**
- No copy explaining *why* industry specialization matters — add a paragraph on why industry-specific GTM outperforms generic approaches
- Industry cards: [UNKNOWN - VERIFY] whether each card has a teaser of proof (e.g., a metric) or just a name/description
- Consider adding "Primary GTM challenge" for each industry on the index card for instant qualification

---

### INDUSTRY PAGES — `/industries/{slug}` (13 pages)

**Buyer journey stage:** Consideration
**Persona:** Decision-maker in that vertical evaluating relevance and fit
**Primary value proposition:** Proven GTM programs in this exact market context

**Message pattern (per industry):**
1. GTM Realities — names the buyer's specific market challenge (strong qualification signal)
2. Playbook — signals proven methodology
3. Proof — named clients with real metrics

**B2B SaaS example analysis:**
- GTM Realities section accurately names real SaaS challenges (PLG/sales-led tension, SMB→enterprise transition)
- Proof is strong: PRGX (87%), Red Hat (33%/40%), Salesforce (76%) — these are verifiable, high-credibility numbers
- [UNKNOWN - VERIFY] Whether proof metrics on industry pages match exactly what's documented in linked case studies

**Content gaps / optimization opportunities:**
- Ensure proof metrics are consistent with case study detail pages — discrepancies erode trust
- Add a "Most relevant expertise" callout linking to 2-3 expertise topics per industry
- Consider a featured blog post per industry — surfaces thought leadership to earlier-stage buyers

**SEO intent:**
- "B2B SaaS marketing consultant", "manufacturing demand generation", "cybersecurity GTM strategy", etc.
- High-value long-tail with commercial intent

---

### CASE STUDIES INDEX — `/case-studies`

**Buyer journey stage:** Consideration → Intent
**Persona:** Evaluating buyer who needs proof before committing to a conversation
**Primary value proposition:** 35+ documented, measurable GTM programs — the work speaks for itself

**Message analysis:**
- "Selected GTM work." — understated, confident positioning; avoids oversell
- Filter by industry + topic: enables self-directed qualification
- Aggregate stats ($250M+ influenced, 4.2x ROI, 85+ deployments, 32% efficiency lift) — high-credibility proof band
- "Featured flagship results" section for highest-impact case studies

**CTA analysis:**
- "Browse case studies" → `#browse` — page-internal anchor; low friction
- "Explore expertise" → `/expertise` — offers an alternate path for buyers not yet ready to engage with case studies

**Content gaps / optimization opportunities:**
- [UNKNOWN - VERIFY] Whether filters are discoverable on mobile — filter sidebar may collapse or be hidden on small screens
- No sorting options (by year, by result size, by industry) — consider adding for larger case study libraries
- Aggregate stats need source documentation — "85+ deployments" and "$250M+ influenced" need to be defensible

---

### CASE STUDY PAGES — `/case-studies/{slug}` (35+ pages)

**Buyer journey stage:** Intent
**Persona:** Decision-maker doing final due diligence; evaluating fit and credibility
**Primary value proposition:** Detailed, credible documentation of a specific program that matches the buyer's situation

**Message pattern (Challenge → Solution → Results):**
- Challenge section: names the starting state — buyers recognize their own situation
- Solution section: demonstrates methodology — builds confidence in approach
- Results section: closes with specific metrics — provides the "proof of concept"

**Example (PRGX ABM):**
- Challenge specificity is high — no generic "lacked GTM alignment" language; specific gaps named
- Solution names actual platforms (Demandbase, CRM, MAP) — signals real implementation experience
- Results are specific and credible (87% YoY pipeline, 180% MQL→SQL lift)

**Content gaps / optimization opportunities:**
- [UNKNOWN - VERIFY] Whether each case study has a meta description — these pages are high-intent and should be SEO-optimized
- Consider adding a "Client industry context" section — helps buyers in adjacent industries see relevance
- "Related expertise" cross-links are present — verify they render as clickable links, not just slugs
- A quote or brief testimonial would significantly increase conversion from case study → contact

---

### BLOG — `/blog`

**Buyer journey stage:** Awareness (primary entry point for organic search)
**Persona:** Practitioner actively researching GTM topics; not yet vendor-aware
**Primary value proposition:** Practitioner-grade thinking on B2B GTM — earns trust before a buyer is ready to evaluate services

**Message analysis:**
- "Field notes on B2B go-to-market" — practitioner framing, not thought leadership marketing
- Category/tag filtering allows topical exploration

**Content gaps / optimization opportunities:**
- [UNKNOWN - VERIFY] Post volume and recency — blog with <10 posts or >6 months since last post signals inactivity to buyers
- [UNKNOWN - VERIFY] Whether blog posts include CTAs to relevant case studies or expertise pages — critical for converting organic traffic
- [UNKNOWN - VERIFY] Featured or pinned post strategy — a "start here" post for new visitors would reduce bounce
- Internal linking from blog to expertise and case studies should be systematic

**SEO intent:**
- Blog is the primary organic discovery mechanism for the site
- Each post should target a specific keyword cluster aligned to an expertise topic or industry vertical
- [UNKNOWN - VERIFY] Current keyword targeting strategy for blog posts

---

### GALLERY — `/gallery`

**Buyer journey stage:** Awareness (secondary; may attract design/agency audience)
**Persona:** Marketing ops or creative lead evaluating animation/visualization capabilities
**Primary value proposition:** Visual evidence of technical execution capability — animations built for B2B marketing contexts

**Message analysis:**
- "Explore 50+ marketing dashboard animations" — signals volume and specialization
- CTA to request custom animations — monetization or service extension signal

**Content gaps / optimization opportunities:**
- [INCOMPLETE] Page copy is thin — no explanation of *why* these animations exist or how they're used in GTM programs
- No connection to case studies where animations were used — missed trust-building opportunity
- [INCOMPLETE] Visual ID empty — confirms incomplete setup

---

### RESUME — `/resume`

**Buyer journey stage:** Intent
**Persona:** HR, procurement, or senior decision-maker wanting formal credential validation
**Primary value proposition:** Structured credentials and career arc — formal validation of operator experience

**Content gaps / optimization opportunities:**
- "Download PDF" CTA is the highest-intent action on this page — [UNKNOWN - VERIFY] PDF is current and complete
- Career timeline uses "20+ years" — verify consistency with About page ("12+ years" noted)
- [UNKNOWN - VERIFY] Whether resume is gated or freely downloadable

---

### PROJECTS — `/projects`

**Buyer journey stage:** Consideration → Intent
**Persona:** Similar to case studies audience; may serve buyers who navigate by "project type" rather than "industry"
**Primary value proposition:** Outcome-first framing of major client engagements

**Content gaps / optimization opportunities:**
- [INCOMPLETE] Visual ID empty — visual appeal is compromised
- Overlap with `/case-studies` is high — clarify differentiation between "Projects" and "Case Studies" sections, or consolidate
- "Request Similar Blueprint" CTA is strong but routes to `/contact` — which redirects; fix the redirect chain

---

### CONTACT — `/contact`

**Buyer journey stage:** Action
**Primary value proposition:** Low-friction pathway to initiate an engagement conversation
**Message analysis:**
- "24h response time, 100% founder-led, global availability" — reduces friction and sets expectations
- "Useful first exchange" 4-step guide is helpful for buyers unsure what to say

**Content gaps / optimization opportunities:**
- [INCOMPLETE] Page redirects to `/about#resume` — the contact experience is broken from a buyer journey perspective
- No form, calendar embed, or email link confirmed in inventory — [UNKNOWN - VERIFY] actual contact mechanism
- "Request Similar Blueprint" and gallery CTA both route here — ensure the destination delivers on those CTAs

---

# Section C — Business Stakeholder / Agency Principal

> This section covers positioning, expected business outcomes, differentiation, proof points, and readiness assessment for each page. Use this section for strategic reviews, new business preparation, or investor/partner presentations.

---

## C.1 Positioning Statement (Observed from Site)

GTMStack.pro positions as a **solo operator-led B2B GTM practice** with 20+ years of documented, measurable results across enterprise clients (Salesforce, Red Hat, PRGX, AMCS). The differentiation is **specificity and proof** — every claim is tied to a named client, a real program, and a measurable outcome.

**Core positioning pillars observed:**
1. Operator credibility (did the work, not just advised)
2. Documented proof (35+ case studies with real metrics)
3. Industry specialization (13 verticals, not generic)
4. System thinking (4-pillar framework, not one-off tactics)

---

## C.2 Page-by-Page Business Assessment

---

### HOME — `/`

**What it communicates:** Immediate credibility signal for B2B GTM buyers. Positions the practice as results-driven and framework-driven in a single above-the-fold experience.
**Business outcome:** Awareness + initial trust-building; reduces bounce from non-qualified visitors
**Differentiation:** "Real GTM work" headline directly addresses the market fatigue with theoretical consulting
**Proof surfaces:** 87% YoY pipeline stat; four named pillars showing structured methodology
**Readiness:** `NEEDS WORK` — meta title is generic ("Home"), blog block may be stale, no testimonial quote present

---

### ABOUT — `/about`

**What it communicates:** The person behind the practice — operator credentials, career arc, and measurable performance history
**Business outcome:** Trust-building; converts curious visitors to interested prospects
**Differentiation:** Career timeline from M&A → MarTech → GTM founder is a distinctive arc — few consultants have this breadth
**Proof surfaces:** 6 performance benchmarks; named employer history; specific role progression
**Readiness:** `NEEDS WORK` — experience year inconsistency (12 vs. 20+ years); no testimonial quotes; contact redirect lands here without clear contact mechanism

---

### EXPERTISE INDEX + PILLARS — `/expertise`

**What it communicates:** Structured capability framework — not a list of services, but an integrated GTM system
**Business outcome:** Helps prospects self-qualify and understand scope of engagement
**Differentiation:** 4-pillar structure with 22+ topic pages demonstrates depth that generalist agencies cannot match
**Proof surfaces:** Each pillar links to case studies; each topic has a proof block
**Readiness (Index):** `NEEDS WORK` — headline is generic; no orientation copy
**Readiness (Demand & Growth pillar):** `NEEDS WORK` — placeholder metrics undermine credibility
**Readiness (Other pillars):** `NEEDS WORK` — supporting metrics unverified
**Readiness (Topic pages):** `NEEDS WORK` — proof blocks require audit before client presentation

---

### INDUSTRIES — `/industries` + `/industries/{slug}`

**What it communicates:** GTM expertise is not generic — it is calibrated to specific market dynamics, buying behavior, and competitive contexts
**Business outcome:** Prospect qualification; buyers in featured verticals self-identify and proceed deeper into the funnel
**Differentiation:** 13 industry playbooks with named client proof is a rare asset for a solo practice
**Proof surfaces:** Named clients (PRGX, Red Hat, Salesforce) with specific metrics per vertical
**Readiness (Index):** `NEEDS WORK` — index copy needs expansion; no explanation of why industry specialization matters
**Readiness (Individual pages):** `READY` for verticals with named proof (B2B SaaS, Manufacturing, Financial Services); `NEEDS WORK` for verticals where proof metrics are unverified

---

### CASE STUDIES — `/case-studies` + `/case-studies/{slug}`

**What it communicates:** The most important section of the site — documented, specific, measurable proof of GTM program delivery
**Business outcome:** Highest-intent conversion driver; the section that closes the gap between interest and engagement
**Differentiation:** 35+ studies with named clients and specific metrics is exceptional for a solo practice — most competitors show 3-5 anonymized studies
**Proof surfaces:** Aggregate stats ($250M+ influenced, 4.2x ROI); individual studies with 87%, 180%, 200% results
**Readiness (Index):** `READY` — strong positioning, compelling proof band, functional filters
**Readiness (Individual pages):** `READY` for PRGX and other well-documented studies; `NEEDS WORK` for studies where metrics are thin or inconsistent with index claims

---

### BLOG — `/blog`

**What it communicates:** Ongoing thought leadership and practitioner perspective — signals active engagement with the GTM landscape
**Business outcome:** Organic traffic acquisition; trust-building for buyers in early research phase
**Differentiation:** "Field notes" framing positions the blog as practitioner intelligence, not marketing content
**Readiness:** `NEEDS WORK` — post volume and recency unverified; internal linking strategy unconfirmed; SEO optimization unverified

---

### GALLERY — `/gallery`

**What it communicates:** Technical execution capability — specifically, the ability to build custom data visualization and animation assets for B2B marketing use cases
**Business outcome:** Differentiator for prospects who value polished presentation; possible service extension (custom animation work)
**Differentiation:** 50+ marketing dashboard animations is a unique portfolio asset — very few GTM consultants have this
**Readiness:** `PLACEHOLDER` — visual ID missing, copy thin, no connection to case studies where this work appears

---

### RESUME — `/resume`

**What it communicates:** Formal credential validation for procurement or senior decision-makers who need structured documentation
**Business outcome:** Removes friction for enterprise buyers with formal vendor evaluation processes
**Proof surfaces:** Career timeline; named employers; 20+ years experience claim
**Readiness:** `NEEDS WORK` — PDF currency unverified; experience year inconsistency with About page

---

### PROJECTS — `/projects`

**What it communicates:** Outcome-first framing of flagship engagements — similar to case studies but positioned as "blueprints"
**Business outcome:** Reinforces scale and impact for enterprise-tier prospects
**Proof surfaces:** $500M+ pipeline, 47% revenue lift, 2.8x velocity
**Readiness:** `PLACEHOLDER` — visual ID missing; significant overlap with case studies section creates navigational confusion

---

### CONTACT — `/contact`

**What it communicates:** How to start an engagement conversation
**Business outcome:** The terminal conversion point — all funnel paths lead here
**Readiness:** `PLACEHOLDER` — the contact route currently redirects; no verified contact mechanism (form, calendar, or email); this is the most critical fix for business impact

---

## C.3 Overall Site Readiness Assessment

| Section | Status | Priority to Fix |
|---|---|---|
| Home | NEEDS WORK | High |
| About | NEEDS WORK | High |
| Expertise Index | NEEDS WORK | Medium |
| Demand & Growth pillar | NEEDS WORK | High |
| Other expertise pillars | NEEDS WORK | Medium |
| Expertise topic pages | NEEDS WORK | Medium |
| Industries Index | NEEDS WORK | Medium |
| Industry pages (with proof) | READY | — |
| Case Studies Index | READY | — |
| Case Study pages (documented) | READY | — |
| Blog | NEEDS WORK | Medium |
| Gallery | PLACEHOLDER | Low |
| Resume | NEEDS WORK | Medium |
| Projects | PLACEHOLDER | Low |
| Contact | PLACEHOLDER | Critical |

**Estimated % pages client-ready:** ~35% (primarily case studies and industry pages with named proof)

---

# Section D — Prospective Client / Buyer

> This section is written in plain language for someone who found GTMStack.pro and wants to understand what they're looking at, whether it's right for them, and what to do next. No jargon.

---

## D.1 What is GTMStack.pro?

GTMStack.pro is the website of a senior marketing and growth consultant who specializes in helping B2B companies build better sales and marketing systems. The person behind this site has spent over 20 years doing this work at real companies — not just advising from the sidelines, but actually building the programs, running the campaigns, and measuring the results.

This is not a big agency. This is one experienced operator who has worked with companies like Salesforce, Red Hat, and PRGX, and documented what worked.

---

## D.2 Page-by-Page Buyer Guide

---

### HOME — `/`

**What this page is about:** The front door of the site. It gives you a quick summary of who this person is, what they do, and why their work is different.

**Who it's for:** Anyone who lands here for the first time.

**What problem or question it answers:** "Is this person worth my time?" and "Do they do the kind of work I need?"

**What you can do here:**
- Get a quick sense of the four areas of expertise (demand, content, strategy, and systems)
- See a headline result (87% year-over-year pipeline growth) as a quick proof point
- Choose your next step: browse case studies or explore expertise

**What happens when you click the CTA:**
- "Browse case studies" → Takes you to a full list of past projects with real results
- "Explore expertise" → Takes you to a breakdown of specific skills and capabilities

**Buyer confidence level:** `MEDIUM` — Strong headline and proof stat, but the page needs a testimonial quote and updated blog section to feel fully current.

---

### ABOUT — `/about`

**What this page is about:** The background and track record of the person running GTMStack.pro. Think of it as a professional bio with real numbers attached.

**Who it's for:** Anyone who wants to know more about the person before reaching out.

**What problem or question it answers:** "Who is this person and have they actually done this work before?"

**What you can do here:**
- Read a career timeline that shows how their skills developed over time
- See six specific performance benchmarks from past roles
- Understand what systems and tools they've worked with

**What happens when you click the CTA:**
- "View Case Studies" → Takes you to detailed examples of past work
- "Explore Expertise" → Takes you to a breakdown of specific skills

**Buyer confidence level:** `MEDIUM` — The career story is compelling, but a quote from a past client or manager would make this page much stronger. Also, the "contact" link on this site routes here — so if you want to reach out, this is where you need to look.

---

### EXPERTISE PAGES — `/expertise` and sub-pages

**What these pages are about:** A detailed breakdown of what this consultant knows how to do, organized into four main areas: growing demand, creating content that converts, building strategy from data, and running the systems that make it all work.

**Who it's for:** People who have a specific problem and want to know if this person can solve it.

**What problem or question it answers:** "Does this person have the specific skill set I need?"

**What you can do here:**
- Browse 22+ individual skill pages, each with a description of what the skill involves, the challenges it solves, and proof from a real client engagement
- Navigate by the four main pillars if you're not sure which specific skill you need

**What happens when you click the CTA:**
- Most pages link to related case studies or back to the case studies index

**Buyer confidence level:** `MEDIUM` — The structure is strong and the topic depth is impressive. Some pages have very specific proof numbers; others have more general descriptions. Look for the pages that reference specific clients for the strongest confidence signals.

---

### INDUSTRIES PAGES — `/industries` and sub-pages

**What these pages are about:** The same expertise, but explained in terms of your specific industry. If you're in manufacturing, healthcare, financial services, or one of 10 other sectors, there's a page that describes the specific marketing and growth challenges in your world — and what was done to solve them.

**Who it's for:** Buyers who think about their needs in terms of their industry first.

**What problem or question it answers:** "Has this person actually worked in my industry? Do they understand our world?"

**What you can do here:**
- Find your industry and read about the specific GTM challenges that are common in that sector
- See real results from named clients in that space
- Understand the recommended approach (playbook) for your industry

**Buyer confidence level:** `HIGH` — The industry pages with named proof points (B2B SaaS, Financial Services, Manufacturing) are among the strongest pages on the site. Seeing a client name and a real percentage gives buyers real confidence.

---

### CASE STUDIES — `/case-studies` and individual pages

**What these pages are about:** Detailed write-ups of real past projects. Each one describes what the problem was, what was done to fix it, and what the results were — in plain numbers.

**Who it's for:** Anyone who needs to see real proof before making a decision. This is the most important section if you're seriously considering working with this person.

**What problem or question it answers:** "Has this person solved a problem like mine before? What actually happened?"

**What you can do here:**
- Filter case studies by your industry or the type of work you need
- Read detailed write-ups showing the before/after of real engagements
- See results like "87% year-over-year pipeline growth" attached to real company names

**What happens when you click the CTA:**
- Individual case study links take you to the full project write-up
- "Explore expertise" takes you to related skill pages

**Buyer confidence level:** `HIGH` — This is the strongest section of the site. Specific numbers, named clients, and a consistent format make these pages very credible.

---

### BLOG — `/blog`

**What this page is about:** Articles and thinking pieces on B2B marketing and sales topics.

**Who it's for:** People who are still researching and want to understand how this person thinks before reaching out.

**What problem or question it answers:** "Is this person smart about the topics I care about?"

**What you can do here:**
- Search and filter posts by topic
- Read practitioner-level articles on demand generation, marketing operations, ABM, and more

**Buyer confidence level:** `MEDIUM` — Depends heavily on post volume and recency. A blog with recent, specific posts signals active expertise. A blog with old or infrequent posts can signal the opposite.

---

### GALLERY — `/gallery`

**What this page is about:** A showcase of animated marketing dashboards and data visualizations — think moving charts, live metrics displays, and visual tools built for marketing use cases.

**Who it's for:** People who are curious about the visual and technical side of the work, or who might need custom animation work.

**What you can do here:**
- Browse 50+ animation examples
- Request a custom animation

**Buyer confidence level:** `LOW` — The gallery concept is interesting and distinctive, but the page currently feels incomplete. More context about how these animations are used in real client work would make this page much more compelling.

---

### RESUME — `/resume`

**What this page is about:** A formal summary of career history and credentials.

**Who it's for:** Procurement teams, enterprise buyers, or anyone who needs a structured credential document before starting a vendor process.

**What you can do here:**
- Read the career arc from M&A analyst to GTM consultant and founder
- Download a PDF version of the resume

**Buyer confidence level:** `MEDIUM` — Solid content, but the PDF download needs to be verified as current. The career experience numbers should match what's stated on the About page.

---

### PROJECTS — `/projects`

**What this page is about:** A curated view of major client programs, framed as outcome-driven "blueprints."

**Who it's for:** Enterprise-level prospects interested in large-scale transformations.

**What you can do here:**
- See four flagship engagements with headline metrics
- Request a similar program

**Buyer confidence level:** `LOW` — The content is strong, but the page is visually incomplete (missing hero image). Also overlaps significantly with the case studies section, which can be confusing.

---

### CONTACT — `/contact`

**What this page is about:** How to start a conversation.

**Who it's for:** Anyone who is ready to reach out.

**What you can do here:** [UNKNOWN - VERIFY] The contact page currently redirects to the About page rather than showing its own content. This means there is no clear, dedicated "reach out" experience on the site right now.

**Buyer confidence level:** `LOW` — A broken or missing contact experience is a significant barrier for buyers who have decided they want to engage. This is the top priority fix for improving buyer experience.

---

# Site-Wide Summary

## Total Pages Documented

| Category | Count |
|---|---|
| Top-level pages | 9 |
| Expertise pillar pages | 4 |
| Expertise topic pages | 22+ |
| Industry pages | 13 |
| Case study pages | 35+ |
| Blog posts | Dynamic (WordPress) |
| **Total static/semi-static pages** | **83+** |

## Navigation Structure Overview

```
GTMStack.pro
├── Home (/)
├── About (/about) ← Contact redirects here
├── Expertise (/expertise)
│   ├── Demand & Growth (/expertise/demand-growth)
│   ├── Content & Engagement (/expertise/content-engagement)
│   ├── Strategy & Insights (/expertise/strategy-insights)
│   ├── Systems & Operations (/expertise/systems-operations)
│   └── [22+ topic pages] (/expertise/{slug})
├── Industries (/industries)
│   └── [13 industry pages] (/industries/{slug})
├── Case Studies (/case-studies)
│   └── [35+ case study pages] (/case-studies/{slug})
├── Blog (/blog)
│   └── [Posts via WordPress] (/blog/{slug})
├── Gallery (/gallery)
├── Resume (/resume)
├── Projects (/projects)
└── Contact (/contact) → redirects to /about#resume
```

## Content Completeness Score

- **Pages assessed:** 83+
- **Pages marked READY:** ~30 (primarily case studies with named proof, B2B SaaS and Manufacturing industry pages)
- **Pages marked NEEDS WORK:** ~45 (home, about, expertise pillars, most expertise topics, most industry pages, blog, resume)
- **Pages marked PLACEHOLDER:** ~8 (gallery, projects, contact, several industry pages with unverified proof)
- **Estimated completeness:** ~36% client-ready

## Top 3 Content Gaps

1. **Contact experience is broken** — The `/contact` route redirects to `/about#resume` with no verified contact mechanism (form, calendar, or direct email). Every funnel path terminates at a broken conversion point. This is the highest-impact gap on the site.

2. **Placeholder metrics undermine credibility** — The Demand & Growth pillar (20%/15%/10% metrics) and potentially several expertise topic proof blocks contain generic or unverified numbers. On a site whose core differentiator is *real, measurable results*, generic metrics actively damage trust.

3. **Experience year inconsistency** — "12+ years" appears in the About section while "20+ years" appears in Home, Resume, and Projects. This discrepancy will cause any diligent buyer to question the accuracy of the site's other claims.

## Top 3 Strengths of Current Content

1. **Case studies section is genuinely exceptional** — 35+ documented programs with named clients, specific metrics, and a consistent Challenge → Solution → Results structure is rare and highly credible. This section alone differentiates GTMStack.pro from the vast majority of consulting sites.

2. **Industry specialization depth** — 13 industry verticals with specific GTM realities and named proof points signal that this is not generic consulting. The B2B SaaS and Financial Services pages in particular are strong.

3. **4-pillar framework provides structural clarity** — The Demand / Content / Strategy / Systems taxonomy gives the site a coherent intellectual architecture. It helps buyers self-navigate and signals that the practitioner thinks systemically about GTM — a strong differentiator from tacticians.

---

# Glossary of Site-Specific Terms

> For readers who are not B2B marketing professionals, the following terms appear frequently across the site.

**ABM (Account-Based Marketing):** A B2B strategy where sales and marketing focus their efforts on a specific list of target accounts rather than a broad market. Instead of casting a wide net, you identify the exact companies you want as customers and build programs specifically for them.

**Attribution:** The process of figuring out which marketing activities (ads, emails, events, etc.) actually led to a sale. Attribution models assign credit to different touchpoints in the buyer's journey.

**CAC (Customer Acquisition Cost):** How much it costs, on average, to win one new customer. Lower CAC means more efficient growth.

**Demand Generation (Demand Gen):** Marketing programs designed to create awareness and interest in a product or service — generating "demand" before a sales conversation happens.

**GTM (Go-to-Market):** The plan and process for bringing a product or service to customers. A GTM strategy covers who you're selling to, how you'll reach them, what you'll say, and how sales and marketing will work together.

**ICP (Ideal Customer Profile):** A description of the type of company that is the best possible customer — most likely to buy, most likely to succeed, and most likely to stay. Used to focus targeting in ABM and demand gen programs.

**Lifecycle Marketing:** Marketing programs that communicate differently with customers depending on where they are in their relationship with the company — prospect, new customer, long-term customer, at-risk customer, etc.

**MAP (Marketing Automation Platform):** Software like HubSpot, Marketo, or Pardot that automates repetitive marketing tasks — sending emails, scoring leads, routing prospects to sales, etc.

**MQL (Marketing Qualified Lead):** A prospect who has shown enough interest in your product that marketing believes they're worth passing to sales. The definition of "enough interest" varies by company.

**Pillar (content pillar or expertise pillar):** A broad topic area that organizes related, more specific content underneath it. On this site, the four pillars (Demand & Growth, Content & Engagement, Strategy & Insights, Systems & Operations) organize 22+ individual expertise topics.

**PLG (Product-Led Growth):** A go-to-market strategy where the product itself is the primary driver of customer acquisition — users sign up, try the product, and convert to paid without needing a sales conversation first (common in SaaS).

**RevOps (Revenue Operations):** The alignment of marketing, sales, and customer success operations around shared data, processes, and goals — with the aim of improving revenue efficiency and predictability.

**ROAS (Return on Ad Spend):** A metric that measures how much revenue you earn for every dollar spent on advertising. 12.4x ROAS means $12.40 in revenue for every $1 spent on ads.

**Sales Enablement:** The process of giving sales teams the content, tools, training, and information they need to effectively engage buyers and close deals.

**Slug:** In web development, a slug is the URL-friendly version of a name — for example, the slug for "Account-Based Marketing" would be `account-based-marketing`. Used throughout this project to identify pages.

**SQL (Sales Qualified Lead):** A prospect that the sales team has evaluated and agreed is worth actively pursuing. An MQL becomes an SQL when sales verifies it meets their criteria.

**Visual ID:** An internal identifier used in this project's codebase to associate a page with a specific animation or visual component. Pages with empty Visual IDs will be missing their hero animation.

**YoY (Year-over-Year):** A comparison of a metric from one year to the same period in the previous year. "87% YoY pipeline growth" means the pipeline was 87% larger than it was 12 months prior.

---

# Recommended Next Steps

Ranked by business impact — highest impact first.

---

### Priority 1 — Critical: Fix the Contact Experience

**Issue:** `/contact` redirects to `/about#resume` with no verified contact mechanism.
**Impact:** Every buyer who reaches a decision point hits a broken experience. This is costing real conversations.
**Action:** Either (a) implement `/contact` as a standalone page with a form, calendar embed (Calendly), or email link, and wire all CTAs to it, or (b) add a clear, visible contact mechanism to `/about` and remove all "contact" CTAs that don't lead to a working action.
**Effort:** Medium — content exists in `content/contact.ts`, needs template and route implementation.

---

### Priority 2 — Critical: Resolve Experience Year Inconsistency

**Issue:** "12+ years" on About page vs. "20+ years" on Home, Resume, and Projects.
**Impact:** Any buyer who notices this discrepancy will question the accuracy of other claims on the site.
**Action:** Decide the correct number, update all references across `content/about.ts`, `content/home.ts`, `content/resume.ts`, and `content/projects/main.ts` to be consistent.
**Effort:** Low — copy change only.

---

### Priority 3 — High: Replace Placeholder Metrics in Demand & Growth

**Issue:** Demand & Growth pillar shows generic metrics (20%/15%/10%). These are almost certainly placeholder.
**Impact:** The expertise pillar pages are high-consideration assets. Generic numbers undermine the site's core "real, measurable results" positioning.
**Action:** Pull real metrics from PRGX, Red Hat, AMCS, or Salesforce case studies that align to demand and growth outcomes. Update `content/expertise/demand-growth.ts`.
**Effort:** Low — requires finding the right metrics from existing case study data, then a content file update.

---

### Priority 4 — High: Audit All Expertise Topic Proof Blocks

**Issue:** 22+ expertise topic pages may contain boilerplate proof blocks not aligned to real case study data.
**Impact:** Proof blocks are the most credibility-critical element on these pages. Generic proof blocks are worse than no proof blocks.
**Action:** Cross-reference each `content/expertise/{slug}.ts` proof block against the corresponding case study. Update any that don't match a real documented outcome.
**Effort:** High — requires systematic review of all 22+ files.

---

### Priority 5 — High: Update Home Meta Title and Key SEO Fields

**Issue:** Meta title is "Home" — no keyword value.
**Impact:** Missed organic search opportunity for brand and category terms.
**Action:** Update meta title to something like "GTMStack.pro | B2B GTM Systems & Revenue Operations" or similar. Audit meta descriptions across all primary pages.
**Effort:** Low — metadata update only.

---

### Priority 6 — Medium: Add Hero Visual IDs for Gallery and Projects

**Issue:** `/gallery` and `/projects` have empty Visual IDs — hero sections will not render correctly.
**Impact:** Visual incompleteness undermines first impressions on these pages.
**Action:** Assign appropriate visual IDs from the registered animation library. Confirm the animation components exist and are registered.
**Effort:** Low-Medium — requires selecting appropriate visual IDs and updating content files.

---

### Priority 7 — Medium: Add Testimonial Quotes to About and Case Study Pages

**Issue:** No client quotes appear anywhere in the inventory.
**Impact:** Named quotes from real clients are among the highest-trust signals available. Their absence is a notable gap given the site's emphasis on real-world results.
**Action:** Add one quote each to the About page and the 3-5 most prominent case study pages. Even a LinkedIn recommendation excerpt would suffice.
**Effort:** Low (implementation) — content sourcing may require client outreach.

---

### Priority 8 — Medium: Verify and Strengthen Blog Internal Linking

**Issue:** Unknown whether blog posts include CTAs or internal links to expertise and case study pages.
**Impact:** Blog is the primary organic traffic entry point. Without internal links, organic visitors won't convert to deeper funnel pages.
**Action:** Audit the 10 most recent blog posts for internal links to expertise topics and case studies. Add CTAs where missing.
**Effort:** Medium — requires WordPress admin access and post editing.

---

### Priority 9 — Low: Clarify Projects vs. Case Studies Distinction

**Issue:** `/projects` and `/case-studies` cover overlapping content with different framing. Navigation purpose is unclear.
**Impact:** Creates cognitive load for buyers navigating the site — they may not know which section to use.
**Action:** Either (a) differentiate clearly (e.g., Projects = flagship transformations, Case Studies = all documented work), or (b) consolidate the two sections and redirect `/projects` to `/case-studies`.
**Effort:** Medium — may require content reorganization and redirect implementation.

---

### Priority 10 — Low: Expand Gallery Page Copy and Connect to Case Studies

**Issue:** Gallery copy is thin and the page is visually incomplete.
**Impact:** A unique capability (50+ marketing animations) is being under-sold.
**Action:** Add context explaining why these animations exist and how they're used in real GTM programs. Add 2-3 links to case studies where animations played a role.
**Effort:** Low — copy addition and cross-link implementation.

---

*End of SITE-DOCUMENTATION.md*
*Document version: 1.0 | Last updated: 2026-04-05*
