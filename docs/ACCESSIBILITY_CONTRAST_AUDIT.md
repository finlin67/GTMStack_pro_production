# Accessibility Contrast Troubleshooting

**Goal:** Ensure AA contrast and interaction clarity without changing layout or design intent.

---

## 1. Issues found

### 1.1 Text contrast

| Location | Issue | Risk |
|----------|--------|------|
| **Blog search** | Placeholder `placeholder-[#F0F0F0]/50` on dark blue `#1E2A5E` may fall below 4.5:1 for placeholder text. | AA (placeholder) |
| **Breadcrumb separators** | `text-white/50` (blog), `text-white/60` (expertise, industries) used for "/" — decorative; acceptable. | Low (decorative) |
| **Gallery placeholder** | `placeholder-slate-500` on dark input — borderline. | AA (placeholder) |
| **About page** | Skill pills `text-slate-400` on dark — may be below 4.5:1 for small text. | Consider bump to `slate-300` if needed |
| **Resume / projects / case-studies** | `text-slate-500` on light backgrounds — typically passes. | OK |
| **Expertise automation** | Breadcrumb/nav `text-slate-400` on dark — consider `text-slate-300` for body. | Optional improvement |

### 1.2 Focus-visible states

| Location | Status |
|----------|--------|
| **Global** | `*:focus-visible` in `globals.css` applies `ring-2 ring-brand-500 ring-offset-2` — **good**. |
| **Blog search input** | Had only `focus:outline-none focus:border-...` — no ring; keyboard focus could be missed. |
| **Gallery search input** | Same pattern — focus-visible ring added. |
| **Contact form** | Uses `focus:ring-2 focus:ring-brand-500/20` — visible on focus (mouse and keyboard). |
| **Navbar / Footer / Button** | Use `focus-visible:ring-2` or inherit global. **Good**. |
| **Other inputs** (case-studies, RevOps, etc.) | Various; some use `focus:` only — consider `focus-visible:` for consistency. |

### 1.3 Hover states not color-only (WCAG 1.4.1)

| Location | Issue |
|----------|--------|
| **Footer** (Privacy, Terms) | Hover was `hover:text-slate-300` only — **fixed** with `hover:underline focus-visible:underline`. |
| **Blog breadcrumb** (Home) | Hover was `hover:text-[#00A8A8]` only — **fixed** with `hover:underline focus-visible:underline`. |
| **Expertise** (optimization, analytics) | Breadcrumb links hover color-only — **fixed** with `hover:underline focus-visible:underline`. |
| **Expertise automation** | “Back to All Expertise” hover color-only — **fixed** with `hover:underline focus-visible:underline`. |
| **Industry pages** | Breadcrumb and “Explore” links use `hover:text-{accent}` only — **not changed** (minimal-fix scope). Consider adding `hover:underline` or underline on focus-visible in a follow-up. |
| **MegaMenu / MobileMegaMenu** | Some links use `hover:text-*` with `hover:bg-white/10` — non–color-only. **OK**. |

### 1.4 Prefers-reduced-motion

| Location | Status |
|----------|--------|
| **globals.css** | `scroll-behavior: smooth` was always on — **fixed**: wrapped in `@media (prefers-reduced-motion: no-preference)`. |
| **App / components** | `useReducedMotion()` and `shouldReduceMotion` used widely (expertise, about, industries, blog, page, HeroDark, FadeIn, etc.). **Good**. |
| **CSS animations** | Blog post has `@media (prefers-reduced-motion: reduce)` for marquee. **Good**. |

### 1.5 Low-contrast muted text (summary)

- **Decorative** (e.g. breadcrumb "/"): `text-white/50`, `text-white/60` — acceptable.
- **Body/secondary text on dark**: `text-slate-400` on navy — consider `text-slate-300` where readability matters.
- **Placeholders**: Blog and gallery inputs improved (see fixes).

---

## 2. Fixes applied (minimal, no layout change)

### 2.1 `app/globals.css`

- **Reduced motion:** `scroll-behavior: smooth` applied only when `prefers-reduced-motion: no-preference`, so users who prefer reduced motion are not forced into smooth scrolling.

### 2.2 Blog (`app/blog/page.tsx`)

- **Search input:**  
  - Placeholder contrast: `placeholder-[#F0F0F0]/50` → `placeholder-[#E8E8E8]` (solid, higher contrast on dark).  
  - Focus: added `focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F2D]` so keyboard focus is clearly visible.
- **Breadcrumb “Home” link:** Added `hover:underline focus-visible:underline` so hover/focus are not color-only.

### 2.3 Footer (`components/layout/Footer.tsx`)

- **Privacy / Terms links:** Added `hover:underline focus-visible:underline` so hover/focus are not color-only.

### 2.4 Expertise pages

- **optimization** (`app/expertise/optimization/page.tsx`): Breadcrumb Home and Expertise links — added `hover:underline focus-visible:underline`.
- **analytics** (`app/expertise/analytics/page.tsx`): Same for breadcrumb links.
- **automation** (`app/expertise/automation/page.tsx`): “Back to All Expertise” link — added `hover:underline focus-visible:underline`.

### 2.5 Gallery (`app/gallery/page.tsx`)

- **Search input:** `placeholder-slate-500` → `placeholder-slate-400` for better contrast; added `focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900` for visible keyboard focus.

---

## 3. Remaining recommendations (no code change in this pass)

1. **Industry pages:** Add `hover:underline` (or underline on focus-visible) to breadcrumb and “Explore” links so hover is not color-only.
2. **About skill pills:** If `text-slate-400` fails contrast checks on your background, switch to `text-slate-300`.
3. **Expertise automation / other dark pages:** Consider `text-slate-300` for body/secondary text where `text-slate-400` is used on dark backgrounds.
4. **Form inputs elsewhere:** Prefer `focus-visible:ring-*` (in addition to or instead of `focus:`) so focus indicator is consistent and visible for keyboard users.

---

## 4. Summary

| Category | Result |
|----------|--------|
| **Text contrast** | Placeholder and key muted text improved; decorative separators left as-is. |
| **Focus-visible** | Global style already present; blog and gallery search inputs given explicit focus-visible rings. |
| **Hover not color-only** | Footer, blog breadcrumb, and selected expertise links given underline on hover/focus-visible. |
| **Prefers-reduced-motion** | Smooth scroll gated on `prefers-reduced-motion: no-preference`; app already respects reduced motion in components. |
| **Low-contrast muted** | Issues listed; minimal fixes applied where in scope; rest left as recommendations. |

No layout or design intent was changed; only color/contrast and focus/hover behavior were adjusted.
