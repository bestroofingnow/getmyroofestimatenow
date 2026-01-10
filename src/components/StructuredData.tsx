export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Instant Roof Estimate',
    alternateName: 'InstantRoofEstimate.ai',
    url: 'https://instantroofestimate.ai',
    logo: {
      '@type': 'ImageObject',
      url: 'https://instantroofestimate.ai/logo.png',
      width: 512,
      height: 512,
    },
    image: 'https://instantroofestimate.ai/logo.png',
    description: 'Get instant, accurate roof replacement estimates using satellite imagery. Free, fast, and no obligation. Serving homeowners nationwide.',
    slogan: 'Get Your Free Instant Roof Estimate in 60 Seconds',
    foundingDate: '2024',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceArea: {
      '@type': 'Country',
      name: 'United States',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: 'English',
        areaServed: 'US',
      },
    ],
    // Add social media profiles when created:
    // - Facebook: https://facebook.com/instantroofestimate
    // - Instagram: https://instagram.com/instantroofestimate
    // - LinkedIn: https://linkedin.com/company/instantroofestimate
    // - YouTube: https://youtube.com/@instantroofestimate
    sameAs: [
      // Add your social media profile URLs here
    ],
    knowsAbout: [
      'Roof replacement',
      'Roofing estimates',
      'Roofing contractors',
      'Satellite roof measurement',
      'Roof repair',
      'Asphalt shingles',
      'Metal roofing',
      'Tile roofing',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Instant Roof Estimate',
    url: 'https://instantroofestimate.ai',
    description: 'Get instant, accurate roof replacement estimates using satellite imagery.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://instantroofestimate.ai/?address={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Instant Roof Estimate',
    serviceType: 'Roof Estimation Service',
    provider: {
      '@type': 'Organization',
      name: 'Instant Roof Estimate',
      url: 'https://instantroofestimate.ai',
    },
    description: 'Get an instant, accurate roof replacement estimate using satellite imagery. Free, fast, and no obligation. Enter your address to receive your estimate in 60 seconds.',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Roof Estimation Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Free Instant Roof Estimate',
            description: 'Satellite-based roof measurement and cost estimate',
          },
          price: '0',
          priceCurrency: 'USD',
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Instant Roof Estimate',
    image: 'https://instantroofestimate.ai/logo.png',
    url: 'https://instantroofestimate.ai',
    description: 'Get instant, accurate roof replacement estimates using satellite imagery. Free estimates in 60 seconds.',
    priceRange: 'Free',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceArea: {
      '@type': 'Country',
      name: 'United States',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
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

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HowToSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Get a Free Instant Roof Estimate',
    description: 'Follow these simple steps to get an instant, accurate roof replacement estimate using satellite imagery.',
    totalTime: 'PT1M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter Your Address',
        text: 'Type your property address into the search box. Our system uses Google Places for accurate address lookup.',
        url: 'https://instantroofestimate.ai/#step1',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Confirm Your Property',
        text: 'Review the satellite image of your property to confirm we have the correct location.',
        url: 'https://instantroofestimate.ai/#step2',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Get Your Estimate',
        text: 'Our AI analyzes your roof dimensions and provides instant cost estimates for different material options.',
        url: 'https://instantroofestimate.ai/#step3',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Connect with a Contractor',
        text: 'Enter your contact information to receive a detailed quote from a licensed local roofing contractor.',
        url: 'https://instantroofestimate.ai/#step4',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Instant Roof Estimate',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online tool to get instant roof replacement estimates using satellite imagery and AI technology.',
    featureList: [
      'Satellite-based roof measurements',
      'Instant cost estimates',
      'Multiple material options',
      'No appointment needed',
      'Connect with local contractors',
    ],
    screenshot: 'https://instantroofestimate.ai/screenshot.png',
    url: 'https://instantroofestimate.ai',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Free Instant Roof Estimate',
    description: 'Get an instant, accurate roof replacement estimate using satellite imagery. Free, fast, and no obligation.',
    image: 'https://instantroofestimate.ai/logo.png',
    brand: {
      '@type': 'Brand',
      name: 'Instant Roof Estimate',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://instantroofestimate.ai',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ============================================================
// AEO (Answer Engine Optimization) Schemas
// ============================================================

interface BlogArticleSchemaProps {
  title: string;
  description: string;
  content: string;
  url: string;
  image?: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  keywords?: string[];
}

/**
 * Enhanced Article Schema for Blog Posts
 * Optimized for AI search engines and featured snippets
 */
export function ArticleSchema({
  title,
  description,
  content,
  url,
  image,
  publishedAt,
  updatedAt,
  author = 'Instant Roof Estimate Team',
  keywords = [],
}: BlogArticleSchemaProps) {
  // Extract first 2-3 sentences for speakable content
  const speakableContent = description.split(/[.!?]/).slice(0, 3).join('. ').trim() + '.';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': url,
    headline: title,
    description: description,
    image: image || 'https://instantroofestimate.ai/og-image.png',
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://instantroofestimate.ai/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Instant Roof Estimate',
      logo: {
        '@type': 'ImageObject',
        url: 'https://instantroofestimate.ai/logo.png',
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    articleSection: 'Roofing',
    inLanguage: 'en-US',
    // AEO: Speakable for voice search
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article h1', 'article p:first-of-type', '.article-summary'],
      xpath: ['/html/head/title', "/html/head/meta[@name='description']/@content"],
    },
    // AEO: About/mentions for entity connections
    about: {
      '@type': 'Thing',
      name: 'Roof Replacement',
      description: 'The process of removing an existing roof and installing a new roofing system',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface QASchemaProps {
  questions: {
    question: string;
    answer: string;
    votes?: number;
  }[];
  pageUrl: string;
}

/**
 * QAPage Schema for Question-Answer Content
 * Optimized for AI assistants and voice search
 */
export function QAPageSchema({ questions, pageUrl }: QASchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: questions.map((q, index) => ({
      '@type': 'Question',
      '@id': `${pageUrl}#question-${index + 1}`,
      name: q.question,
      text: q.question,
      answerCount: 1,
      upvoteCount: q.votes || 0,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
        upvoteCount: q.votes || 0,
        dateCreated: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: 'Instant Roof Estimate',
        },
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

/**
 * Speakable Schema for Voice Search Optimization
 * Marks content that is suitable for text-to-speech
 */
export function SpeakableSchema({
  headline,
  summary,
  url,
}: {
  headline: string;
  summary: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    name: headline,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-headline', '.speakable-summary', 'article > p:first-of-type'],
    },
    mainEntity: {
      '@type': 'Article',
      headline: headline,
      description: summary,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface HowToStepData {
  name: string;
  text: string;
  image?: string;
}

/**
 * Enhanced HowTo Schema with AEO optimization
 */
export function HowToArticleSchema({
  title,
  description,
  steps,
  totalTime,
  url,
}: {
  title: string;
  description: string;
  steps: HowToStepData[];
  totalTime: string; // ISO 8601 duration format
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    totalTime: totalTime,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
      url: `${url}#step-${index + 1}`,
    })),
    // AEO: Speakable for voice assistants
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.how-to-summary', '.step-instruction'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Local Service Schema with AEO optimization
 * For location-specific pages
 */
export function LocalServiceSchema({
  city,
  state,
  stateAbbr,
  url,
  avgCost,
}: {
  city: string;
  state: string;
  stateAbbr: string;
  url: string;
  avgCost: { low: number; mid: number; high: number };
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Roof Estimates in ${city}, ${stateAbbr}`,
    description: `Get free instant roof estimates in ${city}, ${state}. Average roof replacement costs $${avgCost.low.toLocaleString()} to $${avgCost.high.toLocaleString()}.`,
    provider: {
      '@type': 'Organization',
      name: 'Instant Roof Estimate',
      url: 'https://instantroofestimate.ai',
    },
    areaServed: {
      '@type': 'City',
      name: city,
      containedInPlace: {
        '@type': 'State',
        name: state,
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Roofing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Free Roof Estimate',
          },
          price: '0',
          priceCurrency: 'USD',
        },
      ],
    },
    // AEO: Price range for AI assistants
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: avgCost.low,
      maxPrice: avgCost.high,
      priceCurrency: 'USD',
      description: `Typical roof replacement cost in ${city}`,
    },
    url: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * ItemList Schema for Blog Index and Category Pages
 */
export function BlogListSchema({
  posts,
  pageUrl,
  pageTitle,
}: {
  posts: { title: string; url: string; description: string; image?: string }[];
  pageUrl: string;
  pageTitle: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: pageTitle,
    url: pageUrl,
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        url: post.url,
        image: post.image,
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
