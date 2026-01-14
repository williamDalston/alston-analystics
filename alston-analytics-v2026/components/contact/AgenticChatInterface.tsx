'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Loader2, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  options?: string[];
  isStreaming?: boolean; // Track if message is currently streaming
}

interface AgenticChatInterfaceProps {
  onBack: () => void;
}

export function AgenticChatInterface({ onBack }: AgenticChatInterfaceProps) {
  const MAX_MESSAGES = 100;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome. I'm here to understand what you're building—no forms, no friction. Ask anything about our work, pricing, or process. Or tell me what problem you're trying to solve.",
      options: [
        'I need strategic consulting',
        'I need a Power BI dashboard',
        'Just exploring for now',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [currentStep, setCurrentStep] = useState<'initial' | 'consulting' | 'powerbi' | 'exploring'>('initial');
  const [isLoading, setIsLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const streamingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLimitReached = messages.length >= MAX_MESSAGES;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages, isLoading]);

  // Smooth scroll on initial load
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
    };
  }, []);

  const callChatAPI = async (
    userMessage: string,
    conversationContext: string,
    onStream?: (partial: string) => void
  ): Promise<string | null> => {
    setApiError(null);
    setIsRateLimited(false);
    setRetryAfter(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          conversationContext,
        }),
      });

      if (!response.ok) {
        // Try to parse error as JSON first
        let errorData: any = {};
        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          try {
            errorData = await response.json();
          } catch {
            // If JSON parsing fails, use status code
          }
        }

        const statusCode = errorData.statusCode || response.status;
        const retryAfterHeader = response.headers.get('retry-after');
        const retryAfterValue = errorData.retryAfter || (retryAfterHeader ? parseInt(retryAfterHeader, 10) : 60);

        // Handle authentication errors (401) - API key issue
        // Don't block - let fallback handle it
        if (statusCode === 401) {
          // Don't set error, just return null to trigger fallback
          return null;
        }

        if (statusCode === 429) {
          setIsRateLimited(true);
          setRetryAfter(retryAfterValue);

          // Auto-clear rate limit after retry-after period
          setTimeout(() => {
            setIsRateLimited(false);
            setRetryAfter(null);
            setApiError(null);
          }, retryAfterValue * 1000);

          // User-friendly rate limit message
          const rateLimitMessage = retryAfterValue <= 60 
            ? `Rate limit: Please wait ${retryAfterValue} seconds before trying again.`
            : `Rate limit: Please wait about ${Math.ceil(retryAfterValue / 60)} minutes before trying again.`;
          
          // Show rate limit message but don't block - use fallback
          setApiError(rateLimitMessage);
          // Still return null to use fallback, but user knows about rate limit
          return null;
        }

        // For other errors, log but don't block - use fallback
        const errorMessage = errorData.error || 'Unable to process your request right now. Please try again shortly.';
        console.warn('Chat API error, using fallback:', errorMessage);
        // Don't set apiError for non-critical errors - let fallback work
        // Only set for network errors
        if (statusCode >= 500 || statusCode === 0) {
          setApiError('Service temporarily unavailable. Using fallback response.');
        }
        return null;
      }

      // Handle streaming response
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('text/plain') || contentType?.includes('text/event-stream')) {
        // Stream response with timeout fallback
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        let hasReceivedData = false;

        // Set timeout: if no data after 6s, show fallback
        const timeoutId = setTimeout(() => {
          if (!hasReceivedData && onStream) {
            onStream('Checking...');
          }
        }, 6000);

        if (reader) {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                clearTimeout(timeoutId);
                break;
              }

              hasReceivedData = true;
              clearTimeout(timeoutId);

              const chunk = decoder.decode(value, { stream: true });
              fullText += chunk;

              // Call onStream callback with accumulated text
              if (onStream) {
                onStream(fullText);
              }
            }
          } catch (err) {
            clearTimeout(timeoutId);
            console.error('Stream read error:', err);
            if (!hasReceivedData) {
              return null;
            }
          }
        }

        const result = fullText.trim();
        // Return the text if we got any, otherwise null triggers fallback
        return result || null;
      } else {
        // JSON response should not happen with current API (always streams or falls back)
        // But handle it gracefully if it does
        try {
          const data = await response.json();
          // If it's an error response, use fallback
          if (data.error && data.statusCode) {
            console.warn('Chat API returned error JSON, using fallback:', data.error);
            return null; // Will trigger fallback
          }
          return data.message || null;
        } catch (jsonError) {
          // Not JSON, try text
          const text = await response.text().catch(() => '');
          return text || null;
        }
      }
    } catch (error: any) {
      console.error('Chat API error:', error);
      // Don't show error to user - let fallback handle it
      // Only show critical network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setApiError('Unable to reach the server. Please check your internet connection.');
      }
      // Return null to trigger fallback response
      return null;
    }
  };

  const handleOptionClick = async (option: string) => {
    if (isLimitReached) {
      setApiError("You've reached the conversation limit for this session. Please refresh the page to start a new dialogue.");
      return;
    }
    if (isRateLimited) return;

    // Add user message
    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: option,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Create placeholder assistant message
    const assistantId = `a-${Date.now()}`;
    const placeholderMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '...',
      isStreaming: true,
    };

    setMessages((prev) => [...prev, placeholderMessage]);

    // Call API with streaming callback
    const aiResponse = await callChatAPI(option, currentStep, (partial) => {
      // Update placeholder message as chunks arrive
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: partial.trim() || '...', isStreaming: true } : m
        )
      );
    });

    setIsLoading(false);

    if (!aiResponse) {
      // Replace placeholder with fallback response
      let fallbackContent: string;
      let fallbackOptions: string[] | undefined;

      if (option === 'I need strategic consulting') {
        setCurrentStep('consulting');
        fallbackContent = "Good. Tell me about the decision you're trying to make—or the complexity you're navigating. I'll ask clarifying questions to understand the scope.";
      } else if (option === 'I need a Power BI dashboard') {
        setCurrentStep('powerbi');
        fallbackContent = "Let's scope this out. How many data sources are we integrating? And who's the primary audience—executives, analysts, or operations?";
      } else {
        setCurrentStep('exploring');
        fallbackContent = "Take your time. Feel free to browse the site, or ask me anything about how we work. What caught your interest?";
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: fallbackContent, isStreaming: false, options: fallbackOptions }
            : m
        )
      );
      return;
    }

    // Finalize streaming message with full response
    setMessages((prev) =>
      prev.map((m) =>
        m.id === assistantId ? { ...m, content: aiResponse, isStreaming: false } : m
      )
    );

    // Update step based on option (for flow control)
    if (option === 'I need strategic consulting') {
      setCurrentStep('consulting');
    } else if (option === 'I need a Power BI dashboard') {
      setCurrentStep('powerbi');
    } else {
      setCurrentStep('exploring');
    }

    // Keep focus on input for seamless experience
    setTimeout(() => {
      const inputEl = document.getElementById('chat-input');
      if (inputEl) inputEl.focus();
    }, 100);
  };

  const sendMessageDirect = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLimitReached || isRateLimited) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Create placeholder assistant message
    const assistantId = `a-${Date.now()}`;
    const placeholderMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '...',
      isStreaming: true,
    };

    setMessages((prev) => [...prev, placeholderMessage]);

    // Call API with streaming callback
    const aiResponse = await callChatAPI(messageText, currentStep, (partial) => {
      // Update placeholder message as chunks arrive
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: partial.trim() || '...', isStreaming: true } : m
        )
      );
    });

    setIsLoading(false);

    if (!aiResponse || aiResponse.trim() === '') {
      // Replace placeholder with intelligent fallback response
      // Always provide a useful response, even if API failed
      let fallbackContent = '';
      
      // Generate intelligent fallback based on conversation
      const lowerMessage = messageText.toLowerCase();
      if (lowerMessage.includes('email') || messageText.includes('@')) {
        fallbackContent = "Got it—I've noted your email. Will typically responds within 24 hours. Anything else you'd like to clarify before then?";
      } else if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('how much')) {
        fallbackContent = "Our Power BI Health Check starts at $1,000 for a comprehensive 2-hour assessment. Strategic engagements are scoped individually based on complexity. Want to discuss specifics?";
      } else if (lowerMessage.includes('timeline') || lowerMessage.includes('how long') || lowerMessage.includes('duration')) {
        fallbackContent = "Most dashboard projects take 4-8 weeks from kickoff to deployment. Strategic engagements vary—some are one-time assessments, others are ongoing advisory relationships.";
      } else if (messageText.length < 20) {
        fallbackContent = "Tell me more. What's the core problem you're trying to solve? Understanding the context helps me point you in the right direction.";
      } else {
        fallbackContent = "Understood. A few quick questions to help scope this: What's your timeline? What data sources are involved? And who needs to see the final output?";
      }
      
      // Only show error if it's a critical network issue (not API errors)
      if (apiError && apiError.includes('Unable to reach')) {
        fallbackContent = `${fallbackContent} (Note: ${apiError})`;
      }
      
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: fallbackContent, isStreaming: false } : m
        )
      );
      return;
    }

    // Finalize streaming message with full response
    setMessages((prev) =>
      prev.map((m) =>
        m.id === assistantId ? { ...m, content: aiResponse, isStreaming: false } : m
      )
    );
  }, [currentStep, isLimitReached, isRateLimited, messages]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLimitReached || isRateLimited) return;
    const messageText = input;
    setInput('');
    await sendMessageDirect(messageText);
  }, [input, isLimitReached, isRateLimited, sendMessageDirect]);

  const handleEmailSubmit = async () => {
    setEmailError('');

    if (!emailInput.trim()) {
      setEmailError('Please enter your email address');
      return;
    }

    if (!validateEmail(emailInput)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Add user's email to conversation
    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: `My email is: ${emailInput}`,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Send email to conversation history (stores it in the chat)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      const response: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: `Perfect! I've noted your email (${emailInput}). Alston will reach out within 24 hours. Is there anything else you'd like to discuss about your project?`,
      };
      setMessages((prev) => [...prev, response]);

      // Clear email input after successful submission
      setEmailInput('');
    }, 800);
  };

  // Always show email form after first message exchange (as backup contact method)
  // Also show if assistant mentions email
  const showEmailPrompt = (messages.length > 1 && !submitSuccess) || 
    (messages.length > 0 &&
    messages[messages.length - 1].role === 'assistant' &&
    messages[messages.length - 1].content.toLowerCase().includes('email') &&
    !submitSuccess);

  return (
    <motion.div
      className="glass-heavy rounded-xl overflow-hidden flex flex-col shadow-2xl border border-stellar-white/10"
      style={{
        height: 'calc(100vh - 180px)', // Increased clearance for floating dock
        minHeight: '500px',
        maxHeight: 'calc(100vh - 160px)'
      }}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Terminal Header */}
      <motion.div
        className="bg-deep-void/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-stellar-white/10 flex-shrink-0"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-signal-red/50 border border-signal-red/30" />
            <div className="w-3 h-3 rounded-full bg-deep-amber/50 border border-deep-amber/30" />
            <div className="w-3 h-3 rounded-full bg-star-blue/50 border border-star-blue/30" />
          </div>
          <div className="h-4 w-px bg-stellar-white/10" />
          <motion.button
            onClick={onBack}
            className="text-soft-clay/50 hover:text-stellar-white transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
            whileHover={{ x: -2 }}
          >
            <ArrowLeft className="w-3 h-3" />
            <span>End Chat</span>
          </motion.button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-soft-clay/30 text-xs font-mono hidden sm:block">STATUS: ONLINE</span>
          <motion.div
            className="w-2 h-2 rounded-full bg-data-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth bg-deep-void/30"
        role="log"
        aria-live="polite"
        aria-atomic="false"
        aria-label="Chat conversation"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Message Label */}
              <span className={`text-[10px] font-mono tracking-widest mb-1 opacity-40 uppercase ${message.role === 'user' ? 'text-star-blue mr-2' : 'text-data-cyan ml-2'}`}>
                {message.role === 'user' ? 'You' : 'Alston'}
              </span>

              <motion.div
                className={`max-w-[90%] sm:max-w-[85%] rounded-lg px-4 py-3 relative font-mono text-sm sm:text-base ${message.role === 'user'
                  ? 'bg-star-blue/10 text-stellar-white border border-star-blue/20'
                  : 'bg-glass-surface text-soft-clay border-l-2 border-data-cyan/50 pl-4'
                  }`}
              >
                {/* Live indicator for streaming */}
                {message.isStreaming && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-data-cyan shadow-[0_0_5px_rgba(0,240,255,0.8)]"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}

                <p className="whitespace-pre-wrap leading-relaxed">
                  {message.content}
                  {message.isStreaming && message.content === '...' && (
                    <span className="inline-block w-2 h-4 bg-data-cyan/50 ml-1 animate-pulse" />
                  )}
                </p>

                {/* Options */}
                {message.options && !message.isStreaming && (
                  <div className="mt-4 space-y-2">
                    {message.options.map((option, optIndex) => (
                      <motion.button
                        key={option}
                        onClick={() => !isRateLimited && handleOptionClick(option)}
                        disabled={isRateLimited || isLoading}
                        className="w-full text-left px-3 py-2 rounded border border-stellar-white/10 hover:border-data-cyan/50 hover:bg-data-cyan/5 transition-all text-xs sm:text-sm font-mono text-soft-clay/80 hover:text-data-cyan group flex items-center justify-between"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + optIndex * 0.05 }}
                      >
                        <span>{option}</span>
                        <span className="opacity-0 group-hover:opacity-100 text-data-cyan transition-opacity font-bold">↵</span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} className="h-1" />

          {/* Empty State with Example Questions */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8 px-4"
            >
              <p className="text-soft-clay/60 font-sans text-sm mb-4">
                Or try one of these:
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                {[
                  "What does the $1,000 assessment include?",
                  "How long does a typical project take?",
                  "What industries do you work with?",
                ].map((question, idx) => (
                  <motion.button
                    key={question}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * idx }}
                    onClick={() => sendMessageDirect(question)}
                    className="px-4 py-2 rounded-full glass-surface border border-stellar-white/10 hover:border-data-cyan/50 hover:bg-data-cyan/5 transition-all text-xs font-mono text-soft-clay/70 hover:text-data-cyan"
                    disabled={isRateLimited || isLoading}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* API Error Notification */}
          {apiError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              className="mx-auto max-w-md bg-signal-red/10 border border-signal-red/30 rounded p-3 flex items-center gap-3 text-signal-red text-xs font-mono"
            >
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              <span>{apiError}</span>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="bg-deep-void/80 backdrop-blur-md p-4 border-t border-stellar-white/10">

        {/* Email Prompt Form */}
        {showEmailPrompt && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4 overflow-hidden"
          >
            <div className="flex gap-2 items-center bg-glass-surface rounded-md border border-stellar-white/10 p-1">
              <span className="pl-3 text-soft-clay/50 font-mono text-xs">EMAIL:</span>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => { setEmailInput(e.target.value); setEmailError(''); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isRateLimited && !isSubmitting && emailInput.trim()) {
                    e.preventDefault();
                    handleEmailSubmit();
                  }
                }}
                placeholder="your@email.com"
                disabled={isRateLimited || isSubmitting}
                className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-stellar-white font-mono text-sm placeholder:text-soft-clay/20 py-2 px-2"
                autoComplete="email"
                aria-label="Email address"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleEmailSubmit();
                }}
                disabled={isSubmitting || !emailInput.trim() || isRateLimited}
                className="bg-stellar-white/10 hover:bg-stellar-white/20 active:bg-stellar-white/30 text-stellar-white px-3 py-1 rounded text-xs font-mono uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                type="button"
                aria-label="Submit email"
              >
                {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : 'SUBMIT'}
              </button>
            </div>
            {emailError && <p className="text-signal-red text-xs font-mono mt-1 ml-2">{emailError}</p>}
          </motion.div>
        )}

        <div className="flex items-center gap-3 bg-black/40 rounded-lg border border-stellar-white/10 px-4 py-3 focus-within:border-data-cyan/50 focus-within:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all">
          <span className="text-data-cyan font-mono font-bold animate-pulse">{`>_`}</span>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && !isRateLimited && !isLimitReached && handleSendMessage()}
            placeholder={isLimitReached ? "Chat limit reached - email us at info@alstonanalytics.com" : messages.length === 0 ? "Type your message or question..." : "Continue the conversation..."}
            disabled={isLoading || isRateLimited || isLimitReached}
            className="flex-1 bg-transparent border-none focus:ring-0 text-stellar-white font-mono text-sm placeholder:text-soft-clay/30"
            autoComplete="off"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="text-soft-clay/50 hover:text-data-cyan transition-colors disabled:opacity-30"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-data-cyan" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
        <div className="mt-2 flex justify-between items-center px-1">
          <span className="text-[10px] text-soft-clay/30 font-mono">ALSTON_ANALYTICS_V4.0.1</span>
          <span className="text-[10px] text-soft-clay/30 font-mono">SECURE_CONNECTION</span>
        </div>
      </div>
    </motion.div>
  );
}
