# List all file paths here
$files = @(
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\cybersecurity.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\developer-tools.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\energy-utilities.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\financial-services.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\fleet-management-logistics.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\healthcare.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\manufacturing.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\non-profit-education.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\pubsec-government.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\retail.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\supply-chain-logistics.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\technology-saas.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\account-based-marketing-abm.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\analytics.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\competitive-intel.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\content-engagement.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\content-marketing.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\crm-management.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\customer-marketing.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\demand-generation.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\demand-growth.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\event-marketing.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\lead-gen-scoring.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\marketing-analytics-reporting.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\marketing-automation.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\martech-optimization.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\paid-advertising-sem.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\product-marketing.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\roi-analysis.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\Route.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\sales-enablement.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\search-engine-optimization.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\social-media-marketing.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\strategy.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\strategy-insights.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\systems-operations.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\web-design-ui-ux.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\cybersecurity.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\developer-tools.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\energy-utilities.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\financial-services.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\fleet-management-logistics.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\healthcare.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\non-profit-education.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\pubsec-government.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\retail.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\supply-chain-logistics.md",
    "C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\technology-saas.md"
)

foreach ($file in $files) {
    $parent = Split-Path $file -Parent

    if (!(Test-Path $parent)) {
        New-Item -ItemType Directory -Path $parent | Out-Null
        Write-Host "Created directory: $parent"
    }

    if (!(Test-Path $file)) {
        New-Item -ItemType File -Path $file | Out-Null
        Write-Host "Created file: $file"
    } else {
        Write-Host "File already exists, skipping: $file"
    }
}