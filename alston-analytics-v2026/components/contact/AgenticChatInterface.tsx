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
      content: "Hello. I'm Alston's digital assistant. You can reach us directly at info@alstonanalytics.com, or I can help clarify your needs here. What are you looking to build or explore?",
      options: [
        'Strategic Consulting',
        'Power BI Dashboard',
        'Learn About Alston Analytics',
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

        if (statusCode === 429) {
          setIsRateLimited(true);
          setRetryAfter(retryAfterValue);

          // Auto-clear rate limit after retry-after period
          setTimeout(() => {
            setIsRateLimited(false);
            setRetryAfter(null);
            setApiError(null);
          }, retryAfterValue * 1000);

          setApiError(`Rate limit exceeded. Please wait ${retryAfterValue} seconds before trying again.`);
          return null;
        }

        const errorMessage = errorData.error || 'Failed to get AI response';
        setApiError(errorMessage);
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

        return fullText.trim() || null;
      } else {
        // JSON response (fallback)
        const data = await response.json();
        return data.message || null;
      }
    } catch (error) {
      console.error('Chat API error:', error);
      setApiError('Connection interrupted. Please try again.');
      return null;
    }
  };

  const handleOptionClick = async (option: string) => {
    if (isLimitReached) {
      setApiError("You've reached the chat limit for this session. Please refresh to start a new conversation.");
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

      if (option === 'Strategic Consulting') {
        setCurrentStep('consulting');
        fallbackContent = "Excellent. Strategic work is my specialty. What complexity are you facing?";
      } else if (option === 'Power BI Dashboard') {
        setCurrentStep('powerbi');
        fallbackContent = 'Power BI is where chaos becomes clarity. How many data sources need integration?';
      } else {
        setCurrentStep('exploring');
        fallbackContent = "No pressure. Would you like to join the Sovereign Mind newsletter for strategic frameworks?";
        fallbackOptions = ['Yes, sign me up', 'Not now'];
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
    if (option === 'Strategic Consulting') {
      setCurrentStep('consulting');
    } else if (option === 'Power BI Dashboard') {
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

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLimitReached || isRateLimited) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = input;
    setInput('');
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

    if (!aiResponse) {
      // Replace placeholder with fallback response
      const fallbackContent = "I'm having trouble connecting to the neural network right now. You can try again, or if you prefer, provide your email below and we'll contact you directly.";
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
  }, [input, currentStep, isLimitReached, isRateLimited, messages]);

  const handleEmailSubmit = () => {
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

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      const userMessage: Message = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: emailInput,
      };

      setMessages((prev) => [...prev, userMessage]);

      setTimeout(() => {
        const response: Message = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: `Confirmed. I've forwarded your information to info@alstonanalytics.com. You'll receive a response within 24 hours. Thank you for reaching out.`,
        };
        setMessages((prev) => [...prev, response]);
      }, 500);
    }, 1500);
  };

  const showEmailPrompt = messages.length > 0 &&
    messages[messages.length - 1].role === 'assistant' &&
    messages[messages.length - 1].content.toLowerCase().includes('email') &&
    !submitSuccess;

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
            <span>Terminate_Session</span>
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
                {message.role === 'user' ? '>> USER_INPUT' : '>> SYSTEM_RESPONSE'}
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

          {/* API Error Notification */}
          {apiError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-md bg-signal-red/10 border border-signal-red/30 rounded p-3 flex items-center gap-3 text-signal-red text-xs font-mono"
            >
              <AlertCircle className="w-4 h-4" />
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
                onKeyPress={(e) => e.key === 'Enter' && !isRateLimited && handleEmailSubmit()}
                placeholder="user@network.com"
                disabled={isRateLimited || isSubmitting}
                className="flex-1 bg-transparent border-none focus:ring-0 text-stellar-white font-mono text-sm placeholder:text-soft-clay/20 py-2 px-2"
              />
              <button
                onClick={handleEmailSubmit}
                disabled={isSubmitting || !emailInput.trim()}
                className="bg-stellar-white/10 hover:bg-stellar-white/20 text-stellar-white px-3 py-1 rounded text-xs font-mono uppercase transition-colors disabled:opacity-50"
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
            placeholder={isLimitReached ? "SESSION_LIMIT_REACHED" : "Enter command..."}
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
