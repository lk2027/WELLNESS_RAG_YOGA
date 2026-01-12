@echo off
echo ============================================================
echo Starting Backend Server and Testing Query
echo ============================================================
echo.

cd /d %~dp0backend

echo Starting backend server...
start "Yoga RAG Backend" cmd /k "npm start"

echo.
echo Waiting 15 seconds for server to start...
timeout /t 15 /nobreak >nul

echo.
echo Testing query...
echo.

powershell -Command "$body = @{query='What are the benefits of yoga?'} | ConvertTo-Json; try { $response = Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json'; Write-Host 'SUCCESS! Query worked!' -ForegroundColor Green; Write-Host ''; Write-Host 'ANSWER:' -ForegroundColor Cyan; Write-Host $response.answer -ForegroundColor White; Write-Host ''; Write-Host 'Sources:' $response.sources.Count -ForegroundColor Cyan; Write-Host 'Response Time:' $response.metadata.responseTime 'ms' -ForegroundColor Cyan } catch { Write-Host 'Error:' $_.Exception.Message -ForegroundColor Red }"

echo.
echo ============================================================
echo Test complete!
echo Backend server is still running in the other window.
echo You can test more queries at: http://localhost:3000
echo ============================================================
echo.
pause
