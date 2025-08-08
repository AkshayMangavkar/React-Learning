import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCbg7zjQLx9gl1h9My9oa_79yBM1Yy-Jqk"  
});
const MODEL_NAME = "gemini-2.5-flash";
const RATE_LIMIT_DELAY = 30000;
const DAILY_LIMIT = 60;

// Local cache for common questions
const responseCache = new Map();

export default function useChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "I'm your DSA Instructor. Ask me anything about Data Structures and Algorithms!",
      sender: 'DSA Instructor',
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const messagesEndRef = useRef(null);

  // System instruction for focused DSA responses
  const systemInstruction = `You are an expert Data Structures and Algorithms (DSA) instructor. Follow these rules:
1. Only answer DSA-related questions
2. For non-DSA questions, respond like "I specialize in Data Structures and Algorithms." in many ways like this. 
3. Provide clear explanations with examples 
4. Include time/space complexity analysis
5. Format code answers properly
6. Keep responses concise but comprehensive`;

  // Auto-scroll to newest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text,
      sender: 'user',
      timestamp: new Date().toISOString()
    }]);
    setInput('');
  };

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text,
      sender: 'DSA Instructor',
      timestamp: new Date().toISOString()
    }]);
  };

  const cacheResponse = (key, value) => {
    if (responseCache.size >= 50) {
      // Remove oldest entry if cache is full
      const firstKey = responseCache.keys().next().value;
      responseCache.delete(firstKey);
    }
    responseCache.set(key, value);
  };

  const handleApiError = (error) => {
    let errorMessage = "I'm having trouble answering. Please try again.";

    if (error.message.includes('404')) {
      errorMessage = "The DSA service is currently unavailable. Please try again later.";
    } else if (error.message.includes('429') || error.message.includes('quota')) {
      errorMessage = "Too many requests. Please wait 30 seconds before asking another question.";
      setIsRateLimited(true);
      setTimeout(() => setIsRateLimited(false), RATE_LIMIT_DELAY);
    } else if (error.message.includes('API key')) {
      errorMessage = "Authentication error. Please refresh the page.";
    }

    addBotMessage(errorMessage);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    // Validate input and check limits
    if (!input.trim()) return;
    if (isRateLimited) {
      addBotMessage("Please wait 30 seconds before asking another question (rate limit)");
      return;
    }
    if (usageCount >= DAILY_LIMIT) {
      addBotMessage("Daily query limit reached. Try again tomorrow.");
      return;
    }

    // Check cache first
    const cacheKey = input.toLowerCase().trim();
    if (responseCache.has(cacheKey)) {
      addBotMessage(responseCache.get(cacheKey));
      return;
    }

    // Add user message
    addUserMessage(input);
    setIsTyping(true);

    try {
      // Create structured prompt
      const fullPrompt = `${systemInstruction}
      
      [DSA Question]
      ${input}
      
      Please provide:
      1. Concept explanation
      2. Time/Space complexity
      3. Code implementation
      4. Alternative approaches`;

      // Generate content with new API
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: fullPrompt
      });
      
      // Get response text
      const text = response.text;

      // Cache and display response
      cacheResponse(cacheKey, text);
      addBotMessage(text);
      setUsageCount(prev => prev + 1);

    } catch (error) {
      console.error("API Error:", error);
      handleApiError(error);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    isRateLimited,
    usageCount,
    dailyLimit: DAILY_LIMIT,
    handleSendMessage,
    messagesEndRef
  };
}