# GTMStack.pro Project Overview for Marketing and Development

Last updated: 2026-03-29

## Purpose

This document is a single high-level handoff for two audiences:

- The **Marketing Team**, which needs to understand what the site says, who it serves, what content exists, and where the growth and messaging opportunities are.
- The **Developer**, which needs to understand how the app is structured, how pages are rendered, where content lives, and what operational risks or quirks already exist.

It is not meant to replace the deeper guides in `docs/`. It is the fastest way to understand the project before diving into the more specialized documentation.

## Executive Summary

GTMStack.pro is a founder-led B2B go-to-market consulting website that combines four functions in one product:

1. A **marketing site** that explains the offer and encourages contact.
2. A **portfolio/proof site** that showcases case studies and execution credibility.
3. A **content library** for expertise and industry positioning.
4. A lightweight **operations layer** with admin tooling, generated registries, and a headless WordPress blog integration.

From the codebase as it exists on **March 29, 2026**, the project is best described as a **registry-driven Next.js application** with a rich content model and a large amount of supporting documentation. The strongest parts of the project are the breadth of service positioning, the reusable template system, and the animation/gallery infrastructure. The biggest practical gap is that the content library is broader than the currently registered public route set, so not every content object appears to be published as a live page.

## Current Snapshot

### Runtime and platform

- Framework: `Next.js 16.1.6` with App Router
- UI: `React 18.2.0`
- Language: `TypeScript`
- Styling: `Tailwind CSS`
- Motion and visuals: `framer-motion`, custom hero visual systems, animation gallery assets
- Blog source: headless WordPress via REST API
- Build pattern: registry generation before build, optional static-export-oriented deployment flow

### Verified project scope

- `48` registered routes in `src/data/page-registry.csv`
- `26` registered `/expertise` routes
- `13` registered `/industries` routes
- `2` registered `/case-studies` routes
- `19` distinct template IDs referenced in the page registry
- `24` API route files under `app/api`

### Content library signals in source files

- `50` expertise content entries in `content/expertise.ts`
- `18` industry content entries in `content/industries.ts`
- `19` case study content entries in `content/case-studies.ts`

### Important implication

The project contains **more content objects than published registry routes**. That means the repo is serving as both a live site and a larger content repository/scaffold for future publishing. This matters for both teams:

- Marketing should not assume every written asset is live on the website.
- Development should treat the registry as the public source of truth, not the raw content folders alone.

## For the Marketing Team

### What the website is trying to do

The website positions GTMStack.pro as a strategic and execution-oriented GTM partner for B2B organizations. The messaging emphasizes:

- predictable pipeline
- systems thinking over one-off campaigns
- full-funnel GTM architecture
- measurable outcomes
- vertical and use-case specialization

The site is built to reassure visitors that the business can do both:

- strategic diagnosis and planning
- hands-on implementation across content, demand, operations, analytics, and tooling

### Primary target audience

The current site and content strongly point to these audiences:

- founders and CEOs of B2B companies
- CMOs and growth leaders
- demand generation and revenue operations leaders
- teams in complex or regulated industries
- buyers who need both strategic guidance and operational execution

The messaging, page taxonomy, and case studies all suggest a preference for:

- enterprise or mid-market B2B motions
- long sales cycles
- multi-stakeholder buying environments
- operational complexity

### Main site sections and what they communicate

#### Home

The homepage establishes the core value proposition: GTMStack.pro builds measurable revenue systems, not disconnected campaigns. It is the entry point for credibility, framing, and conversion.

#### Expertise

This is the largest strategic positioning section. It is organized around GTM capabilities and pillars such as:

- content and engagement
- demand and growth
- strategy and insights
- systems and operations

This area is effectively the services library and thought-leadership framework combined.

#### Industries

Industry pages tailor the positioning by vertical, which helps the brand move from generic consulting language to market-specific credibility.

#### Case Studies

Case studies provide proof and are essential for trust-building. However, the source content includes more case study objects than the current registry exposes publicly. Marketing should treat case study publishing as an active opportunity area.

#### Blog

The blog is headless WordPress-driven and supports topical authority, SEO, and ongoing thought leadership. It appears architected for live publishing, but it has some route ambiguity that developers should keep in view.

#### Gallery

The animation gallery is a visual proof and experimentation layer. It reinforces brand distinctiveness and can support social, sales, and portfolio storytelling.

### Brand and positioning strengths

- The site is not a generic agency template. It presents a point of view around GTM systems and revenue architecture.
- The taxonomy is broad enough to support multiple entry points: service-led, industry-led, proof-led, and insight-led.
- The project has a strong visual identity through custom hero visuals, gallery assets, and motion-heavy presentation.
- The content model supports both strategic language and operational specificity, which is valuable for enterprise credibility.

### Messaging and growth opportunities

#### 1. Published-vs-authored clarity

Because the source content is broader than the live registry, marketing likely has unpublished or partially wired assets that could become:

- new landing pages
- SEO pages
- vertical campaigns
- sales enablement pages
- expanded case study proof points

#### 2. Case study visibility

There are many case study records in source content, but only a very small number are currently registered as public routes. That is likely the clearest content expansion opportunity in the current project.

#### 3. Blog pathway clarity

The blog is technically present and integrated with WordPress, but the canonical public detail route is flagged as uncertain in existing project context notes. Marketing should coordinate blog growth with development so content production does not outpace routing clarity.

#### 4. Conversion path sharpening

The site has multiple credibility surfaces, but the CTA strategy could likely be rationalized into a few clearer offers:

- strategy diagnostic
- consultation/contact
- proof/case study exploration
- newsletter or insight subscription

#### 5. Content operations potential

The project already has an admin and publishing-oriented foundation. With tighter operational discipline, marketing could turn this into a repeatable content publishing machine instead of a mostly code-mediated content system.

### What marketing should know operationally

- Not all content is authored in one place.
- Core page content is stored in local TypeScript and MDX files.
- Blog content is pulled from WordPress.
- Public pages are governed by a page registry CSV and generated registry files.
- There are admin screens for managing page mappings and animation metadata, but this is not a full traditional CMS.

### Recommended marketing priorities

1. Audit which expertise, industry, and case study assets are authored but not published.
2. Decide which service lines are core revenue priorities and ensure the registry reflects them.
3. Expand public case study coverage.
4. Define one primary CTA path and one secondary CTA path per major section.
5. Align blog/editorial operations with the actual live route model.

## For the Developer

### Architecture summary

This project uses a **registry-driven rendering model** rather than relying only on normal file-based page creation.

The main flow is:

1. `src/data/page-registry.csv` defines the public page set.
2. `scripts/gen-page-registry.ts` generates `src/data/pageRegistry.generated.ts`.
3. `app/[[...slug]]/page.tsx` reconstructs the request route and finds the matching registry row.
4. `src/templates/registry.ts` resolves `templateId` to a React template component.
5. `src/content/registry.ts` resolves `contentKey` to page content.
6. The selected template renders with the selected content.

This is the central architectural idea in the repo and explains most of the project's flexibility.

### Core code areas

#### Routing

- `app/[[...slug]]/page.tsx`
- `lib/pageRegistry.ts`
- `src/data/page-registry.csv`
- `src/data/pageRegistry.generated.ts`

The catch-all route is the main rendering entry point for registry-backed pages. Reserved prefixes such as `api`, `admin`, `blog`, and `gallery` are intentionally excluded from the catch-all flow.

#### Templates

- `src/templates/registry.ts`
- `src/templates/uploadedRegistry.generated.ts`
- `src/templates/...`

Template lookup supports both known templates and uploaded/generated templates. This makes the system flexible, but it also means template naming discipline matters.

#### Content

- `src/content/registry.ts`
- `content/...`

Content keys map to local TypeScript objects, MDX-derived structures, and adapted data. Runtime validation is present for some content families and is enabled by default in development.

#### Admin

- `app/admin/page.tsx`
- `components/admin/...`
- `app/api/admin/...`
- `lib/admin-auth.ts`

The admin layer is a custom internal operations interface, not a general-purpose CMS. It supports registry editing, template upload flows, and content-related management actions.

#### Blog

- `app/blog/page.tsx`
- `lib/wordpress.ts`
- `lib/wp-client.ts`
- `lib/blog-adapter.ts`

The blog fetches content from WordPress and adapts it into the app's design system.

#### Gallery and animation systems

- `app/gallery/page.tsx`
- `app/gallery/admin/page.tsx`
- `src/data/animationCatalog.generated.ts`
- `src/data/animationMeta.overrides.json`
- `app/api/animations/...`
- `scripts/gen-animation-catalog.ts`

This is a meaningful subsystem, not just a decorative extra. It includes metadata editing, thumbnail handling, generation workflows, and public gallery rendering.

### Important runtime behavior

#### Page publication is registry-controlled

A content file can exist without being public. A page becomes public when:

- it has a row in `src/data/page-registry.csv`
- the registry is generated
- its `templateId` resolves
- its `contentKey` resolves

#### The project mixes generated and hand-authored assets

Be careful around files such as:

- `*.generated.ts`
- registry outputs
- animation catalogs
- uploaded template registries

The correct source of truth is often an input file plus a generator, not the generated file itself.

#### The build expects registry generation

`prebuild` runs `npm run gen:registry`, so the page registry is not optional infrastructure.

### Commands that matter most

#### Core development

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- `npm run check`

#### Registry and content operations

- `npm run gen:registry`
- `npm run validate:registry`
- `npm run registry:audit`
- `npm run page:upsert`

#### Gallery and animation operations

- `npm run gen:animations`
- `npm run gen:all`
- `npm run validate:gallery`
- `npm run gen:thumbnails`

### Environment and security notes

#### Admin auth

Admin access depends on:

- `ADMIN_PASSWORD`
- optionally `ADMIN_TOKEN_SECRET`
- optionally `LOCAL_ADMIN=1` for local bypass behavior

Tokens are signed in `lib/admin-auth.ts` and stored via the `admin_session` cookie.

#### Static export constraints

When `STATIC_EXPORT=1`, parts of the admin/API behavior are intentionally unavailable. Developers should keep that in mind when diagnosing features that work in local server mode but not in export-oriented builds.

#### WordPress

Blog functionality depends on:

- `WORDPRESS_API_URL`
- `NEXT_PUBLIC_WORDPRESS_API_URL`

### Known issues, ambiguities, and technical risks

#### 1. Content inventory exceeds registered routes

This is not inherently wrong, but it creates an operational risk:

- the content team may think pages exist when they do not
- developers may change content files that are not actually rendered
- audits based on file counts can be misleading unless checked against the registry

#### 2. Blog detail route ambiguity

Existing handoff notes identify uncertainty around the canonical blog detail route. Current code clearly supports the blog index and WordPress fetching, but the public post detail routing model should be treated as a stabilization item.

#### 3. Documentation drift

The repo contains many docs across `docs/` and `docs/archive/`. Some older index-level documents still describe older route assumptions or outdated stack versions. Developers should prefer:

- `docs/ROUTING.md`
- `docs/PROJECT_STRUCTURE.md`
- `docs/CONTENT_MANAGEMENT_GUIDE.md`
- `docs/BLOG-WORDPRESS-DEVELOPER-GUIDE.md`
- this overview document for cross-functional context

#### 4. Mixed content paradigms

The project combines:

- registry-driven local content
- uploaded/generated templates
- WordPress blog content
- local admin mutation workflows

That flexibility is powerful, but it means seemingly simple changes can cross multiple systems.

#### 5. Asset volume and visual subsystem complexity

The animation and image footprint is large. That affects:

- repo weight
- build behavior
- asset management discipline
- deployment troubleshooting

### Recommended developer priorities

1. Treat `src/data/page-registry.csv` as the first checkpoint in any page-level debugging task.
2. Reconcile authored content counts with public route counts.
3. Confirm the intended canonical blog detail route and document it plainly.
4. Keep generated-file workflows explicit when onboarding new contributors.
5. Continue consolidating docs so runtime truth is easier to find.

### Best next documents to read

#### For marketing stakeholders

- `docs/WEBSITE_USER_GUIDE.md`
- `docs/SITE-PAGES-AND-HIERARCHY.md`
- `docs/CASE_STUDIES.md`
- `docs/CONTENT_MANAGEMENT_GUIDE.md`

#### For developers

- `docs/ROUTING.md`
- `docs/PROJECT_STRUCTURE.md`
- `docs/CONTENT_MANAGEMENT_GUIDE.md`
- `docs/BLOG-WORDPRESS-DEVELOPER-GUIDE.md`
- `docs/ANIMATION_SYSTEM_GUIDE.md`
- `docs/CANONICAL_DOC_MAP.md`

### Bottom Line

This project is already more than a simple marketing website. It is a structured GTM content platform with a custom page registry, template system, internal admin tooling, WordPress-backed editorial capability, and a substantial visual asset pipeline.

For marketing, the immediate value is in publishing discipline, better conversion-path clarity, and unlocking the backlog of already-authored content.

For development, the immediate value is in stabilizing the registry-driven workflow, reducing ambiguity around blog routing and documentation ownership, and keeping the generated-content/template system understandable for future maintainers.
