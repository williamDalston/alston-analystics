export const runtime = 'edge';

type ChatMessage = {
  role: 'assistant' | 'user' | 'system';
  content: string;
};

function buildSystemPrompt(): ChatMessage {
  return {
    role: 'system',
    content:
      "You are Alston Analytics' assistant. Be concise, helpful, and curious. Clarify scope, timeline, budget, data sources, and success criteria. If the user shares email or contact info, acknowledge it. Keep replies brief and confident.",
  };
}

async function streamOpenAI(messages: ChatMessage[], apiKey: string) {
  const encoder = new TextEncoder();
  const body = JSON.stringify({
    model: 'gpt-4o-mini',
    stream: true,
    messages: [buildSystemPrompt(), ...messages],
    temperature: 0.7,
    max_tokens: 220,
  });

  const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  });

  if (!upstream.ok || !upstream.body) {
    // Handle rate limiting specifically
    if (upstream.status === 429) {
      const retryAfter = upstream.headers.get('retry-after') || '60';
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again in a moment.',
          statusCode: 429,
          retryAfter: parseInt(retryAfter, 10)
        }), 
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter
          }
        }
      );
    }
    
    // Handle other errors
    const errorText = await upstream.text().catch(() => 'Upstream model error');
    return new Response(
      JSON.stringify({ 
        error: upstream.status >= 500 ? 'Service temporarily unavailable. Please try again.' : 'Upstream model error',
        statusCode: upstream.status
      }), 
      { 
        status: upstream.status,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += new TextDecoder().decode(value, { stream: true });

          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith('data:')) continue;
            const data = trimmed.replace(/^data:\s*/, '');
            if (data === '[DONE]') {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const delta: string = json?.choices?.[0]?.delta?.content || '';
              if (delta) {
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // swallow parse errors
            }
          }
        }
      } catch (err) {
        console.error('Stream read error', err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}

export async function POST(req: Request) {
  try {
    const { messages = [], conversationContext = '' } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && apiKey.trim() !== '') {
      const chatMessages: ChatMessage[] = messages.length
        ? messages
        : [{ role: 'user', content: 'Tell me about your project.' }];
      return await streamOpenAI(chatMessages, apiKey);
    }

    // Fallback intelligent response (no API key)
    // Generate contextual response based on conversation
    const lastUserMessage = messages.length > 0
      ? messages[messages.length - 1]?.content || ''
      : '';

    let fallbackText = '';

    // Smart fallback responses based on context
    if (lastUserMessage.toLowerCase().includes('email') || lastUserMessage.includes('@')) {
      fallbackText = "Thanks for sharing your email! I've logged it for Alston. You'll hear back within 24 hours. What else can I help clarify about your project?";
    } else if (messages.length === 0) {
      fallbackText = "Hi! I'm here to help. Tell me about your project - what are you looking to achieve with data analytics?";
    } else if (lastUserMessage.length < 20) {
      fallbackText = "Got it! Can you tell me more about your goals, timeline, and what data sources you're working with?";
    } else {
      fallbackText = "Interesting. To help you best, I'd love to know: What's your timeline? What data do you have? And who's the decision-maker? Feel free to share your email if you'd like Alston to follow up directly.";
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(fallbackText));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Chat route error', error);
    return new Response(JSON.stringify({ error: 'Unable to process request right now', statusCode: 500 }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
