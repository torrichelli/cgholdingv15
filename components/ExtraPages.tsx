import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Briefcase, Cpu, Code, Database, Globe, Layers, Zap, TrendingUp, PieChart, FileText, Download, ArrowRight, Server, ChevronDown, ChevronUp, X, MapPin, Star } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ARTICLES, JOBS, ICON_MAP } from '../constants';
import { PageView, JobPosting } from '../types';
import { useTechnologiesContent, useInvestorsContent, useCareerContent } from '../hooks/useCMSContent';

interface PageProps {
  onNavigate?: (view: PageView, id?: string) => void;
}

const ServerIcon = (props: any) => <Cpu {...props} />;

export const InvestorRelationsPage: React.FC<PageProps> = ({ onNavigate }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const { content } = useInvestorsContent();

  const data = [
    { name: '2020', value: 4000 },
    { name: '2021', value: 3000 },
    { name: '2022', value: 5000 },
    { name: '2023', value: 7800 },
    { name: '2024', value: 12000 },
  ];

  return (
    <div className="min-h-screen bg-white text-black pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-semibold mb-8 tracking-tighter">{content.title}</h1>
        <p className="text-2xl text-gray-500 max-w-4xl mb-24">
           {content.description}
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
           {content.financials.map((fin, i) => (
             <div key={i} className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100">
                <div className="text-sm text-gray-400 font-mono mb-2 uppercase">{fin.label}</div>
                <div className="text-5xl font-bold mb-4">{fin.value}</div>
                {fin.change && (
                  <div className="flex items-center gap-2 text-emerald-500 font-mono"><TrendingUp size={16}/> {fin.change}</div>
                )}
             </div>
           ))}
        </div>

        <div className="mb-24 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
          <h2 className="text-2xl font-semibold mb-8">Рост капитализации группы</h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                  itemStyle={{ color: '#000' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mb-32">
           <h2 className="text-4xl font-semibold mb-12">Синергия экосистемы</h2>
           <div className="relative p-12 bg-gray-900 rounded-[3rem] text-white overflow-hidden">
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                 <div>
                    <h3 className="text-3xl font-bold mb-6">Мультипликатор ценности</h3>
                    <p className="text-gray-400 text-lg mb-8">
                       Каждая компания группы использует ресурсы других, снижая издержки и ускоряя выход на рынок.
                    </p>
                    <ul className="space-y-4">
                       <li className="flex items-center gap-4"><Check className="text-blue-500" /> Единая IT-инфраструктура (CreativeTech)</li>
                       <li className="flex items-center gap-4"><Check className="text-blue-500" /> Общий маркетинг и PR (Studio & Media)</li>
                       <li className="flex items-center gap-4"><Check className="text-blue-500" /> Сквозная логистика (LogiFlex)</li>
                    </ul>
                 </div>
                 <div className="aspect-square bg-white/5 rounded-full border border-white/10 flex items-center justify-center relative">
                    <div className="absolute inset-0 border border-white/10 rounded-full scale-75" />
                    <div className="absolute inset-0 border border-white/10 rounded-full scale-50" />
                    <div className="text-center">
                       <div className="text-5xl font-bold mb-2">7</div>
                       <div className="text-sm text-gray-400 uppercase tracking-widest">Компаний</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-32">
           {content.opportunities.map((opp, i) => {
             const icons = [Zap, Briefcase, Globe];
             const Icon = icons[i % icons.length];
             return (
               <div key={i} className="p-10 bg-gray-50 rounded-[2.5rem] hover:bg-black hover:text-white transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 text-black">
                     <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{opp.title}</h3>
                  <p className="text-gray-500 group-hover:text-gray-400">{opp.description}</p>
               </div>
             );
           })}
        </div>

        <h2 className="text-4xl font-semibold mb-12">Отчетность</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-32">
           {content.documents.map((doc, i) => (
             <div key={i} className="flex items-center justify-between p-8 bg-gray-50 rounded-3xl hover:bg-gray-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-6">
                   <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                     <FileText className="text-black group-hover:text-blue-500 transition-colors" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-black">{doc.title}</h3>
                      <p className="text-sm text-gray-500">{doc.size}</p>
                   </div>
                </div>
                <Download className="text-gray-400 group-hover:text-black transition-colors" />
             </div>
           ))}
        </div>
        
        <div className="py-24 border-t border-gray-100 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Заинтересованы?</h2>
            <div className="flex justify-center gap-4">
               <button 
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="px-8 py-4 bg-black text-white rounded-full text-lg font-bold hover:bg-gray-800 transition-colors"
               >
                  Связаться с отделом инвестиций
               </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export const TechnologiesPage: React.FC<PageProps> = ({ onNavigate }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const [activeCompany, setActiveCompany] = React.useState<string | null>(null);
  const { content } = useTechnologiesContent();

  const companyTechs: Record<string, string[]> = {
    'LogiFlex': ['Python (FastAPI)', 'PyTorch', 'Google Cloud', 'PostgreSQL', 'React 18'],
    'CreativeTech': ['Node.js', 'Next.js 14', 'AWS', 'Docker', 'TypeScript'],
    'JobHunt': ['Django', 'Scikit-learn', 'Vue.js', 'Redis'],
    'YourSite': ['Next.js 14', 'React 18', 'Node.js', 'MongoDB'],
    'Nexium': ['Android Native', 'Python (FastAPI)', 'TensorFlow', 'AWS']
  };
  
  return (
    <div className="min-h-screen bg-white text-black pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-semibold mb-8 tracking-tighter">{content.title}</h1>
        <p className="text-2xl text-gray-500 max-w-4xl mb-24 leading-relaxed">
           {content.description}
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
           {[
             { title: "Frontend", items: content.techStack.frontend, icon: Code },
             { title: "Backend", items: content.techStack.backend, icon: ServerIcon },
             { title: "AI / ML", items: content.techStack.ai, icon: Cpu },
             { title: "Infrastructure", items: content.techStack.infra, icon: Database },
           ].map((cat, i) => (
             <div key={i} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:shadow-lg transition-shadow">
                <cat.icon className="w-10 h-10 mb-6 text-blue-600" />
                <h3 className="text-2xl font-bold mb-6">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.items.map((t, j) => (
                    <li key={j} className="text-gray-600 font-medium pb-2 border-b border-gray-200 last:border-0">{t}</li>
                  ))}
                </ul>
             </div>
           ))}
        </div>

        <div className="mb-32">
           <h2 className="text-4xl font-semibold mb-12 text-center">Экосистема технологий</h2>
           <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">Наведите на компанию, чтобы увидеть её технологический стек.</p>
           
           <div className="flex flex-wrap justify-center gap-4 mb-16">
              {Object.keys(companyTechs).map((company) => (
                 <button
                   key={company}
                   onMouseEnter={() => setActiveCompany(company)}
                   onMouseLeave={() => setActiveCompany(null)}
                   onClick={() => onNavigate && onNavigate('tech')} 
                   className={`px-8 py-4 rounded-full text-lg font-bold transition-all ${
                     activeCompany === company ? 'bg-black text-white scale-110' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                   }`}
                 >
                   {company}
                 </button>
              ))}
           </div>

           <div className="h-[300px] bg-black rounded-[3rem] flex items-center justify-center text-center p-8 relative overflow-hidden transition-colors duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
               <div className="relative z-10">
                  {activeCompany ? (
                    <motion.div 
                      key={activeCompany}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-white"
                    >
                       <div className="text-gray-400 text-sm uppercase tracking-widest mb-4">Стек технологий {activeCompany}</div>
                       <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
                          {companyTechs[activeCompany].map((t, i) => (
                            <span key={i} className="px-4 py-2 bg-white/10 rounded-lg border border-white/20 backdrop-blur-md">{t}</span>
                          ))}
                       </div>
                    </motion.div>
                  ) : (
                    <div className="text-gray-500 text-xl">Выберите проект выше для анализа</div>
                  )}
               </div>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-32">
           {content.advantages.map((adv, i) => {
             const icons = [Zap, Cpu, Layers];
             const colors = ['blue', 'purple', 'emerald'];
             const Icon = icons[i % icons.length];
             const color = colors[i % colors.length];
             return (
               <div key={i} className="text-center">
                  <div className={`w-16 h-16 bg-${color}-50 text-${color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                     <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{adv.title}</h3>
                  <p className="text-gray-500">{adv.description}</p>
               </div>
             );
           })}
        </div>

        <div className="py-24 border-t border-gray-100 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Хотите узнать больше?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button 
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="px-8 py-4 bg-black text-white rounded-full text-lg font-bold hover:bg-gray-800 transition-colors"
               >
                  Связаться с отделом технологий
               </button>
               <button 
                  onClick={() => {
                     const el = document.getElementById('ecosystem-section');
                     if(el) el.scrollIntoView({behavior: 'smooth'});
                     else if(onNavigate) onNavigate('home');
                  }}
                  className="px-8 py-4 bg-gray-100 text-black rounded-full text-lg font-bold hover:bg-gray-200 transition-colors"
               >
                  Подробнее о проектах
               </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export const ResearchPage: React.FC<PageProps> = ({ onNavigate }) => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-white text-black pt-32 px-6">
        <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-semibold mb-16 tracking-tight">Исследования</h1>
            <p className="text-2xl text-gray-500 mb-20 max-w-3xl">
              Мы делимся экспертизой в области ИИ, автоматизации и дизайна. Аналитика, гайды и видение будущего.
            </p>

            <div className="space-y-20">
                {ARTICLES.map((post, i) => (
                    <div 
                      key={i} 
                      className="group cursor-pointer"
                      onClick={() => onNavigate && onNavigate('article', post.id)}
                    >
                        <div className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">{post.date} • {post.category}</div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 group-hover:text-blue-600 transition-colors leading-tight">{post.title}</h2>
                        <p className="text-xl text-gray-600 max-w-4xl leading-relaxed mb-8">{post.subtitle}</p>
                        <div className="flex items-center gap-2 font-bold group-hover:gap-4 transition-all">
                           Читать статью <ArrowRight size={20} />
                        </div>
                        <div className="h-[1px] w-full bg-gray-200 mt-12" />
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export const CareerPage: React.FC<PageProps> = ({ onNavigate }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const [filter, setFilter] = useState('All');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [showApply, setShowApply] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const { content } = useCareerContent();

  const filters = ['All', 'CreativeTech', 'CreativeStudio', 'LogiFlex', 'Nexium', 'JobHunt'];
  const filteredJobs = filter === 'All' ? JOBS : JOBS.filter(job => job.company === filter);

  const toggleJob = (id: string) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  const handleApply = (jobTitle: string) => {
     setSelectedJob(jobTitle);
     setShowApply(true);
  };

  return (
    <div className="min-h-screen bg-white text-black pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-24">
          <span className="text-blue-600 font-bold tracking-widest uppercase mb-4 block text-sm">{content.subtitle}</span>
          <h1 className="text-5xl md:text-7xl font-semibold mb-8 tracking-tighter">{content.title}</h1>
          <p className="text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
          <div className="mt-12">
             <button 
                onClick={() => document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth'})}
                className="px-8 py-4 bg-black text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
             >
                Посмотреть вакансии
             </button>
          </div>
        </div>

        <div className="mb-32">
           <h2 className="text-3xl font-bold mb-12 text-center">Наши ценности</h2>
           <div className="grid md:grid-cols-5 gap-6">
              {content.values.map((val, i) => {
                const Icon = ICON_MAP[val.icon || ''] || Star;
                return (
                  <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center hover:shadow-lg transition-all">
                     <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Icon className="w-6 h-6 text-black" />
                     </div>
                     <h3 className="font-bold mb-2">{val.title}</h3>
                     <p className="text-sm text-gray-500">{val.description}</p>
                  </div>
                )
              })}
           </div>
        </div>

        <div className="mb-32">
          <h2 className="text-3xl font-bold mb-12">Жизнь в CreativeGroup</h2>
          <div className="grid md:grid-cols-2 gap-8 h-[500px]">
             <div className="bg-gray-100 rounded-[3rem] overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-8 left-8">
                   <h3 className="text-2xl font-bold mb-2">{content.benefits[0]?.title || 'Офис класса А+'}</h3>
                   <p className="text-gray-600">{content.benefits[0]?.description || 'Панорамные виды и зоны отдыха'}</p>
                </div>
             </div>
             <div className="grid grid-rows-2 gap-8">
                <div className="bg-gray-100 rounded-[2.5rem] relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-yellow-100 group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute bottom-6 left-6">
                      <h3 className="text-xl font-bold">{content.benefits[1]?.title || 'Хакатоны'}</h3>
                   </div>
                </div>
                <div className="bg-gray-100 rounded-[2.5rem] relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-orange-100 group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute bottom-6 left-6">
                      <h3 className="text-xl font-bold">{content.benefits[2]?.title || 'Обучение'}</h3>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div id="jobs-section" className="mb-32 scroll-mt-24">
           <h2 className="text-4xl font-semibold mb-12">Открытые вакансии</h2>
           
           <div className="flex flex-wrap gap-3 mb-12">
              {filters.map(f => (
                 <button 
                   key={f}
                   onClick={() => setFilter(f)}
                   className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border border-gray-200 ${
                     filter === f ? 'bg-black text-white border-black' : 'bg-white text-gray-600 hover:bg-gray-100'
                   }`}
                 >
                   {f}
                 </button>
              ))}
           </div>

           <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                 <div className="text-center py-12 text-gray-500">Нет вакансий по выбранному фильтру.</div>
              ) : filteredJobs.map((job) => (
                 <motion.div 
                   layout
                   key={job.id} 
                   className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100"
                 >
                    <div 
                      onClick={() => toggleJob(job.id)}
                      className="p-8 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                       <div>
                          <div className="flex items-center gap-3 mb-2">
                             <span className="px-3 py-1 bg-white rounded-md text-xs font-bold uppercase tracking-wider text-gray-500 shadow-sm">{job.company}</span>
                             <span className="text-sm text-gray-400">{job.type} • {job.location}</span>
                          </div>
                          <h3 className="text-2xl font-bold">{job.title}</h3>
                       </div>
                       <div className="mt-4 md:mt-0">
                          {expandedJob === job.id ? <ChevronUp /> : <ChevronDown />}
                       </div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedJob === job.id && (
                         <motion.div 
                           initial={{ height: 0 }}
                           animate={{ height: 'auto' }}
                           exit={{ height: 0 }}
                           className="overflow-hidden"
                         >
                            <div className="p-8 pt-0 border-t border-gray-200 mt-4">
                               <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl pt-8">{job.description}</p>
                               <div className="mb-8">
                                  <h4 className="font-bold mb-4">Требования:</h4>
                                  <ul className="space-y-2">
                                     {job.requirements.map((req, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-600">
                                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                           {req}
                                        </li>
                                     ))}
                                  </ul>
                               </div>
                               <button 
                                 onClick={() => handleApply(job.title)}
                                 className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors"
                               >
                                  Откликнуться на вакансию
                               </button>
                            </div>
                         </motion.div>
                      )}
                    </AnimatePresence>
                 </motion.div>
              ))}
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
           <div>
              <h2 className="text-3xl font-bold mb-6">Развитие и обучение</h2>
              <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                 Мы инвестируем в рост каждого сотрудника. Внутренние митапы, компенсация профильных курсов и конференций, библиотека знаний и менторство от тимлидов.
              </p>
              <ul className="space-y-4">
                 <li className="flex items-center gap-4 text-lg font-medium"><Check className="text-green-500"/> Персональный план развития (PDP)</li>
                 <li className="flex items-center gap-4 text-lg font-medium"><Check className="text-green-500"/> Бюджет на обучение $1000/год</li>
                 <li className="flex items-center gap-4 text-lg font-medium"><Check className="text-green-500"/> Курсы английского языка</li>
              </ul>
           </div>
           <div className="bg-gray-100 rounded-[3rem] h-[400px] flex items-center justify-center">
              <div className="text-center text-gray-400">
                 <TrendingUp size={64} className="mx-auto mb-4" />
                 <div>Career Growth Path</div>
              </div>
           </div>
        </div>
        
        <div className="py-24 border-t border-gray-100 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Не нашли подходящую вакансию?</h2>
            <p className="text-xl text-gray-500 mb-12">Отправьте нам резюме, и мы свяжемся, когда появится что-то интересное.</p>
            <div className="flex justify-center gap-4">
               <button 
                  onClick={() => handleApply('General Application')}
                  className="px-8 py-4 bg-gray-100 text-black rounded-full text-lg font-bold hover:bg-gray-200 transition-colors"
               >
                  Отправить резюме в базу
               </button>
               <button 
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="px-8 py-4 bg-white border border-gray-200 text-black rounded-full text-lg font-bold hover:bg-gray-50 transition-colors"
               >
                  Связаться с HR
               </button>
            </div>
        </div>

        <AnimatePresence>
           {showApply && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                 <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   onClick={() => setShowApply(false)}
                   className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                 />
                 <motion.div 
                   initial={{ scale: 0.9, opacity: 0, y: 50 }}
                   animate={{ scale: 1, opacity: 1, y: 0 }}
                   exit={{ scale: 0.9, opacity: 0, y: 50 }}
                   className="relative bg-white w-full max-w-xl rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
                 >
                    <button onClick={() => setShowApply(false)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                       <X size={20} />
                    </button>
                    
                    <h2 className="text-3xl font-bold mb-2">Отклик на вакансию</h2>
                    <p className="text-gray-500 mb-8">{selectedJob}</p>
                    
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Спасибо! Мы получили ваш отклик.'); setShowApply(false); }}>
                       <div>
                          <label className="block text-sm font-bold uppercase text-gray-500 mb-2">ФИО</label>
                          <input required type="text" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black" placeholder="Иванов Иван" />
                       </div>
                       <div>
                          <label className="block text-sm font-bold uppercase text-gray-500 mb-2">Email</label>
                          <input required type="email" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black" placeholder="ivan@example.com" />
                       </div>
                       <div>
                          <label className="block text-sm font-bold uppercase text-gray-500 mb-2">Телефон</label>
                          <input required type="tel" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black" placeholder="+7..." />
                       </div>
                       <div>
                          <label className="block text-sm font-bold uppercase text-gray-500 mb-2">Ссылка на резюме / Portfolio</label>
                          <input type="url" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black" placeholder="LinkedIn, Google Drive..." />
                       </div>
                       <div>
                          <label className="block text-sm font-bold uppercase text-gray-500 mb-2">Сопроводительное письмо</label>
                          <textarea rows={4} className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-black" placeholder="Расскажите о себе..." />
                       </div>
                       
                       <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors">
                          Отправить отклик
                       </button>
                    </form>
                 </motion.div>
              </div>
           )}
        </AnimatePresence>

      </div>
    </div>
  );
};
