# Hero Visual Library – CSV format & QC

This doc defines how the **hero visual registry** is driven from a CSV and how to run quality control on `.tsx` animation files.

## CSV format

Use one row per page that has a custom hero (animation or image). Recommended columns:

| Column | Description | Example |
|--------|-------------|--------|
| **Route** | Exact pathname (no trailing slash) | `/expertise/video-marketing` |
| **Title** | Human-readable label | `Video Marketing` |
| **Media Type** | `animation` or `image` | `animation` |
| **Local File Name** | Filename under `src/components/animations/` (animations) or path under `public/` (images) | `Video-Marketing-Analytics.tsx` |
| **Notes** | Optional | `/hero-tiles/` |

- **Path convention**: For animations, the app resolves `src/components/animations/<Local File Name>`. Use forward slashes; no `..` or drive letters.
- **Header**: Use exactly `Route,Title,Media Type,Local File Name,Notes` (no extra characters; “Local File NameFile” was a typo for “Local File Name”).

This format is enough to build `lib/heroVisualRegistry.ts` and to run QC (e.g. “does this file exist and export a component?”).

## Quality control checklist (animations)

For each row with `Media Type = animation`:

1. **File exists**  
   Path: `src/components/animations/<Local File Name>`.

2. **Default export**  
   File has exactly one default export that is a React component (e.g. `export default function ComponentName() { ... }`).

3. **`'use client'` (recommended)**  
   If the component uses `useState`, `useEffect`, or other client-only APIs, the first line of the file should be `'use client'`.  
   Ensures correct behavior if the component is ever imported from a server component.

4. **Hero-friendly layout**  
   - Outer wrapper fits a **1:1** hero tile (e.g. `max-w-[500px] aspect-square` or `w-full h-full` inside an aspect-square container).  
   - Avoid `min-h-screen` or fixed `w-[600px] h-[600px]` unless you intentionally scale it down in the hero.

5. **Tailwind / design tokens**  
   Custom classes (e.g. `dark-bg`, `card-bg`) must exist in `tailwind.config.ts` or `app/globals.css` so the build does not drop them.

## QC result summary (from your initial CSV)

| Route | File | Exists | Default export | Has 'use client' |
|-------|------|--------|----------------|-------------------|
| `/expertise/video-marketing` | `Video-Marketing-Analytics.tsx` | ✅ | ✅ | ✅ |
| `/expertise/search-engine-optimization` | `SEO-GrowthFlow.tsx` | ✅ | ✅ | ❌ (add for safety) |
| `/expertise/marketing-operations` | `Marketing-Analytics-Carousel.tsx` | ✅ | ✅ | ✅ |
| `/expertise/marketing-automation` | `Marketing-Automation-Live-Feed.tsx` | ✅ | ✅ | ❌ (add for safety) |
| `/expertise/account-based-marketing-abm` | `ABM-Pipeline-Strategy.tsx` | ✅ | ✅ | ✅ |

Recommended follow-ups: add `'use client'` at the top of `SEO-GrowthFlow.tsx` and `Marketing-Automation-Live-Feed.tsx`.

## Where the registry lives

- **Config source**: `src/components/animations/gtmstack-pro-library.csv` (or another CSV you point to).
- **Runtime config**: `lib/heroVisualRegistry.ts` – route → `{ type, component }` (and later `imagePath` for images).  
  Build or a small script can regenerate this from the CSV when you add/change rows.
