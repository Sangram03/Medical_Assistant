import React from 'react';
import { Bot, Activity, Users } from 'lucide-react';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">AI-Powered Medical Diagnosis Assistant</h1>
        <p className="text-xl mb-12">Get instant medical guidance powered by advanced AI technology</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <Bot className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Chat Support</h3>
            <p>24/7 medical guidance from our AI assistant</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <Activity className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Symptom Analysis</h3>
            <p>Advanced symptom checking and analysis</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <Users className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
            <p>Connect with qualified medical professionals</p>
          </div>
        </div>
      </div>
    </div>
  );
}