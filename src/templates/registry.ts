import type { TemplateId } from '@/src/data/pageRegistry.generated'
import ExpertiseCategoryTemplate from '@/src/templates/expertise/ExpertiseCategoryTemplate'
import ExpertiseTopicTemplate from '@/src/templates/expertise/ExpertiseTopicTemplate'
import ExpertiseMainTemplate from '@/src/templates/expertise/ExpertiseMainTemplate'
import IndustryTemplate from '@/src/templates/industries/IndustryTemplate'
import CaseStudyTemplate from '@/src/templates/caseStudies/CaseStudyTemplate'
import HomeTemplate from '@/src/templates/home/HomeTemplate'


export type TemplateComponent =
  | typeof ExpertiseCategoryTemplate
  | typeof ExpertiseTopicTemplate
  | typeof IndustryTemplate
  | typeof CaseStudyTemplate
  | typeof HomeTemplate
  | typeof ExpertiseMainTemplate

/** TemplateId from page registry plus home (home is not in CSV yet). */
export type RegistryTemplateId = TemplateId | 'home.base'

/**
 * Maps templateId (from page registry) to the v1 template component.
 * Used for template-driven rendering; routing is unchanged in v1.
 */
export const TEMPLATE_BY_ID: Record<RegistryTemplateId, TemplateComponent> = {
  'expertise.category': ExpertiseCategoryTemplate,
  'expertise.topic': ExpertiseTopicTemplate,
  
  'expertise.main': ExpertiseMainTemplate,'industry.base': IndustryTemplate,
  'caseStudy.base': CaseStudyTemplate,
  'home.base': HomeTemplate,
}

export function getTemplate(templateId: RegistryTemplateId): TemplateComponent {
  const Component = TEMPLATE_BY_ID[templateId]
  if (!Component) {
    throw new Error(`Unknown templateId: ${templateId}`)
  }
  return Component
}

