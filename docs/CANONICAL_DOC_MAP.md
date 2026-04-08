# Canonical Documentation Reference

Last updated: 2026-04-04

## 1) Strict Canonical Map (One-Line Policy per Cluster)

| Topic Cluster | Canonical Document | One-line Policy |
|---|---|---|
| Animation system and hero routing | docs/ANIMATION_SYSTEM_GUIDE.md | Keep one end-to-end animation source of truth; all CSV, registry, gallery, and troubleshooting guidance must resolve here. |
| Routing architecture and registry migration | docs/ROUTING.md | Treat this as the runtime truth; migration/legacy docs become historical appendices only. |
| Developer architecture master | docs/PROJECT_STRUCTURE.md | Use this as the primary structural/technical map; other architecture docs can explain context but must not redefine structure. |
| Design system and branding | docs/DESIGN-STYLE-PALETTE-GUIDE.md | All visual tokens and style rules live here; branding and component notes must link here instead of restating. |
| Site overview and audience narrative | docs/WEBSITE_USER_GUIDE.md | Keep one non-technical user-facing narrative; README and summary docs should stay technical/high-level only. |
| Content operations and template workflows | docs/CONTENT_MANAGEMENT_GUIDE.md | Centralize schema, content flow, and update workflow in one operations guide. |
| Page hierarchy and sitemap | docs/SITE-PAGES-AND-HIERARCHY.md | Keep one human-readable page map; generated machine maps belong in CSV/reference artifacts only. |
| Homepage refactor planning | docs/REFACTOR_PLAN.md | Maintain a single authoritative plan doc; summaries should be absorbed and then removed. |
| About page refactor planning | docs/ABOUT_PAGE_REFACTOR_PLAN.md | Maintain one About refactor plan; status summaries should be folded in as short sections. |
| Change tracking | docs/CHANGELOG.md | Record all changes as dated entries in one rolling changelog; snapshot change docs should be migrated into it. |
| WordPress/blog operations (developer) | docs/BLOG-WORDPRESS-DEVELOPER-GUIDE.md | Keep architecture + editorial workflow together in one guide; special-case embed instructions become a subsection. |
| WordPress/blog operations (editorial / CMO) | docs/BLOG_CONTENT_TYPES_GUIDE.md | Non-technical guide for content authors covering the four post layout types, category/tag strategy, and publishing checklist. |
| Gallery implementation and maintenance | docs/GALLERY_MANAGEMENT_GUIDE.md | Keep gallery ownership guidance in one maintenance doc; AI prompts are appendices or archive-only artifacts. |
| Local setup | docs/project-setup.md | Keep local developer setup in one quickstart doc. |
| Production deployment | docs/HOSTINGER_NODE_DEPLOY.md | Keep production host-specific deployment settings in one deployment runbook. |

## 2) Exact Merge Targets (Section-by-Section)

### A. Animation system and hero routing
Canonical target: docs/ANIMATION_SYSTEM_GUIDE.md

| Source Document | Source Section(s) | Merge Target in Canonical | Action |
|---|---|---|---|
| docs/ANIMATION_LIBRARY_AND_ROUTING.md | ## 1. Source of truth: the CSV; ## 2. Two library destinations; ## 3. How routing works at runtime; ## 4. Adding a new animation; ## 5. Quick reference | ## Source of Truth: The CSV; ## The Two Registration Systems; ## Complete Animation Flow; ## Step-by-Step: Adding a New Animation; ## Quick Reference | Merge concise wording improvements where clearer; avoid duplicating examples already present. |
| docs/animation-guide.md | ## 1) Animation libraries and motion systems in use; ## 2) Keyframe definitions found; ## 3) Shared interactive motion components; ## 4) Route-wired animation catalog | ## Technical Architecture; ## Related Documentation (new subsection: Motion Systems and Keyframes); ## File Locations Quick Map | Add as short reference subsections; keep catalog links, not full duplicated lists. |
| docs/CSV_UPDATE_CHECKLIST.md | ## Pre-Add Checklist; ## Post-Add Checklist; ## Final Verification | ## Step-by-Step: Adding a New Animation (new subsection: Checklist) | Fold full checklist into a checkbox block under the workflow chapter. |
| docs/hero-visual-library-spec.md | ## CSV format; ## Quality control checklist; ## QC result summary; ## Where the registry lives | ## Source of Truth: The CSV; ## Troubleshooting (new subsection: CSV QC Rules) | Merge format rules and QC criteria; move old one-time QC result to archive note. |
| docs/GALLERY_MANAGEMENT_GUIDE.md | ## Adding New Animations; ## Troubleshooting | ## Routing to Gallery; ## Troubleshooting | Keep gallery-specific UX/ops in gallery doc, but cross-link animation registration and troubleshooting steps. |

Archive after merge: docs/ANIMATION_LIBRARY_AND_ROUTING.md, docs/animation-guide.md, docs/CSV_UPDATE_CHECKLIST.md, docs/hero-visual-library-spec.md

### B. Routing architecture and migration
Canonical target: docs/ROUTING.md

| Source Document | Source Section(s) | Merge Target in Canonical | Action |
|---|---|---|---|
| docs/MIGRATION-REGISTRY-ROUTING.md | ## What Changed; ## How the catch-all works; ## Testing; ## Adding new registry pages | ## Overview (new subsection: Migration History); ## Route Resolution Flow; ## Common Tasks | Merge as historical context + current verification checks. |
| docs/MIGRATION_PLAN.md | ## Overview; ## Current State vs. Future State; ## Migration Strategy: Phase-Based Approach; ## Implementation Checklist; ## Rollback Plan | ## Related Documentation (new subsection: Completed Migration Plan Notes) | Preserve only still-relevant rollback/checklist items; mark completed plan as archived. |
| docs/FILESYSTEM_ROUTE_HANDLERS_ANALYSIS.md | ## Current Filesystem Route Architecture; ## Issues with Current Filesystem Approach; ## Next Steps | ## Notable Routing Patterns (new subsection: Legacy Contrast) | Keep the legacy contrast summary only; remove stale route counts from canonical. |
| docs/developer-routing-and-hero-visuals.md | ## 2. Routing model & where pages live | ## How Routes Are Organized & Registered | Merge developer-friendly explanation language and examples. |

Archive after merge: docs/MIGRATION-REGISTRY-ROUTING.md, docs/MIGRATION_PLAN.md, docs/FILESYSTEM_ROUTE_HANDLERS_ANALYSIS.md

### C. Developer architecture master
Canonical target: docs/PROJECT_STRUCTURE.md

| Source Document | Source Section(s) | Merge Target in Canonical | Action |
|---|---|---|---|
| docs/WEBSITE_UPDATE_FEB2026.md | Section 1 (Developer Guide); 1.3 Install; 1.5 Environment Variables; 1.6 Extend Functionality | ## Technology Stack; ## Environment Variables; ## Build & Deployment Scripts; ## Important Notes (new subsection: Extension Playbooks) | Merge practical extension workflows and environment caveats. |
| docs/SITE-DEVELOPER-GUIDE.md | ## 3. Animations & hero tiles; ## 4. Styling system; ## 5. Performance & motion tuning | ## components/ Directory Structure; ## Technology Stack; ## Important Notes (new subsection: Performance Tuning) | Merge the best operational guidance for animation and performance tuning. |
| docs/system-architecture.md | ## High-level setup; ## Data sources; ## End-to-end rendering/data flows | ## Request Flow Summary; ## Key Data Structures | Merge flow diagrams and CMS boundary clarifications. |

Archive after merge: docs/WEBSITE_UPDATE_FEB2026.md, docs/SITE-DEVELOPER-GUIDE.md, docs/system-architecture.md, docs/notebook-summary.md, docs/replit.md

### D. Design and branding
Canonical target: docs/DESIGN-STYLE-PALETTE-GUIDE.md

| Source Document | Source Section(s) | Merge Target in Canonical | Action |
|---|---|---|---|
| docs/branding-guidelines.md | ## Typography; ## Color Palette; ## Theme Rules | ## 3. Typography; ## 2. Color palette; ## 9. Don’ts | Fold concise branding constraints where not already covered. |
| docs/component-library.md | ## Hero System; ## Core UI Primitives; ## Theme System Notes | ## 5. Component patterns (new subsection: Component Entry Points) | Keep links to component entry points, not full duplicate component catalog text. |
| docs/CONSOLIDATION_SUMMARY.md | ## 1. Card / glass styles; ## 2. CTA styles; ## 3. Dead / duplicate utilities removed | ## 5. Component patterns (new subsection: Utility Class Standards) | Merge only enduring standards; convert change narrative to changelog entry. |

Archive after merge: docs/branding-guidelines.md, docs/CONSOLIDATION_SUMMARY.md

### E. Site overview and narrative docs
Canonical target: docs/WEBSITE_USER_GUIDE.md

| Source Document | Source Section(s) | Merge Target in Canonical | Action |
|---|---|---|---|
| docs/WEBSITE_SUMMARY.md | ## What Is This Website?; ## Who Is This Website For?; ## Why Would Someone Want to Engage? | ## 1) What This Website Is; ## 2) Who This Website Is For; ## 6) Key Message | Merge crisp summary language and positioning phrases. |
| docs/PROJECT_BRIEF.md | ## 1) North Star Objective; ## 2) Target Personas; ## 6) Voice & Tone; ## 8) The Golden Path | ## 2) Who This Website Is For; ## 7) Suggested Use Cases; ## 10) One-Sentence Summary | Merge strategy statements and personas into user-facing language. |
| docs/README.md | ## Features; ## Tech Stack; ## Getting Started | Keep in docs/README.md | Do not merge into user guide; keep README technical and link to canonical user guide. |

Archive after merge: docs/replit.md

### F. Content operations and admin workflow
Canonical target: docs/CONTENT_MANAGEMENT_GUIDE.md

| Source Document | Source Section(s) | Merge Target in Canonical | Action |
|---|---|---|---|
| docs/INTERN_TEMPLATE_AND_CONTENT_UPDATE_RUNBOOK.md | ## Safety rules; ## How to update Content; ## How to update Templates; ## Wiring a new or updated page; ## troubleshooting | ## How to Add New Content; ## Full Project Content Map; ## Questions or Issues? (new subsection: Operator Runbook) | Merge as role-neutral runbook checklist and troubleshooting appendix. |
| docs/CONTENT-TEMPLATE-SKELETONS.md | ## 1. Home through ## 10. How to Use This Document | ## Content Type Schemas (new subsection: Editorial Skeletons by Page Type) | Keep skeletons as concise templates; remove duplicated narrative text. |
| docs/PAGE_TEMPLATE_MAPPING_REFERENCE.md | ## All Pages Mapped by Section; ## Template Definitions; ## Content Key Mapping; ## Validation Checklist | ## The Registry System; ## Full Project Content Map | Merge current mapping rules, but keep large route tables as generated artifacts. |
| docs/ADMIN_GUIDE.md | ## Understanding the Page Index Table; ## Status Indicators; ## Add/Edit mapping | ## The Registry System (new subsection: Admin UI Operations) | Merge practical admin UI instructions and status semantics. |
| docs/ADMIN_TEMPLATEID_DETERMINATION_MAPPING_AND_USAGE.md | ## Runtime template lookup order; ## Mapping/Persistence Mechanics; ## Naming Rules | ## The Registry System; ## Type Definitions Reference | Merge the naming standard and runtime lookup order only. |

Archive after merge: docs/INTERN_TEMPLATE_AND_CONTENT_UPDATE_RUNBOOK.md, docs/CONTENT-TEMPLATE-SKELETONS.md, docs/ADMIN_GUIDE.md, docs/ADMIN_TEMPLATEID_DETERMINATION_MAPPING_AND_USAGE.md

### G. Hierarchy and sitemap
Canonical target: docs/SITE-PAGES-AND-HIERARCHY.md

| Source Document | Source Section(s) | Merge Target in Canonical | Action |
|---|---|---|---|
| docs/CURRENT_SITEMAP.md | full file (CSV rows) | Add link section at bottom: Generated Machine Sitemap Sources | Do not inline stale CSV rows into hierarchy doc; replace with generated source link note. |
| docs/gtmstackpro-page-review.md | full file (no headings) | ## Simple hierarchy diagram (append: Draft Notes Resolved) | Extract any still-missing page labels/slugs, then archive file. |
| docs/PAGE LISTG.txt | full file (no headings) | ## Main menu (top level) | Verify no unique items; if none, archive. |

Archive after merge: docs/CURRENT_SITEMAP.md, docs/gtmstackpro-page-review.md, docs/PAGE LISTG.txt

### H. Refactor plans
Canonical targets: docs/REFACTOR_PLAN.md and docs/ABOUT_PAGE_REFACTOR_PLAN.md

| Source Document | Source Section(s) | Merge Target in Canonical | Action |
|---|---|---|---|
| docs/REFACTOR_SUMMARY.md | ## Current → Target Mapping; ## Dark/Light Assignment | docs/REFACTOR_PLAN.md (new final section: Executive Summary) | Fold summary table into plan as final condensed section. |
| docs/ABOUT_PAGE_SECTIONS.md | ## Current Sections (6 total) | docs/ABOUT_PAGE_REFACTOR_PLAN.md (new section: Baseline Snapshot) | Fold compact baseline list into canonical plan. |

Archive after merge: docs/REFACTOR_SUMMARY.md, docs/ABOUT_PAGE_SECTIONS.md

### I. Change tracking
Canonical target: docs/CHANGELOG.md

| Source Document | Source Section(s) | Merge Target in Canonical | Action |
|---|---|---|---|
| docs/CHANGE_DOCUMENT_SINCE_2026-03-01.md | entire doc, by dated change blocks | docs/CHANGELOG.md dated entries | Convert snapshot items into dated changelog entries with links to affected files. |
| docs/WEBSITE_UPDATE_FEB2026.md | relevant historical update bullets | docs/CHANGELOG.md historical note entry | Keep only changelog-relevant events; do not duplicate guide text. |

Archive after merge: docs/CHANGE_DOCUMENT_SINCE_2026-03-01.md

### J. WordPress/blog docs
Canonical target: docs/BLOG-WORDPRESS-DEVELOPER-GUIDE.md

| Source Document | Source Section(s) | Merge Target in Canonical | Action |
|---|---|---|---|
| docs/WORDPRESS-PDF-VIDEO-EMBED-GUIDE.md | ## Overview; embed examples; setup details | New subsection in canonical: Rich Media Embeds (PDF/Video) | Merge all embed examples and editorial caveats directly into developer guide. |

Archive after merge: docs/WORDPRESS-PDF-VIDEO-EMBED-GUIDE.md

### K. Gallery prompts
Canonical target: docs/GALLERY_MANAGEMENT_GUIDE.md

| Source Document | Source Section(s) | Merge Target in Canonical | Action |
|---|---|---|---|
| docs/CURSOR_PROMPT_EXISTING_SITE.md | context and long prompt body | Add appendix in canonical: AI Prompt Templates (Long Form) | Preserve only if prompt-driven workflow remains in use. |
| docs/CURSOR_QUICK_PROMPT.md | quick prompt body | Add appendix in canonical: AI Prompt Templates (Quick Form) | Merge short version as quick-start snippet. |

Archive after merge: docs/CURSOR_PROMPT_EXISTING_SITE.md, docs/CURSOR_QUICK_PROMPT.md

## 3) Archive Policy

1. Only archive a file after all unique sections are either merged or intentionally discarded.
2. Every archive operation must add a one-line note in docs/CHANGELOG.md naming source and canonical destination.
3. Archived files should move to docs/archive/YYYY-MM-DD/ to preserve traceability.
4. Archive-only artifacts with no unique content can be moved immediately after validation.

## 4) Merge Execution Order (Recommended)

1. Animation cluster
2. Routing cluster
3. Content operations cluster
4. Design cluster
5. Hierarchy cluster
6. Refactor cluster
7. WordPress cluster
8. Change tracking normalization
9. Final archive move
