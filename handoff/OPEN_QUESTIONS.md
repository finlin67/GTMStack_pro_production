# Open Questions

1. Which registry file is canonical in day-to-day edits?
- `src/data/page-registry.csv` appears canonical and `src/data/pageRegistry.generated.ts` appears generated.
- Confirm whether manual edits to generated files are ever intentionally used.

2. Are there parallel content systems?
- `src/content/registry.ts` maps keys for registry-driven pages.
- Some route pages also import direct content models (`content/expertise.ts`, `content/industries.ts`, `content/case-studies.ts`) and custom render components.
- Confirm intended precedence when these sources disagree.

3. Are `templateId` mismatches intentional or broken?
- Registry includes both legacy and uploaded template IDs.
- Some IDs route through compatibility mappings in `src/templates/registry.ts`.
- Confirm whether all uploaded IDs are expected to be long-term or transitional.

4. Are `contentKey` mismatches due to dynamic resolution?
- Audit script explicitly skips literal checks for dynamic prefixes (`industries:`, `pillar:`, `case-studies:`).
- Confirm whether other prefixes should also be treated as dynamic.

5. What is the canonical source of truth for gallery thumbnails?
- Candidates include generated catalog (`src/data/animationCatalog.generated.ts`) and overrides (`src/data/animationMeta.overrides.json`) plus runtime uploads.
- Confirm whether generated catalog should always win unless explicit override exists.

6. Should missing WordPress env vars fail builds or degrade gracefully?
- `lib/wordpress.ts` throws when env vars are missing.
- `lib/wp-client.ts` falls back to `https://m.gtmstack.pro/wp-json/wp/v2`.
- Confirm desired behavior for CI/build/static export contexts.

7. Are broken links from `reports/link-audit.md` route drift, missing content, or stale navigation?
- Report flags many `/` links as BROKEN, suggesting possible audit false positives.
- Confirm expected triage policy for internal/tooling/staging paths.

8. Which blog routing model is canonical?
- Current paths indicate `app/blog/post/page.tsx` with `?slug=` and a separate `app/blog/_[slug]/page.tsx` MDX route.
- `app/blog/[slug]/page.tsx` is absent.
- `app/blog/_[slug]/page.tsx` expects files under `content/blog/posts`, but that directory is currently absent.
- Confirm intended long-term public URL shape.

9. Should section-specific routes and catch-all registry route both remain active?
- There is overlap between `app/[[...slug]]/page.tsx` and explicit section routes.
- Confirm whether this dual-path is intentional for migration compatibility.

10. How should stale backup/old files be treated in audits?
- Examples include `.bak` and `page.tsx.old.tsx` files being scanned by tooling.
- Confirm whether audits should exclude these files by rule.
