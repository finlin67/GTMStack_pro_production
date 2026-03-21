import fs from 'fs'
import path from 'path'

import { ANIMATION_REGISTRY } from '../src/data/animations'
import { resolveRegistryIdForManifestItem } from '../src/lib/galleryAnimationMap'
import {
  applyCanonicalVisibility,
  buildCanonicalMap,
  normalizeSummary,
  resolvePreviewDecision,
} from '../src/lib/galleryPreviewPolicy'

type ManifestItem = {
  id: string
  slug: string
  animationId?: string
  title: string
  category: string
  tags: string[]
  summary?: string | null
  entryHtml?: string
  thumbnailPath?: string
  githubUrl: string
  updatedAt?: string | null
}

type QAItem = {
  id: string
  title: string
  gridStatus: 'visible-meaningful' | 'visible-weak' | 'missing-thumbnail'
  modalStatus: string
  notes: string
}

function toPublicPath(...parts: string[]): string {
  return path.join(process.cwd(), 'public', ...parts)
}

function exists(filePath: string): boolean {
  return fs.existsSync(filePath)
}

function fileSize(filePath: string): number {
  if (!exists(filePath)) return 0
  return fs.statSync(filePath).size
}

function pngDimensions(filePath: string): { width: number; height: number } | null {
  if (!filePath.toLowerCase().endsWith('.png')) return null
  if (!exists(filePath)) return null

  const buffer = fs.readFileSync(filePath)
  if (buffer.length < 24) return null

  const signature = buffer.subarray(0, 8)
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  if (!signature.equals(pngSignature)) return null

  const width = buffer.readUInt32BE(16)
  const height = buffer.readUInt32BE(20)
  return { width, height }
}

function basePreviewFields(item: ManifestItem) {
  const thumbnailUrl = item.thumbnailPath
    ? `/images/${String(item.thumbnailPath).replace(/^\/+/, '')}`
    : undefined

  const thumbnailFsPath = item.thumbnailPath
    ? toPublicPath('images', String(item.thumbnailPath).replace(/^\/+/, '').replace(/\//g, path.sep))
    : ''

  const entryHtmlFsPath = item.entryHtml
    ? toPublicPath(String(item.entryHtml).replace(/^\/+/, '').replace(/\//g, path.sep))
    : ''

  return { thumbnailUrl, thumbnailFsPath, entryHtmlFsPath }
}

function reportItem(item: ManifestItem): {
  qa: QAItem
  missingThumbnail: boolean
  placeholderThumbnail: boolean
  wrongModal: boolean
  blankModal: boolean
  cropOverlay: boolean
} {
  const { thumbnailUrl, thumbnailFsPath, entryHtmlFsPath } = basePreviewFields(item)

  const thumbExists = thumbnailFsPath ? exists(thumbnailFsPath) : false
  const thumbSize = thumbExists ? fileSize(thumbnailFsPath) : 0
  const dimensions = thumbExists ? pngDimensions(thumbnailFsPath) : null
  const ratio = dimensions ? dimensions.width / Math.max(1, dimensions.height) : null

  const resolvedRegistryId = resolveRegistryIdForManifestItem(item)
  const mappedAnimation = resolvedRegistryId
    ? ANIMATION_REGISTRY.find((a) => a.id === resolvedRegistryId) ?? null
    : null

  const decision = resolvePreviewDecision({
    hasMappedComponent: !!mappedAnimation,
    entryHtml: item.entryHtml,
    thumbnailUrl,
  })

  const entryExists = entryHtmlFsPath ? exists(entryHtmlFsPath) : false
  const summaryNormalized = normalizeSummary(item.summary)

  const placeholderSummary = !summaryNormalized
  const weakThumbBySize = thumbExists && thumbSize < 10_000
  const weakThumbByRatio = ratio !== null && (ratio > 2.1 || ratio < 0.45)

  const missingThumbnail = !thumbExists
  const placeholderThumbnail = weakThumbBySize || placeholderSummary
  const wrongModal = !!(item.animationId && resolvedRegistryId && item.animationId !== resolvedRegistryId)
  const blankModal = decision.mode === 'explicit-fallback-message' ||
    (decision.mode === 'iframe-entry-html' && !entryExists)
  const cropOverlay = weakThumbByRatio

  const issues: string[] = []
  if (missingThumbnail) issues.push('missing thumbnail file')
  if (placeholderThumbnail) issues.push('placeholder-quality thumbnail or summary')
  if (wrongModal) issues.push('animationId mismatch with resolved registry id')
  if (blankModal) issues.push('modal may render blank/fallback')
  if (cropOverlay) issues.push('extreme aspect ratio may create crop/letterbox defects')

  const gridStatus: QAItem['gridStatus'] = missingThumbnail
    ? 'missing-thumbnail'
    : placeholderThumbnail
      ? 'visible-weak'
      : 'visible-meaningful'

  let modalStatus = `ok-${decision.mode}`
  if (decision.mode === 'iframe-entry-html' && !entryExists) modalStatus = 'blank-risk-missing-entry'
  if (wrongModal) modalStatus = 'wrong-content-risk'

  return {
    qa: {
      id: item.id,
      title: item.title,
      gridStatus,
      modalStatus,
      notes: issues.length ? issues.join('; ') : 'no major issue detected',
    },
    missingThumbnail,
    placeholderThumbnail,
    wrongModal,
    blankModal,
    cropOverlay,
  }
}

function pickRepresentativeItems(activeItems: ManifestItem[]): ManifestItem[] {
  const priorityIds = [
    'systems-operations-hero-component-v2',
    'revops-neural-dashboard-v2',
    'revenue-systems-data-flow-v2',
    'pipeline-command-center-v2',
    'martech-ai-dashboard-engine-v2',
    'marketing-analytics-carousel-v3',
    'live-email-automation-ecosystem-v3',
    'edtech-compact-roi-funnel-v3',
    'executive-logistics-dashboard-v3',
    'abm-pipeline-strategy-dashboard-v2',
    'social-media-marketing-hero-tile-v2',
    'manufacturinghero-dashboard-tile-v2',
    'grid-master-cyber-infrastructure-dashboard-v2',
    'growthsem-landing-page-v2',
    'growthcore-component-extraction-v2',
    'growth-ai-harmonic-quad-tone',
    'demand-gen-hero',
    'content-engagement-hero',
    'gtmstack-hero-tile-v2',
    'advocacy-loop-dashboard-v2',
    'edu-marketers-dashboard-v2',
    'executive-logistics-dashboard-v2',
  ]

  const byId = new Map(activeItems.map((item) => [item.id, item]))
  const picked: ManifestItem[] = []

  for (const id of priorityIds) {
    const item = byId.get(id)
    if (item) picked.push(item)
    if (picked.length >= 20) return picked
  }

  for (const item of activeItems.sort((a, b) => a.id.localeCompare(b.id))) {
    if (picked.find((x) => x.id === item.id)) continue
    picked.push(item)
    if (picked.length >= 20) break
  }

  return picked
}

function main() {
  const manifestPath = path.join(process.cwd(), 'src', 'data', 'gallery-manifest.json')
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as ManifestItem[]

  const canonicalMap = buildCanonicalMap(manifest)
  const { visibleItems } = applyCanonicalVisibility(manifest, {
    includeSecondary: false,
    includeDeprecated: false,
  })

  const allResults = visibleItems.map((item) => reportItem(item))
  const failure = {
    missingThumbnail: allResults.filter((r) => r.missingThumbnail).length,
    placeholderThumbnail: allResults.filter((r) => r.placeholderThumbnail).length,
    wrongModalContent: allResults.filter((r) => r.wrongModal).length,
    blankModal: allResults.filter((r) => r.blankModal).length,
    cropOverlayDefect: allResults.filter((r) => r.cropOverlay).length,
  }

  const representative = pickRepresentativeItems(visibleItems).map((item) => reportItem(item).qa)
  const secondaryOrDeprecated = Object.entries(canonicalMap)
    .filter(([, decision]) => decision.status !== 'active')
    .sort((a, b) => a[0].localeCompare(b[0]))

  const markdown = [
    '# Phase 2 Gallery QA Pack',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Brief Audit Summary',
    `- Improved: deterministic modal precedence is centralized in src/lib/galleryPreviewPolicy.ts and used by both template and modal rendering.`,
    `- Improved: version/canonical hygiene now defaults to active-only visibility; secondary/deprecated variants are filtered out of the grid by default.`,
    `- Improved: grid fallback visuals now use informative fallback cards instead of generic orb shells when no thumbnail is available.`,
    `- Still needs work: ${failure.placeholderThumbnail} active items still show weak placeholder patterns (small assets and/or generic summaries).`,
    `- Still needs work: ${failure.cropOverlayDefect} active items show extreme thumbnail aspect ratios that can cause visual fit issues.`,
    '',
    '## Failure Breakdown',
    `- missing thumbnail: ${failure.missingThumbnail}`,
    `- placeholder thumbnail: ${failure.placeholderThumbnail}`,
    `- wrong modal content: ${failure.wrongModalContent}`,
    `- blank modal: ${failure.blankModal}`,
    `- crop/overlay defect: ${failure.cropOverlayDefect}`,
    '',
    '## Recommended Canonical Policy',
    '- Active item: highest semantic version in each base-id group; ties break by latest updatedAt.',
    '- Secondary item: older versioned duplicates (for reference/testing only, hidden by default).',
    '- Deprecated item: unversioned item superseded by versioned duplicates (hidden by default).',
    '- Preview source precedence: live component, iframe entryHtml, thumbnail fallback, explicit fallback message.',
    `- Active visible items: ${visibleItems.length} of ${manifest.length}.`,
    `- Hidden secondary/deprecated items: ${manifest.length - visibleItems.length}.`,
    '',
    '### Hidden/Deprecated Candidates',
    ...secondaryOrDeprecated.slice(0, 40).map(
      ([id, decision]) =>
        `- ${id}: ${decision.status} (canonical: ${decision.canonicalId}, base: ${decision.baseId})`
    ),
    '',
    '## Representative QA Result Set (20+ items)',
    '| Item ID | Grid Status | Modal Status | Notes |',
    '|---|---|---|---|',
    ...representative.map(
      (row) => `| ${row.id} | ${row.gridStatus} | ${row.modalStatus} | ${row.notes} |`
    ),
    '',
    '## Safe Runbook',
    '### 1) Regenerate',
    '- npm run sync:gallery:dry',
    '- npm run sync:gallery',
    '- npm run sync:gallery:entry-html:dry',
    '- npm run sync:gallery:entry-html',
    '',
    '### 2) Verify',
    '- npm run dev',
    '- Validate representative items from this QA table for grid thumb and modal correctness.',
    '- Confirm no blank white/black modal states and no wrong-preview openings.',
    '',
    '### 3) Test Order',
    '- Sync manifest/assets first.',
    '- Then run dev server.',
    '- Then run focused QA checks on representative items.',
    '- Then run npm run build for production parity check.',
    '',
    '### 4) What Not To Do',
    '- Do not run multiple Next dev servers in parallel.',
    '- Do not treat dev-cache JSON errors as proof of gallery UI failure.',
    '- Do not mix modal strategies outside the defined precedence chain.',
    '- Do not promote v2/v3 duplicates without explicitly designating canonical active item.',
    '',
  ].join('\n')

  const outPath = path.join(process.cwd(), 'reports', 'GALLERY_PHASE2_QA.md')
  fs.writeFileSync(outPath, markdown, 'utf8')

  console.log(
    JSON.stringify(
      {
        ok: true,
        output: outPath,
        total: manifest.length,
        visible: visibleItems.length,
        hidden: manifest.length - visibleItems.length,
        failure,
      },
      null,
      2
    )
  )
}

main()
