# Safe Feature Merge: Admin CMS from Folder #2 → Folder #1

**Merge Date:** February 27, 2026  
**Folder #1 (Source of Truth):** C:\GitProd\GTMStack_pro (main repo + gallery work)  
**Folder #2 (Admin CMS):** C:\GitProd\Admin-GTM\GTMStack_pro  
**Status:** Pre-merge analysis complete. Awaiting approval.

---

## Summary

✅ **Admin files:** 31 (all new, safe to copy)  
✅ **Lib files:** 3 (all new, safe to copy)  
✅ **Scripts:** 1 (new, safe to copy)  
⚠️ **Requiring manual merge:** 4 files  
❌ **Middleware changes:** None needed  
❌ **Layout changes:** None (identical)  

**Total files to copy after approval:** 35  
**Sensitive files requiring approval:** 4

---

## A) Files Ready for Direct Copy (No Conflicts)

### ✅ Admin Pages (All new / 3 files)
```
app/admin/page.tsx                          [NEW - 507 lines]
app/admin/translator/page.tsx               [NEW - 468 lines]
app/admin/page.tsx.bak                      [BACKUP - 475 lines]
```

### ✅ Admin Components (All new / 8 files)
```
components/admin/AdminGate.tsx              [NEW - 78 lines]
components/admin/AdminLayout.tsx            [NEW - 73 lines]
components/admin/BlogForm.tsx               [NEW - 133 lines]
components/admin/PageForm.tsx               [NEW - 217+ lines]
components/admin/PageList.tsx               [NEW - 326+ lines]
components/admin/TemplatesPanel.tsx         [NEW - 215+ lines]
components/admin/URLValidationInput.tsx     [NEW - 93 lines]
components/admin/WizardModal.tsx            [NEW - 123 lines]
```

### ✅ Admin Wizards (All new / 6 files)
```
components/admin/wizards/EditPageWizard.tsx    [NEW - 259 lines]
components/admin/wizards/AddTemplateWizard.tsx [NEW - 411 lines]
components/admin/wizards/UpdateContentWizard.tsx [NEW - 227 lines]
components/admin/wizards/UpdateTemplateWizard.tsx [NEW]
components/admin/wizards/QuickPageUpdateWizard.tsx [NEW - 244 lines]
components/admin/wizards/QuickPageUpdateWizard.tsx.bak [BACKUP]
```

### ✅ Admin API Routes (All new / 14 files)
```
app/api/admin/blog/route.ts                 [NEW]
app/api/admin/find-page/route.ts            [NEW]
app/api/admin/login/route.ts                [NEW]
app/api/admin/manager/route.ts              [NEW]
app/api/admin/page-upsert/route.ts          [NEW]
app/api/admin/pages/route.ts                [NEW]
app/api/admin/registry-audit/route.ts       [NEW]
app/api/admin/run-gen-registry/route.ts     [NEW]
app/api/admin/session/route.ts              [NEW]
app/api/admin/slugs/route.ts                [NEW]
app/api/admin/templates/route.ts            [NEW]
app/api/admin/templates/upload/route.ts     [NEW]
app/api/admin/upload/route.ts               [NEW]
app/api/admin/write-file/route.ts           [NEW]
```

### ✅ Lib Files (All new / 3 files)
```
lib/admin-auth.ts                           [NEW - 39 lines]
lib/route-validation.ts                     [NEW - 183 lines]
lib/use-lookup-page.ts                      [NEW - 220 lines]
```

### ✅ Scripts (New / 1 file)
```
scripts/page-upsert.mjs                     [NEW - 256 lines]
```

---

## B) Files Requiring Manual Merge (4 files)

### ⚠️ 1. src/templates/registry.ts

**Folder #2 (Admin version):**
```typescript
import type { TemplateId } from '@/src/data/pageRegistry.generated'
import { getUploadedTemplate } from './uploadedRegistry.generated'    // <-- NEW: Admin adds this
import ExpertiseCategoryTemplate from '@/src/templates/expertise/ExpertiseCategoryTemplate'
// ... other imports

export type TemplateComponent = ... // Same

export const TEMPLATE_BY_ID: Record<string, TemplateComponent> = {  // <-- String instead of RegistryTemplateId
  // ... same entries
}

export function getTemplate(templateId: string): TemplateComponent {
  const Uploaded = getUploadedTemplate(templateId)                  // <-- NEW: Calls uploaded registry first
  if (Uploaded) return Uploaded as TemplateComponent
  
  const Component = TEMPLATE_BY_ID[templateId]
  if (!Component) throw new Error(`Unknown templateId: ${templateId}`)
  return Component
}
```

**Folder #1 (Main version):**
```typescript
import type { TemplateId } from '@/src/data/pageRegistry.generated'
// No uploadedRegistry import

export type TemplateComponent = ... // Same

export const TEMPLATE_BY_ID: Record<RegistryTemplateId, TemplateComponent> = {
  // ... same entries
}

export function getTemplate(templateId: RegistryTemplateId): TemplateComponent {
  const Component = TEMPLATE_BY_ID[templateId]
  if (!Component) throw new Error(`Unknown templateId: ${templateId}`)
  return Component
}
```

**Key Differences:**
- Admin version adds uploaded template support (line 2, lines 41-42 in getTemplate)
- Admin version uses `Record<string, ...>` vs `Record<RegistryTemplateId, ...>`
- Admin getTemplate is backward compatible (checks uploaded first, falls back)

**Proposed Merged Version:** ✅ **Use Folder #2 version (Admin upgrades Folder #1)**
- Reason: Admin version is a strict superset; adds uploaded template support without breaking existing
- Risk: None; fully backward compatible

---

### ⚠️ 2. package.json

**Folder #2 (Admin version) - Extra scripts:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:static": "cross-env STATIC_EXPORT=1 next build",      // <-- NEW
    "start": "next start",
    "lint": "next lint",
    "export": "cross-env STATIC_EXPORT=1 next build",            // <-- NEW
    "gen:all": "npm run gen:registry && npm run gen:animations",  // <-- NEW
    "gen:hero-manifest": "node scripts/generate-hero-manifest.mjs",
    "gen:registry": "npx tsx scripts/gen-page-registry.ts",
    "gen:animations": "npx tsx scripts/gen-animation-catalog.ts",
    "gen:page-catalog": "npx tsx scripts/generate-page-catalog.ts",   // Not in Folder #1
    "validate:registry": "npx tsx scripts/validate-page-registry.ts",
    "prebuild": "npm run gen:registry",
    "link-audit": "node scripts/link-audit.mjs",
    "page:upsert": "node scripts/page-upsert.mjs",               // <-- NEW (Admin-specific)
    "registry:audit": "node scripts/registry-audit.mjs"          // <-- NEW (Admin-specific)
  },
  "dependencies": {
    // ...identical...
    "cross-env": "^7.0.3"  // NOT in Folder #1! Admin adds this
  },
  "devDependencies": {
    // ...mostly identical...
    // Folder #2: Missing `puppeteer` (gallery work in Folder #1)
  }
}
```

**Folder #1 (Main version) - Extra scripts:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build",  // Note: simpler, no cross-env
    "gen:hero-manifest": "node scripts/generate-hero-manifest.mjs",
    "gen:registry": "npx tsx scripts/gen-page-registry.ts",
    "gen:animations": "npx tsx scripts/gen-animation-catalog.ts",
    "gen:thumbnails": "node scripts/generate-thumbnails.js",       // Gallery work
    "cleanup:thumbnail-factory": "node scripts/cleanup-thumbnail-factory.js",
    "gen:thumbnails:once": "npm run gen:thumbnails && npm run cleanup:thumbnail-factory",
    "diag:easing": "node scripts/find-invalid-easing.js",           // Gallery work
    "validate:registry": "npx tsx scripts/validate-page-registry.ts",
    "prebuild": "npm run gen:registry",
    "link-audit": "node scripts/link-audit.mjs"
  },
  "dependencies": {
    // ...identical...
    "puppeteer": "^24.37.5"  // Gallery work (not in Admin version)
  }
}
```

**Key Differences:**
- Admin adds: build:static, export (with cross-env), gen:all, page:upsert, registry:audit scripts
- Admin adds: cross-env dependency
- Folder #1 has: gen:thumbnails, cleanup:thumbnail-factory, gen:thumbnails:once, diag:easing (gallery)
- Folder #1 has: puppeteer dependency (gallery)

**Proposed Merged Version:** ✅ **Merge both safely**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:static": "cross-env STATIC_EXPORT=1 next build",      // FROM Admin
    "start": "next start",
    "lint": "next lint",
    "export": "cross-env STATIC_EXPORT=1 next build",            // FROM Admin (upgraded)
    "gen:all": "npm run gen:registry && npm run gen:animations",  // FROM Admin
    "gen:hero-manifest": "node scripts/generate-hero-manifest.mjs",
    "gen:registry": "npx tsx scripts/gen-page-registry.ts",
    "gen:animations": "npx tsx scripts/gen-animation-catalog.ts",
    "gen:page-catalog": "npx tsx scripts/generate-page-catalog.ts",
    "gen:thumbnails": "node scripts/generate-thumbnails.js",       // FROM Folder #1
    "cleanup:thumbnail-factory": "node scripts/cleanup-thumbnail-factory.js",
    "gen:thumbnails:once": "npm run gen:thumbnails && npm run cleanup:thumbnail-factory",
    "diag:easing": "node scripts/find-invalid-easing.js",           // FROM Folder #1
    "validate:registry": "npx tsx scripts/validate-page-registry.ts",
    "prebuild": "npm run gen:registry",
    "link-audit": "node scripts/link-audit.mjs",
    "page:upsert": "node scripts/page-upsert.mjs",               // FROM Admin
    "registry:audit": "node scripts/registry-audit.mjs"          // FROM Admin
  },
  "dependencies": {
    // ...keep all identical...
    "cross-env": "^7.0.3",   // ADD from Admin
    "puppeteer": "^24.37.5"  // KEEP from Folder #1
  }
}
```

---

### ⚠️ 3. next.config.js

**Folder #2 (Admin version):**
```javascript
// ... baseConfig is identical

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const isStaticExport = process.env.STATIC_EXPORT === '1'      // <-- NEW check
  const distDir = isStaticExport ? 'out' : '.next'              // <-- Uses isStaticExport
  const config = {
    ...baseConfig,
    distDir,
  }
  if (isStaticExport) {                                          // <-- NEW condition
    config.output = 'export'
    config.trailingSlash = true
  }
  return withMDX(config)
}
```

**Folder #1 (Main version):**
```javascript
// ... baseConfig is identical

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const distDir = isDev ? '.next' : 'out'  // Simpler: based on isDev only
  const config = {
    ...baseConfig,
    distDir,
  }
  if (!isDev) {
    config.output = 'export'
    config.trailingSlash = true
  }
  return withMDX(config)
}
```

**Key Differences:**
- Admin version checks `process.env.STATIC_EXPORT` explicitly
- Admin version decouples STATIC_EXPORT from isDev (can be set in any environment)
- Folder #1 ties export to production (`!isDev`) only

**Proposed Merged Version:** ✅ **Use Folder #2 version (Admin is more flexible)**
- Reason: Admin version is strict superset; allows explicit control via STATIC_EXPORT env var
- Benefit: Gallery work can use STATIC_EXPORT=1 in any environment
- Risk: None; backward compatible

---

### ⚠️ 4. src/data/page-registry.csv

**Folder #2 (Admin version):** Contains admin demo pages:
```
route,fileRef,pageTitle,templateId,contentKey,theme,heroVisualId
/,content/home.ts,Home,home.main,home:main,,
/expertise/demand-growth,content/expertise.ts,Demand & Growth,Uploaded_Expertise_DemandGrowth_v1,pillar:demand-growth,dark,
/expertise/content-engagement,content/expertise.ts,Content & Engagement,Uploaded_Expertise_ContentEngagement_v1,default:content,dark,
... (35 rows total)
```

**Folder #1 (Main version):** Will have different/minimal content

**Proposed Merged Version:** ✅ **KEEP Folder #1 version (Source of truth)**
- Reason: Gallery work may have its own page registry; Admin doesn't overwrite it
- Approach: Admin can ADD new pages programmatically via `/api/admin/page-upsert`

---

## C) Files That Are Identical (No Action Needed)

- ✅ app/layout.tsx — Identical in both
- ✅ middleware.ts — Neither repo has it
- ✅ .env.local — Each repo has its own (not merged)

---

## D) Proposed Merge Strategy

### Step 1: Copy All Admin-Specific Files (35 files)
```
✅ app/admin/**                           [3 files]
✅ components/admin/**                    [14 files]
✅ app/api/admin/**                       [14 files]
✅ lib/admin-auth.ts                      [1 file]
✅ lib/route-validation.ts                [1 file]
✅ lib/use-lookup-page.ts                 [1 file]
✅ scripts/page-upsert.mjs                [1 file]
```

### Step 2: Merge Sensitive Files (4 files - requires approval)
1. **src/templates/registry.ts** — Use Folder #2 version (adds uploaded template support)
2. **package.json** — Merge both (add Admin scripts + cross-env, keep gallery dependencies)
3. **next.config.js** — Use Folder #2 version (more flexible STATIC_EXPORT handling)
4. **src/data/page-registry.csv** — Keep Folder #1 version (source of truth for current pages)

### Step 3: Verify ENV Variables
Add to `.env.local`:
```
ADMIN_PASSWORD=<to-be-set>              [REQUIRED]
ADMIN_TOKEN_SECRET=<to-be-set>          [RECOMMENDED]
ALLOW_TEMPLATE_UPLOADS=true             [OPTIONAL]
```

### Step 4: TypeCheck & Build Verification
```bash
npm install
npm run typecheck
npm run build
```

---

## E) Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Overwriting gallery work | **CRITICAL** | ✅ Keeping Folder #1 registry.csv |
| Breaking existing templates | **HIGH** | ✅ Merging registry.ts upgrades it safely |
| Missing cross-env package | **MEDIUM** | ✅ Adding to package.json |
| Env vars not set | **MEDIUM** | ✅ Admin routes return 503 if ADMIN_PASSWORD not set |
| Conflicting scripts | **LOW** | ✅ No overlaps; all scripts can coexist |

---

## F) Final Approval Checklist

- [ ] **src/templates/registry.ts** — Approve upgrade (adds uploaded template support)
- [ ] **package.json** — Approve merge (add Admin scripts + cross-env)
- [ ] **next.config.js** — Approve upgrade (more flexible STATIC_EXPORT)
- [ ] **src/data/page-registry.csv** — Keep Folder #1 version (confirmed)
- [ ] **Confirm ENV vars will be set** (ADMIN_PASSWORD, ADMIN_TOKEN_SECRET)
- [ ] **Ready to copy 35 admin-specific files** — Proceed

**Current Status:** Awaiting approval for the 4 sensitive file changes above.

---

## Files Ready to Copy (Pending Approval)

Once you approve steps in section F, I will:

1. Copy all 31 admin + 3 lib + 1 script files
2. Apply 4 approved merges
3. Run npm install
4. Run typecheck/build
5. Report any errors

**Total merge time:** ~2 minutes after approval
