export const runtime = 'edge';

/**
 * Debug endpoint to test OpenAI connectivity
 * GET /api/chat/debug
 */
export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'No API key configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Say "API working" in exactly 2 words.' }],
        max_tokens: 10,
      }),
    });

    const status = response.status;
    const statusText = response.statusText;

    if (!response.ok) {
      const errorBody = await response.text();
      let errorJson;
      try {
        errorJson = JSON.parse(errorBody);
      } catch {
        errorJson = null;
      }

      return new Response(JSON.stringify({
        success: false,
        status,
        statusText,
        error: errorJson || errorBody,
        apiKeyPrefix: apiKey.substring(0, 10),
        apiKeyLength: apiKey.length,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'No content';

    return new Response(JSON.stringify({
      success: true,
      status,
      response: content,
      model: data.model,
      usage: data.usage,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Unknown error',
      errorName: error.name,
      apiKeyPrefix: apiKey.substring(0, 10),
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
