/**
 * Helpers to query the build-time page registry.
 * Registry source: src/data/page-registry.csv → src/data/pageRegistry.generated.ts
 */
import { PAGE_BY_ROUTE, type PageRegistryRow } from '@/src/data/pageRegistry.generated'

/** Normalize route: keep "/" as "/", otherwise trim trailing slash (mirrors heroVisualRegistry). */
export function normalizeRoute(route: string): string {
  return route === '/' ? '/' : route.replace(/\/$/, '')
}

export function getPageByRoute(route: string): PageRegistryRow | null {
  const normalized = normalizeRoute(route)
  return PAGE_BY_ROUTE[normalized] ?? null
}

export type PageSection = 'expertise' | 'industries' | 'case-studies' | 'projects'

/**
 * Resolve a page by section and slug (e.g. getPageBySlug('expertise', 'ai-in-marketing') → /expertise/ai-in-marketing).
 */
export function getPageBySlug(
  section: PageSection,
  slug: string
): PageRegistryRow | null {
  const base = section === 'expertise' ? '/expertise' : section === 'industries' ? '/industries' : section === 'case-studies' ? '/case-studies' : '/projects'
  const route = slug ? `${base}/${slug}` : base
  return getPageByRoute(route)
}
