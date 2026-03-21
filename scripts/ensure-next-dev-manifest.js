/**
 * Guards against "Unexpected end of JSON input" on `npm run dev`.
 *
 * Next.js reads several JSON manifests at startup and parses them with JSON.parse.
 * If any manifest is missing, empty, or truncated — common after interrupted builds,
 * AV scans, or partial `.next` deletes — Next throws "Unexpected end of JSON input".
 *
 * Strategy:
 *  1. Check every *.json file directly inside `.next/` for valid JSON.
 *  2. If any are corrupt/empty, delete the entire `.next/` directory so Next.js
 *     performs a clean rebuild (safest recovery — no stale state).
 *  3. As a fallback, ensure `prerender-manifest.json` is seeded with a minimal
 *     valid document when `.next/` is absent (first-run case).
 */
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const nextDir = path.join(root, '.next')

/** Minimal valid prerender-manifest required by next-dev-server on first run. */
function minimalPrerenderManifest() {
  return (
    JSON.stringify(
      {
        version: 4,
        routes: {},
        dynamicRoutes: {},
        notFoundRoutes: [],
        preview: {
          previewModeId: '00000000000000000000000000000000',
          previewModeSigningKey:
            '0000000000000000000000000000000000000000000000000000000000000000',
          previewModeEncryptionKey:
            '0000000000000000000000000000000000000000000000000000000000000000',
        },
      },
      null,
      2
    ) + '\n'
  )
}

/** Returns true if the file is missing, unreadable, empty, or not valid JSON. */
function isCorrupt(filePath) {
  if (!fs.existsSync(filePath)) return false // missing is handled separately
  let raw
  try {
    raw = fs.readFileSync(filePath, 'utf8')
  } catch {
    return true
  }
  if (!raw.trim()) return true
  try {
    JSON.parse(raw)
    return false
  } catch {
    return true
  }
}

/** Collect all *.json files directly inside `.next/` (non-recursive for speed). */
function topLevelNextJsonFiles() {
  try {
    return fs
      .readdirSync(nextDir, { withFileTypes: true })
      .filter((e) => e.isFile() && e.name.endsWith('.json'))
      .map((e) => path.join(nextDir, e.name))
  } catch {
    return []
  }
}

function ensureNextDevManifest() {
  // --- Phase 1: wipe .next if any top-level manifest is corrupt ---
  const jsonFiles = topLevelNextJsonFiles()
  const corrupt = jsonFiles.filter((f) => isCorrupt(f))
  if (corrupt.length > 0) {
    console.warn(
      '[ensure-next-dev-manifest] Corrupt manifest(s) detected — clearing .next for clean rebuild:'
    )
    corrupt.forEach((f) => console.warn('  ', path.relative(root, f)))
    try {
      fs.rmSync(nextDir, { recursive: true, force: true })
      console.warn('[ensure-next-dev-manifest] .next cleared — Next.js will rebuild from scratch.')
    } catch (err) {
      console.warn('[ensure-next-dev-manifest] Could not remove .next:', err.message)
    }
    // After wipe, fall through to seed `prerender-manifest.json` below.
  }

  // --- Phase 2: seed prerender-manifest.json when .next doesn't exist yet ---
  const prerenderPaths = [
    path.join(nextDir, 'prerender-manifest.json'),
    path.join(nextDir, 'dev', 'prerender-manifest.json'),
  ]
  for (const manifestPath of prerenderPaths) {
    if (fs.existsSync(manifestPath)) continue
    try {
      fs.mkdirSync(path.dirname(manifestPath), { recursive: true })
      fs.writeFileSync(manifestPath, minimalPrerenderManifest(), 'utf8')
    } catch {
      /* ignore — e.g. file locked or Next.js will create it itself */
    }
  }
}

if (require.main === module) {
  ensureNextDevManifest()
}

module.exports = { ensureNextDevManifest }
