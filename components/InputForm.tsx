
import React from 'react';

interface InputFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  name: string;
  setName: (name: string) => void;
  reviewText: string;
  setReviewText: (text: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  topic,
  setTopic,
  name,
  setName,
  reviewText,
  setReviewText,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6 border border-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-1">
            Review Topic (Optional)
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="E.g., Q3 Performance, Project Phoenix Debrief"
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-100 placeholder-slate-400 transition duration-150"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
            Employee Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g., Alex Doe"
            className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-100 placeholder-slate-400 transition duration-150"
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="reviewText" className="block text-sm font-medium text-slate-300 mb-1">
          Performance Review Text*
        </label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={10}
          placeholder="Paste or type the performance review here..."
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-100 placeholder-slate-400 transition duration-150"
          required
          disabled={isLoading}
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading || !reviewText.trim()}
        className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 group"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          <>
            Analyze Review
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};
