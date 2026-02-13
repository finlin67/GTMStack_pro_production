## GTMstack.pro – Developer Guide

This guide documents how the GTMstack.pro site is structured, how hero/animation tiles are wired into each page, and where to look to tune **visual design** and **performance**.

It’s written for engineers working in this repo (`Next.js 14 + App Router + TypeScript + Tailwind`).

---

## 1. High-level architecture

- **Framework**: Next.js App Router (`/app`) with React Server Components + Client Components.
- **Styling**: Tailwind CSS with a custom design system in `tailwind.config.ts` plus global layers in `app/globals.css`.
- **Fonts**:
  - Geist Sans / Geist Mono via `next/font` in `app/layout.tsx`.
  - `font-display` family (Cabinet / Geist) wired in `tailwind.config.ts`.
- **Content**:
  - Hard-coded marketing pages under `app/` (home, expertise, industries, services, case-studies).
  - Headless WordPress blog (see `docs/BLOG-WORDPRESS-DEVELOPER-GUIDE.md`).
- **Animations**:
  - All animation components live in `src/components/animations/`.
  - Two central registries:
    - `src/data/animations.ts` – gallery + per-route animation variants.
    - `lib/heroVisualRegistry.ts` – **hero animation in the top-right of page headers**, driven by `gtmstack-pro-library.csv`.

Root layout:

```12:56:app/layout.tsx
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Navbar from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

## 2. Routing & layout

### 2.1 App Router structure

- `app/page.tsx` – Home page hero and primary layout.
- `app/expertise/page.tsx` – Expertise index.
- `app/expertise/[slug]/page.tsx` + `ExpertiseDetailContent.tsx` – Detail pages for each expertise (Content & Engagement, Demand & Growth, etc.).
- `app/industries/[slug]/page.tsx` – Industry detail pages.
- `app/blog/...` – Blog index & post detail (WordPress-backed).
- `app/layout.tsx` – Global shell, font setup, navbar + footer, global CSS.

Each top-level section (`/expertise`, `/industries`, `/services`, `/blog`) has its own page component under `app/`.

### 2.2 Navigation

- The **primary navigation bar** is rendered via `components/layout/Navbar` (and, where used, `components/layout/MegaMenu` and `components/ui/MobileMegaMenu`).
- Navigation items and groups are defined in those layout components; when adding a new section:
  - Add the route/page under `app/...`.
  - Add a corresponding link in `Navbar` / `MegaMenu` with appropriate Tailwind classes.

The nav is designed to sit over dark gradients; buttons and active states use the **brand** and **accent** color ramps (see section 4).

---

## 3. Animations & hero tiles (top-right header)

The “animated tiles” that appear in the **top-right corner of many headers** are driven by:

1. **Animation components** in `src/components/animations/…`
2. **CSV library** `src/components/animations/gtmstack-pro-library.csv`
3. **Hero registry** `lib/heroVisualRegistry.ts`
4. **Animation registry** `src/data/animations.ts`

### 3.1 Hero visual registry (per-route hero in header)

File: `lib/heroVisualRegistry.ts`

- **Source of truth**: `src/components/animations/gtmstack-pro-library.csv` rows where `Update-Library = lib/heroVisualRegistry.ts`.
- Normalized route → animation mapping:

```45:69:lib/heroVisualRegistry.ts
export const HERO_VISUAL_REGISTRY: HeroVisualEntry[] = [
  { route: '/', title: 'GTMStack', mediaType: 'animation', component: AIGrowth },
  { route: '/expertise', title: 'Expertise', mediaType: 'animation', component: GTMStackPro },
  { route: '/expertise/ai-in-marketing', title: 'AI in Marketing', mediaType: 'animation', component: AIGrowth },
  { route: '/expertise/content-engagement', title: 'Content & Engagement', mediaType: 'animation', component: ContentEngagementTile },
  { route: '/expertise/demand-and-growth', title: 'Demand & Growth', mediaType: 'animation', component: DemandGrowthTile },
  { route: '/expertise/paid-advertising', title: 'Paid Advertising (SEM)', mediaType: 'animation', component: GrowthSEMTile },
  { route: '/expertise/product-marketing', title: 'Product Marketing', mediaType: 'animation', component: GrowthSEMTile },
  ...
  { route: '/industries/pubsec-government', title: 'Public Sector and Government', mediaType: 'animation', component: PubSecTile },
  { route: '/industries/retail', title: 'Retail & Ecommerce', mediaType: 'animation', component: OmniRetailTile },
  { route: '/industries/waste-management', title: 'Waste Management', mediaType: 'animation', component: WasteMan },
]
```

- Lookup helper:

```72:75:lib/heroVisualRegistry.ts
export function getHeroVisualForPath(pathname: string): HeroVisualEntry | null {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
  return HERO_VISUAL_REGISTRY.find((e) => e.route === normalized) ?? null
}
```

**How pages use it** (pattern):

- A page computes the current route (`pathname`) and calls `getHeroVisualForPath(pathname)` to get the hero tile configuration.
- The component from the registry is rendered in the **right-hand column of the hero grid** (e.g. `GTMStackPro`, `ContentEngagementTile`).
- For some pages (e.g. home, some expertise pages), hero animations are imported directly via `next/dynamic` (see `app/page.tsx`) rather than via the registry.

> If you want to change the hero animation for a route, **only update `HERO_VISUAL_REGISTRY`** (and ensure the component exists in `src/components/animations`).

### 3.2 Animation registry (gallery + route variants)

File: `src/data/animations.ts`

- Controls:
  - Gallery of animations
  - Per-**marketingFunction** variants (e.g. multiple demand-gen visuals)
  - Per-route rotation (e.g. multiple manufacturing animations)

Key types and registry:

```220:237:src/data/animations.ts
export interface AnimationEntry {
  id: string
  title: string
  description: string
  marketingFunction: MarketingFunction
  tags: string[]
  sourceType: AnimationSourceType
  componentPath: string
  component: ComponentType
  previewImage?: string
  featured: boolean
  route?: string
  order?: number
}

export const ANIMATION_REGISTRY: AnimationEntry[] = [
  {
    id: 'gtmstack-pro',
    title: 'GTMStack Pro Dashboard',
    componentPath: 'GTMStackPro.tsx',
    component: GTMStackPro,
    featured: true,
    route: '/',
    order: 1,
  },
  ...
]
```

Utilities:

- `getAnimationsByFunction(marketingFunction)` – list by function (e.g. ‘demand-generation’).
- `getAnimationsByRoute(route)` – all variants for a route.
- `getRotatedAnimationByRoute(route, excludeId?)` – used where you want one of several hero variants for a route.

> **CSV link**: rows with `Update-Library = src/data/animations.ts` describe which routes/titles/components belong here. The file already contains more detailed metadata (descriptions, tags, etc.).

### 3.3 How animations are placed in headers

Most hero sections follow a grid pattern:

- Left side: text, CTAs, badges.
- Right side: animation tile rendered from either:
  - `getHeroVisualForPath` (registry-driven), OR
  - local dynamic import (home page and some bespoke heroes).

Example (home hero right column – simplified):

```188:203:app/page.tsx
<div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
  <div className="space-y-6">
    {/* Heading, copy, CTAs, stats, etc. */}
  </div>

  {/* Top-right hero animation tile */}
  <div className="relative h-[320px] md:h-[380px] lg:h-[420px]">
    <AIGrowth /> {/* dynamic() import, ssr: false */}
  </div>
</div>
```

On expertise/industries pages, a similar pattern is used with the hero visual registry component.

---

## 4. Styling system: fonts, colors, CSS utilities

### 4.1 Tailwind config

File: `tailwind.config.ts`

Key points:

- **Content scanning**: includes `/app`, `/components`, `/src`.
- **Color system**:
  - Deep navy backgrounds: `navy-deep`, `navy-dark`.
  - Primary brand ramp: `brand.50–950`.
  - Cool violet ramp: `cool.*`.
  - Accent warm ramp: `accent.*` (orange).
  - Utility ramps: `cyan.*`, `gold.*`, `signal.*`, `slate.*`, `emerald.*`.
  - Animation-specific aliases like `anim-primary`, `anim-secondary`, `background-dark`, `primary`, `secondary`.
- **Typography**:
  - `fontFamily.sans`, `fontFamily.mono`, `fontFamily.display`.
  - Extended `fontSize` scale for up to `8xl`.
- **Radii, shadows, background patterns**:
  - `borderRadius.large`, `3xl` etc.
  - `boxShadow.glow`, `glow-cyan`, `glow-electric`, etc.
  - `backgroundImage.gradient-*`, `grid-pattern`, `dot-pattern`.
  - `animation` + `keyframes` definitions for reuse (`fade-in`, `float`, `drift`, `glow-pulse`, `marquee`).

> To globally change the **look & feel**, start with `tailwind.config.ts`:
> - Adjust brand/accent color ramps.
> - Tune radii and boxShadow presets.
> - Update animation keyframes and default durations to reduce motion.

### 4.2 Global CSS layers

File: `app/globals.css`

Layers:

- **Base**: HTML/body defaults, background colors, smooth scrolling.
- **Components**: shared classes for badges, buttons, cards, etc.
- **Utilities**: pattern backgrounds, text-balance, scrollbar-hide, abstract motifs (topographic lines, signal dots, planes, flow lines, grids, etc.).

Example – “badge” component styling:

```250:259:app/globals.css
.badge {
  @apply inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full;
  @apply bg-slate-100 text-slate-700 border border-slate-200/60;
}

.badge-brand {
  @apply bg-brand-50 text-brand-700 border-brand-200/60;
}

.badge-accent {
  @apply bg-accent-50 text-accent-700 border-accent-200/60;
}
```

Pattern utilities like `.bg-grid`, `.bg-grid-dark`, `.bg-mesh`, `.topo-*`, `.signal-*`, `.planes-*`, `.flow-*`, `.grid-*` are used as **background motifs** behind content/hero sections.

> For visual tuning:
> - Reduce pattern intensity by lowering `stroke` opacity in the embedded SVGs.
> - Swap patterns (e.g., `.bg-grid-dark` → `.planes-diagonal`) on specific sections.
> - Use `.text-balance` on headings to improve multi-line layout.

---

## 5. Performance & motion tuning

### 5.1 Dynamic imports for animations

All heavy animation components are imported via `next/dynamic` with `ssr: false`:

```4:18:src/data/animations.ts
const VideoMarketingAnalyticsTile = dynamic(
  () => import('@/src/components/animations/Video-Marketing-Analytics'),
  { ssr: false }
)
```

This keeps server-rendered HTML lean and avoids shipping animation payloads until needed.

**If you add a new animation:**

1. Create `src/components/animations/MyNewTile.tsx` (`'use client'`, no server-only APIs).
2. Add a dynamic import in `src/data/animations.ts` or `lib/heroVisualRegistry.ts`.
3. Wire it into:
   - `ANIMATION_REGISTRY` (for gallery/variants), and/or
   - `HERO_VISUAL_REGISTRY` (for header hero on a route).

### 5.2 Motion optimization

Framer Motion usage is concentrated in:

- `app/page.tsx` – hero flows and stat jitter.
- `app/expertise/[slug]/ExpertiseDetailContent.tsx` – route maps, cards, results sections.
- Hero/animation components in `src/components/animations/*`.

Guidelines already applied:

- Hover scale is normalized (`1.02–1.04` max for most cards).
- Glow/sparkle effects are reduced to avoid heavy paint.
- `useReducedMotion()` is respected in key places (e.g. `HeroFlowBackground`, some scroll animations).

> To further improve performance:
> - Replace continuous motion with **entrance-only** animations where you can.
> - Avoid animating large background SVGs on every frame (prefer subtle CSS transitions).
> - Use `viewport={{ once: true }}` for in-view animations so they don’t replay on every scroll.

### 5.3 Layout / CLS

- Hero layouts rely on explicit heights for animation wrappers (`h-[320px]`, `lg:h-[420px]`) to avoid content jumping.
- Most grids use fixed column definitions (`lg:grid-cols-[1.15fr_1fr]` etc.) to keep hero text + animation stable.

When adjusting hero layout:

- Keep a fixed **min-height** for the hero animation container.
- Avoid loading large images without `width` / `height` or aspect ratio; migrate bare `<img>` to `next/image` where possible.

---

## 6. How to tweak look & feel

### 6.1 Change hero animation for a page

1. Open `lib/heroVisualRegistry.ts`.
2. Find the entry whose `route` matches your page (normalized, no trailing slash).
3. Swap `component` to another animation component imported at the top (or add a new import).
4. Optionally update `title` (used for debugging / future UI).

### 6.2 Adjust colors / gradients

- Global palette: `tailwind.config.ts` (`theme.extend.colors`).
- Section-specific backgrounds:
  - Home hero: `app/page.tsx` – `background: linear-gradient(... NAVY_DEEP, NAVY_DARK, ...)`.
  - Expertise detail: `ExpertiseDetailContent.tsx` – `heroGradient` and `theme`-based colors.
- To reduce visual intensity:
  - Lower alpha values in gradients and box shadows.
  - Swap `glow-*` shadows to `soft`/`medium`.

### 6.3 Typography

- Global scale: `tailwind.config.ts` (`fontSize`).
- Hero headings typically use `font-display` and `text-4xl–8xl`.
- For readability:
  - Use `text-balance` on longer headings.
  - Keep body text at `text-base` / `text-[15px]` with `leading-[1.7]` (see `BlogPostClient.tsx` article body).

---

## 7. How to improve speed further

Beyond what’s already in place:

- **Images**:
  - Migrate remaining bare `<img>` tags to `next/image` (with explicit `width`, `height`, or `fill` + `sizes`).
  - Use `priority` only on key hero images.
- **Animations**:
  - Consider gating off-screen animations with `IntersectionObserver` or `useInView` to avoid rendering when offscreen.
  - Use `motion.div` only where animation is meaningful (avoid wrapping everything).
- **WordPress blog**:
  - Server-side fetches via `lib/wordpress.ts` already use `revalidate` for ISR.
  - Ensure `WORDPRESS_API_URL` points to the REST root (`.../wp-json/wp/v2`) to avoid extra hops.

---

## 8. Quick checklist for changes

- **Add a hero animation for a route**:
  - [ ] Create animation component in `src/components/animations/`.
  - [ ] Add dynamic import in `src/data/animations.ts` (if needed).
  - [ ] Add registry entry in `ANIMATION_REGISTRY` (with `route` and `order`).
  - [ ] Wire it in `lib/heroVisualRegistry.ts` for the route’s header.

- **Retheme a pillar (Content & Engagement / Demand & Growth / etc.)**:
  - [ ] Open `app/expertise/[slug]/ExpertiseDetailContent.tsx`.
  - [ ] Adjust the `DG_THEME`, `STITCH_THEME`, `PMM_AI_THEME`, `SI_THEME`, `SO_THEME` color configs and corresponding CSS snippets.
  - [ ] Verify contrast and hover states in dark mode.

- **Global design tweaks**:
  - [ ] Change base colors / shadows in `tailwind.config.ts`.
  - [ ] Update global patterns and utilities in `app/globals.css`.
  - [ ] Test key pages at multiple breakpoints for layout stability and performance.

This guide should give you a solid map of **where animations are wired**, **how navigation + layout are structured**, and **which knobs to turn** to refine the visual design and performance of the site.

