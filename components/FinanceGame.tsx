
import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  BarChart3, 
  Newspaper, 
  ArrowUpRight, 
  ArrowDownRight, 
  Info,
  RefreshCw,
  Trophy,
  DollarSign,
  Briefcase,
  X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Asset, PortfolioItem, GameEvent } from '../types';

// --- Constants ---
const INITIAL_CASH = 10000;
const TOTAL_DAYS = 30;

const ASSETS_DATA: Asset[] = [
  { id: 'tech', name: '全球科技', symbol: 'GTEC', type: 'stock', price: 150, history: [{ day: 0, price: 150 }], volatility: 0.08 },
  { id: 'energy', name: '清洁能源', symbol: 'NRGY', type: 'stock', price: 80, history: [{ day: 0, price: 80 }], volatility: 0.05 },
  { id: 'btc', name: '比特币', symbol: 'BTC', type: 'crypto', price: 45000, history: [{ day: 0, price: 45000 }], volatility: 0.15 },
  { id: 'gold', name: '黄金', symbol: 'GOLD', type: 'commodity', price: 2000, history: [{ day: 0, price: 2000 }], volatility: 0.02 },
];

const EVENTS: GameEvent[] = [
  { title: "美联储加息", description: "市场普遍预期利率将上升，科技股承压。", impacts: { tech: -0.1, energy: -0.05, btc: -0.2, gold: 0.05 } },
  { title: "科技巨头财报超预期", description: "AI 需求爆发，科技板块全线大涨。", impacts: { tech: 0.15, energy: 0.02, btc: 0.05, gold: -0.02 } },
  { title: "地缘政治紧张", description: "避险情绪升温，黄金价格走强。", impacts: { tech: -0.05, energy: 0.1, btc: -0.1, gold: 0.12 } },
  { title: "加密货币监管加强", description: "多国宣布严厉打击非法交易，币圈震荡。", impacts: { tech: -0.02, energy: 0, btc: -0.3, gold: 0.02 } },
  { title: "新能源补贴政策", description: "政府宣布巨额清洁能源补贴计划。", impacts: { tech: 0.05, energy: 0.18, btc: 0, gold: 0 } },
  { title: "全球通胀数据爆表", description: "物价飞涨，实物资产受到追捧。", impacts: { tech: -0.08, energy: 0.05, btc: 0.1, gold: 0.15 } },
];

const FinanceGame: React.FC = () => {
  const [day, setDay] = useState(1);
  const [cash, setCash] = useState(INITIAL_CASH);
  const [assets, setAssets] = useState<Asset[]>(ASSETS_DATA);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [gameStatus, setGameStatus] = useState<'playing' | 'finished'>('playing');
  const [selectedAssetId, setSelectedAssetId] = useState<string>(ASSETS_DATA[0].id);
  const [showInstructions, setShowInstructions] = useState(true);

  // --- Derived State ---
  const portfolioValue = useMemo(() => {
    return portfolio.reduce((total, item) => {
      const asset = assets.find(a => a.id === item.assetId);
      return total + (asset ? asset.price * item.quantity : 0);
    }, 0);
  }, [portfolio, assets]);

  const totalNetWorth = cash + portfolioValue;

  const selectedAsset = useMemo(() => 
    assets.find(a => a.id === selectedAssetId) || assets[0]
  , [assets, selectedAssetId]);

  // --- Game Logic ---
  const nextDay = () => {
    if (day >= TOTAL_DAYS) {
      setGameStatus('finished');
      return;
    }

    let event: GameEvent | null = null;
    if (Math.random() < 0.4) {
      event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    }
    setCurrentEvent(event);

    setAssets(prevAssets => prevAssets.map(asset => {
      const eventImpact = event?.impacts[asset.id] || 0;
      const randomWalk = (Math.random() - 0.5) * 2 * asset.volatility;
      const changePercent = randomWalk + eventImpact;
      const newPrice = Math.max(1, asset.price * (1 + changePercent));
      
      return {
        ...asset,
        price: newPrice,
        history: [...asset.history, { day, price: newPrice }]
      };
    }));

    setDay(prev => prev + 1);
  };

  const buyAsset = (assetId: string, amount: number) => {
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return;

    const cost = asset.price * amount;
    if (cost > cash) return;

    setCash(prev => prev - cost);
    setPortfolio(prev => {
      const existing = prev.find(item => item.assetId === assetId);
      if (existing) {
        const totalQty = existing.quantity + amount;
        const newAvg = (existing.avgPrice * existing.quantity + asset.price * amount) / totalQty;
        return prev.map(item => item.assetId === assetId ? { ...item, quantity: totalQty, avgPrice: newAvg } : item);
      }
      return [...prev, { assetId, quantity: amount, avgPrice: asset.price }];
    });
  };

  const sellAsset = (assetId: string, amount: number) => {
    const asset = assets.find(a => a.id === assetId);
    const item = portfolio.find(p => p.assetId === assetId);
    if (!asset || !item || item.quantity < amount) return;

    const revenue = asset.price * amount;
    setCash(prev => prev + revenue);
    setPortfolio(prev => {
      const updated = prev.map(p => p.assetId === assetId ? { ...p, quantity: p.quantity - amount } : p);
      return updated.filter(p => p.quantity > 0);
    });
  };

  const restartGame = () => {
    setDay(1);
    setCash(INITIAL_CASH);
    setAssets(ASSETS_DATA);
    setPortfolio([]);
    setCurrentEvent(null);
    setGameStatus('playing');
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="bg-[#0f172a] p-4 md:p-8 font-sans border-t-4 border-slate-900 mt-12 text-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-md overflow-hidden">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <h1 className="text-lg md:text-2xl font-black text-white flex items-center gap-2 truncate">
              <BarChart3 className="text-indigo-400 w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <span className="truncate">市场大亨</span> 
              <span className="text-indigo-400 text-[10px] md:text-lg font-mono opacity-70">v1.0</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-xl border border-slate-700 flex-1 md:flex-none">
              <div className="text-center px-3 border-r border-slate-700">
                <div className="text-[8px] text-slate-500 uppercase font-bold font-mono">天数</div>
                <div className="text-xs md:text-sm font-black text-white font-mono">{day}/{TOTAL_DAYS}</div>
              </div>
              <div className="text-right pl-1">
                <div className="text-[8px] text-slate-500 uppercase font-bold font-mono">资产净值</div>
                <div className="text-xs md:text-sm font-black text-emerald-400 font-mono truncate max-w-[100px] md:max-w-none">{formatCurrency(totalNetWorth)}</div>
              </div>
            </div>
            <button 
              onClick={() => setShowInstructions(true)}
              className="p-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 hover:text-indigo-400 transition-colors flex-shrink-0"
            >
              <Info size={18} />
            </button>
          </div>
        </header>

        {gameStatus === 'playing' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <section className="bg-slate-800/40 rounded-3xl p-6 shadow-2xl border border-slate-700/50 backdrop-blur-sm">
                <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                  <h2 className="text-sm md:text-lg font-bold text-white flex items-center gap-2 whitespace-nowrap uppercase tracking-wider font-mono">
                    <TrendingUp size={18} className="text-indigo-400" />
                    实时行情
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {assets.map(a => (
                      <button
                        key={a.id}
                        onClick={() => setSelectedAssetId(a.id)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all font-mono border ${
                          selectedAssetId === a.id 
                          ? 'bg-indigo-500 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' 
                          : 'bg-slate-900/50 border-slate-700 text-slate-500 hover:border-slate-500'
                        }`}
                      >
                        {a.symbol}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                  {assets.map(asset => {
                    const prevPrice = asset.history[asset.history.length - 2]?.price || asset.price;
                    const change = ((asset.price - prevPrice) / prevPrice) * 100;
                    const isUp = change >= 0;

                    return (
                      <div 
                        key={asset.id}
                        onClick={() => setSelectedAssetId(asset.id)}
                        className={`p-3 md:p-4 rounded-2xl border-2 transition-all cursor-pointer group overflow-hidden ${
                          selectedAssetId === asset.id 
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]' 
                          : 'border-slate-700/50 bg-slate-900/30 hover:border-slate-600'
                        }`}
                      >
                        <div className="text-[9px] font-bold text-slate-500 uppercase mb-1 font-mono tracking-tighter truncate">{asset.name}</div>
                        <div className="text-sm md:text-lg font-black text-white mb-1 font-mono truncate">{formatCurrency(asset.price)}</div>
                        <div className={`text-[10px] font-bold flex items-center gap-1 font-mono ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isUp ? <ArrowUpRight size={12} className="flex-shrink-0" /> : <ArrowDownRight size={12} className="flex-shrink-0" />}
                          <span className="truncate">{isUp ? '+' : ''}{change.toFixed(2)}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="h-64 w-full bg-slate-900/50 rounded-2xl p-4 border border-slate-700/30">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedAsset.history}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="day" hide />
                      <YAxis hide domain={['auto', 'auto']} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
                        itemStyle={{ color: '#818cf8', fontFamily: 'monospace', fontSize: '12px' }}
                        labelStyle={{ display: 'none' }}
                        formatter={(value: number) => [formatCurrency(value), '价格']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#6366f1" 
                        strokeWidth={3} 
                        dot={false}
                        animationDuration={500}
                        strokeLinecap="round"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <section className="bg-slate-800/40 rounded-3xl p-6 shadow-2xl border border-slate-700/50 backdrop-blur-sm">
                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                  <h2 className="text-sm md:text-lg font-bold text-white flex items-center gap-2 uppercase tracking-wider font-mono">
                    <DollarSign size={20} className="text-emerald-400" />
                    交易终端: {selectedAsset.symbol}
                  </h2>
                  <div className="text-xs font-bold text-slate-400 font-mono">
                    现金余额: <span className="text-emerald-400">{formatCurrency(cash)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4 overflow-hidden">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase font-mono">
                      <span className="truncate">买入订单</span>
                      <span className="truncate ml-2">最大可买: {Math.floor(cash / selectedAsset.price)}</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                      {[1, 10, 50, 100].map(qty => (
                        <button
                          key={qty}
                          onClick={() => buyAsset(selectedAsset.id, qty)}
                          disabled={cash < selectedAsset.price * qty}
                          className="flex-1 min-w-[40px] py-3 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/20 hover:bg-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-mono"
                        >
                          +{qty}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={() => buyAsset(selectedAsset.id, Math.floor(cash / selectedAsset.price))}
                      className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-black hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all uppercase tracking-widest font-mono text-sm truncate"
                    >
                      全部买入
                    </button>
                  </div>

                  <div className="space-y-4 overflow-hidden">
                    {(() => {
                      const item = portfolio.find(p => p.assetId === selectedAssetId);
                      const qty = item?.quantity || 0;
                      return (
                        <>
                          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase font-mono">
                            <span className="truncate">卖出订单</span>
                            <span className="truncate ml-2">持有数量: {qty}</span>
                          </div>
                          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {[1, 10, 50, 100].map(amount => (
                              <button
                                key={amount}
                                onClick={() => sellAsset(selectedAsset.id, amount)}
                                disabled={qty < amount}
                                className="flex-1 min-w-[40px] py-3 rounded-xl bg-rose-500/10 text-rose-400 font-bold text-xs border border-rose-500/20 hover:bg-rose-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-mono"
                              >
                                -{amount}
                              </button>
                            ))}
                          </div>
                          <button 
                            onClick={() => sellAsset(selectedAsset.id, qty)}
                            disabled={qty === 0}
                            className="w-full py-4 rounded-2xl bg-rose-600 text-white font-black hover:bg-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.2)] transition-all disabled:opacity-30 uppercase tracking-widest font-mono text-sm truncate"
                          >
                            全部卖出
                          </button>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <button 
                onClick={nextDay}
                className="w-full py-6 rounded-3xl bg-indigo-600 text-white font-black text-xl shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:bg-indigo-500 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group font-mono uppercase tracking-tighter"
              >
                <RefreshCw className="group-hover:rotate-180 transition-transform duration-700" />
                下一周期
              </button>

              <AnimatePresence mode="wait">
                {currentEvent && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-900/80 border border-indigo-500/30 rounded-3xl p-6 shadow-[0_0_20px_rgba(99,102,241,0.1)] relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                    <div className="flex items-center gap-2 text-indigo-400 font-bold mb-2 font-mono text-xs uppercase tracking-widest">
                      <Newspaper size={14} />
                      市场快讯
                    </div>
                    <h3 className="text-lg font-black text-white mb-2 leading-tight">{currentEvent.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium">{currentEvent.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <section className="bg-slate-800/40 rounded-3xl p-6 shadow-2xl border border-slate-700/50 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wider font-mono">
                  <Briefcase size={20} className="text-indigo-400" />
                  持仓明细
                </h2>
                <div className="space-y-4">
                  {portfolio.length > 0 ? portfolio.map(item => {
                    const asset = assets.find(a => a.id === item.assetId)!;
                    const profit = (asset.price - item.avgPrice) * item.quantity;
                    const profitPercent = ((asset.price - item.avgPrice) / item.avgPrice) * 100;

                    return (
                      <div key={item.assetId} className="flex justify-between items-center p-3 rounded-2xl bg-slate-900/50 border border-slate-700/50 group hover:border-indigo-500/50 transition-colors overflow-hidden">
                        <div className="min-w-0 flex-1 mr-2">
                          <div className="text-sm font-bold text-white font-mono truncate">{asset.symbol}</div>
                          <div className="text-[9px] text-slate-500 font-bold font-mono uppercase truncate">{item.quantity} 单位 @ {formatCurrency(item.avgPrice)}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-black text-white font-mono truncate">{formatCurrency(asset.price * item.quantity)}</div>
                          <div className={`text-[9px] font-bold font-mono ${profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {profit >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="text-center py-8 text-slate-600 text-xs italic font-mono uppercase tracking-widest">暂无持仓</div>
                  )}
                </div>
              </section>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-slate-900 rounded-[40px] p-12 text-center shadow-2xl border border-slate-700"
          >
            <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(99,102,241,0.2)]">
              <Trophy className="text-indigo-400" size={48} />
            </div>
            <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter font-mono">模拟结束</h2>
            <p className="text-slate-400 mb-8 font-mono text-sm uppercase tracking-widest">投资表现总结:</p>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 font-mono tracking-widest">最终资产</div>
                <div className="text-3xl font-black text-indigo-400 font-mono">{formatCurrency(totalNetWorth)}</div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 font-mono tracking-widest">总收益率</div>
                <div className={`text-3xl font-black font-mono ${totalNetWorth >= INITIAL_CASH ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {(((totalNetWorth - INITIAL_CASH) / INITIAL_CASH) * 100).toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={restartGame}
                className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-black text-lg hover:bg-indigo-500 transition-all shadow-[0_0_30px_rgba(99,102,241,0.3)] uppercase font-mono tracking-widest"
              >
                开启新一轮模拟
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Instructions Modal */}
      {createPortal(
        <AnimatePresence>
          {showInstructions && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowInstructions(false)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-[24px] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
              >
                <div className="bg-indigo-600 p-5 text-white relative flex-shrink-0">
                  <button 
                    onClick={() => setShowInstructions(false)}
                    className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black tracking-tight font-mono uppercase">市场大亨</h2>
                      <p className="text-indigo-100 text-[10px] font-mono">30天交易挑战</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 space-y-3 overflow-y-auto">
                  <div className="space-y-2">
                    <div className="flex gap-3 items-start bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                      <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-400 font-bold text-xs font-mono border border-indigo-500/30">01</div>
                      <div>
                        <p className="text-[11px] font-bold text-white uppercase font-mono mb-0.5">初始资金</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed">你拥有 $10,000 的初始现金。可以从 4 种具有不同风险特征的资产中进行选择。</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                      <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-400 font-bold text-xs font-mono border border-indigo-500/30">02</div>
                      <div>
                        <p className="text-[11px] font-bold text-white uppercase font-mono mb-0.5">市场动态</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed">点击“下一周期”推进时间。观察实时价格走势并管理你的投资组合。</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                      <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-400 font-bold text-xs font-mono border border-indigo-500/30">03</div>
                      <div>
                        <p className="text-[11px] font-bold text-white uppercase font-mono mb-0.5">风险管理</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed">留意“市场快讯”，突发事件可能会导致价格剧烈波动。</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => setShowInstructions(false)}
                      className="w-full py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-500 transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] uppercase font-mono tracking-widest text-xs"
                    >
                      开始交易
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default FinanceGame;
