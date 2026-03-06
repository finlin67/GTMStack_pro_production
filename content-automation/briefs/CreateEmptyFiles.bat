@echo off
setlocal enabledelayedexpansion

rem Define the list of file paths here. One per SET line.
rem Use quotes for paths with spaces.
set "files[0]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\cybersecurity.md"
set "files[1]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\developer-tools.md"
set "files[2]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\energy-utilities.md"
set "files[3]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\financial-services.md"
set "files[4]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\fleet-management-logistics.md"
set "files[5]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\healthcare.md"
set "files[6]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\manufacturing.md"
set "files[7]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\non-profit-education.md"
set "files[8]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\pubsec-government.md"
set "files[9]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\retail.md"
set "files[10]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\supply-chain-logistics.md"
set "files[11]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\technology-saas.md"
set "files[12]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\account-based-marketing-abm.md"
set "files[13]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\analytics.md"
set "files[14]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\competitive-intel.md"
set "files[15]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\content-engagement.md"
set "files[16]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\content-marketing.md"
set "files[17]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\crm-management.md"
set "files[18]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\customer-marketing.md"
set "files[19]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\demand-generation.md"
set "files[20]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\demand-growth.md"
set "files[21]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\event-marketing.md"
set "files[22]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\lead-gen-scoring.md"
set "files[23]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\marketing-analytics-reporting.md"
set "files[24]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\marketing-automation.md"
set "files[25]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\martech-optimization.md"
set "files[26]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\paid-advertising-sem.md"
set "files[27]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\product-marketing.md"
set "files[28]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\roi-analysis.md"
set "files[29]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\Route.md"
set "files[30]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\sales-enablement.md"
set "files[31]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\search-engine-optimization.md"
set "files[32]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\social-media-marketing.md"
set "files[33]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\strategy.md"
set "files[34]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\strategy-insights.md"
set "files[35]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\systems-operations.md"
set "files[36]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\expertise\web-design-ui-ux.md"
set "files[37]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\cybersecurity.md"
set "files[38]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\developer-tools.md"
set "files[39]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\energy-utilities.md"
set "files[40]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\financial-services.md"
set "files[41]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\fleet-management-logistics.md"
set "files[42]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\healthcare.md"
set "files[43]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\non-profit-education.md"
set "files[44]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\pubsec-government.md"
set "files[45]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\retail.md"
set "files[46]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\supply-chain-logistics.md"
set "files[47]=C:\GitProd\z1_GTMStack_pro\content-automation\briefs\industries\technology-saas.md"
rem Add more: set "files[3]=your_next_path"

rem Loop through the array
set i=0
:loop
if not defined files[!i!] goto endloop

set "path=!files[%i%]!"

rem Get parent directory (remove file name)
for %%A in ("!path!") do set "parent=%%~dpA"

rem Create parent directories if needed
if not exist "!parent!" (
    md "!parent!"
    echo Created directory: !parent!
)

rem Create file if it doesn't exist
if not exist "!path!" (
    type nul > "!path!" 0 >nul
    echo Created file: !path!
) else (
    echo File already exists, skipping: !path!
)

set /a i+=1
goto loop

:endloop
echo Script completed.
pause



