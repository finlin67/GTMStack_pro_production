# Phase 4: Navigation & Cross-Link Audit Report

> Audit scope: Expertise × Industries × Case Studies cross-link topology.
> Renderer logic traced from `app/expertise/[slug]/page.tsx`, `app/industries/[slug]/page.tsx`, `lib/renderCaseStudyStitch.tsx`, `lib/renderCaseStudy.tsx`.
> Data sources: `content/expertise.ts`, `content/industries.ts`, `content/case-studies.ts`.

---

## Part 1 — Sample Page Cross-Link Inventory

### Expertise Pages (3 sampled)

#### `/expertise/account-based-marketing`
| Link type | What renders | How computed |
|-----------|-------------|--------------|
| Related Expertise | Up to 4 same-pillar topics (`strategy-insights`) | `getExpertiseByPillar(item.pillar).filter(e => e.slug !== item.slug).slice(0,4)` |
| Related Case Studies | ✅ 3+ studies (`abm-system-launch-prgx`, `amcs-verticalized-abm-launch`, `end-to-end-abm-framework-amcs`) | `getCaseStudiesByExpertise(slug).slice(0,3)` |
| Related Industries | ✅ 3 industries (`financial-services`, `manufacturing`, `energy-utilities`, `supply-chain-logistics`) | `industryItems.filter(i => i.featuredExpertise?.includes(slug)).slice(0,3)` |

**Gap:** `relevant_case_study_slugs` and `relevant_expertise_slugs` are populated in the data (3 case studies, 5 expertise slugs) but **never consumed by the renderer**. These curator-chosen cross-links are silently ignored.

---

#### `/expertise/attribution-and-measurement`
| Link type | What renders | How computed |
|-----------|-------------|--------------|
| Related Expertise | **⚠️ 0 results** — entry has **no `pillar` field** in `expertiseItems` | `getExpertiseByPillar(item.pillar)` returns `[]` because `item.pillar` is `undefined` |
| Related Case Studies | ⚠️ **1 result only**: `event-to-store-lift-retail` (retail-ecommerce industry) | That case study includes `'attribution-and-measurement'` in its `expertise[]` — the only one that does |
| Related Industries | **⚠️ 0 results** | No `industryItems` entry has `attribution-and-measurement` in `featuredExpertise` |

**This page is nearly a dead-end.** One unrelated case study (retail events) surfaces via dynamic lookup, but the curated `relevant_case_study_slugs: ['revenue-analytics-dashboard-salesforce']` entry — a much more relevant match — is still ignored because the renderer never reads it. A visitor arriving from organic search or a case study tag sees no outbound links to related content. The `relevant_case_study_slugs` field in the data has `"revenue-analytics-dashboard-salesforce"` — the right link exists in the data but is never rendered.

---

#### `/expertise/demand-generation`
| Link type | What renders | How computed |
|-----------|-------------|--------------|
| Related Expertise | Up to 4 same-pillar topics (`demand-growth`) | same |
| Related Case Studies | ✅ 2+ studies (`abm-system-launch-prgx`, `salesforce-demandgen-analytics-platform`) | same |
| Related Industries | ✅ 2 industries (`b2b-saas`, `fintech`) | both have `demand-generation` in `featuredExpertise` |

No critical gaps. **Minor gap:** no link to parent pillar page `/expertise/demand-growth` from within the detail page itself.

---

### Industry Pages (2 sampled)

#### `/industries/b2b-saas`
| Link type | What renders | Source |
|-----------|-------------|--------|
| Featured Expertise | **🚨 Nothing renders** — static override hard-codes `featuredExpertise={[]}` | `app/industries/b2b-saas/page.tsx` passes `featuredExpertise={[]}` directly, bypassing `industry.featuredExpertise` entirely |
| Featured Case Studies | ✅ 3 studies: `prgx-unified-revenue-operating-model`, `redhat-global-abm-activation`, `salesforce-demandgen-analytics-platform` | `industry.featuredCaseStudies` — all slugs valid |
| See-also Expertise Pillars | 4 hard-coded pillar links in `PILLAR_COPY` inside `IndustrySingleStitchLayout` | Static — always present |

**Gaps:**
- **P0 bug**: `app/industries/b2b-saas/page.tsx` (and all 5 other static industry overrides: `financial-services`, `fleet-management-logistics`, `manufacturing`, `pubsec-government`, `retail`) hardcode `featuredExpertise={[]}`. This means **no expertise cross-links render on any of these six pages** even though the content data is fully populated. The dynamic `[slug]/page.tsx` route correctly resolves `featuredExpertise` — the static overrides override it away.
- `featuredExpertise` data uses `account-based-marketing-abm` (brief card slug) rather than `account-based-marketing` (canonical full-detail slug) — if the override were fixed, users would land on a stub page, not the rich detail page.
- No "Back to All Industries" index link on the detail page.
- The hard-coded `PILLAR_COPY` block links to the 4 pillar pages but is not keyed to this specific industry's GTM motion — every industry page shows the same 4 pillar links regardless of content relevance.

---

#### `/industries/developer-tools` *(added sample)*
| Link type | What renders | Source |
|-----------|-------------|--------|
| Featured Expertise | ✅ 5 topics: `content-marketing`, `search-engine-optimization`, `growth-marketing`, `marketing-automation`, `lifecycle-marketing` — all slugs valid | `industry.featuredExpertise` via dynamic route |
| Featured Case Studies | ❌ **Empty** — `featuredCaseStudies: []` | No case studies exist with `industry: 'developer-tools'` — zero registry entries use that industry slug |

**This page is a partial dead-end.** Expertise cross-links exist, but there is no proof layer. Visitors see capabilities but no demonstrated work.

---

#### `/industries/ai-ml`
| Link type | What renders | Source |
|-----------|-------------|--------|
| Featured Expertise | ✅ 5 topics: `ai-in-marketing`, `marketing-automation`, `content-marketing`, `account-based-marketing-abm`, `product-marketing` | all valid |
| Featured Case Studies | ⚠️ **1 study**: `marketing-flight-planner-ai-tool` | Only 1 case study exists with `industry: 'ai-ml'` |

**Gap:** With only 1 case study, the industry page feels thin on proof. More critically, a visitor who clicks through to `marketing-flight-planner-ai-tool` will see **0 related case studies** in the "same industry" sidebar because there are no siblings — a cul-de-sac within the portfolio.

---

### Case Study Pages (2 sampled)

#### `/case-studies/end-to-end-abm-framework-amcs`
| Link type | What renders | Source |
|-----------|-------------|--------|
| Related Expertise (up to 3) | ✅ e.g., `account-based-marketing`, `marketing-operations`, `revenue-operations` | case study's `expertise[]` filtered to 3 |
| Related Case Studies (up to 2) | ✅ 2 peers in `b2b-saas` industry (many siblings available) | `caseStudyItems.filter(c => c.industry === caseStudy.industry && c.slug !== caseStudy.slug).slice(0,2)` |
| Industry page link | **⚠️ MISSING** | `industry` field exists but no rendered link to `/industries/b2b-saas` |

**Gap:** Case study pages know their industry (`industry: 'b2b-saas'`) but **never link to the industry page**. The `industry` object is resolved in the renderer but only used to find sibling case studies, not to render a "More in B2B SaaS →" link.

---

#### `/case-studies/marketing-flight-planner-ai-tool`
| Link type | What renders | Source |
|-----------|-------------|--------|
| Related Expertise (up to 3) | ✅ 3 expertise topics | case study's `expertise[]` |
| Related Case Studies | **⚠️ 0 results** | Only case study with `industry: 'ai-ml'` — no same-industry siblings |
| Industry page link | **⚠️ MISSING** | Same issue as above |

**This page is a dead-end.** No sibling case studies can be found by the same-industry filter. The `career-world-4d-interactive-resume` case study shares multiple expertise slugs with this entry (`ai-in-marketing`, `content-strategy-systems`, `digital-marketing`) and would be a natural "You might also like" but the current "same-industry only" fallback misses it.

---

## Part 2 — Mega Menu Audit

### Desktop MegaMenu (`components/layout/MegaMenu.tsx`)
✅ **Microcopy present** — subtitle text explains the pillar model: *"This is how the GTM model is organized—pillars you can read as a map, with topics underneath each. Not a list of services."*
✅ **Pillar descriptions** rendered per pillar card (`pillar.description`)
✅ **"See also" cross-section block** — hard-coded links to `/case-studies`, `/industries`, `/blog`
✅ **"Browse full Expertise index"** footer link

**Gaps:**
- "See also" links are **generic section links** only (e.g., "Case Studies") — no curated context (e.g., "Case Studies — ABM & Pipeline Growth"). A visitor browsing ABM expertise has no curated shortcut to the ABM case studies.
- No featured case study or industry spotlight within the Expertise mega-panel.

---

### Desktop CaseStudiesNavPanel (`components/layout/CaseStudiesNavPanel.tsx`)
✅ **3 featured case study cards** — client, title, description, first metric
✅ **"See also" footer** — links to `/expertise`, `/industries`, `/blog`
✅ **"View all case studies"** footer link

**Gaps:**
- Cards have no industry or expertise tag shown — a visitor can't tell which vertical the featured study lives in.
- No filter entry-points (e.g., "Filter by Industry" or "Filter by Expertise") for visitors who have a specific context in mind.

---

### Mobile Menu (`components/ui/MobileMegaMenu.tsx`)
✅ **Pillar accordions** with topic links and optional pillar description
✅ **Quick-link bar** — Case Studies, Gallery, Industries, About, Contact
✅ **Industries section** — flat alphabetical list with "All Industries" link

**Gaps vs desktop:**

| Feature | Desktop | Mobile |
|---------|---------|--------|
| "See also" cross-section links | ✅ Present (in MegaMenu + CaseStudiesPanel) | ❌ Missing |
| Featured case studies panel | ✅ 3 cards with metrics | ❌ Only a bare "Case Studies" quick-link |
| Industry descriptions/microcopy | ❌ None | ❌ None |
| Expertise → Case Study teaser | ❌ None | ❌ None |

The mobile menu is **navigation-only** — no editorial framing, no cross-section discovery. A mobile visitor who browses under "Expertise" has no path to a relevant case study or industry page without backing out and navigating manually.

---

## Part 3 — Dead-End Page Inventory

### Dead-End Expertise Pages (0 case studies + 0 industries)

These expertise topic slugs are **never referenced** by any case study's `expertise[]` array, so `getCaseStudiesByExpertise()` returns empty. They are also **not listed** in any industry's `featuredExpertise`, so the Related Industries block is also empty.

| Slug | Related CS | Related Ind | Data field populated? |
|------|-----------|-------------|----------------------|
| `attribution-and-measurement` | 0 | 0 | ✅ `relevant_case_study_slugs: ['revenue-analytics-dashboard-salesforce']` (unused) |
| `channel-partner-marketing` | 0 | 0 | (no case study exists) |
| `competitive-intel` | 0 | 0 | (no case study exists) |
| `crm-management` | 0 | 0 | (no case study exists) |
| `customer-experience-cx` | 0 | 0 | (pubsec uses `customer-experience`, not `-cx` variant) |
| `lead-gen-scoring` | 0 | 0 | (no case study exists) |
| `roi-analysis` | 0 | 0 | (no case study exists) |
| `social-media` | 0 | 0 | (no case study exists) |
| `social-media-marketing` | 0 | 0 | (no case study exists) |
| `video-marketing` | 0 | 0 | (no case study exists) |
| `sales-enablement-old` | 0 | 0 | **Deprecated slug — should be removed from `expertiseItems`** |

### Dead-End Case Study Pages (0 related case studies)

| Slug | Industry | Why 0 siblings |
|------|----------|---------------|
| `marketing-flight-planner-ai-tool` | `ai-ml` | Only case study with this industry |
| `abm-system-launch-prgx` | `financial-services` | Only case study with this industry |
| `abm-journey-discrete-manufacturing-prgx` | `manufacturing` | Only case study with this industry |

### Industry Pages with Empty `featuredCaseStudies`

These pages have `featuredCaseStudies: []` so the case studies block will not render:

`fintech`, `healthcare`, `healthtech`, `developer-tools`, `retail`, `energy-utilities`, `cybersecurity`, `climate-tech`

These 8 industry pages have expertise links but no proof layer — they read as aspirational rather than demonstrated.

---

## Part 4 — Slug Registry Validity

All registry checks **PASS**. No broken cross-links were found from the Phase 3B normalization work:
- Industry slugs in case-studies → all present in `industries.ts` ✅
- Expertise slugs in case-studies → all present in `expertise.ts` ✅
- `featuredExpertise` slugs in industries → all present in `expertise.ts` ✅
- `featuredCaseStudies` slugs in industries → all present in `case-studies.ts` ✅

One **structural issue:** `sales-enablement-old` exists as an expertise item and is mapped in `SLUG_TO_PILLAR` — it generates a live `/expertise/sales-enablement-old` route with 0 cross-links. It should be removed from `expertiseItems` or redirected to `sales-enablement`.

---

## Part 4b — Exported-But-Never-Used Component

`components/ui/RelatedItems.tsx` exports **four** components:

| Component | Status |
|-----------|--------|
| `RelatedExpertise` | ✅ Used — in case study renderers |
| `RelatedCaseStudies` | ✅ Used — in case study renderers + `IndustryPageContent` |
| `RelatedIndustries` | ❌ **Never used anywhere** — exists in the file, never imported by any page or renderer |
| `QuickLinks` | Partial — utility only |

The `RelatedIndustries` component is complete and styled — it just needs to be wired into the case study and expertise page renderers.

---

## Part 5 — Unused Data Fields

The `ExpertiseItem` type has two fields that are populated in `content/expertise.ts` but **never consumed by any renderer or route**:

```ts
relevant_expertise_slugs: string[]   // populated on ~40+ entries
relevant_case_study_slugs: string[]  // populated on ~40+ entries
```

The route (`app/expertise/[slug]/page.tsx`) computes `relatedExpertise` from same-pillar logic and `relatedCaseStudies` from `getCaseStudiesByExpertise()` — neither reads `relevant_*` fields. This means curated cross-links written by the author are silently dropped.

**Fix options:**
1. **Use `relevant_case_study_slugs` as a fallback** when `getCaseStudiesByExpertise()` returns < 2 results (handles dead-end cases like `attribution-and-measurement`)
2. **Replace computed logic entirely** with `relevant_case_study_slugs` as the primary source (gives full editorial control)
3. **Hybrid:** show `relevant_case_study_slugs` as a secondary "Related reading" block below the computed one

---

## Part 6 — Cross-Link Missing on Case Study Pages

The most systemic gap: **case study pages never link to their Industry page**.

In `lib/renderCaseStudyStitch.tsx` and `lib/renderCaseStudy.tsx`:

```ts
const industry = industryItems.find((i) => i.slug === caseStudy.industry)
```

`industry` is resolved but only used to find sibling case studies. There is no rendered `<Link href={/industries/${industry.slug}}>` anywhere in either renderer.

Every case study page is one hop away from a rich industry context page that would help visitors understand the broader vertical — but that connection is never surfaced.

---

## Part 7 — Cross-Link Block Recommendation

### Pattern: `<RelatedContentBlock>` (shared component)

**Purpose:** Unified cross-link footer block for all three page types, replacing the current per-template ad-hoc related sections.

**Placement:** Bottom of main content, above footer CTA — after the primary content, before the contact/CTA strip.

**Contents (adaptive by page type):**

```
┌─────────────────────────────────────────────────────────────┐
│  RELATED  [Expertise | Case Studies | Industries]           │
│  (tab or section label, 1-3 of these depending on context)  │
├────────────┬───────────────┬───────────────┬────────────────┤
│ Card 1     │ Card 2        │ Card 3        │ (up to 3)      │
│ type badge │ type badge    │ type badge    │                │
│ title      │ title         │ title         │                │
│ description│ description   │ description   │                │
│ → link     │ → link        │ → link        │                │
└────────────┴───────────────┴───────────────┴────────────────┘
│  Industry context strip (case studies only):               │
│  "This work was done in [Industry] →  /industries/slug"    │
└─────────────────────────────────────────────────────────────┘
```

**Resolution logic per page type:**

| Page type | Expertise cards | Case Study cards | Industry cards |
|-----------|----------------|-----------------|----------------|
| Expertise detail | Same-pillar peers (max 3) | `relevant_case_study_slugs` first, fallback `getCaseStudiesByExpertise()`, max 2 | `industryItems.filter(featuredExpertise includes slug)`, max 2 |
| Industry detail | `featuredExpertise`, max 4 | `featuredCaseStudies`, max 3. If empty: query by `getCaseStudiesByIndustry()` | — |
| Case Study detail | `caseStudy.expertise` slugs, max 3 | Same-industry peers. If 0: same-expertise peers by overlap count, max 2 | **Always 1**: direct link to `industry` page |

### Code sketch

```tsx
// components/ui/RelatedContentBlock.tsx

import Link from 'next/link'
import { ExpertiseItem, CaseStudyItem, IndustryItem } from '@/lib/types'

interface RelatedContentBlockProps {
  expertiseItems?: ExpertiseItem[]
  caseStudyItems?: CaseStudyItem[]
  industryItems?: IndustryItem[]
  industryContext?: { slug: string; title: string } // case study pages only
  heading?: string
}

export function RelatedContentBlock({
  expertiseItems = [],
  caseStudyItems = [],
  industryItems = [],
  industryContext,
  heading = 'Related',
}: RelatedContentBlockProps) {
  const total = expertiseItems.length + caseStudyItems.length + industryItems.length
  if (total === 0 && !industryContext) return null

  return (
    <section aria-label="Related content" className="section-padding border-t border-white/10">
      <div className="container-width">
        {heading && (
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6">
            {heading}
          </h2>
        )}

        {(total > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {expertiseItems.map((item) => (
              <RelatedCard
                key={item.slug}
                type="Expertise"
                title={item.title}
                description={item.description ?? item.positioning}
                href={`/expertise/${item.slug}`}
              />
            ))}
            {caseStudyItems.map((item) => (
              <RelatedCard
                key={item.slug}
                type="Case Study"
                title={item.title}
                description={item.description}
                meta={item.client}
                href={`/case-studies/${item.slug}`}
              />
            ))}
            {industryItems.map((item) => (
              <RelatedCard
                key={item.slug}
                type="Industry"
                title={item.title}
                description={item.description}
                href={`/industries/${item.slug}`}
              />
            ))}
          </div>
        )}

        {industryContext && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <Link
              href={`/industries/${industryContext.slug}`}
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-300 transition-colors"
            >
              More work in{' '}
              <span className="text-white font-medium">{industryContext.title}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

function RelatedCard({
  type,
  title,
  description,
  meta,
  href,
}: {
  type: string
  title: string
  description?: string
  meta?: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="glass-card-surface group flex flex-col gap-2 p-5 rounded-xl hover:border-brand-400/40 transition-colors"
    >
      <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-400">
        {type}
      </span>
      <p className="text-sm font-semibold text-white group-hover:text-brand-200 transition-colors leading-snug">
        {title}
      </p>
      {meta && <p className="text-xs text-slate-400">{meta}</p>}
      {description && (
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{description}</p>
      )}
    </Link>
  )
}
```

### Where to wire it in

**Case study renderer** (`lib/renderCaseStudyStitch.tsx`):
```ts
// New fallback logic for relatedCaseStudies when same-industry returns 0
const sameindustrySiblings = caseStudyItems
  .filter((c) => c.slug !== caseStudy.slug && c.industry === caseStudy.industry)
  .slice(0, 2)

const sameExpertiseFallback = sameindustrySiblings.length === 0
  ? caseStudyItems
      .filter((c) => c.slug !== caseStudy.slug)
      .map((c) => ({
        item: c,
        overlap: c.expertise.filter((e) => caseStudy.expertise.includes(e)).length,
      }))
      .filter(({ overlap }) => overlap > 0)
      .sort((a, b) => b.overlap - a.overlap)
      .slice(0, 2)
      .map(({ item }) => item)
  : []

const relatedCaseStudies = sameindustrySiblings.length > 0
  ? sameindustrySiblings
  : sameExpertiseFallback

// Pass industry context for the "More in [Industry]" strip
<RelatedContentBlock
  expertiseItems={relatedExpertise}
  caseStudyItems={relatedCaseStudies}
  industryContext={industry ? { slug: industry.slug, title: industry.title } : undefined}
/>
```

**Expertise route** (`app/expertise/[slug]/page.tsx`):
```ts
// Use relevant_case_study_slugs as fallback when getCaseStudiesByExpertise returns < 2
const computedCS = getCaseStudiesByExpertise(slug).slice(0, 3)
const fallbackSlugs = (item.relevant_case_study_slugs ?? []).slice(0, 3)
const resolvedCS = computedCS.length >= 2
  ? computedCS
  : fallbackSlugs.map((s) => getCaseStudyBySlug(s)).filter(Boolean)
```

---

## Priority Fix List

### P0 — Blocks content discovery (fix before launch)
1. **Case study → Industry page link missing** on all 19 case study pages — add `industryContext` strip to `RelatedContentBlock` (or inline to existing renderers for quick fix)
2. **Dead-end case studies with 0 related siblings** (`marketing-flight-planner-ai-tool`, `abm-system-launch-prgx`, `abm-journey-discrete-manufacturing-prgx`) — add same-expertise fallback
3. **Static industry overrides hard-code `featuredExpertise={[]}`** — `b2b-saas`, `financial-services`, `fleet-management-logistics`, `manufacturing`, `pubsec-government`, `retail` all bypass content data. Either delete the static page files (simplest fix) or pass through the data from the dynamic route's data lookup.

### P1 — Significant content gaps (fix within sprint)
4. **`attribution-and-measurement` expertise page** has no pillar (relatedExpertise empty) and only 1 weakly-related case study — wire `relevant_case_study_slugs` as primary or fallback source
5. **10+ other dead-end expertise pages** — either wire the fallback or add case study content that references these topics
6. **8 industry pages with empty `featuredCaseStudies`** — either wire `getCaseStudiesByIndustry()` as fallback, or manually populate with transferable proof stories
7. **`RelatedIndustries` component exists but is never wired in** — adding it to case study and expertise renderers costs one line per template
8. **`sales-enablement-old` deprecated stub** — remove from `expertiseItems`, add redirect in `next.config.js`

### P2 — Navigation enhancement (next phase)
7. **Mobile menu has no "See also" cross-section links** — add a simple 3-link strip at the bottom of each pillar accordion
8. **Mobile menu has no featured case studies** — add a minimal "Featured work" section with 2 text links after the Industries block
9. **Unused `relevant_expertise_slugs` / `relevant_case_study_slugs`** — wire to rendering as fallback or primary source (gives author full editorial control)

### P3 — Polish (background improvement)
10. **Industry context strip on `CaseStudiesNavPanel` cards** — add small industry badge to each featured card in desktop nav
11. **Expertise → parent pillar link** — add breadcrumb or pillar badge with link on expertise detail pages
12. **Generic "See also" labels in MegaMenu** — consider curated context links (e.g., "ABM Case Studies" when hovering ABM pillar)

---

---

## Appendix — Nav / Mobile Consistency Corrections

From full component trace of `MobileMegaMenu.tsx`:

| Desktop feature | Desktop panels | Mobile |
|-----------------|---------------|--------|
| Blog entry point | Rich `BlogNavPanel` (description + feature bullets) | ❌ **Absent entirely** — no Blog link at any level in the mobile menu |
| "See also" cross-links | Present in all 4 flyout panels | ❌ Missing in all mobile accordion sections |
| Industries item count | `featured: true` only (subset) | All `industryItems` alphabetically (full list) — different discovery surface |
| Case Studies preview | 3 cards with metrics + client | Bare quick-link pill only |
| `aria-controls` on Industries button | Present on Expertise/CaseStudies/Blog triggers | ❌ Missing — Industries `<button>` has no `id` attribute, `aria-labelledby` references an id that doesn't exist |

"Case studies" capitalization: `BlogNavPanel` footer uses lowercase *s* (`"case studies"`); all other panels use title-case (`"Case Studies"`). Minor — fix in `BlogNavPanel.tsx`.

*Audit completed: Phase 4. All slug registries clean. New findings: static override bug (P0), `attribution-and-measurement` correction, developer-tools dead-end, `RelatedIndustries` orphan component, mobile Blog absence.*
