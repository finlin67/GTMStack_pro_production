/**
 * Validates Stitch HTML exports + optional *.meta.json files.
 *
 * Run from project root:
 *   node sandbox/stitch-html/validate-stitch-meta.js
 *
 * What it checks:
 * - Lists all *.html files under sandbox/stitch-html
 * - For each, checks if a sibling *.meta.json exists (optional)
 * - If present, validates required fields and that referenced output paths look sane
 */
import fs from 'fs/promises'
import path from 'path'

const ROOT = process.cwd()
const STITCH_DIR = path.join(ROOT, 'sandbox', 'stitch-html')

async function fileExists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function walkHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const results = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      results.push(...(await walkHtmlFiles(full)))
    } else if (e.isFile() && e.name.toLowerCase().endsWith('.html')) {
      results.push(full)
    }
  }
  return results
}

function rel(p) {
  return path.relative(ROOT, p).replaceAll('\\', '/')
}

function metaPathForHtml(htmlPath) {
  const dir = path.dirname(htmlPath)
  const base = path.basename(htmlPath, '.html')
  return path.join(dir, `${base}.meta.json`)
}

function isRepoRelativePath(p) {
  return typeof p === 'string' && !p.startsWith('http') && !path.isAbsolute(p)
}

function validateMeta(meta, metaRel) {
  const errors = []
  if (!meta || typeof meta !== 'object') errors.push('meta must be an object')
  if (!meta.route || typeof meta.route !== 'string') errors.push('route (string) is required')
  if (!meta.templateOutput || typeof meta.templateOutput !== 'string')
    errors.push('templateOutput (string) is required')

  if (meta.templateOutput && !isRepoRelativePath(meta.templateOutput)) {
    errors.push('templateOutput must be a repo-relative path like src/templates/... (not absolute)')
  }
  if (meta.contentOutput && !isRepoRelativePath(meta.contentOutput)) {
    errors.push('contentOutput must be repo-relative path like content/... (not absolute)')
  }
  if (meta.iconStrategy && !['keep-material-symbols', 'swap-to-lucide'].includes(meta.iconStrategy)) {
    errors.push('iconStrategy must be keep-material-symbols or swap-to-lucide')
  }

  return errors.map((e) => `${metaRel}: ${e}`)
}

async function main() {
  const htmlFiles = await walkHtmlFiles(STITCH_DIR)
  htmlFiles.sort()

  console.log(`Found ${htmlFiles.length} Stitch HTML files.`)

  const missingMeta = []
  const invalidMeta = []

  for (const html of htmlFiles) {
    const metaPath = metaPathForHtml(html)
    const htmlRel = rel(html)
    const metaRel = rel(metaPath)

    const hasMeta = await fileExists(metaPath)
    if (!hasMeta) {
      missingMeta.push(metaRel)
      continue
    }

    try {
      const raw = await fs.readFile(metaPath, 'utf-8')
      const parsed = JSON.parse(raw)
      const errors = validateMeta(parsed, metaRel)
      if (errors.length) invalidMeta.push(...errors)
    } catch (err) {
      invalidMeta.push(`${metaRel}: JSON parse error: ${err.message}`)
    }

    // Basic signal to show pairing
    console.log(`OK meta: ${metaRel} ↔ ${htmlRel}`)
  }

  console.log('')
  if (missingMeta.length) {
    console.log(`Missing meta for ${missingMeta.length} html files (meta is optional):`)
    for (const m of missingMeta) console.log(`- ${m}`)
    console.log('')
  }
  if (invalidMeta.length) {
    console.log('Invalid meta files:')
    for (const e of invalidMeta) console.log(`- ${e}`)
    process.exitCode = 1
  } else {
    console.log('All present meta files are valid.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

