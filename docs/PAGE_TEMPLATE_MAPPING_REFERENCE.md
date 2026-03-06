# Complete Page & Template Mapping Reference

**Source of Truth**: `src/data/page-registry.csv`  
**Generated File**: `src/data/pageRegistry.generated.ts`  
**Last Updated**: March 1, 2026

This document shows **every single page/route** in the project, its template mapping, and content key.

---

## Quick Summary

| Total Pages | Mapped to Templates | Templates Used |
|-------------|-------------------|-----------------|
| 34 | 34/34 ✅ | 10 unique templates |

---

## All Pages Mapped by Section

### 🏠 Home & Core Pages

| Route | Page Title | Template | Content Key | Theme | Data Source | Notes |
|-------|-----------|----------|-------------|-------|-------------|-------|
| `/` | Home | `home.main` | `home:main` | default | `content/home.ts` | Main landing page |
| `/about` | About GTM Stack | `home.main` | `about:main` | dark | `content/about.ts` | About page |
| `/contact` | Contact Us | `home.main` | `contact:main` | light | `content/contact.ts` | Contact form |
| `/resume` | Resume | `home.main` | `resume:main` | light | `content/resume.ts` | Resume/CV page |

---

### 🎯 Expertise Section

#### Main & Pillars
| Route | Page Title | Template | Content Key | Theme | Data Source | Notes |
|-------|-----------|----------|-------------|-------|-------------|-------|
| `/expertise` | Expertise | `expertise.main` | `expertise:main` | dark | `content/expertise/main.ts` | Main expertise landing |
| `/expertise/content-engagement` | Content & Engagement | `Uploaded_Expertise_ContentEngagement_v1` | `default:content` | dark | `content/expertise.ts` | **Custom Template** - Pillar |
| `/expertise/demand-growth` | Demand & Growth | `Uploaded_Expertise_DemandGrowth_v1` | `pillar:demand-growth` | dark | `content/expertise.ts` | **Custom Template** - Pillar |
| `/expertise/strategy-insights` | Strategy & Insights | `expertise.category` | `pillar:strategy-insights` | dark | `content/expertise.ts` | Category/Pillar |
| `/expertise/systems-operations` | Systems & Operations | `expertise.category` | `pillar:systems-operations` | dark | `content/expertise.ts` | Category/Pillar |

#### Detail Topics
| Route | Page Title | Template | Content Key | Theme | Data Source | Notes |
|-------|-----------|----------|-------------|-------|-------------|-------|
| `/expertise/analytics` | Analytics & Insights | `expertise.topic` | `expertise:marketing-analytics-reporting` | dark | `content/expertise.ts` | Topic detail |
| `/expertise/automation` | Marketing Automation | `expertise.topic` | `expertise:marketing-automation` | dark | `content/expertise.ts` | Topic detail |
| `/expertise/optimization` | Revenue Optimization | `expertise.topic` | `expertise:revenue-operations` | dark | `content/expertise.ts` | Topic detail |
| `/expertise/strategy` | GTM Strategy | `expertise.topic` | `expertise:gtm-strategy-development` | dark | `content/expertise.ts` | Topic detail |
| `/expertise/demand-generation` | Demand Generation | `expertise.category` | `expertise:demand-generation` | dark | `content/expertise.ts` | Category/Topic (main pillar sub) |

---

### 🏭 Industries Section

#### Main
| Route | Page Title | Template | Content Key | Theme | Data Source | Notes |
|-------|-----------|----------|-------------|-------|-------------|-------|
| `/industries` | Architecting Growth by Industry | `Uploaded_Industries_v1` | `industries:main` | dark | `content/industries/main.ts` | **Custom Template** - Main landing |

#### Industry Details
| Route | Page Title | Template | Content Key | Theme | Data Source | Notes |
|-------|-----------|----------|-------------|-------|-------------|-------|
| `/industries/b2b-saas` | B2B SaaS | `industry.base` | `industries:b2b-saas` | light | `content/industries.ts` | Industry detail |
| `/industries/financial-services` | Financial Services | `industry.base` | `industries:financial-services` | light | `content/industries.ts` | Industry detail |
| `/industries/fleet-management-logistics` | Fleet & Logistics | `industry.base` | `industries:fleet-management-logistics` | dark | `content/industries.ts` | Industry detail |
| `/industries/healthcare` | Healthcare & Health Technology | `industry.base` | `industries:healthcare` | light | `content/industries.ts` | Industry detail |
| `/industries/manufacturing` | Manufacturing | `industry.base` | `industries:manufacturing` | dark | `content/industries.ts` | Industry detail |
| `/industries/pubsec-government` | Public Sector & Gov | `industry.base` | `industries:pubsec-government` | dark | `content/industries.ts` | Industry detail |
| `/industries/retail` | Retail & Consumer | `industry.base` | `industries:retail` | dark | `content/industries.ts` | Industry detail |
| `/industries/retail-ecommerce` | Retail & E-commerce | `industry.base` | `industries:retail` | dark | `content/industries.ts` | Maps to same content as `/industries/retail` |

---

### 🛠️ Services Section

| Route | Page Title | Template | Content Key | Theme | Data Source | Notes |
|-------|-----------|----------|-------------|-------|-------------|-------|
| `/services/content-marketing` | Content Marketing | `expertise.topic` | `expertise:content-engagement` | dark | `content/expertise.ts` | Service detail |
| `/services/demand-generation` | Demand Generation | `expertise.topic` | `expertise:demand-generation` | dark | `content/expertise.ts` | Service detail |
| `/services/paid-advertising` | Paid Advertising | `expertise.topic` | `expertise:digital-marketing` | dark | `content/expertise.ts` | Service detail |
| `/services/seo` | SEO & Organic | `expertise.topic` | `expertise:digital-marketing` | dark | `content/expertise.ts` | Service detail |
| `/services/social-media` | Social Media | `expertise.topic` | `expertise:digital-marketing` | dark | `content/expertise.ts` | Service detail |
| `/services/video-creative` | Video & Creative | `expertise.topic` | `expertise:digital-marketing` | dark | `content/expertise.ts` | Service detail |

---

### 📚 Other Sections

| Route | Page Title | Template | Content Key | Theme | Data Source | Notes |
|-------|-----------|----------|-------------|-------|-------------|-------|
| `/gallery` | Animation Gallery | `gallery.main` | `gallery:main` | dark | `content/gallery/main.ts` | Animation showcase |
| `/projects` | Projects | `projects.main` | `projects:main` | dark | `content/projects/main.ts` | Portfolio/projects |
| `/case-studies` | Case Studies | `home.main` | `home:main` | dark | `content/case-studies.ts` | Case studies landing |
| `/case-studies/event-to-store-lift-retail` | Event-to-Store Revenue Lift | `caseStudy.base` | `case-studies:event-to-store-lift-retail` | dark | `content/case-studies.ts` | Case study detail |
| `/p/test` | Test CMS Page | `home.main` | `home:main` | dark | `content/home.ts` | Test/CMS page |

---

## Template Definitions

### Standard Templates

| Template ID | Type | Purpose | Usage |
|------------|------|---------|-------|
| `home.main` | Standard | Generic content pages (home, about, contact, etc.) | 5 pages |
| `expertise.main` | Standard | Main expertise landing page | 1 page |
| `expertise.category` | Standard | Expertise category/pillar pages | 4 pages |
| `expertise.topic` | Standard | Expertise detail/topic pages | 8 pages |
| `industry.base` | Standard | Industry detail pages | 8 pages |
| `industries.main` | Standard | Industry main landing | Used by custom template |
| `gallery.main` | Standard | Animation gallery display | 1 page |
| `projects.main` | Standard | Projects portfolio | 1 page |
| `caseStudy.base` | Standard | Case study detail pages | 1 page |

### Custom Templates (Uploaded)

| Template ID | Purpose | Mapped Routes | Notes |
|------------|---------|---------------|-------|
| `Uploaded_Expertise_ContentEngagement_v1` | Content & Engagement pillar | `/expertise/content-engagement` | Custom pillar layout |
| `Uploaded_Expertise_DemandGrowth_v1` | Demand & Growth pillar | `/expertise/demand-growth` | Custom pillar layout |
| `Uploaded_Industries_v1` | Industries main landing | `/industries` | Custom industries overview |

---

## Data Source Files

### Content Files Used

| File | Contains | Mapped Routes | Example Keys |
|------|----------|---------------|--------------|
| `content/home.ts` | Home page content | `/`, `/p/test` | `home:main` |
| `content/about.ts` | About page content | `/about` | `about:main` |
| `content/contact.ts` | Contact form content | `/contact` | `contact:main` |
| `content/resume.ts` | Resume content | `/resume` | `resume:main` |
| `content/expertise/main.ts` | Expertise landing | `/expertise` | `expertise:main` |
| `content/expertise.ts` | Expertise details | All `/expertise/*` routes | `expertise:*` |
| `content/industries/main.ts` | Industries landing | `/industries` | `industries:main` |
| `content/industries.ts` | Industry details | All `/industries/*` routes | `industries:*` |
| `content/gallery/main.ts` | Gallery landing | `/gallery` | `gallery:main` |
| `content/projects/main.ts` | Projects content | `/projects` | `projects:main` |
| `content/case-studies.ts` | Case studies | `/case-studies*` | `case-studies:*` |

---

## Theme Assignments

### Dark Theme (19 pages)
```
/about, /expertise, /expertise/analytics, /expertise/automation,
/expertise/content-engagement, /expertise/demand-generation,
/expertise/demand-growth, /expertise/optimization, /expertise/strategy,
/expertise/strategy-insights, /expertise/systems-operations,
/gallery, /industries, /industries/fleet-management-logistics,
/industries/manufacturing, /industries/pubsec-government,
/industries/retail, /industries/retail-ecommerce, /p/test,
/projects, /case-studies, /services/*, all 6 services
```

### Light Theme (4 pages)
```
/contact, /resume, /industries/b2b-saas, /industries/financial-services,
/industries/healthcare
```

### Default/Unspecified (1 page)
```
/
```

---

## Content Key Mapping

### How Content Keys Work

A content key has format: `namespace:identifier`

**Examples**:
- `home:main` → Looks up in `HOME_CONTENT` from `content/home.ts`
- `expertise:demand-generation` → Looks up in `expertiseItems` array, finds item with slug `'demand-generation'`
- `industries:b2b-saas` → Looks up in `industryItems` array, finds item with slug `'b2b-saas'`
- `case-studies:event-to-store-lift-retail` → Looks up in `caseStudyItems` array

### Unique Content Keys in Use

**Home/Static**:
- `home:main`, `about:main`, `contact:main`, `resume:main`, `gallery:main`, `projects:main`

**Expertise** (Dynamic - from array):
- `expertise:main`, `expertise:demand-generation`, `expertise:marketing-analytics-reporting`, `expertise:marketing-automation`, `expertise:revenue-operations`, `expertise:gtm-strategy-development`, `expertise:content-engagement`, `expertise:digital-marketing`
- `pillar:demand-growth`, `pillar:strategy-insights`, `pillar:systems-operations`
- `default:content` (custom template for content-engagement)

**Industries** (Dynamic - from array):
- `industries:main`, `industries:b2b-saas`, `industries:financial-services`, `industries:fleet-management-logistics`, `industries:healthcare`, `industries:manufacturing`, `industries:pubsec-government`, `industries:retail`

**Case Studies** (Dynamic - from array):
- `case-studies:event-to-store-lift-retail`

---

## Routing Architecture Overview

```
User Request (e.g., /expertise/demand-generation)
        ↓
app/[[...slug]]/page.tsx (Catch-all route)
        ↓
Builds route and looks up in PAGE_BY_ROUTE
        ↓
Finds PageRegistryRow:
  {
    route: '/expertise/demand-generation',
    templateId: 'expertise.category',
    contentKey: 'expertise:demand-generation',
    pageTitle: 'Demand Generation',
    theme: 'dark',
    fileRef: 'content/expertise.ts'
  }
        ↓
RegistryRenderer.tsx:
  - getTemplate('expertise.category') → ExpertiseCategoryTemplate
  - getContentByKey('expertise:demand-generation') → ExpertiseItem
        ↓
Renders: <ExpertiseCategoryTemplate content={expertiseItem} />
```

---

## Remapping Guidelines

### To Change a Page's Template

**Before**:
```csv
/expertise/demand-generation,content/expertise.ts,Demand Generation,expertise.category,expertise:demand-generation,dark,
```

**After**:
```csv
/expertise/demand-generation,content/expertise.ts,Demand Generation,expertise.topic,expertise:demand-generation,dark,
```

**Then**: Run `npm run gen:registry` to regenerate `pageRegistry.generated.ts`

### To Change a Page's Content Key

**Before**:
```csv
/services/paid-advertising,content/expertise.ts,Paid Advertising,expertise.topic,expertise:digital-marketing,dark,
```

**After**:
```csv
/services/paid-advertising,content/expertise.ts,Paid Advertising,expertise.topic,expertise:paid-advertising,dark,
```

**Ensure**: The content key exists in your content file (in this case, `expertiseItems` must have `slug: 'paid-advertising'`)

### To Add a New Page

1. Add row to CSV:
```csv
/your-new-route,content/file.ts,Your Page Title,template.id,content:key,dark,
```

2. Run: `npm run gen:registry`

3. Ensure content file (`content/file.ts`) has the data for that key

---

## Validation Checklist

Before remapping pages, verify:

- [ ] Route is unique (no duplicates)
- [ ] Template ID exists and is defined
- [ ] Content key is resolvable (exists in the referenced content file)
- [ ] Page title is descriptive
- [ ] Theme choice matches page purpose
- [ ] File reference points to correct content file
- [ ] After changes, run `npm run gen:registry`
- [ ] Test the page renders correctly
- [ ] Check browser console for any errors

---

## Quick Access for Specific Sections

### Just Expertise Pages
Filter route column for `/expertise/`
- Main: `/expertise` (expertise.main)
- Pillars: content-engagement, demand-growth, strategy-insights, systems-operations
- Topics: analytics, automation, demand-generation, optimization, strategy

### Just Industry Pages
Filter route column for `/industries/`
- Main: `/industries` (Uploaded_Industries_v1)
- Details: b2b-saas, financial-services, fleet-management-logistics, healthcare, manufacturing, pubsec-government, retail

### Just Service Pages
Filter route column for `/services/`
- All use `expertise.topic` template
- Map to various expertise content keys

---

## Notes

- **Custom Templates**: Three routes use custom uploaded templates (`Uploaded_*`). These may have different behavior than standard templates.
- **Content Key Aliases**: Some routes like `/industries/retail` and `/industries/retail-ecommerce` map to the same content key `industries:retail` (intentional alias).
- **Generated File**: `pageRegistry.generated.ts` is auto-generated from the CSV. Never edit it manually.
- **Blog Pages**: Blog routes (`/blog/*`) are handled separately by filesystem routing in `app/blog/`, not by the registry.
- **Admin Pages**: Admin routes (`/admin/*`) are handled separately by `app/admin/`, not by the registry.

---

**For Detailed Remapping Instructions**: See [CONTENT_MANAGEMENT_GUIDE.md](./CONTENT_MANAGEMENT_GUIDE.md) and [MIGRATION-REGISTRY-ROUTING.md](./MIGRATION-REGISTRY-ROUTING.md)
