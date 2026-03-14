
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface StockDataPoint {
  date: string;
  price: number;
}

interface StockChartProps {
  symbol: string;
  data: StockDataPoint[];
}

const StockChart: React.FC<StockChartProps> = ({ symbol, data }) => {
  return (
    <div className="w-full h-48 md:h-64 bg-slate-900 p-2 md:p-4 border-2 border-slate-700 shadow-retro my-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-y2k-lime font-pixel text-xs uppercase tracking-widest">{symbol} TREND ANALYSIS</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
          <span className="text-white font-pixel text-[8px]">LIVE DATA</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00FF00" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00FF00" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8" 
            fontSize={8} 
            tickFormatter={(str) => str.split('-').slice(1).join('/')}
          />
          <YAxis 
            stroke="#94a3b8" 
            fontSize={8} 
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', fontSize: '10px', color: '#fff' }}
            itemStyle={{ color: '#00FF00' }}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#00FF00" 
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            strokeWidth={2}
            dot={{ r: 2, fill: '#00FF00' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
