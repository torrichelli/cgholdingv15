import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react';
import OfficeGlobe from './OfficeGlobe';
import { useContactContent } from '../hooks/useCMSContent';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { content } = useContactContent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen pt-32 pb-12 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8 text-black">
            {content.title}
          </h2>
          <p className="text-2xl text-gray-500 font-medium mb-12">
            {content.description}
          </p>
          
          <div className="w-full h-[300px] mb-12 rounded-[2rem] bg-gray-50 overflow-hidden relative border border-gray-100">
             <OfficeGlobe />
             <div className="absolute bottom-4 left-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">Global Presence</div>
          </div>

          <div className="space-y-8">
             <div className="flex items-start gap-6">
                <MapPin className="w-8 h-8 text-black mt-1"/>
                <div>
                   <h3 className="text-xl font-bold">{content.office.label}</h3>
                   <p className="text-gray-500 text-lg">{content.office.value}</p>
                </div>
             </div>
             <div className="flex items-start gap-6">
                <Mail className="w-8 h-8 text-black mt-1"/>
                <div>
                   <h3 className="text-xl font-bold">{content.email.label}</h3>
                   <p className="text-gray-500 text-lg">{content.email.value}</p>
                </div>
             </div>
          </div>
        </motion.div>

        <div>
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="p-12 bg-gray-50 rounded-[3rem] text-center h-full flex flex-col justify-center border border-gray-100 shadow-xl"
          >
            <h3 className="text-3xl font-semibold text-black">{content.successMessage.title}</h3>
            <p className="text-gray-500 mt-4 text-xl">{content.successMessage.description}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-100">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900 uppercase tracking-wide ml-4">Имя</label>
              <input
                type="text"
                required
                className="w-full bg-white border-0 rounded-2xl p-5 text-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black transition-all shadow-sm"
                placeholder="Иван Петров"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900 uppercase tracking-wide ml-4">Корпоративный Email</label>
              <input
                type="email"
                required
                className="w-full bg-white border-0 rounded-2xl p-5 text-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black transition-all shadow-sm"
                placeholder="ivan@company.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900 uppercase tracking-wide ml-4">Цель обращения</label>
              <textarea
                rows={4}
                required
                className="w-full bg-white border-0 rounded-2xl p-5 text-lg text-black placeholder-gray-400 focus:ring-2 focus:ring-black transition-all resize-none shadow-sm"
                placeholder="Инвестиции / Внедрение / Партнерство..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full mt-8 bg-black text-white px-8 py-5 rounded-full font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-2xl shadow-black/20"
            >
              Отправить заявку
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
