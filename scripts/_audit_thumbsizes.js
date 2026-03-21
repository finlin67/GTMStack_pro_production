// Check thumbnail file sizes to find placeholder/corrupt images
const fs = require('fs')
const path = require('path')

const manifest = JSON.parse(fs.readFileSync('src/data/gallery-manifest.json', 'utf8'))

const sizes = []
manifest.forEach(item => {
  if (!item.thumbnailPath) return
  const p = path.join(process.cwd(), 'public', 'images', item.thumbnailPath)
  if (!fs.existsSync(p)) { sizes.push({ id: item.id, size: -1, path: p }); return }
  const stat = fs.statSync(p)
  sizes.push({ id: item.id, size: stat.size, path: item.thumbnailPath })
})

// Sort by size ascending
sizes.sort((a, b) => a.size - b.size)

console.log('Smallest 20 thumbnails (potential placeholders):')
sizes.slice(0, 20).forEach(s => console.log(`  ${s.size.toString().padStart(8)} bytes  ${s.id}  (${s.path})`))

// Find suspicious tiny files (< 10KB could be placeholder)
const tiny = sizes.filter(s => s.size > 0 && s.size < 10000)
console.log(`\nTiny thumbnails (< 10KB): ${tiny.length}`)
tiny.forEach(s => console.log(`  ${s.size} bytes  ${s.id}`))

// Count by size bucket
const buckets = { '<5KB': 0, '5-50KB': 0, '50-200KB': 0, '>200KB': 0 }
sizes.forEach(s => {
  if (s.size < 5000) buckets['<5KB']++
  else if (s.size < 50000) buckets['5-50KB']++
  else if (s.size < 200000) buckets['50-200KB']++
  else buckets['>200KB']++
})
console.log('\nSize distribution:', JSON.stringify(buckets))
