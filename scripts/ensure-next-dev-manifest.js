/**
 * Next dev merges generateStaticParams into prerender-manifest.json (see next-dev-server
 * getStaticPaths, JSON.parse on the existing file). If the file is missing, empty, or
 * truncated — common after interrupted builds, AV, or partial .next deletes — Next throws
 * "Unexpected end of JSON input" on `/`.
 *
 * We write a minimal valid manifest instead of deleting: a missing file would otherwise
 * cause readFile ENOENT in the same code path; an empty file causes JSON.parse to throw.
 */
const fs = require('fs')
const path = require('path')

const root = process.cwd()
/** Dev server uses `.next/prerender-manifest.json` (distDir); `.next/dev/` may also appear. */
const manifestPaths = [
  path.join(root, '.next', 'prerender-manifest.json'),
  path.join(root, '.next', 'dev', 'prerender-manifest.json'),
]

function minimalManifestJson() {
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

function ensureDirFor(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

function needsReseed(manifestPath) {
  if (!fs.existsSync(manifestPath)) return true
  let raw
  try {
    raw = fs.readFileSync(manifestPath, 'utf8')
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

function ensureNextDevManifest() {
  for (const manifestPath of manifestPaths) {
    if (!needsReseed(manifestPath)) continue
    try {
      ensureDirFor(manifestPath)
      fs.writeFileSync(manifestPath, minimalManifestJson(), 'utf8')
    } catch {
      /* ignore — e.g. file locked */
    }
  }
}

if (require.main === module) {
  ensureNextDevManifest()
}

module.exports = { ensureNextDevManifest }
