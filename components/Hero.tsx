import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { PageView } from '../types';
import ParticleBackground from './ParticleBackground';
import { useHeroContent } from '../hooks/useCMSContent';

interface HeroProps {
  onNavigate: (view: PageView) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { content, isLoading } = useHeroContent();

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-black">
      <div className="absolute inset-0 z-0">
          <ParticleBackground />
          <div className="absolute inset-0 bg-white/60" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center mt-[-5vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase mb-8 text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
            Technology Group
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter mb-8 text-black">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {content.subtitle} <br/>
            {content.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => onNavigate(content.primaryButton?.link as PageView || 'about')}
             className="px-8 py-4 bg-black text-white rounded-full text-lg font-bold transition-transform hover:scale-105 shadow-xl"
          >
            {content.primaryButton?.text || 'О Нас'}
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById('ecosystem-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-gray-100 text-black rounded-full text-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            {content.secondaryButton?.text || 'Все Проекты'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
