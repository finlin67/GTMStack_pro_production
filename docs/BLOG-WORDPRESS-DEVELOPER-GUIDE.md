# Blog and WordPress Architecture

This guide explains how the GTMStack blog is built and how it integrates with WordPress as a headless CMS.

---

## Architecture Overview

The blog uses a **headless WordPress** setup:

- **WordPress** — Content is authored and managed in WordPress (e.g., `m.gtmstack.pro`).
- **Next.js** — The frontend fetches posts via the [WordPress REST API v2](https://developer.wordpress.org/rest-api/reference/) and renders them with custom UI.
- **Static deploy + client refresh** — `/blog` is pre-rendered in static export and then refreshed in-browser from WordPress after load.
- **Deployment trigger** — Production deployment runs from `main` branch only (`.github/workflows/deploy.yml`).

```
┌─────────────────┐      REST API       ┌──────────────────┐
│   WordPress     │  /wp-json/wp/v2/    │ Next.js Build    │
│   (m.gtmstack)  │ ─────────────────►  │ (static export)  │
└─────────────────┘                     └────────┬─────────┘
                                deploy (main)
                                  │
                                  ▼
                            ┌──────────────────┐      fetch()      ┌─────────────────┐
                            │ Live static page │  ←──────────────  │ Browser client  │
                            │ gtmstack.pro/blog│                   │ refresh from WP │
                            └──────────────────┘                   └─────────────────┘
```

---

## Operating Model (For On-Call Engineers)

Use this sequence whenever an editor says, "I published in WordPress but don't see it live."

1. Verify post exists in WordPress API.
2. Verify post is `publish` status (not draft/private/future).
3. Verify `main` deployment happened after content or code changes.
4. Verify browser-side refresh is succeeding (CORS + network 200).
5. If needed, trigger a new production deploy from `main`.

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/wp-client.ts` | WordPress API client used by the blog. Exposes `fetchPosts`, `fetchPostBySlug`, `fetchLatestPosts`, and `WPPost` type. |
| `lib/wordpress.ts` | Server-side WordPress client used by static blog page build and category fetches. |
| `app/blog/page.tsx` | Static blog page shell; fetches initial posts/categories at build/render time. |
| `app/blog/BlogIndexClient.tsx` | Client refresh layer; re-fetches posts from WP on first load and query changes. |
| `app/blog/post/page.tsx` | Wrapper for the post detail view. |
| `app/blog/post/BlogPostClient.tsx` | Post detail page — fetches single post by slug, renders content, TOC, related posts. |
| `components/ui/LatestPosts.tsx` | Reusable "Latest Posts" block with direct browser fetch from WP. |
| `.github/workflows/deploy.yml` | Production static deploy pipeline; runs automatically on `main` pushes. |

---

## Environment Variables

| Variable | Used by | Required | Purpose |
|----------|---------|----------|---------|
| `NEXT_PUBLIC_WORDPRESS_API_URL` | `lib/wp-client.ts` | Recommended | Browser-visible base URL for WordPress REST API. |
| `WORDPRESS_API_URL` | `lib/wordpress.ts`, deploy workflow | Yes (deploy/build) | Server-side and CI build WordPress endpoint. |

\*If `NEXT_PUBLIC_WORDPRESS_API_URL` is not set, `wp-client` falls back to:

```
https://m.gtmstack.pro/wp-json/wp/v2
```

**Expected value (no trailing slash):**

```
https://m.gtmstack.pro/wp-json/wp/v2
```

For reliable behavior, set **both** values to the same REST root.

---

## Publish-To-Live Workflow

1. Editor publishes post in WordPress (`m.gtmstack.pro`).
2. API exposes it at `/wp-json/wp/v2/posts`.
3. Live `/blog` should refresh in browser from WP on load.
4. If live site still looks stale, redeploy from `main` to refresh static shell and related artifacts.

Important: merging/pushing only to feature branches does not deploy production.

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
3. Runs `npm run build:static` with `WORDPRESS_API_URL` available.
4. Deploys `out/*` via SFTP.

Trigger conditions:

- Auto deploy: push to `main`
- Manual deploy: `workflow_dispatch`

**GitHub secret:** Add `WORDPRESS_API_URL` (and `NEXT_PUBLIC_WORDPRESS_API_URL` if different) in repo Settings → Secrets.

---

## Maintenance Checklist

Run weekly or after infrastructure/plugin changes:

1. API health check:
  - `https://m.gtmstack.pro/wp-json/wp/v2/posts?per_page=1&_fields=id,slug,status`
2. CORS check:
  - Confirm `Access-Control-Allow-Origin` includes `https://gtmstack.pro`.
3. Env consistency:
  - `WORDPRESS_API_URL` and `NEXT_PUBLIC_WORDPRESS_API_URL` both point to `.../wp-json/wp/v2`.
4. Publish sanity:
  - Publish a test post, verify it appears via API and on `/blog`.
5. Deploy sanity:
  - Ensure latest production deploy came from `main`.

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
| "Failed to fetch posts" | WordPress URL correct? REST API enabled? CORS configured for `https://gtmstack.pro`? |
| No featured images | `_embed=1` in the request? Featured image set in WordPress? |
| New WP post not on live `/blog` | Confirm post is `publish`; check API sees it; confirm production deploy came from `main`; hard refresh browser. |
| Stale shell after code changes | Branch deployed? Only `main` auto-deploys to production. Merge PR, then deploy. |
| Build fails with WordPress error | `WORDPRESS_API_URL` set in CI? WordPress site reachable from GitHub Actions? |

---

## Fast Triage Commands

### 1. Verify latest posts from source

```text
https://m.gtmstack.pro/wp-json/wp/v2/posts?per_page=5&_fields=id,slug,date,status,title
```

### 2. Verify CORS for production origin

Use browser DevTools network request to `/wp-json/wp/v2/posts` and verify:

- Status `200`
- `Access-Control-Allow-Origin: https://gtmstack.pro`

### 3. Verify deploy source branch

- Confirm latest successful workflow run used `main`.
- If not, trigger manual deploy or merge branch to `main`.

---

## WordPress Setup Checklist

For a new WordPress instance as the blog backend:

1. Enable REST API (default in WP 4.7+).
2. Allow unauthenticated reads for `/wp/v2/posts` (or use Application Passwords if you need private content).
3. Set `NEXT_PUBLIC_WORDPRESS_API_URL` and `WORDPRESS_API_URL` to `https://yoursite.com/wp-json/wp/v2`.
4. Configure CORS if the Next.js app is on a different domain.
5. Add `WORDPRESS_API_URL` to GitHub secrets for deployment.

---

## Embedding PDFs and Videos in Posts

The blog renders sanitized WordPress HTML from `content.rendered`, so rich embeds can be authored directly in WordPress posts.

### Supported Media Types

- Videos: YouTube, Vimeo, Wistia, self-hosted MP4/WebM
- PDFs: embedded viewers or download links
- Other rich embeds that render to supported HTML tags

### Recommended Authoring Methods

1. **Block editor embeds (preferred)**
  - Use WordPress Embed, Video, or File blocks.
  - Publish and verify the resulting iframe/video markup appears in API output.

2. **Manual HTML embed**
  - Switch to code editor and paste iframe/video/object markup.
  - Example video iframe:

```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  width="100%"
  height="600"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>
```

  - Example PDF iframe:

```html
<iframe
  src="https://docs.google.com/gview?url=https://gtmstack.pro/wp-content/uploads/2024/whitepaper.pdf&embedded=true"
  width="100%"
  height="900"
  frameborder="0">
</iframe>
```

3. **Plugin-based PDF embeds**
  - Use a plugin such as PDF Embedder when editor workflow requires shortcode/block-based insertion.
  - If plugin output does not appear in REST API, fallback to manual iframe embed.

### Embed Validation Flow

1. Confirm post status is `Published` in WordPress.
2. Verify embed HTML exists in API response:
  - `GET /posts?search={title}&_embed=1` and inspect `content.rendered`.
3. Verify live page render on `/blog/{slug}`.
4. If stale in production, confirm latest deploy came from `main`.

### Responsive and Performance Rules

- Use `width="100%"` with explicit height or aspect-ratio wrapper.
- Keep PDFs lightweight when possible (target under 5 MB).
- Prefer third-party streaming providers for large videos.
- Always include meaningful titles/alt text and proper categories/tags.

### Sanitization Allowlist (Embeds)

Allowed tags include: `iframe`, `embed`, `object`, `param`, `video`, `source`, `img`.

Allowed attributes include: `src`, `width`, `height`, `frameborder`, `allow`, `allowfullscreen`, `type`, `data`, `name`, `value`, `alt`, `title`, `style`, `class`, `id`.

Blocked: scripts, event handlers (for example `onclick`), and unsafe external behaviors.

> **Note:** `WORDPRESS-PDF-VIDEO-EMBED-GUIDE.md` has been merged into this document and archived under `docs/archive/2026-03-16/`.
