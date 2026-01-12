# Testing the Query System

## Current Status

✅ **Local embeddings implemented and working**
✅ **83 chunks indexed successfully**
⚠️ **Backend server needs restart** to use new local embeddings code

## How to Test

### Step 1: Restart Backend Server

The backend server is currently running with old code. Restart it:

```bash
# In the terminal where backend is running:
# Press Ctrl+C to stop it

# Then restart:
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm start
```

### Step 2: Test Query via API

**Option A: Using PowerShell**
```powershell
$body = @{query='What are the benefits of yoga?'} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/api/ask' -Method Post -Body $body -ContentType 'application/json' | ConvertTo-Json -Depth 10
```

**Option B: Using Browser/Postman**
- URL: `http://localhost:3001/api/ask`
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "query": "What are the benefits of yoga?"
}
```

**Option C: Using Frontend UI**
- Open: `http://localhost:3000`
- Enter query: "What are the benefits of yoga?"
- Click "Ask"

### Step 3: Test Different Queries

Try these test queries:

1. **Safe Query:**
   ```
   What are the benefits of yoga?
   ```

2. **Safety Test (Pregnancy):**
   ```
   I am pregnant, what yoga poses should I avoid?
   ```
   - Should show red safety warning

3. **Safety Test (Medical Condition):**
   ```
   I have glaucoma, can I do yoga?
   ```
   - Should show red safety warning

4. **Specific Pose Query:**
   ```
   What are beginner yoga poses?
   ```

5. **Hernia Query:**
   ```
   Can I do yoga if I have a hernia?
   ```
   - Should show safety warning

## Expected Response Format

```json
{
  "answer": "Based on the information available...",
  "sources": [
    {
      "title": "Article Title",
      "articleId": "web_...",
      "chunkId": "...",
      "url": "https://...",
      "source": "Source Name"
    }
  ],
  "isUnsafe": false,
  "safetyMessage": null,
  "safetyFlags": [],
  "queryId": "...",
  "metadata": {
    "responseTime": 123,
    "chunksRetrieved": 5
  }
}
```

## Troubleshooting

**If you get OpenAI quota error:**
- Backend server is still using old code
- Restart the backend server

**If query returns empty:**
- Check Chroma DB is running
- Verify indexing completed successfully
- Check backend logs for errors

**If embeddings fail:**
- Model should be cached now (first download is done)
- Check internet connection (needed only first time for model download)

---

**Once backend is restarted, the system will use local embeddings and work completely offline!**
