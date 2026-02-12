#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Usage:
 *   node scripts/stylepack.mjs --image ./inspo.png --page app/page.tsx --out ./stylepack
 *
 * Outputs:
 *   ./stylepack/STYLE_SPEC.md
 *   ./stylepack/theme.tokens.json
 */

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

const imagePath = arg("--image");
const pagePath = arg("--page", "app/page.tsx");
const outDir = arg("--out", "./stylepack");

if (!imagePath) {
  console.error("Missing --image. Example: node scripts/stylepack.mjs --image ./inspo.png");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

// Extract a compact palette by sampling dominant colors from a downscaled image.
// This is not perfect, but it’s stable enough to bootstrap tokens.
async function extractPalette(imgPath, swatches = 10) {
  const { data, info } = await sharp(imgPath)
    .resize(128, 128, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Simple histogram quantization.
  const buckets = new Map(); // key -> count
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    // bucketize to reduce noise
    const br = Math.round(r / 16) * 16;
    const bg = Math.round(g / 16) * 16;
    const bb = Math.round(b / 16) * 16;
    const key = `${br},${bg},${bb}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }

  const sorted = [...buckets.entries()].sort((a, b) => b[1] - a[1]);
  const toHex = (key) => {
    const [r, g, b] = key.split(",").map(Number);
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
  };

  // pick top colors, then dedupe near-equals
  const raw = sorted.slice(0, 40).map(([k]) => toHex(k));
  const deduped = [];
  const dist = (a, b) => {
    const pa = a.match(/\w\w/g).map(x => parseInt(x, 16));
    const pb = b.match(/\w\w/g).map(x => parseInt(x, 16));
    return Math.abs(pa[0]-pb[0]) + Math.abs(pa[1]-pb[1]) + Math.abs(pa[2]-pb[2]);
  };
  for (const c of raw) {
    if (!deduped.some(d => dist(d, c) < 40)) deduped.push(c);
    if (deduped.length >= swatches) break;
  }
  return deduped;
}

// Heuristic role assignment (you will tweak in STYLE_SPEC if needed)
function assignRoles(palette) {
  const isDark = (hex) => {
    const [r,g,b] = hex.match(/\w\w/g).map(x=>parseInt(x,16));
    const luma = 0.2126*r + 0.7152*g + 0.0722*b;
    return luma < 90;
  };
  const darks = palette.filter(isDark);
  const lights = palette.filter(c => !isDark(c));
  const background = darks[0] ?? "#020617";
  const backgroundAlt = darks[1] ?? "#0A0F2D";
  const foreground = "#FFFFFF";
  const muted = lights[0] ?? "#C7D2FE";

  // pick two accents that are not super close to bg
  const accents = palette.filter(c => c !== background && c !== backgroundAlt).slice(0, 4);
  const accentPrimary = accents[0] ?? "#00CFFF";
  const accentSecondary = accents[1] ?? "#3B82F6";

  // pick gradient start/end from remaining (fallbacks)
  const gradientStart = accents[2] ?? "#C026D3";
  const gradientEnd = accents[1] ?? "#3B82F6";

  return {
    background,
    backgroundAlt,
    foreground,
    muted,
    accentPrimary,
    accentSecondary,
    gradientStart,
    gradientEnd,
    success: "#22C55E",
    highlight: "#FACC15",
  };
}

const palette = await extractPalette(imagePath, 10);
const roles = assignRoles(palette);

const tokens = {
  meta: {
    sourceImage: imagePath,
    targetPage: pagePath,
    generatedAt: new Date().toISOString(),
  },
  palette,
  roles,
  usageRules: {
    headings: "Headings are white base; gradient only on emphasized spans (1–2 phrases).",
    overlays: "Background overlays/glows must be subtle (10–20% opacity) and localized.",
    materials: "Cards use dark glass (blur + thin border + hover glow).",
    motion: "Premium subtle motion; respect prefers-reduced-motion.",
  },
};

fs.writeFileSync(path.join(outDir, "theme.tokens.json"), JSON.stringify(tokens, null, 2), "utf8");

// STYLE_SPEC.md template prefilled with extracted roles
const styleSpec = `# Style Spec — Inspiration → Implementation

## 0) Scope (choose one)
- [x] Inspiration-only (palette/vibe/materials; layout can differ)
- [ ] Close match (similar layout structure)
- [ ] Site-wide theme rollout (apply progressively across pages)

## 1) Palette tokens (auto-extracted, tweak if needed)
Background:
- Base: ${roles.background}
- Alt: ${roles.backgroundAlt}
- Gradient: ${roles.backgroundAlt} → ${roles.background} (direction: to-b)

Text:
- Primary: ${roles.foreground}
- Secondary/muted: ${roles.muted}
- Subtle label: #94A3B8

Accents:
- Primary CTA: ${roles.accentPrimary}
- Secondary accent: ${roles.accentSecondary}
- Positive/Success: ${roles.success}
- Highlight metric: ${roles.highlight}

Gradient text (ONLY for emphasis spans, not entire headings):
- Start: ${roles.gradientStart}
- End: ${roles.gradientEnd}
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
`;

fs.writeFileSync(path.join(outDir, "STYLE_SPEC.md"), styleSpec, "utf8");

console.log(`✅ Wrote:
- ${path.join(outDir, "STYLE_SPEC.md")}
- ${path.join(outDir, "theme.tokens.json")}

Palette: ${palette.join(", ")}
`);
