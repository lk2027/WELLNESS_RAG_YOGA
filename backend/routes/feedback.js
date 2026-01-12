import express from 'express';
import { Query } from '../models/Query.js';

export const feedbackRouter = express.Router();

/**
 * POST /api/feedback
 * Submit feedback for a query response
 */
feedbackRouter.post('/', async (req, res) => {
  try {
    const { queryId, helpful, comment } = req.body;

    if (!queryId) {
      return res.status(400).json({ 
        error: 'queryId is required' 
      });
    }

    if (typeof helpful !== 'boolean') {
      return res.status(400).json({ 
        error: 'helpful must be a boolean value' 
      });
    }

    // Find and update the query document
    const queryDoc = await Query.findById(queryId);
    
    if (!queryDoc) {
      return res.status(404).json({ 
        error: 'Query not found' 
      });
    }

    queryDoc.feedback = {
      helpful,
      comment: comment || '',
      createdAt: new Date()
    };

    await queryDoc.save();

    res.json({ 
      success: true, 
      message: 'Feedback saved successfully',
      feedback: queryDoc.feedback
    });

  } catch (error) {
    console.error('Error in /feedback endpoint:', error);
    res.status(500).json({ 
      error: 'Failed to save feedback', 
      message: error.message 
    });
  }
});

/**
 * GET /api/feedback/stats
 * Get feedback statistics (optional endpoint)
 */
feedbackRouter.get('/stats', async (req, res) => {
  try {
    const total = await Query.countDocuments({ 'feedback.helpful': { $exists: true } });
    const helpful = await Query.countDocuments({ 'feedback.helpful': true });
    const notHelpful = await Query.countDocuments({ 'feedback.helpful': false });

    res.json({
      total,
      helpful,
      notHelpful,
      helpfulPercentage: total > 0 ? ((helpful / total) * 100).toFixed(2) : 0
    });
  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    res.status(500).json({ 
      error: 'Failed to fetch statistics', 
      message: error.message 
    });
  }
});
