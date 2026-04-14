const fs = require('fs')
const path = require('path')

function parseArgs(argv) {
  const args = {
    inJson: path.join(process.cwd(), 'reports', 'GALLERY_RUNTIME_AUDIT.json'),
    outMd: path.join(process.cwd(), 'reports', 'GALLERY_FIX_QUEUE.md'),
  }

  for (const raw of argv) {
    if (raw.startsWith('--in=')) args.inJson = path.resolve(process.cwd(), raw.split('=', 2)[1])
    else if (raw.startsWith('--out=')) args.outMd = path.resolve(process.cwd(), raw.split('=', 2)[1])
  }
  return args
}

function ensureDirForFile(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function bucketFor(item) {
  if (item.status === 'fail') {
    if (/Card not found/i.test(item.reason)) return 'P0: Card/lookup mismatch'
    if (/Modal did not open/i.test(item.reason)) return 'P0: Modal open failure'
    if (/Iframe preview not ready/i.test(item.reason)) return 'P0: Iframe load failure'
    if (/explicit fallback/i.test(item.reason)) return 'P1: Missing preview source'
    return 'P1: Runtime fail (other)'
  }
  if (item.status === 'warn') {
    if ((item.eventCounts?.consoleErrors || 0) > 0 || (item.eventCounts?.requestFailed || 0) > 0) {
      return 'P2: Runtime warnings (console/network)'
    }
    if (/Thumbnail fallback/i.test(item.reason)) return 'P2: Thumbnail fallback only'
    return 'P3: Review manually'
  }
  return 'P4: Pass'
}

function suggestionFor(bucket) {
  if (bucket.startsWith('P0: Card/lookup')) return 'Check title/searchability, canonical visibility, and card rendering selector.'
  if (bucket.startsWith('P0: Modal open')) return 'Verify card click handler, overlay z-index, and modal mount conditions.'
  if (bucket.startsWith('P0: Iframe load')) return 'Check entryHtml path exists in public/, script errors, and CSP/sandbox constraints.'
  if (bucket.startsWith('P1: Missing preview')) return 'Add valid component mapping or entryHtml, then resync assets.'
  if (bucket.startsWith('P2: Runtime warnings')) return 'Open item in browser, inspect console stack trace, and patch source HTML/JS.'
  if (bucket.startsWith('P2: Thumbnail fallback')) return 'Add component map or entryHtml to move from static thumbnail to interactive preview.'
  return 'Spot-check manually.'
}

function toMd(report, queue) {
  const lines = []
  lines.push('# Gallery Fix Queue')
  lines.push('')
  lines.push(`- Generated: ${new Date().toISOString()}`)
  lines.push(`- Source report: \`${report.source}\``)
  lines.push(`- Total audited: ${report.total}`)
  lines.push(`- Fails: ${report.fails}`)
  lines.push(`- Warnings: ${report.warns}`)
  lines.push(`- Queue size: ${queue.length}`)
  lines.push('')

  const groups = new Map()
  for (const item of queue) {
    if (!groups.has(item.bucket)) groups.set(item.bucket, [])
    groups.get(item.bucket).push(item)
  }

  const orderedBuckets = [
    'P0: Card/lookup mismatch',
    'P0: Modal open failure',
    'P0: Iframe load failure',
    'P1: Missing preview source',
    'P1: Runtime fail (other)',
    'P2: Runtime warnings (console/network)',
    'P2: Thumbnail fallback only',
    'P3: Review manually',
  ]

  for (const bucket of orderedBuckets) {
    const items = groups.get(bucket) || []
    if (!items.length) continue
    lines.push(`## ${bucket} (${items.length})`)
    lines.push('')
    lines.push(`- Action: ${suggestionFor(bucket)}`)
    lines.push('')
    for (const item of items) {
      const ce = item.eventCounts?.consoleErrors || 0
      const rf = item.eventCounts?.requestFailed || 0
      lines.push(`- [ ] \`${item.id}\` — ${item.reason} (consoleErrors=${ce}, requestFailed=${rf})`)
    }
    lines.push('')
  }

  if (!queue.length) {
    lines.push('## Queue')
    lines.push('')
    lines.push('No fixes queued. Runtime audit is clean.')
    lines.push('')
  }

  return lines.join('\n')
}

;(function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!fs.existsSync(args.inJson)) {
    throw new Error(`Runtime audit JSON not found: ${args.inJson}`)
  }

  const raw = JSON.parse(fs.readFileSync(args.inJson, 'utf8'))
  const items = Array.isArray(raw.items) ? raw.items : []
  const queue = items
    .filter((x) => x.status === 'fail' || x.status === 'warn')
    .map((x) => ({ ...x, bucket: bucketFor(x) }))
    .sort((a, b) => a.bucket.localeCompare(b.bucket) || a.id.localeCompare(b.id))

  const report = {
    source: args.inJson,
    total: items.length,
    fails: items.filter((x) => x.status === 'fail').length,
    warns: items.filter((x) => x.status === 'warn').length,
  }

  ensureDirForFile(args.outMd)
  fs.writeFileSync(args.outMd, toMd(report, queue), 'utf8')

  console.log(JSON.stringify({
    ok: true,
    source: args.inJson,
    out: args.outMd,
    total: report.total,
    fails: report.fails,
    warnings: report.warns,
    queue: queue.length,
  }, null, 2))
})()

