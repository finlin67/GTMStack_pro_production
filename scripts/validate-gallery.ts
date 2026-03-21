/**
 * scripts/validate-gallery.ts
 * Run via: npm run validate:gallery
 *
 * Checks gallery-manifest.json for integrity issues:
 *  - duplicate id / slug
 *  - missing required fields (id, slug, title, category, githubUrl)
 *  - placeholder / AI Studio titles
 *  - placeholder / bare summaries
 *  - placeholder tags spill-over
 *  - every referenced thumbnail / entryHtml exists under public/
 *
 * Exits with code 1 if any blocking issues are found; prints a table of results.
 */

import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'gallery-manifest.json')

// ---------------------------------------------------------------------------
// Reusable matchers (mirrors normalisation logic in src/lib/galleryManifest.ts)
// ---------------------------------------------------------------------------

const PLACEHOLDER_TITLE = /^Run and deploy your AI Studio app\s*$/i
const PLACEHOLDER_SUMMARY =
  /Run and deploy your AI Studio app|This contains everything you need to run your app locally|Gallery thumbnail placeholder \(Option B\)|^\s*Description\s*$/i
const PLACEHOLDER_TAG_WORDS = new Set(['run', 'deploy', 'your', 'studio'])
const EMOJI_LEADING = /^[\u{1F300}-\u{1FFFF}\u{2600}-\u{27BF}]+\s*/u

type ManifestItem = {
  id: string
  slug: string
  animationId?: string
  title: string
  category: string
  tags: string[]
  summary?: string | null
  projectPath: string
  entryHtml?: string
  thumbnailPath?: string
  githubUrl: string
  githubReadmeUrl?: string
  updatedAt?: string | null
}

type IssueSeverity = 'error' | 'warn'

type Issue = {
  id: string
  field: string
  severity: IssueSeverity
  message: string
}

function exists(relativePath: string): boolean {
  return fs.existsSync(path.join(ROOT, 'public', relativePath.replace(/^\/+/, '')))
}

function validate(items: ManifestItem[]): Issue[] {
  const issues: Issue[] = []
  const seenIds = new Map<string, number>()
  const seenSlugs = new Map<string, number>()

  items.forEach((item, idx) => {
    const loc = item.id || `index[${idx}]`

    // --- Duplicates ---
    if (seenIds.has(item.id)) {
      issues.push({ id: loc, field: 'id', severity: 'error', message: `Duplicate id "${item.id}" (first at index ${seenIds.get(item.id)})` })
    } else {
      seenIds.set(item.id, idx)
    }

    if (item.slug) {
      if (seenSlugs.has(item.slug)) {
        issues.push({ id: loc, field: 'slug', severity: 'error', message: `Duplicate slug "${item.slug}" (first at index ${seenSlugs.get(item.slug)})` })
      } else {
        seenSlugs.set(item.slug, idx)
      }
    }

    // --- Required fields present ---
    for (const field of ['id', 'slug', 'title', 'category', 'githubUrl'] as const) {
      if (!item[field]) {
        issues.push({ id: loc, field, severity: 'error', message: `Missing required field "${field}"` })
      }
    }

    // --- Title quality ---
    if (item.title) {
      if (PLACEHOLDER_TITLE.test(item.title)) {
        issues.push({ id: loc, field: 'title', severity: 'error', message: `Placeholder title: "${item.title}"` })
      }
      if (EMOJI_LEADING.test(item.title)) {
        issues.push({ id: loc, field: 'title', severity: 'warn', message: `Title starts with emoji: "${item.title}"` })
      }
    }

    // --- Summary quality ---
    if (item.summary != null && PLACEHOLDER_SUMMARY.test(item.summary)) {
      issues.push({ id: loc, field: 'summary', severity: 'warn', message: `Placeholder summary text detected` })
    }
    if (!item.summary) {
      issues.push({ id: loc, field: 'summary', severity: 'warn', message: `Missing summary (will derive fallback at runtime)` })
    }

    // --- Tag quality ---
    const badTags = (item.tags || []).filter((t) => PLACEHOLDER_TAG_WORDS.has(t.toLowerCase()))
    if (badTags.length) {
      issues.push({ id: loc, field: 'tags', severity: 'warn', message: `Suspected placeholder tag words: ${badTags.join(', ')}` })
    }

    // --- Asset resolution ---
    if (item.thumbnailPath && !exists(item.thumbnailPath)) {
      issues.push({ id: loc, field: 'thumbnailPath', severity: 'warn', message: `Thumbnail not found in public/: ${item.thumbnailPath}` })
    }
    if (item.entryHtml && !exists(item.entryHtml)) {
      issues.push({ id: loc, field: 'entryHtml', severity: 'warn', message: `Entry HTML not found in public/: ${item.entryHtml}` })
    }
  })

  return issues
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(`[validate:gallery] gallery-manifest.json not found at ${MANIFEST_PATH}`)
    process.exit(1)
  }

  let items: ManifestItem[]
  try {
    items = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')) as ManifestItem[]
  } catch (e) {
    console.error('[validate:gallery] Failed to parse gallery-manifest.json:', e)
    process.exit(1)
  }

  const issues = validate(items)
  const errors = issues.filter((i) => i.severity === 'error')
  const warnings = issues.filter((i) => i.severity === 'warn')

  // Render table
  const colWidth = { id: 48, field: 16, sev: 7 }
  const hr = '-'.repeat(colWidth.id + colWidth.field + colWidth.sev + 4 + 60)

  console.log(`\n[validate:gallery] ${items.length} items — ${errors.length} errors, ${warnings.length} warnings\n`)
  console.log(hr)
  console.log(
    'ID'.padEnd(colWidth.id) +
    'FIELD'.padEnd(colWidth.field) +
    'SEV'.padEnd(colWidth.sev) +
    'MESSAGE'
  )
  console.log(hr)

  for (const issue of issues) {
    console.log(
      issue.id.slice(0, colWidth.id - 1).padEnd(colWidth.id) +
      issue.field.padEnd(colWidth.field) +
      issue.severity.padEnd(colWidth.sev) +
      issue.message
    )
  }

  console.log(hr)
  console.log(`\nResult: ${errors.length === 0 ? '✓ PASS' : `✗ FAIL (${errors.length} errors)`}`)

  if (errors.length > 0) {
    process.exit(1)
  }
}

main()
