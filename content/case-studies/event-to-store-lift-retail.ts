import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'event-to-store-lift-retail',
    title: 'Event-to-Store Revenue Lift',
    client: 'Retail Brand (Confidential)',
    description:
      'Designed an event-led activation program that connected experiential marketing with in-store behavior, driving measurable revenue lift for a retail brand.',
    challenge:
      'Events were treated as isolated brand moments without structured follow-up or clear revenue goals. There was limited visibility into how event engagement translated into in-store visits or purchases. Sales and field teams lacked clear pre- and post-event playbooks for outreach and conversion. Customer data from events was not consistently captured, integrated, or activated in downstream systems. Attribution for event impact was anecdotal rather than quantitative.',
    solution:
      'Pre-Event Targeting: Identified and invited high-value customer segments to curated experiences. On-Site Data Capture: Implemented structured data collection to tie attendees to downstream behavior. Post-Event Journeys: Designed follow-up sequences across email, SMS, and paid retargeting. Store Lift Measurement: Compared in-store conversion and purchase behavior between exposed and control groups. Field Activation Kits: Equipped store and field teams with talk tracks, offers, and follow-up guidance.',
    results: [
      'Linked experiential event programs directly to in-store and near-term revenue impact',
      'Measured store lift in exposed audiences',
      'Increased conversion rates and repeat engagement following events',
    ],
    tags: ['Event Marketing', 'Retail', 'Field Activation', 'Attribution'],
    industry: 'retail-ecommerce',
    expertise: [
      'event-field-marketing',
      'omnichannel-marketing',
      'customer-experience',
      'growth-marketing',
      'attribution-and-measurement',
    ],
    metrics: [
      { label: 'Store Lift', value: 'Measured', change: 'Exposed audiences' },
      { label: 'Conversion Rates', value: 'Increased', change: 'Post-event' },
      { label: 'Repeat Engagement', value: 'Increased', change: 'Following events' },
    ],
    featured: true,
    year: '2023',
  }

export default caseStudy
