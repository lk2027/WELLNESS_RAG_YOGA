# Installing Python 3.11 for ChromaDB

## Step 1: Download Python 3.11

1. **Download Python 3.11**:
   - Go to: https://www.python.org/downloads/release/python-3119/
   - Scroll down to "Files" section
   - Download: **Windows installer (64-bit)** (e.g., `python-3.11.9-amd64.exe`)

2. **Install Python 3.11**:
   - Run the installer
   - ✅ **IMPORTANT**: Check "Add Python 3.11 to PATH" checkbox
   - Click "Install Now"
   - Wait for installation to complete

## Step 2: Verify Python 3.11 Installation

Open PowerShell and run:
```powershell
py -3.11 --version
```

You should see: `Python 3.11.x`

## Step 3: Create Virtual Environment (Automated)

Once Python 3.11 is installed, run the script I've created:

**Option A: Use the batch script (Windows)**
```powershell
.\setup_chroma_venv.bat
```

**Option B: Manual setup**
```powershell
# Navigate to project folder
cd c:\Users\Lenovo\Desktop\YOGARAG

# Create virtual environment with Python 3.11
py -3.11 -m venv chroma_venv

# Activate virtual environment
.\chroma_venv\Scripts\Activate.ps1

# Upgrade pip
python -m pip install --upgrade pip

# Install ChromaDB
pip install chromadb

# Verify installation
python -c "import chromadb; print('ChromaDB installed successfully!')"
```

## Step 4: Start Chroma DB Server

Once ChromaDB is installed in the virtual environment:

```powershell
# Activate the virtual environment (if not already activated)
.\chroma_venv\Scripts\Activate.ps1

# Start Chroma DB server
chroma run --path ./chroma_db --port 8000
```

Keep this terminal window open - Chroma DB needs to keep running.

## Step 5: Use Chroma DB

In a **new terminal window**:
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm run index
npm start
```

## Quick Reference

**To activate virtual environment:**
```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG
.\chroma_venv\Scripts\Activate.ps1
```

**To start Chroma DB:**
```powershell
chroma run --path ./chroma_db --port 8000
```

**To deactivate virtual environment:**
```powershell
deactivate
```
