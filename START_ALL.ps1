# Start All Services - Chroma DB, Backend, and Frontend
# This script opens separate windows for each service

Write-Host ""
Write-Host "=" * 80 -ForegroundColor Cyan
Write-Host "🧘 YOGA RAG SYSTEM - STARTING ALL SERVICES 🧘" -ForegroundColor Yellow
Write-Host "=" * 80 -ForegroundColor Cyan
Write-Host ""

$projectPath = "c:\Users\Lenovo\Desktop\YOGARAG"

# Function to start a process in a new window
function Start-InNewWindow {
    param(
        [string]$Title,
        [string]$Command,
        [string]$WorkingDirectory
    )
    
    $psCommand = "cd '$WorkingDirectory'; Write-Host '$Title' -ForegroundColor Cyan; $Command"
    
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $psCommand
    Start-Sleep -Seconds 2
}

Write-Host "Starting services in separate windows..." -ForegroundColor Green
Write-Host ""

# 1. Start Chroma DB
Write-Host "1. Starting Chroma DB server..." -ForegroundColor Yellow
Start-InNewWindow -Title "Chroma DB Server" -Command ".\chroma_venv\Scripts\Activate.ps1; chroma run --path ./chroma_db --port 8000" -WorkingDirectory $projectPath

# 2. Start Backend
Write-Host "2. Starting Backend server..." -ForegroundColor Yellow
Start-InNewWindow -Title "Backend Server" -Command "npm start" -WorkingDirectory "$projectPath\backend"

# Wait for backend to be ready
Write-Host ""
Write-Host "Waiting for services to start (10 seconds)..." -ForegroundColor Cyan
Start-Sleep -Seconds 10

# 3. Start Frontend and open Chrome
Write-Host "3. Starting Frontend server..." -ForegroundColor Yellow
Write-Host "   Chrome will open automatically..." -ForegroundColor Cyan
Write-Host ""

# Open Chrome first
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chromePath)) {
    $chromePath = "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe"
}
if (Test-Path $chromePath) {
    Start-Process $chromePath -ArgumentList "http://localhost:3000"
} else {
    Start-Process "http://localhost:3000"
}

# Start frontend in new window
Start-InNewWindow -Title "Frontend Server" -Command "npm run dev" -WorkingDirectory "$projectPath\frontend"

Write-Host ""
Write-Host "=" * 80 -ForegroundColor Green
Write-Host "✅ All services started!" -ForegroundColor Green
Write-Host "=" * 80 -ForegroundColor Green
Write-Host ""
Write-Host "You should see 3 PowerShell windows:" -ForegroundColor Cyan
Write-Host "  1. Chroma DB Server (port 8000)" -ForegroundColor White
Write-Host "  2. Backend Server (port 3001)" -ForegroundColor White
Write-Host "  3. Frontend Server (port 3000)" -ForegroundColor White
Write-Host ""
Write-Host "Chrome should open automatically at: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "If Chrome didn't open, manually go to: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
