'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MessageCircle, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimeCharacterProps {
  onChatClick?: () => void;
}

export function AnimeCharacter({ onChatClick }: AnimeCharacterProps) {
  const [greeting, setGreeting] = useState('');
  const greetings = [
    "Hi! I'm Aya, your AI assistant!",
    'Welcome to Ayonix AI!',
    'How can I help you today?',
  ];

  useEffect(() => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    setGreeting(randomGreeting ?? '');
  }, []);

  const handleVoiceGreeting = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(greeting);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative"
      >
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="https://cdn.abacus.ai/images/344d13b8-d3ba-4953-948f-afbf942075f7.jpg"
            alt="Aya - Ayonix AI Assistant"
            fill
            className="object-cover"
            priority
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-xl px-6 py-3 flex items-center space-x-3"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 bg-green-500 rounded-full"
          />
          <span className="font-medium text-gray-800">{greeting}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleVoiceGreeting}
            className="p-2 hover:bg-blue-50"
          >
            <Volume2 className="w-4 h-4 text-blue-600" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onChatClick}
            className="p-2 hover:bg-blue-50"
          >
            <MessageCircle className="w-4 h-4 text-blue-600" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
