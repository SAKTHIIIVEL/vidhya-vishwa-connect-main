import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface VoiceAssistantProps {
  message?: string;
  shouldSpeak?: boolean;
  hasUserInteracted?: boolean;
}

// Voice gender preference stored in localStorage
const getStoredVoiceGender = (): 'male' | 'female' => {
  const stored = localStorage.getItem('voiceGender');
  return (stored === 'male' || stored === 'female') ? stored : 'female';
};

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ message, shouldSpeak = false, hasUserInteracted = false }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>(getStoredVoiceGender());
  const [showSettings, setShowSettings] = useState(false);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(null);
  
  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      // Auto-select voice based on gender if none selected
      if (!selectedVoiceURI) {
        const voice = selectVoice(availableVoices, voiceGender);
        if (voice) setSelectedVoiceURI(voice.voiceURI);
      }
    };

    if (window.speechSynthesis) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [voiceGender, selectedVoiceURI]);

  // Save voice gender to localStorage on change
  useEffect(() => {
    localStorage.setItem('voiceGender', voiceGender);
  }, [voiceGender]);

  // Cancel speech if tab becomes inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Speak when message or shouldSpeak changes and voice is enabled
  useEffect(() => {
    if (!shouldSpeak || !message || !isEnabled) return;

    if (!window.speechSynthesis) {
      toast({
        title: "Error",
        description: "Speech synthesis not supported in this browser",
        variant: "destructive",
      });
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);

    // Pick voice by selectedVoiceURI or fallback
    let voice = null;
    if (selectedVoiceURI) {
      voice = voices.find(v => v.voiceURI === selectedVoiceURI) || null;
    }
    if (!voice) {
      voice = selectVoice(voices, voiceGender);
    }
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = 0.9;
    utterance.pitch = voiceGender === 'female' ? 1.1 : 0.9;
    utterance.volume = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      setIsSpeaking(false);
      toast({
        title: "Speech Start",
        description: "playing speech",
        variant: "default",
      });
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Speech synthesis exception:', error);
      toast({
        title: "Error",
        description: "Could not start speech synthesis",
        variant: "destructive",
      });
    }
  }, [message, shouldSpeak, isEnabled, voices, voiceGender, selectedVoiceURI]);

  // Helper: select voice by gender heuristics
  const selectVoice = (voicesList: SpeechSynthesisVoice[], gender: 'male' | 'female'): SpeechSynthesisVoice | null => {
    const englishVoices = voicesList.filter(v => v.lang.startsWith('en'));

    // Heuristic filters
    const filteredVoices = englishVoices.filter(v => {
      const name = v.name.toLowerCase();
      if (gender === 'female') {
        return name.includes('female') || name.includes('woman') || name.includes('girl') || 
               (name.includes('google') && !name.includes('male')) || (name.includes('microsoft') && !name.includes('male'));
      } else {
        return name.includes('male') || name.includes('man') || name.includes('boy') ||
               (name.includes('google') && name.includes('male')) || (name.includes('microsoft') && name.includes('male'));
      }
    });

    if (filteredVoices.length > 0) return filteredVoices[0];
    if (englishVoices.length > 0) return englishVoices[0];
    return null;
  };

  const toggleVoiceEnabled = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setIsEnabled(!isEnabled);
    toast({
      title: isEnabled ? 'Voice Assistant Disabled' : 'Voice Assistant Enabled',
      description: isEnabled ? 'Voice assistant will no longer speak responses' : 'Voice assistant will now speak responses',
    });
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {/* Settings panel */}
      {showSettings && (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-2 w-64">
          <h4 className="font-medium text-sm mb-2">Voice Preferences</h4>
          <Select value={voiceGender} onValueChange={(value: 'male' | 'female') => setVoiceGender(value)}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select voice gender" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="female">Female Voice</SelectItem>
              <SelectItem value="male">Male Voice</SelectItem>
            </SelectContent>
          </Select>

          <h5 className="mt-4 mb-1 font-medium text-sm">Choose Voice</h5>
          <Select value={selectedVoiceURI || ''} onValueChange={(value: string) => setSelectedVoiceURI(value)}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select voice" />
            </SelectTrigger>
            <SelectContent className="bg-white max-h-40 overflow-y-auto">
              {voices.map((voice) => (
                <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Control buttons */}
      <div className="flex space-x-2">
        <Button
          variant="secondary"
          size="icon"
          className={`rounded-full shadow-lg ${isEnabled ? 'bg-cutBlue hover:bg-hovBlue text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
          onClick={toggleVoiceEnabled}
        >
          {isEnabled ? <Volume2 /> : <VolumeX />}
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-lg bg-gray-200 hover:bg-gray-300"
          onClick={toggleSettings}
        >
          <Settings />
        </Button>
      </div>
    </div>
  );
};

export default VoiceAssistant;
