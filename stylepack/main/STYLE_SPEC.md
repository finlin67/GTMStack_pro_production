# Style Spec — Inspiration → Implementation

## 0) Scope (choose one)
- [x] Inspiration-only (palette/vibe/materials; layout can differ)
- [ ] Close match (similar layout structure)
- [ ] Site-wide theme rollout (apply progressively across pages)

## 1) Palette tokens (auto-extracted, tweak if needed)
Background:
- Base: #102040
- Alt: #203050
- Gradient: #203050 → #102040 (direction: to-b)

Text:
- Primary: #FFFFFF
- Secondary/muted: #20a0a0
- Subtle label: #94A3B8

Accents:
- Primary CTA: #205060
- Secondary accent: #404060
- Positive/Success: #22C55E
- Highlight metric: #FACC15

Gradient text (ONLY for emphasis spans, not entire headings):
- Start: #20a0a0
- End: #404060
- Direction: 135deg

## 2) Typography rules (prevents "purple wash")
Headlines:
- H1 base color must be: white-ish (text-white / text-slate-50)
- Gradient usage: max 1–2 emphasized phrases via <span> only
- H1 size (desktop): ~56–64px
- Tracking: tight
- Weight: semibold/bold

Body:
- Default text color: slate-200 / cyan-muted
- Max line length: 55–65ch

## 3) Layout rules (high-level)
- Container max width: max-w-7xl
- Section padding: py-20 md:py-28 lg:py-32
- Hero: 2-col (copy left / visual right)
- CTA count: 2 max

## 4) Materials / components
Cards:
- Dark glass surface + backdrop blur
- Thin border with cyan/blue glow on hover
- Hover: lift + glow

Buttons:
- Primary: filled + glow hover
- Secondary: outline/ghost, subtle glow

Stats:
- 3–4 metrics near hero; positive deltas in green

## 5) Background motifs (keep subtle)
- Radial glows (opacity 10–20%)
- Thin pathways/connection lines (low opacity)
- Optional grid/dots (very low opacity)

## 6) Motion rules
- Hover scale: 1.02–1.04
- Ambient motion: slow drift/pulse
- Must support prefers-reduced-motion

## 7) "Do Not Do" list
- Don’t apply gradient to entire headings
- Don’t tint the entire page purple
- Don’t introduce new UI libraries
- Don’t rewrite unrelated files

## 8) Protected regions (immutable blocks)
- Preserve any block marked "PROTECTED REGION" byte-for-byte.
