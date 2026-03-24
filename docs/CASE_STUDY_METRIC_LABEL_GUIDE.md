# Case Study Metric Label Style Guide

> One source of truth for `label` values inside every `metrics: []` array in `content/case-studies.ts`.
> Follow this guide when adding new case studies or editing existing metrics.

---

## Ground Rules

| Rule | Detail |
|------|--------|
| **Minimum metrics per entry** | 3 — all must contain a numeric value or a clear quantified outcome |
| **Label format** | Title Case, no trailing punctuation, max ~4 words |
| **Value format** | Number-first where possible: `76%`, `$1.2M`, `2 hours`, `85%` |
| **Change format** | Short contextual anchor: `YoY`, `Increase`, `from 4 days`, `90 days`, `Improved` |
| **No bare qualifiers** | Never use just `Pipeline`, `Lift`, `Growth` — always qualify the noun |

---

## 1. Pipeline Impact

Metrics showing revenue pipeline influenced, created, or tracked.

| Approved Label | Use When |
|----------------|----------|
| `Qualified Pipeline` | Dollar or deal volume created/attributed (unambiguous pipeline) |
| `Pipeline Growth` | Percentage increase in pipeline YoY or QoQ |
| `ABM Pipeline Growth` | Pipeline metric scoped specifically to ABM motion |
| `Pipeline Influence` | Touches/assists — pipeline marketed-to but not solely sourced |
| `Pipeline Tracked` | Aggregate pipeline volume managed or made visible by a tool/system |
| `Pipeline Stage Coverage` | Number of funnel stages instrumented or mapped |

**Example:**
```ts
{ label: 'Qualified Pipeline', value: '$1.2M', change: '90 days' }
{ label: 'Pipeline Growth',    value: '76%',   change: 'YoY' }
```

---

## 2. Conversion & Demand Lift

Metrics showing lead volume, funnel velocity, and revenue retention outcomes.

| Approved Label | Use When |
|----------------|----------|
| `MQL Lift` | Percentage increase in MQL volume |
| `MQL Volume` | Absolute MQL count produced |
| `SQL Growth` | Percentage increase in SQLs (sales-qualified) |
| `SQL Volume Lift` | Absolute SQL count produced |
| `MQL→SQL Lift` | Conversion rate improvement MQL-to-SQL |
| `Net New Leads` | Raw count of new leads generated |
| `Net-New Lead Growth` | Percentage growth in net-new lead volume |
| `Account Engagement Lift` | Percentage increase in account-level engagement score |
| `Content Engagement Lift` | Percentage lift in content interaction (clicks/views/time) |
| `Engagement Lift` | General engagement increase when not stage-specific |
| `Upsell Lift` | Percentage or dollar increase in expansion revenue |
| `NRR Improvement` | Net Revenue Retention improvement (percentage points) |
| `Churn Reduction` | Percentage reduction in churn rate |
| `Retention` | Retention rate achieved or maintained |

**Example:**
```ts
{ label: 'MQL Lift',      value: '35%',  change: '60 days' }
{ label: 'SQL Growth',    value: '65%',  change: 'Increase' }
{ label: 'MQL→SQL Lift',  value: '28%',  change: 'Improvement' }
```

---

## 3. Efficiency & Data Quality

Metrics measuring speed, accuracy, and operational reliability improvements.

| Approved Label | Use When |
|----------------|----------|
| `Reporting Speed` | Time reduction to produce reports (use `from X days` in `change`) |
| `Update Speed` | Percentage or ratio acceleration of data/asset update cycles |
| `Reporting Error Reduction` | Qualitative or quantified reduction in report inaccuracies |
| `Data Quality` | Percentage improvement in CRM/data record quality |
| `CRM Data Quality` | Scoped specifically to CRM record completeness/accuracy |

**Example:**
```ts
{ label: 'Reporting Speed',          value: '2 hours',     change: 'from 4 days' }
{ label: 'Update Speed',             value: '190%',        change: 'Accelerated' }
{ label: 'Reporting Error Reduction', value: 'Dramatically reduced', change: 'Accuracy' }
{ label: 'Data Quality',             value: '85%',         change: 'Improved' }
```

---

## 4. Program & Account Scale

Metrics quantifying the scope, coverage, or architectural breadth of a program.

| Approved Label | Use When |
|----------------|----------|
| `Target Account Cohort` | Number of named accounts in ABM/tiered program |
| `Program Account Scale` | Accounts enrolled in or touched by the program |
| `Account Engagement` | Absolute engagement touches or score, not a lift metric |
| `Buying Personas Activated` | Number of distinct buyer personas engaged |
| `Primary Buyer Personas` | Distinct personas mapped or modeled |
| `Journey Phases Orchestrated` | Multi-stage journey phases actively managed |
| `Journey Stages Mapped` | Stages defined in a journey architecture (pre-launch) |
| `Campaign Funnel Coverage` | Funnel stages covered by campaign assets |
| `Play Architecture Types` | Distinct play types built into a playbook or system |
| `Program Pillars Implemented` | Strategic pillars fully activated in a program launch |

**Example:**
```ts
{ label: 'Target Account Cohort',       value: '250',   change: 'Named Accounts' }
{ label: 'Journey Phases Orchestrated', value: '6',     change: 'Stages' }
```

---

## 5. Tool & Product Metrics

Metrics for tool-build and product-type case studies (AI tools, dashboards, interactive experiences).

| Approved Label | Use When |
|----------------|----------|
| `Navigation Modes` | Number of UX navigation paths or modes in an interactive app |
| `Scenario Modes` | Scenario simulation or what-if modes built |
| `MVP Readiness` | MVP scope or readiness indicator (use `%` or status) |
| `Artifact Version` | Version or iteration number of a deliverable |
| `Proof Dimensions Linked` | Number of distinct proof categories surfaced in a tool |
| `Assessment Dimensions` | Scored dimensions in an assessment or audit tool |
| `Audience Comparison Groups` | Segments or cohorts available for comparison in a tool |
| `Follow-Up Channels Activated` | Channels wired into outreach logic |

**Example:**
```ts
{ label: 'Scenario Modes',  value: '8',    change: 'Built' }
{ label: 'MVP Readiness',   value: '100%', change: 'On Schedule' }
```

---

## 6. Growth & Acquisition

Metrics for demand capture, SEO, and new-business growth.

| Approved Label | Use When |
|----------------|----------|
| `Traffic Growth` | Percentage increase in site/page traffic |
| `Unique Visitors` | Absolute monthly unique visitor count |
| `Top Ranking Outcome` | Number of keywords ranking page 1 or specific position achieved |
| `CPL` | Cost per lead (always include currency in `value`) |
| `Client Growth` | Number of new clients acquired or percentage growth in client base |

**Example:**
```ts
{ label: 'Traffic Growth',      value: '210%',  change: 'Organic' }
{ label: 'Top Ranking Outcome', value: '47',    change: 'Page 1 Keywords' }
{ label: 'CPL',                 value: '$18',   change: 'Average' }
```

---

## Banned / Deprecated Labels

These labels were found in older entries and have been replaced. **Do not use them.**

| Banned | Replaced By | Reason |
|--------|-------------|--------|
| `Pipeline` | `Qualified Pipeline` | Too ambiguous — unclear if pipeline created, influenced, or tracked |
| `Pipeline Lift` | `Pipeline Growth` | "Lift" is a conversion word; "Growth" fits pipeline volume changes |
| `SQL Lift` | `SQL Growth` | Same reason as above |
| `Time to Insight` | `Reporting Speed` | Jargon; "speed" is scannable and consistent |
| `Reporting Time` | `Reporting Speed` | Duplicate concept, inconsistent phrasing |
| `Reporting Errors` | `Reporting Error Reduction` | Bare noun — reads as a problem, not an outcome |
| `Update Cycles` | `Update Speed` | Process noun — "speed" frames it as an improvement |

---

## Quick Checklist (Before Merging a New Case Study)

- [ ] Entry has **≥ 3 metrics**, all with numeric `value` fields
- [ ] All `label` values appear in this guide or follow the Title Case / no-bare-qualifier rule
- [ ] `value` is number-first (`76%`, `$1.2M`, `2 hours`) not prose-first
- [ ] `change` is a short anchor (≤ 4 words) providing context or direction
- [ ] No deprecated labels from the banned list above
- [ ] No duplicate labels within the same entry's `metrics` array

---

*Last updated: Phase 3D.1 — metric taxonomy normalization pass. Extend this file when new label patterns are introduced across 2+ case studies.*
