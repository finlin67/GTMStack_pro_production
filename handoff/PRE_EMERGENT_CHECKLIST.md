# Pre-Emergent Checklist

Use before submitting any batch to Emergent or another AI coding platform.

## Repo and Branch Hygiene
- [ ] Confirm current branch name and intended target branch.
- [ ] Confirm no accidental work on protected/main branch.
- [ ] Confirm working tree status is understood (clean or intentionally dirty).
- [ ] Capture `git status` snapshot in task notes.

## Validation Gates
- [ ] Run `npm run validate:registry`.
- [ ] Run `npm run registry:audit`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run `npm run build:static`.
- [ ] Run `npm run link-audit`.
- [ ] Run `npx knip --production` (if part of scope).

## Scope Control
- [ ] Write explicit goal statement.
- [ ] List in-scope files/modules.
- [ ] List out-of-scope files/modules.
- [ ] Record non-negotiable constraints (no route renames, no refactor, no dep churn).

## Change Plan
- [ ] List exact files likely affected.
- [ ] Define expected behavior changes (or explicitly none).
- [ ] Define rollback strategy.

## QA and Verification
- [ ] List manual QA steps with expected outcomes.
- [ ] Include route-level checks for affected pages.
- [ ] Include screenshot/visual checks for UI changes.
- [ ] Include regression checks for registry/template/content resolution.

## Handoff Packaging
- [ ] Attach updated docs/report links.
- [ ] Include assumptions and unresolved questions.
- [ ] Include known risks and follow-up actions.
