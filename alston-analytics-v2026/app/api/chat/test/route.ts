import { NextResponse } from 'next/server';

/**
 * Test endpoint to verify API key is accessible
 * GET /api/chat/test
 */
export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  return NextResponse.json({
    hasApiKey: !!apiKey,
    apiKeyLength: apiKey?.length || 0,
    apiKeyPrefix: apiKey?.substring(0, 7) || 'none',
    runtime: 'edge',
    timestamp: new Date().toISOString(),
  });
}

