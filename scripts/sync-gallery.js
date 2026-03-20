/**
 * Sync Animation Gallery assets from the local GTMStack-Animations repo.
 *
 * Default behavior is DRY-RUN (no writes).
 * Use --apply to actually copy files.
 *
 * Never deletes anything.
 */

const fs = require('fs')
const path = require('path')

function parseArgs(argv) {
  const args = {
    dryRun: true,
    apply: false,
    animationsRepo: 'C:\\GitProd\\GTMStack_Animations\\gtmstack_animations',
    manifestIn: 'exports/gallery-manifest.json',
    manifestOut: 'src/data/gallery-manifest.json',
    imagesOutRoot: 'public/images',
  }

  for (const raw of argv) {
    if (raw === '--dry-run') {
      args.dryRun = true
      args.apply = false
      continue
    }
    if (raw === '--apply') {
      args.apply = true
      args.dryRun = false
      continue
    }
    if (raw.startsWith('--animations-repo=')) {
      args.animationsRepo = raw.split('=', 2)[1].replace(/^"|"$/g, '')
      continue
    }
    if (raw.startsWith('--manifest-in=')) {
      args.manifestIn = raw.split('=', 2)[1].replace(/^"|"$/g, '')
      continue
    }
    if (raw.startsWith('--manifest-out=')) {
      args.manifestOut = raw.split('=', 2)[1].replace(/^"|"$/g, '')
      continue
    }
    if (raw.startsWith('--images-out-root=')) {
      args.imagesOutRoot = raw.split('=', 2)[1].replace(/^"|"$/g, '')
      continue
    }
    if (raw === '--help' || raw === '-h') {
      args.help = true
      continue
    }
  }

  // Default is dry-run unless explicitly --apply
  if (!args.apply) {
    args.dryRun = true
  }

  return args
}

function ensureDirSync(dirPath, dryRun) {
  if (fs.existsSync(dirPath)) return
  if (dryRun) return
  fs.mkdirSync(dirPath, { recursive: true })
}

function fileSizeSafe(p) {
  try {
    return fs.statSync(p).size
  } catch {
    return null
  }
}

function readJsonOrThrow(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  try {
    return JSON.parse(raw)
  } catch (e) {
    const msg = e && e.message ? e.message : String(e)
    throw new Error(`Invalid JSON in manifest: ${filePath}\n${msg}`)
  }
}

function isLikelyManifestItem(item) {
  return (
    item &&
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.slug === 'string' &&
    typeof item.title === 'string' &&
    typeof item.category === 'string' &&
    Array.isArray(item.tags) &&
    typeof item.projectPath === 'string' &&
    typeof item.entryHtml === 'string' &&
    typeof item.githubUrl === 'string'
  )
}

function copyFileWithLogs({ src, dest, dryRun, label, counters }) {
  const destExists = fs.existsSync(dest)
  const overwrite = destExists
  const action = dryRun ? 'Would copy' : 'Copying'

  if (overwrite) counters.overwrites += 1

  const srcSize = fileSizeSafe(src)
  const destSize = fileSizeSafe(dest)

  console.log(
    `- ${action} ${label}\n  from: ${src}\n  to:   ${dest}${
      overwrite ? ' (overwrite)' : ''
    }${srcSize != null ? `\n  size: ${srcSize} bytes` : ''}${
      destExists && destSize != null ? `\n  was:  ${destSize} bytes` : ''
    }`
  )

  if (dryRun) return

  ensureDirSync(path.dirname(dest), dryRun)
  fs.copyFileSync(src, dest)
  counters.copied += 1
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (args.help) {
    console.log(`
Sync gallery manifest + thumbnails.

Defaults to DRY-RUN (no writes). Use --apply to copy files.

Flags:
  --dry-run (default)
  --apply
  --animations-repo="C:\\GitProd\\GTMStack_Animations\\gtmstack_animations"
  --manifest-in=exports/gallery-manifest.json
  --manifest-out=src/data/gallery-manifest.json
  --images-out-root=public/images
`)
    process.exit(0)
  }

  const websiteRepoRoot = process.cwd()
  const animationsRepoRoot = path.resolve(args.animationsRepo)

  const manifestSrc = path.resolve(animationsRepoRoot, args.manifestIn)
  const manifestDest = path.resolve(websiteRepoRoot, args.manifestOut)

  const imagesOutRoot = path.resolve(websiteRepoRoot, args.imagesOutRoot)

  console.log('GTMStack Gallery Sync')
  console.log('---------------------')
  console.log(`Mode: ${args.apply ? 'APPLY (will write files)' : 'DRY-RUN (no files written)'}`)
  console.log(`Animations repo: ${animationsRepoRoot}`)
  console.log(`Website repo:    ${websiteRepoRoot}`)
  console.log('')

  // Validate manifest exists and is valid JSON
  if (!fs.existsSync(manifestSrc)) {
    console.error(`ERROR: Manifest not found:\n  ${manifestSrc}`)
    process.exit(2)
  }

  let manifestJson
  try {
    manifestJson = readJsonOrThrow(manifestSrc)
  } catch (e) {
    console.error(`ERROR: ${e.message}`)
    process.exit(3)
  }

  if (!Array.isArray(manifestJson)) {
    console.error(`ERROR: Manifest JSON must be an array:\n  ${manifestSrc}`)
    process.exit(4)
  }

  const validItems = manifestJson.filter(isLikelyManifestItem)
  if (validItems.length === 0) {
    console.error(`ERROR: Manifest parsed but contains no valid items.`)
    process.exit(5)
  }

  // Copy manifest
  const manifestCounters = { copied: 0, overwrites: 0 }
  const manifestWouldOverwrite = fs.existsSync(manifestDest)
  console.log('Manifest')
  console.log('--------')
  console.log(
    `- ${args.apply ? 'Will copy' : 'Would copy'} manifest${manifestWouldOverwrite ? ' (overwrite)' : ''}`
  )
  console.log(`  from: ${manifestSrc}`)
  console.log(`  to:   ${manifestDest}`)

  if (args.apply) {
    ensureDirSync(path.dirname(manifestDest), false)
    if (manifestWouldOverwrite) manifestCounters.overwrites += 1
    fs.copyFileSync(manifestSrc, manifestDest)
    manifestCounters.copied += 1
  }

  console.log('')

  // Copy thumbnails
  console.log('Thumbnails')
  console.log('----------')

  const thumbItems = validItems.filter((i) => typeof i.thumbnailPath === 'string' && i.thumbnailPath.length > 0)
  const counters = {
    referenced: thumbItems.length,
    copied: 0,
    overwrites: 0,
    missing: 0,
    skippedNoPath: validItems.length - thumbItems.length,
  }

  const missingSources = []

  for (const item of thumbItems) {
    const thumbRel = item.thumbnailPath.replace(/\\/g, '/')
    const srcThumb = path.resolve(animationsRepoRoot, thumbRel)
    const destThumb = path.resolve(imagesOutRoot, thumbRel)

    if (!fs.existsSync(srcThumb)) {
      counters.missing += 1
      missingSources.push({ id: item.id, srcThumb })
      continue
    }

    const perFileCounters = { copied: 0, overwrites: 0 }
    copyFileWithLogs({
      src: srcThumb,
      dest: destThumb,
      dryRun: !args.apply,
      label: `thumbnail (${item.id})`,
      counters: perFileCounters,
    })
    counters.copied += perFileCounters.copied
    counters.overwrites += perFileCounters.overwrites
  }

  if (missingSources.length) {
    console.log('')
    console.log('Missing thumbnails (source not found)')
    console.log('------------------------------------')
    for (const miss of missingSources.slice(0, 50)) {
      console.log(`- ${miss.id}: ${miss.srcThumb}`)
    }
    if (missingSources.length > 50) {
      console.log(`... and ${missingSources.length - 50} more`)
    }
  }

  console.log('')
  console.log('Summary')
  console.log('-------')
  console.log(`- Manifest: ${args.apply ? 'copied' : 'would copy'}: 1 ${manifestWouldOverwrite ? '(overwrite)' : ''}`)
  console.log(`- Thumbnails referenced: ${counters.referenced}`)
  console.log(`- Thumbnails ${args.apply ? 'copied' : 'would copy'}: ${counters.copied}`)
  console.log(`- Missing thumbnails at source: ${counters.missing}`)
  console.log(`- Overwrites: ${manifestCounters.overwrites + counters.overwrites}`)
  console.log(`- Mode: ${args.apply ? 'APPLY' : 'DRY-RUN'} (never deletes; safe)`)

  // Non-zero exit if missing thumbnails? No. Only if manifest is missing/invalid.
  process.exit(0)
}

main().catch((e) => {
  console.error('ERROR: Unexpected failure.\n', e)
  process.exit(10)
})

