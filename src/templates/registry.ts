import type { TemplateId } from '@/src/data/pageRegistry.generated'
import ExpertiseCategoryTemplate from '@/src/templates/expertise/ExpertiseCategoryTemplate'
import ExpertiseTopicTemplate from '@/src/templates/expertise/ExpertiseTopicTemplate'
import IndustryTemplate from '@/src/templates/industries/IndustryTemplate'
import CaseStudyTemplate from '@/src/templates/caseStudies/CaseStudyTemplate'

export type TemplateComponent =
  | typeof ExpertiseCategoryTemplate
  | typeof ExpertiseTopicTemplate
  | typeof IndustryTemplate
  | typeof CaseStudyTemplate

/**
 * Maps templateId (from page registry) to the v1 template component.
 * Used for template-driven rendering; routing is unchanged in v1.
 */
export const TEMPLATE_BY_ID: Record<TemplateId, TemplateComponent> = {
  'expertise.category': ExpertiseCategoryTemplate,
  'expertise.topic': ExpertiseTopicTemplate,
  'industry.base': IndustryTemplate,
  'caseStudy.base': CaseStudyTemplate,
}

export function getTemplate(templateId: TemplateId): TemplateComponent {
  const Component = TEMPLATE_BY_ID[templateId]
  if (!Component) {
    throw new Error(`Unknown templateId: ${templateId}`)
  }
  return Component
}
