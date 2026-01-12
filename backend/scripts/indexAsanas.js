import dotenv from 'dotenv';
import { addDocuments } from '../services/vectorStore.js';
import { chunkText } from './chunkText.js';
import { basicAsanas } from '../data/basicAsanas.js';

dotenv.config();

/**
 * Index basic asanas into vector store
 */
async function indexAsanas() {
  try {
    console.log('🚀 Starting indexing of basic asanas...');
    console.log(`📚 Processing ${basicAsanas.length} asanas...`);

    const allChunks = [];

    for (const asana of basicAsanas) {
      if (!asana.content || asana.content.trim().length === 0) {
        console.log(`  ⚠️  Skipping "${asana.title}" - no content`);
        continue;
      }

      // Split asana into chunks
      const chunks = chunkText(asana.content, 1000, 200);

      // Create chunk objects with metadata
      const chunkObjects = chunks.map((chunk, idx) => ({
        content: chunk,
        metadata: {
          articleId: asana.id,
          title: asana.title,
          category: asana.category || 'general',
          difficulty: asana.difficulty || 'beginner',
          source: 'Basic Asanas Dataset',
          chunkIndex: idx,
          chunkId: `${asana.id}_chunk_${idx}`
        }
      }));

      allChunks.push(...chunkObjects);
      console.log(`  ✅ Processed "${asana.title}": ${chunks.length} chunks`);
    }

    if (allChunks.length === 0) {
      console.log('❌ No chunks created. Please check asana data.');
      process.exit(1);
    }

    console.log(`\n📦 Total chunks created: ${allChunks.length}`);
    console.log('💾 Adding chunks to vector store...\n');

    // Add all chunks to vector store (in batches)
    const batchSize = 50;
    for (let i = 0; i < allChunks.length; i += batchSize) {
      const batch = allChunks.slice(i, i + batchSize);
      await addDocuments(batch);
      console.log(`  ✅ Indexed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allChunks.length / batchSize)}`);
    }

    console.log('\n🎉 Basic asanas indexing completed successfully!');
    
  } catch (error) {
    console.error('❌ Error indexing asanas:', error);
    process.exit(1);
  }
}

indexAsanas();
