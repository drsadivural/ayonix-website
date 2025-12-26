// TTS Service - Google Cloud TTS and ElevenLabs Integration

export type TTSProvider = 'browser' | 'google' | 'elevenlabs';

export interface TTSConfig {
  provider: TTSProvider;
  googleApiKey?: string;
  elevenLabsApiKey?: string;
  voiceId?: string;
  pitch?: number;
  rate?: number;
}

export interface VoiceOption {
  id: string;
  name: string;
  provider: TTSProvider;
  language: string;
  gender: 'female' | 'male' | 'neutral';
}

// Default configuration
const DEFAULT_CONFIG: TTSConfig = {
  provider: 'google',
  googleApiKey: 'AIzaSyDyB7KCLzZZaJNpP9z8DYEjQFA4uQzY6wQ',
  pitch: 1.0,
  rate: 1.0,
};

// Google Cloud TTS voices (female, young, energetic)
export const GOOGLE_VOICES: VoiceOption[] = [
  { id: 'en-US-Wavenet-F', name: 'Wavenet Female (US)', provider: 'google', language: 'en-US', gender: 'female' },
  { id: 'en-US-Wavenet-H', name: 'Wavenet Female 2 (US)', provider: 'google', language: 'en-US', gender: 'female' },
  { id: 'en-US-Neural2-F', name: 'Neural2 Female (US)', provider: 'google', language: 'en-US', gender: 'female' },
  { id: 'en-US-Neural2-H', name: 'Neural2 Female 2 (US)', provider: 'google', language: 'en-US', gender: 'female' },
  { id: 'en-US-Studio-O', name: 'Studio Female (US)', provider: 'google', language: 'en-US', gender: 'female' },
  { id: 'en-US-Journey-F', name: 'Journey Female (US)', provider: 'google', language: 'en-US', gender: 'female' },
];

// ElevenLabs voices
export const ELEVENLABS_VOICES: VoiceOption[] = [
  { id: 'EXAVITQu4vr4xnSDxMaL', name: 'Sarah (Young Female)', provider: 'elevenlabs', language: 'en-US', gender: 'female' },
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel (Female)', provider: 'elevenlabs', language: 'en-US', gender: 'female' },
  { id: 'AZnzlk1XvdvUeBnXmlld', name: 'Domi (Young Female)', provider: 'elevenlabs', language: 'en-US', gender: 'female' },
  { id: 'MF3mGyEYCl7XYWbV9V6O', name: 'Elli (Young Female)', provider: 'elevenlabs', language: 'en-US', gender: 'female' },
];

// Get TTS config from localStorage or use defaults
export function getTTSConfig(): TTSConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  
  try {
    const stored = localStorage.getItem('ayonix_tts_config');
    if (stored) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Error loading TTS config:', e);
  }
  return DEFAULT_CONFIG;
}

// Save TTS config to localStorage
export function saveTTSConfig(config: Partial<TTSConfig>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const current = getTTSConfig();
    const updated = { ...current, ...config };
    localStorage.setItem('ayonix_tts_config', JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving TTS config:', e);
  }
}

// Google Cloud TTS synthesis
async function synthesizeGoogleTTS(text: string, config: TTSConfig): Promise<ArrayBuffer | null> {
  if (!config.googleApiKey) {
    console.error('Google API key not configured');
    return null;
  }

  const voiceId = config.voiceId || 'en-US-Wavenet-F';
  
  try {
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${config.googleApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: 'en-US',
            name: voiceId,
          },
          audioConfig: {
            audioEncoding: 'MP3',
            pitch: ((config.pitch || 1.0) - 1) * 20, // Convert to Google's scale (-20 to 20)
            speakingRate: config.rate || 1.0,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Google TTS error:', error);
      return null;
    }

    const data = await response.json();
    
    // Decode base64 audio
    const binaryString = atob(data.audioContent);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (error) {
    console.error('Google TTS synthesis error:', error);
    return null;
  }
}

// ElevenLabs TTS synthesis
async function synthesizeElevenLabsTTS(text: string, config: TTSConfig): Promise<ArrayBuffer | null> {
  if (!config.elevenLabsApiKey) {
    console.error('ElevenLabs API key not configured');
    return null;
  }

  const voiceId = config.voiceId || 'EXAVITQu4vr4xnSDxMaL';
  
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': config.elevenLabsApiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('ElevenLabs TTS error:', error);
      return null;
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error('ElevenLabs TTS synthesis error:', error);
    return null;
  }
}

// Browser TTS fallback
function synthesizeBrowserTTS(text: string, config: TTSConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Browser TTS not supported'));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find a good female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => 
      v.name.includes('Female') || 
      v.name.includes('Samantha') || 
      v.name.includes('Victoria') ||
      v.name.includes('Karen') ||
      v.name.includes('Aria')
    ) || voices[0];
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.pitch = config.pitch || 1.35;
    utterance.rate = config.rate || 1.15;
    utterance.volume = 1.0;

    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);

    window.speechSynthesis.speak(utterance);
  });
}

// Main TTS speak function
export async function speak(text: string, onStart?: () => void, onEnd?: () => void): Promise<void> {
  const config = getTTSConfig();
  
  onStart?.();

  try {
    if (config.provider === 'google') {
      const audioData = await synthesizeGoogleTTS(text, config);
      if (audioData) {
        await playAudio(audioData);
        onEnd?.();
        return;
      }
      // Fallback to browser TTS if Google fails
      console.warn('Google TTS failed, falling back to browser TTS');
    } else if (config.provider === 'elevenlabs') {
      const audioData = await synthesizeElevenLabsTTS(text, config);
      if (audioData) {
        await playAudio(audioData);
        onEnd?.();
        return;
      }
      // Fallback to browser TTS if ElevenLabs fails
      console.warn('ElevenLabs TTS failed, falling back to browser TTS');
    }

    // Browser TTS fallback
    await synthesizeBrowserTTS(text, config);
    onEnd?.();
  } catch (error) {
    console.error('TTS error:', error);
    onEnd?.();
  }
}

// Play audio from ArrayBuffer
function playAudio(audioData: ArrayBuffer): Promise<void> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([audioData], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    
    audio.onended = () => {
      URL.revokeObjectURL(url);
      resolve();
    };
    
    audio.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    
    audio.play().catch(reject);
  });
}

// Stop any ongoing speech
export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Get all available voices
export function getAllVoices(): VoiceOption[] {
  return [...GOOGLE_VOICES, ...ELEVENLABS_VOICES];
}

// Get voices by provider
export function getVoicesByProvider(provider: TTSProvider): VoiceOption[] {
  switch (provider) {
    case 'google':
      return GOOGLE_VOICES;
    case 'elevenlabs':
      return ELEVENLABS_VOICES;
    default:
      return [];
  }
}
