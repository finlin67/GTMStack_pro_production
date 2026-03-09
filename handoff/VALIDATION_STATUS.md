# Validation Status

Scope requested:
- `npm run validate:registry`
- `npm run registry:audit`
- `npm run typecheck`
- `npm run lint`
- `npm run link-audit`
- `npm run build`
- `npm run build:static`
- `npx knip --production`

Method used:
- Did not re-run checks.
- Used existing repo artifacts (`reports/link-audit.md`, `reports/link-audit.csv`) and script definitions in `package.json`.
- No reliable terminal-history evidence was found for the other checks in this workspace.

## Passed Checks
- `uncertain`: No verified pass outputs were found for `validate:registry`, `registry:audit`, `typecheck`, `lint`, `build`, `build:static`, or `knip`.

## Failed Checks
- `npm run link-audit`: Existing report indicates failures.
- Evidence: `reports/link-audit.md` (Generated `2026-03-07T15:19:04.644Z`).
- Summary in report:
- Routes discovered: 46
- Internal link refs (unique): 156
- Broken links: 58
- Orphan routes: 26

## Warnings
- Multiple root links (`/`) are marked BROKEN in `reports/link-audit.md`; root handling should be manually confirmed before treating all such findings as product defects.
- Several broken links target likely placeholder/example paths (for example `/lead/12345`, `/blog/content-roi`, `/gallery/visual-systems`).
- Orphan route list includes admin/internal utility routes and route variants that may be intentionally unlinked.

## Blockers Before AI Handoff
- Unknown status for core checks (`validate:registry`, `registry:audit`, `typecheck`, `lint`, `build`, `build:static`, `knip`) is a blocker for confident implementation handoff.
- Link audit currently reports 58 broken links; this should be triaged into real defects vs false positives/noise.

## Explicitly Not Verified
- `npm run validate:registry` (not executed in this handoff pass)
- `npm run registry:audit` (not executed in this handoff pass)
- `npm run typecheck` (not executed in this handoff pass)
- `npm run lint` (not executed in this handoff pass)
- `npm run build` (not executed in this handoff pass)
- `npm run build:static` (not executed in this handoff pass)
- `npx knip --production` (not executed in this handoff pass)

## Recommended Fix Order
1. Run `npm run validate:registry` and resolve any route/template/content mismatches first.
2. Run `npm run registry:audit` and reconcile `templateId`/`contentKey` wiring findings.
3. Run `npm run typecheck` and `npm run lint` to stabilize code quality gates.
4. Run `npm run build` and then `npm run build:static` to confirm deployment path health.
5. Run `npm run link-audit`, classify findings into real defects vs acceptable/internal, and update nav/content links.
6. Run `npx knip --production` and review unused dependency/export cleanup as a separate hardening pass.

## Script Availability (from `package.json`)
- Present scripts:
- `validate:registry`, `registry:audit`, `typecheck`, `lint`, `link-audit`, `build`, `build:static`
- Not defined as npm script but runnable manually:
- `npx knip --production` (availability of knip package in current environment: `uncertain`)
