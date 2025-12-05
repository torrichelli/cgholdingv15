import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Users, Globe, ArrowRight, Heart } from 'lucide-react';
import { PageView } from '../types';
import { useAboutContent } from '../hooks/useCMSContent';

interface AboutSectionProps {
  onNavigate: (view: PageView) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Layers, Zap, Users, Heart, Globe
};

const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { content } = useAboutContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pt-20">
      
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase mb-6 block">
            Миссия CreativeGroup
          </span>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight mb-12">
            {content.mission.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 leading-relaxed">
            {content.mission.description}
          </p>
        </motion.div>
      </section>

      <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
           <h2 className="text-3xl font-bold mb-16">Наш подход</h2>
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {content.approach.map((item, i) => {
                const icons = [Layers, Zap, Users, Heart];
                const Icon = icons[i % icons.length];
                return (
                  <div key={i}>
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-black">
                       <Icon size={24} strokeWidth={1.5} />
                     </div>
                     <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                     <p className="text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
           </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">Структура экосистемы</h2>
          <p className="text-xl text-gray-500 mb-20 max-w-2xl">
            Каждое подразделение выполняет свою роль, а вместе они формируют мощный конгломерат.
          </p>

          <div className="space-y-4">
            {content.companies.map((company, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                onClick={() => onNavigate(company.id as PageView)}
                className="group flex flex-col md:flex-row md:items-center justify-between p-8 rounded-3xl bg-gray-50 hover:bg-black hover:text-white transition-all cursor-pointer border border-gray-100"
              >
                 <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-white/20 group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <div>
                       <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-2xl font-bold">{company.name}</h3>
                          <span className="text-xs px-2 py-1 bg-white/50 rounded-md text-gray-500 group-hover:bg-white/20 group-hover:text-white/80 transition-colors uppercase tracking-wider">{company.role}</span>
                       </div>
                       <p className="text-gray-500 group-hover:text-gray-400 text-lg transition-colors">{company.description}</p>
                    </div>
                 </div>
                 <div className="mt-6 md:mt-0 flex items-center gap-2 font-semibold opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                    Перейти <ArrowRight size={18} />
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto">
           <Globe className="w-16 h-16 mx-auto mb-8 text-gray-500" strokeWidth={1} />
           <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-8">
             "{content.vision.quote}"
           </h2>
           <p className="text-xl text-gray-400 leading-relaxed">
             {content.vision.description}
           </p>
        </div>
      </section>

      <section className="py-32 px-6">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-semibold mb-16 text-center">Наши ценности</h2>
            <div className="grid md:grid-cols-5 gap-8">
               {content.values.map((val, i) => (
                 <div key={i} className="text-center p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all">
                    <div className="w-3 h-3 bg-black rounded-full mx-auto mb-4" />
                    <h3 className="text-lg font-bold mb-2">{val.title}</h3>
                    <p className="text-sm text-gray-500">{val.description}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
};

export default AboutSection;
