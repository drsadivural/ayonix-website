'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedChatbotCharacterProps {
  isSpeaking: boolean;
  sentiment: 'positive' | 'neutral' | 'negative';
  currentText: string;
}

export default function AnimatedChatbotCharacter({
  isSpeaking,
  sentiment,
  currentText
}: AnimatedChatbotCharacterProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [bodyPosition, setBodyPosition] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Eye blink animation - random intervals
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Body movement - subtle breathing animation
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setBodyPosition(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(moveInterval);
  }, []);

  // Lip sync animation based on speaking state
  useEffect(() => {
    if (isSpeaking) {
      const lipSyncInterval = setInterval(() => {
        setMouthOpen(prev => !prev);
      }, 150);

      return () => clearInterval(lipSyncInterval);
    } else {
      setMouthOpen(false);
    }
  }, [isSpeaking]);

  // Calculate body transform based on breathing
  const breathingY = Math.sin(bodyPosition * Math.PI / 180) * 2;
  const breathingRotate = Math.sin(bodyPosition * Math.PI / 180) * 0.5;

  // Get expression overlay based on sentiment
  const getExpressionColor = () => {
    switch (sentiment) {
      case 'positive':
        return 'rgba(34, 197, 94, 0.1)'; // Green tint for positive
      case 'negative':
        return 'rgba(239, 68, 68, 0.1)'; // Red tint for negative
      default:
        return 'rgba(59, 130, 246, 0.05)'; // Blue tint for neutral
    }
  };

  // Get expression description
  const getExpressionEmoji = () => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😔';
      default:
        return '😌';
    }
  };

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"
        animate={{
          opacity: isSpeaking ? [0.3, 0.6, 0.3] : 0.2,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Character container with breathing animation */}
      <motion.div
        className="relative z-10"
        animate={{
          y: breathingY,
          rotate: breathingRotate,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 10
        }}
      >
        {/* Main character image */}
        <div className="relative w-[280px] h-[350px]">
          <Image
            src="/images/ai-assistant-character.png"
            alt="AI Assistant"
            fill
            className="object-contain"
            priority
          />

          {/* Expression overlay */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundColor: getExpressionColor(),
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Eye blink overlay */}
          <AnimatePresence>
            {isBlinking && (
              <motion.div
                className="absolute top-[25%] left-[30%] w-[40%] h-[3%] bg-gradient-to-b from-gray-800 to-gray-900 rounded-full"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.1 }}
              />
            )}
          </AnimatePresence>

          {/* Mouth animation (lip sync) */}
          <AnimatePresence>
            {mouthOpen && isSpeaking && (
              <motion.div
                className="absolute bottom-[30%] left-[42%] w-[16%] h-[4%] bg-gradient-to-b from-pink-400 to-red-400 rounded-full"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.7 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.05 }}
              />
            )}
          </AnimatePresence>

          {/* Speaking indicator */}
          {isSpeaking && (
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Expression emoji indicator */}
        <motion.div
          className="absolute -top-4 -right-4 text-4xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {getExpressionEmoji()}
        </motion.div>
      </motion.div>

      {/* Voice wave visualization */}
      {isSpeaking && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1 h-12 items-end"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
              animate={{
                height: ['10%', '100%', '10%'],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.05,
                ease: 'easeInOut'
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Sentiment label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
        {sentiment === 'positive' && '✨ Positive'}
        {sentiment === 'neutral' && '💬 Neutral'}
        {sentiment === 'negative' && '🤔 Thoughtful'}
      </div>
    </div>
  );
}