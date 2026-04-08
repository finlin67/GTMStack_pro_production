## [2026-04-04] - Clean display text & improve related posts logic
- What changed: Added `stripDisplayPrefix` and `cleanDisplayText` helpers in `lib/blog-adapter.ts` to remove CAP-style prefixes and decode/trim HTML entities. Applied across categories, tags, author names, CTA fields, modular items, image alt/caption, and ACF fields. Improved `normalizeRichText` to strip display prefixes before HTML processing. Rewrote related-post fetching in `app/blog/post/BlogPostClient.tsx`: deduplicates results, prefers category matches, then tag matches, then latest posts, capped at 4. `BlogStitchPostTemplate` now always renders the related-articles card with a fallback message when no related insights are found. New `app/api/nav-posts/route.ts` endpoint added. Added `public/og-default.png` for social sharing fallback. Several obsolete components removed: `components/animations/HeroAnimation.tsx`, `components/ui/HeroRightVisual.tsx`, `components/ui/IndustriesDropdown.tsx`, `components/ui/LatestPosts.tsx`.
- Why it matters: Cleaner displayed text throughout the blog, more relevant related-post suggestions, leaner component tree.

## [2026-04-04] - Add modular article & FAQ support
- What changed: New types for modular articles, sections, FAQ items, and ACF shapes added to `src/types/blog.ts`. `lib/blog-adapter.ts` extended: decodes HTML entities, normalises rich text, maps modular sections and FAQ items, adds CTA/featured-quote/heroKicker/authorNote fields, exposes `layoutType` and `showFeaturedImage` on adapted article data. `src/templates/blog/BlogStitchPostTemplate.tsx` updated: added `renderModularArticle` path alongside preserved `renderLegacyArticle` path; conditionally shows hero image; renders modular section types (callout, checklist, image, text), FAQ accordion, CTA, and author note blocks.
- Why it matters: Frontend can now render both legacy and ACF-driven modular article layouts, unlocking richer WordPress post structures without code changes per post.

## [2026-04-02] - Add HowTo/Insight templates and WP client fixes
- What changed: Two new post templates added: `src/templates/blog/HowToPostTemplate.tsx` and `src/templates/blog/InsightPostTemplate.tsx`. Corresponding adapters `adaptHowToPostData` and `adaptInsightPostData` added to `lib/blog-adapter.ts`. `app/blog/post/BlogPostClient.tsx` updated to select template by `post.acf.layout_type`. `lib/wp-client.ts` hardened: normalises/validates base URL, improves embedded term/tag extraction, simplifies author/avatar types, removes dev logging, tweaks read-time estimation, adds ACF field support. New `src/types/blog.ts` types. WordPress plugin bootstrap added at `wp-content/plugins/gtmstack-headless-blog-kit/gtmstack-headless-blog-kit.php`.
- Why it matters: Enables four distinct post layouts (`legacy`, `modular_article`, `how_to`, `insight`) driven by a single ACF field on each WordPress post. WP API parsing is more robust and predictable.

## [2026-04-01] - Branch recovery and docs entry points
- What changed: Recovered and promoted the major UI/content rewrite branch (`origin/chore/animations-sync`) to `main` after identifying it contained visually confirmed changes (blog, gallery, Demand & Growth, About). Fixed malformed quote characters in `content/expertise/main.ts` that blocked compilation. Added `docs/RECOVERY_CHECKPOINT_2026-04-01.md` capturing the branch map and recovery plan. Added `docs/PROJECT_OVERVIEW_MARKETING_AND_DEVELOPER.md` as a cross-functional handoff document.
- Why it matters: Restores the approved production direction to `main` and provides a recovery reference for future branch confusion.

## [2026-03-28] - Content audit, About page update, case study enrichment
- What changed: About page content updated. Case study content enriched. Content audit status report added as `docs/CONTENT_AUDIT_STATUS_REPORT_2026-03-28.md`. CTA and hero visual selection refined. UI spacing tweaks.
- Why it matters: Keeps site copy and proof content current; captures audit state for future content gap work.

## [2026-03-16] - Docs canonical consistency pass
- What changed: Normalized canonical wording for metadata, archive-note phrasing, and branding consistency across key docs (`ANIMATION_SYSTEM_GUIDE.md`, `CONTENT_MANAGEMENT_GUIDE.md`, `PROJECT_STRUCTURE.md`, `SITE-PAGES-AND-HIERARCHY.md`, `WEBSITE_USER_GUIDE.md`, `GALLERY_MANAGEMENT_GUIDE.md`).
- Why it matters: Reduces editorial drift after consolidation and keeps canonical docs aligned in tone and maintenance signals.

## [2026-03-16] - Docs consolidation: Animation cluster
- What changed: Merged unique content from `ANIMATION_LIBRARY_AND_ROUTING.md`, `animation-guide.md`, `CSV_UPDATE_CHECKLIST.md`, `hero-visual-library-spec.md` into `ANIMATION_SYSTEM_GUIDE.md` (v1.1). All four source files archived to `docs/archive/2026-03-16/`.
- Why it matters: Single source of truth for the animation system; eliminates fragmented references.

## [2026-03-16] - Docs consolidation: Routing cluster
- What changed: Merged unique content from `MIGRATION-REGISTRY-ROUTING.md`, `MIGRATION_PLAN.md`, `FILESYSTEM_ROUTE_HANDLERS_ANALYSIS.md` into `ROUTING.md`. All three source files archived to `docs/archive/2026-03-16/`.
- Why it matters: One doc covers routing architecture, migration history, and rollback plan.

## [2026-03-16] - Docs consolidation: Developer Architecture cluster
- What changed: Merged unique content from `WEBSITE_UPDATE_FEB2026.md`, `SITE-DEVELOPER-GUIDE.md`, `system-architecture.md`, `notebook-summary.md`, `replit.md` into `PROJECT_STRUCTURE.md`. All five source files archived to `docs/archive/2026-03-16/`.
- Why it matters: Centralises end-to-end data flows, performance tuning, and extension playbooks in the canonical architecture doc.

## [2026-03-16] - Docs consolidation: Design/Branding cluster
- What changed: Merged widget palettes, utility CSS class standards, and theme system notes from `branding-guidelines.md`, `CONSOLIDATION_SUMMARY.md`, and `component-library.md` into `DESIGN-STYLE-PALETTE-GUIDE.md` (new §2.7, §5.6, §12). `branding-guidelines.md` and `CONSOLIDATION_SUMMARY.md` archived to `docs/archive/2026-03-16/`; `component-library.md` retained (distinct component catalog role).
- Why it matters: All palette, utility class, and theming decisions are now in the design canonical.

## [2026-03-16] - Docs consolidation: Content Operations cluster
- What changed: Merged runbook, admin UI operations, template ID standards, mapping guidance, and editorial skeleton references from `INTERN_TEMPLATE_AND_CONTENT_UPDATE_RUNBOOK.md`, `ADMIN_GUIDE.md`, `ADMIN_TEMPLATEID_DETERMINATION_MAPPING_AND_USAGE.md`, `PAGE_TEMPLATE_MAPPING_REFERENCE.md`, and `CONTENT-TEMPLATE-SKELETONS.md` into `CONTENT_MANAGEMENT_GUIDE.md` (v1.1).
- Why it matters: Consolidates all content/template operating procedures into one canonical workflow guide.

## [2026-03-16] - Docs consolidation: Hierarchy and sitemap cluster
- What changed: Kept `SITE-PAGES-AND-HIERARCHY.md` as canonical and archived `gtmstackpro-page-review.md`, `CURRENT_SITEMAP.md`, and `PAGE LISTG.txt` after validation against current structure.
- Why it matters: Removes stale route snapshots and keeps one plain-language hierarchy source.

## [2026-03-16] - Docs consolidation: Refactor planning cluster
- What changed: Merged quick-reference execution checklists from `REFACTOR_SUMMARY.md` and `ABOUT_PAGE_SECTIONS.md` into `REFACTOR_PLAN.md` and `ABOUT_PAGE_REFACTOR_PLAN.md`; archived both source files.
- Why it matters: Keeps all homepage/about refactor planning in two canonical implementation plans.

## [2026-03-16] - Docs consolidation: WordPress/blog cluster
- What changed: Merged PDF/video embedding operations from `WORDPRESS-PDF-VIDEO-EMBED-GUIDE.md` into `BLOG-WORDPRESS-DEVELOPER-GUIDE.md` under a new embedding section, then archived the source file.
- Why it matters: Keeps WordPress publishing, API, and embed troubleshooting in one canonical blog integration guide.

## [2026-03-16] - Docs consolidation: Change tracking cluster
- What changed: Consolidated `CHANGE_DOCUMENT_SINCE_2026-03-01.md` into the canonical documentation set (`CHANGELOG.md`, `PROJECT_STRUCTURE.md`, `DESIGN-STYLE-PALETTE-GUIDE.md`, `CONTENT_MANAGEMENT_GUIDE.md`) and archived the source file.
- Why it matters: Keeps change history in one authoritative changelog while architecture/token/schema details live in their canonical docs.

## [2026-03-16] - Docs consolidation: Gallery prompts cluster
- What changed: Consolidated `CURSOR_PROMPT_EXISTING_SITE.md` and `CURSOR_QUICK_PROMPT.md` into `GALLERY_MANAGEMENT_GUIDE.md` and archived both prompt-only source files.
- Why it matters: Keeps gallery build/iteration instructions and prompt patterns in one operational guide.

## [2026-03-16] - Docs consolidation: Site overview cluster
- What changed: Merged strategic summary and project brief essentials from `WEBSITE_SUMMARY.md` and `PROJECT_BRIEF.md` into `WEBSITE_USER_GUIDE.md` (new strategic brief section), then archived both source files.
- Why it matters: Maintains one canonical business-facing overview for positioning, journey, and KPI context.

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
