# How to Test the Query System

## Step-by-Step Instructions

### Step 1: Make Sure Backend Server is Running

**Check if server is running:**
- Look for a PowerShell window showing: `🚀 Server running on port 3001`
- If not running, open a new PowerShell and run:
  ```powershell
  cd c:\Users\Lenovo\Desktop\YOGARAG\backend
  npm start
  ```

### Step 2: Test Query (Choose One Method)

#### Method A: Using PowerShell (Easiest)

Open a **new PowerShell window** and run:

```powershell
$body = @{query='What are the benefits of yoga?'} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json'
```

**Expected Output:**
- You should see a JSON response with `answer`, `sources`, etc.
- **NO OpenAI quota errors!**

#### Method B: Using Browser/Postman

1. Open Postman or use browser developer tools
2. **URL:** `http://localhost:3001/api/ask`
3. **Method:** POST
4. **Headers:** `Content-Type: application/json`
5. **Body (JSON):**
   ```json
   {
     "query": "What are the benefits of yoga?"
   }
   ```

#### Method C: Using Frontend UI (Best Experience)

1. **Make sure frontend is running:**
   ```powershell
   cd c:\Users\Lenovo\Desktop\YOGARAG\frontend
   npm run dev
   ```

2. **Open browser:** `http://localhost:3000`

3. **Enter query:** "What are the benefits of yoga?"

4. **Click:** "🧘 Ask" button

5. **See results:** Answer with sources displayed

### Step 3: Verify It's Working

**✅ Success Indicators:**
- Response comes back quickly
- Answer contains information from scraped web sources
- Sources are listed with titles
- **NO OpenAI quota/API errors**
- Response time shown (usually < 1000ms)

**❌ If you see OpenAI errors:**
- Backend server needs restart
- Run: `taskkill /F /IM node.exe` then restart

## Test Different Queries

Try these to verify different features:

1. **Basic Query:**
   ```
   What are the benefits of yoga?
   ```

2. **Safety Test (Should show warning):**
   ```
   I am pregnant, what yoga poses should I avoid?
   ```
   - Should show red safety warning

3. **Medical Condition Test:**
   ```
   I have glaucoma, can I do yoga?
   ```
   - Should show safety warning

4. **Specific Topic:**
   ```
   What are beginner yoga poses?
   ```

## Quick Test Script

Copy and paste this entire block into PowerShell:

```powershell
# Test Query Script
Write-Host "Testing Yoga RAG System..." -ForegroundColor Cyan
Write-Host ""

$body = @{query='What are the benefits of yoga?'} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json'
    
    Write-Host "✅ SUCCESS! System is working!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Answer Preview:" -ForegroundColor Yellow
    Write-Host $response.answer.Substring(0, [Math]::Min(300, $response.answer.Length)) -ForegroundColor White
    Write-Host ""
    Write-Host "Sources: $($response.sources.Count)" -ForegroundColor Cyan
    Write-Host "Response Time: $($response.metadata.responseTime)ms" -ForegroundColor Cyan
    Write-Host "Chunks Retrieved: $($response.metadata.chunksRetrieved)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure backend server is running on port 3001" -ForegroundColor Yellow
}
```

---

**That's it! Just run the test script above in PowerShell to verify everything works.**
