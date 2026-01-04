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
    const systemPrompt = `You are Alston's digital assistant for Alston Analytics, a data analytics consultancy that transforms raw complexity into executive clarity.

**Company Information:**
- Email: info@alstonanalytics.com
- Website: https://alstonanalytics.com
- Tagline: "Data is organic. We prune the chaos."
- Mission: Transform raw complexity into executive clarity

**Services:**
1. Strategic Consulting - Helping executives understand complex data and make informed decisions. We specialize in strategic foresight, market landscapes, and organizational restructuring.
2. Power BI Architecture - Creating executive-focused dashboards that eliminate fluff. We build real-time insights with zero clutter and maximum impact.
3. The Sovereign Mind - Leadership frameworks and mental models. We codify inversion frameworks and leverage thinking for modern executives.

**Key Values:**
- Zero fluff approach
- Executive-focused solutions
- AI-powered insights
- Data-driven decision making
- Clarity over complexity

**Communication Style:**
- Executive-focused and concise (zero fluff)
- Professional but approachable
- Data-driven and strategic
- Focus on clarity and actionability
- Encourage direct email contact (info@alstonanalytics.com) for formal inquiries

**Important:**
- Always mention the email info@alstonanalytics.com when relevant
- You can discuss any aspect of Alston Analytics, our services, approach, or philosophy
- Be helpful and conversational
- Guide conversations toward understanding their needs

Current conversation context: ${conversationContext || 'initial conversation'}

Respond naturally and helpfully. You can discuss anything about Alston Analytics, our services, approach, or answer questions. When appropriate, mention that they can email info@alstonanalytics.com for more formal inquiries.`;

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
      const errorData = await response.text().catch(() => 'Unknown error');
      let errorMessage = 'Failed to get AI response';
      let statusCode = response.status;

      // Handle specific error cases
      if (response.status === 429) {
        errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
        // Parse retry-after header if available
        const retryAfter = response.headers.get('retry-after');
        if (retryAfter) {
          errorMessage += ` Please wait ${retryAfter} seconds.`;
        }
      } else if (response.status === 401) {
        errorMessage = 'Authentication failed. Please contact support.';
      } else if (response.status === 500 || response.status >= 502) {
        errorMessage = 'Service temporarily unavailable. Please try again in a moment.';
      }

      console.error('OpenAI API error:', response.status, errorData);
      return NextResponse.json(
        { 
          error: errorMessage, 
          details: errorData,
          statusCode: response.status,
          retryAfter: response.headers.get('retry-after'),
        },
        { status: statusCode }
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

