## Stitch HTML meta files (`*.meta.json`)

For each exported Stitch HTML file, optionally add a sibling metadata file to make conversion deterministic:

- `home.html` → `home.meta.json`
- `about.html` → `about.meta.json`
- `blog/blog-post.html` → `blog/blog-post.meta.json`

### Minimal shape

```json
{
  "route": "/",
  "templateOutput": "src/templates/home/HomePage.tsx",
  "contentOutput": "content/home.ts",
  "notes": "Any freeform notes for Cursor"
}
```

### Optional fields (recommended)

```json
{
  "route": "/",
  "templateOutput": "src/templates/home/HomePage.tsx",
  "contentOutput": "content/home.ts",
  "nav": {
    "items": [
      { "label": "Expertise", "href": "/expertise" }
    ],
    "cta": { "label": "Explore My Expertise", "href": "/expertise" }
  },
  "hero": {
    "primaryCtaHref": "/expertise",
    "secondaryCtaHref": "/about"
  },
  "iconStrategy": "keep-material-symbols",
  "notes": ""
}
```

### `iconStrategy`

- `keep-material-symbols`: Keep `material-symbols-outlined` usage; ensure fonts are loaded globally.
- `swap-to-lucide`: Convert icons to `lucide-react` where feasible.

