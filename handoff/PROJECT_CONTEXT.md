# GTMStack.pro Project Context

## Project Name
GTMStack.pro

## Stack
- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Static/export-oriented deployment flow
- Headless WordPress integration for blog content

## Architecture Summary
- Registry-driven page architecture is active.
- Primary registry source is `src/data/page-registry.csv`, generated to `src/data/pageRegistry.generated.ts` by `scripts/gen-page-registry.ts`.
- Route lookups are centralized in `lib/pageRegistry.ts` and registry rows bind `route`, `templateId`, and `contentKey`.
- Catch-all route `app/[[...slug]]/page.tsx` resolves route -> template -> content through `getTemplate()` and `getContentByKey()`.
- Section routes such as `app/expertise/page.tsx`, `app/industries/page.tsx`, and `app/gallery/page.tsx` also use registry lookups.
- There are additional explicit section wrapper routes under `app/expertise/` and `app/industries/` that delegate to registry-driven rendering.

## Deployment Model
- Build: `npm run build`
- Static build variant: `npm run build:static` (`STATIC_EXPORT=1 next build --webpack`)
- Registry generation is coupled into build via `prebuild` (`npm run gen:registry`).

## Core Systems
1. Page registry
- `src/data/page-registry.csv`
- `src/data/pageRegistry.generated.ts`
- `lib/pageRegistry.ts`
- `scripts/gen-page-registry.ts`
- `scripts/validate-page-registry.ts`
- `scripts/registry-audit.mjs`

2. Template-to-content wiring
- Template mapping: `src/templates/registry.ts` (`TEMPLATE_BY_ID` + uploaded fallback)
- Uploaded template mapping: `src/templates/uploadedRegistry.generated.ts`
- Content mapping: `src/content/registry.ts` (`contentByKey`)

3. JSON/registry-driven content
- Registry rows bind `contentKey` -> content object through `src/content/registry.ts`
- Gallery metadata uses generated/override artifacts such as `src/data/animationCatalog.generated.ts` and `src/data/animationMeta.overrides.json`

4. Animation gallery thumbnail mapping
- Gallery template adapter: `lib/gallery-adapter.ts`
- Catalog source: `src/data/animationCatalog.generated.ts`
- Registry merge logic: `src/data/animations.ts` (`meta.thumbnailSrc` -> `previewImage`)
- Thumbnail generation/upload paths: `scripts/generate-thumbnails.js`, `app/api/animations/thumbnail/route.ts`

5. WordPress blog feed and taxonomy rendering
- WP clients: `lib/wp-client.ts` (browser/server compatible), `lib/wordpress.ts` (server-focused), `lib/wp-media.ts`
- Blog routes/components: `app/blog/page.tsx`, `app/blog/BlogIndexClient.tsx`, `app/blog/post/BlogPostClient.tsx`
- Taxonomy usage: category/tag fetch and rendering via WP terms helpers

## Known Ambiguities
- Canonical public blog detail route is `uncertain`.
- Runtime query-based route exists: `app/blog/post/page.tsx` + `app/blog/post/BlogPostClient.tsx` (`?slug=`).
- Separate MDX slug route exists: `app/blog/_[slug]/page.tsx`.
- `app/blog/[slug]/page.tsx` does not exist in this repo.
- `app/blog/_[slug]/page.tsx` expects local MDX posts in `content/blog/posts`, but that directory is currently absent.

## Constraints for AI-Assisted Work
- Do not rename routes.
- Do not refactor architecture.
- Do not alter runtime behavior without explicit approval.
- Do not churn dependencies unless required and approved.
- Preserve registry + template + content wiring.
- If source is missing or ambiguous, document as `uncertain` instead of guessing.

## Current Goal
- Stabilize first.
- Then execute small, isolated implementation batches with explicit scope, QA steps, and rollback notes.
