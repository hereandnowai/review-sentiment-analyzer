
import React from 'react';
import { AnalysisData, Sentiment } from '../types';
import { SectionCard } from './SectionCard';
import { SentimentIcon } from './SentimentIcon';

interface AnalysisResultDisplayProps {
  analysis: AnalysisData;
}

const getSentimentColor = (sentiment: Sentiment): string => {
  switch (sentiment) {
    case Sentiment.POSITIVE:
      return 'text-green-400';
    case Sentiment.NEGATIVE:
      return 'text-red-400';
    case Sentiment.NEUTRAL:
      return 'text-blue-400';
    case Sentiment.MIXED:
      return 'text-yellow-400';
    default:
      return 'text-slate-400';
  }
};

const getSentimentBorderColor = (sentiment: Sentiment): string => {
  switch (sentiment) {
    case Sentiment.POSITIVE:
      return 'border-green-500';
    case Sentiment.NEGATIVE:
      return 'border-red-500';
    case Sentiment.NEUTRAL:
      return 'border-blue-500';
    case Sentiment.MIXED:
      return 'border-yellow-500';
    default:
      return 'border-slate-500';
  }
}

export const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({ analysis }) => {
  return (
    <div className="space-y-8">
      <SectionCard title="Overall Sentiment" titleClassName="text-xl" >
        <div className={`p-6 bg-slate-800 rounded-lg shadow-lg border-l-4 ${getSentimentBorderColor(analysis.overallSentiment)} flex items-center space-x-4`}>
          <SentimentIcon sentiment={analysis.overallSentiment} className="h-10 w-10" />
          <div>
            <p className={`text-2xl font-bold ${getSentimentColor(analysis.overallSentiment)}`}>
              {analysis.overallSentiment.charAt(0).toUpperCase() + analysis.overallSentiment.slice(1).toLowerCase()}
            </p>
            {analysis.sentimentScore !== undefined && (
              <p className="text-sm text-slate-400">Score: {analysis.sentimentScore.toFixed(2)}</p>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Summary" icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
      }>
        <p className="text-slate-300 leading-relaxed">{analysis.summary}</p>
      </SectionCard>

      <SectionCard title="Key Themes" icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
      }>
        {analysis.keyThemes.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-1">
            {analysis.keyThemes.map((theme, index) => (
              <li key={index} className="bg-slate-700/50 p-2 rounded-md">{theme}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400 italic">No specific key themes identified.</p>
        )}
      </SectionCard>

      <SectionCard title="Potential Biases" icon={
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
      }>
        {analysis.potentialBiases.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-1">
            {analysis.potentialBiases.map((bias, index) => (
              <li key={index} className="bg-slate-700/50 p-2 rounded-md">{bias}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400 italic">No specific potential biases identified from the text.</p>
        )}
      </SectionCard>

      <SectionCard title="Managerial Improvement Areas" icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      }>
        {analysis.managerialImprovementAreas.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-1">
            {analysis.managerialImprovementAreas.map((area, index) => (
              <li key={index} className="bg-slate-700/50 p-2 rounded-md">{area}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400 italic">No specific improvement areas suggested.</p>
        )}
      </SectionCard>
    </div>
  );
};
