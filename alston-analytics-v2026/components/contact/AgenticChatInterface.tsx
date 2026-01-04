'use client';

import { useState } from 'react';
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello. I am Alston's digital assistant. What are we building?",
      options: [
        'Strategic Consulting',
        'Power BI Dashboard',
        'Just Exploring',
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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOptionClick = (option: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: option,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response based on option
    setTimeout(() => {
      setIsLoading(false);
      let response: Message;

      if (option === 'Strategic Consulting') {
        setCurrentStep('consulting');
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            "Excellent. Strategic work is my specialty. Tell me: What's the complexity you're facing?",
        };
      } else if (option === 'Power BI Dashboard') {
        setCurrentStep('powerbi');
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            'Power BI is where chaos becomes clarity. How many data sources are we integrating?',
        };
      } else {
        setCurrentStep('exploring');
        response = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            "No pressure. Let's stay connected. Would you like to join the Sovereign Mind newsletter?",
          options: ['Yes, sign me up', 'Not now'],
        };
      }

      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate response
    setTimeout(() => {
      setIsLoading(false);
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "Noted. I'm forwarding this to Alston directly. You'll hear back within 24 hours. What's the best email to reach you?",
      };
      setMessages((prev) => [...prev, response]);
    }, 1500);
  };

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
          content: `Perfect. I've sent everything to info@alstonanalytics.com. You'll receive a response within 24 hours. Thank you for reaching out.`,
        };
        setMessages((prev) => [...prev, response]);
      }, 500);
    }, 1500);
  };

  return (
    <div className="glass-surface rounded-3xl overflow-hidden flex flex-col" style={{ height: '70vh' }}>
      {/* Header */}
      <div className="glass-heavy px-6 py-4 flex items-center gap-4 border-b border-soft-clay/10">
        <button
          onClick={onBack}
          className="text-soft-clay/70 hover:text-soft-clay transition-colors focus:outline-none focus:ring-2 focus:ring-electric-moss/50 rounded p-1"
          aria-label="Go back to contact options"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-soft-clay font-mono font-bold">Alston Analytics AI</h2>
          <p className="text-soft-clay/50 text-xs font-mono">Powered by strategic intent</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-electric-moss animate-pulse" aria-label="Online" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  message.role === 'user'
                    ? 'bg-electric-moss/20 text-soft-clay border border-electric-moss/30'
                    : 'glass-heavy text-soft-clay'
                }`}
              >
                <p className="font-sans leading-relaxed">{message.content}</p>

                {/* Options */}
                {message.options && (
                  <div className="mt-4 space-y-2" role="group" aria-label="Response options">
                    {message.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className="w-full text-left px-4 py-3 rounded-lg glass-surface hover:bg-electric-moss/10 transition-all text-sm font-mono text-soft-clay border border-transparent hover:border-electric-moss/30 focus:outline-none focus:ring-2 focus:ring-electric-moss/50 focus:border-electric-moss/50"
                        aria-label={`Select option: ${option}`}
                      >
                        → {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="glass-heavy px-6 py-4 border-t border-soft-clay/10">
        {messages.some(m => m.content.includes("What's the best email")) && !submitSuccess ? (
          <div className="space-y-3">
            <div>
              <label htmlFor="email-input" className="sr-only">Email Address</label>
              <input
                id="email-input"
                type="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                  setEmailError('');
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                placeholder="you@organization.com"
                className="w-full bg-glass-surface/50 rounded-full px-5 py-3 text-soft-clay font-mono placeholder:text-soft-clay/30 focus:outline-none focus:ring-2 focus:ring-electric-moss/50 border border-transparent focus:border-electric-moss/30 transition-all"
                aria-invalid={emailError ? 'true' : 'false'}
                aria-describedby={emailError ? 'email-error' : undefined}
              />
              {emailError && (
                <div id="email-error" className="mt-2 flex items-center gap-2 text-signal-red text-sm font-mono" role="alert">
                  <AlertCircle className="w-4 h-4" />
                  <span>{emailError}</span>
                </div>
              )}
            </div>
            <button
              onClick={handleEmailSubmit}
              disabled={isSubmitting}
              className={`w-full glass-surface rounded-full px-6 py-3 text-electric-moss hover:bg-electric-moss/10 transition-all font-mono font-bold focus:outline-none focus:ring-2 focus:ring-electric-moss/50 ${isSubmitting ? 'btn-loading opacity-70' : ''}`}
              aria-label="Submit email address"
            >
              {isSubmitting ? 'Sending...' : 'Submit Email'}
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 bg-glass-surface/50 rounded-full px-5 py-3 text-soft-clay font-mono placeholder:text-soft-clay/30 focus:outline-none focus:ring-2 focus:ring-electric-moss/50 border border-transparent focus:border-electric-moss/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Chat message input"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className={`glass-surface rounded-full p-3 text-electric-moss hover:bg-electric-moss/10 transition-all focus:outline-none focus:ring-2 focus:ring-electric-moss/50 disabled:opacity-50 disabled:cursor-not-allowed ${isLoading ? 'btn-loading' : ''}`}
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
