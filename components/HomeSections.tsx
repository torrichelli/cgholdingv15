
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Share2 } from 'lucide-react';
import { DIVISIONS, ICON_MAP, PARTNERS, SYNERGIES } from '../constants';
import { PageView } from '../types';

interface SectionProps {
  onNavigate?: (view: PageView) => void;
}

export const Ecosystem: React.FC<SectionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={containerRef} id="ecosystem-section" className="bg-white text-black relative pt-20">
      {/* 1. Ecosystem Header (Reduced from full hero) */}
      <div className="py-24 flex flex-col items-center justify-center relative overflow-hidden px-6 text-center">
         {/* Abstract background element */}
         <motion.div 
           style={{ rotate }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gray-100/50 hidden md:block opacity-50 pointer-events-none"
         >
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-200 rounded-full" />
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-200 rounded-full" />
         </motion.div>

         <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-semibold tracking-tighter mb-6"
            >
              Экосистема CreativeGroup
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto"
            >
              Система, где каждая компания усиливает другую.<br/>
              Цифровое пространство маркетинга, технологий и логистики.
            </motion.p>
         </div>
      </div>

      {/* 2. Detailed Product Blocks */}
      <div id="ecosystem-grid" className="max-w-7xl mx-auto px-6 pb-20 space-y-32">
         {DIVISIONS.map((div, i) => {
            const Icon = ICON_MAP[div.icon];
            const isEven = i % 2 === 0;
            return (
               <motion.div 
                 key={div.id}
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ margin: "-100px" }}
                 transition={{ duration: 0.8 }}
                 className={`flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24`}
               >
                  {/* Visual Side (Mockup Placeholder) */}
                  <div className="w-full md:w-1/2 aspect-square md:aspect-[4/3] bg-gray-50 rounded-[3rem] border border-gray-100 flex items-center justify-center relative overflow-hidden group hover:shadow-xl transition-shadow duration-500">
                     <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity ${div.accentColor}`} />
                     <Icon className="w-32 h-32 text-gray-300 group-hover:text-black group-hover:scale-110 transition-all duration-700" strokeWidth={0.5} />
                  </div>

                  {/* Text Side */}
                  <div className="w-full md:w-1/2 text-left">
                     <div className="flex items-center gap-3 mb-6">
                        <div className={`p-3 rounded-2xl ${div.accentColor} text-white`}>
                           <Icon size={24} />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-400">{div.title}</span>
                     </div>
                     <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        {div.tagline}
                     </h3>
                     
                     {/* Directions list */}
                     <div className="flex flex-wrap gap-3 mb-8">
                       {(div.modules || []).slice(0,4).map((m, idx) => (
                         <span key={idx} className="px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-gray-600 border border-gray-100">
                           {m.title}
                         </span>
                       ))}
                     </div>

                     <p className="text-xl text-gray-500 leading-relaxed mb-10">
                        {div.description}
                     </p>
                     
                     <button 
                       onClick={() => onNavigate && onNavigate(div.id)}
                       className="group flex items-center gap-3 text-lg font-bold hover:gap-5 transition-all"
                     >
                       <span>Открыть {div.title}</span>
                       <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <ArrowRight size={18} />
                       </div>
                     </button>
                  </div>
               </motion.div>
            )
         })}
      </div>

      {/* 3. Synergy Slider */}
      <div className="py-32 bg-gray-50 overflow-hidden border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Как работают связи</h2>
            <p className="text-xl text-gray-500">ИИ объясняет логику взаимодействия.</p>
         </div>
         
         <div className="flex gap-8 overflow-x-auto px-6 pb-12 snap-x scrollbar-hide max-w-[100vw]">
             <div className="w-6 shrink-0" /> {/* Spacer */}
             {SYNERGIES.map((syn, i) => (
                <div 
                  key={i} 
                  className="snap-center shrink-0 w-[350px] md:w-[400px] p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
                >
                   <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                      <Share2 className="text-black" />
                   </div>
                   <h3 className="text-xl font-bold mb-4">{syn.pair}</h3>
                   <p className="text-gray-500 leading-relaxed">{syn.desc}</p>
                </div>
             ))}
             <div className="w-6 shrink-0" /> {/* Spacer */}
         </div>
      </div>

      {/* 4. Philosophy */}
      <div className="py-32 px-6 max-w-7xl mx-auto border-t border-gray-100">
         <h2 className="text-4xl md:text-5xl font-semibold mb-20 text-center">Почему экосистема важна</h2>
         <div className="grid md:grid-cols-3 gap-12">
            {[
               { title: "Единая философия", desc: "Каждый продукт создаётся с одинаковым подходом к дизайну и технологии." },
               { title: "Общая инфраструктура", desc: "Медиа, разработка, логистика, магазины, комьюнити — всё связано." },
               { title: "Рост и масштабирование", desc: "Каждая компания усиливает другие, создавая эффект сети." }
            ].map((item, i) => (
               <div key={i} className="text-center">
                  <div className="text-6xl font-bold text-gray-100 mb-6">0{i+1}</div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>
               </div>
            ))}
         </div>
      </div>
      
      {/* 5. CTA */}
      <div className="py-32 px-6 bg-black text-white text-center">
         <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">Хотите стать частью?</h2>
         <button 
            onClick={() => onNavigate && onNavigate('contact')}
            className="bg-white text-black px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform"
         >
            Связаться с нами
         </button>
      </div>

    </section>
  );
};

export const Partners: React.FC = () => (
  <section className="py-20 bg-gray-50 text-black px-6 border-t border-gray-100">
    <div className="max-w-7xl mx-auto text-center">
      <h3 className="text-sm font-bold text-gray-400 mb-10 uppercase tracking-widest">С кем мы работаем</h3>
      <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {PARTNERS.map((partner, i) => (
          <span key={i} className="text-2xl md:text-3xl font-bold font-sans text-gray-800">
            {partner}
          </span>
        ))}
      </div>
    </div>
  </section>
);
