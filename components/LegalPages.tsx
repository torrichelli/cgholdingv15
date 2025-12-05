
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Lock, FileText, CheckCircle } from 'lucide-react';

interface LegalPageProps {
  onBack: () => void;
}

const SidebarLink = ({ id, label, activeId }: { id: string, label: string, activeId: string }) => (
  <a 
    href={`#${id}`}
    className={`block py-2 px-4 border-l-2 text-sm transition-colors ${
      activeId === id 
        ? 'border-black text-black font-bold' 
        : 'border-transparent text-gray-500 hover:text-gray-800'
    }`}
  >
    {label}
  </a>
);

export const PrivacyPolicy: React.FC<LegalPageProps> = ({ onBack }) => {
  const [activeId, setActiveId] = useState('intro');

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const sections = ['intro', 'collection', 'usage', 'sharing', 'rights', 'cookies', 'security'];
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < 300) {
            setActiveId(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft size={20} /> Назад
        </button>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Политика конфиденциальности</h1>
        <p className="text-xl text-gray-500 max-w-3xl">
          Как CreativeGroup обрабатывает и защищает ваши персональные данные. Мы ценим ваше доверие и стремимся к максимальной прозрачности.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="hidden md:block col-span-1">
          <div className="sticky top-32 space-y-1">
             <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">Оглавление</div>
             <SidebarLink id="intro" label="О компании" activeId={activeId} />
             <SidebarLink id="collection" label="Сбор данных" activeId={activeId} />
             <SidebarLink id="usage" label="Использование" activeId={activeId} />
             <SidebarLink id="sharing" label="Передача третьим лицам" activeId={activeId} />
             <SidebarLink id="rights" label="Права пользователя" activeId={activeId} />
             <SidebarLink id="cookies" label="Файлы Cookie" activeId={activeId} />
             <SidebarLink id="security" label="Защита данных" activeId={activeId} />
          </div>
        </div>

        {/* Content */}
        <div className="col-span-3 prose prose-lg prose-slate max-w-none">
          
          <section id="intro" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <ShieldCheck className="text-blue-600" /> О компании
            </h2>
            <p>
              Данная политика описывает правила обработки данных компанией <strong>CreativeGroup Inc.</strong> и всеми её дочерними подразделениями (CreativeStudio, CreativeTech, LogiFlex, и др.).
            </p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 not-prose">
               <ul className="space-y-2 text-sm text-gray-600">
                 <li><strong>Юридическое название:</strong> CreativeGroup Solutions LLP</li>
                 <li><strong>Адрес:</strong> Казахстан, Алматы, Esentai Tower, 25 этаж</li>
                 <li><strong>Email DPO:</strong> privacy@creativegroup.com</li>
               </ul>
            </div>
          </section>

          <section id="collection" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold mb-4">Какие данные мы собираем</h2>
            <p>Мы собираем только ту информацию, которая необходима для корректной работы наших сервисов:</p>
            <ul>
              <li><strong>Личные данные:</strong> Имя, фамилия, адрес электронной почты, номер телефона (при регистрации).</li>
              <li><strong>Данные аккаунтов:</strong> Логины, хэшированные пароли, история заказов в CreativeMarket/Gaming.</li>
              <li><strong>Технические данные:</strong> IP-адрес, тип браузера, версия ОС, часовой пояс.</li>
              <li><strong>Данные использования:</strong> Логи активности, клики, время на сайте (обезличенно).</li>
            </ul>
          </section>

          <section id="usage" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold mb-4">Как мы используем данные</h2>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
               <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-bold mb-2">Предоставление услуг</h3>
                  <p className="text-sm text-gray-600">Для авторизации в CreativeID, обработки заказов LogiFlex и покупок на YourSite.</p>
               </div>
               <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-bold mb-2">Улучшение качества</h3>
                  <p className="text-sm text-gray-600">Анализ ошибок приложений и оптимизация интерфейсов на основе метрик.</p>
               </div>
               <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-bold mb-2">Коммуникация</h3>
                  <p className="text-sm text-gray-600">Отправка сервисных уведомлений, чеков и (с согласия) новостей.</p>
               </div>
               <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-bold mb-2">Безопасность</h3>
                  <p className="text-sm text-gray-600">Обнаружение и предотвращение мошенничества и кибератак.</p>
               </div>
            </div>
          </section>

          <section id="sharing" className="mb-16 scroll-mt-32">
             <h2 className="text-2xl font-bold mb-4">Передача данных третьим лицам</h2>
             <p>Мы <strong>не продаем</strong> ваши данные. Передача возможна только доверенным партнерам для обеспечения работы сервиса:</p>
             <ul>
               <li><strong>Хостинг и инфраструктура:</strong> AWS, Google Cloud (хранение зашифрованных данных).</li>
               <li><strong>Платежи:</strong> Stripe, Kaspi Pay (обработка транзакций, мы не храним полные номера карт).</li>
               <li><strong>Аналитика:</strong> Google Analytics (обезличенные данные).</li>
             </ul>
          </section>

          <section id="rights" className="mb-16 scroll-mt-32">
             <h2 className="text-2xl font-bold mb-4">Ваши права</h2>
             <p>Согласно GDPR и локальному законодательству, вы имеете право:</p>
             <ul className="list-disc pl-6 space-y-2">
               <li>Запросить копию всех ваших данных (экспорт из CreativeID).</li>
               <li>Потребовать удаления аккаунта и всех связанных данных ("Право на забвение").</li>
               <li>Отозвать согласие на маркетинговые рассылки в любой момент.</li>
             </ul>
          </section>

          <section id="cookies" className="mb-16 scroll-mt-32">
             <h2 className="text-2xl font-bold mb-4">Файлы Cookie</h2>
             <p>Мы используем cookies для сохранения сессии авторизации и настроек языка. Вы можете отключить их в браузере, но некоторые функции сайта могут стать недоступны.</p>
          </section>

          <section id="security" className="mb-16 scroll-mt-32">
             <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
               <Lock className="text-blue-600" /> Защита данных
             </h2>
             <p>Мы используем стандарты индустрии:</p>
             <ul>
               <li>Шифрование AES-256 для данных в покое.</li>
               <li>TLS 1.3 для всех сетевых соединений.</li>
               <li>Двухфакторная аутентификация (2FA) для доступа сотрудников к базам данных.</li>
             </ul>
             <p className="text-sm text-gray-500 mt-8 pt-8 border-t border-gray-200">
               Последнее обновление: 15 Октября 2024 года. <br/>
               Мы уведомим вас об изменениях через email или уведомление в личном кабинете.
             </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export const TermsOfUse: React.FC<LegalPageProps> = ({ onBack }) => {
  const [activeId, setActiveId] = useState('intro');

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const sections = ['intro', 'definitions', 'usage', 'account', 'content', 'liability'];
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < 300) {
            setActiveId(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft size={20} /> Назад
        </button>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Условия использования</h1>
        <p className="text-xl text-gray-500 max-w-3xl">
          Правила использования экосистемы сервисов CreativeGroup. Пожалуйста, внимательно ознакомьтесь с документом.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="hidden md:block col-span-1">
          <div className="sticky top-32 space-y-1">
             <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">Оглавление</div>
             <SidebarLink id="intro" label="Введение" activeId={activeId} />
             <SidebarLink id="definitions" label="Определения" activeId={activeId} />
             <SidebarLink id="usage" label="Правила использования" activeId={activeId} />
             <SidebarLink id="account" label="Аккаунт" activeId={activeId} />
             <SidebarLink id="content" label="Контент и ИС" activeId={activeId} />
             <SidebarLink id="liability" label="Ответственность" activeId={activeId} />
          </div>
        </div>

        {/* Content */}
        <div className="col-span-3 prose prose-lg prose-slate max-w-none">
          
          <section id="intro" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <FileText className="text-black" /> Введение
            </h2>
            <p>
              Настоящее Соглашение регулирует отношения между ТОО "CreativeGroup" и пользователем сети Интернет, возникающие при использовании интернет-сервисов CreativeGroup (Studio, Tech, Media, Gaming, YourSite, LogiFlex, JobHunt).
            </p>
            <p>Используя любой из наших сервисов, вы подтверждаете свое согласие с данными условиями.</p>
          </section>

          <section id="definitions" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold mb-4">Определения</h2>
            <ul>
              <li><strong>«Сервисы»</strong> — сайты, приложения и платформы, принадлежащие CreativeGroup.</li>
              <li><strong>«Пользователь»</strong> — физическое лицо, использующее Сервисы.</li>
              <li><strong>«Контент»</strong> — тексты, графика, ПО и другие материалы, доступные на Сервисах.</li>
              <li><strong>«CreativeID»</strong> — единая учетная запись для доступа ко всем Сервисам.</li>
            </ul>
          </section>

          <section id="usage" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold mb-4">Использование сервисов</h2>
            <p>Пользователь обязуется:</p>
            <ul>
               <li>Не использовать сервисы для нарушения законодательства.</li>
               <li>Не предпринимать попыток взлома, парсинга или нарушения работы инфраструктуры.</li>
               <li>Не выдавать себя за другого человека.</li>
            </ul>
            <p>Мы оставляем за собой право ограничить доступ к сервисам при нарушении этих правил.</p>
          </section>

          <section id="account" className="mb-16 scroll-mt-32">
             <h2 className="text-2xl font-bold mb-4">Аккаунт пользователя</h2>
             <p>
               Вы несете полную ответственность за сохранность вашего пароля от CreativeID. 
               CreativeGroup не несет ответственности за убытки, возникшие в результате несанкционированного использования вашего аккаунта.
             </p>
          </section>

          <section id="content" className="mb-16 scroll-mt-32">
             <h2 className="text-2xl font-bold mb-4">Интеллектуальная собственность</h2>
             <p>
               Все материалы (дизайн, логотипы, код, тексты) являются собственностью CreativeGroup. 
               Копирование материалов без письменного разрешения запрещено.
             </p>
          </section>

          <section id="liability" className="mb-16 scroll-mt-32">
             <h2 className="text-2xl font-bold mb-4">Ограничение ответственности</h2>
             <p>
               Сервисы предоставляются на условиях «как есть» (as is). CreativeGroup не гарантирует, что сервисы будут соответствовать вашим ожиданиям 
               или работать бесперебойно (за исключением SLA для корпоративных клиентов LogiFlex/Nexium).
             </p>
             <div className="p-6 bg-red-50 rounded-2xl border border-red-100 text-red-800 text-sm not-prose">
                Мы не несем ответственности за косвенные убытки или упущенную выгоду, возникшие в результате использования наших сервисов.
             </div>
          </section>

        </div>
      </div>
    </div>
  );
};
