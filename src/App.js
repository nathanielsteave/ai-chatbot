import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Download, Copy, Check, Sparkles, MessageSquare, Zap, Brain, Globe } from 'lucide-react';

export default function AIChatAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState('demo');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const translations = {
    en: {
      title: 'AI Chat Assistant',
      subtitle: 'Powered by Advanced Neural Language Models',
      placeholder: 'Type your message here...',
      send: 'Send',
      clear: 'Clear Chat',
      export: 'Export',
      copy: 'Copy',
      copied: 'Copied!',
      thinking: 'AI is thinking...',
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

  const t = translations[language];

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

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Demo mode
    if (mode === 'demo') {
      setTimeout(() => {
        const aiResponse = {
          role: 'assistant',
          content: getDemoResponse(input),
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, aiResponse]);
        setLoading(false);
      }, 1500);
      return;
    }

    // Real API mode (placeholder - would need backend)
    try {
      // This would connect to your backend API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          language
        })
      });
      
      const data = await response.json();
      const aiResponse = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorResponse = {
        role: 'assistant',
        content: 'Sorry, there was an error connecting to the API. Please try demo mode.',
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 h-screen flex flex-col p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <Bot className="w-12 h-12 text-cyan-400" />
                  <div className="absolute inset-0 blur-xl bg-cyan-400/50 animate-pulse"></div>
                </div>
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  {t.title}
                </h1>
              </div>
              <p className="text-purple-200 ml-16 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {t.subtitle}
              </p>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-purple-500/30 rounded-xl px-3 py-2">
                <Globe className="w-5 h-5 text-purple-300" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-white border-none outline-none cursor-pointer font-medium text-sm"
                >
                  <option value="en" className="bg-gray-900">English</option>
                  <option value="id" className="bg-gray-900">Indonesia</option>
                  <option value="zh" className="bg-gray-900">中文</option>
                </select>
              </div>

              <button
                onClick={() => setMode(mode === 'demo' ? 'real' : 'demo')}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  mode === 'real'
                    ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                    : 'bg-purple-500/20 border border-purple-500/50 text-purple-300'
                }`}
              >
                {mode === 'real' ? t.realAPI : t.demoMode}
              </button>
            </div>
          </div>

          {/* Features Bar */}
          <div className="grid grid-cols-4 gap-3 mt-6">
            {[
              { icon: MessageSquare, text: t.feature1, color: 'from-blue-500 to-cyan-500' },
              { icon: Globe, text: t.feature2, color: 'from-purple-500 to-pink-500' },
              { icon: Brain, text: t.feature3, color: 'from-green-500 to-emerald-500' },
              { icon: Zap, text: t.feature4, color: 'from-yellow-500 to-orange-500' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-3 hover:border-purple-500/50 transition-all">
                <feature.icon className={`w-6 h-6 mb-1 bg-gradient-to-r ${feature.color} text-white`} />
                <p className="text-gray-300 text-xs font-medium">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-pink-500 to-purple-500'
                    : 'bg-gradient-to-br from-cyan-500 to-blue-500'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`flex-1 max-w-3xl ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`rounded-2xl px-5 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-white/10 text-gray-100 backdrop-blur-xl border border-white/20'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1 px-2">
                    <span className="text-xs text-purple-300">{message.timestamp}</span>
                    {message.role === 'assistant' && (
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="text-purple-300 hover:text-white transition-colors"
                      >
                        {copied ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 p-4 bg-black/20 backdrop-blur-xl">
            <div className="flex gap-3 items-end">
              <div className="flex-1 bg-white/10 rounded-xl border border-purple-500/30 focus-within:border-purple-500/50 transition-all">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t.placeholder}
                  className="w-full bg-transparent text-white px-4 py-3 outline-none resize-none"
                  rows="2"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={clearChat}
                  className="p-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl transition-all"
                  title={t.clear}
                >
                  <Trash2 className="w-5 h-5 text-red-300" />
                </button>

                <button
                  onClick={exportChat}
                  className="p-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-xl transition-all"
                  title={t.export}
                >
                  <Download className="w-5 h-5 text-blue-300" />
                </button>

                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {t.send}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}