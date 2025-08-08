import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import LoadingIndicator from './LoadingIndicator';
import useGeminiAPI from '../hooks/useGeminiAPI';

const ChatContainer = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hey! I'm your DSA Instructor Bot 🔥\nAsk me anything about Data Structures, Algorithms, or coding interviews!", 
      isUser: false 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { generateResponse } = useGeminiAPI();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const history = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
      
      const response = await generateResponse(input, history);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "❌ Failed to get response. Please try again.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="chat-container overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
          {messages.map((message, index) => (
            <Message 
              key={index} 
              message={message.text} 
              isUser={message.isUser} 
            />
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 text-gray-800 rounded-2xl px-5 py-3 rounded-tl-none">
                <LoadingIndicator />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
          <div className="flex">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a DSA question..."
              className="flex-1 border rounded-l-2xl py-3 px-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="1"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`bg-blue-600 text-white px-6 rounded-r-2xl font-medium ${isLoading || !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Ask about: Time Complexity • Sorting Algorithms • Graph Traversal • Dynamic Programming • etc.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;