import { useEffect, useRef } from 'react';
import './Message.css';

export default function Message({ message }) {
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.classList.add('visible');
    }
  }, []);

  // Determine if message is from current user
  const isUser = message.sender === 'user';

  return (
    <div 
      ref={messageRef}
      className={`message-container ${isUser ? 'user' : 'other'}`}
    >
      {!isUser && (
        <div className="avatar-container">
          <div className="avatar">
            {message.senderInitial || message.sender.charAt(0).toUpperCase()}
          </div>
        </div>
      )}

      <div className="message-content">
        {!isUser && <div className="sender-name">{message.senderName || message.sender}</div>}
        <div className={`bubble ${isUser ? 'user-bubble' : 'other-bubble'}`}>
          {message.text}
          {message.status && isUser && (
            <span className="message-status">
              {message.status === 'sent' ? '✓' : '✓✓'}
            </span>
          )}
        </div>
        <div className="metadata">
          <span className="timestamp">
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </span>
          {isUser && message.edited && (
            <span className="edited-indicator">(edited)</span>
          )}
        </div>
      </div>

      {isUser && (
        <div className="avatar-container user-avatar">
          <div className="avatar">
            {message.userInitial || 'Y'}
          </div>
        </div>
      )}
    </div>
  );
}