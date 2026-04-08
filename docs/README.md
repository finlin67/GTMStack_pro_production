# GTMStack.pro Reference

A production-ready marketing and portfolio site built with Next.js (App Router), TypeScript, Tailwind CSS, and MDX.

## Start Here

- `RECOVERY_CHECKPOINT_2026-04-01.md` - branch recovery summary, preserved states, and next-step plan
- `PROJECT_OVERVIEW_MARKETING_AND_DEVELOPER.md` - cross-functional project handoff for marketing and engineering
- `CANONICAL_DOC_MAP.md` - which docs are authoritative for each topic cluster
- `WEBSITE_USER_GUIDE.md` - user-facing narrative and site purpose
- `PROJECT_STRUCTURE.md` - architectural and structural map for developers
- `ROUTING.md` - registry-driven routing and runtime behavior

### Blog

- `BLOG-WORDPRESS-DEVELOPER-GUIDE.md` - developer guide: architecture, templates, adapters, WP plugin, env vars
- `BLOG_CONTENT_TYPES_GUIDE.md` - editorial guide: how to choose and use post layout types (for CMO/authors)
- `BLOG_WORDPRESS.md` - quick reference: template-to-adapter mapping

## Features

- **Modern SaaS-style UI** - Clean, enterprise-credible design with abstract/data-driven visuals
- **Comprehensive Design System** - Custom colors, typography scale, spacing, radii, and shadows
- **Reusable Components** - Navbar, Footer, Hero, CTABand, Section, CardGrid, StatRow, FilterChips, BlogNavPanel
- **Content Collections** - Expertise items across 4 pillars, Industries, and Case Studies
- **Registry-Driven Routing** - `src/data/page-registry.csv` + catch-all `app/[[...slug]]/page.tsx`; add pages without file changes
- **Client-side Filtering** - Tag and pillar-based filtering on landing pages
- **Framer Motion Animations** - Subtle scroll and hover effects throughout
- **Full TypeScript** - Type-safe content and components
- **Multi-Template Blog** - Headless WordPress with four distinct post layout types: legacy, modular article, how-to, and insight
- **Animation Gallery** - 100+ Tailwind animations with metadata, admin UI, and thumbnail generation
- **Admin CMS Layer** - Internal admin UI for registry editing, template uploads, and content management

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [MDX](https://mdxjs.com/) - Markdown with JSX support
- [Lucide React](https://lucide.dev/) - Icon library
- [Zod](https://zod.dev/) - Runtime schema validation for content and API payloads

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── [[...slug]]/page.tsx     # Registry catch-all (most public pages)
│   ├── layout.tsx               # Root layout with Navbar/Footer
│   ├── about/                   # About page (filesystem route)
│   ├── contact/                 # Contact page (filesystem route)
│   ├── blog/                    # Blog section (headless WordPress)
│   │   ├── page.tsx            # Blog index shell
│   │   ├── BlogIndexClient.tsx  # Client refresh layer
│   │   └── post/               # Post detail
│   ├── gallery/                 # Animation gallery
│   ├── admin/                   # Internal admin CMS
│   ├── case-studies/            # Case studies (filesystem + registry)
│   ├── industries/              # Industries (filesystem + registry)
│   ├── expertise/               # Expertise (filesystem + registry)
│   └── api/                     # API routes (admin, animations, nav)
├── src/
│   ├── templates/               # Page templates (registry-driven rendering)
│   │   ├── blog/               # Blog templates (Feed, Stitch, HowTo, Insight)
│   │   ├── expertise/          # Expertise pillar templates
│   │   ├── industries/         # Industry templates
│   │   └── registry.ts         # templateId → component mapping
│   ├── content/                 # Content registry (contentKey → data)
│   └── data/                    # page-registry.csv + generated files
├── components/
│   ├── layout/                  # Navbar, Footer, MegaMenu, BlogNavPanel
│   ├── ui/                      # Hero, CTABand, Card, CardGrid, StatRow
│   └── admin/                   # Admin UI components
├── content/                     # TypeScript content files (source of truth)
│   ├── expertise/              # Expertise items by topic
│   ├── industries.ts
│   └── case-studies.ts
├── lib/                         # Utilities and clients
│   ├── wp-client.ts            # WordPress API client
│   ├── blog-adapter.ts         # WP post → UI props adapters
│   └── admin-auth.ts           # Admin session handling
├── public/                      # Static assets, animation thumbnails, OG images
├── scripts/                     # Code generation (registry, animations, thumbnails)
└── tailwind.config.ts          # Tailwind + Design System
```

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for the full architectural map.

## Design System

### Colors

- **Brand** - Deep navy to electric blue gradient (`brand-50` to `brand-950`)
- **Accent** - Warm coral/orange for CTAs (`accent-50` to `accent-950`)
- **Slate** - Neutral grays for text and backgrounds (`slate-50` to `slate-950`)
- **Emerald** - Success states and data visualization

### Typography

- **Font Family** - Geist Sans (primary), Geist Mono (code)
- **Display Font** - Cabinet Grotesk for headings
- **Scale** - xs through 8xl with optimized line heights

### Spacing & Layout

- Container max-width: 1280px
- Section padding: 24-40px (responsive)
- Component spacing: 4px base unit

### Components

All components follow consistent patterns:
- Card variants: default, featured, compact
- Button variants: primary, secondary, accent, ghost, outline
- Animation: FadeIn, StaggerContainer, HoverScale

## Blog (WordPress)

The blog is powered by **headless WordPress**. Content is authored in WordPress and fetched via the REST API. Four distinct post layouts are supported, driven by an ACF `layout_type` field on each post. See **[docs/BLOG-WORDPRESS-DEVELOPER-GUIDE.md](docs/BLOG-WORDPRESS-DEVELOPER-GUIDE.md)** for:

- Architecture & API integration
- Post layout types: `legacy`, `modular_article`, `how_to`, `insight`
- Environment variables (`NEXT_PUBLIC_WORDPRESS_API_URL`, `WORDPRESS_API_URL`)
- WordPress plugin setup (GTMStack Headless Blog Kit)
- Managing content in WordPress
- Extending the blog and troubleshooting

## Content Management

Content is managed through TypeScript files in `/content/` and is governed by `src/data/page-registry.csv`. A content file only becomes a public page when it has a matching registry row. See [CONTENT_MANAGEMENT_GUIDE.md](./CONTENT_MANAGEMENT_GUIDE.md) for the full workflow.

### Expertise

Grouped into 4 pillars:
1. **Content & Engagement** - Content creation, SEO, social, events, web design
2. **Demand & Growth** - ABM, demand gen, lead scoring, paid media, upsell
3. **Strategy & Insights** - Competitive intelligence, GTM strategy, product marketing
4. **Systems & Operations** - CRM, marketing automation, analytics, martech

### Industries

Multiple verticals including B2B SaaS, FinTech, HealthTech, Cybersecurity, Fleet & Logistics, Manufacturing, Public Sector, Retail, and more.

### Case Studies

Detailed project case studies with metrics, challenges, solutions, and results. Not all authored case studies may be registered as live public routes — check `src/data/page-registry.csv` for the published set.

## Customization

### Adding Content

1. Add new items to the relevant file in `/content/`
2. Follow the existing TypeScript interfaces
3. Items will automatically appear on landing pages

### Styling

1. Modify design tokens in `tailwind.config.ts`
2. Update global styles in `app/globals.css`
3. Component-specific styles use Tailwind utility classes

### Pages

1. Create new routes in `/app/` following Next.js App Router conventions
2. Use existing components from `/components/`
3. Follow established patterns for consistency

## Deployment

The site is ready for deployment on:
- [Vercel](https://vercel.com/) (recommended)
- [Netlify](https://netlify.com/)
- Any Node.js hosting platform

```bash
# Build for production
npm run build

# The output is in .next/
```

## License

Private - All rights reserved.

