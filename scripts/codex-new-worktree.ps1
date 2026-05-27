param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[A-Za-z0-9][A-Za-z0-9._-]*$')]
    [string]$Name,

    [string]$Base = "main"
)

$ErrorActionPreference = "Stop"

$repoRoot = (git rev-parse --show-toplevel).Trim()
$parent = Split-Path -Parent $repoRoot
$repoName = Split-Path -Leaf $repoRoot
$branch = "codex/$Name"
$target = Join-Path $parent "$repoName-$Name"

git rev-parse --verify HEAD *> $null

if (Test-Path -LiteralPath $target) {
    throw "Target worktree already exists: $target"
}

git worktree add $target -b $branch $Base

Write-Host "Created worktree:"
Write-Host "  Path:   $target"
Write-Host "  Branch: $branch"
