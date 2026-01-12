@echo off
echo ============================================================
echo Starting Chroma DB Server
echo ============================================================
echo.

REM Check if virtual environment exists
if not exist chroma_venv (
    echo ERROR: Virtual environment not found!
    echo.
    echo Please run setup_chroma_venv.bat first
    echo.
    pause
    exit /b 1
)

REM Activate virtual environment
call chroma_venv\Scripts\activate.bat

REM Create chroma_db directory if it doesn't exist
if not exist chroma_db mkdir chroma_db

echo Starting Chroma DB server on http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

REM Start Chroma server
chroma run --path ./chroma_db --port 8000
