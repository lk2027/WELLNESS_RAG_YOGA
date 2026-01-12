# 🧘 Yoga RAG Micro-App: "Ask Me Anything About Yoga"

A full-stack AI micro-product that answers yoga & fitness related queries using a RAG (Retrieval-Augmented Generation) pipeline. This application combines advanced retrieval techniques with safety filtering to provide accurate, context-aware, and safe yoga recommendations.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [RAG Pipeline](#rag-pipeline)
- [Safety Logic](#safety-logic)
- [Data Models](#data-models)
- [API Endpoints](#api-endpoints)
- [Architecture Decisions](#architecture-decisions)
- [AI Tools & Prompts Used](#ai-tools--prompts-used)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## 🎯 Overview

This Wellness RAG Micro-App is designed to answer yoga-related queries with:
- **Context-aware responses** using RAG (Retrieval-Augmented Generation)
- **Safety-first approach** with automated detection of risky queries
- **Comprehensive knowledge base** with 30+ yoga articles
- **Clean, intuitive UI** showing sources, safety warnings, and feedback
- **Complete data logging** in MongoDB for analysis

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **CSS3** - Styled components with animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Document database for query logging
- **Mongoose** - MongoDB object modeling

### Vector Store & AI
- **Chroma** - Vector database for embeddings
- **OpenAI API** - For embeddings (`text-embedding-3-small`) and chat completion (`gpt-3.5-turbo`)
- **LangChain** - LLM framework (for embeddings)

### Development Tools
- **dotenv** - Environment variable management
- **nodemon** - Development server auto-reload
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
YOGARAG/
├── backend/
│   ├── data/
│   │   └── yogaArticles.js          # 30+ yoga knowledge base articles
│   ├── models/
│   │   └── Query.js                 # MongoDB schema for queries
│   ├── routes/
│   │   ├── ask.js                   # POST /api/ask endpoint
│   │   └── feedback.js              # POST /api/feedback endpoint
│   ├── services/
│   │   ├── ragService.js            # Core RAG pipeline logic
│   │   ├── safetyFilter.js          # Safety detection and warnings
│   │   └── vectorStore.js           # Chroma vector store operations
│   ├── scripts/
│   │   ├── chunkText.js             # Text chunking utility
│   │   └── indexKnowledgeBase.js    # Script to index articles
│   ├── server.js                    # Express server entry point
│   ├── package.json
│   └── .env                         # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── QueryInput.jsx       # Query input component
│   │   │   ├── ResponseDisplay.jsx  # Response display with sources
│   │   │   └── LoadingSpinner.jsx   # Loading indicator
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## ✨ Features

### Core Features

1. **Query Input Section**
   - Clean text area for yoga queries
   - Real-time validation
   - Submit button with loading states

2. **RAG-Powered Responses**
   - Context-aware answers based on knowledge base
   - Retrieval of relevant chunks from vector store
   - Proper prompt construction with retrieved context

3. **Sources Display**
   - Lists all retrieved sources used
   - Shows article titles and IDs
   - Clear source attribution

4. **Safety Filtering (Mandatory)**
   - Automatic detection of unsafe queries:
     - Pregnancy-related queries
     - Medical conditions (hernia, glaucoma, high blood pressure, recent surgery, etc.)
   - Red warning blocks in UI for unsafe queries
   - Gentle safety messages
   - Recommendations for safe alternatives
   - Professional consultation reminders

5. **Feedback System**
   - Thumbs up/down feedback
   - Stored in MongoDB
   - Statistics endpoint available

6. **Data Logging**
   - All queries logged to MongoDB
   - Retrieved chunks stored
   - AI answers saved
   - Safety flags recorded
   - Timestamps tracked
   - Response time metrics

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- OpenAI API key
- Chroma DB (local installation)

### Step 1: Clone and Navigate

```bash
cd YOGARAG
```

### Step 2: Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### Step 3: Set Up MongoDB

**Option A: Local MongoDB**
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

**Option B: MongoDB Atlas**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Update `MONGODB_URI` in `.env` file

### Step 4: Set Up Chroma DB

**Option A: Using Docker (Recommended)**

```bash
docker pull chromadb/chroma
docker run -p 8000:8000 chromadb/chroma
```

**Option B: Using Python (Alternative)**

```bash
pip install chromadb
chroma run --path ./chroma_db --port 8000
```

### Step 5: Configure Environment Variables

#### Backend `.env` File

Create `backend/.env`:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/yoga_rag
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/yoga_rag

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=development

# Chroma DB (Vector Store) Configuration
CHROMA_HOST=http://localhost:8000
CHROMA_COLLECTION_NAME=yoga_knowledge_base
```

#### Frontend `.env` (Optional)

Create `frontend/.env` if you need to customize:

```env
VITE_API_URL=http://localhost:3001
```

### Step 6: Index Knowledge Base

Before running the app, index the yoga articles into the vector store:

```bash
cd backend
npm run index
```

This will:
- Load all 30+ yoga articles
- Split them into chunks (1000 chars with 200 char overlap)
- Generate embeddings using OpenAI
- Store in Chroma vector database

Expected output:
```
🚀 Starting knowledge base indexing...
📚 Processing 30 articles...
  ✅ Processed "Introduction to Yoga: What is Yoga?": 2 chunks
  ...
🎉 Knowledge base indexing completed successfully!
```

### Step 7: Start the Application

#### Terminal 1: Backend Server

```bash
cd backend
npm start
# Or for development with auto-reload:
npm run dev
```

Server should start on `http://localhost:3001`

#### Terminal 2: Frontend Server

```bash
cd frontend
npm run dev
```

Frontend should start on `http://localhost:3000`

### Step 8: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 🔄 RAG Pipeline

### Architecture Overview

```
User Query
    ↓
[Safety Filter] → Check for unsafe keywords
    ↓
[Vector Store] → Similarity search (k=5 chunks)
    ↓
[Context Building] → Combine retrieved chunks
    ↓
[LLM Prompt] → System prompt + context + user query
    ↓
[OpenAI GPT-3.5] → Generate answer
    ↓
[Response Processing] → Add safety messages if needed
    ↓
[MongoDB] → Log query, chunks, answer, safety flags
    ↓
[Frontend] → Display answer with sources
```

### Chunking Strategy

- **Chunk Size**: 1000 characters
- **Overlap**: 200 characters
- **Method**: Recursive character splitting with sentence boundary awareness
- **Rationale**: 
  - 1000 chars provides sufficient context for meaningful chunks
  - 200 char overlap ensures context continuity between chunks
  - Sentence boundary awareness prevents mid-sentence splits

### Embedding Model

- **Model**: `text-embedding-3-small` (OpenAI)
- **Dimensions**: 1536
- **Rationale**: 
  - Cost-effective for large knowledge base
  - Good performance for semantic search
  - Fast inference

### Retrieval Strategy

- **Similarity Search**: Cosine similarity in Chroma
- **Top-K**: 5 chunks
- **Rationale**: 
  - 5 chunks provide comprehensive context without overwhelming the LLM
  - Balances relevance and diversity

### Prompt Construction

```javascript
System Prompt:
You are a helpful yoga instructor AI assistant.
Answer based ONLY on provided context.
Guidelines:
- Be accurate and encouraging
- Reference sources when appropriate
- Prioritize safety

Context from Knowledge Base:
[Retrieved chunks with source attribution]

[If unsafe]: IMPORTANT: Query flagged as unsafe. 
Do NOT provide specific pose instructions. 
Recommend consulting a professional.

User Query: [user question]
```

### LLM Configuration

- **Model**: `gpt-3.5-turbo`
- **Temperature**: 0.7
- **Max Tokens**: 500
- **Rationale**:
  - GPT-3.5-turbo balances cost and quality
  - Temperature 0.7 allows creative but controlled responses
  - 500 tokens sufficient for comprehensive answers

## 🛡 Safety Logic

### Detection Mechanism

The safety filter uses keyword-based heuristics to detect potentially unsafe queries:

#### Pregnancy Keywords
- "pregnant", "pregnancy", "first trimester", "second trimester", "third trimester", "expecting", "expectant mother", "prenatal"

#### Medical Condition Keywords
- "hernia", "glaucoma", "high blood pressure", "hypertension", "low blood pressure", "hypotension"
- "recent surgery", "surgery", "injury", "back pain", "neck pain"
- "disc herniation", "osteoporosis", "arthritis", "heart condition", "cardiac"
- "epilepsy", "diabetes", "asthma", "eye pressure", "retinal", "detached retina"
- "blood clot", "thrombosis"

### Behavior When Unsafe

1. **Detection**: Query is flagged with `isUnsafe = true`
2. **MongoDB Logging**: Safety flags stored with query
3. **Response Generation**:
   - Safety message prepended to answer
   - Modified system prompt warns LLM not to provide unsafe instructions
   - Recommendations for safe alternatives provided
   - Professional consultation reminder included
4. **UI Display**: Red warning block shown with safety message

### Safety Messages by Category

**Pregnancy:**
"Your question touches on an area that can be risky without personalized guidance. Prenatal yoga requires special modifications and should be practiced under expert supervision. Instead of advanced poses or inversions, consider gentle supine poses, modified standing poses, and breathing work (pranayama) designed specifically for pregnancy. Please consult a doctor or certified yoga therapist before attempting these poses."

**Medical Conditions:**
Condition-specific guidance is provided based on the detected condition. General message emphasizes consulting healthcare providers.

### Limitations

- Currently uses keyword-based detection (can be improved with ML-based classification)
- May have false positives/negatives
- Should be used as a supplement to, not replacement for, professional medical advice

## 📊 Data Models

### MongoDB Schema: Query

```javascript
{
  userQuery: String (required, indexed),
  retrievedChunks: [{
    content: String,
    source: String,
    title: String,
    chunkId: String,
    similarityScore: Number
  }],
  aiAnswer: String (required),
  sources: [{
    title: String,
    articleId: String,
    chunkId: String
  }],
  isUnsafe: Boolean (default: false, indexed),
  safetyFlags: [String],
  safetyMessage: String,
  feedback: {
    helpful: Boolean,
    comment: String,
    createdAt: Date
  },
  metadata: {
    responseTime: Number (ms),
    chunksRetrieved: Number
  },
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Vector Store Schema (Chroma)

```javascript
{
  id: String (chunkId),
  embedding: Array[1536] (float32),
  document: String (chunk content),
  metadata: {
    articleId: String,
    title: String,
    category: String,
    chunkIndex: Number
  }
}
```

## 🔌 API Endpoints

### POST /api/ask

Ask a yoga-related question.

**Request Body:**
```json
{
  "query": "What are the benefits of Shavasana?"
}
```

**Response:**
```json
{
  "answer": "Shavasana, or Corpse Pose, is often considered...",
  "sources": [
    {
      "title": "Shavasana (Corpse Pose): The Most Important Pose",
      "articleId": "article_003",
      "chunkId": "article_003_chunk_0"
    }
  ],
  "isUnsafe": false,
  "safetyMessage": null,
  "safetyFlags": [],
  "queryId": "507f1f77bcf86cd799439011",
  "metadata": {
    "responseTime": 1234,
    "chunksRetrieved": 5
  }
}
```

**Unsafe Query Response:**
```json
{
  "answer": "[Safety message]...",
  "isUnsafe": true,
  "safetyMessage": "Your question touches on...",
  "safetyFlags": ["pregnancy"],
  ...
}
```

### POST /api/feedback

Submit feedback for a query response.

**Request Body:**
```json
{
  "queryId": "507f1f77bcf86cd799439011",
  "helpful": true,
  "comment": "Very helpful answer!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Feedback saved successfully",
  "feedback": {
    "helpful": true,
    "comment": "Very helpful answer!",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET /api/feedback/stats

Get feedback statistics.

**Response:**
```json
{
  "total": 150,
  "helpful": 120,
  "notHelpful": 30,
  "helpfulPercentage": "80.00"
}
```

## 🏗 Architecture Decisions

### Why Node.js + Express?

- **Alignment with Requirements**: Specified as preferred backend technology
- **Fast Development**: Quick API setup and development
- **Ecosystem**: Rich npm ecosystem for AI/ML libraries
- **Scalability**: Can handle concurrent requests efficiently

### Why Chroma for Vector Store?

- **Node.js Support**: Good JavaScript/Node.js client library
- **Ease of Setup**: Simple Docker deployment
- **Performance**: Fast similarity search
- **Flexibility**: Easy to switch collections or add metadata filtering

### Why OpenAI Embeddings?

- **Quality**: High-quality semantic embeddings
- **Consistency**: Same provider for embeddings and chat (cost-effective)
- **Proven**: Widely used in production RAG systems
- **Cost**: `text-embedding-3-small` is cost-effective

### Why GPT-3.5-turbo for Chat?

- **Cost-Effective**: Lower cost than GPT-4
- **Performance**: Good enough for RAG tasks with proper context
- **Speed**: Faster response times
- **Scalability**: Can handle high request volumes

### Why MongoDB for Logging?

- **Flexibility**: Schema-less design for evolving data models
- **JSON-Like**: Natural fit for Node.js
- **Querying**: Easy to query and analyze logged data
- **Scalability**: Horizontal scaling capabilities

### Chunking Strategy Rationale

- **1000 chars**: Balance between context and token limits
- **200 overlap**: Maintains context continuity
- **Sentence awareness**: Better semantic coherence

## 🤖 AI Tools & Prompts Used

This project was developed with assistance from AI coding tools. Below is a comprehensive list of prompts and AI-assisted tasks:

### Development Prompts

1. **Project Setup**
   - "Create a full-stack RAG application structure with Node.js backend and React frontend"
   - "Set up Express server with MongoDB connection and CORS configuration"

2. **RAG Implementation**
   - "Implement RAG pipeline with chunking, embeddings, and vector store retrieval"
   - "Create similarity search function using Chroma vector database"
   - "Build context construction from retrieved chunks for LLM prompts"

3. **Safety Filtering**
   - "Implement keyword-based safety filter for detecting pregnancy and medical conditions in queries"
   - "Create safety message generator that provides appropriate warnings and recommendations"
   - "Add safety flag detection for hernia, glaucoma, blood pressure, and surgery-related queries"

4. **Frontend Development**
   - "Create React components for query input with textarea and submit button"
   - "Build response display component showing AI answer, sources, and safety warnings"
   - "Add loading spinner with fade-in animations for better UX"
   - "Implement feedback component with thumbs up/down buttons"

5. **Knowledge Base**
   - "Generate 30+ comprehensive yoga articles covering poses, benefits, contraindications, pranayama, and safety"
   - "Create articles on Shavasana, Downward Dog, Warrior poses, Triangle pose, and safety considerations"
   - "Include articles on pregnancy yoga, hernia precautions, glaucoma considerations, and high blood pressure modifications"

6. **MongoDB Schema**
   - "Design MongoDB schema for storing queries, retrieved chunks, AI answers, safety flags, and feedback"
   - "Create Mongoose model with proper indexing for query performance"

7. **API Design**
   - "Create RESTful API endpoints for /ask and /feedback with proper error handling"
   - "Implement response formatting with sources, metadata, and safety information"

8. **Styling & UX**
   - "Create modern, clean UI with gradient background and card-based layouts"
   - "Add fade-in animations for response display and smooth transitions"
   - "Design safety warning component with red gradient and clear messaging"

9. **Documentation**
   - "Write comprehensive README with setup instructions, architecture explanation, and API documentation"
   - "Document RAG pipeline flow, chunking strategy, and safety logic rationale"

### Tools Used

- **Cursor AI** - Primary coding assistant for file generation, code refactoring, and architecture decisions
- **OpenAI GPT Models** - Used for generating yoga knowledge base articles and content
- **GitHub Copilot** (if applicable) - Assisted with code completion and suggestions

### Note on Evaluation

All prompts and AI assistance were used to accelerate development while maintaining code quality and following best practices. The final implementation includes:
- Complete RAG pipeline with proper chunking and retrieval
- Comprehensive safety filtering system
- Full-stack application with React frontend and Node.js backend
- MongoDB data logging and analysis capabilities
- Production-ready code structure and error handling

## 🐛 Troubleshooting

### Issue: MongoDB Connection Failed

**Solution:**
- Check if MongoDB is running: `mongosh` or check service status
- Verify `MONGODB_URI` in `.env` file
- For Atlas, ensure IP is whitelisted and credentials are correct

### Issue: Chroma Connection Error

**Solution:**
- Ensure Chroma is running: `curl http://localhost:8000/api/v1/heartbeat`
- Check `CHROMA_HOST` in `.env`
- Restart Chroma: `docker restart <container_id>`

### Issue: OpenAI API Errors

**Solution:**
- Verify `OPENAI_API_KEY` is set correctly
- Check API key has sufficient credits
- Verify rate limits haven't been exceeded

### Issue: Vector Store Empty

**Solution:**
- Run indexing script: `cd backend && npm run index`
- Check Chroma collection exists: Verify in Chroma UI or via API
- Ensure articles are loaded correctly

### Issue: Frontend Can't Connect to Backend

**Solution:**
- Verify backend is running on port 3001
- Check CORS configuration in `server.js`
- Verify Vite proxy configuration in `vite.config.js`
- Check browser console for CORS errors

### Issue: Safety Filter Not Working

**Solution:**
- Check `safetyFilter.js` keywords are correct
- Verify query is being processed through safety check
- Test with known unsafe queries (e.g., "I am pregnant")

## 📝 Knowledge Base Sources

The yoga knowledge base articles are compiled from:
- Public yoga resources and established yoga teaching principles
- Yoga philosophy texts (Patanjali's Yoga Sutras)
- Common yoga pose instructions and safety guidelines
- Medical and therapeutic yoga considerations

**Note**: All content has been rewritten and adapted for this project. Sources should be cited appropriately in production use. The knowledge base is for educational/demonstration purposes.

## 🚧 Future Improvements

- [ ] Implement ML-based safety classification (beyond keyword matching)
- [ ] Add more sophisticated chunking (semantic chunking)
- [ ] Implement reranking for retrieved chunks
- [ ] Add user authentication and query history
- [ ] Implement feedback-based learning for retrieval improvement
- [ ] Add multi-modal support (images for poses)
- [ ] Implement conversation history and follow-up questions
- [ ] Add admin dashboard for knowledge base management
- [ ] Implement caching for frequently asked questions
- [ ] Add support for multiple languages

## 📄 License

This project is created for educational/demonstration purposes as part of a course assignment.

## 👥 Authors

Developed as part of Track B - Wellness RAG Micro-App challenge.

---

**Built with ❤️ using React, Node.js, MongoDB, Chroma, and OpenAI**
