import React from 'react';

const ChatHeader = () => {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 flex items-center shadow-lg z-10 relative">
      <div className="w-[45px] h-[45px] rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center mr-4 border-2 border-white overflow-hidden">
        <i className="fas fa-heart text-white text-xl"></i>
      </div>
      <div className="flex-1">
        <h1 className="font-dancing text-2xl font-bold flex items-center">
          Anjali 💔<span className="ml-1">❤️</span>
        </h1>
        <div className="flex items-center text-xs mt-0.5">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
          Online - Last seen just now
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;