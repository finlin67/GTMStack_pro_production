import { ComponentType } from 'react'
import Template_0 from './ContentEngagement'
import Template_1 from './ContentEngagementPillar'
import Template_2 from './DefaultPage'
import Template_3 from './expertise_demandgrowth_v1'
import Template_4 from './FallbackTemplate'
import Template_5 from './Uploaded_AnimationGallery_v1'
import Template_6 from './Uploaded_B2BTechIndustry_v1'
import Template_7 from './Uploaded_BlogFeed_v1'
import Template_8 from './Uploaded_BlogSinglePost_v1'
import Template_9 from './Uploaded_CaseStudies_v1'
import Template_10 from './Uploaded_CaseStudySingle_v1'
import Template_11 from './Uploaded_DemandGrowth_v1'
import Template_12 from './Uploaded_EDUtech_v1'
import Template_13 from './Uploaded_Expertise_ContentEngagement_v1'
import Template_ContentEngagement from './Uploaded_ContentEngagement_v1'
import Template_14 from './Uploaded_Expertise_DemandGrowth_v1'
import Template_15 from './Uploaded_GalleryModal_v1'
import Template_16 from './Uploaded_Healthcare_v1'
import Template_17 from './Uploaded_Industries_v1'
import Template_18 from './Uploaded_Sector_v1'
import Template_19 from './Uploaded_StratInsights_v1'
import Template_20 from './Uploaded_SystemOperations_v1'

export const UPLOADED_TEMPLATE_BY_ID: Record<string, ComponentType<any>> = {
  'ContentEngagement': Template_0,
  'ContentEngagementPillar': Template_1,
  'DefaultPage': Template_2,
  'expertise_demandgrowth_v1': Template_3,
  'FallbackTemplate': Template_4,
  'Uploaded_AnimationGallery_v1': Template_5,
  'Uploaded_B2BTechIndustry_v1': Template_6,
  'Uploaded_BlogFeed_v1': Template_7,
  'Uploaded_BlogSinglePost_v1': Template_8,
  'Uploaded_CaseStudies_v1': Template_9,
  'Uploaded_CaseStudySingle_v1': Template_10,
  'Uploaded_DemandGrowth_v1': Template_11,
  'Uploaded_EDUtech_v1': Template_12,
  'Uploaded_Expertise_ContentEngagement_v1': Template_13,
  'Uploaded_ContentEngagement_v1': Template_ContentEngagement,
  'Uploaded_Expertise_DemandGrowth_v1': Template_14,
  'Uploaded_GalleryModal_v1': Template_15,
  'Uploaded_Healthcare_v1': Template_16,
  'Uploaded_Industries_v1': Template_17,
  'Uploaded_Sector_v1': Template_18,
  'Uploaded_StratInsights_v1': Template_19,
  'Uploaded_SystemOperations_v1': Template_20,
}

export function getUploadedTemplate(templateId: string): ComponentType<any> | undefined {
  return UPLOADED_TEMPLATE_BY_ID[templateId]
}
