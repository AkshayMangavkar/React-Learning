import { useState, useEffect, useRef } from 'react';
import { chatWithGemini } from '../utils/api';

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey Babu! 😊 Kaise ho? Kya soch rahe ho? 💭",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const { text, history } = await chatWithGemini(input, chatHistory);
      
      const botMessage = {
        id: Date.now() + 1,
        text,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      setChatHistory(history);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: `Oops! Bahut badi gadbad ho gayi, Babu. 😭 (${error.message})`,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    handleSendMessage,
    handleKeyPress,
    messagesEndRef
  };
}