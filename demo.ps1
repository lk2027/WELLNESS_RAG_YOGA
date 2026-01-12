# Yoga RAG System - Interactive Demo Script
# Run this in PowerShell to demonstrate the system

Write-Host ""
Write-Host "=" * 80 -ForegroundColor Cyan
Write-Host "🧘 YOGA RAG SYSTEM - INTERACTIVE DEMONSTRATION 🧘" -ForegroundColor Yellow
Write-Host "=" * 80 -ForegroundColor Cyan
Write-Host ""

# Check if backend is running
Write-Host "Checking if backend server is running..." -ForegroundColor Yellow
$serverRunning = Test-NetConnection -ComputerName localhost -Port 3001 -InformationLevel Quiet -WarningAction SilentlyContinue

if (-not $serverRunning) {
    Write-Host "❌ Backend server is NOT running on port 3001" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please start the backend server first:" -ForegroundColor Yellow
    Write-Host "  1. Open a NEW PowerShell window" -ForegroundColor White
    Write-Host "  2. Run: cd c:\Users\Lenovo\Desktop\YOGARAG\backend" -ForegroundColor White
    Write-Host "  3. Run: npm start" -ForegroundColor White
    Write-Host "  4. Wait for: '🚀 Server running on port 3001'" -ForegroundColor White
    Write-Host "  5. Then run this demo script again" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "✅ Backend server is running!" -ForegroundColor Green
Write-Host ""

# Demo queries
$demoQueries = @(
    @{
        query = "What are the benefits of yoga?"
        description = "General yoga benefits"
    },
    @{
        query = "How do I practice Tree Pose Vrikshasana?"
        description = "Specific asana instructions"
    },
    @{
        query = "What are beginner standing poses?"
        description = "Category-based query"
    },
    @{
        query = "What are the benefits of Warrior II?"
        description = "Benefits of specific pose"
    },
    @{
        query = "I am pregnant, what poses should I avoid?"
        description = "Safety filter test (should show warning)"
    }
)

$queryNumber = 1
foreach ($demo in $demoQueries) {
    Write-Host ""
    Write-Host ("=" * 80) -ForegroundColor Magenta
    Write-Host "DEMO $queryNumber of $($demoQueries.Count): $($demo.description)" -ForegroundColor Cyan
    Write-Host ("=" * 80) -ForegroundColor Magenta
    Write-Host ""
    Write-Host "QUERY: $($demo.query)" -ForegroundColor Yellow
    Write-Host ""
    
    $body = @{query=$demo.query} | ConvertTo-Json
    
    try {
        $startTime = Get-Date
        $response = Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json' -ErrorAction Stop
        $endTime = Get-Date
        $actualTime = ($endTime - $startTime).TotalMilliseconds
        
        Write-Host "✅ SUCCESS!" -ForegroundColor Green
        Write-Host ""
        
        # Show answer preview
        Write-Host "ANSWER (Preview):" -ForegroundColor Cyan
        $previewLength = 600
        if ($response.answer.Length -gt $previewLength) {
            Write-Host $response.answer.Substring(0, $previewLength) -ForegroundColor White
            Write-Host "..." -ForegroundColor Gray
            Write-Host ""
            Write-Host "[Full answer is $($response.answer.Length) characters]" -ForegroundColor DarkGray
        } else {
            Write-Host $response.answer -ForegroundColor White
        }
        Write-Host ""
        
        # Show metadata
        Write-Host "📊 METADATA:" -ForegroundColor Cyan
        Write-Host "  Response Time: $($response.metadata.responseTime)ms" -ForegroundColor White
        Write-Host "  Chunks Retrieved: $($response.metadata.chunksRetrieved)" -ForegroundColor White
        Write-Host "  Is Unsafe: " -NoNewline
        if ($response.isUnsafe) {
            Write-Host "YES ⚠️" -ForegroundColor Yellow
            Write-Host "  Safety Flags: $($response.safetyFlags -join ', ')" -ForegroundColor Yellow
        } else {
            Write-Host "NO ✅" -ForegroundColor Green
        }
        Write-Host ""
        
        # Show sources
        if ($response.sources.Count -gt 0) {
            Write-Host "📚 SOURCES FOUND: $($response.sources.Count)" -ForegroundColor Cyan
            $sourceNum = 1
            $response.sources | ForEach-Object {
                Write-Host "  $sourceNum. $($_.title)" -ForegroundColor Gray
                if ($_.source) {
                    Write-Host "     Source: $($_.source)" -ForegroundColor DarkGray
                }
                $sourceNum++
            }
        }
        
    } catch {
        Write-Host "❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host "Response: $responseBody" -ForegroundColor Yellow
        }
    }
    
    $queryNumber++
    
    if ($queryNumber -le $demoQueries.Count) {
        Write-Host ""
        Write-Host "Press any key to continue to next demo..." -ForegroundColor DarkGray
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
}

Write-Host ""
Write-Host ("=" * 80) -ForegroundColor Green
Write-Host "✅ DEMONSTRATION COMPLETE!" -ForegroundColor Green
Write-Host ("=" * 80) -ForegroundColor Green
Write-Host ""
Write-Host "System Features Demonstrated:" -ForegroundColor Cyan
Write-Host "  ✅ Local embeddings (no OpenAI API needed)" -ForegroundColor White
Write-Host "  ✅ Semantic search from 50 asanas + web articles" -ForegroundColor White
Write-Host "  ✅ Safety filtering for sensitive queries" -ForegroundColor White
Write-Host "  ✅ Fast response times (< 100ms)" -ForegroundColor White
Write-Host "  ✅ Source attribution" -ForegroundColor White
Write-Host ""
Write-Host "To test more queries, run:" -ForegroundColor Yellow
Write-Host "  .\test_query.ps1" -ForegroundColor White
Write-Host ""
Write-Host "Or use the frontend UI at: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
