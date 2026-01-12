# How to Start the Yoga RAG System

## Quick Start Guide

### Step 1: Start Chroma DB (Vector Store)

**If Chroma DB is not running:**

Open PowerShell and run:
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\chroma_venv\Scripts\Activate.ps1
chroma run --path ./chroma_db --port 8000
```

**Keep this window open!** Chroma DB must keep running.

### Step 2: Start Backend Server

**Open a NEW PowerShell window** and run:

```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm start
```

**Wait until you see:**
```
✅ Connected to MongoDB
🚀 Server running on port 3001
```

**Keep this window open!** Backend server must keep running.

### Step 3: Start Frontend (Optional - for UI)

**Open ANOTHER PowerShell window** and run:

```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG\frontend
npm run dev
```

**Wait until you see:**
```
  Local:   http://localhost:3000/
```

### Step 4: Test the System

**Option A: Use the Frontend UI (Easiest)**
1. Open browser: `http://localhost:3000`
2. Type: "What are the benefits of yoga?"
3. Click: "🧘 Ask" button
4. See the answer with sources!

**Option B: Test via PowerShell**
Open a PowerShell window and run:
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\test_query.ps1
```

**Option C: Test Manually**
```powershell
$body = @{query='What are the benefits of yoga?'} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json'
```

## Summary: What Needs to Run

You need **3 terminal windows** (or 2 if skipping frontend):

1. **Terminal 1:** Chroma DB server
   ```powershell
   cd c:\Users\Lenovo\Desktop\YOGARAG
   .\chroma_venv\Scripts\Activate.ps1
   chroma run --path ./chroma_db --port 8000
   ```

2. **Terminal 2:** Backend server
   ```powershell
   cd c:\Users\Lenovo\Desktop\YOGARAG\backend
   npm start
   ```

3. **Terminal 3:** Frontend (optional)
   ```powershell
   cd c:\Users\Lenovo\Desktop\YOGARAG\frontend
   npm run dev
   ```

## Quick Commands Reference

**Start Chroma DB:**
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\chroma_venv\Scripts\Activate.ps1
chroma run --path ./chroma_db --port 8000
```

**Start Backend:**
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm start
```

**Start Frontend:**
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG\frontend
npm run dev
```

**Test Query:**
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\test_query.ps1
```

## Troubleshooting

**If backend won't start:**
- Check MongoDB is accessible
- Check Chroma DB is running on port 8000
- Check port 3001 is not already in use

**If you see OpenAI errors:**
- Make sure you restarted the backend after code changes
- Run: `taskkill /F /IM node.exe` then restart

**If Chroma DB won't start:**
- Make sure virtual environment is activated
- Check Python 3.11 is installed
- Verify port 8000 is not in use

---

**That's it! Follow the steps above to start everything.**
