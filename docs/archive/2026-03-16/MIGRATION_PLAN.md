# Migration Plan: Moving Unmapped Routes to Registry

**Status**: Planning Document  
**Target**: Consolidate 70 unmapped routes into central registry  
**Timeline**: Phased approach (can be done in stages)  
**Last Updated**: March 1, 2026

---

## Overview

Currently, **70 out of ~104 total routes** are handled by legacy filesystem handlers, making the routing architecture difficult to audit and manage. This plan outlines how to migrate them all to the centralized registry system.

### What This Achieves

✅ **Single source of truth** for all page routing  
✅ **Centralized metadata** (title, theme, template, content key)  
✅ **Template flexibility** (swap templates via CSV)  
✅ **Unified audit trail** (see all pages in one place)  
✅ **No hardcoded mappings** (remove SLUG_TO_PILLAR, etc.)  
✅ **Simplified route handlers** (can be removed eventually)  

---

## Current State vs. Future State

### Current (Dual System)

```
Registry System (34 routes):
├─ /
├─ /about, /contact, /resume
├─ /expertise (main landing)
├─ /expertise/content-engagement, /demand-growth, /strategy-insights, /systems-operations
├─ /expertise/analytics, /automation, /demand-generation, /optimization, /strategy
├─ /industries (main landing)
├─ /industries/b2b-saas, /financial-services, /healthcare, /manufacturing, /retail, /pubsec-government, /fleet-management-logistics, /retail-ecommerce
├─ /gallery, /projects, /case-studies (main landing)
├─ /case-studies/event-to-store-lift-retail
├─ /services/* (6 service pages)
└─ /p/test

Filesystem System (70 routes + blog):
├─ /expertise/[slug] (34 expertise routes)
├─ /industries/[slug] (18 industry routes)
├─ /case-studies/[slug] (18 case study routes)
└─ /blog/[slug] (blog posts - separate)
```

### Future (Single Registry)

```
Registry System (104 routes):
├─ All 34 fully-mapped routes (unchanged)
├─ 34 expertise detail routes (migrated)
├─ 18 industry detail routes (migrated)
├─ 18 case study routes (migrated)
└─ Blog routes (separate - see Blog Migration)

Filesystem System:
├─ /blog/[slug] (kept separate)
└─ All other handlers can be removed
```

---

## Migration Strategy: Phase-Based Approach

### Phase 1: Expertise Routes
**Effort**: Medium  
**Risk**: Low  
**Time**: 1-2 days  
**Routes**: 34 migrations

#### Step 1.1: Analyze Current Expertise Structure
```
Current mapping from app/expertise/[slug]/page.tsx:
- 34 expertiseItems slugs
- 4 pillar categories (content-engagement, demand-growth, strategy-insights, systems-operations)
- Hardcoded routing logic in SLUG_TO_PILLAR
```

#### Step 1.2: Determine Template for Each Slug
Already done! Looking at the route handler, we can infer:
- Slugs mapped in `SLUG_TO_PILLAR` → Use `ExpertiseCategoryTemplate`
- Other slugs → Use `ExpertiseTopicTemplate`

Actually, let me refine this:
```
Expertise Routes Using ExpertiseCategoryTemplate:
- /expertise/demand-generation (already mapped)

Expertise Routes Using ExpertiseTopicTemplate:
- /expertise/account-based-marketing
- /expertise/attribution-and-measurement
- /expertise/bi-data-engineering
- /expertise/ai-in-marketing
- /expertise/content-marketing
- /expertise/content-strategy-systems
- /expertise/channel-partner-marketing
- /expertise/customer-experience
- /expertise/customer-marketing
- /expertise/data-governance
- /expertise/digital-marketing
- /expertise/email-marketing
- /expertise/event-field-marketing
- /expertise/event-marketing
- /expertise/growth-marketing
- /expertise/lifecycle-marketing
- /expertise/marketing-automation
- /expertise/marketing-analytics-reporting
- /expertise/marketing-operations
- /expertise/martech-optimization
- /expertise/omnichannel-marketing
- /expertise/paid-advertising
- /expertise/paid-advertising-sem
- /expertise/product-marketing
- /expertise/revenue-operations
- /expertise/search-engine-optimization
- /expertise/sales-enablement
- /expertise/sales-enablement-alignment
- /expertise/social-media
- /expertise/social-media-marketing
- /expertise/video-marketing
```

#### Step 1.3: Generate CSV Rows
Add all 33 new expertise routes to `src/data/page-registry.csv`:

```csv
/expertise/account-based-marketing,Account-Based Marketing,content/expertise.ts,expertise.topic,expertise:account-based-marketing,dark,
/expertise/attribution-and-measurement,Attribution & Measurement,content/expertise.ts,expertise.topic,expertise:attribution-and-measurement,dark,
... (30 more)
```

#### Step 1.4: Update SLUG_TO_PILLAR Mapping
Once migrated, the hardcoded mapping in `app/expertise/[slug]/page.tsx` can be **removed** because the registry will handle routing.

#### Step 1.5: Test & Verify
- Build project: `npm run build`
- Verify all 34 expertise routes render correctly
- Check SEO metadata matches expectations
- Verify templates load correctly

---

### Phase 2: Industries Routes
**Effort**: Medium  
**Risk**: Low  
**Time**: 1-2 days  
**Routes**: 18 migrations

#### Step 2.1: Analyze Current Industries Structure
```
From content/industries.ts:
- 18 industryItems slugs
- All use industry.base template
- All use IndustryPageContent component
```

#### Step 2.2: Generate CSV Rows
Add all 17 new industry routes to `src/data/page-registry.csv`:

```csv
/industries/fintech,FinTech & Payments,content/industries.ts,industry.base,industries:fintech,dark,
/industries/healthtech,HealthTech,content/industries.ts,industry.base,industries:healthtech,dark,
... (15 more)
```

#### Step 2.3: Verify Content Keys
Ensure each industry slug maps to correct `industryItems` entry.

#### Step 2.4: Test & Verify
- Check all 18 routes render
- Verify featured expertise/case studies load
- Check responsive behavior

---

### Phase 3: Case Studies Routes
**Effort**: Low  
**Risk**: Low  
**Time**: 1 day  
**Routes**: 18 migrations

#### Step 3.1: Analyze Current Case Studies Structure
```
From content/case-studies.ts:
- 18 caseStudyItems slugs
- Already has 1 in registry (/case-studies/event-to-store-lift-retail)
- All use caseStudy.base template
```

#### Step 3.2: Generate CSV Rows
Add remaining 17 case study routes (1 already exists):

```csv
/case-studies/abm-system-launch-prgx,ABM System Launch,content/case-studies.ts,caseStudy.base,case-studies:abm-system-launch-prgx,dark,
/case-studies/abm-journey-discrete-manufacturing-prgx,Discrete Manufacturing ABM Journey,content/case-studies.ts,caseStudy.base,case-studies:abm-journey-discrete-manufacturing-prgx,dark,
... (16 more)
```

#### Step 3.3: Test & Verify
- Verify all 18 case study routes load
- Check for any 404s

---

### Phase 4: Cleanup & Optimization
**Effort**: High  
**Risk**: Medium  
**Time**: 2-3 days  
**Impact**: Removes legacy code

#### Step 4.1: Remove Hardcoded Mappings

**File**: `app/expertise/[slug]/page.tsx`

Remove:
```typescript
// DELETE THIS (lines 17-50)
const SLUG_TO_PILLAR: Record<string, PillarId> = { ... }
```

#### Step 4.2: Simplify Route Handlers (Optional)

After all routes are in registry, you can optionally:
- Remove the `app/expertise/[slug]/page.tsx` handler entirely
- Remove the `app/industries/[slug]/page.tsx` handler entirely
- Remove the `app/case-studies/[slug]/page.tsx` handler entirely
- Let the catch-all `app/[[...slug]]/page.tsx` handle everything

**Before**:
```
app/
├── expertise/
│   ├── analytics/
│   ├── automation/
│   ├── [slug]/
│   │   └── page.tsx (259 lines)
│   └── page.tsx
├── industries/
│   ├── b2b-saas/
│   ├── [slug]/
│   │   └── page.tsx (85 lines)
│   └── page.tsx
├── case-studies/
│   ├── [slug]/
│   │   └── page.tsx (55 lines)
│   └── page.tsx
└── [[...slug]]/
    └── page.tsx (catch-all)
```

**After** (if handlers removed):
```
app/
├── expertise/
│   ├── analytics/    (can be static, optional)
│   ├── automation/   (can be static, optional)
│   └── page.tsx      (main expertise landing)
├── industries/
│   ├── b2b-saas/     (can be static, optional)
│   └── page.tsx      (main industries landing)
├── case-studies/
│   └── page.ts       (main case-studies landing)
└── [[...slug]]/
    └── page.tsx      (handles everything else)
```

#### Step 4.3: Remove Old Functions/Exports

**From `content/expertise.ts`**:
- Keep: `expertiseItems` array, `getExpertiseBySlug()`, helper functions (still used by related item lookups)
- Can deprecate: Custom slug mappings (if they were only used for routing)

**From `content/industries.ts`**:
- Keep: `industryItems` array, `getIndustryBySlug()`, helpers
- Can deprecate: Custom routing logic

**From `content/case-studies.ts`**:
- Keep: `caseStudyItems` array, `getCaseStudyBySlug()`, helpers
- Can deprecate: Custom routing logic

#### Step 4.4: Update Navigation/Linking

If you had any hardcoded links or navigation that assumed filesystem routing, update to use registry patterns.

---

## Detailed CSV Template for Phase Migrations

### Expertise CSV Template
```csv
/expertise/{slug},{Title},content/expertise.ts,expertise.topic,expertise:{slug},dark,Expertise Topics,Migrated from [slug]
```

**Example**:
```csv
/expertise/account-based-marketing,Account-Based Marketing,content/expertise.ts,expertise.topic,expertise:account-based-marketing,dark,Expertise Topics,
/expertise/attribution-and-measurement,Attribution & Measurement,content/expertise.ts,expertise.topic,expertise:attribution-and-measurement,dark,Expertise Topics,
```

### Industries CSV Template
```csv
/industries/{slug},{Title},content/industries.ts,industry.base,industries:{slug},dark,Industries Details,Migrated from [slug]
```

**Example**:
```csv
/industries/fintech,FinTech & Payments,content/industries.ts,industry.base,industries:fintech,dark,Industries Details,
/industries/healthtech,HealthTech,content/industries.ts,industry.base,industries:healthtech,dark,Industries Details,
```

### Case Studies CSV Template
```csv
/case-studies/{slug},{Title},content/case-studies.ts,caseStudy.base,case-studies:{slug},dark,Case Studies,Migrated from [slug]
```

**Example**:
```csv
/case-studies/abm-system-launch-prgx,ABM System Launch,content/case-studies.ts,caseStudy.base,case-studies:abm-system-launch-prgx,dark,Case Studies,
```

---

## Complete CSV Lines for All Migrations

### Phase 1: Expertise (Add 33 lines after existing `/expertise/` routes)

```csv
/expertise/account-based-marketing,Account-Based Marketing,content/expertise.ts,expertise.topic,expertise:account-based-marketing,dark,Expertise Topics,
/expertise/attribution-and-measurement,Attribution & Measurement,content/expertise.ts,expertise.topic,expertise:attribution-and-measurement,dark,Expertise Topics,
/expertise/bi-data-engineering,BI & Data Engineering,content/expertise.ts,expertise.topic,expertise:bi-data-engineering,dark,Expertise Topics,
/expertise/channel-partner-marketing,Channel Partner Marketing,content/expertise.ts,expertise.topic,expertise:channel-partner-marketing,dark,Expertise Topics,
/expertise/content-marketing,Content Marketing,content/expertise.ts,expertise.topic,expertise:content-marketing,dark,Expertise Topics,
/expertise/content-strategy-systems,Content Strategy Systems,content/expertise.ts,expertise.topic,expertise:content-strategy-systems,dark,Expertise Topics,
/expertise/customer-experience,Customer Experience,content/expertise.ts,expertise.topic,expertise:customer-experience,dark,Expertise Topics,
/expertise/customer-marketing,Customer Marketing,content/expertise.ts,expertise.topic,expertise:customer-marketing,dark,Expertise Topics,
/expertise/data-governance,Data Governance,content/expertise.ts,expertise.topic,expertise:data-governance,dark,Expertise Topics,
/expertise/digital-marketing,Digital Marketing,content/expertise.ts,expertise.topic,expertise:digital-marketing,dark,Expertise Topics,
/expertise/email-marketing,Email Marketing,content/expertise.ts,expertise.topic,expertise:email-marketing,dark,Expertise Topics,
/expertise/event-field-marketing,Event Field Marketing,content/expertise.ts,expertise.topic,expertise:event-field-marketing,dark,Expertise Topics,
/expertise/event-marketing,Event Marketing,content/expertise.ts,expertise.topic,expertise:event-marketing,dark,Expertise Topics,
/expertise/growth-marketing,Growth Marketing,content/expertise.ts,expertise.topic,expertise:growth-marketing,dark,Expertise Topics,
/expertise/lifecycle-marketing,Lifecycle Marketing,content/expertise.ts,expertise.topic,expertise:lifecycle-marketing,dark,Expertise Topics,
/expertise/marketing-automation,Marketing Automation,content/expertise.ts,expertise.topic,expertise:marketing-automation,dark,Expertise Topics,
/expertise/marketing-analytics-reporting,Marketing Analytics & Reporting,content/expertise.ts,expertise.topic,expertise:marketing-analytics-reporting,dark,Expertise Topics,
/expertise/marketing-operations,Marketing Operations,content/expertise.ts,expertise.topic,expertise:marketing-operations,dark,Expertise Topics,
/expertise/martech-optimization,MarTech Optimization,content/expertise.ts,expertise.topic,expertise:martech-optimization,dark,Expertise Topics,
/expertise/omnichannel-marketing,Omnichannel Marketing,content/expertise.ts,expertise.topic,expertise:omnichannel-marketing,dark,Expertise Topics,
/expertise/paid-advertising,Paid Advertising,content/expertise.ts,expertise.topic,expertise:paid-advertising,dark,Expertise Topics,
/expertise/paid-advertising-sem,Paid Advertising & SEM,content/expertise.ts,expertise.topic,expertise:paid-advertising-sem,dark,Expertise Topics,
/expertise/product-marketing,Product Marketing,content/expertise.ts,expertise.topic,expertise:product-marketing,dark,Expertise Topics,
/expertise/revenue-operations,Revenue Operations,content/expertise.ts,expertise.topic,expertise:revenue-operations,dark,Expertise Topics,
/expertise/sales-enablement,Sales Enablement,content/expertise.ts,expertise.topic,expertise:sales-enablement,dark,Expertise Topics,
/expertise/sales-enablement-alignment,Sales Enablement & Alignment,content/expertise.ts,expertise.topic,expertise:sales-enablement-alignment,dark,Expertise Topics,
/expertise/search-engine-optimization,Search Engine Optimization,content/expertise.ts,expertise.topic,expertise:search-engine-optimization,dark,Expertise Topics,
/expertise/social-media,Social Media,content/expertise.ts,expertise.topic,expertise:social-media,dark,Expertise Topics,
/expertise/social-media-marketing,Social Media Marketing,content/expertise.ts,expertise.topic,expertise:social-media-marketing,dark,Expertise Topics,
/expertise/video-marketing,Video Marketing,content/expertise.ts,expertise.topic,expertise:video-marketing,dark,Expertise Topics,
```

### Phase 2: Industries (Add 17 lines after existing `/industries/` routes)

```csv
/industries/fintech,FinTech & Payments,content/industries.ts,industry.base,industries:fintech,dark,Industries Details,
/industries/healthtech,HealthTech,content/industries.ts,industry.base,industries:healthtech,dark,Industries Details,
/industries/developer-tools,Developer Tools & DevOps,content/industries.ts,industry.base,industries:developer-tools,dark,Industries Details,
/industries/ecommerce,E-Commerce,content/industries.ts,industry.base,industries:ecommerce,dark,Industries Details,
/industries/energy-utilities,Energy & Utilities,content/industries.ts,industry.base,industries:energy-utilities,dark,Industries Details,
/industries/public-sector-education,Public Sector & Education,content/industries.ts,industry.base,industries:public-sector-education,dark,Industries Details,
/industries/retail-ecommerce,Retail & E-Commerce,content/industries.ts,industry.base,industries:retail-ecommerce,dark,Industries Details,
/industries/supply-chain-logistics,Supply Chain & Logistics,content/industries.ts,industry.base,industries:supply-chain-logistics,dark,Industries Details,
/industries/fleet-management-logistics,Fleet Management & Logistics,content/industries.ts,industry.base,industries:fleet-management-logistics,dark,Industries Details,
/industries/cybersecurity,Cybersecurity,content/industries.ts,industry.base,industries:cybersecurity,dark,Industries Details,
/industries/climate-tech,Climate Tech,content/industries.ts,industry.base,industries:climate-tech,dark,Industries Details,
/industries/technology-saas,Technology & SaaS,content/industries.ts,industry.base,industries:technology-saas,dark,Industries Details,
/industries/ai-ml,AI & ML,content/industries.ts,industry.base,industries:ai-ml,dark,Industries Details,
```

### Phase 3: Case Studies (Add 18 lines)

```csv
/case-studies/abm-system-launch-prgx,ABM System Launch,content/case-studies.ts,caseStudy.base,case-studies:abm-system-launch-prgx,dark,Case Studies,
/case-studies/abm-journey-discrete-manufacturing-prgx,Discrete Manufacturing ABM Journey,content/case-studies.ts,caseStudy.base,case-studies:abm-journey-discrete-manufacturing-prgx,dark,Case Studies,
/case-studies/prgx-unified-revenue-operating-model,PRGX Unified Revenue Operating Model,content/case-studies.ts,caseStudy.base,case-studies:prgx-unified-revenue-operating-model,dark,Case Studies,
/case-studies/amcs-verticalized-abm-launch,AMCS Verticalized ABM Launch,content/case-studies.ts,caseStudy.base,case-studies:amcs-verticalized-abm-launch,dark,Case Studies,
/case-studies/end-to-end-abm-framework-amcs,End-to-End ABM Framework,content/case-studies.ts,caseStudy.base,case-studies:end-to-end-abm-framework-amcs,dark,Case Studies,
/case-studies/redhat-global-abm-activation,RedHat Global ABM Activation,content/case-studies.ts,caseStudy.base,case-studies:redhat-global-abm-activation,dark,Case Studies,
/case-studies/enterprise-abm-activation-red-hat,Enterprise ABM Activation,content/case-studies.ts,caseStudy.base,case-studies:enterprise-abm-activation-red-hat,dark,Case Studies,
/case-studies/salesforce-demandgen-analytics-platform,Salesforce DemandGen Analytics Platform,content/case-studies.ts,caseStudy.base,case-studies:salesforce-demandgen-analytics-platform,dark,Case Studies,
/case-studies/revenue-analytics-dashboard-salesforce,Revenue Analytics Dashboard,content/case-studies.ts,caseStudy.base,case-studies:revenue-analytics-dashboard-salesforce,dark,Case Studies,
/case-studies/data-qa-integrity-pipeline-salesforce,Data QA & Integrity Pipeline,content/case-studies.ts,caseStudy.base,case-studies:data-qa-integrity-pipeline-salesforce,dark,Case Studies,
/case-studies/salesforce-fortune50-abm-events,Salesforce Fortune 50 ABM Events,content/case-studies.ts,caseStudy.base,case-studies:salesforce-fortune50-abm-events,dark,Case Studies,
/case-studies/singles-and-doubles-playbook-salesforce,Singles & Doubles Playbook,content/case-studies.ts,caseStudy.base,case-studies:singles-and-doubles-playbook-salesforce,dark,Case Studies,
/case-studies/sales-cloud-global-campaigns-salesforce,Sales Cloud Global Campaigns,content/case-studies.ts,caseStudy.base,case-studies:sales-cloud-global-campaigns-salesforce,dark,Case Studies,
/case-studies/getsatisfaction-growth-automation,GetSatisfaction Growth Automation,content/case-studies.ts,caseStudy.base,case-studies:getsatisfaction-growth-automation,dark,Case Studies,
/case-studies/content-and-seo-infrastructure-crowd-factory-marketo,Content & SEO Infrastructure,content/case-studies.ts,caseStudy.base,case-studies:content-and-seo-infrastructure-crowd-factory-marketo,dark,Case Studies,
/case-studies/salemglobal-smb-seo-ppc-engine,SaleGlobal SMB SEO & PPC Engine,content/case-studies.ts,caseStudy.base,case-studies:salemglobal-smb-seo-ppc-engine,dark,Case Studies,
/case-studies/marketing-flight-planner-ai-tool,Marketing Flight Planner AI Tool,content/case-studies.ts,caseStudy.base,case-studies:marketing-flight-planner-ai-tool,dark,Case Studies,
/case-studies/career-world-4d-interactive-resume,Career World 4D Interactive Resume,content/case-studies.ts,caseStudy.base,case-studies:career-world-4d-interactive-resume,dark,Case Studies,
```

---

## Implementation Checklist

### Pre-Migration
- [ ] Review this document thoroughly
- [ ] Understand current routing architecture
- [ ] Backup current `src/data/page-registry.csv`
- [ ] Create feature branch for migration work

### Phase 1: Expertise
- [ ] Add 33 expertise routes to CSV
- [ ] Run `npm run gen:registry`
- [ ] Build: `npm run build`
- [ ] Test all expertise routes
- [ ] Verify no broken links
- [ ] Deploy to staging
- [ ] Test on staging environment
- [ ] Get sign-off

### Phase 2: Industries
- [ ] Add 17 industry routes to CSV
- [ ] Run `npm run gen:registry`
- [ ] Build: `npm run build`
- [ ] Test all industry routes
- [ ] Verify related expertise/case studies load
- [ ] Deploy to staging
- [ ] Test on staging
- [ ] Get sign-off

### Phase 3: Case Studies
- [ ] Add 17 case study routes to CSV (1 already exists—verify it)
- [ ] Run `npm run gen:registry`
- [ ] Build: `npm run build`
- [ ] Test all case study routes
- [ ] Deploy to staging
- [ ] Test on staging
- [ ] Get sign-off

### Phase 4: Cleanup
- [ ] Remove `SLUG_TO_PILLAR` mapping from `app/expertise/[slug]/page.tsx`
- [ ] Test expertise routes still work
- [ ] (Optional) Remove deprecated route handlers
- [ ] Update any internal documentation
- [ ] Commit and deploy to production

### Post-Migration
- [ ] Monitor for any 404s
- [ ] Update any hard-coded navigation/links
- [ ] Document new routing architecture
- [ ] Update this migration guide (mark as complete)

---

## Rollback Plan

If issues arise:

1. **Immediate**:
   - Revert `src/data/page-registry.csv` to backup
   - Run `npm run gen:registry` to regenerate TypeScript
   - Redeploy

2. **Verify**:
   - Check all routes work
   - Check no 404s in logs
   - Verify template rendering

3. **Debug**:
   - Check content keys exist in content files
   - Verify template IDs are valid
   - Check theme values are valid
   - Review browser console for errors

---

## Notes

- **Blog Routes**: Keep separate (not migrating in this plan)
- **Admin Routes**: Keep separate (not migrated)
- **Services Routes**: Already in registry, no migration needed
- **Dry Run**: Run `npm run build` before each phase to catch errors early
- **Testing**: Test on staging before production deployment

---

**Next Steps**: Choose a phase and begin implementing!
