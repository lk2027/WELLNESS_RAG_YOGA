import mongoose from 'mongoose';

const querySchema = new mongoose.Schema({
  userQuery: {
    type: String,
    required: true,
    index: true
  },
  retrievedChunks: [{
    content: String,
    source: String,
    title: String,
    chunkId: String,
    similarityScore: Number
  }],
  aiAnswer: {
    type: String,
    required: true
  },
  sources: [{
    title: String,
    articleId: String,
    chunkId: String
  }],
  isUnsafe: {
    type: Boolean,
    default: false,
    index: true
  },
  safetyFlags: [{
    type: String
  }],
  safetyMessage: String,
  feedback: {
    helpful: Boolean,
    comment: String,
    createdAt: Date
  },
  metadata: {
    responseTime: Number,
    chunksRetrieved: Number
  }
}, {
  timestamps: true
});

export const Query = mongoose.model('Query', querySchema);
