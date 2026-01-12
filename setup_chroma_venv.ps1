# ChromaDB Virtual Environment Setup Script (PowerShell)
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "ChromaDB Virtual Environment Setup Script" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python 3.11 is installed
try {
    $pythonVersion = & py -3.11 --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Python 3.11 not found"
    }
    Write-Host "Python 3.11 found!" -ForegroundColor Green
    Write-Host $pythonVersion -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "ERROR: Python 3.11 is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Python 3.11 first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://www.python.org/downloads/release/python-3119/" -ForegroundColor White
    Write-Host "2. Run installer and check 'Add Python 3.11 to PATH'" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Create virtual environment
Write-Host "Creating virtual environment..." -ForegroundColor Yellow
if (Test-Path "chroma_venv") {
    Write-Host "Virtual environment already exists. Removing old one..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "chroma_venv"
}

& py -3.11 -m venv chroma_venv
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to create virtual environment" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "Virtual environment created successfully!" -ForegroundColor Green
Write-Host ""

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& .\chroma_venv\Scripts\Activate.ps1

# Upgrade pip
Write-Host "Upgrading pip..." -ForegroundColor Yellow
& python -m pip install --upgrade pip --quiet

# Install ChromaDB
Write-Host ""
Write-Host "Installing ChromaDB..." -ForegroundColor Yellow
Write-Host "This may take 2-3 minutes. Please wait..." -ForegroundColor Yellow
& pip install chromadb
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install ChromaDB" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start Chroma DB server, run:" -ForegroundColor Cyan
Write-Host "  .\chroma_venv\Scripts\Activate.ps1" -ForegroundColor White
Write-Host "  chroma run --path ./chroma_db --port 8000" -ForegroundColor White
Write-Host ""
Write-Host "Or use: .\start_chroma_server.bat" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"
