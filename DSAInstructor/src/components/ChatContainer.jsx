import { useEffect } from 'react'
import Message from './Message'
import TypingIndicator from './TypingIndicator'

export default function ChatContainer({ 
  messages, 
  input, 
  setInput, 
  isTyping, 
  handleSendMessage, 
  messagesEndRef 
}) {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>DSA Instructor</h2>
        <p>Ask me anything about Data Structures and Algorithms</p>
      </div>
      
      <div className="messages-container">
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="message-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a DSA question..."
          autoFocus
        />
        <button type="submit" disabled={!input.trim()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </form>
    </div>
  )
}