/**
 * Content for /industries (industries:main).
 * Shape matches IndustriesMainTemplate TemplateContent.
 */
export const INDUSTRIES_MAIN_CONTENT = {
  brand: {
    name: 'GTMStack.pro',
    logoIcon: 'architecture',
  },
  hero: {
    badge: 'Industries',
    title: 'How GTM Systems Adapt by Industry Context',
    description:
      'A cross-section of markets where the same core systems had to adapt to different buying teams, regulations, data environments, and sales-motion realities.',
    metrics: [
      { value: '8', label: 'Industry Contexts' },
      { value: '4', label: 'Constraint Types' },
      { value: '1', label: 'Core GTM Foundation' },
    ],
    backgroundImage:
      'https://images.unsplash.com/photo-1558494949-efc535b5c47c?q=80&w=2574&auto=format&fit=crop',
    dashboardImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGb9zAY1V-Hn7E_MGuruZbgqmXIJBHmfEzEL5s8RzT59DT0oN5VVEnIbdoRSM-G6fsosAXNnkFkOG_zAg9FPJd1DHYn91499w_0nrP8szZRvOjuAuQFKIH-zgyyUXiqjDvmOMTrdCZLNiQDJmYxdEQ_SXEp8kVy79iUrvLsOLHQgINEh3yCdfAyIH2y0JZe97OSCPr2cWZTcz5tj9anRHnG_dQEa_q7stT9awkNit_OICYUtzpL2SMwaALPJCLqjGmrPg1a1sxexcw',
  },
  challenges: {
    sectionTitle: 'What Changes by Industry',
    sectionDescription:
      'The system stays recognizable, but the constraints change: who buys, what slows approval, what proof is needed, and which workflows have to adapt.',
    items: [
      {
        icon: 'gavel',
        title: 'Regulatory Friction',
        description:
          'Compliance and review steps change what can be said, what data can be used, and how quickly opportunities can move.',
        statValue: 'Policy',
        statLabel: 'Constraint Layer',
        colorClass: 'bg-orange-50 text-orange-600',
      },
      {
        icon: 'groups',
        title: 'Buying Committees',
        description:
          'The stakeholder mix shifts by market, which changes messaging, handoff points, and what proof each audience needs.',
        statValue: 'People',
        statLabel: 'Decision Layer',
        colorClass: 'bg-blue-50 text-[#1c6ef2]',
      },
      {
        icon: 'dataset',
        title: 'Data Silos',
        description:
          'Source systems, reporting requirements, and integration gaps vary widely, so measurement and routing have to adjust.',
        statValue: 'Systems',
        statLabel: 'Workflow Layer',
        colorClass: 'bg-purple-50 text-purple-600',
      },
    ],
  },
  industries: {
    sectionTitle: 'Contexts Covered',
    items: [
      {
        icon: 'account_balance',
        name: 'Financial Services',
        description: 'Payment and banking environments where trust, compliance review, and long buying cycles reshape messaging and proof.',
        outcome: 'Trust + Compliance Context',
      },
      {
        icon: 'security',
        name: 'Cybersecurity',
        description: 'Security markets where technical depth, credibility, and executive consensus shape outreach and sales motion.',
        outcome: 'Credibility-Heavy Buying Motion',
      },
      {
        icon: 'medical_services',
        name: 'Healthcare',
        description: 'Healthcare environments where privacy rules, provider complexity, and regulated data handling change journey design.',
        outcome: 'Privacy-Constrained Journey Design',
      },
      {
        icon: 'factory',
        name: 'Manufacturing & Industrial',
        description: 'Industrial buying environments with multi-role committees, channel partners, and long evaluation cycles.',
        outcome: 'Multi-Stakeholder Industrial Motion',
      },
      {
        icon: 'cloud',
        name: 'Enterprise SaaS',
        description: 'Software markets where PLG, enterprise sales, lifecycle automation, and attribution have to work together.',
        outcome: 'Hybrid PLG + Sales Motion',
      },
      {
        icon: 'work',
        name: 'Professional Services',
        description: 'Service-led businesses where packaging, proposal flow, and delivery proof influence conversion quality.',
        outcome: 'Proposal-Driven Buying Flow',
      },
      {
        icon: 'bolt',
        name: 'Energy & Utilities',
        description: 'Infrastructure and transition-focused markets with long contracts, operational stakeholders, and heavy compliance context.',
        outcome: 'Operational + Regulatory Complexity',
      },
      {
        icon: 'public',
        name: 'Public Sector & Government',
        description: 'Procurement-driven environments where documentation, approval paths, and timeline complexity shape GTM execution.',
        outcome: 'Procurement-Led Sales Motion',
      },
    ],
  },
  proofStrip: [
    { label: 'Financial Services', value: 'Compliance-aware nurture and trust-heavy proof' },
    { label: 'Cybersecurity', value: 'Executive credibility and technical validation paths' },
    { label: 'Healthcare', value: 'Privacy-safe journeys and multi-stakeholder routing' },
    { label: 'SaaS', value: 'PLG, lifecycle, and enterprise handoff alignment' },
  ],
  comparison: {
    title: 'Why Industry Context Matters',
    description: 'Generic GTM breaks down when buying environments become more regulated, technical, or operationally complex.',
    badPoints: [
      'Generic outreach that ignores buying environment and approval flow.',
      'Late recognition of compliance, procurement, or technical review constraints.',
      'One-size-fits-all reporting and handoff logic across unlike markets.',
    ],
    goodPoints: [
      'Messaging, proof, and workflow adapted to the actual buying context.',
      'System design that accounts for regulation, review steps, and stakeholder mix.',
      'Measurement and routing aligned to how each market actually operates.',
    ],
  },
  testimonial: {
    quote:
      "The useful shift was seeing how the same system had to change once the market's buying reality came into focus.",
    author: 'Marcus Thorne',
    role: 'CRO, FinTech Enterprise',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop',
    logos: ['ACME Corp', 'Globex', 'Soylent', 'Initech', 'Umbrella'],
  },
}

export default INDUSTRIES_MAIN_CONTENT
