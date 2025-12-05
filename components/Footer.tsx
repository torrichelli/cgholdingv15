
import React from 'react';
import { PageView } from '../types';
import { useAuthStore } from '../stores/authStore';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  onOpenAuth?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAuth }) => {
  const { isAuthenticated, generateSSOToken } = useAuthStore();
  
  const handleCMSClick = async () => {
    if (isAuthenticated) {
      const result = await generateSSOToken('/admin');
      if (result) {
        window.location.href = result.ssoUrl;
      } else {
        onNavigate('cms');
      }
    } else {
      onOpenAuth?.();
    }
  };
  return (
    <footer className="bg-white pt-20 pb-10 px-6 border-t border-gray-200 text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2 md:col-span-1">
          <h3 onClick={() => onNavigate('home')} className="text-2xl font-bold mb-4 cursor-pointer hover:opacity-80 transition-opacity">CreativeGroup</h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Группа технологических компаний.<br/>
            Мы создаем цифровые продукты для бизнеса и жизни.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Проекты</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><button onClick={() => onNavigate('studio')} className="hover:text-black transition-colors">CreativeStudio</button></li>
            <li><button onClick={() => onNavigate('tech')} className="hover:text-black transition-colors">CreativeTech</button></li>
            <li><button onClick={() => onNavigate('media')} className="hover:text-black transition-colors">CreativeMedia</button></li>
            <li><button onClick={() => onNavigate('gaming')} className="hover:text-black transition-colors">CreativeGaming</button></li>
            <li><button onClick={() => onNavigate('yoursite')} className="hover:text-black transition-colors">YourSite</button></li>
            <li><button onClick={() => onNavigate('logiflex')} className="hover:text-black transition-colors">LogiFlex</button></li>
            <li><button onClick={() => onNavigate('jobhunt')} className="hover:text-black transition-colors">JobHunt</button></li>
            <li><button onClick={() => onNavigate('nexium')} className="hover:text-black transition-colors">Nexium</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">О нас</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><button onClick={() => onNavigate('about')} className="hover:text-black transition-colors">О Компании</button></li>
            <li><button onClick={() => onNavigate('investors')} className="hover:text-black transition-colors">Инвесторам</button></li>
            <li><button onClick={() => onNavigate('career')} className="hover:text-black transition-colors">Карьера</button></li>
            <li><button onClick={() => onNavigate('research')} className="hover:text-black transition-colors">Блог</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-black transition-colors">Контакты</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Инфо</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><button onClick={() => onNavigate('privacy')} className="hover:text-black transition-colors">Политика конфиденциальности</button></li>
            <li><button onClick={() => onNavigate('terms')} className="hover:text-black transition-colors">Условия использования</button></li>
            <li><button onClick={() => onNavigate('status')} className="hover:text-black transition-colors flex items-center gap-2">Статус сервисов <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/></button></li>
            <li><button onClick={handleCMSClick} className="hover:text-black transition-colors opacity-50 hover:opacity-100 mt-4">CreativeCMS (Admin)</button></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <p>© 2025 CreativeGroup. Все права защищены.</p>
        <div className="flex gap-6">
          <span className="hover:text-black cursor-pointer">Instagram</span>
          <span className="hover:text-black cursor-pointer">LinkedIn</span>
          <span className="hover:text-black cursor-pointer">Facebook</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
