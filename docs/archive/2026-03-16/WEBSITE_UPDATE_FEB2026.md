# GTMStack Pro — Comprehensive Project Documentation

## Section 1 — Developer Guide

### 1.1 Architecture Overview

This repository is a **Next.js 14 App Router** website that combines:

- a route-driven marketing site (`app/`),
- reusable UI and layout primitives (`components/`),
- typed content collections (`content/`),
- a registry-driven template subsystem (`src/`),
- and optional headless WordPress integration for blog content (`lib/wp-client.ts`, `lib/wordpress.ts`).

#### Core top-level folders and responsibilities

- `app/`
  - Primary Next.js routes and pages.
  - Includes static-like pages (`about`, `contact`, `resume`), data-driven pages (`expertise`, `industries`, `projects`, `case-studies`), and blog pages (`blog`, `blog/post`).
  - `app/layout.tsx` applies global shell (`Navbar`, `Footer`) and metadata.
  - `app/page.tsx` is registry-driven: it resolves a page row from `getPageByRoute('/')`, then selects template/content dynamically.
- `components/`
  - Site-level components grouped by concern:
    - `components/layout/` (global navigation, footer, sections, mega menu)
    - `components/ui/` (buttons, cards, hero sections, chips, stat rows, back button, dropdowns)
    - `components/motion/` and `components/animations/` (Framer Motion wrappers + animation tiles)
    - domain folders such as `components/expertise`, `components/industries`, `components/gallery`.
- `content/`
  - Typed content objects for expertise, industries, case studies, home, projects, and gallery.
  - Includes both monolithic TS files and subfolders with MDX (`content/expertise/**.mdx`).
- `lib/`
  - Shared logic and data adapters:
    - type definitions (`lib/types.ts`),
    - WordPress clients (`lib/wp-client.ts`, `lib/wordpress.ts`),
    - content helpers (`lib/expertiseMdx.ts`, `lib/renderCaseStudy.tsx`),
    - hero/animation registry mapping (`lib/heroVisualRegistry.ts`, `lib/heroVisuals.ts`, related files),
    - generic helpers (`lib/utils.ts`).
- `src/`
  - Registry/template framework separate from direct `app/` page code:
    - `src/data/page-registry.csv` source-of-truth for route-template-content mapping.
    - generated outputs (`src/data/pageRegistry.generated.ts`, `src/data/animationCatalog.generated.ts`).
    - template implementations in `src/templates/*`.
    - content registry bridge in `src/content/registry.ts`.
- `scripts/`
  - Build-time generation/validation:
    - `gen-page-registry.ts`
    - `validate-page-registry.ts`
    - `gen-animation-catalog.ts`
    - `link-audit.mjs`
    - `generate-hero-manifest.mjs`.
- `.github/workflows/deploy.yml`
  - CI build and deploy pipeline (static build + SFTP upload of `out/`).

#### Rendering model in practice

There are two active patterns in the codebase:

1. **Direct App Router pages** in `app/**/page.tsx` for many sections.
2. **Registry/template-driven pages** where route -> template + content is looked up (especially visible in `app/page.tsx` and `src/templates/registry.ts`).

This means extending the site can happen via either:

- explicit new route files under `app/`, or
- adding CSV/content rows and using existing templates.

### 1.2 Tech Stack (languages, frameworks, libraries, versions)

#### Languages and runtime

- TypeScript (`^5.4.0`)
- JavaScript (for config/scripts)
- Node.js 18.17+ required by project README (CI uses Node 20)

#### Frameworks and UI

- Next.js `^14.2.0` (App Router)
- React `18.2.0`
- Tailwind CSS `^3.4.0`
- Framer Motion `^11.18.2`
- Lucide React `^0.400.0` icons
- Geist fonts package `^1.5.1`

#### Content and markdown ecosystem

- `@next/mdx` `^14.2.0`
- `@mdx-js/loader` `^3.0.0`
- `@mdx-js/react` `^3.0.0`
- `next-mdx-remote` `^5.0.0`
- `gray-matter` `^4.0.3`

#### Data visualization and misc

- `chart.js` `^4.4.0`
- `react-chartjs-2` `^5.2.0`
- `recharts` `^3.7.0`
- `isomorphic-dompurify` `^3.0.0-rc.2`
- `clsx` `^2.1.0`

#### Tooling

- ESLint + `eslint-config-next` (`^8.57.0`, `^14.2.0`)
- PostCSS + autoprefixer
- `tsx` for TypeScript build scripts

### 1.3 Install, Configure, and Run Locally

### Prerequisites

- Node.js (recommend LTS 20 to match CI)
- npm

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Default URL: `http://localhost:3000`

### Production build and local serve

```bash
npm run build
npm run start
```

### Useful build-time generators and validators

```bash
npm run gen:registry
npm run validate:registry
npm run gen:animations
npm run link-audit
npm run gen:hero-manifest
```

> `prebuild` runs `npm run gen:registry`, so registry output is refreshed automatically before `npm run build`.

### Static export behavior

`next.config.js` sets:

- `output: 'export'` and `trailingSlash: true` in non-dev phases,
- `distDir: 'out'` in production builds,
- `distDir: '.next'` in development.

This is why deployment uploads from `out/`.

### 1.4 Code Organization (components, pages, APIs, utilities)

#### Pages / routes

- Global shell: `app/layout.tsx`
- Home: `app/page.tsx` (registry/template-driven)
- Expertise: `app/expertise/*`
- Industries: `app/industries/*`
- Case studies: `app/case-studies/*`
- Projects: `app/projects/*`
- Gallery: `app/gallery/*`
- Blog: `app/blog/page.tsx`, `app/blog/post/page.tsx`
- Supporting: `about`, `contact`, `resume`, service pages under `app/services/*`

#### Components

- Layout and navigation:
  - `components/layout/Navbar.tsx` (desktop + mobile + industry/expertise menus)
  - `components/layout/Footer.tsx`
  - section wrappers in `components/layout/Section*.tsx`
- UI primitives:
  - `components/ui/Button.tsx`, `Card.tsx`, `CardGrid.tsx`, `FilterChips.tsx`, `Hero.tsx`, `CTABand.tsx`, `StatRow.tsx`, etc.
- Motion:
  - `components/motion/FadeIn*.tsx`, plus animation-heavy components in `components/animations/` and `src/components/animations/`.

#### Data and content flow

- Business content: `content/*.ts`, `content/**/**/*.mdx`
- Content types and cross-linking models: `lib/types.ts`
- Content registry lookup: `src/content/registry.ts`
- Template selection: `src/templates/registry.ts`
- Page route mapping: `src/data/page-registry.csv` -> `src/data/pageRegistry.generated.ts`

#### API/data access

- No custom internal API routes detected for app business logic.
- External API integration is with WordPress REST:
  - Browser/server-safe client: `lib/wp-client.ts`
  - Server-focused client with ISR options: `lib/wordpress.ts`

### 1.5 Environment Variables, Config Files, and Dependency Considerations

#### Environment variables

- `NEXT_PUBLIC_WORDPRESS_API_URL`
  - Used by client-compatible WordPress fetch layer (`lib/wp-client.ts`).
- `WORDPRESS_API_URL`
  - Used server-side (`lib/wordpress.ts`) and in CI workflow build checks.

Behavior:

- `lib/wp-client.ts` falls back to `https://m.gtmstack.pro/wp-json/wp/v2` if env vars are missing.
- `lib/wordpress.ts` throws if both are absent (strict server-side path).

#### Key configuration files

- `next.config.js`
  - MDX extension support
  - image domain/SVG policy
  - static export behavior in production
- `tailwind.config.ts`
  - design tokens (colors, font scale, spacing, radius, shadows, keyframes)
- `postcss.config.js`
  - Tailwind/PostCSS setup
- `tsconfig.json`
  - strict TypeScript settings, alias `@/* -> ./*`
- `.eslintrc.json`
  - Next.js lint rules

#### Dependency notes

- Because static export is enabled in production builds, pages should avoid runtime-only server assumptions unless explicitly handled.
- WordPress calls use `cache: 'no-store'` in `wp-client` and `revalidate`/`no-store` mixes in `wordpress.ts`; choose one strategy per page for predictable cache behavior.

### 1.6 How to Add Features / Extend Existing Functionality

#### Add a new marketing page (direct route style)

1. Create `app/<new-route>/page.tsx`.
2. Reuse existing primitives (`Hero`, `Section`, `Card`, `CTABand`, etc.).
3. Add nav/footer link if needed in `components/layout/Navbar.tsx` and/or `components/layout/Footer.tsx`.
4. Add relevant content in `content/*.ts` if structured data is needed.

#### Add a registry-driven page

1. Add a row to `src/data/page-registry.csv` with route/template/content key.
2. Ensure content key resolves in `src/content/registry.ts`.
3. Ensure template exists in `src/templates/registry.ts`.
4. Run:

```bash
npm run gen:registry
npm run validate:registry
```

5. Confirm route renders correctly.

#### Add or update expertise content

- Update TS collection files under `content/expertise*.ts` and/or MDX files in `content/expertise/**`.
- Keep slugs consistent with any links, related item arrays, and registry entries.

#### Add animation/gallery assets

1. Add component file under `src/components/animations/` (or update mapping in `components/animations`).
2. Run `npm run gen:animations` to refresh catalog output.
3. Update gallery metadata/mappings (`src/data/animationMeta.overrides.ts`, `lib/galleryGithubMap.ts`) as needed.

#### Blog-related enhancements

- For UI changes: modify `app/blog/*` and related components.
- For taxonomy/filter behavior: edit `lib/wp-client.ts` helpers (`getPostCategories`, `fetchCategories`, etc.).
- For server-rendered WP fetch behavior: use/extend `lib/wordpress.ts`.

---

## Section 2 — User Guide

### 2.1 What this website does and who it is for

This website presents GTMStack Pro’s consulting services for growth and go-to-market work. It is mainly for:

- business leaders at B2B companies,
- marketing and revenue teams,
- people evaluating consulting services,
- visitors who want examples of work (case studies, projects, animations, and blog posts).

In plain terms: it helps visitors understand **what services are offered**, **which industries are supported**, and **how to start a conversation**.

### 2.2 Getting around the site (no account required)

You do **not** need to create an account or log in to browse this site.

Use the top navigation bar to access major sections:

- Home
- Expertise
- Industries
- Case Studies / Projects / Gallery
- Blog
- About
- Contact

The footer repeats key links and includes social/contact shortcuts.

### 2.3 Step-by-step walkthrough of key features

#### Feature: Browse services by expertise

1. Open **Expertise**.
2. Review grouped service areas and cards.
3. Open a specific topic (for example demand generation, content engagement, automation-related topics).
4. On detail pages, read challenges, approach, proof points, and related links to other topics/case studies.

#### Feature: Explore industry-specific pages

1. Open **Industries**.
2. Pick an industry card.
3. Read the industry page for context, business realities, and suggested playbooks.
4. Use related links to jump to relevant expertise areas and case studies.

#### Feature: Read case studies and projects

1. Open **Case Studies** or **Projects**.
2. Select an item from the listing.
3. Review problem, solution, measurable outcomes, and key metrics.
4. Use tags/related links to discover similar work.

#### Feature: Use the blog

1. Open **Blog**.
2. Browse the latest posts.
3. Optionally filter by category and search by keyword.
4. Open any post to read the full article.

#### Feature: Explore visual gallery

1. Open **Gallery**.
2. Browse animation tiles and visual examples.
3. Open details/modals where available to view larger previews and associated metadata.

#### Feature: Contact and outreach

1. Open **Contact**.
2. Choose a preferred channel:
   - email,
   - calendar booking link,
   - LinkedIn.
3. Use the contact form to send a message and include your company + engagement type.

### 2.4 Major pages explained in non-technical language

- **Home**: Intro page with the main value proposition and links into important sections.
- **Expertise**: Full list of service areas and specializations.
- **Industry pages**: Advice and examples tailored to specific sectors.
- **Case Studies**: Real outcomes and results from previous work.
- **Projects**: Additional implementation-focused work examples.
- **Gallery**: Visual and animation showcase.
- **Blog**: Articles and thought leadership content.
- **About**: Background and experience.
- **Resume**: Professional profile and credentials.
- **Contact**: Ways to start a conversation.

### 2.5 Setup steps a user might need

For a standard visitor: none.

For a business contact lead:

- Prepare goals/questions before filling the contact form.
- Share company stage, team size, and timeline in message text.
- Use the scheduling link for a live call when faster coordination is needed.

---

## Section 3 — Webmaster Guide

### 3.1 Deployment and hosting

Current CI/CD pattern is in `.github/workflows/deploy.yml`:

1. Trigger on pushes to `main`.
2. Install dependencies with `npm ci`.
3. Optionally check WordPress API availability.
4. Build static output with `npm run build`.
5. Verify `out/index.html` exists.
6. Upload `out/*` via SFTP using `appleboy/scp-action`.

#### Required deployment secrets

- `SFTP_HOST`
- `SFTP_USER`
- `SFTP_KEY`
- `SFTP_PORT`
- `SFTP_TARGET`
- `WORDPRESS_API_URL` (recommended for blog/API checks)

#### Hosting implications

Because production uses static export, the host can be any static file server/CDN-backed environment that accepts uploaded files.

### 3.2 Content and asset updates

#### Update written content

- Edit content source files in:
  - `content/` (TS objects)
  - `content/expertise/**/*.mdx`
- Keep slugs stable when possible (changing slugs can break links and registry mappings).

#### Update page mappings and templates

- Edit `src/data/page-registry.csv`.
- Regenerate and validate:

```bash
npm run gen:registry
npm run validate:registry
```

#### Update animation/gallery content

- Add/update animation components in `src/components/animations/`.
- Refresh generated catalog:

```bash
npm run gen:animations
```

- Update repository links or metadata in mapping/override files (`lib/galleryGithubMap.ts`, `src/data/animationMeta.overrides.ts`).

#### Update nav/footer links

- Top navigation: `components/layout/Navbar.tsx` (and mega menu files).
- Footer links: `components/layout/Footer.tsx`.

### 3.3 Maintenance tasks

#### Routine checks

- Build validation:

```bash
npm run build
```

- Linting:

```bash
npm run lint
```

- Link quality audit:

```bash
npm run link-audit
```

- Registry consistency:

```bash
npm run validate:registry
```

#### Backups and content resilience

- Git repository already versions site code/content.
- Blog data lives in WordPress; ensure WordPress host/database backups are managed outside this repository.
- Export critical WordPress posts/media regularly if blog continuity is business-critical.

#### Logging and monitoring recommendations

- Monitor GitHub Actions runs for failed builds or failed uploads.
- Validate WordPress API endpoint uptime externally (status check on `/posts?per_page=1`).
- Add runtime synthetic checks against deployed `/`, `/blog`, `/contact`, and at least one dynamic detail URL.

### 3.4 Common troubleshooting scenarios

#### Build fails on registry/template errors

Symptoms:

- Unknown template IDs
- Missing content keys
- Duplicate or malformed routes

Fix:

1. Check `src/data/page-registry.csv` for schema issues.
2. Re-run `npm run gen:registry`.
3. Re-run `npm run validate:registry` and fix flagged route/content/template mismatches.

#### Blog posts not loading

Symptoms:

- Empty blog list or fetch errors.

Fix checklist:

1. Confirm `WORDPRESS_API_URL` / `NEXT_PUBLIC_WORDPRESS_API_URL` are correct.
2. Ensure URL points to WordPress REST root (or a value that normalizes correctly).
3. Test endpoint manually:

```bash
curl "$WORDPRESS_API_URL/posts?per_page=1&_embed=1"
```

4. Confirm remote WP allows public REST reads and is reachable from deploy environment.

#### Missing hero visuals/animations

Symptoms:

- Page shows fallback visuals or no animation.

Fix:

1. Verify route mapping in hero/animation registry files.
2. Confirm component export path still exists.
3. Regenerate animation catalog (`npm run gen:animations`) when new files were added.

#### Broken internal links after slug changes

Fix:

- Search content arrays (`related_*_slugs`, route links, card hrefs) and registry CSV for old slugs.
- Update all references consistently and rerun link audit.

---

## Section 4 — Design Reference

### 4.1 Color palette

Primary system tokens are split across `tailwind.config.ts` and `app/globals.css`.

#### Core dark surfaces

- `#020617` (navy-dark / background)
- `#0A0F2D` (navy-deep / alternate background)

#### Accent and brand colors

- `#00CFFF` (accent cyan)
- `#3B82F6` (accent blue)
- `#C026D3` (gradient pink start)
- `#22C55E` (success green)
- `#67E8F9` (light cyan text accent)

#### Tailwind ramps used repeatedly

- `brand` scale (`50 -> 950`)
- `accent` scale (`50 -> 950`)
- `slate` scale (`50 -> 950`)
- additional specialized scales (`cool`, `gold`, `emerald`, animation-specific aliases).

#### Common gradients/patterns

- `gradient-brand`: `linear-gradient(135deg, #C026D3 0%, #3B82F6 100%)`
- dark background gradients for hero/section themes
- lightweight grid and dot SVG data-URI backgrounds

### 4.2 Typography

#### Font families

- `sans`: `var(--font-geist-sans)` + system fallback
- `mono`: `var(--font-geist-mono)`
- `display`: `var(--font-cabinet)` then Geist fallback

`app/layout.tsx` loads Geist Sans/Mono and applies variables globally.

#### Font size scale

Custom scale includes:

- `xs` 0.75rem
- `sm` 0.875rem
- `base` 1rem
- `lg` 1.125rem
- `xl` 1.25rem
- `2xl` 1.5rem
- `3xl` 1.875rem
- `4xl` 2.25rem
- `5xl` 3rem
- `6xl` 3.75rem
- `7xl` 4.5rem
- `8xl` 6rem

Most page heroes use display-weight headings with tight line-height and gradient-highlight spans.

### 4.3 Spacing and layout system

#### Spacing

- Base Tailwind scale + custom additions (`18`, `88`, `128`).
- CSS variables in `app/globals.css`:
  - `--section-padding-y`
  - `--container-padding-x`
- Responsive section padding steps at `768px` and `1024px` via media queries.

#### Containers

- Shared `.container-width` utility controls max-width and horizontal padding.
- Typical screen width behavior: `max-w-6xl` to `xl:max-w-7xl`.

### 4.4 UI component patterns

#### Buttons

`components/ui/Button.tsx` supports variants:

- `primary`
- `secondary`
- `accent`
- `ghost`
- `outline`

Supports sizes (`sm`, `md`, `lg`), loading state spinner, optional icons, internal link (`Link`) and external anchor behavior.

#### Cards

`components/ui/Card.tsx` pattern:

- card shell classes: `card`, `card-hover`
- variants: `default`, `featured`, `compact`
- optional icon, badge, tags, and CTA arrow.

#### Forms

Contact page includes a user-friendly form with select + text inputs and inline submission state (`isSubmitting`/`isSubmitted`) to provide immediate confirmation.

#### Navigation

- Sticky header with blur/background border treatment.
- Desktop mega-menu interaction for expertise/industries.
- Mobile menu toggle pattern (`Menu`/`X`) and dedicated mobile menu component.

### 4.5 Responsive design approach

The site uses Tailwind’s mobile-first breakpoint strategy and explicit responsive utility classes (`md:`, `lg:`, `xl:`).

Common responsive decisions:

- Grid columns expand progressively (single-column -> multi-column at `md`/`lg`).
- Hero spacing and headline scale increase by breakpoint.
- Navbar switches from desktop nav to mobile menu controls.
- Section paddings and container widths widen at larger sizes.

### 4.6 Design system / style guide sources

Primary style source files:

- `tailwind.config.ts` (tokens + keyframes + shadows + gradients)
- `app/globals.css` (custom properties + utility class layers)
- `stylepack/main/STYLE_SPEC.md` and `stylepack/expertise/*/STYLE_SPEC.md` (additional stylepack specs)

If creating new UI, follow existing utility classes and token usage before introducing new ad hoc values.
