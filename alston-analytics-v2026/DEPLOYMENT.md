# Deployment Guide

## Environment Variables

### Local Development

The `.env.local` file contains sensitive API keys and should **never** be committed to Git. It's already in `.gitignore`.

To set up local development:
1. Create a `.env.local` file in the `alston-analytics-v2026` directory
2. Add your API keys:

```env
# OpenAI API Key for Agentic Chat Interface
OPENAI_API_KEY=your-api-key-here
```

### Vercel Deployment

To add environment variables in Vercel:

1. Go to your project in the [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** (Your OpenAI API key - stored securely in `.env.local` for local development)
   - **Environment:** Select all (Production, Preview, Development)
4. Click **Save**
5. Redeploy your application for the changes to take effect

### API Route

The chatbot uses the API route at `/api/chat` which:
- Accepts POST requests with `messages` and `conversationContext`
- Uses the OpenAI API to generate responses
- Returns AI-generated messages for the chat interface

The API route is located at: `app/api/chat/route.ts`

## Security Notes

- ⚠️ **Never commit `.env.local` to Git** - it's already in `.gitignore`
- ✅ Always use environment variables for sensitive keys
- ✅ Use Vercel's environment variables for production deployment
- ✅ The API key is only used server-side in the API route

