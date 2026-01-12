import { similaritySearch } from './vectorStore.js';
import { checkSafety, generateSafetyMessage } from './safetyFilter.js';

/**
 * Build sources list for response
 * @param {Array} chunks - Retrieved chunks
 * @returns {Array} Formatted sources
 */
function buildSources(chunks) {
  return chunks.map((chunk, idx) => ({
    title: chunk.metadata.title || `Source ${idx + 1}`,
    articleId: chunk.metadata.articleId || chunk.metadata.url || 'unknown',
    chunkId: chunk.chunkId,
    url: chunk.metadata.url || null,
    source: chunk.metadata.source || 'Unknown Source'
  }));
}

/**
 * Format retrieved chunks into a readable answer
 * @param {Array} chunks - Retrieved chunks
 * @param {string} query - Original query
 * @returns {string} Formatted answer
 */
function formatAnswerFromChunks(chunks, query) {
  if (chunks.length === 0) {
    return "I couldn't find relevant information in the knowledge base for your query. Please try rephrasing your question or asking about a different topic.";
  }

  let answer = `Based on the information available in our knowledge base, here's what we found regarding your question: "${query}"\n\n`;
  
  // Group chunks by source/article
  const chunksBySource = {};
  chunks.forEach((chunk, idx) => {
    const sourceKey = chunk.metadata.title || chunk.metadata.source || `Source ${idx + 1}`;
    if (!chunksBySource[sourceKey]) {
      chunksBySource[sourceKey] = {
        title: chunk.metadata.title || sourceKey,
        source: chunk.metadata.source,
        url: chunk.metadata.url,
        chunks: []
      };
    }
    chunksBySource[sourceKey].chunks.push(chunk);
  });

  // Format each source's content
  let sourceIndex = 1;
  for (const [sourceKey, sourceData] of Object.entries(chunksBySource)) {
    answer += `**${sourceIndex}. ${sourceData.title}**\n`;
    if (sourceData.source) {
      answer += `Source: ${sourceData.source}\n`;
    }
    answer += `\n`;
    
    // Combine all chunks from this source
    const combinedContent = sourceData.chunks
      .map(chunk => chunk.content)
      .join('\n\n');
    
    // Take first 500 characters per source to keep response manageable
    answer += combinedContent.substring(0, 500);
    if (combinedContent.length > 500) {
      answer += '...';
    }
    
    answer += `\n\n`;
    sourceIndex++;
  }

  answer += `\n*Note: This information is based on retrieved content from our knowledge base. For personalized medical advice, please consult with a healthcare professional.*`;

  return answer;
}

/**
 * Generate answer using semantic search (no LLM)
 * @param {string} query - User query
 * @returns {Object} { answer, chunks, sources, isUnsafe, safetyMessage }
 */
export async function generateRAGAnswer(query) {
  const startTime = Date.now();
  
  // Check safety first
  const safetyCheck = checkSafety(query);
  
  // Retrieve relevant chunks using semantic search
  const chunks = await similaritySearch(query, 5);
  
  // Build sources list
  const sources = buildSources(chunks);

  // Format answer from retrieved chunks (no LLM - pure semantic search)
  let answer = formatAnswerFromChunks(chunks, query);
  
  const responseTime = Date.now() - startTime;

  // Add safety message if needed
  let safetyMessage = null;
  if (safetyCheck.isUnsafe) {
    safetyMessage = generateSafetyMessage(safetyCheck.category, safetyCheck.flags);
    answer = safetyMessage + '\n\n' + answer;
  }

  return {
    answer: answer,
    chunks,
    sources,
    isUnsafe: safetyCheck.isUnsafe,
    safetyFlags: safetyCheck.flags,
    safetyMessage: safetyMessage,
    metadata: {
      responseTime,
      chunksRetrieved: chunks.length
    }
  };
}
