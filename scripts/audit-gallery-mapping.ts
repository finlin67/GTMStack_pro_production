import fs from 'fs'
import path from 'path'

import { ANIMATION_REGISTRY } from '../src/data/animations'
import { resolveRegistryIdForManifestItem } from '../src/lib/galleryAnimationMap'

type GalleryManifestItem = {
  id: string
  animationId?: string
}

const root = path.resolve(__dirname, '..')
const manifestPath = path.join(root, 'src/data/gallery-manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as GalleryManifestItem[]

const ids = [
  'systems-operations-hero-component-v2',
  'revops-neural-dashboard-v2',
  'revenue-systems-data-flow-v2',
  'pipeline-command-center-v2',
  'martech-ai-dashboard-engine-v2',
  'marketingai-neural-dashboard-v2',
  'marketingai-intelligence-dashboard-v2',
  'marketing-revenue-analytics-v2',
  'marketing-operations-workflow-tile-v2',
  'marketing-analytics-carousel-v3',
  'live-email-automation-ecosystem-v3',
  'edu-marketers-dashboard-v2',
]

const results = ids.map((id) => {
  const item = manifest.find((x) => x.id === id)
  if (!item) throw new Error(`Missing manifest item: ${id}`)

  const resolvedRegistryId = resolveRegistryIdForManifestItem(item)
  const registryEntry = resolvedRegistryId
    ? ANIMATION_REGISTRY.find((a) => a.id === resolvedRegistryId) ?? null
    : null

  return {
    id: item.id,
    animationId: item.animationId ?? null,
    resolvedRegistryId: resolvedRegistryId ?? null,
    registryEntryTitle: registryEntry?.title ?? null,
    registryEntryComponentPresent: !!registryEntry?.component,
  }
})

console.log(JSON.stringify({ ok: true, results }, null, 2))

