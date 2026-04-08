# Blog ↔ WordPress (quick reference)

Full architecture, env vars, and troubleshooting: **[BLOG-WORDPRESS-DEVELOPER-GUIDE.md](./BLOG-WORDPRESS-DEVELOPER-GUIDE.md)**.

## UI templates

| Page | Component | Data adapter |
|------|-----------|------|
| `/blog` | `BlogStitchFeedTemplate` | `adaptStitchBlogFeedData({ posts, categories, selectedCategory, searchQuery })` |
| `/blog/post?slug=…` (default / legacy) | `BlogStitchPostTemplate` | `adaptBlogSinglePostData(…)` |
| `/blog/post?slug=…` (`layout_type: modular_article`) | `BlogStitchPostTemplate` (modular path) | `adaptBlogSinglePostData(…)` |
| `/blog/post?slug=…` (`layout_type: how_to`) | `HowToPostTemplate` | `adaptHowToPostData(…)` |
| `/blog/post?slug=…` (`layout_type: insight`) | `InsightPostTemplate` | `adaptInsightPostData(…)` |

Template is selected at runtime in `app/blog/post/BlogPostClient.tsx` by reading `post.acf.layout_type`.  
To add a new layout type, see the [developer guide](./BLOG-WORDPRESS-DEVELOPER-GUIDE.md#adding-a-new-layout-type).

## WordPress fields on the page

Requests use **`_embed=1`** so the REST API includes:

- **Featured image** — `_embedded['wp:featuredmedia'][0].source_url` (see `getFeaturedImageUrl` in `lib/wp-media.ts`).
- **Categories & tags** — `_embedded['wp:term']` as `[categories[], tags[]]`; use **`getPostCategories(post)`** and **`getPostTags(post)`** in `lib/wp-client.ts`.
- **Author** — `_embedded.author` when present; helpers like **`getEmbeddedAuthor`** / **`getAuthorAvatarUrl`** in `lib/wp-client.ts`.

If a field is missing in the UI, confirm the post has it set in WP and that the fetch URL includes `_embed=1` (see `lib/wordpress.ts` / `lib/wp-client.ts`).
