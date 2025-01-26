import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { commonSymptoms } from '../data/symptoms';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Fetch API key from the environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini AI client
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-pro' });

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const parseAnalysis = (response: string) => {
    const sections = response.split('**');
    const parsedResult: Record<string, string> = {};

    for (let i = 0; i < sections.length - 1; i += 2) {
      const key = sections[i].trim().replace(':', '');
      const value = sections[i + 1].trim();
      parsedResult[key] = value;
    }
    return parsedResult;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiKey || !model) {
      setAnalysis(
        'Gemini API key is missing or invalid. Please set it in the .env file to use this feature.'
      );
      return;
    }

    setLoading(true);
    setAnalysis(null); // Clear previous analysis

    try {
      const symptomDescription = [...selectedSymptoms, symptoms].join(', ');
      const chat = model.startChat();
      const result = await chat.sendMessage(
        `Analyze these symptoms and provide insights: ${symptomDescription}`
      );
      const response = await result.response;
      const assistantResponse = response.text();

      setAnalysis(assistantResponse || 'No analysis available at the moment.');
    } catch (error) {
      console.error('Error calling Gemini:', error);
      setAnalysis('An error occurred while analyzing symptoms. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  return (
    <section id="symptoms" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Symptom Checker</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Common Symptoms</h3>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedSymptoms.includes(symptom)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Describe additional symptoms
              </label>
              <textarea
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={4}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Example: I have a headache and fever for the last 2 days..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg flex items-center justify-center transition ${
                loading
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white'
              }`}
            >
              {loading ? (
                <div className="loader animate-spin rounded-full h-5 w-5 border-t-2 border-white" />
              ) : (
                <>
                  <Search className="mr-2" />
                  Analyze Symptoms
                </>
              )}
            </button>
          </form>

          {loading && (
            <div className="flex justify-center items-center mt-6">
              <div className="loader animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500" />
              <p className="ml-3 text-blue-600 dark:text-blue-300">Analyzing symptoms...</p>
            </div>
          )}

          {analysis && (
            <div className="mt-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Analysis Summary
              </h4>
              <div className="prose prose-sm dark:prose-invert">
                {Object.entries(parseAnalysis(analysis)).map(([key, value], i) => (
                  <div key={i}>
                    <h5 className="font-medium text-gray-900 dark:text-gray-200 mt-3">{key}</h5>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!apiKey && (
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/50 rounded-lg flex items-start">
              <AlertCircle className="text-yellow-600 dark:text-yellow-500 mr-2 flex-shrink-0 mt-1" />
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                Please create a <code className="px-1 py-0.5 bg-yellow-100 rounded">.env</code> file
                in the project root and add your Gemini API key:
              </p>
              <pre className="mt-2 p-2 bg-yellow-100 rounded text-sm">
                VITE_GEMINI_API_KEY=your-api-key-here
              </pre>
            </div>
          )}

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/50 rounded-lg flex items-start">
            <AlertCircle className="text-yellow-600 dark:text-yellow-500 mr-2 flex-shrink-0 mt-1" />
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              This is an AI-powered preliminary analysis tool. Always consult with a healthcare
              professional for accurate diagnosis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
