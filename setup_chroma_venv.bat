@echo off
echo ============================================================
echo ChromaDB Virtual Environment Setup Script
echo ============================================================
echo.

REM Check if Python 3.11 is installed
py -3.11 --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python 3.11 is not installed!
    echo.
    echo Please install Python 3.11 first:
    echo 1. Download from: https://www.python.org/downloads/release/python-3119/
    echo 2. Run installer and check "Add Python 3.11 to PATH"
    echo 3. Run this script again
    echo.
    pause
    exit /b 1
)

echo Python 3.11 found!
py -3.11 --version
echo.

REM Create virtual environment
echo Creating virtual environment...
if exist chroma_venv (
    echo Virtual environment already exists. Removing old one...
    rmdir /s /q chroma_venv
)
py -3.11 -m venv chroma_venv
if %errorlevel% neq 0 (
    echo ERROR: Failed to create virtual environment
    pause
    exit /b 1
)
echo Virtual environment created successfully!
echo.

REM Activate virtual environment and install dependencies
echo Activating virtual environment...
call chroma_venv\Scripts\activate.bat

echo Upgrading pip...
python -m pip install --upgrade pip --quiet

echo.
echo Installing ChromaDB...
echo This may take 2-3 minutes. Please wait...
pip install chromadb
if %errorlevel% neq 0 (
    echo ERROR: Failed to install ChromaDB
    pause
    exit /b 1
)

echo.
echo ============================================================
echo Setup Complete!
echo ============================================================
echo.
echo To start Chroma DB server, run:
echo   chroma_venv\Scripts\activate.bat
echo   chroma run --path ./chroma_db --port 8000
echo.
echo Or use the start_chroma_server.bat script
echo.
pause
