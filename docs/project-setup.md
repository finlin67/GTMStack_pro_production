# How to Set Up GTMStack.pro

## 1) Prerequisites

Install the following first:

- **Node.js 20** (recommended; CI and Replit use Node 20)
- **npm** (comes with Node)

Minimum supported from repo docs: Node.js **18.17+**.

---

## 2) Install dependencies

From the project root (`c:\GitProd\GTMStack_pro`), run:

```bash
npm ci
```

Use `npm install` only if you intentionally need to update lockfile resolution.

---

## 3) Configure environment variables

Create a `.env.local` file in the project root.

### Required/recommended variables

```env
WORDPRESS_API_URL=https://m.gtmstack.pro/wp-json/wp/v2
NEXT_PUBLIC_WORDPRESS_API_URL=https://m.gtmstack.pro/wp-json/wp/v2
```

### Notes

- `WORDPRESS_API_URL`
  - Used by server-side WordPress client (`lib/wordpress.ts`) and CI build checks.
  - Required for reliable build/deploy behavior.
- `NEXT_PUBLIC_WORDPRESS_API_URL`
  - Used by client-side WordPress client (`lib/wp-client.ts`).
  - If omitted, the code falls back to `https://m.gtmstack.pro/wp-json/wp/v2`.

No additional API keys are required for local site runtime in this repo.

---

## 4) Start local development server

Standard local run:

```bash
npm run dev
```

Then open:

- `http://localhost:3000`

Replit-style run (host/port override used by `.replit`):

```bash
npm run dev -- -p 5000 -H 0.0.0.0
```

---

## 5) Build and run production locally

Build static export:

```bash
npm run build
```

This project exports static output to `out/` in non-dev builds (`next.config.js`).

Optional Next production server command (defined in scripts):

```bash
npm start
```

---

## 6) Useful project scripts

- `npm run lint` — run Next/ESLint checks
- `npm run gen:registry` — regenerate page registry from source data
- `npm run validate:registry` — validate generated page registry
- `npm run gen:animations` — regenerate animation catalog
- `npm run gen:hero-manifest` — regenerate hero manifest
- `npm run link-audit` — run internal link audit

`npm run build` automatically runs `prebuild`, which executes `npm run gen:registry` first.

---

## 7) First-time onboarding command sequence

```bash
npm ci
npm run dev
```

If blog/API content is not loading as expected, set `.env.local` values (Step 3), restart dev server, and test again.