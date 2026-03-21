const fs = require('fs')
const m = JSON.parse(fs.readFileSync('src/data/gallery-manifest.json', 'utf8'))
console.log('Total items:', m.length)
const stale = m.filter(i => i.title && i.title.includes('AI Studio'))
console.log('Stale AI Studio titles remaining:', stale.length)
const prefixed = m.filter(i => /^(industries-|dashboard-tiles-)/.test(i.id))
console.log('Prefixed duplicates remaining:', prefixed.length)
// Check for brain/chart emoji specifically
const emoji = m.filter(i => i.title && (i.title.includes('\uD83E') || i.title.includes('\uD83D') || i.title.includes('\uD83C')))
console.log('Emoji titles remaining:', emoji.length, emoji.map(i => i.id))
;['revops-mesh-dashboard-v2','marketing-revenue-analytics-v2','revenue-systems-data-flow-v2','sequence-ladder-analytics-tile-v2','gtm-stack-data-sync-mesh-v2'].forEach(id => {
  const i = m.find(x => x.id === id)
  if (i) console.log(id + ' => "' + i.title + '"')
})
