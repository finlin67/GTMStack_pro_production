# Registry Review Notes (Expertise Pillars & Topics)

> This file documents known fixes and decisions in the page registry /
> content registry, so future changes remain intentional and traceable.

## CSV fixes

- **/expertise/demand-growth**
  - **Before**: `fileRef=content/expertise.ts` (generic aggregator, no concrete file)
  - **After**: `fileRef=content/expertise/pillars/demand-growth.ts`
  - **Reason**: Pillar pages should point at a pillar-scoped content file. We added
    `content/expertise/pillars/demand-growth.ts` as an alias that re-exports the
    existing `DEMAND_GROWTH_CONTENT` while giving the registry a precise, non-ambiguous
    fileRef.

- **/expertise/content-engagement**
  - **Before**: `fileRef=content/expertise.ts` (generic aggregator, no concrete file)
  - **After**: `fileRef=content/expertise/pillars/content-engagement.ts`
  - **Reason**: Same pattern as `demand-growth`. Pillar landing pages now resolve to
    explícit `content/expertise/pillars/*` files instead of the shared expertise
    index.

## Content registry wiring

- **New pillar files**
  - `content/expertise/pillars/demand-growth.ts`
    - Re-exports `DEMAND_GROWTH_CONTENT` from `content/expertise/demand-growth.ts`
    - Keeps the actual content definition in one place while satisfying the pillar
      fileRef requirement.
  - `content/expertise/pillars/content-engagement.ts`
    - Minimal placeholder export (`CONTENT_ENGAGEMENT_CONTENT`) with a stub
      structure and descriptive text.

- **src/content/registry.ts**
  - Switched `pillar:demand-growth` to import from
    `@/content/expertise/pillars/demand-growth`.
  - Added a new mapping for `pillar:content-engagement` pointing to
    `CONTENT_ENGAGEMENT_CONTENT`.
  - Left existing expertise topic + hub mappings unchanged.

## Admin + sitemap integration

- **src/data/sitemap.ts**
  - Introduced `FIXED_SITEMAP` covering the small set of core, registry-managed
    routes (home, expertise hub, expertise pillars/topics, industries hub + healthcare,
    case study example, gallery).
  - Each entry carries `route`, `title`, `section`, `type`, `templateId`,
    and `contentKey` to mirror the CSV.

- **app/admin/page.tsx**
  - Registry page list is now driven from `FIXED_SITEMAP` instead of the dynamic
    `/api/admin/pages` endpoint, keeping the dashboard aligned with the curated
    CSV/sitemap.
  - Added a "Sitemap View" panel with:
    - Text filter over route / title / section.
    - Dropdown bound to `FIXED_SITEMAP`.
    - Button to open the Quick Page Update wizard with the selected route prefilled.

- **components/admin/wizards/QuickPageUpdateWizard.tsx**
  - Accepts an optional `initialRoute` prop; when present, it seeds the URL step
    from the admin Sitemap View so the wizard starts with a concrete page selection.

