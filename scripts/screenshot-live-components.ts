/* eslint-disable no-console */
/**
 * screenshot-live-components.ts
 *
 * Screenshots live React animation components by visiting /preview/[animationId]
 * with Puppeteer, then saving the result to public/images/<thumbnailPath>.
 *
 * Requires the dev server to be running (npm run dev).
 *
 * Usage:
 *   npx tsx scripts/screenshot-live-components.ts                   # dry-run (no writes)
 *   npx tsx scripts/screenshot-live-components.ts --apply           # write all thumbnails
 *   npx tsx scripts/screenshot-live-components.ts --apply --id=marketing-analytics-carousel
 *   npx tsx scripts/screenshot-live-components.ts --apply --limit=10
 *   npx tsx scripts/screenshot-live-components.ts --apply --settle-ms=3000
 *   npx tsx scripts/screenshot-live-components.ts --apply --copy-to-animations-repo
 *
 * Flags:
 *   --apply                    Actually write files (default is dry-run)
 *   --id=<animationId>         Only screenshot this one animation
 *   --limit=<n>                Cap the number of screenshots taken
 *   --settle-ms=<ms>           Wait time after page load before screenshot (default: 2500)
 *   --base-url=<url>           Base URL of the running dev server (default: http://localhost:3000)
 *   --width=<px>               Viewport width (default: 1280)
 *   --height=<px>              Viewport height (default: 720)
 *   --copy-to-animations-repo  Also write screenshots to GTMStack_Animations repo
 *   --animations-repo=<path>   Path to animations repo (default: C:\GitProd\GTMStack_Animations\gtmstack_animations)
 */

import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import puppeteer, { type Page } from 'puppeteer'
import { resolveRegistryIdForManifestItem } from '@/src/lib/galleryAnimationMap'
import { ALL_ANIMATION_REGISTRY } from '@/src/data/animations'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ManifestItem = {
  id: string
  slug: string
  animationId?: string | null
  title: string
  category: string
  thumbnailPath?: string
  projectPath?: string
}

type ResolvedTarget = {
  manifestId: string
  animationId: string
  title: string
  thumbnailPath: string
}

type PreviewDiagnostics = {
  title: string
  hasPreviewRoot: boolean
  hasViteOverlay: boolean
  hasNextErrorOverlay: boolean
  bodySnippet: string
}

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv: string[]) {
  const args = {
    apply: false,
    dryRun: true,
    id: null as string | null,
    limit: 0,
    settleMs: Number(process.env.GALLERY_THUMBNAIL_SETTLE_MS || 2500),
    baseUrl: process.env.GALLERY_THUMBNAIL_BASE_URL || 'http://localhost:3000',
    width: Number(process.env.GALLERY_THUMBNAIL_WIDTH || 1280),
    height: Number(process.env.GALLERY_THUMBNAIL_HEIGHT || 720),
    copyToAnimationsRepo: false,
    animationsRepo: 'C:\\GitProd\\GTMStack_Animations\\gtmstack_animations',
  }

  for (const raw of argv) {
    if (raw === '--apply') { args.apply = true; args.dryRun = false; continue }
    if (raw === '--dry-run') { args.dryRun = true; args.apply = false; continue }
    if (raw === '--copy-to-animations-repo') { args.copyToAnimationsRepo = true; continue }
    if (raw.startsWith('--id=')) { args.id = raw.split('=', 2)[1]; continue }
    if (raw.startsWith('--limit=')) { args.limit = Number(raw.split('=', 2)[1]) || 0; continue }
    if (raw.startsWith('--settle-ms=')) { args.settleMs = Number(raw.split('=', 2)[1]) || args.settleMs; continue }
    if (raw.startsWith('--base-url=')) { args.baseUrl = raw.split('=', 2)[1]; continue }
    if (raw.startsWith('--width=')) { args.width = Number(raw.split('=', 2)[1]) || args.width; continue }
    if (raw.startsWith('--height=')) { args.height = Number(raw.split('=', 2)[1]) || args.height; continue }
    if (raw.startsWith('--animations-repo=')) { args.animationsRepo = raw.split('=', 2)[1]; continue }
  }

  if (!args.apply) args.dryRun = true
  return args
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function normalizeFsPath(p: string): string {
  return p.replace(/\\/g, '/').replace(/^\/+/, '')
}

function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

async function getPreviewDiagnostics(page: Page): Promise<PreviewDiagnostics> {
  return page.evaluate(() => {
    const bodyText = document.body?.innerText || ''
    const bodySnippet = bodyText.replace(/\s+/g, ' ').trim().slice(0, 280)

    return {
      title: document.title || '',
      hasPreviewRoot: Boolean(document.querySelector('[data-preview-root]')),
      hasViteOverlay:
        Boolean(document.querySelector('vite-error-overlay')) ||
        bodyText.includes('[plugin:vite') ||
        bodyText.includes('vite-error-overlay'),
      hasNextErrorOverlay:
        Boolean(document.querySelector('nextjs-portal')) ||
        bodyText.includes('Application error') ||
        bodyText.includes('Unhandled Runtime Error') ||
        bodyText.includes('Switched to client rendering because the server rendering errored'),
      bodySnippet,
    }
  })
}

async function checkServerReachable(baseUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const url = new URL(baseUrl)
      const req = http.get({ hostname: url.hostname, port: url.port || 3000, path: '/', timeout: 5000 }, (res) => {
        res.destroy()
        resolve(true)
      })
      req.on('error', () => resolve(false))
      req.on('timeout', () => { req.destroy(); resolve(false) })
    } catch {
      resolve(false)
    }
  })
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const root = process.cwd()

  console.log('Screenshot Live Components')
  console.log('==========================')
  console.log(`Mode:        ${args.apply ? 'APPLY (will write files)' : 'DRY-RUN (no writes)'}`)
  console.log(`Base URL:    ${args.baseUrl}`)
  console.log(`Viewport:    ${args.width}x${args.height}`)
  console.log(`Settle time: ${args.settleMs}ms`)
  if (args.id) console.log(`Filter:      --id=${args.id}`)
  if (args.limit) console.log(`Limit:       ${args.limit}`)
  if (args.copyToAnimationsRepo) console.log(`Also copying to: ${args.animationsRepo}`)
  console.log('')

  // --- Load manifest ---
  const manifestPath = path.join(root, 'src', 'data', 'gallery-manifest.json')
  if (!fs.existsSync(manifestPath)) {
    console.error('ERROR: gallery-manifest.json not found at', manifestPath)
    process.exit(1)
  }
  const manifest: ManifestItem[] = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

  // --- Load animation registry ids (must match runtime resolution) ---
  const registryIds = new Set(ALL_ANIMATION_REGISTRY.map((entry) => entry.id))
  console.log(`Registry IDs loaded: ${registryIds.size}`)

  // --- Resolve manifest items to animationIds ---
  const allTargets: ResolvedTarget[] = []
  const unresolved: string[] = []

  for (const item of manifest) {
    if (!item.thumbnailPath) continue

    const animationId = resolveRegistryIdForManifestItem(item)
    if (!animationId) {
      unresolved.push(item.id)
      continue
    }

    allTargets.push({
      manifestId: item.id,
      animationId,
      title: item.title,
      thumbnailPath: normalizeFsPath(item.thumbnailPath),
    })
  }

  console.log(`Resolved to live components: ${allTargets.length}`)
  console.log(`Unresolved (HTML-only or unknown): ${unresolved.length}`)
  console.log('')

  // Apply --id filter
  let targets = args.id
    ? allTargets.filter((t) => t.animationId === args.id || t.manifestId === args.id)
    : allTargets

  if (args.id && targets.length === 0) {
    console.error(`ERROR: No resolved target found for --id=${args.id}`)
    console.log('Available animationIds (sample):')
    allTargets.slice(0, 10).forEach((t) => console.log(`  ${t.animationId}  (manifest: ${t.manifestId})`))
    process.exit(1)
  }

  if (args.limit > 0) {
    targets = targets.slice(0, args.limit)
    console.log(`Capped to --limit=${args.limit}`)
  }

  if (targets.length === 0) {
    console.log('No targets to process.')
    process.exit(0)
  }

  // --- Dry-run: just list targets ---
  if (args.dryRun) {
    console.log(`Would screenshot ${targets.length} animations:`)
    for (const t of targets) {
      const dest = path.join(root, 'public', 'images', t.thumbnailPath)
      const exists = fs.existsSync(dest)
      console.log(`  [${exists ? 'overwrite' : 'new     '}] ${t.animationId}  →  public/images/${t.thumbnailPath}`)
    }
    console.log('')
    console.log('Run with --apply to write files.')
    process.exit(0)
  }

  // --- Apply: launch Puppeteer and screenshot each ---
  const reachable = await checkServerReachable(args.baseUrl)
  if (!reachable) {
    console.error(`ERROR: Dev server not reachable at ${args.baseUrl}`)
    console.error('Start it with:  npm run dev')
    process.exit(1)
  }
  console.log(`Dev server reachable at ${args.baseUrl} ✓`)
  console.log('')

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  const counters = { success: 0, failed: 0, skipped: 0 }
  const failures: { id: string; error: string }[] = []

  try {
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i]
      const previewUrl = `${args.baseUrl}/preview/${encodeURIComponent(target.animationId)}`
      const destPath = path.join(root, 'public', 'images', target.thumbnailPath)

      console.log(`[${i + 1}/${targets.length}] ${target.animationId}`)
      console.log(`  URL:  ${previewUrl}`)
      console.log(`  Dest: public/images/${target.thumbnailPath}`)

      const page = await browser.newPage()
      try {
        await page.setViewport({
          width: args.width,
          height: args.height,
          deviceScaleFactor: 2,
        })

        await page.goto(previewUrl, { waitUntil: 'domcontentloaded', timeout: 60000 })

        await page.waitForFunction(
          () => {
            const bodyText = document.body?.innerText || ''
            return Boolean(document.querySelector('[data-preview-root]')) ||
              bodyText.includes('[plugin:vite') ||
              bodyText.includes('Application error') ||
              bodyText.includes('Unhandled Runtime Error') ||
              bodyText.includes('Switched to client rendering because the server rendering errored')
          },
          { timeout: 15000 }
        )

        const diagnostics = await getPreviewDiagnostics(page)
        if (!diagnostics.hasPreviewRoot) {
          throw new Error(
            `Preview root missing. title="${diagnostics.title}" snippet="${diagnostics.bodySnippet}"`
          )
        }
        if (diagnostics.hasViteOverlay) {
          throw new Error(
            `Detected Vite overlay instead of GTMStack preview. title="${diagnostics.title}" snippet="${diagnostics.bodySnippet}"`
          )
        }
        if (diagnostics.hasNextErrorOverlay) {
          throw new Error(
            `Detected Next.js error overlay. title="${diagnostics.title}" snippet="${diagnostics.bodySnippet}"`
          )
        }

        // Let the animation play for settle time
        await sleep(args.settleMs)

        // Create destination directory if needed
        ensureDir(path.dirname(destPath))

        // Screenshot
        await page.screenshot({
          path: destPath as `${string}.png`,
          type: 'png',
          clip: { x: 0, y: 0, width: args.width, height: args.height },
        })

        // Optionally copy to animations repo
        if (args.copyToAnimationsRepo) {
          const animsDest = path.join(args.animationsRepo, target.thumbnailPath)
          ensureDir(path.dirname(animsDest))
          fs.copyFileSync(destPath, animsDest)
          console.log(`  Copied to animations repo ✓`)
        }

        counters.success++
        console.log(`  ✓ Done`)
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        counters.failed++
        failures.push({ id: target.animationId, error: msg })
        console.log(`  ✗ FAILED: ${msg}`)
      } finally {
        await page.close()
      }

      console.log('')
    }
  } finally {
    await browser.close()
  }

  // --- Summary ---
  console.log('Summary')
  console.log('-------')
  console.log(`✓ Succeeded: ${counters.success}`)
  console.log(`✗ Failed:    ${counters.failed}`)

  if (failures.length) {
    console.log('')
    console.log('Failed animations:')
    for (const f of failures) {
      console.log(`  - ${f.id}: ${f.error}`)
    }
  }

  process.exit(counters.failed > 0 ? 1 : 0)
}

main().catch((e) => {
  console.error('Unexpected error:', e)
  process.exit(10)
})
