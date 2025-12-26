// SEO Configuration for all pages
export const seoConfig = {
  siteUrl: 'https://ayonix.com',
  siteName: 'Ayonix AI',
  defaultTitle: 'Ayonix AI - Enterprise AI Agent Platform',
  defaultDescription: 'Enterprise AI Agent Platform - Build, operate, and scale intelligent AI agents for Healthcare, Corporate, Finance, and Government sectors.',
  defaultImage: '/og-image.png',
  twitterHandle: '@ayonixjp',
};

export const pagesSEO = {
  home: {
    title: 'Ayonix AI - Enterprise AI Agent Platform | AI Solutions for Business',
    description: 'Enterprise AI Agent Platform - Build, operate, and scale intelligent AI agents. Featuring ATLAS AI Agent, Video Analytics, Face Recognition, and Conversational AI solutions for Healthcare, Corporate, Finance, and Government.',
    keywords: ['AI Agent', 'Enterprise AI', 'Artificial Intelligence', 'Machine Learning', 'Business AI'],
  },
  products: {
    'atlas-ai-agent': {
      title: 'ATLAS AI Agent - Enterprise AI Assistant',
      description: 'ATLAS AI Agent is an intelligent enterprise assistant that automates workflows, provides instant answers, and enhances productivity. 10x faster response times with 70% cost reduction.',
      keywords: ['AI Agent', 'Enterprise Assistant', 'Workflow Automation', 'AI Chatbot', 'Business Intelligence'],
      image: '/images/atlas-ai-agent.jpg',
    },
    'atlas-code-agent': {
      title: 'ATLAS Code-Agent - AI Coding Assistant',
      description: 'ATLAS Code-Agent is an AI-powered coding assistant that helps developers write, review, and debug code faster. Supports 50+ programming languages with intelligent suggestions.',
      keywords: ['AI Coding', 'Code Assistant', 'Developer Tools', 'Code Review', 'Programming AI'],
      image: '/images/atlas-code-agent.jpg',
    },
    'atlas-smartglass': {
      title: 'ATLAS Smartglass - AR AI Assistant',
      description: 'ATLAS Smartglass combines augmented reality with AI to provide hands-free assistance for field workers, technicians, and professionals. Real-time guidance and information overlay.',
      keywords: ['AR Glasses', 'Smart Glasses', 'Augmented Reality', 'Hands-free AI', 'Wearable Technology'],
      image: '/images/atlas-smartglass.jpg',
    },
    'video-analytics': {
      title: 'Video Analytics - AI-Powered Surveillance & Analysis',
      description: 'Advanced AI video analytics for security, retail, and smart cities. Features include face recognition, object detection, people counting, and behavior analysis with 99.9% accuracy.',
      keywords: ['Video Analytics', 'AI Surveillance', 'Face Recognition', 'Object Detection', 'Security AI'],
      image: '/images/video-analytics-dashboard.jpg',
    },
    'atlas-box': {
      title: 'ATLAS BOX - Edge AI Computing Device',
      description: 'ATLAS BOX is a compact edge AI device with 6+ TOPS performance, 4TB NVMe storage, and built-in AI capabilities including chatbot, video analytics, and VMS. Perfect for on-premise AI deployment.',
      keywords: ['Edge AI', 'AI Hardware', 'Edge Computing', 'On-premise AI', 'AI Box'],
      image: '/images/atlas-box-front.png',
    },
  },
  useCases: {
    'company-rag': {
      title: 'Company RAG - AI-Powered Document Retrieval',
      description: 'Implement Retrieval-Augmented Generation (RAG) for your company. Access and query internal documents, policies, and knowledge bases with natural language.',
      keywords: ['RAG', 'Document AI', 'Knowledge Management', 'Enterprise Search', 'AI Retrieval'],
    },
    'employment-training': {
      title: 'Employment Training - AI-Powered Learning Platform',
      description: 'Personalized AI-driven training programs for employee onboarding and skill development. Adaptive learning paths with real-time progress tracking.',
      keywords: ['AI Training', 'Employee Learning', 'Corporate Training', 'Skill Development', 'E-Learning AI'],
    },
    'automated-posts': {
      title: 'Automated Posts - AI Content Creation',
      description: 'Generate engaging social media content, blog posts, and marketing materials with AI. Maintain brand consistency while scaling content production.',
      keywords: ['AI Content', 'Automated Marketing', 'Social Media AI', 'Content Generation', 'Marketing Automation'],
    },
    'offline-chatbot': {
      title: 'Offline Chatbot - On-Premise AI Assistant',
      description: 'Deploy AI chatbots that work without internet connectivity. Perfect for secure environments, remote locations, and data-sensitive applications.',
      keywords: ['Offline AI', 'On-premise Chatbot', 'Secure AI', 'Private AI', 'Local AI'],
    },
    'code-assistant': {
      title: 'Code Assistant - AI Developer Tools',
      description: 'Boost developer productivity with AI-powered code completion, review, and debugging. Supports multiple languages and integrates with popular IDEs.',
      keywords: ['Code AI', 'Developer Assistant', 'Code Completion', 'AI Programming', 'IDE Integration'],
    },
    'face-recognition': {
      title: 'Face Recognition - Biometric AI Technology',
      description: 'Enterprise-grade face recognition for access control, attendance, and identity verification. High accuracy with anti-spoofing protection.',
      keywords: ['Face Recognition', 'Biometric AI', 'Access Control', 'Identity Verification', 'Facial Recognition'],
    },
  },
  solutions: {
    healthcare: {
      title: 'Healthcare AI Solutions - Medical AI Applications',
      description: 'AI solutions for healthcare including patient engagement, medical documentation, diagnostic assistance, and administrative automation.',
      keywords: ['Healthcare AI', 'Medical AI', 'Patient Care AI', 'Health Technology', 'Medical Automation'],
    },
    corporate: {
      title: 'Corporate AI Solutions - Business Intelligence',
      description: 'Enterprise AI solutions for workflow automation, customer service, data analysis, and decision support. Transform your business with AI.',
      keywords: ['Corporate AI', 'Business AI', 'Enterprise Solutions', 'Workflow Automation', 'Business Intelligence'],
    },
    finance: {
      title: 'Finance AI Solutions - Financial Technology',
      description: 'AI solutions for financial services including fraud detection, risk assessment, customer service automation, and regulatory compliance.',
      keywords: ['Finance AI', 'FinTech', 'Fraud Detection', 'Risk AI', 'Financial Automation'],
    },
    government: {
      title: 'Government AI Solutions - Public Sector AI',
      description: 'AI solutions for government agencies including citizen services, document processing, security applications, and smart city initiatives.',
      keywords: ['Government AI', 'Public Sector AI', 'Smart City', 'Citizen Services', 'Government Technology'],
    },
  },
  company: {
    about: {
      title: 'About Ayonix - Enterprise AI Company',
      description: 'Ayonix Corporation is a leading enterprise AI company founded in 2007. We provide AI solutions for businesses worldwide with offices in Tokyo and Melbourne.',
      keywords: ['Ayonix', 'AI Company', 'Enterprise AI', 'AI Technology', 'AI Solutions Provider'],
    },
    news: {
      title: 'News & Updates - Ayonix AI',
      description: 'Latest news, product updates, and announcements from Ayonix AI. Stay informed about our AI innovations and company developments.',
      keywords: ['Ayonix News', 'AI Updates', 'Product Announcements', 'Company News', 'AI Industry News'],
    },
    contact: {
      title: 'Contact Us - Ayonix AI',
      description: 'Contact Ayonix for enterprise AI solutions. Reach our sales team for product inquiries, demos, and partnership opportunities.',
      keywords: ['Contact Ayonix', 'AI Sales', 'Enterprise Inquiry', 'AI Demo', 'Business Contact'],
    },
  },
};

// Generate metadata for a page
export function generatePageMetadata(
  pageKey: string,
  subKey?: string
): {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
} {
  if (subKey) {
    const section = pagesSEO[pageKey as keyof typeof pagesSEO];
    if (section && typeof section === 'object' && subKey in section) {
      return (section as Record<string, any>)[subKey];
    }
  }
  
  const page = pagesSEO[pageKey as keyof typeof pagesSEO];
  if (page && 'title' in page) {
    return page as { title: string; description: string; keywords: string[]; image?: string };
  }
  
  return {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    keywords: ['AI', 'Enterprise AI', 'Ayonix'],
  };
}

// Generate Open Graph metadata
export function generateOGMetadata(
  title: string,
  description: string,
  image?: string,
  url?: string
) {
  return {
    title,
    description,
    url: url ? `${seoConfig.siteUrl}${url}` : seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    images: [
      {
        url: image ? `${seoConfig.siteUrl}${image}` : `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: 'en_US',
    type: 'website',
  };
}

// Generate Twitter metadata
export function generateTwitterMetadata(
  title: string,
  description: string,
  image?: string
) {
  return {
    card: 'summary_large_image',
    title,
    description,
    site: seoConfig.twitterHandle,
    creator: seoConfig.twitterHandle,
    images: [image ? `${seoConfig.siteUrl}${image}` : `${seoConfig.siteUrl}${seoConfig.defaultImage}`],
  };
}
