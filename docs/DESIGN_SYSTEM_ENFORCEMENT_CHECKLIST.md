# Design System Enforcement Checklist

Use this with [docs/DESIGN-STYLE-PALETTE-GUIDE.md](c:/GitProd/GTMStack_prod/GTMStack_pro_production/docs/DESIGN-STYLE-PALETTE-GUIDE.md) before merging any new or regenerated template.

## Locked Tokens

- Dark backgrounds only: `#020617`, `#0A1628`, `#0D2137`, `#112B3C`
- Nav CTA only: fill `#FFDB58`, text `#0A1628`
- Proof gradient only: `#C2440F -> #E8A040 -> #FFDB58`
- Typography only: `font-display`, `font-sans`, `font-mono`

## Required Shared Classes

- Page container: use `.container-width`
- Standard section spacing: use `.section-padding`
- Dark glass cards: use `.glass-card-surface` or `.glass-card-surface-alt`
- Generic dark cards: use `.card-dark` and `.card-dark-hover`
- Site-wide nav CTA: use `.nav-cta`
- Secondary hero CTA on dark backgrounds: use `.btn-hero-outline`
- Shared text highlight: use `.text-gradient` or `.text-gradient-cobalt-ice`
- Proof numbers and KPI values: use `.proof-gradient-text` or `.text-gradient-gold`

## Template Review Gates

- No hardcoded off-palette hex values in page shells, cards, buttons, or proof blocks
- No inline `fontFamily`
- No duplicated card recipes when a globals utility already exists
- No decorative looping animation in main content sections
- No full-bleed image used as the primary content block
- Use the expected content rhythm unless content type clearly justifies an exception:
  Hero -> Section header -> Challenges -> Execution -> Results -> Related -> CTA

## Fast Diff Checks

- Search for hardcoded hex: `#0A0F2D|#2463EB|#00A8A8|#FFD700|#1E2A5E`
- Search for inline styles: `style={{`
- Search for custom font overrides: `fontFamily:`
- Search for looping motion: `repeat: Infinity|animate-spin|setInterval`
- Search for missing shared classes in templates: `container-width|section-padding|glass-card-surface|nav-cta|proof-gradient-text`

## Decision Rules

- If a CTA is the navbar conversion action, it must be `.nav-cta`
- If a metric is presented as proof, it must use the proof gradient or the page's approved proof color
- If a dark card repeats across sections, move it to a shared utility before adding another bespoke version
- If a template introduces a new accent color, it must be added to the palette guide first or removed

## Active Template Registry Note

The page registry (`src/data/pageRegistry.generated.ts`) maps routes to template IDs like `Uploaded_ContentEngagement_v1`, `Uploaded_DemandGrowth_v1`, `projects.main`. The ACTIVE file is `src/templates/Uploaded_*.tsx`, not `src/templates/expertise/*.tsx`. Files in `src/templates/expertise/` and `src/templates/expertise/pillars/` are **preview/legacy stubs** not wired into the production registry.

Before auditing a template, always verify it is actually referenced in `src/templates/uploadedRegistry.generated.ts` or `src/templates/registry.ts`.