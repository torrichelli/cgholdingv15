import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StockTicker: React.FC = () => {
  return (
    <div className="bg-[#0a0a0a] border-b border-white/5 py-2 overflow-hidden flex items-center h-[40px] select-none z-50 relative">
       <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
       <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
       
       <div className="animate-marquee flex items-center gap-12 whitespace-nowrap text-xs font-mono font-medium text-gray-400">
          {[
            { symbol: "CG (HOLDING)", price: "142.05", change: "+2.4%", up: true },
            { symbol: "NXM (NEXIUM)", price: "8,402", change: "+0.8%", up: true },
            { symbol: "LFX (LOGIFLEX)", price: "45.2M", change: "+1.2%", up: true },
            { symbol: "CT (TECH)", price: "Index 920", change: "-0.4%", up: false },
            { symbol: "CS (STUDIO)", price: "Stable", change: "0.0%", up: true },
            { symbol: "CG (HOLDING)", price: "142.05", change: "+2.4%", up: true },
            { symbol: "NXM (NEXIUM)", price: "8,402", change: "+0.8%", up: true },
            { symbol: "LFX (LOGIFLEX)", price: "45.2M", change: "+1.2%", up: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-white">{item.symbol}</span>
              <span>{item.price}</span>
              <span className={`flex items-center gap-1 ${item.up ? 'text-emerald-500' : 'text-red-500'}`}>
                {item.up ? <TrendingUp size={12}/> : <TrendingDown size={12}/>} {item.change}
              </span>
            </div>
          ))}
       </div>
    </div>
  );
};

export default StockTicker;