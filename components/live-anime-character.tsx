'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LiveAnimeCharacterProps {
  onChatOpen?: () => void;
}

export function LiveAnimeCharacter({ onChatOpen }: LiveAnimeCharacterProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthOpenness, setMouthOpenness] = useState(0);
  const [greeting, setGreeting] = useState("Hi! I'm Aya, your AI assistant!");
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Greetings for proactive communication - more natural and varied
  const greetings = [
    "Hey there! I'm Aya, your AI assistant! How can I help you today?",
    "Welcome to Ayonix! I'm Aya, and I'm super excited to show you around!",
    "Hi! I'm Aya! Ready to help you discover our amazing AI solutions!",
    "Hello! I'm Aya, and I'm here to make your experience awesome! What would you like to explore?",
  ];

  // Find the best natural-sounding voice
  const findBestVoice = useCallback((voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
    // Priority order for natural female voices
    const voicePreferences = [
      // Premium natural voices (most natural sounding)
      (v: SpeechSynthesisVoice) => v.name.includes('Microsoft Aria') && v.lang.includes('en'),
      (v: SpeechSynthesisVoice) => v.name.includes('Microsoft Jenny') && v.lang.includes('en'),
      (v: SpeechSynthesisVoice) => v.name.includes('Google US English') && v.name.toLowerCase().includes('female'),
      (v: SpeechSynthesisVoice) => v.name.includes('Samantha') && v.lang.includes('en'),
      (v: SpeechSynthesisVoice) => v.name.includes('Karen') && v.lang.includes('en'),
      // macOS voices
      (v: SpeechSynthesisVoice) => v.name === 'Samantha',
      (v: SpeechSynthesisVoice) => v.name === 'Ava',
      (v: SpeechSynthesisVoice) => v.name === 'Allison',
      // Windows voices
      (v: SpeechSynthesisVoice) => v.name.includes('Zira'),
      (v: SpeechSynthesisVoice) => v.name.includes('Hazel'),
      // Chrome/Edge voices
      (v: SpeechSynthesisVoice) => v.name.includes('Google') && v.lang === 'en-US',
      // Fallback to any English female voice
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'),
      (v: SpeechSynthesisVoice) => v.lang === 'en-US',
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en'),
    ];

    for (const preference of voicePreferences) {
      const voice = voices.find(preference);
      if (voice) {
        console.log('Selected voice:', voice.name);
        return voice;
      }
    }

    return voices[0] || null;
  }, []);

  // Initialize speech synthesis with better voice selection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
      
      // Load voices
      const loadVoices = () => {
        const voices = synthRef.current?.getVoices() || [];
        if (voices.length > 0) {
          const bestVoice = findBestVoice(voices);
          setSelectedVoice(bestVoice);
          setVoicesLoaded(true);
          console.log('Voices loaded, selected:', bestVoice?.name);
        }
      };

      // Chrome requires this event
      if (synthRef.current?.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
      
      // Initial load attempt
      loadVoices();
      
      // Fallback timeout
      setTimeout(loadVoices, 100);
      setTimeout(loadVoices, 500);
    }
  }, [findBestVoice]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = async (event: any) => {
        const last = event.results.length - 1;
        const transcript = event.results[last][0].transcript;
        
        if (event.results[last].isFinal) {
          setCurrentMessage(transcript);
          await handleVoiceCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          try {
            recognitionRef.current?.start();
          } catch (e) {
            console.error('Failed to restart recognition:', e);
          }
        }
      };
    }
  }, [isListening]);

  // Eye blink animation - more natural timing with occasional double blinks
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
      
      // Sometimes double blink for more natural feel
      if (Math.random() > 0.7) {
        setTimeout(() => {
          setIsBlinking(true);
          setTimeout(() => setIsBlinking(false), 100);
        }, 200);
      }
    }, 2500 + Math.random() * 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Improved lip sync animation with smoother transitions
  useEffect(() => {
    if (isSpeaking) {
      let lastOpenness = 0;
      
      const animateMouth = () => {
        // Smooth transition between mouth positions
        const targetOpenness = Math.random() * 0.9 + 0.1;
        const smoothedOpenness = lastOpenness + (targetOpenness - lastOpenness) * 0.4;
        lastOpenness = smoothedOpenness;
        setMouthOpenness(smoothedOpenness);
        
        animationFrameRef.current = requestAnimationFrame(() => {
          setTimeout(animateMouth, 60 + Math.random() * 60);
        });
      };
      animateMouth();
    } else {
      setMouthOpenness(0);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isSpeaking]);

  // Proactive greeting on mount
  useEffect(() => {
    if (!hasGreeted && voiceEnabled && voicesLoaded) {
      const timer = setTimeout(() => {
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        setGreeting(randomGreeting);
        speakTextNaturally(randomGreeting);
        setHasGreeted(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasGreeted, voiceEnabled, voicesLoaded]);

  // Natural speech with varied intonation and pacing
  const speakTextNaturally = useCallback((text: string) => {
    if (!voiceEnabled || !synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    // Split text into sentences for more natural pauses
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    let currentIndex = 0;
    
    const speakNextSentence = () => {
      if (currentIndex >= sentences.length) {
        setIsSpeaking(false);
        return;
      }

      const sentence = sentences[currentIndex].trim();
      const utterance = new SpeechSynthesisUtterance(sentence);
      
      // Natural voice settings for young American female
      // Vary rate and pitch slightly for each sentence for more natural flow
      const baseRate = 1.05; // Slightly faster than default for energetic delivery
      const basePitch = 1.2; // Higher pitch for youthful voice
      
      // Add slight variations for natural speech
      utterance.rate = baseRate + (Math.random() * 0.1 - 0.05);
      utterance.pitch = basePitch + (Math.random() * 0.15 - 0.075);
      utterance.volume = 0.95;

      // Use the pre-selected best voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        currentIndex++;
        // Add natural pause between sentences
        const pauseDuration = sentence.endsWith('?') ? 400 : 
                            sentence.endsWith('!') ? 300 : 250;
        setTimeout(speakNextSentence, pauseDuration);
      };
      
      utterance.onerror = (e) => {
        console.error('Speech error:', e);
        setIsSpeaking(false);
      };

      utteranceRef.current = utterance;
      synthRef.current?.speak(utterance);
    };

    speakNextSentence();
  }, [voiceEnabled, selectedVoice]);

  // Handle voice commands with personality
  const handleVoiceCommand = async (command: string) => {
    const lowerCommand = command.toLowerCase();
    setIsProcessing(true);

    // Navigation commands with varied responses
    if (lowerCommand.includes('products') || lowerCommand.includes('show me products')) {
      const responses = [
        "Sure thing! Let me take you to our products page!",
        "Awesome! Here come our amazing products!",
        "You got it! Check out what we've got!",
      ];
      speakTextNaturally(responses[Math.floor(Math.random() * responses.length)]);
      setTimeout(() => window.location.href = '/products', 2500);
    } else if (lowerCommand.includes('contact') || lowerCommand.includes('sales')) {
      speakTextNaturally("I'll open the contact form for you! Our team is super responsive!");
      setTimeout(() => window.location.href = '/inquiry', 2500);
    } else if (lowerCommand.includes('demo') || lowerCommand.includes('try')) {
      speakTextNaturally("Great choice! You're going to love our demos!");
      setTimeout(() => window.location.href = '/demos', 2500);
    } else if (lowerCommand.includes('use case') || lowerCommand.includes('solutions')) {
      speakTextNaturally("Here are all the amazing ways you can use Ayonix AI!");
      setTimeout(() => window.location.href = '/use-cases', 2500);
    } else if (lowerCommand.includes('company') || lowerCommand.includes('about')) {
      speakTextNaturally("Let me tell you all about Ayonix! We have a great story!");
      setTimeout(() => window.location.href = '/company', 2500);
    } else if (lowerCommand.includes('news')) {
      speakTextNaturally("Here's the latest news from Ayonix! Lots of exciting stuff!");
      setTimeout(() => window.location.href = '/news', 2500);
    } else if (lowerCommand.includes('home')) {
      speakTextNaturally("Taking you back home! Home sweet home!");
      setTimeout(() => window.location.href = '/', 2500);
    } else if (lowerCommand.match(/^(hello|hi|hey|yo|sup)/)) {
      const greetings = [
        "Hey there! I'm Aya, your friendly AI assistant! How can I help you today?",
        "Hi! So glad you're talking to me! What would you like to explore?",
        "Hello! I'm here and ready to help! What's on your mind?",
      ];
      speakTextNaturally(greetings[Math.floor(Math.random() * greetings.length)]);
    } else if (lowerCommand.includes('help')) {
      speakTextNaturally("I'm totally here to help! You can ask me to show you products, demos, use cases, or contact sales. Just say what you need and I'll make it happen!");
    } else if (lowerCommand.includes('thank')) {
      const thanks = [
        "You're so welcome! It's been awesome helping you!",
        "Aww, thank you! I love helping out! Come back anytime!",
        "My pleasure! That's what I'm here for!",
      ];
      speakTextNaturally(thanks[Math.floor(Math.random() * thanks.length)]);
    } else {
      // Default response for unrecognized commands
      const defaults = [
        "That's interesting! I can help you navigate our website. Try saying 'show me products' or 'contact sales'!",
        "Hmm, let me think about that! I can show you products, demos, or connect you with our team. What sounds good?",
        "I'd love to help with that! Try asking about our products, use cases, or demos!",
      ];
      speakTextNaturally(defaults[Math.floor(Math.random() * defaults.length)]);
    }

    setIsProcessing(false);
  };

  // Toggle listening
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        speakTextNaturally("I'm listening! What would you like to know?");
      } catch (e) {
        console.error('Failed to start recognition:', e);
      }
    }
  };

  // Toggle voice
  const toggleVoice = () => {
    if (voiceEnabled) {
      synthRef.current?.cancel();
      setIsSpeaking(false);
    }
    setVoiceEnabled(!voiceEnabled);
  };

  return (
    <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
      {/* Character Container */}
      <div className="relative w-full aspect-[3/4] max-w-sm mx-auto">
        {/* Animated Background Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-ayonix-teal/30 via-ayonix-mint/20 to-ayonix-teal-light/30 rounded-2xl"
          animate={{
            opacity: isSpeaking ? [0.5, 0.8, 0.5] : 0.3,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Character Image */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="/images/ai-assistant-character.png"
            alt="Aya - AI Assistant"
            fill
            className="object-contain"
            priority
          />

          {/* Eye Blink Overlay */}
          <AnimatePresence>
            {isBlinking && (
              <motion.div
                className="absolute top-[22%] left-[28%] w-[44%] h-[4%] flex justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.05 }}
              >
                <div className="w-[40%] h-full bg-[#f5d5c8] rounded-full" />
                <div className="w-[40%] h-full bg-[#f5d5c8] rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mouth Animation (Lip Sync) */}
          <motion.div
            className="absolute bottom-[32%] left-[43%] w-[14%] bg-gradient-to-b from-pink-300 to-red-400 rounded-full origin-center"
            style={{
              height: `${2 + mouthOpenness * 4}%`,
            }}
            animate={{
              scaleY: isSpeaking ? [0.5, 1, 0.5] : 0.3,
            }}
            transition={{
              duration: 0.15,
              repeat: isSpeaking ? Infinity : 0,
            }}
          />

          {/* Speaking Indicator */}
          {isSpeaking && (
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 items-end h-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-ayonix-teal rounded-full"
                  animate={{
                    height: ['20%', '100%', '20%'],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Listening Indicator */}
          {isListening && (
            <motion.div
              className="absolute top-4 right-4 w-4 h-4 bg-red-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          )}
        </div>
      </div>

      {/* Speech Bubble */}
      <AnimatePresence>
        {(greeting || currentMessage) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-4 py-3 shadow-lg max-w-[90%]"
          >
            <p className="text-sm text-gray-800 font-medium text-center">
              {currentMessage || greeting}
            </p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Buttons */}
      <div className="flex justify-center gap-3 mt-4">
        <Button
          onClick={toggleListening}
          size="sm"
          className={`rounded-full ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : 'bg-ayonix-teal hover:bg-ayonix-teal-dark'
          } text-white`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          <span className="ml-2 text-xs">{isListening ? 'Stop' : 'Talk'}</span>
        </Button>

        <Button
          onClick={toggleVoice}
          size="sm"
          variant="outline"
          className="rounded-full border-ayonix-teal text-ayonix-teal hover:bg-ayonix-teal hover:text-white"
        >
          {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </Button>

        <Button
          onClick={onChatOpen}
          size="sm"
          variant="outline"
          className="rounded-full border-ayonix-teal text-ayonix-teal hover:bg-ayonix-teal hover:text-white"
        >
          <MessageCircle className="w-4 h-4" />
        </Button>
      </div>

      {/* Voice Status */}
      <div className="text-center mt-3">
        <p className="text-xs text-white/70">
          {isListening ? '🎤 Listening...' : isProcessing ? '🤔 Thinking...' : isSpeaking ? '🗣️ Speaking...' : '💬 Say "Hey Aya" to start'}
        </p>
      </div>
    </div>
  );
}
