# Quick script to open the frontend in Chrome
# Use this if frontend is already running

$url = "http://localhost:3000"

# Check if frontend is running
$frontendRunning = Test-NetConnection -ComputerName localhost -Port 3000 -InformationLevel Quiet -WarningAction SilentlyContinue

if (-not $frontendRunning) {
    Write-Host "❌ Frontend is not running on port 3000" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please start the frontend first:" -ForegroundColor Yellow
    Write-Host "  cd c:\Users\Lenovo\Desktop\YOGARAG\frontend" -ForegroundColor White
    Write-Host "  npm run dev" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "Opening Chrome at $url..." -ForegroundColor Green

# Try to find Chrome
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chromePath)) {
    $chromePath = "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe"
}
if (-not (Test-Path $chromePath)) {
    $chromePath = "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe"
}

if (Test-Path $chromePath) {
    Start-Process $chromePath -ArgumentList $url
    Write-Host "✅ Chrome opened!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Chrome not found. Opening default browser..." -ForegroundColor Yellow
    Start-Process $url
}
