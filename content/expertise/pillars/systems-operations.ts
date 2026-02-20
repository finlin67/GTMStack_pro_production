/**
 * Content for Systems & Operations pillar (category and topic pages).
 * Used by SystemsOperationsPillar template.
 */

export interface SystemsOperationsMetric {
  value: string
  label: string
}

export interface SystemsOperationsService {
  iconKey: string
  title: string
  description: string
}

export interface SystemsOperationsInsight {
  category: string
  title: string
  gradient: string
}

export interface SystemsOperationsContent {
  metrics: SystemsOperationsMetric[]
  services: SystemsOperationsService[]
  insights: SystemsOperationsInsight[]
}

export const SYSTEMS_OPERATIONS_CONTENT: SystemsOperationsContent = {
  metrics: [
    { value: '98.2%', label: 'Stack Efficiency' },
    { value: '100%', label: 'Data Accuracy' },
    { value: '+45%', label: 'Workflow Velocity' },
    { value: '92%', label: 'AI Governance' },
  ],
  services: [
    {
      iconKey: 'zap',
      title: 'AI-Augmented Marketing Workflows',
      description:
        'Embed generative AI directly into your production pipelines with robust governance and scale.',
    },
    {
      iconKey: 'refresh-cw',
      title: 'Marketing Automation & Orchestration',
      description:
        'Centralize lead lifecycle and multi-channel triggers through high-performance automation platforms.',
    },
    {
      iconKey: 'users',
      title: 'Marketing Operations (RevOps Alignment)',
      description:
        'Aligning sales and marketing systems to create a unified data model and shared revenue objectives.',
    },
    {
      iconKey: 'bar-chart-3',
      title: 'Analytics & Attribution',
      description:
        'Advanced multi-touch attribution models and real-time executive dashboards for revenue clarity.',
    },
    {
      iconKey: 'database',
      title: 'Martech Stack Optimization',
      description:
        'Rationalize redundant tools and maximize the ROI of your existing software investments.',
    },
    {
      iconKey: 'edit-3',
      title: 'Sales & Marketing Enablement Systems',
      description:
        'Equipping customer-facing teams with the right data, content, and tools at the right moment.',
    },
  ],
  insights: [
    {
      category: 'Case Study',
      title: 'Stack Transformation: FinTech Global',
      gradient: 'from-[#2563EB]/20 to-transparent',
    },
    {
      category: 'Visual',
      title: 'Gallery: RevOps Data Flow Maps',
      gradient: 'from-[#F97316]/10 to-transparent',
    },
    {
      category: 'Blog',
      title: 'Governing AI in High-Growth Ops',
      gradient: 'from-[#EAB308]/10 to-transparent',
    },
    {
      category: 'Tool',
      title: 'RevOps Maturity Assessment',
      gradient: 'from-[#3B82F6]/20 to-[#F97316]/10',
    },
  ],
}
