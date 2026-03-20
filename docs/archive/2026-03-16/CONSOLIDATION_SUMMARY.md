# Component Consolidation Summary

**Goal:** Reduce duplication and normalize UI primitives without changing visual appearance.

---

## 1. Card / glass styles

### Added (in `app/globals.css`)

- **`.glass-card-surface-alt`** — Same as `.glass-card-surface` but with `background-color: rgba(10, 15, 45, 0.55)` for stats and lighter grids. Hover behavior matches `.glass-card-surface`.

### Consolidated usage

- **`app/page.tsx`**
  - Stats cards: inline styles → **`.glass-card-surface-alt p-6 md:p-8`**
  - Value cards (“How We Drive Growth”): inline styles → **`.glass-card-surface p-6 md:p-7`**
  - Timeline cards: inline styles → **`.glass-card-surface-alt p-6`**
- **`app/industries/page.tsx`**
  - Featured industries grid: inline styles → **`.glass-card-surface p-6 md:p-8`**
  - “All industries” grid: left as inline (border `0.15` differs from shared `0.18` to avoid any visual change).

### Unchanged

- **`.glass-card-surface`** — Existing utility kept; used where bg 0.6 and border 0.18 match.
- **`.glass-card`** (animation utilities) — Separate use case; unchanged.
- **`.dark-card`** — Theme-driven in pillar/detail pages; still applied via theme flags in `ExpertiseDetailContent` and pillar pages.

---

## 2. CTA styles

### Added (in `app/globals.css`)

- **`.btn-cta-teal`** — Teal fill (`#00A8A8`), white text, `px-8 py-4`, rounded-xl, hover scale 1.05, shadow. Used for main CTAs on dark sections (industry, about, expertise, blog).
- **`.btn-cta-teal-sm`** — Same look, `px-5 py-2.5`, hover scale 1.04. Used for hero CTAs on industry pages.
- **`.btn-hero-outline`** — `btn` + white/90 text, hover white, `bg-white/10`, `px-6 py-3`, rounded-xl, border white/20. Used for secondary CTAs on dark heroes (pillar, project, case-study slug pages).

### Replaced (now use shared classes)

| Location | Before | After |
|----------|--------|--------|
| **Industry pages** (retail, b2b-saas, pubsec-government, fleet-management-logistics, manufacturing, financial-services) | Hero: long `className` + `style={{ backgroundColor: TEAL }}` | **`.btn-cta-teal-sm`** |
| Same industry pages | Footer CTA: long `className` + `style={{ backgroundColor: TEAL }}` | **`.btn-cta-teal`** |
| **Pillar pages** (demand-growth, strategy-insights, systems-operations) | Secondary CTA: `btn text-white/90 hover:text-white hover:bg-white/10 px-6 py-3 ...` | **`.btn-hero-outline`** |
| **Projects [slug], Case studies [slug]** | Same secondary CTA string | **`.btn-hero-outline`** |
| **About** | Footer “Start a Conversation” teal CTA | **`.btn-cta-teal`** |
| **Expertise** | Footer “Start a Project” teal CTA | **`.btn-cta-teal`** |
| **Blog post** | “Book a Call” teal CTA + `style={{ backgroundColor: TEAL }}` | **`.btn-cta-teal`** |

### Unchanged

- **Pillar primary CTAs** — Still use theme classes (e.g. `pmm-cta-primary`, `si-cta-primary`, `so-cta-primary`) plus `btn`; theme CSS controls color/gradient.
- **ExpertiseDetailContent** — Hero and footer CTAs still use theme flags and inline style fallbacks where no theme is active.
- **Gold / outline variants** (e.g. “Download Resume”, “View LinkedIn” on about) — Left as-is (different padding or semantics).
- **Home / industries hero** (e.g. cyan fill, outline “View Case Studies”) — Left as-is; different palette from teal.

---

## 3. Dead / duplicate utilities removed

- **`.text-gradient-brand`** — Removed from `app/globals.css`. It was an exact duplicate of `.text-gradient` (same gradient and clip). No usages in app or components; only referenced in docs.

---

## 4. Summary table

| Change | Type | Files touched |
|--------|------|----------------|
| `.glass-card-surface-alt` added | New utility | `globals.css` |
| Stats / value / timeline cards use glass utilities | Consolidation | `app/page.tsx` |
| Industries featured grid uses `.glass-card-surface` | Consolidation | `app/industries/page.tsx` |
| `.btn-cta-teal` / `.btn-cta-teal-sm` added | New utility | `globals.css` |
| `.btn-hero-outline` added | New utility | `globals.css` |
| Industry + about + expertise + blog teal CTAs use shared classes | Consolidation | 6 industry pages, `about/page.tsx`, `expertise/page.tsx`, `blog/post/BlogPostClient.tsx` |
| Pillar + project/case-study slug secondary CTAs use `.btn-hero-outline` | Consolidation | demand-growth, strategy-insights, systems-operations, `projects/[slug]/page.tsx`, `case-studies/[slug]/page.tsx` |
| `.text-gradient-brand` removed | Dead code removal | `globals.css` |

---

## 5. Visual appearance

- No intentional visual changes. Same colors, spacing, shadows, and hover behavior where utilities were applied.
- “All industries” cards on `industries/page.tsx` keep their original inline styles (border 0.15) so appearance is unchanged.
- About “View LinkedIn” and other non-teal/secondary buttons keep original classes where padding or style differed from the new utilities.
