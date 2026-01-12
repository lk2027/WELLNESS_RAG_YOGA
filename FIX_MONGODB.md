# Fix MongoDB Atlas Connection

## Problem
MongoDB Atlas is rejecting the connection because your IP address is not whitelisted.

## Solution: Whitelist Your IP in MongoDB Atlas

### Step 1: Get Your Current IP Address

**Option A: Using PowerShell**
```powershell
(Invoke-WebRequest -Uri "https://api.ipify.org").Content
```

**Option B: Using Browser**
- Go to: https://www.whatismyip.com/
- Copy your IP address

### Step 2: Add IP to MongoDB Atlas Whitelist

1. **Go to MongoDB Atlas:**
   - https://cloud.mongodb.com/
   - Log in to your account

2. **Navigate to Network Access:**
   - Click on your cluster
   - Go to "Network Access" (or "Security" → "Network Access")

3. **Add IP Address:**
   - Click "Add IP Address"
   - Click "Add Current IP Address" (easiest)
   - OR enter your IP manually
   - Click "Confirm"

4. **Wait 1-2 minutes** for changes to take effect

### Step 3: Alternative - Allow All IPs (Less Secure, but Works)

If you want to allow all IPs (for testing only):

1. In MongoDB Atlas Network Access
2. Click "Add IP Address"
3. Enter: `0.0.0.0/0`
4. Click "Confirm"

⚠️ **Warning:** This allows access from anywhere. Only use for testing!

### Step 4: Restart Backend Server

After whitelisting your IP:

```powershell
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm start
```

You should now see:
```
✅ Connected to MongoDB
🚀 Server running on port 3001
```

---

**Quick Fix:** Add `0.0.0.0/0` to MongoDB Atlas Network Access whitelist (for testing).
