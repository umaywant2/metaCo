# metaCo CLI Hook (Windows PowerShell)
# Minimal toggle script for metaCo extension

param (
    [Parameter(Mandatory=$true)]
    [ValidateSet("on","off")]
    [string]$action
)

# Path to metaCo state file (shared with extension)
$stateFile = "$env:LOCALAPPDATA\metaCo\state.json"

# Ensure directory exists
if (!(Test-Path (Split-Path $stateFile))) {
    New-Item -ItemType Directory -Path (Split-Path $stateFile) | Out-Null
}

switch ($action) {
    "on" {
        $state = @{ enabled = $true }
        Write-Output "metaCo toggled ON"
    }
    "off" {
        $state = @{ enabled = $false }
        Write-Output "metaCo toggled OFF"
    }
}

# Save state to JSON file
$state | ConvertTo-Json | Set-Content -Path $stateFile -Encoding UTF8
