
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DivisionData } from '../types';
import { ICON_MAP } from '../constants';
import { ArrowLeft, Check, ArrowRight, ExternalLink, Linkedin, Facebook, MessageCircle, Share2, Link as LinkIcon } from 'lucide-react';

interface DivisionDetailProps {
  division: DivisionData;
  onBack: () => void;
  backLabel?: string; 
  onContact: () => void;
}

const DivisionDetail: React.FC<DivisionDetailProps> = ({ division, onBack, backLabel, onContact }) => {
  const Icon = ICON_MAP[division.icon];
  const bgClass = 'bg-white';
  const textClass = 'text-black';
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (platform: string) => {
    let url = '';
    const text = `Check out ${division.title} by CreativeGroup`;
    
    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + currentUrl)}`;
        break;
    }
    
    if (url) window.open(url, '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen ${bgClass} ${textClass}`}
    >
      {/* Navbar Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white/80 border border-gray-200 text-black hover:bg-gray-50 transition-all shadow-sm backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel || 'Назад'}</span>
        </button>
      </div>

      {/* 1. HERO BLOCK */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className={`inline-flex items-center justify-center p-6 rounded-3xl mb-8 shadow-sm bg-gray-50`}
        >
           <Icon className={`w-12 h-12 text-black`} strokeWidth={1} />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6"
        >
          {division.title}
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed"
        >
          {division.tagline}
        </motion.p>
      </section>

      {/* 2. ABOUT PROJECT (Mission & Value) */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">О Проекте</h2>
          <p className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-800">
            {division.aboutProject}
          </p>
        </div>
      </section>

      {/* 3. SERVICES / FUNCTIONS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">Услуги проекта</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {division.modules.map((mod, i) => {
            const ModIcon = mod.icon ? ICON_MAP[mod.icon] : Icon;
            return (
              <div key={i} className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <ModIcon className={`w-8 h-8 mb-6 ${division.accentColor.replace('bg-', 'text-')}`} />
                <h3 className="text-xl font-bold mb-3">{mod.title}</h3>
                <p className="text-gray-500">{mod.content}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. UNIQUE ADVANTAGES (Why Us?) */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
           <div>
             <h2 className="text-3xl md:text-5xl font-semibold mb-8">Наши преимущества</h2>
             <p className="text-xl text-gray-400 mb-8">Почему лидеры рынка выбирают {division.title} для своих задач.</p>
           </div>
           <div className="space-y-6">
             {division.advantages.map((adv, i) => (
               <div key={i} className="flex items-start gap-4">
                 <div className={`mt-1 w-6 h-6 rounded-full ${division.accentColor} flex items-center justify-center shrink-0`}>
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                 </div>
                 <span className="text-xl md:text-2xl font-medium">{adv}</span>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 5. CASES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <h2 className="text-3xl md:text-4xl font-semibold mb-12">Кейсы и достижения</h2>
         <div className="grid md:grid-cols-2 gap-8">
            {division.cases.map((cs, i) => (
              <div key={i} className="bg-gray-50 rounded-3xl p-10 flex flex-col justify-between">
                 <div>
                   <div className="text-sm font-bold uppercase text-gray-400 mb-2">{cs.client}</div>
                   <h3 className="text-2xl font-bold mb-4">{cs.title}</h3>
                   <p className="text-gray-600 mb-8 text-lg">{cs.description}</p>
                 </div>
                 <div className="pt-6 border-t border-gray-200">
                    <div className={`text-4xl font-bold ${division.accentColor.replace('bg-', 'text-')}`}>{cs.result}</div>
                    <div className="text-sm text-gray-400 mt-1">Результат</div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* 6. INTEGRATIONS WITH CREATIVEGROUP */}
      <section className="py-24 px-6 bg-gray-50">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">Интеграции внутри CreativeGroup</h2>
            <div className="grid md:grid-cols-2 gap-6">
               {division.projectIntegrations.map((item, i) => (
                 <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-black shrink-0" />
                    <span className="text-lg text-gray-800">{item}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>
      
      {/* 6.5 SHARE SECTION */}
      <section className="py-12 px-6 max-w-3xl mx-auto border-t border-gray-100">
         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-lg font-bold">Поделиться проектом:</div>
            <div className="flex gap-4">
               <button onClick={() => handleShare('linkedin')} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-[#0077b5]"><Linkedin size={24} /></button>
               <button onClick={() => handleShare('facebook')} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-[#1877f2]"><Facebook size={24} /></button>
               <button onClick={() => handleShare('telegram')} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-[#0088cc]"><MessageCircle size={24} /></button>
               <button onClick={() => handleShare('whatsapp')} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-[#25D366]"><MessageCircle size={24} /></button>
               <button onClick={copyLink} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors text-gray-600 relative">
                  {copied ? <Check size={24} className="text-green-500"/> : <LinkIcon size={24} />}
               </button>
            </div>
         </div>
      </section>

      {/* 7. FOOTER CTA - LINK TO PROJECT SITE */}
      <section className="py-32 px-6 text-center">
         <div className="max-w-3xl mx-auto">
            <div className={`w-20 h-20 mx-auto rounded-full ${division.accentColor} flex items-center justify-center mb-8 shadow-xl shadow-gray-200`}>
               <ExternalLink className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Узнайте больше на сайте проекта</h2>
            <p className="text-xl text-gray-500 mb-12">Перейдите на официальный сайт {division.title} для деталей.</p>
            
            <a 
              href={division.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-2xl"
            >
              Перейти на сайт проекта {division.title}
              <ArrowRight className="w-5 h-5" />
            </a>
         </div>
      </section>

    </motion.div>
  );
};

export default DivisionDetail;
