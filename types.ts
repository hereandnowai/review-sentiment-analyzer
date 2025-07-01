
export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  MIXED = 'MIXED',
  UNKNOWN = 'UNKNOWN' 
}

export interface AnalysisData {
  overallSentiment: Sentiment;
  sentimentScore?: number; // e.g., -1.0 to 1.0
  keyThemes: string[];
  potentialBiases: string[];
  managerialImprovementAreas: string[];
  summary: string;
}
