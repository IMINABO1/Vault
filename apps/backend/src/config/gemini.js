import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get the generative model
export const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash'
});

// Helper function to generate content
export async function generateContent(prompt) {
  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

// Helper function for chat conversations
export async function startChat(history = []) {
  const chat = geminiModel.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });
  return chat;
}

export default genAI;
