export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  robots?: string;
  og?: {
    title?: string;
    description?: string;
    imageId?: number;
    imageUrl?: string;
    type?: 'website' | 'article' | 'product';
    siteName?: string;
    locale?: string;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    title?: string;
    description?: string;
    imageUrl?: string;
    site?: string;
    creator?: string;
  };
  jsonLd?: Record<string, any>;
  autoSuggestions?: {
    titleSuggestions?: string[];
    descriptionSuggestions?: string[];
    generatedAt?: string;
  };
}

export interface SEOValidationResult {
  valid: boolean;
  warnings: SEOWarning[];
  score: number;
}

export interface SEOWarning {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export function validateSEO(seo: SEOData, content?: string): SEOValidationResult {
  const warnings: SEOWarning[] = [];
  let score = 100;

  if (!seo.title) {
    warnings.push({ field: 'title', message: 'SEO title is missing', severity: 'error' });
    score -= 20;
  } else {
    if (seo.title.length < 30) {
      warnings.push({ field: 'title', message: 'SEO title is too short (recommended: 50-70 characters)', severity: 'warning' });
      score -= 5;
    } else if (seo.title.length > 70) {
      warnings.push({ field: 'title', message: 'SEO title is too long (recommended: 50-70 characters)', severity: 'warning' });
      score -= 5;
    }
  }

  if (!seo.description) {
    warnings.push({ field: 'description', message: 'Meta description is missing', severity: 'error' });
    score -= 15;
  } else {
    if (seo.description.length < 50) {
      warnings.push({ field: 'description', message: 'Meta description is too short (recommended: 50-160 characters)', severity: 'warning' });
      score -= 5;
    } else if (seo.description.length > 160) {
      warnings.push({ field: 'description', message: 'Meta description is too long (recommended: 50-160 characters)', severity: 'warning' });
      score -= 5;
    }
  }

  if (!seo.og?.title) {
    warnings.push({ field: 'og.title', message: 'Open Graph title is missing', severity: 'warning' });
    score -= 5;
  }

  if (!seo.og?.description) {
    warnings.push({ field: 'og.description', message: 'Open Graph description is missing', severity: 'warning' });
    score -= 5;
  }

  if (!seo.og?.imageUrl && !seo.og?.imageId) {
    warnings.push({ field: 'og.image', message: 'Open Graph image is missing (important for social sharing)', severity: 'warning' });
    score -= 10;
  }

  if (!seo.canonical) {
    warnings.push({ field: 'canonical', message: 'Canonical URL is not set', severity: 'info' });
  }

  if (!seo.robots) {
    warnings.push({ field: 'robots', message: 'Robots directive is not set (defaulting to index,follow)', severity: 'info' });
  }

  if (!seo.jsonLd) {
    warnings.push({ field: 'jsonLd', message: 'Structured data (JSON-LD) is not set', severity: 'info' });
    score -= 5;
  }

  return {
    valid: !warnings.some(w => w.severity === 'error'),
    warnings,
    score: Math.max(0, score),
  };
}

export function generateDefaultSEO(page: { title: string; slug: string; content?: any[] }, baseUrl: string): SEOData {
  const extractTextFromContent = (content: any[]): string => {
    if (!content || !Array.isArray(content)) return '';
    
    let text = '';
    for (const block of content) {
      if (block.props?.title) text += block.props.title + ' ';
      if (block.props?.subtitle) text += block.props.subtitle + ' ';
      if (block.props?.content && typeof block.props.content === 'string') {
        text += block.props.content.replace(/<[^>]*>/g, '') + ' ';
      }
      if (block.props?.description) text += block.props.description + ' ';
    }
    return text.trim();
  };

  const contentText = extractTextFromContent(page.content || []);
  const description = contentText.length > 160 
    ? contentText.substring(0, 157) + '...' 
    : contentText || page.title;

  return {
    title: page.title,
    description,
    keywords: [],
    canonical: `${baseUrl}${page.slug === '/' ? '' : '/' + page.slug}`,
    robots: 'index,follow',
    og: {
      title: page.title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description,
    },
    jsonLd: generateOrganizationSchema(baseUrl),
  };
}

export function generateOrganizationSchema(baseUrl: string): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CreativeGroup',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [],
  };
}

export function generateArticleSchema(article: {
  title: string;
  description?: string;
  author?: string;
  publishedAt?: string;
  imageUrl?: string;
}, baseUrl: string): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author || 'CreativeGroup',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CreativeGroup',
      url: baseUrl,
    },
    datePublished: article.publishedAt,
    image: article.imageUrl,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function mergeSEO(base: SEOData, override: Partial<SEOData>): SEOData {
  return {
    ...base,
    ...override,
    og: { ...base.og, ...override.og },
    twitter: { ...base.twitter, ...override.twitter },
    keywords: override.keywords?.length ? override.keywords : base.keywords,
    jsonLd: override.jsonLd || base.jsonLd,
  };
}
