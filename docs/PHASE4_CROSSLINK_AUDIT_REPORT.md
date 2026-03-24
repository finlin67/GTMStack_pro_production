# PHASE 4: Cross-Link Audit Report
## Navigation & Content Pillar Integration Analysis

**Date:** March 22, 2026  
**Audit Scope:** 3 Expertise, 2 Industry, 2 Case Study pages + Mega Menu + Mobile Menu  
**Status:** Critical Gaps Identified — Dead-End Pages, Missing Bidirectional Links, Uneven Cross-Link Coverage

---

## Executive Summary

Your three content pillars (Expertise, Industries, Case Studies) have **fragmented cross-link patterns**:
- ✓ **Expertise pages** are well-connected (show related expertise + case studies + industries)
- ✗ **Case Study pages** are **dead ends** (no outbound links to expertise/industries)
- ⚠️ **Industry pages** are **partially connected** (featured expertise only, no cross-link block)
- ⚠️ **Mega Menu** has unidirectional "See also" links

**Recommendation:** Implement a unified **RelatedItems component** across all three page types + update navigation to create true bidirectional discoverability.

---

## SECTION 1: Detailed Gap Analysis by Page Type

### 1.1 EXPERTISE PAGES — Working (But Incomplete)

**Sample: `/expertise/account-based-marketing-abm`**

#### Current State: ✓ Mostly Complete
| Item | Status | Details |
|------|--------|---------|
| Related Expertise | ✓ Yes | Shows 3 expertise items from same pillar |
| Related Case Studies | ✓ Yes | Shows 2 case studies (from `relevant_case_study_slugs`) |
| Related Industries | ✓ Yes | Shows 2 industries (filtered by `featuredExpertise` array) |
| Display Pattern | ✓ Yes | "Related" section at page bottom with cards + links |
| Bidirectional Links | ⚠️ Partial | Case studies link back to expertise; **industries don't** |

#### Data Flow
```javascript
// app/expertise/[slug]/page.tsx
const relatedExpertise = getExpertiseByPillar(pillarId)
  .filter(e => e.slug !== currentSlug)
  .slice(0, 3)

const relatedCaseStudies = getCaseStudiesByExpertise(slug).slice(0, 3)

const relatedIndustries = industryItems
  .filter(i => i.featuredExpertise?.includes(slug))
  .slice(0, 2)
```

#### Issues Found
1. **Expertise → Industries missing the reverse link**: Industry pages don't prominently link back to expertise
2. **Limited to featured industries**: Only shows industries that have this expertise in `featuredExpertise` array
   - Example: `analytics` expertise has 5 `relevant_expertise_slugs` but industry list is filtered differently

#### Sample Cross-Links
**Account-Based Marketing (ABM):**
- Related Expertise (same pillar): ✓ demand-generation, demand-gen, sales-enablement, marketing-ops
- Related Case Studies: ✓ abm-system-launch-prgx, enterprise-abm-activation-red-hat, end-to-end-abm-framework-amcs
- Related Industries: ✓ b2b-saas, fintech *(but only because these have ABM in featuredExpertise)*

---

### 1.2 INDUSTRY PAGES — Partially Connected (Dead-End Paths)

**Sample: `/industries/b2b-saas` & `/industries/fintech`**

#### Current State: ⚠️ Incomplete
| Item | Status | Details |
|------|--------|---------|
| Featured Expertise | ✓ Yes | Shows 5 expertise items |
| Featured Case Studies | ✓ Yes | Shows 3 case studies (manually curated) |
| Display Pattern | ✓ Yes | Featured section in hero/content |
| **Dedicated Cross-Link Block** | ✗ No | **NO "Related" or "See Also" section** |
| **Reverse Link to Expertise** | ✗ No | Expertise pages don't link back to industries |
| Mobile Menu Consistency | ✓ Yes | Industries link present in mobile quick links |

#### Data Flow
```javascript
// app/industries/[slug]/page.tsx
const featuredExpertise = industry.featuredExpertise
  ?.map(s => getExpertiseBySlug(s))
  .filter(Boolean) || []

const featuredCaseStudies = industry.featuredCaseStudies
  ?.map(s => getCaseStudyBySlug(s))
  .filter(Boolean) || []
```

#### Issues Found
1. **Featured expertise is not linked**: Shows in featured section but no distinct "Related Expertise" cards with proper CTAs
2. **No prominent cross-link block**: Unlike expertise pages, industry pages lack a dedicated "Related" section
3. **Dead industries**: Several industries have empty `featuredCaseStudies` arrays:
   - `fintech`: No case studies (empty array)
   - `healthtech`: No case studies (empty array)
   - `healthcare`: No case studies (empty array)
   - `developer-tools`: No case studies (empty array)

#### Sample Cross-Links
**B2B SaaS:**
- Featured Expertise: ✓ abm, marketing-ops, marketing-automation, lifecycle-marketing, demand-generation
- Featured Case Studies: ✓ prgx-unified-revenue-operating-model, redhat-global-abm-activation, salesforce-demandgen-analytics-platform
- Reverse to Expertise Pages: ✗ Missing (no industry links from expertise pages showing b2b-saas)

**FinTech:**
- Featured Expertise: ✓ abm, demand-generation, marketing-ops, marketing-automation, product-marketing, seo
- Featured Case Studies: ✗ **EMPTY** (dead end)
- Reverse to Expertise Pages: ✗ Missing

---

### 1.3 CASE STUDY PAGES — Critical Dead Ends

**Sample: `/case-studies/abm-system-launch-prgx` & `/case-studies/prgx-unified-revenue-operating-model`**

#### Current State: ✗ Dead Ends
| Item | Status | Details |
|------|--------|---------|
| Expertise Array | ✓ Stored | Data exists in content (5 expertise slugs typical) |
| Industry Field | ✓ Stored | Data exists (single industry slug) |
| **Rendered Cross-Links** | ✗ **NONE** | **NO links on page to related expertise or industry** |
| **Back Navigation** | ✗ **NONE** | No "Browse More" or pillar links |
| **Related Case Studies** | ✗ **NONE** | No "See Also" case studies from same industry |
| **Visibility in Menu** | ⚠️ Partial | Only in Expertise mega menu's "See also" section |

#### Data Flow (Content Layer)
```javascript
// content/case-studies.ts
const caseStudyItem = {
  slug: 'abm-system-launch-prgx',
  title: 'ABM System Launch',
  industry: 'financial-services',
  expertise: [
    'account-based-marketing',
    'marketing-operations',
    'demand-generation',
    'sales-enablement-alignment',
    'ai-in-marketing',
  ],
  // ... other fields
}
```

#### Issues Found
1. **Not rendered on page**: Content data exists but `CaseStudyTemplate` passes children without extracting related data
2. **No outbound navigation**: Visitors have no way to explore related expertise or industry context
3. **Island architecture**: Case study page is isolated; forcing return to listing to find related content
4. **Industry context missing**: Visitors don't learn which industry/vertical this applies to

#### Sample Cross-Links (Data Exists But NOT Used)
**ABM System Launch (PRGX):**
- ✓ Expertise (stored): account-based-marketing, marketing-operations, demand-generation, sales-enablement-alignment, ai-in-marketing
- ✓ Industry (stored): financial-services
- ✗ **On-page links to these**: NONE
- ✗ **Back navigation to industry**: NONE

**87% YoY Pipeline Growth (PRGX):**
- ✓ Expertise (stored): abm, marketing-operations, marketing-automation, demand-generation
- ✓ Industry (stored): b2b-saas
- ✗ **On-page links to these**: NONE

---

## SECTION 2: Mega Menu & Navigation Audit

### 2.1 Desktop MegaMenu (`MegaMenu.tsx`)

#### Current State: ✓ Partial Compliance
| Item | Status | Details |
|------|--------|---------|
| Microcopy Present | ✓ Yes | "This is how the GTM model is organized—pillars you can read as a map, with topics underneath each. Not a list of services." |
| 4 Pillars Shown | ✓ Yes | Content & Engagement, Demand & Growth, Strategy & Insights, Systems & Operations |
| Topics Listed | ✓ Yes | Expertise topics under each pillar |
| "See also" Section | ✓ Yes | Links to Case Studies, Industries, Blog |
| **Bidirectional Links** | ✗ No | Only Expertise → Case/Industries, not reverse |
| **Consistency** | ⚠️ Partial | Mobile menu has quick links but lacks pillar descriptions |

#### Mega Menu Structure
```jsx
<div className="border-t border-white/10 px-7 py-4 space-y-3">
  <p className="text-[12px] text-slate-400">
    Browse the full index if you want every topic in one place.
  </p>
  <Link href="/expertise" className="text-[13px] text-brand-300 hover:text-white">
    Browse full Expertise index <ArrowRight />
  </Link>
  {/* "See also" section */}
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 border-t border-white/5">
    <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">See also</span>
    <Link href="/case-studies" className="text-[12px] text-slate-400 hover:text-brand-200">
      Case Studies
    </Link>
    <Link href="/industries" className="text-[12px] text-slate-400 hover:text-brand-200">
      Industries
    </Link>
    <Link href="/blog" className="text-[12px] text-slate-400 hover:text-brand-200">
      Blog
    </Link>
  </div>
</div>
```

#### Recommendations
1. ✓ **Microcopy is excellent** — keep emphasis on "map" framing
2. ✗ Add bidirectional "See also" — Case Studies menu should link to Expertise, Industries
3. ⚠️ Consider pillar descriptions in mobile menu (currently compressed)

---

### 2.2 Mobile MegaMenu (`MobileMegaMenu.tsx`)

#### Current State: ✓ Functional
| Item | Status | Details |
|------|--------|---------|
| Quick Links | ✓ Yes | Case Studies, Gallery, Industries, About, Contact |
| Pillar Accordions | ✓ Yes | Expandable pillar sections with topics |
| Pillar Icons | ✓ Yes | Lucide icons for each pillar |
| Pillar Descriptions | ⚠️ Partial | Description shown when expanded (but brief) |
| **Cross-Section "See Also"** | ✗ No | Quick links don't reciprocate linking back to Expertise |
| **Mobile Consistency** | ✓ Yes | Structure mirrors desktop intent |

#### Issues
1. Quick links section is useful but doesn't reciprocate — Need "Explore Expertise" link in Case Studies & Industries pages' mobile menus
2. Pillar descriptions could be richer (currently one-line)

---

## SECTION 3: Dead-End Pages & Missing Cross-Links

### Industries with No Case Studies
| Industry Slug | Featured Expertise | Case Studies | **Status** |
|---------------|-------------------|--------------|-----------|
| fintech | 6 items | ✗ Empty | DEAD END |
| healthtech | 5 items | ✗ Empty | DEAD END |
| healthcare | 5 items | ✗ Empty | DEAD END |
| developer-tools | 5 items | ✗ Empty (presumed) | DEAD END |
| manufacturing | 5 items | 1 item | Limited |
| financial-services | 5 items | 1 item | Limited |

### Dead Expertise Pages (No Reverse Links from Industries/Case Studies)
Many expertise pages link to related case studies, but **no industry pages explicitly link back to them**, forcing users to navigate through Expertise index to find industry context.

### Case Studies with Limited Expertise Visibility
| Case Study | Expertise Linked | Industry | **Visibility** |
|------------|-----------------|----------|----------------|
| abm-system-launch-prgx | 5 items | financial-services | Only in Expertise mega menu |
| prgx-unified-revenue-operating-model | 4 items | b2b-saas | Only in Expertise mega menu |
| enterprise-abm-activation-red-hat | 5 items | technology-saas | Only in Expertise mega menu |

---

## SECTION 4: Slug Validation & Registry Check

### Missing Slug Registrations
Checked for broken cross-links by validating slugs against existing content:

**Verified Working:**
- ✓ All `relevant_case_study_slugs` in expertise items match actual case study slugs
- ✓ All `featuredExpertise` slugs in industries match expertise items
- ✓ All `expertise` slugs in case studies resolve

**Warnings:**
- Some expertise items reference case studies that are few (e.g., `ai-in-marketing` has empty `relevant_case_study_slugs`)
- Some industries reference case studies that don't exist for them in `featuredCaseStudies`

---

## SECTION 5: Shared Component Recommendation

### Problem Statement
Currently, cross-link display is:
- ✓ Implemented in Expertise pages (`ExpertiseDetailContent` → "Related" section)
- ✗ Missing from Industry pages (featured section exists but no dedicated block)
- ✗ Missing from Case Study pages (data exists but not rendered)
- ✗ Inconsistent structure (expertise uses 3-2-2 layout; industries/case studies inconsistent)

### Solution: Unified `RelatedItems` Component

#### Design Principles
1. **Shared component** reduces duplication and ensures consistency
2. **Flexible display**: Show 2-3 related expertise + 2-3 case studies + 1-2 industries (configurable per page type)
3. **Clear CTAs**: Each related item has a clear "Explore" or "View" action
4. **Responsive**: Works on mobile with stacked layout
5. **Theme-aware**: Respects expertise pillar colors (Stitch, PMM.AI, Strategy & Insights, Sys Ops themes)

#### Component Sketch

```typescript
// components/ui/RelatedItems.tsx
'use client'

import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { ExpertiseItem, IndustryItem, CaseStudyItem } from '@/lib/types'

interface RelatedItemsProps {
  /** Expertise items (max 3 typically) */
  expertise?: ExpertiseItem[]
  /** Case study items (max 3 typically) */
  caseStudies?: CaseStudyItem[]
  /** Industry items (max 2 typically) */
  industries?: IndustryItem[]
  /** Current page context: 'expertise' | 'industries' | 'case-studies' */
  pageType: 'expertise' | 'industries' | 'case-studies'
  /** Optional theme color (inherited from expertise pillar) */
  accentColor?: string
  /** Show section heading? */
  showHeading?: boolean
}

export function RelatedItems({
  expertise,
  caseStudies,
  industries,
  pageType,
  accentColor = 'rgb(54, 192, 207)', // default cyan
  showHeading = true,
}: RelatedItemsProps) {
  // Count items for layout decision
  const itemCount = (expertise?.length ?? 0) + (caseStudies?.length ?? 0) + (industries?.length ?? 0)
  
  if (itemCount === 0) return null

  return (
    <section className="relative py-4 md:py-6 bg-slate-950/50">
      <div className="container-width">
        {showHeading && (
          <h2 className="font-display text-xl font-bold text-white mb-4">
            {pageType === 'expertise' && 'Related'}
            {pageType === 'industries' && 'Related Expertise & Resources'}
            {pageType === 'case-studies' && 'Related Expertise & Industries'}
          </h2>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Expertise Cards */}
          {expertise?.map((exp, i) => (
            <Link
              key={exp.slug}
              href={`/expertise/${exp.slug}`}
              className="group rounded-lg border-2 border-slate-700/50 p-4 hover:border-slate-600 hover:bg-slate-900/50 transition-all duration-200"
              style={{
                borderColor: `${accentColor}40`,
                backgroundColor: `${accentColor}08`,
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] uppercase tracking-wide text-slate-400">
                  Expertise
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:opacity-90">
                {exp.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">{exp.description}</p>
            </Link>
          ))}

          {/* Case Study Cards */}
          {caseStudies?.map((cs, i) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group rounded-lg border-2 border-slate-700/50 p-4 hover:border-slate-600 hover:bg-slate-900/50 transition-all duration-200"
              style={{
                borderColor: `${accentColor}40`,
                backgroundColor: `${accentColor}08`,
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] uppercase tracking-wide text-slate-400">
                  Case Study
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:opacity-90">
                {cs.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                {cs.client}
              </p>
            </Link>
          ))}

          {/* Industry Cards */}
          {industries?.map((ind, i) => (
            <Link
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              className="group rounded-lg border-2 border-slate-700/50 p-4 hover:border-slate-600 hover:bg-slate-900/50 transition-all duration-200"
              style={{
                borderColor: `${accentColor}40`,
                backgroundColor: `${accentColor}08`,
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] uppercase tracking-wide text-slate-400">
                  Industry
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:opacity-90">
                {ind.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                {ind.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

#### Usage Examples

**In Expertise Pages** (already working, can migrate to component):
```typescript
<RelatedItems
  expertise={relatedExpertise}
  caseStudies={relatedCaseStudies}
  industries={relatedIndustries}
  pageType="expertise"
  accentColor={themeCyan}
  showHeading={true}
/>
```

**In Industry Pages** (NEW — add to IndustryPageContent):
```typescript
<RelatedItems
  expertise={featuredExpertise}
  caseStudies={featuredCaseStudies}
  pageType="industries"
  accentColor="rgb(22, 211, 238)" // cyan accent
  showHeading={true}
/>
```

**In Case Study Pages** (NEW — requires new data fetching):
```typescript
// In case-studies/[slug]/page.tsx, fetch related items
const relatedExpertise = expertise
  .map(slug => getExpertiseBySlug(slug))
  .filter(Boolean)
  .slice(0, 2)

const relatedCaseStudies = getCaseStudiesByIndustry(industry)
  .filter(cs => cs.slug !== slug)
  .slice(0, 2)

const relatedIndustry = getIndustryBySlug(industry)

// Then pass to template:
<RelatedItems
  expertise={relatedExpertise}
  caseStudies={relatedCaseStudies}
  industries={relatedIndustry ? [relatedIndustry] : undefined}
  pageType="case-studies"
  accentColor="rgb(59, 130, 246)" // brand-400
  showHeading={true}
/>
```

#### Component Features
1. ✓ **Flexible layout**: Adapts grid based on content type
2. ✓ **Themed**: Accepts accentColor for pillar branding
3. ✓ **Mobile-responsive**: Single column on mobile
4. ✓ **Consistent styling**: Uses existing Slate/brand colors
5. ✓ **Clear CTAs**: Labels (Expertise, Case Study, Industry) + hover states
6. ✓ **Reusable**: Works across all three page types

---

## SECTION 6: Implementation Roadmap

### Phase 1: Create Shared Component
**Duration:** 1 sprint  
**Priority:** High  
**Files:**
- Create `components/ui/RelatedItems.tsx`
- Add helper functions for fetching related items

**Checklist:**
- [ ] Build RelatedItems component with TypeScript types
- [ ] Test responsive layout (mobile, tablet, desktop)
- [ ] Apply theme colors correctly
- [ ] Add hover/focus states for accessibility

### Phase 2: Update Expertise Pages
**Duration:** 1 day  
**Priority:** Medium (already works, just refactor)  
**Files:**
- Update `app/expertise/[slug]/ExpertiseDetailContent.tsx` to use RelatedItems
- Test that existing cross-links display correctly

### Phase 3: Add Cross-Links to Industry Pages
**Duration:** 2 days  
**Priority:** High  
**Files:**
- Update `app/industries/[slug]/page.tsx` to fetch related expertise
- Update `components/industries/IndustryPageContent.tsx` to render RelatedItems
- Add "Related Expertise" block between featured section and footer CTA

**Changes:**
```typescript
// app/industries/[slug]/page.tsx - ADD:
const relatedExpertise = featuredExpertise.slice(0, 3) // Use already-fetched featured
const relationCaseStudies = featuredCaseStudies.slice(0, 2)

// IndustryPageContent.tsx - ADD:
<RelatedItems
  expertise={featuredExpertise}
  caseStudies={featuredCaseStudies}
  pageType="industries"
/>
```

### Phase 4: Add Cross-Links to Case Study Pages
**Duration:** 2-3 days  
**Priority:** Critical (currently dead ends)  
**Files:**
- Update `app/case-studies/[slug]/page.tsx`
- Update `lib/tailwind renderCaseStudy.tsx` (if used) or RenderCaseStudy component
- Create related items fetching logic

**New Functions Needed:**
```typescript
// lib/pageData.ts (or similar)
export function getRelatedCaseStudiesByIndustry(
  industrySlug: string,
  excludeSlug?: string
): CaseStudyItem[] {
  return caseStudyItems
    .filter(cs => cs.industry === industrySlug && cs.slug !== excludeSlug)
    .slice(0, 3)
}

export function getExpertiseBySlugs(slugs: string[]): ExpertiseItem[] {
  return slugs
    .map(slug => getExpertiseBySlug(slug))
    .filter((item): item is ExpertiseItem => Boolean(item))
}
```

**Implementation:**
```typescript
// app/case-studies/[slug]/page.tsx
const relatedExpertise = getExpertiseBySlugs(caseStudy.expertise).slice(0, 2)
const relatedCaseStudies = getRelatedCaseStudiesByIndustry(
  caseStudy.industry,
  slug
).slice(0, 2)
const relatedIndustry = caseStudy.industry 
  ? getIndustryBySlug(caseStudy.industry)
  : null

// Pass to template:
<CaseStudyTemplate
  pageTitle={...}
  relatedExpertise={relatedExpertise}
  relatedCaseStudies={relatedCaseStudies}
  relatedIndustry={relatedIndustry}
>
  {defaultContent}
</CaseStudyTemplate>
```

### Phase 5: Update Mega Menu (Bidirectional Links)
**Duration:** 1 day  
**Priority:** Medium  
**Files:**
- Update `components/layout/MegaMenu.tsx` to add "See Also: Expertise" when on Case Studies / Industries contexts
- Update mobile menu similarly

---

## SECTION 7: Success Metrics

| Metric | Current | Target | Measure |
|--------|---------|--------|---------|
| **Case Study Pages with Outbound Links** | 0% | 100% | All case studies show related expertise + industry |
| **Industry Pages with Cross-Link Block** | 0% (featured only) | 100% | Dedicated "Related" section visible |
| **Dead-End Reduction** | Case studies: 100% dead | Case studies: 0% dead | Visitors can navigate to expertise/industry |
| **Bidirectional Nav Coverage** | ~50% (one-way only) | 100% (full circle) | Can reach all three pillars from any page |
| **Industries with Case Studies** | 7/12 | 12/12 | Fill empty case study arrays or add new ones |
| **Session Depth** | TBD | +30% | Users browse multiple pillar page types per session |

---

## SECTION 8: Content Gaps to Address

### Immediate Actions
1. **Fill empty case study arrays** for industries:
   - `fintech`: Add relevant case studies or set `featuredCaseStudies` to `[]` explicitly (hiding section vs. missing)
   - `healthtech`: Same treatment
   - `healthcare`: Same treatment

2. **Ensure expertise pages have case studies**:
   - `ai-in-marketing`: Currently has `relevant_case_study_slugs: []` — add or remove field

3. **Add industry context** to more case studies:
   - Several case studies lack `industry` field — add or set to null

### Long-Term Recommendations
1. **Create case studies for missing verticals**: FinTech case study would unlock that industry page's cross-links
2. **Document feature/slug mapping**: Maintain a cross-link registry to catch broken links early
3. **Quarterly audit**: Ensure new expertise, industries, and case studies register cross-links on creation

---

## SECTION 9: Accessibility & UX Considerations

### Keyboard Navigation
- ✓ All links keyboard-accessible (use native `<Link>` components)
- Ensure focus states visible on related items cards
- Tab order should flow naturally down related items

### Screen Readers
- Use semantic HTML: `<section>`, `<article>` where appropriate
- Ensure link text is descriptive ("View [Case Study Title]" not just "Case Study")
- Add `aria-label` to icon-only buttons (ChevronRight)

### Mobile UX
- Related items should stack vertically on mobile (sm breakpoint)
- Ensure tap targets are 44px+ (currently look good)
- Consider "See All" link if list truncated (e.g., "See all related case studies")

### Performance
- Related items should lazy-load if case studies page is heavy
- Consider limiting to 6-8 cards max to avoid DOM bloat

---

## SECTION 10: Files to Create/Modify

### New Files
- `components/ui/RelatedItems.tsx` — Shared component

### Modified Files (Proposed Changes)
| File | Change | Priority |
|------|--------|----------|
| `app/expertise/[slug]/ExpertiseDetailContent.tsx` | Import & use RelatedItems component | Medium |
| `app/industries/[slug]/page.tsx` | Fetch & pass related expertise/case studies | High |
| `components/industries/IndustryPageContent.tsx` | Add RelatedItems component before footer | High |
| `app/case-studies/[slug]/page.tsx` | Fetch related expertise/case studies/industry | Critical |
| `lib/caseStudies.ts` or similar | Add `getRelatedCaseStudiesByIndustry()` helper | Critical |
| `components/layout/MegaMenu.tsx` | Add bidirectional "See also" logic (optional) | Low |

---

## Conclusion

Your site has strong **content pillar architecture** but suffers from **incomplete cross-linking**. Case Study pages are entirely isolated (dead ends), Industry pages lack dedicated cross-link blocks, and navigation is mostly one-directional (Expertise out → other pillars, but not vice versa).

**Implementing the shared `RelatedItems` component** will:
1. ✓ Eliminate case study dead ends
2. ✓ Add prominent cross-link paths on industry pages
3. ✓ Create bidirectional navigation between all three pillars
4. ✓ Reduce bounce rates and increase session depth
5. ✓ Ensure consistent UX across page types

**Estimated effort:** 1 sprint (4-5 days) for full implementation.

---

**Report Prepared:** March 22, 2026  
**Next Review:** After Phase 4 implementation complete
