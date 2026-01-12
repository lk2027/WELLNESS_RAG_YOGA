import { ChromaClient } from 'chromadb';
import { embedQuery, embedDocuments } from './localEmbeddings.js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Chroma client
const chromaClient = new ChromaClient({
  path: process.env.CHROMA_HOST || 'http://localhost:8000'
});

const COLLECTION_NAME = process.env.CHROMA_COLLECTION_NAME || 'yoga_knowledge_base';

// Note: Using local embeddings (no OpenAI API needed)
// Embeddings are generated using Transformers.js locally

let collection = null;

/**
 * Get or create the collection
 */
export async function getCollection() {
  if (!collection) {
    try {
      // Try to get existing collection first
      try {
        collection = await chromaClient.getCollection({ name: COLLECTION_NAME });
        console.log(`✅ Using existing collection: ${COLLECTION_NAME}`);
      } catch (error) {
        // Collection doesn't exist, create it
        console.log(`📦 Creating new collection: ${COLLECTION_NAME}`);
        collection = await chromaClient.createCollection({
          name: COLLECTION_NAME,
          metadata: { description: 'Yoga knowledge base for RAG' }
        });
      }
    } catch (error) {
      console.error('❌ Error accessing Chroma collection:', error.message);
      console.error('Make sure Chroma DB is running on:', process.env.CHROMA_HOST || 'http://localhost:8000');
      throw new Error(`Chroma DB connection failed: ${error.message}`);
    }
  }
  return collection;
}

/**
 * Add documents to vector store
 * @param {Array} chunks - Array of {content, metadata} objects
 */
export async function addDocuments(chunks) {
  const coll = await getCollection();
  
  const documents = chunks.map(chunk => chunk.content);
  const metadatas = chunks.map(chunk => chunk.metadata);
  const ids = chunks.map((chunk, idx) => chunk.metadata.chunkId || `chunk_${idx}`);

  // Generate embeddings using local model
  const embeddings_result = await embedDocuments(documents);

  try {
    await coll.add({
      ids: ids,
      embeddings: embeddings_result,
      documents: documents,
      metadatas: metadatas
    });
    console.log(`✅ Added ${chunks.length} chunks to vector store`);
  } catch (error) {
    console.error('Error adding documents to Chroma:', error);
    throw error;
  }
}

/**
 * Search for similar chunks
 * @param {string} query - User query
 * @param {number} k - Number of results to return
 * @returns {Array} Array of relevant chunks with metadata
 */
export async function similaritySearch(query, k = 5) {
  const coll = await getCollection();
  
  try {
    // Generate query embedding using local model
    const queryEmbedding = await embedQuery(query);
    
    // Search in Chroma
    const results = await coll.query({
      queryEmbeddings: [queryEmbedding],
      nResults: k
    });

    // Format results - handle different response structures
    const chunks = [];
    
    // Chroma returns results in arrays
    if (results.documents && results.documents.length > 0 && results.documents[0]) {
      const documents = results.documents[0];
      const metadatas = results.metadatas && results.metadatas[0] ? results.metadatas[0] : [];
      const ids = results.ids && results.ids[0] ? results.ids[0] : [];
      const distances = results.distances && results.distances[0] ? results.distances[0] : [];

      for (let i = 0; i < documents.length; i++) {
        chunks.push({
          content: documents[i],
          metadata: metadatas[i] || {},
          chunkId: ids[i] || `chunk_${i}`,
          similarityScore: distances[i] !== undefined ? (1 - distances[i]) : null
        });
      }
    }

    if (chunks.length === 0) {
      console.warn('⚠️ No results found in vector store. Make sure the knowledge base is indexed.');
    }

    return chunks;
  } catch (error) {
    console.error('❌ Error searching vector store:', error.message);
    throw new Error(`Vector search failed: ${error.message}`);
  }
}

/**
 * Get collection stats
 */
export async function getCollectionStats() {
  const coll = await getCollection();
  const count = await coll.count();
  return { count, collectionName: COLLECTION_NAME };
}
