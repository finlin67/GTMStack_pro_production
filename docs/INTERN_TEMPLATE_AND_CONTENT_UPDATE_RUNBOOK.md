# Intern Runbook: Updating Templates (UI) + Content (Data)

This site uses a **decoupled CMS pattern**:

- **Template = UI** (`.tsx` React component)
- **Content = Data** (`.ts` exported object/array)

Pages are wired together by the **page registry**:

- **Route** → picks a **`templateId`** and **`contentKey`**
- The app loads the template by `templateId` and loads the content by `contentKey`

Your job is usually one of these:

- **Update the look/design** (template)
- **Update the text/data** (content)
- Sometimes both

---

## Safety rules (follow every time)

- **Do not rename `contentKey`s casually.** Other content can reference them.
- **Slugs are IDs.** Change a slug only if you’re prepared to update all references.
- **Validate content before saving.** The project will throw errors in dev if content doesn’t match the schema.
- **Keep templates “data-driven.”** Templates should render from `props.content` and not hardcode copy.
- **Make small, reversible changes.** If a change is risky, do it in 2–3 smaller steps and verify between steps.

---

## What you need open (minimal technical steps)

- A running local dev server
- Admin pages (copy/paste into browser):
  - **Page Index CMS**: `/admin`
  - **Content Validator**: `/admin/content-validator`
  - **Translator (advanced)**: `/admin/translator`
- These files (only when needed):
  - `src/data/page-registry.csv` (the route → templateId/contentKey mapping)
  - `src/content/registry.ts` (the contentKey → exported data mapping)
  - `src/templates/` (template components)
  - `content/` (content files)

---

## Step 0: Start the site locally (do this first)

1. Open a terminal in the project folder.
2. Start the dev server (your supervisor will tell you the exact command; commonly `npm run dev`).
3. Open the site locally (commonly `http://localhost:3000`).
4. Open the Admin dashboard at `/admin`.

### If Admin asks for a password

1. Enter the password your supervisor gave you.
2. If it fails:
   - Try refreshing once.
   - If it still fails, ask your supervisor (don’t guess passwords or edit secrets).

---

## How to update **Content** (text, bullets, stats, case studies, industries)

### Step 1: Find the page’s mapping (preferred: no-code)

1. Go to `/admin` (Page Index CMS).
2. Search for the page by URL slug or title (example: search `healthcare`).
3. In the page’s row, write down:
   - **route** (the URL path)
   - **templateId** (which UI template is used)
   - **contentKey** (which data object loads)
   - **fileRef** (which content file contains it)

If the page is marked “Broken Mapping” or missing, stop and ask your supervisor.

### Step 2: Identify the page’s `contentKey` (fallback: open the CSV)

1. Find the page route (example: `/industries/b2b-saas`).
2. Open `src/data/page-registry.csv`.
3. Find the row for the route and copy the **`contentKey`**.

Common examples:

- `industries:<slug>`
- `case-studies:<slug>`
- `expertise:<slug>`
- `pillar:<slug>` (full “pillar page” content object)

### Step 3: Find where the content lives

Open `src/content/registry.ts` and look for that `contentKey`.

Typical patterns:

- **Industry**: `industries:<slug>` comes from `content/industries.ts`
- **Case study**: `case-studies:<slug>` comes from `content/case-studies.ts`
- **Expertise item**: `expertise:<slug>` comes from `content/expertise.ts` (or per-topic file, depending on key)
- **Pillar page content**: `pillar:<slug>` often points to a file in `content/expertise/<slug>.ts`

### Step 4: Edit the content file (change only the data)

Edit ONLY the data:

- headlines, paragraphs, bullets, stats, tags
- links/CTAs
- image paths (if used)

**Do not add new fields** unless your supervisor tells you (schemas are strict).

### Step 5: Validate content (required, always)

1. Go to **Admin → Content Validator**.
2. Choose the correct **Content type** and **Format**.
3. Paste the content object (or the item object) and confirm it shows **Valid ✅**.

Notes:

- **Industries / Case Studies / Expertise items** validate as “Item” schemas.
- **Pillar pages** validate as **“ExpertisePageContent”** (a stricter full-page object).

### Step 6: Cross-link sanity check (required)

Some content references other content by slug. These references must point to real entries:

- **Industry** can reference:
  - `featuredCaseStudies: string[]` → must match real case study slugs
  - `featuredExpertise: string[]` → must match real expertise slugs
- **Case study** references:
  - `industry: string` → must match a real industry slug
  - `expertise: string[]` → must match real expertise slugs
- **Expertise item** can reference:
  - `relevant_case_study_slugs: string[]`
  - `relevant_expertise_slugs: string[]`

If you add/remove a slug, update all places that reference it.

### Step 7: Verify in the browser (required)

1. Refresh the page you updated.
2. Check that:
   - Headline and subheadline look correct
   - Bullets render as bullets (not one long paragraph)
   - Buttons/links go to real pages (especially `/contact`)
   - The page doesn’t crash with an “Invalid content for …” error
3. Check both themes if applicable:
   - Dark mode
   - Light mode

---

## How to update **Templates** (UI/look/design)

Templates are React `.tsx` files. Pages choose templates by **`templateId`** in `src/data/page-registry.csv`.

### Step 1: Identify the page’s `templateId`

Preferred:

1. Go to `/admin` (Page Index CMS).
2. Find the page row and copy the **`templateId`**.

Fallback:

1. Open `src/data/page-registry.csv`.
2. Find the route and copy the **`templateId`**.

### Step 2: Decide if it’s a built-in template or an uploaded one

- **Built-in** templates live in `src/templates/` and are referenced in `src/templates/registry.ts`.
- **Uploaded** templates are saved as `src/templates/<templateId>.tsx` and are also mapped in `src/templates/uploadedRegistry.generated.ts`.

### Step 3: Update the template

There are two safe ways:

#### Option A (recommended): Use Admin template upload

This repo supports template upload directly inside the Page Index CMS modal.

1. Generate the new template `.tsx` in AI Studio and save it on your computer.
2. Open `/admin` (Page Index CMS).
3. Search for the page you want to change (example: type part of the URL).
4. Click **Edit Mapping** for that page.
5. In the modal, scroll to the section:
   - **“Or Upload Custom Template (.tsx)”**
6. Click **Select .tsx File** and choose your template file.
7. Confirm the **Template ID** field:
   - It auto-fills from the filename.
   - Allowed characters are only: letters, numbers, `_`, `-`.
   - If you paste an ID with spaces or dots, it will be sanitized/blocked.
8. Click **Upload & Map Template**.
9. Wait for the success message: **“Template uploaded and mapped successfully.”**
10. Click **Save Changes** (bottom of the modal) so the registry mapping is persisted.
11. Important: **Restart the dev server** after uploading a new template file.
    - Next.js won’t always pick up newly created `.tsx` files until restart.
12. Reload the page and verify the new design is live.

This is best for interns because you don’t need to hand-edit registry wiring.

#### Option B: Edit a built-in template file directly

1. Find the component under `src/templates/`.
2. Update UI structure and Tailwind classes.
3. Keep the component props shape the same (it must accept `content`).

### Template rules (do not break these)

- **No hardcoded copy** that should be “content” — render from `props.content`.
- Prefer **Tailwind** for styling.
- Use `next/link` instead of `<a>`, and `next/image` instead of `<img>`.
- Don’t add `"use client"` unless the template needs interactivity (state/effects/handlers).
- Check mobile layout (narrow browser window) after any major layout change.
- Keep the design readable: strong spacing, clear heading hierarchy, and consistent button styles.

### Template verification checklist (required)

After updating a template:

1. Refresh the page.
2. If there’s an error:
   - Undo the last small change and re-try, or ask your supervisor.
3. Check interactive elements:
   - Buttons have visible hover/focus styles
   - Links work
4. Check images:
   - Every `next/image` has `alt`
   - If using `fill`, the parent container is `relative` and has a fixed height
5. Check both themes (dark/light) if the page supports them.

### If upload fails (common fixes)

- **“Unauthorized”**
  - You are not logged into Admin. Refresh `/admin` and sign in again.
- **“Route … not found in registry”**
  - The page route must already exist in the registry CSV. Use `/admin` → **Add to Registry** first, then upload.
- **“File must be a .tsx file”**
  - Ensure the uploaded file ends in `.tsx`.
- **Template ID looks wrong**
  - The Template ID is derived from the filename and sanitized. Rename the file to a clean name like `my-template-v1.tsx` and re-upload.
- **Page still shows old template after upload**
  - Restart the dev server, then hard refresh the browser tab.

---

## AI Studio prompts (HTML → `.tsx` template + `.ts` content)

These prompts are designed for taking **prototype HTML/Tailwind** and turning it into files you can paste into this repo.

### Prompt A: Generate the `.tsx` template (UI only)

Use when you want a new look/design. This prompt forces a clean, data-driven component.

```text
ROLE: Expert Next.js 14 + Tailwind developer.

CONTEXT:
- This repo renders pages via: route -> templateId -> template component.
- Templates must accept props with `content` and render from that object (no hardcoded copy).

TASK:
Convert the provided PROTOTYPE HTML (Tailwind) into a production-ready Next.js 14 `.tsx` template component.

OUTPUT (CRITICAL):
- Output EXACTLY ONE code block containing ONLY the `.tsx` file content (no extra text).

RULES:
- No "use client" unless you truly need React hooks or event handlers.
- Use `next/link` for links and `next/image` for images.
- Every `Image` must have `alt` and either (width + height) OR `fill` + `sizes` with a sized `relative` parent.
- Must support light/dark mode using Tailwind `dark:` classes.
- Must not hardcode user-facing copy: all text must be rendered from `props.content`.
- Prefer semantic HTML: one `h1`, correct heading order, lists for bullets.
- Do not introduce new dependencies.

PROPS CONTRACT:
- Use: `type Props = { content: any; pageTitle?: string }`
- Render title from `pageTitle` if provided, otherwise from `content` as appropriate.

PROTOTYPE HTML:
<PASTE HTML HERE>
```

### Prompt B: Generate the `.ts` content object (Data only, schema-matched)

Use when you need new/updated copy. Pick the prompt that matches the page type.

#### B1) Industry (`industries:<slug>`) content prompt

```text
ROLE: TypeScript content author for a schema-validated CMS.

TASK:
Write ONE Industry item object that matches this shape (no extra keys):
- slug (string)
- title (string)
- description (string)
- longDescription (string)
- tags (string[], min 1)
- icon (string)
- stats (array of {label, value}, min 1)
- optional: positioning, gtmRealities (string[]), proof (array), playbook (string[]),
  featuredExpertise (string[]), featuredCaseStudies (string[])

OUTPUT (CRITICAL):
- Output EXACTLY ONE code block containing:
  `export const <CONSTANT_NAME> = { ... };`
- Must be JSON-serializable (no functions/JSX/Dates).
- Slug must be lowercase-with-hyphens.
- If you include featuredExpertise / featuredCaseStudies, list them as slugs only (not URLs).

INPUTS:
- Desired slug:
- Title:
- Draft content notes:
```

#### B2) Case Study (`case-studies:<slug>`) content prompt

```text
ROLE: TypeScript content author for a schema-validated CMS.

TASK:
Write ONE Case Study item object matching:
- slug, title, client, description, challenge, solution
- results (string[], min 1)
- tags (string[], min 1)
- industry (string slug)
- expertise (string[] slugs, min 1)
- metrics (array of {label, value, change?}, min 1)
- year (string)
- optional: featured (boolean)

OUTPUT (CRITICAL):
- Output EXACTLY ONE code block containing:
  `export const <CONSTANT_NAME> = { ... };`
- Must be JSON-serializable. Slug must be lowercase-with-hyphens.
- industry/expertise must be slugs (not titles).

INPUTS:
- Desired slug:
- Industry slug:
- Expertise slugs:
- Title/client/year:
- Draft content notes:
```

#### B3) Expertise item (`expertise:<slug>`) content prompt

```text
ROLE: TypeScript content author for a schema-validated CMS.

TASK:
Write ONE Expertise item object matching:
- slug, title
- optional: description, pillar, pillarLabel, tags, icon, featured, order,
  positioning, challenges (string[]), modern_plays (string[]), proof (object),
  relevant_expertise_slugs (string[]), relevant_case_study_slugs (string[])

OUTPUT (CRITICAL):
- Output EXACTLY ONE code block containing:
  `export const <CONSTANT_NAME> = { ... };`
- Must be JSON-serializable. Slug must be lowercase-with-hyphens.

INPUTS:
- Desired slug:
- Title:
- Pillar (one of: content-engagement, demand-growth, strategy-insights, systems-operations):
- Draft content notes:
```

#### B4) Pillar page (`pillar:<slug>`) full page content prompt

```text
ROLE: TypeScript content author. Output must match the repo's ExpertisePageContent shape exactly.

TASK:
Create a full page content object with these top-level keys (no extra keys):
- brand { tagline, description }
- hero { headline, subheadline, description, primaryCTA {text, link}, secondaryCTA? {text, link}, image? {src, alt} }
- metricsSection { headline, stats: [{label, value}] }
- capabilitiesSection { headline, items: [{title, description}] }
- philosophySection { headline, principles: [{title, description}] }
- growthSection { headline, narrative, metrics: [{label, value}] }
- ctaSection { title, subtitle, button {text, link} }
- footer { description, sections: [{title, links: string[]}], copyright }

OUTPUT (CRITICAL):
- Output EXACTLY ONE code block containing:
  `export const <CONSTANT_NAME> = { ... };`
- Must be JSON-serializable.
- Use site-relative image paths like `/images/...` and meaningful alt text.

INPUTS:
- Pillar slug:
- Page positioning notes:
- Any metrics/stats to include:
```

---

## Pre-import checks & cleanup (do this before uploading/importing)

### For templates (`.tsx`)

- [ ] No hardcoded copy (everything comes from `props.content`)
- [ ] No `"use client"` unless truly needed
- [ ] All links use `next/link`
- [ ] All images use `next/image` and have `alt`
- [ ] If using `fill`, parent container is `relative` with explicit height + `sizes`
- [ ] Dark mode supported (`dark:` classes on main surfaces + text)
- [ ] One `h1` and headings in order (h2, h3…)
- [ ] No new dependencies imported

### For content (`.ts`)

- [ ] Validates in **Admin → Content Validator**
- [ ] Slugs are lowercase-with-hyphens
- [ ] Cross-links are real slugs that exist (industry/expertise/case-studies references)
- [ ] Links are site-relative where appropriate (`/contact`, `/expertise/...`)

---

## Wiring a new or updated page (route → templateId + contentKey)

If you’re adding a NEW page or changing what a page points to:

### Preferred (no-code): Use the Page Index CMS

1. Go to `/admin`.
2. Find the page row.
3. Click **Edit Mapping** (or **Add to Registry** if missing).
4. Fill in / update:
   - **Page Title**
   - **Template ID** (sometimes shown as “Template”)
   - **Content Key** (format: `prefix:slug`)
   - **Content File (Ref)** (example: `content/industries.ts`)
5. Click **Save Changes**.
6. Refresh the page and confirm it loads.

### Fallback (with code): Update the CSV directly

1. Update `src/data/page-registry.csv`:
   - **route**: the URL path
   - **templateId**: which template to render
   - **contentKey**: which content object to load
2. Regenerate the generated registry if your supervisor’s workflow requires it (some setups do this automatically; others run a script).

If you’re not sure, don’t guess—ask your supervisor to confirm the “registry generation” step for this repo.

### Helper: Use the Translator (advanced)

If you’re unsure what to put into the registry row, `/admin/translator` can help you generate or review the correct values.

---

## Common “don’t get stuck” troubleshooting

- **Page shows 404**
  - The route may not exist in `src/data/page-registry.csv`.
- **Page throws a runtime error about invalid content**
  - Your content doesn’t match the schema. Re-run Admin → Content Validator and fix missing/extra fields.
- **A page renders blank sections**
  - Often caused by missing array items (e.g., `stats: []`) or wrong key names.
- **Images break build**
  - `next/image` requires correct usage (width/height or `fill` + `sizes` + a sized parent).
- **Template upload seems “missing”**
  - Some environments disable template uploads for safety. Ask your supervisor what the approved method is (upload vs editing a built-in template file).

---

## Suggested improvements (optional but recommended)

These are ideas to make intern updates safer and faster.

### Admin tool improvements

- **Add a Templates screen**
  - List all template IDs (built-in + uploaded)
  - Upload/overwrite a template by `templateId`
  - Preview a template on a chosen route
- **Add “Validate + Save” for content**
  - In Content Validator, after “Valid ✅”, allow choosing a `contentKey` and writing to the correct file
  - For item arrays (industries/case-studies/expertise), add “append/upsert by slug” (like your existing publish endpoints)
- **Add a “Cross-link Audit” screen**
  - Show broken references across industries/case-studies/expertise
  - Provide the exact file + slug to fix
- **Add a “Registry regen status” indicator**
  - When `/admin` updates mapping, show whether the generated registry refreshed successfully

### Content generator (AI) workflow improvements

- **Always match the repo schema**
  - For Industries/Case Studies/Expertise items, generate objects that match the Zod schemas (no extra keys).
  - For Pillar pages, generate the full `ExpertisePageContent` shape (brand/hero/metrics/etc).
- **Force JSON-serializable content**
  - No functions, no JSX, no Dates inside content.
- **Require a “Cross-links” list in the AI output**
  - Example: “industry slug = fintech”, “featuredCaseStudies = [..]”
  - Makes review faster and prevents broken references.
- **Require “No hardcoded copy” in templates**
  - All text should come from `props.content` (except accessibility labels if needed).

---

## Quick checklist (copy/paste)

- [ ] Find the page in `/admin` (Page Index CMS)
- [ ] Note `route`, `templateId`, `contentKey`, and `fileRef`
- [ ] Update template (`.tsx`) OR content (`.ts`) as needed
- [ ] Validate content in Admin → Content Validator (must show “Valid ✅”)
- [ ] Check cross-links (industry/case-study/expertise references)
- [ ] Refresh the page locally and verify it looks right in light + dark mode

