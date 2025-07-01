
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnalysisData, Sentiment } from '../types';

// Ensure API_KEY is available in the environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This error will be caught by the App's error handling if thrown during runtime.
  // In a real build process, this might fail the build or require a placeholder.
  console.error("API_KEY for Gemini is not set in environment variables.");
  // To prevent the app from completely breaking if API_KEY is missing, 
  // we could throw an error that is then caught by the UI.
  // For this exercise, we'll assume it's set or the app will show an error if `ai` is not initialized.
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;


const parseAnalysisData = (jsonData: any): AnalysisData => {
  // Basic validation and mapping
  const overallSentimentStr = jsonData.overallSentiment?.toUpperCase();
  let overallSentiment: Sentiment;
  switch (overallSentimentStr) {
    case 'POSITIVE': overallSentiment = Sentiment.POSITIVE; break;
    case 'NEGATIVE': overallSentiment = Sentiment.NEGATIVE; break;
    case 'NEUTRAL': overallSentiment = Sentiment.NEUTRAL; break;
    case 'MIXED': overallSentiment = Sentiment.MIXED; break;
    default: overallSentiment = Sentiment.UNKNOWN; // Fallback
  }

  return {
    overallSentiment: overallSentiment,
    sentimentScore: typeof jsonData.sentimentScore === 'number' ? jsonData.sentimentScore : undefined,
    keyThemes: Array.isArray(jsonData.keyThemes) ? jsonData.keyThemes.map(String) : [],
    potentialBiases: Array.isArray(jsonData.potentialBiases) ? jsonData.potentialBiases.map(String) : [],
    managerialImprovementAreas: Array.isArray(jsonData.managerialImprovementAreas) ? jsonData.managerialImprovementAreas.map(String) : [],
    summary: typeof jsonData.summary === 'string' ? jsonData.summary : 'Summary not available.',
  };
};


export const analyzeReviewText = async (reviewText: string, topic: string, name: string): Promise<AnalysisData> => {
  if (!ai) {
    throw new Error("Gemini API client is not initialized. Check API_KEY.");
  }

  const modelName = 'gemini-2.5-flash-preview-04-17';

  const prompt = `
    Analyze the following performance review.
    Employee Name (if provided): "${name || 'Not provided'}"
    Review Topic (if provided): "${topic || 'Not specified'}"

    Review Text:
    """
    ${reviewText}
    """

    Based on this review, provide the following information in a valid JSON format:
    1.  "overallSentiment": A single sentiment classification from the following options: POSITIVE, NEGATIVE, NEUTRAL, MIXED.
    2.  "sentimentScore": (Optional) A numerical score from -1.0 (very negative) to 1.0 (very positive). If not applicable or calculable, this can be omitted.
    3.  "keyThemes": An array of strings identifying the main themes or topics discussed in the review.
    4.  "potentialBiases": An array of strings describing any potential biases observed in the review text. Examples include:
        - Phrasing suggestive of gender bias.
        - Recency bias (focusing disproportionately on recent events).
        - Halo/horn effect (one trait overly influences overall assessment).
        Phrase these as observations (e.g., "The review heavily emphasizes recent achievements, potentially indicating recency bias.").
        If no clear biases are evident from the text alone, return an empty array or a single string element like "No specific textual indicators of bias identified." Focus solely on the provided text.
    5.  "managerialImprovementAreas": An array of actionable suggestions for managers based on the feedback provided in this review. Focus on how the manager can better support the employee (if a name is provided) or improve the review process itself.
    6.  "summary": A brief one or two-sentence summary of the review's main points.

    Ensure the output is ONLY a valid JSON object matching this structure. Do not include any explanatory text before or after the JSON.
    Example JSON structure:
    {
      "overallSentiment": "POSITIVE",
      "sentimentScore": 0.8,
      "keyThemes": ["Proactive problem-solver", "Good teamwork"],
      "potentialBiases": ["Possible recency bias focusing on recent success."],
      "managerialImprovementAreas": ["Provide more challenging projects to leverage problem-solving skills.", "Acknowledge teamwork contributions more publicly."],
      "summary": "The review is largely positive, highlighting strong problem-solving and teamwork, though it might focus heavily on recent events."
    }
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        // Omitting thinkingConfig to use default (enabled thinking for higher quality)
      },
    });

    let jsonStr = response.text.trim();
    
    // Remove Markdown fences if present (e.g., ```json ... ```)
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedJson = JSON.parse(jsonStr);
    return parseAnalysisData(parsedJson);

  } catch (error) {
    console.error('Error calling Gemini API or parsing response:', error);
    if (error instanceof Error) {
        // Check for specific Gemini API error details if available
        const geminiError = error as any; // Cast to any to check for response/details
        if (geminiError.message && geminiError.message.includes("API key not valid")) {
             throw new Error("Invalid API Key. Please check your Gemini API key configuration.");
        }
         if (geminiError.message && geminiError.message.includes("quota")) {
             throw new Error("API quota exceeded. Please check your Gemini API usage limits.");
        }
         throw new Error(`Failed to analyze review: ${error.message}`);
    }
    throw new Error('Failed to analyze review due to an unknown error.');
  }
};
