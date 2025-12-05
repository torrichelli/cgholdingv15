import { useState, useEffect } from 'react';

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  primaryButton: { text: string; link: string };
  secondaryButton: { text: string; link: string };
}

interface AboutContent {
  mission: { title: string; description: string };
  approach: { title: string; description: string }[];
  vision: { quote: string; description: string };
  values: { title: string; description: string }[];
  companies: { id: string; name: string; role: string; description: string }[];
}

interface TechnologiesContent {
  title: string;
  description: string;
  techStack: {
    frontend: string[];
    backend: string[];
    ai: string[];
    infra: string[];
  };
  advantages: { title: string; description: string }[];
}

interface InvestorsContent {
  title: string;
  description: string;
  financials: { label: string; value: string; change?: string }[];
  opportunities: { title: string; description: string }[];
  documents: { title: string; size: string }[];
}

interface CareerContent {
  title: string;
  subtitle: string;
  description: string;
  values: { title: string; description: string; icon?: string }[];
  benefits: { title: string; description: string }[];
}

interface ContactContent {
  title: string;
  description: string;
  office: { label: string; value: string };
  email: { label: string; value: string };
  successMessage: { title: string; description: string };
}

const defaultHero: HeroContent = {
  title: 'CreativeGroup',
  subtitle: 'Технологическая экосистема.',
  description: 'Мы создаем цифровые продукты для бизнеса и жизни.',
  primaryButton: { text: 'О Нас', link: 'about' },
  secondaryButton: { text: 'Все Проекты', link: 'technologies' },
};

const defaultAbout: AboutContent = {
  mission: {
    title: 'Мы объединяем разработки, медиа, маркетинг и дизайн в единую инфраструктуру.',
    description: 'CreativeGroup — это экосистема технологических, креативных и сервисных продуктов. Мы созданы, чтобы помогать бизнесам расти, масштабироваться и находить своё место в цифровом мире.',
  },
  approach: [
    { title: 'Экосистемность', description: 'Все проекты взаимосвязаны. Маркетинг усиливается технологиями, а продвижение — медиа-ресурсами.' },
    { title: 'Инновации', description: 'Мы создаём продукты, которые автоматизируют процессы и делают бизнес устойчивым.' },
    { title: 'Экспертиза', description: 'Команда разработчиков, маркетологов и продюсеров с многолетним опытом построения систем.' },
    { title: 'Партнерство', description: 'Мы выстраиваем отношения на долгосрок: прозрачность, гибкость, масштабируемость.' },
  ],
  vision: {
    quote: 'Мы создаём будущее, в котором бизнесы получают доступ ко всей инфраструктуре в одном месте.',
    description: 'От разработки до маркетинга, от медиа до логистики, от аналитики до найма.',
  },
  values: [
    { title: 'Ответственность', description: 'Отвечаем за результат.' },
    { title: 'Открытость', description: 'Честность во всём.' },
    { title: 'Креативность', description: 'Смелость мышления.' },
    { title: 'Технологичность', description: 'Опора на инновации.' },
    { title: 'Командность', description: 'Работаем как единый организм.' },
  ],
  companies: [
    { id: 'studio', name: 'CreativeStudio', role: 'Маркетинговое агентство', description: 'Создаём бренды, сайты, контент, рекламу.' },
    { id: 'tech', name: 'CreativeTech', role: 'Студия разработки', description: 'Сайты, CRM, SaaS, мобильные приложения.' },
    { id: 'media', name: 'CreativeMedia', role: 'Медиа о маркетинге', description: 'Новости, обзоры, аналитика, кейсы.' },
    { id: 'gaming', name: 'CreativeGaming', role: 'Киберспорт', description: 'Турниры, клубы, магазин для геймеров.' },
    { id: 'yoursite', name: 'YourSite', role: 'Маркетплейс сайтов', description: 'Каталог готовых решений для бизнеса.' },
    { id: 'logiflex', name: 'LogiFlex', role: 'Логистическая платформа', description: 'Трекинг, маршрутизация, оптимизация доставки.' },
    { id: 'jobhunt', name: 'JobHunt', role: 'HR Tech платформа', description: 'Поиск работы и умный скоринг кандидатов.' },
  ],
};

const defaultTechnologies: TechnologiesContent = {
  title: 'Мы создаём будущее цифровых решений',
  description: 'CreativeGroup использует самые современные технологии для стабильных и масштабируемых продуктов. От микросервисов до нейросетей.',
  techStack: {
    frontend: ['React 18', 'Vue.js', 'Next.js 14', 'Tailwind CSS', 'TypeScript'],
    backend: ['Node.js', 'Python (FastAPI)', 'Django', 'Express'],
    ai: ['PyTorch', 'TensorFlow', 'OpenAI API', 'Scikit-learn'],
    infra: ['AWS', 'Google Cloud', 'Docker', 'PostgreSQL', 'Redis', 'MongoDB'],
  },
  advantages: [
    { title: 'Скорость', description: 'Современные технологии (Next.js, Go) обеспечивают мгновенную загрузку и отклик.' },
    { title: 'AI Integration', description: 'Машинное обучение встроено в ядро бизнес-процессов (прогнозы, маршруты, аналитика).' },
    { title: 'Масштаб', description: 'Микросервисная архитектура позволяет расти без технического долга.' },
  ],
};

const defaultInvestors: InvestorsContent = {
  title: 'Инвесторам',
  description: 'CreativeGroup демонстрирует устойчивый рост капитализации за счет диверсификации технологического портфеля. Мы строим единорогов внутри экосистемы.',
  financials: [
    { label: 'Годовая выручка', value: '$120M', change: '+42% YoY' },
    { label: 'EBITDA', value: '$35M', change: '+15% YoY' },
    { label: 'R&D Инвестиции', value: '18%' },
  ],
  opportunities: [
    { title: 'Технологическое партнерство', description: 'Совместные R&D центры и интеграция ваших решений в нашу платформу.' },
    { title: 'Венчурные инвестиции', description: 'Возможность войти в капитал отдельных перспективных стартапов группы (JobHunt, YourSite).' },
    { title: 'Международная экспансия', description: 'Участие в масштабировании продуктов на рынки MENA и SEA.' },
  ],
  documents: [
    { title: 'Annual Report 2023', size: 'PDF • 12 MB' },
    { title: 'Q3 2024 Strategy Presentation', size: 'PDF • 8 MB' },
    { title: 'ESG Impact Report', size: 'PDF • 15 MB' },
    { title: 'Financial Audit 2023', size: 'PDF • 5 MB' },
  ],
};

const defaultCareer: CareerContent = {
  title: 'Присоединяйтесь к CreativeGroup',
  subtitle: 'Карьера',
  description: 'Мы создаём цифровое будущее, объединяя технологии, маркетинг и медиа. Найдите свою роль в нашей экосистеме.',
  values: [
    { title: 'Ответственность', description: 'Мы доверяем команде и ожидаем самостоятельности в принятии решений.', icon: 'ShieldCheck' },
    { title: 'Креативность', description: 'Поощряем нестандартные подходы к стандартным задачам.', icon: 'Palette' },
    { title: 'Технологичность', description: 'Используем лучшие инструменты и не боимся экспериментировать.', icon: 'Cpu' },
    { title: 'Командность', description: 'Успех продукта важнее личных амбиций. Мы играем в долгую.', icon: 'Users' },
    { title: 'Открытость', description: 'Прозрачные процессы, зарплаты и фидбек. Никакой политики.', icon: 'Heart' },
  ],
  benefits: [
    { title: 'Офис класса А+', description: 'Панорамные виды и зоны отдыха' },
    { title: 'Хакатоны', description: 'Регулярные технические мероприятия' },
    { title: 'Обучение', description: 'Бюджет на курсы и конференции' },
  ],
};

const defaultContact: ContactContent = {
  title: 'Свяжитесь с нами.',
  description: 'Готовы обсудить стратегическое партнерство или внедрение экосистемы?',
  office: { label: 'Офис', value: 'Almaty, Esentai Tower, 25th Floor' },
  email: { label: 'Email', value: 'hello@creativegroup.com' },
  successMessage: { title: 'Заявка принята.', description: 'Наш менеджер по работе с корпоративными клиентами свяжется с вами.' },
};

function useCMSData<T>(endpoint: string, defaultValue: T) {
  const [content, setContent] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/content/${endpoint}`)
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setContent({ ...defaultValue, ...data });
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [endpoint]);

  return { content, isLoading };
}

export function useHeroContent() {
  return useCMSData<HeroContent>('hero', defaultHero);
}

export function useAboutContent() {
  return useCMSData<AboutContent>('about', defaultAbout);
}

export function useTechnologiesContent() {
  return useCMSData<TechnologiesContent>('technologies', defaultTechnologies);
}

export function useInvestorsContent() {
  return useCMSData<InvestorsContent>('investors', defaultInvestors);
}

export function useCareerContent() {
  return useCMSData<CareerContent>('career', defaultCareer);
}

export function useContactContent() {
  return useCMSData<ContactContent>('contact', defaultContact);
}

export function useArticles(limit = 10) {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/content/articles?limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [limit]);

  return { articles, isLoading };
}

export function useProjects(workspace?: string) {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = workspace 
      ? `/api/content/projects?workspace=${workspace}`
      : '/api/content/projects';
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [workspace]);

  return { projects, isLoading };
}

export function useVacancies(workspace?: string) {
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = workspace 
      ? `/api/content/vacancies?workspace=${workspace}`
      : '/api/content/vacancies';
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setVacancies(data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [workspace]);

  return { vacancies, isLoading };
}

export { defaultHero, defaultAbout, defaultTechnologies, defaultInvestors, defaultCareer, defaultContact };
export type { HeroContent, AboutContent, TechnologiesContent, InvestorsContent, CareerContent, ContactContent };
