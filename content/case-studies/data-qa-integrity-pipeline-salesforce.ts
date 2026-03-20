import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'data-qa-integrity-pipeline-salesforce',
    title: 'Data QA & Integrity Pipeline',
    client: 'Salesforce (Salesforce.org)',
    description:
      'Built a rigorous data QA and validation pipeline connecting Oracle, Business Objects, and Salesforce CRM to ensure reporting accuracy for global GTM teams.',
    challenge:
      'Data feeding the marketing and revenue dashboards was inconsistent and prone to quality issues. Reporting involved manual reconciliation across Oracle, BO, and CRM sources every week. Pipeline errors caused misalignment between Marketing, Sales, and Finance KPIs. Leadership lacked confidence in the accuracy of pipeline, contribution, and performance metrics. Data integrity checks were undocumented, unscalable, and reliant on individual knowledge.',
    solution:
      'Oracle SQL Validation: Built reusable SQL scripts for validating pipeline, stage progression, and campaign data. Business Objects QA Workflow: Standardized extraction and integrity checks before CRM ingestion. Data Reconciliation Framework: Mapped cross-system discrepancies and automated resolution steps. Documentation & Governance: Created repeatable procedures enabling operational continuity. Integration Layer Hardening: Strengthened dependencies between CRM, MAP, and BI pipelines.',
    results: [
      'Established a durable data QA pipeline that ensured consistent, trusted reporting for global GTM teams',
      'Improved data quality by ~85%',
      'Reduced reporting errors dramatically',
      'Accelerated update cycles by 190%',
    ],
    tags: ['Data Governance', 'Data QA', 'BI', 'Data Integrity', 'Pipeline'],
    industry: 'public-sector-education',
    expertise: [
      'data-governance',
      'marketing-analytics-reporting',
      'bi-data-engineering',
      'marketing-operations',
      'revenue-operations',
    ],
    metrics: [
      { label: 'Data Quality', value: '85%', change: 'Improved' },
      { label: 'Reporting Errors', value: 'Dramatically reduced', change: 'Accuracy' },
      { label: 'Update Cycles', value: '190%', change: 'Accelerated' },
    ],
    featured: true,
    year: '2021',
  }

export default caseStudy
