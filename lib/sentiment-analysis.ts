/**
 * Sentiment Analysis Utility
 * Analyzes text sentiment and returns positive, neutral, or negative
 */

interface SentimentScore {
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
}

// Positive words and phrases
const positiveWords = [
  'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
  'love', 'happy', 'joy', 'pleased', 'delighted', 'excited',
  'perfect', 'best', 'awesome', 'brilliant', 'outstanding',
  'success', 'achieve', 'benefit', 'advantage', 'improve',
  'help', 'support', 'solution', 'resolve', 'yes', 'absolutely',
  'certainly', 'definitely', 'congratulations', 'thank', 'thanks',
  'appreciate', 'glad', 'pleasure', 'recommend', 'efficient',
  'effective', 'innovative', 'advanced', 'powerful', 'smart'
];

// Negative words and phrases
const negativeWords = [
  'bad', 'terrible', 'horrible', 'awful', 'poor', 'worst',
  'hate', 'angry', 'sad', 'unhappy', 'disappointed', 'frustrated',
  'problem', 'issue', 'error', 'fail', 'failure', 'difficult',
  'hard', 'impossible', 'never', 'no', 'not', 'cannot',
  'unfortunate', 'sorry', 'apologize', 'worry', 'concern',
  'risk', 'threat', 'danger', 'warning', 'caution', 'avoid',
  'prevent', 'slow', 'expensive', 'costly', 'limited'
];

// Intensifiers that amplify sentiment
const intensifiers = [
  'very', 'extremely', 'incredibly', 'really', 'absolutely',
  'totally', 'completely', 'highly', 'deeply', 'truly'
];

export function analyzeSentiment(text: string): SentimentScore {
  if (!text || text.trim().length === 0) {
    return { sentiment: 'neutral', score: 0 };
  }

  const words = text.toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);

  let positiveScore = 0;
  let negativeScore = 0;
  let intensifierMultiplier = 1;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    // Check for intensifiers
    if (intensifiers.includes(word)) {
      intensifierMultiplier = 1.5;
      continue;
    }

    // Check for positive words
    if (positiveWords.includes(word)) {
      positiveScore += (1 * intensifierMultiplier);
      intensifierMultiplier = 1; // Reset
    }

    // Check for negative words
    if (negativeWords.includes(word)) {
      negativeScore += (1 * intensifierMultiplier);
      intensifierMultiplier = 1; // Reset
    }
  }

  // Calculate final score (-1 to 1)
  const totalScore = positiveScore + negativeScore;
  const normalizedScore = totalScore === 0 ? 0 : (positiveScore - negativeScore) / totalScore;

  // Determine sentiment category
  let sentiment: 'positive' | 'neutral' | 'negative';
  if (normalizedScore > 0.2) {
    sentiment = 'positive';
  } else if (normalizedScore < -0.2) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }

  return {
    sentiment,
    score: normalizedScore
  };
}

/**
 * Analyze sentiment in real-time as text is being generated
 * @param text Current text being generated
 * @returns Current sentiment
 */
export function analyzeStreamingSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const result = analyzeSentiment(text);
  return result.sentiment;
}