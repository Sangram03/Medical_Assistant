import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : ''}`}
      role="group"
      aria-label={isUser ? 'User message' : 'Assistant message'}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-500' : 'bg-gray-600'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" aria-hidden="true" />
        ) : (
          <Bot className="w-5 h-5 text-white" aria-hidden="true" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`flex-1 px-4 py-2 rounded-lg ${
          isUser
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-800 shadow-sm'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
}
