'use client';

import Script from 'next/script';

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  brand?: string;
  category?: string;
  features?: string[];
  price?: string;
  priceCurrency?: string;
  availability?: string;
  rating?: number;
  reviewCount?: number;
}

export function ProductSchema({
  name,
  description,
  image,
  brand = 'Ayonix',
  category = 'Software',
  features = [],
  price = '0',
  priceCurrency = 'USD',
  availability = 'https://schema.org/InStock',
  rating = 4.8,
  reviewCount = 50,
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `https://ayonix.com${image}`,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    category,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability,
      seller: {
        '@type': 'Organization',
        name: 'Ayonix Corporation',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    ...(features.length > 0 && { additionalProperty: features.map(f => ({ '@type': 'PropertyValue', name: 'Feature', value: f })) }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  category?: string;
}

export function ArticleSchema({
  headline,
  description,
  image = '/og-image.png',
  datePublished,
  dateModified,
  author = 'Ayonix Corporation',
  category = 'Technology',
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: `https://ayonix.com${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://ayonix.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ayonix Corporation',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ayonix.com/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://ayonix.com/news',
    },
    articleSection: category,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  questions: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://ayonix.com${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface LocalBusinessSchemaProps {
  name?: string;
  address: {
    street?: string;
    city: string;
    region?: string;
    postalCode?: string;
    country: string;
  };
  phone?: string;
  email?: string;
}

export function LocalBusinessSchema({
  name = 'Ayonix Corporation',
  address,
  phone,
  email = 'infojp@ayonix.com',
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    telephone: phone,
    email,
    url: 'https://ayonix.com',
    priceRange: '$$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface VideoSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}

export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration = 'PT5M',
  contentUrl,
  embedUrl,
}: VideoSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: `https://ayonix.com${thumbnailUrl}`,
    uploadDate,
    duration,
    contentUrl,
    embedUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Ayonix Corporation',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ayonix.com/favicon.svg',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  operatingSystem?: string;
  applicationCategory?: string;
  features?: string[];
  rating?: number;
  reviewCount?: number;
}

export function SoftwareApplicationSchema({
  name,
  description,
  operatingSystem = 'Web, Windows, Linux, macOS',
  applicationCategory = 'BusinessApplication',
  features = [],
  rating = 4.8,
  reviewCount = 100,
}: SoftwareApplicationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    operatingSystem,
    applicationCategory,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Contact for enterprise pricing',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      ratingCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    featureList: features,
    author: {
      '@type': 'Organization',
      name: 'Ayonix Corporation',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
