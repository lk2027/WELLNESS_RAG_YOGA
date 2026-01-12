import express from 'express';
import { generateRAGAnswer } from '../services/ragService.js';
import { Query } from '../models/Query.js';

export const askRouter = express.Router();

/**
 * POST /api/ask
 * Main endpoint for asking yoga-related questions
 */
askRouter.post('/', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Query is required and must be a non-empty string' 
      });
    }

    // Generate RAG answer
    const result = await generateRAGAnswer(query.trim());

    // Save to MongoDB
    const queryDoc = new Query({
      userQuery: query,
      retrievedChunks: result.chunks.map(chunk => ({
        content: chunk.content,
        source: chunk.metadata.title || 'Unknown',
        title: chunk.metadata.title || 'Unknown',
        chunkId: chunk.chunkId,
        similarityScore: chunk.similarityScore
      })),
      aiAnswer: result.answer,
      sources: result.sources,
      isUnsafe: result.isUnsafe,
      safetyFlags: result.safetyFlags,
      safetyMessage: result.safetyMessage,
      metadata: result.metadata
    });

    await queryDoc.save();

    // Return response
    res.json({
      answer: result.answer,
      sources: result.sources,
      isUnsafe: result.isUnsafe,
      safetyMessage: result.safetyMessage,
      safetyFlags: result.safetyFlags,
      queryId: queryDoc._id,
      metadata: result.metadata
    });

  } catch (error) {
    console.error('Error in /ask endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to process query', 
      message: error.message 
    });
  }
});
