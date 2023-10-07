# // ts-node "$( cd ${0%/*} && pwd -P )/ts/delete-github-package-version.ts" $ 1 $2 $3 $4 $5 $6 $7 $8 $9
[CmdletBinding()]
param(
    [Alias("pkg", "p")]
    [string]$PackageId,
    [Alias("ver", "v")]
    [string]$PackageVersion,
    [Alias("t", "gh")]
    [string]$GitHubToken,
    [Alias("org")]
    [string]$GitHubOrganization
)

node "$PSScriptRoot/js/delete-github-package-version.js" $GitHubOrganization $PackageId $PackageVersion ($GitHubToken ?? $env:GITHUB_TOKEN)
