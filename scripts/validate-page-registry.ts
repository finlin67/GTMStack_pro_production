/**
 * Validates src/data/pageRegistry.generated.ts (and thus page-registry.csv).
 * Run: npm run validate:registry
 */
import { PAGE_REGISTRY } from '../src/data/pageRegistry.generated'
import { TEMPLATE_BY_ID } from '../src/templates/registry'
import { getUploadedTemplate } from '../src/templates/uploadedRegistry.generated'
import { getExpertiseBySlug, getExpertiseByPillar } from '../content/expertise'
import { getIndustryBySlug } from '../content/industries'
import { getCaseStudyBySlug } from '../content/case-studies'

type Section = 'expertise' | 'industries' | 'case-studies' | 'projects'

function parseDynamicRoute(route: string): { section: Section; slug: string } | null {
  if (route === '/' || !route.startsWith('/')) return null
  const parts = route.slice(1).split('/')
  if (parts.length !== 2) return null
  const [section, slug] = parts
  if (['expertise', 'industries', 'case-studies', 'projects'].includes(section) && slug) {
    return { section: section as Section, slug }
  }
  return null
}

function main(): void {
  let failed = false

  // 1) Unique routes
  const seen = new Map<string, number>()
  for (let i = 0; i < PAGE_REGISTRY.length; i++) {
    const r = PAGE_REGISTRY[i]
    if (seen.has(r.route)) {
      console.error(
          `[validate-page-registry] Duplicate route: "${r.route}" (rows ${seen.get(r.route)! + 1} and ${i + 1})`
      )
      failed = true
    } else {
      seen.set(r.route, i)
    }
  }

  // 2) templateId must resolve (legacy OR uploaded)
  for (let i = 0; i < PAGE_REGISTRY.length; i++) {
    const row = PAGE_REGISTRY[i]
    const templateId = row.templateId as string

    const legacyOk = Boolean((TEMPLATE_BY_ID as Record<string, unknown>)[templateId])
    const uploadedOk = Boolean(getUploadedTemplate(templateId))

    if (!legacyOk && !uploadedOk) {
      console.error(
          `[validate-page-registry] templateId does not resolve: "${templateId}" (route "${row.route}")`
      )
      failed = true
    }
  }

  // 3) No trailing slash inconsistencies (expect no trailing slash except for "/")
  for (const row of PAGE_REGISTRY) {
    if (row.route !== '/' && row.route.endsWith('/')) {
      console.error(`[validate-page-registry] Route has trailing slash: "${row.route}"`)
      failed = true
    }
  }

  // 4) Block deprecated /services routes
  for (const row of PAGE_REGISTRY) {
    if (row.route.startsWith('/services/')) {
      console.error(
        `[validate-page-registry] Deprecated route found: "${row.route}". Services routes must be redirected in app/services and removed from the registry.`
      )
      failed = true
    }
  }

  // 5) Dynamic sections: slug exists in content
  for (const row of PAGE_REGISTRY) {
    const parsed = parseDynamicRoute(row.route)
    if (!parsed) continue

    const { section, slug } = parsed
    const templateId = row.templateId
    if (section === 'expertise') {
      if (templateId === 'expertise.topic') {
        if (!getExpertiseBySlug(slug)) {
          console.error(`[validate-page-registry] Expertise slug not found: "${slug}" (route "${row.route}")`)
          failed = true
        }
      } else if (templateId === 'expertise.category') {
        if (getExpertiseByPillar(slug).length === 0) {
          console.error(`[validate-page-registry] Expertise pillar not found: "${slug}" (route "${row.route}")`)
          failed = true
        }
      }
    } else if (section === 'industries') {
      if (!getIndustryBySlug(slug)) {
        console.error(`[validate-page-registry] Industry slug not found: "${slug}" (route "${row.route}")`)
        failed = true
      }
    } else if (section === 'case-studies' || section === 'projects') {
      if (!getCaseStudyBySlug(slug)) {
        console.error(`[validate-page-registry] Case study/project slug not found: "${slug}" (route "${row.route}")`)
        failed = true
      }
    }
  }

  if (failed) {
    process.exit(1)
  }
  console.log('[validate-page-registry] OK')
}

main()