
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAIStream } from '../src/services/aiService';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';
import { User, Bot } from 'lucide-react';
import StockChart from '../components/StockChart';
import FinanceGame from '../components/FinanceGame';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '📚 你好！我是麻袋的金融知识导师。\n\n我随时准备为您解答金融疑问。目前默认开启**快速响应模式**，为您提供简明扼要的核心解答。如果您需要更详尽的推演和结构化分析，可以随时开启底部的**深度思考模式**。\n\n我可以为您提供：\n\n🔹 **金融概念解析**\n\n用通俗易懂的语言解释复杂的金融术语。\n\n🔹 **投资策略学习**\n\n探讨各种投资流派与资产配置方法。\n\n🔹 **市场机制科普**\n\n带您了解宏观经济与金融市场的运行规律。\n\n请问您今天想学习哪个金融知识点？\n\n---\n\n*注：本对话内容仅供学习交流，不构成任何投资建议。*',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeepThinking, setIsDeepThinking] = useState(false);
  const [showGame, setShowGame] = useState(true);
  const [loadingText, setLoadingText] = useState('Thinking...');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading && isDeepThinking) {
      const texts = ['正在深度思考...', '解析金融概念...', '构建知识图谱...', '整理学习资料...'];
      let i = 0;
      setLoadingText(texts[0]);
      const interval = setInterval(() => {
        i = (i + 1) % texts.length;
        setLoadingText(texts[i]);
      }, 2000);
      return () => clearInterval(interval);
    } else if (isLoading) {
      setLoadingText('快速生成中...');
    }
  }, [isLoading, isDeepThinking]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    // Create a placeholder for the AI response
    const aiMessageId = (Date.now() + 1).toString();
    const newAiMsg: ChatMessage = {
      id: aiMessageId,
      role: 'model',
      text: '',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newAiMsg]);

    try {
      const historyForAI = messages.concat(newUserMsg).map(m => ({
        role: m.role,
        text: m.text
      }));

      let accumulatedText = '';
      abortControllerRef.current = new AbortController();
      await sendMessageToAIStream(userText, historyForAI, (chunk) => {
        accumulatedText += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? { ...msg, text: accumulatedText } : msg
        ));
      }, isDeepThinking, undefined, abortControllerRef.current.signal);

    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error(error);
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId ? { ...msg, text: "系统错误：连接丢失..." } : msg
        ));
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessageContent = (text: string) => {
    const chartRegex = /```json\n([\s\S]*?)\n```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = chartRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
      }
      
      try {
        const chartData = JSON.parse(match[1]);
        if (chartData.type === 'stock_chart') {
          parts.push({ type: 'chart', content: chartData });
        } else {
          parts.push({ type: 'text', content: match[0] });
        }
      } catch {
        parts.push({ type: 'text', content: match[0] });
      }
      
      lastIndex = chartRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.substring(lastIndex) });
    }

    if (parts.length === 0) return <div className="prose prose-sm max-w-none"><ReactMarkdown>{text}</ReactMarkdown></div>;

    return parts.map((part, i) => {
      if (part.type === 'chart') {
        return <StockChart key={i} symbol={part.content.symbol} data={part.content.data} />;
      }
      return <div key={i} className="prose prose-sm max-w-none"><ReactMarkdown>{part.content as string}</ReactMarkdown></div>;
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 max-w-3xl mx-auto flex flex-col">
      <div className="text-center mb-8 animate-[fadeIn_0.5s_ease-out]">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-pixel flex items-center justify-center gap-3">
          <span className="text-emerald-500">★</span>
          AI聊天
          <span className="text-emerald-500">★</span>
        </h1>
        <div className="h-2 w-40 bg-slate-900 mx-auto border-2 border-white shadow-retro"></div>
        <p className="mt-4 text-slate-500 font-mono">Knowledge Base Loaded...</p>
      </div>

      {/* Retro Window Container */}
      <div className="bg-[#c0c0c0] p-1 border-2 border-white shadow-retro outline outline-2 outline-slate-900 flex flex-col overflow-hidden h-[500px]">
        
        {/* Window Title Bar */}
        <div className="flex bg-gradient-to-r from-[#006400] to-[#228b22] px-2 py-1 justify-between items-center mb-1">
          <span className="text-white font-bold font-pixel text-[10px] md:text-xs flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 animate-pulse rounded-full"></div>
            Madai_Finance_Terminal.exe
          </span>
          <div className="flex gap-1">
            <button className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-slate-700 flex items-center justify-center text-[10px] font-bold shadow-sm">_</button>
            <button className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-slate-700 flex items-center justify-center text-[10px] font-bold shadow-sm">×</button>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={chatContainerRef}
          className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-white border-2 border-slate-600 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] transition-colors duration-500 ${isDeepThinking ? 'bg-slate-50' : 'bg-white'}`}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`w-6 h-6 md:w-8 md:h-8 flex-shrink-0 border-2 border-slate-900 flex items-center justify-center transition-colors duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                msg.role === 'user' 
                  ? 'bg-yellow-300 text-slate-900' 
                  : (isDeepThinking ? 'bg-indigo-500 text-white' : 'bg-emerald-400 text-slate-900')
              }`}>
                {msg.role === 'user' ? <User size={16} strokeWidth={2.5} /> : <Bot size={16} strokeWidth={2.5} />}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[85%] px-2 py-1 md:px-3 md:py-2 border-2 border-slate-900 shadow-retro ${
                  msg.role === 'user'
                    ? 'bg-primary-100 text-slate-900'
                    : (isDeepThinking ? 'bg-indigo-50 text-slate-900' : 'bg-[#f0f0f0] text-slate-900')
                }`}
              >
                <div className="font-mono text-[10px] md:text-xs leading-tight">
                  {renderMessageContent(msg.text)}
                </div>
                <div className="text-[7px] md:text-[8px] mt-1 text-right opacity-50 font-pixel">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && messages[messages.length - 1].text === '' && (
            <div className="flex gap-3">
              <div className={`w-6 h-6 md:w-8 md:h-8 flex-shrink-0 border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isDeepThinking ? 'bg-indigo-500 text-white' : 'bg-emerald-400 text-slate-900'}`}>
                <Bot size={16} strokeWidth={2.5} />
              </div>
              <div className="px-2 py-1 md:px-3 md:py-2 border-2 border-slate-900 bg-[#f0f0f0] shadow-retro flex items-center">
                <span className="font-pixel text-[7px] md:text-[10px] animate-pulse">{loadingText}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-2 bg-[#c0c0c0] border-t border-white">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={isDeepThinking}
                    onChange={(e) => setIsDeepThinking(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-8 h-4 border-2 border-slate-900 shadow-[1px_1px_0px_0px_white] transition-colors ${isDeepThinking ? 'bg-indigo-500' : 'bg-slate-400'}`}>
                    <div className={`absolute top-0.5 w-2 h-2 border border-slate-900 bg-white transition-all ${isDeepThinking ? 'left-5' : 'left-0.5'}`}></div>
                  </div>
                </div>
                <span className={`text-[8px] font-pixel uppercase tracking-tighter transition-colors ${isDeepThinking ? 'text-indigo-700 font-bold' : 'text-slate-600'}`}>
                  {isDeepThinking ? '深度思考模式 ON' : '快速响应模式 ON'}
                </span>
              </label>

              <div className="h-px flex-1 bg-slate-400"></div>
            </div>

            <div className="flex items-stretch gap-2">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isDeepThinking ? "输入您的问题，AI将进行深度分析..." : "快速提问..."}
                  className="w-full h-full pl-2 pr-2 py-1 bg-white border-2 border-slate-600 focus:outline-none focus:border-primary-600 resize-none font-mono text-xs"
                  rows={1}
                />
              </div>
              <button
                onClick={isLoading ? stopGeneration : handleSend}
                disabled={!isLoading && !input.trim()}
                className={`px-3 py-1 font-pixel text-[9px] border-2 border-white shadow-[2px_2px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all ${
                  !isLoading && !input.trim()
                    ? 'bg-slate-400 text-slate-600 cursor-not-allowed'
                    : isLoading
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-slate-900 text-y2k-lime hover:bg-slate-800'
                }`}
              >
                {isLoading ? 'STOP' : 'SEND'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Finance Game Section Below Chat */}
      <div className="mt-12 w-full max-w-7xl mx-auto">
        <div className="flex justify-center mb-4">
          <button 
            onClick={() => setShowGame(!showGame)}
            className="px-6 py-2 bg-slate-900 text-y2k-lime font-pixel text-xs border-2 border-white shadow-retro hover:bg-slate-800 transition-all active:translate-y-1 active:shadow-none"
          >
            {showGame ? '关闭交易游戏 [CLOSE_GAME.EXE]' : '开启交易游戏 [OPEN_GAME.EXE]'}
          </button>
        </div>
        
        {showGame && (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            <FinanceGame />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
