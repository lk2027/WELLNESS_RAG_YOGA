import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ChromaClient } from 'chromadb';

dotenv.config();

/**
 * Verify all dependencies and services are set up correctly
 */
async function verifySetup() {
  console.log('🔍 Verifying setup...\n');
  
  let allGood = true;

  // Check environment variables
  console.log('1. Checking environment variables...');
  const requiredEnvVars = ['MONGODB_URI', 'CHROMA_HOST'];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.log(`   ❌ ${envVar} is not set`);
      allGood = false;
    } else {
      console.log(`   ✅ ${envVar} is set`);
    }
  }
  console.log('   ✅ Using local embeddings (no OpenAI API key needed)');

  // Check MongoDB connection
  console.log('\n2. Checking MongoDB connection...');
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/yoga_rag';
    await mongoose.connect(mongoUri);
    // Test connection
    await mongoose.connection.db.admin().ping();
    console.log('   ✅ MongoDB connection successful');
    await mongoose.disconnect();
  } catch (error) {
    console.log(`   ❌ MongoDB connection failed: ${error.message}`);
    console.log('   💡 Make sure MongoDB is running');
    allGood = false;
  }

  // Check Chroma DB connection
  console.log('\n3. Checking Chroma DB connection...');
  try {
    const chromaHost = process.env.CHROMA_HOST || 'http://localhost:8000';
    const chromaClient = new ChromaClient({ path: chromaHost });
    // Try to list collections as a connection test
    await chromaClient.listCollections();
    console.log('   ✅ Chroma DB connection successful');
  } catch (error) {
    console.log(`   ❌ Chroma DB connection failed: ${error.message}`);
    console.log('   💡 Make sure Chroma DB is running on:', process.env.CHROMA_HOST || 'http://localhost:8000');
    console.log('   💡 Try: docker run -d -p 8000:8000 chromadb/chroma');
    allGood = false;
  }

  // Check local embeddings setup
  console.log('\n4. Checking local embeddings setup...');
  try {
    // Try importing the local embeddings module
    const { getModelInfo } = await import('../services/localEmbeddings.js');
    const info = getModelInfo();
    console.log(`   ✅ Local embeddings configured`);
    console.log(`      Model: ${info.name}`);
    console.log(`      Dimensions: ${info.dimensions}`);
    console.log(`      Framework: ${info.framework}`);
  } catch (error) {
    console.log(`   ⚠️  Could not verify local embeddings: ${error.message}`);
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  if (allGood) {
    console.log('✅ All checks passed! Setup looks good.');
    console.log('\nNext steps:');
    console.log('1. Run: npm run index (to index the knowledge base)');
    console.log('2. Run: npm start (to start the server)');
  } else {
    console.log('❌ Some checks failed. Please fix the issues above.');
  }
  console.log('='.repeat(50));
}

verifySetup().catch(console.error);
