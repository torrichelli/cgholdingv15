
import React from 'react';
import { 
  Palette, Cpu, ShoppingCart, Truck, CreditCard, 
  Layers, Zap, Globe, ShieldCheck, Box, Activity, 
  Smartphone, Monitor, PenTool, Server, Layout, Code, Database, Lock, Cloud, Users,
  BarChart, Search, Play, FileText, Briefcase, MapPin, Terminal, Hexagon, Command, TrendingUp,
  Gamepad2, Newspaper, MousePointerClick, Eye, Clock, Mail, Share2, ArrowRight, Star,
  Linkedin, Facebook, MessageCircle, Heart, Smile
} from 'lucide-react';
import { DivisionData, PageView, Article, JobPosting, CareerValue } from './types';

export const DIVISIONS: DivisionData[] = [
  {
    id: 'studio',
    title: 'CreativeStudio',
    tagline: 'Маркетинговое агентство нового поколения',
    ecosystemRole: 'Design Center',
    description: 'Мы создаём бренды, разрабатываем сайты и формируем маркетинговые стратегии, которые помогают бизнесам расти.',
    aboutProject: 'CreativeStudio — агентство полного цикла, объединяющее экспертов по веб-дизайну, разработке, брендингу, контенту и рекламе. Наша миссия — усиливать компании через красивые, современные и эффективные цифровые решения.',
    icon: 'Palette',
    theme: 'light',
    accentColor: 'bg-zinc-900',
    modules: [
      { title: 'Разработка сайтов', content: 'Корпоративные сайты, лендинги, магазины любой сложности.', icon: 'Layout' },
      { title: 'Брендинг и дизайн', content: 'Логотипы, айдентика, брендбуки и визуальная стратегия.', icon: 'PenTool' },
      { title: 'Создание контента', content: 'Фото, видео, копирайтинг и моушн-дизайн.', icon: 'Play' },
      { title: 'Запуск рекламы', content: 'Таргет, контекст, SEO и аналитика трафика.', icon: 'Activity' },
      { title: 'UI/UX решения', content: 'Проектирование удобных и эстетичных интерфейсов.', icon: 'MousePointerClick' },
      { title: 'Упаковка бизнеса', content: 'Комплексный маркетинг для вывода продукта на рынок.', icon: 'Briefcase' }
    ],
    advantages: [
      "Команда профессионалов с опытом более 5 лет",
      "Глубокий подход к визуалу и стратегии",
      "Собственная система разработки от CreativeTech",
      "Интеграция с CreativeMedia для продвижения",
      "Контроль качества на всех этапах"
    ],
    projectIntegrations: [
      "Совместная работа с CreativeTech по разработке сложных решений",
      "Возможность продвижения через CreativeMedia",
      "Опциональное подключение аналитики CreativeAnalytics",
      "Поддержка SaaS-проекта YourSite"
    ],
    cases: [
      { client: 'Ритейл', title: 'Ребрединг сети кофеен', result: '+40% узнаваемость', description: 'Полное обновление визуального стиля и коммуникационной стратегии.' },
      { client: 'Финтех', title: 'Запуск необанка', result: '100k пользователей', description: 'Разработка интерфейсов и маркетинговая кампания запуска.' }
    ],
    websiteUrl: 'https://studio.creativegroup.com'
  },
  {
    id: 'tech',
    title: 'CreativeTech',
    tagline: 'Студия разработки цифровых продуктов',
    ecosystemRole: 'Development Studio',
    description: 'Мы создаём системы, которые работают вместо вас. Инженерия, дышащая эстетикой.',
    aboutProject: 'CreativeTech — это инженерное ядро холдинга. Мы специализируемся на создании высоконагруженных систем, мобильных приложений и автоматизации бизнес-процессов. Наша цель — внедрять технологии, которые экономят время и ресурсы.',
    icon: 'Cpu',
    theme: 'dark',
    accentColor: 'bg-blue-600',
    modules: [
      { title: 'Web-разработка', content: 'Сложные порталы, сервисы и PWA приложения.', icon: 'Globe' },
      { title: 'Mobile App', content: 'Нативная разработка под iOS и Android.', icon: 'Smartphone' },
      { title: 'CRM/ERP', content: 'Внедрение систем учета и управления ресурсами.', icon: 'Database' },
      { title: 'Автоматизация', content: 'Telegram-боты, парсеры и скрипты.', icon: 'Terminal' },
      { title: 'AI-интеграции', content: 'Внедрение нейросетей в бизнес-процессы.', icon: 'Zap' }
    ],
    advantages: [
      "Собственный R&D отдел и AI-лаборатория",
      "Использование современного стека (Go, Python, React)",
      "Гарантия безопасности данных (SOC2 стандарты)",
      "Высокая скорость работы и масштабируемость",
      "Техническая поддержка 24/7"
    ],
    projectIntegrations: [
      "Разрабатывает архитектуру для LogiFlex и Nexium",
      "Техническая база для маркетплейса YourSite",
      "Обеспечивает инфраструктуру для CreativeGaming",
      "Единая система авторизации CreativeID"
    ],
    cases: [
      { client: 'Логистика', title: 'ERP для перевозок', result: '-30% рутины', description: 'Автоматизация распределения заявок для крупного перевозчика.' },
      { client: 'E-com', title: 'Маркетплейс', result: 'Highload', description: 'Платформа, выдерживающая 50,000 запросов в секунду.' }
    ],
    websiteUrl: 'https://tech.creativegroup.com'
  },
  {
    id: 'media',
    title: 'CreativeMedia',
    tagline: 'Маркетинговое медиа нового поколения',
    ecosystemRole: 'Media',
    description: 'Новости, аналитика, интервью. Центральная медиа-площадка креативной индустрии.',
    aboutProject: 'CreativeMedia — это информационный хаб для предпринимателей, маркетологов и визионеров. Мы рассказываем о трендах, технологиях и людях, которые меняют индустрию. Наша миссия — просвещать и вдохновлять.',
    icon: 'Newspaper',
    theme: 'light',
    accentColor: 'bg-yellow-500',
    modules: [
      { title: 'Новости рынка', content: 'Оперативные сводки из мира Digital и Tech.', icon: 'Globe' },
      { title: 'Глубокая аналитика', content: 'Разборы кейсов, стратегий и рынков.', icon: 'BarChart' },
      { title: 'Интервью', content: 'Разговоры с топ-менеджерами и фаундерами.', icon: 'Users' },
      { title: 'Образование', content: 'Гайды, курсы и вебинары для профи.', icon: 'Play' },
      { title: 'Спецпроекты', content: 'Нативная реклама и коллаборации с брендами.', icon: 'Zap' }
    ],
    advantages: [
      "Аудитория более 50,000 профессионалов",
      "Эксклюзивный доступ к инсайдам CreativeGroup",
      "Высокая вовлеченность читателей",
      "Мультиформатность: текст, видео, подкасты"
    ],
    projectIntegrations: [
      "Информационная поддержка запусков CreativeStudio",
      "Публикация исследований от CreativeTech",
      "Освещение турниров CreativeGaming",
      "Привлечение талантов для JobHunt"
    ],
    cases: [
      { client: 'Tech Brand', title: 'Серия статей', result: '15k прочтений', description: 'Нативное продвижение нового SaaS продукта.' },
      { client: 'Conference', title: 'Медиа-партнерство', result: 'Sold out', description: 'Полное освещение отраслевой конференции.' }
    ],
    websiteUrl: 'https://media.creativegroup.com'
  },
  {
    id: 'gaming',
    title: 'CreativeGaming',
    tagline: 'Киберспортивный портал и маркетплейс',
    ecosystemRole: 'Gaming',
    description: 'Игры, турниры, комьюнити и магазин девайсов. Экосистема для геймеров.',
    aboutProject: 'CreativeGaming создает инфраструктуру для киберспорта. Мы объединяем онлайн-платформу для турниров, сеть компьютерных клубов и магазин профессиональной периферии. Мы строим сообщество, где гейминг — это стиль жизни.',
    icon: 'Gamepad2',
    theme: 'dark',
    accentColor: 'bg-purple-600',
    modules: [
      { title: 'Турнирная платформа', content: 'Организация онлайн-лиг и чемпионатов.', icon: 'Activity' },
      { title: 'Сеть клубов', content: 'Бронирование ПК и управление клубами.', icon: 'Monitor' },
      { title: 'Магазин девайсов', content: 'Продажа мышей, клавиатур и мерча.', icon: 'ShoppingCart' },
      { title: 'Комьюнити', content: 'Форумы, рейтинги игроков и команд.', icon: 'Users' }
    ],
    advantages: [
      "Собственная античит-система",
      "Интеграция с мировыми игровыми серверами",
      "Прямые поставки оборудования от вендоров",
      "Крупнейший призовой фонд в регионе"
    ],
    projectIntegrations: [
      "Использует сервера CreativeTech для низкого пинга",
      "Освещается в CreativeMedia (раздел Киберспорт)",
      "Использует платежные решения Nexium в клубах",
      "Логистика товаров через LogiFlex"
    ],
    cases: [
      { client: 'Game Publisher', title: 'Launch Tournament', result: '500 команд', description: 'Организация турнира в честь выхода игры.' },
      { client: 'Hardware Brand', title: 'Эксклюзивные продажи', result: '$50k выручка', description: 'Дроп лимитированной коллекции девайсов.' }
    ],
    websiteUrl: 'https://gaming.creativegroup.com'
  },
  {
    id: 'yoursite',
    title: 'YourSite',
    tagline: 'Маркетплейс готовых сайтов',
    ecosystemRole: 'Marketplace',
    description: 'Покупай. Легко. Быстро. Запускай бизнес за один клик.',
    aboutProject: 'YourSite — это платформа, где предприниматель может купить готовый сайт как товар. Без долгой разработки и брифов. Выбираете шаблон, мы адаптируем его под вас и запускаем за 24 часа. Идеально для старта.',
    icon: 'Layout',
    theme: 'light',
    accentColor: 'bg-pink-600',
    modules: [
      { title: 'Магазин шаблонов', content: 'Готовые решения для 50+ ниш бизнеса.', icon: 'ShoppingCart' },
      { title: 'Экспресс-запуск', content: 'Установка и настройка за 1 день.', icon: 'Zap' },
      { title: 'Хостинг и домен', content: 'Включены в стоимость пакета.', icon: 'Server' },
      { title: 'SEO-оптимизация', content: 'Базовая настройка для поисковиков.', icon: 'Search' }
    ],
    advantages: [
      "Самый быстрый запуск на рынке (от 24 часов)",
      "Дизайн премиум-класса от CreativeStudio",
      "Техническая база на Next.js (скорость загрузки)",
      "Нет скрытых ежемесячных платежей за CMS"
    ],
    projectIntegrations: [
      "Дизайны разработаны в CreativeStudio",
      "Техническая платформа поддерживается CreativeTech",
      "Интеграция доставки через LogiFlex",
      "Платежный шлюз через Nexium"
    ],
    cases: [
      { client: 'Цветочный бутик', title: 'Интернет-магазин', result: 'Старт за 24ч', description: 'Клиент начал принимать заказы на следующий день после покупки.' },
      { client: 'Строительная фирма', title: 'Корпоративный сайт', result: 'Рост заявок', description: 'Презентабельный сайт повысил доверие клиентов.' }
    ],
    websiteUrl: 'https://yoursite.creativegroup.com'
  },
  {
    id: 'logiflex',
    title: 'LogiFlex',
    tagline: 'Логистика, управляемая интеллектом',
    ecosystemRole: 'Logistics',
    description: 'Нейросетевое распределение заказов. Маршрутизация. Отслеживание.',
    aboutProject: 'LogiFlex — это SaaS платформа для автоматизации доставки. Наши алгоритмы строят оптимальные маршруты, экономя время и топливо. Мы делаем логистику прозрачной для бизнеса и удобной для клиентов.',
    icon: 'Truck',
    theme: 'light',
    accentColor: 'bg-emerald-600',
    modules: [
      { title: 'AI Маршрутизация', content: 'Автоматическое построение маршрутных листов.', icon: 'MapPin' },
      { title: 'Диспетчерская', content: 'Панель управления курьерами в реальном времени.', icon: 'Monitor' },
      { title: 'Мобильное приложение', content: 'Инструмент для водителя (iOS/Android).', icon: 'Smartphone' },
      { title: 'Трекинг для клиента', content: 'SMS-уведомления и отслеживание на карте.', icon: 'Eye' },
      { title: 'Аналитика', content: 'Отчеты по эффективности, топливу и времени.', icon: 'BarChart' }
    ],
    advantages: [
      "Снижение транспортных расходов до 30%",
      "Уменьшение времени планирования с часов до минут",
      "Учет пробок и временных окон доставки",
      "Легкая интеграция по API"
    ],
    projectIntegrations: [
      "Обеспечивает доставку товаров для CreativeGaming",
      "Встроен в магазины на платформе YourSite",
      "Разработан инженерами CreativeTech",
      "Интеграция с Nexium для приема оплат курьером"
    ],
    cases: [
      { client: 'Служба воды', title: 'Оптимизация флота', result: '-20% пробега', description: 'Внедрение автопланирования для 50 машин.' },
      { client: 'Darkstore', title: 'Экспресс-доставка', result: '15 мин', description: 'Сокращение среднего времени доставки.' }
    ],
    websiteUrl: 'https://logiflex.creativegroup.com'
  },
  {
    id: 'jobhunt',
    title: 'JobHunt',
    tagline: 'Портал поиска работы и найма',
    ecosystemRole: 'HR Tech',
    description: 'Умный подбор вакансий. Инструменты для HR и кандидатов.',
    aboutProject: 'JobHunt меняет рынок рекрутинга. Мы используем ИИ для идеального мэтчинга кандидатов и вакансий. Для компаний это мощная ATS система, для соискателей — карьерный консультант в кармане.',
    icon: 'Briefcase',
    theme: 'light',
    accentColor: 'bg-indigo-600',
    modules: [
      { title: 'База вакансий', content: 'Тысячи проверенных предложений.', icon: 'Search' },
      { title: 'AI Рекрутер', content: 'Автоматический скрининг резюме.', icon: 'Cpu' },
      { title: 'Конструктор CV', content: 'Создание профессионального резюме.', icon: 'FileText' },
      { title: 'Бренд работодателя', content: 'Страницы компаний и отзывы.', icon: 'Star' }
    ],
    advantages: [
      "Уникальный алгоритм совместимости",
      "Проверка всех работодателей вручную",
      "Инструменты для массового найма",
      "Встроенный видео-интервьюинг"
    ],
    projectIntegrations: [
      "Публикует вакансии всех компаний CreativeGroup",
      "Использует медийный ресурс CreativeMedia",
      "Технологическая платформа от CreativeTech",
      "Интеграция с корпоративными порталами"
    ],
    cases: [
      { client: 'Ритейлер', title: 'Массовый найм', result: '100 кассиров', description: 'Закрытие позиций перед новым годом за 2 недели.' },
      { client: 'IT Стартап', title: 'Поиск CTO', result: 'Нашли за 3 дня', description: 'Точечный подбор топ-менеджмента.' }
    ],
    websiteUrl: 'https://jobhunt.creativegroup.com'
  },
  {
    id: 'nexium',
    title: 'Nexium',
    tagline: 'POS-терминалы будущего',
    ecosystemRole: 'Fintech',
    description: 'Умная касса, аналитика и управление торговлей в одном устройстве.',
    aboutProject: 'Nexium — это не просто терминал для приема карт. Это полноценный компьютер для управления малым бизнесом. Склад, сотрудники, клиенты, аналитика — всё в одном стильном устройстве на базе Android.',
    icon: 'CreditCard',
    theme: 'dark',
    accentColor: 'bg-purple-700',
    modules: [
      { title: 'Прием платежей', content: 'Карты, NFC, QR, FacePay.', icon: 'CreditCard' },
      { title: 'Товароучет', content: 'Склад, инвентаризация, списания.', icon: 'Box' },
      { title: 'CRM', content: 'База клиентов и программы лояльности.', icon: 'Users' },
      { title: 'Аналитика', content: 'Дашборды продаж в реальном времени.', icon: 'TrendingUp' },
      { title: 'Фискализация', content: 'Отправка чеков в налоговую.', icon: 'FileText' }
    ],
    advantages: [
      "Работает офлайн до 24 часов",
      "Принимает все виды оплат",
      "Красивый дизайн, украшающий прилавок",
      "Бесплатное обновление ПО навсегда",
      "Замена устройства за 24 часа при поломке"
    ],
    projectIntegrations: [
      "Предустановлен на точках CreativeGaming",
      "Интегрирован с LogiFlex для курьеров",
      "Встроен в сайты на платформе YourSite",
      "Разработан совместно с CreativeTech"
    ],
    cases: [
      { client: 'Сеть пекарен', title: 'Автоматизация', result: '+15% выручка', description: 'Внедрение учета потерь и программы лояльности.' },
      { client: 'Фестиваль', title: 'Аренда касс', result: '100 терминалов', description: 'Организация безналичной зоны на фудкорте.' }
    ],
    websiteUrl: 'https://nexium.creativegroup.com'
  }
];

export const SYNERGIES = [
  { pair: "CreativeTech ↔ LogiFlex", desc: "Технологии разработки используются в AI-логистике." },
  { pair: "CreativeStudio ↔ CreativeMedia", desc: "Медиа поддерживает бренды и кампании агентства." },
  { pair: "YourSite ↔ CreativeTech", desc: "Готовые сайты создаются на технологической базе студии." },
  { pair: "CreativeGaming ↔ CreativeMedia", desc: "Медиа-статьи отражают жизнь комьюнити." },
  { pair: "JobHunt ↔ CreativeMedia", desc: "Медиа помогает пользователям узнавать о профессиях." },
  { pair: "CreativeTech ↔ JobHunt", desc: "AI-механизмы для подбора персонала." },
  { pair: "CreativeGroup ↔ Все компании", desc: "Единство философии, дизайна и методологии." }
];

export const PARTNERS = [
  "Kaspi", "1C", "Visa", "Mastercard", "Yandex", "Google"
];

export const NAV_ITEMS: { label: string; view: PageView }[] = [
  { label: 'Главная', view: 'home' },
  { label: 'О компании', view: 'about' },
  { label: 'Технологии', view: 'technologies' },
  { label: 'Инвесторам', view: 'investors' },
  { label: 'Статьи', view: 'research' },
  { label: 'Карьера', view: 'career' },
  { label: 'Контакты', view: 'contact' },
];

export const ARTICLES: Article[] = [
  {
    id: 'ai-retail',
    title: 'ИИ в ритейле: Как нейросети меняют поведение покупателей',
    subtitle: 'Глубокий анализ внедрения Nexium POS в сетях FMCG.',
    date: '12 Октября 2024',
    category: 'Research',
    author: { name: 'Алексей Смирнов', role: 'Head of AI at CreativeTech' },
    image: 'bg-purple-900',
    relatedIds: ['logistics-5', 'design-aesthetics'],
    content: `
      <h2>Введение</h2>
      <p>Искусственный интеллект перестал быть футуристической концепцией и стал реальным инструментом повышения продаж. В этом исследовании мы рассмотрим, как внедрение Nexium POS с модулем компьютерного зрения повлияло на выручку розничных сетей.</p>
      
      <h2>Что такое Smart Checkout?</h2>
      <p>Традиционные кассы требуют сканирования штрих-кода. Nexium использует камеры для распознавания товаров на весах или ленте. Это сокращает время обслуживания одного клиента с 45 до 12 секунд.</p>
      
      <blockquote>
        "Скорость — это новая валюта ритейла. Если клиент стоит в очереди, он уже думает о том, чтобы уйти."
      </blockquote>

      <h2>Результаты внедрения</h2>
      <p>Мы проанализировали данные 50 торговых точек за 3 месяца. Результаты показали:</p>
      <ul>
        <li>Увеличение пропускной способности на 35%</li>
        <li>Снижение ошибок кассиров на 90%</li>
        <li>Рост среднего чека за счет AI-рекомендаций на дисплее покупателя</li>
      </ul>

      <h2>Будущее за персонализацией</h2>
      <p>Следующий шаг — интеграция с программами лояльности через FaceID. Система будет узнавать клиента и предлагать любимые товары еще до того, как он подойдет к кассе.</p>
    `
  },
  {
    id: 'logistics-5',
    title: 'Логистика 5.0: Отслеживание без GPS',
    subtitle: 'Новые алгоритмы триангуляции и предиктивного анализа маршрутов в LogiFlex.',
    date: '28 Сентября 2024',
    category: 'Tech',
    author: { name: 'Мария Иванова', role: 'Lead Engineer at LogiFlex' },
    image: 'bg-emerald-900',
    relatedIds: ['ai-retail', 'design-aesthetics'],
    content: `
      <h2>Проблема "последней мили"</h2>
      <p>GPS не всегда работает идеально, особенно в плотной городской застройке или на подземных парковках. LogiFlex разработал новый алгоритм, использующий данные акселерометров и Wi-Fi сетей для точного позиционирования.</p>
      
      <h2>Алгоритм ShadowTrack</h2>
      <p>Наша технология анализирует микро-колебания сигнала сотовой сети. Это позволяет строить тепловую карту движения курьера даже там, где спутники недоступны.</p>

      <h2>Экономический эффект</h2>
      <p>Точность прогноза времени прибытия (ETA) выросла до 98%. Это снизило количество звонков в колл-центр на 40%, так как клиенты всегда видят реальное положение курьера.</p>
    `
  },
  {
    id: 'design-aesthetics',
    title: 'Эстетика корпоративного ПО',
    subtitle: 'Почему B2B интерфейсы должны быть такими же красивыми, как B2C приложения.',
    date: '15 Августа 2024',
    category: 'Design',
    author: { name: 'Елена Ким', role: 'Art Director at CreativeStudio' },
    image: 'bg-zinc-900',
    relatedIds: ['ai-retail', 'logistics-5'],
    content: `
      <h2>Миф о "серьезном" дизайне</h2>
      <p>Принято считать, что CRM или ERP системы должны быть серыми, сложными и утилитарными. Мы в CreativeGroup считаем иначе. Пользователь корпоративного софта — это тот же человек, который вечером листает Instagram.</p>
      
      <h2>Принципы CreativeUI</h2>
      <p>Мы перенесли принципы Apple Human Interface Guidelines в мир энтерпрайза:</p>
      <ul>
        <li>Много воздуха и отступов</li>
        <li>Четкая типографика (Inter/SF Pro)</li>
        <li>Микро-анимации для обратной связи</li>
      </ul>

      <h2>Влияние на эффективность</h2>
      <p>Красивый интерфейс снижает когнитивную нагрузку. Сотрудники меньше устают, совершают меньше ошибок и быстрее обучаются работе в системе.</p>
    `
  }
];

export const JOBS: JobPosting[] = [
  {
    id: 'fe-senior',
    title: 'Senior Frontend Developer (React)',
    company: 'CreativeTech',
    location: 'Алматы / Удаленно',
    type: 'Full-time',
    description: 'Мы ищем опытного инженера для разработки архитектуры новых продуктов холдинга. Вам предстоит работать над ядром UI-кита и микрофронтендами.',
    requirements: ['Опыт React 5+ лет', 'TypeScript, Next.js', 'Опыт настройки CI/CD', 'Умение писать тесты']
  },
  {
    id: 'py-lead',
    title: 'Python Team Lead',
    company: 'LogiFlex',
    location: 'Алматы',
    type: 'Full-time',
    description: 'Лидерство командой бэкенда. Разработка алгоритмов маршрутизации и оптимизации доставки.',
    requirements: ['Python, FastAPI', 'Опыт управления командой', 'Понимание алгоритмов (графы)', 'PostgreSQL, Redis']
  },
  {
    id: 'mark-dir',
    title: 'Marketing Director',
    company: 'CreativeStudio',
    location: 'Дубай / Релокация',
    type: 'Full-time',
    description: 'Стратегическое управление маркетингом для международных клиентов. Вывод брендов на рынки MENA.',
    requirements: ['Опыт в агентстве 5+ лет', 'Английский C1', 'Портфолио успешных кейсов', 'Управление бюджетом $100k+']
  },
  {
    id: 'ux-ui',
    title: 'Product Designer (UX/UI)',
    company: 'Nexium',
    location: 'Удаленно',
    type: 'Full-time',
    description: 'Проектирование интерфейсов для POS-терминалов. Задача - сделать сложный финтех простым и понятным для кассира.',
    requirements: ['Figma, Prototyping', 'Опыт в B2B SaaS', 'Системное мышление', 'Внимание к деталям']
  },
  {
    id: 'sales-b2b',
    title: 'B2B Sales Manager',
    company: 'JobHunt',
    location: 'Астана',
    type: 'Full-time',
    description: 'Продажа HR-решений корпоративным клиентам. Построение отдела продаж с нуля в регионе.',
    requirements: ['Опыт в B2B продажах', 'Нетворк в HR сфере', 'Навыки переговоров', 'Амбициозность']
  }
];

export const CAREER_VALUES: CareerValue[] = [
  { title: "Ответственность", desc: "Мы доверяем команде и ожидаем самостоятельности в принятии решений.", icon: "ShieldCheck" },
  { title: "Креативность", desc: "Поощряем нестандартные подходы к стандартным задачам.", icon: "Palette" },
  { title: "Технологичность", desc: "Используем лучшие инструменты и не боимся экспериментировать.", icon: "Cpu" },
  { title: "Командность", desc: "Успех продукта важнее личных амбиций. Мы играем в долгую.", icon: "Users" },
  { title: "Открытость", desc: "Прозрачные процессы, зарплаты и фидбек. Никакой политики.", icon: "Heart" }
];

export const ICON_MAP: Record<string, React.FC<any>> = {
  Palette, Cpu, ShoppingCart, Truck, CreditCard, 
  Layers, Zap, Globe, ShieldCheck, Box, Activity,
  Smartphone, Monitor, PenTool, Server, Layout, Code, Database, Lock, Cloud, Users,
  BarChart, Search, Play, FileText, Briefcase, MapPin, Terminal, Hexagon, Command, TrendingUp,
  Gamepad2, Newspaper, MousePointerClick, Eye, Clock, Mail, Share2, ArrowRight, Star,
  Linkedin, Facebook, MessageCircle, Heart, Smile
};
