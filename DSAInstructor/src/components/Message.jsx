import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Message.css';

export default function Message({ message }) {
  const messageRef = useRef(null);
  const isUser = message.sender === 'user';

  useEffect(() => {
    if (messageRef.current) {
      // Trigger the animation after the component mounts
      messageRef.current.style.opacity = '1';
      messageRef.current.style.transform = 'translateY(0)';
    }
  }, []);

  return (
    <div 
      ref={messageRef}
      className={`message-container ${isUser ? 'user' : 'other'}`}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
        transitionDelay: isUser ? '0.1s' : '0.2s' // slight delay for user messages
      }}
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
        <div 
          className={`bubble ${isUser ? 'user-bubble' : 'other-bubble'}`}
          style={{
            opacity: 0,
            transform: isUser ? 'translateX(10px)' : 'translateX(-10px)',
            animation: `${isUser ? 'fadeInRight' : 'fadeInLeft'} 0.3s forwards`,
            animationDelay: '0.2s'
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              table({ children }) {
                return (
                  <div className="table-container">
                    <table>{children}</table>
                  </div>
                );
              },
            }}
          >
            {message.text}
          </ReactMarkdown>

          {message.status && isUser && (
            <span className="message-status">
              {message.status === 'sent' ? '✓' : '✓✓'}
            </span>
          )}
        </div>
        <div 
          className="metadata"
          style={{
            opacity: 0,
            animation: 'fadeIn 0.3s forwards',
            animationDelay: '0.4s'
          }}
        >
          <span className="timestamp">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
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