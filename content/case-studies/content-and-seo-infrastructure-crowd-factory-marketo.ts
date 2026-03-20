import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'content-and-seo-infrastructure-crowd-factory-marketo',
    title: 'Content & SEO Infrastructure',
    client: 'Crowd Factory / Marketo',
    description:
      'Built a content and SEO foundation that turned Crowd Factory (later Marketo) into a demand-generating content engine, significantly growing organic traffic and lead volume.',
    challenge:
      'Content was fragmented and not systematically mapped to personas, stages, or high-value topics. SEO efforts were ad hoc, limiting visibility for key product and category terms. Sales campaigns lacked a structured library of assets to support enterprise conversations. Measurement of content performance was limited to surface-level metrics. The brand needed a stronger thought leadership presence in the marketing automation space.',
    solution:
      'Content Architecture: Designed a structured content map aligned to personas, funnel stages, and key themes. SEO Strategy: Implemented a targeted keyword and on-page optimization program for core product and category terms. Campaign-Ready Assets: Built a repeatable library of whitepapers, blogs, and sales-enablement content. Performance Measurement: Tracked how content influenced traffic, engagement, and lead creation. Brand & Category Narrative: Used content to articulate a strong POV in the emerging marketing automation category.',
    results: [
      'Transformed content and SEO programs into a durable demand engine supporting enterprise campaigns',
      '164% YoY increase in unique visitors',
      '43% QoQ increase in net new leads attributed to content + SEO programs',
    ],
    tags: ['Content Marketing', 'SEO', 'Content Strategy', 'Thought Leadership'],
    industry: 'technology-saas',
    expertise: [
      'content-marketing',
      'content-strategy-systems',
      'search-engine-optimization',
      'digital-marketing',
      'marketing-analytics-reporting',
    ],
    metrics: [
      { label: 'Unique Visitors', value: '164%', change: 'YoY increase' },
      { label: 'Net New Leads', value: '43%', change: 'QoQ increase' },
    ],
    featured: true,
    year: '2014',
  }

export default caseStudy
