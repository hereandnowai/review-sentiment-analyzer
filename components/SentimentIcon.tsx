
import React from 'react';
import { Sentiment } from '../types';

interface SentimentIconProps {
  sentiment: Sentiment;
  className?: string;
}

export const SentimentIcon: React.FC<SentimentIconProps> = ({ sentiment, className = "h-6 w-6" }) => {
  switch (sentiment) {
    case Sentiment.POSITIVE:
      return ( // CheckCircleIcon
        <svg xmlns="http://www.w3.org/2000/svg" className={`${className} text-green-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case Sentiment.NEGATIVE:
      return ( // XCircleIcon
        <svg xmlns="http://www.w3.org/2000/svg" className={`${className} text-red-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case Sentiment.NEUTRAL:
      return ( // InformationCircleIcon
        <svg xmlns="http://www.w3.org/2000/svg" className={`${className} text-blue-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case Sentiment.MIXED:
      return ( // ExclamationTriangleIcon (from Heroicons, adapted)
         <svg xmlns="http://www.w3.org/2000/svg" className={`${className} text-yellow-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    default: // UNKNOWN
      return ( // QuestionMarkCircleIcon
        <svg xmlns="http://www.w3.org/2000/svg" className={`${className} text-slate-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.755 4 3.92C16 12.805 14.914 14 12.962 14c-.99 0-1.927-.37-2.632-.962V14H9.25V9h-.022zM12 17h.01" />
           <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};
