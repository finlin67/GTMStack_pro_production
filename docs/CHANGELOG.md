## [2026-03-10] - Add content engagement and systems operations content to registry
- What changed: Added content registry entries for the Content Engagement and Systems Operations pillars so they can be resolved by key.
- Why it matters: Enables those pillar routes/pages to load the correct content via the registry-driven pipeline.

## [2026-03-10] - Enhance Navbar, Footer, and MegaMenu components with updated styling and logo integration
- What changed: Updated global navigation and footer UI, added the GTMStack logo asset usage, and refined mega menu and mobile menu styling.
- Why it matters: Improves brand consistency and UX without changing routes.

## [2026-03-10] - Refactor admin components and enhance API routes
- What changed: Admin UI components and admin API routes were refactored and expanded; supporting documentation was added/updated.
- Why it matters: Strengthens the admin CMS workflow for managing registry-driven pages and templates.

## [2026-03-09] - Add Admin CMS, handoff docs, and cleanup
- What changed: Introduced app/admin pages, many app/api/admin routes, admin components/wizards, and supporting scripts/libs; updated lint/ignore configs.
- Why it matters: Establishes the admin CMS surface and related tooling, plus config changes that affect CI and code hygiene.

## [2026-03-09] - blog wp refresh UX and typecheck scope
- What changed: Blog index and LatestPosts now refresh from WordPress on load and show sync status; tsconfig excludes handoff/sandbox artifacts.
- Why it matters: Ensures the static blog shell refreshes to the latest WP content and avoids typecheck noise from non-code folders.

## [2026-03-07] - deploy static
- What changed: GitHub deploy workflow switched to static export output; multiple API routes set to `force-static`; blog MDX slug route renamed and made fully static; sitemap marked static.
- Why it matters: Locks the deployment to the static export pipeline and reduces runtime variability, but also changes how API routes and blog routes are rendered.

## [2026-03-06] - Add admin UI, API routes, assets, and SEOHero
- What changed: Added admin UI pages and many admin API routes, added a large SEO hero animation, added uploaded-template support, and expanded gallery assets/scripts.
- Why it matters: Major expansion of admin tooling and template infrastructure; introduces new routes and generator workflows.

## [2026-03-06] - chore: finalize recovery changes after crash
- What changed: Swapped blog UI rendering to uploaded blog templates via adapters; fixed an expertise slug mapping typo; adjusted UI elements in gallery/expertise components.
- Why it matters: Changes how blog pages are rendered and fixes a content routing typo that could break pillar mapping.

## [2026-03-04] - fix: resolve post-crash TypeScript, template routing, and prerender blockers
- What changed: Tightened ESLint import rules, added pre-commit hooks, expanded template registry mappings for uploaded industry templates, and fixed pillar slug mappings; tsconfig updated to avoid `.tsx.tsx` artifacts.
- Why it matters: Restores clean builds/prerendering and stabilizes template resolution for uploaded templates.

## [2026-02-27] - admin fixes
- What changed: Updated Next.js route handlers to await async params, corrected a slug typo, and adjusted tsconfig JSX target and includes.
- Why it matters: Fixes route param handling for dynamic pages and prevents build/runtime issues in route generation.

## [2026-02-25] - change that row’s templateId to a valid template id. Based on the rest of your expertise pillar/category pages, it should be expertise.category
- What changed: Modified page-registry entries for the content engagement pillar and added a `/p/test` page row.
- Why it matters: Directly affects registry-driven routing and template resolution for an expertise pillar and adds a new route entry.

## [2026-02-22] - Create qodana.yaml
- What changed: Added Qodana configuration for JetBrains JS analysis.
- Why it matters: Enables consistent static analysis in CI/CD when Qodana is used.

## [2026-02-22] - Add animation admin UI and local-only APIs
- What changed: Added local-only gallery admin UI and `/api/animations/*` + `/api/local/animations/*` endpoints, plus a local-only guard and sitemap additions.
- Why it matters: Introduces admin routes and local-only safeguards for updating animation metadata and thumbnails.

## [2026-02-20] - Update page registry keys and add sitemap
- What changed: Renamed contentKey prefixes (industries/case-studies), removed `/projects`, regenerated the page registry, and added a sitemap snapshot doc.
- Why it matters: Content resolution keys and route coverage changed; registry updates drive runtime routing.

## [2026-02-20] - Extract blog UI to templates; add animation script
- What changed: Blog pages were refactored to use template components, animation catalog generation scripts were added, and gallery behavior was updated.
- Why it matters: Centralizes blog rendering in templates and introduces a build-time generator for animation metadata.

## [2026-02-18] - Add registry-driven Projects page & template
- What changed: Added ProjectsTemplate and content, wired `/projects` into page/content registries, and converted `/projects` and `/gallery` pages to registry-driven rendering.
- Why it matters: Moves those routes into the registry-driven architecture, affecting routing and content lookup.

## [2026-02-18] - Revamp Industries content and template
- What changed: Replaced industries hub content with a structured content model and rewrote IndustriesMainTemplate to a new static layout.
- Why it matters: Updates the industries landing page rendering and content schema without altering route definitions.

## [2026-02-18] - Add route-based hero visual component
- What changed: Added a shared HeroVisualByRoute client component, updated hero visual registry entries, and replaced hardcoded hero visuals in multiple templates.
- Why it matters: Centralizes route-driven hero visuals and reduces per-page duplication while preserving routes.

## [2026-02-18] - Add Expertise main content, template & styles
- What changed: Moved /expertise content to a new content file, updated the registry to point to it, rewrote the ExpertiseMainTemplate, and added CSS utilities.
- Why it matters: Changes the data source for the /expertise route and the rendering structure while keeping the route stable.
