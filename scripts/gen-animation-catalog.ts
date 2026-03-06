/**
 * Build-time generator: scans src/components/animations for *.tsx files and emits
 * src/data/animationCatalog.generated.ts. Run via: npm run gen:animations
 * Merges animationMeta.overrides.ts into generated catalog.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
const ANIMATIONS_DIR = path.join(ROOT, 'src', 'components', 'animations')
const PAGE_REGISTRY_CSV = path.join(ROOT, 'src', 'data', 'page-registry.csv')
const GITHUB_MAP_PATH = path.join(ROOT, 'lib', 'galleryGithubMap.ts')
const OVERRIDES_PATH = path.join(ROOT, 'src', 'data', 'animationMeta.overrides.ts')
const OUT_PATH = path.join(ROOT, 'src', 'data', 'animationCatalog.generated.ts')

/**
 * Convert filename to slug (e.g., "AIGrowth.tsx" -> "ai-growth")
 */
function slugify(filename: string): string {
  // Remove .tsx extension
  const base = filename.replace(/\.tsx?$/, '')
  
  // Convert PascalCase/kebab-case to slug
  return base
    .replace(/([A-Z])/g, '-$1') // Insert dash before capitals
    .toLowerCase()
    .replace(/^-+/, '') // Remove leading dashes
    .replace(/-+/g, '-') // Collapse multiple dashes
    .replace(/-+$/, '') // Remove trailing dashes
}

/**
 * Convert filename to human-readable title (e.g., "AIGrowth.tsx" -> "AI Growth", "ABM-Pipeline-Strategy.tsx" -> "ABM Pipeline Strategy")
 */
function humanize(filename: string): string {
  const base = filename.replace(/\.tsx?$/, '')
  
  // Handle kebab-case
  if (base.includes('-')) {
    return base
      .split('-')
      .map(word => {
        // If word is all caps (acronym), keep it as-is
        if (word === word.toUpperCase() && word.length <= 5 && word.match(/^[A-Z]+$/)) {
          return word
        }
        // Otherwise capitalize first letter
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join(' ')
  }
  
  // Handle PascalCase - simple approach: insert space before capitals, then fix acronyms
  let spaced = base.replace(/([A-Z])/g, ' $1').trim()
  
  // Try to detect and fix common acronym patterns (2-4 consecutive capitals)
  spaced = spaced.replace(/\b([A-Z]{2,4})\s+([A-Z])/g, '$1 $2')
  
  // Capitalize first letter
  if (spaced.length > 0) {
    spaced = spaced.charAt(0).toUpperCase() + spaced.slice(1)
  }
  
  return spaced || base
}

/**
 * Parse CSV row (handles quoted values)
 */
function parseCsvRow(line: string): string[] {
  const out: string[] = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      inQuotes = !inQuotes
    } else if (inQuotes) {
      cur += c
    } else if (c === ',') {
      out.push(cur.trim())
      cur = ''
    } else {
      cur += c
    }
  }
  out.push(cur.trim())
  return out
}

/**
 * Read heroVisualId values from page-registry.csv
 */
function getUsedAnimationIds(): Set<string> {
  const usedIds = new Set<string>()
  
  if (!fs.existsSync(PAGE_REGISTRY_CSV)) {
    console.warn(`Warning: ${PAGE_REGISTRY_CSV} not found, skipping used-on-pages detection`)
    return usedIds
  }
  
  const raw = fs.readFileSync(PAGE_REGISTRY_CSV, 'utf8')
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  
  if (lines.length < 2) {
    return usedIds
  }
  
  const header = parseCsvRow(lines[0])
  const heroVisualIdIndex = header.indexOf('heroVisualId')
  
  if (heroVisualIdIndex === -1) {
    console.warn(`Warning: heroVisualId column not found in ${PAGE_REGISTRY_CSV}`)
    return usedIds
  }
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvRow(lines[i])
    const heroVisualId = (values[heroVisualIdIndex] ?? '').trim()
    if (heroVisualId) {
      usedIds.add(heroVisualId)
    }
  }
  
  return usedIds
}

/**
 * Get GitHub URL from galleryGithubMap.ts (fail-closed: returns undefined if not found)
 */
function getGithubUrl(animationId: string): string | undefined {
  if (!fs.existsSync(GITHUB_MAP_PATH)) {
    return undefined
  }
  
  try {
    // Read and parse the file to extract the mapping
    const content = fs.readFileSync(GITHUB_MAP_PATH, 'utf8')
    
    // Extract the galleryGithubUrls object content (handles multiline with comments)
    const match = content.match(/galleryGithubUrls:\s*Record<string,\s*string>\s*=\s*\{([\s\S]*?)\}/)
    if (!match) {
      return undefined
    }
    
    const objContent = match[1]
    
    // Remove single-line comments
    const withoutComments = objContent.replace(/\/\/.*$/gm, '')
    
    // Extract key-value pairs (handles both single and double quotes)
    const pairs = withoutComments.match(/(['"])([^'"]+)\1:\s*(['"])([^'"]+)\3/g)
    if (!pairs) {
      return undefined
    }
    
    for (const pair of pairs) {
      // Extract key (first quoted string)
      const keyMatch = pair.match(/(['"])([^'"]+)\1/)
      // Extract value (second quoted string)
      const valueMatch = pair.match(/:\s*(['"])([^'"]+)\1/)
      if (keyMatch && valueMatch) {
        const key = keyMatch[2]
        const value = valueMatch[2]
        if (key === animationId) {
          return value
        }
      }
    }
    
    return undefined
  } catch (error) {
    console.warn(`Warning: Could not parse ${GITHUB_MAP_PATH}:`, error)
    return undefined
  }
}

async function loadOverrides(): Promise<Record<string, { title?: string; description?: string; keywords?: string[]; repoUrl?: string; thumbnailSrc?: string }>> {
  if (!fs.existsSync(OVERRIDES_PATH)) return {}
  try {
    const mod = await import(pathToFileURL(OVERRIDES_PATH).href)
    return (mod.ANIMATION_META_OVERRIDES ?? {}) as Record<string, { title?: string; description?: string; keywords?: string[]; repoUrl?: string; thumbnailSrc?: string }>
  } catch {
    return {}
  }
}

async function run(): Promise<void> {
  if (!fs.existsSync(ANIMATIONS_DIR)) {
    throw new Error(`Animations directory not found: ${ANIMATIONS_DIR}`)
  }

  const overrides = await loadOverrides()
  
  // Scan for *.tsx files
  const files = fs.readdirSync(ANIMATIONS_DIR)
    .filter(f => f.endsWith('.tsx') && !f.startsWith('index.'))
    .sort()
  
  if (files.length === 0) {
    throw new Error(`No .tsx files found in ${ANIMATIONS_DIR}`)
  }
  
  console.log(`Found ${files.length} animation files`)
  
  // Get used animation IDs from page registry
  const usedIds = getUsedAnimationIds()
  console.log(`Found ${usedIds.size} animations used on pages`)
  
  // Build catalog items
  const catalogItems: Array<{
    id: string
    title: string
    componentPath: string
    thumbnailSrc: string
    repoUrl?: string
    usedOnPages: boolean
  }> = []
  
  for (const file of files) {
    const id = slugify(file)
    const o = overrides[id] ?? {}
    const title = o.title ?? humanize(file)
    const componentPath = `@/components/animations/${file.replace(/\.tsx$/, '')}`
      const thumbnailFileName = file.replace(/\.tsx$/, '.png')
      const thumbnailSrc = o.thumbnailSrc ?? `/images/gallery-thumbnails/${thumbnailFileName}`
    const repoUrl = o.repoUrl ?? getGithubUrl(id)
    const usedOnPages = usedIds.has(id)
    
    catalogItems.push({
      id,
      title,
      componentPath,
      thumbnailSrc,
      repoUrl,
      usedOnPages,
    })
  }
  
  // Sort alphabetically by title
  catalogItems.sort((a, b) => a.title.localeCompare(b.title))
  
  // Generate TypeScript file
  const itemsArray = catalogItems.map(item => {
    const repoUrlLine = item.repoUrl ? `    repoUrl: ${JSON.stringify(item.repoUrl)},` : ''
    return `  {
    id: ${JSON.stringify(item.id)},
    title: ${JSON.stringify(item.title)},
    componentPath: ${JSON.stringify(item.componentPath)},
    thumbnailSrc: ${JSON.stringify(item.thumbnailSrc)},
${repoUrlLine}
    usedOnPages: ${item.usedOnPages},
  }`
  }).join(',\n')
  
  const ts = `// Generated by scripts/gen-animation-catalog.ts — do not edit manually.
// Source of truth: src/components/animations/*.tsx

export type AnimationCatalogItem = {
  id: string
  title: string
  componentPath: string
  thumbnailSrc: string
  repoUrl?: string
  usedOnPages: boolean
}

export const ANIMATION_CATALOG: AnimationCatalogItem[] = [
${itemsArray}
]
`
  
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
  fs.writeFileSync(OUT_PATH, ts, 'utf8')
  console.log(`✓ Wrote: ${OUT_PATH} (${catalogItems.length} animations)`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
