# Quick Setup Guide

## Prerequisites Checklist

- [ ] Node.js v18+ installed
- [ ] MongoDB installed and running (or MongoDB Atlas account)
- [ ] OpenAI API key
- [ ] Docker installed (for Chroma DB) OR Python with chromadb installed

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend  
cd ../frontend
npm install
```

### 2. Create Environment File

Create `backend/.env` file with:

```env
MONGODB_URI=mongodb://localhost:27017/yoga_rag
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
NODE_ENV=development
CHROMA_HOST=http://localhost:8000
CHROMA_COLLECTION_NAME=yoga_knowledge_base
```

**Important:** Replace `your_openai_api_key_here` with your actual OpenAI API key.

### 3. Start MongoDB

**Windows:**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# OR
brew services start mongodb-community
```

**MongoDB Atlas (Cloud):**
- Update `MONGODB_URI` in `.env` with your Atlas connection string

### 4. Start Chroma DB

**Option A: Docker (Recommended)**
```bash
docker pull chromadb/chroma
docker run -d -p 8000:8000 --name chroma chromadb/chroma
```

**Option B: Python**
```bash
pip install chromadb
chroma run --path ./chroma_db --port 8000
```

Verify Chroma is running:
```bash
curl http://localhost:8000/api/v1/heartbeat
```

### 5. Index Knowledge Base

```bash
cd backend
npm run index
```

This will process all 30+ yoga articles and create embeddings. Wait for completion.

### 6. Start Backend

```bash
cd backend
npm start
# OR for development:
npm run dev
```

Server should start on `http://localhost:3001`

### 7. Start Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

Frontend should start on `http://localhost:3000`

### 8. Open Application

Navigate to: `http://localhost:3000`

## Testing

Try these queries:

1. **Safe query:** "What are the benefits of Shavasana?"
2. **Unsafe query:** "I am pregnant, what yoga poses should I do?"
3. **Unsafe query:** "I have a hernia, can I do yoga?"

## Troubleshooting

### Chroma Connection Failed
- Check if Chroma is running: `curl http://localhost:8000/api/v1/heartbeat`
- Check Docker container: `docker ps`

### MongoDB Connection Failed  
- Check if MongoDB is running: `mongosh` or check service status
- Verify connection string in `.env`

### OpenAI API Errors
- Verify API key is correct
- Check you have credits available
- Check rate limits

### Vector Store Empty
- Make sure you ran `npm run index` in the backend directory
- Check Chroma logs for errors
- Verify OpenAI API key is working

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Explore the RAG pipeline architecture
- Review safety filtering logic
- Check MongoDB for logged queries
