# PHASE 4: Cross-Link Implementation Guide

## Quick Start: Adding RelatedItems to Each Page Type

This guide walks you through implementing the shared `RelatedItems` component across Expertise, Industry, and Case Study pages.

---

## 1. EXPERTISE PAGES (Refactor Existing)

The expertise pages already have working cross-links. This step refactors them to use the shared component.

### File: `app/expertise/[slug]/ExpertiseDetailContent.tsx`

#### Current Implementation
```typescript
{/* ========== RELATED ========== */}
<section className="relative py-4 md:py-6" style={{ backgroundColor: bgDark }}>
  <div className="container-width">
    <h2 className="font-display text-xl font-bold text-white mb-3">Related</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {/* Maps over relatedExpertise, relatedCaseStudies, relatedIndustries */}
    </div>
  </div>
</section>
```

#### Refactored Implementation
```typescript
import { RelatedItems } from '@/components/ui/RelatedItems'

// In ExpertiseDetailContent component:
export function ExpertiseDetailContent({
  item,
  pillarId,
  relatedExpertise,
  relatedCaseStudies,
  relatedIndustries,
  // ... other props
}: ExpertiseDetailContentProps) {
  // ... existing code ...

  // Determine accent color from theme
  const accentColor = theme ? theme.muted : CYAN

  return (
    <div className="min-h-screen text-white" style={...}>
      {/* ... existing sections ... */}

      {/* REPLACE the manual Related section with: */}
      <RelatedItems
        expertise={relatedExpertise}
        caseStudies={relatedCaseStudies}
        industries={relatedIndustries}
        pageType="expertise"
        accentColor={accentColor}
        showHeading={true}
      />

      {/* ... footer CTA ... */}
    </div>
  )
}
```

---

## 2. INDUSTRY PAGES (Add New Cross-Links)

### File: `app/industries/[slug]/page.tsx`

#### Current Implementation
```typescript
export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)

  // Get featured expertise and case studies
  const featuredExpertise = industry.featuredExpertise
    ?.map(s => getExpertiseBySlug(s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item)) || []

  const featuredCaseStudies = industry.featuredCaseStudies
    ?.map(s => getCaseStudyBySlug(s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item)) || []

  // ... rest of implementation
}
```

#### Updated Implementation (ADD these imports & lines)
```typescript
import { getIndustryPageRelatedItems } from '@/lib/relatedItemsHelpers'

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)

  if (!industry) {
    notFound()
  }

  // Get featured expertise and case studies
  const featuredExpertise = industry.featuredExpertise
    ?.map(s => getExpertiseBySlug(s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item)) || []

  const featuredCaseStudies = industry.featuredCaseStudies
    ?.map(s => getCaseStudyBySlug(s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item)) || []

  // ADD THIS:
  const { relatedExpertise, relatedCaseStudies } = getIndustryPageRelatedItems(slug)

  // ... rest of code, pass to template:
  return (
    <IndustryTemplate
      industry={industry}
      featuredExpertise={featuredExpertise}
      featuredCaseStudies={featuredCaseStudies}
      relatedExpertise={relatedExpertise}    // ADD
      relatedCaseStudies={relatedCaseStudies} // ADD
      // ... other props
    />
  )
}
```

#### Update Interface: `IndustryTemplateProps`
```typescript
export interface IndustryTemplateProps {
  industry: IndustryItem
  featuredExpertise: ExpertiseItem[]
  featuredCaseStudies?: CaseStudyItem[]
  relatedExpertise?: ExpertiseItem[]      // ADD
  relatedCaseStudies?: CaseStudyItem[]    // ADD
  whyNow?: string
  // ... other props
}
```

### File: `components/industries/IndustryPageContent.tsx`

#### ADD Import
```typescript
import { RelatedItems } from '@/components/ui/RelatedItems'
```

#### Update Props Interface
```typescript
interface IndustryPageContentProps {
  industry: IndustryItem
  featuredExpertise: ExpertiseItem[]
  featuredCaseStudies?: CaseStudyItem[]
  relatedExpertise?: ExpertiseItem[]      // ADD
  relatedCaseStudies?: CaseStudyItem[]    // ADD
  whyNow?: string
  heroVariant?: 'default' | 'stitch'
}
```

#### Add RelatedItems to Component
```typescript
export default function IndustryPageContent({
  industry,
  featuredExpertise,
  featuredCaseStudies,
  relatedExpertise,    // ADD
  relatedCaseStudies,  // ADD
  whyNow,
  heroVariant = 'stitch',
}: IndustryPageContentProps) {
  // ... existing code ...

  return (
    <>
      {/* Hero section */}
      <HeroDark ... />

      {/* GTM realities section */}
      {/* ... */}

      {/* Proof section */}
      {/* ... */}

      {/* ADD THIS NEW SECTION BEFORE FOOTER CTA: */}
      {(relatedExpertise?.length || relatedCaseStudies?.length) && (
        <RelatedItems
          expertise={relatedExpertise}
          caseStudies={relatedCaseStudies}
          pageType="industries"
          accentColor="rgb(22, 211, 238)" // cyan for industry pages
          showHeading={true}
        />
      )}

      {/* Footer CTA or other final sections */}
    </>
  )
}
```

---

## 3. CASE STUDY PAGES (Add New Cross-Links — Most Critical)

### File: `app/case-studies/[slug]/page.tsx`

#### ADD Import
```typescript
import { getCaseStudyPageRelatedItems } from '@/lib/relatedItemsHelpers'
```

#### Current Implementation (Update)
```typescript
export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  // ADD THIS:
  const { relatedExpertise, relatedCaseStudies, relatedIndustry } =
    getCaseStudyPageRelatedItems(slug)

  const registryRow =
    getPageBySlug('case-studies', slug) ?? getPageBySlug('projects', slug)
  const defaultContent = (
    <RenderCaseStudy caseStudy={caseStudy} routeKind="case-studies" variant="stitch" />
  )

  if (registryRow) {
    return (
      <CaseStudyTemplate
        pageTitle={registryRow.pageTitle}
        theme={registryRow.theme ?? undefined}
        heroVisualId={registryRow.heroVisualId ? registryRow.heroVisualId : undefined}
        relatedExpertise={relatedExpertise}      // ADD
        relatedCaseStudies={relatedCaseStudies}  // ADD
        relatedIndustry={relatedIndustry}        // ADD
      >
        {defaultContent}
      </CaseStudyTemplate>
    )
  }

  return defaultContent
}
```

### File: `src/templates/caseStudies/CaseStudyTemplate.tsx`

#### Update Interface
```typescript
import { ExpertiseItem, IndustryItem, CaseStudyItem } from '@/lib/types'

export interface CaseStudyTemplateProps {
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  children?: ReactNode
  relatedExpertise?: ExpertiseItem[]      // ADD
  relatedCaseStudies?: CaseStudyItem[]    // ADD
  relatedIndustry?: IndustryItem          // ADD
}
```

#### Update Component (ADD RelatedItems)
```typescript
import { RelatedItems } from '@/components/ui/RelatedItems'

export default function CaseStudyTemplate({
  children = null,
  relatedExpertise,
  relatedCaseStudies,
  relatedIndustry,
}: CaseStudyTemplateProps) {
  const industries = relatedIndustry ? [relatedIndustry] : undefined

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {children}
      
      {/* ADD BEFORE closing div: */}
      {(relatedExpertise?.length || relatedCaseStudies?.length || relatedIndustry) && (
        <RelatedItems
          expertise={relatedExpertise}
          caseStudies={relatedCaseStudies}
          industries={industries}
          pageType="case-studies"
          accentColor="rgb(59, 130, 246)" // brand-400
          showHeading={true}
        />
      )}
    </div>
  )
}
```

---

## 4. Add Helper Functions

### File: `lib/relatedItemsHelpers.ts`

See the full helper functions file already created. Key functions:
- `getExpertisePageRelatedItems(slug)` — Returns related expertise, case studies, industries
- `getIndustryPageRelatedItems(slug)` — Returns related expertise and case studies
- `getCaseStudyPageRelatedItems(slug)` — Returns related expertise, case studies, and industry
- `generateCrossLinkAuditReport()` — Validates all cross-links for gaps

---

## 5. Testing Checklist

### Expertise Pages
- [ ] Navigate to `/expertise/account-based-marketing-abm`
- [ ] Verify "Related" section shows 3 expertise + 2 case studies + 2 industries
- [ ] Click related links and verify they navigate correctly
- [ ] Check mobile view: cards should stack vertically

### Industry Pages
- [ ] Navigate to `/industries/b2b-saas`
- [ ] Verify "Related Expertise & Resources" section appears before footer
- [ ] Check that featured expertise links work
- [ ] Check that featured case studies display correctly
- [ ] Verify `/industries/fintech` handles empty case study array gracefully (hides section)

### Case Study Pages
- [ ] Navigate to `/case-studies/abm-system-launch-prgx`
- [ ] **NEW:** Verify "Related Expertise & Industries" section appears
- [ ] **NEW:** Click related expertise links (e.g., account-based-marketing)
- [ ] **NEW:** Verify it shows related industry (financial-services)
- [ ] **NEW:** Verify mobile view works correctly

### Cross-Links
- [ ] From expertise page → case study → back to expertise
- [ ] From expertise page → industry → back to industry's featured expertise
- [ ] From case study → expertise → same pillar expertise
- [ ] From case study → industry → industry's page

### Styling
- [ ] Verify accent colors respect expertise pillar themes
- [ ] Hover states work on all related item cards
- [ ] Responsive breakpoints correct (mobile, tablet, desktop)
- [ ] Focus states visible for accessibility

---

## 6. Validation Script (Optional)

To catch broken cross-links during development, run this in a test file:

```typescript
// utils/validateCrossLinks.ts (run during build or as pre-commit hook)
import { generateCrossLinkAuditReport } from '@/lib/relatedItemsHelpers'

const report = generateCrossLinkAuditReport()

if (report.issuesFound > 0) {
  console.warn(`⚠️  Cross-link Issues Found: ${report.issuesFound}/${report.totalItems}`)
  
  if (report.expertise.length > 0) {
    console.warn('Expertise Issues:')
    report.expertise.forEach(e => {
      console.warn(`  - ${e.slug}: ${e.warnings.join(', ')}`)
    })
  }
  
  if (report.industries.length > 0) {
    console.warn('Industry Issues:')
    report.industries.forEach(i => {
      console.warn(`  - ${i.slug}: ${i.warnings.join(', ')}`)
    })
  }
  
  if (report.caseStudies.length > 0) {
    console.warn('Case Study Issues:')
    report.caseStudies.forEach(cs => {
      console.warn(`  - ${cs.slug}: ${cs.warnings.join(', ')}`)
    })
  }
}
```

---

## 7. Content Fixes (Parallel Work)

While implementing code changes, address content gaps:

### Fill Empty Case Study Arrays
```typescript
// content/industries.ts
{
  slug: 'fintech',
  title: 'FinTech & Payments',
  // ... other props
  featuredCaseStudies: [], // Explicitly set to empty or add case study slugs if available
},
```

### Add Missing Industry Context
```typescript
// content/case-studies.ts
{
  slug: 'ai-in-marketing-case-study',
  title: 'AI in Marketing Results',
  industry: 'b2b-saas', // Ensure this field is present
  expertise: ['ai-in-marketing'], // Ensure expertise array has values
}
```

---

## 8. Migration Checklist

- [ ] Create `RelatedItems` component
- [ ] Create `relatedItemsHelpers.ts` helpers
- [ ] Update Expertise pages (refactor existing)
- [ ] Update Industry pages (add new)
- [ ] Update Case Study pages (add new) — **Priority High**
- [ ] Update page templates to accept related item props
- [ ] Test all page types (expertise, industry, case studies)
- [ ] Test cross-link navigation flows
- [ ] Validate mobile responsive design
- [ ] Run cross-link audit report
- [ ] Fix content gaps (empty case study arrays, missing industry fields)
- [ ] Deploy and monitor session depth / bounce rates
- [ ] Document in component library

---

## 9. Performance Considerations

The `RelatedItems` component is lightweight and should have minimal impact:
- ✓ No extra API calls (all data fetched server-side)
- ✓ Grid layout is CSS-based (no JS overhead)
- ✓ Images lazy-loaded (Lucide icons are inline SVGs)
- ✓ Consider lazy-loading the component itself if case study pages are heavy

Example lazy-load (optional):
```typescript
const RelatedItems = dynamic(() =>
  import('@/components/ui/RelatedItems').then(m => m.RelatedItems),
  { loading: () => <div className="h-24" /> }
)
```

---

## 10. Estimated Timeline

| Phase | Duration | Task |
|-------|----------|------|
| 1 | 1-2 hours | Create RelatedItems component + helpers |
| 2 | 30 min | Refactor expertise pages |
| 3 | 1-2 hours | Add to industry pages |
| 4 | 2-3 hours | Add to case study pages (most complex) |
| 5 | 1 hour | Test all page types |
| 6 | 1-2 hours | Fix content gaps + audit |
| **Total** | **6-10 hours** | **Full implementation** |

---

## Questions?

Refer to:
- Full Audit Report: `docs/PHASE4_CROSSLINK_AUDIT_REPORT.md`
- Component Code: `components/ui/RelatedItems.tsx`
- Helper Functions: `lib/relatedItemsHelpers.ts`
