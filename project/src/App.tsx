import React, { useState } from 'react';
import { AuthProvider } from './components/auth/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SymptomChecker from './components/SymptomChecker';
import DoctorsList from './components/DoctorsList';
import BodyCheckup from './components/BodyCheckup';
import FloatingAssistant from './components/ai/FloatingAssistant';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { AlertCircle } from 'lucide-react';

// Check for API key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini AI client only if the API key exists
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-pro' });
let chat = model?.startChat();

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Stores chat messages
  const [isLoading, setIsLoading] = useState(false); // Loading state for AI response

  // Handle sending messages
  const handleSendMessage = async (content: string) => {
    if (!genAI || !model || !chat) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Please set up your Gemini API key in the .env file to use the chatbot.',
        },
      ]);
      return;
    }

    // Add user's message
    setMessages((prev) => [...prev, { role: 'user', content }]);

    // Show loading state
    setIsLoading(true);

    try {
      // Send message to Gemini API
      const result = await chat.sendMessage(content);
      const response = await result.response;
      const assistantMessage = response.text();

      // Add assistant's response
      if (assistantMessage) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: assistantMessage },
        ]);
      }
    } catch (error) {
      console.error('Error calling Gemini:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Sorry, I encountered an error while calling the Gemini API. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        {/* Main app layout */}
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navbar />
          <Hero />
          <SymptomChecker />
          <DoctorsList />
          <BodyCheckup />
          <FloatingAssistant />
        </div>

        {/* Gemini AI Assistant Chat */}
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-gray-800">
                Gemini AI Assistant
              </h1>
            </div>

            {/* API key warning */}
            {!apiKey && (
              <div className="p-4 bg-yellow-50 border-b border-yellow-100">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertCircle className="w-5 h-5" />
                  <p>
                    Please create a{' '}
                    <code className="px-1 py-0.5 bg-yellow-100 rounded">
                      .env
                    </code>{' '}
                    file in the project root and add your Gemini API key:
                  </p>
                </div>
                <pre className="mt-2 p-2 bg-yellow-100 rounded text-sm">
                  VITE_GEMINI_API_KEY=your-api-key-here
                </pre>
              </div>
            )}

            {/* Chat UI */}
            <div className="h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-8">
                    {apiKey
                      ? 'Send a message to start the conversation with Gemini.'
                      : 'Add your Gemini API key to start chatting.'}
                  </div>
                )}
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
                {isLoading && (
                  <div className="flex items-center justify-center text-gray-500">
                    <div className="animate-pulse">Gemini is thinking...</div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <ChatInput
                  onSend={handleSendMessage}
                  disabled={isLoading || !apiKey}
                />
              </div>
            </div>
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
