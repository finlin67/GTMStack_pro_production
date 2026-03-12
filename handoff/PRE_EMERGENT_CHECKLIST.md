# Pre-Cursor Batch Checklist

> File name retained for compatibility.

Use this before running any scoped Cursor task.

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
- [ ] Record non-negotiable constraints (no route renames, no refactor, no dep churn, no manual generated-file edits).

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

## Cursor Prompt Quality Gate
- [ ] Prompt has one objective only.
- [ ] Prompt includes explicit allow-list file paths.
- [ ] Prompt includes explicit out-of-scope list.
- [ ] Prompt includes required validation order.
- [ ] Prompt instructs model to mark ambiguity as `uncertain`.
