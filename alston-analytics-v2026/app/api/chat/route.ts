import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Use nodejs runtime for OpenAI API compatibility

export async function POST(request: NextRequest) {
  try {
    const { messages, conversationContext } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Build system prompt based on Alston Analytics context
    const systemPrompt = `You are Alston's digital assistant for Alston Analytics, a data analytics consultancy that transforms raw complexity into executive clarity. You specialize in:

1. Strategic Consulting - Helping executives understand complex data and make informed decisions
2. Power BI Dashboards - Creating executive-focused dashboards that eliminate fluff
3. Data Transformation - Pruning chaos from data to reveal actionable insights

Your communication style:
- Executive-focused and concise (zero fluff)
- Professional but approachable
- Data-driven and strategic
- Focus on clarity and actionability

Current conversation context: ${conversationContext || 'initial conversation'}

Respond naturally and guide the conversation toward understanding their needs and scheduling a strategic audit.`;

    // Prepare messages for OpenAI (include system message)
    const openAIMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      })),
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using gpt-4o-mini for cost-effectiveness
        messages: openAIMessages,
        temperature: 0.7,
        max_tokens: 500,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return NextResponse.json(
        { error: 'Failed to get AI response', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || 'I apologize, but I encountered an error processing your request.';

    return NextResponse.json({
      message: aiMessage,
      usage: data.usage,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

