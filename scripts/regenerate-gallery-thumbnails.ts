/* eslint-disable no-console */
import fs from 'node:fs'
import http from 'node:http'
import https from 'node:https'
import path from 'node:path'
import puppeteer from 'puppeteer'
import type { Page } from 'puppeteer'

import { applyCanonicalVisibility } from '../src/lib/galleryPreviewPolicy'

type ManifestItem = {
  id: string
  title: string
  entryHtml?: string
  thumbnailPath?: string
}

/**
 * Server-side placeholder detection — mirrors `isPlaceholderPreviewHtml` in
 * `src/lib/galleryManifest.ts`.  Reads the physical HTML file from `public/`
 * and checks for known placeholder text signatures.
 */
function isPlaceholderEntryHtml(entryHtml: string | undefined, root: string): boolean {
  if (!entryHtml) return false
  const rel = entryHtml.replace(/\\/g, '/').replace(/^\/+/, '')
  const absPath = path.join(root, 'public', rel)
  let source: string
  try {
    source = fs.readFileSync(absPath, 'utf8')
  } catch {
    return false
  }
  return (
    source.includes('Gallery thumbnail placeholder (Option B)') ||
    source.includes('Run and deploy your AI Studio app') ||
    source.includes('This contains everything you need to run your app locally.')
  )
}

/**
 * Check **all** sibling HTML files in the entry directory.  If every HTML file
 * is a placeholder, the entire item is considered placeholder-only.
 */
function isItemPlaceholderOnly(entryHtml: string | undefined, root: string): boolean {
  if (!entryHtml) return true
  const rel = entryHtml.replace(/\\/g, '/').replace(/^\/+/, '')
  const entryDir = path.dirname(rel)
  const absDir = path.join(root, 'public', entryDir)

  if (!fs.existsSync(absDir)) return true

  const htmlFiles = fs
    .readdirSync(absDir)
    .filter((name) => name.toLowerCase().endsWith('.html'))

  if (htmlFiles.length === 0) return true

  // If any HTML sibling is NOT a placeholder, the item has real content
  return htmlFiles.every((name) => {
    const siblingRel = `${entryDir}/${name}`.replace(/\\/g, '/')
    return isPlaceholderEntryHtml(siblingRel, root)
  })
}

type CliArgs = {
  apply: boolean
  dryRun: boolean
  limit: number
  settleMs: number
  width: number
  height: number
  baseUrl: string
  baseUrlSource: 'default' | 'env' | 'arg'
  includeSecondary: boolean
  includeDeprecated: boolean
  smartEntry: boolean
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    apply: false,
    dryRun: true,
    limit: 0,
    settleMs: Number(process.env.GALLERY_THUMBNAIL_SETTLE_MS || 1700),
    width: Number(process.env.GALLERY_THUMBNAIL_WIDTH || 1280),
    height: Number(process.env.GALLERY_THUMBNAIL_HEIGHT || 720),
    baseUrl: process.env.GALLERY_THUMBNAIL_BASE_URL || 'http://localhost:3000',
    baseUrlSource: process.env.GALLERY_THUMBNAIL_BASE_URL ? 'env' : 'default',
    includeSecondary: false,
    includeDeprecated: false,
    smartEntry: true,
  }

  for (const raw of argv) {
    if (raw === '--apply') {
      args.apply = true
      args.dryRun = false
      continue
    }
    if (raw === '--dry-run') {
      args.apply = false
      args.dryRun = true
      continue
    }
    if (raw.startsWith('--limit=')) {
      args.limit = Number(raw.split('=', 2)[1]) || 0
      continue
    }
    if (raw.startsWith('--settle-ms=')) {
      args.settleMs = Number(raw.split('=', 2)[1]) || args.settleMs
      continue
    }
    if (raw.startsWith('--width=')) {
      args.width = Number(raw.split('=', 2)[1]) || args.width
      continue
    }
    if (raw.startsWith('--height=')) {
      args.height = Number(raw.split('=', 2)[1]) || args.height
      continue
    }
    if (raw.startsWith('--base-url=')) {
      args.baseUrl = raw.split('=', 2)[1].replace(/^"|"$/g, '')
      args.baseUrlSource = 'arg'
      continue
    }
    if (raw === '--include-secondary') {
      args.includeSecondary = true
      continue
    }
    if (raw === '--include-deprecated') {
      args.includeDeprecated = true
      continue
    }
    if (raw === '--strict-entry') {
      args.smartEntry = false
      continue
    }
  }

  return args
}

function normalizeWebPath(input: string): string {
  const slash = input.replace(/\\/g, '/')
  return slash.replace(/^\/+/, '')
}

function normalizeFsPath(input: string): string {
  return normalizeWebPath(input).replace(/\//g, path.sep)
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function scoreHtmlName(name: string): number {
  const lower = name.toLowerCase()
  let score = 0
  if (lower.includes('app-v2')) score += 40
  if (lower === 'app.html') score += 30
  if (lower.includes('index')) score += 22
  if (lower.includes('demo')) score += 18
  if (lower.includes('main')) score += 16
  if (lower.includes('preview')) score -= 30
  return score
}

function collectCandidateEntryPaths(entryHtml: string, root: string): string[] {
  const entryRel = normalizeWebPath(entryHtml)
  const entryDir = path.dirname(entryRel)
  const entryAbsDir = path.join(root, 'public', normalizeFsPath(entryDir))

  if (!fs.existsSync(entryAbsDir)) {
    return [entryRel]
  }

  const htmlFiles = fs
    .readdirSync(entryAbsDir)
    .filter((name) => name.toLowerCase().endsWith('.html'))
    .sort((a, b) => scoreHtmlName(b) - scoreHtmlName(a) || a.localeCompare(b))

  if (!htmlFiles.length) {
    return [entryRel]
  }

  const normalized = htmlFiles.map((name) => normalizeWebPath(path.join(entryDir, name)))
  const set = new Set<string>([entryRel, ...normalized])
  return Array.from(set)
}

type RenderProbe = {
  placeholderLikely: boolean
  richnessScore: number
  details: string
}

async function probePageVisualRichness(page: Page): Promise<RenderProbe> {
  return page.evaluate(() => {
    const text = (document.body?.innerText || '').toLowerCase()
    const canvasCount = document.querySelectorAll('canvas').length
    const svgCount = document.querySelectorAll('svg').length
    const imgCount = document.querySelectorAll('img').length
    const videoCount = document.querySelectorAll('video').length
    const cardCount = document.querySelectorAll('.card').length
    const elementCount = document.querySelectorAll('*').length

    const hasDescriptionOnly = /\bdescription\b/.test(text)
    const hasAiStudioPlaceholder = /run and deploy your ai studio app/.test(text)
    const hasStandalonePlaceholderHint = /interactive preview not available/.test(text)

    const placeholderLikely =
      hasAiStudioPlaceholder ||
      hasStandalonePlaceholderHint ||
      (hasDescriptionOnly && cardCount > 0 && elementCount < 220 && canvasCount === 0 && svgCount < 2)

    const richnessScore =
      canvasCount * 11 + svgCount * 6 + videoCount * 8 + imgCount * 2 + Math.round(elementCount / 120)

    return {
      placeholderLikely,
      richnessScore,
      details: `elements=${elementCount}, canvas=${canvasCount}, svg=${svgCount}, img=${imgCount}, video=${videoCount}, card=${cardCount}`,
    }
  })
}

async function assertBaseUrlReachable(baseUrl: string): Promise<void> {
  const target = `${baseUrl.replace(/\/+$/, '')}/gallery`
  await new Promise<void>((resolve, reject) => {
    const url = new URL(target)
    const protocol = url.protocol === 'https:' ? https : http

    const req = protocol.get(target, (res) => {
      const code = Number(res.statusCode || 0)
      if (code >= 200 && code < 500) {
        resolve()
      } else {
        reject(new Error(`Unexpected status ${code} from ${target}`))
      }
      res.resume()
    })

    req.on('error', reject)
    req.setTimeout(8000, () => {
      req.destroy(new Error(`Timeout connecting to ${target}`))
    })
  })
}

function isLoopbackHostname(hostname: string): boolean {
  const lower = hostname.toLowerCase()
  return lower === 'localhost' || lower === '127.0.0.1' || lower === '::1'
}

/**
 * When the configured base URL is unreachable, we can serve `public/` from a temp HTTP server.
 * Applies to any loopback URL (localhost / 127.0.0.1 / ::1), whether from default, env, or --base-url.
 * Remote URLs (staging/prod) must be up — we do not fall back for those.
 */
function canAutoStartLocalStaticServer(args: CliArgs): boolean {
  try {
    const url = new URL(args.baseUrl)
    return (url.protocol === 'http:' || url.protocol === 'https:') && isLoopbackHostname(url.hostname)
  } catch {
    return false
  }
}

function contentTypeFor(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()

  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8'
    case '.css':
      return 'text/css; charset=utf-8'
    case '.js':
    case '.mjs':
      return 'application/javascript; charset=utf-8'
    case '.json':
      return 'application/json; charset=utf-8'
    case '.svg':
      return 'image/svg+xml'
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.gif':
      return 'image/gif'
    case '.webp':
      return 'image/webp'
    case '.ico':
      return 'image/x-icon'
    case '.woff':
      return 'font/woff'
    case '.woff2':
      return 'font/woff2'
    case '.ttf':
      return 'font/ttf'
    case '.map':
      return 'application/json; charset=utf-8'
    case '.txt':
      return 'text/plain; charset=utf-8'
    default:
      return 'application/octet-stream'
  }
}

type StaticServerHandle = {
  baseUrl: string
  close: () => Promise<void>
}

async function startStaticPublicServer(root: string): Promise<StaticServerHandle> {
  const publicRoot = path.join(root, 'public')

  const server = http.createServer((req, res) => {
    const method = req.method || 'GET'
    if (method !== 'GET' && method !== 'HEAD') {
      res.statusCode = 405
      res.setHeader('Allow', 'GET, HEAD')
      res.end('Method Not Allowed')
      return
    }

    const requestUrl = req.url || '/'
    const pathname = decodeURIComponent(new URL(requestUrl, 'http://127.0.0.1').pathname)
    const normalizedPath = path.normalize(pathname.replace(/^\/+/, ''))
    const candidatePath = path.resolve(publicRoot, normalizedPath)
    const publicRootWithSep = `${path.resolve(publicRoot)}${path.sep}`

    if (candidatePath !== path.resolve(publicRoot) && !candidatePath.startsWith(publicRootWithSep)) {
      res.statusCode = 403
      res.end('Forbidden')
      return
    }

    let filePath = candidatePath
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html')
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      res.statusCode = 404
      res.end('Not Found')
      return
    }

    res.statusCode = 200
    res.setHeader('Content-Type', contentTypeFor(filePath))

    if (method === 'HEAD') {
      res.end()
      return
    }

    const stream = fs.createReadStream(filePath)
    stream.on('error', (error) => {
      res.statusCode = 500
      res.end(error instanceof Error ? error.message : 'File read error')
    })
    stream.pipe(res)
  })

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject)
      resolve()
    })
  })

  const address = server.address()
  if (!address || typeof address === 'string') {
    await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
    throw new Error('Could not determine static server address.')
  }

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error)
            return
          }
          resolve()
        })
      }),
  }
}

function formatReachabilityError(originalError: unknown): string {
  if (originalError instanceof AggregateError && Array.isArray(originalError.errors) && originalError.errors.length) {
    return originalError.errors.map((e) => (e instanceof Error ? e.message : String(e))).join('; ')
  }
  if (originalError instanceof Error) {
    return originalError.message
  }
  return String(originalError)
}

function buildBaseUrlFailureMessage(baseUrl: string, originalError: unknown): string {
  const details = formatReachabilityError(originalError)
  return [
    `Could not reach gallery base URL: ${baseUrl}`,
    `Details: ${details}`,
    'For localhost: ensure `npm run dev` is running on that port, or rely on the script’s automatic fallback to a temporary static server from `public/` (loopback URLs only).',
    'Otherwise set `--base-url=` / `GALLERY_THUMBNAIL_BASE_URL` to a reachable server.',
  ].join('\n')
}

type ResolvedBaseUrl = {
  baseUrl: string
  cleanup: () => Promise<void>
}

async function resolveBaseUrl(args: CliArgs, root: string): Promise<ResolvedBaseUrl> {
  try {
    await assertBaseUrlReachable(args.baseUrl)
    return {
      baseUrl: args.baseUrl,
      cleanup: async () => {},
    }
  } catch (error) {
    if (!canAutoStartLocalStaticServer(args)) {
      throw new Error(buildBaseUrlFailureMessage(args.baseUrl, error))
    }

    console.log(`Base URL unavailable at ${args.baseUrl}; starting temporary static server from public\\ ...`)
    const staticServer = await startStaticPublicServer(root)

    try {
      await assertBaseUrlReachable(staticServer.baseUrl)
    } catch (staticError) {
      await staticServer.close()
      throw new Error(buildBaseUrlFailureMessage(staticServer.baseUrl, staticError))
    }

    console.log(`Using temporary static server: ${staticServer.baseUrl}`)
    return {
      baseUrl: staticServer.baseUrl,
      cleanup: staticServer.close,
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const root = process.cwd()

  const manifestPath = path.join(root, 'src', 'data', 'gallery-manifest.json')
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Manifest not found: ${manifestPath}`)
  }

  const parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as ManifestItem[]
  const { visibleItems } = applyCanonicalVisibility(parsed, {
    includeSecondary: args.includeSecondary,
    includeDeprecated: args.includeDeprecated,
  })

  const candidates = visibleItems.filter(
    (item) => typeof item.entryHtml === 'string' && item.entryHtml.length > 0 && typeof item.thumbnailPath === 'string' && item.thumbnailPath.length > 0
  )

  // ── Separate real items from placeholder-only items ──────────────
  const realCandidates: ManifestItem[] = []
  const placeholderCandidates: ManifestItem[] = []

  for (const item of candidates) {
    if (isItemPlaceholderOnly(item.entryHtml, root)) {
      placeholderCandidates.push(item)
    } else {
      realCandidates.push(item)
    }
  }

  // Delete existing thumbnails for placeholder items so stale screenshots are removed
  let deletedThumbs = 0
  for (const item of placeholderCandidates) {
    const thumbPath = path.join(root, 'public', 'images', normalizeFsPath(item.thumbnailPath || ''))
    if (fs.existsSync(thumbPath)) {
      fs.unlinkSync(thumbPath)
      deletedThumbs++
    }
  }

  const selected = args.limit > 0 ? realCandidates.slice(0, args.limit) : realCandidates

  console.log('Gallery thumbnail regeneration')
  console.log('------------------------------')
  console.log(`Mode: ${args.apply ? 'APPLY' : 'DRY-RUN'}`)
  console.log(`Base URL: ${args.baseUrl}`)
  console.log(`Viewport: ${args.width}x${args.height}`)
  console.log(`Settle delay: ${args.settleMs}ms`)
  console.log(`Smart entry selection: ${args.smartEntry ? 'ON' : 'OFF (strict manifest entryHtml)'}`)
  console.log(`Placeholder items skipped: ${placeholderCandidates.length} (${deletedThumbs} stale thumbnails deleted)`)
  console.log(`Real candidates: ${selected.length} (from ${candidates.length} total active items)`)
  console.log(
    '(If nothing is listening on your base URL, loopback hosts fall back to a temporary static server from public/.)'
  )
  console.log('')

  const resolvedBase = await resolveBaseUrl(args, root)
  const activeBaseUrl = resolvedBase.baseUrl

  try {
    if (!args.apply) {
      for (const item of selected.slice(0, 30)) {
        const entryOptions = args.smartEntry
          ? collectCandidateEntryPaths(item.entryHtml || '', root)
          : [normalizeWebPath(item.entryHtml || '')]

        const entryUrl = `${activeBaseUrl.replace(/\/+$/, '')}/${entryOptions[0]}`
        const outPath = path.join(root, 'public', 'images', normalizeFsPath(item.thumbnailPath || ''))
        console.log(`Would capture: ${item.id}`)
        console.log(`  URL: ${entryUrl}`)
        console.log(`  OUT: ${outPath}`)
        if (entryOptions.length > 1) {
          console.log(`  Alternatives: ${entryOptions.slice(1, 4).join(', ')}`)
        }
      }

      if (selected.length > 30) {
        console.log(`... and ${selected.length - 30} more`)
      }

      return
    }

    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: {
        width: args.width,
        height: args.height,
        deviceScaleFactor: 2,
      },
    })

    let success = 0
    let failed = 0

    try {
      const page = await browser.newPage()
      page.setDefaultNavigationTimeout(120000)
      page.setDefaultTimeout(120000)

      for (const [idx, item] of selected.entries()) {
        const entryOptions = args.smartEntry
          ? collectCandidateEntryPaths(item.entryHtml || '', root)
          : [normalizeWebPath(item.entryHtml || '')]

        let chosenRelPath = entryOptions[0]
        let chosenProbe: RenderProbe | null = null

        for (const entryRelPath of entryOptions.slice(0, 6)) {
          const entryUrlCandidate = `${activeBaseUrl.replace(/\/+$/, '')}/${entryRelPath}`

          try {
            await page.goto(entryUrlCandidate, {
              waitUntil: 'domcontentloaded',
              timeout: 120000,
            })

            await sleep(args.settleMs)

            const probe = await probePageVisualRichness(page)
            if (!chosenProbe) {
              chosenProbe = probe
              chosenRelPath = entryRelPath
            }

            if (!probe.placeholderLikely) {
              const shouldPromote =
                !chosenProbe || chosenProbe.placeholderLikely || probe.richnessScore >= chosenProbe.richnessScore
              if (shouldPromote) {
                chosenProbe = probe
                chosenRelPath = entryRelPath
              }
            }
          } catch {
            // Ignore failed alternatives; main try/catch handles failure if nothing works.
          }
        }

        const entryUrl = `${activeBaseUrl.replace(/\/+$/, '')}/${chosenRelPath}`
        const outPath = path.join(root, 'public', 'images', normalizeFsPath(item.thumbnailPath || ''))

        // Runtime safety: if the best candidate still looks like a placeholder, skip & clean up
        if (chosenProbe?.placeholderLikely) {
          if (fs.existsSync(outPath)) fs.unlinkSync(outPath)
          console.log(
            `[${idx + 1}/${selected.length}] SKIP (runtime placeholder) ${item.id} -> ${chosenRelPath}`
          )
          continue
        }

        try {
          fs.mkdirSync(path.dirname(outPath), { recursive: true })

          await page.goto(entryUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 120000,
          })

          await sleep(args.settleMs)

          await page.screenshot({
            path: outPath,
            type: 'png',
            fullPage: false,
          })

          success += 1
          console.log(
            `[${idx + 1}/${selected.length}] OK  ${item.id} -> ${chosenRelPath}${
              chosenProbe ? ` (${chosenProbe.details})` : ''
            }`
          )
        } catch (error) {
          failed += 1
          console.warn(`[${idx + 1}/${selected.length}] FAIL ${item.id}`)
          console.warn(`  ${error instanceof Error ? error.message : String(error)}`)
        }
      }

      console.log('')
      console.log(`Done. Success: ${success}, Failed: ${failed}, Total: ${selected.length}`)

      if (failed > 0) {
        process.exitCode = 2
      }
    } finally {
      await browser.close()
    }
  } finally {
    await resolvedBase.cleanup()
  }
}

main().catch((error) => {
  console.error('Thumbnail regeneration failed:', error)
  process.exit(1)
})
