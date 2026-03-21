# Phase 2 Gallery QA Pack
Generated: 2026-03-20T22:07:55.207Z

## Brief Audit Summary
- Improved: deterministic modal precedence is centralized in src/lib/galleryPreviewPolicy.ts and used by both template and modal rendering.
- Improved: version/canonical hygiene now defaults to active-only visibility; secondary/deprecated variants are filtered out of the grid by default.
- Improved: grid fallback visuals now use informative fallback cards instead of generic orb shells when no thumbnail is available.
- Still needs work: 19 active items still show weak placeholder patterns (small assets and/or generic summaries).
- Still needs work: 0 active items show extreme thumbnail aspect ratios that can cause visual fit issues.

## Failure Breakdown
- missing thumbnail: 0
- placeholder thumbnail: 19
- wrong modal content: 0
- blank modal: 0
- crop/overlay defect: 0

## Recommended Canonical Policy
- Active item: highest semantic version in each base-id group; ties break by latest updatedAt.
- Secondary item: older versioned duplicates (for reference/testing only, hidden by default).
- Deprecated item: unversioned item superseded by versioned duplicates (hidden by default).
- Preview source precedence: live component, iframe entryHtml, thumbnail fallback, explicit fallback message.
- Active visible items: 125 of 129.
- Hidden secondary/deprecated items: 4.

### Hidden/Deprecated Candidates
- abm-pipeline-strategy-dashboard: deprecated (canonical: abm-pipeline-strategy-dashboard-v2, base: abm-pipeline-strategy-dashboard)
- edtech-compact-roi-funnel-v2: secondary (canonical: edtech-compact-roi-funnel-v3, base: edtech-compact-roi-funnel)
- executive-logistics-dashboard-v2: secondary (canonical: executive-logistics-dashboard-v3, base: executive-logistics-dashboard)
- live-email-automation-ecosystem-v2: secondary (canonical: live-email-automation-ecosystem-v3, base: live-email-automation-ecosystem)

## Representative QA Result Set (20+ items)
| Item ID | Grid Status | Modal Status | Notes |
|---|---|---|---|
| systems-operations-hero-component-v2 | visible-weak | ok-iframe-entry-html | placeholder-quality thumbnail or summary |
| revops-neural-dashboard-v2 | visible-meaningful | ok-iframe-entry-html | no major issue detected |
| revenue-systems-data-flow-v2 | visible-meaningful | ok-iframe-entry-html | no major issue detected |
| pipeline-command-center-v2 | visible-meaningful | ok-iframe-entry-html | no major issue detected |
| martech-ai-dashboard-engine-v2 | visible-meaningful | ok-iframe-entry-html | no major issue detected |
| marketing-analytics-carousel-v3 | visible-meaningful | ok-live-component | no major issue detected |
| live-email-automation-ecosystem-v3 | visible-meaningful | ok-live-component | no major issue detected |
| edtech-compact-roi-funnel-v3 | visible-weak | ok-iframe-entry-html | placeholder-quality thumbnail or summary |
| executive-logistics-dashboard-v3 | visible-meaningful | ok-live-component | no major issue detected |
| abm-pipeline-strategy-dashboard-v2 | visible-weak | ok-live-component | placeholder-quality thumbnail or summary |
| social-media-marketing-hero-tile-v2 | visible-meaningful | ok-iframe-entry-html | no major issue detected |
| manufacturinghero-dashboard-tile-v2 | visible-meaningful | ok-iframe-entry-html | no major issue detected |
| grid-master-cyber-infrastructure-dashboard-v2 | visible-meaningful | ok-iframe-entry-html | no major issue detected |
| growthsem-landing-page-v2 | visible-meaningful | ok-iframe-entry-html | no major issue detected |
| growthcore-component-extraction-v2 | visible-weak | ok-iframe-entry-html | placeholder-quality thumbnail or summary |
| growth-ai-harmonic-quad-tone | visible-meaningful | ok-iframe-entry-html | no major issue detected |
| gtmstack-hero-tile-v2 | visible-meaningful | ok-iframe-entry-html | no major issue detected |
| advocacy-loop-dashboard-v2 | visible-meaningful | ok-iframe-entry-html | no major issue detected |
| edu-marketers-dashboard-v2 | visible-meaningful | ok-live-component | no major issue detected |
| abm-campaign-radar-analysis-v2 | visible-weak | ok-iframe-entry-html | placeholder-quality thumbnail or summary |

## Safe Runbook
### 1) Regenerate
- npm run sync:gallery:dry
- npm run sync:gallery
- npm run sync:gallery:entry-html:dry
- npm run sync:gallery:entry-html

### 2) Verify
- npm run dev
- Validate representative items from this QA table for grid thumb and modal correctness.
- Confirm no blank white/black modal states and no wrong-preview openings.

### 3) Test Order
- Sync manifest/assets first.
- Then run dev server.
- Then run focused QA checks on representative items.
- Then run npm run build for production parity check.

### 4) What Not To Do
- Do not run multiple Next dev servers in parallel.
- Do not treat dev-cache JSON errors as proof of gallery UI failure.
- Do not mix modal strategies outside the defined precedence chain.
- Do not promote v2/v3 duplicates without explicitly designating canonical active item.
