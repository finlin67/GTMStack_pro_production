/* eslint-disable no-console */
/**
 * generate-gallery-previews.ts
 *
 * Usage:
 *   npx tsx scripts/generate-gallery-previews.ts                        # dry-run placeholders
 *   npx tsx scripts/generate-gallery-previews.ts --apply                # write placeholders
 *   npx tsx scripts/generate-gallery-previews.ts --refresh-generated    # dry-run refresh old generated
 *   npx tsx scripts/generate-gallery-previews.ts --refresh-generated --apply
 */
import fs from 'node:fs'
import path from 'node:path'

const ANIMATIONS_REPO = 'C:\\GitProd\\GTMStack_Animations\\gtmstack_animations'
const REPORT_PATH = path.join(process.cwd(), 'reports', 'GALLERY_PLACEHOLDER_ITEMS.json')
const MANIFEST_PATH = path.join(process.cwd(), 'src', 'data', 'gallery-manifest.json')

const argv = process.argv.slice(2)
const apply = argv.includes('--apply')
const refreshGenerated = argv.includes('--refresh-generated')
const limitArg = argv.find(a => a.startsWith('--limit='))
const limit = limitArg ? Number(limitArg.split('=')[1]) || 0 : 0

type Item = {
  id: string
  title: string
  category: string
  projectPath: string
}

type ManifestItem = {
  id: string
  title: string
  category: string
  projectPath: string
}

type CategoryTheme = {
  base: string
  accent1: string
  accent2: string
  accent3: string
  accent4: string
  gradientFrom: string
  gradientTo: string
  hudColorClass: string
  iconSet: string[]
  kpiLabels: string[][]
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  Industries: {
    base: '#0a0f1e',
    accent1: '#06b6d4',
    accent2: '#8b5cf6',
    accent3: '#f59e0b',
    accent4: '#10b981',
    gradientFrom: '#06b6d4',
    gradientTo: '#8b5cf6',
    hudColorClass: 'text-cyan-400',
    iconSet: ['Factory', 'Globe', 'Building2', 'Cog', 'Shield', 'BarChart3', 'TrendingUp', 'Zap'],
    kpiLabels: [
      ['Market Share', 'Growth Rate', 'Efficiency', 'Compliance'],
      ['Revenue', 'Pipeline', 'Retention', 'NPS Score'],
      ['Throughput', 'Utilization', 'Quality', 'Output'],
      ['Capacity', 'Demand', 'Coverage', 'Yield'],
    ],
  },
  'Digital Demand': {
    base: '#0c0a1d',
    accent1: '#a78bfa',
    accent2: '#ec4899',
    accent3: '#3b82f6',
    accent4: '#34d399',
    gradientFrom: '#a78bfa',
    gradientTo: '#ec4899',
    hudColorClass: 'text-violet-400',
    iconSet: ['Megaphone', 'Target', 'MousePointerClick', 'Layers', 'Sparkles', 'BarChart3', 'TrendingUp', 'Zap'],
    kpiLabels: [
      ['Impressions', 'CTR', 'Conversions', 'ROAS'],
      ['Reach', 'Engagement', 'Pipeline', 'CAC'],
      ['Traffic', 'Leads', 'MQLs', 'SQLs'],
      ['Spend', 'CPL', 'Velocity', 'Attribution'],
    ],
  },
  Operations: {
    base: '#0b1120',
    accent1: '#60a5fa',
    accent2: '#f472b6',
    accent3: '#a3e635',
    accent4: '#fbbf24',
    gradientFrom: '#60a5fa',
    gradientTo: '#a3e635',
    hudColorClass: 'text-blue-400',
    iconSet: ['Settings', 'Workflow', 'GitBranch', 'Server', 'Gauge', 'BarChart3', 'TrendingUp', 'RefreshCw'],
    kpiLabels: [
      ['Uptime', 'Latency', 'Throughput', 'Error Rate'],
      ['Tasks', 'SLA Met', 'Queue Depth', 'MTTR'],
      ['Pipelines', 'Sync Rate', 'Automation', 'Capacity'],
      ['Incidents', 'Resolution', 'Efficiency', 'Health'],
    ],
  },
  'Dashboard Tiles': {
    base: '#0f0f1a',
    accent1: '#5a5cf2',
    accent2: '#f97316',
    accent3: '#22d3ee',
    accent4: '#e879f9',
    gradientFrom: '#5a5cf2',
    gradientTo: '#22d3ee',
    hudColorClass: 'text-indigo-400',
    iconSet: ['LayoutDashboard', 'PieChart', 'Activity', 'Cpu', 'Eye', 'BarChart3', 'TrendingUp', 'Boxes'],
    kpiLabels: [
      ['Signals', 'Processing', 'Accuracy', 'Freshness'],
      ['Widgets', 'Renders', 'Latency', 'Cache Hit'],
      ['Queries', 'Transforms', 'Throughput', 'Uptime'],
      ['Events', 'Streams', 'P99', 'Coverage'],
    ],
  },
  'Events Media': {
    base: '#110a18',
    accent1: '#e879f9',
    accent2: '#facc15',
    accent3: '#38bdf8',
    accent4: '#4ade80',
    gradientFrom: '#e879f9',
    gradientTo: '#facc15',
    hudColorClass: 'text-fuchsia-400',
    iconSet: ['Calendar', 'Video', 'Mic2', 'Share2', 'Users', 'BarChart3', 'TrendingUp', 'Radio'],
    kpiLabels: [
      ['Attendees', 'Engagement', 'Shares', 'ROI'],
      ['Sessions', 'Reach', 'Views', 'Sentiment'],
      ['Registrations', 'Watch Time', 'Clicks', 'Leads'],
      ['Impressions', 'Replay Rate', 'Revenue', 'NPS'],
    ],
  },
  Abm: {
    base: '#0d0f18',
    accent1: '#fb923c',
    accent2: '#818cf8',
    accent3: '#2dd4bf',
    accent4: '#f43f5e',
    gradientFrom: '#fb923c',
    gradientTo: '#818cf8',
    hudColorClass: 'text-orange-400',
    iconSet: ['Crosshair', 'Users', 'Target', 'Radar', 'Briefcase', 'BarChart3', 'TrendingUp', 'Gem'],
    kpiLabels: [
      ['Accounts', 'Engagement', 'Pipeline', 'Win Rate'],
      ['Targets', 'Penetration', 'Intent', 'Revenue'],
      ['Coverage', 'Interactions', 'Score', 'Velocity'],
      ['Signals', 'Meetings', 'Proposals', 'Closed Won'],
    ],
  },
}

const DEFAULT_THEME = CATEGORY_THEMES.Industries

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

function seededPick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]
}

function normalizeCategory(raw: string): string {
  const c = (raw || '').toLowerCase().trim()
  if (c.includes('industry')) return 'Industries'
  if (c.includes('digital')) return 'Digital Demand'
  if (c.includes('operation')) return 'Operations'
  if (c.includes('dashboard')) return 'Dashboard Tiles'
  if (c.includes('event') || c.includes('media')) return 'Events Media'
  if (c.includes('abm')) return 'Abm'
  return 'Industries'
}

function readManifestItems(): ManifestItem[] {
  const raw = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')) as ManifestItem[]
  return raw.map(item => ({
    ...item,
    category: normalizeCategory(item.category),
  }))
}

function walkFiles(dir: string, fileName: string, out: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkFiles(p, fileName, out)
    } else if (entry.isFile() && entry.name === fileName) {
      out.push(p)
    }
  }
  return out
}

function loadItemsFromPlaceholderReport(): Item[] {
  if (!fs.existsSync(REPORT_PATH)) {
    throw new Error(`Report not found: ${REPORT_PATH}. Run npm run report:gallery:placeholders first.`)
  }
  const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8')) as { visiblePlaceholderItems: Item[] }
  return report.visiblePlaceholderItems.map(item => ({ ...item, category: normalizeCategory(item.category) }))
}

function loadItemsFromGeneratedSignature(): Item[] {
  if (!fs.existsSync(ANIMATIONS_REPO)) {
    throw new Error(`Animations repo not found at: ${ANIMATIONS_REPO}`)
  }

  const manifest = readManifestItems()
  const byProjectPath = new Map(manifest.map(m => [m.projectPath.replace(/\\/g, '/'), m]))
  const appV2Files = walkFiles(path.join(ANIMATIONS_REPO, 'animations'), 'app-v2.html')
  const items: Item[] = []

  for (const file of appV2Files) {
    const content = fs.readFileSync(file, 'utf8')
    const isOldGenerated =
      (content.includes('function DashboardTile()') &&
        content.includes('Central HUD') &&
        content.includes('Bento Grid')) ||
      content.includes('GENERATED_GALLERY_PREVIEW_V3')

    if (!isOldGenerated) continue

    const relDir = path
      .relative(ANIMATIONS_REPO, path.dirname(file))
      .replace(/\\/g, '/')

    const key = relDir.startsWith('animations/') ? relDir : `animations/${relDir}`
    const hit = byProjectPath.get(key)
    if (!hit) continue

    items.push({
      id: hit.id,
      title: hit.title,
      category: hit.category,
      projectPath: hit.projectPath,
    })
  }

  return items
}

// SVG icon paths (subset used in tiles, no external deps)
const ICON_PATHS: Record<string, string> = {
  Factory:         'M2 20V8l5-3 5 3v12H2zm5-7v4 M16 20V4l6 3v13h-6zm3-8v3',
  Globe:           'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
  Building2:       'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18H6zM6 12H4a2 2 0 0 0-2 2v6h4M18 9h2a2 2 0 0 1 2 2v9h-4M10 6h.01M10 10h.01M10 14h.01M10 18h.01M14 6h.01M14 10h.01M14 14h.01M14 18h.01',
  Cog:             'M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 0v-2M12 4V2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  BarChart3:       'M3 3v18h18M18 17V9M13 17V5M8 17v-3',
  TrendingUp:      'M22 7l-8.5 8.5L9 11l-7 7M16 7h6v6',
  Zap:             'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  Shield:          'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  Megaphone:       'M3 11l19-9-9 19-2-8-8-2zM11 13l1.5 1.5',
  Target:          'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  Layers:          'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  Sparkles:        'M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3zM5 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zM19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z',
  Settings:        'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
  Server:          'M2 2h20v8H2V2zM2 14h20v8H2v-8zM6 6h.01M6 18h.01',
  Gauge:           'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-7.4-.6A7.96 7.96 0 0 1 4 12a8 8 0 1 1 16 0c0 .46-.04.9-.1 1.4M12 4V2M4.93 4.93l1.41 1.41M17.66 6.34l-1.41 1.41',
  LayoutDashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  PieChart:        'M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z',
  Activity:        'M22 12h-4l-3 9L9 3l-3 9H2',
  Cpu:             'M9 3H5a2 2 0 0 0-2 2v4m6-6h6m-6 0v18m6-18h4a2 2 0 0 1 2 2v4m-6-6v18m6 0h-4m-2 0H5a2 2 0 0 1-2-2v-4m18 6v-4M3 9h18M3 15h18',
  Calendar:        'M3 4h18v18H3V4zM16 2v4M8 2v4M3 10h18',
  Video:           'M23 7l-7 5 7 5V7zM1 5h16v14H1V5z',
  Share2:          'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98',
  Users:           'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  Crosshair:       'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0 0V12M12 2v10M22 12h-10M2 12h10',
  Radar:           'M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-17v5M12 17v5',
  Briefcase:       'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v1',
  Gem:             'M12 2l9 7-9 13L3 9l9-7zm0 0L3 9h18M12 15l-9-6h18',
}

function iconSvg(name: string, color: string, size = 18): string {
  const d = ICON_PATHS[name] || ICON_PATHS.BarChart3
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d.split('M').filter(Boolean).map(p => `<path d="M${p.trim()}" />`).join('')}</svg>`
}

function generateTileHtml(item: Item): string {
  const theme = CATEGORY_THEMES[item.category] || DEFAULT_THEME
  const hash = hashCode(item.id)

  const kpis = seededPick(theme.kpiLabels, hash)
  const icon1 = seededPick(theme.iconSet, hash + 1)
  const icon2 = seededPick(theme.iconSet, hash + 2)
  const icon3 = seededPick(theme.iconSet, hash + 3)
  const icon4 = seededPick(theme.iconSet, hash + 4)
  const hudIcon = seededPick(theme.iconSet, hash + 5)

  const val1 = 180 + (hash % 900)
  const val2 = 40 + ((hash >> 2) % 55)
  const val3 = 500 + ((hash >> 4) % 9500)
  const val4 = 70 + ((hash >> 7) % 30)
  const layoutVariant = hash % 4

  // Deterministic sparkline point heights (0-40 range for SVG viewBox 0 0 120 40)
  const sparkPts = (seed: number) => {
    const pts: number[] = []
    let v = 14 + (seed % 16)
    for (let i = 0; i < 9; i++) {
      v = Math.max(4, Math.min(36, v + ((hashCode(`${item.id}-${seed}-${i}`) % 13) - 6)))
      pts.push(Math.round(v))
    }
    return pts
  }

  const sparkPath = (pts: number[]) => {
    return pts.map((y, i) => `${(i / (pts.length - 1)) * 120},${40 - y}`).join(' ')
  }

  const pts1 = sparkPts(0)
  const pts2 = sparkPts(1)
  const pts3 = sparkPts(2)
  const pts4 = sparkPts(3)

  const rot1 = 14 + (hash % 8)
  const rot2 = 9 + ((hash >> 3) % 6)
  const pulse1 = 3 + (hash % 4)

  const gradId = `g${hash & 0xffff}`

  const escapedTitle = item.title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

  const card = (label: string, val: string, trendPct: string, iconHtml: string, accent: string, spark: number[], sparkId: string) => {
    const pStr = spark.map((y, i) => `${(i / (spark.length - 1)) * 120},${40 - y}`).join(' ')
    return `
<div class="card fade-in">
  <div class="card-head">
    <div class="icon-box" style="color:${accent}">${iconHtml}</div>
    <span class="trend">▲ ${trendPct}%</span>
  </div>
  <div class="kpi-label">${label}</div>
  <div class="kpi-val">${val}</div>
  <svg class="spark" viewBox="0 0 120 40">
    <defs>
      <linearGradient id="fi${sparkId}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <polyline class="spark-fill" style="fill:url(#fi${sparkId})" points="${pStr} 120,40 0,40"/>
    <polyline class="spark-line" style="stroke:${accent}" points="${pStr}"/>
  </svg>
</div>`
  }

  const bar = (label: string, pct: number, accent: string) =>
    `<div class="bar-row"><span class="bar-label">${label}</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${accent}"></div></div><span class="bar-val">${pct}%</span></div>`

  const node = (cx: number, cy: number, accent: string, delay: number) =>
    `<circle cx="${cx}" cy="${cy}" r="5" fill="${accent}" opacity="0.85"><animate attributeName="r" values="4;7;4" dur="2s" begin="${delay}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" begin="${delay}s" repeatCount="indefinite"/></circle>`

  const link = (x1: number, y1: number, x2: number, y2: number) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(148,163,184,0.3)" stroke-width="1.5"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite"/></line>`

  // layout variant picks the overall structure
  let bodyHtml = ''
  if (layoutVariant === 0) {
    // 2×2 bento grid
    bodyHtml = `<div class="bento-2x2">
${card(kpis[0], val1.toLocaleString(), (1 + (hash % 12)).toFixed(1), iconSvg(icon1, theme.accent1), theme.accent1, pts1, `a${hash & 0xffff}`)}
${card(kpis[1], val2.toFixed(1) + '%', (1 + ((hash >> 1) % 9)).toFixed(1), iconSvg(icon2, theme.accent2), theme.accent2, pts2, `b${hash & 0xffff}`)}
${card(kpis[2], val3.toLocaleString(), (2 + ((hash >> 2) % 11)).toFixed(1), iconSvg(icon3, theme.accent3), theme.accent3, pts3, `c${hash & 0xffff}`)}
${card(kpis[3], val4.toFixed(1) + '%', (1 + ((hash >> 3) % 7)).toFixed(1), iconSvg(icon4, theme.accent4), theme.accent4, pts4, `d${hash & 0xffff}`)}
</div>`
  } else if (layoutVariant === 1) {
    // stacked: large hero + 3 small + progress bar
    const heroSpark = pts1.map((y, i) => `${(i / (pts1.length - 1)) * 280},${50 - y}`).join(' ')
    bodyHtml = `<div class="stacked">
  <div class="hero-card fade-in">
    <div class="kpi-label" style="color:${theme.accent1}">${kpis[0]}</div>
    <div class="hero-val">${val1.toLocaleString()}</div>
    <svg class="hero-spark" viewBox="0 0 280 50">
      <polyline class="spark-line" style="stroke:${theme.accent1};stroke-width:2.5" points="${heroSpark}"/>
    </svg>
  </div>
  <div class="bento-3">
${card(kpis[1], val2.toFixed(1) + '%', (1 + ((hash >> 1) % 9)).toFixed(1), iconSvg(icon2, theme.accent2), theme.accent2, pts2, `e${hash & 0xffff}`)}
${card(kpis[2], val3.toLocaleString(), (2 + ((hash >> 2) % 11)).toFixed(1), iconSvg(icon3, theme.accent3), theme.accent3, pts3, `f${hash & 0xffff}`)}
${card(kpis[3], val4.toFixed(1) + '%', (1 + ((hash >> 3) % 7)).toFixed(1), iconSvg(icon4, theme.accent4), theme.accent4, pts4, `g${hash & 0xffff}`)}
  </div>
  <div class="progress-row fade-in">
    <span class="bar-label" style="color:${theme.accent1}">Flow Stability</span>
    <div class="bar-track"><div class="bar-fill-anim" style="background:linear-gradient(90deg,${theme.gradientFrom},${theme.gradientTo})"></div></div>
  </div>
</div>`
  } else if (layoutVariant === 2) {
    // network graph + 2 cards
    const nodes5 = [
      {cx: 40, cy: 35, c: theme.accent1, d: 0},
      {cx: 110, cy: 28, c: theme.accent2, d: 0.4},
      {cx: 75, cy: 75, c: theme.accent3, d: 0.8},
      {cx: 35, cy: 115, c: theme.accent4, d: 1.2},
      {cx: 115, cy: 115, c: theme.accent1, d: 1.6},
    ]
    const links5 = [[0,2],[1,2],[2,3],[2,4],[0,1],[3,4]] as [number, number][]
    const netSvg = `<svg class="net-svg" viewBox="0 0 150 150">
${links5.map(([a, b]) => link(nodes5[a].cx, nodes5[a].cy, nodes5[b].cx, nodes5[b].cy)).join('\n')}
${nodes5.map(n => node(n.cx, n.cy, n.c, n.d)).join('\n')}
</svg>`
    bodyHtml = `<div class="network-layout">
  <div class="net-card fade-in">${netSvg}</div>
  <div class="net-stats">
${card(kpis[0], val1.toLocaleString(), (1 + (hash % 12)).toFixed(1), iconSvg(icon1, theme.accent1), theme.accent1, pts1, `h${hash & 0xffff}`)}
${card(kpis[1], val2.toFixed(1) + '%', (1 + ((hash >> 1) % 9)).toFixed(1), iconSvg(icon2, theme.accent2), theme.accent2, pts2, `i${hash & 0xffff}`)}
  </div>
</div>`
  } else {
    // timeline / progress bars
    const barPct = (seed: number) => 18 + ((hash + seed * 13) % 72)
    bodyHtml = `<div class="timeline fade-in">
  <div class="tl-header">
    <span class="tl-tag">LIVE DATA FLOW</span>
    <span class="tl-title">${escapedTitle.slice(0, 26)}</span>
  </div>
  <div class="tl-body">
${bar(kpis[0], barPct(0), theme.accent1)}
${bar(kpis[1], barPct(1), theme.accent2)}
${bar(kpis[2], barPct(2), theme.accent3)}
${bar(kpis[3], barPct(3), theme.accent4)}
  </div>
  <div class="tl-metrics">
${card(kpis[0], val1.toLocaleString(), (1 + (hash % 12)).toFixed(1), iconSvg(icon1, theme.accent1), theme.accent1, pts1, `j${hash & 0xffff}`)}
${card(kpis[2], val3.toLocaleString(), (2 + ((hash >> 2) % 11)).toFixed(1), iconSvg(icon3, theme.accent3), theme.accent3, pts3, `k${hash & 0xffff}`)}
  </div>
</div>`
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapedTitle}</title>
  <!-- GENERATED_GALLERY_PREVIEW_V4_INLINE -->
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 640px; height: 640px;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
      background: ${theme.base};
      font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
    }
    .tile {
      width: 600px; height: 600px;
      border-radius: 24px;
      border: 1px solid rgba(148,163,184,0.12);
      background: ${theme.base};
      padding: 16px;
      position: relative;
      overflow: hidden;
    }
    .glow1 {
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(circle at 22% 26%, ${theme.gradientFrom}2e, transparent 55%);
      animation: pulse-glow ${pulse1}s ease-in-out infinite;
    }
    .glow2 {
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(circle at 80% 78%, ${theme.gradientTo}38, transparent 52%);
      animation: pulse-glow ${(pulse1 * 1.25).toFixed(1)}s ease-in-out infinite reverse;
    }
    .contents { position: relative; z-index: 1; height: 100%; }
    /* Card base */
    .card {
      border-radius: 16px;
      border: 1px solid rgba(148,163,184,0.1);
      background: rgba(15,23,42,0.45);
      padding: 12px;
      display: flex; flex-direction: column; gap: 4px;
      animation: fade-in 0.5s ease both;
    }
    .card-head { display: flex; align-items: center; justify-content: space-between; }
    .icon-box {
      display: inline-flex; align-items: center; justify-content: center;
      width: 28px; height: 28px;
      border-radius: 10px;
      background: rgba(30,41,59,0.7);
      border: 1px solid rgba(148,163,184,0.1);
    }
    .trend { font-size: 10px; font-weight: 700; color: #6ee7b7; }
    .kpi-label { font-size: 9px; text-transform: uppercase; letter-spacing: .1em; color: #64748b; margin-top: 4px; }
    .kpi-val { font-size: 20px; font-weight: 800; color: #f1f5f9; letter-spacing: -.02em; }
    .spark { width: 100%; height: 32px; display: block; overflow: visible; }
    .spark-line { fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .spark-fill { stroke: none; }
    /* Layout: bento 2x2 */
    .bento-2x2 { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 10px; height: 100%; }
    /* Layout: stacked */
    .stacked { display: grid; grid-template-rows: auto auto 1fr; gap: 10px; height: 100%; }
    .hero-card {
      border-radius: 16px; border: 1px solid rgba(148,163,184,0.1);
      background: rgba(15,23,42,0.5); padding: 14px;
    }
    .hero-val { font-size: 30px; font-weight: 900; color: #f1f5f9; }
    .hero-spark { width: 100%; height: 40px; display: block; }
    .bento-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
    .progress-row {
      border-radius: 16px; border: 1px solid rgba(148,163,184,0.1);
      background: rgba(15,23,42,0.35); padding: 10px 14px;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
    }
    .bar-track {
      flex: 1; height: 6px; background: rgba(30,41,59,0.8);
      border-radius: 99px; overflow: hidden;
    }
    .bar-fill-anim {
      height: 100%; border-radius: 99px;
      background: linear-gradient(90deg, ${theme.gradientFrom}, ${theme.gradientTo});
      animation: bar-grow-wide 6s ease-in-out infinite alternate;
    }
    /* Layout: network */
    .network-layout { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 10px; height: 100%; }
    .net-card {
      border-radius: 16px; border: 1px solid rgba(148,163,184,0.1);
      background: rgba(15,23,42,0.45); padding: 10px;
    }
    .net-svg { width: 100%; height: 100%; }
    .net-stats { display: grid; grid-template-rows: 1fr 1fr; gap: 10px; }
    /* Layout: timeline */
    .timeline { display: grid; grid-template-rows: auto auto 1fr; gap: 10px; height: 100%; }
    .tl-header {
      border-radius: 16px; border: 1px solid rgba(148,163,184,0.1);
      background: rgba(15,23,42,0.45); padding: 10px 14px;
      display: flex; align-items: center; justify-content: space-between; gap: 8px;
    }
    .tl-tag { font-size: 9px; text-transform: uppercase; letter-spacing: .12em; color: #94a3b8; }
    .tl-title { font-size: 12px; font-weight: 600; color: #f1f5f9; }
    .tl-body {
      border-radius: 16px; border: 1px solid rgba(148,163,184,0.1);
      background: rgba(15,23,42,0.35); padding: 14px; display: flex; flex-direction: column; gap: 12px;
    }
    .bar-row { display: grid; grid-template-columns: 110px 1fr 50px; align-items: center; gap: 8px; }
    .bar-label { font-size: 9px; text-transform: uppercase; letter-spacing: .08em; color: #64748b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .bar-fill { height: 100%; border-radius: 99px; animation: bar-grow 1.4s ease both; }
    .bar-val { font-size: 10px; font-family: monospace; color: #cbd5e1; text-align: right; }
    .tl-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    /* HUD badge */
    .hud-badge {
      position: absolute; top: 14px; right: 14px; z-index: 10;
      border-radius: 12px; border: 1px solid rgba(148,163,184,0.15);
      background: rgba(15,23,42,0.8); padding: 8px;
      animation: spin-slow ${rot1}s linear infinite;
      color: ${theme.accent1};
    }
    @keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    @keyframes pulse-glow { 0%, 100% { opacity: .4; } 50% { opacity: .75; } }
    @keyframes spin-slow { to { transform: rotate(360deg); } }
    @keyframes bar-grow { from { width: 0; } }
    @keyframes bar-grow-wide { from { width: 32%; } to { width: 88%; } }
  </style>
</head>
<body>
  <div class="tile">
    <div class="glow1"></div>
    <div class="glow2"></div>
    <div class="contents">
      ${bodyHtml}
    </div>
    <div class="hud-badge">${iconSvg(hudIcon, theme.accent1, 16)}</div>
  </div>
</body>
</html>`
}

function main() {
  if (!fs.existsSync(ANIMATIONS_REPO)) {
    console.error('Animations repo not found at:', ANIMATIONS_REPO)
    process.exit(1)
  }
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('Manifest not found at:', MANIFEST_PATH)
    process.exit(1)
  }

  let items: Item[] = []
  if (refreshGenerated) {
    items = loadItemsFromGeneratedSignature()
  } else {
    items = loadItemsFromPlaceholderReport()
  }

  if (limit > 0) items = items.slice(0, limit)

  console.log('Generate interactive HTML previews')
  console.log('----------------------------------')
  console.log(`Mode: ${apply ? 'APPLY' : 'DRY-RUN'}`)
  console.log(`Scope: ${refreshGenerated ? 'REFRESH OLD GENERATED' : 'VISIBLE PLACEHOLDERS'}`)
  console.log(`Animations repo: ${ANIMATIONS_REPO}`)
  console.log(`Items to process: ${items.length}`)
  console.log('')

  let written = 0
  let skipped = 0

  for (const item of items) {
    const folderName = item.projectPath.replace(/^animations\//, '')
    const targetDir = path.join(ANIMATIONS_REPO, 'animations', folderName)
    const targetFile = path.join(targetDir, 'app-v2.html')

    if (!refreshGenerated && fs.existsSync(targetFile)) {
      const existing = fs.readFileSync(targetFile, 'utf8')
      if (
        !existing.includes('Gallery thumbnail placeholder') &&
        !existing.includes('Run and deploy your AI Studio app')
      ) {
        console.log(`SKIP (already has real app-v2.html) ${item.id}`)
        skipped++
        continue
      }
    }

    if (!apply) {
      console.log(`Would write: ${targetFile}`)
      console.log(`  ${item.id} | ${item.title} | ${item.category}`)
      written++
      continue
    }

    fs.mkdirSync(targetDir, { recursive: true })
    fs.writeFileSync(targetFile, generateTileHtml(item), 'utf8')
    written++
    console.log(`[${written}] Wrote: ${item.id} -> app-v2.html`)
  }

  console.log('')
  console.log(`Done. Written: ${written}, Skipped: ${skipped}`)
  if (!apply) {
    console.log('(dry-run only. Use --apply to write files)')
  }
}

main()
