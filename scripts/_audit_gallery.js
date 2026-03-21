/* eslint-disable */
// Temporary audit script — delete after use
const fs = require('fs')
const path = require('path')

const manifest = JSON.parse(fs.readFileSync('src/data/gallery-manifest.json', 'utf8'))
const animTs = fs.readFileSync('src/data/animations.ts', 'utf8')

// Extract id: 'value' from animations.ts
const idMatches = animTs.match(/\bid:\s*['"][^'"]+['"]/g) || []
const registryIds = idMatches.map(m => m.replace(/\bid:\s*['"]/, '').replace(/['"]$/, ''))
console.log('Registry IDs found:', registryIds.length)
console.log('Sample:', registryIds.slice(0, 8).join(', '))

const idSet = new Set(registryIds)

const MAP = {
  'marketing-analytics-carousel-v3': 'marketing-analytics-carousel',
  'edu-marketers-dashboard-v2': 'edu-marketers-dashboard',
  'executive-logistics-dashboard-v3': 'executive-logistics-dashboard',
  'executive-logistics-dashboard-v2': 'executive-logistics-dashboard',
  'marketing-automation-live-feed-v2': 'marketing-automation-live-feed',
  'abm-radar-analysis-v2': 'abm-radar-analysis',
  'abm-network-dashboard-v2': 'abm-network-dashboard',
  'experience-dashboard-v2': 'demand-gen-flow',
  'live-email-automation-ecosystem-v3': 'live-email-automation',
  'live-email-automation-ecosystem-v2': 'live-email-automation',
  'video-marketing-analytics-dashboard-v2': 'video-marketing-analytics',
  'nexus-ai-stakeholder-portal-v2': 'nexus-stakeholder-portal',
  'content-engagement-marketing-dashboard-v2': 'content-engagement-marketing',
  'abm-pipeline-strategy-dashboard-v2': 'abm-pipeline-strategy',
  'abm-pipeline-strategy-dashboard': 'abm-pipeline-strategy',
}

function normalizeForFallback(v) {
  return String(v).trim().toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/-v\d+$/i, '')
    .replace(/^dashboard-tiles-/, '')
    .replace(/^industries-/, '')
    .replace(/^expertisehero-/, '')
    .replace(/^dashboard-/, '')
}

const normMap = new Map(registryIds.map(rid => [normalizeForFallback(rid), rid]))

const resolveStats = { explicit: 0, exact: 0, fallback: 0, unresolved: 0 }
const unresolvedList = []
const resolvedItems = []

manifest.forEach(item => {
  let rid = MAP[item.id] || (item.animationId ? MAP[item.animationId] : null)
  if (rid) { resolveStats.explicit++; resolvedItems.push({ id: item.id, registryId: rid, method: 'explicit' }); return }
  if (idSet.has(item.id)) { resolveStats.exact++; resolvedItems.push({ id: item.id, registryId: item.id, method: 'exact' }); return }
  if (item.animationId && idSet.has(item.animationId)) { resolveStats.exact++; resolvedItems.push({ id: item.id, registryId: item.animationId, method: 'animationId' }); return }
  const nk = normalizeForFallback(item.id)
  if (normMap.has(nk)) { resolveStats.fallback++; resolvedItems.push({ id: item.id, registryId: normMap.get(nk), method: 'fallback' }); return }
  resolveStats.unresolved++
  unresolvedList.push(item.id)
})

console.log('\nResolution stats across all', manifest.length, 'items:')
console.log(JSON.stringify(resolveStats, null, 2))
console.log('\nUnresolved (iframe+thumbnail fallback only):', unresolvedList.length)
unresolvedList.forEach(id => console.log(' ', id))

// Quality issues
const staleTitle = manifest.filter(i => i.title && i.title.includes('AI Studio'))
const nullSummary = manifest.filter(i => !i.summary)
const emojiTitle = manifest.filter(i => i.title && /[\u{1F300}-\u{1FFFF}]/u.test(i.title))
const duplicatePrefixed = manifest.filter(i => /^(industries-|dashboard-tiles-|expertisehero-)/.test(i.id))

console.log('\n--- Quality Issues ---')
console.log('Stale AI Studio titles:', staleTitle.length, '->', staleTitle.map(i => i.id).join(', '))
console.log('Null/empty summary:', nullSummary.length)
console.log('Emoji titles:', emojiTitle.length, '->', emojiTitle.map(i => i.id).join(', '))
console.log('Prefixed duplicates:', duplicatePrefixed.length, '->', duplicatePrefixed.map(i => i.id).slice(0, 10).join(', '))

// Duplicate detection: find items where stripping prefix matches another id
const bareIds = new Set(manifest.map(i => i.id))
const prefixPatterns = [/^industries-/, /^dashboard-tiles-/, /^expertisehero-/]
const trueduplicates = []
manifest.forEach(item => {
  for (const pat of prefixPatterns) {
    if (pat.test(item.id)) {
      const bare = item.id.replace(pat, '')
      if (bareIds.has(bare)) {
        trueduplicates.push({ prefixed: item.id, canonical: bare })
      }
    }
  }
})
console.log('\nTrue duplicates (prefixed + canonical both exist):', trueduplicates.length)
trueduplicates.forEach(d => console.log(' ', d.prefixed, '->', d.canonical))

// Show a QA table of first 20 items
console.log('\n--- QA Table: First 20 items ---')
console.log('ID | hasThumb | thumbExists | hasEntry | entryExists | registryResolved | title')
manifest.slice(0, 20).forEach(item => {
  const thumbFile = item.thumbnailPath ? path.join(process.cwd(), 'public', 'images', item.thumbnailPath) : null
  const thumbExists = thumbFile ? fs.existsSync(thumbFile) : false
  const entryFile = item.entryHtml ? path.join(process.cwd(), 'public', item.entryHtml.replace(/^\/+/, '')) : null
  const entryExists = entryFile ? fs.existsSync(entryFile) : false
  const resolved = resolvedItems.find(r => r.id === item.id)
  const regStatus = resolved ? resolved.registryId + '(' + resolved.method + ')' : 'UNRESOLVED'
  console.log([
    item.id,
    item.thumbnailPath ? 'Y' : 'N',
    thumbExists ? 'Y' : 'N',
    item.entryHtml ? 'Y' : 'N',
    entryExists ? 'Y' : 'N',
    regStatus,
    item.title
  ].join(' | '))
})
