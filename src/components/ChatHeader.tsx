
import React from "react";
import { Avatar } from "@/components/ui/avatar";

const ChatHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-4 border-b">
      <h1 className="text-2xl font-bold mb-4">InLustro Chatbot 🤖</h1>
      <div className="flex items-center gap-2 mb-2">
        <div className="h-10 w-10 bg-cutBlue rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-3.08"></path>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
            <rect x="8" y="12" width="8" height="2"></rect>
            <rect x="8" y="16" width="8" height="2"></rect>
          </svg>
        </div>
        <div>
          <div className="font-medium">Your assistant</div>
          <div className="flex items-center text-sm">
            <span className="h-2 w-2 rounded-full bg-green-700 mr-1"></span>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
