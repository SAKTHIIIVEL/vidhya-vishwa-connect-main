import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import VoiceAssistant from "./VoiceAssistant";
import { sendMessage } from "../services/api";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
  file?: {
    name: string;
    url: string;
    type: string;
  } | null;
}

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your friendly AI assistant.Feel free to talk to me via chat or by voice. How can I help you today?",
      isBot: true,
      timestamp: formatTimestamp(new Date()),
    },
  ]);

  const [latestBotMessage, setLatestBotMessage] = useState<string>("");
  const [shouldSpeak, setShouldSpeak] = useState<boolean>(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [initialBotMessageSpoken, setInitialBotMessageSpoken] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(generateSessionId());

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto scroll on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Detect first interaction (click)
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      if (!initialBotMessageSpoken) {
        setLatestBotMessage(messages[0].text);
        setShouldSpeak(true);
        setInitialBotMessageSpoken(true);
      }
      window.removeEventListener("click", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    return () => window.removeEventListener("click", handleFirstInteraction);
  }, [messages, initialBotMessageSpoken]);

  // Speak new bot message (not initial greeting)
  useEffect(() => {
    if (hasUserInteracted) {
      const lastBotMessage = [...messages].reverse().find(m => m.isBot);
      if (lastBotMessage && lastBotMessage.text !== messages[0].text) {
        setLatestBotMessage(lastBotMessage.text);
        setShouldSpeak(true);
      }
    }
  }, [messages]);

  useEffect(() => {
    if (shouldSpeak) {
      const timer = setTimeout(() => {
        setShouldSpeak(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [shouldSpeak]);

  const handleSendMessage = async (text: string, file: File | null = null) => {
    setHasUserInteracted(true); // Ensure typing counts as interaction
    setInitialBotMessageSpoken(true); // Prevent speaking initial greeting anymore

    let fileData = null;
    if (file) {
      fileData = {
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
      };
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: formatTimestamp(new Date()),
      file: fileData,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await sendMessage(text, file, sessionIdRef.current);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        isBot: true,
        timestamp: formatTimestamp(new Date()),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
      }, 500);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  function formatTimestamp(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  }

  function generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-[#B6CAF2] shadow-lg rounded-lg">
      
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.text}
            isBot={msg.isBot}
            timestamp={msg.timestamp}
            file={msg.file}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
      
      <VoiceAssistant
        message={latestBotMessage}
        shouldSpeak={shouldSpeak}
        hasUserInteracted={hasUserInteracted}
      />
    </div>
  );
};

export default ChatContainer;