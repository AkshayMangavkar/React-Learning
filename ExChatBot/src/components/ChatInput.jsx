import React from 'react';

const ChatInput = ({ input, setInput, handleSendMessage, handleKeyPress, isTyping }) => {
  return (
    <div className="flex p-4 bg-[#282846]/80 border-t border-white/10">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Message Anjali..."
        className="flex-1 px-5 py-4 border-none rounded-[30px] bg-white/10 text-white text-base outline-none transition-all focus:bg-white/15 focus:ring-2 focus:ring-pink-300 placeholder:text-white/50"
        disabled={isTyping}
      />
      <button
        onClick={handleSendMessage}
        disabled={!input.trim() || isTyping}
        className="w-[55px] h-[55px] bg-gradient-to-br from-pink-500 to-purple-500 text-white border-none rounded-full cursor-pointer ml-4 flex items-center justify-center transition-all hover:-translate-y-[3px] hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed disabled:shadow-none"
      >
        <i className="fas fa-paper-plane"></i>
      </button>
    </div>
  );
};

export default ChatInput;