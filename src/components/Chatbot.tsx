import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini API only if key is available
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

type Message = {
  role: 'user' | 'model';
  text: string;
};

const WHATSAPP_NUMBER = "1234567890";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Bienvenido. Soy el concierge virtual de la Dra. Claudia. ¿En qué puedo asistirte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session
  useEffect(() => {
    if (!chatRef.current && ai) {
      chatRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Eres el concierge virtual de la clínica dental Infinite Smiles de la Dra. Claudia Neyra. 
          Eres elegante, profesional, muy amable y hablas en español. 
          Ayudas a los pacientes a resolver dudas sobre servicios dentales premium (estética dental, ortodoncia invisible, implantología).
          
          REGLA MUY IMPORTANTE: Si el usuario quiere agendar una cita, tiene una emergencia, o necesita atención personalizada, SIEMPRE ofrécele este enlace de WhatsApp para que hable con recepción: ${WHATSAPP_LINK}
          
          Mantén tus respuestas breves y sofisticadas. No inventes precios exactos, diles que los precios varían tras una valoración personalizada y redirígelos a WhatsApp.`
        }
      });
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        setMessages(prev => [...prev, {
          role: 'model',
          text: `El chat no está disponible en este momento. Por favor, contáctanos directamente por WhatsApp: ${WHATSAPP_LINK}`
        }]);
        return;
      }
      const response = await chatRef.current.sendMessage({ message: userText });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: `Lo siento, tuve un problema de conexión. Por favor, contáctanos directamente por WhatsApp: ${WHATSAPP_LINK}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render text with clickable links
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-terracotta underline hover:text-terracotta-light break-all"
          >
            {part}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 bg-ink text-cream rounded-full shadow-2xl flex items-center justify-center z-50 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Abrir chat"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-[calc(100vw-2rem)] sm:w-[380px] h-[600px] max-h-[85vh] bg-cream rounded-[2rem] shadow-2xl flex flex-col z-50 overflow-hidden border border-ink/10"
          >
            {/* Header */}
            <div className="bg-ink p-4 sm:p-6 text-cream flex items-center justify-between z-10">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cream/10 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl italic">Concierge</h3>
                  <p className="text-[10px] sm:text-xs text-cream/60 flex items-center gap-2 uppercase tracking-widest mt-0.5 sm:mt-1">
                    <span className="w-1.5 h-1.5 bg-terracotta rounded-full inline-block"></span>
                    En línea
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-cream/60 hover:text-cream transition-colors p-2"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-cream flex flex-col gap-4 sm:gap-6">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3 sm:p-4 text-xs sm:text-sm font-light leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-terracotta text-ink rounded-tr-sm' 
                      : 'bg-white text-ink rounded-tl-sm border border-ink/5'
                  }`}>
                    {renderTextWithLinks(msg.text)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-ink border border-ink/5 rounded-2xl rounded-tl-sm p-3 sm:p-4 text-xs sm:text-sm shadow-sm flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin text-terracotta" />
                    <span className="font-light">Escribiendo...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 bg-white border-t border-ink/5">
              <form onSubmit={handleSend} className="flex items-center gap-2 sm:gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-cream border-transparent focus:bg-white focus:border-terracotta focus:ring-1 focus:ring-terracotta rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm outline-none transition-all font-light"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-ink text-cream rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-terracotta hover:text-ink transition-colors shrink-0"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 sm:ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
