import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Providers } from '@/components/providers';
import { ChatbotFAB } from '@/components/chatbot-fab';
import { VoiceController } from '@/components/voice-controller';

const inter = Inter({ subsets: ['latin'] });

// SEO Configuration
const siteConfig = {
  name: 'Ayonix AI',
  description: 'Enterprise AI Agent Platform - Build, operate, and scale intelligent AI agents for Healthcare, Corporate, Finance, and Government sectors. Featuring ATLAS AI Agent, Video Analytics, Face Recognition, and Conversational AI solutions.',
  url: 'https://ayonix.com',
  ogImage: 'https://ayonix.com/og-image.png',
  links: {
    linkedin: 'https://au.linkedin.com/company/ayonixco',
    twitter: 'https://x.com/ayonixjp',
    youtube: 'https://www.youtube.com/@Ayonixcorporation',
    facebook: 'https://www.facebook.com/Ayonix/',
  },
  keywords: [
    'AI Agent',
    'Enterprise AI',
    'Artificial Intelligence',
    'Machine Learning',
    'Face Recognition',
    'Video Analytics',
    'Conversational AI',
    'ATLAS AI',
    'AI Chatbot',
    'Computer Vision',
    'Edge AI',
    'AI Solutions',
    'Healthcare AI',
    'Corporate AI',
    'Government AI',
    'Finance AI',
    'RAG',
    'Code Assistant',
    'AI Training',
    'Ayonix',
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0d9488' },
    { media: '(prefers-color-scheme: dark)', color: '#0d9488' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Ayonix AI - Enterprise AI Agent Platform | AI Solutions for Business',
    template: '%s | Ayonix AI',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'Ayonix Corporation', url: siteConfig.url }],
  creator: 'Ayonix Corporation',
  publisher: 'Ayonix Corporation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: 'Ayonix AI - Enterprise AI Agent Platform',
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Ayonix AI - Enterprise AI Agent Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayonix AI - Enterprise AI Agent Platform',
    description: siteConfig.description,
    site: '@ayonixjp',
    creator: '@ayonixjp',
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en-US': siteConfig.url,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Replace with actual verification code
  },
  category: 'technology',
};

// Organization Schema for rich snippets
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ayonix Corporation',
  alternateName: 'Ayonix AI',
  url: siteConfig.url,
  logo: `${siteConfig.url}/favicon.svg`,
  description: siteConfig.description,
  foundingDate: '2007',
  sameAs: [
    siteConfig.links.linkedin,
    siteConfig.links.twitter,
    siteConfig.links.youtube,
    siteConfig.links.facebook,
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+61431901973',
      contactType: 'sales',
      email: 'infojp@ayonix.com',
      areaServed: ['AU', 'JP', 'US', 'GB', 'DE', 'FR'],
      availableLanguage: ['English', 'Japanese'],
    },
  ],
  address: [
    {
      '@type': 'PostalAddress',
      addressLocality: 'Tokyo',
      addressCountry: 'JP',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '470 St Kilda Rd',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      postalCode: '3004',
      addressCountry: 'AU',
    },
  ],
};

// Website Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    '@type': 'Organization',
    name: 'Ayonix Corporation',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// Software Application Schema for products
const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ATLAS AI Agent',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Windows, Linux',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Contact for enterprise pricing',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '150',
  },
  description: 'Enterprise AI Agent for intelligent automation, customer service, and business intelligence.',
  featureList: [
    'Natural Language Processing',
    'Voice Interaction',
    'Multi-language Support',
    'Custom Knowledge Base',
    'API Integration',
    'Analytics Dashboard',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://apps.abacus.ai" />
        {/* Chatbot script */}
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" async />
        {/* Google Analytics placeholder - replace with actual ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script> */}
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Navigation />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <ChatbotFAB />
          <VoiceController />
        </Providers>
      </body>
    </html>
  );
}
