# fix-expertise-main.ps1
$ErrorActionPreference = "Stop"

$registryPath = "src/templates/registry.ts"
$templatePath = "src/templates/expertise/ExpertiseMainTemplate.tsx"

if (!(Test-Path $registryPath)) {
  throw "Missing $registryPath"
}

# Ensure template file exists
if (!(Test-Path $templatePath)) {
  Write-Host "Creating missing template: $templatePath"
  New-Item -ItemType Directory -Force -Path (Split-Path $templatePath) | Out-Null

  @"
import React from 'react'

type Props = {
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  content?: any
}

export default function ExpertiseMainTemplate({ pageTitle = 'Expertise', content }: Props) {
  return (
    <main className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>
      <p className="mb-4 opacity-70">
        (Temporary template) If you can see this, expertise.main is wired correctly.
      </p>
      <pre className="bg-gray-100 rounded p-4 overflow-auto text-sm">
        {JSON.stringify(content ?? null, null, 2)}
      </pre>
    </main>
  )
}
"@ | Set-Content -Encoding UTF8 $templatePath
}

# Read registry
$lines = Get-Content $registryPath -Raw

# 1) Ensure import exists
$importLine = "import ExpertiseMainTemplate from '@/src/templates/expertise/ExpertiseMainTemplate'"
if ($lines -notmatch [regex]::Escape($importLine)) {
  Write-Host "Adding import for ExpertiseMainTemplate"
  # Insert after ExpertiseTopicTemplate import if present, else after ExpertiseCategoryTemplate import, else at top.
  if ($lines -match "import ExpertiseTopicTemplate.*\r?\n") {
    $lines = $lines -replace "(import ExpertiseTopicTemplate[^\r\n]*\r?\n)", "`$1$importLine`r`n"
  } elseif ($lines -match "import ExpertiseCategoryTemplate.*\r?\n") {
    $lines = $lines -replace "(import ExpertiseCategoryTemplate[^\r\n]*\r?\n)", "`$1$importLine`r`n"
  } else {
    $lines = "$importLine`r`n$lines"
  }
}

# 2) Ensure TemplateComponent union includes it
if ($lines -match "export type TemplateComponent" -and $lines -notmatch "\|\s+typeof ExpertiseMainTemplate") {
  Write-Host "Adding ExpertiseMainTemplate to TemplateComponent union"
  $lines = $lines -replace "(export type TemplateComponent\s*=\s*(?:\r?\n\s*\|\s*typeof[^\r\n]+)+)", "`$1`r`n  | typeof ExpertiseMainTemplate"
}

# 3) Ensure mapping exists
if ($lines -notmatch "'expertise\.main'\s*:\s*ExpertiseMainTemplate") {
  Write-Host "Adding 'expertise.main' mapping to TEMPLATE_BY_ID"
  # Insert after 'expertise.topic' if present, else after 'expertise.category'
  if ($lines -match "'expertise\.topic'\s*:\s*ExpertiseTopicTemplate,") {
    $lines = $lines -replace "('expertise\.topic'\s*:\s*ExpertiseTopicTemplate,\s*)", "`$1`r`n  'expertise.main': ExpertiseMainTemplate,"
  } elseif ($lines -match "'expertise\.category'\s*:\s*ExpertiseCategoryTemplate,") {
    $lines = $lines -replace "('expertise\.category'\s*:\s*ExpertiseCategoryTemplate,\s*)", "`$1`r`n  'expertise.main': ExpertiseMainTemplate,"
  } else {
    throw "Could not find TEMPLATE_BY_ID expertise entries to insert into. Please open $registryPath and paste it here."
  }
}

# Ensure RegistryTemplateId includes it (helps TS even if generated TemplateId union lags)
if ($lines -match "export type RegistryTemplateId" -and $lines -notmatch "'expertise\.main'") {
  Write-Host "Adding 'expertise.main' to RegistryTemplateId union"
  $lines = $lines -replace "(export type RegistryTemplateId\s*=\s*[^;\r\n]+)", "`$1 | 'expertise.main'"
}

# Write back
Set-Content -Encoding UTF8 $registryPath $lines

Write-Host "Done. Verify:"
Write-Host "  - $templatePath exists"
Write-Host "  - $registryPath contains expertise.main mapping"
