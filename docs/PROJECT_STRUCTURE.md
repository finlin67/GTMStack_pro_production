# Project Architecture

**Project**: GTMStack Pro  
**Description**: A production-ready marketing and portfolio site built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and MDX.  
**Repository**: https://github.com/finlin67/z1_GTMStack_pro

---

## Table of Contents

1. [Folder Structure](#folder-structure)
2. [Route Architecture](#route-architecture)
3. [Configuration Files](#configuration-files)
4. [Technology Stack](#technology-stack)
5. [Build & Deployment Scripts](#build--deployment-scripts)

---

## Folder Structure

### Root Level Directories

| Directory | Purpose |
|-----------|---------|
| **`app/`** | Next.js App Router - Contains all page routes, layouts, API endpoints, and dynamic route handlers. Main application structure. |
| **`src/`** | Source code for components, templates, content, utilities, and data management. Organized by feature/concern. |
| **`components/`** | React components organized by domain (admin, animations, expertise, gallery, industries, layout, motion, sections, ui, visuals). |
| **`lib/`** | Shared library code - utilities, authentication, content adapters, hero visual management, WordPress integration, type definitions. |
| **`content/`** | Markdown and TypeScript content files for pages, expertise areas, industries, case studies, projects. Source of truth for page content. |
| **`public/`** | Static assets - images, logos, Lottie animations, SVG motifs, sitemaps, animation thumbnails. Served directly by Next.js. |
| **`scripts/`** | Build-time and development scripts (Node.js, TypeScript, ESM) for code generation, registry validation, thumbnails, link audits. |
| **`docs/`** | Documentation files including architecture, guides, and technical specifications. |
| **`.github/`** | GitHub-specific configurations (workflows, CI/CD). |
| **`.husky/`** | Git hooks configuration for pre-commit and pre-push automation (linting, formatting). |
| **`.vscode/`** | VS Code workspace settings and recommended extensions. |
| **`reports/`** | Generated reports from audits and validation tools. |
| **`sandbox/`** | Development sandbox folder (usually isolated from main codebase). |
| **`handoff/`** | Documentation and files for project handoff/transfer. |

---

## App Structure (app/ directory)

The `app/` directory follows Next.js 14 App Router conventions:

### Core Layout
```
app/
├── layout.tsx                 # Root layout with Navbar, Footer, globals.css
├── not-found.tsx             # Custom 404 page
├── sitemap.ts                # Dynamic XML sitemap generation
├── globals.css               # Global styles
└── [[...slug]]/
    └── page.tsx              # Catch-all dynamic route handler (registry-driven)
```

### API Routes
```
app/api/
├── admin/                    # Admin-protected endpoints (requires authentication)
│   ├── login/route.ts        # POST - Admin authentication
│   ├── publish-expertise/route.ts
│   ├── publish-industry/route.ts
│   ├── publish-case-study/route.ts
│   ├── write-file/route.ts   # Generic file writing (restricted paths)
│   ├── write-expertise-content/route.ts
│   ├── templates/route.ts    # Template registry management
│   ├── templates/upload/route.ts
│   ├── upload/route.ts       # File uploads
│   ├── find-page/route.ts    # Search page registry
│   ├── pages/route.ts        # List all filesystem routes
│   ├── slugs/route.ts        # Extract content slugs
│   ├── manager/route.ts      # Admin dashboard backend
│   ├── session/route.ts      # Session management
│   ├── registry-audit/route.ts # Validate registry
│   ├── page-upsert/route.ts  # Update page registry
│   ├── run-gen-registry/route.ts # Regenerate registry
│   └── blog/route.ts         # Blog management
├── animations/               # Animation endpoints
│   ├── meta/route.ts         # GET/POST animation metadata
│   ├── gen/route.ts          # Generate animation data
│   └── thumbnail/route.ts    # GET animation thumbnails
└── local/                    # Local-only endpoints (development only)
    └── animations/...        # Local animation endpoints
```

### Feature Routes
```
app/
├── [[...slug]]/              # Registry-driven dynamic routes
├── expertise/
│   ├── page.tsx              # Expertise index
│   ├── [slug]/page.tsx       # Individual expertise pages (dynamic)
│   ├── strategy/page.tsx      # Strategy pillar
│   ├── systems-operations/page.tsx
│   └── strategy-insights/page.tsx
├── industries/
│   ├── page.tsx              # Industries index
│   ├── [slug]/page.tsx       # Individual industry pages (dynamic)
│   ├── retail/page.tsx       # Specific industry pages
│   ├── pubsec-government/page.tsx
│   ├── fleet-management-logistics/page.tsx
│   └── manufacturing/page.tsx
├── case-studies/
│   ├── page.tsx              # Case studies index
│   └── [slug]/page.tsx       # Individual case study pages (dynamic)
├── projects/page.tsx         # Projects index
├── gallery/
│   ├── page.tsx              # Gallery dashboard
│   ├── animations/page.tsx   # Animation gallery
│   └── admin/page.tsx        # Gallery admin
├── services/
│   ├── demand-generation/page.tsx
│   ├── content-marketing/page.tsx
│   ├── seo/page.tsx
│   ├── paid-advertising/page.tsx
│   ├── social-media/page.tsx
│   └── video-creative/page.tsx
├── contact/page.tsx          # Contact page
├── about/page.tsx            # About page
├── resume/page.tsx           # Resume/CV page
├── admin/
│   ├── page.tsx              # Admin dashboard entrance
│   └── translator/page.tsx   # Translation/AI tools
├── tools/
│   └── prompt-builder/page.tsx
├── thumbnail-factory/page.tsx # Dynamic thumbnail generation tool
├── (local)/                  # Local-only group (development)
└── p/                        # CMS test pages
    └── test/page.tsx         # Test page
```

---

## src/ Directory Structure

### Core Organization
```
src/
├── components/               # Reusable React components
│   ├── admin/               # Admin dashboard components
│   ├── animations/          # Animation-related components
│   ├── expertise/           # Expertise page components
│   ├── gallery/             # Gallery components
│   ├── industries/          # Industries page components
│   ├── layout/              # Navbar, Footer, layout wrappers
│   ├── motifs/              # Decorative motifs and visuals
│   ├── motion/              # Framer Motion animated components
│   ├── sections/            # Page section components (hero, cta, etc.)
│   ├── ui/                  # Basic UI components (buttons, cards, etc.)
│   └── visuals/             # Custom visual components
├── content/                 # Content data and adapters
│   ├── registry.ts          # Content lookup registry (maps keys to data)
│   ├── content-engagement.ts # Mapped content for engagement template
│   ├── fallback.ts          # Fallback content
│   └── adapters/            # Content transformation adapters
│       └── expertiseMapper.ts # Maps expertise content to template schemas
├── templates/               # Page template components
│   ├── registry.ts          # Template registry (maps templateId to components)
│   ├── uploadedRegistry.generated.ts # Generated registry of uploaded templates
│   ├── DefaultPage.tsx      # Default/fallback template
│   ├── FallbackTemplate.tsx # Error fallback template
│   ├── home/
│   │   └── HomeTemplate.tsx # Home page template
│   ├── expertise/
│   │   ├── ExpertiseMainTemplate.tsx
│   │   ├── ExpertiseCategoryTemplate.tsx
│   │   ├── ExpertiseTopicTemplate.tsx
│   │   ├── DemandGrowth.tsx
│   │   └── pillars/
│   ├── industries/
│   │   └── IndustryTemplate.tsx
│   ├── caseStudies/
│   │   └── CaseStudyTemplate.tsx
│   ├── gallery/
│   │   └── GalleryMainTemplate.client.tsx
│   ├── projects/
│   │   └── ProjectsTemplate.tsx
│   ├── blog/
│   │   ├── Uploaded_BlogFeed_v1.tsx
│   │   └── Uploaded_BlogSinglePost_v1.tsx
│   ├── staging/             # Staging/experimental templates
│   └── Uploaded_*.tsx       # Dynamically uploaded custom templates
├── data/                    # Generated data files
│   ├── pageRegistry.generated.ts  # Generated from page-registry.csv
│   ├── page-registry.csv    # SOURCE OF TRUTH - defines all routes
│   ├── page-registry.csv.bak
│   ├── pageCatalog.generated.ts
│   ├── animationCatalog.generated.ts
│   ├── animationIds.ts
│   ├── animationMeta.overrides.json
│   └── sitemap.ts           # Sitemap generation
├── lib/                     # Library and utility functions (also in root lib/)
│   ├── content-schemas/     # Zod schemas for content validation
│   │   ├── ExpertiseItem.ts
│   │   ├── IndustryItem.ts
│   │   └── CaseStudyItem.ts
│   └── localOnly.ts         # Local-only endpoint guard
└── staging-templates/       # Experimental/staging templates
```

---

## lib/ Directory (Root Level)

Root-level shared utilities and services:

```
lib/
├── admin-auth.ts           # Admin authentication & token verification
├── route-validation.ts     # Route normalization & validation
├── pageRegistry.ts         # Query helpers for PAGE_REGISTRY
├── localOnlyGuard.ts       # Guard for local-only endpoints
├── types.ts                # TypeScript type definitions
├── utils.ts                # General utility functions
├── sanitize-html.ts        # HTML sanitization functions
├── seededRandom.ts         # Seeded random number generator
├── use-lookup-page.ts      # React hook for page lookup
├── heroVisuals.ts          # Hero visual management
├── heroVisualRegistry.ts   # Registry of hero visual presets
├── heroVisualDefaults.ts   # Default hero visual configurations
├── heroPresets.ts          # Predefined hero presets
├── heroTilePresets.ts      # Hero tile-specific presets
├── hero-visual-map.ts      # Mapping of routes to hero visuals
├── hero-visual-manifest.ts # Hero visual manifest/metadata
├── hero-overlay-map.ts     # Overlay visual mappings
├── gallery-adapter.ts      # Gallery content adaptation
├── galleryGithubMap.ts     # GitHub integration for gallery
├── blog-adapter.ts         # Blog content adaptation
├── blog.ts                 # Blog utilities
├── expertiseMdx.ts         # MDX processing for expertise content
├── ExpertiseMdxComponents.tsx # MDX components for expertise
├── renderCaseStudy.tsx     # Case study rendering utilities
├── wordpress.ts            # WordPress API integration
├── wp-client.ts            # WordPress client configuration
├── wp-media.ts             # WordPress media handling
└── (more utilities as needed)
```

---

## components/ Directory Structure

```
components/
├── admin/                  # Admin dashboard UI
│   ├── AdminPanel.tsx
│   ├── RegistryManager.tsx
│   └── ...
├── animations/             # Animation & motion components
│   ├── AnimatedCard.tsx
│   ├── AnimationGallery.tsx
│   └── ...
├── expertise/              # Expertise page sections
│   ├── ExpertiseCard.tsx
│   ├── ExpertiseHero.tsx
│   └── ...
├── gallery/                # Gallery components
│   ├── GalleryGrid.tsx
│   ├── GalleryModal.tsx
│   └── ...
├── industries/             # Industries page sections
│   ├── IndustryCard.tsx
│   ├── IndustryHero.tsx
│   └── ...
├── layout/                 # Layout components
│   ├── Navbar.tsx         # Main navigation bar
│   ├── Footer.tsx         # Site footer
│   ├── Container.tsx      # Content container wrapper
│   └── ...
├── motifs/                 # Decorative elements
│   ├── GridMotif.tsx
│   ├── PatternMotif.tsx
│   └── ...
├── motion/                 # Framer Motion animations
│   ├── FadeInView.tsx
│   ├── SlideIn.tsx
│   └── ...
├── sections/               # Page section components
│   ├── HeroSection.tsx
│   ├── CTASection.tsx
│   ├── FeaturesSection.tsx
│   └── ...
├── ui/                     # Basic UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── ...
└── visuals/                # Custom visual components
    ├── Chart.tsx
    ├── Timeline.tsx
    └── ...
```

---

## content/ Directory (Root Level)

Content data files - TypeScript modules exporting page content:

```
content/
├── home.ts                          # Home page content
├── about.ts                         # About page content
├── contact.ts                       # Contact page content
├── resume.ts                        # Resume page content
├── case-studies.ts                  # Case studies index + items
├── expertise.ts                     # Expertise areas + items
├── industries.ts                    # Industries + items
├── projects/
│   └── main.ts                      # Projects index
├── expertise/
│   ├── main.ts                      # Expertise index
│   ├── demand-generation.ts
│   ├── demand-growth.ts
│   ├── strategy-insights.ts
│   ├── content-engagement.ts
│   ├── systems-operations.ts
│   ├── account-based-marketing.ts
│   ├── [...more expertise topics...]
│   └── [slug].ts (generated pattern)
├── industries/
│   ├── main.ts                      # Industries index
│   ├── technology-saas.ts
│   ├── cybersecurity.ts
│   ├── [...more industries...]
│   └── [slug].ts (generated pattern)
├── gallery/
│   └── main.ts                      # Gallery content
```

---

## scripts/ Directory

Build-time and development scripts for code generation and validation:

| Script | Type | Purpose |
|--------|------|---------|
| `gen-page-registry.ts` | TypeScript | Generate PAGE_REGISTRY from page-registry.csv |
| `gen-animation-catalog.ts` | TypeScript | Generate animation catalog from source files |
| `gen-page-catalog.ts` | TypeScript | Generate page catalog for indexing |
| `validate-page-registry.ts` | TypeScript | Validate registry consistency |
| `generate-hero-manifest.mjs` | ESM | Generate hero visual manifest metadata |
| `generate-thumbnails.js` | Node.js | Generate animation/page thumbnails using Puppeteer |
| `cleanup-thumbnail-factory.js` | Node.js | Clean up temporary thumbnail files |
| `link-audit.mjs` | ESM | Audit all links in the site |
| `page-upsert.mjs` | ESM | Update or insert page registry entries |
| `registry-audit.mjs` | ESM | Audit registry for inconsistencies |
| `find-invalid-easing.js` | Node.js | Find invalid animation easing functions |
| `fix-with-ollama.mjs` | ESM | AI-assisted code fixes |
| `stylepack.mjs` | ESM | CSS/style processing |

---

## Configuration Files

### Build & Framework Configuration

| File | Purpose |
|------|---------|
| **`next.config.js`** | Next.js configuration - MDX support, image optimization, webpack settings, static export mode |
| **`tsconfig.json`** | TypeScript compiler options - strict mode enabled, path aliases (@/*), ES modules, React JSX |
| **`package.json`** | Node.js dependencies, build scripts, project metadata |
| **`package-lock.json`** | Locked dependency versions for reproducible installs |

### Styling

| File | Purpose |
|------|---------|
| **`tailwind.config.js`** | Tailwind CSS configuration - custom colors, theme extensions, content paths |
| **`tailwind.config.ts`** | TypeScript Tailwind config variant (dual configs for compatibility) |
| **`postcss.config.js`** | PostCSS plugins - Tailwind and Autoprefixer |
| **`app/globals.css`** | Global CSS reset and base styles |

### Code Quality

| File | Purpose |
|------|---------|
| **`.eslintrc.json`** | ESLint configuration - Next.js core rules, import organization, TypeScript support |
| **`.eslintignore`** | Files/patterns to exclude from linting |
| **`qodana.yaml`** | Qodana code analysis configuration |

### Version Control & Automation

| File | Purpose |
|------|---------|
| **`.gitignore`** | Excluded files/folders (.next, node_modules, .env.local, coverage, build artifacts) |
| **`.gitattributes`** | Git line ending normalization settings |
| **`.husky/`** | Git hooks - pre-commit linting, formatting automation |
| **`.lintstagedrc.cjs`** | Lint-staged configuration - run linters on staged files |

### Environment Files

| File | Purpose |
|------|---------|
| **`.env.local`** | Local environment variables (gitignored) - ADMIN_PASSWORD, API keys, feature flags |
| **`.env.example`** | Template for environment variables (if exists) |

### IDE & DX

| File | Purpose |
|------|---------|
| **`.vscode/settings.json`** | VS Code workspace settings |
| **`.vscode/extensions.json`** | Recommended extensions for the project |
| **`.idea/`** | JetBrains IDE settings (if using IntelliJ/WebStorm) |

---

## Technology Stack

### Frontend Framework
- **Next.js 16.1.6** - React 18.2.0 with App Router (file-based routing)
- **React 18.2.0** - UI component library
- **React DOM 18.2.0** - DOM rendering
- **TypeScript 5.4.0** - Static type checking

### Styling & UI
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Tailwind Typography 0.5.0** - Typography plugin for markdown-like content
- **PostCSS 8.4.0** - CSS transformations
- **Autoprefixer 10.4.0** - Vendor prefix automation
- **Geist 1.5.1** - Vercel's font system (sans & mono)

### Content & Markdown
- **Next MDX 14.2.0** - MDX support for Next.js
- **MDX JS Loader 3.0.0** - MDX loader
- **MDX React 3.0.0** - React integration for MDX
- **Next MDX Remote 5.0.0** - MDX rendering with dynamic content
- **Gray Matter 4.0.3** - Front matter parsing

### Animation & Motion
- **Framer Motion 11.18.2** - React animation library
- **Motion 12.34.5** - Advanced motion primitives

### Data Visualization
- **Chart.js 4.4.0** - Charts and graphs
- **React ChartJS 2 5.2.0** - React wrapper for Chart.js
- **Recharts 3.7.0** - Composable charting library

### Data Validation & Schemas
- **Zod 4.3.6** - TypeScript-first schema validation

### Icons & Graphics
- **Lucide React 0.400.0** - Icon library
- **isomorphic-dompurify 3.0.0-rc.2** - HTML sanitization

### External Integrations
- **@google/genai 1.43.0** - Google Generative AI API
- **Puppeteer 24.37.5** - Headless browser automation (thumbnails, screenshots)

### Developer Tools
- **ESLint 8.57.0** - JavaScript/TypeScript linting
- **ESLint Config Next 14.2.0** - Next.js ESLint rules
- **ESLint Plugin Import 2.32.0** - Import organization rules
- **ESLint Import Resolver TypeScript 4.4.4** - TypeScript import resolution
- **tsx 4.21.0** - TypeScript execution for Node.js scripts
- **ts-morph 27.0.2** - TypeScript AST manipulation (code generation)
- **Husky 9.1.7** - Git hooks management
- **Lint-staged 16.3.1** - Run linters on staged files
- **cross-env 7.0.3** - Cross-platform environment variable setting

### Not Used
- **Database**: No persistent database - content stored as TypeScript/CSV files
- **Authentication Framework**: Custom cookie-based admin auth in `lib/admin-auth.ts`
- **REST API Framework**: Native Next.js API Routes

---

## Environment Variables

### Configuration Variables

| Variable | Type | Purpose | Example |
|----------|------|---------|---------|
| `NODE_ENV` | string | Environment mode | `development`, `production` |
| `ADMIN_PASSWORD` | string | Admin login password | (secret in `.env.local`) |
| `ADMIN_TOKEN_SECRET` | string | JWT secret for admin tokens | (secret in `.env.local`) |
| `LOCAL_ADMIN` | boolean | Enable admin in non-production | `1` to enable (dev only) |
| `STATIC_EXPORT` | boolean | Enable static site export | `1` to build static HTML |
| `NEXT_PUBLIC_WORDPRESS_API_URL` | URL | WordPress blog API endpoint | `https://blog.example.com/wp-json` |
| `WORDPRESS_API_URL` | URL | Server-side WordPress API URL | `https://blog.example.com/wp-json` |
| `THUMBNAIL_FACTORY_URL` | URL | Thumbnail generation service | `http://localhost:3000/thumbnail-factory` |
| `THUMBNAIL_SETTLE_MS` | number | Wait time for thumbnail rendering | `1800` (milliseconds) |
| `THUMBNAIL_FORMAT` | string | Thumbnail output format | `png` or `webp` |

---

## Build & Deployment Scripts

### Development
```bash
npm run dev              # Start dev server with webpack
npm run typecheck       # Type check TypeScript
npm run lint            # Run ESLint
npm run check           # Lint + typecheck
```

### Code Generation (Prebuild)
```bash
npm run gen:registry           # Generate PAGE_REGISTRY from CSV
npm run gen:animations         # Generate animation catalog
npm run gen:hero-manifest      # Generate hero visual metadata
npm run gen:all               # Run all generation scripts
npm run validate:registry      # Validate registry consistency
```

### Build & Export
```bash
npm run build           # Build with file-based registry generation
npm run build:static    # Build static export (no server needed)
npm run export          # Static export variant
npm run start           # Start production server
```

### Utilities & Auditing
```bash
npm run link-audit              # Audit all links
npm run registry:audit          # Full registry audit
npm run page:upsert            # Update page registry entries
npm run gen:thumbnails         # Generate page thumbnails
npm run cleanup:thumbnail-factory # Clean tmp thumbnails
npm run gen:thumbnails:once    # Generate & cleanup in one command
npm run diag:easing            # Find invalid easing functions
```

---

## Key Data Structures

### PAGE_REGISTRY (pageRegistry.generated.ts)

```typescript
interface PageRegistryRow {
  route: string                      // URL path: /expertise/demand-growth
  fileRef: string                    // Source file: content/expertise/demand-growth.ts
  pageTitle: string                  // SEO title
  templateId: TemplateId             // Component template ID
  contentKey: string                 // Data lookup key
  theme: 'dark' | 'light' | undefined
  heroVisualId: string               // Hero visual identifier
}
```

### Content Item Schemas (Zod validated)

**ExpertiseItem**
- `slug`: string (unique identifier)
- `title`: string
- `content`: string (HTML/markdown)
- Additional fields per schema

**IndustryItem**
- `slug`: string
- `title`: string
- `content`: string
- Industry-specific metadata

**CaseStudyItem**
- `slug`: string
- `title`: string
- `content`: string
- Results/metrics data

---

## Request Flow Summary

1. **Incoming Request** → `app/[[...slug]]/page.tsx` (catch-all route)
2. **Route Match** → Search `PAGE_REGISTRY` from `pageRegistry.generated.ts`
3. **Template Lookup** → Resolve template from `src/templates/registry.ts`
4. **Content Lookup** → Resolve content from `src/content/registry.ts`
5. **Render** → Pass template + content to React component
6. **Response** → HTML generated (static or dynamic based on build mode)

---

## End-to-End Data Flows

### Flow A — Non-blog route (e.g. `/expertise`)

1. Next.js resolves route via `app/[[...slug]]/page.tsx` catch-all.
2. Page reads registry row via `getPageByRoute(route)`.
3. Template component is selected by `templateId`.
4. Content payload is loaded by `contentKey` from `src/content/registry.ts`.
5. Template renders HTML/React output. **No external API involved.**

### Flow B — Blog listing (`/blog`)

1. Server component `app/blog/page.tsx` runs.
2. Server calls WordPress REST API via `lib/wordpress.ts`; initial posts/categories are server-rendered via `BlogIndexClient`.
3. In the browser, URL-driven interactions (search, category, pagination) trigger client fetches via `lib/wp-client.ts`.
4. UI re-renders with fetched posts and pagination state.

### Flow C — Single blog post (`/blog/post?slug=...`)

1. Client component reads slug from URL.
2. Browser requests post from WordPress via `fetchPostBySlug`; related posts via `fetchPosts`.
3. HTML content is sanitized server-side.
4. `BlogPostTemplate` renders hero/article/sidebar from that payload.

**CMS integration notes:**
- WordPress integration is direct-to-REST API (`/wp-json/wp/v2`), not through a custom internal API route.
- `_embed=1` returns featured media and taxonomy terms with each post.
- `lib/wp-media.ts` extracts featured images safely from embedded data.
- Blog uses a hybrid fetch model: server-side initial render, client-side for interactive updates. All other pages are local-content/static.

---

## Performance and Motion Tuning

### Dynamic imports for animations

All animation components are imported via `next/dynamic` with `ssr: false`, keeping server HTML lean and deferring payload until needed. See `ANIMATION_SYSTEM_GUIDE.md` for the full registration guide.

### Motion optimization guidelines

Framer Motion is concentrated in `app/page.tsx` (hero flows, stat jitter), `ExpertiseDetailContent.tsx` (route maps, results), and `src/components/animations/*`.

- Hover scale normalized to `1.02–1.04` max for cards.
- Glow/sparkle effects kept minimal to avoid heavy paint.
- `useReducedMotion()` respected in `HeroFlowBackground` and scroll animations.
- Use `viewport={{ once: true }}` for in-view animations to avoid replay on every scroll.
- Avoid animating large background SVGs on every frame; prefer subtle CSS transitions.
- Replace continuous motion with entrance-only animations where possible.

### Layout / CLS rules

- Hero animation wrappers use explicit heights (`h-[320px]`, `lg:h-[420px]`) to prevent layout shift.
- Grids use fixed column definitions (`lg:grid-cols-[1.15fr_1fr]`) to keep hero text + animation stable.
- Keep a fixed `min-height` on hero animation containers when adjusting layout.
- Migrate bare `<img>` tags to `next/image` for explicit dimensions and lazy loading.

---

## Extension Playbooks

### Add a new direct-route page

1. Create `app/<new-route>/page.tsx`.
2. Reuse primitives: `Hero`, `Section`, `Card`, `CTABand`.
3. Add nav/footer link in `components/layout/Navbar.tsx` and `components/layout/Footer.tsx` if needed.
4. Add structured content in `content/*.ts` if applicable.

### Add a registry-driven page

1. Add a row to `src/data/page-registry.csv` (`route`, `templateId`, `contentKey`, `theme`).
2. Ensure the content key resolves in `src/content/registry.ts`.
3. Ensure the template is registered in `src/templates/registry.ts`.
4. Run `npm run gen:registry` then `npm run validate:registry`.
5. Confirm the route renders correctly at `localhost:3000`.

### Add or update expertise content

- Update TS collection files under `content/expertise*.ts` and/or MDX in `content/expertise/**`.
- Keep slugs consistent with registry rows, related item arrays, and any hard-coded links.

### Add an animation/gallery asset

1. Create the component under `src/components/animations/`.
2. Run `npm run gen:animations` to refresh catalog output.
3. Register in `ANIMATION_REGISTRY` (`src/data/animations.ts`) or `HERO_VISUAL_REGISTRY` (`lib/heroVisualRegistry.ts`).
4. See `ANIMATION_SYSTEM_GUIDE.md` for the full step-by-step.

### Blog enhancements

- **UI**: modify `app/blog/*` components.
- **Taxonomy/filter behavior**: edit `lib/wp-client.ts` helpers (`getPostCategories`, `fetchCategories`).
- **Server-rendered WP fetch**: use/extend `lib/wordpress.ts`.

---

## Important Notes

- **Content-First**: All page content defined in TypeScript/CSV, enabling programmatic updates
- **Registry-Driven**: Single source of truth (`page-registry.csv`) defines all routes
- **Static or Dynamic**: Supports both static export (no server) and dynamic rendering
- **Type-Safe**: Full TypeScript strict mode with Zod validation
- **Local Development**: Local-only endpoints for admin tasks during development
- **Extensible Templates**: Support for uploaded custom templates alongside built-in ones

---

## Related Documentation

- [ROUTING.md](./ROUTING.md) - Routing architecture and registry migration history
- [CONTENT_MANAGEMENT_GUIDE.md](./CONTENT_MANAGEMENT_GUIDE.md) - Content editing guide
- [ANIMATION_SYSTEM_GUIDE.md](./ANIMATION_SYSTEM_GUIDE.md) - Animation registration, routing, and gallery
- [DESIGN-STYLE-PALETTE-GUIDE.md](./DESIGN-STYLE-PALETTE-GUIDE.md) - Visual design system

> **Note:** `WEBSITE_UPDATE_FEB2026.md`, `SITE-DEVELOPER-GUIDE.md`, `system-architecture.md`, `notebook-summary.md`, and `replit.md` have been consolidated into this canonical document and archived under `docs/archive/2026-03-16/`.
