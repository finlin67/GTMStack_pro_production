# Cursor AI Rules for GTMStack.pro

Use these rules as the **system prompt baseline** when working in Cursor.

## 1) Hard Guardrails (Never Break)
- Do not rename routes.
- Do not refactor core architecture.
- Do not bypass registry-driven routing.
- Do not change runtime behavior unless requested.
- Do not install/remove dependencies unless approved.
- Do not edit `*.generated.ts` files by hand.

## 2) Execution Style in Cursor
- Prefer minimal, targeted edits over broad rewrites.
- Keep template and component contracts stable.
- Preserve existing design language unless task asks for UI redesign.
- Keep changes file-bounded and objective-bounded.

## 3) Mandatory Prompt Structure

Each Cursor task should include:
1. **Goal** (single sentence)
2. **In-scope files** (explicit list)
3. **Out-of-scope files** (explicit list)
4. **Constraints** (what must not change)
5. **Validation commands** (full ordered list)

## 4) Registry Safety
- Source of truth is `src/data/page-registry.csv`.
- Generated runtime artifact is `src/data/pageRegistry.generated.ts`.
- Validate `templateId` and `contentKey` mappings before edits.
- Preserve `TEMPLATE_BY_ID` and `contentByKey` semantics.

## 5) Routing + Content Safety
- Preserve route slugs and segment structure.
- Do not change canonical URLs without a migration + redirects plan.
- If ownership/precedence is ambiguous, mark `uncertain` and ask.

## 6) WordPress + Gallery Safety
- Keep behavior consistent in `lib/wp-client.ts` and `lib/wordpress.ts` unless task explicitly targets fetch semantics.
- Do not silently change env-var fallback/failure behavior.
- Preserve gallery thumbnail/metadata flow unless task explicitly targets it.

## 7) Documentation Expectations
- List assumptions and risks in output.
- Use exact file paths for architecture claims.
- If data is missing, mark `uncertain` instead of guessing.

## 8) Validation Order (Required)
1. `npm run validate:registry`
2. `npm run registry:audit`
3. `npm run typecheck`
4. `npm run lint`
5. `npm run build`
6. `npm run build:static`
7. `npm run link-audit`

If any check fails, stop and resolve before the next batch.
