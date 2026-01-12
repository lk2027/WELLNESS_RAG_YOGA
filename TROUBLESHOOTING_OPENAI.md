# Troubleshooting OpenAI API Quota Error

## Error Message
```
Error [InsufficientQuotaError]: 429 You exceeded your current quota, please check your plan and billing details.
```

## What Happened

The indexing process successfully:
- ✅ Processed all 30 articles
- ✅ Created 48 chunks
- ❌ Failed when trying to generate embeddings (OpenAI API quota exceeded)

## Solutions

### Option 1: Check OpenAI Account & Add Credits

1. **Check your OpenAI account:**
   - Go to: https://platform.openai.com/usage
   - Log in with your OpenAI account
   - Check available credits/quota

2. **Add credits to your account:**
   - Go to: https://platform.openai.com/account/billing
   - Add payment method if needed
   - Add credits to your account

3. **Retry indexing:**
   ```bash
   cd c:\Users\Lenovo\Desktop\YOGARAG\backend
   npm run index
   ```

### Option 2: Use a Different OpenAI API Key

1. **Get a new API key:**
   - Go to: https://platform.openai.com/api-keys
   - Create a new API key
   - Make sure the account has credits

2. **Update .env file:**
   - Edit `backend/.env`
   - Update `OPENAI_API_KEY` with the new key
   - Save the file

3. **Retry indexing:**
   ```bash
   cd c:\Users\Lenovo\Desktop\YOGARAG\backend
   npm run index
   ```

### Option 3: Use Free Tier (Alternative - Requires Code Changes)

OpenAI doesn't have a free tier anymore, but you could:
- Use OpenAI's free credits (if available)
- Wait for quota to reset (if on a plan with monthly limits)
- Use a different embedding service (requires code modifications)

## How Much Do Embeddings Cost?

For this project:
- **Model used**: `text-embedding-3-small`
- **Total chunks**: 48
- **Estimated cost**: ~$0.0001 - $0.001 (less than 1 cent)
- **Very inexpensive!**

The quota error usually means:
- Account has $0 credits
- Account needs billing information added
- Free tier credits exhausted

## Retry Indexing

Once you've added credits or updated the API key:

```bash
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm run index
```

You should see:
```
🎉 Knowledge base indexing completed successfully!
✅ Added 48 chunks to vector store
```

## Verify Setup

After successful indexing, verify:
```bash
cd c:\Users\Lenovo\Desktop\YOGARAG\backend
npm run verify
```

All checks should pass ✅

## Continue Without Indexing (Limited Functionality)

If you want to test the UI while fixing the API key:

1. **Backend is running** ✅ (on port 3001)
2. **Start frontend** (in another terminal):
   ```bash
   cd c:\Users\Lenovo\Desktop\YOGARAG\frontend
   npm run dev
   ```
3. **Open browser**: http://localhost:3000
4. **Note**: Queries will fail until embeddings are indexed

---

**Recommended**: Add credits to OpenAI account (very inexpensive, ~$0.001) and retry indexing for full functionality.
