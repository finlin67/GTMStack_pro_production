# Animation Gallery Manifest Integration

This document explains how the **Animation Gallery** (`/gallery`) uses the gallery manifest generated from the separate **GTMStack-Animations** repository.

---

## 1. Where the manifest comes from

- Source repo: `finlin67/GTMStack-Animations`  
- That repo generates a JSON manifest at:
  - `exports/gallery-manifest.json`
- In this Next.js app, the manifest is copied to:
  - `src/data/gallery-manifest.json`

This app **does not generate** the manifest itself. It only **consumes** the JSON file.

---

## 2. Expected schema

Each entry in `src/data/gallery-manifest.json` looks like this:

```ts
type GalleryManifestItem = {
  id: string
  slug: string
  title: string
  category: string
  tags: string[]
  summary?: string | null
  projectPath: string
  entryHtml: string
  thumbnailPath?: string
  githubUrl: string
  githubReadmeUrl?: string
  updatedAt?: string | null
}
```

Notes:

- `summary`, `thumbnailPath`, and `githubReadmeUrl` are **optional**.
- `projectPath` and `entryHtml` are repo-relative paths within the animations repo.
- All paths use **forward slashes** (`/`), even on Windows.

At runtime, this app normalizes each entry into a richer `GalleryItem` type that adds:

- `displayCategory` — human-friendly label for `category`
- `displayTags` — human-friendly labels for `tags`
- `thumbnailUrl` — mapped to a URL under `/images/...` (see below)

Implementation: see `src/lib/galleryManifest.ts`.

---

## 3. How `/gallery` uses the manifest

### 3.1 Server-side loader

The file `src/lib/galleryManifest.ts` is **server-side only** and:

- Reads and parses `src/data/gallery-manifest.json` (with safe error handling).
- Maps `thumbnailPath` to a URL the app can serve:
  - `thumbnailUrl = '/images/' + thumbnailPath`
- Normalizes category and tags into display-friendly labels.
- Exposes helpers:
  - `getGalleryItems(): GalleryItem[]`
  - `getGalleryItemById(id: string): GalleryItem | null`
  - `getGalleryCategories(): string[]`
  - `searchGalleryItems(query, filters)`

If the manifest is **missing or invalid**, these helpers:

- Log a warning to the server console.
- Return an **empty array** instead of throwing.

### 3.2 Server wrapper for the gallery template

- `src/templates/gallery/GalleryMainTemplate.tsx` is a **server component wrapper**.
- It calls `getGalleryItems()` on the server, maps them to a lightweight client shape, and passes them as `initialItems` into the client component:
  - `src/templates/gallery/GalleryMainTemplate.client.tsx`

The template mapping in `src/templates/registry.ts` points `gallery.main` to this wrapper.

### 3.3 Client gallery template

`src/templates/gallery/GalleryMainTemplate.client.tsx`:

- Uses `initialItems` from the manifest to build the content structure expected by the presentational shell `Uploaded_AnimationGallery_v1`.
- Derives:
  - Card list (thumbnail, title, summary, tags)
  - List of categories (for filters)
  - List of tags (for filters)
- Keeps a **fallback**:
  - If `initialItems` is empty, it falls back to the previous behavior (`adaptGalleryData(ANIMATION_REGISTRY, hero)`), so `/gallery` still renders even if the manifest is missing.

The **live animation preview** in the modal still uses `ANIMATION_REGISTRY` to render the actual React animation components. The manifest is used for metadata (title, summary, category, tags, GitHub links).

---

## 4. Modal content and GitHub integration

`components/gallery/GalleryModal.tsx` now combines:

- The **animation component** from `ANIMATION_REGISTRY` (for the running preview).
- The **manifest metadata** for:
  - Title (with fallback to animation title)
  - Summary (with fallback to animation description)
  - Category (with fallback to animation marketingFunction)
  - Tags (with fallback to animation tags)
  - GitHub links
  - Last updated date

Buttons in the modal (when data is available):

- **View Files on GitHub** → `githubUrl` (opens in a new tab, with `rel="noopener noreferrer"`).
- **Open README** → `githubReadmeUrl` (only shown when present).
- **Copy GitHub Link** → copies `githubUrl` to the clipboard (best-effort; silently ignored if not available).

If no manifest entry exists for the selected animation, the modal falls back to the animation’s own title/description/tags and hides the GitHub-specific buttons.

---

## 5. How to refresh the manifest

1. In **GTMStack-Animations**:
   - Regenerate the gallery manifest so that `exports/gallery-manifest.json` is up to date.
2. In this repo (**GTMStack_pro_production**):
   - Copy `exports/gallery-manifest.json` from the animations repo to:
     - `src/data/gallery-manifest.json`
   - Copy any **new thumbnails** into:
     - `public/images/...`
     - Preserve the same relative `thumbnailPath` used in the manifest (for example, if `thumbnailPath` is `animations/operations/foo/preview.png`, the image should live at `public/images/animations/operations/foo/preview.png`).
3. Rebuild or restart the dev server so the new manifest is picked up.

---

## 6. Troubleshooting

### Manifest file missing or invalid

Symptoms:

- `/gallery` renders, but only shows the legacy animation cards from the internal registry (or an empty state), and no README / GitHub details in the modal.

What happens under the hood:

- `getGalleryItems()` logs a warning and returns `[]`.
- The gallery template falls back to `adaptGalleryData(ANIMATION_REGISTRY, hero)`.

How to fix:

- Ensure `src/data/gallery-manifest.json` exists and is valid JSON.
- Ensure it matches the expected schema above.

### Thumbnails missing

Symptoms:

- Cards might show placeholder images (generated `picsum.photos` URLs) instead of your actual previews.

What happens under the hood:

- If `thumbnailPath` or the derived `thumbnailUrl` is missing, the card falls back to a placeholder image.

How to fix:

- Confirm the manifest has `thumbnailPath` set for the entry.
- Copy the corresponding PNG/JPG into `public/images/...` using the same relative path.

### GitHub buttons not showing

Symptoms:

- No “View Files on GitHub” or “Open README” buttons in the modal for a given animation.

What happens:

- The modal only renders these buttons if `githubUrl` (and optionally `githubReadmeUrl`) exist in the manifest entry for that `id`.

How to fix:

- Add or correct `githubUrl` / `githubReadmeUrl` in the manifest for that animation.

---

## 7. Safety notes

- The **hero animation registry** and other animation systems (`ANIMATION_REGISTRY`, `HERO_VISUAL_REGISTRY`, etc.) are **not changed** by this integration.
- The manifest is only used for:
  - `/gallery` card data
  - Modal metadata + GitHub/README links
- If the manifest is missing or broken, `/gallery` **still renders** using the legacy data source. The site does not crash.

