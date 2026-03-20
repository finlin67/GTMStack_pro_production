# Legacy Filesystem Route Handlers Analysis

**Status**: Unmapped routes currently using legacy filesystem routing  
**Last Updated**: March 1, 2026

---

## Current Filesystem Route Architecture

The project has **4 legacy filesystem route handlers** that dynamically render content from data files (not from the registry):

### 1. Expertise Routes
**File**: `app/expertise/[slug]/page.tsx`  
**Lines**: 259 lines  
**Routes Handled**: Dynamically routes all expertise slugs  
**Content Source**: `content/expertise.ts` → `expertiseItems` array  
**Templates Used**: 
- `ExpertiseCategoryTemplate` (for pillar routes: demand-generation, strategy-insights, systems-operations)
- `ExpertiseTopicTemplate` (for detail routes)

**Key Logic**:
```typescript
// Static generation of all expertise slugs
export async function generateStaticParams() {
  return expertiseItems.map((item) => ({
    slug: item.slug,
  }))
}

// Slug to pillar mapping (hardcoded)
const SLUG_TO_PILLAR: Record<string, PillarId> = {
  'content-marketing': 'content-engagement',
  'demand-generation': 'demand-growth',
  'account-based-marketing': 'strategy-insights',
  // ... 31 more mappings
}
```

**How It Works**:
1. User visits `/expertise/demand-generation`
2. Page catches with `[slug]` = `demand-generation`
3. Looks up slug in `SLUG_TO_PILLAR` → Maps to pillar `demand-growth`
4. Gets expertise item from `expertiseItems` array via `getExpertiseBySlug('demand-generation')`
5. Renders appropriate template (category vs. topic)
6. No registry lookup—hardcoded mappings only

**Expertise Slugs in Content**: 34 total
```
account-based-marketing, account-based-marketing-abm, attribution-and-measurement,
bi-data-engineering, ai-in-marketing, content-marketing, content-strategy-systems,
channel-partner-marketing, customer-experience, customer-experience-cx,
customer-marketing, data-governance, demand-generation, digital-marketing,
email-marketing, event-marketing, event-field-marketing, growth-marketing,
lifecycle-marketing, marketing-automation, marketing-analytics-reporting,
marketing-operations, martech-optimization, omnichannel-marketing, paid-advertising,
paid-advertising-sem, product-marketing, revenue-operations, search-engine-optimization,
sales-enablement, sales-enablement-alignment, social-media, social-media-marketing,
video-marketing
```

---

### 2. Industries Routes
**File**: `app/industries/[slug]/page.tsx`  
**Lines**: 85 lines  
**Routes Handled**: Dynamically routes all industry slugs  
**Content Source**: `content/industries.ts` → `industryItems` array  
**Template Used**: `IndustryTemplate` + `IndustryPageContent`

**Key Logic**:
```typescript
export async function generateStaticParams() {
  return industryItems.map((item) => ({
    slug: item.slug,
  }))
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)
  
  if (!industry) {
    notFound()
  }
  
  // Derives other data from industry item
  const featuredExpertise = industry.featuredExpertise?.map(...) || []
  const featuredCaseStudies = industry.featuredCaseStudies?.map(...) || []
}
```

**How It Works**:
1. User visits `/industries/b2b-saas`
2. Page catches with `[slug]` = `b2b-saas`
3. Gets industry item from `industryItems` array via `getIndustryBySlug('b2b-saas')`
4. Extracts featured expertise and case studies from industry item
5. Renders `IndustryPageContent` with the data
6. No registry lookup—direct content lookup only

**Industries Slugs in Content**: 18 total
```
b2b-saas, fintech, financial-services, healthcare, healthtech, manufacturing,
developer-tools, ecommerce, energy-utilities, public-sector-education,
pubsec-government, retail-ecommerce, supply-chain-logistics,
fleet-management-logistics, cybersecurity, climate-tech, technology-saas, ai-ml
```

---

### 3. Case Studies Routes
**File**: `app/case-studies/[slug]/page.tsx`  
**Lines**: 55 lines  
**Routes Handled**: Dynamically routes all case study slugs  
**Content Source**: `content/case-studies.ts` → `caseStudyItems` array  
**Template Used**: `CaseStudyTemplate`

**Key Logic**:
```typescript
export async function generateStaticParams() {
  return caseStudyItems.map((item) => ({ slug: item.slug }))
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)
  
  if (!caseStudy) {
    notFound()
  }
  
  const registryRow = getPageBySlug('case-studies', slug) ?? 
                     getPageBySlug('projects', slug)
  
  // Falls back to default rendering if not in registry
  const defaultContent = <RenderCaseStudy caseStudy={caseStudy} />
}
```

**How It Works**:
1. User visits `/case-studies/abm-system-launch-prgx`
2. Page catches with `[slug]` = `abm-system-launch-prgx`
3. Gets case study item from `caseStudyItems` array via `getCaseStudyBySlug(slug)`
4. **Optionally** checks registry for specific page metadata
5. Renders `RenderCaseStudy` component (default) or `CaseStudyTemplate` (if in registry)
6. Partial registry support, but mostly legacy

**Case Studies Slugs in Content**: 18 total
```
abm-system-launch-prgx, abm-journey-discrete-manufacturing-prgx,
prgx-unified-revenue-operating-model, amcs-verticalized-abm-launch,
end-to-end-abm-framework-amcs, redhat-global-abm-activation,
enterprise-abm-activation-red-hat, salesforce-demandgen-analytics-platform,
revenue-analytics-dashboard-salesforce, data-qa-integrity-pipeline-salesforce,
salesforce-fortune50-abm-events, singles-and-doubles-playbook-salesforce,
sales-cloud-global-campaigns-salesforce, getsatisfaction-growth-automation,
content-and-seo-infrastructure-crowd-factory-marketo, salemglobal-smb-seo-ppc-engine,
event-to-store-lift-retail, marketing-flight-planner-ai-tool,
career-world-4d-interactive-resume
```

---

### 4. Blog Routes
**File**: `app/blog/[slug]/page.tsx`  
**Routes Handled**: Dynamically routes blog posts  
**Content Source**: Markdown/MDX files (not a data array)  
**Template Used**: `BlogPostTemplate`

**Note**: Blog is separate from the registry system and uses MDX. Interacting with this requires different approach.

---

## Complete Unmapped Routing Summary

| Route Prefix | Filesystem Handler | Content Source | Count | Template | Status |
|--------------|-------------------|-----------------|-------|----------|--------|
| `/expertise/*` | `app/expertise/[slug]/page.tsx` | `content/expertise.ts` | 34 | Category/Topic | Legacy |
| `/industries/*` | `app/industries/[slug]/page.tsx` | `content/industries.ts` | 18 | IndustryTemplate | Legacy |
| `/case-studies/*` | `app/case-studies/[slug]/page.tsx` | `content/case-studies.ts` | 18 | CaseStudyTemplate | Partial |
| `/blog/*` | `app/blog/[slug]/page.tsx` | Markdown/MDX | N/A | BlogPostTemplate | Separate |

**Total Unmapped**: 70 routes (34 + 18 + 18)  
**Total Mapped (in registry)**: 34 routes  
**Grand Total**: ~104 routes

---

## Hardcoded Slug-to-Pillar Mappings

The expertise handler has hardcoded mappings from individual slugs to pillar categories. This is problematic because:
- ❌ Not in registry (can't audit/manage centrally)
- ❌ Duplicated logic (also in pillar definitions)
- ❌ Difficult to update (requires code change)

**Mapping Location**: `app/expertise/[slug]/page.tsx` lines 17-50

```typescript
const SLUG_TO_PILLAR: Record<string, PillarId> = {
  // Content & Engagement (7)
  'content-marketing': 'content-engagement',
  'content-strategy-systems': 'content-engagement',
  'email-marketing': 'content-engagement',
  'omnichannel-marketing': 'content-engagement',
  'social-media': 'content-engagement',
  'social-media-marketing': 'content-engagement',
  'video-marketing': 'content-engagement',
  
  // Demand & Growth (9)
  'channel-partner-marketing': 'demand-growth',
  'demand-generation': 'demand-growth',
  'digital-marketing': 'demand-growth',
  'event-marketing': 'demand-growth',
  'event-field-marketing': 'demand-growth',
  'growth-marketing': 'demand-growth',
  'paid-advertising': 'demand-growth',
  'paid-advertising-sem': 'demand-growth',
  'search-engine-optimization': 'demand-growth',
  
  // Strategy & Insights (9)
  'account-based-marketing': 'strategy-insights',
  'account-based-marketing-abm': 'strategy-insights',
  'customer-experience': 'strategy-insights',
  'customer-experience-cx': 'strategy-insights',
  'customer-marketing': 'strategy-insights',
  'lifecycle-marketing': 'strategy-insights',
  'product-marketing': 'strategy-insights',
  'sales-enablement': 'strategy-insights',
  'sales-enablement-alignment': 'strategy-insights',
  
  // Systems & Operations (8)
  'ai-in-marketing': 'systems-operations',
  'attribution-and-measurement': 'systems-operations',
  'bi-data-engineering': 'systems-operations',
  'data-governance': 'systems-operations',
  'marketing-analytics-reporting': 'systems-operations',
  'marketing-automation': 'systems-operations',
  'marketing-operations': 'systems-operations',
  'martech-optimization': 'systems-operations',
}
```

---

## Issues with Current Filesystem Approach

### 1. **No Centralized Management**
- Page metadata (title, theme, SEO) is hardcoded in route handlers
- Every change requires code edit + deploy

### 2. **No Content Key Mapping**
- Filesystem routes don't use `contentKey` concept
- Can't swap content without slug change

### 3. **Limited Template Flexibility**
- Expertise has hardcoded logic for pillar vs. topic routes
- Industries renders via `IndustryPageContent` component (tight coupling)
- Can't swap templates via config

### 4. **No Unified Audit Trail**
- 70 routes hidden in 4 files
- Difficult to see all pages at once
- Hard to understand which routes use which templates

### 5. **Scattered Route Definitions**
- Some routes are real dirs: `/expertise/analytics/`, `/expertise/automation/`
- Others are dynamic: `/expertise/[slug]/`
- But registry only knows about mapped ones (34)

### 6. **Pillar Mapping Duplication**
- `SLUG_TO_PILLAR` in `app/expertise/[slug]/page.tsx` duplicates logic
- Pillar definitions also in `content/expertise.ts`
- Changes in one place don't automatically sync to other

---

## How the Dual System Currently Works

```
User Request: /expertise/demand-generation
                    ↓
Next.js Router
    ↓
Check: Is /expertise/demand-generation in registry?
    ├─ YES → Use RegistryRenderer (mapped 34 routes)
    └─ NO → Fall through to filesystem
                    ↓
Check: /expertise/[slug]/page.tsx
    ├─ YES → Load filesystem handler
    └─ NO → 404
                    ↓
Filesystem Handler:
  - Get slug from params
  - Look up in content/expertise.ts
  - Apply hardcoded SLUG_TO_PILLAR mapping
  - Determine which template to use
  - Render component
                    ↓
Page Rendered (no registry involved)
```

---

## File Locations Reference

| File | Purpose | Lines | Type |
|------|---------|-------|------|
| `app/expertise/[slug]/page.tsx` | Expertise route handler | 259 | Filesystem |
| `app/industries/[slug]/page.tsx` | Industries route handler | 85 | Filesystem |
| `app/case-studies/[slug]/page.tsx` | Case studies route handler | 55 | Filesystem |
| `app/blog/[slug]/page.tsx` | Blog route handler | N/A | Filesystem |
| `content/expertise.ts` | Expertise data + helpers | 978 | Data |
| `content/industries.ts` | Industries data + helpers | 870 | Data |
| `content/case-studies.ts` | Case studies data + helpers | 636 | Data |
| `src/data/page-registry.csv` | Registry (mapped routes only) | 34 rows | Config |
| `src/data/pageRegistry.generated.ts` | Generated registry (TS) | 103 lines | Generated |

---

## Next Steps

See **MIGRATION_PLAN.md** for detailed strategy to move these 70 unmapped routes into the registry system.
