import dotenv from 'dotenv';
import { addDocuments } from '../services/vectorStore.js';
import { chunkText } from './chunkText.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

/**
 * Index scraped web articles into vector store
 */
async function indexScrapedData() {
  try {
    const scrapedPath = path.join(__dirname, '../data/scrapedArticles.js');
    
    // Check if scraped articles exist
    if (!fs.existsSync(scrapedPath)) {
      console.log('❌ Scraped articles not found. Please run scraping first:');
      console.log('   npm run scrape');
      process.exit(1);
    }

    // Import scraped articles
    const { scrapedArticles } = await import('../data/scrapedArticles.js');
    
    console.log('🚀 Starting indexing of scraped articles...');
    console.log(`📚 Processing ${scrapedArticles.length} scraped articles...`);

    const allChunks = [];

    for (const article of scrapedArticles) {
      if (!article.content || article.content.trim().length === 0) {
        console.log(`  ⚠️  Skipping "${article.title}" - no content`);
        continue;
      }

      // Split article into chunks
      const chunks = chunkText(article.content, 1000, 200);

      // Create chunk objects with metadata
      const chunkObjects = chunks.map((chunk, idx) => ({
        content: chunk,
        metadata: {
          articleId: article.id,
          title: article.title,
          category: article.category || 'general',
          source: article.source || 'Unknown',
          url: article.url || null,
          chunkIndex: idx,
          chunkId: `${article.id}_chunk_${idx}`
        }
      }));

      allChunks.push(...chunkObjects);
      console.log(`  ✅ Processed "${article.title}": ${chunks.length} chunks`);
    }

    if (allChunks.length === 0) {
      console.log('❌ No chunks created. Please check scraped articles.');
      process.exit(1);
    }

    console.log(`\n📦 Total chunks created: ${allChunks.length}`);
    console.log('💾 Adding chunks to vector store...\n');

    // Add all chunks to vector store (in batches if needed)
    const batchSize = 50; // Smaller batches for web scraping
    for (let i = 0; i < allChunks.length; i += batchSize) {
      const batch = allChunks.slice(i, i + batchSize);
      await addDocuments(batch);
      console.log(`  ✅ Indexed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allChunks.length / batchSize)}`);
    }

    console.log('\n🎉 Scraped articles indexing completed successfully!');
    
  } catch (error) {
    console.error('❌ Error indexing scraped articles:', error);
    process.exit(1);
  }
}

indexScrapedData();
