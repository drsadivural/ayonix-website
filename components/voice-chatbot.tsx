'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Send,
  MessageCircle,
  Minimize2,
  Maximize2,
  Sparkles,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { speak, stopSpeaking, getTTSConfig, TTSProvider } from '@/lib/tts-service';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface VoiceChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceChatbot({ isOpen, onClose }: VoiceChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mouthOpenness, setMouthOpenness] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [characterMood, setCharacterMood] = useState<'happy' | 'thinking' | 'talking' | 'excited'>('happy');
  const [currentProvider, setCurrentProvider] = useState<TTSProvider>('google');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lipSyncIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load TTS config on mount
  useEffect(() => {
    const config = getTTSConfig();
    setCurrentProvider(config.provider);
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handleUserMessage(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = "Hey there! I'm Aya, your AI assistant! How can I help you today?";
      setMessages([{
        id: '1',
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date()
      }]);
      
      if (voiceEnabled) {
        speakWithAnimation(welcomeMessage);
      }
    }
  }, [isOpen]);

  // Lip sync animation during speech
  const startLipSync = () => {
    if (lipSyncIntervalRef.current) {
      clearInterval(lipSyncIntervalRef.current);
    }
    
    lipSyncIntervalRef.current = setInterval(() => {
      // Create natural mouth movement pattern
      const patterns = [0, 0.3, 0.6, 0.8, 0.5, 0.2, 0.7, 0.4, 0.9, 0.3];
      const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
      setMouthOpenness(randomPattern);
    }, 80);
  };

  const stopLipSync = () => {
    if (lipSyncIntervalRef.current) {
      clearInterval(lipSyncIntervalRef.current);
      lipSyncIntervalRef.current = null;
    }
    setMouthOpenness(0);
  };

  // Speak with animation using Google Cloud TTS or ElevenLabs
  const speakWithAnimation = async (text: string) => {
    setIsSpeaking(true);
    setCharacterMood('talking');
    startLipSync();

    try {
      await speak(
        text,
        () => {
          // onStart
          setIsSpeaking(true);
          setCharacterMood('talking');
        },
        () => {
          // onEnd
          setIsSpeaking(false);
          setCharacterMood('happy');
          stopLipSync();
        }
      );
    } catch (error) {
      console.error('Speech error:', error);
      setIsSpeaking(false);
      setCharacterMood('happy');
      stopLipSync();
    }
  };

  // Generate AI response
  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Ayonix-specific responses
    if (lowerMessage.includes('atlas') || lowerMessage.includes('ai agent')) {
      return "ATLAS is our flagship AI Agent platform! It's super powerful and can handle everything from customer service to complex data analysis. Want me to tell you more about what it can do?";
    }
    
    if (lowerMessage.includes('product') || lowerMessage.includes('what do you offer')) {
      return "We've got some amazing products! There's ATLAS AI Agent for intelligent automation, ATLAS Code-Agent for developers, ATLAS Smartglass for AR experiences, Video Analytics for security, and ATLAS BOX for edge computing. Which one sounds interesting to you?";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return "For pricing details, I'd recommend reaching out to our sales team! They can give you a custom quote based on your specific needs. Want me to take you to our contact page?";
    }
    
    if (lowerMessage.includes('demo') || lowerMessage.includes('try')) {
      return "Oh, you want to see a demo? That's awesome! Head over to our Demos page and you can try out our AI agents in action. It's pretty cool, I promise!";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('sales') || lowerMessage.includes('talk to')) {
      return "Sure thing! You can reach our team at infojp@ayonix.com, or fill out the contact form on our Contact Sales page. We usually respond within 24 hours!";
    }
    
    if (lowerMessage.includes('face recognition') || lowerMessage.includes('facial')) {
      return "Our face recognition technology is top-notch! It's used in security systems, access control, and identity verification. We've got over 99.9% accuracy even in challenging conditions!";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hey hey! Great to chat with you! I'm Aya, and I'm here to help you learn about Ayonix's awesome AI solutions. What would you like to know?";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're so welcome! If you have any more questions, just ask. I'm always happy to help!";
    }
    
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Bye bye! It was great chatting with you! Come back anytime you need help with AI stuff!";
    }
    
    if (lowerMessage.includes('who are you') || lowerMessage.includes('your name')) {
      return "I'm Aya! I'm Ayonix's AI assistant. Think of me as your friendly guide to all things AI and enterprise solutions. I'm here 24/7 to help you out!";
    }
    
    if (lowerMessage.includes('company') || lowerMessage.includes('ayonix')) {
      return "Ayonix is an enterprise AI company with offices in Tokyo and Melbourne! We specialize in AI agents, face recognition, and smart automation solutions. We're helping businesses worldwide transform with AI!";
    }
    
    // Default responses with personality
    const defaultResponses = [
      "That's a great question! Let me think... For the best answer, I'd suggest checking out our products page or reaching out to our team. They're super helpful!",
      "Hmm, interesting! I'd love to help you with that. Could you tell me a bit more about what you're looking for?",
      "Ooh, that's something our team would be perfect to help with! Want me to point you to our contact page?",
      "Great question! While I might not have all the details on that, our sales team definitely can help. Should I show you how to reach them?",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Handle user message
  const handleUserMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);
    setCharacterMood('thinking');

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

    const response = generateResponse(text);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);

    if (voiceEnabled) {
      speakWithAnimation(response);
    } else {
      setCharacterMood('happy');
    }
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
      } catch (error) {
        console.error('Speech recognition error:', error);
      }
    }
  };

  // Toggle voice
  const toggleVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
      stopLipSync();
      setIsSpeaking(false);
    }
    setVoiceEnabled(!voiceEnabled);
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserMessage(inputText);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`fixed bottom-24 right-6 z-50 ${
          isMinimized ? 'w-80' : 'w-96'
        } bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-ayonix-teal to-ayonix-teal-light p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Animated Character Avatar */}
            <div className="relative w-12 h-12">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Face base */}
                <circle cx="50" cy="50" r="45" fill="#FFE4C4" stroke="#E8C4A4" strokeWidth="2" />
                
                {/* Hair */}
                <ellipse cx="50" cy="25" rx="40" ry="25" fill="#4A3728" />
                <ellipse cx="20" cy="45" rx="12" ry="20" fill="#4A3728" />
                <ellipse cx="80" cy="45" rx="12" ry="20" fill="#4A3728" />
                
                {/* Eyes */}
                <g>
                  {isBlinking ? (
                    <>
                      <line x1="30" y1="45" x2="42" y2="45" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" />
                      <line x1="58" y1="45" x2="70" y2="45" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" />
                    </>
                  ) : (
                    <>
                      <ellipse cx="36" cy="45" rx="8" ry="10" fill="white" />
                      <ellipse cx="64" cy="45" rx="8" ry="10" fill="white" />
                      <circle cx="36" cy="45" r="5" fill="#2D5A4A" />
                      <circle cx="64" cy="45" r="5" fill="#2D5A4A" />
                      <circle cx="34" cy="43" r="2" fill="white" />
                      <circle cx="62" cy="43" r="2" fill="white" />
                    </>
                  )}
                </g>
                
                {/* Blush */}
                <ellipse cx="25" cy="55" rx="8" ry="4" fill="#FFB6C1" opacity="0.5" />
                <ellipse cx="75" cy="55" rx="8" ry="4" fill="#FFB6C1" opacity="0.5" />
                
                {/* Mouth with lip sync */}
                <motion.ellipse
                  cx="50"
                  cy="65"
                  rx={isSpeaking ? 8 + mouthOpenness * 4 : 8}
                  ry={isSpeaking ? 3 + mouthOpenness * 8 : 3}
                  fill={isSpeaking ? "#FF6B6B" : "#FF8888"}
                  animate={{
                    ry: isSpeaking ? 3 + mouthOpenness * 8 : characterMood === 'happy' ? 3 : 2
                  }}
                  transition={{ duration: 0.05 }}
                />
                
                {/* Sparkle effect when excited */}
                {characterMood === 'excited' && (
                  <>
                    <motion.circle
                      cx="15" cy="30" r="3" fill="#FFD700"
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                    <motion.circle
                      cx="85" cy="30" r="3" fill="#FFD700"
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
                    />
                  </>
                )}
              </svg>
              
              {/* Status indicator */}
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                isListening ? 'bg-red-500 animate-pulse' : 
                isSpeaking ? 'bg-blue-500 animate-pulse' : 
                'bg-green-500'
              }`} />
            </div>
            
            <div>
              <h3 className="font-bold text-white">Aya</h3>
              <p className="text-xs text-white/80">
                {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : isProcessing ? 'Thinking...' : 'Online'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleVoice}
              className="text-white hover:bg-white/20"
            >
              {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-ayonix-teal text-white rounded-br-md'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-ayonix-teal rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                        className="w-2 h-2 bg-ayonix-teal rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-ayonix-teal rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Button
                  type="button"
                  variant={isListening ? 'destructive' : 'outline'}
                  size="icon"
                  onClick={toggleListening}
                  className={isListening ? 'animate-pulse' : ''}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                  disabled={isProcessing}
                />
                
                <Button
                  type="submit"
                  disabled={!inputText.trim() || isProcessing}
                  className="bg-ayonix-teal hover:bg-ayonix-teal-dark"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
              
              {/* TTS Provider indicator */}
              <div className="mt-2 text-xs text-center text-gray-400">
                Voice: {currentProvider === 'google' ? 'Google Cloud TTS' : currentProvider === 'elevenlabs' ? 'ElevenLabs' : 'Browser'}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
