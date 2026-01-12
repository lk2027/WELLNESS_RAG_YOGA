# 🎯 How to Demonstrate the Yoga RAG System in PowerShell/CMD

## Quick Demo Steps

### Option A: Use Web UI in Chrome (Recommended - Easiest!)

**Start everything and open Chrome automatically:**

```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\START_ALL.ps1
```

This will:
- ✅ Start Chroma DB in Window 1
- ✅ Start Backend in Window 2  
- ✅ Start Frontend in Window 3
- ✅ Open Chrome automatically at http://localhost:3000

**Or start frontend manually:**

```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\start_frontend.ps1
```

**Or if frontend is already running, just open Chrome:**

```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\open_chrome.ps1
```

**Then in Chrome:**
1. Type your question: "What are the benefits of yoga?"
2. Click "🧘 Ask" button
3. See the answer with sources!

---

### Option B: Command Line Testing (PowerShell/CMD)

### Step 1: Start Chroma DB (Vector Store)

**Open PowerShell Window #1:**

```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\chroma_venv\Scripts\Activate.ps1
chroma run --path ./chroma_db --port 8000
```

**Wait until you see:** `Chroma is running on http://localhost:8000`

**⚠️ Keep this window open!**

---

### Step 2: Start Backend Server

**Open PowerShell Window #2 (NEW WINDOW):**

```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm start
```

**Wait until you see:**
```
✅ Connected to MongoDB
🚀 Server running on port 3001
```

**⚠️ Keep this window open!**

---

### Step 3: Test Queries in PowerShell

**Open PowerShell Window #3 (NEW WINDOW):**

#### Option A: Use the Test Script (Easiest)

```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\test_query.ps1
```

#### Option B: Test Manually (Single Query)

```powershell
$body = @{query='What are the benefits of yoga?'} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json'
```

#### Option C: Test Multiple Queries (Interactive Demo)

Copy and paste this entire block:

```powershell
# Demo Script - Multiple Queries
Write-Host "`n🧘 YOGA RAG SYSTEM DEMONSTRATION 🧘`n" -ForegroundColor Cyan
Write-Host "=" * 80 -ForegroundColor Green

$queries = @(
    "What are the benefits of yoga?",
    "How do I practice Tree Pose?",
    "What are beginner standing poses?",
    "I am pregnant, what poses should I avoid?"
)

foreach ($q in $queries) {
    Write-Host "`n" -NoNewline
    Write-Host ("=" * 80) -ForegroundColor Yellow
    Write-Host "QUERY: $q" -ForegroundColor White
    Write-Host ("=" * 80) -ForegroundColor Yellow
    
    $body = @{query=$q} | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json'
        
        Write-Host "`n✅ ANSWER:" -ForegroundColor Green
        Write-Host $response.answer.Substring(0, [Math]::Min(500, $response.answer.Length)) -ForegroundColor Gray
        Write-Host "..." -ForegroundColor DarkGray
        
        Write-Host "`n📊 METADATA:" -ForegroundColor Cyan
        Write-Host "  Response Time: $($response.metadata.responseTime)ms" -ForegroundColor White
        Write-Host "  Sources: $($response.sources.Count)" -ForegroundColor White
        Write-Host "  Unsafe: $($response.isUnsafe)" -ForegroundColor $(if($response.isUnsafe){"Yellow"}else{"Green"})
        
        if ($response.sources.Count -gt 0) {
            Write-Host "`n📚 SOURCES:" -ForegroundColor Cyan
            $response.sources | ForEach-Object {
                Write-Host "  • $($_.title)" -ForegroundColor Gray
            }
        }
        
    } catch {
        Write-Host "❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
    Start-Sleep -Seconds 2
}

Write-Host ("=" * 80) -ForegroundColor Green
Write-Host "✅ DEMONSTRATION COMPLETE!" -ForegroundColor Green
Write-Host ("=" * 80) -ForegroundColor Green
```

---

## Using CMD (Command Prompt) Instead

If you prefer CMD, use `curl` or PowerShell commands:

### In CMD:

```cmd
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm start
```

### Test Query in CMD (using PowerShell):

```cmd
powershell -Command "$body = @{query='What are the benefits of yoga?'} | ConvertTo-Json; Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json'"
```

---

## Visual Demo Flow

```
┌─────────────────────────────────────────────────────────┐
│  WINDOW 1: Chroma DB Server                            │
│  ─────────────────────────────────────────────────────  │
│  $ .\chroma_venv\Scripts\Activate.ps1                  │
│  $ chroma run --path ./chroma_db --port 8000            │
│                                                         │
│  ✅ Chroma is running on http://localhost:8000          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  WINDOW 2: Backend Server                               │
│  ─────────────────────────────────────────────────────  │
│  $ cd backend                                           │
│  $ npm start                                            │
│                                                         │
│  ✅ Connected to MongoDB                                │
│  🚀 Server running on port 3001                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  WINDOW 3: Testing Queries                             │
│  ─────────────────────────────────────────────────────  │
│  $ cd c:\Users\Lenovo\Desktop\YOGARAG                   │
│  $ .\test_query.ps1                                     │
│                                                         │
│  ✅ SUCCESS! QUERY WORKED!                              │
│  Answer: Based on the information...                    │
│  Sources: 5                                             │
│  Response Time: 45ms                                    │
└─────────────────────────────────────────────────────────┘
```

---

## Sample Queries to Demonstrate

### 1. General Query
```powershell
$body = @{query='What are the benefits of yoga?'} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json'
```

### 2. Specific Asana
```powershell
$body = @{query='How do I practice Downward Dog?'} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json'
```

### 3. Beginner Poses
```powershell
$body = @{query='What are beginner standing poses?'} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json'
```

### 4. Safety Test (Shows Warning)
```powershell
$body = @{query='I am pregnant, what poses should I avoid?'} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json'
```

### 5. Benefits Query
```powershell
$body = @{query='What are the benefits of Warrior II?'} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json'
```

---

## Quick One-Liner Test

**Copy this single line into PowerShell:**

```powershell
$body = @{query='What are the benefits of yoga?'} | ConvertTo-Json; Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json' | ConvertTo-Json -Depth 10
```

This will show the full JSON response with answer, sources, and metadata.

---

## Troubleshooting

**If backend says "port already in use":**
```powershell
taskkill /F /IM node.exe
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm start
```

**If Chroma DB won't start:**
- Make sure virtual environment is activated
- Check Python 3.11 is installed
- Verify port 8000 is free

**If query fails:**
- Check Window 1 (Chroma DB) is running
- Check Window 2 (Backend) is running
- Verify MongoDB connection in backend logs

---

## Summary

**To demonstrate the system:**

1. **3 PowerShell windows needed:**
   - Window 1: Chroma DB server
   - Window 2: Backend server  
   - Window 3: Test queries

2. **Run test script:**
   ```powershell
   cd c:\Users\Lenovo\Desktop\YOGARAG
   .\test_query.ps1
   ```

3. **Or test manually:**
   ```powershell
   $body = @{query='Your question here'} | ConvertTo-Json
   Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json'
   ```

**That's it! The system will respond with detailed answers from your 50 asanas + web articles!** 🎉
