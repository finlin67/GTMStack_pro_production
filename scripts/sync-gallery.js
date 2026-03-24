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
    copyEntryHtml: false,
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
    if (raw === '--copy-entry-html') {
      args.copyEntryHtml = true
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

function readTextSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch {
    return ''
  }
}

function isPlaceholderPreviewHtmlSource(filePath) {
  const source = readTextSafe(filePath)
  if (!source) return false

  return (
    source.includes('Gallery thumbnail placeholder (Option B)') ||
    source.includes('Run and deploy your AI Studio app') ||
    source.includes('This contains everything you need to run your app locally.')
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
  --copy-entry-html  (copy entryHtml + local assets into public/ for iframe fallback)
`)
    process.exit(0)
  }

  const websiteRepoRoot = process.cwd()
  const animationsRepoRoot = path.resolve(args.animationsRepo)

  const manifestSrc = path.resolve(animationsRepoRoot, args.manifestIn)
  const manifestDest = path.resolve(websiteRepoRoot, args.manifestOut)

  const imagesOutRoot = path.resolve(websiteRepoRoot, args.imagesOutRoot)
  const publicOutRoot = path.resolve(websiteRepoRoot, 'public')

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

  // Optional: copy entryHtml + local assets for iframe-based modal fallback.
  if (args.copyEntryHtml) {
    console.log('')
    console.log('Entry HTML (iframe fallback)')
    console.log('------------------------------')

    const entryItems = validItems.filter((i) => typeof i.entryHtml === 'string' && i.entryHtml.length > 0)
    const entryCounters = {
      referenced: entryItems.length,
      copied: 0,
      overwrites: 0,
      missing: 0,
      skippedPlaceholder: 0,
    }
    const missingEntrySources = []
    const skippedPlaceholderSources = []

    const allowedExt = new Set([
      '.html',
      '.js',
      '.mjs',
      '.cjs',
      '.css',
      '.png',
      '.jpg',
      '.jpeg',
      '.webp',
      '.gif',
      '.svg',
      '.map',
      '.json',
      '.woff',
      '.woff2',
      '.ttf',
      '.eot',
      '.txt',
    ])
    const skipDirNames = new Set(['node_modules', '.next', 'dist', 'build', 'out', '.git'])

    function shouldCopyFile(fileName) {
      const ext = path.extname(fileName).toLowerCase()
      return allowedExt.has(ext)
    }

    function copyDirAssets({ srcDirAbs, destDirAbs, dryRun, depth, maxDepth }) {
      if (depth > maxDepth) return

      let entries = []
      try {
        entries = fs.readdirSync(srcDirAbs, { withFileTypes: true })
      } catch {
        return
      }

      for (const ent of entries) {
        const srcPath = path.join(srcDirAbs, ent.name)
        const destPath = path.join(destDirAbs, ent.name)

        if (ent.isDirectory()) {
          if (skipDirNames.has(ent.name)) continue
          copyDirAssets({
            srcDirAbs: srcPath,
            destDirAbs: destPath,
            dryRun,
            depth: depth + 1,
            maxDepth,
          })
          continue
        }

        if (!ent.isFile()) continue
        if (!shouldCopyFile(ent.name)) continue

        const perFileCounters = { copied: 0, overwrites: 0 }
        copyFileWithLogs({
          src: srcPath,
          dest: destPath,
          dryRun,
          label: `asset (${ent.name})`,
          counters: perFileCounters,
        })
        entryCounters.copied += perFileCounters.copied
        entryCounters.overwrites += perFileCounters.overwrites
      }
    }

    for (const item of entryItems) {
      const entryRel = item.entryHtml.replace(/\\/g, '/')
      const srcEntry = path.resolve(animationsRepoRoot, entryRel)
      const destEntry = path.resolve(publicOutRoot, entryRel)

      if (!fs.existsSync(srcEntry)) {
        entryCounters.missing += 1
        missingEntrySources.push({ id: item.id, srcEntry })
        continue
      }

      if (isPlaceholderPreviewHtmlSource(srcEntry)) {
        entryCounters.skippedPlaceholder += 1
        skippedPlaceholderSources.push({ id: item.id, srcEntry })
        console.log(`- Skipping placeholder entryHtml (${item.id})`)
        console.log(`  from: ${srcEntry}`)
        console.log('  reason: detected AI Studio placeholder HTML; not copying into public/animations')
        continue
      }

      const perFileCounters = { copied: 0, overwrites: 0 }
      copyFileWithLogs({
        src: srcEntry,
        dest: destEntry,
        dryRun: !args.apply,
        label: `entryHtml (${item.id})`,
        counters: perFileCounters,
      })
      entryCounters.copied += perFileCounters.copied
      entryCounters.overwrites += perFileCounters.overwrites

      const entryDirAbs = path.dirname(srcEntry)
      const destDirAbs = path.dirname(destEntry)
      copyDirAssets({
        srcDirAbs: entryDirAbs,
        destDirAbs: destDirAbs,
        dryRun: !args.apply,
        depth: 0,
        maxDepth: 2,
      })
    }

    if (missingEntrySources.length) {
      console.log('')
      console.log('Missing entryHtml (source not found)')
      console.log('-------------------------------------')
      for (const miss of missingEntrySources.slice(0, 50)) {
        console.log(`- ${miss.id}: ${miss.srcEntry}`)
      }
      if (missingEntrySources.length > 50) {
        console.log(`... and ${missingEntrySources.length - 50} more`)
      }
    }

    if (skippedPlaceholderSources.length) {
      console.log('')
      console.log('Skipped placeholder entryHtml')
      console.log('----------------------------')
      for (const skip of skippedPlaceholderSources.slice(0, 50)) {
        console.log(`- ${skip.id}: ${skip.srcEntry}`)
      }
      if (skippedPlaceholderSources.length > 50) {
        console.log(`... and ${skippedPlaceholderSources.length - 50} more`)
      }
    }

    console.log('')
    console.log('Entry HTML Summary')
    console.log('------------------')
    console.log(`- Entry HTML referenced: ${entryCounters.referenced}`)
    console.log(`- Entry HTML assets copied: ${entryCounters.copied}`)
    console.log(`- Entry HTML missing at source: ${entryCounters.missing}`)
    console.log(`- Entry HTML skipped as placeholder: ${entryCounters.skippedPlaceholder}`)
    console.log(`- Overwrites: ${entryCounters.overwrites}`)
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

