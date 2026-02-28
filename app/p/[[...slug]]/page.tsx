import type { ComponentType } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PAGE_REGISTRY } from '@/src/data/pageRegistry.generated'
import { getTemplate } from '@/src/templates/registry'
import { getContentByKey } from '@/src/content/registry'

type Props = {
  params: Promise<{ slug?: string[] }>
}

/**
 * Reconstructs the exact string path from the slug array.
 * This is for routes under /p, so we look up the route in PAGE_REGISTRY.
 */
function reconstructRoute(slug: string[] | undefined): string {
  if (!slug || slug.length === 0) return '/p'
  return '/p/' + slug.join('/')
}

export async function generateStaticParams() {
  return PAGE_REGISTRY
    .filter((row) => row.route === '/p' || row.route.startsWith('/p/'))
    .map((row) => {
      if (row.route === '/p') return { slug: [] }
      // Remove leading "/p/"
      const routeWithoutP = row.route.startsWith('/p/') ? row.route.slice(3) : ''
      return { slug: routeWithoutP ? routeWithoutP.split('/') : [] }
    })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
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
  const route = reconstructRoute(slug)
  
  // Find the object where the route exactly matches the reconstructed path string
  const page = PAGE_REGISTRY.find((p) => p.route === route)

  // If the route is not found in the registry array, immediately call Next.js notFound()
  if (!page) {
    notFound()
  }

  // Pass the found templateId to getTemplate() from src/templates/registry.ts
  const TemplateComponent = getTemplate(page.templateId) as ComponentType<{ content: unknown; pageTitle: string }>

  // Pass the found contentKey to getContentByKey() from src/content/registry.ts
  const content = getContentByKey(page.contentKey)

  // Return the Template component, passing the content as a content prop
  return <TemplateComponent content={content} pageTitle={page.pageTitle} />
}
