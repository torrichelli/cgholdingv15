
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Activity, ArrowRight, Server } from 'lucide-react';
import { ServiceStatusItem, StatusIncident } from '../types';

const INITIAL_SERVICES: ServiceStatusItem[] = [
  { id: 'creativeid', name: 'CreativeID (Auth)', status: 'operational', uptime: '99.99%', lastUpdated: 'Just now', description: 'Single Sign-On System' },
  { id: 'api-gateway', name: 'API Gateway', status: 'operational', uptime: '99.98%', lastUpdated: 'Just now', description: 'Core Infrastructure' },
  { id: 'nexium-cloud', name: 'Nexium Cloud', status: 'operational', uptime: '99.95%', lastUpdated: 'Just now', description: 'POS Transaction Processing' },
  { id: 'logiflex-grid', name: 'LogiFlex Grid', status: 'operational', uptime: '99.90%', lastUpdated: 'Just now', description: 'Routing Algorithms' },
  { id: 'yoursite-builder', name: 'YourSite Builder', status: 'operational', uptime: '99.99%', lastUpdated: 'Just now', description: 'Site Generation Engine' },
  { id: 'gaming-servers', name: 'Gaming Servers', status: 'degraded', uptime: '98.50%', lastUpdated: 'Just now', description: 'Tournament Matchmaking' },
  { id: 'media-cdn', name: 'CreativeMedia CDN', status: 'operational', uptime: '100%', lastUpdated: 'Just now', description: 'Content Delivery' },
  { id: 'jobhunt-ai', name: 'JobHunt AI', status: 'operational', uptime: '99.92%', lastUpdated: 'Just now', description: 'Matching Engine' },
];

const INCIDENTS: StatusIncident[] = [
  { 
    date: '15 Oct 2024', 
    time: '14:30 UTC', 
    status: 'degraded', 
    title: 'High Latency on Gaming Servers', 
    description: 'We are observing higher than normal latency for EU region tournament servers. Engineers are investigating.',
    resolvedTime: 'Investigating'
  },
  { 
    date: '10 Oct 2024', 
    time: '09:15 UTC', 
    status: 'outage', 
    title: 'LogiFlex API Intermittent Errors', 
    description: 'A database migration caused temporary connection timeouts.',
    resolvedTime: 'Resolved (15 mins)'
  },
  { 
    date: '01 Oct 2024', 
    time: '10:00 UTC', 
    status: 'operational', 
    title: 'Scheduled Maintenance', 
    description: 'CreativeID system upgrade completed successfully.',
    resolvedTime: 'Completed'
  }
];

export const StatusPage: React.FC = () => {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [lastCheck, setLastCheck] = useState(new Date());

  // Simulate polling
  useEffect(() => {
    const interval = setInterval(() => {
      setLastCheck(new Date());
      // Simulate random latency updates or status flickers could go here
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const overallStatus = services.some(s => s.status === 'outage') 
    ? 'critical' 
    : services.some(s => s.status === 'degraded') 
      ? 'partial' 
      : 'operational';

  return (
    <div className="min-h-screen bg-white text-black pt-32 px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Статус сервисов</h1>
          <p className="text-xl text-gray-500 mb-8">
            Мониторинг доступности и производительности всех систем CreativeGroup в реальном времени.
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-500">
             <RefreshCw size={14} className="animate-spin-slow" />
             Обновлено: {lastCheck.toLocaleTimeString()}
          </div>
        </div>

        {/* Global Status Banner */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`p-8 rounded-3xl mb-16 flex items-center justify-between shadow-sm border ${
            overallStatus === 'operational' ? 'bg-emerald-50 border-emerald-100' : 
            overallStatus === 'partial' ? 'bg-yellow-50 border-yellow-100' : 'bg-red-50 border-red-100'
          }`}
        >
           <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                 overallStatus === 'operational' ? 'bg-emerald-100 text-emerald-600' : 
                 overallStatus === 'partial' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
              }`}>
                 {overallStatus === 'operational' ? <CheckCircle size={32} /> : 
                  overallStatus === 'partial' ? <AlertTriangle size={32} /> : <XCircle size={32} />}
              </div>
              <div>
                 <h2 className="text-2xl font-bold mb-1">
                    {overallStatus === 'operational' ? 'Все системы работают штатно' : 
                     overallStatus === 'partial' ? 'Наблюдаются частичные сбои' : 'Критический сбой сервисов'}
                 </h2>
                 <p className="text-gray-600">
                    Средний аптайм за последние 30 дней: 99.98%
                 </p>
              </div>
           </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
           {services.map((service) => (
             <div key={service.id} className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                         <Server size={20} className="text-gray-400" />
                      </div>
                      <div>
                         <h3 className="font-bold text-lg">{service.name}</h3>
                         <p className="text-xs text-gray-500">{service.description}</p>
                      </div>
                   </div>
                   <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      service.status === 'operational' ? 'bg-emerald-50 text-emerald-600' :
                      service.status === 'degraded' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'
                   }`}>
                      {service.status === 'operational' ? 'Работает' : service.status === 'degraded' ? 'Нестабильно' : 'Сбой'}
                   </div>
                </div>
                
                {/* Uptime bar visual */}
                <div className="space-y-2">
                   <div className="flex justify-between text-xs text-gray-400 font-mono">
                      <span>Uptime</span>
                      <span>{service.uptime}</span>
                   </div>
                   <div className="flex gap-1 h-1">
                      {[...Array(30)].map((_, i) => (
                         <div key={i} className={`flex-1 rounded-full ${
                            service.status === 'degraded' && i > 25 ? 'bg-yellow-400' : 
                            service.status === 'outage' && i > 28 ? 'bg-red-500' : 'bg-emerald-400'
                         }`} />
                      ))}
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Incident History */}
        <h2 className="text-3xl font-bold mb-12">История инцидентов</h2>
        <div className="space-y-8 relative pl-8 border-l border-gray-100">
           {INCIDENTS.map((inc, i) => (
              <div key={i} className="relative">
                 {/* Dot on timeline */}
                 <div className={`absolute -left-[39px] top-1 w-5 h-5 rounded-full border-4 border-white ${
                    inc.status === 'operational' ? 'bg-emerald-400' : 
                    inc.status === 'degraded' ? 'bg-yellow-400' : 'bg-red-400'
                 }`} />
                 
                 <div className="mb-2 flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-900">{inc.date}</span>
                    <span className="text-xs text-gray-400 font-mono">{inc.time}</span>
                 </div>
                 
                 <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-2">{inc.title}</h3>
                    <p className="text-gray-600 mb-4">{inc.description}</p>
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                       Статус: {inc.resolvedTime}
                    </div>
                 </div>
              </div>
           ))}
        </div>

        {/* Subscribe */}
        <div className="mt-24 p-12 bg-black text-white rounded-[3rem] text-center">
           <Activity size={48} className="mx-auto mb-6 text-gray-500" />
           <h2 className="text-3xl font-bold mb-4">Подпишитесь на уведомления</h2>
           <p className="text-gray-400 mb-8">Получайте мгновенные оповещения о сбоях и технических работах.</p>
           <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
                 Email оповещения
              </button>
              <button className="px-6 py-3 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-colors">
                 API Доступ
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};
