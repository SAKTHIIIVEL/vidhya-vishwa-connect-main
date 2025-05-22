
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SpeechInputProps {
  onSpeechResult: (text: string) => void;
}

const SpeechInput: React.FC<SpeechInputProps> = ({ onSpeechResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const startListening = () => {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast({
        title: "Error",
        description: "Speech recognition is not supported in your browser",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a new speech recognition instance
      const recognitionInstance = new SpeechRecognition();
      setRecognition(recognitionInstance);

      // Configure recognition
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      // Add event listeners
      recognitionInstance.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        toast({
          title: "Listening",
          description: "Speak now...",
        });
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Speech recognition result:', transcript);
        onSpeechResult(transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Error",
          description: `Speech recognition error: ${event.error}`,
          variant: "destructive",
        });
      };

      recognitionInstance.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };

      // Start recognition
      recognitionInstance.start();

    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      toast({
        title: "Error",
        description: "Failed to initialize speech recognition",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={`h-8 w-8 ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-500 hover:text-blue-500'}`}
      onClick={toggleListening}
    >
      {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </Button>
  );
};

export default SpeechInput;
