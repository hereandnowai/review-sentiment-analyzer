
import React, { useState, useCallback } from 'react';
import { InputForm } from './components/InputForm';
import { AnalysisResultDisplay } from './components/AnalysisResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { analyzeReviewText } from './services/geminiService';
import { AnalysisData } from './types';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysisSubmit = useCallback(async () => {
    if (!reviewText.trim()) {
      setError('Review text cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeReviewText(reviewText, topic, name);
      setAnalysis(result);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  }, [reviewText, topic, name]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Performance Review Sentiment Analyzer
        </h1>
        <p className="mt-2 text-lg text-slate-400">
          Gain insights from reviews to foster growth and fairness.
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        <InputForm
          topic={topic}
          setTopic={setTopic}
          name={name}
          setName={setName}
          reviewText={reviewText}
          setReviewText={setReviewText}
          onSubmit={handleAnalysisSubmit}
          isLoading={isLoading}
        />

        {isLoading && (
          <div className="mt-8 flex justify-center">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-700/50 border border-red-500 text-red-200 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg">Error</h3>
            <p>{error}</p>
          </div>
        )}

        {analysis && !isLoading && (
          <div className="mt-10">
            <AnalysisResultDisplay analysis={analysis} />
          </div>
        )}
      </main>
      <footer className="text-center mt-12 py-4 text-slate-500 text-sm">
        Powered by Gemini API & React
      </footer>
    </div>
  );
};

export default App;
