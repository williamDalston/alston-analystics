# Chat API Pipeline Debugging

## Issue
API key is present but chat still shows "having trouble connecting" error.

## Potential Pipeline Issues

### 1. Edge Runtime Environment Variables
**Problem:** Edge runtime may not have access to environment variables in some cases.

**Check:**
- Verify `OPENAI_API_KEY` is set in Vercel environment variables
- Make sure it's set for the correct environment (Production, Preview, Development)
- Edge runtime should work, but if issues persist, we can switch to Node.js runtime

### 2. Streaming Response Issues
**Problem:** The streaming response might be failing silently.

**Fixes Applied:**
- Added better error logging
- Added response validation
- Improved error messages

### 3. Network/CORS Issues
**Problem:** Edge runtime fetch might have different behavior.

**Check:**
- Verify OpenAI API is accessible from Vercel edge functions
- Check for CORS issues (shouldn't be one for server-side)

## Debugging Steps

### 1. Check Vercel Function Logs
1. Go to Vercel Dashboard → Your Project
2. Click on "Functions" tab
3. Find `/api/chat` function
4. Check real-time logs when you send a message
5. Look for:
   - "Chat API called" log (shows if API key is detected)
   - Any error messages
   - OpenAI API response status

### 2. Test API Directly
```bash
curl -X POST https://your-domain.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'
```

### 3. Check Environment Variables
In Vercel:
- Settings → Environment Variables
- Verify `OPENAI_API_KEY` exists
- Check it's set for all environments (or at least Production)
- Make sure there are no extra spaces or quotes

### 4. Switch to Node.js Runtime (if edge fails)
If edge runtime continues to have issues, we can switch to Node.js:
```typescript
export const runtime = 'nodejs'; // Instead of 'edge'
```

## What I Fixed

1. **Better Error Logging**
   - Logs API key presence (in dev mode)
   - Logs detailed OpenAI errors
   - Logs stream read errors

2. **Error Response Instead of Silent Fallback**
   - Now returns actual error instead of falling through to fallback
   - Client will see the real error message

3. **Response Validation**
   - Checks if stream response is valid before returning
   - Throws error if response is invalid

4. **Detailed Error Messages**
   - Parses OpenAI error responses
   - Shows actual error from OpenAI API

## Next Steps

1. **Check Vercel logs** - This will show exactly what's happening
2. **Test the API directly** - Use curl to see raw response
3. **Verify environment variables** - Make sure they're set correctly
4. **If still failing** - We can switch to Node.js runtime or add more debugging

## Common Issues

- **API key not accessible in edge runtime** → Switch to nodejs runtime
- **Stream parsing fails** → Better error handling added
- **Silent failures** → Now returns error responses
- **Network timeouts** → Check Vercel function timeout settings

