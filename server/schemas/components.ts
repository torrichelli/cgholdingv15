export interface ComponentSchemaOps {
  editable: boolean;
  reorderable: boolean;
  repeatable: boolean;
  deletable: boolean;
}

export interface ComponentSchema {
  type: string;
  label: string;
  description: string;
  category: string;
  icon: string;
  ops: ComponentSchemaOps;
  properties: Record<string, PropertySchema>;
  required?: string[];
}

export interface PropertySchema {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'richtext' | 'image' | 'url' | 'color' | 'select' | 'icon';
  label: string;
  description?: string;
  default?: any;
  enum?: string[];
  enumLabels?: Record<string, string>;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  items?: PropertySchema;
  properties?: Record<string, PropertySchema>;
}

export const componentSchemaRegistry: Record<string, ComponentSchema> = {
  hero: {
    type: 'hero',
    label: 'Hero Section',
    description: 'Large header with title, subtitle, and background image',
    category: 'Layout',
    icon: 'Layout',
    ops: { editable: true, reorderable: false, repeatable: false, deletable: true },
    properties: {
      title: {
        type: 'string',
        label: 'Title',
        description: 'Main heading text',
        default: 'Welcome to Our Site',
        maxLength: 100,
      },
      subtitle: {
        type: 'string',
        label: 'Subtitle',
        description: 'Supporting text below title',
        default: 'Build something amazing',
        maxLength: 200,
      },
      imageUrl: {
        type: 'image',
        label: 'Background Image',
        description: 'Hero background image URL',
        default: '',
      },
      buttonText: {
        type: 'string',
        label: 'Button Text',
        default: 'Get Started',
        maxLength: 50,
      },
      buttonUrl: {
        type: 'url',
        label: 'Button URL',
        default: '#',
      },
      alignment: {
        type: 'select',
        label: 'Text Alignment',
        enum: ['left', 'center', 'right'],
        enumLabels: { left: 'Left', center: 'Center', right: 'Right' },
        default: 'center',
      },
      overlay: {
        type: 'boolean',
        label: 'Show Overlay',
        default: false,
      },
      overlayOpacity: {
        type: 'number',
        label: 'Overlay Opacity',
        min: 0,
        max: 100,
        default: 50,
      },
    },
    required: ['title'],
  },

  text: {
    type: 'text',
    label: 'Rich Text',
    description: 'Text editor with formatting options',
    category: 'Content',
    icon: 'Type',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      content: {
        type: 'richtext',
        label: 'Content',
        default: '<p>Start typing here...</p>',
      },
      fontSize: {
        type: 'select',
        label: 'Font Size',
        enum: ['sm', 'base', 'lg', 'xl', '2xl'],
        enumLabels: { sm: 'Small', base: 'Normal', lg: 'Large', xl: 'Extra Large', '2xl': '2X Large' },
        default: 'base',
      },
      align: {
        type: 'select',
        label: 'Text Alignment',
        enum: ['left', 'center', 'right'],
        default: 'left',
      },
    },
  },

  image: {
    type: 'image',
    label: 'Image',
    description: 'Single image with optional caption',
    category: 'Media',
    icon: 'Image',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      src: {
        type: 'image',
        label: 'Image Source',
        default: '',
      },
      alt: {
        type: 'string',
        label: 'Alt Text',
        description: 'Accessibility description',
        default: 'Image description',
        maxLength: 200,
      },
      caption: {
        type: 'string',
        label: 'Caption',
        default: '',
        maxLength: 300,
      },
      width: {
        type: 'select',
        label: 'Width',
        enum: ['full', 'large', 'medium', 'small'],
        enumLabels: { full: 'Full Width', large: 'Large', medium: 'Medium', small: 'Small' },
        default: 'full',
      },
      rounded: {
        type: 'boolean',
        label: 'Rounded Corners',
        default: false,
      },
      shadow: {
        type: 'boolean',
        label: 'Drop Shadow',
        default: false,
      },
    },
  },

  columns: {
    type: 'columns',
    label: 'Columns',
    description: 'Multi-column layout container',
    category: 'Layout',
    icon: 'Columns',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      columns: {
        type: 'select',
        label: 'Number of Columns',
        enum: ['2', '3', '4'],
        default: '2',
      },
      gap: {
        type: 'select',
        label: 'Gap Size',
        enum: ['sm', 'md', 'lg'],
        enumLabels: { sm: 'Small', md: 'Medium', lg: 'Large' },
        default: 'md',
      },
      verticalAlign: {
        type: 'select',
        label: 'Vertical Alignment',
        enum: ['top', 'center', 'bottom'],
        default: 'top',
      },
    },
  },

  cta: {
    type: 'cta',
    label: 'Call to Action',
    description: 'Action block with heading and button',
    category: 'Content',
    icon: 'MousePointerClick',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      title: {
        type: 'string',
        label: 'Title',
        default: 'Ready to get started?',
        maxLength: 100,
      },
      description: {
        type: 'string',
        label: 'Description',
        default: 'Join thousands of satisfied customers',
        maxLength: 300,
      },
      buttonText: {
        type: 'string',
        label: 'Button Text',
        default: 'Sign Up Now',
        maxLength: 50,
      },
      buttonUrl: {
        type: 'url',
        label: 'Button URL',
        default: '#',
      },
      variant: {
        type: 'select',
        label: 'Button Style',
        enum: ['primary', 'secondary', 'outline'],
        default: 'primary',
      },
      backgroundColor: {
        type: 'color',
        label: 'Background Color',
        default: '',
      },
    },
  },

  'feature-list': {
    type: 'feature-list',
    label: 'Feature List',
    description: 'List of features with icons',
    category: 'Content',
    icon: 'List',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      title: {
        type: 'string',
        label: 'Section Title',
        default: 'Our Features',
        maxLength: 100,
      },
      features: {
        type: 'array',
        label: 'Features',
        items: {
          type: 'object',
          label: 'Feature',
          properties: {
            icon: { type: 'icon', label: 'Icon', default: 'Zap' },
            title: { type: 'string', label: 'Title', default: 'Feature', maxLength: 50 },
            description: { type: 'string', label: 'Description', default: 'Feature description', maxLength: 200 },
          },
        },
        default: [
          { icon: 'Zap', title: 'Fast', description: 'Lightning fast performance' },
          { icon: 'Shield', title: 'Secure', description: 'Enterprise-grade security' },
          { icon: 'Sparkles', title: 'Modern', description: 'Built with latest tech' },
        ],
      },
      columns: {
        type: 'select',
        label: 'Columns',
        enum: ['2', '3', '4'],
        default: '3',
      },
    },
  },

  gallery: {
    type: 'gallery',
    label: 'Gallery',
    description: 'Image gallery with multiple layouts',
    category: 'Media',
    icon: 'Images',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      images: {
        type: 'array',
        label: 'Images',
        items: {
          type: 'object',
          label: 'Image',
          properties: {
            src: { type: 'image', label: 'Source' },
            alt: { type: 'string', label: 'Alt Text', maxLength: 200 },
            caption: { type: 'string', label: 'Caption', maxLength: 300 },
          },
        },
        default: [],
      },
      layout: {
        type: 'select',
        label: 'Layout',
        enum: ['grid', 'masonry', 'carousel'],
        default: 'grid',
      },
      columns: {
        type: 'select',
        label: 'Columns',
        enum: ['2', '3', '4'],
        default: '3',
      },
    },
  },

  testimonial: {
    type: 'testimonial',
    label: 'Testimonial',
    description: 'Customer testimonials',
    category: 'Content',
    icon: 'Quote',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      testimonials: {
        type: 'array',
        label: 'Testimonials',
        items: {
          type: 'object',
          label: 'Testimonial',
          properties: {
            quote: { type: 'string', label: 'Quote', maxLength: 500 },
            author: { type: 'string', label: 'Author', maxLength: 100 },
            role: { type: 'string', label: 'Role', maxLength: 100 },
            avatar: { type: 'image', label: 'Avatar' },
          },
        },
        default: [{ quote: 'Amazing product!', author: 'John Doe', role: 'CEO' }],
      },
      layout: {
        type: 'select',
        label: 'Layout',
        enum: ['single', 'grid', 'carousel'],
        default: 'single',
      },
    },
  },

  pricing: {
    type: 'pricing',
    label: 'Pricing',
    description: 'Pricing table',
    category: 'Content',
    icon: 'DollarSign',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      plans: {
        type: 'array',
        label: 'Pricing Plans',
        items: {
          type: 'object',
          label: 'Plan',
          properties: {
            name: { type: 'string', label: 'Plan Name', maxLength: 50 },
            price: { type: 'string', label: 'Price', maxLength: 20 },
            period: { type: 'string', label: 'Period', maxLength: 20 },
            description: { type: 'string', label: 'Description', maxLength: 200 },
            features: { type: 'array', label: 'Features', items: { type: 'string', label: 'Feature' } },
            buttonText: { type: 'string', label: 'Button Text', maxLength: 50 },
            buttonUrl: { type: 'url', label: 'Button URL' },
            highlighted: { type: 'boolean', label: 'Highlighted' },
          },
        },
        default: [],
      },
    },
  },

  faq: {
    type: 'faq',
    label: 'FAQ',
    description: 'Frequently asked questions',
    category: 'Content',
    icon: 'HelpCircle',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      title: {
        type: 'string',
        label: 'Section Title',
        default: 'Frequently Asked Questions',
        maxLength: 100,
      },
      items: {
        type: 'array',
        label: 'Questions',
        items: {
          type: 'object',
          label: 'FAQ Item',
          properties: {
            question: { type: 'string', label: 'Question', maxLength: 200 },
            answer: { type: 'string', label: 'Answer', maxLength: 1000 },
          },
        },
        default: [{ question: 'What is this?', answer: 'This is an answer.' }],
      },
      expandable: {
        type: 'boolean',
        label: 'Expandable',
        default: true,
      },
    },
  },

  video: {
    type: 'video',
    label: 'Video',
    description: 'Video player',
    category: 'Media',
    icon: 'Video',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      src: {
        type: 'url',
        label: 'Video URL',
        default: '',
      },
      type: {
        type: 'select',
        label: 'Video Type',
        enum: ['youtube', 'vimeo', 'file'],
        default: 'youtube',
      },
      autoplay: {
        type: 'boolean',
        label: 'Autoplay',
        default: false,
      },
      loop: {
        type: 'boolean',
        label: 'Loop',
        default: false,
      },
      muted: {
        type: 'boolean',
        label: 'Muted',
        default: false,
      },
      poster: {
        type: 'image',
        label: 'Poster Image',
        default: '',
      },
    },
  },

  spacer: {
    type: 'spacer',
    label: 'Spacer',
    description: 'Add vertical space',
    category: 'Layout',
    icon: 'Space',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      height: {
        type: 'number',
        label: 'Height',
        min: 0,
        max: 500,
        default: 48,
      },
      unit: {
        type: 'select',
        label: 'Unit',
        enum: ['px', 'rem', 'vh'],
        default: 'px',
      },
    },
  },

  divider: {
    type: 'divider',
    label: 'Divider',
    description: 'Horizontal line',
    category: 'Layout',
    icon: 'Minus',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      style: {
        type: 'select',
        label: 'Line Style',
        enum: ['solid', 'dashed', 'dotted'],
        default: 'solid',
      },
      thickness: {
        type: 'number',
        label: 'Thickness',
        min: 1,
        max: 10,
        default: 1,
      },
      color: {
        type: 'color',
        label: 'Color',
        default: '#e5e7eb',
      },
    },
  },

  form: {
    type: 'form',
    label: 'Form',
    description: 'Embedded form',
    category: 'Interactive',
    icon: 'FormInput',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      formId: {
        type: 'number',
        label: 'Form ID',
        default: 0,
      },
      title: {
        type: 'string',
        label: 'Title',
        default: '',
        maxLength: 100,
      },
      showLabels: {
        type: 'boolean',
        label: 'Show Labels',
        default: true,
      },
    },
  },

  code: {
    type: 'code',
    label: 'Code Block',
    description: 'Code with syntax highlighting',
    category: 'Content',
    icon: 'Code',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      code: {
        type: 'string',
        label: 'Code',
        default: '',
      },
      language: {
        type: 'select',
        label: 'Language',
        enum: ['javascript', 'typescript', 'python', 'html', 'css', 'json', 'bash', 'sql'],
        default: 'javascript',
      },
      showLineNumbers: {
        type: 'boolean',
        label: 'Show Line Numbers',
        default: true,
      },
      theme: {
        type: 'select',
        label: 'Theme',
        enum: ['dark', 'light'],
        default: 'dark',
      },
    },
  },

  embed: {
    type: 'embed',
    label: 'Embed',
    description: 'Embed HTML content',
    category: 'Interactive',
    icon: 'Globe',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      html: {
        type: 'string',
        label: 'HTML Code',
        default: '',
      },
      aspectRatio: {
        type: 'select',
        label: 'Aspect Ratio',
        enum: ['16:9', '4:3', '1:1'],
        default: '16:9',
      },
    },
  },

  'project-card': {
    type: 'project-card',
    label: 'Project Card',
    description: 'Display a project',
    category: 'Content',
    icon: 'Folder',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      projectId: {
        type: 'number',
        label: 'Project ID',
        default: 0,
      },
      showStatus: {
        type: 'boolean',
        label: 'Show Status',
        default: true,
      },
      showDescription: {
        type: 'boolean',
        label: 'Show Description',
        default: true,
      },
    },
  },

  'status-list': {
    type: 'status-list',
    label: 'Status List',
    description: 'Service status list',
    category: 'Content',
    icon: 'Activity',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      title: {
        type: 'string',
        label: 'Section Title',
        default: 'System Status',
        maxLength: 100,
      },
      showAll: {
        type: 'boolean',
        label: 'Show All Services',
        default: true,
      },
    },
  },

  grid: {
    type: 'grid',
    label: 'Grid',
    description: 'Grid container for blocks',
    category: 'Layout',
    icon: 'Grid3X3',
    ops: { editable: true, reorderable: true, repeatable: true, deletable: true },
    properties: {
      columns: {
        type: 'select',
        label: 'Columns',
        enum: ['2', '3', '4'],
        default: '3',
      },
      gap: {
        type: 'select',
        label: 'Gap Size',
        enum: ['sm', 'md', 'lg'],
        default: 'md',
      },
    },
  },
};

export function validateComponentData(type: string, data: Record<string, any>): { valid: boolean; errors: string[] } {
  const schema = componentSchemaRegistry[type];
  if (!schema) {
    return { valid: false, errors: [`Unknown component type: ${type}`] };
  }

  const errors: string[] = [];

  for (const requiredField of schema.required || []) {
    if (data[requiredField] === undefined || data[requiredField] === null || data[requiredField] === '') {
      errors.push(`Missing required field: ${requiredField}`);
    }
  }

  for (const [key, propSchema] of Object.entries(schema.properties)) {
    const value = data[key];
    if (value === undefined) continue;

    if (propSchema.type === 'string' && typeof value === 'string') {
      if (propSchema.maxLength && value.length > propSchema.maxLength) {
        errors.push(`${key} exceeds maximum length of ${propSchema.maxLength}`);
      }
      if (propSchema.minLength && value.length < propSchema.minLength) {
        errors.push(`${key} is shorter than minimum length of ${propSchema.minLength}`);
      }
    }

    if (propSchema.type === 'number' && typeof value === 'number') {
      if (propSchema.min !== undefined && value < propSchema.min) {
        errors.push(`${key} is less than minimum value of ${propSchema.min}`);
      }
      if (propSchema.max !== undefined && value > propSchema.max) {
        errors.push(`${key} is greater than maximum value of ${propSchema.max}`);
      }
    }

    if (propSchema.type === 'select' && propSchema.enum) {
      if (!propSchema.enum.includes(String(value))) {
        errors.push(`${key} has invalid value. Must be one of: ${propSchema.enum.join(', ')}`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

export function getDefaultProps(type: string): Record<string, any> {
  const schema = componentSchemaRegistry[type];
  if (!schema) return {};

  const defaults: Record<string, any> = {};
  for (const [key, propSchema] of Object.entries(schema.properties)) {
    if (propSchema.default !== undefined) {
      defaults[key] = propSchema.default;
    }
  }
  return defaults;
}

export function getComponentCategories(): string[] {
  const categories = new Set<string>();
  for (const schema of Object.values(componentSchemaRegistry)) {
    categories.add(schema.category);
  }
  return Array.from(categories);
}

export function getComponentsByCategory(category: string): ComponentSchema[] {
  return Object.values(componentSchemaRegistry).filter(s => s.category === category);
}
