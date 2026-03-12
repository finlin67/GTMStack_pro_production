# Cursor Handoff Guide (GTMStack.pro)

> File name retained for backward compatibility. This is now a **Cursor-first** handoff document.

Purpose: give Cursor clear, enforceable constraints so it can execute safe, incremental edits without breaking the registry-driven architecture.

Related docs:
- `PROJECT_CONTEXT.md`
- `AI_RULES.md`
- `PRE_EMERGENT_CHECKLIST.md`
- `OPEN_QUESTIONS.md`
- `HANDOFF_SUMMARY.md`

---

## 1) Project Snapshot

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS
- Architecture: Route -> Registry -> Template -> Content

Canonical registry chain:

`src/data/page-registry.csv`
-> `scripts/gen-page-registry.ts`
-> `src/data/pageRegistry.generated.ts`
-> `lib/pageRegistry.ts`
-> route resolution in `app/[[...slug]]/page.tsx` and section routes

Runtime resolution contract:

`route -> templateId -> contentKey` via `getTemplate()` + `getContentByKey()`

---

## 2) Cursor Operating Model

For each task in Cursor, require this flow:

1. **Plan first**
   - Restate objective in one sentence.
   - List exact files in scope.
   - List explicit out-of-scope files.
2. **Edit narrowly**
   - Keep changes minimal.
   - Do not mix unrelated cleanups.
3. **Validate**
   - Run full validation sequence (see Section 6).
4. **Report**
   - Provide changed files, assumptions, risks, rollback notes.

If route ownership or source-of-truth is unclear, Cursor must mark it `uncertain` and ask before changing behavior.

---

## 3) Non-Negotiable Guardrails

### Architecture
Do not:
- rename routes
- change routing strategy
- replace registry-driven logic with hardcoded routing
- refactor core architecture unless explicitly approved

### Registry + Generated Files
Do not:
- manually edit generated artifacts (`*.generated.ts`)
- change registry schema without approval
- skip registry validation gates

### Dependencies + Build Tooling
Do not add/remove dependencies or alter build tooling unless explicitly approved.

### Static Export
Do not change `next.config.js` static export behavior without explicit signoff.

---

## 4) Frozen Zones (Require Explicit Approval)

- `app/[[...slug]]/page.tsx`
- `app/expertise/**`
- `app/industries/**`
- `app/case-studies/**`
- `src/data/pageRegistry.generated.ts`
- `scripts/gen-page-registry.ts`
- `scripts/validate-page-registry.ts`
- `scripts/registry-audit.mjs`
- `src/templates/registry.ts`
- `src/templates/uploadedRegistry.generated.ts`
- `next.config.js`
- `app/admin/**`
- `app/api/admin/**`
- `app/(local)/**`

---

## 5) Safe Edit Zones (Narrow, File-Bounded Tasks)

Usually safe if keys/slugs/contracts are preserved:

- `content/**`
- `src/templates/**` (layout/accessibility/rendering fixes only)
- `components/**` (non-routing logic)
- `src/data/animations.ts`
- `src/data/animationGallery.ts`
- `app/blog/**` (UI behavior only, no route semantics change)

---

## 6) Required Validation Sequence

After each Cursor batch:

1. `npm run validate:registry`
2. `npm run registry:audit`
3. `npm run typecheck`
4. `npm run lint`
5. `npm run build`
6. `npm run build:static`
7. `npm run link-audit`

If any command fails, stop and resolve before the next batch.

---

## 7) Task Scoping Rules for Cursor

Every prompt should be:
- **Single objective** (one clear outcome)
- **File-bounded** (explicit allow-list)
- **Behavior-bounded** (state what must not change)

Good example:
> Fix taxonomy tag rendering in `app/blog/BlogIndexClient.tsx` only. Do not change routes, fetch semantics, or dependencies.

---

## 8) Known Uncertainties

See `OPEN_QUESTIONS.md` for unresolved design decisions, especially:
- canonical blog detail route
- content precedence rules
- gallery metadata source of truth
- registry vs section-route ownership

Treat these as blocked/`uncertain` until confirmed.

---

## 9) Cursor-First Workflow

1. Create branch locally.
2. Use Cursor for one small batch.
3. Run validation sequence.
4. Commit with scoped message.
5. Open PR with assumptions/risks.
6. Merge after review.

---

## 10) Best First Cursor Tasks

Start with:
- isolated gallery thumbnail mapping fixes
- WordPress taxonomy rendering fixes
- template-level JSON content wiring fixes
- isolated component regressions/accessibility defects

Avoid first-pass tasks:
- routing refactors
- registry schema changes
- blog URL model changes
- dependency upgrades

---

## Final Rule

If a proposed change could affect routing, registry wiring, template resolution, static export, or generated artifacts, Cursor must provide a brief plan and wait for approval before editing.