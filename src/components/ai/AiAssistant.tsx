import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  MessageSquare,
  Send,
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  sender: "ai" | "user";
  timestamp: Date;
}

// Define types for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

// Create a type for the SpeechRecognition constructor
interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: ((event: Event) => void) | null;
  onstart: ((event: Event) => void) | null;
  onspeechend: ((event: Event) => void) | null;
  onnomatch: ((event: Event) => void) | null;
  onaudiostart: ((event: Event) => void) | null;
  onaudioend: ((event: Event) => void) | null;
  onsoundstart: ((event: Event) => void) | null;
  onsoundend: ((event: Event) => void) | null;
  onspeechstart: ((event: Event) => void) | null;
}

const AiAssistant: React.FC<{}> = () => {
  // Core state
  const [isActive, setIsActive] = useState(false); // Controls AI visibility and functionality
  const [showTextInput, setShowTextInput] = useState(false); // Show text input option
  const [showTranscript, setShowTranscript] = useState(false); // Show transcript option
  const [inputValue, setInputValue] = useState("");
  const [aiResponses, setAiResponses] = useState<string[]>([]); // Store AI responses for transcript
  const [currentAiResponse, setCurrentAiResponse] = useState(""); // Current AI response
  
  // Advanced AI state
  const [conversationHistory, setConversationHistory] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [contextMemory, setContextMemory] = useState<{[key: string]: any}>({});
  const [aiPersonality, setAiPersonality] = useState<'helpful' | 'creative' | 'concise'>('helpful');
  
  // Speech state
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [synthesisSupported, setSynthesisSupported] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");

  const navigate = useNavigate();
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check if speech recognition and synthesis are supported
  useEffect(() => {
    try {
      console.log("Checking speech recognition support...");
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      
      const isSupported = !!SpeechRecognition;
      console.log("Speech recognition supported:", isSupported);
      setRecognitionSupported(isSupported);

      // Check if speech synthesis is supported and initialize it
      if ("speechSynthesis" in window) {
        console.log("Speech synthesis is supported");
        setSynthesisSupported(true);

        // Some browsers need a user interaction to enable speech synthesis
        // This pre-loads the speech synthesis engine
        try {
          const silentUtterance = new SpeechSynthesisUtterance("");
          silentUtterance.volume = 0;
          window.speechSynthesis.speak(silentUtterance);
          console.log("Speech synthesis engine pre-loaded");
          
          // Initialize voices
          const initVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            console.log(`${voices.length} voices available`);
            
            // Find and log available English voices
            const englishVoices = voices.filter(voice => voice.lang.includes('en-'));
            console.log("Available English voices:", englishVoices.map(v => `${v.name} (${v.lang})`));
            
            // Store the best voice in a global variable for later use
            (window as any).preferredVoice = englishVoices.find(v => 
              v.name.includes('Google') || v.name.includes('Microsoft') || 
              v.name.includes('Female') || v.name.includes('en-US')
            ) || englishVoices[0] || voices[0];
            
            if ((window as any).preferredVoice) {
              console.log("Selected preferred voice:", (window as any).preferredVoice.name);
            }
          };
          
          // Chrome loads voices asynchronously
          if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = initVoices;
          } else {
            // For browsers that load voices synchronously
            setTimeout(initVoices, 500);
          }
          
        } catch (error) {
          console.error("Error pre-loading speech synthesis:", error);
        }
      } else {
        console.log("Speech synthesis is NOT supported");
        setSynthesisSupported(false);
      }
    } catch (error) {
      console.error("Error checking speech capabilities:", error);
      setRecognitionSupported(false);
      setSynthesisSupported(false);
    }
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (recognitionSupported) {
      console.log("Setting up speech recognition...");
      
      // Function to create and configure a new recognition instance
      const createNewRecognitionInstance = () => {
        try {
          console.log("Creating new speech recognition instance");
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          
          // Create a fresh instance
          const recognition = new SpeechRecognition();
          
          // Configure the instance
          recognition.continuous = false; // Changed to false for better reliability
          recognition.interimResults = true;
          recognition.lang = "en-US";
          recognition.maxAlternatives = 1;
          
          // Set up event handlers
          recognition.onstart = () => {
            console.log("Speech recognition started successfully");
            setIsListening(true);
          };
          
          recognition.onresult = (event: SpeechRecognitionEvent) => {
            console.log("Speech recognition result received", event);
            let finalTranscript = "";
            let interimTranscript = "";
            
            try {
              for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                console.log(`Result ${i}: ${transcript} (isFinal: ${event.results[i].isFinal})`);
                
                if (event.results[i].isFinal) {
                  finalTranscript += transcript;
                } else {
                  interimTranscript += transcript;
                }
              }
              
              console.log(`Final transcript: "${finalTranscript}", Interim: "${interimTranscript}"`);
              
              // Update interim transcript immediately
              if (interimTranscript) {
                setInterimTranscript(interimTranscript);
              }
              
              // Process final transcript
              if (finalTranscript) {
                console.log("Final transcript received, processing command");
                
                // Stop listening immediately
                try {
                  recognition.stop();
                  console.log("Recognition stopped after final result");
                } catch (stopError) {
                  console.error("Error stopping recognition after final result:", stopError);
                }
                
                // Set state and process command
                setIsListening(false);
                setInputValue(finalTranscript);
                setInterimTranscript("");
                
                // Process command immediately
                handleSendMessage(finalTranscript);
              }
            } catch (resultError) {
              console.error("Error processing speech recognition results:", resultError);
            }
          };
          
          recognition.onerror = (event) => {
            console.error("Speech recognition error:", event);
            setIsListening(false);
            setInterimTranscript("");
          };
          
          recognition.onend = () => {
            console.log("Speech recognition ended");
            setIsListening(false);
            
            // If we still have interim results but no final result when recognition ends,
            // treat the interim result as final
            if (interimTranscript && interimTranscript.trim() !== "") {
              console.log("Using interim transcript as final:", interimTranscript);
              const finalText = interimTranscript;
              setInterimTranscript("");
              setInputValue(finalText);
              
              // Process the command
              handleSendMessage(finalText);
            }
          };
          
          return recognition;
        } catch (error) {
          console.error("Error creating speech recognition instance:", error);
          return null;
        }
      };
      
      // Create the initial instance
      recognitionRef.current = createNewRecognitionInstance();
      
      // Expose the creation function globally for debugging
      (window as any).recreateSpeechRecognition = () => {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.abort();
          } catch (e) {
            console.error("Error aborting existing recognition:", e);
          }
        }
        recognitionRef.current = createNewRecognitionInstance();
        return "Speech recognition recreated";
      };
      
      // Expose a function to test recognition
      (window as any).testSpeechRecognition = () => {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.start();
            return "Speech recognition test started";
          } catch (e) {
            return `Error starting speech recognition: ${e}`;
          }
        } else {
          return "No speech recognition instance available";
        }
      };
    }
    
    return () => {
      console.log("Cleaning up speech recognition");
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
          console.log("Speech recognition aborted during cleanup");
        } catch (e) {
          console.error("Error cleaning up speech recognition:", e);
        }
      }
    };
  }, [recognitionSupported]);

  // Stop listening when AI is deactivated
  useEffect(() => {
    if (!isActive && isListening) {
      stopListening();
    }
  }, [isActive]);

  // Welcome message when AI is activated
  useEffect(() => {
    // Only show welcome message when AI is activated
    if (isActive) {
      // Delay the welcome message slightly to ensure speech synthesis is ready
      const welcomeMessageTimer = setTimeout(() => {
        // Welcome message
        const welcomeText = "Welcome to The Inlustro!";
        setCurrentAiResponse(welcomeText);
        setAiResponses(prev => [...prev, welcomeText]);

        // Speak the welcome message when AI is activated (unless muted)
        if (synthesisSupported && !isMutedRef.current) {
          setTimeout(() => {
            speakText(welcomeText);
          }, 300);
        }

        // After the welcome message is processed, send a follow-up message
        const followUpTimer = setTimeout(() => {
          const followUpText = "I'm your AI assistant. I can help you navigate the site, answer questions about our services, or assist with any other inquiries you might have. What would you like to know?";
          
          setCurrentAiResponse(followUpText);
          setAiResponses(prev => [...prev, followUpText]);

          // Speak the follow-up message (unless muted)
          if (synthesisSupported && !isMutedRef.current) {
            // Wait for the first message to finish speaking before starting the next one
            setTimeout(() => {
              speakText(followUpText);
            }, 1000);
          }
        }, 1500); // Reduced delay between messages

        return () => clearTimeout(followUpTimer);
      }, 300); // Small initial delay to ensure component is fully mounted

      return () => clearTimeout(welcomeMessageTimer);
    } else {
      // Stop speaking when AI is deactivated
      if (synthesisSupported) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }
  }, [isActive, synthesisSupported]);

  // Scroll functionality was removed in the new design

  // Cancel any ongoing speech when component unmounts
  useEffect(() => {
    return () => {
      if (synthesisSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [synthesisSupported]);

  const startListening = () => {
    // Don't start listening if AI is not active
    if (!isActive) {
      console.log("Cannot start listening: AI is not active");
      return;
    }
    
    if (!recognitionSupported) {
      console.log("Speech recognition not supported");
      setCurrentAiResponse("Sorry, speech recognition is not supported in your browser.");
      return;
    }
    
    if (isSpeaking) {
      console.log("Cannot start listening while speaking");
      // Stop speaking first
      if (synthesisSupported) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }
    
    console.log("Starting speech recognition...");
    
    // Clear any previous transcript
    setInterimTranscript("");
    
    // Set UI state immediately for better feedback
    setIsListening(true);
    
    // Create a fresh recognition instance for each listening session
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      // Clean up any existing instance
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
          console.log("Aborted existing recognition instance");
        } catch (e) {
          console.log("Error aborting existing recognition:", e);
        }
      }
      
      // Create a fresh instance
      recognitionRef.current = new SpeechRecognition();
      
      // Configure it
      recognitionRef.current.continuous = false; // Changed to false for better reliability
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.maxAlternatives = 1;
      
      // Set up event handlers
      recognitionRef.current.onstart = () => {
        console.log("Speech recognition started successfully");
        setIsListening(true);
      };
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        console.log("Speech recognition result received", event);
        let finalTranscript = "";
        let interimTranscript = "";
        
        try {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            console.log(`Result ${i}: ${transcript} (isFinal: ${event.results[i].isFinal})`);
            
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }
          
          console.log(`Final transcript: "${finalTranscript}", Interim: "${interimTranscript}"`);
          
          // Update interim transcript immediately
          if (interimTranscript) {
            setInterimTranscript(interimTranscript);
          }
          
          // Process final transcript
          if (finalTranscript) {
            console.log("Final transcript received, processing command");
            
            // Stop listening immediately
            try {
              recognitionRef.current?.stop();
              console.log("Recognition stopped after final result");
            } catch (stopError) {
              console.error("Error stopping recognition after final result:", stopError);
            }
            
            // Set state and process command
            setIsListening(false);
            setInputValue(finalTranscript);
            setInterimTranscript("");
            
            // Process command immediately
            handleSendMessage(finalTranscript);
          }
        } catch (resultError) {
          console.error("Error processing speech recognition results:", resultError);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event);
        setIsListening(false);
        setInterimTranscript("");
        
        // Show error message to user
        setCurrentAiResponse("Sorry, I had trouble understanding. Please try again or use text input.");
      };
      
      recognitionRef.current.onend = () => {
        console.log("Speech recognition ended");
        
        // If we still have interim results but no final result when recognition ends,
        // treat the interim result as final if it's substantial
        if (interimTranscript && interimTranscript.trim().length > 3) {
          console.log("Using interim transcript as final:", interimTranscript);
          const finalText = interimTranscript;
          setInterimTranscript("");
          setInputValue(finalText);
          setIsListening(false);
          
          // Process the command
          handleSendMessage(finalText);
        } else {
          setIsListening(false);
        }
      };
      
      // Start the recognition
      console.log("Starting new recognition instance");
      recognitionRef.current.start();
      
      // Set a timeout to stop listening if it goes on too long without results
      const timeoutId = setTimeout(() => {
        if (isListening && (!interimTranscript || interimTranscript.trim() === "")) {
          console.log("No speech detected for a while, stopping listening");
          stopListening();
          
          // Show a message to the user
          setCurrentAiResponse("I didn't hear anything. Please try again.");
          
          // Speak the message
          if (synthesisSupported) {
            setTimeout(() => {
              speakText("I didn't hear anything. Please try again.");
            }, 300);
          }
        }
      }, 6000); // 6 seconds timeout if no speech detected
      
      // Store the timeout ID for cleanup
      return () => clearTimeout(timeoutId);
      
    } catch (error) {
      console.error("Error setting up speech recognition:", error);
      setIsListening(false);
      setCurrentAiResponse("Sorry, there was an error with voice recognition. Please use text input instead.");
    }
  };

  const stopListening = () => {
    console.log("Stopping speech recognition...");
    
    // Clear any interim transcript immediately
    setInterimTranscript("");
    
    // Set listening state to false immediately for better UI feedback
    setIsListening(false);
    
    if (recognitionRef.current) {
      try {
        // Try to stop the recognition
        recognitionRef.current.stop();
        console.log("Speech recognition stopped successfully");
      } catch (error) {
        console.error("Error stopping speech recognition:", error);
        
        // If stop fails, try to abort
        try {
          recognitionRef.current.abort();
          console.log("Speech recognition aborted successfully");
        } catch (abortError) {
          console.error("Error aborting speech recognition:", abortError);
        }
      }
    } else {
      console.log("No speech recognition instance to stop");
    }
  };

  const toggleListening = () => {
    if (isListening) {
      console.log("User clicked to stop listening");
      stopListening();
      
      // Provide feedback that we stopped listening
      setCurrentAiResponse("Voice command canceled. How else can I help you?");
    } else {
      console.log("User clicked to start listening");
      
      // If AI is not active, activate it first
      if (!isActive) {
        setIsActive(true);
        
        // Start listening immediately after activation
        console.log("Activating AI and starting listening");
        setCurrentAiResponse("AI Assistant activated. I'm listening...");
        
        // Start listening with minimal delay
        setTimeout(startListening, 100);
        return;
      }
      
      // If currently speaking, stop speech first
      if (isSpeaking && synthesisSupported) {
        console.log("Stopping speech before listening");
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      
      // Show a message to the user that we're listening
      setCurrentAiResponse("I'm listening...");
      
      // Start listening immediately
      startListening();
    }
  };

  // We don't need these functions anymore since we've redesigned the UI
  // They were causing TypeScript errors because of renamed/removed variables

  // Create a ref to track the current mute state for speech functions
  const isMutedRef = useRef(isMuted);
  
  // Update the ref whenever the mute state changes
  useEffect(() => {
    isMutedRef.current = isMuted;
    
    // If muted while speaking, stop all speech
    if (isMuted && isSpeaking && synthesisSupported) {
      console.log("Mute state changed while speaking - stopping speech");
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isMuted, isSpeaking, synthesisSupported]);
  
  const speakText = (text: string) => {
    // Only speak if AI is active, synthesis is supported, not muted, and text is not empty
    if (!synthesisSupported || !isActive || !text || isMutedRef.current) {
      console.log("Speech not processed: AI inactive, synthesis not supported, muted, or empty text");
      return;
    }
    
    console.log("Speaking text:", text);
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Set speaking state immediately
    setIsSpeaking(true);

    // Pause recognition while speaking to avoid feedback loop
    if (isListening) {
      stopListening();
    }

    try {
      // Split text into sentences for more controlled speech
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
      console.log("Speaking sentences:", sentences);

      // Function to speak a single sentence
      const speakSentence = (index: number) => {
        if (index >= sentences.length) {
          // All sentences have been spoken
          console.log("All sentences completed");
          setIsSpeaking(false);
          return;
        }

        const currentSentence = sentences[index].trim();
        console.log(`Speaking sentence ${index + 1}/${sentences.length}: ${currentSentence}`);
        
        const utterance = new SpeechSynthesisUtterance(currentSentence);
        utterance.lang = "en-US";
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Use the preferred voice if available
        if ((window as any).preferredVoice) {
          utterance.voice = (window as any).preferredVoice;
        }

        // Make sure we wait for the current sentence to complete before moving to the next
        utterance.onend = () => {
          console.log(`Finished sentence ${index + 1}`);
          
          // Calculate a dynamic pause based on sentence length
          // Longer sentences need more time to process
          const sentenceLength = currentSentence.length;
          const basePause = 800; // Base pause in ms
          const additionalPausePerChar = 5; // Additional ms per character
          const maxPause = 2000; // Maximum pause in ms
          
          // Calculate pause time (longer sentences get longer pauses)
          const pauseTime = Math.min(
            basePause + (sentenceLength * additionalPausePerChar), 
            maxPause
          );
          
          console.log(`Pausing for ${pauseTime}ms after sentence of length ${sentenceLength}`);
          
          // Add a pause between sentences for more natural speech
          setTimeout(() => {
            speakSentence(index + 1);
          }, pauseTime);
        };

        utterance.onerror = (event) => {
          console.error("Speech synthesis error:", event);
          // Try to continue with the next sentence after a delay
          setTimeout(() => {
            speakSentence(index + 1);
          }, 1000);
        };

        // Start speaking with a slight delay to ensure the speech engine is ready
        setTimeout(() => {
          // Check if still active and not muted before speaking
          if (isActive && !isMutedRef.current) {
            try {
              window.speechSynthesis.speak(utterance);
              
              // Chrome bug workaround: sometimes speech synthesis stops
              // This keeps it going by periodically checking and resuming if paused
              const resumeSpeechInterval = setInterval(() => {
                // Stop speaking if muted during speech
                if (isMutedRef.current) {
                  console.log("Muted during speech - stopping");
                  window.speechSynthesis.cancel();
                  clearInterval(resumeSpeechInterval);
                  setIsSpeaking(false);
                  return;
                }
                
                if (window.speechSynthesis.paused) {
                  console.log("Speech synthesis paused, resuming...");
                  window.speechSynthesis.resume();
                }
                
                if (!window.speechSynthesis.speaking) {
                  clearInterval(resumeSpeechInterval);
                }
              }, 250);
              
              // Clear interval after a reasonable time to prevent memory leaks
              setTimeout(() => {
                clearInterval(resumeSpeechInterval);
              }, 10000); // 10 seconds max for each sentence
              
            } catch (error) {
              console.error("Error speaking:", error);
              setTimeout(() => speakSentence(index + 1), 500);
            }
          } else {
            setIsSpeaking(false);
          }
        }, 300);
      };

      // Start speaking the first sentence
      speakSentence(0);
      
    } catch (error) {
      console.error("Error in speech synthesis:", error);
      setIsSpeaking(false);
    }
  };

  // Function to generate AI response based on user input
  const generateAIResponse = (
    userInput: string
  ): { response: string; followUp?: string; action?: () => void } => {
    const lowerInput = userInput.toLowerCase();
    
    // Add user input to conversation history
    setConversationHistory(prev => [...prev, { role: 'user', content: userInput }]);
    
    // Update context memory based on user input
    const updateContextMemory = () => {
      const newContext = { ...contextMemory };
      
      // Extract and remember user's name if mentioned
      if (lowerInput.includes("my name is") || lowerInput.includes("i am ")) {
        const nameMatch = userInput.match(/my name is\s+([A-Za-z]+)/i) || 
                          userInput.match(/i am\s+([A-Za-z]+)/i);
        if (nameMatch && nameMatch[1]) {
          newContext.userName = nameMatch[1];
          console.log("Remembered user name:", nameMatch[1]);
        }
      }
      
      // Extract and remember user's role if mentioned
      if (lowerInput.includes("student") && !lowerInput.includes("login")) {
        newContext.userRole = "student";
      } else if (lowerInput.includes("tutor") && !lowerInput.includes("login")) {
        newContext.userRole = "tutor";
      } else if (lowerInput.includes("admin") && !lowerInput.includes("login")) {
        newContext.userRole = "admin";
      }
      
      // Extract and remember user's interests
      const interestKeywords = [
        "math", "science", "history", "english", "language", 
        "programming", "coding", "computer", "physics", "chemistry",
        "biology", "literature", "art", "music"
      ];
      
      interestKeywords.forEach(interest => {
        if (lowerInput.includes(interest)) {
          if (!newContext.interests) newContext.interests = [];
          if (!newContext.interests.includes(interest)) {
            newContext.interests.push(interest);
          }
        }
      });
      
      setContextMemory(newContext);
    };
    
    updateContextMemory();

    // Navigation commands
    if (
      lowerInput.includes("student login") ||
      lowerInput.includes("go to student portal")
    ) {
      return {
        response: "Okay, taking you to the Student Login page.",
        action: () => navigate("/login/student"),
      };
    } else if (
      lowerInput.includes("tutor login") ||
      lowerInput.includes("go to tutor portal")
    ) {
      return {
        response: "Sure, navigating to the Tutor Login page.",
        action: () => navigate("/login/tutor"),
      };
    } else if (
      lowerInput.includes("admin login") ||
      lowerInput.includes("go to admin portal")
    ) {
      return {
        response: "Alright, heading to the Admin Login page.",
        action: () => navigate("/login/admin"),
      };
    } else if (
      lowerInput.includes("home page") ||
      lowerInput.includes("go to home")
    ) {
      return {
        response: "Taking you to the home page!",
        action: () => navigate("/"),
      };
    }

    // Greetings
    else if (
      lowerInput.includes("hello") ||
      lowerInput.includes("hi") ||
      lowerInput.includes("hey")
    ) {
      // Personalized greeting if we know the user's name
      if (contextMemory.userName) {
        return {
          response: `Hello ${contextMemory.userName}! It's great to see you again. How can I assist you today?`,
          followUp: contextMemory.userRole 
            ? `Would you like to access your ${contextMemory.userRole} portal?`
            : "Are you a student, tutor, or administrator looking to access your portal?",
        };
      } else {
        return {
          response: "Hello there! How can I assist you today?",
          followUp:
            "Are you a student, tutor, or administrator looking to access your portal?",
        };
      }
    }

    // Questions about the assistant
    else if (lowerInput.includes("how are you")) {
      return {
        response:
          "I'm doing great, thanks for asking! I'm here to help you navigate our platform.",
        followUp:
          "Is there something specific you'd like to know about our services?",
      };
    } else if (
      lowerInput.includes("your name") ||
      lowerInput.includes("who are you")
    ) {
      return {
        response:
          "I'm the Inlustro AI Assistant, designed to help you navigate our platform and answer your questions.",
        followUp: "Would you like to know more about what I can do?",
      };
    }

    // Help requests
    else if (
      lowerInput.includes("help") ||
      lowerInput.includes("what can you do")
    ) {
      return {
        response:
          "I can help you with a variety of tasks! Here are some things I can assist with:",
        followUp:
          "• Navigate to different parts of the site (student login, tutor login, admin login, home page)\n• Answer questions about our services\n• Provide information about courses and tutoring\n• Explain how our platform works\n\nWhat would you like to know more about?",
      };
    }

    // Voice control - simplified for new design
    else if (
      lowerInput.includes("stop listening") ||
      lowerInput.includes("stop voice") ||
      lowerInput.includes("stop speaking")
    ) {
      // We'll handle this in the UI now
      return {
        response:
          "I'll stop speaking now. You can activate me again by clicking the AI button.",
      };
    } else if (
      lowerInput.includes("start listening") ||
      lowerInput.includes("start voice")
    ) {
      // We'll handle this in the UI now
      return {
        response:
          "I'm ready to help you. What would you like to know?",
      };
    }

    // Pricing
    else if (
      lowerInput.includes("price") ||
      lowerInput.includes("cost") ||
      lowerInput.includes("fee")
    ) {
      return {
        response:
          "Our pricing varies depending on the course, tutor, and session duration. We offer flexible packages to suit different needs and budgets. Many tutors also offer a free initial consultation to discuss your learning goals.",
        followUp:
          "Would you like more information about our pricing structure or payment options?",
      };
    }

    // About the platform
    else if (
      lowerInput.includes("about") ||
      lowerInput.includes("what is") ||
      lowerInput.includes("inlustro")
    ) {
      return {
        response:
          "Inlustro is an innovative educational platform connecting students with qualified tutors. Our mission is to make quality education accessible to everyone through personalized learning experiences.",
        followUp:
          "Would you like to know more about our services or how to get started?",
      };
    }

    // Courses and subjects
    else if (
      lowerInput.includes("course") ||
      lowerInput.includes("subject") ||
      lowerInput.includes("class")
    ) {
      return {
        response:
          "We offer a wide range of courses across various subjects including Mathematics, Sciences, Languages, Humanities, and more. Each course is taught by experienced tutors who specialize in their fields.",
        followUp:
          "Are you looking for a specific subject or would you like to browse our course catalog?",
      };
    }

    // Tutors
    else if (lowerInput.includes("tutor") || lowerInput.includes("teacher")) {
      return {
        response:
          "Our tutors are highly qualified professionals with extensive experience in their fields. They undergo a rigorous selection process to ensure they can provide the best learning experience for our students.",
        followUp:
          "Would you like to know how to become a tutor or how to find a tutor for a specific subject?",
      };
    }

    // Registration
    else if (
      lowerInput.includes("register") ||
      lowerInput.includes("sign up") ||
      lowerInput.includes("join")
    ) {
      return {
        response:
          "Registering with Inlustro is easy! You can sign up as a student or a tutor. The process takes just a few minutes, and you'll need to provide some basic information to get started.",
        followUp:
          "Would you like me to guide you through the registration process?",
      };
    }

    // Check for questions about courses or subjects
    else if (lowerInput.includes("course") || lowerInput.includes("subject") || lowerInput.includes("class")) {
      // If we know user's interests, personalize the response
      if (contextMemory.interests && contextMemory.interests.length > 0) {
        const interests = contextMemory.interests;
        return {
          response: `Based on your interest in ${interests.join(", ")}, I can recommend some courses that might be perfect for you.`,
          followUp: `Would you like me to show you our top-rated ${interests[0]} courses?`,
        };
      } else {
        return {
          response: "We offer a wide range of courses across various subjects including Mathematics, Science, Languages, Programming, and Arts.",
          followUp: "Is there a specific subject you're interested in learning more about?",
        };
      }
    }
    
    // Check for personality change requests
    else if (lowerInput.includes("be more creative") || lowerInput.includes("creative mode")) {
      setAiPersonality('creative');
      return {
        response: "I've switched to creative mode! I'll be more imaginative and expressive in my responses now.",
        followUp: "How can I creatively assist you today?",
      };
    }
    else if (lowerInput.includes("be more concise") || lowerInput.includes("concise mode")) {
      setAiPersonality('concise');
      return {
        response: "Concise mode activated.",
        followUp: "How can I help?",
      };
    }
    else if (lowerInput.includes("be more helpful") || lowerInput.includes("helpful mode")) {
      setAiPersonality('helpful');
      return {
        response: "I've switched to helpful mode. I'll focus on providing detailed and informative responses.",
        followUp: "What would you like help with today?",
      };
    }
    
    // Default response for unknown queries based on personality
    else {
      // Add response to conversation history
      setTimeout(() => {
        setConversationHistory(prev => [...prev, { 
          role: 'ai', 
          content: aiPersonality === 'concise' 
            ? "I don't have specific info on that yet. Can I help with something else?"
            : "That's an interesting question! While I don't have specific information on that topic yet, I'm continuously learning to better assist you."
        }]);
      }, 100);
      
      if (aiPersonality === 'concise') {
        return {
          response: "I don't have specific info on that yet. Can I help with something else?",
        };
      } else if (aiPersonality === 'creative') {
        return {
          response: "What a fascinating inquiry! While that particular knowledge hasn't been woven into my digital tapestry yet, I'm constantly expanding my horizons to better serve your curiosity.",
          followUp: "In this moment of discovery, perhaps I can illuminate other paths for you? The realms of courses, tutoring, or platform navigation await your exploration!",
        };
      } else {
        // Default helpful personality
        return {
          response: "That's an interesting question! While I don't have specific information on that topic yet, I'm continuously learning to better assist you.",
          followUp: contextMemory.userName 
            ? `In the meantime, ${contextMemory.userName}, can I help you with navigating the site, learning about our services, or connecting with a tutor?`
            : "In the meantime, can I help you with navigating the site, learning about our services, or connecting with a tutor?",
        };
      }
    }
  };

  const handleSendMessage = (text: string = inputValue) => {
    // Only process messages if AI is active and text is not empty
    if (text.trim() === "" || !isActive) {
      console.log("Message not processed: AI inactive or empty message");
      return;
    }

    // Stop any ongoing speech immediately
    if (synthesisSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    // Clear input field
    setInputValue("");
    console.log("Processing user input:", text);

    try {
      // Generate AI response immediately
      const { response, followUp, action } = generateAIResponse(text);
      console.log("AI response generated:", response);

      // Set current response and add to history immediately
      setCurrentAiResponse(response);
      setAiResponses(prev => [...prev, response]);

      // Speak the AI response immediately (unless muted)
      if (synthesisSupported && !isMutedRef.current) {
        console.log("Starting to speak main response");
        speakText(response);
      } else if (isMutedRef.current) {
        console.log("AI response muted - not speaking");
      }

      // Execute any actions (like navigation) with a shorter delay
      if (action) {
        setTimeout(() => {
          console.log("Executing action");
          action();
        }, 1500); // Reduced from 3000ms to 1500ms for faster response
      }

      // Handle follow-up message if available
      if (followUp) {
        console.log("Follow-up message available:", followUp);
        
        // Wait longer for the first response to complete
        setTimeout(() => {
          // Define a function to check if speech is finished
          const checkSpeechStatus = () => {
            if (!isSpeaking) {
              console.log("First response completed, now showing follow-up");
              
              // Add an additional delay after speech finishes before showing follow-up
              setTimeout(() => {
                setCurrentAiResponse(followUp);
                setAiResponses(prev => [...prev, followUp]);
                
                // Add another delay before speaking the follow-up (unless muted)
                if (synthesisSupported && !isMutedRef.current) {
                  setTimeout(() => {
                    console.log("Speaking follow-up message");
                    speakText(followUp);
                  }, 1000); // Wait 1 second before speaking follow-up
                } else if (isMutedRef.current) {
                  console.log("Follow-up response muted - not speaking");
                }
              }, 1500); // Wait 1.5 seconds after first response finishes
            } else {
              // Still speaking, check again after a delay
              console.log("Still speaking first response, waiting...");
              setTimeout(checkSpeechStatus, 1000);
            }
          };
          
          // Start checking speech status
          checkSpeechStatus();
        }, 3000); // Increased initial wait to 3 seconds
      }
    } catch (error) {
      console.error("Error processing message:", error);
      setCurrentAiResponse("Sorry, I encountered an error processing your request.");
    }
  };

  return (
    <>
      {/* Stylish AI icon - always visible */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={isListening ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Button
              onClick={() => {
                // Toggle AI active state
                const newActiveState = !isActive;
                setIsActive(newActiveState);
                
                if (newActiveState) {
                  // AI is being activated
                  console.log("Activating AI assistant");
                  
                  // Welcome message
                  setTimeout(() => {
                    setCurrentAiResponse("Hello! I'm your AI assistant. How can I help you today?");
                    if (synthesisSupported && !isMutedRef.current) {
                      speakText("Hello! I'm your AI assistant. How can I help you today?");
                    }
                  }, 500);
                } else {
                  // AI is being deactivated - completely shut down
                  console.log("Deactivating AI assistant");
                  
                  // Stop any ongoing speech
                  if (synthesisSupported) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                  
                  // Stop listening if active
                  if (isListening) {
                    stopListening();
                  }
                  
                  // Clear current response
                  setCurrentAiResponse("");
                }
                
                // Reset UI states when toggling
                setShowTextInput(false);
                setShowTranscript(false);
              }}
              size="icon"
              className={`rounded-full w-16 h-16 ${
                isActive 
                  ? isListening 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                    : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
              } shadow-xl mb-2 transition-all duration-300 hover:shadow-2xl hover:scale-105`}
              style={{
                boxShadow: isActive 
                  ? isListening 
                    ? '0 0 15px rgba(239, 68, 68, 0.5)' 
                    : '0 0 15px rgba(239, 68, 68, 0.3)'
                  : '0 0 15px rgba(59, 130, 246, 0.3)'
              }}
              aria-label={isActive ? "Close AI Assistant" : "Activate AI Assistant"}
            >
              {isActive ? (
                isListening ? (
                  <Mic className="h-8 w-8 text-white animate-pulse" />
                ) : (
                  <X className="h-8 w-8 text-white" />
                )
              ) : (
                <Bot className="h-8 w-8 text-white" />
              )}
            </Button>
          </motion.div>
          <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 px-4 py-1.5 rounded-full shadow-lg text-sm font-medium border border-gray-200 dark:border-gray-700">
            {isActive 
              ? isListening 
                ? "Listening..." 
                : "Close Assistant" 
              : "AI Assistant"
            }
          </div>
        </div>
      </motion.div>

      {/* Option buttons - only visible when AI is active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex flex-col items-end space-y-2"
          >
            {/* Text input option */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Button
                onClick={() => setShowTextInput(!showTextInput)}
                size="sm"
                variant={showTextInput ? "default" : "outline"}
                className="rounded-full shadow-md"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                {showTextInput ? "Hide Text Input" : "Send Text"}
              </Button>
            </motion.div>

            {/* Voice command option */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: 0.15 }}
            >
              <Button
                onClick={toggleListening}
                size="sm"
                variant={isListening ? "default" : "outline"}
                className={`rounded-full shadow-md ${isListening ? "bg-red-500 hover:bg-red-600 text-white" : ""}`}
                disabled={!recognitionSupported || isSpeaking}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4 mr-2" />
                ) : (
                  <Mic className="h-4 w-4 mr-2" />
                )}
                {isListening ? "Stop Listening" : "Voice Command"}
              </Button>
              {!recognitionSupported && (
                <div className="text-xs text-red-500 mt-1">
                  Voice recognition not supported in this browser
                </div>
              )}
            </motion.div>

            {/* Mute/Unmute option */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <Button
                onClick={() => {
                  // Toggle mute state
                  const newMuteState = !isMuted;
                  setIsMuted(newMuteState);
                  
                  // If muting while speaking, stop current speech immediately
                  if (newMuteState && isSpeaking && synthesisSupported) {
                    console.log("Muting active speech");
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                }}
                size="sm"
                variant={isMuted ? "default" : "outline"}
                className={`rounded-full shadow-md ${isMuted ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}`}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 mr-2" />
                ) : (
                  <Volume2 className="h-4 w-4 mr-2" />
                )}
                {isMuted ? "Unmute Voice" : "Mute Voice"}
              </Button>
            </motion.div>
            
            {/* Transcript option */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: 0.25 }}
            >
              <Button
                onClick={() => setShowTranscript(!showTranscript)}
                size="sm"
                variant={showTranscript ? "default" : "outline"}
                className="rounded-full shadow-md"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                {showTranscript ? "Hide Transcript" : "Get Transcript"}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text input panel */}
      <AnimatePresence>
        {isActive && showTextInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-40 right-6 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-border rounded-xl shadow-xl p-4 w-80"
          >
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="bg-white/50 dark:bg-gray-800/50 focus:ring-primary border-gray-300 dark:border-gray-700 rounded-lg"
              />
              <Button
                onClick={() => handleSendMessage()}
                size="icon"
                className="bg-primary hover:bg-primary/90 flex-shrink-0 rounded-full shadow-md transition-all duration-200 hover:scale-105"
                disabled={inputValue.trim() === ''}
              >
                <Send className="h-5 w-5 text-primary-foreground" />
              </Button>
            </div>
            {interimTranscript && (
              <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                <p className="text-xs italic text-blue-600 dark:text-blue-300">{interimTranscript}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transcript panel */}
      <AnimatePresence>
        {isActive && showTranscript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-40 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-border rounded-xl shadow-xl p-5 w-80 max-h-[400px] overflow-auto"
            style={{ 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.2)"
            }}
          >
            <div className="flex items-center mb-3">
              <MessageSquare className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-semibold">Conversation History</h3>
            </div>
            {aiResponses.length > 0 ? (
              <div className="space-y-3">
                {aiResponses.map((text, index) => (
                  <div 
                    key={index} 
                    className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700"
                    style={{
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
                    }}
                  >
                    <div className="flex items-start">
                      <Bot className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm leading-relaxed">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 text-center">
                <p className="text-sm text-muted-foreground">No responses yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status indicators */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Current AI response */}
            {currentAiResponse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-border rounded-xl shadow-xl p-5 max-w-md"
                style={{ 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.2)"
                }}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1 flex-shrink-0">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">AI Assistant</p>
                    <p className="text-sm leading-relaxed">{currentAiResponse}</p>
                  </div>
                </div>
                {isSpeaking && (
                  <div className="flex justify-center mt-3">
                    <Badge variant="outline" className="bg-blue-50/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 animate-pulse">
                      <Volume2 className="h-3 w-3 mr-1" />
                      Speaking...
                    </Badge>
                  </div>
                )}
                {isListening && (
                  <div className="flex flex-col items-center mt-3">
                    <Badge variant="outline" className="bg-red-50/80 dark:bg-red-900/30 text-red-600 dark:text-red-300 animate-pulse mb-2">
                      <Mic className="h-3 w-3 mr-1" />
                      Listening...
                    </Badge>
                    
                    {interimTranscript && (
                      <div className="w-full mt-2 p-3 bg-red-50/50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/30">
                        <p className="text-xs italic text-red-600 dark:text-red-300">"{interimTranscript}"</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Add type definitions for the Web Speech API to the Window interface
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

export default AiAssistant;