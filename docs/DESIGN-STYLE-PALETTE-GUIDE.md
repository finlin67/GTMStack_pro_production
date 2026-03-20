# Design System Reference

**Purpose:** Use this guide when creating new templates with **Stitch (Google), AI Studio, Figma**, or any design tool so that outputs stay within the expected framework, wireframe, and visual system of the site.

**Palette source of truth:** `docs/gtm-palette.csv` — all colors and gradients in §2 are defined there.

---

## 1. Brand identity

- **Brand name:** GTMStack.pro  
- **Tagline:** Systems that scale. Results that compound.  
- **Voice:** Direct, confident, systems-thinker. No fluff. Every sentence earns its place.  
- **Vibe:** Clean, professional, modern SaaS — enterprise credibility (navy/slate) with energetic, data-driven accents (cyan/blue/violet, selective gold/orange/green).

---

## 2. Color palette (locked — do not deviate)

**Source of truth:** `docs/gtm-palette.csv`. All colors and gradients below are defined there.

### 2.1 Global backgrounds and body text

| Token        | Hex       | Usage |
|--------------|-----------|--------|
| **BG Darkest**   | `#020617` | Footer, darkest surfaces |
| **BG Hero/Nav**  | `#0A1628` | Primary dark background (hero, nav) |
| **BG Mid Dark**  | `#0D2137` | Alternating dark sections |
| **BG Deep Dark** | `#112B3C` | CTA blocks, dark cards |
| **BG Light**     | `#F4F6F8` | Alternating light sections |
| **Body text (light bg)** | `#3D4B5C` | Paragraphs on white/light |

### 2.2 Site-wide UI (all pages)

| Role        | Color / gradient | Usage |
|-------------|-------------------|--------|
| **Nav CTA** | Fill `#FFDB58` (Mustard Gold), text `#0A1628` | Single site-wide conversion color; solid only, no gradient. |
| **Proof / KPI** | Gold or Orange–Gold: `#FFDB58` / `#E8A040` | Site-wide proof signal. |
| **Proof gradient** | Three-stop: `#C2440F` → `#E8A040` → `#FFDB58` (Orange → Gold) | Metric cards, proof numbers, KPI highlights. |

### 2.3 Page/section palettes (structural accent + gradient + proof)

Use the **Structural Accent** for buttons, links, and key UI on that page type. Use the **Gradient** for hero highlight text, section accents, or decorative gradients. Use **Proof Color** for metrics and proof points.

| Page / section        | Structural accent | Gradient (start → end) | Proof color   | Design intent |
|-----------------------|-------------------|------------------------|---------------|----------------|
| **Content & Engagement** | Mustard Gold `#FFDB58` | Cobalt → Ice `#154360` → `#AED6F1` | `#FFDB58` Gold | Warm creative authority |
| **Demand & Growth**   | Vivid Orange `#E8620A` | Blue → Orange `#1B4FD8` → `#E8620A` | `#E8A040` Orange | Velocity & conversion heat |
| **Strategy & Insights** | Light Blue + Indigo `#AED6F1` / `#3A3776` | Purple → Blue `#8E44AD` → `#AED6F1` | Gradient Purple→Blue | Analytical depth |
| **Systems & Operations** | Electric Cyan `#36C0CF` | Navy → Steel Blue `#0B3D6B` → `#A8D8EA` | `#A8D8EA` Ice Blue | Technical precision |
| **Expertise Hub**     | Royal Blue `#4A86D8` | Cobalt → Ice `#154360` → `#AED6F1` | White | Umbrella authority |
| **Industries Hub**    | Azure Blue `#2E7CF6` | Azure → Gold `#2E7CF6` → `#FFDB58` | `#FFDB58` Gold | Global enterprise premium |
| **Case Studies Hub**  | Platinum Silver `#B8C8D8` | Charcoal → Ice `#0C1F33` → `#C8DFF0` | Per-pillar accent | Neutral proof container |
| **Blog / Insights**    | Royal Blue `#4A86D8` | Cobalt → Ice `#154360` → `#AED6F1` | `#FFDB58` Gold | Consistent with Expertise |
| **Single Industry Page** | Cobalt Blue `#1B4FD8` | Blue → Orange `#1B4FD8` → `#E8620A` | Orange→Gold gradient | Vertical urgency |
| **Resume Page**       | Azure Blue `#2E7CF6` | Cobalt → Ice (H1) `#154360` → `#AED6F1` | Orange→Gold gradient | Personal brand above pillar |

### 2.4 Inheritance rules

- **Sub-topic pages:** Inherit parent pillar (Content & Engagement, Demand & Growth, Strategy & Insights, Systems & Operations). Use that row’s Structural Accent, Gradient, and Proof Color.
- **Single case study:** Inherits pillar accent and gradient; PillarAccent var drives re-theme.
- **Single blog post:** Same token system as case study; inherits pillar accent and gradient.

### 2.5 Borders and overlays (implementation)

| Token   | Value | Usage |
|---------|--------|--------|
| Border  | `rgba(255,255,255,0.08)` | Default borders on dark |
| Border strong | Use structural accent at ~30% opacity | Emphasized borders (e.g. cyan for Systems & Operations) |
| Card bg (dark) | Semi-transparent over BG Mid/Deep Dark | Glass card surface |

### 2.6 Light sections (reading-heavy)

- **Background:** `#F4F6F8` (from CSV). Optional white `#FFFFFF` for cards.  
- **Text:** `#3D4B5C` for body (from CSV). Darker `#0f172a` / `#334155` for headings if needed.  
- **Borders:** `#e2e8f0`, `#cbd5e1` (low opacity ok).

---

## 3. Typography

### 3.1 Font families

- **Display / headings:** Cabinet Grotesk (fallback: Geist Sans) — major titles, section headers.  
- **Body:** Geist Sans — all body and UI text.  
- **Mono / code:** Geist Mono — technical or utility text.

*(In code: `font-display`, `font-sans`, `font-mono`.)*

### 3.2 Scale and usage

| Element   | Size (rem) | Line height | Use |
|-----------|------------|-------------|-----|
| xs        | 0.75       | 1rem        | Labels, overlines, badges |
| sm        | 0.875      | 1.25rem     | Small body, captions |
| base      | 1          | 1.5rem      | Body |
| lg        | 1.125      | 1.75rem     | Lead paragraph |
| xl        | 1.25       | 1.75rem     | Subheads |
| 2xl       | 1.5        | 2rem        | H3 |
| 3xl       | 1.875      | 2.25rem     | H2 |
| 4xl       | 2.25       | 2.5rem      | H2 large |
| 5xl       | 3          | 1.15        | Hero sub |
| 6xl–8xl   | 3.75–6     | 1–1.1       | Hero titles |

- **Headings:** 600–700 weight, tight tracking.  
- **Body:** 400 weight, line-height ~1.6.  
- **Section labels (eyebrows):** Uppercase, xs/sm, accent color, tracking ~0.2em.

---

## 4. Layout and wireframe

### 4.1 Containers

- **Max content width:** 1280px (e.g. `max-w-6xl` to `xl:max-w-7xl`).  
- **Horizontal padding:** 1.5rem (mobile), 2rem (md), 3rem (lg) — in code: `container-width`.  
- **Content centered:** `mx-auto` with the max-width above.

### 4.2 Section padding

- **Vertical:**  
  - Mobile: 6rem (24)  
  - md: 8rem (32)  
  - lg: 10rem (40)  
- **Section padding class:** `section-padding` → `py-24 md:py-32 lg:py-40`.  
- **Alternate presets:** `py-16 md:py-24`, `py-20 md:py-32`, `py-24 md:py-40` for sm/md/lg/xl.

### 4.3 Grid

- **Base:** 12-column grid.  
- **Cards:** 2–4 columns (e.g. 4-col cards, 2-col split).  
- **No full-bleed images as primary content** — use structured content and metrics.

### 4.4 Section rhythm (dark vs light)

- **Alternate dark and light sections** where it fits.  
- **Dark:** Use CSV backgrounds: `#020617` (darkest), `#0A1628` (hero/nav), `#0D2137` (mid), `#112B3C` (deep/CTA). White or pillar accent for text.  
- **Light:** `#F4F6F8` (CSV BG Light), body text `#3D4B5C`; use for long-form reading.

### 4.5 Expected content order (templates)

Use this order so new templates match the site’s content framework:

1. **Hero** — Title, optional highlight phrase, short description, primary + optional secondary CTA.  
2. **Section header** — Eyebrow (optional) + H2 + optional description.  
3. **Challenges / problem** — Bullets or short blocks.  
4. **Execution / stack / how** — List, tags, or cards (e.g. capabilities, stack items).  
5. **Results / proof** — Metric cards (value + label), e.g. “3–5x Pipeline efficiency uplift”.  
6. **Related** — Related expertise, case studies, or industries (cards/links).  
7. **CTA block** — Headline, 1–2 sentences, primary button (accent), optional secondary.

*(Expertise topic pages use: Hero → Challenges → Execution stack → Results → Related expertise/case studies/industries → CTA.)*

---

## 5. Component patterns

### 5.1 Buttons

- **Nav CTA (site-wide):** Fill **Mustard Gold `#FFDB58`**, text **`#0A1628`**. Solid only; single conversion color across the site. Rounded-xl, padding ~1rem 2rem.  
- **Pillar / page primary:** Use the page’s **Structural Accent** from §2.3 (e.g. `#E8620A` for Demand & Growth, `#36C0CF` for Systems & Operations). Dark text on light accent where readable.  
- **Secondary (outline):** Border = structural accent ~50% opacity, text = accent or white; same radius/padding.  
- **Ghost / outline:** For secondary actions; no heavy fill.  
- **Hover:** Slight scale (e.g. 1.03–1.05), stronger glow on primary.

### 5.2 Cards

- **Light:** Rounded-2xl, white bg, border `slate-200/60`, soft shadow; hover: lift, stronger shadow.  
- **Dark/glass:** Rounded-2xl, semi-transparent over BG Mid/Deep Dark (§2.1), border = structural accent ~18% opacity, backdrop blur; hover: border ~35%, glow.  
- **Metric / proof cards:** Large number (3xl–4xl) in **Proof Color** or **Proof gradient** (§2.2–2.3): Gold/Orange–Gold `#FFDB58` / `#E8A040` or three-stop `#C2440F` → `#E8A040` → `#FFDB58`. Label in muted or white.

### 5.3 Section headers

- **Eyebrow:** Uppercase, xs/sm, accent color (e.g. cyan or pillar primary), tracking wide.  
- **Title:** H2, display font, 3xl–5xl, tight leading.  
- **Description (optional):** 1–2 lines, lg/xl, muted.

### 5.4 Badges / tags

- Rounded-full, small padding.  
- Accent bg at ~15% opacity, accent text; or subtle border.

### 5.5 Text gradient (hero / highlights)

Use the **Gradient** for the page/section from §2.3 (e.g. Cobalt → Ice, Blue → Orange, Purple → Blue, Navy → Steel Blue). One phrase in hero or key headings.

- **Proof / KPI gradient (site-wide):** `#C2440F` → `#E8A040` → `#FFDB58` (Orange → Gold, three-stop).  
- **Pillar examples:** Content & Engagement `#154360` → `#AED6F1`; Demand & Growth `#1B4FD8` → `#E8620A`; Strategy & Insights `#8E44AD` → `#AED6F1`; Systems & Operations `#0B3D6B` → `#A8D8EA`.

> Note: `.text-gradient-brand` has been removed from `app/globals.css` — it was an exact duplicate of `.text-gradient`. Use `.text-gradient` only.

### 5.6 Utility CSS class standards (`app/globals.css`)

These shared classes replace repetitive inline styles. Use them before writing new inline style strings.

| Class | Appearance | Use Case |
|-------|-----------|----------|
| `.glass-card-surface` | Semi-transparent dark bg (`rgba(10,15,45,0.60)`), border accent 18% | Standard glass card on dark sections |
| `.glass-card-surface-alt` | Same but bg `rgba(10,15,45,0.55)` for slightly lighter contrast | Stats cards, lighter-grid dark sections |
| `.btn-cta-teal` | Teal fill `#00A8A8`, white text, `px-8 py-4`, rounded-xl, hover scale 1.05 | Main CTAs on dark sections (industry, about, expertise, blog) |
| `.btn-cta-teal-sm` | Same look, `px-5 py-2.5`, hover scale 1.04 | Hero CTAs on industry pages |
| `.btn-hero-outline` | `btn` + white/90 text, hover white, `bg-white/10`, `px-6 py-3`, rounded-xl, border white/20 | Secondary CTAs on dark heroes (pillar, project, case-study slug pages) |

- **Gradients:** e.g. `from-slate-950 via-brand-950 to-slate-950`, or pillar overlay.  
- **Patterns (subtle):** Grid, dots, blueprint grid, topographic lines, pathway, signal dots, flow lines.  
- **Opacity:** Motifs at ~10–15% so they don’t compete with type.

### 6.2 Light sections

- Solid **`#F4F6F8`** (CSV BG Light) or white; optional very subtle mesh or grid. Body text **`#3D4B5C`**.  
- No strong color overlays on reading areas.

### 6.3 Utility patterns (reference)

- **Grid:** 32×32 or 40×40, stroke slate or cyan at low opacity.  
- **Dots:** Small circles, low opacity.  
- **Blueprint grid:** 40×40, mask fade top/bottom.  
- **Topo / pathway / signal / flow:** Use existing CSS classes or replicate subtle line/dot patterns.

---

## 7. Motion and animation

- **Entrance:** Fade-up (opacity 0→1, translateY ~16px→0), ~400ms ease-out.  
- **Stagger:** Children delay ~80ms apart.  
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out).  
- **Durations:** Fast 150ms, base 250ms, slow 400ms.  
- **No decorative looping** on main content sections; reserve motion for hero or key widgets.  
- **Reduced motion:** Respect `prefers-reduced-motion` (no or minimal motion).

---

## 8. Tool-specific checklist

### Stitch (Google)

- Set canvas background from **§2.1**: `#020617`, `#0A1628`, `#0D2137`, or `#112B3C` for dark; `#F4F6F8` for light.  
- Use **exact hex values from `docs/gtm-palette.csv`** (and §2) for fills, text, and gradients.  
- Per page type, use **§2.3** Structural Accent + Gradient + Proof Color (e.g. Content & Engagement: Mustard Gold accent, Cobalt→Ice gradient, Gold proof).  
- **Nav CTA:** solid `#FFDB58`, text `#0A1628`. **Proof/KPI:** three-stop gradient `#C2440F` → `#E8A040` → `#FFDB58`.  
- Export or design sections in **section order** (§4.5): Hero → header → challenges → execution → results → related → CTA.  
- Keep type scale and spacing (§3, §4) so copy fits the live layout.

### AI Studio (Gemini / design prompts)

- Paste **§1–2 and §3** (brand, palette from CSV/§2, typography) into the prompt.  
- Specify: “Max width 1280px, section padding py-24 md:py-32, alternating dark (#020617 / #0A1628) and light (#F4F6F8) sections. Body text on light #3D4B5C.”  
- Ask for “eyebrow + H2 + description” section headers and “metric card (large number + label)” in **Proof Color** or **Proof gradient** (Gold/Orange–Gold).  
- Request “Nav CTA fill #FFDB58 text #0A1628; pillar accent from page type; no full-bleed hero images.”

### Figma

- Create **color styles** from **§2.1–2.3**: BG Darkest, BG Hero/Nav, BG Mid Dark, BG Deep Dark, BG Light, Body text; Nav CTA (#FFDB58, #0A1628); Proof gradient stops (#C2440F, #E8A040, #FFDB58); plus per–page Structural Accent and Gradient (e.g. Content & Engagement, Demand & Growth).  
- Create **text styles** for: Display (Cabinet/Geist, 600–700), Body (Geist, 400, #3D4B5C on light), Eyebrow (uppercase, xs, structural accent).  
- Use **components** for: Section header, Metric/Proof card (number in Proof Color or gradient), Nav CTA button, Pillar primary button, Glass card (dark).  
- Set **frame width** to 1280px (or 1440px with 1280 content area).  
- Use **auto layout** with 24/32/40 vertical padding and 24/32/48 horizontal padding to mirror `container-width` and `section-padding`.

---

## 9. Don’ts

- Don’t use colors outside **`docs/gtm-palette.csv`** / §2.  
- Don’t use a different Nav CTA color; site-wide conversion is **#FFDB58** with **#0A1628** text only.  
- Don’t use em dashes (—) in UI copy.  
- Don’t use “leverage,” “synergy,” “unlock,” “supercharge” in body copy.  
- Don’t use full-bleed images as the main content block.  
- Don’t add decorative looping animation to content sections.  
- Don’t mix unrelated typefaces; stick to Display + Sans + Mono above.

---

## 10. Quick reference (from gtm-palette.csv)

| Item        | Value |
|------------|--------|
| BG Darkest  | `#020617` |
| BG Hero/Nav | `#0A1628` |
| BG Mid Dark | `#0D2137` |
| BG Deep Dark | `#112B3C` |
| BG Light    | `#F4F6F8` |
| Body text (light) | `#3D4B5C` |
| Nav CTA fill | `#FFDB58` |
| Nav CTA text | `#0A1628` |
| Proof gradient | `#C2440F` → `#E8A040` → `#FFDB58` |
| Max width   | 1280px |
| Section padding | 24/32/40 (mobile/md/lg) |
| Border radius (cards/buttons) | 1rem–1.5rem (xl, 2xl) |

*Per-page Structural Accent and Gradient: see §2.3 and `docs/gtm-palette.csv`.*

---

## 11. Suggested prompts (copy-paste)

Use these as-is or tweak the [bracketed] parts for **Google Stitch** or **Figma** (AI or briefs).

### 11.1 Google Stitch

**Full page – expertise topic**
```
Design a single long-scroll B2B SaaS page for “[Topic name]” (e.g. “Demand generation” or “Content marketing”). Brand: GTMStack.pro. Voice: direct, confident, no fluff.

Strict palette (see gtm-palette.csv): dark backgrounds #020617 (darkest), #0A1628 (hero/nav), #0D2137 (mid), #112B3C (deep). Light sections #F4F6F8, body text on light #3D4B5C. Nav CTA: solid fill #FFDB58, text #0A1628 (site-wide). Proof/KPI: three-stop gradient #C2440F → #E8A040 → #FFDB58. Use the correct pillar row for this topic: Structural Accent for buttons/links, Gradient for hero highlight phrase, Proof Color for metric numbers.

Layout: max width 1280px centered, section padding 96px/128px/160px vertical. Sections in order: (1) Hero – headline, one phrase in pillar gradient, short description, primary button = pillar Structural Accent (or Nav CTA #FFDB58) + secondary outline; (2) Eyebrow + H2 + optional description; (3) Challenges – 4–6 bullets; (4) Execution/stack – tags or cards; (5) Results – 3 metric cards (large number in Proof Color or Proof gradient, label muted); (6) Related links/cards; (7) CTA block. No full-bleed hero image. Glass cards on dark: rounded-2xl, border = accent ~18%, semi-transparent fill. Buttons rounded-xl.
```

**Hero only**
```
Hero section for a B2B SaaS page. Dark background #0A1628 (or #020617). Headline large display (white), one phrase in pillar gradient (e.g. Cobalt→Ice #154360→#AED6F1 for Content & Engagement; Blue→Orange #1B4FD8→#E8620A for Demand & Growth). Primary CTA: Nav CTA #FFDB58 fill, text #0A1628; or pillar Structural Accent. Secondary CTA outline. Max width 1280px, generous vertical padding. Optional: very subtle grid or dot pattern, no big imagery.
```

**Pillar-specific (e.g. Demand & Growth)**
```
Same structure as full-page prompt. Demand & Growth palette: Structural Accent Vivid Orange #E8620A, Gradient Blue→Orange #1B4FD8→#E8620A, Proof Color #E8A040 Orange. Backgrounds from CSV: #020617, #0A1628, #0D2137, #112B3C. Light sections #F4F6F8, body #3D4B5C. Nav CTA #FFDB58 / #0A1628. Proof numbers in #E8A040 or three-stop #C2440F→#E8A040→#FFDB58. Section order: Hero → header → challenges → execution → results → related → CTA. Max width 1280px.
```

**Content & Engagement**
```
B2B SaaS page for “[Topic]” under Content & Engagement. Palette: Structural Accent Mustard Gold #FFDB58, Gradient Cobalt→Ice #154360→#AED6F1, Proof #FFDB58 Gold. Dark backgrounds #020617 / #0A1628 / #0D2137. Light #F4F6F8, body text #3D4B5C. Nav CTA #FFDB58 fill, text #0A1628. Hero highlight phrase in Cobalt→Ice gradient. Same section order and 1280px layout as main guide.
```

---

### 11.2 Figma

**Prompt for Figma AI / design generation**
```
Generate a B2B SaaS marketing page frame (1280px content area). Palette from gtm-palette.csv: dark BG #020617, #0A1628, #0D2137, #112B3C; light BG #F4F6F8; body text on light #3D4B5C. Nav CTA fill #FFDB58, text #0A1628. Proof/KPI: three-stop gradient #C2440F → #E8A040 → #FFDB58. Per-page: use Structural Accent for primary buttons/links, Gradient for hero highlight text, Proof Color for metric numbers.

Typography: Display/headings bold, tight tracking; body regular, line-height 1.5–1.6. Eyebrow: uppercase, small, structural accent.

Layout: Sections stacked, 96–160px vertical padding, max-width 1280px centered. Components: hero (headline + gradient phrase + description + Nav CTA #FFDB58 + secondary outline), section header (eyebrow + H2 + description), metric cards (big number in Proof Color or Proof gradient, label muted), glass cards on dark (rounded-2xl, accent border ~18%, semi-transparent). No full-bleed hero image.
```

**Brief for setting up a Figma file (variables + components)**
```
Design system for GTMStack.pro (source: docs/gtm-palette.csv).

Color variables: BG Darkest (#020617), BG Hero/Nav (#0A1628), BG Mid (#0D2137), BG Deep (#112B3C), BG Light (#F4F6F8), Body text (#3D4B5C), Nav CTA fill (#FFDB58), Nav CTA text (#0A1628), Proof gradient stops (#C2440F, #E8A040, #FFDB58). Plus per-page Structural Accent and Gradient (e.g. Content & Engagement: #FFDB58, #154360→#AED6F1; Demand & Growth: #E8620A, #1B4FD8→#E8620A).

Text styles: Display/Bold (24–48px), Body/Regular (16px, 1.5, #3D4B5C on light), Eyebrow (11px, uppercase, 0.2em, accent).

Components: Nav CTA (filled #FFDB58, text #0A1628, rounded 12px); Pillar primary (Structural Accent fill); Section Header; Metric/Proof card (number in Proof Color or gradient); Glass card (dark semi-transparent, accent border, rounded 16px). Frame: 1440px, content 1280px, padding 24/32/48px.
```

**Figma: single-section prompt**
```
Design a “Results” section for a B2B SaaS page. Dark background #0A1628 or #0D2137. Section title: eyebrow “Proof” (uppercase, use page Structural Accent e.g. #36C0CF or #FFDB58) + H2 “Results that compound”. Three metric cards: large number in Proof Color or three-stop gradient #C2440F → #E8A040 → #FFDB58, label muted/white. Cards: rounded-2xl, border accent ~18%, semi-transparent dark fill. Max width 1280px, section padding 128px vertical.
```

---

Use one Stitch prompt per page type (full topic, hero-only, pillar, or Content Engagement); use the Figma prompts to generate frames or to set up variables and components so new templates stay on system.

For implementation details, see `app/globals.css`, `tailwind.config.ts`.

---

## 12. Theme System Notes (Cross-Cutting)

- **Global baseline:** `app/globals.css` sets `:root` custom properties and a dark default body (`--color-background: #020617`, white foreground).
- **Primary theme strategy:** Most reusable components choose a **fixed visual mode** via props/variants (`SectionLight` vs `SectionDark`, `CTABand` variants) rather than a runtime theme toggle. There is no global dark/light toggle.
- **Dark class support:** Some shared components (notably `Navbar`) include `dark:` utilities and respond if a parent `.dark` class is applied.
- **Scoped pillar theme:** `app/globals.css` includes a `.theme-demand-growth` token override block used specifically for Demand & Growth page styling. Add equivalent `.theme-*` blocks for new pillar-scoped design variants.

> **Note:** `branding-guidelines.md`, `component-library.md`, and `CONSOLIDATION_SUMMARY.md` have been merged into this document and archived under `docs/archive/2026-03-16/`.
