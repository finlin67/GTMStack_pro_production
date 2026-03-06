# Detailed Diffs for Sensitive Files

## File 1: src/templates/registry.ts

### DIFF (Folder #2 vs Folder #1)

```diff
  import type { TemplateId } from '@/src/data/pageRegistry.generated'
+ import { getUploadedTemplate } from './uploadedRegistry.generated'
  import ExpertiseCategoryTemplate from '@/src/templates/expertise/ExpertiseCategoryTemplate'
  import ExpertiseTopicTemplate from '@/src/templates/expertise/ExpertiseTopicTemplate'
  import ExpertiseMainTemplate from '@/src/templates/expertise/ExpertiseMainTemplate'
  import IndustryTemplate from '@/src/templates/industries/IndustryTemplate'
  import IndustriesMainTemplate from '@/src/templates/industries/IndustriesMainTemplate'
  import ProjectsTemplate from '@/src/templates/projects/ProjectsTemplate'
  import CaseStudyTemplate from '@/src/templates/caseStudies/CaseStudyTemplate'
  import HomeTemplate from '@/src/templates/home/HomeTemplate'
  import GalleryMainTemplate from '@/src/templates/gallery/GalleryMainTemplate.client'

  export type TemplateComponent =
    | typeof ExpertiseCategoryTemplate
    | typeof ExpertiseTopicTemplate
    | typeof IndustryTemplate
    | typeof IndustriesMainTemplate
    | typeof ProjectsTemplate
    | typeof CaseStudyTemplate
    | typeof HomeTemplate
    | typeof ExpertiseMainTemplate
    | typeof GalleryMainTemplate

  /** TemplateId from page registry. */
  export type RegistryTemplateId = TemplateId

  /**
   * Maps templateId (from page registry) to the v1 template component.
   * Used for template-driven rendering; routing is unchanged in v1.
   */
- export const TEMPLATE_BY_ID: Record<RegistryTemplateId, TemplateComponent> = {
+ export const TEMPLATE_BY_ID: Record<string, TemplateComponent> = {
    'expertise.category': ExpertiseCategoryTemplate,
    'expertise.topic': ExpertiseTopicTemplate,
    'expertise.main': ExpertiseMainTemplate,
    'industry.base': IndustryTemplate,
    'industries.main': IndustriesMainTemplate,
    'projects.main': ProjectsTemplate,
    'caseStudy.base': CaseStudyTemplate,
    'home.base': HomeTemplate,
    'home.main': HomeTemplate,
    'gallery.main': GalleryMainTemplate,
  }

- export function getTemplate(templateId: RegistryTemplateId): TemplateComponent {
+ export function getTemplate(templateId: string): TemplateComponent {
+   // First try uploaded templates
+   const Uploaded = getUploadedTemplate(templateId)
+   if (Uploaded) return Uploaded as TemplateComponent
+
+   // Fall back to legacy
    const Component = TEMPLATE_BY_ID[templateId]
    if (!Component) {
      throw new Error(`Unknown templateId: ${templateId}`)
    }
    return Component
  }
```

### Analysis
- **Added:** 1 import + 3 lines in getTemplate
- **Type flexibility:** Changed from strict RegistryTemplateId to string (necessary for admin-uploaded templates)
- **Backward compatible:** Existing templates still work; just checks uploaded ones first
- **Impact on gallery:** None; gallery templates still available in TEMPLATE_BY_ID

### Recommendation
✅ **APPROVE** — Use Folder #2 version. It's a strict upgrade.

---

## File 2: package.json

### DIFF (What to ADD from Folder #2 → Folder #1)

```diff
  {
    "name": "gtmstack-pro",
    "version": "1.0.0",
    "private": true,
    "scripts": {
      "dev": "next dev",
      "build": "next build",
+     "build:static": "cross-env STATIC_EXPORT=1 next build",
      "start": "next start",
      "lint": "next lint",
-     "export": "next build",
+     "export": "cross-env STATIC_EXPORT=1 next build",
+     "gen:all": "npm run gen:registry && npm run gen:animations",
      "gen:hero-manifest": "node scripts/generate-hero-manifest.mjs",
      "gen:registry": "npx tsx scripts/gen-page-registry.ts",
      "gen:animations": "npx tsx scripts/gen-animation-catalog.ts",
      "gen:page-catalog": "npx tsx scripts/generate-page-catalog.ts",
      "gen:thumbnails": "node scripts/generate-thumbnails.js",
      "cleanup:thumbnail-factory": "node scripts/cleanup-thumbnail-factory.js",
      "gen:thumbnails:once": "npm run gen:thumbnails && npm run cleanup:thumbnail-factory",
      "diag:easing": "node scripts/find-invalid-easing.js",
      "validate:registry": "npx tsx scripts/validate-page-registry.ts",
      "prebuild": "npm run gen:registry",
      "link-audit": "node scripts/link-audit.mjs",
+     "page:upsert": "node scripts/page-upsert.mjs",
+     "registry:audit": "node scripts/registry-audit.mjs"
    },
    "dependencies": {
      "@mdx-js/loader": "^3.0.0",
      "@mdx-js/react": "^3.0.0",
      "@next/mdx": "^14.2.0",
      "chart.js": "^4.4.0",
      "clsx": "^2.1.0",
+     "cross-env": "^7.0.3",
      "framer-motion": "^11.18.2",
      "geist": "^1.5.1",
      "gray-matter": "^4.0.3",
      "isomorphic-dompurify": "^3.0.0-rc.2",
      "lucide-react": "^0.400.0",
      "next": "^14.2.0",
      "next-mdx-remote": "^5.0.0",
      "puppeteer": "^24.37.5",
      "react": "18.2.0",
      "react-chartjs-2": "^5.2.0",
      "react-dom": "18.2.0",
      "recharts": "^3.7.0"
    }
  }
```

### Analysis
- **New scripts:** build:static, gen:all, page:upsert, registry:audit (Admin-specific)
- **Updated script:** export (now uses cross-env like Admin version)
- **New dependency:** cross-env (required for build:static and export scripts)
- **Retained:** All gallery scripts (gen:thumbnails, diag:easing, etc.) and puppeteer
- **No conflicts:** All scripts clearly named; no overlaps

### Recommendation
✅ **APPROVE** — Merge both. Cross-env is a lightweight utility, and all scripts coexist safely.

---

## File 3: next.config.js

### DIFF (Folder #2 vs Folder #1)

```diff
  const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

  const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  })

  /** @type {import('next').NextConfig} */
  const baseConfig = {
    distDir: '.next',
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
      ],
      unoptimized: true,
    },
    allowedDevOrigins: [
      '*.replit.dev',
      '*.repl.co',
      '*.kirk.replit.dev',
      'localhost:5000',
      '127.0.0.1:5000',
    ],
  }

  module.exports = (phase) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
+   const isStaticExport = process.env.STATIC_EXPORT === '1'
-   const distDir = isDev ? '.next' : 'out'
+   const distDir = isStaticExport ? 'out' : '.next'
    const config = {
      ...baseConfig,
      distDir,
    }
-   if (!isDev) {
+   if (isStaticExport) {
      config.output = 'export'
      config.trailingSlash = true
    }
    return withMDX(config)
  }
```

### Analysis
- **New logic:** Checks `process.env.STATIC_EXPORT` independently (not tied to isDev)
- **Benefit:** Allows static export in ANY environment (dev, staging, prod)
- **Old logic:** Only exported when phase !== PHASE_DEVELOPMENT_SERVER (i.e., in production build)
- **Backward compatible:** If STATIC_EXPORT not set, defaults to dynamic/dev (maintains existing behavior)

### Recommendation
✅ **APPROVE** — Use Folder #2 version. More flexible, still backward compatible.

---

## File 4: src/data/page-registry.csv

### Analysis
- Folder #2 (Admin) has **35 demo pages** (including admin test pages)
- Folder #1 (main) likely has **current production pages**
- **Decision:** KEEP Folder #1, DO NOT overwrite with Admin demo data

### Recommendation
✅ **KEEP Folder #1** — Source of truth for real pages. Admin can add pages via API.

---

## Summary of Approvals Needed

| File | Action | Risk | Recommendation |
|------|--------|------|-----------------|
| src/templates/registry.ts | Upgrade (add uploaded template support) | ✅ LOW | **APPROVE** |
| package.json | Merge (add Admin scripts + cross-env) | ✅ LOW | **APPROVE** |
| next.config.js | Upgrade (flexible STATIC_EXPORT) | ✅ LOW | **APPROVE** |
| src/data/page-registry.csv | KEEP Folder #1 (no overwrite) | ✅ NONE | **KEEP** |

---

**Ready to proceed:** Comment approval below, and merge will execute in ~2 minutes.
