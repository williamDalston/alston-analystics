'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';

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

  const handleOptionClick = (option: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: option,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response based on option
    setTimeout(() => {
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

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "Noted. I'm forwarding this to Alston directly. You'll hear back within 24 hours. What's the best email to reach you?",
      };
      setMessages((prev) => [...prev, response]);
    }, 1500);
  };

  return (
    <div className="glass-surface rounded-3xl overflow-hidden flex flex-col" style={{ height: '70vh' }}>
      {/* Header */}
      <div className="glass-heavy px-6 py-4 flex items-center gap-4 border-b border-soft-clay/10">
        <button
          onClick={onBack}
          className="text-soft-clay/70 hover:text-soft-clay transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-soft-clay font-mono font-bold">Alston Analytics AI</h2>
          <p className="text-soft-clay/50 text-xs font-mono">Powered by strategic intent</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-electric-moss animate-pulse" />
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
                  <div className="mt-4 space-y-2">
                    {message.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className="w-full text-left px-4 py-2 rounded-lg glass-surface hover:bg-electric-moss/10 transition-all text-sm font-mono text-soft-clay border border-transparent hover:border-electric-moss/30"
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
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-glass-surface/50 rounded-full px-5 py-3 text-soft-clay font-mono placeholder:text-soft-clay/30 focus:outline-none focus:ring-2 focus:ring-electric-moss/30"
          />
          <button
            onClick={handleSendMessage}
            className="glass-surface rounded-full p-3 text-electric-moss hover:bg-electric-moss/10 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
