import type { ComponentType } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PAGE_REGISTRY } from '@/src/data/pageRegistry.generated'
import { getTemplate } from '@/src/templates/registry'
import { getContentByKey } from '@/src/content/registry'

type Props = {
  params: Promise<{ slug?: string[] }>
}

const RESERVED_PREFIXES = [
  'api',
  'admin',
  'blog',
  'tools',
  'p',
  '_next',
  'favicon.ico',
  'sitemap.xml',
  'robots.txt',
]

/**
 * Reconstructs the exact string path from the slug array.
 * For example, if slug is ['expertise', 'demand-growth'], returns '/expertise/demand-growth'.
 * If slug is undefined or empty, returns '/'.
 */
function reconstructRoute(slug: string[] | undefined): string {
  if (!slug || slug.length === 0) return '/'
  return '/' + slug.join('/')
}

export async function generateStaticParams() {
  // We want to generate static params for all routes in PAGE_REGISTRY
  // EXCEPT those that are reserved or handled elsewhere (like /p/...)
  return PAGE_REGISTRY
    .filter((row) => {
      const firstSegment = row.route.split('/')[1]
      // Skip empty first segment (root) as it's handled by {}
      // Skip reserved prefixes
      return firstSegment && !RESERVED_PREFIXES.includes(firstSegment)
    })
    .map((row) => {
      // Remove leading "/" and split into segments
      const routeSegments = row.route.startsWith('/') ? row.route.slice(1).split('/') : row.route.split('/')
      return { slug: routeSegments }
    })
    .concat([{ slug: [] }]) // Add root route
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (slug && slug.length > 0 && RESERVED_PREFIXES.includes(slug[0])) {
    return {}
  }

  const route = reconstructRoute(slug)
  const page = PAGE_REGISTRY.find((p) => p.route === route)

  if (!page) {
    return { title: '404 - Page Not Found' }
  }

  return {
    title: page.pageTitle,
  }
}

export default async function RegistryPage({ params }: Props) {
  const { slug } = await params

  // IMPORTANT: do not intercept these prefixes
  if (slug && slug.length > 0 && RESERVED_PREFIXES.includes(slug[0])) {
    notFound()
  }

  const route = reconstructRoute(slug)

  // Find the object where the route exactly matches the reconstructed path string
  const page = PAGE_REGISTRY.find((p) => p.route === route)

  // If the route is not found in the registry array, immediately call Next.js notFound()
  if (!page) {
    notFound()
  }

  // Pass the found templateId to getTemplate() from src/templates/registry.ts
  const TemplateComponent = getTemplate(page.templateId) as ComponentType<{
    content: unknown
    pageTitle: string
    heroVisualId?: string
  }>

  // Pass the found contentKey to getContentByKey() from src/content/registry.ts
  const content = getContentByKey(page.contentKey)

  // Return the Template component, passing the content and pageTitle
  return (
    <TemplateComponent
      content={content}
      pageTitle={page.pageTitle}
      heroVisualId={page.heroVisualId ? page.heroVisualId : undefined}
    />
  )
}
