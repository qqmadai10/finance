
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToAIStream } from '../services/aiService';
import { ChatMessage, Asset, PortfolioItem, GameEvent } from '../types';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface FinanceAdvisorProps {
  gameState: {
    day: number;
    cash: number;
    totalNetWorth: number;
    portfolio: PortfolioItem[];
    assets: Asset[];
    currentEvent: GameEvent | null;
  };
}

const FinanceAdvisor: React.FC<FinanceAdvisorProps> = ({ gameState }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '你好！我是你的 AI 投资顾问。我会根据当前的市场状况为你提供建议。你现在想聊聊哪方面的投资？',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Auto-scroll to bottom on every message update (including streaming)
      // We use scrollTo on the container directly to avoid scrolling parent elements
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const generateSystemInstruction = () => {
    const portfolioStr = gameState.portfolio.map(p => {
      const asset = gameState.assets.find(a => a.id === p.assetId);
      return `${asset?.name} (${asset?.symbol}): ${p.quantity} 股, 持仓成本 ${asset?.price}`;
    }).join('\n');

    const assetsStr = gameState.assets.map(a => {
      return `${a.name} (${a.symbol}): 当前价格 $${a.price.toFixed(2)}`;
    }).join('\n');

    return `
你现在是《市场大亨》游戏的 AI 投资顾问。
当前游戏状态：
- 第 ${gameState.day} 天 (总共 30 天)
- 现金余额: $${gameState.cash.toFixed(2)}
- 总资产: $${gameState.totalNetWorth.toFixed(2)}
- 当前持仓:
${portfolioStr || '无'}
- 市场行情:
${assetsStr}
- 今日事件: ${gameState.currentEvent ? `${gameState.currentEvent.title} - ${gameState.currentEvent.description}` : '无重大事件'}

你的任务：
1. 分析当前市场行情和玩家的持仓。
2. 根据今日事件提供投资建议（买入、卖出或持有）。
3. 语气要专业、幽默，像一个资深的交易员。
4. 保持回答简洁，不要太长。
5. 严禁使用 "**" 进行加粗。
`;
  };

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

    const aiMessageId = (Date.now() + 1).toString();
    const newAiMsg: ChatMessage = {
      id: aiMessageId,
      role: 'model',
      text: '...',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newAiMsg]);

    try {
      const historyForAI = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      let accumulatedText = '';
      await sendMessageToAIStream(
        userText, 
        historyForAI, 
        (chunk) => {
          accumulatedText += chunk;
          setMessages(prev => prev.map(msg => 
            msg.id === aiMessageId ? { ...msg, text: accumulatedText } : msg
          ));
        }, 
        false, // thinkingEnabled = false for faster response in game
        generateSystemInstruction()
      );

    } catch (error) {
      console.error(error);
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? { ...msg, text: "连接异常，请稍后再试。" } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
      {/* Header */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <div className="text-xs font-black text-white leading-none">AI ADVISOR</div>
            <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              ONLINE
            </div>
          </div>
        </div>
        <Sparkles size={16} className="text-indigo-400" />
      </div>

      {/* Messages */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-indigo-500' : 'bg-slate-700'}`}>
              {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
            </div>
            <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
            }`}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-slate-800 border-t border-slate-700">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="询问投资建议..."
            className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl pl-3 pr-10 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-1.5 top-1.5 w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceAdvisor;
