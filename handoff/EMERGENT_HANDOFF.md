# EMERGENT_HANDOFF.md

# GTMStack.pro  
AI-Assisted Implementation Handoff Guide

This document defines the operational guardrails for AI-assisted development in this repository.

It is intended for tools such as:

- Emergent
- Cursor
- WebStorm AI Assistant
- GitHub Copilot
- ChatGPT

The goal is to ensure **safe incremental implementation** without breaking the registry-driven architecture.

For full architecture context see:

- PROJECT_CONTEXT.md
- AI_RULES.md
- PRE_EMERGENT_CHECKLIST.md
- OPEN_QUESTIONS.md
- HANDOFF_SUMMARY.md

---

# 1. Project Summary

**Project:** GTMStack.pro  
**Framework:** Next.js App Router  
**Language:** TypeScript  
**Styling:** Tailwind CSS  

### Architecture Pattern
Routes
↓
Page Registry
↓
Templates
↓
Content Registry / JSON Content
↓
Components


Primary registry flow:


src/data/page-registry.csv
↓
scripts/gen-page-registry.ts
↓
src/data/pageRegistry.generated.ts
↓
lib/pageRegistry.ts
↓
Route resolution


Catch-all route:


app/[[...slug]]/page.tsx


This resolves:


route → templateId → contentKey


through:


getTemplate()
getContentByKey()


---

# 2. Core Systems

## Page Registry

Source of truth:


src/data/page-registry.csv


Generated runtime file:


src/data/pageRegistry.generated.ts


Validation tools:


npm run validate:registry
npm run registry:audit


Registry rows bind:


route
templateId
contentKey


---

## Template System

Template mapping:


src/templates/registry.ts


Uploaded template mapping:


src/templates/uploadedRegistry.generated.ts


Templates render content objects provided by the registry.

---

## Content Registry

Primary content lookup:


src/content/registry.ts


Content keys map to:

- JSON objects
- section models
- generated data collections

Examples:


home:main
about:main
expertise:demand-generation
industries:retail


---

## Gallery System

Gallery metadata sources:


src/data/animationCatalog.generated.ts
src/data/animationMeta.overrides.json


Processing flow:


catalog
→ merge overrides
→ adapter
→ gallery templates


Thumbnail pipeline:


scripts/generate-thumbnails.js
/api/animations/thumbnail


---

## Blog System

Blog content comes from **WordPress**.

Key files:


lib/wp-client.ts
lib/wordpress.ts
lib/wp-media.ts


Primary blog route:


/blog
/blog/post?slug=


An MDX slug route exists but is currently **uncertain**.

---

# 3. Non-Negotiable Guardrails

These rules must **never be violated by AI coding tools.**

### Architecture

Do NOT:

- rename routes
- change routing strategy
- remove registry-driven architecture
- convert registry logic to hardcoded routing

### Registry

Do NOT:

- edit generated registry files
- change registry schema
- bypass validation scripts

Generated files must never be manually edited.

### Dependencies

Do NOT:

- add dependencies
- remove dependencies
- change build tooling

unless explicitly approved.

### Static Export

Do NOT modify:


next.config.js
STATIC_EXPORT behavior


Deployment depends on this.

---

# 4. Frozen Zones

These areas should **not be modified by Emergent** unless explicitly required.

### Routing Core


app/[[...slug]]/page.tsx
app/expertise/**
app/industries/**
app/case-studies/**


### Registry Core


src/data/pageRegistry.generated.ts
scripts/gen-page-registry.ts
scripts/validate-page-registry.ts
scripts/registry-audit.mjs


### Template Mapping


src/templates/registry.ts
src/templates/uploadedRegistry.generated.ts


### Static Export Configuration


next.config.js


### Admin / Local Tooling


app/admin/**
app/api/admin/**
(local)/gallery-admin/**


These are **local-only tools**.

---

# 5. Safe Edit Zones

AI tools may safely modify these areas **when tasks are narrowly scoped.**

### Content Files


content/**


Provided that:

- keys remain unchanged
- slugs remain unchanged

### Template Components


src/templates/**


Allowed changes:

- layout tweaks
- accessibility fixes
- rendering bugs

Not allowed:

- templateId renaming
- registry wiring changes

### UI Components


components/**


If they do not own routing logic.

### Gallery Rendering

Small fixes allowed in:


src/data/animations.ts
src/data/animationGallery.ts


But not in generated catalog files.

### Blog UI

Safe edits:


app/blog/**


UI rendering only.

Do not change routing semantics.

---

# 6. Validation Pipeline

After **every AI implementation batch**, run:


npm run validate:registry
npm run registry:audit
npm run typecheck
npm run lint
npm run build
npm run build:static
npm run link-audit


If any step fails:

Stop and diagnose the failure before continuing.

The canonical validation sequence is documented in:


PRE_EMERGENT_CHECKLIST.md


---

# 7. AI Task Scope Rules

All AI tasks must be:

### Small

A single objective.

Example:


Fix gallery thumbnail mapping
for animation "seo-growth-flow".


### File-bounded

Explicit file list.

### Behavior-bounded

Example:


Render WordPress tags correctly
in BlogIndexClient.


---

# 8. Known Open Questions

Several architectural questions remain unresolved.

See:


OPEN_QUESTIONS.md


Examples include:

- canonical blog detail route
- content precedence rules
- gallery metadata source of truth
- registry vs section route ownership

AI systems must treat these as **uncertain** unless clarified.

---

# 9. Recommended AI Workflow

Local Development

Cursor / WebStorm / VS Code

↓

Push to GitHub

↓

Emergent uses **sandbox branch**

↓

Emergent implements batch

↓

Run validation

↓

Pull changes locally

↓

Manual review

↓

Merge

↓

Deploy

---

# 10. First Recommended Emergent Tasks

Good initial tasks:

- fix animation gallery thumbnail mapping
- improve WordPress taxonomy rendering
- wire JSON content into templates
- fix isolated component bugs

Avoid first tasks like:

- routing refactors
- registry restructuring
- blog system changes
- dependency upgrades

---

# Final Rule

If a change might affect:

- routing
- registry wiring
- template resolution
- static export
- generated artifacts

the AI must **explain the planned change before editing.**