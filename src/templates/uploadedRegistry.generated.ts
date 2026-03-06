import { ComponentType } from 'react'
import Template_0 from './Uploaded_Industries_v1'

export const UPLOADED_TEMPLATE_BY_ID: Record<string, ComponentType<any>> = {
  'Uploaded_Industries_v1': Template_0,
}

export function getUploadedTemplate(templateId: string): ComponentType<any> | undefined {
  return UPLOADED_TEMPLATE_BY_ID[templateId]
}
