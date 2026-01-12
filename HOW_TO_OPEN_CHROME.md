# 🌐 How to Open the Frontend in Chrome

## Quick Method (Easiest!)

### Option 1: Start Everything + Open Chrome Automatically

```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\START_ALL.ps1
```

This script will:
1. Start Chroma DB (Window 1)
2. Start Backend (Window 2)
3. Start Frontend (Window 3)
4. **Automatically open Chrome** at http://localhost:3000

---

### Option 2: Start Frontend Only (if Chroma & Backend already running)

```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\start_frontend.ps1
```

This will:
- Start the frontend server
- Wait 3 seconds
- **Automatically open Chrome** at http://localhost:3000

---

### Option 3: Just Open Chrome (if frontend already running)

If the frontend is already running, just open Chrome:

```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\open_chrome.ps1
```

Or manually open Chrome and go to: **http://localhost:3000**

---

## Manual Method

### Step 1: Make sure Chroma DB and Backend are running

**Window 1 - Chroma DB:**
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\chroma_venv\Scripts\Activate.ps1
chroma run --path ./chroma_db --port 8000
```

**Window 2 - Backend:**
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm start
```

Wait for: `🚀 Server running on port 3001`

### Step 2: Start Frontend

**Window 3 - Frontend:**
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG\frontend
npm run dev
```

Wait for: `Local: http://localhost:3000/`

### Step 3: Open Chrome

**Option A - Use the script:**
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\open_chrome.ps1
```

**Option B - Manually:**
1. Open Google Chrome
2. Go to: `http://localhost:3000`
3. You should see the Yoga RAG interface!

---

## Using CMD Instead

**Double-click:** `start_frontend.bat`

Or run:
```cmd
cd c:\Users\Lenovo\Desktop\YOGARAG
start_frontend.bat
```

---

## Troubleshooting

### Chrome doesn't open automatically

**Solution:** Manually open Chrome and go to:
```
http://localhost:3000
```

### Frontend shows "Connection Error" or "Cannot connect"

**Check:**
1. ✅ Chroma DB is running (Window 1)
2. ✅ Backend is running (Window 2) - Check for `🚀 Server running on port 3001`
3. ✅ Frontend is running (Window 3) - Check for `Local: http://localhost:3000/`

**Fix:**
- Make sure all 3 services are running
- Restart backend if needed: `taskkill /F /IM node.exe` then `npm start`

### Port 3000 is already in use

**Solution:**
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /F /PID <PID>
```

Then restart frontend.

### Chrome path not found

The script tries multiple Chrome locations. If it fails:
1. Manually open Chrome
2. Go to: `http://localhost:3000`

---

## What You Should See in Chrome

When you open `http://localhost:3000`, you should see:

```
┌─────────────────────────────────────────┐
│  🧘 Ask Me Anything About Yoga         │
│                                         │
│  [Text input box]                      │
│                                         │
│  [🧘 Ask] button                       │
│                                         │
│  (Answer will appear here)              │
│  (Sources will appear here)             │
└─────────────────────────────────────────┘
```

**Try these queries:**
- "What are the benefits of yoga?"
- "How do I practice Tree Pose?"
- "What are beginner standing poses?"
- "I am pregnant, what poses should I avoid?" (shows safety warning)

---

## Quick Reference

**Start everything + open Chrome:**
```powershell
.\START_ALL.ps1
```

**Just open Chrome (if frontend running):**
```powershell
.\open_chrome.ps1
```

**Manual Chrome URL:**
```
http://localhost:3000
```

---

**That's it! The web UI is much easier to use than command line testing!** 🎉
