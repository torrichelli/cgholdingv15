
export type PageView = 'home' | 'studio' | 'tech' | 'market' | 'logiflex' | 'nexium' | 'media' | 'gaming' | 'yoursite' | 'jobhunt' | 'about' | 'contact' | 'research' | 'career' | 'technologies' | 'investors' | 'article' | 'privacy' | 'terms' | 'status' | 'cms';

export interface DivisionData {
  id: PageView;
  title: string;
  tagline: string;
  ecosystemRole: string;
  description: string; // Used for short description/SEO
  aboutProject: string; // "О проекте"
  
  icon: string;
  theme: 'light' | 'dark';
  accentColor: string;
  
  heroImage?: string; 
  
  // 3. Основные услуги / функции
  modules: { 
    title: string; 
    content: string; // Short description
    icon?: string 
  }[];

  // 4. Уникальные преимущества (Why us?)
  advantages: string[];

  // 5. Кейсы
  cases: { 
    client: string; 
    title: string; 
    result: string; 
    description: string;
    image?: string;
  }[];

  // 6. Интеграции с CreativeGroup
  projectIntegrations: string[];

  // 7. Ссылка на сайт
  websiteUrl: string;

  // Legacy/Optional props kept for compatibility if needed, but structure focuses on above
  specs?: { category: string; items: { label: string; value: string }[] }[];
  faq?: { question: string; answer: string }[];
  process?: { title: string; steps: { title: string; description: string }[] }; 
  catalog?: { title: string; items: { title: string; description: string }[] };
  adminFeatures?: { title: string; items: { title: string; description: string }[] };
  stats?: { label: string; value: string }[];
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
  image: string; // placeholder color or url
  content: string; // HTML string
  relatedIds: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  company: string; // 'CreativeTech', 'CreativeStudio' etc.
  location: string;
  type: string; // 'Full-time', 'Remote'
  description: string;
  requirements: string[];
}

export interface CareerValue {
  title: string;
  desc: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export interface ServiceStatusItem {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: string;
  lastUpdated: string;
  description: string;
}

export interface StatusIncident {
  date: string;
  time: string;
  status: 'operational' | 'degraded' | 'outage';
  title: string;
  description: string;
  resolvedTime?: string;
}
