# WordPress: Embedding PDFs and Videos in Blog Posts

This guide explains how to embed PDFs, videos, and other rich media directly into WordPress blog posts so they appear on the live gtmstack.pro/blog page.

---

## Overview

The GTMStack blog now renders **raw HTML content** from WordPress posts, which means you can embed:

- **Videos**: YouTube, Vimeo, Wistia, self-hosted MP4
- **PDFs**: Embedded PDF viewers or downloadable PDFs
- **Interactive Media**: Any HTML-safe embeds

These will automatically display on the front-end blog page when published.

---

## WordPress Setup

### 1. Enable Rich Editing in WordPress

WordPress Admin → Settings → Writing:
- Ensure **Visual Editor** is enabled (default)
- Ensure you're using the **Block Editor** (WordPress 5.0+) or **Classic Editor**

### 2. Embed Videos

#### Option A: YouTube/Vimeo (Recommended)

WordPress has built-in support for video embeds. In the post editor:

1. Click **Add Block** (Block Editor) or place cursor where you want the video
2. Select **Embed** block
3. Paste the video URL:
   - YouTube: `https://www.youtube.com/watch?v=VIDEO_ID`
   - Vimeo: `https://vimeo.com/VIDEO_ID`
   - Wistia: `https://home.wistia.com/medias/VIDEO_ID`
4. Press Enter — WordPress automatically converts this to an `<iframe>` embed

**The REST API will return the iframe HTML**, which the GTMStack blog will render correctly.

#### Option B: Self-Hosted Video (MP4/WebM)

For videos hosted on your server:

1. Upload the video file via **Media Library**
2. Use the **Video block** in the Block Editor
3. Select your uploaded video file
4. Configure autoplay, loop, controls, etc.

WordPress will output `<video>` or `<iframe>` tags (depending on configuration).

#### Option C: Manual Embed Code

If you have custom embed code:

1. Switch to **HTML/Code** editor in the post
2. Paste the embed code directly:
   ```html
   <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" 
           frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
           allowfullscreen></iframe>
   ```
   
   Or for Wistia:
   ```html
   <iframe src="https://home.wistia.com/medias/VIDEO_ID?embedType=async" 
           title="Video Title" 
           allow="autoplay; fullscreen" width="100%" height="600"></iframe>
   ```

3. The REST API will preserve this HTML and render on the front-end

---

## Embed PDFs

### Option A: PDF Embed Block (Recommended)

If using WordPress 5.8+:

1. Add a new **File** or **Document** block
2. Upload your PDF from Media Library
3. Configure the display option

**Note**: WordPress's default PDF display depends on plugins. For best results, use Option B or C.

### Option B: Embed Plugin

Install **PDF Embedder** or similar plugin:

1. Activate the plugin: Admin → Plugins
2. Search for "PDF Embedder" and install
3. In post editor, use their shortcode or block:
   ```
   [pdf-embedder url="https://gtmstack.pro/wp-content/uploads/2024/my-document.pdf" title="Document Title"]
   ```
   Or use the GUI block

The plugin generates an `<iframe>` or custom HTML that the REST API returns and GTMStack renders.

### Option C: Manual Embed Code

For a simple embedded PDF viewer:

1. Switch to **HTML/Code** editor
2. Paste one of these:

**Using Google Docs Viewer:**
```html
<iframe src="https://docs.google.com/gview?url=https://gtmstack.pro/wp-content/uploads/2024/my-document.pdf&embedded=true" 
        width="100%" height="800"></iframe>
```

**Using pdfjs (Mozilla PDF.js):**
```html
<iframe src="https://mozilla.github.io/pdf.js/web/viewer.html?file=https://gtmstack.pro/wp-content/uploads/2024/my-document.pdf" 
        width="100%" height="800"></iframe>
```

**Simple Download Link:**
```html
<a href="https://gtmstack.pro/wp-content/uploads/2024/my-document.pdf" 
   download className="btn btn-primary">Download PDF</a>
```

### Option D: Direct Media Upload

1. Upload PDF to **Media Library**
2. Get the URL: Admin → Media → Select file → copy URL
3. Paste into post HTML editor or create a custom link block

---

## Best Practices

### 1. File Size & Performance
- **Videos**: Use H.264 codec, max 100MB per file. Consider hosting on YouTube/Vimeo instead.
- **PDFs**: Compress to <5MB for fast loading. Use tools like Smallpdf or Compressor.io

### 2. Responsive Sizing
When manually embedding, always use responsive width:
```html
<iframe src="..." 
        width="100%" 
        height="600" 
        style="aspect-ratio: 16 / 9;">
</iframe>
```

### 3. Fallback Content
Provide text-based alternatives for accessibility:
```html
<div style="position: relative; width: 100%; padding-bottom: 56.25%;">
  <iframe src="..." 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          allow="autoplay" allowfullscreen></iframe>
</div>
```

### 4. SEO & Metadata
- Add post title, featured image, and excerpt
- Use descriptive alt text for embedded media
- Add categories and tags

---

## Testing

After publishing a post with embedded media:

0. **Confirm post is actually published**:
   - In WordPress, post status must be `Published` (not Draft, Private, or Scheduled).

1. **Check WordPress REST API**:
   ```
   https://m.gtmstack.pro/wp-json/wp/v2/posts?search=YOUR_TITLE&_embed=1
   ```
   
   Look for your post. In the `content.rendered` field, verify the HTML is present.

2. **Check Live Blog**:
   ```
   https://gtmstack.pro/blog
   ```
   
   Search for your post and click to view. The embedded media should render inline.

3. **Check Browser DevTools**:
   - Open Inspector (F12)
   - Find the text content div in the article
   - Verify `<iframe>`, `<video>`, `<embed>`, or `<object>` tags are present

4. **If missing on live site, verify deployment source**:
   - Production deploy runs from `main` branch.
   - If changes only exist on a feature branch, merge to `main` or run manual workflow dispatch.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Embed shows as text/code | Verify WordPress `content.rendered` includes embed HTML. If API is correct but live is stale, redeploy from `main`. |
| Iframe is blank | Check the `src` URL is correct and publicly accessible. CORS may block some sources. |
| PDF doesn't render | Your PDF plugin may not export to REST API. Use Option C (manual embed) instead. |
| Video won't play | Ensure video URL is public. YouTube/Vimeo must be public (not private/unlisted). |
| Sizing looks wrong | Add `width="100%" height="600"` to iframe or use CSS aspect-ratio wrapper (see Best Practices). |
| Content truncated on mobile | Add `display: block; width: 100%;` CSS styles to container. |
| New post visible in WP but not on `gtmstack.pro/blog` | Check post status is Published, then verify the latest production deploy was triggered from `main`. |

---

## Allowed HTML Tags (Security)

The blog sanitizes all HTML for security. These tags/attributes are allowed in embedded media:

**Tags**: `iframe`, `embed`, `object`, `param`, `video`, `source`, `img`

**Attributes**: `src`, `width`, `height`, `frameborder`, `allow`, `allowfullscreen`, `type`, `data`, `name`, `value`, `alt`, `title`, `style`, `class`, `id`

**Blocked**: JavaScript, event handlers (`onclick`, `onerror`, etc.), external stylesheets

If your embed uses tags outside this list, contact the development team to request allowlisting.

---

## Examples

### Example 1: YouTube Video with Responsive Container

```html
<div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>
```

### Example 2: Embedded PDF with Viewer

```html
<iframe 
  src="https://docs.google.com/gview?url=https://gtmstack.pro/wp-content/uploads/2024/whitepaper.pdf&embedded=true" 
  width="100%" 
  height="900" 
  frameborder="0">
</iframe>
```

### Example 3: Vimeo with Aspect Ratio

```html
<iframe 
  src="https://player.vimeo.com/video/123456789" 
  width="100%" 
  height="600" 
  frameborder="0" 
  allow="autoplay; fullscreen; picture-in-picture" 
  allowfullscreen>
</iframe>
```

### Example 4: Mixed Content (Text + Video)

In Block Editor:
1. Add **Paragraph** block with text
2. Add **Embed** block below it
3. Paste YouTube URL
4. Continue with more paragraphs

The REST API will preserve all blocks as HTML.

---

## Advanced: Custom Embed Shortcodes

If you want to create a custom embed shortcode (for team training videos, for example):

1. **Register shortcode** (add to `functions.php`):
   ```php
   function gtmstack_video_embed($atts) {
       $atts = shortcode_atts(array(
           'id' => '',
           'title' => 'Video',
           'height' => '600',
       ), $atts);
       
       return sprintf(
           '<iframe src="https://vimeo.com/%s" width="100%%" height="%s" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>',
           esc_attr($atts['id']),
           esc_attr($atts['height'])
       );
   }
   add_shortcode('gtmstack_video', 'gtmstack_video_embed');
   ```

2. **Use in post**:
   ```
   [gtmstack_video id="123456789" title="Training Video" height="700"]
   ```

3. **REST API returns expanded HTML** – GTMStack renders it correctly.

---

## Support

For questions or issues:
- Check the [Blog & WordPress Integration Guide](../../BLOG-WORDPRESS-DEVELOPER-GUIDE.md)
- Verify your WordPress instance is running WP 5.0+ with Block Editor
- Ensure REST API is public and not behind authentication
