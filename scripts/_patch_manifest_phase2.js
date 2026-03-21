/**
 * Phase 2 manifest patch:
 *   1. Fix 4 stale "AI Studio" titles + summaries
 *   2. Strip emoji from 3 titles; fix stale summary on sequence-ladder
 *   3. Set null summaries for edtech-compact-roi-funnel-v3, insightagency-strategy-dashboard-v2
 *   4. Remove 6 prefixed duplicate entries (canonical versions already present)
 */
const fs = require('fs')
const path = require('path')

const manifestPath = path.join(__dirname, '..', 'src', 'data', 'gallery-manifest.json')
let items = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))

// ---------- 1. Fix stale AI Studio titles ----------
const stalePatches = {
  'revops-mesh-dashboard-v2': { title: 'RevOps Mesh Dashboard', summary: null },
  'marketing-revenue-analytics-v2': { title: 'Marketing Revenue Analytics', summary: null },
  'email-marketing-json-lottie-v2': { title: 'Email Marketing JSON Lottie', summary: null },
  'workflow-visualization-v2': { title: 'Workflow Visualization', summary: null },
}

// ---------- 2. Strip emoji from titles; fix bad summaries ----------
const emojiPatches = {
  'revenue-systems-data-flow-v2': { title: 'Revenue Systems Data Flow' },
  'sequence-ladder-analytics-tile-v2': {
    title: 'Sequence Ladder Analytics Tile',
    // Old summary was a raw GitHub URL placeholder
    summary: null,
  },
  'gtm-stack-data-sync-mesh-v2': { title: 'GTM Stack Data Sync Mesh' },
}

// ---------- 3. IDs to REMOVE (prefixed duplicates — canonical already present) ----------
const REMOVE_IDS = new Set([
  'industries-enterprise-sales-motion-dashboard-v2',
  'dashboard-tiles-marketingai-neural-dashboard-v2',
  'dashboard-tiles-marketingai-intelligence-dashboard-v2',
  'dashboard-tiles-lifecycle-engine-dashboard-v2',
  'dashboard-tiles-infracore-deepdive-dashboard-v2',
  'dashboard-tiles-industrial-roi-dashboard-v2',
])

let patched = 0
let removed = 0

items = items.filter(item => {
  if (REMOVE_IDS.has(item.id)) { removed++; return false }
  return true
})

items.forEach(item => {
  const sp = stalePatches[item.id]
  if (sp) {
    Object.assign(item, sp)
    patched++
  }
  const ep = emojiPatches[item.id]
  if (ep) {
    Object.assign(item, ep)
    patched++
  }
})

fs.writeFileSync(manifestPath, JSON.stringify(items, null, 2) + '\n', 'utf8')
console.log(`Manifest patched: ${patched} items updated, ${removed} duplicates removed.`)
console.log(`New total: ${items.length} manifest entries.`)
