# File Index

| Category | File Path | Why It Matters |
|---|---|---|
| registry | `src/data/page-registry.csv` | Canonical editable route/template/content registry source. |
| registry | `src/data/pageRegistry.generated.ts` | Runtime generated registry consumed by route/template lookup logic. |
| registry | `lib/pageRegistry.ts` | Normalized route and slug lookups into generated registry. |
| templates | `src/templates/registry.ts` | `TEMPLATE_BY_ID` mapping and template resolver. |
| templates | `src/templates/uploadedRegistry.generated.ts` | Uploaded/free-form template ID map used as fallback. |
| templates | `app/[[...slug]]/page.tsx` | Generic registry-backed page renderer. |
| content mapping | `src/content/registry.ts` | `contentByKey` map and typed content accessors. |
| content mapping | `content/expertise.ts` | Expertise model source used in detail routes and dynamic maps. |
| content mapping | `content/industries.ts` | Industry model source used in detail routes and dynamic maps. |
| page routes | `app/expertise/page.tsx` | Registry-backed expertise section root route. |
| page routes | `app/expertise/[slug]/page.tsx` | Expertise dynamic detail route with registry metadata integration. |
| page routes | `app/expertise/content-engagement/page.tsx` | Explicit wrapper route that delegates to registry/template resolution. |
| page routes | `app/expertise/demand-growth/page.tsx` | Explicit wrapper route that delegates to registry/template resolution. |
| page routes | `app/expertise/strategy-insights/page.tsx` | Explicit wrapper route that delegates to registry/template resolution. |
| page routes | `app/expertise/systems-operations/page.tsx` | Explicit wrapper route that delegates to registry/template resolution. |
| page routes | `app/industries/page.tsx` | Registry-backed industries section root route. |
| page routes | `app/industries/[slug]/page.tsx` | Industry dynamic detail route with registry metadata integration. |
| page routes | `app/industries/b2b-saas/page.tsx` | Explicit wrapper route that delegates to registry/template resolution. |
| page routes | `app/industries/financial-services/page.tsx` | Explicit wrapper route that delegates to registry/template resolution. |
| page routes | `app/industries/fleet-management-logistics/page.tsx` | Explicit wrapper route that delegates to registry/template resolution. |
| page routes | `app/industries/manufacturing/page.tsx` | Explicit wrapper route that delegates to registry/template resolution. |
| page routes | `app/industries/pubsec-government/page.tsx` | Explicit wrapper route that delegates to registry/template resolution. |
| page routes | `app/industries/retail/page.tsx` | Explicit wrapper route that delegates to registry/template resolution. |
| page routes | `app/case-studies/page.tsx` | Case studies index route (custom page implementation). |
| page routes | `app/case-studies/[slug]/page.tsx` | Case studies dynamic detail route. |
| page routes | `app/gallery/page.tsx` | Registry-backed gallery route. |
| page routes | `app/gallery/animations/page.tsx` | Redirect route to canonical `/gallery`. |
| page routes | `app/gallery/admin/page.tsx` | Local-only gallery administration UI route. |
| page routes | `app/blog/page.tsx` | Blog index (WordPress-backed server fetch path). |
| page routes | `app/blog/post/page.tsx` | Blog single post shell route (query-string slug path). |
| page routes | `app/blog/_[slug]/page.tsx` | Alternate MDX slug route that expects local `content/blog/posts` files (directory currently absent). |
| WordPress | `lib/wp-client.ts` | Browser/server-compatible WP REST fetch client + taxonomy helpers. |
| WordPress | `lib/wordpress.ts` | Server-focused WP client with URL normalization and revalidation. |
| WordPress | `lib/wp-media.ts` | Featured image extraction from WP embedded media payload. |
| WordPress | `app/blog/BlogIndexClient.tsx` | Taxonomy/search/pagination URL sync + client refetch behavior. |
| WordPress | `app/blog/post/BlogPostClient.tsx` | Single-post fetch and related post taxonomy logic. |
| WordPress | `lib/blog-adapter.ts` | Adapts WordPress payloads into uploaded blog template content schema. |
| gallery | `src/data/animationCatalog.generated.ts` | Generated animation metadata catalog including thumbnail paths. |
| gallery | `src/data/animations.ts` | Main animation registry and metadata merge (`thumbnailSrc` -> `previewImage`). |
| gallery | `src/data/animationGallery.ts` | Gallery-specific data adapter from generated catalog. |
| gallery | `lib/gallery-adapter.ts` | Adapts registry data into uploaded gallery template content schema. |
| gallery | `scripts/generate-thumbnails.js` | Puppeteer thumbnail generation workflow. |
| gallery | `app/api/animations/thumbnail/route.ts` | Upload/write thumbnail endpoint and metadata override update. |
| reports | `reports/link-audit.md` | Latest internal link audit results (broken/orphan link summary). |
| reports | `reports/link-audit.csv` | Machine-readable link audit output. |
| validation scripts | `scripts/validate-page-registry.ts` | Registry validation gate for template/content/slug consistency. |
| validation scripts | `scripts/registry-audit.mjs` | CSV-to-template/content wiring audit script. |
| validation scripts | `scripts/gen-page-registry.ts` | Generates runtime page registry from CSV source. |
| validation scripts | `scripts/link-audit.mjs` | Internal link discovery/report generator. |
| validation scripts | `package.json` | Defines build/validate/lint/typecheck/link-audit scripts and prebuild generation. |
