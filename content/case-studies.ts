import type { CaseStudyItem } from '@/lib/types'

export const caseStudyItems: CaseStudyItem[] = [
  {
    slug: 'abm-system-launch-prgx',
    title: 'ABM System Launch',
    client: 'PRGX Global',
    description:
      "Built PRGX's first fully unified ABM system—integrating targeting, personalization, measurement, and sales alignment to drive revenue impact across enterprise accounts.",
    challenge:
      'PRGX had no formal ABM program, playbooks, or aligned ICP model for enterprise targeting. Marketing, Sales, and Operations were operating in silos with inconsistent definitions and engagement strategies. Lack of visibility into account intent, engagement, and buying committees limited progression. Content and messaging were not structured for personalization across tiers and personas.',
    solution:
      'ABM Operating System: Designed a unified strategy including ICP, tiering, and account selection rules. Intent & Signal Integration: Connected Demandbase, CRM, and MAP to surface account-level insights. Multi-Threaded Sales Alignment: Built playbooks and processes for deep stakeholder engagement. Personalization Infrastructure: Created modular messaging for industries, personas, and account tiers. Measurement Framework: Established MQAs, progression metrics, and sales alignment reporting.',
    results: [
      'Launched a scalable ABM engine enabling coordinated marketing + sales motions across 300 enterprise accounts',
      '87% YoY pipeline growth',
      '180% lift in MQL→SQL conversion',
      '200% increase in strategic account engagement',
    ],
    tags: ['ABM', 'Enterprise GTM', 'Sales Alignment', 'Account Intelligence'],
    industry: 'financial-services',
    expertise: [
      'account-based-marketing',
      'marketing-operations',
      'demand-generation',
      'sales-enablement-alignment',
      'ai-in-marketing',
    ],
    metrics: [
      { label: 'Pipeline Growth', value: '87%', change: 'YoY' },
      { label: 'MQL→SQL Lift', value: '180%', change: 'Lift' },
      { label: 'Account Engagement', value: '200%', change: 'Increase' },
    ],
    featured: true,
    year: '2024',
  },

  {
    slug: 'abm-journey-discrete-manufacturing-prgx',
    title: 'Discrete Manufacturing ABM Journey',
    client: 'PRGX Global',
    description:
      'Designed an industry-specific ABM journey for discrete manufacturing accounts, mapping buying committee needs across awareness, evaluation, and expansion stages.',
    challenge:
      'Discrete manufacturing accounts had long, multi-layered buying cycles spanning engineering, procurement, finance, and plant operations. Sales and marketing lacked a unified narrative tailored to manufacturing-specific value drivers. Industry content and messaging were not structured for persona and maturity-level personalization. Account progression signals were inconsistent, making prioritization difficult. Engagement needed to align to both corporate and plant-level decision structures.',
    solution:
      'Industry Narrative Framework: Built manufacturing-specific messaging aligned to operational and financial outcomes. Persona Matrix: Mapped content and messaging to engineering leaders, procurement managers, and executives. Journey Sequencing: Designed top-, mid-, and bottom-funnel engagements specific to manufacturing buying cycles. Signal-Based Prioritization: Integrated account-level insights into CRM and ABM workflows. Sales Alignment Playbooks: Equipped reps with manufacturing-specific talk tracks and objection handling.',
    results: [
      'Enabled deep account penetration within manufacturing verticals through structured ABM journeys',
      '200% increase in account engagement',
      'Clearer progression signals',
      'Improved opportunity creation',
    ],
    tags: ['ABM', 'Manufacturing', 'Industry-Specific', 'Journey Design'],
    industry: 'manufacturing',
    expertise: [
      'account-based-marketing',
      'product-marketing',
      'lifecycle-marketing',
      'sales-enablement-alignment',
      'marketing-operations',
    ],
    metrics: [
      { label: 'Account Engagement Lift', value: '200%', change: 'YoY increase' },
      { label: 'Journey Stages Mapped', value: '3', change: 'Awareness, evaluation, expansion' },
      { label: 'Buying Personas Activated', value: '4+', change: 'Engineering, procurement, finance, ops' },
    ],
    featured: true,
    year: '2024',
  },

  {
    slug: 'prgx-unified-revenue-operating-model',
    title: '87% YoY Pipeline Growth via Unified ABM + RevOps Model',
    client: 'PRGX Global',
    description:
      'Architected a unified revenue operating model integrating ABM, automation, and attribution to scale predictable enterprise pipeline.',
    challenge:
      'PRGX needed to evolve from broad demand gen into full-funnel, governance-driven ABM. Systems were fragmented across Demandbase, Marketo, CRM, and analytics, limiting visibility and repeatability.',
    solution:
      'Built the first unified revenue operating model: integrated Demandbase + Marketo with Salesforce workflows, automated multi-touch attribution, formalized marketing ops governance, and rebuilt cross-channel data flows.',
    results: [
      'Boosted marketing-sourced pipeline 87% YoY',
      'Delivered 200% YoY engagement lift across target accounts',
      'Improved MQL→SQL conversion by 180% via scoring + routing',
      'Raised database health by 30% through data governance',
    ],
    tags: ['ABM', 'Revenue Operations', 'Attribution', 'Enterprise GTM'],
    industry: 'b2b-saas',
    expertise: [
      'account-based-marketing-abm',
      'marketing-operations',
      'marketing-automation',
      'demand-generation',
    ],
    metrics: [
      { label: 'Pipeline Growth', value: '87%', change: 'YoY' },
      { label: 'Engagement Lift', value: '200%', change: 'YoY' },
      { label: 'MQL→SQL Lift', value: '180%', change: 'YoY' },
    ],
    featured: true,
    year: '2025',
  },

  {
    slug: 'amcs-verticalized-abm-launch',
    title: '$1.2M Pipeline in 90 Days from Verticalized ABM',
    client: 'AMCS Group',
    description:
      'Launched ABM engine for industrial/logistics buyers with verticalized messaging, paid media, and GTM orchestration.',
    challenge:
      'AMCS needed measurable enterprise pipeline quickly in complex industrial and fleet/logistics verticals, while legacy content and outbound prioritization underperformed.',
    solution:
      'Designed end-to-end ABM framework; rebuilt vertical narratives and content; deployed industry-specific paid media campaigns; restructured outbound prioritization with GTM alignment.',
    results: [
      'Generated $1.2M qualified pipeline in 90 days',
      'Lifted MQL volume by 35% within 60 days',
      'Improved CRM data quality by ~80% through audits + enrichment',
    ],
    tags: ['ABM', 'Paid Media', 'Vertical GTM', 'Industrial SaaS'],
    industry: 'b2b-saas',
    expertise: [
      'account-based-marketing-abm',
      'demand-generation',
      'paid-advertising-sem',
      'marketing-operations',
    ],
    metrics: [
      { label: 'Qualified Pipeline', value: '$1.2M', change: '90 days' },
      { label: 'MQL Lift', value: '35%', change: '60 days' },
      { label: 'Data Quality', value: '80%', change: 'Improved' },
    ],
    featured: true,
    year: '2024',
  },

  {
    slug: 'end-to-end-abm-framework-amcs',
    title: 'End-to-End ABM Framework',
    client: 'AMCS Group',
    description:
      'Built AMCS Group\'s first enterprise ABM operating model for an industrial SaaS portfolio, aligning leadership, sales, SDR, and marketing around vertical account plays and measurable pipeline goals.',
    challenge:
      'AMCS Group was scaling in industrial and logistics markets but lacked a shared enterprise targeting model. The business had high ACV deals, long buying committees, and pressure to show pipeline impact within the current quarter. Regional teams defined target accounts differently, SDR handoff quality was inconsistent, and paid spend was spread across low-fit segments. Leadership needed a single ABM system that improved account quality and speed-to-pipeline without increasing team headcount.',
    solution:
      'Defined a verticalized ICP and tiering model, then orchestrated ABM workflows across paid, outbound, and lifecycle nurture. Built role-specific message architecture for operations leaders, finance stakeholders, and procurement influencers. Implemented MQA scoring and SDR SLAs to improve handoff quality and accelerate progression from engagement to qualified opportunity. Unified campaign, intent, and CRM data in shared dashboards so weekly account reviews could prioritize spend and outreach toward in-market accounts.',
    keyDecisions: [
      {
        decision: 'Prioritize two high-fit industrial segments before broad rollout',
        rationale: 'Narrowing scope improved learning velocity and protected budget from low-fit account waste during launch.',
        impact: 'Reached $1.2M qualified pipeline in the first 90 days while keeping campaign CAC stable.',
      },
      {
        decision: 'Move from lead-based handoff to account-stage MQA + SDR SLA model',
        rationale: 'High-ACV deals required buying-group signals rather than isolated lead activity.',
        impact: 'Increased MQL volume by 35% in 60 days and improved follow-up consistency across regions.',
      },
      {
        decision: 'Standardize weekly account reviews using shared intent and CRM dashboards',
        rationale: 'Sales and marketing needed one operating rhythm to make fast budget and sequencing decisions.',
        impact: 'Improved CRM data quality by 80% and reduced prioritization conflicts between teams.',
      },
    ],
    results: [
      'Generated $1.2M in qualified enterprise pipeline within 90 days of rollout',
      'Increased MQL volume by 35% in 60 days from tighter ICP targeting and sequencing',
      'Improved CRM data quality by 80% through governance, enrichment, and SLA instrumentation',
      'Created one ABM operating rhythm across Marketing, SDR, and Sales for repeatable account progression',
    ],
    tags: ['ABM', 'ICP Definition', 'Sales Alignment', 'Framework Design'],
    industry: 'b2b-saas',
    expertise: [
      'account-based-marketing',
      'sales-enablement',
      'product-marketing',
      'demand-generation',
      'marketing-analytics-reporting',
    ],
    metrics: [
      { label: 'Qualified Pipeline', value: '$1.2M', change: 'First 90 days' },
      { label: 'MQL Volume', value: '+35%', change: 'Within 60 days' },
      { label: 'CRM Data Quality', value: '+80%', change: 'Governance + enrichment' },
    ],
    featured: true,
    year: '2024',
  },

  {
    slug: 'redhat-global-abm-activation',
    title: '33% of Global Pipeline Influenced by ABM Activation',
    client: 'Red Hat',
    description:
      'Scaled ABM Customer Activation framework across 200+ global enterprise accounts with lifecycle playbooks and standardized ops.',
    challenge:
      'Red Hat needed consistent ABM practices at global scale, reduced CPL, and better lifecycle engagement across enterprise accounts.',
    solution:
      'Built ABM Customer Activation framework + multi-product lifecycle playbooks, standardized change management, and deployed intent/account intelligence to optimize media and orchestration.',
    results: [
      'ABM program influenced 33% of global pipeline',
      'Increased upsell opportunity creation by 40%',
      'Reduced cost-per-lead by 30%',
      'Cut project turnaround time by 20%',
    ],
    tags: ['ABM', 'Lifecycle Marketing', 'Enterprise SaaS', 'Global Scale'],
    industry: 'b2b-saas',
    expertise: [
      'account-based-marketing-abm',
      'lifecycle-marketing',
      'marketing-operations',
      'martech-optimization',
    ],
    metrics: [
      { label: 'Pipeline Influence', value: '33%', change: 'Global' },
      { label: 'Upsell Lift', value: '40%', change: 'Increase' },
      { label: 'CPL', value: '-30%', change: 'Reduction' },
    ],
    featured: true,
    year: '2023',
  },

  {
    slug: 'enterprise-abm-activation-red-hat',
    title: 'Enterprise ABM Activation',
    client: 'Red Hat',
    description:
      'Designed and deployed global ABM activation programs for enterprise accounts, enabling multi-threaded engagement across buying committees and improving expansion and retention outcomes.',
    challenge:
      'Enterprise accounts required deep, persona-specific engagement across technical, financial, and operational stakeholders. Regional sales teams needed a consistent ABM playbook to align messaging and outreach motions. Content and messaging lacked modular structure for scaling personalization across industries and roles. Visibility into account engagement, intent, and progression was fragmented across tools.',
    solution:
      'Tiered ABM Framework: Established tiering models, segmentation, and account selection for global regions. Persona & Industry Personalization: Built modular messaging systems covering technical, executive, and operational personas. Regional Sales Alignment: Created field playbooks for outreach sequencing, collaboration, and account progression. Intent & Engagement Insights: Connected signals from CRM, events, and digital channels into actionable dashboards. Expansion & Renewal Plays: Structured lifecycle programs that supported cross-sell, upsell, and renewal readiness.',
    results: [
      'Global ABM strategy enabled enterprise sellers to deepen account penetration and drive higher retention and expansion',
      'Delivered 25+ point improvement in NRR',
      'Reduced churn by ~40%',
      'Increased multi-threaded engagement across targeted accounts',
    ],
    tags: ['ABM', 'Enterprise GTM', 'Lifecycle Marketing', 'Sales Alignment'],
    industry: 'technology-saas',
    expertise: [
      'account-based-marketing',
      'lifecycle-marketing',
      'customer-marketing',
      'product-marketing',
      'sales-enablement-alignment',
    ],
    metrics: [
      { label: 'NRR Improvement', value: '25+ points', change: 'Increase' },
      { label: 'Churn Reduction', value: '40%', change: 'Decrease' },
      { label: 'Program Account Scale', value: '200+', change: 'Global enterprise accounts' },
    ],
    featured: true,
    year: '2023',
  },

  {
    slug: 'salesforce-demandgen-analytics-platform',
    title: 'Reporting Cycle Cut from 4 Days to 2 Hours',
    client: 'Salesforce',
    description:
      'Rebuilt global demand gen analytics for Salesforce.org, replacing spreadsheet scorecards with a governed dashboard operating model used by regional and executive teams.',
    challenge:
      'Salesforce.org had 95+ marketers across NGO and Education motions relying on disconnected spreadsheet scorecards. Weekly reporting consumed multiple analyst days, KPI definitions varied by region, and campaign-to-pipeline contribution was frequently disputed in forecast meetings. Leaders needed a trusted operating view that could support weekly optimization decisions, quarterly planning, and executive reviews without manual reconciliation.',
    solution:
      'Designed a centralized analytics model that standardized stage definitions, campaign taxonomy, and attribution logic before dashboard development. Built Tableau/Einstein dashboard suites for executives, regional demand leaders, and campaign managers, each tied to role-specific decisions. Introduced data validation checks and QA routines across CRM and MAP sources to reduce metric drift. Launched enablement and operating cadences so teams used one source of truth for weekly performance actions.',
    keyDecisions: [
      {
        decision: 'Standardize KPI definitions before rebuilding visualizations',
        rationale: 'Dashboard adoption fails when teams disagree on definitions, even if charts are technically correct.',
        impact: 'Improved cross-region confidence in reported performance and reduced escalation loops in forecast reviews.',
      },
      {
        decision: 'Design role-specific dashboard views instead of one universal report',
        rationale: 'Executive, regional, and campaign teams require different grain and actionability.',
        impact: 'Increased weekly usage and accelerated decision-making by aligning data views to ownership.',
      },
      {
        decision: 'Embed recurring QA checks into the reporting workflow',
        rationale: 'Sustainable trust required ongoing validation, not one-time cleanup.',
        impact: 'Reduced reporting rework and improved signal reliability during quarterly planning.',
      },
    ],
    results: [
      'Cut reporting cycle time from 4 days to 2 hours for core demand dashboards',
      'Supported 76% YoY lift in marketing-attributed pipeline with faster optimization loops',
      'Contributed to 65% SQL growth by exposing clearer targeting and conversion diagnostics',
      'Established a repeatable analytics operating model used across global NGO and Education programs',
    ],
    tags: ['Marketing Ops', 'Analytics', 'Dashboards', 'Demand Gen'],
    industry: 'b2b-saas',
    expertise: [
      'marketing-operations',
      'product-marketing',
      'growth-marketing',
    ],
    metrics: [
      { label: 'Reporting Speed', value: '2 hours', change: 'from 4 days' },
      { label: 'Pipeline Growth', value: '76%', change: 'YoY' },
      { label: 'SQL Growth', value: '65%', change: 'Increase' },
    ],
    featured: true,
    year: '2021',
  },

  {
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
    industry: 'non-profit-education',
    expertise: [
      'marketing-analytics-reporting',
      'revenue-operations',
      'data-governance',
      'bi-data-engineering',
      'marketing-operations',
    ],
    metrics: [
      { label: 'Reporting Speed', value: '2 hours', change: 'from 4 days (190% reduction)' },
      { label: 'Data Quality', value: '85%', change: 'Improved' },
      { label: 'Pipeline Tracked', value: '$250M+', change: 'Supported' },
    ],
    featured: true,
    year: '2021',
  },

  {
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
    industry: 'non-profit-education',
    expertise: [
      'data-governance',
      'marketing-analytics-reporting',
      'bi-data-engineering',
      'marketing-operations',
      'revenue-operations',
    ],
    metrics: [
      { label: 'Data Quality', value: '85%', change: 'Improved' },
      { label: 'Reporting Error Reduction', value: 'Dramatically reduced', change: 'Accuracy' },
      { label: 'Update Speed', value: '190%', change: 'Accelerated' },
    ],
    featured: true,
    year: '2021',
  },

  {
    slug: 'salesforce-fortune50-abm-events',
    title: 'Fortune 50 ABM + Event Engine Driving Enterprise Pipeline',
    client: 'Salesforce',
    description:
      'Established ABM Center of Excellence and high-ROI event motions for Fortune 50 enterprise accounts.',
    challenge:
      'Needed repeatable enterprise ABM motions and measurable event ROI across vertical programs.',
    solution:
      'Built ABM COE methodology, integrated propensity-driven campaigns, and created event-to-pipeline playbooks with executive engagement.',
    results: [
      '$11M pipeline influenced from flagship executive program',
      '30% YoY pipeline growth from ABM programs',
      'Multi-million ACV influence from vertical events',
    ],
    tags: ['ABM', 'Events', 'Enterprise GTM', 'Vertical Marketing'],
    industry: 'b2b-saas',
    expertise: [
      'account-based-marketing-abm',
      'event-marketing',
      'sales-enablement',
      'demand-generation',
    ],
    metrics: [
      { label: 'Pipeline Influence', value: '$11M', change: 'Flagship executive program' },
      { label: 'ABM Pipeline Growth', value: '30%', change: 'YoY' },
      { label: 'Target Account Cohort', value: '50', change: 'Fortune 50 accounts' },
    ],
    year: '2019',
  },

  {
    slug: 'singles-and-doubles-playbook-salesforce',
    title: 'Singles & Doubles Playbook',
    client: 'Salesforce',
    description:
      'Created a scalable campaign playbook for Salesforce Sales Cloud, enabling marketing and sales teams to execute repeatable, high-impact plays focused on pipeline creation and deal acceleration.',
    challenge:
      'Marketing and Sales lacked a shared set of repeatable GTM plays aligned to pipeline stages. Campaigns varied dramatically across regions, leading to inconsistent execution and outcomes. Sales teams needed clearer messaging, competitive positioning, and activation guidance. There was no unified structure for connecting marketing content to sales motions. Enablement assets were scattered, hard to find, and not consistently updated.',
    solution:
      'Unified Playbook Architecture: Built a framework of "Singles" (quick wins) and "Doubles" (larger plays) mapped to pipeline stages. Persona & Segment Messaging: Defined narrative frameworks and value stories for key segments. Sales Activation Kits: Created talk tracks, email flows, competitive notes, and demo guidelines. Cross-Regional Standardization: Provided repeatable templates adopted across global enterprise teams. Measurement Framework: Linked plays to SQL lift, opportunity progression, and deal acceleration.',
    results: [
      'Enabled global marketing and sales teams with standardized, high-performing GTM plays',
      'Supported 65% lift in SQL volume',
      'Improved consistency of pipeline generation across regions',
      'Strengthened sales alignment',
    ],
    tags: ['Sales Enablement', 'Playbook', 'Campaign Framework', 'Sales Cloud'],
    industry: 'technology-saas',
    expertise: [
      'sales-enablement-alignment',
      'product-marketing',
      'demand-generation',
      'account-based-marketing',
      'content-strategy-systems',
    ],
    metrics: [
      { label: 'SQL Volume Lift', value: '65%', change: 'Global programs' },
      { label: 'Play Architecture Types', value: '2', change: 'Singles and doubles framework' },
      { label: 'Pipeline Stage Coverage', value: '3+', change: 'Mapped to funnel stages' },
    ],
    featured: true,
    year: '2019',
  },

  {
    slug: 'sales-cloud-global-campaigns-salesforce',
    title: 'Sales Cloud Global Campaigns',
    client: 'Salesforce',
    description:
      'Developed and executed global integrated campaigns for Salesforce Sales Cloud, unifying messaging, content, and sales activation across enterprise regions.',
    challenge:
      'Global regions ran inconsistent campaigns with fragmented messaging and limited alignment to Sales Cloud positioning. Sales teams lacked clear narrative frameworks and campaign-ready enablement assets. Campaign performance data was siloed, making it difficult to understand ROI or regional execution quality. Marketing and Sales needed shared plays to target buying committees across industries. Campaign production lacked standardized templates, slowing time-to-market.',
    solution:
      'Narrative Framework Development: Created unified messaging for Sales Cloud across industries and segments. Persona-Based Content Strategy: Built assets tailored to sales leaders, operations, IT, and front-line managers. Campaign Architecture: Designed modular plays deployable across regions with local adaptation. Sales Activation Kits: Delivered talk tracks, sequences, and competitive notes to improve sales execution. Performance Dashboards: Linked campaign activity to SQL lift, pipeline creation, and opportunity progression.',
    results: [
      'Standardized global Sales Cloud campaigns, improving message consistency and campaign scalability',
      'Lifted SQL volume by 65%',
      'Improved multi-region alignment',
      'Strengthened enterprise opportunity creation',
    ],
    tags: ['Global Campaigns', 'Sales Cloud', 'Campaign Architecture', 'Sales Enablement'],
    industry: 'technology-saas',
    expertise: [
      'product-marketing',
      'demand-generation',
      'sales-enablement-alignment',
      'content-strategy-systems',
      'omnichannel-marketing',
    ],
    metrics: [
      { label: 'SQL Volume Lift', value: '65%', change: 'Global campaign programs' },
      { label: 'Primary Buyer Personas', value: '4', change: 'Sales, ops, IT, frontline leaders' },
      { label: 'Campaign Funnel Coverage', value: '3+', change: 'Top, mid, and bottom funnel plays' },
    ],
    featured: true,
    year: '2019',
  },

  {
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
      'search-engine-optimization',
      'lifecycle-marketing',
    ],
    metrics: [
      { label: 'Traffic Growth', value: '164%', change: 'YoY' },
      { label: 'Net-New Lead Growth', value: '43%', change: 'QoQ' },
      { label: 'Content Engagement Lift', value: '30%', change: 'Program impact' },
    ],
    year: '2014',
  },

  {
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
      { label: 'Program Pillars Implemented', value: '3', change: 'Content, SEO, enablement system' },
    ],
    featured: true,
    year: '2014',
  },

  {
    slug: 'salemglobal-smb-seo-ppc-engine',
    title: '500% YoY Client Growth via SMB SEO + PPC System',
    client: 'Salem Global Internet',
    description:
      'Built repeatable SEO/PPC program for SMBs and agencies, using microsite authority networks.',
    challenge:
      'SMBs needed scalable lead generation to compete with traditional directories and local incumbents.',
    solution:
      'Deployed customized SEO/PPC strategies and leveraged a proprietary microsite network to build authority + referral links.',
    results: [
      'Grew new clients 500% YoY',
      'Maintained ~85% retention',
      'Multiple clients achieved #1 organic Google rankings',
    ],
    tags: ['SEO', 'PPC', 'SMB Growth', 'Digital Agency'],
    industry: 'retail-ecommerce',
    expertise: [
      'search-engine-optimization',
      'paid-advertising-sem',
      'content-marketing',
    ],
    metrics: [
      { label: 'Client Growth', value: '500%', change: 'YoY' },
      { label: 'Retention', value: '85%', change: 'Rate' },
      { label: 'Top Ranking Outcome', value: '#1', change: 'Multiple client keywords' },
    ],
    year: '2008',
  },

  {
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
      'Program operations retained full rigor with 3 journey phases (pre, on-site, post-event), 3 follow-up channels (email, SMS, retargeting), and exposed vs control cohort measurement.',
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
      { label: 'Revenue Impact', value: '$1.1M', change: 'Event-attributed in-store sales' },
      { label: 'Conversion Lift', value: '24%', change: 'Exposed vs control cohorts' },
      { label: 'Repeat Purchase Lift', value: '18%', change: 'Post-event retention window' },
    ],
    featured: true,
    year: '2023',
  },

  {
    slug: 'marketing-flight-planner-ai-tool',
    title: 'Marketing Flight Planner — AI GTM Maturity → Roadmap Engine',
    client: 'Portfolio Artifact',
    description:
      'Built an AI-assisted GTM maturity product that translates diagnostic inputs into prioritized execution roadmaps, investment sequencing, and scenario-based recommendations.',
    challenge:
      'Most maturity assessments stop at static scores and generic recommendations. Operators still need to decide what to fix first, what to defer, and where budget and team capacity create constraints. The objective was to build a practical decision tool that turns maturity findings into a sequenceable plan tied to business outcomes and implementation readiness.',
    solution:
      'Created a structured diagnostic framework across revenue strategy, operations, data, and channel execution, then mapped each score profile to recommended plays and stack priorities. Added weighted decision logic that accounts for impact, effort, and dependency constraints so recommendations are ordered for implementation reality. Built scenario simulation to compare roadmap outcomes under different resource assumptions. Packaged outputs as an executive-ready action brief and operator-level workplan.',
    keyDecisions: [
      {
        decision: 'Prioritize recommendation sequencing over score visualization',
        rationale: 'Users needed implementation order and dependencies, not another dashboard scorecard.',
        impact: 'Produced roadmap outputs teams could execute immediately in planning cycles.',
      },
      {
        decision: 'Use weighted impact-effort-dependency logic for recommendation ranking',
        rationale: 'Simple scoring over-prioritizes high-impact items that are blocked operationally.',
        impact: 'Increased realism of recommendations and reduced planning churn after handoff.',
      },
      {
        decision: 'Support scenario simulation for constrained-resource planning',
        rationale: 'Leadership needed to compare options across staffing and budget tradeoffs.',
        impact: 'Enabled faster alignment on near-term roadmap commitments.',
      },
    ],
    results: [
      'Delivered MVP with production scoring and roadmap generation flows',
      'Supports real-time GTM maturity diagnosis across REAO dimensions',
      'Introduced scenario simulation for low, base, and aggressive execution paths',
      'Reduced roadmap drafting time from multi-day workshops to guided output sessions',
      'Operational scope details preserved: 4 assessment dimensions in the REAO model and 3 scenario modes (Low / Base / Aggressive).',
    ],
    tags: ['AI', 'GTM Strategy', 'Assessment', 'Systems Thinking'],
    industry: 'ai-ml',
    expertise: [
      'ai-in-marketing',
      'marketing-operations',
      'martech-optimization',
    ],
    metrics: [
      { label: 'Reporting Time Reduction', value: '75%', change: 'Roadmap drafting cycle' },
      { label: 'MVP Readiness', value: '100%', change: 'Phase 1 complete' },
      { label: 'Pipeline Growth Potential', value: '15%', change: 'Modeled scenario uplift' },
    ],
    featured: true,
    year: '2025',
  },

  {
    slug: 'career-world-4d-interactive-resume',
    title: 'Career World 4D — Interactive Resume Map',
    client: 'Portfolio Artifact',
    description:
      'Designed and shipped an interactive career intelligence map that reframes a resume as a navigable proof system across roles, industries, capabilities, and outcomes.',
    challenge:
      'Traditional resumes and portfolio pages flatten strategic depth into disconnected bullet lists. Senior buyers and hiring leaders needed to understand how capabilities connect across contexts, not just where roles were held. The goal was to create a memorable artifact that demonstrates systems thinking, narrative clarity, and execution range in a single exploratory experience.',
    solution:
      'Built an isometric, map-style interface that links each role to associated GTM systems, industries, technologies, and measurable outcomes. Designed a cross-referenced content model so users can navigate by timeline, capability, or business problem instead of a linear CV format. Added interaction patterns and storytelling structure that let executive audiences move from high-level narrative to concrete proof points in a few clicks. Optimized the experience for desktop storytelling and mobile readability to support sharing in live conversations.',
    keyDecisions: [
      {
        decision: 'Model the experience as a graph of connected proof nodes',
        rationale: 'Career value is easier to evaluate when relationships between roles, skills, and outcomes are explicit.',
        impact: 'Improved clarity of narrative flow and reduced context switching for reviewers.',
      },
      {
        decision: 'Use an exploratory UI instead of static chronological layout',
        rationale: 'Different audiences evaluate credibility through different entry points.',
        impact: 'Enabled targeted walkthroughs for hiring, consulting, and partnership discussions.',
      },
      {
        decision: 'Separate executive summary layer from deep proof layer',
        rationale: 'Leaders need rapid orientation before they engage with detailed artifacts.',
        impact: 'Improved top-level comprehension while preserving depth for technical reviewers.',
      },
    ],
    results: [
      'Delivered a live interactive portfolio artifact used in executive and client conversations',
      'Mapped cross-referenced relationships between roles, capabilities, industries, and systems',
      'Improved reviewer comprehension of career narrative versus static resume formats',
      'Created a reusable proof framework for future case study and capability storytelling',
    ],
    tags: ['Personal Brand', 'UX', 'Data Visualization'],
    industry: 'b2b-saas',
    expertise: [
      'content-marketing',
      'omnichannel-marketing',
    ],
    metrics: [
      { label: 'Artifact Version', value: '1', change: 'Live interactive release' },
      { label: 'Navigation Modes', value: '3', change: 'Role / capability / industry views' },
      { label: 'Proof Dimensions Linked', value: '4', change: 'Roles, industries, capabilities, outcomes' },
    ],
    year: '2025',
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudyItem | undefined {
  return caseStudyItems.find(item => item.slug === slug)
}

export function getFeaturedCaseStudies(): CaseStudyItem[] {
  return caseStudyItems.filter(item => item.featured)
}

export function getCaseStudiesByIndustry(industry: string): CaseStudyItem[] {
  return caseStudyItems.filter(item => item.industry === industry)
}

export function getCaseStudiesByExpertise(expertise: string): CaseStudyItem[] {
  return caseStudyItems.filter(item => item.expertise.includes(expertise))
}

export function getAllCaseStudyTags(): string[] {
  const tags = new Set<string>()
  caseStudyItems.forEach(item => item.tags.forEach(tag => tags.add(tag)))
  return Array.from(tags).sort()
}
