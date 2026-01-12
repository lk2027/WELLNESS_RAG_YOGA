@echo off
REM Start Frontend and Open in Chrome
echo.
echo Starting Frontend Server...
echo.

cd /d "%~dp0frontend"

REM Wait a bit then open Chrome
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" http://localhost:3000
timeout /t 3 /nobreak >nul

echo Opening Chrome at http://localhost:3000...
echo.
echo Frontend server starting...
echo Press Ctrl+C to stop.
echo.

npm run dev
