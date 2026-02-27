import { ComponentType } from 'react'
import Template_0 from './ContentEngagement'
import Template_1 from './ContentEngagementPillar'
import Template_2 from './DefaultPage'
import Template_3 from './expertise_demandgrowth_v1'
import Template_4 from './FallbackTemplate'
import Template_5 from './Uploaded_Expertise_ContentEngagement_v1'
import Template_6 from './Uploaded_Expertise_DemandGrowth_v1'

export const UPLOADED_TEMPLATE_BY_ID: Record<string, ComponentType<any>> = {
  'ContentEngagement': Template_0,
  'ContentEngagementPillar': Template_1,
  'DefaultPage': Template_2,
  'expertise_demandgrowth_v1': Template_3,
  'FallbackTemplate': Template_4,
  'Uploaded_Expertise_ContentEngagement_v1': Template_5,
  'Uploaded_Expertise_DemandGrowth_v1': Template_6,
}

export function getUploadedTemplate(templateId: string): ComponentType<any> | undefined {
  return UPLOADED_TEMPLATE_BY_ID[templateId]
}
