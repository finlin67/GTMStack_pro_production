# How to Work with Routing and Hero Visuals

This doc is meant as a **handoff for developers**: how pages are structured, how routing works, and how hero animations are wired into the expertise pages.

---

## 1. High-level architecture

- **Framework**: Next.js App Router (`app/` directory), TypeScript, React Server Components with client components where needed.
- **Content sources**:
  - `content/expertise.ts` – all expertise items (title, slug, pillar, etc.).
  - `content/industries.ts` – industries.
  - `content/projects.ts` / `content/case-studies.ts` – project/case-study content.
  - MDX detail content under `content/expertise/*` for some routes.
- **UI primitives**:
  - Layout/sections: `components/layout/SectionDark`, `SectionLight`, `Section`.
  - Hero shells: `components/ui/HeroDark`, `components/expertise/ExpertiseHero`.
  - Hero visuals/tiles: `components/expertise/ExpertiseHeroVisual.client.tsx`, `components/ui/HeroTileAnimation.client.tsx`.

For a product-style mental model: **App routes decide *which* page is shown; content files decide *what* is on the page; hero components decide *how* the header looks; hero registry/animations decide *which visual* shows in the header.**

---

## 2. Routing model & where pages live

### 2.1 Top-level routes (navigation items)

All top-level pages live directly under `app/`:

- Home: `app/page.tsx` → `/`
- About: `app/about/page.tsx` → `/about`
- Expertise index: `app/expertise/page.tsx` → `/expertise`
- Expertise pillar pages:
  - `app/expertise/content-engagement/page.tsx` → `/expertise/content-engagement`
  - `app/expertise/demand-growth/page.tsx` → `/expertise/demand-growth`
  - `app/expertise/strategy-insights/page.tsx` → `/expertise/strategy-insights`
  - `app/expertise/systems-operations/page.tsx` (or similar) → `/expertise/systems-operations`
- Industries index: `app/industries/page.tsx` → `/industries`
- Case studies / projects index:
  - `app/case-studies/page.tsx` → `/case-studies`
  - `app/projects/page.tsx` → `/projects` (intended rename target for “Case Studies” in UX copy).
- Resume: `app/resume/page.tsx` → `/resume`
- Contact: `app/contact/page.tsx` → `/contact`

> If you need an at-a-glance sitemap with business commentary, see `docs/gtmstackpro-page-review.md`.

### 2.2 Dynamic detail pages

Dynamic routes are modeled with `[slug]` folders in `app/` plus helper functions in `content/*`.

- **Expertise detail pages**
  - Route file: `app/expertise/[slug]/page.tsx` → `/expertise/:slug`
  - Slugs and metadata come from `content/expertise.ts` via:
    - `generateStaticParams()` – builds the list of `slug`s at build time.
    - `getExpertiseBySlug(slug)` – fetches the matching `ExpertiseItem`.
  - The same route file also wires related expertise and case studies.

- **Industries detail pages**
  - Pattern: `app/industries/[slug]/page.tsx` (one dynamic route).
  - Data source: `content/industries.ts` (helpers equivalent to expertise).

- **Projects / Case Studies detail**
  - Case studies: `app/case-studies/[slug]/page.tsx` → `/case-studies/:slug`.
  - Projects (mirror of case studies, intended rename path): `app/projects/[slug]/page.tsx` → `/projects/:slug`.
  - Data sources: `content/projects.ts` and/or `content/case-studies.ts`.

When you add a new expertise / industry / project:

1. Add a new item to the relevant `content/*.ts` file (including a unique `slug`).
2. (Optional) Add MDX body content under the appropriate `content/*` subfolder.
3. Next.js will automatically pick it up through `generateStaticParams`.

---

## 3. How hero headers & animations are wired

### 3.1 Expertise detail page flow

For a route like `/expertise/search-engine-optimization`, the render path is:

1. **Route file** – `app/expertise/[slug]/page.tsx`
   - Reads the `slug` from `params`.
   - Uses `getExpertiseBySlug(slug)` to load the `ExpertiseItem`.
   - Loads a visual/theming config via `getExpertiseHeroConfig(item.slug)`.
   - Renders:
     ```tsx
     <ExpertiseHero
       item={item}
       pillar={pillar}
       config={heroConfig}
       icon={IconComponent}
     />
     ```

2. **Hero shell** – `components/expertise/ExpertiseHero.tsx`
   - Layout:
     - Left column: breadcrumbs, title, tagline, CTAs, metrics, tags.
     - Right column: the animated hero tile.
   - Right column uses:
     ```tsx
     <ExpertiseHeroVisual
       animation={animation}
       config={config}
       borderClassName={theme.border}
     />
     ```

3. **Hero visual resolver** – `components/expertise/ExpertiseHeroVisual.client.tsx`

   - Runs on the client (`'use client'`).
   - Determines current route:
     ```ts
     const pathname = usePathname() || ''
     const registryEntry = getHeroVisualForPath(pathname)
     ```
   - If the hero visual registry has an entry for this route and it’s an animation:
     ```tsx
     if (registryEntry?.mediaType === 'animation' && registryEntry.component) {
       const Component = registryEntry.component
       return (
         <div className="relative hidden lg:block">
           <div className="absolute ... animate-drift-slow" />
           <div
             className={`relative mx-auto w-full max-w-[600px] h-[600px] overflow-hidden rounded-2xl ${borderClassName}`}
             data-reduced-motion={shouldReduceMotion ? 'true' : undefined}
           >
             <Component />
           </div>
         </div>
       )
     }
     ```
   - If there is **no registry entry**, it falls back to:
     - A special-case `LeadGenTileAnimation` for `/expertise/demand-generation`.
     - Otherwise, a generic `HeroTileAnimation` variant chosen by `getTileVariantForPath(pathname)`.

Result: every expertise detail page automatically gets either a **custom animation** or a **generic tile animation** in the right side of its hero without the route file knowing about the specific component.

### 3.2 Hero visual registry & CSV

Hero visuals are configured in two layers:

1. **Runtime registry** – `lib/heroVisualRegistry.ts`

   ```ts
   import SEOAnimation from '@/src/components/animations/SEO-GrowthFlow'
   import ABMPipelineStrategy from '@/src/components/animations/ABM-Pipeline-Strategy'

   export const HERO_VISUAL_REGISTRY = [
     {
       route: '/expertise/search-engine-optimization',
       title: 'SEO',
       mediaType: 'animation',
       component: SEOAnimation,
     },
     {
       route: '/expertise/account-based-marketing-abm',
       title: 'ABM',
       mediaType: 'animation',
       component: ABMPipelineStrategy,
     },
     // etc…
   ]

   export function getHeroVisualForPath(pathname: string) {
     const normalized = pathname.replace(/\/$/, '')
     return HERO_VISUAL_REGISTRY.find((e) => e.route === normalized) ?? null
   }
   ```

2. **Source CSV & spec** – `src/components/animations/gtmstack-pro-library.csv`
   - Each row describes one route + visual.
   - The expected format and QC process are documented in `docs/hero-visual-library-spec.md`.
   - A script (or manual copy) keeps the CSV and `lib/heroVisualRegistry.ts` in sync.

### 3.3 Where the actual animations live

- Folder: `src/components/animations/`
- Each animation is a **client component** (usually starts with `'use client'`).
- Examples:
  - `SEO-GrowthFlow.tsx` – used for `/expertise/search-engine-optimization`.
  - `ABM-Pipeline-Strategy.tsx` – used for `/expertise/account-based-marketing-abm`.
  - `Marketing-Automation-Live-Feed.tsx`, `Video-Marketing-Analytics.tsx`, etc.

**Layout convention for hero-friendly animations:**

- Outer-most animation wrapper should **fill a 1:1 tile** provided by `ExpertiseHeroVisual`:
  - Prefer `w-full h-full` on the root container.
  - Let the hero visual container control absolute size (`max-w-[600px] h-[600px]`).
  - Avoid `min-h-screen` or viewport-sized wrappers; they will overflow the tile.
- See `docs/hero-visual-library-spec.md` → “Hero-friendly layout” for more detailed rules.

To **add a new animated hero** for an expertise route:

1. Create a new file in `src/components/animations/`:
   - Default export a React component.
   - Mark as `'use client'` if it uses hooks or motion.
   - Follow the hero-friendly layout convention (`w-full h-full` root).
2. Add a row to `src/components/animations/gtmstack-pro-library.csv` with:
   - Route (e.g. `/expertise/new-route`).
   - Human-readable title.
   - Media type = `animation`.
   - Local file name (e.g. `NewRouteAnimation.tsx`).
3. Update `lib/heroVisualRegistry.ts` to import the new component and map it to the route.
4. The next build will automatically show the new animation in the hero for that route.

---

## 4. Quick onboarding summary for a new developer

- **Understand the sitemap**: start with `docs/gtmstackpro-page-review.md` and `docs/WEBSITE_SUMMARY.md`.
- **See where routes live**: browse `app/` – top-level pages are folders; dynamic detail pages are `[slug]` routes.
- **See how expertise pages are wired**:
  - `content/expertise.ts` → data model & slugs.
  - `app/expertise/[slug]/page.tsx` → renders the full page.
  - `components/expertise/ExpertiseHero.tsx` → left/right hero layout.
  - `components/expertise/ExpertiseHeroVisual.client.tsx` → picks the correct animation/tile.
  - `lib/heroVisualRegistry.ts` + `src/components/animations/*.tsx` → actual animated visuals.

With those files open, a developer can quickly reason about **how a new page is added**, **how its hero is themed**, and **how to slot in a new animation** without touching unrelated parts of the system.

