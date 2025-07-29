import { useEffect, useRef } from 'react'

export default function Message({ message }) {
  const messageRef = useRef(null)

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.classList.add('visible')
    }
  }, [])

  return (
    <div 
      ref={messageRef}
      className={`message ${message.sender}`}
    >
      <div className="message-content">
        <p>{message.text}</p>
        <span className="timestamp">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}