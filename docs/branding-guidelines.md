# Branding Guidelines

## Typography

- **Headings:** `font-display` is used for major titles and section headers. In this project, that maps to **Cabinet Grotesk** first, with **Geist Sans** as fallback (`tailwind.config.ts`, `README.md`).
- **Body text:** **Geist Sans** is the default reading font across the site (`app/layout.tsx`, `tailwind.config.ts`).
- **Mono/code text:** **Geist Mono** is available for technical or utility text (`app/layout.tsx`, `tailwind.config.ts`).

## Color Palette

### Core brand and surface colors

- Deep background navy: `#020617`
- Alternate navy: `#0A0F2D`
- White text/light surfaces: `#FFFFFF`
- Light cyan text accent: `#67E8F9`
- Primary cyan accent: `#00CFFF`
- Primary blue accent: `#3B82F6`
- Gradient pink start: `#C026D3`
- Success green: `#22C55E`

### Supporting brand families used in UI

- Brand electric blue family: includes `#5a6cf2`, `#4149e6`, `#1e2a5c`
- Violet/cool family: includes `#a78bfa`, `#8b5cf6`, `#7c3aed`
- Cyan family: `#22d3ee`, `#06b6d4`, `#0891b2`
- Orange/gold family: `#f97316`, `#f59e0b`, `#fbbf24`
- Signal red family: `#ef4444`, `#dc2626`

### Brighter widget palettes (important)

The UI widgets and hero visuals use **brighter, multi-color combinations** (not just one simple gradient), including:

- **Cyan + Indigo + Violet systems:** `#38bdf8`, `#6366f1`, `#a855f7`
- **Heatmap palette:** `#ef4444` → `#f59e0b` → `#22c55e` (red to orange to green)
- **Performance palette:** `#f59e0b` + `#22c55e` (spend-to-return visuals)
- **Growth/SEO palette:** `#22c55e` + `#38bdf8` with purple highlights `#a855f7`
- **Editorial/blog widget accents:** `#00A8A8`, `#36C0CF`, `#FFD700`

These appear in animated components such as `components/ui/HeroTileAnimation.client.tsx`, `components/ui/HeroBackground.tsx`, and `components/ui/LatestPosts.tsx`.

## Theme Rules (Light vs Dark)

- The site intentionally mixes both themes:
  - **Light sections** for reading-heavy content (`bg-white`, `bg-slate-50`, dark text)
  - **Dark sections** for hero, stats, and CTA moments (deep navy backgrounds, white text, cyan/violet glow accents)
- Dark sections use layered gradients, subtle motif textures, and glow effects to create depth without hurting readability (`components/layout/SectionDark.tsx`, `app/globals.css`).
- Light sections keep contrast clean and simple for clarity (`components/layout/SectionLight.tsx`, `components/layout/Section.tsx`).
- Navigation includes both light/dark behavior (`dark:` classes in `components/layout/Navbar.tsx`), keeping brand accents consistent across modes.

## Overall Vibe

The visual identity is **clean, professional, and modern SaaS**: structured layouts, readable typography, and confident spacing. It combines enterprise credibility (navy/slate foundations) with energetic growth signals (cyan/blue/violet, plus selective gold/orange/green highlights).

In short: **serious and trustworthy at the base, vivid and data-driven in key interactive moments.**
