import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Sparkles, Loader2, Bot, Trash2 } from 'lucide-react';
import OpenAI from 'openai';
import type { Message, UniversalChatBotProps } from '../../types';


const STORAGE_KEY = 'universal_chat_history';

const UniversalChatBot: React.FC<UniversalChatBotProps> = ({
  apiKey,
  model,
  baseUrl = "https://api.openai.com/v1",  
  systemPrompt = "You are a helpful assistant.",
  title = "AI Assistant",
  welcomeMessage,
  primaryColor = "blue",
  language = 'en'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) setMessages(parsed);
      } catch (error) {
        console.error("Failed to parse chat history", error);
      }
    }
  }, []);

   useEffect(() => {
    if (messages.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

   useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping, isOpen]);

  const clearChat = () => {
    const confirmMsg = language === 'ar' ? 'هل أنت متأكد من مسح المحادثة؟' : 'Are you sure you want to clear chat?';
    if (window.confirm(confirmMsg)) {
      setMessages([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isTyping) return;
    
    if (!apiKey) {
      alert(language === 'ar' ? "الرجاء توفير API Key" : "Please provide an API Key");
      return;
    }

    const userMsg: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
       const openai = new OpenAI({
        baseURL: baseUrl,
        apiKey: apiKey,
        dangerouslyAllowBrowser: true  
      });

       const apiMessages = [
        { role: "system", content: systemPrompt },
        ...updatedMessages.map(m => ({ role: m.role, content: m.content }))
      ];

      const stream = await openai.chat.completions.create({
        model: model,
        messages: apiMessages as any,
        stream: true,
      });

      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      for await (const chunk of stream) {
        const chunkText = chunk.choices[0]?.delta?.content || '';
        fullResponse += chunkText;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content = fullResponse;
          return newMsgs;
        });
      }

    } catch (error: any) {
      console.error("Chat Error:", error);
      const errorMsg = language === 'ar' 
        ? `حدث خطأ: ${error.message || 'تأكد من الـ API Key والموديل'}` 
        : `Error: ${error.message || 'Check API Key and Model'}`;
        
      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

   const getBgColor = (intensity: number) => `bg-${primaryColor}-${intensity}`;
  const getTextColor = (intensity: number) => `text-${primaryColor}-${intensity}`;

  return (
    <div className={`fixed bottom-6 z-50 ${language === 'ar' ? 'left-6' : 'right-6'}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`absolute bottom-20 ${language === 'ar' ? 'left-0' : 'right-0'} w-[90vw] sm:w-[380px] h-[450px] md:h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col font-sans`}
          >
            {/* Header */}
            <div className={`p-4 ${getBgColor(600)} bg-purple-800 text-white flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                   <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">{title}</h3>
                  <p className="text-[10px] opacity-70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    {model}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={clearChat} className="hover:bg-white/10 p-2 rounded-lg transition-colors text-white/80" title="Clear">
                  <Trash2 size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors text-white">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <Sparkles size={48} className={`mb-4 ${getTextColor(400)} text-slate-400`} />
                  <p className="text-sm text-slate-500 max-w-[80%]">
                    {welcomeMessage || (language === 'ar' ? 'مرحباً، كيف يمكنني مساعدتك اليوم؟' : 'Hello! How can I help you today?')}
                  </p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-slate-200' : 'bg-slate-900 text-white'
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  
                  <div className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-slate-900 text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
                      <Bot size={14} />
                   </div>
                   <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                      <Loader2 size={16} className="animate-spin text-slate-400" />
                   </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type a message...'}
                  className="w-full bg-slate-100 text-slate-800 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-slate-900 transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-purple-800 text-white rounded-full shadow-lg shadow-slate-900/30 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
};

export default UniversalChatBot;