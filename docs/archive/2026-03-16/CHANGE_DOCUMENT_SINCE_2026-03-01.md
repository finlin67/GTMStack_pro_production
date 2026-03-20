# GTMStack.pro Change Document (Since 2026-03-01)

## Scope

This document summarizes repository changes made after **2026-03-01**, and describes the current:

1. Next.js `/app` directory architecture
2. Tailwind/design token setup for **PillarAccent / PillarGradient**
3. Page-content schema and validation model

Sources used:

- `git log --since="2026-03-01"`
- `docs/CHANGELOG.md`
- `app/**`, `tailwind.config.ts`, `src/data/pillars.ts`
- `src/content/registry.ts`, `src/lib/content-schemas/*`
- `src/data/pageRegistry.generated.ts`

---

## A) Change Summary Since March 1, 2026

## Commit timeline (high-level)

| Date | Commit | Message |
|---|---|---|
| 2026-03-13 | `d0d14b6` | no more static |
| 2026-03-12 | `8786aed` | json |
| 2026-03-12 | `821ea45` | Update package.json |
| 2026-03-12 | `2a5bc59` | Update package.json |
| 2026-03-12 | `c73c73d` | Update package.json |
| 2026-03-12 | `832b46e` | Update package.json |
| 2026-03-12 | `89032b2` | Merge pull request #3 from finlin67/fix/blog-wordpress-live |
| 2026-03-12 | `147a5da` | Use admin cookie auth for admin routes |
| 2026-03-12 | `5ce9c65` | Move Tailwind & tooling to dependencies |
| 2026-03-12 | `bd5b58f` | Update package-lock.json |
| 2026-03-12 | `f2dd122` | Remove Husky pre-commit hook and dependency |
| 2026-03-11 | `d4f1374` | Make blog feed cards clickable via WP slug |
| 2026-03-11 | `c849cf1` | Add expertise page content support and README |
| 2026-03-10 | `89b3c3a` | Add content engagement and systems operations content to registry |
| 2026-03-10 | `273321b` | Enhance Navbar, Footer, and MegaMenu components with updated styling and logo integration |
| 2026-03-10 | `846d008` | Update EMERGENT_HANDOFF.md |
| 2026-03-10 | `af256e5` | Update WordPress docs, add handoff, update reports |
| 2026-03-10 | `99f4289` | Refactor admin components and enhance API routes |
| 2026-03-09 | `2482259` | Add Admin CMS, handoff docs, and cleanup |
| 2026-03-09 | `e8d05d2` | blog wp refresh UX and typecheck scope |
| 2026-03-07 | `df6c126` | deploy static |
| 2026-03-07 | `67a3e3f` | yaml |
| 2026-03-06 | `63d6d50` | your message |
| 2026-03-06 | `73dcd38` | Add content-automation, pages, APIs and tools |
| 2026-03-06 | `9eadaf2` | Remove industryItem content schema |
| 2026-03-06 | `4a585b9` | Add admin UI, API routes, assets, and SEOHero |
| 2026-03-06 | `adcfd3e` | chore: finalize recovery changes after crash |
| 2026-03-06 | `48b0bd4` | chore: finalize recovery changes after crash |
| 2026-03-04 | `7154a8d` | fix: resolve post-crash TypeScript, template routing, and prerender blockers |

## Functional change themes

1. **Registry-driven routing and templating deepened**
   - Dynamic page resolution through generated page registry (`src/data/pageRegistry.generated.ts`) and catch-all routes.
   - Expanded and corrected content key + template mapping for expertise/industry/case-study pages.

2. **Admin CMS and admin APIs expanded significantly**
   - Added/expanded `/app/admin` UI and `/app/api/admin/*` handlers.
   - Added admin auth/session flow and template/content management endpoints.

3. **Blog + WordPress integration refresh**
   - UX refresh and slug-based click-through behavior for blog feeds.
   - Ongoing updates to WordPress docs and adapter flows.

4. **Navigation/system UI updates**
   - Navbar, Footer, MegaMenu restyle and logo integration.

5. **Build/deployment/tooling updates**
   - Package/tooling dependency shifts (including Tailwind/tooling packaging changes).
   - Husky pre-commit removal.
   - Static deployment-related changes (then later follow-up adjustments).

---

## B) Current Next.js `/app` Architecture

The app uses a **hybrid route model**: explicit filesystem routes for core sections + **registry-resolved catch-all routing**.

## 1) Root and shared app files

- `app/layout.tsx` (global shell)
- `app/globals.css` (global styles/utilities)
- `app/not-found.tsx`
- `app/sitemap.ts`

## 2) Explicit top-level route sections

Primary route trees include:

- `about`, `contact`, `resume`
- `expertise`, `industries`, `case-studies`, `projects`
- `blog`, `gallery`
- `services/*`
- `tools/*`
- `admin/*`
- `api/*` (route handlers)

Each major area mixes static pages and dynamic segments (e.g. `[slug]`).

## 3) Catch-all registry routing

Two catch-all entry points drive registry routes:

- `app/[[...slug]]/page.tsx` for general site routes
- `app/p/[[...slug]]/page.tsx` for `/p/*` namespace

These pages:

1. Reconstruct route path from URL segments
2. Look up matching row in `PAGE_REGISTRY`
3. Resolve template via `getTemplate(templateId)`
4. Resolve content via `getContentByKey(contentKey)`
5. Render template with content + page title

`app/[[...slug]]/page.tsx` also guards reserved prefixes (`api`, `admin`, `blog`, `tools`, `p`, etc.) so they are not intercepted.

## 4) API architecture

`app/api` is split by concern:

- `app/api/admin/*` (auth, page upsert, templates, publish, uploads, registry audit)
- `app/api/animations/*`
- `app/api/local/animations/*` (local-only tooling)

---

## C) Tailwind Design Tokens: PillarAccent / PillarGradient

## Important current-state note

There is **no literal Tailwind token named** `PillarAccent` or `PillarGradient` in `tailwind.config.ts`.

Instead, pillar accent/gradient behavior is implemented through a **combination** of:

1. General Tailwind color/gradient tokens (`tailwind.config.ts`)
2. Pillar palette definitions (`src/data/pillars.ts`)
3. Design guidance language in `docs/DESIGN-STYLE-PALETTE-GUIDE.md`

## 1) Base Tailwind tokens currently available

From `tailwind.config.ts`:

- Accent colors: `accent-cyan`, `accent-blue`, `gradient-pink`, brand/cool/accent ramps
- Background gradients: `gradient-brand`, `gradient-bg-vertical`, `gradient-bg-hero`
- Utility gradient helpers: `gradient-radial`, `gradient-conic`

## 2) Pillar palette equivalents (practical PillarAccent/PillarGradient source)

From `src/data/pillars.ts` (`PILLAR_PALETTES`):

- `content-engagement`: primary `#2563EB`, secondary `#FACC15`
- `demand-growth`: primary `#1D4ED8`, secondary `#22C55E`
- `strategy-insights`: primary `#7C3AED`, secondary `#E5E7EB`
- `systems-operations`: primary `#0EA5E9`, secondary `#22D3EE`

This is the closest code-level equivalent to:

- **PillarAccent** → `palette.primary`
- **PillarGradient** → gradient constructed from `palette.primary` + `palette.secondary`

## 3) Design-spec layer

`docs/DESIGN-STYLE-PALETTE-GUIDE.md` defines pillar-specific structural accent + gradient guidance and inheritance rules for sub-pages/case studies/blog posts.

---

## D) Current Page-Content Schema Model

Page content is routed by **`contentKey`** and validated at runtime (primarily in development) through Zod schemas.

## 1) Key families

In `src/content/registry.ts`, content is stored/resolved by key families such as:

- `home:*`, `about:*`, `contact:*`, `resume:*`
- `expertise:*`
- `pillar:*`
- `industries:*`
- `case-studies:*`
- `projects:*`, `gallery:*`

## 2) Registry + template coupling

`src/data/pageRegistry.generated.ts` rows bind:

- `route`
- `templateId`
- `contentKey`
- `theme`
- `heroVisualId`

This drives filesystem-independent page composition via catch-all routes.

## 3) Validated schema types (Zod)

Located under `src/lib/content-schemas/`:

- `ExpertiseItemSchema`
- `IndustryItemSchema`
- `CaseStudyItemSchema`
- `ExpertisePageContentSchema`

Validation behavior in `src/content/registry.ts`:

- `industries:*` (except `industries:main`) validated as `IndustryItem`
- `case-studies:main` validated as `CaseStudyItem[]`
- `case-studies:*` validated as `CaseStudyItem`
- `expertise:*` validated as either:
  - known mapped template-like shapes, or
  - strict `ExpertisePageContent`, or
  - strict `ExpertiseItem`

It also validates cross-references (e.g., expertise slugs pointing to existing case studies and vice versa).

## 4) Practical schema interpretation

The current content model is **typed but polymorphic**:

- Some keys return strict domain items (`ExpertiseItem`, `IndustryItem`, `CaseStudyItem`)
- Some keys return transformed template payloads via adapter mappers
- `pillar:*` currently accepts mapped objects without strict schema enforcement in the validator path

---

## E) Recommendations (Optional Next Step)

If you want explicit, easier-to-govern tokening, introduce first-class tokens in code:

- `--pillar-accent`, `--pillar-gradient-start`, `--pillar-gradient-end`
- Tailwind aliases (e.g. `pillar-accent`, `gradient-pillar`)

Then map those directly from `PILLAR_PALETTES` at render time for complete consistency between design docs and implementation.
