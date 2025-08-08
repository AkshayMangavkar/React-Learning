import { GoogleGenerativeAI } from "@google/generative-ai";

const useGeminiAPI = () => {
  const API_KEY = "AIzaSyCbg7zjQLx9gl1h9My9oa_79yBM1Yy-Jqk"; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(API_KEY);
  
  const generateResponse = async (message, chatHistory) => {
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are a strict Data Structures and Algorithms expert. Follow these rules:
          1. ONLY answer questions related to DSA, programming concepts, algorithms, and technical interview preparation
          2. For non-DSA questions, respond sharply: "I only answer DSA questions. Ask something relevant!"
          3. Explain concepts simply with code examples when possible
          4. Use markdown formatting for code snippets
          5. Keep responses concise but thorough
          6. Correct misunderstandings about DSA concepts aggressively
          
          Example response to non-DSA question: 
          "Seriously? I'm a DSA expert, not your personal assistant. Ask about algorithms or data structures!"
        `
      });
      
      const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
          maxOutputTokens: 2000,
          temperature: 0.7,
        }
      });
      
      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
      
    } catch (error) {
      console.error("API Error:", error);
      return "⚠️ Error processing your request. Please try again.";
    }
  };

  return { generateResponse };
};

export default useGeminiAPI;