
import React, { useState, useRef } from "react";
import { Send, Image, Paperclip } from "lucide-react";
import FilePreview from "./FilePreview";
import { Button } from "@/components/ui/button";
import SpeechInput from "./SpeechInput";

interface ChatInputProps {
  onSendMessage: (message: string, file?: File | null) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() || file) {
      onSendMessage(message, file);
      setMessage("");
      setFile(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleDocumentUpload = () => {
    documentInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (documentInputRef.current) documentInputRef.current.value = "";
  };

  const handleSpeechResult = (text: string) => {
    setMessage(text);
    // Optionally send the message automatically after speech recognition
    setTimeout(() => {
      onSendMessage(text, file);
      setMessage("");
      setFile(null);
    }, 500);
  };

  return (
    <div className="border-t p-4">
      {file && <FilePreview file={file} onRemove={handleRemoveFile} />}
      
      <div className="flex items-center bg-white border rounded-lg">
        <div className="flex items-center pl-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-500 hover:text-cutBlue"
            onClick={handleImageUpload}
          >
            <Image className="h-5 w-5" />
          </Button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imageInputRef}
            onChange={handleFileChange}
          />
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-500 hover:text-cutBlue"
            onClick={handleDocumentUpload}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            ref={documentInputRef}
            onChange={handleFileChange}
          />

          <SpeechInput onSpeechResult={handleSpeechResult} />
        </div>
        
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow px-4 py-2 bg-transparent outline-none text-gray-700"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-lg bg-cutBlue text-white mr-2 hover:bg-hovBlue hover:text-white transition-colors"
          disabled={!message.trim() && !file}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
