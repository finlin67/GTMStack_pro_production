# Content Management Guide

**Last Updated:** February 28, 2026

This guide explains how content is structured and managed across all pages in the GTM Stack Pro website project.

---

## Table of Contents

1. [Overview](#overview)
2. [Content Architecture Pattern](#content-architecture-pattern)
3. [How Content is Populated on Pages](#how-content-is-populated-on-pages)
4. [Content Type Schemas](#content-type-schemas)
5. [Full Project Content Map](#full-project-content-map)
6. [How to Add New Content](#how-to-add-new-content)
7. [Scaling Recommendations](#scaling-recommendations)

---

## Overview

This project uses a **centralized content model** where each content type (Industries, Expertise, Case Studies, etc.) is managed in a single TypeScript file within the `/content` directory.

### Key Principles

- **Single source of truth**: Each content type has one primary file
- **Type-safe**: All content uses TypeScript interfaces defined in `lib/types.ts`
- **Centralized**: Content arrays are exported from files like `content/industries.ts`
- **Template-specific**: Some pages (Home, About) use dedicated template content files

---

## Content Architecture Pattern

### Current Structure

```
content/
├── industries.ts          # All industry content (centralized)
├── expertise.ts           # All expertise content (centralized)
├── case-studies.ts        # All case study content (centralized)
├── home.ts                # Home page template content
├── about.ts               # About page template content
├── contact.ts             # Contact page content
├── resume.ts              # Resume page content
├── expertiseHeroConfigs.ts # Hero configurations
├── industries/            # Directory exists but minimal use
│   └── main.ts            # (Not primary source)
├── expertise/             # Directory exists with pillar structure
│   ├── main.ts
│   ├── demand-generation.ts
│   ├── demand-growth.ts
│   └── [pillar-specific files]
└── gallery/
    └── main.ts
```

### Pattern: Single File per Content Type

For industry details like `/industries/healthcare`, you **edit content in**:
- ✅ `content/industries.ts` (one centralized TypeScript file with all industries)
- ❌ NOT individual files under `content/industries/`

The subdirectories (`content/industries/`, `content/expertise/`) currently only contain `main.ts` files and are **not used for distributed content management**.

---

## How Content is Populated on Pages

This project uses a **slug-based content lookup system**, NOT MDX. Here's how it works:

### Architecture Overview

```
User visits /industries/healthcare
                    ↓
app/[[...slug]]/page.tsx (catches all routes)
                    ↓
PAGE_REGISTRY.generated.ts (looks up route)
                    ↓
Finds: { route: "/industries/healthcare", templateId: "industry.base", contentKey: "industries:healthcare" }
                    ↓
Gets Template: IndustryTemplate.tsx
                    ↓
Gets Content: industryItems array → finds item with slug "healthcare"
                    ↓
IndustryTemplate renders with IndustryItem props
                    ↓
User sees the industry details page
```

### The Registry System

#### 1. **Page Registry** (`src/data/pageRegistry.generated.ts`)

This is the master routing lookup table. It maps every route to:
- The source content file
- The template to use
- The content key to fetch
- Theme (dark/light)
- Hero visual ID

**Example entries:**

```typescript
export const PAGE_REGISTRY: PageRegistryRow[] = [
  {
    route: "/industries/healthcare",
    fileRef: "content/industries.ts",
    pageTitle: "Healthcare & Health Technology",
    templateId: "industry.base",  // ← Which template component to use
    contentKey: "industries:healthcare",  // ← How to fetch the content
    theme: 'light',
    heroVisualId: ""
  },
  {
    route: "/expertise/demand-generation",
    fileRef: "content/expertise.ts",
    pageTitle: "Demand Generation",
    templateId: "expertise.topic",
    contentKey: "expertise:demand-generation",
    theme: 'dark',
    heroVisualId: ""
  },
  {
    route: "/",
    fileRef: "content/home.ts",
    pageTitle: "Home",
    templateId: "home.main",
    contentKey: "home:main",
    theme: undefined,
    heroVisualId: ""
  },
  // ... 30+ more routes
]
```

**Key observations:**
- This registry is **generated** (`pageRegistry.generated.ts`) from a CSV source
- Each route is pre-defined (not dynamically generated from slug patterns)
- Adding new routes requires updating the source CSV and regenerating the registry
- Multiple routes can use the same template but different content keys

#### 2. **Template Registry** (`src/templates/registry.ts`)

Maps templateId to actual React component:

```typescript
export const TEMPLATE_BY_ID: Record<string, TemplateComponent> = {
  'expertise.topic': ExpertiseTopicTemplate,
  'expertise.category': ExpertiseCategoryTemplate,
  'industry.base': IndustryTemplate,
  'home.main': HomeTemplate,
  'caseStudy.base': CaseStudyTemplate,
  // ... etc
}
```

#### 3. **Content Registry** (`src/content/registry.ts`)

Maps contentKey to actual content:

```typescript
// Build dynamic lookups from arrays
const industryByKey: Record<string, IndustryItem> = Object.fromEntries(
  industryItems.map((item) => [`industries:${item.slug}`, item])
)

const expertiseByKey: Record<string, ExpertiseItem> = Object.fromEntries(
  expertiseItems.map((item) => [`expertise:${item.slug}`, item])
)

// Static content
const contentByKey: Record<string, unknown> = {
  'home:main': HOME_CONTENT,
  'about:main': ABOUT_CONTENT,
  'expertise:main': EXPERTISE_MAIN_CONTENT,
  ...industryByKey,    // Auto-generated from content/industries.ts
  ...expertiseByKey,   // Auto-generated from content/expertise.ts
}

export function getContentByKey(key: string): unknown {
  return contentByKey[key]
}
```

### Data Flow: Route → Template → Content

1. **User requests** `/industries/healthcare`
2. **Router** (`app/[[...slug]]/page.tsx`) catches the request
3. **Registry lookup** finds the matching PAGE_REGISTRY entry
4. **Template resolution** uses the `templateId` to get the component:
   ```typescript
   const TemplateComponent = getTemplate(templateId)  // IndustryTemplate
   ```
5. **Content fetching** uses the `contentKey` to get the data:
   ```typescript
   const content = getContentByKey(contentKey)  // IndustryItem for healthcare
   ```
6. **Rendering** passes content to template:
   ```typescript
   return <TemplateComponent content={content} pageTitle={pageTitle} />
   ```

### Why NOT MDX?

The project does **not use MDX for primary content** because:

- ✅ **Type safety**: All content is TypeScript with full IDE autocomplete
- ✅ **Easy updates**: Edit plain data without understanding component syntax
- ✅ **Structured data**: Industries, Expertise, Case Studies have consistent shapes
- ✅ **Reusability**: Same content can power multiple templates or views
- ✅ **Performance**: No compile step needed for content changes
- ✅ **Database-ready**: Easy to migrate to a CMS or database later

**MDX is used for:** Blog posts, documentation, and any prose-heavy content where markdown + embedded components make sense.

### It's Really Just "Slug Model"

The "slug model" is simple:
1. You have an array of objects with a `slug` field: `{ slug: 'healthcare', title: '...', ... }`
2. A `contentKey` like `industries:healthcare` tells the system which array and which slug to fetch
3. The registry pre-maps all valid slugs so they can be statically generated at build time

No dynamic routing, no runtime slug resolution—just deterministic lookups.

---

## Content Type Schemas

All type definitions are in `lib/types.ts`. Below are the complete schemas with all top-level keys for easy copy/paste.

### 1. Industries (`IndustryItem`)

**File:** `content/industries.ts`  
**Export:** `export const industryItems: IndustryItem[]`

```typescript
{
  slug: string                    // URL slug (e.g., 'b2b-saas')
  title: string                   // Display title
  description: string             // Short description
  longDescription: string         // Extended description
  positioning?: string            // 1-line positioning statement
  gtmRealities?: string[]         // 3-5 bullets about GTM realities
  playbook?: string[]             // Playbook bullets (when proof is empty)
  proof?: Array<{                 // Proof points with metrics
    company?: string
    outcome: string
    metrics?: string
  }>
  tags: string[]                  // Category tags
  icon: string                    // Icon name (e.g., 'Cloud')
  stats: Array<{                  // Statistics to display
    label: string
    value: string
  }>
  featured?: boolean              // Featured on homepage
  featuredExpertise?: string[]    // Related expertise slugs
  featuredCaseStudies?: string[]  // Related case study slugs
}
```

**Example:**

```typescript
export const industryItems: IndustryItem[] = [
  {
    slug: 'b2b-saas',
    title: 'B2B SaaS',
    description: 'Revenue milestones from seed to scale...',
    longDescription: 'Specialized GTM expertise for B2B software...',
    positioning: 'Revenue milestones from seed to scale.',
    gtmRealities: [
      'Balancing PLG and sales-led motions requires integrated data...',
      'Scaling from SMB to enterprise demands different GTM plays...',
    ],
    playbook: [
      'Unified revenue operating models...',
      'Product-led growth engines...',
    ],
    proof: [
      {
        company: 'PRGX',
        outcome: 'Unified ABM + RevOps model',
        metrics: '87% YoY pipeline growth; +180% MQL→SQL',
      },
    ],
    tags: ['PLG', 'Enterprise Sales', 'Freemium'],
    icon: 'Cloud',
    stats: [
      { label: 'SaaS clients served', value: '50+' },
      { label: 'Avg. MRR growth', value: '47%' },
    ],
    featured: true,
    featuredExpertise: ['account-based-marketing-abm'],
  },
  // ... more industries
]
```

---

### 2. Expertise (`ExpertiseItem`)

**File:** `content/expertise.ts`  
**Export:** `export const expertiseItems: ExpertiseItem[]`

```typescript
{
  slug: string                    // URL slug (e.g., 'account-based-marketing')
  title: string                   // Display title
  description?: string            // Short description
  positioning?: string            // Positioning statement
  challenges?: string[]           // Challenge bullets
  modern_plays?: string[]         // Modern play solutions
  proof?: {                       // Proof example
    company?: string
    role?: string
    outcome: string
    metrics?: string
  }
  pillar?: 'content-engagement' | 'demand-growth' | 'strategy-insights' | 'systems-operations'
  pillarLabel?: string            // Human-readable pillar name
  tags?: string[]                 // Category tags
  icon?: string                   // Icon name
  featured?: boolean              // Featured display
  order?: number                  // Sort order
  relevant_expertise_slugs?: string[]    // Related expertise
  relevant_case_study_slugs?: string[]   // Related case studies
}
```

**Available Pillars:**
- `content-engagement` - Content & Engagement
- `demand-growth` - Demand & Growth  
- `strategy-insights` - Strategy & Insights
- `systems-operations` - Systems & Operations

**Example:**

```typescript
export const expertiseItems: ExpertiseItem[] = [
  {
    slug: 'account-based-marketing-abm',
    title: 'Account-Based Marketing (ABM)',
    description: 'ABM frameworks that scale...',
    positioning: 'Designing precision GTM systems...',
    challenges: [
      'Traditional demand programs focus on volume...',
      'Sales and Marketing often lack alignment...',
    ],
    modern_plays: [
      'ABM Operating System: Establishing tiering models...',
      'Multithreaded Engagement: Designing plays...',
    ],
    proof: {
      company: 'PRGX Global',
      role: 'Director of Digital Marketing & ABM',
      outcome: 'Launched the company\'s first unified ABM system...',
      metrics: '87% YoY pipeline growth; 180% lift in MQL→SQL',
    },
    pillar: 'strategy-insights',
    pillarLabel: 'Strategy & Insights',
    tags: ['ABM', 'Account-Based', '6Sense', 'Demandbase'],
    icon: 'Building2',
    featured: true,
    order: 1,
    relevant_expertise_slugs: ['demand-generation', 'sales-enablement-alignment'],
    relevant_case_study_slugs: ['abm-system-launch-prgx'],
  },
  // ... more expertise items
]
```

---

### 3. Case Studies (`CaseStudyItem`)

**File:** `content/case-studies.ts`  
**Export:** `export const caseStudyItems: CaseStudyItem[]`

```typescript
{
  slug: string                    // URL slug
  title: string                   // Display title
  client: string                  // Client company name
  description: string             // Brief summary
  challenge: string               // Challenge description (long)
  solution: string                // Solution description (long)
  results: string[]               // Result bullet points
  tags: string[]                  // Category tags
  industry: string                // Industry slug reference
  expertise: string[]             // Related expertise slugs
  metrics: Array<{                // Key metrics
    label: string
    value: string
    change?: string
  }>
  featured?: boolean              // Featured display
  year: string                    // Year completed
}
```

**Example:**

```typescript
export const caseStudyItems: CaseStudyItem[] = [
  {
    slug: 'abm-system-launch-prgx',
    title: 'ABM System Launch',
    client: 'PRGX Global',
    description: 'Built PRGX\'s first fully unified ABM system...',
    challenge: 'PRGX had no formal ABM program, playbooks...',
    solution: 'ABM Operating System: Designed a unified strategy...',
    results: [
      'Launched a scalable ABM engine...',
      '87% YoY pipeline growth',
      '180% lift in MQL→SQL conversion',
    ],
    tags: ['ABM', 'Enterprise GTM', 'Sales Alignment'],
    industry: 'financial-services',
    expertise: [
      'account-based-marketing',
      'marketing-operations',
      'demand-generation',
    ],
    metrics: [
      { label: 'Pipeline Growth', value: '87%', change: 'YoY' },
      { label: 'MQL→SQL Lift', value: '180%', change: 'Lift' },
    ],
    featured: true,
    year: '2024',
  },
  // ... more case studies
]
```

---

### 4. Template-Specific Content

#### Home Page (`HomeTemplateContent`)

**File:** `content/home.ts`  
**Export:** `export const HOME_CONTENT: HomeTemplateContent`

```typescript
{
  hero: {
    badge: string
    titleStart: string
    titleGradient: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
  }
  stats: Array<{
    value: string
    label: string
  }>
  methodology: {
    title: string
    description: string
    steps: Array<{
      number: string
      icon: string
      title: string
      description: string
      progress: string
    }>
  }
  expertise: {
    title: string
    items: Array<{
      icon: string
      title: string
      description: string
      tags: string[]
    }>
  }
  quote: {
    text: string
    highlight: string
  }
  caseStudies: {
    title: string
    subtitle: string
    items: Array<{ ... }>
  }
}
```

#### About Page

**File:** `content/about.ts`  
**Export:** `export const ABOUT_CONTENT: HomeTemplateContent`

Uses the same `HomeTemplateContent` type as home page but with different content values.

---

## Full Project Content Map

| Page/Route | Content Type | Primary File | Pattern | Notes |
|------------|--------------|--------------|---------|-------|
| `/industries/[slug]` | Industry details | `content/industries.ts` | Centralized array | Single file with all industries |
| `/expertise/[slug]` | Expertise details | `content/expertise.ts` | Centralized array | Single file with all expertise |
| `/case-studies/[slug]` | Case study details | `content/case-studies.ts` | Centralized array | Single file with all case studies |
| `/` | Home page | `content/home.ts` | Template content | Specific to HomeTemplate |
| `/about` | About page | `content/about.ts` | Template content | Specific to HomeTemplate |
| `/contact` | Contact page | `content/contact.ts` | Template content | Contact-specific |
| `/resume` | Resume page | `content/resume.ts` | Template content | Resume-specific |
| `/expertise` | Expertise pillars | `content/expertiseHeroConfigs.ts` | Hero configs | Pillar landing pages |

---

## How to Add New Content

### Adding a New Industry

1. Open `content/industries.ts`
2. Add a new object to the `industryItems` array:

```typescript
export const industryItems: IndustryItem[] = [
  // ... existing industries
  {
    slug: 'your-new-industry',
    title: 'Your New Industry',
    description: 'Short description here',
    longDescription: 'Extended description here',
    tags: ['Tag1', 'Tag2'],
    icon: 'IconName',
    stats: [
      { label: 'Stat Label', value: '50+' },
    ],
    featured: false,
  },
]
```

3. The route `/industries/your-new-industry` will automatically be available
4. Ensure the slug is unique and URL-friendly

### Adding a New Expertise Item

1. Open `content/expertise.ts`
2. Add a new object to the `expertiseItems` array
3. Choose appropriate `pillar` value from available options
4. Link related content using `relevant_expertise_slugs` and `relevant_case_study_slugs`

### Adding a New Case Study

1. Open `content/case-studies.ts`
2. Add a new object to the `caseStudyItems` array
3. Reference existing slugs in `industry` and `expertise` fields for proper linking
4. Include at least 2-3 metrics for the metrics display

---

## Scaling Recommendations

### For Adding 20–100+ Industries (or any content type)

#### ✅ Recommended: Keep Centralized File (Current Approach)

**Pros:**
- Simple to manage
- Single source of truth
- Easy to search and find
- No import complexity
- Better for small-to-medium scale (under 200 items)

**Best Practices:**
```typescript
// content/industries.ts

// === FINANCIAL SERVICES ===
export const industryItems: IndustryItem[] = [
  { slug: 'banking', title: 'Banking', ... },
  { slug: 'insurance', title: 'Insurance', ... },
  { slug: 'fintech', title: 'Fintech', ... },
  
  // === HEALTHCARE & LIFE SCIENCES ===
  { slug: 'healthcare', title: 'Healthcare', ... },
  { slug: 'pharma', title: 'Pharmaceutical', ... },
  
  // === TECHNOLOGY ===
  { slug: 'b2b-saas', title: 'B2B SaaS', ... },
  { slug: 'enterprise-software', title: 'Enterprise Software', ... },
  // ... continue
]
```

#### 🔄 Alternative: Modular Approach (for 200+ items)

If the centralized file becomes unwieldy (200+ items), consider splitting:

```typescript
// content/industries/financial.ts
export const financialIndustries: IndustryItem[] = [ ... ]

// content/industries/healthcare.ts
export const healthcareIndustries: IndustryItem[] = [ ... ]

// content/industries/index.ts
export const industryItems: IndustryItem[] = [
  ...financialIndustries,
  ...healthcareIndustries,
  // ... etc
]
```

Then update imports in pages to use the index file.

### Using a Generator Script

For bulk additions, create a generator script:

```typescript
// scripts/generate-industries.ts
import fs from 'fs'
import industriesCSV from './data/industries.csv'

const items = industriesCSV.map(row => ({
  slug: row.slug,
  title: row.title,
  description: row.description,
  // ... map all fields
}))

const output = `
import { IndustryItem } from '@/lib/types'

export const industryItems: IndustryItem[] = ${JSON.stringify(items, null, 2)}
`

fs.writeFileSync('content/industries.ts', output)
```

### Merge Conflict Prevention

For teams with multiple contributors:

1. **Add new items at the end** of the array, not the middle
2. **Use Git merge strategies**: Consider adding `.gitattributes` rules
3. **Coordinate timing**: Have one person handle bulk additions
4. **Use feature branches**: Work in separate branches and merge carefully

---

## Type Definitions Reference

All content types are defined in **`lib/types.ts`**. When adding new fields:

1. Update the interface in `lib/types.ts`
2. Add the field to content files
3. Update consuming components to handle the new field

### Key Type Exports

- `IndustryItem` - Industry content structure
- `ExpertiseItem` - Expertise content structure
- `CaseStudyItem` - Case study content structure
- `HomeTemplateContent` - Home/About page templates
- `Pillar` - Expertise pillar definitions

### Pillar Constants

The four expertise pillars are defined in `lib/types.ts`:

```typescript
export const PILLARS: Pillar[] = [
  { id: 'content-engagement', ... },
  { id: 'demand-growth', ... },
  { id: 'strategy-insights', ... },
  { id: 'systems-operations', ... },
]
```

---

## Questions or Issues?

If you need to:
- **Add a new content type**: Create a new interface in `lib/types.ts` and a new content file
- **Change field structure**: Update the interface in `lib/types.ts` first
- **Migrate to modular structure**: Follow the Alternative approach in Scaling Recommendations
- **Bulk import content**: Create a generator script as shown above

---

**Document Version:** 1.0  
**Last Updated:** February 28, 2026  
**Maintainer:** Development Team
