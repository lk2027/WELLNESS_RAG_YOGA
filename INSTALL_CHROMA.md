# Installing and Starting Chroma DB

The Chroma DB installation takes 3-5 minutes. Here are the steps:

## Option 1: Use the Batch Script (Windows - Easiest)

1. Double-click `start_chroma.bat`
2. It will automatically:
   - Install ChromaDB if needed (takes 3-5 minutes)
   - Start the Chroma DB server
3. Keep the terminal window open

## Option 2: Manual Installation

Open PowerShell or Command Prompt and run:

```bash
# Step 1: Install ChromaDB (takes 3-5 minutes)
pip install chromadb

# Step 2: Start Chroma DB server
cd c:\Users\Lenovo\Desktop\YOGARAG
chroma run --path ./chroma_db --port 8000
```

Keep the terminal window open - the server needs to keep running.

## Verify Chroma DB is Running

Once the server starts, you should see output like:
```
Starting Chroma server...
Uvicorn running on http://0.0.0.0:8000
```

## Next Steps

After Chroma DB is running:

1. In a **new terminal**, navigate to the backend:
   ```bash
   cd c:\Users\Lenovo\Desktop\YOGARAG\backend
   ```

2. Index the knowledge base:
   ```bash
   npm run index
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

4. In **another terminal**, start the frontend:
   ```bash
   cd c:\Users\Lenovo\Desktop\YOGARAG\frontend
   npm run dev
   ```

## Troubleshooting

- If installation fails, try: `pip install --upgrade pip` first
- If port 8000 is already in use, stop other applications using it
- Make sure Python is in your PATH
