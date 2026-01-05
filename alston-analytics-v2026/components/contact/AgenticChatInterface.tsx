'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  options?: string[];
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
  const lastRequestTimeRef = useRef<number>(0);
  const requestDebounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (requestDebounceTimeoutRef.current) {
        clearTimeout(requestDebounceTimeoutRef.current);
      }
    };
  }, []);

  const callChatAPI = async (userMessage: string, conversationContext: string): Promise<string | null> => {
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
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        const statusCode = errorData.statusCode || response.status;
        const errorMessage = errorData.error || 'Failed to get AI response';

        if (statusCode === 429) {
          setIsRateLimited(true);
          const retryAfterValue = errorData.retryAfter ? parseInt(errorData.retryAfter, 10) : 30;
          setRetryAfter(retryAfterValue);
          setApiError('Brief pause to manage rate limits. Please try again in a few seconds.');
          return null;
        }

        setApiError(errorMessage);
        return null;
      }

      const data = await response.json();
      return data.message || null;
    } catch (error) {
      console.error('Chat API error:', error);
      setApiError('Connection interrupted. Please try again.');
      return null;
    }
  };

  const handleOptionClick = async (option: string) => {
    if (isLimitReached) {
      setApiError('You’ve reached the chat limit for this session. Please refresh to start a new conversation.');
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: option,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulated local response (no remote API)
    const aiResponse = await callChatAPI(option, currentStep);

    if (!aiResponse) {
      // Fallback to default responses if API fails
      setIsLoading(false);
      let response: Message;

      if (option === 'Strategic Consulting') {
        setCurrentStep('consulting');
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            "Excellent. Strategic work is my specialty. What complexity are you facing?",
        };
      } else if (option === 'Power BI Dashboard') {
        setCurrentStep('powerbi');
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            'Power BI is where chaos becomes clarity. How many data sources need integration?',
        };
      } else {
        setCurrentStep('exploring');
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            "No pressure. Would you like to join the Sovereign Mind newsletter for strategic frameworks?",
          options: ['Yes, sign me up', 'Not now'],
        };
      }

      setMessages((prev) => [...prev, response]);
      return;
    }

    // Use AI response
    setIsLoading(false);
    const response: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
    };

    // Update step based on option (for flow control)
    if (option === 'Strategic Consulting') {
      setCurrentStep('consulting');
    } else if (option === 'Power BI Dashboard') {
      setCurrentStep('powerbi');
    } else {
      setCurrentStep('exploring');
    }

    setMessages((prev) => [...prev, response]);
  };

  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return;
    if (isLimitReached) {
      setApiError('You’ve reached the chat limit for this session. Please refresh to start a new conversation.');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = input;
    setInput('');
    setIsLoading(true);

    // Simulated local response (no remote API)
    const aiResponse = await callChatAPI(messageText, currentStep);

    setIsLoading(false);

    if (!aiResponse) {
      // Fallback response if API fails
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
          content:
            "Noted. I'm forwarding this to Alston directly. You'll hear back within 24 hours. What email address should we use?",
      };
      setMessages((prev) => [...prev, response]);
      return;
    }

    // Use AI response
    const response: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
    };
    setMessages((prev) => [...prev, response]);
  }, [input, currentStep]);

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
        id: Date.now().toString(),
        role: 'user',
        content: emailInput,
      };

      setMessages((prev) => [...prev, userMessage]);

      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Confirmed. I've forwarded your information to info@alstonanalytics.com. You'll receive a response within 24 hours. Thank you for reaching out.`,
        };
        setMessages((prev) => [...prev, response]);
      }, 500);
    }, 1500);
  };

  return (
    <motion.div 
      className="glass-surface rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl" 
      style={{ height: 'calc(100vh - 200px)', minHeight: '500px', maxHeight: '80vh' }}
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
                    ? 'bg-stellar-white/20 text-soft-clay border border-stellar-white/30 shadow-lg shadow-stellar-white/10'
                    : 'glass-heavy text-soft-clay shadow-lg shadow-soft-clay/5'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.p 
                  className="font-sans leading-relaxed text-sm sm:text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {message.content}
                </motion.p>

                {/* Options */}
                {message.options && (
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
                        disabled={isRateLimited}
                        className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg glass-surface hover:bg-stellar-white/10 transition-all text-xs sm:text-sm font-mono text-soft-clay border border-transparent hover:border-stellar-white/30 focus:outline-none focus:ring-2 focus:ring-stellar-white/50 focus:border-stellar-white/50 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={`Select option: ${option}`}
                        whileHover={!isRateLimited ? { scale: 1.02, x: 4 } : {}}
                        whileTap={!isRateLimited ? { scale: 0.98 } : {}}
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
                          className="absolute inset-0 bg-gradient-to-r from-stellar-white/5 to-transparent opacity-0 group-hover:opacity-100"
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
                    ? 'border-yellow-500/30 bg-yellow-500/10' 
                    : 'border-signal-red/30 bg-signal-red/10'
                }`}
                animate={{ 
                  boxShadow: [
                    `0 0 0px rgba(${isRateLimited ? '234, 179, 8' : '255, 77, 77'}, 0.2)`,
                    `0 0 20px rgba(${isRateLimited ? '234, 179, 8' : '255, 77, 77'}, 0.3)`,
                    `0 0 0px rgba(${isRateLimited ? '234, 179, 8' : '255, 77, 77'}, 0.2)`,
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className={`flex items-center gap-2 text-sm font-mono ${
                  isRateLimited ? 'text-yellow-400' : 'text-signal-red'
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
          
          {/* Typing Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex justify-start"
              aria-label="AI is typing"
            >
              <motion.div 
                className="glass-heavy rounded-2xl px-5 py-3 shadow-lg"
                animate={{ 
                  boxShadow: [
                    '0 0 0px rgba(224, 242, 254, 0.15)',
                    '0 0 20px rgba(125, 211, 252, 0.3)',
                    '0 0 0px rgba(224, 242, 254, 0.15)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex gap-1.5 items-center">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-stellar-white shadow-[0_0_8px_rgba(224,242,254,0.6)]"
                    animate={{ 
                      y: [0, -6, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity, 
                      delay: 0,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-stellar-white shadow-[0_0_8px_rgba(224,242,254,0.6)]"
                    animate={{ 
                      y: [0, -6, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity, 
                      delay: 0.2,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-stellar-white shadow-[0_0_8px_rgba(224,242,254,0.6)]"
                    animate={{ 
                      y: [0, -6, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity, 
                      delay: 0.4,
                      ease: "easeInOut"
                    }}
                  />
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
        {messages.some(m => m.content.includes("What's the best email")) && !submitSuccess ? (
          <div className="space-y-3">
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
                disabled={isRateLimited}
                className="flex-1 bg-glass-surface/50 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-soft-clay font-mono text-sm sm:text-base placeholder:text-soft-clay/30 focus:outline-none focus:ring-2 focus:ring-electric-moss/50 border border-transparent focus:border-electric-moss/30 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed chat-input-snappy"
                aria-invalid={emailError ? 'true' : 'false'}
                aria-describedby={emailError ? 'email-error' : undefined}
              />
              <motion.button
                onClick={handleEmailSubmit}
                disabled={isSubmitting || isRateLimited || !emailInput.trim()}
                className={`glass-surface rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-stellar-white hover:bg-stellar-white/10 transition-all font-mono font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stellar-white/50 relative overflow-hidden group flex-shrink-0 ${isSubmitting ? 'btn-loading opacity-70' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
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
            <div className="pt-2 border-t border-soft-clay/10">
              <div className="flex gap-2 sm:gap-3">
                <label htmlFor="chat-input" className="sr-only">Type your message</label>
                <input
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => {
                    // Direct state update for instant typing response
                    setInput(e.target.value);
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && !isRateLimited && handleSendMessage()}
                  placeholder="Or continue chatting..."
                  disabled={isLoading || isRateLimited}
                  className="flex-1 bg-glass-surface/50 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-soft-clay font-mono text-sm sm:text-base placeholder:text-soft-clay/30 focus:outline-none focus:ring-2 focus:ring-stellar-white/50 border border-transparent focus:border-stellar-white/30 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed chat-input-snappy"
                  aria-label="Chat message input"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading || isRateLimited}
                  className={`glass-surface rounded-full p-2.5 sm:p-3 text-stellar-white hover:bg-stellar-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-stellar-white/50 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 relative overflow-hidden group ${isLoading ? 'btn-loading' : ''}`}
                  aria-label={isRateLimited ? "Rate limited - please wait" : "Send message"}
                  whileHover={!isRateLimited ? { scale: 1.1, rotate: 5 } : {}}
                  whileTap={!isRateLimited ? { scale: 0.9 } : {}}
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
                    className="absolute inset-0 bg-stellar-white/10 rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </div>
          </div>
        ) : (
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
              className="flex-1 bg-glass-surface/50 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-soft-clay font-mono text-sm sm:text-base placeholder:text-soft-clay/30 focus:outline-none focus:ring-2 focus:ring-electric-moss/50 border border-transparent focus:border-electric-moss/30 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed chat-input-snappy"
              aria-label="Chat message input"
            />
            <motion.button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading || isRateLimited || isLimitReached}
              className={`glass-surface rounded-full p-2.5 sm:p-3 text-stellar-white hover:bg-stellar-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-stellar-white/50 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 relative overflow-hidden group ${isLoading ? 'btn-loading' : ''}`}
              aria-label={
                isLimitReached
                  ? "Chat limit reached"
                  : isRateLimited
                  ? "Rate limited - please wait"
                  : "Send message"
              }
              whileHover={!isRateLimited && !isLimitReached ? { scale: 1.1, rotate: 5 } : {}}
              whileTap={!isRateLimited && !isLimitReached ? { scale: 0.9 } : {}}
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
                className="absolute inset-0 bg-stellar-white/10 rounded-full opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
