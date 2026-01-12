# Quick Start Guide - Python 3.11 + ChromaDB Setup

## Prerequisites

- Python 3.11 installed (download from: https://www.python.org/downloads/release/python-3119/)
- Node.js already installed ✅
- MongoDB Atlas configured ✅
- OpenAI API key configured ✅

## Step-by-Step Setup

### Step 1: Install Python 3.11

1. Download Python 3.11.9: https://www.python.org/downloads/release/python-3119/
2. Run installer
3. **IMPORTANT**: Check ✅ "Add Python 3.11 to PATH"
4. Click "Install Now"
5. Wait for installation

### Step 2: Verify Python 3.11

Open PowerShell and run:
```powershell
py -3.11 --version
```

Should show: `Python 3.11.9`

### Step 3: Create Virtual Environment & Install ChromaDB

**Option A: Use Batch Script (Recommended)**
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\setup_chroma_venv.bat
```

**Option B: Use PowerShell Script**
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\setup_chroma_venv.ps1
```

**Option C: Manual Setup**
```powershell
# Create virtual environment
py -3.11 -m venv chroma_venv

# Activate virtual environment
.\chroma_venv\Scripts\Activate.ps1

# Upgrade pip
python -m pip install --upgrade pip

# Install ChromaDB
pip install chromadb
```

### Step 4: Start Chroma DB Server

**Option A: Use Batch Script**
```powershell
.\start_chroma_server.bat
```

**Option B: Manual Start**
```powershell
# Activate virtual environment
.\chroma_venv\Scripts\Activate.ps1

# Start Chroma DB
chroma run --path ./chroma_db --port 8000
```

**Keep this terminal open!** Chroma DB must keep running.

### Step 5: Index Knowledge Base (New Terminal)

Open a **new PowerShell terminal**:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm run index
```

Wait for indexing to complete (shows "🎉 Knowledge base indexing completed successfully!")

### Step 6: Start Backend Server

In the same terminal (after indexing):
```powershell
npm start
```

Server should start on `http://localhost:3001`

### Step 7: Start Frontend (New Terminal)

Open **another PowerShell terminal**:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
cd c:\Users\Lenovo\Desktop\YOGARAG\frontend
npm run dev
```

Frontend should start on `http://localhost:3000`

### Step 8: Open Application

Open your browser and go to:
```
http://localhost:3000
```

## Quick Commands Reference

**Activate Chroma Virtual Environment:**
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\chroma_venv\Scripts\Activate.ps1
```

**Start Chroma DB:**
```powershell
chroma run --path ./chroma_db --port 8000
```

**Verify Setup:**
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm run verify
```

**Deactivate Virtual Environment:**
```powershell
deactivate
```

## Troubleshooting

**Python 3.11 not found:**
- Make sure Python 3.11 is installed
- Check "Add Python 3.11 to PATH" during installation
- Restart PowerShell after installation

**ChromaDB installation fails:**
- Make sure you're using Python 3.11 (not 3.14)
- Try: `pip install --upgrade pip` first
- Check internet connection

**Chroma DB won't start:**
- Make sure virtual environment is activated
- Check if port 8000 is already in use
- Try: `chroma run --path ./chroma_db --port 8001` (and update .env)

---

**All setup files are in:** `c:\Users\Lenovo\Desktop\YOGARAG`
