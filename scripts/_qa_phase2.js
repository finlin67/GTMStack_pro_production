// Phase 2 final QA — 20 representative items
const fs = require('fs')
const path = require('path')

const manifest = JSON.parse(fs.readFileSync('src/data/gallery-manifest.json', 'utf8'))
const animTs = fs.readFileSync('src/data/animations.ts', 'utf8')
const idMatches = animTs.match(/\bid:\s*'[^']+'/g) || []
const registryIds = idMatches.map(m => m.replace(/\bid:\s*'/, '').replace(/'$/, ''))
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

function resolve(item) {
  let rid = MAP[item.id] || (item.animationId ? MAP[item.animationId] : null)
  if (rid) return { id: rid, method: 'explicit' }
  if (idSet.has(item.id)) return { id: item.id, method: 'exact' }
  if (item.animationId && idSet.has(item.animationId)) return { id: item.animationId, method: 'animationId' }
  return null
}

// Pick 20 representative items: some from each category + some known problem ones
const representativeIds = [
  'marketing-analytics-carousel-v3',       // explicit map
  'live-email-automation-ecosystem-v3',     // explicit map
  'abm-radar-analysis-v2',                  // tiny thumbnail
  'abm-network-dashboard-v2',               // tiny thumbnail
  'abm-pipeline-strategy-dashboard',        // tiny thumbnail + explicit map
  'revops-mesh-dashboard-v2',               // was stale title
  'marketing-revenue-analytics-v2',         // was stale title
  'revenue-systems-data-flow-v2',           // was emoji title
  'sequence-ladder-analytics-tile-v2',      // was emoji title + bad summary
  'insightagency-strategy-dashboard-v2',    // tiny thumbnail + null summary
  'enterprise-sales-motion-dashboard-v2',   // unresolved, normal
  'systems-operations-hero-component-v2',   // unresolved, normal
  'pipeline-command-center-v2',             // unresolved, normal
  'lifecycle-engine-dashboard-v2',          // unresolved, normal
  'wellv3-landing-page-health-journey-tile-v2', // unresolved, industries
  'fintech-growth-studio-animated-sales-tile-v2', // unresolved, industries
  'event-roi-analytics-dashboard-v2',       // events-media
  'content-marketing-kpi-dashboard-v2',     // digital-demand
  'execution-dashboard-v2',                 // may not exist - test
  'abm-flow-premium-tile-v2',               // tiny thumbnail
]

console.log('--- Phase 2 QA Table (20 representative items) ---')
console.log('ID | Title | GridThumb | ThumbSize | EntryHtml | ModalMode | Notes')
console.log('-'.repeat(120))

representativeIds.forEach(targetId => {
  const item = manifest.find(i => i.id === targetId)
  if (!item) { console.log(targetId + ' | NOT IN MANIFEST'); return }

  const thumbFile = item.thumbnailPath
    ? path.join(process.cwd(), 'public', 'images', item.thumbnailPath)
    : null
  const thumbExists = thumbFile && fs.existsSync(thumbFile)
  const thumbSize = thumbExists ? fs.statSync(thumbFile).size : 0
  const thumbStatus = !item.thumbnailPath ? 'NO_PATH'
    : !thumbExists ? 'MISSING'
    : thumbSize < 5000 ? 'PLACEHOLDER(' + thumbSize + 'b)'
    : 'OK(' + Math.round(thumbSize / 1024) + 'KB)'

  const entryFile = item.entryHtml
    ? path.join(process.cwd(), 'public', item.entryHtml.replace(/^\/+/, ''))
    : null
  const entryExists = entryFile && fs.existsSync(entryFile)

  const reg = resolve(item)
  const modalMode = reg
    ? 'COMPONENT(' + reg.id + ')'
    : entryExists ? 'IFRAME'
    : thumbExists && thumbSize >= 5000 ? 'THUMBNAIL'
    : 'COMING_SOON'

  const notes = []
  if (thumbSize > 0 && thumbSize < 5000) notes.push('PLACEHOLDER_THUMB')
  if (!item.summary) notes.push('NULL_SUMMARY')
  if (item.title === item.id) notes.push('ID_AS_TITLE')

  console.log([
    item.id,
    '"' + item.title + '"',
    thumbExists ? 'YES' : 'NO',
    thumbStatus,
    entryExists ? 'YES' : 'NO',
    modalMode,
    notes.join('; ') || 'OK'
  ].join(' | '))
})

// Final counts
const allResolved = manifest.filter(i => resolve(i))
const allIframe = manifest.filter(i => {
  if (resolve(i)) return false
  const f = i.entryHtml ? path.join(process.cwd(), 'public', i.entryHtml.replace(/^\/+/, '')) : null
  return f && fs.existsSync(f)
})
const allPlaceholder = manifest.filter(i => {
  if (!i.thumbnailPath) return false
  const f = path.join(process.cwd(), 'public', 'images', i.thumbnailPath)
  if (!fs.existsSync(f)) return false
  return fs.statSync(f).size < 5000
})

console.log('\n--- Phase 2 Summary ---')
console.log('Total manifest items:', manifest.length)
console.log('With live React component:', allResolved.length)
console.log('With iframe preview only:', allIframe.length)
console.log('With placeholder thumbnails (<5KB):', allPlaceholder.length)
console.log('Placeholder IDs:', allPlaceholder.map(i => i.id).join(', '))
