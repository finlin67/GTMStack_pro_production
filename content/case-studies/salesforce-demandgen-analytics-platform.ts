import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'salesforce-demandgen-analytics-platform',
    title: 'Reporting Cycle Cut from 4 Days to 2 Hours',
    client: 'Salesforce',
    description:
      'Rebuilt global demand gen analytics, migrating spreadsheet scorecards to real-time executive dashboards.',
    challenge:
      '95+ marketers relied on manual scorecards causing lag, inconsistency, and low trust in performance signals.',
    solution:
      'Migrated reporting into Tableau/Einstein dashboards, formalized Marketing Insights & Analytics practice, and trained teams on KPI usage.',
    results: [
      'Reduced refresh/insight delivery from 4 days → 2 hours',
      'Enabled 76% YoY lift in marketing-attributed pipeline',
      'Improved SQL generation by 65% through clearer targeting signals',
    ],
    tags: ['Marketing Ops', 'Analytics', 'Dashboards', 'Demand Gen'],
    industry: 'b2b-saas',
    expertise: [
      'marketing-operations',
      'product-marketing',
      'growth-marketing',
    ],
    metrics: [
      { label: 'Time to Insight', value: '2 hours', change: 'from 4 days' },
      { label: 'Pipeline Lift', value: '76%', change: 'YoY' },
      { label: 'SQL Lift', value: '65%', change: 'Increase' },
    ],
    featured: true,
    year: '2021',
  }

export default caseStudy
