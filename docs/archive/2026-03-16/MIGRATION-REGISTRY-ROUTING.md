# Migration: Registry-Based Routing (Catch-All)

All non-blog, non-admin pages are now rendered by a single **catch-all route** that uses the page registry (`src/data/page-registry.csv` → `pageRegistry.generated.ts`).

## What Changed

### New files

- **`app/[[...slug]]/page.tsx`** – Optional catch-all route. Builds `route` from `params.slug` (e.g. `slug = ['expertise','demand-growth']` → `route = '/expertise/demand-growth'`), then renders `<RegistryRenderer route={route} />`. Handles 404 when the route is not in the registry.
- **`components/registry/RegistryRenderer.tsx`** – Renders a page by route: looks up the row in `PAGE_BY_ROUTE`, resolves template and content, and renders the correct template (with template-specific logic for `industry.base`, `caseStudy.base`, `expertise.category`, `expertise.topic`).

### Removed files (registry-managed routes)

These routes are now handled only by the catch-all; the following `page.tsx` files were removed:

- `app/page.tsx` (home `/`)
- `app/expertise/page.tsx` (`/expertise`)
- `app/expertise/[slug]/page.tsx` (`/expertise/*`)
- `app/industries/page.tsx` (`/industries`)
- `app/industries/[slug]/page.tsx` (`/industries/*`)
- `app/gallery/page.tsx` (`/gallery`)
- `app/case-studies/page.tsx` (`/case-studies`)
- `app/case-studies/[slug]/page.tsx` (`/case-studies/*`)
- `app/projects/page.tsx` (`/projects`)
- `app/projects/[slug]/page.tsx` (`/projects/*`)

**Kept (unchanged):**

- `app/blog/*` – Blog remains filesystem-based.
- `app/admin/*` – Admin dashboard unchanged.
- `app/expertise/[slug]/ExpertiseDetailContent.tsx` – Still used by `RegistryRenderer` for expertise category/topic content.
- All other app routes (e.g. `app/about/page.tsx`, `app/contact/page.tsx`, `app/services/*`, `app/gallery/admin/*`) – Still use their own `page.tsx`; they are not in the registry.

## How the catch-all works

1. Request comes in (e.g. `/expertise/demand-growth`).
2. Next.js matches `app/[[...slug]]/page.tsx` with `params.slug = ['expertise', 'demand-growth']`.
3. `buildRoute(params.slug)` → `'/expertise/demand-growth'`.
4. If route starts with `/blog` or `/admin`, `notFound()` (defensive; those are usually matched by more specific routes).
5. `<RegistryRenderer route={route} />` runs:
   - `getPageByRoute(route)` → registry row or `null` → `notFound()` if null.
   - For `industry.base`, `caseStudy.base`, `expertise.category`, `expertise.topic`: template-specific resolution (industry content, case study by slug, expertise detail content, etc.).
   - For other templates: `getTemplate(row.templateId)`, `getContentByKey(row.contentKey)`, render `<Template pageTitle=... theme=... content={content} />`.

## Example: delegator (if you ever need a thin wrapper)

If you had to keep a filesystem route but still render via the registry (e.g. during a gradual rollout), you could use a delegator like this:

```tsx
// app/expertise/[slug]/page.tsx (example delegator – not used after migration)
import RegistryRenderer from '@/components/registry/RegistryRenderer'

type Props = { params: { slug: string } }

export default function Delegator({ params }: Props) {
  const route = `/expertise/${params.slug ?? ''}`
  return <RegistryRenderer route={route} />
}
```

After confirming the catch-all works, the delegator can be removed so the catch-all is the only handler for that path.

## Testing

1. Run `npm run gen:registry` (regenerate `pageRegistry.generated.ts` from CSV).
2. Test these routes (should render via registry):
   - `/` (home)
   - `/expertise`
   - `/expertise/demand-growth`
   - `/expertise/demand-generation`
   - `/industries`
   - `/industries/healthcare`
   - `/gallery`
   - `/case-studies/event-to-store-lift-retail`
3. Test blog and admin (unchanged):
   - `/blog`, `/blog/[slug]`
   - `/admin`
4. A route not in the registry (e.g. `/industries/some-unknown`) should 404.

## Adding new registry pages

1. Add the row to `src/data/page-registry.csv` (or use the admin Quick Page Update wizard).
2. Run `npm run gen:registry`.
3. The new route will be served by the catch-all with no new `page.tsx` needed.
