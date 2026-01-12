# Start Frontend and Open in Chrome
Write-Host ""
Write-Host "🚀 Starting Frontend Server..." -ForegroundColor Cyan
Write-Host ""

# Check if backend is running
$backendRunning = Test-NetConnection -ComputerName localhost -Port 3001 -InformationLevel Quiet -WarningAction SilentlyContinue

if (-not $backendRunning) {
    Write-Host "⚠️  WARNING: Backend server is not running on port 3001" -ForegroundColor Yellow
    Write-Host "   The frontend will start, but queries won't work until backend is running." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   To start backend, open a new PowerShell and run:" -ForegroundColor White
    Write-Host "   cd c:\Users\Lenovo\Desktop\YOGARAG\backend" -ForegroundColor Gray
    Write-Host "   npm start" -ForegroundColor Gray
    Write-Host ""
}

# Navigate to frontend directory
Set-Location "$PSScriptRoot\frontend"

# Start Vite dev server
Write-Host "Starting Vite dev server on http://localhost:3000..." -ForegroundColor Green
Write-Host ""
Write-Host "The browser will open automatically in 3 seconds..." -ForegroundColor Yellow
Write-Host ""

# Wait a bit for server to start, then open Chrome
Start-Sleep -Seconds 3

# Open Chrome
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (Test-Path $chromePath) {
    Start-Process $chromePath -ArgumentList "http://localhost:3000"
    Write-Host "✅ Opened Chrome at http://localhost:3000" -ForegroundColor Green
} else {
    # Try alternative Chrome paths
    $chromePaths = @(
        "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe",
        "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
        "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
    )
    
    $found = $false
    foreach ($path in $chromePaths) {
        if (Test-Path $path) {
            Start-Process $path -ArgumentList "http://localhost:3000"
            Write-Host "✅ Opened Chrome at http://localhost:3000" -ForegroundColor Green
            $found = $true
            break
        }
    }
    
    if (-not $found) {
        Write-Host "⚠️  Could not find Chrome. Opening default browser..." -ForegroundColor Yellow
        Start-Process "http://localhost:3000"
    }
}

Write-Host ""
Write-Host "Frontend server is running. Press Ctrl+C to stop." -ForegroundColor Cyan
Write-Host ""

# Start npm dev server (this will block)
npm run dev
