'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceControllerProps {
  onOpenChat?: () => void;
}

export function VoiceController({ onOpenChat }: VoiceControllerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showIndicator, setShowIndicator] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const wakeWordDetectedRef = useRef(false);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Get young American female voice
  const getVoice = useCallback(() => {
    const voices = synthRef.current?.getVoices() || [];
    
    const voicePreferences = [
      (v: SpeechSynthesisVoice) => v.name.includes('Google') && v.name.includes('US') && v.name.includes('Female'),
      (v: SpeechSynthesisVoice) => v.name.includes('Microsoft') && (v.name.includes('Zira') || v.name.includes('Aria') || v.name.includes('Jenny')),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('samantha'),
      (v: SpeechSynthesisVoice) => v.name.toLowerCase().includes('female') && v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.lang === 'en-US',
    ];

    for (const preference of voicePreferences) {
      const voice = voices.find(preference);
      if (voice) return voice;
    }

    return voices[0];
  }, []);

  // Speak text
  const speak = useCallback((text: string) => {
    if (!voiceEnabled || !synthRef.current) return;

    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.15;
    utterance.pitch = 1.35;
    utterance.volume = 1;

    const voice = getVoice();
    if (voice) {
      utterance.voice = voice;
    }

    synthRef.current.speak(utterance);
  }, [voiceEnabled, getVoice]);

  // Handle voice commands
  const handleVoiceCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Check for wake word
    if (lowerCommand.includes('hey aya') || lowerCommand.includes('hi aya') || lowerCommand.includes('okay aya')) {
      wakeWordDetectedRef.current = true;
      speak("Yes? How can I help you?");
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 3000);
      return;
    }

    // Navigation commands
    const navigationCommands: { [key: string]: { url: string; response: string } } = {
      'go home': { url: '/', response: "Taking you home!" },
      'go to home': { url: '/', response: "Taking you home!" },
      'home page': { url: '/', response: "Here's the home page!" },
      'products': { url: '/products', response: "Here are our products!" },
      'show products': { url: '/products', response: "Let me show you our products!" },
      'show me products': { url: '/products', response: "Here are all our amazing products!" },
      'contact': { url: '/inquiry', response: "Opening the contact form!" },
      'contact sales': { url: '/inquiry', response: "Let's get you connected with sales!" },
      'inquiry': { url: '/inquiry', response: "Opening the inquiry form!" },
      'demo': { url: '/demos', response: "Let me show you our demos!" },
      'demos': { url: '/demos', response: "Here are our demos!" },
      'try demo': { url: '/demos', response: "Great choice! Let's try some demos!" },
      'use cases': { url: '/use-cases', response: "Here are our use cases!" },
      'solutions': { url: '/solutions', response: "Let me show you our solutions!" },
      'company': { url: '/company', response: "Here's information about Ayonix!" },
      'about': { url: '/company', response: "Let me tell you about Ayonix!" },
      'about us': { url: '/company', response: "Here's our company information!" },
      'news': { url: '/news', response: "Here's the latest news!" },
      'company rag': { url: '/use-cases/company-rag', response: "Here's our Company RAG solution!" },
      'employment training': { url: '/use-cases/employment-training', response: "Here's our Employment Training solution!" },
      'automated posts': { url: '/use-cases/automated-posts', response: "Here's our Automated Posts feature!" },
      'offline chatbot': { url: '/use-cases/offline-chatbot', response: "Here's our Offline Chatbot solution!" },
      'code assistant': { url: '/use-cases/code-assistant', response: "Here's our Code Assistant!" },
      'face recognition': { url: '/use-cases/face-recognition', response: "Here's our Face Recognition technology!" },
    };

    for (const [key, value] of Object.entries(navigationCommands)) {
      if (lowerCommand.includes(key)) {
        speak(value.response);
        setTimeout(() => router.push(value.url), 1500);
        setShowIndicator(true);
        setTimeout(() => setShowIndicator(false), 3000);
        return;
      }
    }

    // Scroll commands
    if (lowerCommand.includes('scroll down')) {
      window.scrollBy({ top: 500, behavior: 'smooth' });
      speak("Scrolling down!");
      return;
    }

    if (lowerCommand.includes('scroll up')) {
      window.scrollBy({ top: -500, behavior: 'smooth' });
      speak("Scrolling up!");
      return;
    }

    if (lowerCommand.includes('scroll to top') || lowerCommand.includes('go to top')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      speak("Going to the top!");
      return;
    }

    if (lowerCommand.includes('scroll to bottom') || lowerCommand.includes('go to bottom')) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      speak("Going to the bottom!");
      return;
    }

    // Open chat
    if (lowerCommand.includes('open chat') || lowerCommand.includes('chat with') || lowerCommand.includes('talk to')) {
      if (onOpenChat) {
        onOpenChat();
        speak("Opening the chat!");
      }
      return;
    }

    // Help command
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      speak("I can help you navigate the website! Try saying 'go to products', 'show me demos', 'contact sales', or 'scroll down'. You can also say 'Hey Aya' to get my attention!");
      return;
    }

    // Greeting
    if (lowerCommand.match(/^(hello|hi|hey|yo|sup)/)) {
      speak("Hey there! I'm Aya, ready to help you navigate. What would you like to see?");
      return;
    }
  }, [router, speak, onOpenChat]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const last = event.results.length - 1;
        const transcript = event.results[last][0].transcript;
        setTranscript(transcript);
        
        if (event.results[last].isFinal) {
          handleVoiceCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error !== 'no-speech') {
          setIsListening(false);
        }
      };

      recognitionRef.current.onend = () => {
        // Restart recognition to keep listening
        if (isListening) {
          try {
            recognitionRef.current?.start();
          } catch (e) {
            console.error('Failed to restart recognition:', e);
          }
        }
      };
    }
  }, [handleVoiceCommand, isListening]);

  // Toggle global listening
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      speak("Voice control disabled. Click the mic to enable again.");
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        speak("Voice control enabled! Say 'Hey Aya' to get started.");
      } catch (e) {
        console.error('Failed to start recognition:', e);
      }
    }
  };

  return (
    <>
      {/* Voice Control Toggle Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        onClick={toggleListening}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
          isListening
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-ayonix-teal hover:bg-ayonix-teal-dark'
        }`}
        title={isListening ? 'Voice control active - Click to disable' : 'Click to enable voice control'}
      >
        {isListening ? (
          <Mic className="w-5 h-5 text-white animate-pulse" />
        ) : (
          <MicOff className="w-5 h-5 text-white" />
        )}
        
        {/* Listening indicator ring */}
        {isListening && (
          <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping" />
        )}
      </motion.button>

      {/* Voice Command Indicator */}
      <AnimatePresence>
        {showIndicator && transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-20 left-6 z-50 bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-200 max-w-xs"
          >
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-ayonix-teal" />
              <span className="text-sm text-gray-700">{transcript}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Listening Status */}
      {isListening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Voice Control Active - Say "Hey Aya"
          </div>
        </motion.div>
      )}
    </>
  );
}
