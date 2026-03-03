import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi! I'm your NeuroLens Assistant. I can explain screening parameters, guide you through the process, or answer general questions. How can I help?" }
  ]);
  const[input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const userText = text || input;
    if (!userText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and responding (In production, this calls your Python/LLM backend)
    setTimeout(() => {
      let aiResponse = "I'm here to support you! Remember, NeuroLens is an early screening tool, not a medical diagnostic system.";
      
      if (userText.toLowerCase().includes("eye tracking")) {
        aiResponse = "Eye tracking measures how accurately your child follows a moving light. Typical development often shows smooth tracking, while hesitations can be early markers we gently note.";
      } else if (userText.toLowerCase().includes("next step") || userText.toLowerCase().includes("moderate")) {
        aiResponse = "If your screening indicates a moderate risk, don't panic. This just means we noticed some behavioral markers. We highly recommend downloading the PDF report and sharing it with your pediatrician.";
      }

      setMessages(prev =>[...prev, { sender: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* The Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-[2rem] shadow-2xl border border-gray-100 mb-4 overflow-hidden flex flex-col h-[500px] animate-fade-in-up">
          
          {/* Header */}
          <div className="bg-nl-primaryTeal text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <span className="font-bold text-lg">NeuroLens Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-teal-600 p-1 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0"><Bot className="w-5 h-5"/></div>}
                <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-700 rounded-bl-none border border-gray-100'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0"><Bot className="w-5 h-5"/></div>
                <div className="p-4 rounded-2xl bg-white text-gray-700 rounded-bl-none border border-gray-100 flex gap-1 items-center shadow-sm">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 pb-2 bg-white flex gap-2 overflow-x-auto custom-scrollbar">
            <button onClick={() => handleSend("What is eye tracking?")} className="whitespace-nowrap bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-teal-100 transition-colors border border-teal-100">
              What is eye tracking?
            </button>
            <button onClick={() => handleSend("What are the next steps?")} className="whitespace-nowrap bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-teal-100 transition-colors border border-teal-100">
              What are the next steps?
            </button>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Ask anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow bg-gray-100 text-gray-700 text-sm px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all"
            />
            <button onClick={() => handleSend()} className="bg-nl-primaryTeal hover:bg-teal-600 text-white p-2.5 rounded-full shadow-md transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* The Floating Bubble Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-nl-primaryTeal text-white p-4 rounded-full shadow-2xl hover:bg-teal-600 hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      )}
    </div>
  );
}