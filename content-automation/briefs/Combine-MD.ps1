# Combine-MD.ps1

$OutputFile = "combined.md"

# Clear the output file if it already exists
if (Test-Path $OutputFile) {
    Remove-Item $OutputFile
}

# Get all .md files in the current folder
$files = Get-ChildItem -Filter *.md | Sort-Object Name

foreach ($file in $files) {
    Add-Content -Path $OutputFile -Value "# FILE: $($file.Name)"
    Add-Content -Path $OutputFile -Value ""
    Add-Content -Path $OutputFile -Value (Get-Content $file.FullName -Raw)
    Add-Content -Path $OutputFile -Value ""
    Add-Content -Path $OutputFile -Value "---"
    Add-Content -Path $OutputFile -Value ""
}

Write-Host "Combined $(($files).Count) files into $OutputFile"