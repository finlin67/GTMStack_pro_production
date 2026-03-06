# Admin TemplateID Determination, Mapping, and Usage

_Last reviewed: 2026-02-27_

## Scope

This document describes how `TemplateID` values are:

1. **Determined** in Admin UI flows
2. **Mapped/persisted** into registry files
3. **Used** at runtime to render pages

It covers both the currently active legacy Admin screen and the newer wizard-based admin components present in `components/admin`.

---

## Canonical Data & Runtime Resolution

## 1) Source-of-truth records

- Page-level template assignment is stored in `src/data/page-registry.csv` (`templateId` column).
- `npm run gen:registry` compiles CSV into `src/data/pageRegistry.generated.ts`.
- Runtime routes (`app/[[...slug]]/page.tsx` and `app/p/[[...slug]]/page.tsx`) read `PAGE_REGISTRY`, then resolve template via:
  - `getTemplate(page.templateId)` from `src/templates/registry.ts`
  - `getContentByKey(page.contentKey)` from `src/content/registry.ts`

## 2) Runtime template lookup order

`src/templates/registry.ts`:

1. `getUploadedTemplate(templateId)` (from `src/templates/uploadedRegistry.generated.ts`)
2. fallback to `TEMPLATE_BY_ID[templateId]`
3. throw error if still unknown

So runtime can render either:
- a registry-mapped template (`TEMPLATE_BY_ID`), or
- a file-based uploaded template ID from `uploadedRegistry.generated.ts`.

---

## Admin Sections That Set TemplateID

## A) Legacy Admin screen (currently mounted)

- Entry: `app/admin/page.tsx`
- Save endpoint: `POST /api/admin/manager`
- Optional upload endpoint: `POST /api/admin/templates/upload`

### How TemplateID is determined (legacy)

1. User picks from hard-coded `TEMPLATE_OPTIONS` radio values in `app/admin/page.tsx`.
2. If user uploads `.tsx`, `uploadTemplateId` is auto-seeded from filename, then sanitized to `[a-zA-Z0-9_-]`.
3. `templates/upload` writes file to `src/templates/<templateId>.tsx`, updates matching CSV row `templateId`, and regenerates `uploadedRegistry.generated.ts`.
4. Save action (`/api/admin/manager`) writes selected `templateId` into CSV row (existing or new route row).

### Mapping behavior (legacy)

- `manager` may also patch `src/templates/registry.ts` if a template file was uploaded through that same request path.
- CSV is always the page-level mapping (`route -> templateId`).
- If using `/api/admin/templates/upload`, runtime relies on uploaded-registry map (not necessarily `TEMPLATE_BY_ID`).

## B) Wizard/modern components (present in codebase)

Main files:
- `components/admin/PageForm.tsx`
- `components/admin/TemplatesPanel.tsx`
- `components/admin/wizards/AddTemplateWizard.tsx`
- `components/admin/wizards/EditPageWizard.tsx`
- `components/admin/wizards/UpdateTemplateWizard.tsx`
- `components/admin/wizards/QuickPageUpdateWizard.tsx`

Primary endpoints used by this stack:
- `POST /api/admin/templates`
- `POST /api/admin/page-upsert`
- `POST /api/admin/write-file`
- `POST /api/admin/run-gen-registry`

### How TemplateID is determined (wizard stack)

#### 1) `PageForm` suggestion rules

`generateSuggestedTemplateId(section, pageType, slug)` suggests:
- no slug / `(main)` / Hub => `${section}.main`
- expertise + Category => `${section}.${slug}pillar` (initial suggestion path)
- gallery topic => `gallery.${slug}`
- default topic => `${section}.${slug}`

Additional pillar mode effect then sets:
- `templateId = expertise.${slug}`
- `templateFile = src/templates/expertise/pillars/${slug}.tsx`

Result: category/pillar logic has two conflicting patterns in same file (`expertise.<slug>pillar` vs `expertise.<slug>`), with final state usually landing on `expertise.<slug>`.

#### 2) `AddTemplateWizard` computed rules

- hub => `${sectionId}.main`
- pillar => `expertise.${slug}`
- topic:
  - expertise => `expertise.${slug}`
  - industries => `industry.base`
  - case-studies => `caseStudy.base`

Then it writes template file and registers ID via `/api/admin/templates`.

#### 3) `QuickPageUpdateWizard` route-based suggestion rules

`suggestTemplateIdAndContentKey(route)`:
- `/` => `home.main`
- `/expertise` => `expertise.main`
- `/expertise/<slug>` => `expertise.<slug>`
- `/industries/<slug>` => `industry.base`
- `/case-studies/<slug>` => `caseStudy.base`
- `/gallery/*` => `gallery.main`
- fallback => `${section}.base`

This wizard can then register template via `/api/admin/templates` and assign it via `/api/admin/page-upsert`.

#### 4) `EditPageWizard`

- Directly selects existing `templateId` from loaded templates.
- Supports detach mode (`base.fallback`) mapped to `src/templates/FallbackTemplate.tsx` and sent to `/api/admin/page-upsert`.

---

## Mapping/Persistence Mechanics

## 1) `/api/admin/templates` (registry map editor)

- Reads/writes `src/templates/registry.ts`.
- Adds import line, extends `TemplateComponent` union, inserts `'templateId': ComponentName` in `TEMPLATE_BY_ID`.
- Supports overwrite mode to replace existing mapping.
- Runs `npm run gen:registry` after patching.

This endpoint is the explicit bridge from arbitrary ID string -> component in `TEMPLATE_BY_ID`.

## 2) `/api/admin/page-upsert`

- Requires `route`, `contentKey`, `contentFile`; defaults empty `templateId` to `base.fallback`.
- Validates that `templateId` exists in `TEMPLATE_BY_ID` by parsing `src/templates/registry.ts`.
- If valid, runs `scripts/page-upsert.mjs`.

Important: it **does not** validate against `uploadedRegistry.generated.ts`; only `TEMPLATE_BY_ID` is accepted by this endpoint.

## 3) `scripts/page-upsert.mjs`

- Ensures template/content files exist.
- Idempotently patches:
  - `src/templates/registry.ts` (import + `TemplateComponent` union + `TEMPLATE_BY_ID` entry)
  - `src/content/registry.ts`
  - `src/data/page-registry.csv` row
- Runs:
  - `npm run gen:registry`
  - `npm run build`

So this script can auto-wire missing template IDs into runtime registry if files exist.

## 4) `scripts/gen-page-registry.ts`

- Generates `src/data/pageRegistry.generated.ts` from CSV.
- Legacy union type includes known IDs, but final type allows free-form strings via `| (string & {})`.
- Template ID strict validation is intentionally disabled (commented out).

---

## Current Behavioral Nuances / Risks

1. **Two admin paradigms coexist**
   - Legacy `app/admin/page.tsx` + `/api/admin/manager` and upload route
   - Wizard stack + `/api/admin/templates` + `/api/admin/page-upsert`

2. **Validation mismatch**
   - Runtime `getTemplate()` accepts uploaded-template IDs via `uploadedRegistry.generated.ts`.
   - `/api/admin/page-upsert` accepts only IDs present in `TEMPLATE_BY_ID`.
   - Therefore, uploaded-only IDs may render at runtime but be rejected by page-upsert workflow unless registry-mapped.

3. **Pillar naming inconsistency**
   - `PageForm` suggestion helper proposes `expertise.<slug>pillar`, but pillar mode force-sets `expertise.<slug>`.

4. **Path/name drift in suggestions**
   - Some wizard-suggested paths differ from currently imported legacy file names (`HomeMainTemplate` vs `HomeTemplate`, `case-studies` vs `caseStudies`, etc.).
   - These are suggestions only, but can lead to broken file references if accepted without adjustment.

---

## Recommended TemplateID Naming Rules (Canonical Standard)

Use these rules for all new template registrations, regardless of which admin flow is used.

## 1) Core format

- Use lowercase, dot-separated IDs: `<domain>.<variant>`.
- Allowed characters per segment: `a-z`, `0-9`, `-`.
- No spaces, underscores, or camelCase in new IDs.
- Keep IDs stable and semantic (do not embed ticket numbers, dates, or temporary labels).

Regex recommendation:

- `^[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z0-9]+(?:-[a-z0-9]+)*$`

## 2) Standard patterns by page type

- Hub/Main pages
  - `home.main`
  - `expertise.main`
  - `industries.main`
  - `gallery.main`
  - `projects.main`

- Shared base/detail templates
  - `industry.base`
  - `caseStudy.base` (legacy form retained for compatibility)

- Expertise pillars/topics
  - `expertise.<slug>`
  - Example: `expertise.demand-growth`

## 3) Explicit do/don’t rules

- **Do** use `expertise.<slug>` for expertise category/pillar pages.
- **Do not** introduce new `expertise.<slug>pillar` IDs.
- **Do** reuse established shared IDs (`industry.base`, `caseStudy.base`) when the layout is intentionally shared.
- **Do** create a slug-specific ID only when the template is structurally unique.
- **Do not** create uploaded-style IDs (for example `Uploaded_*`) for long-term canonical mappings.

## 4) Legacy compatibility policy

- Existing legacy IDs remain valid and should not be renamed in-place unless there is a planned migration.
- New IDs should follow canonical format even if legacy entries in CSV/generated files include other styles.
- If a new template is initially uploaded with a non-canonical ID, register a canonical ID in `TEMPLATE_BY_ID` and move page mappings over via page-upsert.

## 5) Migration map: legacy → canonical

Use this table when you encounter existing non-canonical IDs in the CSV or registry files.

| Legacy/Non-Canonical ID | Canonical ID | Status | Notes |
|------------------------|--------------|--------|-------|
| `home.base` | `home.main` | ✅ Use canonical | Legacy ID still mapped; prefer `.main` for new pages |
| `expertise.<slug>pillar` | `expertise.<slug>` | ⚠️ Avoid legacy | Wizard/PageForm inconsistency; use simple dot format |
| `Uploaded_*` | `<section>.<slug>` | ⚠️ Temporary only | Uploaded IDs are auto-generated; register canonical ID via `/api/admin/templates` |
| `ContentEngagement` | `expertise.content-engagement` | ⚠️ Migrate | PascalCase uploaded template; register canonical lowercase ID |
| `expertise_demandgrowth_v1` | `expertise.demand-growth` | ⚠️ Migrate | Underscore style from upload; use dot + hyphen |
| `DefaultPage` | `home.main` or `base.fallback` | ⚠️ Migrate | Generic uploaded name; assign semantic ID |
| `caseStudy.base` | `case-study.base` | ⚠️ Grandfather | Legacy camelCase widely used; acceptable for now but prefer lowercase-hyphen for new IDs |
| `industry.base` | `industry.base` | ✅ Canonical | Correct pattern; reuse for all industry detail pages |
| `gallery.main` | `gallery.main` | ✅ Canonical | Correct pattern for hub pages |
| `expertise.main` | `expertise.main` | ✅ Canonical | Correct pattern for hub pages |
| `expertise.topic` | `expertise.<slug>` | ⚠️ Too generic | Use slug-specific ID instead (e.g., `expertise.demand-generation`) |
| `expertise.category` | `expertise.<slug>` | ⚠️ Too generic | Use slug-specific ID for pillar pages (e.g., `expertise.demand-growth`) |

### Quick decision guide

- **For new expertise pillar/category pages:** Use `expertise.<slug>` (e.g., `expertise.strategy-insights`)
- **For new expertise topic pages:** Use `expertise.<slug>` (e.g., `expertise.marketing-automation`)
- **For new industry pages:** Reuse `industry.base` (shared template)
- **For new case study pages:** Use `caseStudy.base` (legacy but standard) or migrate to `case-study.base` in future
- **For new hub/main pages:** Use `<section>.main` (e.g., `projects.main`)
- **If uploading a template:** Immediately register a canonical ID via Templates panel, don't rely on upload-generated name

## 6) Pre-merge checklist for new TemplateIDs

1. ID matches canonical pattern and section semantics.
2. ID is present in `src/templates/registry.ts` `TEMPLATE_BY_ID`.
3. Mapped component import path resolves and file exists.
4. Page rows in `src/data/page-registry.csv` point to the intended ID.
5. `npm run gen:registry` completes successfully.
6. Target route renders without `Unknown templateId` errors.

---

## Practical End-to-End Flow (recommended with current code)

1. Register or overwrite template via `/api/admin/templates` (or through wizard/UI calling it).
2. Confirm new `templateId` appears in `src/templates/registry.ts` `TEMPLATE_BY_ID`.
3. Assign that `templateId` to route via `/api/admin/page-upsert` (or UI calling it).
4. Ensure CSV row updated (`src/data/page-registry.csv`).
5. `gen:registry` regenerates `src/data/pageRegistry.generated.ts`.
6. Runtime route reads templateId from generated registry and resolves component via `getTemplate()`.

---

## Quick Reference: Key Files

- Admin UI (legacy): `app/admin/page.tsx`
- Admin API (template map): `app/api/admin/templates/route.ts`
- Admin API (page upsert): `app/api/admin/page-upsert/route.ts`
- Legacy API (manager): `app/api/admin/manager/route.ts`
- Uploaded template API: `app/api/admin/templates/upload/route.ts`
- Page registry generator: `scripts/gen-page-registry.ts`
- Page upsert script: `scripts/page-upsert.mjs`
- Runtime route resolver: `app/[[...slug]]/page.tsx`, `app/p/[[...slug]]/page.tsx`
- Runtime template registry: `src/templates/registry.ts`
- Uploaded template runtime map: `src/templates/uploadedRegistry.generated.ts`
- Generated route/template index: `src/data/pageRegistry.generated.ts`
