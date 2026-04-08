# Blog Content Types Guide

**Audience:** Content authors, CMO, editorial team  
**Technical counterpart:** [BLOG-WORDPRESS-DEVELOPER-GUIDE.md](./BLOG-WORDPRESS-DEVELOPER-GUIDE.md)

---

## Overview

The GTMStack.pro blog supports **four distinct post layouts**, each designed for a different type of content. Choosing the right layout gives readers a better experience and makes your posts more distinctive and credible.

Layout type is set in WordPress using the **GTMStack Layout** field group (provided by the GTMStack Headless Blog Kit plugin). You'll find it in the post editor when you create or edit a post.

---

## The Four Layout Types

### 1. Standard Article (default)

**When to use:** General-purpose blog posts, news updates, announcements, or any post that does not fit a more structured format.

**What it looks like:**
- Traditional article header with title, author, date, and featured image
- Continuous prose body rendered from the WordPress block editor
- Categories, tags, and reading-time estimate
- Related articles section at the bottom

**How to set it:** Leave the Layout Type field blank, or set it to `legacy`.

**Tips:**
- Write in the WordPress block editor as you normally would.
- Add a featured image — it appears in the post header and the blog grid.
- Assign at least one category so readers can filter by topic.

---

### 2. Modular Article

**When to use:** Long-form editorial pieces that benefit from visual variety — in-depth analyses, strategic reports, data-driven stories, or branded content with distinct sections.

**What it looks like:**
- Structured sections with optional styled callouts, checklists, and images interspersed throughout the body
- Optional pull quote (featured quote)
- Optional FAQ accordion at the end
- Optional CTA (call to action) block
- Optional author note

**How to set it:** Set Layout Type to `modular_article`, then fill in the **Sections** repeater with one or more section blocks.

**Available section types:**

| Section type | Best for |
|---|---|
| **Text** | Standard rich-text paragraphs |
| **Callout** | Key insight, warning, or highlighted takeaway |
| **Checklist** | Step lists, criteria, or best practices |
| **Image** | Supporting visual with caption |

**Optional extra fields:**

| Field | What it adds |
|---|---|
| Featured Quote | Styled pull quote displayed prominently |
| FAQ Items | Collapsible Q&A accordion at the end of the post |
| CTA Heading / CTA Text / CTA Button | Conversion prompt block |
| Author Note | Closing reflection or bio note from the author |

**Tips:**
- Use callouts to highlight the single most important insight in each section.
- FAQ blocks are excellent for capturing long-tail search queries.
- Keep section count between 3–7 for readability; very long posts are better split into a series.

---

### 3. How-To Guide

**When to use:** Practical instructional content with a numbered step sequence. Examples: "How to build a demand gen calendar," "How to set up lead scoring in HubSpot," "How to run a GTM audit."

**What it looks like:**
- Structured step-by-step layout with numbered steps displayed visually
- Each step has a title and description
- Optional prerequisites or requirements section
- Summary and next steps at the end
- Related articles

**How to set it:** Set Layout Type to `how_to`, then fill in the **Steps** repeater (one entry per step with title and body).

**Tips:**
- Steps should be action-oriented: start each with a verb ("Set up," "Configure," "Review").
- Aim for 5–10 steps. Fewer than 4 may not warrant the how-to format; more than 12 should be split.
- Include a clear outcome statement at the top so readers know what they'll achieve.

---

### 4. Insight

**When to use:** Strategic analysis, opinion pieces, market observations, data-backed perspectives, or thought leadership commentary. Examples: "Why ABM fails at mid-market scale," "The 3 signals that predict pipeline collapse," "State of B2B GTM 2026."

**What it looks like:**
- Editorial header with prominent insight framing
- Optional data points or statistics displayed as visual highlights
- Analysis-focused body with emphasis on strategic perspective
- Author attribution prominently displayed
- Related articles

**How to set it:** Set Layout Type to `insight`, then optionally add **Data Points** (statistic + label pairs) to reinforce the narrative.

**Tips:**
- Lead with a strong, specific point of view in the first paragraph. Avoid hedging.
- Data points should be concrete numbers with short labels (e.g., "74% of pipeline gaps stem from poor ICP fit").
- Use this format for content that positions the author as a genuine authority, not just a content producer.

---

## Choosing the Right Layout

| You want to... | Use |
|---|---|
| Publish a general update, news item, or simple article | Standard Article |
| Write a rich editorial piece with multiple visual sections | Modular Article |
| Teach readers how to do something step by step | How-To Guide |
| Share a strong strategic point of view or data-backed analysis | Insight |

If you are unsure, start with Standard Article. You can always switch layout type and restructure content before publishing.

---

## Setting Up a Post in WordPress

1. Log in to the WordPress admin at `https://m.gtmstack.pro/wp-admin`.
2. Go to **Posts → Add New**.
3. Write your title and body in the block editor.
4. Set a **Featured Image** (required for best display in the blog grid and post header).
5. Assign at least one **Category**.
6. Add relevant **Tags** to improve related-post matching.
7. In the **GTMStack Layout** section (scroll down or check the right sidebar), set **Layout Type** to the appropriate value.
8. Fill in any layout-specific fields (Sections, Steps, Data Points, etc.).
9. Click **Publish**.

The live blog at `gtmstack.pro/blog` will refresh from WordPress in the browser on load. If you do not see your post appear, confirm it is set to **Published** (not Draft or Private) and that the WordPress API is reachable.

---

## Categories and Tags

### Categories

Categories group posts by broad topic area. They drive the filter pills on the blog index page. Use them consistently — readers browse by category to find related posts.

Recommended top-level categories to maintain:
- GTM Strategy
- Demand Generation
- Content & SEO
- Marketing Operations
- Analytics & Attribution
- Case Studies
- Industry Insights

### Tags

Tags are more granular than categories. They power the **related posts** logic — posts with matching tags are surfaced as "Related Insights" at the bottom of each post. Tag accurately and specifically (e.g., `ABM`, `HubSpot`, `lead-scoring`, `B2B SaaS`) rather than broadly.

---

## Featured Images

Every post should have a featured image. It appears in:
- The blog grid card
- The post header (for most layout types)
- Social sharing previews (OG image fallback if no specific OG image is set)

**Recommended dimensions:** 1200 × 630 px (16:9 ratio works well for both the grid and social sharing).

---

## Content Quality Checklist

Before publishing, confirm:

- [ ] Title is specific and search-friendly (includes the key term or question)
- [ ] Featured image is set
- [ ] At least one category is assigned
- [ ] Tags are added (3–8 relevant tags)
- [ ] Layout type is set correctly for the content format
- [ ] Layout-specific fields are filled (steps for how-to, sections for modular, etc.)
- [ ] Body content does not duplicate the intro (modular articles only)
- [ ] CTA block or author note is added if appropriate
- [ ] Post is proofed for factual accuracy, especially any data points or statistics
- [ ] Post status is **Published** before announcing it anywhere

---

## Related Documentation

- [BLOG-WORDPRESS-DEVELOPER-GUIDE.md](./BLOG-WORDPRESS-DEVELOPER-GUIDE.md) — Technical architecture, environment setup, and developer extension guide
- [BLOG_WORDPRESS.md](./BLOG_WORDPRESS.md) — Quick reference for template-to-adapter mapping
- [CONTENT_MANAGEMENT_GUIDE.md](./CONTENT_MANAGEMENT_GUIDE.md) — How the broader site content is managed
