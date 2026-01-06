# Chat Interface Troubleshooting

## Issue: "I'm having trouble connecting right now"

This message appears when the chat API fails to connect or respond. Here's how to fix it:

## Common Causes & Solutions

### 1. Missing OpenAI API Key

**Symptom:** Chat shows fallback message immediately

**Fix:**
1. Add `OPENAI_API_KEY` to your environment variables:
   - **Local:** Add to `.env.local`:
     ```env
     OPENAI_API_KEY=sk-your-key-here
     ```
   - **Vercel:** Go to Settings → Environment Variables → Add `OPENAI_API_KEY`

2. Restart your dev server after adding the key locally

### 2. Invalid API Key

**Symptom:** Chat works but shows errors in console

**Fix:**
- Verify your OpenAI API key is valid
- Check it starts with `sk-`
- Ensure it hasn't expired or been revoked
- Get a new key from [OpenAI Platform](https://platform.openai.com/api-keys)

### 3. Network/Connection Issues

**Symptom:** Intermittent failures, timeout errors

**Fix:**
- Check your internet connection
- Verify OpenAI API is accessible (not blocked by firewall)
- Check Vercel function logs for errors

### 4. Rate Limiting

**Symptom:** "Taking a brief pause to ensure quality responses" message

**Fix:**
- Wait for the retry period (usually 60 seconds)
- Check your OpenAI usage limits
- Upgrade your OpenAI plan if needed

### 5. Edge Runtime Issues

**Symptom:** Errors in Vercel logs about edge runtime

**Fix:**
- The chat API uses edge runtime for better performance
- If issues persist, we can switch to Node.js runtime
- Check Vercel deployment logs for specific errors

## Testing the Chat

### Without API Key (Fallback Mode)
- Chat will use intelligent fallback responses
- Still functional but not AI-powered
- Good for testing the UI

### With API Key
- Full AI-powered responses
- Streaming responses
- Better conversation flow

## Debugging Steps

1. **Check Browser Console**
   - Open DevTools (F12)
   - Look for errors in Console tab
   - Check Network tab for failed requests

2. **Check Vercel Logs**
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on `/api/chat` function
   - View real-time logs

3. **Test API Directly**
   ```bash
   curl -X POST https://your-domain.com/api/chat \
     -H "Content-Type: application/json" \
     -d '{"messages": [{"role": "user", "content": "Hello"}]}'
   ```

## Current Status

The chat interface has:
- ✅ Fallback responses when API key is missing
- ✅ Better error messages
- ✅ Rate limit handling
- ✅ Connection error detection
- ✅ Email capture as backup

## Quick Fix

If chat isn't working:
1. Verify `OPENAI_API_KEY` is set in Vercel
2. Check Vercel function logs
3. Test with a simple message
4. If still failing, users can use the email form below the chat

The email form is always available as a backup contact method.

