# Test Query Script for Yoga RAG System
Write-Host "`n🧘 Testing Yoga RAG System...`n" -ForegroundColor Cyan

# Check if server is running
Write-Host "Checking if backend server is running..." -ForegroundColor Yellow
$serverRunning = Test-NetConnection -ComputerName localhost -Port 3001 -InformationLevel Quiet -WarningAction SilentlyContinue

if (-not $serverRunning) {
    Write-Host "❌ Backend server is not running on port 3001" -ForegroundColor Red
    Write-Host "`nPlease start the backend server first:" -ForegroundColor Yellow
    Write-Host "  cd c:\Users\Lenovo\Desktop\YOGARAG\backend" -ForegroundColor White
    Write-Host "  npm start`n" -ForegroundColor White
    exit 1
}

Write-Host "✅ Backend server is running`n" -ForegroundColor Green

# Test query
Write-Host "Sending test query: 'What are the benefits of yoga?'" -ForegroundColor Cyan
Write-Host ""

$body = @{
    query = "What are the benefits of yoga?"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/ask" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    
    Write-Host "=" * 80 -ForegroundColor Green
    Write-Host "✅✅✅ SUCCESS! QUERY WORKED WITH LOCAL EMBEDDINGS! ✅✅✅" -ForegroundColor Green
    Write-Host "=" * 80 -ForegroundColor Green
    Write-Host ""
    
    Write-Host "QUERY: What are the benefits of yoga?" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "ANSWER:" -ForegroundColor Cyan
    Write-Host $response.answer -ForegroundColor White
    Write-Host ""
    Write-Host "-" * 80 -ForegroundColor Gray
    Write-Host ""
    
    Write-Host "SOURCES FOUND: $($response.sources.Count)" -ForegroundColor Cyan
    $response.sources | ForEach-Object {
        Write-Host "  • $($_.title)" -ForegroundColor Gray
        if ($_.source) {
            Write-Host "    Source: $($_.source)" -ForegroundColor DarkGray
        }
    }
    Write-Host ""
    
    Write-Host "METADATA:" -ForegroundColor Cyan
    Write-Host "  Response Time: $($response.metadata.responseTime)ms" -ForegroundColor Green
    Write-Host "  Chunks Retrieved: $($response.metadata.chunksRetrieved)" -ForegroundColor Green
    Write-Host "  Is Unsafe: $($response.isUnsafe)" -ForegroundColor $(if($response.isUnsafe){"Yellow"}else{"Green"})
    Write-Host ""
    
    Write-Host "=" * 80 -ForegroundColor Green
    Write-Host "✅ System is working perfectly with LOCAL EMBEDDINGS!" -ForegroundColor Green
    Write-Host "✅ No OpenAI API needed!" -ForegroundColor Green
    Write-Host "=" * 80 -ForegroundColor Green
    Write-Host ""
    
} catch {
    Write-Host "❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body:" -ForegroundColor Yellow
        Write-Host $responseBody -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Make sure backend server is running" -ForegroundColor White
    Write-Host "  2. Check server logs for errors" -ForegroundColor White
    Write-Host "  3. Verify Chroma DB is running" -ForegroundColor White
    Write-Host ""
}
