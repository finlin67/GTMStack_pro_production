/**
 * Content for /projects (projects:main).
 * Shape matches ProjectsTemplate TemplateContent.
 * Icon/badge values are Lucide icon names; template maps them to components.
 */
export const PROJECTS_MAIN_CONTENT = {
  hero: {
    badge: 'Proven GTM Execution',
    title: 'Outcome-First Blueprints',
    subtitle:
      'Real client transformations shipped like products. We don\'t just advise; we engineer the systems that power sustainable scale.',
    primaryCta: 'View All Projects',
    secondaryCta: 'Request Similar Blueprint',
  },
  metrics: [
    { value: '$500M+', label: 'Pipeline' },
    { value: '47%', label: 'Revenue Lift' },
    { value: '2.8x', label: 'Velocity' },
    { value: '100%', label: 'Attribution' },
  ],
  projects: [
    {
      id: 1,
      category: 'RevOps',
      title: 'PRGX: Global Unification',
      description:
        'Complete end-to-end RevOps unification across 14 territories, standardizing data architecture and lifecycle stages.',
      icon: 'Settings2',
      badge: 'TrendingUp',
      achievement: 'Multi-$M pipeline lift (program-level)',
    },
    {
      id: 2,
      category: 'ABM',
      title: 'AMCS: Industry Framework',
      description:
        'Developed an industry-specific account-based framework for high-intent waste management hardware solutions.',
      icon: 'Target',
      badge: 'CheckCircle2',
      achievement: '200% cleaner target accounts',
    },
    {
      id: 3,
      category: 'Enterprise ABM',
      title: 'Red Hat: Global Orchestration',
      description:
        'Orchestrating complex enterprise-level demand across global regions with unified reporting and strategic scale.',
      icon: 'Network',
      badge: 'Zap',
      achievement: 'Accelerated Strategic Alignment',
    },
    {
      id: 4,
      category: 'Demand Systems',
      title: 'Salesforce: Analytics Rebuild',
      description:
        'Total systemic rebuild of attribution logic and demand analytics to prove multi-touch marketing ROI.',
      icon: 'BarChart3',
      badge: 'PieChart',
      achievement: '100% Attribution Visibility',
    },
  ],
  quote: {
    text: "Projects aren't case studies — they're ",
    highlight: 'engineered revenue systems',
  },
  navigation: ['Methodology', 'Expertise', 'Projects (Active)', 'Industries', 'About Me'],
} as const
