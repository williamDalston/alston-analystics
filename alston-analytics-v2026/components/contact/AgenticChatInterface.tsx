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
      const fallbackContent = "Noted. I'm forwarding this to Alston directly. You'll hear back within 24 hours. What email address should we use?";
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

  const showEmailPrompt = messages.some(m => m.content.includes("What's the best email") || m.content.includes("email address should we use")) && !submitSuccess;

  return (
    <motion.div 
      className="glass-surface rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl" 
      style={{ 
        height: 'calc(100vh - 140px)',
        minHeight: '500px', 
        maxHeight: 'calc(100vh - 100px)'
      }}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <motion.div 
        className="glass-heavy px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-4 border-b border-soft-clay/10 flex-shrink-0"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.button
          onClick={onBack}
          className="text-soft-clay/70 hover:text-soft-clay transition-colors focus:outline-none focus:ring-2 focus:ring-stellar-white/50 rounded p-1.5"
          aria-label="Go back to contact options"
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <div className="flex-1 min-w-0">
          <h2 className="text-soft-clay font-mono font-bold text-sm sm:text-base truncate">Alston Analytics AI</h2>
          <p className="text-soft-clay/50 text-xs font-mono hidden sm:block">Powered by strategic intent</p>
        </div>
        <motion.div 
          className="w-2 h-2 rounded-full bg-stellar-white shadow-[0_0_8px_rgba(224,242,254,0.8)]" 
          aria-label="Online"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 scroll-smooth"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
        style={{
          scrollBehavior: 'smooth',
        }}
      >
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.5,
                delay: index === messages.length - 1 ? 0.1 : 0
              }}
              layout
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <motion.div
                className={`max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 relative ${
                  message.role === 'user'
                    ? 'bg-star-blue/20 text-soft-clay border border-star-blue/30 shadow-lg shadow-star-blue/10'
                    : 'glass-heavy text-soft-clay shadow-lg shadow-soft-clay/5'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Live indicator for streaming */}
                {message.isStreaming && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-star-blue shadow-[0_0_8px_rgba(125,211,252,0.8)]"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    aria-label="Streaming"
                  />
                )}
                
                <motion.p 
                  className="font-sans leading-relaxed text-sm sm:text-base whitespace-pre-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {message.content}
                  {message.isStreaming && message.content === '...' && (
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ...
                    </motion.span>
                  )}
                </motion.p>

                {/* Options */}
                {message.options && !message.isStreaming && (
                  <motion.div 
                    className="mt-3 sm:mt-4 space-y-2" 
                    role="group" 
                    aria-label="Response options"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {message.options.map((option, optIndex) => (
                      <motion.button
                        key={option}
                        onClick={() => !isRateLimited && handleOptionClick(option)}
                        disabled={isRateLimited || isLoading}
                        className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg glass-surface hover:bg-star-blue/10 transition-all text-xs sm:text-sm font-mono text-soft-clay border border-transparent hover:border-star-blue/30 focus:outline-none focus:ring-2 focus:ring-star-blue/50 focus:border-star-blue/50 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={`Select option: ${option}`}
                        whileHover={!isRateLimited && !isLoading ? { scale: 1.02, x: 4 } : {}}
                        whileTap={!isRateLimited && !isLoading ? { scale: 0.98 } : {}}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.3 + optIndex * 0.05,
                          type: "spring",
                          stiffness: 300,
                          damping: 25
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: optIndex * 0.2 }}
                          >
                            →
                          </motion.span>
                          {option}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-star-blue/5 to-transparent opacity-0 group-hover:opacity-100"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
          
          {/* Scroll anchor */}
          <div ref={messagesEndRef} className="h-1" />
          
          {/* Error Message */}
          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex justify-center"
              role="alert"
              aria-live="assertive"
            >
              <motion.div 
                className={`glass-heavy rounded-2xl px-5 py-3 border ${
                  isRateLimited 
                    ? 'border-deep-amber/30 bg-deep-amber/10' 
                    : 'border-signal-red/30 bg-signal-red/10'
                }`}
                animate={{ 
                  boxShadow: [
                    `0 0 0px rgba(${isRateLimited ? '255, 191, 0' : '255, 77, 77'}, 0.2)`,
                    `0 0 20px rgba(${isRateLimited ? '255, 191, 0' : '255, 77, 77'}, 0.3)`,
                    `0 0 0px rgba(${isRateLimited ? '255, 191, 0' : '255, 77, 77'}, 0.2)`,
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className={`flex items-center gap-2 text-sm font-mono ${
                  isRateLimited ? 'text-deep-amber' : 'text-signal-red'
                }`}>
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                  </motion.div>
                  <div className="flex flex-col gap-1">
                    <span>{apiError}</span>
                    {isRateLimited && retryAfter && (
                      <span className="text-xs opacity-75">
                        Waiting {retryAfter} seconds before retry...
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <motion.div 
        className="glass-heavy px-4 sm:px-6 py-3 sm:py-4 border-t border-soft-clay/10 flex-shrink-0"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {showEmailPrompt && (
          <div className="mb-4 space-y-3">
            <p className="text-xs sm:text-sm text-soft-clay/70 font-mono mb-2">
              You can provide your email below, or continue chatting:
            </p>
            <div className="flex gap-2">
              <input
                id="email-input"
                type="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setEmailError('');
                }}
                onKeyPress={(e) => e.key === 'Enter' && !isRateLimited && handleEmailSubmit()}
                placeholder="you@organization.com (optional)"
                disabled={isRateLimited || isSubmitting}
                className="flex-1 bg-glass-surface/50 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-soft-clay font-mono text-sm sm:text-base placeholder:text-soft-clay/30 focus:outline-none focus:ring-2 focus:ring-star-blue/50 border border-transparent focus:border-star-blue/30 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed chat-input-snappy"
                aria-invalid={emailError ? 'true' : 'false'}
                aria-describedby={emailError ? 'email-error' : undefined}
              />
              <motion.button
                onClick={handleEmailSubmit}
                disabled={isSubmitting || isRateLimited || !emailInput.trim()}
                className={`glass-surface rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-star-blue hover:bg-star-blue/10 transition-all font-mono font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-star-blue/50 relative overflow-hidden group flex-shrink-0 ${isSubmitting ? 'btn-loading opacity-70' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Submit email address"
                whileHover={!isSubmitting && !isRateLimited && emailInput.trim() ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting && !isRateLimited && emailInput.trim() ? { scale: 0.95 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span>Submit</span>
                )}
              </motion.button>
            </div>
            {emailError && (
              <motion.div 
                id="email-error" 
                className="flex items-center gap-2 text-signal-red text-xs sm:text-sm font-mono" 
                role="alert"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <AlertCircle className="w-4 h-4" />
                </motion.div>
                <span>{emailError}</span>
              </motion.div>
            )}
          </div>
        )}
        
        <div className="flex gap-2 sm:gap-3">
          <label htmlFor="chat-input" className="sr-only">Type your message</label>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && !isRateLimited && !isLimitReached && handleSendMessage()}
            placeholder={
              isLimitReached
                ? "Chat limit reached — refresh to start a new session"
                : isRateLimited
                ? "Rate limited - please wait..."
                : "Type your message..."
            }
            disabled={isLoading || isRateLimited || isLimitReached}
            className="flex-1 bg-glass-surface/50 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-soft-clay font-mono text-sm sm:text-base placeholder:text-soft-clay/30 focus:outline-none focus:ring-2 focus:ring-star-blue/50 border border-transparent focus:border-star-blue/30 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed chat-input-snappy"
            aria-label="Chat message input"
          />
          <motion.button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading || isRateLimited || isLimitReached}
            className={`glass-surface rounded-full p-2.5 sm:p-3 text-star-blue hover:bg-star-blue/10 transition-all focus:outline-none focus:ring-2 focus:ring-star-blue/50 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 relative overflow-hidden group ${isLoading ? 'btn-loading' : ''}`}
            aria-label={
              isLimitReached
                ? "Chat limit reached"
                : isRateLimited
                ? "Rate limited - please wait"
                : "Send message"
            }
            whileHover={!isRateLimited && !isLimitReached && input.trim() ? { scale: 1.1, rotate: 5 } : {}}
            whileTap={!isRateLimited && !isLimitReached && input.trim() ? { scale: 0.9 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <motion.div
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Send className="w-5 h-5" />
              </motion.div>
            )}
            <motion.div
              className="absolute inset-0 bg-star-blue/10 rounded-full opacity-0 group-hover:opacity-100"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
