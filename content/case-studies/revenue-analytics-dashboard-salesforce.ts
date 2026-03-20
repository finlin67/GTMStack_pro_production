import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'revenue-analytics-dashboard-salesforce',
    title: 'Revenue Analytics Dashboard',
    client: 'Salesforce',
    description:
      'Transformed Salesforce\'s global NGO and Education GTM reporting by building a unified revenue analytics system that replaced manual spreadsheets with automated, trustworthy dashboards.',
    challenge:
      'Leaders lacked a single, accurate view of pipeline, performance, and campaign contribution. Reporting relied on manual spreadsheets, leading to delays, data drift, and inconsistent insights. Data quality issues across CRM and MAP systems created mistrust in reported metrics. Regional teams needed role-based dashboards aligned to their KPIs and operational rhythms. DemandGen and Campaign teams had no scalable framework for validating or interpreting data.',
    solution:
      'BI Pipeline Architecture: Designed ETL workflows connecting CRM, MAP, and Business Objects data. Data QA Framework: Implemented Oracle SQL validation rules to ensure data accuracy before reporting. Executive Dashboard System: Built interactive Tableau dashboards for CMOs, regional leads, and ops teams. Unified KPI Framework: Standardized definitions for pipeline stages, contribution, and attribution. Automation Layer: Replaced multi-day manual reporting with automated refreshes and alerts.',
    results: [
      'Established the analytical backbone for global GTM decisions across NGO and Education verticals',
      'Reduced reporting time by 190% (4 days → 2 hours)',
      'Improved data quality by ~85%',
      'Supported 250M+ pipeline tracking',
    ],
    tags: ['Revenue Operations', 'Analytics', 'BI', 'Data Governance', 'Dashboards'],
    industry: 'public-sector-education',
    expertise: [
      'marketing-analytics-reporting',
      'revenue-operations',
      'data-governance',
      'bi-data-engineering',
      'marketing-operations',
    ],
    metrics: [
      { label: 'Reporting Time', value: '2 hours', change: 'from 4 days (190% reduction)' },
      { label: 'Data Quality', value: '85%', change: 'Improved' },
      { label: 'Pipeline Tracked', value: '$250M+', change: 'Supported' },
    ],
    featured: true,
    year: '2021',
  }

export default caseStudy
