import GalleryMainTemplateClient, {
  GalleryMainTemplateProps,
  GalleryItemClient,
} from './GalleryMainTemplate.client'
import { getGalleryItems } from '@/src/lib/galleryManifest'

export default function GalleryMainTemplate(props: GalleryMainTemplateProps) {
  const items = getGalleryItems()

  // Map server-side GalleryItem shape to the lightweight client shape
  const initialItems: GalleryItemClient[] = items.map((item) => ({
    id: item.id,
    slug: item.slug,
    animationId: item.animationId,
    title: item.title,
    summary: item.summary ?? null,
    category: item.displayCategory,
    tags: item.displayTags,
    thumbnailUrl: item.thumbnailUrl,
    githubUrl: item.githubUrl,
    githubReadmeUrl: item.githubReadmeUrl,
    updatedAt: item.updatedAt ?? null,
  }))

  return <GalleryMainTemplateClient {...props} initialItems={initialItems} />
}

