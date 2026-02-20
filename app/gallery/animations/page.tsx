import { redirect } from 'next/navigation'

/**
 * /gallery/animations redirects to canonical /gallery route.
 */
export default function GalleryAnimationsPage() {
  redirect('/gallery')
}
