import { NextResponse } from 'next/server';

type ChatMessage = {
  role: 'assistant' | 'user' | 'system';
  content: string;
};

export async function POST(req: Request) {
  try {
    const { messages = [], conversationContext = '' } = await req.json();

    const lastUserMessage: string =
      [...messages].reverse().find((m: ChatMessage) => m.role === 'user')?.content ||
      'Tell me about your project.';

    const systemPrompt: ChatMessage = {
      role: 'system',
      content:
        "You are Alston Analytics' assistant. Be concise, helpful, and curious. Clarify scope, timeline, budget, data sources, and success criteria. If the user shares email or contact info, acknowledge it. Keep replies brief.",
    };

    const apiKey = process.env.OPENAI_API_KEY;

    // If an API key is available, call OpenAI for a real response
    if (apiKey) {
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [systemPrompt, ...messages, { role: 'user', content: lastUserMessage }],
          temperature: 0.7,
          max_tokens: 220,
        }),
      });

      if (!openaiResponse.ok) {
        return NextResponse.json(
          { error: 'Upstream model error', statusCode: openaiResponse.status },
          { status: openaiResponse.status },
        );
      }

      const data = await openaiResponse.json();
      const content: string =
        data?.choices?.[0]?.message?.content ||
        `Noted. Let's clarify the ask. What does success look like and what's the timeline?`;

      return NextResponse.json({ message: content });
    }

    // Fallback deterministic response (no API key)
    const contextNote = conversationContext
      ? `I see we're in the "${conversationContext}" flow. `
      : '';
    const fallback = `${contextNote}Got it: "${lastUserMessage}". Quick next steps: tell me your goal, timeline, data sources, and decision-maker. Want to drop an email so we can follow up?`;

    return NextResponse.json({ message: fallback });
  } catch (error) {
    console.error('Chat route error', error);
    return NextResponse.json(
      { error: 'Unable to process request right now', statusCode: 500 },
      { status: 500 },
    );
  }
}
