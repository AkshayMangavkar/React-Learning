import React, { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChat } from '../hooks/useChat';

const ChatContainer = () => {
  const {
    messages,
    input,
    setInput,
    isTyping,
    handleSendMessage,
    handleKeyPress,
    messagesEndRef
  } = useChat();

  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Create floating hearts
    const heartCount = 20;
    const newHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      size: `${10 + Math.random() * 20}px`,
      opacity: `${0.2 + Math.random() * 0.3}`
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0d0d1a] to-[#1a1a2e] overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-pink-500/30 animate-float"
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              fontSize: heart.size,
              opacity: heart.opacity
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Welcome banner */}
      <div className="text-center py-3 bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-sm border-b border-white/10">
        <i className="fas fa-heart"></i> Chat with Anjali - Share your thoughts <i className="fas fa-heart"></i>
      </div>

      {/* Chat container */}
      <div className="max-w-4xl h-screen mx-auto flex flex-col bg-[#1a1a2e]/70 backdrop-blur-md shadow-xl border border-white/10">
        <ChatHeader />
        <ChatMessages messages={messages} isTyping={isTyping} messagesEndRef={messagesEndRef} />
        <ChatInput
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};

export default ChatContainer;