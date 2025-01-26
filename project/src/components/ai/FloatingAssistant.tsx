import React, { useState } from 'react';
import { Bot, X, Minimize2, AlertCircle } from 'lucide-react';
import AssistantChat from './AssistantChat'; // Import your chat component

// Fetch API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => setIsMinimized((prev) => !prev);

  if (!apiKey) {
    return (
      <div className="fixed bottom-6 right-6 bg-red-600 dark:bg-red-500 text-white p-4 rounded-lg shadow-lg z-40">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-6 w-6" />
          <p className="text-sm">
            Gemini API key is missing. Please set it in your{' '}
            <code className="bg-red-700 px-1 py-0.5 rounded">.env</code> file.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Floating Button when Assistant is Closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all z-40"
          aria-label="Open AI Assistant"
          title="Open AI Assistant"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div
          className={`fixed transition-all duration-300 z-40 ${
            isMinimized ? 'bottom-6 right-6 w-auto' : 'bottom-6 right-6 w-96 sm:w-[400px]'
          }`}
        >
          {/* Minimized View */}
          {isMinimized ? (
            <button
              onClick={() => setIsMinimized(false)}
              className="bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600"
              aria-label="Expand AI Assistant"
              title="Expand AI Assistant"
            >
              <Bot className="h-6 w-6" />
            </button>
          ) : (
            /* Full Chat View */
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
              {/* Header Section */}
              <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <h3 className="font-semibold dark:text-white">AI Assistant</h3>
                <div className="flex gap-2">
                  {/* Minimize Button */}
                  <button
                    onClick={toggleMinimize}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    aria-label="Minimize AI Assistant"
                    title="Minimize AI Assistant"
                  >
                    <Minimize2 className="h-5 w-5" />
                  </button>
                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    aria-label="Close AI Assistant"
                    title="Close AI Assistant"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {/* Chat Content */}
              <div className="p-4">
                <AssistantChat />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
