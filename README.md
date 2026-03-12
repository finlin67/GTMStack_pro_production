# GTMStack Pro

A production-ready marketing and portfolio site for go-to-market consulting, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and MDX.

---

## Tech Stack

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router) with React 18.2.0
- **Language**: [TypeScript 5.4.0](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4.0](https://tailwindcss.com/) + PostCSS
- **Content**: [MDX 3.0.0](https://mdxjs.com/) + [Gray Matter](https://github.com/jonschlinkert/gray-matter)
- **Animation**: [Framer Motion 11.18.2](https://www.framer.com/motion/)
- **Validation**: [Zod 4.3.6](https://zod.dev/)
- **Icons**: [Lucide React 0.400.0](https://lucide.dev/)
- **Data Visualization**: [Recharts](https://recharts.org/), [Chart.js](https://www.chartjs.org/)
- **Dev Tools**: ESLint, Husky (git hooks), ts-morph (code generation)

---

## Prerequisites

- **Node.js**: 18.17 or later
- **npm**: 9+ or **yarn** equivalent
- **Git**: For version control

No database required — all content stored as TypeScript files and CSV.

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/finlin67/z1_GTMStack_pro.git
cd GTMStack_pro
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the project root (gitignored, not committed):

```bash
# Admin authentication
ADMIN_PASSWORD=your_secure_admin_password_here

# Optional: WordPress blog integration
WORDPRESS_API_URL=https://your-blog.com/wp-json
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-blog.com/wp-json

# Optional: Animation thumbnail generation
THUMBNAIL_FACTORY_URL=http://localhost:3000/thumbnail-factory
THUMBNAIL_SETTLE_MS=1800
THUMBNAIL_FORMAT=png

# Optional: Google AI
GOOGLE_API_KEY=your_google_genai_key_here
```

See [docs/ROUTING.md](./docs/ROUTING.md) for all available environment variables.

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Generate Registry (If Adding Pages)
If you add new pages to the registry, regenerate the TypeScript:
```bash
npm run gen:registry
```

---

## Environment Variables

### Admin & Security
| Variable | Purpose | Required | Default |
|----------|---------|----------|---------|
| `ADMIN_PASSWORD` | Plain-text admin login password | Yes (for admin access) | None |
| `ADMIN_TOKEN_SECRET` | JWT secret for admin tokens | Optional | Falls back to `ADMIN_PASSWORD` |
| `LOCAL_ADMIN` | Enable admin in non-production | No | None (dev only) |

### Static Export
| Variable | Purpose | Default |
|----------|---------|---------|
| `STATIC_EXPORT` | Build static HTML (no server needed) | `1` for static mode |

### WordPress Integration
| Variable | Purpose | Default |
|----------|---------|---------|
| `WORDPRESS_API_URL` | Server-side blog API | None |
| `NEXT_PUBLIC_WORDPRESS_API_URL` | Public blog API (visible to browser) | None |

### Animation & Assets
| Variable | Purpose | Default |
|----------|---------|---------|
| `THUMBNAIL_FACTORY_URL` | Thumbnail generation service | `http://localhost:3000/thumbnail-factory` |
| `THUMBNAIL_SETTLE_MS` | Wait time for thumbnails to render (ms) | `1800` |
| `THUMBNAIL_FORMAT` | Output format (png or webp) | `png` |

---

## Common Commands

### Development
```bash
npm run dev              # Start dev server with hot reload
npm run typecheck       # Check TypeScript without building
npm run lint            # Run ESLint
npm run check           # Lint + typecheck combined
```

### Building & Deployment
```bash
npm run build           # Build for production (generates registry first)
npm run build:static    # Build static export (no server required)
npm run start           # Start production server
npm run export          # Static export variant
```

### Code Generation
```bash
npm run gen:registry           # Regenerate PAGE_REGISTRY from CSV
npm run gen:animations         # Regenerate animation catalog
npm run gen:hero-manifest      # Generate hero visual metadata
npm run gen:all               # Run all generation scripts
npm run validate:registry      # Validate registry consistency
```

### Utilities & Auditing
```bash
npm run link-audit              # Check for broken links
npm run registry:audit          # Full registry audit
npm run page:upsert             # Update page registry entries
npm run gen:thumbnails          # Generate page thumbnails
npm run diag:easing             # Find invalid easing functions
```

---

## Project Structure

```
GTMStack_pro/
├── app/                        # Next.js App Router pages & API routes
│   ├── [[...slug]]/
│   │   └── page.tsx           # Catch-all route (registry-driven pages)
│   ├── api/
│   │   ├── admin/             # Admin endpoints (authentication, content publishing)
│   │   └── animations/        # Animation metadata APIs
│   ├── expertise/             # Expertise section pages
│   ├── industries/            # Industries section pages
│   ├── case-studies/          # Case studies section pages
│   ├── gallery/               # Animation gallery
│   ├── blog/                  # Blog integration
│   ├── admin/                 # Admin dashboard
│   └── layout.tsx             # Root layout with Navbar, Footer

├── src/                       # Application source code
│   ├── templates/             # Page template components
│   │   ├── registry.ts        # Maps templateId → component
│   │   ├── home/              # Home page templates
│   │   ├── expertise/         # Expertise templates
│   │   └── [other sections]
│   ├── components/            # Reusable React components
│   │   ├── layout/            # Navbar, Footer, etc.
│   │   ├── sections/          # Page section components
│   │   ├── ui/                # Basic UI components
│   │   └── [other domains]
│   ├── content/               # Content data + registry
│   │   ├── registry.ts        # Maps contentKey → data
│   │   ├── home.ts
│   │   ├── expertise/
│   │   └── [other domains]
│   ├── data/                  # Generated data files
│   │   └── pageRegistry.generated.ts  # Generated from page-registry.csv

├── lib/                       # Shared utilities & services
│   ├── admin-auth.ts          # Authentication logic
│   ├── pageRegistry.ts        # Registry query helpers
│   ├── types.ts               # TypeScript type definitions
│   ├── heroVisuals.ts         # Hero visual management
│   └── [other utilities]

├── content/                   # Page content (TypeScript + CSV)
│   ├── home.ts
│   ├── about.ts
│   ├── expertise.ts
│   ├── industries.ts
│   └── [other content files]

├── components/                # Component library (organized by domain)
│   ├── layout/
│   ├── sections/
│   ├── ui/
│   └── [other domains]

├── public/                    # Static assets
│   ├── images/
│   ├── lottie/                # Animation files
│   └── [other assets]

├── scripts/                   # Build-time generation scripts
│   ├── gen-page-registry.ts   # Generate PAGE_REGISTRY
│   ├── gen-animation-catalog.ts
│   └── [other generators]

├── docs/                      # Documentation
│   ├── ROUTING.md             # Routing architecture
│   ├── PROJECT_STRUCTURE.md   # Folder organization & tech stack
│   ├── CHANGELOG.md           # Git history & changes
│   └── [other guides]

├── .env.local                 # Environment variables (gitignored)
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── .eslintrc.json             # ESLint configuration
└── package.json               # Dependencies & scripts
```

---

## How It Works (The Registry System)

This project uses a **registry-driven routing architecture** instead of traditional file-based routing:

1. **Source of Truth**: `src/data/page-registry.csv` defines all public routes
2. **Automatic Generation**: `scripts/gen-page-registry.ts` converts CSV → TypeScript at build time
3. **Runtime Resolution**: When a request arrives, the app looks up the route in the registry
4. **Template + Content**: Registry entry points to a template component and content data
5. **Rendering**: Template receives content and renders the page

**Example entry** in `page-registry.csv`:
```csv
route,templateId,contentKey,pageTitle,theme
/expertise/demand-growth,Uploaded_DemandGrowth_v1,pillar:demand-growth,Demand & Growth,dark
```

**When someone visits `/expertise/demand-growth`:**
- Router looks up route in registry → finds entry
- Loads `DemandGrowthTemplate` component
- Loads content from `pillar:demand-growth`
- Renders: `<DemandGrowthTemplate content={data} />`

**Result**: Add 100+ pages without touching code — just update the CSV.

For detailed explanation, see [docs/ROUTING.md](./docs/ROUTING.md).

---

## Documentation

For deeper technical documentation, see the `docs/` folder:

- **[ROUTING.md](./docs/ROUTING.md)** - Complete routing architecture with end-to-end flow explanation, all API endpoints, security patterns
- **[PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md)** - Folder organization, tech stack breakdown, build scripts, configurations
- **[CHANGELOG.md](./docs/CHANGELOG.md)** - Recent commits with architectural context (3+ months of changes)
- **[CONTENT_MANAGEMENT_GUIDE.md](./docs/CONTENT_MANAGEMENT_GUIDE.md)** - How to add/edit page content
- **[ADMIN_GUIDE.md](./docs/ADMIN_GUIDE.md)** - Admin dashboard reference
- **[component-library.md](./docs/component-library.md)** - Available UI components

---

## Authentication & Admin Access

The admin dashboard allows editing content without code changes:

1. **Log in**: Visit `/admin` and enter your `ADMIN_PASSWORD`
2. **Manage content**: Add/edit expertise areas, industries, case studies
3. **Publish changes**: Click "Publish" and the registry updates automatically
4. **Regenerate**: The site rebuilds the necessary files

Admin endpoints are **local-only by default** in development and require authentication in production.

---

## Deployment

### Static Export (Recommended for most cases)
```bash
npm run build:static
npx serve out/
# or deploy `out/` folder to CDN/static host
```

### With Server
```bash
npm run build
npm run start
# Server runs on port 3000
```

### Environment Variables for Production
Set these in your hosting platform (Vercel, Netlify, AWS, etc.):
```
ADMIN_PASSWORD=<secure-password>
WORDPRESS_API_URL=<your-blog-api>
NODE_ENV=production
```

---

## Development Workflow

1. **Create content**: Add data to `content/` or `src/data/page-registry.csv`
2. **Create template** (if new page type): Add component to `src/templates/`
3. **Register**: Add entry to `page-registry.csv`
4. **Generate**: `npm run gen:registry`
5. **Build**: `npm run build`
6. **Test**: `npm run dev` and visit route

---

## Troubleshooting

### Build fails with "PAGE_REGISTRY not found"
```bash
npm run gen:registry    # Regenerate from CSV
```

### Type errors during build
```bash
npm run typecheck       # Check TypeScript errors
npm run lint            # Check ESLint errors
```

### Admin endpoints return 404
- Ensure `ADMIN_PASSWORD` is set in `.env.local`
- Check if in static export mode (`STATIC_EXPORT=1`) — admin endpoints unavailable then
- Verify running on `localhost:3000` (local-only protection)

---

## Support & Contribution

For questions or issues:
1. Check the [docs/](./docs/) folder
2. Review git history: `git log --oneline -20`
3. Search existing issues on GitHub

---

## License

ISC

---

## Quick Links

- **GitHub**: https://github.com/finlin67/z1_GTMStack_pro
- **Admin Dashboard**: http://localhost:3000/admin (dev only)
- **Documentation**: [docs/](./docs/)
