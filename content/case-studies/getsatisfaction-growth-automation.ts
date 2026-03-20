import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'getsatisfaction-growth-automation',
    title: '164% YoY Traffic Growth + 43% QoQ Lead Lift',
    client: 'Get Satisfaction / Crowd Factory',
    description:
      'Scaled inbound demand through Marketo automation, nurture architecture, and SEO/content velocity.',
    challenge:
      'Needed efficient net-new lead acquisition and traffic scaling pre-acquisition.',
    solution:
      'Implemented Marketo automation + scoring + multi-track nurture, paired with agile SEO and social content strategy.',
    results: [
      'Increased web traffic 164% YoY',
      'Boosted net-new leads 43% QoQ',
      'Lifted content engagement 30%',
    ],
    tags: ['Marketing Automation', 'SEO', 'Inbound Growth'],
    industry: 'b2b-saas',
    expertise: [
      'marketing-automation',
      'content-marketing',
      'seo',
      'email-marketing',
    ],
    metrics: [
      { label: 'Traffic', value: '164%', change: 'YoY' },
      { label: 'Leads', value: '43%', change: 'QoQ' },
    ],
    year: '2014',
  }

export default caseStudy
