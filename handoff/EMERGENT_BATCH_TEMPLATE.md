# Cursor Task Template (Batch Prompt)

> File name retained for compatibility with older workflows.

Use this template directly in Cursor for each scoped implementation batch.

## Task Name
`<short-task-name>`

## Goal (Single Objective)
- `<what must be fixed/implemented>`

## In Scope (Allow-List)
- `<exact file path>`
- `<exact file path>`

## Out of Scope (Block-List)
- Route renames
- Architecture refactors
- Registry schema changes
- Dependency additions/removals (unless explicitly approved)
- `<other exclusions>`

## Constraints
- Preserve runtime behavior unless the goal explicitly requires behavior change.
- Preserve registry -> template -> content wiring.
- Preserve route slugs and canonical URL shape.
- Do not edit generated artifacts directly (`*.generated.ts`).
- Mark ambiguous areas as `uncertain`.

## Expected Result
- `<concrete measurable outcome>`
- `<observable acceptance signal>`

## Validation (Run in Order)
1. `npm run validate:registry`
2. `npm run registry:audit`
3. `npm run typecheck`
4. `npm run lint`
5. `npm run build`
6. `npm run build:static`
7. `npm run link-audit`
8. Manual route checks for touched pages

## Required Output Format
1. Summary of what changed
2. File list changed
3. Assumptions made
4. Risks introduced (if any)
5. Rollback notes

## Rollback Notes (Template)
- Revert commit(s): `<hash or range>`
- Restore prior registry/content/template mappings if changed
- Re-run validation gates after rollback
