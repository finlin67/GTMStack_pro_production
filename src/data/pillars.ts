import type { PillarId } from '@/src/templates/expertise/pillars/pillarMap'
import { PILLAR_TITLES } from '@/src/templates/expertise/pillars/pillarMap'

import { CONTENT_ENGAGEMENT_CONTENT } from '@/content/expertise/pillars/content-engagement'
import { DEMAND_GROWTH_CONTENT } from '@/content/expertise/pillars/demand-growth'
import { STRATEGY_INSIGHTS_CONTENT } from '@/content/expertise/strategy-insights'
import { SYSTEMS_OPERATIONS_CONTENT } from '@/content/expertise/pillars/systems-operations'

export type { PillarId }

export interface PillarPalette {
  /** Primary brand color for the pillar (used for buttons, links, accents). */
  primary: string
  /** Secondary accent / gradient stop. */
  secondary: string
  /** Background base for pillar pages. */
  background: string
  /** Soft overlay/tint for hero or cards. */
  overlay: string
}

export const PILLAR_IDS: PillarId[] = [
  'content-engagement',
  'demand-growth',
  'strategy-insights',
  'systems-operations',
]

export const PILLAR_PALETTES: Record<PillarId, PillarPalette> = {
  'content-engagement': {
    // Blue / yellow
    primary: '#2563EB',
    secondary: '#FACC15',
    background: '#020617', // slate-950
    overlay: '#0E1748',
  },
  'demand-growth': {
    // Blue / green
    primary: '#1D4ED8',
    secondary: '#22C55E',
    background: '#020617',
    overlay: '#0D1645',
  },
  'strategy-insights': {
    // White / purple
    primary: '#7C3AED',
    secondary: '#E5E7EB',
    background: '#020617',
    overlay: '#0C1442',
  },
  'systems-operations': {
    // Teal / blue
    primary: '#0EA5E9',
    secondary: '#22D3EE',
    background: '#020617',
    overlay: '#0D1650',
  },
}

export interface PillarContentEntry {
  id: PillarId
  title: string
  /** Underlying rich content object for the pillar category page. */
  content: unknown
}

export const PILLAR_CONTENT: Record<PillarId, PillarContentEntry> = {
  'content-engagement': {
    id: 'content-engagement',
    title: PILLAR_TITLES['content-engagement'],
    content: CONTENT_ENGAGEMENT_CONTENT,
  },
  'demand-growth': {
    id: 'demand-growth',
    title: PILLAR_TITLES['demand-growth'],
    content: DEMAND_GROWTH_CONTENT,
  },
  'strategy-insights': {
    id: 'strategy-insights',
    title: PILLAR_TITLES['strategy-insights'],
    content: STRATEGY_INSIGHTS_CONTENT,
  },
  'systems-operations': {
    id: 'systems-operations',
    title: PILLAR_TITLES['systems-operations'],
    content: SYSTEMS_OPERATIONS_CONTENT,
  },
}

