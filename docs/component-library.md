# Component Library Catalog

This workspace uses a **dark-first visual system** (global `app/globals.css` + Tailwind tokens), with reusable wrappers that opt into light surfaces where needed.

## Layout & Navigation

### `components/layout/Section.tsx` (`Section`, `SectionHeader`)
- **Purpose:** Generic page section wrapper + standardized section heading block.
- **Default styling:** `background="white"`, `padding="lg"`, `container-width` layout utility.
- **Theme behavior:** Explicit background variants (`white`, `slate`, `gradient`, `dark`); not auto-switching based on system theme.

### `components/layout/SectionLight.tsx`
- **Purpose:** Light-surface section wrapper for content-heavy blocks.
- **Default styling:** White/slate backgrounds, slate text, larger vertical rhythm.
- **Theme behavior:** Forces light presentation (`bg-white`/`bg-slate-50`, `text-slate-900`) regardless of global dark baseline.

### `components/layout/SectionDark.tsx`
- **Purpose:** Reusable dark thematic section shell (hero/stats/theater/cta modes).
- **Default styling:** Gradient dark backgrounds, white text, optional motifs, accent orbs, and variant-specific overlays.
- **Theme behavior:** Always dark-styled; “theme shift” is done by `variant`/`motif` props rather than runtime theme toggling.

### `components/layout/Navbar.tsx`
- **Purpose:** Primary sticky site navigation with desktop mega menus + mobile menu trigger.
- **Default styling:** Frosted header (`backdrop-blur`), brand links, CTA button, hover/focus transitions.
- **Theme behavior:** Uses `dark:` utilities (e.g., `dark:bg-slate-950/80`, `dark:text-slate-300`) to support both light/dark class contexts.

### `components/layout/MegaMenu.tsx`
- **Purpose:** Desktop expertise mega menu with pillar groupings and deep links.
- **Default styling:** Dark glass panel (`bg-slate-950/95`, white/brand text, subtle borders).
- **Theme behavior:** Always rendered as dark panel; no light variant.

### `components/ui/MobileMegaMenu.tsx`
- **Purpose:** Mobile navigation drawer with expandable expertise pillars + industry links.
- **Default styling:** Animated dark overlay panel, accordion sections, brand-accent highlights.
- **Theme behavior:** Always dark presentation (`bg-slate-950/95`), independent of global theme class.

### `components/layout/Footer.tsx`
- **Purpose:** Global footer with brand block, sitemap columns, and social links.
- **Default styling:** Solid dark footer (`bg-slate-900`) with muted slate typography.
- **Theme behavior:** Fixed dark styling; no light/dark switching logic.

## Hero System

### `components/ui/Hero.tsx` + `PageHero`
- **Purpose:** Light-theme hero templates for landing/page intros.
- **Default styling:** Light gradient/mesh/grid backgrounds, slate typography, `btn-primary`/`btn-secondary` CTAs.
- **Theme behavior:** Explicitly light-oriented; does not react to dark mode toggles.

### `components/ui/HeroDark.tsx`
- **Purpose:** Advanced dark hero framework for pillar/detail pages with optional visuals and animation features.
- **Default styling:** Deep dark gradient base, bright gradient headline accents, glass visual frame, motif overlays.
- **Theme behavior:** Dark-first by design; switches *visual motif/background variant* via props and path presets, not light/dark toggle state.

### `components/ui/HeroBackground.tsx`
- **Purpose:** Reusable animated SVG hero background engine (`contentFlow`, `growthCurve`, `networkSync`, etc.).
- **Default styling:** Screen-blended, low-opacity motion graphics with cyan/brand/cool gradients.
- **Theme behavior:** Built for dark hero contexts; no separate light mode variant. Honors reduced motion.

## Core UI Primitives

### `components/ui/Button.tsx`
- **Purpose:** Shared button/link primitive with variants (`primary`, `secondary`, `accent`, `ghost`, `outline`) and sizes.
- **Default styling:** Brand-forward Tailwind token styles, hover lift, focus rings, loading spinner support.
- **Theme behavior:** Uses mostly light-surface defaults (`secondary`, `ghost` are slate/light); dark-specific behavior is typically handled by parent context or alternate CTA classes in `globals.css`.

### `components/ui/Card.tsx` (`Card`, `MetricCard`, `CaseStudyCard`)
- **Purpose:** Reusable content cards for navigation, metrics, and case studies.
- **Default styling:** Uses global `.card` + `.card-hover` utilities (light surfaces, soft borders/shadows) with brand accents.
- **Theme behavior:** Components are light by default; dark card utility exists globally (`.card-dark`) but is not the default in this file.

### `components/ui/CardGrid.tsx` (`CardGrid`, `CardGridItem`)
- **Purpose:** Responsive grid layout wrapper with staggered reveal animation.
- **Default styling:** 2/3/4-column responsive grid with consistent spacing.
- **Theme behavior:** Theme-agnostic; inherits text/surface colors from child cards and parent section.

### `components/ui/CTABand.tsx`
- **Purpose:** Reusable call-to-action strip.
- **Default styling:** `variant="default"` (light slate band). Also supports `dark` and `gradient` variants with corresponding button treatments.
- **Theme behavior:** Explicit variant-based theming (`default` vs `dark` vs `gradient`) rather than global theme switch detection.

### `components/ui/BackButton.tsx`
- **Purpose:** Simple reusable button wrapper for browser back navigation.
- **Default styling:** None (unstyled behavior component).
- **Theme behavior:** Inherits all styling from passed `className`; no internal theme logic.

## Data Display & Filtering

### `components/ui/StatRow.tsx` (`StatRow`, `StatHighlight`)
- **Purpose:** Reusable stat display rows (`default`, `card`, `inline`) and highlighted KPI text treatment.
- **Default styling:** Brand value emphasis, slate labels, optional card shells.
- **Theme behavior:** Mostly light-surface defaults; can be placed in dark sections with custom class overrides.

### `components/ui/AnimatedStatCard.tsx`
- **Purpose:** Animation wrapper for stat cards entering viewport.
- **Default styling:** No visual styles beyond wrapper class passthrough.
- **Theme behavior:** Theme-agnostic; inherits card colors from parent.

### `components/sections/StatsSection.tsx`
- **Purpose:** Dark themed KPI section with live-jittered values, sparklines, and iconized metric cards.
- **Default styling:** Built on `SectionDark` (`variant="stats"`) plus translucent dark cards and signal motif overlays.
- **Theme behavior:** Fixed dark treatment; no light variant in this component.

### `components/ui/FilterChips.tsx` (`FilterChips`, `PillarFilter`)
- **Purpose:** Reusable chip-based filtering controls for tags/pillars.
- **Default styling:** Light chip surfaces with selected brand states.
- **Theme behavior:** Light defaults only; dark mode support would come via external class overrides.

### `components/ui/LatestPosts.tsx`
- **Purpose:** Reusable latest-blog-posts card grid fed from WordPress client utilities.
- **Default styling:** Dark container/cards, teal/cyan/gold accent system, animated hover lift.
- **Theme behavior:** Explicit dark styling (`bg-navy-deep`, dark card treatment); no light variant.

### `components/ui/RelatedItems.tsx`
- **Purpose:** Reusable “related content” blocks for expertise/case studies/industries + quick links.
- **Default styling:** Section heading + card grid composition using `Card`, `CaseStudyCard`, and `CardGrid`.
- **Theme behavior:** Primarily light card patterns; inherits context and can be placed in themed sections.

## Problem/Promise Patterns

### `components/ui/ProblemPromise.tsx`
- **Purpose:** Reusable two-column “problem vs promise” module for light sections.
- **Default styling:** White background, colored side rails, slate text, subtle pathway motif overlay.
- **Theme behavior:** Light-only presentation by default.

### `components/sections/ProblemPromise.tsx`
- **Purpose:** Homepage-specific dark “Problem → Promise” strip with animated SVG pathway and timeline teaser.
- **Default styling:** `SectionDark` gradient/stats variant, high-contrast type, animated line reveal.
- **Theme behavior:** Dark-only composition.

### `components/sections/TimelineTeaser.tsx`
- **Purpose:** Auto-scrolling process ticker (`Discovery → Strategy → Execution → Scale`).
- **Default styling:** Muted slate text with brand accent nodes and marquee animation.
- **Theme behavior:** Neutral component; usually embedded in dark sections and inherits surrounding theme.

## Motion & Visual Utility Components

### `components/motion/FadeIn.tsx` (`FadeIn`, `StaggerContainer`, `StaggerItem`, `HoverScale`)
- **Purpose:** Standardized reveal/stagger/hover motion primitives.
- **Default styling:** Behavior-only wrappers; no direct surface colors.
- **Theme behavior:** Theme-agnostic. Includes hydration-safe rendering and `prefers-reduced-motion` fallbacks.

### `components/ui/Reveal.tsx`
- **Purpose:** Lightweight in-view reveal wrapper.
- **Default styling:** Behavior-only wrapper.
- **Theme behavior:** Theme-agnostic; inherits parent styles and respects reduced motion.

### `components/ui/DriftingSignalField.tsx`
- **Purpose:** Ambient drifting signal overlay used in dark data sections.
- **Default styling:** Low-opacity animated motif layer (`SignalField` pattern).
- **Theme behavior:** Designed for dark backgrounds; no dedicated light adaptation.

## Theme System Notes (Cross-Cutting)

- **Global baseline:** `app/globals.css` sets `:root` custom properties and a dark default body (`--color-background: #020617`, white foreground).
- **Primary theme strategy:** Most reusable components choose a **fixed visual mode** via props/variants (`SectionLight` vs `SectionDark`, `CTABand` variants) instead of a runtime theme toggle.
- **Dark class support:** Some shared components (notably `Navbar`) include `dark:` utilities and can respond if a parent `.dark` class is applied.
- **Scoped pillar theme:** `globals.css` includes a specialized `.theme-demand-growth` token override block used for Demand & Growth page styling.