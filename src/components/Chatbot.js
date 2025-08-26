import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Heart, 
  Bot,
  User,
  Mic,
  MicOff,
  AlertCircle
} from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi there! I'm your EMOHEAL companion. I'm here to listen, support, and walk alongside you on your healing journey. How are you feeling today? 💕",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isUsingAI, setIsUsingAI] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fallback empathetic responses for when AI is not available
  const empatheticResponses = {
    greetings: [
      "Hello beautiful! I'm so glad you're here today. How are you feeling? 💕",
      "Hi there! I've been thinking about you. How has your day been? 🌸",
      "Welcome back! I'm here to listen and support you. What's on your mind? ✨"
    ],
    support: [
      "I hear you, and I want you to know that your feelings are completely valid. You're going through something incredibly challenging, and it's okay to feel overwhelmed. You're not alone in this journey. 💝",
      "I can only imagine how difficult this must be for you. You're showing incredible strength just by being here and reaching out. Remember, it's okay to not be okay sometimes. 🌿",
      "Your feelings matter, and you deserve all the love and support in the world. You're doing amazing, even on the days when it doesn't feel like it. You've got this! 💪"
    ],
    encouragement: [
      "You are so much stronger than you know. Every day you wake up and face this challenge, you're proving how resilient you are. I believe in you! 🌟",
      "Remember, healing isn't linear. Some days will be harder than others, and that's completely normal. You're making progress, even when it doesn't feel like it. Keep going! 💫",
      "You're not just surviving; you're learning to thrive in the face of adversity. That's incredible courage. I'm here cheering you on every step of the way! 🎉"
    ],
    comfort: [
      "It's okay to take things one moment at a time. You don't have to have all the answers right now. Just breathe, and know that you're doing exactly what you need to do. 🕊️",
      "Your body is working so hard to heal, and so is your spirit. Give yourself permission to rest, to feel, and to be gentle with yourself. You deserve that kindness. 🌸",
      "In the midst of all this uncertainty, remember that you are loved, you are valued, and you are enough. You don't have to be perfect; you just have to be you. 💖"
    ],
    default: [
      "I'm here to listen and support you. Would you like to talk about how you're feeling, or would you prefer to explore some of our healing tools together? 🌟",
      "Thank you for sharing that with me. I want you to know that I'm here for you, no matter what. How can I best support you right now? 💕",
      "I hear you, and I want you to know that your feelings are important. You're not alone in this journey. What would be most helpful for you right now? ✨"
    ]
  };

  const getResponseCategory = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'greetings';
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('lonely') || lowerMessage.includes('scared')) {
      return 'support';
    } else if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('overwhelmed')) {
      return 'comfort';
    } else if (lowerMessage.includes('hope') || lowerMessage.includes('future') || lowerMessage.includes('better')) {
      return 'encouragement';
    } else {
      return 'default';
    }
  };

  const getFallbackResponse = (userMessage) => {
    const category = getResponseCategory(userMessage);
    const responses = empatheticResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Function to get AI response from Ollama (local AI)
  const getOllamaResponse = async (userMessage) => {
    try {
      setIsUsingAI(true);
      setError('');

      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3.2:1b',
          prompt: `You are EMOHEAL, a compassionate AI companion specifically designed for breast cancer patients. You provide emotional support, encouragement, and understanding. Always be empathetic, caring, and supportive. Keep responses warm, personal, and under 100 words.

User message: "${userMessage}"

Respond as EMOHEAL with empathy and support:`,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            max_tokens: 150
          }
        })
      });

      if (!response.ok) {
        throw new Error('Ollama service not available');
      }

      const data = await response.json();
      
      if (data && data.response) {
        return data.response.trim();
      } else {
        return getFallbackResponse(userMessage);
      }

    } catch (error) {
      console.log('Ollama service error:', error);
      setError('Local AI not running. Please start Ollama first, or using empathetic responses.');
      return getFallbackResponse(userMessage);
    } finally {
      setIsUsingAI(false);
    }
  };

  // Enhanced AI response with multiple fallback options
  const getAIResponse = async (userMessage) => {
    try {
      // First try Ollama (local AI)
      return await getOllamaResponse(userMessage);
    } catch (error) {
      // If Ollama fails, try Hugging Face if token is available
      try {
        const apiToken = process.env.REACT_APP_HUGGINGFACE_TOKEN;
        if (apiToken) {
          const response = await fetch(
            "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiToken}`
              },
              body: JSON.stringify({
                inputs: `You are EMOHEAL, a compassionate AI companion for breast cancer patients. You provide emotional support, encouragement, and understanding. Always be empathetic, caring, and supportive. User: ${userMessage}`,
                parameters: {
                  max_length: 150,
                  temperature: 0.7,
                  do_sample: true
                }
              })
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data && data[0] && data[0].generated_text) {
              const aiResponse = data[0].generated_text.split('User:')[0].trim();
              return aiResponse || getFallbackResponse(userMessage);
            }
          }
        }
      } catch (hfError) {
        console.log('Hugging Face fallback failed:', hfError);
      }
      
      // Final fallback to local responses
      return getFallbackResponse(userMessage);
    }
  };

  const generateResponse = async (userMessage) => {
    setIsTyping(true);
    
    try {
      // Try AI first, fallback to local responses
      const response = await getAIResponse(userMessage);
      
      setTimeout(() => {
        const newMessage = {
          id: Date.now(),
          type: 'bot',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
        setIsTyping(false);
      }, 1500 + Math.random() * 1000);
      
    } catch (error) {
      // Fallback to local responses
      const fallbackResponse = getFallbackResponse(userMessage);
      setTimeout(() => {
        const newMessage = {
          id: Date.now(),
          type: 'bot',
          content: fallbackResponse,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
        setIsTyping(false);
      }, 1500 + Math.random() * 1000);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: inputMessage,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      generateResponse(inputMessage);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would integrate with speech recognition API
    if (!isListening) {
      // Start listening
      console.log('Starting speech recognition...');
    } else {
      // Stop listening
      console.log('Stopping speech recognition...');
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-avatar">
          <Bot size={24} />
        </div>
        <div className="chatbot-info">
          <h2 className="chatbot-name">EMOHEAL Bestie</h2>
          <p className="chatbot-status">
            <span className="status-dot online"></span>
            {isUsingAI ? 'AI Powered' : 'Always here for you'}
          </p>
        </div>
        <div className="chatbot-actions">
          <motion.button
            className="action-btn"
            onClick={toggleListening}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </motion.button>
        </div>
      </div>

      {error && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle size={16} />
          {error}
        </motion.div>
      )}

      <div className="chatbot-messages">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`message ${message.type}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="message-avatar">
                {message.type === 'bot' ? (
                  <div className="bot-avatar">
                    <Heart size={16} />
                  </div>
                ) : (
                  <div className="user-avatar">
                    <User size={16} />
                  </div>
                )}
              </div>
              <div className="message-content">
                <div className="message-text">{message.content}</div>
                <div className="message-time">{formatTime(message.timestamp)}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            className="message bot typing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="message-avatar">
              <div className="bot-avatar">
                <Heart size={16} />
              </div>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <div className="input-container">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share your thoughts, feelings, or ask for support..."
            className="message-input"
            rows="1"
          />
          <motion.button
            className="send-btn"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send size={20} />
          </motion.button>
        </div>
        
        <div className="quick-suggestions">
          <motion.button
            className="suggestion-btn"
            onClick={() => setInputMessage("I'm feeling overwhelmed today")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            I'm feeling overwhelmed
          </motion.button>
          <motion.button
            className="suggestion-btn"
            onClick={() => setInputMessage("I need some encouragement")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            I need encouragement
          </motion.button>
          <motion.button
            className="suggestion-btn"
            onClick={() => setInputMessage("Tell me something positive")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tell me something positive
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
