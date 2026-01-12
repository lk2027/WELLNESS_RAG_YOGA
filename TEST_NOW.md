# Test the System Now

## Quick Test Steps

### Step 1: Start Backend Server

Open a **new PowerShell terminal** and run:

```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm start
```

Wait until you see:
```
✅ Connected to MongoDB
🚀 Server running on port 3001
```

### Step 2: Test Query

**Option A: Using PowerShell (in another terminal)**
```powershell
$body = @{query='What are the benefits of yoga?'} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json' | ConvertTo-Json -Depth 10
```

**Option B: Using Browser/Postman**
- URL: `http://localhost:3001/api/ask`
- Method: POST
- Body (JSON):
```json
{
  "query": "What are the benefits of yoga?"
}
```

**Option C: Using Frontend UI**
- Open: `http://localhost:3000`
- Enter: "What are the benefits of yoga?"
- Click "Ask"

## Expected Result

✅ **No OpenAI errors**
✅ **Response with answer from scraped web content**
✅ **Sources listed with URLs**
✅ **Fast response (using local embeddings)**

## If You Still See OpenAI Errors

1. Make sure you stopped ALL Node processes first
2. Check the server logs - should NOT mention OpenAI
3. Verify the server started fresh (not from cache)

---

**The system is ready! Just start the backend server and test.**
