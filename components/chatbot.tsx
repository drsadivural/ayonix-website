'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  MessageCircle,
  Loader2,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedChatbotCharacter from '@/components/animated-chatbot-character';
import { analyzeStreamingSentiment } from '@/lib/sentiment-analysis';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm ATLAS, your Ayonix AI assistant. How can I help you learn about our AI solutions today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [currentSentiment, setCurrentSentiment] = useState<'positive' | 'neutral' | 'negative'>('neutral');
  const [currentAssistantText, setCurrentAssistantText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech synthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Load voices - some browsers require this event listener
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
      };
      
      // Try loading immediately
      loadVoices();
      
      // Also listen for voiceschanged event (Chrome needs this)
      window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
      
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event?.results?.[0]?.[0]?.transcript ?? '';
        if (transcript) {
          setInput(transcript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    // Enhanced settings for high-energy, youthful 20-year-old American female voice
    utterance.rate = 1.3;   // Slightly faster for energetic delivery
    utterance.pitch = 1.5;  // Higher pitch for feminine, youthful tone
    utterance.volume = 1;

    // Prefer young, energetic female voices
    const voices = window.speechSynthesis.getVoices();
    
    // Priority 1: Google Female US voices (most reliable and natural)
    let selectedVoice = voices.find(voice => 
      voice.name.includes('Google') && 
      voice.name.includes('US') &&
      voice.name.includes('Female')
    );

    // Priority 2: Microsoft Female voices
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => 
        voice.name.includes('Microsoft') &&
        (voice.name.includes('Zira') ||
         voice.name.includes('Susan') ||
         voice.name.includes('Female'))
      );
    }

    // Priority 3: Specific known female voice names
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => {
        const name = voice.name.toLowerCase();
        return name.includes('samantha') ||
               name.includes('karen') ||
               name.includes('victoria') ||
               name.includes('moira') ||
               name.includes('tessa') ||
               name.includes('fiona') ||
               name.includes('susan') ||
               name.includes('allison') ||
               name.includes('ava') ||
               name.includes('kate');
      });
    }

    // Priority 4: Any voice with "female" in the name
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female')
      );
    }

    // Priority 5: Filter by language and use first en-US voice (usually female by default)
    if (!selectedVoice) {
      const enUSVoices = voices.filter(voice => 
        voice.lang === 'en-US' || voice.lang.startsWith('en-US')
      );
      // Use the first one if available (often default female)
      selectedVoice = enUSVoices[0];
    }

    // Priority 6: Any English voice
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log('Selected voice:', selectedVoice.name, selectedVoice.lang);
    } else {
      console.warn('No suitable voice found, using default');
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (voiceEnabled && typeof window !== 'undefined') {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let assistantMessage = '';
      let partialRead = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        partialRead += decoder.decode(value, { stream: true });
        const lines = partialRead.split('\n');
        partialRead = lines.pop() ?? '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              const content = parsed?.choices?.[0]?.delta?.content ?? '';
              if (content) {
                assistantMessage += content;
                
                // Update sentiment in real-time
                const sentiment = analyzeStreamingSentiment(assistantMessage);
                setCurrentSentiment(sentiment);
                setCurrentAssistantText(assistantMessage);
                
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage) {
                    lastMessage.content = assistantMessage;
                  }
                  return newMessages;
                });
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      // Speak the complete message
      if (assistantMessage && voiceEnabled) {
        speakText(assistantMessage);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = "I'm sorry, I encountered an error. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: errorMessage,
        },
      ]);
      if (voiceEnabled) {
        speakText(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 w-[480px] h-[750px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-blue-100"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-semibold">Chat with ATLAS</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVoice}
                className="text-white hover:bg-white/20 p-1"
                title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
              >
                {voiceEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Animated Character Section */}
          <div className="bg-gradient-to-b from-blue-50 to-white border-b border-blue-100">
            <AnimatedChatbotCharacter
              isSpeaking={isSpeaking}
              sentiment={currentSentiment}
              currentText={currentAssistantText}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleListening}
                className={`${
                  isListening ? 'bg-red-50 border-red-300' : 'border-blue-300'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 text-red-600" />
                ) : (
                  <Mic className="w-4 h-4 text-blue-600" />
                )}
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border-blue-200 focus:border-blue-400"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
