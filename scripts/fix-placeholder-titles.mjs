// Quick one-shot script to fix the 4 items with "Run and deploy your AI Studio app" title
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const ANIM_ROOT = 'C:\\GitProd\\GTMStack_Animations\\gtmstack_animations'

const fixes = [
  { id: 'email-marketing-json-lottie-v2', newTitle: 'Email Marketing Animation' },
  { id: 'marketing-revenue-analytics-v2', newTitle: 'Marketing Revenue Analytics' },
  { id: 'revops-mesh-dashboard-v2', newTitle: 'RevOps Mesh Dashboard' },
  { id: 'workflow-visualization-v2', newTitle: 'Workflow Visualization' },
]

// 1. Fix manifest titles
const manifestPath = path.join(ROOT, 'src', 'data', 'gallery-manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
for (const entry of manifest) {
  const fix = fixes.find(f => f.id === entry.id)
  if (fix) {
    console.log(`Manifest: ${entry.id} title "${entry.title}" -> "${fix.newTitle}"`)
    entry.title = fix.newTitle
  }
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8')

// 2. Regenerate app-v2.html for these 4 items, ensuring the title is clean
//    We'll just do a find-replace in the generated files since the template
//    embedded the bad title
for (const fix of fixes) {
  const entry = manifest.find(e => e.id === fix.id)
  if (!entry) continue

  const projectRel = entry.projectPath.replace(/^animations\//, '')

  // Fix in animations repo
  const animFile = path.join(ANIM_ROOT, 'animations', projectRel, 'app-v2.html')
  if (fs.existsSync(animFile)) {
    let html = fs.readFileSync(animFile, 'utf8')
    html = html.replaceAll('Run and deploy your AI Studio app', fix.newTitle)
    html = html.replaceAll('RUN AND DEPLOY YOUR AI STUDIO APP', fix.newTitle.toUpperCase())
    fs.writeFileSync(animFile, html, 'utf8')
    console.log(`Animation file: fixed ${animFile}`)
  }

  // Fix in public (synced copy)
  const pubFile = path.join(ROOT, 'public', entry.projectPath, 'app-v2.html')
  if (fs.existsSync(pubFile)) {
    let html = fs.readFileSync(pubFile, 'utf8')
    html = html.replaceAll('Run and deploy your AI Studio app', fix.newTitle)
    html = html.replaceAll('RUN AND DEPLOY YOUR AI STUDIO APP', fix.newTitle.toUpperCase())
    fs.writeFileSync(pubFile, html, 'utf8')
    console.log(`Public file: fixed ${pubFile}`)
  }
}

console.log('\nDone. All 4 items fixed.')
