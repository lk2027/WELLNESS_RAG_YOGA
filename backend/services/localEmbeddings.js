/**
 * Local Embeddings Service using Transformers.js
 * No OpenAI API needed - runs models locally
 */

import { pipeline } from '@xenova/transformers';

// Use a lightweight embedding model
const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2'; // 384 dimensions, good quality
// Alternative options:
// - 'Xenova/all-mpnet-base-v2' (768 dims, better quality, larger)
// - 'Xenova/multilingual-e5-small' (multilingual)

let embedder = null;

/**
 * Initialize the embedding model (lazy loading)
 */
async function getEmbedder() {
  if (!embedder) {
    console.log('🔄 Loading local embedding model... (this may take a moment)');
    console.log(`📦 Model: ${MODEL_NAME}`);
    console.log('   Downloading model files... (first time only, ~90MB)');
    
    try {
      // Load the feature extraction pipeline
      embedder = await pipeline(
        'feature-extraction',
        MODEL_NAME,
        {
          quantized: true, // Use quantized model for faster loading
          progress_callback: (progress) => {
            // Only show progress for downloads, not loading
            if (progress.status === 'downloading') {
              const percent = progress.progress ? Math.round((progress.progress / progress.total) * 100) : 0;
              if (percent > 0) {
                process.stdout.write(`\r   Downloading: ${percent}%`);
              }
            }
          }
        }
      );
      
      console.log('\n✅ Embedding model loaded successfully!');
    } catch (error) {
      console.error('\n❌ Error loading embedding model:', error);
      throw new Error(`Failed to load embedding model: ${error.message}`);
    }
  }
  
  return embedder;
}

/**
 * Generate embeddings for a single text
 * @param {string} text - Text to embed
 * @returns {Promise<number[]>} Embedding vector
 */
export async function embedQuery(text) {
  const model = await getEmbedder();
  
  try {
    const output = await model(text, {
      pooling: 'mean', // Use mean pooling
      normalize: true  // Normalize embeddings
    });
    
    // Convert tensor to array
    return Array.from(output.data);
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error(`Embedding generation failed: ${error.message}`);
  }
}

/**
 * Generate embeddings for multiple texts (batch)
 * @param {string[]} texts - Array of texts to embed
 * @returns {Promise<number[][]>} Array of embedding vectors
 */
export async function embedDocuments(texts) {
  const model = await getEmbedder();
  const embeddings = [];
  
  console.log(`📊 Generating embeddings for ${texts.length} documents...`);
  
  // Process in batches to avoid memory issues
  const batchSize = 10;
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    
    try {
      // Process batch
      const batchPromises = batch.map(text => 
        model(text, { pooling: 'mean', normalize: true })
          .then(output => Array.from(output.data))
      );
      
      const batchEmbeddings = await Promise.all(batchPromises);
      embeddings.push(...batchEmbeddings);
      
      // Progress indicator
      const processed = Math.min(i + batchSize, texts.length);
      const percent = Math.round((processed / texts.length) * 100);
      process.stdout.write(`\r   Progress: ${processed}/${texts.length} (${percent}%)`);
    } catch (error) {
      console.error(`\n❌ Error processing batch ${Math.floor(i / batchSize) + 1}:`, error.message);
      throw error;
    }
  }
  
  console.log('\n✅ All embeddings generated!');
  return embeddings;
}

/**
 * Get embedding dimensions for the model
 * @returns {number} Embedding dimensions
 */
export function getEmbeddingDimensions() {
  // all-MiniLM-L6-v2 has 384 dimensions
  // Change this if using a different model
  return 384;
}

/**
 * Get model info
 */
export function getModelInfo() {
  return {
    name: MODEL_NAME,
    dimensions: getEmbeddingDimensions(),
    type: 'local',
    framework: 'Transformers.js'
  };
}
