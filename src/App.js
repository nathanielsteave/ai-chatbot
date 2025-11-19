import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Download, Copy, Check, Sparkles, MessageSquare, Zap, Brain, Globe, Cpu } from 'lucide-react';

export default function AIChatAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am your AI Assistant. Ready to explore possibilities?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState('demo'); // Ganti ke 'real' jika backend sudah siap
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const translations = {
    en: {
      title: 'Nexus AI',
      subtitle: 'Next-Gen Neural Intelligence',
      placeholder: 'Ask anything...',
      send: 'Send',
      clear: 'Clear Chat',
      export: 'Export',
      copy: 'Copy',
      copied: 'Copied!',
      thinking: 'Processing...',
      greeting: 'Hello! I\'m your AI Assistant. How can I help you today?',
      features: 'Features',
      feature1: 'Natural Conversations',
      feature2: 'Multi-Language Support',
      feature3: 'Context Awareness',
      feature4: 'Fast Responses',
      demoMode: 'Demo Mode',
      realAPI: 'Real API'
    },
    id: {
      title: 'Asisten Chat AI',
      subtitle: 'Didukung oleh Model Bahasa Neural Canggih',
      placeholder: 'Ketik pesan Anda di sini...',
      send: 'Kirim',
      clear: 'Hapus Chat',
      export: 'Ekspor',
      copy: 'Salin',
      copied: 'Tersalin!',
      thinking: 'AI sedang berpikir...',
      greeting: 'Halo! Saya Asisten AI Anda. Bagaimana saya bisa membantu Anda hari ini?',
      features: 'Fitur',
      feature1: 'Percakapan Natural',
      feature2: 'Dukungan Multi-Bahasa',
      feature3: 'Kesadaran Konteks',
      feature4: 'Respons Cepat',
      demoMode: 'Mode Demo',
      realAPI: 'API Nyata'
    },
    zh: {
      title: 'AI聊天助手',
      subtitle: '由先进的神经语言模型驱动',
      placeholder: '在此输入您的消息...',
      send: '发送',
      clear: '清空聊天',
      export: '导出',
      copy: '复制',
      copied: '已复制！',
      thinking: 'AI正在思考中...',
      greeting: '您好！我是您的AI助手。今天我能为您做些什么？',
      features: '功能特点',
      feature1: '自然对话',
      feature2: '多语言支持',
      feature3: '上下文感知',
      feature4: '快速响应',
      demoMode: '演示模式',
      realAPI: '真实API'
    }
  };

  const t = translations[language] || translations.en;

  // Demo responses based on keywords
  const getDemoResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    const responses = {
      en: {
        hello: "Hello! Nice to meet you. I'm here to assist you with any questions or tasks you might have. What would you like to talk about?",
        help: "I can help you with various tasks such as:\n• Answering questions\n• Providing explanations\n• Writing and editing text\n• Brainstorming ideas\n• Problem-solving\n• And much more!\n\nWhat specific help do you need?",
        code: "I'd be happy to help with coding! I can assist with:\n• Writing code in various languages\n• Debugging and troubleshooting\n• Explaining programming concepts\n• Code optimization\n• Best practices\n\nWhat programming challenge are you working on?",
        how: "That's a great question! I can provide detailed explanations on various topics. Could you be more specific about what you'd like to know?",
        what: "I'm an AI assistant designed to help with a wide range of tasks. I use advanced natural language processing to understand and respond to your queries. What would you like to know more about?",
        why: "That's an interesting question! The 'why' often depends on context and perspective. Could you provide more details so I can give you a thorough answer?",
        default: "That's an interesting point! I understand your question. Based on what you're asking, I'd say that this topic involves several considerations. Would you like me to elaborate on any specific aspect?"
      },
      id: {
        hello: "Halo! Senang bertemu dengan Anda. Saya di sini untuk membantu Anda dengan pertanyaan atau tugas apa pun. Apa yang ingin Anda bicarakan?",
        help: "Saya dapat membantu Anda dengan berbagai tugas seperti:\n• Menjawab pertanyaan\n• Memberikan penjelasan\n• Menulis dan mengedit teks\n• Brainstorming ide\n• Pemecahan masalah\n• Dan banyak lagi!\n\nBantuan spesifik apa yang Anda butuhkan?",
        code: "Saya senang membantu dengan coding! Saya dapat membantu dengan:\n• Menulis kode dalam berbagai bahasa\n• Debugging dan troubleshooting\n• Menjelaskan konsep pemrograman\n• Optimasi kode\n• Best practices\n\nTantangan pemrograman apa yang sedang Anda kerjakan?",
        how: "Pertanyaan yang bagus! Saya dapat memberikan penjelasan detail tentang berbagai topik. Bisakah Anda lebih spesifik tentang apa yang ingin Anda ketahui?",
        what: "Saya adalah asisten AI yang dirancang untuk membantu berbagai tugas. Saya menggunakan pemrosesan bahasa alami tingkat lanjut untuk memahami dan merespons pertanyaan Anda. Apa yang ingin Anda ketahui lebih lanjut?",
        why: "Pertanyaan yang menarik! 'Mengapa' seringkali tergantung pada konteks dan perspektif. Bisakah Anda memberikan lebih banyak detail agar saya dapat memberikan jawaban yang menyeluruh?",
        default: "Itu poin yang menarik! Saya memahami pertanyaan Anda. Berdasarkan apa yang Anda tanyakan, saya akan mengatakan bahwa topik ini melibatkan beberapa pertimbangan. Apakah Anda ingin saya menjelaskan lebih detail tentang aspek tertentu?"
      },
      zh: {
        hello: "您好！很高兴见到您。我在这里帮助您解决任何问题或任务。您想谈论什么？",
        help: "我可以帮助您完成各种任务，例如：\n• 回答问题\n• 提供解释\n• 编写和编辑文本\n• 头脑风暴\n• 解决问题\n• 还有更多！\n\n您需要什么具体帮助？",
        code: "我很乐意帮助编程！我可以协助：\n• 用各种语言编写代码\n• 调试和故障排除\n• 解释编程概念\n• 代码优化\n• 最佳实践\n\n您正在处理什么编程挑战？",
        how: "这是一个很好的问题！我可以就各种主题提供详细解释。您能更具体地说明您想了解什么吗？",
        what: "我是一个AI助手, 旨在帮助完成各种任务。我使用先进的自然语言处理来理解和回应您的查询。您想了解更多关于什么的信息？",
        why: "这是一个有趣的问题！\"为什么\"通常取决于上下文和视角。您能提供更多细节，以便我给您一个全面的答案吗？",
        default: "这是一个有趣的观点！我理解您的问题。根据您的提问，我认为这个主题涉及几个方面的考虑。您想让我详细说明任何特定方面吗？"
      }
    };

    const langResponses = responses[language];

    if (msg.includes('hello') || msg.includes('hi') || msg.includes('halo') || msg.includes('你好')) {
      return langResponses.hello;
    } else if (msg.includes('help') || msg.includes('bantu') || msg.includes('帮助')) {
      return langResponses.help;
    } else if (msg.includes('code') || msg.includes('programming') || msg.includes('kode') || msg.includes('编程')) {
      return langResponses.code;
    } else if (msg.includes('how') || msg.includes('bagaimana') || msg.includes('如何')) {
      return langResponses.how;
    } else if (msg.includes('what') || msg.includes('apa') || msg.includes('什么')) {
      return langResponses.what;
    } else if (msg.includes('why') || msg.includes('mengapa') || msg.includes('为什么')) {
      return langResponses.why;
    }

    return langResponses.default;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessageContent = input; // Simpan konten sebelum menghapus

    const userMessage = {
      role: 'user',
      content: userMessageContent,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Demo mode
    if (mode === 'demo') {
      // ... (Logika demo Anda saat ini) ...
      setTimeout(() => {
        const aiResponse = {
          role: 'assistant',
          content: getDemoResponse(userMessageContent), // Gunakan konten pesan pengguna
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, aiResponse]);
        setLoading(false);
      }, 1500);
      return;
    }

    // Real API mode (Sekarang akan memanggil backend)
    try {
      // Alamat URL backend Anda
      const API_URL = 'http://localhost:5000/api/chat';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Kirim pesan pengguna terbaru. 
          // Jika Anda ingin kesadaran konteks, Anda bisa mengirim seluruh array messages.
          user_message: userMessageContent,
          // messages: [...messages, userMessage], // Uncomment untuk konteks penuh
          language // Kirim bahasa yang dipilih
        })
      });

      // Pastikan respons berhasil (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);

    } catch (error) {
      console.error('API Error:', error);
      const errorResponse = {
        role: 'assistant',
        content: `${t.thinking.replace('...', '')} ${t.placeholder} (Error: ${error.message}). Please switch to Demo Mode or check the backend server.`,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: t.greeting,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const exportChat = () => {
    const chatText = messages.map(m =>
      `[${m.timestamp}] ${m.role === 'user' ? 'You' : 'AI'}: ${m.content}`
    ).join('\n\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${Date.now()}.txt`;
    a.click();
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#0B1120] text-slate-300 overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* Background Glow Effects (Subtle) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar (Opsional - bisa disembunyikan di mobile) */}
      <div className="w-80 hidden md:flex flex-col border-r border-slate-800/50 bg-slate-900/50 backdrop-blur-xl p-6 z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20">
            <Cpu className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Nexus<span className="text-cyan-400">AI</span></h1>
            <p className="text-xs text-slate-500 font-medium">v2.0.0 stable</p>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Settings</label>
            
            {/* Language Selector */}
            <div className="group flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                <span className="text-sm font-medium text-slate-300">Language</span>
              </div>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-right text-sm outline-none text-slate-400 cursor-pointer"
              >
                <option value="en">EN</option>
                <option value="id">ID</option>
              </select>
            </div>

            {/* Mode Selector */}
            <button 
              onClick={() => setMode(mode === 'demo' ? 'real' : 'demo')}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                mode === 'real' 
                ? 'bg-cyan-950/30 border-cyan-500/50 text-cyan-300' 
                : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Zap className={`w-5 h-5 ${mode === 'real' ? 'fill-cyan-500/20' : ''}`} />
                <span className="text-sm font-medium">{mode === 'real' ? 'Real API Active' : 'Demo Mode'}</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${mode === 'real' ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-slate-600'}`} />
            </button>
          </div>

          {/* Features List */}
          <div className="pt-6 border-t border-slate-800/50">
             <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 block">Capabilities</label>
             <div className="grid grid-cols-2 gap-3">
                {[{icon: Brain, label: 'Reasoning'}, {icon: Sparkles, label: 'Creative'}, {icon: Globe, label: 'Knowledge'}, {icon: MessageSquare, label: 'Chat'}].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/30 border border-slate-800 hover:border-slate-600 transition-colors">
                    <item.icon className="w-5 h-5 text-slate-400 mb-2" />
                    <span className="text-[10px] font-medium text-slate-500">{item.label}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
        
        <div className="mt-auto pt-6">
            <button 
            onClick={() => setMessages([])}
            className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-all border border-transparent hover:border-red-900/50">
                <Trash2 className="w-4 h-4" />
                Clear Conversation
            </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-0">
        
        {/* Header Mobile Only */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-2">
                <Cpu className="w-6 h-6 text-cyan-500" />
                <span className="font-bold text-white">NexusAI</span>
            </div>
            <div className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">{mode.toUpperCase()}</div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth">
          {messages.map((message, idx) => (
            <div key={idx} className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {/* Bot Avatar */}
              {message.role === 'assistant' && (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-900/20 flex-shrink-0 mt-1">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}

              {/* Message Bubble */}
              <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`relative px-6 py-4 rounded-2xl border ${
                  message.role === 'user'
                    ? 'bg-slate-800 text-white border-slate-700 rounded-tr-sm'
                    : 'bg-[#0f172a]/80 backdrop-blur-sm text-slate-200 border-slate-800 rounded-tl-sm shadow-sm'
                }`}>
                  <p className="text-[15px] leading-7 whitespace-pre-wrap">{message.content}</p>
                </div>
                
                {/* Metadata & Actions */}
                <div className="flex items-center gap-2 mt-2 px-1">
                    <span className="text-[10px] text-slate-500 font-medium tracking-wide">{message.timestamp}</span>
                    {message.role === 'assistant' && (
                        <button onClick={() => copyMessage(message.content)} className="text-slate-600 hover:text-cyan-400 transition-colors" title="Copy">
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                    )}
                </div>
              </div>

              {/* User Avatar */}
              {message.role === 'user' && (
                <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center border border-slate-600 flex-shrink-0 mt-1">
                  <User className="w-5 h-5 text-slate-300" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-900/20 mt-1">
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div className="px-6 py-4 rounded-2xl rounded-tl-sm bg-[#0f172a]/50 border border-slate-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-dot" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-dot" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-dot" style={{animationDelay: '300ms'}}></div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-gradient-to-t from-[#0B1120] via-[#0B1120] to-transparent z-10">
          <div className="max-w-4xl mx-auto relative group">
            {/* Glowing Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="relative flex items-end gap-2 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder={t.placeholder}
                className="w-full bg-transparent text-white placeholder-slate-500 px-4 py-3 max-h-32 min-h-[56px] outline-none resize-none text-[15px] scrollbar-thin"
                rows="1"
              />
              <div className="flex gap-2 pb-1 pr-1">
                 <button className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                    <Download className="w-5 h-5" />
                 </button>
                 <button 
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                 </button>
              </div>
            </div>
            <p className="text-center text-[10px] text-slate-600 mt-3">
                AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}