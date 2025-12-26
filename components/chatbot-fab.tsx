'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VoiceChatbot } from './voice-chatbot';

export function ChatbotFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Show tooltip after a delay if user hasn't interacted
  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  // Hide tooltip after showing
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasInteracted(true);
    setShowTooltip(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute bottom-full right-0 mb-3 whitespace-nowrap"
                >
                  <div className="bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-ayonix-teal" />
                      <span className="text-sm font-medium text-gray-800">
                        Hi! I'm Aya. Need help? 🎤
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Click to chat or use voice commands!
                    </p>
                  </div>
                  <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulse Ring */}
            <div className="absolute inset-0 rounded-full bg-ayonix-teal/30 animate-ping" />
            
            {/* Button */}
            <Button
              onClick={handleOpen}
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-ayonix-teal to-ayonix-teal-light hover:from-ayonix-teal-dark hover:to-ayonix-teal shadow-lg hover:shadow-xl transition-all"
            >
              {/* Character Face */}
              <svg viewBox="0 0 100 100" className="w-10 h-10">
                {/* Face */}
                <circle cx="50" cy="50" r="40" fill="#FFE4D6" />
                {/* Hair */}
                <path d="M20 35 Q50 10 80 35 Q85 60 75 70 L25 70 Q15 60 20 35" fill="#4A3728" />
                {/* Eyes */}
                <ellipse cx="35" cy="45" rx="5" ry="7" fill="#4A3728" />
                <ellipse cx="65" cy="45" rx="5" ry="7" fill="#4A3728" />
                {/* Eye highlights */}
                <circle cx="37" cy="43" r="2" fill="white" />
                <circle cx="67" cy="43" r="2" fill="white" />
                {/* Smile */}
                <path d="M35 60 Q50 72 65 60" stroke="#FF6B6B" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Blush */}
                <circle cx="25" cy="55" r="5" fill="#FFB6C1" opacity="0.5" />
                <circle cx="75" cy="55" r="5" fill="#FFB6C1" opacity="0.5" />
              </svg>
            </Button>

            {/* Online indicator */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Panel */}
      <VoiceChatbot isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
