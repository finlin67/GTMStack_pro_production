import type { TemplateId } from '@/src/data/pageRegistry.generated'
import { getUploadedTemplate } from './uploadedRegistry.generated'
import ExpertiseCategoryTemplate from '@/src/templates/expertise/ExpertiseCategoryTemplate'
import ExpertiseTopicTemplate from '@/src/templates/expertise/ExpertiseTopicTemplate'
import ExpertiseMainTemplate from '@/src/templates/expertise/ExpertiseMainTemplate'
import IndustryTemplate from '@/src/templates/industries/IndustryTemplate'
import IndustriesMainTemplate from '@/src/templates/industries/IndustriesMainTemplate'
import IndustriesStitchTemplate from '@/src/templates/industries/IndustriesStitchTemplate'
import ProjectsTemplate from '@/src/templates/projects/ProjectsTemplate'
import CaseStudyTemplate from '@/src/templates/caseStudies/CaseStudyTemplate'
import HomeTemplate from '@/src/templates/home/HomeTemplate'
import GalleryMainTemplate from '@/src/templates/gallery/GalleryMainTemplate'
import ProfileTemplate from '@/src/templates/profile/ProfileTemplate'
import AboutResumeTemplate from '@/src/templates/about/AboutResumeTemplate'
import HomeStitchTemplate from '@/src/templates/home/HomeStitchTemplate'
import Uploaded_Expertise_v1 from '@/src/templates/Uploaded_Expertise_v1'

export type TemplateComponent =
  | typeof ExpertiseCategoryTemplate
  | typeof ExpertiseTopicTemplate
  | typeof IndustryTemplate
  | typeof IndustriesMainTemplate
  | typeof ProjectsTemplate
  | typeof CaseStudyTemplate
  | typeof HomeTemplate
  | typeof ProfileTemplate
  | typeof ExpertiseMainTemplate
  | typeof AboutResumeTemplate
  | typeof HomeStitchTemplate
  | typeof Uploaded_Expertise_v1
  | typeof GalleryMainTemplate

/** TemplateId from page registry. */
export type RegistryTemplateId = TemplateId

/**
 * Maps templateId (from page registry) to the v1 template component.
 * Used for template-driven rendering; routing is unchanged in v1.
 */
export const TEMPLATE_BY_ID: Record<string, TemplateComponent> = {
  'expertise.category': ExpertiseCategoryTemplate,
  'expertise.topic': ExpertiseTopicTemplate,
  'expertise.main': ExpertiseMainTemplate,
  'industry.base': IndustryTemplate,
  'Uploaded_B2BTechIndustry_v1': IndustryTemplate,
  'Uploaded_IndustrialIndustry_v1': IndustryTemplate,
  'Uploaded_Sector_v1': IndustryTemplate,
  'Uploaded_Healthcare_v1': IndustryTemplate,
  'Uploaded_EDUtech_v1': IndustryTemplate,
  'industries.main': IndustriesMainTemplate,
  'industries.stitch.main': IndustriesStitchTemplate,
  'projects.main': ProjectsTemplate,
  'caseStudy.base': CaseStudyTemplate,
  'home.base': HomeTemplate,
  'home.main': HomeTemplate,
  'profile.main': ProfileTemplate,
  'about.main': AboutResumeTemplate,
  'home.stitch.main': HomeStitchTemplate,
  'Uploaded_Expertise_v1': Uploaded_Expertise_v1,
  'gallery.main': GalleryMainTemplate,
}

export function getTemplate(templateId: string): TemplateComponent {
  const CompatibilityComponent = TEMPLATE_BY_ID[templateId]
  if (CompatibilityComponent) return CompatibilityComponent

  // First try uploaded templates
  const Uploaded = getUploadedTemplate(templateId)
  if (Uploaded) return Uploaded as TemplateComponent

  // Fall back to legacy
  const Component = TEMPLATE_BY_ID[templateId]
  if (!Component) {
    throw new Error(`Unknown templateId: ${templateId}`)
  }
  return Component
}

