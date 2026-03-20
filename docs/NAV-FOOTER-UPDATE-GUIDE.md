---
title: Navigation & Footer Update Guide
description: How to safely modify the main navigation bar and footer (logo, mega menu, icons, styling, and fonts) without changing routes or architecture.
---

# How to Update Navigation and Footer

## Overview

The global navigation bar and footer are rendered from shared layout and component files:

- `app/layout.tsx` — wraps every page and renders `Navbar` and `Footer`.
- `components/layout/Navbar.tsx` — top navigation bar (logo, primary links, Expertise + Industries mega menus, mobile trigger).
- `components/layout/MegaMenu.tsx` — desktop Expertise mega menu content.
- `components/ui/MobileMegaMenu.tsx` — mobile mega menu (Expertise + Industries + quick links).
- `components/layout/Footer.tsx` — site footer (logo, columns, social links, legal links).

This guide explains how to **change the visual/navigation experience** (logo, icons, labels, layout, and styling) while **preserving routes, registry schema, and architecture**.

> **Hard rules**
> - Do **not** rename or move route files under `app/**`.
> - Do **not** change `href` targets to new slugs without updating the registry/route model explicitly.
> - Do **not** modify registry or generated files from here (e.g. `src/data/page-registry.csv`, `src/data/pageRegistry.generated.ts`).

---

## Root Layout and Fonts

- The global layout is defined in `app/layout.tsx`.
- Fonts are injected via:
  - `GeistSans` and `GeistMono` imports.
  - The `className` on `<html>`: `className=\`\${GeistSans.variable} \${GeistMono.variable}\``.
- The navbar and footer are included once per page via:
  - `<Navbar />` from `components/layout/Navbar.tsx`.
  - `<Footer />` from `components/layout/Footer.tsx`.

**To change fonts globally** (design-only):

- Prefer updating font utilities or Tailwind config (e.g. the `font-display`, `font-sans` classes) rather than changing the layout structure.
- If swapping font families:
  - Keep the `<html>` and `<body>` structure intact.
  - Replace or extend the font imports, then update Tailwind classes on components as needed.

---

## Header / Navbar (`components/layout/Navbar.tsx`)

### Structure

Navbar is a client component that renders:

- **Logo**: left-aligned brand block linking to `/`.
- **Desktop links**: Expertise (mega menu trigger), Case Studies, Gallery, Industries, About, Contact button.
- **Desktop mega menus**:
  - Expertise mega menu (`<MegaMenu />`) driven by `PILLARS` and `getExpertiseByPillar`.
  - Industries dropdown using `industryItems` and per-industry icons.
- **Mobile**:
  - Hamburger button (`Menu`/`X` icons) toggling `<MobileMegaMenu />`.

Hydration and state logic (`hydrated`, `open`, `industriesOpen`, `mobileOpen`, hover timeouts) **must not be removed**, or you may get hydration errors and broken menus.

### Updating the Logo

The logo block is currently:

- In `Navbar.tsx`, inside the header:
  - A small gradient square with “G”.
  - A text label `GTMstack.pro` with accent color for `.pro`.
- In `Footer.tsx`, a similar brand block is reused.

**Safe changes**:

- Replace the inner contents of the logo container (icon, text, SVG) while keeping:
  - The outer `Link` to `/`.
  - A compact layout (`flex items-center gap-2` or similar).
  - Reasonable sizing (`w-8 h-8` or equivalent).
- You may:
  - Swap the “G” for an SVG logo.
  - Change the brand text (e.g. capitalization or subtitle).
  - Adjust Tailwind classes for color, border-radius, or background gradient.

**Unsafe changes**:

- Removing the `Link` entirely (would break expected navigation).
- Pointing the logo `href` to a non-root path (changes canonical home routing).

### Updating Top-Level Navigation Links

Desktop links are defined inline in `Navbar.tsx` with `<Link href="...">` elements:

- Expertise (button that toggles MegaMenu).
- `/case-studies`, `/gallery`, `/industries`, `/about`, `/contact`.

**Safe changes**:

- Changing **visible labels** (e.g. “Case Studies” → “Customer Stories”) while keeping the same `href`.
- Adding/removing **individual non-critical links** if:
  - The `href` already exists as a valid route.
  - Design constraints are respected (spacing, responsiveness).

**Avoid**:

- Pointing links to new slug paths that do not exist in the registry or filesystem.
- Renaming/removing core section links (`/expertise`, `/industries`, `/case-studies`, `/gallery`, `/contact`) without a broader IA/registry update.

### Mega Menu Icons and Items

**Expertise mega menu** (`components/layout/MegaMenu.tsx`):

- Uses `PILLARS` from `lib/types` and `getExpertiseByPillar` from `content/expertise`.
- Icons are loaded from `lucide-react` via dynamic name lookup (`getIcon(pillar.icon)`).

**To change icons**:

- Update `pillar.icon` values in `PILLARS` (see `lib/types.ts`) to any valid Lucide icon name (e.g. `"Sparkles"`, `"Target"`, `"BarChart2"`).
- Ensure the string matches an exported icon from `lucide-react`; otherwise `getIcon` will return `null` (no icon shown).

**To change which expertise items appear under each pillar**:

- Update the `PILLARS` definition (href, title, id) and/or:
  - Update `getExpertiseByPillar` in `content/expertise` to map items to pillar IDs.
- Do **not** change `/expertise/${item.slug}` routing pattern without changing the registry/route config explicitly.

**Industries dropdown** (desktop) in `Navbar.tsx`:

- Uses `industryItems` from `content/industries`.
- Icon mapping is done via an `industryIconMap` keyed by icon name.

**To change industry icons or labels**:

- Update `industryItems` (titles and metadata) in `content/industries`.
- Adjust `industryIconMap` keys to map to Lucide icons you want to use.
- Keep `href={`/industries/${industry.slug}`}` as-is unless you also update the registry and route definitions.

### Mobile Mega Menu

`components/ui/MobileMegaMenu.tsx` renders:

- Quick links to `/case-studies`, `/gallery`, `/industries`, `/about`, `/contact`.
- Accordions for Expertise pillars and their items (same data as desktop mega menu).
- A section for Industries (All Industries + individual industry links).

**Safe changes**:

- Update label text of quick links and buttons.
- Add small explanatory copy blocks.
- Swap icons using the same `getIcon` mechanism as desktop (update `PILLARS` or item metadata).
- Adjust Tailwind classes (padding, colors, radius) to meet design needs.

**Do not**:

- Change `isOpen` / `onClose` prop contract or remove `AnimatePresence`/`motion` wrappers (would break open/close animations or ARIA).
- Change href patterns away from existing `/expertise/${slug}` or `/industries/${slug}` routes without broader agreement.

---

## Footer (`components/layout/Footer.tsx`)

### Structure

Footer has three main parts:

- **Brand column**:
  - Logo linking to `/`.
  - Short description.
  - Social icon row.
- **Link columns**:
  - Expertise links (from `PILLARS` via `lib/types`).
  - Company links: `/about`, `/case-studies`, `/gallery`, `/industries`, `/resume`.
  - Connect links: `/contact` and external social URLs.
- **Bottom bar**:
  - Copyright.
  - `/privacy` and `/terms` links.

### Updating Footer Logo and Copy

Logo block mirrors the navbar:

- You can safely:
  - Swap the inner logo mark (e.g. SVG).
  - Change text label and tagline copy.
  - Tweak layout/styling (`flex`, spacing, colors).
- Keep the `Link` to `/` and the overall semantic structure (`footer > brand column > links`) intact.

### Updating Footer Links

Link groups are defined as plain objects at the top of `Footer.tsx`:

- `footerLinks.expertise` — from `PILLARS` (`label`, `href`).
- `footerLinks.company` — inline array of `{ label, href }`.
- `footerLinks.connect` — inline array with optional `external` flag.
- `socialLinks` — icons and external URLs for social icons.

**Safe changes**:

- Update labels or add/remove entries as long as:
  - Internal URLs already exist as routes.
  - External URLs are valid.
- Swap social icons by changing the `icon` field to another Lucide icon import.

**Avoid**:

- Pointing footer links to new non-existent routes (would appear in link-audit as broken and may not resolve in registry).
- Removing `/privacy` or `/terms` without adjusting legal and sitemap expectations.

---

## Styling, Colors, and Icons

### Tailwind and Design Tokens

- Navbar and footer styling relies on:
  - Tailwind utility classes (e.g. `bg-slate-900`, `text-slate-300`, `font-display`, `rounded-lg`).
  - Custom brand colors such as `from-brand-500 to-brand-600`, `text-brand-400`, `text-brand-600`.
- To adjust visual styling:
  - Prefer editing utility classes in the components.
  - Keep structural classes (`flex`, `grid`, `gap-*`, `container-width`) unless you intentionally change layout.

### Icon System

- Icons come from `lucide-react`, imported either directly (e.g. `Linkedin`, `Twitter`) or via dynamic lookup (`getIcon`).
- When changing icons:
  - Ensure the icon name exists in `lucide-react`.
  - Keep sizes consistent (`w-4 h-4`, `w-5 h-5`) for visual alignment.

---

## Safe vs Unsafe Changes Summary

- **Safe**:
  - Update labels, icons, and colors on existing nav/footer items.
  - Swap logos using the same `Link` and approximate dimensions.
  - Change which expertise or industry items appear in mega menus by editing content metadata (without changing slug patterns).
  - Adjust spacing, borders, backgrounds, and typography via Tailwind classes.

- **Unsafe (needs explicit architecture decision)**:
  - Adding/removing or renaming top-level routes (e.g. changing `/industries` to `/verticals`).
  - Changing `href` patterns in mega menus away from `/expertise/${slug}` or `/industries/${slug}` without updating registry and content.
  - Removing or loosening accessibility or state logic (hydration guards, ARIA attributes, `AnimatePresence`).

When in doubt, treat `Navbar.tsx`, `MegaMenu.tsx`, `MobileMegaMenu.tsx`, and `Footer.tsx` as **presentation layers only**: update visuals and labels freely, but avoid changing routes, slugs, or data contracts without updating the corresponding registry/content systems.

