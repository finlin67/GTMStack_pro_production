# System Architecture

## High-level setup

This project uses **Next.js App Router** (`app/` directory) with a hybrid content model:

- **Most site pages** (home, expertise, industries, projects, case studies) are powered by **local TypeScript content files** in `content/` and `src/content/`.
- The **blog** is powered by a **headless WordPress CMS** via the WordPress REST API (`/wp-json/wp/v2`).

At the shell level, `app/layout.tsx` provides the global frame (Navbar + Footer + page content).

---

## Routing architecture

### 1) File-system routing (App Router)

Routes come from the `app/` folder structure:

- Static routes like `app/page.tsx`, `app/expertise/page.tsx`, `app/industries/page.tsx`, `app/projects/page.tsx`
- Dynamic routes like:
  - `app/expertise/[slug]/page.tsx`
  - `app/industries/[slug]/page.tsx`
  - `app/case-studies/[slug]/page.tsx`

For those dynamic routes, `generateStaticParams()` is used to prebuild paths from local arrays (for example `expertiseItems`, `industryItems`, `caseStudyItems`).

### 2) Registry-driven page composition

Several routes (including `/`, `/expertise`, `/industries`, `/projects`) resolve page setup through a page registry:

- `lib/pageRegistry.ts`
- `src/data/pageRegistry.generated.ts` (generated from CSV)
- `src/templates/registry.ts`
- `src/content/registry.ts`

Flow:

1. Route looks up metadata/config with `getPageByRoute(...)` or `getPageBySlug(...)`
2. Template component is selected by `templateId`
3. Content payload is selected by `contentKey`
4. Template renders that content

This means routing is still file-based, but many pages are **template + content-key driven** at render time.

---

## Data sources

## A) Local content source (non-blog pages)

Primary source for most sections:

- `content/*.ts`
- `content/expertise/*`
- `content/industries/*`
- `content/projects/*`
- `content/case-studies.ts`

These are imported directly into server components and templates. No network/API call is needed for most of the site.

## B) External CMS source (blog = WordPress)

Blog content comes from WordPress REST API via:

- `lib/wordpress.ts` (**server-focused** client)
- `lib/wp-client.ts` (**browser + server** client)
- `lib/wp-media.ts` (featured image extraction from embedded WP payload)

Environment variables used:

- `WORDPRESS_API_URL`
- `NEXT_PUBLIC_WORDPRESS_API_URL`

The base URL is normalized to a `/wp-json/wp/v2` endpoint.

---

## Where API calls are made

## 1) Blog index page (`/blog`)

File: `app/blog/page.tsx` (server component)

- Calls `fetchCategories()` and `fetchPostsWithTotal()` from `lib/wordpress.ts`
- Uses Next fetch with ISR-style revalidation in this layer (`next: { revalidate: 60 }` in `lib/wordpress.ts`)
- Passes initial server-fetched data into `BlogIndexClient`

File: `app/blog/BlogIndexClient.tsx` (client component)

- Reads URL params with `useSearchParams()` (`q`, `category`, `page`)
- If URL state differs from initial server state, it fetches updated posts client-side via `fetchPostsWithTotal()` from `lib/wp-client.ts`
- Updates URL with `router.replace(...)` for search/filter/pagination

Result: `/blog` has server-provided initial data, then client-side refetch for interactive filtering/search/pagination.

## 2) Blog post page (`/blog/post?slug=...`)

Files:

- `app/blog/post/page.tsx` (wrapper)
- `app/blog/post/BlogPostClient.tsx` (client component)

`BlogPostClient.tsx`:

- Reads `slug` from query params (`useSearchParams`)
- Calls `fetchPostBySlug(slug)` from `lib/wp-client.ts`
- Calls `fetchPosts(...)` for related posts (same category where possible)
- Sanitizes HTML body via `sanitizeHtml(...)` before rendering into template content

## 3) Reusable latest-posts block

File: `components/ui/LatestPosts.tsx` (client component)

- Calls `fetchLatestPosts(...)` from `lib/wp-client.ts`
- Renders cards with links to `/blog/post?slug=...`

---

## End-to-end rendering/data flows

## Flow A: Non-blog route (example: `/expertise`)

1. Next.js resolves route file in `app/`
2. Page reads registry row (`lib/pageRegistry.ts`)
3. Page chooses template (`src/templates/registry.ts`)
4. Page loads local content by content key (`src/content/registry.ts`)
5. Template renders HTML/React output

No external API involved.

## Flow B: Blog listing (`/blog`)

1. Server component `app/blog/page.tsx` runs
2. Server calls WordPress API through `lib/wordpress.ts`
3. Initial posts/categories are rendered into page via `BlogIndexClient`
4. On the browser, URL-based interactions (search/category/page) trigger client fetches via `lib/wp-client.ts`
5. UI rerenders with fetched posts and pagination state

## Flow C: Single blog post (`/blog/post?slug=...`)

1. Client component reads slug from URL
2. Browser requests post from WordPress via `fetchPostBySlug`
3. Browser requests related posts via `fetchPosts`
4. HTML content is sanitized
5. `BlogPostTemplate` renders hero/article/sidebar using that data

---

## Notes on CMS integration design

- WordPress integration is **direct-to-WP REST API**, not through a custom internal API route.
- `_embed=1` is used so featured media and taxonomy terms are returned with posts.
- `lib/wp-media.ts` reads embedded featured media safely.
- Blog architecture is intentionally mixed:
  - server-side initial fetch for first render on `/blog`
  - client-side fetch for interactive URL-driven updates
- The rest of the site remains mostly static/content-driven from local TypeScript content.
