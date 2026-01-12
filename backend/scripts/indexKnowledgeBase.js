import dotenv from 'dotenv';
import { addDocuments } from '../services/vectorStore.js';
import { chunkText } from './chunkText.js';
import { yogaArticles } from '../data/yogaArticles.js';

dotenv.config();

/**
 * Index yoga knowledge base articles into vector store
 */
async function indexKnowledgeBase() {
  try {
    console.log('🚀 Starting knowledge base indexing...');
    console.log(`📚 Processing ${yogaArticles.length} articles...`);

    const allChunks = [];

    for (const article of yogaArticles) {
      // Split article into chunks
      const chunks = chunkText(article.content, 1000, 200);

      // Create chunk objects with metadata
      const chunkObjects = chunks.map((chunk, idx) => ({
        content: chunk,
        metadata: {
          articleId: article.id,
          title: article.title,
          category: article.category,
          chunkIndex: idx,
          chunkId: `${article.id}_chunk_${idx}`
        }
      }));

      allChunks.push(...chunkObjects);
      console.log(`  ✅ Processed "${article.title}": ${chunks.length} chunks`);
    }

    console.log(`\n📦 Total chunks created: ${allChunks.length}`);
    console.log('💾 Adding chunks to vector store...\n');

    // Add all chunks to vector store (in batches if needed)
    const batchSize = 100;
    for (let i = 0; i < allChunks.length; i += batchSize) {
      const batch = allChunks.slice(i, i + batchSize);
      await addDocuments(batch);
      console.log(`  ✅ Indexed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allChunks.length / batchSize)}`);
    }

    console.log('\n🎉 Knowledge base indexing completed successfully!');
    
  } catch (error) {
    console.error('❌ Error indexing knowledge base:', error);
    process.exit(1);
  }
}

indexKnowledgeBase();
