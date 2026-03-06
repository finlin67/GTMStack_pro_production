# Animation Guide

This guide catalogs the animation system currently wired into the site.

## 1) Animation libraries and motion systems in use

- **Framer Motion** (`framer-motion`) is the primary animation library.
  - Used across route hero visuals and UI components (examples: `src/components/animations/*`, `components/ui/*`, `components/sections/*`, `components/motion/FadeIn.tsx`).
- **Tailwind CSS keyframes + animation utilities** are used for reusable CSS motion presets (see `tailwind.config.ts`).
- **Lottie JSON assets are present** under `public/lottie/` and in `lib/hero-visual-manifest.ts`.
  - No direct Lottie runtime package dependency is currently declared in `package.json`.

Not detected in active dependencies: GSAP, React Spring, Anime.js, AOS.

---

## 2) Keyframe definitions found

### Global keyframes (`tailwind.config.ts`)

- `marquee` — horizontal continuous scroll.
- `fadeIn` — opacity 0 → 1.
- `fadeUp` — upward reveal while fading in.
- `scaleIn` — slight zoom-in while fading in.
- `slideLeft` — horizontal reveal from right.
- `float` — gentle vertical bob.
- `drift` — slow drifting translation/scale.
- `glowPulse` — pulsing opacity glow.

### Local keyframes in templates

- `src/templates/blog/BlogMainTemplate.tsx`: `@keyframes spin-slow` + `.animate-spin-slow`.
- `src/templates/industries/IndustriesMainTemplate.tsx`: `@keyframes RA_spin` + `.animate-spin-slow`.

---

## 3) Shared interactive motion components (UI-level)

| Component | File | Trigger | Visual effect |
|---|---|---|---|
| FadeIn | `components/motion/FadeIn.tsx` | Scroll into view (IntersectionObserver via `useInView`) | Fades/slides content in once visible. |
| StaggerContainer / StaggerItem | `components/motion/FadeIn.tsx` | Scroll into view | Children reveal in sequence with stagger timing. |
| HoverScale | `components/motion/FadeIn.tsx` | Hover / tap | Slight scale-up on hover, subtle press-in on tap. |
| Reveal | `components/ui/Reveal.tsx` | Scroll into view | Simple fade-up reveal. |
| MobileMegaMenu | `components/ui/MobileMegaMenu.tsx` | Open/close mobile menu + accordion expansion | Animated height/opacity expand-collapse for menu panels. |
| HeroVisual | `components/ui/HeroVisual.tsx` | Hero render, hover, image load | Ambient drift, shimmer sweep, fade-in image/skeleton transitions. |
| GalleryModal | `components/gallery/GalleryModal.tsx` | Open/close modal | Backdrop fade and modal scale/slide spring transition. |
| StatsSection | `components/sections/StatsSection.tsx` | Scroll into view | Staggered card reveal, spring-counting values, subtle live jitter. |
| TimelineTeaser | `components/sections/TimelineTeaser.tsx` | Section in-view + hover pause | Auto-scrolling marquee timeline that pauses on hover. |
| ProblemPromise pathway | `components/sections/ProblemPromise.tsx` | Scroll into view | SVG “draw-on” route line and endpoint pulse reveal. |

---

## 4) Route-wired animation catalog (hero/visual components)

> **Note on trigger behavior:** Most entries auto-play when the user navigates to the listed route and the hero mounts. Some expertise pages with multiple variants also support **Shuffle** (in `components/expertise/ExpertiseHeroVisual.client.tsx`) to switch to another animation.

| Animation | File | Trigger | Visual effect |
|---|---|---|---|
| AIGrowth | `src/components/animations/AIGrowth.tsx` | Visit `/` or `/expertise/ai-in-marketing` | AI-themed growth dashboard/flow visual. |
| GTMStackPro | `src/components/animations/GTMStackPro.tsx` | Visit `/`, `/expertise`, `/industries`, or `/projects` (route-configured) | High-level GTM operating-system style integrated dashboard. |
| Video Marketing Analytics | `src/components/animations/Video-Marketing-Analytics.tsx` | Visit `/expertise/video-marketing` | Live video performance, engagement, and conversion metrics motion UI. |
| Video Marketing Analytics Tile | `src/components/animations/Video-Marketing-Analytics-Tile.tsx` | Visit `/expertise/video-marketing` or Shuffle variant | Compact tile version of video analytics with animated stats/cards. |
| VideoCreativeHero | `src/components/animations/VideoCreativeHero.tsx` | Visit `/expertise/video-marketing` or Shuffle variant | Creative/video production themed hero motion scene. |
| SEO Growth Flow | `src/components/animations/SEO-GrowthFlow.tsx` | Visit `/expertise/search-engine-optimization` | Search-to-pipeline flow animation with ranking/performance emphasis. |
| Marketing Analytics Carousel | `src/components/animations/Marketing-Analytics-Carousel.tsx` | Visit `/expertise/marketing-operations` | Multi-channel metrics carousel/dashboard animation. |
| PipelineDashboard | `src/components/animations/PipelineDashboard.tsx` | Visit `/expertise/marketing-operations` or Shuffle variant | Pipeline funnel and throughput dashboard motion. |
| MarketingOperationsTile | `src/components/animations/MarketingOperationsTile.tsx` | Visit `/expertise/marketing-operations` or Shuffle variant | Tile-style operations KPIs and process indicators. |
| Marketing Automation Live Feed | `src/components/animations/Marketing-Automation-Live-Feed.tsx` | Visit `/expertise/marketing-automation` | Real-time automation queue/processing/routing feed. |
| automation-engine-dashboard | `src/components/animations/automation-engine-dashboard.tsx` | Shuffle on `/expertise/marketing-automation` | Workflow engine performance visualization with live-style movement. |
| Live Email Automation | `src/components/animations/Live-Email-Automation.tsx` | Visit `/expertise/marketing-automation` or Shuffle variant | Animated email nurture/delivery pipeline view. |
| ABM Pipeline Strategy | `src/components/animations/ABM-Pipeline-Strategy.tsx` | Visit `/expertise/account-based-marketing-abm` | ABM funnel/pipeline progression and account prioritization motion. |
| ABMTileAnimation | `src/components/animations/ABMTileAnimation.tsx` | Shuffle on `/expertise/account-based-marketing-abm` | ABM tile/network card interactions and status movement. |
| abm-network-dashboard | `src/components/animations/abm-network-dashboard.tsx` | Visit or Shuffle on `/expertise/account-based-marketing-abm` | Network topology style account relationship animation. |
| ABM Radar Analysis | `src/components/animations/ABM-Radar-Analysis.tsx` | Visit or Shuffle on `/expertise/account-based-marketing-abm` | Radar-style account scoring/coverage visual. |
| ContentMarketingAnimation | `src/components/animations/ContentMarketingAnimation.tsx` | Visit `/expertise/content-marketing` or `/expertise/customer-experience-cx` | Content strategy/performance flow with animated campaign signals. |
| CampaignTile | `src/components/animations/CampaignTile.tsx` | Visit `/expertise/content-marketing` or Shuffle variant | Campaign tile/cards with status and transition motion. |
| Content-Engagement-Marketing | `src/components/animations/Content-Engagement-Marketing.tsx` | Visit `/expertise/content-marketing` or Shuffle variant | Engagement pipeline transitions for content programs. |
| ContentMarketing | `src/components/animations/ContentMarketing.tsx` | Visit `/expertise/content-marketing` or Shuffle variant | General content marketing motion dashboard. |
| Content-Marketing | `src/components/animations/Content-Marketing.tsx` | Visit `/expertise/content-marketing` or Shuffle variant | Alternate content-marketing flow animation variant. |
| GTMAudienceTileHero | `src/components/animations/GTMAudienceTileHero.tsx` | Visit `/expertise/customer-experience-cx` or Shuffle variant | Audience segmentation/targeting tile animation. |
| ContentMarketingHero | `src/components/animations/ContentMarketingHero.tsx` | Visit `/expertise/customer-marketing` | Customer-marketing hero with animated content lifecycle elements. |
| CRMCampaignsTile | `src/components/animations/CRMCampaignsTile.tsx` | Visit `/expertise/customer-marketing` or Shuffle variant | CRM campaign performance tile with animated indicators. |
| LeadGenTileAnimation | `src/components/animations/LeadGenTileAnimation.tsx` | Visit `/expertise/demand-generation` (also demand-gen fallback) | Lead-gen stages and conversion tile motion. |
| DemandGenFlow | `src/components/animations/DemandGenFlow.tsx` | Visit `/expertise/demand-generation` | End-to-end demand flow with moving funnel/progression cues. |
| DemandGenerationHero | `src/components/animations/DemandGenerationHero.tsx` | Visit `/expertise/demand-generation` or Shuffle variant | Hero-level demand generation journey animation. |
| EmailMarketingHero | `src/components/animations/EmailMarketingHero.tsx` | Visit `/expertise/email-marketing` | Email-centric hero motion (delivery/engagement style visual). |
| DemandGenerationHeroTile | `src/components/animations/DemandGenerationHeroTile.tsx` | Visit `/expertise/email-marketing` or Shuffle variant | Demand-gen tile variant used in email-marketing context. |
| EventMarketing | `src/components/animations/EventMarketing.tsx` | Visit `/expertise/event-marketing` | Event pipeline and campaign activity motion scene. |
| ExecutiveLogisticsDashboard | `src/components/animations/ExecutiveLogisticsDashboard.tsx` | Visit `/expertise/event-marketing` or Shuffle variant | Executive logistics/control dashboard with live status animation. |
| GrowthMarketingHero | `src/components/animations/GrowthMarketingHero.tsx` | Visit `/expertise/growth-marketing` | Growth-focused KPI/trajectory hero animation. |
| ApexShieldLifecycleEngine | `src/components/animations/ApexShieldLifecycleEngine.tsx` | Visit `/expertise/lifecycle-marketing` | Lifecycle engine progression and state transitions. |
| NexusStakeholderPortal | `src/components/animations/NexusStakeholderPortal.tsx` | Visit `/expertise/lifecycle-marketing` or Shuffle variant | Stakeholder portal dashboard transitions and status pulses. |
| QuantumDashboard | `src/components/animations/QuantumDashboard.tsx` | Visit `/expertise/omnichannel-marketing` | Unified omnichannel analytics with animated panels/metrics. |
| Omni-Analytics | `src/components/animations/Omni-Analytics.tsx` | Visit `/expertise/omnichannel-marketing` or Shuffle variant | Alternate omnichannel analytics variant. |
| ContentEngagementTile | `src/components/animations/ContentEngagementTile.tsx` | Visit `/expertise/content-engagement` | Content/engagement KPI tile transitions and pulses. |
| DemandGrowthTile | `src/components/animations/DemandGrowthTile.tsx` | Visit `/expertise/demand-and-growth` | Demand/growth tile with animated performance shifts. |
| GrowthSEMTile | `src/components/animations/GrowthSEMTile.tsx` | Visit `/expertise/paid-advertising` or `/expertise/product-marketing` | SEM/product-focused growth tile and metric movement. |
| MarTechTile | `src/components/animations/MarTechTile.tsx` | Visit `/expertise/martech-optimization` | MarTech optimization UI with status toggles and live metric effects. |
| SalesEnablementTile | `src/components/animations/SalesEnablementTile.tsx` | Visit `/expertise/sales-enablement` | Sales enablement KPIs and process flow tile animation. |
| SocialMediaHero | `src/components/animations/SocialMediaHero.tsx` | Visit `/expertise/social-media-marketing` | Social network/engagement style hero with moving nodes/signals. |
| StrategyInsightsTile | `src/components/animations/StrategyInsightsTile.tsx` | Visit `/expertise/strategy-insights` | Strategy/insight tile with directional trend motion. |
| PlgJourneyDashboard | `src/components/animations/PlgJourneyDashboard.tsx` | Visit `/expertise/systems-operations` | Product-led journey dashboard with staged progression animation. |
| Developer-Marketing | `src/components/animations/Developer-Marketing.tsx` | Visit `/industries/developer-tools` | Developer ecosystem/marketing workflow animation. |
| DevMarketers | `src/components/animations/DevMarketers.tsx` | Visit `/industries/developer-tools` or Shuffle variant | Alternate developer-marketing dashboard motion. |
| EduMarketersDashboard | `src/components/animations/EduMarketersDashboard.tsx` | Visit `/industries/education` | Education marketing dashboard with live-style updates. |
| HigherEDMarketingTile | `src/components/animations/HigherEDMarketingTile.tsx` | Visit `/industries/education` or Shuffle variant | Higher-ed tile visualization with animated chart/insight states. |
| IndustrialDashboard | `src/components/animations/IndustrialDashboard.tsx` | Visit `/industries/manufacturing` | Manufacturing ops dashboard (throughput/OEE style) animation. |
| Industrial-MFG-Tile | `src/components/animations/Industrial-MFG-Tile.tsx` | Visit `/industries/manufacturing` or refresh/Shuffle variant | Industrial tile variant with operational status movement. |
| Manufacturing-LifecycleDashboard | `src/components/animations/Manufacturing-LifecycleDashboard.tsx` | Visit `/industries/manufacturing` or refresh/Shuffle variant | Lifecycle/plant process dashboard transitions and activity pulses. |
| RevOpsMeshTile | `src/components/animations/RevOpsMeshTile.tsx` | Visit `/industries/b2b-saas` | RevOps mesh/network tile with linked node motion. |
| OmnichannelLiveAnalytics | `src/components/animations/OmnichannelLiveAnalytics.tsx` | Visit `/industries/cybersecurity` | Live omnichannel analytic streams for cybersecurity context. |
| EnergyGridTile | `src/components/animations/EnergyGridTile.tsx` | Visit `/industries/energy-utilities` | Energy grid system tile with flow/status movement. |
| WealthManageTile | `src/components/animations/WealthManageTile.tsx` | Visit `/industries/financial-services` | Wealth/financial dashboard tile with animated KPI states. |
| SystemsProcessTile | `src/components/animations/SystemsProcessTile.tsx` | Visit `/industries/fleet-management-logistics` | System/process operations tile with route/process activity motion. |
| HealthCareTile | `src/components/animations/HealthCareTile.tsx` | Visit `/industries/healthcare` | Healthcare dashboard tile with clinical/ops status transitions. |
| NGOTile | `src/components/animations/NGOTile.tsx` | Visit `/industries/non-profit-ngo` | NGO impact/operations tile with animated progress cues. |
| PubSecTile | `src/components/animations/PubSecTile.tsx` | Visit `/industries/pubsec-government` | Public-sector systems tile with signal/pulse style animation. |
| OmniRetailTile | `src/components/animations/OmniRetailTile.tsx` | Visit `/industries/retail` | Retail omnichannel tile with floating cards and glow pulses. |
| TelcoAITile | `src/components/animations/TelcoAITile.tsx` | Visit `/industries/telecommunications` | Telecom AI tile with signal rings and live network indicators. |
| WasteMan | `src/components/animations/WasteMan.tsx` | Visit `/industries/waste-management` | Waste-management dashboard tile with status/action motion. |

---

## 5) Source files used for this catalog

- `package.json`
- `tailwind.config.ts`
- `src/data/animations.ts`
- `lib/heroVisualRegistry.ts`
- `components/expertise/ExpertiseHeroVisual.client.tsx`
- `components/motion/FadeIn.tsx`
- `components/ui/Reveal.tsx`
- `components/ui/MobileMegaMenu.tsx`
- `components/ui/HeroVisual.tsx`
- `components/gallery/GalleryModal.tsx`
- `components/sections/StatsSection.tsx`
- `components/sections/TimelineTeaser.tsx`
- `components/sections/ProblemPromise.tsx`