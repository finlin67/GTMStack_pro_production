export interface ResumeMetric {
  value: string
  label: string
}

export type ResumeFilterTag =
  | 'All'
  | 'Demand Gen'
  | 'ABM'
  | 'Marketing Ops'
  | 'Finance Era'

export type ResumeEra = 'Recent' | 'Salesforce Era' | 'Marketing/Tech' | 'Finance Era'

export interface ResumeRole {
  id: number
  era: ResumeEra
  years: string
  title: string
  company: string
  tags: ResumeFilterTag[]
  metric: ResumeMetric | null
  bullets: string[]
}

export const RESUME_ERA_COLORS: Record<ResumeEra, string> = {
  Recent: '#2E7CF6',
  'Salesforce Era': '#22c55e',
  'Marketing/Tech': '#E8620A',
  'Finance Era': '#8E44AD',
}

export const RESUME_ROLES: ResumeRole[] = [
  {
    id: 1,
    era: 'Recent',
    years: '2024 - 2025',
    title: 'Director, Digital Marketing & ABM',
    company: 'PRGX Global',
    tags: ['Demand Gen', 'ABM', 'Marketing Ops'],
    metric: { value: '$9M', label: 'Pipeline' },
    bullets: [
      'Designed unified revenue operating model across Salesforce, DemandBase, and analytics platforms',
      '130% YoY increase in MQLs; 180% improvement in MQL-to-SQL conversion',
      'Led 3-person team managing global ABM, digital campaigns, and executive events',
    ],
  },
  {
    id: 2,
    era: 'Recent',
    years: '2023 - 2024',
    title: 'Director, Account-Based Marketing',
    company: 'AMCS Group',
    tags: ['ABM', 'Demand Gen'],
    metric: { value: '$1.2M', label: 'Pipeline / 90 Days' },
    bullets: [
      'Architected end-to-end ABM framework for Fortune 2500 accounts, $1.2M pipeline within 90 days',
      'Enhanced MQLs by 35% and shortened sales cycle by 30% through unified GTM narrative',
      'Elevated campaign ROI by 50% via channel sales demand-gen partnership',
    ],
  },
  {
    id: 3,
    era: 'Recent',
    years: '2021 - 2023',
    title: 'Sr. Principal Program Manager, ABM',
    company: 'Red Hat',
    tags: ['ABM', 'Marketing Ops'],
    metric: { value: '33%', label: 'Global Pipeline Influenced' },
    bullets: [
      'Verticalized ABM programs for global enterprise CXOs, $12M in new pipeline',
      'Designed ABM Customer Activation framework for 200+ enterprise accounts and 65+ field marketers',
      'Launched lifecycle initiatives generating $18M in upsell pipeline',
    ],
  },
  {
    id: 4,
    era: 'Salesforce Era',
    years: '2014 - 2021',
    title: 'Global Marketing Operations Leader',
    company: 'Salesforce',
    tags: ['Marketing Ops', 'Demand Gen'],
    metric: { value: '76%', label: 'YoY Pipeline Growth' },
    bullets: [
      'Migrated scorecards to Tableau, reducing reporting refresh from 4 days to 2 hours (190% improvement)',
      '76% YoY increase in marketing-attributed pipeline and 63% YoY growth in ACV',
      'Led ABM Center of Excellence, increasing pipeline 30% YoY using propensity data',
    ],
  },
  {
    id: 5,
    era: 'Marketing/Tech',
    years: '2012 - 2014',
    title: 'Director, Demand Generation',
    company: 'Get Satisfaction',
    tags: ['Demand Gen', 'Marketing Ops'],
    metric: null,
    bullets: [
      'Owned all demand generation: lead gen, marketing automation, SEM, SEO, sales enablement',
      'Built Marketo system end-to-end including data management, lead scoring, and nurture programs',
    ],
  },
  {
    id: 6,
    era: 'Marketing/Tech',
    years: '2011 - 2012',
    title: 'Senior Manager, Marketing & Communications',
    company: 'Crowd Factory (Acq. by Marketo)',
    tags: ['Demand Gen'],
    metric: { value: '164%', label: 'YoY Traffic Growth' },
    bullets: [
      'SEO and content program drove 164% YoY unique visitor growth',
      'Marketo nurture architecture delivered 43% QoQ lead increase',
    ],
  },
  {
    id: 7,
    era: 'Marketing/Tech',
    years: '2008 - 2011',
    title: 'Global Online Marketing Manager',
    company: 'Embarcadero Technologies',
    tags: ['Marketing Ops', 'Demand Gen'],
    metric: null,
    bullets: [
      'Managed SEO, SEM, social media, reputation management, and content syndication globally',
      'Marketing Ops lead: Salesforce, Eloqua, Responsys',
    ],
  },
  {
    id: 8,
    era: 'Marketing/Tech',
    years: '2006 - 2008',
    title: 'Senior Manager, Online Marketing',
    company: 'SalemGlobal Internet',
    tags: ['Demand Gen'],
    metric: { value: '500%', label: 'Client Growth YoY' },
    bullets: [
      '500% growth in new clients YoY; 85% retention rate',
      'Managed business development, prospecting, and client onboarding',
    ],
  },
  {
    id: 9,
    era: 'Finance Era',
    years: '2005 - 2006',
    title: 'Business Analyst',
    company: 'Bank of Tokyo-Mitsubishi',
    tags: ['Finance Era'],
    metric: null,
    bullets: [
      'Designed and implemented Credit Portfolio Management System (CPMS)',
      'Hands-on application development, test plans, and technical documentation',
    ],
  },
  {
    id: 10,
    era: 'Finance Era',
    years: '2003 - 2005',
    title: 'Learning Management Systems Strategist',
    company: "Standard & Poor's",
    tags: ['Finance Era'],
    metric: null,
    bullets: [
      'Led LMS implementation; delivered product trainings for multiple business units',
      'Recognized by CEO for delivering one of the first MarTech projects on-time and within budget in 10 years',
    ],
  },
  {
    id: 11,
    era: 'Finance Era',
    years: '2000 - 2002',
    title: 'Learning & Professional Development Analyst',
    company: 'Goldman Sachs',
    tags: ['Finance Era'],
    metric: null,
    bullets: [
      'Directed implementation of Enterprise LMS and managed all eLearning projects',
      'Built complete reporting system and global KPI tracking',
    ],
  },
]

export const RESUME_CATEGORY_OPTIONS = [
  'All Categories',
  'Demand Gen',
  'ABM',
  'Marketing Ops',
  'Finance Era',
] as const

export const RESUME_ERA_OPTIONS = [
  'All Eras',
  'Recent (2021+)',
  'Salesforce Era',
  'Marketing/Tech',
  'Finance Era',
] as const

export const RESUME_STATS = [
  { value: '25 Years', label: 'Experience' },
  { value: '11', label: 'Roles Across Industries' },
  { value: '$22M+', label: 'Pipeline Generated' },
  { value: '4', label: 'Fortune 500 Companies' },
]
