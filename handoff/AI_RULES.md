# AI Rules for GTMStack.pro

## Non-Negotiable Guardrails
- Do not rename routes.
- Do not refactor architecture.
- Do not alter registry-driven routing model.
- Do not change runtime behavior unless explicitly requested.
- Do not install/remove dependencies unless required and approved.

## Implementation Style
- Prefer minimal, targeted fixes.
- Preserve existing design system and visual language.
- Keep template/component contracts stable.
- Avoid broad rewrites when small patches solve the issue.

## Registry Safety
- Treat `src/data/page-registry.csv` as source of truth.
- Regenerate artifacts via scripts, do not hand-edit generated files unless explicitly required.
- Validate `templateId` and `contentKey` mappings before coding against them.
- Preserve `TEMPLATE_BY_ID` and `contentByKey` semantics.

## Content and Routing Safety
- Preserve route slugs and segment structure.
- Do not change canonical URLs without migration plan and redirects.
- If route ownership is ambiguous, mark `uncertain` and ask for confirmation.

## WordPress and Gallery Safety
- Keep WordPress fetch layers (`lib/wp-client.ts`, `lib/wordpress.ts`) behaviorally consistent.
- Do not silently change env-var fallback/failure behavior.
- Preserve gallery metadata and thumbnail resolution flow unless task explicitly targets it.

## Documentation and Assumptions
- Document assumptions in the PR/task output.
- If data is ambiguous or missing, add a TODO and mark `uncertain` instead of guessing.
- Reference exact file paths for any architecture claim.

## Validation Expectations
- Prefer this order when validating changes:
1. `npm run validate:registry`
2. `npm run registry:audit`
3. `npm run typecheck`
4. `npm run lint`
5. `npm run build`
6. `npm run build:static`
7. `npm run link-audit`
