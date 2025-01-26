import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function AssistantChat() {
  const [messages, setMessages] = useState<
    Array<{ type: 'user' | 'assistant'; text: string }>
  >([
    {
      type: 'assistant',
      text: 'Hi! I can help you understand your symptoms and provide general health information. What would you like to know?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages((prev) => [...prev, { type: 'user', text: input }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          text: 'I understand your concern. Let me help you analyze that. Please provide more details about your symptoms.',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="h-[400px] flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <form onSubmit={handleSend} className="border-t dark:border-gray-700 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            aria-label="Type your message"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
