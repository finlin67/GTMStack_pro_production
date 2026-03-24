# Gallery Thumbnail Handoff

This document covers everything a developer needs to know to maintain, generate,
and troubleshoot thumbnails on the `/gallery` page.

It reflects changes made during a targeted debugging and tooling session in March 2026.

---

## 1. What Was Added (Changes From This Session)

Three new files were added and `package.json` was updated.

### New files

| File | Purpose |
|---|---|
| `app/preview/[animationId]/page.tsx` | Next.js route that renders a single animation full-screen. Used only by the screenshot script — never statically generated, excluded from sitemaps. |
| `app/preview/[animationId]/PreviewClient.tsx` | Client component that looks up an animation by ID in `ANIMATION_REGISTRY` and renders it full-screen over the nav/footer using `position: fixed; z-index: 9999`. Shows "Animation not found" if the ID doesn't resolve. |
| `scripts/screenshot-live-components.ts` | Puppeteer script that visits `/preview/[animationId]` for each manifest item that resolves to a live React component, waits for the animation to settle, and saves a PNG to `public/images/<thumbnailPath>`. |

### New npm scripts (package.json)

```bash
npm run screenshot:live:dry    # dry-run — lists what would be screenshotted, no writes
npm run screenshot:live        # write thumbnails to public/images/
npm run screenshot:live:copy   # write thumbnails AND copy them back to GTMStack_Animations
```

### What was NOT changed

- `src/lib/galleryManifest.ts` — no changes
- `src/lib/galleryAnimationMap.ts` — no changes
- `src/data/gallery-manifest.json` — no changes
- `components/gallery/StitchGalleryShell.client.tsx` — no changes
- `components/gallery/GalleryModal.tsx` — no changes
- `scripts/sync-gallery.js` — no changes

---

## 2. How the Thumbnail Pipeline Works

Two repositories are involved:

- **`GTMStack_Animations`** (local: `C:\GitProd\GTMStack_Animations\gtmstack_animations`) — source of truth for animation metadata and thumbnails
- **`GTMStack_pro_production`** (this repo) — consumes and serves thumbnails

### Data flow

```
GTMStack_Animations
  exports/gallery-manifest.json      ← metadata for all animations
  animations/<cat>/<slug>/preview.png ← source thumbnails
        |
        | npm run sync:gallery
        ↓
GTMStack_pro_production
  src/data/gallery-manifest.json     ← copied manifest
  public/images/animations/...       ← copied thumbnails
        |
        | src/lib/galleryManifest.ts (server-side)
        | reads manifest → builds GalleryItem[]
        | sets thumbnailUrl = '/images/' + thumbnailPath
        ↓
  components/gallery/StitchGalleryShell.client.tsx
        | renders <Image src={item.thumbnailUrl} /> on each card
        | falls back to initials tile if thumbnailUrl is undefined
```

### The placeholder suppression rule (important)

`src/lib/galleryManifest.ts` contains a function called `isPlaceholderPreviewHtml`.
For every manifest item, it checks whether the animation's entry HTML file
(at `public/animations/<category>/<slug>/preview.html` in this repo) contains
any of these strings:

- `Gallery thumbnail placeholder (Option B)`
- `Run and deploy your AI Studio app`
- `This contains everything you need to run your app locally.`

If a match is found, `thumbnailUrl` is set to `undefined` for that item — even
if a valid `preview.png` exists in `public/images/`. The card will show an
initials tile instead of the thumbnail.

**This was the root cause of most thumbnail display failures.** 97 placeholder
HTML files were present in `public/animations/` and were suppressing thumbnails
for 97 animations. They were deleted as part of this session.

---

## 3. Generating and Re-generating Thumbnails

There are two scripts depending on animation type.

### Live React (TSX) animations — use the new script

This covers the majority of animations registered in `ANIMATION_REGISTRY`.

```bash
# Step 1 — start the dev server (must stay running)
npm run dev

# Step 2 — dry run to see what would be screenshotted
npm run screenshot:live:dry

# Step 3 — write thumbnails to public/images/
npm run screenshot:live

# Optional — also copy thumbnails back to GTMStack_Animations repo
npm run screenshot:live:copy
```

**Target a single animation** (useful for testing or fixing one card):
```bash
npx tsx scripts/screenshot-live-components.ts --apply --id=marketing-analytics-carousel
```

You can verify what the screenshot will look like by visiting the preview URL
directly in your browser:
```
http://localhost:3000/preview/marketing-analytics-carousel
```

**All flags:**

| Flag | Default | Description |
|---|---|---|
| `--apply` | false | Write files (default is dry-run) |
| `--id=<animationId>` | — | Screenshot one animation only |
| `--limit=<n>` | 0 (all) | Cap number of screenshots |
| `--settle-ms=<ms>` | 2500 | Wait time after page load |
| `--base-url=<url>` | http://localhost:3000 | Dev server URL |
| `--width=<px>` | 1280 | Viewport width |
| `--height=<px>` | 720 | Viewport height |
| `--copy-to-animations-repo` | false | Also copy to GTMStack_Animations |
| `--animations-repo=<path>` | C:\GitProd\GTMStack_Animations\... | Animations repo path |

### HTML-only animations — use the existing script

For animations that only have an HTML entry file (no TSX component in `ANIMATION_REGISTRY`):

```bash
npm run regen:gallery-thumbs:dry   # preview
npm run regen:gallery-thumbs       # write
```

This script screenshots HTML files served from `public/animations/`.
It will be a no-op for animations without HTML files in that directory.

### Syncing manifest and thumbnails from GTMStack_Animations

Run this after changes are made in the animations repo (new animations,
updated thumbnails, metadata changes):

```bash
npm run sync:gallery:dry   # preview
npm run sync:gallery       # apply
```

> **Never run `npm run sync:gallery:entry-html`.**
> This flag copies HTML entry files into `public/animations/`, which will
> trigger the placeholder suppression rule if any of those HTML files contain
> placeholder content. This was the original source of the 97-file suppression
> problem.

---

## 4. Troubleshooting

### A) Card shows initials tile instead of a thumbnail image

**Check 1 — Is a placeholder HTML file blocking it?**
```bash
grep -rl "Run and deploy your AI Studio app" public/animations/
```
If this returns any file paths, delete them and hard refresh the browser (`Ctrl+Shift+R`).

To delete all at once:
```bash
grep -rl "Run and deploy your AI Studio app\|Gallery thumbnail placeholder (Option B)\|This contains everything you need to run your app locally" public/animations/ | xargs rm -f
```

**Check 2 — Does the thumbnail file actually exist?**

Find the `thumbnailPath` for the animation in `src/data/gallery-manifest.json`,
then check:
```bash
ls public/images/<thumbnailPath>
# e.g. ls public/images/animations/operations/live-email-automation-ecosystem-v2/preview.png
```
If missing, run `npm run screenshot:live` (for TSX) or `npm run sync:gallery` (to pull from animations repo).

**Check 3 — Is the manifest item being resolved correctly?**

Open `src/data/gallery-manifest.json` and find the item. Check whether
`thumbnailPath` is set. If it is missing entirely, the manifest needs to be
regenerated in `GTMStack_Animations` and re-synced.

---

### B) All thumbnails are missing after a sync

**Check 1 — Is the manifest valid JSON?**
```bash
node -e "JSON.parse(require('fs').readFileSync('src/data/gallery-manifest.json','utf8')); console.log('OK')"
```
If this fails, the manifest was corrupted during sync. Copy a known-good version
from `GTMStack_Animations/exports/gallery-manifest.json`.

**Check 2 — Did thumbnails actually get copied to `public/images/`?**
```bash
find public/images/animations -name "preview.png" | wc -l
```
If the count is 0 or very low, re-run `npm run sync:gallery`.

---

### C) The `screenshot:live` script fails

| Error message | Fix |
|---|---|
| `Dev server not reachable at http://localhost:3000` | Run `npm run dev` first and wait for it to finish starting |
| `No resolved target found for --id=<x>` | The ID doesn't match any entry in `ANIMATION_CATALOG`. Check the ID spelling against `src/data/animationCatalog.generated.ts` |
| Animation loads but screenshot is blank | Increase settle time: `--settle-ms=4000` |
| Animation shows "Animation not found" in screenshot | The manifest `animationId` doesn't resolve to a registry entry. Add a manual mapping in `src/lib/galleryAnimationMap.ts` → `GALLERY_ANIMATION_ID_MAP` |

---

### D) One specific animation won't resolve to a live preview

The script uses the same ID resolution logic as `src/lib/galleryAnimationMap.ts`.
Resolution order:

1. `animationId` field on the manifest item (if set)
2. `GALLERY_ANIMATION_ID_MAP` explicit overrides
3. Exact ID match against `ANIMATION_CATALOG`
4. Case-insensitive match
5. Normalized match (strips version suffix `-v2`, `-v3` and common prefixes)

If none of these match, add an entry to `GALLERY_ANIMATION_ID_MAP` in
`src/lib/galleryAnimationMap.ts`:

```typescript
// src/lib/galleryAnimationMap.ts
export const GALLERY_ANIMATION_ID_MAP: Record<string, string> = {
  // existing entries...
  'my-new-animation-v2': 'my-new-animation',  // add here
}
```

---

## 5. Key Files Reference

| File | Purpose | When to touch |
|---|---|---|
| `src/data/gallery-manifest.json` | Manifest consumed by the website. Never edit manually. | After running `sync:gallery` |
| `src/lib/galleryManifest.ts` | Loads and normalizes the manifest. Sets `thumbnailUrl`. Contains placeholder suppression logic. | If suppression logic needs updating |
| `src/lib/galleryAnimationMap.ts` | Maps manifest IDs to `ANIMATION_REGISTRY` IDs. | When an animation ID doesn't auto-resolve |
| `src/data/animationCatalog.generated.ts` | Auto-generated list of all animation IDs. Never edit manually. | Regenerated by `gen-animation-catalog.ts` |
| `src/data/animations.ts` | `ANIMATION_REGISTRY` — the live React components. | When adding/removing animations |
| `components/gallery/StitchGalleryShell.client.tsx` | Renders the card grid. Uses `item.thumbnailUrl`. | UI/layout changes only |
| `components/gallery/GalleryModal.tsx` | Renders the modal. Uses live component or iframe fallback. | Modal UI changes only |
| `app/preview/[animationId]/page.tsx` | Screenshot-only route. No nav/footer. | Rarely — only if the route needs adjustment |
| `app/preview/[animationId]/PreviewClient.tsx` | Renders animation full-screen for screenshot. | Rarely — only if layout of screenshots needs adjustment |
| `scripts/screenshot-live-components.ts` | Puppeteer script for TSX animation thumbnails. | When extending screenshot logic |
| `scripts/sync-gallery.js` | Copies manifest + thumbnails from GTMStack_Animations. | If sync paths change |
| `scripts/regenerate-gallery-thumbnails.ts` | Puppeteer script for HTML-only animation thumbnails. | For HTML-based animations only |
| `public/animations/` | Entry HTML files for iframe previews. Placeholder files here suppress thumbnails. | Keep clean — delete placeholder HTML files |
| `public/images/animations/` | Served thumbnail images. | Populated by sync or screenshot scripts |

---

## 6. Adding a New Animation

When a new animation is added to `GTMStack_Animations`:

**In `GTMStack_Animations`:**
1. Add the animation folder under `animations/<category>/<slug>/`
2. Add `preview.png` (the thumbnail source)
3. Update `meta.json`
4. Run `npm run manifest:gen` to regenerate `exports/gallery-manifest.json`

**In `GTMStack_pro_production`:**
```bash
npm run sync:gallery            # pull manifest + thumbnail
npm run dev                     # start dev server
npm run screenshot:live --apply --id=<new-animation-id>  # if it's a TSX animation
```

If the new animation doesn't auto-resolve (card still shows initials after sync),
add it to `GALLERY_ANIMATION_ID_MAP` in `src/lib/galleryAnimationMap.ts`.

---

## 7. The Placeholder Suppression Rule (Developer Detail)

This is the most important thing to understand when debugging missing thumbnails.

In `src/lib/galleryManifest.ts`, the function `isPlaceholderPreviewHtml` reads
the file at `public/animations/<category>/<slug>/preview.html` (if it exists)
and checks its text content for known placeholder strings.

If a placeholder is detected:
- `placeholderPreview = true`
- `thumbnailUrl = undefined` — thumbnail is suppressed regardless of whether `preview.png` exists
- `entryHtml` is also cleared so no iframe preview is shown either

The entry HTML files in `public/animations/` should only be present if they contain
**real animation content**. Placeholder HTML files were generated by AI Studio's
scaffolding tool and got accidentally synced into this repo via `--copy-entry-html`.

**Safe rule:** Never run `npm run sync:gallery:entry-html`. If an animation only
has a TSX component and no real HTML entry file, do not copy its HTML into
`public/animations/`. Use the `screenshot:live` script to generate its thumbnail instead.

**To check if any placeholder files have crept back in:**
```bash
grep -rl "Run and deploy your AI Studio app" public/animations/ | wc -l
# Should return 0
```
