# Gallery Sync (manifest + thumbnails)

This repo’s `/gallery` page uses **local** data and images:

- `src/data/gallery-manifest.json` (data)
- `public/images/...` (thumbnails)

This document explains how to **safely sync** those from your local animations repo on the same machine.

---

## What the sync does

The sync script copies:

1. **Manifest JSON**
   - From: `C:\GitProd\GTMStack_Animations\gtmstack_animations\exports\gallery-manifest.json`
   - To: `src/data/gallery-manifest.json`

2. **Thumbnails referenced by the manifest**
   - For each manifest item with `thumbnailPath` like:
     - `animations/digital-demand/foo/preview.png`
   - It copies the thumbnail from the animations repo to:
     - `public/images/animations/digital-demand/foo/preview.png`

This is why the website can render thumbnails at:

- `thumbnailUrl = '/images/' + thumbnailPath`

---

## Safety rules (important)

- The script **never deletes** files.
- The default behavior is **dry-run** (no files are written).
- The script only overwrites destination files when you run with `--apply` (and it logs overwrites clearly).

---

## How to run

### 1) Dry-run (recommended first)

This prints what *would* be copied, but does not write any files:

```bash
npm run sync:gallery:dry
```

### 2) Apply (actually copies)

This copies the manifest and thumbnails into this repo:

```bash
npm run sync:gallery
```

---

## Troubleshooting

### If the manifest is missing

Symptoms:

- Sync errors with “Manifest not found”.

Fix:

- In the animations repo, regenerate the manifest so this file exists:
  - `exports/gallery-manifest.json`

### If thumbnails are missing

Symptoms:

- Sync summary shows “Missing thumbnails at source”.
- `/gallery` shows placeholder images instead of your real previews.

Fix:

- In the animations repo, (re)generate thumbnails so each project folder has `preview.png`.
- Re-run:
  - `npm run sync:gallery:dry`
  - then `npm run sync:gallery`

### If `/gallery` still shows placeholders after applying

Likely causes:

- You haven’t copied thumbnails into `public/images/...` yet (or paths don’t match).
- A manifest item’s `thumbnailPath` doesn’t exist on disk in the animations repo.

What to check:

- The file exists here after sync:
  - `public/images/<thumbnailPath>`

---

## Advanced (optional overrides)

You can run the script manually with overrides:

```bash
node scripts/sync-gallery.js --dry-run --animations-repo="C:\GitProd\GTMStack_Animations\gtmstack_animations"
```

Other optional flags:

- `--manifest-in=exports/gallery-manifest.json`
- `--manifest-out=src/data/gallery-manifest.json`
- `--images-out-root=public/images`

