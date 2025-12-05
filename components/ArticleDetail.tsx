
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Linkedin, Facebook, MessageCircle, Calendar, Tag, ArrowRight, Link as LinkIcon, Check } from 'lucide-react';
import { Article, PageView } from '../types';
import { ARTICLES } from '../constants';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onNavigate: (view: PageView, id?: string) => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack, onNavigate }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.id]);

  const relatedArticles = ARTICLES.filter(a => article.relatedIds.includes(a.id));
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (platform: string) => {
    let url = '';
    const text = `Check out this article: ${article.title}`;
    
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
      className="min-h-screen bg-white text-black font-sans pt-24"
    >
      {/* Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white/80 border border-gray-200 text-black hover:bg-gray-50 transition-all shadow-sm backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>К списку статей</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 mb-16 pt-12">
         {/* Breadcrumbs */}
         <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 font-medium">
            <span className="cursor-pointer hover:text-black" onClick={() => onNavigate('home')}>Главная</span>
            <span>/</span>
            <span className="cursor-pointer hover:text-black" onClick={onBack}>Блог</span>
            <span>/</span>
            <span className="text-blue-600">{article.category}</span>
         </div>

         <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            {article.title}
         </h1>
         <p className="text-xl md:text-2xl text-gray-500 mb-8 leading-relaxed">
            {article.subtitle}
         </p>

         <div className="flex items-center gap-6 border-t border-b border-gray-100 py-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                  {article.author.name.charAt(0)}
               </div>
               <div>
                  <div className="font-bold text-sm">{article.author.name}</div>
                  <div className="text-xs text-gray-500">{article.author.role}</div>
               </div>
            </div>
            <div className="h-8 w-[1px] bg-gray-100" />
            <div className="flex items-center gap-2 text-sm text-gray-500">
               <Calendar size={16} /> {article.date}
            </div>
         </div>
      </div>

      {/* Main Visual */}
      <div className={`w-full h-[400px] md:h-[600px] ${article.image} mb-16 relative overflow-hidden`}>
         <div className="absolute inset-0 bg-black/10" />
         <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/50 to-transparent text-white opacity-0 md:opacity-100">
            <div className="max-w-7xl mx-auto text-sm font-mono opacity-80">Photo courtesy of CreativeGroup Design Team</div>
         </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 mb-24">
         <div 
           className="prose prose-lg prose-slate hover:prose-a:text-blue-600 prose-headings:font-bold prose-headings:tracking-tight"
           dangerouslySetInnerHTML={{ __html: article.content }}
         />
      </div>

      {/* Author & Share */}
      <div className="max-w-3xl mx-auto px-6 mb-24">
         <div className="bg-gray-50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
               <h3 className="font-bold mb-2">Понравилась статья?</h3>
               <p className="text-gray-500 text-sm">Поделитесь ей с коллегами в социальных сетях.</p>
            </div>
            <div className="flex gap-4">
               <button onClick={() => handleShare('linkedin')} className="p-3 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-[#0077b5]"><Linkedin size={20} /></button>
               <button onClick={() => handleShare('facebook')} className="p-3 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-[#1877f2]"><Facebook size={20} /></button>
               <button onClick={() => handleShare('telegram')} className="p-3 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-[#0088cc]"><MessageCircle size={20} /></button>
               <button onClick={() => handleShare('whatsapp')} className="p-3 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-[#25D366]"><MessageCircle size={20} /></button>
               <button onClick={copyLink} className="p-3 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-gray-600 relative">
                  {copied ? <Check size={20} className="text-green-500"/> : <LinkIcon size={20} />}
               </button>
            </div>
         </div>
      </div>

      {/* Related Articles */}
      <section className="bg-gray-50 py-24 px-6 border-t border-gray-100">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Читайте также</h2>
            <div className="grid md:grid-cols-3 gap-8">
               {relatedArticles.map((rel) => (
                  <div 
                    key={rel.id} 
                    onClick={() => onNavigate('article', rel.id)}
                    className="bg-white rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-lg transition-shadow"
                  >
                     <div className={`h-48 ${rel.image} relative`}>
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold">{rel.category}</div>
                     </div>
                     <div className="p-8">
                        <div className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">{rel.date}</div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors leading-tight">{rel.title}</h3>
                        <p className="text-gray-500 text-sm line-clamp-2">{rel.subtitle}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-24 px-6 text-center">
         <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Подпишитесь на новости</h2>
            <p className="text-xl text-gray-400 mb-12">Получайте свежую аналитику и кейсы CreativeGroup раз в неделю. Никакого спама.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <input 
                 type="email" 
                 placeholder="Ваш Email" 
                 className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white w-full sm:w-auto min-w-[300px]"
               />
               <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
                  Подписаться
               </button>
            </div>
         </div>
      </section>

    </motion.div>
  );
};

export default ArticleDetail;
