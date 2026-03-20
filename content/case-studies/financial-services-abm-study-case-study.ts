export const CASE_STUDY_FINANCIAL_SERVICES_ABM_STUDY_CASE_STUDY = {
  slug: "jpmc-abm-multi-cloud-orchestration",
  title: "Achieving Operational Efficiency Through 1-to-1 ABM & Multi-Cloud Orchestration",
  client: "JPMC",
  description: "JPMC’s fragmented automation landscape created a significant operational tax, ultimately hindering business agility. By implementing a unified orchestration layer and a targeted 1-to-1 ABM strategy, we achieved a 90% productivity lift for application development, testing, and deployment, fundamentally transforming their operational efficiency.",
  challenge: "JPMC faced a decentralized 'Automation as a Service' (AAAS) environment, where individual teams independently built and deployed solutions, leading to duplication, exhaustive support overhead, and frequent compliance audit failures, particularly with 'Engine-only' subscriptions bypassing governance. This chaotic, unsustainable operational environment, driven by rapid innovation but lacking centralized orchestration, exposed the company to significant regulatory risk and hampered market responsiveness.",
  solution: "We hypothesized that a 1-to-1 Account-Based Marketing (ABM) approach, combined with a centralized orchestration layer using a multi-cloud environment, would solve the issues. We adopted an OpenShift Total Economic Impact (TEI) framework to prioritize high-value accounts. A cross-functional team assessed the existing AAAS environment, prioritized workflows, and developed a standardized deployment pipeline leveraging existing AWS and Azure infrastructure. A robust governance framework was designed, with Salesforce, Marketo, and 6sense used for ABM, and Kubernetes (OpenShift) serving as the core multi-cloud orchestration platform with Azure DevOps/GitHub for CI/CD.",
  results: [
    "90% productivity lift for application development, testing, and deployment cycles.",
    "40% reduction in support tickets related to automation issues.",
    "Successfully navigated a complex compliance audit, demonstrating adherence to stringent regulatory standards.",
    "Significant cultural shift within the organization, fostering greater emphasis on standardization and collaboration.",
    "Implementation of the TEI framework provided a clear, data-driven approach to prioritizing automation investments."
  ],
  tags: ["ABM", "Multi-Cloud", "Orchestration", "Automation", "Financial Services", "DevOps", "Compliance"],
  industry: "financial-services",
  expertise: ["account-based-marketing", "cloud-architecture", "devops", "marketing-operations", "sales-enablement", "revenue-operations"],
  metrics: [
    { label: "Productivity Lift (App Dev, Test, Deploy)", value: "90%", change: "↑" },
    { label: "Support Tickets (Automation Issues)", value: "40%", change: "↓" },
    { label: "Compliance Audit Success", value: "100%", change: "↑" }
  ],
  featured: true,
  year: "2024"
};