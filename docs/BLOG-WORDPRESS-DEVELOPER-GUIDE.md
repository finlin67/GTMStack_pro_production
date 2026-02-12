# Blog & WordPress Integration — Developer Guide

This guide explains how the GTMStack blog is built and how it integrates with WordPress as a headless CMS.

---

## Architecture Overview

The blog uses a **headless WordPress** setup:

- **WordPress** — Content is authored and managed in WordPress (e.g., `m.gtmstack.pro`).
- **Next.js** — The frontend fetches posts via the [WordPress REST API v2](https://developer.wordpress.org/rest-api/reference/) and renders them with custom UI.
- **Client-side fetch** — Posts are loaded in the browser after the page loads (not at build time).

```
┌─────────────────┐      REST API       ┌──────────────────┐      fetch()       ┌─────────────────┐
│   WordPress     │  /wp-json/wp/v2/    │   Next.js App    │  ←──────────────   │  Blog pages &   │
│   (m.gtmstack)  │ ─────────────────►  │   (Static HTML)  │                    │  LatestPosts    │
└─────────────────┘                     └──────────────────┘                    └─────────────────┘
```

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/wp-client.ts` | WordPress API client used by the blog. Exposes `fetchPosts`, `fetchPostBySlug`, `fetchLatestPosts`, and `WPPost` type. |
| `lib/wordpress.ts` | Alternative server-side client (uses `WORDPRESS_API_URL`). Not currently imported; available for SSG/SSR if needed. |
| `app/blog/page.tsx` | Blog index page — lists posts with filters, search, and pagination. |
| `app/blog/post/page.tsx` | Wrapper for the post detail view. |
| `app/blog/post/BlogPostClient.tsx` | Post detail page — fetches single post by slug, renders content, TOC, related posts. |
| `components/ui/LatestPosts.tsx` | Reusable "Latest Posts" block used elsewhere (e.g., homepage). |

---

## Environment Variables

| Variable | Used by | Required | Purpose |
|----------|---------|----------|---------|
| `NEXT_PUBLIC_WORDPRESS_API_URL` | `lib/wp-client.ts` | Optional* | Base URL for the WordPress REST API. |
| `WORDPRESS_API_URL` | `lib/wordpress.ts`, deploy workflow | Yes (build) | Same base URL; used server-side and in CI. |

\*If `NEXT_PUBLIC_WORDPRESS_API_URL` is not set, `wp-client` falls back to:

```
https://m.gtmstack.pro/wp-json/wp/v2
```

**Expected value (no trailing slash):**

```
https://m.gtmstack.pro/wp-json/wp/v2
```

For client-side fetching, `NEXT_PUBLIC_` is required so the URL is available in the browser.

---

## API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /posts?per_page={n}&page={p}&_embed=1` | List posts with featured media and terms. |
| `GET /posts?search={q}&categories={id}&per_page=10&page=1&_embed=1` | Filtered/search posts (search and categories are optional). |
| `GET /posts?slug={slug}&_embed=1&context=view` | Single post by slug. |
| `GET /categories?per_page=100&orderby=count&order=desc` | Category list for filter pills (slug→id mapping). |
| `GET /tags?per_page=100&orderby=count&order=desc` | Tag list (optional, for tag filter). |

The `_embed=1` parameter includes `wp:featuredmedia` (featured image) and `wp:term` (categories and tags) in the response.

---

## Data Shape: `WPPost`

```typescript
type WPPost = {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  date: string
  categories?: number[]
  tags?: number[]
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }>
    "wp:term"?: [WPTerm[], WPTerm[]]  // [categories, tags]
  }
}
```

- **HTML content** — Sanitized before render via `lib/sanitize-html.ts` (DOMPurify). Use `stripHtml()` where plain text is needed.
- **Featured image** — `post._embedded?.['wp:featuredmedia']?.[0]?.source_url`.
- **Categories/tags** — From `_embedded['wp:term']`; use `getPostCategories(post)` / `getPostTags(post)` from `lib/wp-client.ts`.

---

## Managing Content in WordPress

1. **Create/edit posts** in the WordPress admin (e.g. `https://m.gtmstack.pro/wp-admin`).
2. **Publish** — The REST API serves published posts by default.
3. **Featured image** — Set in WordPress; it appears in the blog grid and post header via `_embed=1`.
4. **Categories** — Create categories in WordPress (Posts → Categories). They drive the blog filter pills and appear on each post via `_embed=1` (`wp:term`).

---

## Category/Filter Logic (Frontend)

The blog index uses **WordPress categories** for filter pills. Categories are fetched from `GET /categories`; selecting a pill sets `?category={slug}` and the server fetches posts with `categories={id}`. Search uses the WP API `search=` param and is synced as `?q=`. Post cards show the first category from `_embedded['wp:term']` via `getPostCategories(post)` in `lib/wp-client.ts`.

---

## Deployment & CI

The GitHub Actions workflow (` .github/workflows/deploy.yml`):

1. Checks that `WORDPRESS_API_URL` is set (non-fatal if missing).
2. Optionally verifies the API with: `GET {WORDPRESS_API_URL}/posts?per_page=1&_fields=id,slug,status`
3. Runs `npm run build` with `WORDPRESS_API_URL` available.

**GitHub secret:** Add `WORDPRESS_API_URL` (and `NEXT_PUBLIC_WORDPRESS_API_URL` if different) in repo Settings → Secrets.

---

## Extending the Blog

### Add WordPress categories

1. Extend `WPPost` with `_embedded['wp:term']`.
2. Add `_embed=wp:term` to API requests.
3. Update `matchesFilter()` and `inferCategory()` to use taxonomy data.

### Server-side rendering (SSR) or static generation (SSG)

- Use `lib/wordpress.ts` (or refactor it) in `getServerSideProps` / `getStaticProps` or in Server Components.
- Ensure `WORDPRESS_API_URL` is set for build and runtime.

### Increase post count

- In `wp-client.ts`, change `per_page=10` to a higher value (WordPress default max is 100).
- Consider pagination via `?page=2` if you need many posts.

### Add custom fields

- Register custom fields in WordPress (e.g. with ACF or a custom REST field).
- Extend `WPPost` and the components to consume the new fields.

---

## Troubleshooting

| Issue | Check |
|-------|--------|
| "Failed to fetch posts" | WordPress URL correct? REST API enabled? CORS configured if WordPress is on another domain? |
| No featured images | `_embed=1` in the request? Featured image set in WordPress? |
| Stale content | Content is fetched client-side on each visit; no caching by default. Add caching if needed. |
| Build fails with WordPress error | `WORDPRESS_API_URL` set in CI? WordPress site reachable from GitHub Actions? |

---

## WordPress Setup Checklist

For a new WordPress instance as the blog backend:

1. Enable REST API (default in WP 4.7+).
2. Allow unauthenticated reads for `/wp/v2/posts` (or use Application Passwords if you need private content).
3. Set `NEXT_PUBLIC_WORDPRESS_API_URL` and `WORDPRESS_API_URL` to `https://yoursite.com/wp-json/wp/v2`.
4. Configure CORS if the Next.js app is on a different domain.
5. Add `WORDPRESS_API_URL` to GitHub secrets for deployment.
