# Animation Change Checklist (Both Repos)

Use this single checklist whenever you need to add, remove, or modify an animation.

## Repositories

- Source assets repo: `C:\GitProd\GTMStack_Animations\gtmstack_animations`
- Website/runtime repo: `C:\GitProd\GTMStack_pro_production`

---

## Add a New Animation

- [ ] In animations repo, create `animations/<category>/<slug>/` and add source files (`.html` and/or `.tsx`) plus `README.md`.
- [ ] Add or generate thumbnail (`preview.png`):
  - `npm run thumbs:dry`
  - `npm run thumbs:gen -- --central-output=assets/thumbnails`
- [ ] Regenerate manifest:
  - `npm run manifest:dry`
  - `npm run manifest:gen`
- [ ] If TSX-only and no HTML preview, scaffold preview HTML (optional):
  - `npm run preview-html:gen`
- [ ] In production repo, sync manifest + thumbnails:
  - `npm run sync:gallery:dry`
  - `npm run sync:gallery`
- [ ] If it must show as a live React preview, register it in:
  - `src/data/animations.ts` (gallery + multi-variant routes), and/or
  - `lib/heroVisualRegistry.ts` (single fixed hero route)
- [ ] If manifest `id` does not match registry `id`, add/update mapping in `src/lib/galleryAnimationMap.ts`.
- [ ] Verify `/gallery` card, modal preview, filters, and target route hero rendering.

---

## Remove an Animation

- [ ] In animations repo, remove the animation (or mark unpublished if using metadata flow).
- [ ] Regenerate outputs:
  - `npm run manifest:gen`
  - `npm run thumbs:gen -- --central-output=assets/thumbnails` (if needed)
- [ ] In production repo, sync again:
  - `npm run sync:gallery`
- [ ] Remove stale runtime registrations/imports from:
  - `src/data/animations.ts`
  - `lib/heroVisualRegistry.ts`
- [ ] Remove obsolete resolver entries from `src/lib/galleryAnimationMap.ts` if they point to deleted items.
- [ ] Optionally clean orphan images under `public/images/...` (sync script does not delete files).
- [ ] Verify the item is gone from `/gallery` and related route hero sections still work.

---

## Modify a Single Animation

- [ ] In animations repo, update animation source, README metadata, and/or thumbnail.
- [ ] Regenerate outputs:
  - `npm run thumbs:gen -- --central-output=assets/thumbnails` (if visual changed)
  - `npm run manifest:gen` (if title/summary/tags/links/date changed)
- [ ] In production repo, resync:
  - `npm run sync:gallery:dry`
  - `npm run sync:gallery`
- [ ] If animation `id` changed, update:
  - registry entries (`src/data/animations.ts` / `lib/heroVisualRegistry.ts`)
  - resolver map (`src/lib/galleryAnimationMap.ts`)
- [ ] Verify:
  - updated card metadata appears on `/gallery`
  - modal preview works (live, iframe, or thumbnail fallback as expected)
  - any route hero using this animation still renders correctly

---

## Final Pre-Commit Check

- [ ] `src/data/gallery-manifest.json` exists and is valid.
- [ ] Every expected thumbnail exists at `public/images/<thumbnailPath>`.
- [ ] Modal GitHub/README buttons appear only where URLs exist in manifest.
- [ ] No placeholder preview HTML is unintentionally suppressing thumbnail display.
- [ ] Quick smoke test passes on `/gallery` and affected routes.

