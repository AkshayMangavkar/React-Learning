import React, { useEffect, useRef } from 'react';
import Message from './Message';

const ChatMessages = ({ messages, isTyping, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 scroll-smooth">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {isTyping && <Message message={{ sender: 'bot' }} isTyping={true} />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;