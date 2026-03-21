# Blog ↔ WordPress (quick reference)

Full architecture, env vars, and troubleshooting: **[BLOG-WORDPRESS-DEVELOPER-GUIDE.md](./BLOG-WORDPRESS-DEVELOPER-GUIDE.md)**.

## UI templates (Stitch migration)

| Page | Component | Data |
|------|-----------|------|
| `/blog` | `BlogStitchFeedTemplate` | `adaptStitchBlogFeedData({ posts, categories, selectedCategory, searchQuery })` |
| `/blog/post?slug=…` | `BlogStitchPostTemplate` | `adaptBlogSinglePostData(…)` → `AdaptedBlogSinglePostContent` |

## WordPress fields on the page

Requests use **`_embed=1`** so the REST API includes:

- **Featured image** — `_embedded['wp:featuredmedia'][0].source_url` (see `getFeaturedImageUrl` in `lib/wp-media.ts`).
- **Categories & tags** — `_embedded['wp:term']` as `[categories[], tags[]]`; use **`getPostCategories(post)`** and **`getPostTags(post)`** in `lib/wp-client.ts`.
- **Author** — `_embedded.author` when present; helpers like **`getEmbeddedAuthor`** / **`getAuthorAvatarUrl`** in `lib/wp-client.ts`.

If a field is missing in the UI, confirm the post has it set in WP and that the fetch URL includes `_embed=1` (see `lib/wordpress.ts` / `lib/wp-client.ts`).
