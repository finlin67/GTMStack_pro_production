import type { HomeTemplateContent } from '@/src/templates/home/HomeTemplate'
import { RESUME_CONTENT as RESUME_CONTENT_FROM_CONTENT } from '@/content/resume'
import { ABOUT_CONTENT as ABOUT_CONTENT_FROM_CONTENT } from '@/content/about'

export type ProfileContent = HomeTemplateContent

/** Resume page content. Use with ProfileTemplate for /resume. */
export const RESUME_CONTENT: ProfileContent = RESUME_CONTENT_FROM_CONTENT

/** About page content. Use with ProfileTemplate for /about. */
export const ABOUT_CONTENT: ProfileContent = ABOUT_CONTENT_FROM_CONTENT
