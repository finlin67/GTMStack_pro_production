# /gallery How It Works (Two Audiences)

This document explains how the Animation Gallery at `/gallery` works for:
1. Developer handoff and troubleshooting
2. Non-technical testers and operators

It is based on the current implementation in the GTMStack_pro_production repo.

--------------------------------------------------------------------------------

## Audience 1: Developer Handoff and Troubleshooting

### 1) Purpose of the Animation Gallery
The Animation Gallery is a portfolio-style library of GTMStack animations. It:
- Lists all available animations with thumbnails and metadata.
- Provides filters, search, and category/tag navigation.
- Opens a modal for deeper inspection, including a live preview (when possible) and GitHub links.

Primary goal: give a fast, structured view of the animation catalog and allow preview or inspection of source material.

### 2) Page Assembly and Data Flow

Route -> Page Registry -> Template -> Content + Manifest -> Client Shell + Modal

1. Route handler
   - `app/gallery/page.tsx`
   - Uses `getPageByRoute('/gallery')` from `lib/pageRegistry.ts`.
   - The page registry data comes from `src/data/pageRegistry.generated.ts` (generated from `src/data/page-registry.csv`).

2. Template selection
   - The registry returns `templateId: "gallery.main"` and `contentKey: "gallery:main"`.
   - Template mapping is in `src/templates/registry.ts`.
   - `gallery.main` resolves to `src/templates/gallery/GalleryMainTemplate.tsx`.

3. Content for hero text
   - Content key `gallery:main` maps to `content/gallery/main.ts` via `src/content/registry.ts`.
   - This only supplies hero title/subtitle/CTA and optional intro copy.

4. Server-side manifest load
   - `src/templates/gallery/GalleryMainTemplate.tsx` calls `getGalleryItems()` in `src/lib/galleryManifest.ts`.
   - It loads and normalizes `src/data/gallery-manifest.json`.
   - It maps the manifest items into a lightweight client shape and passes them to the client template.

5. Client-side rendering and behavior
   - `src/templates/gallery/GalleryMainTemplate.client.tsx`:
     - Normalizes summaries.
     - Applies canonical visibility rules (`applyCanonicalVisibility`) to hide duplicates or older versions.
     - Resolves preview mode for each item using `resolvePreviewDecision`.
     - Renders the main UI in `components/gallery/StitchGalleryShell.client.tsx`.
     - Renders the modal in `components/gallery/GalleryModal.tsx`.

### 3) What Populates the Gallery UI

#### A) Sidebar navigation filters
Implemented in `components/gallery/StitchGalleryShell.client.tsx`:
- Category dropdown
  - Built from unique `item.category` values (humanized by manifest normalization).
- Tag pills
  - Built from unique `item.tags` values, limited to 24.
- Search
  - Filters by title, summary, category, and tags.
- Preview section chips
  - "All", "Live Components", "Interactive HTML", "Thumbnail Fallback", "No Preview"
  - Based on each item's `previewMode`.

#### B) Grid cards (thumbnails, title, summary, tags)
Also in `StitchGalleryShell.client.tsx`:
- Thumbnail
  - Uses `item.thumbnailUrl` when available and `showThumbnails` is true.
  - If missing, renders a fallback tile with initials + category label.
- Title
  - From `manifest.title` (normalized).
- Summary
  - From `manifest.summary` (normalized).
- Tags
  - From `manifest.tags` (humanized).

#### C) Modal window contents
Defined in `components/gallery/GalleryModal.tsx`:

Header
- Title: `manifest.title` or animation registry title fallback.
- Summary: `manifest.summary` or registry description fallback.
- GitHub buttons:
  - `View Files on GitHub` uses `manifest.githubUrl`.
  - `Open README` uses `manifest.githubReadmeUrl` (only if present).
  - `Copy GitHub Link` copies `manifest.githubUrl`.

Preview area (deterministic priority, from `src/lib/galleryPreviewPolicy.ts`):
1. Live component (React component from ANIMATION_REGISTRY)
2. Iframe using `manifest.entryHtml` (if copied into `/public`)
3. Thumbnail fallback (manifest thumbnail)
4. Explicit fallback message

Footer
- Category label
- Preview mode label (live-component, iframe-entry-html, etc.)
- Tags list
- "Last updated" date (if provided by manifest)

### 4) How Gallery Items Map to Live Components

The gallery uses a manifest for metadata, but the live React previews are mapped via:
- `src/lib/galleryAnimationMap.ts`
- `src/data/animations.ts` (ANIMATION_REGISTRY)

Mapping logic order:
1. Explicit overrides in `GALLERY_ANIMATION_ID_MAP`
2. Exact match on `animationId`
3. Exact match on `id`
4. Case-insensitive match
5. Normalized fallback match (strip prefixes, version suffixes)

If a manifest entry does not resolve to an animation registry item, the modal cannot show a live component and will fall back to iframe or thumbnail (if available).

### 5) Manifest Normalization Rules (Important for Data Quality)
Implemented in `src/lib/galleryManifest.ts`:
- Title: strips leading emoji, replaces AI Studio placeholder titles.
- Summary: removes placeholder text, strips HTML, trims.
- Tags: removes placeholder word tags.
- Category and tags are converted to title case for display.
- Placeholder previews are detected by scanning the entry HTML file for known placeholder strings.
- Thumbnails are only used if the item is not a placeholder preview.

### 6) How Data and Assets Sync From GTMStack_Animations

Source of truth for gallery items is the GTMStack_Animations repo:
- Repo path on this machine:
  - `C:\GitProd\GTMStack_Animations\gtmstack_animations`
- Manifest:
  - Source: `exports/gallery-manifest.json`
  - Destination: `src/data/gallery-manifest.json`
- Thumbnails:
  - Source: paths from manifest `thumbnailPath`
  - Destination: `public/images/<thumbnailPath>`
- Optional entry HTML for iframe previews:
  - Source: `entryHtml` and sibling assets in animations repo
  - Destination: `public/<entryHtml>` and local assets

Primary sync tool:
- `scripts/sync-gallery.js`

Recommended commands:
- Dry run:
  - `npm run sync:gallery:dry`
- Apply:
  - `npm run sync:gallery`
- Optional: copy entry HTML and local assets
  - `node scripts/sync-gallery.js --apply --copy-entry-html`

Notes:
- Sync never deletes files.
- The default is dry-run, so you must pass `--apply` to write.

### 7) Troubleshooting Checklist (Developer)

Symptoms: Empty or missing gallery items
- Check `src/data/gallery-manifest.json` exists and is valid JSON.
- Check `scripts/sync-gallery.js` output for "manifest not found" or "invalid JSON".
- Verify `getGalleryItems()` in `src/lib/galleryManifest.ts` is returning items.

Symptoms: Thumbnails missing or showing placeholders
- Confirm `thumbnailPath` exists in manifest.
- Confirm file exists at `public/images/<thumbnailPath>`.
- If the item uses placeholder HTML, the thumbnail will be suppressed.

Symptoms: Modal shows no live animation
- Check `resolveRegistryIdForManifestItem` mapping in `src/lib/galleryAnimationMap.ts`.
- Ensure `ANIMATION_REGISTRY` contains the mapped id.
- Ensure the animation component can render without props.

Symptoms: Iframe preview fails
- Ensure `entryHtml` exists under `public/` in this repo.
- If missing, run sync with `--copy-entry-html`.

Symptoms: GitHub buttons missing
- Confirm `githubUrl` and `githubReadmeUrl` are present in the manifest entry.

--------------------------------------------------------------------------------

## Audience 2: Non-Technical User Guide (Testing and Light Troubleshooting)

### 1) Purpose of the Animation Gallery
The gallery is a browsable library of GTMStack animations. You can search, filter, and preview items, then open a pop-up window for more details or links.

### 2) How to Use the Gallery

Main actions:
- Search: Use the search bar to find animations by title or keyword.
- Category: Use the dropdown on the left to filter by category.
- Tags: Click tags to narrow results.
- Preview type chips:
  - Live Components: shows items with an interactive preview.
  - Interactive HTML: shows items that open in a mini viewer.
  - Thumbnail Fallback: shows items that only have an image preview.
  - No Preview: shows items that do not yet have preview assets.

### 3) What You See on Each Card

Each card shows:
- A thumbnail image (or a placeholder tile if no image exists)
- A title
- A short summary
- A few tags

### 4) What You See in the Pop-Up (Modal)

When you click a card:
- A pop-up opens.
- It shows:
  - Title and summary
  - A live preview or image (if available)
  - Category and tags
  - GitHub links (if provided)
  - Last updated date (if provided)

### 5) Quick Troubleshooting (Non-Technical)

If the gallery looks empty:
- Refresh the page.
- Clear any active search or filters.
- Try the "All" preview type chip.

If thumbnails are missing:
- This usually means the preview image is not available yet.
- The item should still open in the pop-up window.

If the pop-up preview is blank:
- Try a different item to confirm it is not specific to one animation.
- If multiple items fail, report it.

### 6) What to Report to a Developer
Please report:
- The animation title (as shown on the card).
- What you clicked.
- What you expected to see.
- What you actually saw.
- A screenshot if possible.

--------------------------------------------------------------------------------

## File Index (Key References)

Routing and page assembly:
- `app/gallery/page.tsx`
- `lib/pageRegistry.ts`
- `src/data/pageRegistry.generated.ts`
- `src/templates/registry.ts`

Gallery template:
- `src/templates/gallery/GalleryMainTemplate.tsx`
- `src/templates/gallery/GalleryMainTemplate.client.tsx`

Gallery shell and modal:
- `components/gallery/StitchGalleryShell.client.tsx`
- `components/gallery/GalleryModal.tsx`

Manifest and mapping:
- `src/lib/galleryManifest.ts`
- `src/lib/galleryAnimationMap.ts`
- `src/lib/galleryPreviewPolicy.ts`

Animation registry:
- `src/data/animations.ts`
- `src/components/animations/*`

Sync scripts:
- `scripts/sync-gallery.js`
- `scripts/generate-thumbnails.js`

