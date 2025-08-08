import React from 'react';

const Message = ({ message, isTyping }) => {
  if (isTyping) {
    return (
      <div className={`max-w-[80%] px-5 py-4 rounded-[25px] relative flex items-center ${
        message.sender === 'user' 
          ? 'bg-gradient-to-br from-blue-500 to-blue-700 ml-auto'
          : 'bg-gradient-to-br from-pink-500 to-pink-700 mr-auto'
      }`}>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-white rounded-full opacity-60 animate-typing"></div>
          <div className="w-2.5 h-2.5 bg-white rounded-full opacity-60 animate-typing animation-delay-400"></div>
          <div className="w-2.5 h-2.5 bg-white rounded-full opacity-60 animate-typing animation-delay-800"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-[80%] px-5 py-4 rounded-[25px] relative ${
      message.sender === 'user' 
        ? 'bg-gradient-to-br from-blue-500 to-blue-700 ml-auto rounded-br-[8px]'
        : 'bg-gradient-to-br from-pink-500 to-pink-700 mr-auto rounded-bl-[8px]'
    } shadow-md animate-messageAppear`}>
      {message.sender === 'bot' && (
        <>
          <span className="absolute top-[-10px] left-[-10px] text-xl opacity-20">❣️</span>
          <span className="absolute bottom-[-10px] right-[-10px] text-xl opacity-20">💖</span>
        </>
      )}
      <span className="message-text">{message.text}</span>
      <span className="block text-xs opacity-80 mt-1 text-right">{message.time}</span>
    </div>
  );
};

export default Message;