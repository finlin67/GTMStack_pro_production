# ListFoldersToFile.ps1
$here = Get-Location
$output = Join-Path $here "folders.txt"

Get-ChildItem -Path $here -Directory |
    Select-Object -ExpandProperty Name |
    Out-File -FilePath $output -Encoding UTF8

Write-Host "Saved folder list to $output"