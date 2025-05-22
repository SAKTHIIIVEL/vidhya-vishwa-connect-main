
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Bot, File } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
  file?: {
    name: string;
    url: string;
    type: string;
  } | null;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp, file }) => {
  const isImage = file?.type.startsWith("image/");
  
  return (
    <div className="flex flex-col w-full mb-4">
      <div className={cn("flex items-start gap-2", isBot ? "justify-start" : "justify-end")}>
        {isBot && (
          <div className="h-8 w-8 rounded-full bg-cutBlue hover:bg-hovBlue flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
        )}
        
        <div
          className={cn(
            "px-4 py-2 rounded-lg max-w-[80%]",
            isBot
              ? "bg-slate-100 text-slate-800"
              : "bg-cutBlue text-white"
          )}
        >
          {file && (
            <div className="mb-2">
              {isImage ? (
                <div className="mb-2">
                  <img 
                    src={file.url} 
                    alt={file.name} 
                    className="rounded-md max-w-full max-h-60 object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 p-2 bg-white bg-opacity-10 rounded-md mb-2">
                  <File className="h-5 w-5" />
                  <span className="text-sm truncate">{file.name}</span>
                </div>
              )}
            </div>
          )}
          {message && <div>{message}</div>}
        </div>
        
        {!isBot && (
          <div className="bg-slate-100 text-xs text-slate-500 rounded-full px-2 py-1 mt-1">
            You
          </div>
        )}
      </div>
      <div className={cn("text-xs text-slate-500 mt-1", isBot ? "text-left" : "text-right")}>
        {timestamp}
      </div>
    </div>
  );
};

export default ChatMessage;
