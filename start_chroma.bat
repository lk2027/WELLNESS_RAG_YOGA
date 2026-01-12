@echo off
echo ============================================================
echo Chroma DB Setup and Start Script
echo ============================================================
echo.

REM Check if chromadb is installed
python -c "import chromadb" 2>nul
if %errorlevel% neq 0 (
    echo Installing ChromaDB...
    echo This may take 3-5 minutes. Please wait...
    pip install chromadb
    if %errorlevel% neq 0 (
        echo Failed to install ChromaDB
        pause
        exit /b 1
    )
    echo ChromaDB installed successfully!
) else (
    echo ChromaDB is already installed
)

echo.
echo Starting Chroma DB server on http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

REM Create chroma_db directory
if not exist chroma_db mkdir chroma_db

REM Start Chroma server
chroma run --path chroma_db --port 8000
