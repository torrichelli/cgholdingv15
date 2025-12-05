import React from 'react';

const SystemStatus: React.FC = () => {
  return (
    <div className="fixed top-6 right-6 z-[60] hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono text-gray-400 hover:bg-black/80 transition-colors cursor-help group">
      <div className="relative w-2 h-2">
         <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
         <div className="relative w-2 h-2 bg-emerald-500 rounded-full" />
      </div>
      <span>ALL SYSTEMS OPERATIONAL</span>
      
      <div className="absolute top-full right-0 mt-2 w-64 p-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity shadow-2xl">
         <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">System Health</h4>
         <div className="space-y-2">
           {[
             { name: 'CreativeID API', status: 'Operational', latency: '24ms' },
             { name: 'Nexium Cloud', status: 'Operational', latency: '45ms' },
             { name: 'LogiFlex Grid', status: 'Operational', latency: '32ms' },
             { name: 'Market Gateway', status: 'Operational', latency: '12ms' }
           ].map((sys, i) => (
             <div key={i} className="flex justify-between items-center text-xs">
               <span className="text-gray-400">{sys.name}</span>
               <div className="flex items-center gap-2">
                 <span className="text-emerald-500">{sys.status}</span>
                 <span className="text-gray-600 font-mono">{sys.latency}</span>
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default SystemStatus;