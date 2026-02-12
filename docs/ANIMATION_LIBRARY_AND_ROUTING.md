# Animation Library: From CSV to Runtime

This document explains how animations are **routed** from `gtmstack-pro-library.csv` and **added to the library** so they appear on the correct pages. It is the single reference for developers adding or changing hero animations.

---

## 1. Source of truth: the CSV

**File:** `src/components/animations/gtmstack-pro-library.csv`

Each row describes one animation and where it is used:

| Column | Description | Example |
|--------|-------------|--------|
| **Route** | Exact pathname where this animation can appear (no trailing slash except when path is directory-like, e.g. `/industries/developer-tools/`) | `/expertise/demand-generation` |
| **Title** | Human-readable label (e.g. expertise or industry name) | `Demand Generation` |
| **Local File Name** | Filename of the React component under `src/components/animations/` | `DemandGenerationHero.tsx` |
| **Update-Library** | Which code file to update when adding this row: `src/data/animations.ts` or `lib/heroVisualRegistry.ts` | `src/data/animations.ts` |
| **Media Type** | `animation` (or `image` for future use) | `animation` |
| **Notes** | Optional (e.g. `hero-tiles`) | `hero-tiles` |

- **Path convention:** The app resolves animation components from `src/components/animations/<Local File Name>`. The file must exist and **default-export** a React component.
- **Update-Library** is the key column: it tells you whether this animation is registered in the **revolving pool** (`src/data/animations.ts`) or as a **single hero per route** (`lib/heroVisualRegistry.ts`).

---

## 2. Two library destinations

Animations from the CSV are not auto-imported. You add them manually to one of two places, depending on how the route uses them.

### 2.1 `src/data/animations.ts` — revolving animations (multiple per route)

**Use when:** A route has **multiple** rows in the CSV with the same **Route** value (e.g. several animations for `/expertise/content-marketing`). The UI can rotate or let the user pick among them.

- **ANIMATION_REGISTRY:** Array of `AnimationEntry` objects.
- Each entry has: `id`, `title`, `description`, `marketingFunction`, `tags`, `sourceType`, `componentPath`, `component` (lazy-loaded), `route`, `order`, `featured`, etc.
- **marketingFunction** is derived from the route (e.g. `content-marketing`, `demand-generation`). See `MarketingFunction` type and `getMarketingFunctionFromPath()` in `ExpertiseHeroVisual.client.tsx`.
- **Component:** Add a `dynamic()` import at the top, then reference it in the registry entry’s `component` and `componentPath`.

**Routing:** Expertise detail pages use `getMarketingFunctionFromPath(pathname)` → `getAnimationsByFunction(marketingFunction)` or `getAnimationsByRoute(route)`. The hero visual then picks one animation (e.g. by route match or random rotation). The gallery and industry pages also use `getAnimationsByRoute(route)`.

### 2.2 `lib/heroVisualRegistry.ts` — one hero per route (pillar, home, industries)

**Use when:** A route has **exactly one** animation (one row per route), typically pillar pages (`/expertise/demand-growth`), home (`/`), and industry pages (`/industries/healthcare`).

- **HERO_VISUAL_REGISTRY:** Array of `HeroVisualEntry`: `route`, `title`, `mediaType`, `component`.
- **Component:** Direct (non-dynamic) import at the top, then reference in the entry.

**Routing:** `getHeroVisualForPath(pathname)` returns the single entry for that path. Used by hero shells that need one fixed visual per route (e.g. pillar and industry heroes).

---

## 3. How routing works at runtime

1. **Expertise detail pages** (e.g. `/expertise/demand-generation`):
   - Hero uses `ExpertiseHeroVisual.client.tsx`.
   - It first checks for a **registry entry** via `getHeroVisualForPath(pathname)`. If found (e.g. from `heroVisualRegistry`), that single component can be used for pillar-level routes that map to the same path.
   - For **detail** routes, it usually uses **marketing function**: `getMarketingFunctionFromPath(pathname)` → `getAnimationsByFunction(marketingFunction)`. If there are multiple animations for that function, it picks one (e.g. by matching `route` or by `getRotatedAnimation()`).
   - Optional `?anim=<id>` query param forces a specific animation by `getAnimationById(anim)`.

2. **Pillar / home / industry pages:**
   - Use `getHeroVisualForPath(pathname)` and render the **single** component from `HERO_VISUAL_REGISTRY` for that route.

3. **Gallery and industry content:**
   - Use `getAnimationsByRoute(route)` or `getFeaturedAnimations()` from `ANIMATION_REGISTRY`.

So: **CSV row → Update-Library column → you add the component to that file → runtime uses either HERO_VISUAL_REGISTRY (one per route) or ANIMATION_REGISTRY (by marketing function / route) to choose the animation.**

---

## 4. Adding a new animation (step-by-step)

1. **Create the component**  
   Add `src/components/animations/<YourComponent>.tsx` with a default export. Use `'use client'` if it uses hooks.

2. **Add a row to the CSV**  
   In `src/components/animations/gtmstack-pro-library.csv`:
   - **Route:** The path where it should appear (e.g. `/expertise/your-slug`).
   - **Title:** Label (e.g. expertise or industry name).
   - **Local File Name:** `YourComponent.tsx`.
   - **Update-Library:**  
     - Use **`src/data/animations.ts`** if this route has or will have **multiple** animations (revolving).  
     - Use **`lib/heroVisualRegistry.ts`** if this route has **one** hero (pillar, home, industry).

3. **Update the indicated library**
   - **If Update-Library = `src/data/animations.ts`:**
     - Add a `dynamic()` import for your component.
     - Add an entry to `ANIMATION_REGISTRY` with `id`, `title`, `description`, `marketingFunction` (match route; extend `MarketingFunction` type if needed), `tags`, `sourceType`, `componentPath`, `component`, `route`, `order`, `featured`.
   - **If Update-Library = `lib/heroVisualRegistry.ts`:**
     - Add a direct `import` for your component.
     - Add an entry to `HERO_VISUAL_REGISTRY` with `route`, `title`, `mediaType: 'animation'`, `component`.

4. **Route ↔ marketing function (for animations.ts only)**  
   If the route is a new expertise slug, ensure `getMarketingFunctionFromPath()` in `components/expertise/ExpertiseHeroVisual.client.tsx` includes the mapping from pathname to the same `marketingFunction` you used in `ANIMATION_REGISTRY`. For industries, `getAnimationsByRoute(route)` is used and `route` in the registry must match.

5. **Verify**  
   Build, open the route in the browser, and confirm the correct animation appears. For revolving animations, refresh or use `?anim=<id>` to test variants.

---

## 5. Quick reference

| CSV "Update-Library" | File to edit | When to use |
|----------------------|-------------|-------------|
| `src/data/animations.ts` | `src/data/animations.ts` | Multiple animations per route (expertise detail, gallery, industry hero rotation). |
| `lib/heroVisualRegistry.ts` | `lib/heroVisualRegistry.ts` | One hero per route (pillar, home, industry single visual). |

| Consumer | How it gets the animation |
|----------|----------------------------|
| Expertise detail hero | `getHeroVisualForPath` (single) or `getAnimationsByFunction` / `getAnimationsByRoute` (revolving). |
| Pillar / home / industry hero | `getHeroVisualForPath(pathname)` → `HERO_VISUAL_REGISTRY`. |
| Gallery | `ANIMATION_REGISTRY`, `getFeaturedAnimations()`, filters. |
| Industry page content | `getAnimationsByRoute(route)` from `ANIMATION_REGISTRY`. |

---

## 6. Related docs

- **CSV format and QC:** `docs/hero-visual-library-spec.md`
- **Checklist when adding a CSV row:** `docs/CSV_UPDATE_CHECKLIST.md`
- **Routing and hero architecture:** `docs/developer-routing-and-hero-visuals.md`
