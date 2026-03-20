# Routing Architecture

## How Routing Works (End-to-End Explanation)

### The Big Picture

This application uses a **registry-driven routing system** rather than traditional file-based routing. Think of it like a phone directory:
- Instead of having a physical office at every possible address, there's a central **directory (the registry)** that maps addresses to specific offices and departments
- When someone asks for a specific address, the system looks it up in the directory, finds which office handles it, loads the right content, and serves it

### Request Flow: Step by Step

Here's what happens when someone visits a URL like `https://gtmstack.pro/expertise/demand-growth`:

#### 1. **Browser Request Arrives**
```
User visits: /expertise/demand-growth
```

#### 2. **Middleware & Route Matching** (Next.js App Router)
The request doesn't match any specific folder in `app/`, so it falls through to the **catch-all route** at `app/[[...slug]]/page.tsx`. This catches any URL path that hasn't been explicitly defined elsewhere.

The `...slug` parameter captures the path segments: `["expertise", "demand-growth"]`

#### 3. **Route Reconstruction**
The caught segments are reconstructed into a full path: `/expertise/demand-growth`

#### 4. **Reserved Path Check**
The system checks if this path is "reserved" (meaning it's handled by a different system):
- `/api/*` → Handled by API routes (see [API Routes](#api-endpoints) section)
- `/admin/*` → Admin dashboard (special routes)
- `/blog/*` → Blog section
- `/tools/*` → Tools section
- `/p/*` → CMS test pages
- Special files: `/_next`, `/favicon.ico`, `/sitemap.xml`, `/robots.txt`

If it's reserved, return a 404 (this path doesn't belong to the registry system).

#### 5. **Registry Lookup** (The Key Step)
The application looks up the path in `PAGE_REGISTRY` — a JavaScript object with entries like:
```javascript
{
  route: "/expertise/demand-growth",
  templateId: "Uploaded_DemandGrowth_v1",    // Which component to render
  contentKey: "pillar:demand-growth",        // Where to find the content data
  pageTitle: "Demand & Growth",              // For SEO
  theme: "dark"                              // theming info
}
```

**If found**: Continue to step 6. **If not found**: Return Next.js 404 page.

#### 6. **Template Resolution**
Using the `templateId` from the registry entry, the system looks up the **template component** (the HTML structure and layout):
```javascript
templateId: "Uploaded_DemandGrowth_v1"
  ↓ (lookup in templates registry)
  ↓
Component: DemandGrowthTemplate
```

This template is just a React component that knows how to display the content.

#### 7. **Content Resolution**
Using the `contentKey` from the registry entry, the system loads the **content data** (the actual text, images, metadata):
```javascript
contentKey: "pillar:demand-growth"
  ↓ (lookup in content registry)
  ↓
Data: { title: "Demand & Growth", description: "...", sections: [...] }
```

#### 8. **Rendering**
The template component receives the content data and renders:
```
<DemandGrowthTemplate content={data} pageTitle="Demand & Growth" />
```

The React component uses the data to build the final HTML, styling it with Tailwind CSS.

#### 9. **Response**
The HTML is sent back to the browser, which displays the page.

---

### How Routes Are Organized & Registered

#### The Source of Truth: `src/data/page-registry.csv`

Every page that should be publicly accessible is registered in **one CSV file**:

```csv
route,fileRef,pageTitle,templateId,contentKey,theme,heroVisualId
/,content/home.ts,Home,home.main,home:main,,
/expertise,content/expertise/main.ts,Expertise,expertise.main,expertise:main,dark,
/expertise/demand-growth,content/expertise/demand-growth.ts,Demand & Growth,Uploaded_DemandGrowth_v1,pillar:demand-growth,dark,
/industries,content/industries/main.ts,Industries,Uploaded_Industries_v1,industries:main,dark,
```

**Why this approach?**
- **Single source of truth**: All routes in one place (easy to audit)
- **No code changes needed to add pages**: Update the CSV, regenerate, deploy
- **Consistent structure**: All pages follow the same template + content pattern
- **Easy to generate**: Scripts can transform this CSV into optimized TypeScript

#### From CSV to TypeScript

Before each build, a script (`scripts/gen-page-registry.ts`) runs and converts the CSV into optimized TypeScript:

```typescript
// Generated automatically from page-registry.csv
export const PAGE_REGISTRY = [
  { 
    route: "/", 
    templateId: 'home.main', 
    contentKey: "home:main",
    // ...
  },
  // ... 150+ more entries
]

export const PAGE_BY_ROUTE = {
  "/": { ... },
  "/expertise": { ... },
  "/expertise/demand-growth": { ... },
  // ... optimized for fast lookup
}
```

This generated file is what the router actually uses at runtime.

#### Template Organization

Templates are React components organized by feature:
```
src/templates/
├── home/
│   └── HomeTemplate.tsx              # Home page layout
├── expertise/
│   ├── ExpertiseMainTemplate.tsx     # /expertise index
│   └── DemandGrowth.tsx              # Demand Growth pillar
├── industries/
│   └── IndustryTemplate.tsx          # Industry pages
├── caseStudies/
│   └── CaseStudyTemplate.tsx
└── registry.ts                       # Mapping of templateId → Component
```

The `registry.ts` exports a mapping:
```typescript
export const TEMPLATE_BY_ID = {
  'home.main': HomeTemplate,
  'Uploaded_DemandGrowth_v1': DemandGrowthTemplate,
  // ...
}

export function getTemplate(templateId: string) {
  return TEMPLATE_BY_ID[templateId] || FallbackTemplate
}
```

#### Content Organization

Content is stored as TypeScript files and organized by domain:
```
content/
├── home.ts                           # HOME_CONTENT object
├── expertise.ts                      # expertiseItems array
├── expertise/
│   ├── main.ts                       # EXPERTISE_MAIN_CONTENT
│   ├── demand-growth.ts              # Pillar page data
│   └── [various topics].ts
├── industries.ts                     # industryItems array
└── [etc.]
```

The `src/content/registry.ts` creates a lookup table:
```typescript
export const contentByKey = {
  'home:main': HOME_CONTENT,
  'expertise:main': EXPERTISE_MAIN_CONTENT,
  'pillar:demand-growth': DEMAND_GROWTH_CONTENT,
  // ...
}

export function getContentByKey(key) {
  return contentByKey[key]
}
```

---

### Authentication & Authorization

#### Who Can Access What?

**Public Routes** (no authentication required):
- All routes in `PAGE_REGISTRY` → `/`, `/expertise/demand-growth`, etc.
- Blog routes (`/blog/*`)
- Public animations API

**Admin-Protected Routes** (require password):

| Route | Purpose | Check | Details |
|-------|---------|-------|---------|
| `POST /api/admin/login` | Log in | None (public, but validates password) | Sets HTTP-only cookie on success |
| `POST /api/admin/publish-expertise` | Create/update expertise | Admin cookie required | Validates password from environment variable |
| `POST /api/admin/write-file` | Update files | Admin cookie required | Restricted to safe directories only |
| `GET /api/admin/pages` | List all routes | Admin cookie required | Filesystem scan, debug tool |
| `POST /api/admin/run-gen-registry` | Regenerate registry | Admin cookie required | Runs build script, dangerous |

**Local-Only Routes** (development only):
```
POST /api/animations/meta       # Modify animation metadata
POST /api/admin/publish-*       # Content publishing
```

These return **404 in production** and 403 in non-local environments (security by design).

#### How Authentication Works

1. **Admin logs in**: POST to `/api/admin/login` with password
   ```json
   { "password": "secret" }
   ```

2. **Server validates**: Compares against `ADMIN_PASSWORD` environment variable

3. **On success**: Server sets a secure HTTP-only cookie (`admin-token`)
   - Expires in 24 hours
   - Only sent over HTTPS in production
   - Cannot be accessed by JavaScript (XSS protection)

4. **Subsequent requests**: Cookie automatically included in all admin API calls

5. **Authorization check**: Each admin route verifies the cookie is valid
   ```typescript
   const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
   if (!isAdminAuthorized(token)) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
   }
   ```

#### Protected File Operations

The `/api/admin/write-file` endpoint has **whitelist restrictions**:
```typescript
const ALLOWED_PREFIXES = [
  'src/templates/',      // Can only modify templates
  'content/',            // Can only modify content files
  'src/content/',
]

if (!isPathAllowed(filePath)) {
  return error('Path not allowed')
}
```

This prevents an admin from accidentally (or maliciously) modifying `package.json`, `.env`, or other critical files.

---

### Notable Routing Patterns

#### 1. **Registry-Driven Over File-Based**

Traditional routing (file-based):
```
app/expertise/page.tsx              → /expertise
app/expertise/[slug]/page.tsx        → /expertise/demand-growth
app/industries/page.tsx              → /industries
```

This application's approach (registry-driven):
```
app/[[...slug]]/page.tsx + PAGE_REGISTRY.csv
→ /expertise, /expertise/demand-growth, /industries, etc.
→ All resolved dynamically at runtime
```

**Benefit**: 100+ pages from a single catch-all route file. Easy to add new pages without file changes.

#### 2. **RESTful API Structure**

Admin APIs follow REST conventions:

```
POST /api/admin/publish-expertise      # Create/update expertise
POST /api/admin/publish-industry       # Create/update industry
POST /api/admin/publish-case-study     # Create/update case study
POST /api/admin/write-file             # Generic file write
GET  /api/admin/find-page?route=/...   # Search registry
GET  /api/admin/pages                  # List all routes
```

Each endpoint:
- Uses appropriate HTTP method (GET for retrieval, POST for mutations)
- Returns consistent JSON response format
- Includes proper status codes (200, 400, 401, 404, 409, 500)
- Validates input with Zod schemas

#### 3. **Content Schema Validation**

All content is validated against TypeScript + Zod schemas:
```typescript
export const ExpertiseItemSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(10),
  // ... other fields
})

// At publish time:
const validated = ExpertiseItemSchema.safeParse(item)
if (!validated.success) {
  return { error: "Invalid ExpertiseItem", issues: validated.error.issues }
}
```

This prevents invalid data from reaching production.

#### 4. **Environment-Based Behavior**

Different behavior based on environment:

| Environment | Behavior |
|-------------|----------|
| `NODE_ENV === 'development'` | Local-only endpoints enabled (404 in prod) |
| `STATIC_EXPORT === '1'` | Many admin endpoints return 404 (static build mode) |
| `ADMIN_PASSWORD` not set | `/api/admin/login` returns 503 "Not configured" |

#### 5. **No Middleware Chain**

This project **doesn't use traditional middleware**. Instead:
- Route-level guards (`localOnlyGuard`, `assertLocalOnly`)
- Per-endpoint authentication checks
- Direct cookie inspection in route handlers

This is simpler than a middleware chain for this app's complexity level.

---

### Static Generation & Prerendering

For optimal performance, pages are **prerendered at build time**:

1. **Build command**: `npm run build`

2. **Prebuild step**: `scripts/gen-page-registry.ts` runs first
   - Reads `src/data/page-registry.csv`
   - Generates `src/data/pageRegistry.generated.ts`

3. **Next.js generates static files**:
   - Calls `generateStaticParams()` with all registry routes
   - Pre-renders each page as a static HTML file
   - Stores in `.next/` directory

4. **Production**: Serves static HTML (no server-side processing needed)
   - Blazing fast
   - Low resource usage
   - Can be deployed to CDN

```bash
npm run build:static    # Build without server (pure static files)
npm run build          # Build with static export + dynamic routes
npm run start          # Serve production build (if server needed)
```

---

## Overview

This document provides a comprehensive reference for all active endpoints and routes in the GTM Stack application. The system uses a **registry-driven routing architecture** built on Next.js App Router with a centralized `PAGE_REGISTRY` as the source of truth.

---

## Core Concepts

### Route Resolution Flow

1. **Incoming Request** → Caught by catch-all route `[[...slug]]`
2. **Route Reconstruction** → Slug segments reconstructed to full path (e.g., `/expertise/demand-growth`)
3. **Reserved Path Check** → Validates path is not in reserved prefixes (`/api`, `/admin`, `/blog`, `/tools`, `/p`, `/_next`, etc.)
4. **Registry Lookup** → Matches route against `PAGE_REGISTRY` from `src/data/pageRegistry.generated.ts`
5. **Data Resolution** → Retrieves template component and content payload
6. **Template Render** → Component renders with content data

### Key Files

- **Route Handler**: [app/[[...slug]]/page.tsx](../app/[[...slug]]/page.tsx)
- **Registry Source**: [src/data/page-registry.csv](../src/data/page-registry.csv)
- **Generated Registry**: [src/data/pageRegistry.generated.ts](../src/data/pageRegistry.generated.ts)
- **Template Registry**: [src/templates/registry.ts](../src/templates/registry.ts)
- **Content Registry**: [src/content/registry.ts](../src/content/registry.ts)

---

## Page Routes (Content Pages)

### Dynamic Page Routes

All page routes follow the catch-all pattern `app/[[...slug]]/page.tsx` and are driven by registry entries. Routes are organized by section:

| Route Pattern | Type | Handler | Source Registry | Parameters |
|---|---|---|---|---|
| `/` | Static | Registry | `PAGE_REGISTRY` | None |
| `/about` | Static | Registry | `PAGE_REGISTRY` | None |
| `/contact` | Static | Registry | `PAGE_REGISTRY` | None |
| `/resume` | Static | Registry | `PAGE_REGISTRY` | None |
| `/gallery` | Static | Registry | `PAGE_REGISTRY` | None |
| `/expertise` | Section Index | Registry | `PAGE_REGISTRY` | None |
| `/expertise/[slug]` | Dynamic | Registry | `PAGE_REGISTRY` | `slug` (URL param) |
| `/industries` | Section Index | Registry | `PAGE_REGISTRY` | None |
| `/industries/[slug]` | Dynamic | Registry | `PAGE_REGISTRY` | `slug` (URL param) |
| `/case-studies` | Section Index | Registry | `PAGE_REGISTRY` | None |
| `/case-studies/[slug]` | Dynamic | Registry | `PAGE_REGISTRY` | `slug` (URL param) |
| `/projects` | Section Index | Registry | `PAGE_REGISTRY` | None |

### Static Generation

Pages are pre-generated via `generateStaticParams()` for all registered routes except those with reserved first segments (`/api`, `/admin`, `/blog`, `/tools`, `/p`).

---

## API Endpoints

### Authentication

#### `POST /api/admin/login`
**Purpose**: Authenticate admin user and set session cookie.

| Property | Value |
|---|---|
| **Method** | POST |
| **Auth Required** | None (public endpoint) |
| **Environment Guard** | Not available in static export |
| **Request Body** | `{ password: string }` |
| **Response** | `{ ok: true }` on success |
| **Status Codes** | 200 (success), 401 (invalid password), 503 (admin not configured) |
| **Service Handler** | [app/api/admin/login/route.ts](../app/api/admin/login/route.ts) |

*Notes*: 
- Compares plaintext password against `ADMIN_PASSWORD` environment variable
- Sets HTTP-only, secure cookie valid for 24 hours
- Cookie name: `admin-token`

---

### Content Management

#### `POST /api/admin/publish-expertise`
**Purpose**: Create or update an expertise item in the content registry.

| Property | Value |
|---|---|
| **Method** | POST |
| **Auth Required** | Local-only (localhost or development) |
| **Environment Guard** | Not available in static export |
| **Request Body** | `{ item: ExpertiseItem, mode?: "append" \| "update" }` |
| **Response** | `{ success: true, slug: string, action: "appended" \| "updated" }` |
| **Status Codes** | 200 (success), 400 (validation error), 403 (local-only violation), 409 (duplicate slug), 500 (internal error) |
| **Service Handler** | [app/api/admin/publish-expertise/route.ts](../app/api/admin/publish-expertise/route.ts) |
| **Target File** | `content/expertise.ts` |

*Parameters*:
- `item`: ExpertiseItem object with required fields: `slug`, `title`, `content`
- `mode`: "append" (default, rejects duplicates) or "update" (replaces existing)

*Notes*:
- Validates against `ExpertiseItemSchema`
- Uses `ts-morph` for AST manipulation of TypeScript source
- Prevents duplicate slugs in append mode
- Local-only protection via `assertLocalOnly()`

---

#### `POST /api/admin/publish-industry`
**Purpose**: Create or update an industry item in the content registry.

| Property | Value |
|---|---|
| **Method** | POST |
| **Auth Required** | Local-only (localhost or development) |
| **Environment Guard** | Not available in static export |
| **Request Body** | `{ item: IndustryItem, mode?: "append" \| "update" }` |
| **Response** | `{ success: true, slug: string, action: "appended" \| "updated" }` |
| **Status Codes** | 200 (success), 400 (validation error), 403 (local-only violation), 409 (duplicate slug), 500 (internal error) |
| **Service Handler** | [app/api/admin/publish-industry/route.ts](../app/api/admin/publish-industry/route.ts) |
| **Target File** | `content/industries.ts` |

*Behavior*: Identical to publish-expertise, targeting industries content.

---

#### `POST /api/admin/publish-case-study`
**Purpose**: Create or update a case study item in the content registry.

| Property | Value |
|---|---|
| **Method** | POST |
| **Auth Required** | Local-only (localhost or development) |
| **Environment Guard** | Not available in static export |
| **Request Body** | `{ item: CaseStudyItem, mode?: "append" \| "update" }` |
| **Response** | `{ success: true, slug: string, action: "appended" \| "updated" }` |
| **Status Codes** | 200 (success), 400 (validation error), 403 (local-only violation), 409 (duplicate slug), 500 (internal error) |
| **Service Handler** | [app/api/admin/publish-case-study/route.ts](../app/api/admin/publish-case-study/route.ts) |
| **Target File** | `content/case-studies.ts` |

*Behavior*: Identical to publish-expertise, targeting case studies content.

---

#### `POST /api/admin/write-file`
**Purpose**: Write or update arbitrary files in controlled directories.

| Property | Value |
|---|---|
| **Method** | POST |
| **Auth Required** | Yes (cookie-based) |
| **Environment Guard** | Not available in static export |
| **Request Body** | `{ path: string, content: string }` |
| **Response** | `{ ok: true, bytes: number }` on success |
| **Status Codes** | 200 (success), 400 (validation error), 401 (unauthorized), 404 (not available), 500 (internal error) |
| **Service Handler** | [app/api/admin/write-file/route.ts](../app/api/admin/write-file/route.ts) |

*Parameters*:
- `path`: Relative file path (required)
- `content`: File content to write (string)

*Restrictions*:
- Allowed prefixes only: `src/templates/`, `content/`, `src/content/`
- Paths must not escape workspace root (security check)
- Requires valid admin authentication cookie

---

### Registry & Generation

#### `POST /api/admin/run-gen-registry`
**Purpose**: Regenerate the page registry from CSV source.

| Property | Value |
|---|---|
| **Method** | POST |
| **Auth Required** | Yes (cookie-based) |
| **Environment Guard** | Not available in static export |
| **Request Body** | None |
| **Response** | `{ ok: true, log: string }` |
| **Status Codes** | 200 (success), 401 (unauthorized), 404 (not available), 500 (internal error) |
| **Service Handler** | [app/api/admin/run-gen-registry/route.ts](../app/api/admin/run-gen-registry/route.ts) |
| **Executes** | `npm run gen:registry` |

*Notes*:
- Requires admin authentication
- Regenerates `src/data/pageRegistry.generated.ts` from `src/data/page-registry.csv`
- Returns command output for debugging
- Max buffer: 512 KB

---

#### `GET /api/admin/find-page?route={route}`
**Purpose**: Search page registry for a specific route.

| Property | Value |
|---|---|
| **Method** | GET |
| **Auth Required** | Yes (cookie-based) |
| **Environment Guard** | Not available in static export |
| **Query Parameters** | `route` (string, normalized) |
| **Response** | `{ found: boolean, page?: PageRegistryRow, message?: string }` |
| **Status Codes** | 200 (success), 400 (missing/invalid route), 401 (unauthorized), 404 (not available) |
| **Service Handler** | [app/api/admin/find-page/route.ts](../app/api/admin/find-page/route.ts) |
| **Source** | `src/data/page-registry.csv` |

*Parameters*:
- `route`: URL path to search (e.g., `/expertise/demand-growth`)
- Normalized automatically (leading slash, no trailing slash)

---

#### `GET /api/admin/pages`
**Purpose**: List all page routes discovered in the filesystem.

| Property | Value |
|---|---|
| **Method** | GET |
| **Auth Required** | Yes (cookie-based) |
| **Environment Guard** | Not available in static export |
| **Response** | `{ pages: string[] }` - array of routes found |
| **Status Codes** | 200 (success), 401 (unauthorized), 404 (not available) |
| **Service Handler** | [app/api/admin/pages/route.ts](../app/api/admin/pages/route.ts) |

*Behavior*:
- Scans `app/` directory recursively for `page.tsx` files
- Normalizes Next.js route segments (e.g., `(local)` groups, `[slug]` dynamic segments)
- Returns alphabetically sorted route list

---

#### `GET /api/admin/slugs`
**Purpose**: Extract all available content slugs from source files.

| Property | Value |
|---|---|
| **Method** | GET |
| **Auth Required** | Yes (cookie-based) |
| **Environment Guard** | Not available in static export |
| **Response** | `{ industries: string[], expertise: string[], caseStudies: string[] }` |
| **Status Codes** | 200 (success), 401 (unauthorized), 404 (not available) |
| **Service Handler** | [app/api/admin/slugs/route.ts](../app/api/admin/slugs/route.ts) |

*Behavior*:
- Parses `content/industries.ts`, `content/expertise.ts`, `content/case-studies.ts`
- Extracts slugs via regex pattern matching
- Returns categorized slug lists

---

### Template Management

#### `GET /api/admin/templates`
**Purpose**: List all registered templates with metadata.

| Property | Value |
|---|---|
| **Method** | GET |
| **Auth Required** | Yes (cookie-based) |
| **Response** | Array of template objects with `templateId`, `componentName`, `importPath` |
| **Status Codes** | 200 (success), 401 (unauthorized), 404 (not available) |
| **Service Handler** | [app/api/admin/templates/route.ts](../app/api/admin/templates/route.ts) |
| **Source** | [src/templates/registry.ts](../src/templates/registry.ts) |

---

#### `POST /api/admin/templates`
**Purpose**: Register a new template or update template mapping.

| Property | Value |
|---|---|
| **Method** | POST |
| **Auth Required** | Yes (cookie-based) |
| **Request Body** | `{ templateId: string, importPath: string, componentName: string }` |
| **Response** | `{ ok: true, templateId: string }` |
| **Status Codes** | 200 (success), 400 (validation error), 401 (unauthorized), 404 (not available), 500 (internal error) |
| **Service Handler** | [app/api/admin/templates/route.ts](../app/api/admin/templates/route.ts) |
| **Target File** | [src/templates/registry.ts](../src/templates/registry.ts) |

*Parameters*:
- `templateId`: Unique identifier for the template (e.g., `Uploaded_DemandGrowth_v1`)
- `importPath`: Module path for import (relative to workspace, e.g., `@/src/templates/DemandGrowth`)
- `componentName`: Named export or default from import

---

### Animation Management

#### `GET /api/animations/meta`
**Purpose**: Retrieve merged animation metadata (generated catalog + overrides).

| Property | Value |
|---|---|
| **Method** | GET |
| **Auth Required** | Local-only (localhost or development) |
| **Response** | `{ animations: Record<string, AnimationMetaOverride> }` - merged metadata |
| **Status Codes** | 200 (success), 404 (local-only violation) |
| **Service Handler** | [app/api/animations/meta/route.ts](../app/api/animations/meta/route.ts) |
| **Sources** | `src/data/animationCatalog.generated.ts`, `src/data/animationMeta.overrides.json` |

*Notes*:
- Catalog is generated during build
- Overrides allow runtime metadata customization
- Merges overrides with catalog for final result

---

#### `POST /api/animations/meta`
**Purpose**: Update metadata override for an animation by ID.

| Property | Value |
|---|---|
| **Method** | POST |
| **Auth Required** | Local-only (localhost or development) |
| **Request Body** | `{ id: string, title?: string, description?: string, keywords?: string[], repoUrl?: string, thumbnailSrc?: string }` |
| **Response** | `{ ok: true, id: string }` |
| **Status Codes** | 200 (success), 400 (validation error), 404 (local-only violation), 500 (write error) |
| **Service Handler** | [app/api/animations/meta/route.ts](../app/api/animations/meta/route.ts) |
| **Target File** | `src/data/animationMeta.overrides.json` |

*Parameters*:
- `id`: Animation identifier (required)
- All metadata fields optional—only provided fields are updated

---

#### `GET /api/animations/thumbnail/[id]`
**Purpose**: Generate or serve thumbnail for animation.

| Property | Value |
|---|---|
| **Method** | GET |
| **Auth Required** | No |
| **Route Params** | `id` - animation identifier |
| **Response** | Image file (content-type based on format) |
| **Status Codes** | 200 (success), 404 (not found), 500 (generation error) |
| **Service Handler** | [app/api/animations/thumbnail/route.ts](../app/api/animations/thumbnail/route.ts) |

---

### Audit & Diagnostic

#### `GET /api/admin/registry-audit`
**Purpose**: Validate PAGE_REGISTRY against filesystem routes and content availability.

| Property | Value |
|---|---|
| **Method** | GET |
| **Auth Required** | Yes (cookie-based) |
| **Response** | Audit report with warnings, errors, and suggestions |
| **Status Codes** | 200 (success), 401 (unauthorized), 404 (not available) |
| **Service Handler** | [app/api/admin/registry-audit/route.ts](../app/api/admin/registry-audit/route.ts) |

*Checks*:
- Missing template components
- Orphaned content keys
- Routing inconsistencies
- File existence validation

---

## Reserved Routes

The following path prefixes are **reserved** and bypass the catch-all registry route:

| Prefix | Purpose | Handler |
|---|---|---|
| `/api` | API endpoints | Next.js API routing |
| `/admin` | Admin dashboard (if exists) | [app/admin/](../app/admin/) |
| `/blog` | Blog section | [app/blog/](../app/blog/) |
| `/tools` | Tools section | [app/tools/](../app/tools/) |
| `/p` | CMS test pages | [app/p/](../app/p/) |
| `/_next` | Next.js internals | Built-in |
| `/favicon.ico` | Favicon | Public asset |
| `/sitemap.xml` | XML sitemap | [app/sitemap.ts](../app/sitemap.ts) |
| `/robots.txt` | Robots file | Public asset |

---

## Security & Constraints

### Authentication

- **Local-Only Endpoints**: Return 404 in production; only accessible from localhost in development
- **Admin-Protected Endpoints**: Require valid `admin-token` cookie (set via `/api/admin/login`)
- **Static Export Mode**: Many endpoints return 404 when `STATIC_EXPORT=1` (compile-time builds)

### Authorization

- **Content Publishing**: Local-only in development; admin-protected in production
- **File Writing**: Restricted to safe directories (`src/templates/`, `content/`, `src/content/`)
- **Registry Access**: Admin token required for modifications

### Environment Variables

| Variable | Purpose | Example |
|---|---|---|
| `ADMIN_PASSWORD` | Admin login password | (set in `.env.local`) |
| `NODE_ENV` | Environment mode | development, production |
| `STATIC_EXPORT` | Static export mode | 1 (enabled) or unset |

---

## Data Structures

### PageRegistryRow
```typescript
interface PageRegistryRow {
  route: string              // e.g., "/expertise/demand-growth"
  fileRef: string            // e.g., "content/expertise/demand-growth.ts"
  pageTitle: string          // e.g., "Demand & Growth"
  templateId: string         // e.g., "Uploaded_DemandGrowth_v1"
  contentKey: string         // e.g., "pillar:demand-growth"
  theme: 'dark' | 'light' | undefined
  heroVisualId: string       // Visual identifier for hero section
}
```

### ExpertiseItem
Defined in [src/lib/content-schemas/ExpertiseItem.ts](../src/lib/content-schemas/ExpertiseItem.ts)

Required fields: `slug`, `title`, `content`

### IndustryItem
Defined in [src/lib/content-schemas/IndustryItem.ts](../src/lib/content-schemas/IndustryItem.ts)

Required fields: `slug`, `title`, `content`

### CaseStudyItem
Defined in [src/lib/content-schemas/CaseStudyItem.ts](../src/lib/content-schemas/CaseStudyItem.ts)

Required fields: `slug`, `title`, `content`

---

## Common Tasks

### Add a New Page via Registry

1. Add row to `src/data/page-registry.csv`
2. Create content file (e.g., `content/expertise/new-topic.ts`)
3. Call `POST /api/admin/run-gen-registry` to regenerate registry
4. New page automatically available at route

### Publish New Content Item

```bash
curl -X POST http://localhost:3000/api/admin/publish-expertise \
  -H "Content-Type: application/json" \
  -d '{
    "item": {
      "slug": "new-topic",
      "title": "New Topic Title",
      "content": "..."
    },
    "mode": "append"
  }'
```

### Update Page Metadata

1. Locate row in `src/data/page-registry.csv`
2. Update columns (title, template, theme, etc.)
3. Call `POST /api/admin/run-gen-registry`
4. Changes reflected immediately in generated registry

---

## Migration History

### Registry-Based Routing Migration (completed)

All non-blog, non-admin pages were migrated from per-route `page.tsx` files to the single **optional catch-all** at `app/[[...slug]]/page.tsx` backed by the page registry.

**New files created during migration:**
- `app/[[...slug]]/page.tsx` — builds `route` from `params.slug`, delegates to `<RegistryRenderer>`.
- `components/registry/RegistryRenderer.tsx` — resolves template + content from registry row and renders.

**Files removed (now handled by catch-all):**
- `app/page.tsx` (`/`), `app/expertise/page.tsx`, `app/expertise/[slug]/page.tsx`
- `app/industries/page.tsx`, `app/industries/[slug]/page.tsx`
- `app/gallery/page.tsx`, `app/case-studies/page.tsx`, `app/case-studies/[slug]/page.tsx`
- `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`

**Unchanged (filesystem-based):** `app/blog/*`, `app/admin/*`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/services/*`.

### Why Legacy Filesystem Routing Was Replaced

Before migration the project had two parallel systems: a registry covering ~34 routes and filesystem handlers for ~70 more. Problems:
- Page metadata (title, theme, SEO) hardcoded in route files — required code edit + deploy for any copy change.
- No `contentKey` concept on legacy routes — content could not be swapped without slug change.
- Hardcoded `SLUG_TO_PILLAR` in `app/expertise/[slug]/page.tsx` duplicated logic already in `content/expertise.ts`.
- 70 routes hidden across 4 files with no unified audit trail.

---

## Rollback Plan

If registry-driven routing causes a production incident:

1. **Immediate** — Revert `src/data/page-registry.csv` to the last known-good version and run `npm run gen:registry` to regenerate the TypeScript file, then redeploy.
2. **Verify** — Confirm all routes return 200, no 404 spikes in logs, and templates render correctly.
3. **Debug checklist**
   - Content keys exist in their respective content files.
   - `templateId` values in the CSV match registered templates.
   - `theme` column values are `dark` / `light` (no typo).
   - Review browser console and server logs for import or resolution errors.

---

## Related Documentation

- [Content Management Guide](./CONTENT_MANAGEMENT_GUIDE.md)
- [Animation System Guide](./ANIMATION_SYSTEM_GUIDE.md)
- [Project Structure](./PROJECT_STRUCTURE.md)

> **Note:** `MIGRATION-REGISTRY-ROUTING.md`, `MIGRATION_PLAN.md`, and `FILESYSTEM_ROUTE_HANDLERS_ANALYSIS.md` have been merged into this document and archived under `docs/archive/2026-03-16/`.
