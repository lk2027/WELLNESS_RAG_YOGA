# Pre-Launch Checklist

Use this checklist to ensure everything is set up correctly before running the application.

## Environment Setup

- [ ] Node.js v18+ installed (`node --version`)
- [ ] MongoDB installed and running
  - [ ] Local MongoDB: Service running
  - [ ] OR MongoDB Atlas: Account created, cluster set up
- [ ] Docker installed (for Chroma DB)
  - [ ] OR Python with chromadb installed
- [ ] OpenAI API key obtained

## File Configuration

- [ ] `backend/.env` file created with:
  - [ ] `MONGODB_URI` set (local or Atlas connection string)
  - [ ] `OPENAI_API_KEY` set (your actual API key, not placeholder)
  - [ ] `CHROMA_HOST` set (default: http://localhost:8000)
  - [ ] `PORT` set (default: 3001)

## Dependencies Installation

- [ ] Backend dependencies installed
  ```bash
  cd backend
  npm install
  ```
- [ ] Frontend dependencies installed
  ```bash
  cd frontend
  npm install
  ```

## Services Running

- [ ] MongoDB service started
  - Windows: `net start MongoDB`
  - macOS/Linux: `sudo systemctl start mongod`
  - Atlas: Connection string verified
  
- [ ] Chroma DB running
  - Docker: `docker run -d -p 8000:8000 chromadb/chroma`
  - Python: `chroma run --path ./chroma_db --port 8000`
  - Verify: `curl http://localhost:8000/api/v1/heartbeat`

## Knowledge Base Setup

- [ ] Knowledge base indexed
  ```bash
  cd backend
  npm run index
  ```
- [ ] Indexing completed successfully (should show ~30 articles processed)
- [ ] No errors during indexing

## Verification

- [ ] Setup verification passed
  ```bash
  cd backend
  npm run verify
  ```
- [ ] All checks show ✅ (or resolve any ❌ items)

## Application Launch

- [ ] Backend server started
  ```bash
  cd backend
  npm start
  # Should see: "Server running on port 3001"
  # Should see: "Connected to MongoDB"
  ```

- [ ] Frontend server started (in separate terminal)
  ```bash
  cd frontend
  npm run dev
  # Should see: "Local: http://localhost:3000"
  ```

## Testing

- [ ] Application opens in browser (http://localhost:3000)
- [ ] UI loads correctly (gradient background, input form)
- [ ] Test safe query: "What are the benefits of Shavasana?"
  - [ ] Answer received
  - [ ] Sources displayed
  - [ ] No safety warning shown
- [ ] Test unsafe query: "I am pregnant, what poses should I avoid?"
  - [ ] Red safety warning displayed
  - [ ] Safety message shown
  - [ ] Answer includes consultation recommendation
- [ ] Feedback system works (thumbs up/down)
- [ ] Loading spinner appears during query processing

## MongoDB Verification

- [ ] Queries are being logged to MongoDB
  ```bash
  mongosh
  use yoga_rag
  db.queries.find().pretty()
  ```
- [ ] Query documents contain:
  - [ ] userQuery
  - [ ] aiAnswer
  - [ ] retrievedChunks
  - [ ] sources
  - [ ] isUnsafe flag (when applicable)
  - [ ] timestamps

## Troubleshooting

If any items above are unchecked:

1. **MongoDB connection failed:**
   - Check MongoDB service status
   - Verify connection string in .env
   - Check firewall/network settings

2. **Chroma connection failed:**
   - Verify Chroma is running: `curl http://localhost:8000/api/v1/heartbeat`
   - Check Docker container: `docker ps`
   - Verify CHROMA_HOST in .env

3. **OpenAI API errors:**
   - Verify API key is correct (starts with "sk-")
   - Check API credits/quota
   - Verify rate limits not exceeded

4. **Vector store empty:**
   - Re-run indexing: `npm run index`
   - Check Chroma logs for errors
   - Verify OpenAI API key works

5. **Frontend can't connect:**
   - Verify backend is running on port 3001
   - Check browser console for errors
   - Verify CORS configuration

## Ready to Go! 🚀

Once all items are checked, your Yoga RAG Micro-App is ready for:
- ✅ Demonstration
- ✅ Testing
- ✅ Further development
- ✅ Deployment (with production configurations)

---

**Need help?** Check README.md for detailed troubleshooting guide.
