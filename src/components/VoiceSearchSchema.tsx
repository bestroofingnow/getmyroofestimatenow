/**
 * Voice Search & AI Assistant Optimized Schema Components
 *
 * These schemas are specifically designed for:
 * - Google Assistant / Google Home
 * - Amazon Alexa
 * - Apple Siri
 * - ChatGPT / Claude / Perplexity AI
 * - Voice search in mobile browsers
 */

interface VoiceOptimizedFAQProps {
  faqs: {
    question: string;
    answer: string;
    speakableAnswer?: string; // Short version for voice
  }[];
  pageUrl: string;
  pageTopic: string;
}

/**
 * Voice-Optimized FAQ Schema
 * Includes speakable specifications for voice assistants
 */
export function VoiceOptimizedFAQSchema({ faqs, pageUrl, pageTopic }: VoiceOptimizedFAQProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    name: `Frequently Asked Questions About ${pageTopic}`,
    mainEntity: faqs.map((faq, index) => ({
      '@type': 'Question',
      '@id': `${pageUrl}#question-${index + 1}`,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        // Speakable content for voice assistants
        speakable: {
          '@type': 'SpeakableSpecification',
          xpath: [`/html/body//*[@data-faq-answer='${index}']`],
        },
      },
      // Voice search optimization
      suggestedAnswer: faq.speakableAnswer || faq.answer.split('.').slice(0, 2).join('.') + '.',
    })),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.faq-question', '.faq-answer-summary'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ConversationalContentProps {
  headline: string;
  summary: string;
  keyPoints: string[];
  pageUrl: string;
  topic: string;
}

/**
 * Conversational Content Schema for AI Assistants
 * Optimized for ChatGPT, Claude, Perplexity, and voice search
 */
export function ConversationalContentSchema({
  headline,
  summary,
  keyPoints,
  pageUrl,
  topic,
}: ConversationalContentProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl,
    name: headline,
    description: summary,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [
        '.speakable-headline',
        '.speakable-summary',
        '.key-takeaway',
        'article > p:first-of-type',
      ],
      xpath: [
        '/html/head/title',
        "/html/head/meta[@name='description']/@content",
      ],
    },
    mainEntity: {
      '@type': 'Article',
      headline: headline,
      description: summary,
      about: {
        '@type': 'Thing',
        name: topic,
      },
      // Key points for AI extraction
      hasPart: keyPoints.map((point, index) => ({
        '@type': 'WebPageElement',
        '@id': `${pageUrl}#key-point-${index + 1}`,
        cssSelector: `.key-point-${index + 1}`,
        description: point,
      })),
    },
    // AI citation optimization
    citation: {
      '@type': 'Organization',
      name: 'Instant Roof Estimate',
      url: 'https://instantroofestimate.ai',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface VoiceActionSchemaProps {
  actionType: 'get_estimate' | 'find_contractor' | 'learn_more';
  targetUrl: string;
  description: string;
}

/**
 * Voice Action Schema for "OK Google" and "Hey Siri" commands
 */
export function VoiceActionSchema({ actionType, targetUrl, description }: VoiceActionSchemaProps) {
  const actionDetails = {
    get_estimate: {
      name: 'Get Roof Estimate',
      actionTarget: 'https://instantroofestimate.ai',
      queries: [
        'get roof estimate',
        'how much does a new roof cost',
        'roof replacement estimate',
        'instant roof estimate',
      ],
    },
    find_contractor: {
      name: 'Find Roofing Contractor',
      actionTarget: 'https://instantroofestimate.ai/roof-estimate',
      queries: [
        'find roofing contractor near me',
        'roofing companies near me',
        'roof repair near me',
      ],
    },
    learn_more: {
      name: 'Learn About Roofing',
      actionTarget: 'https://instantroofestimate.ai/roofing-materials',
      queries: [
        'what roofing material is best',
        'how long does a roof last',
        'types of roofing materials',
      ],
    },
  };

  const details = actionDetails[actionType];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Instant Roof Estimate',
    url: 'https://instantroofestimate.ai',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${details.actionTarget}?q={search_term_string}`,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
          'http://schema.org/IOSPlatform',
          'http://schema.org/AndroidPlatform',
          'http://schema.googleapis.com/GoogleAssistant',
          'http://schema.googleapis.com/GoogleSearchApp',
        ],
      },
      'query-input': {
        '@type': 'PropertyValueSpecification',
        valueRequired: false,
        valueName: 'search_term_string',
      },
      name: details.name,
      description: description,
    },
    // Sample voice queries for this action
    sameAs: details.queries.map(q => `https://instantroofestimate.ai?voice_query=${encodeURIComponent(q)}`),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface AISearchResultSchemaProps {
  title: string;
  description: string;
  url: string;
  primaryAnswer: string;
  supportingFacts: string[];
  datePublished: string;
  dateModified?: string;
  author?: string;
}

/**
 * Schema optimized for AI Search Results (ChatGPT, Perplexity, Claude)
 * Provides structured data that AI can easily extract and cite
 */
export function AISearchResultSchema({
  title,
  description,
  url,
  primaryAnswer,
  supportingFacts,
  datePublished,
  dateModified,
  author = 'Instant Roof Estimate',
}: AISearchResultSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': url,
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://instantroofestimate.ai',
      // E-E-A-T signals for AI trust
      sameAs: [
        'https://instantroofestimate.ai/about',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Instant Roof Estimate',
      logo: {
        '@type': 'ImageObject',
        url: 'https://instantroofestimate.ai/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    // Key answer for AI extraction
    abstract: primaryAnswer,
    // Supporting facts as structured data
    hasPart: supportingFacts.map((fact, index) => ({
      '@type': 'Claim',
      '@id': `${url}#fact-${index + 1}`,
      text: fact,
      appearance: {
        '@type': 'WebPage',
        url: url,
      },
    })),
    // Speakable for voice
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.article-summary', '.key-answer', 'article p:first-of-type'],
    },
    // AI-specific optimization
    isAccessibleForFree: true,
    creativeWorkStatus: 'Published',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface LocalVoiceSearchSchemaProps {
  city: string;
  state: string;
  stateAbbr: string;
  serviceName: string;
  description: string;
  priceRange: { min: number; max: number };
  url: string;
}

/**
 * Local Voice Search Schema
 * For "near me" and location-based voice queries
 */
export function LocalVoiceSearchSchema({
  city,
  state,
  stateAbbr,
  serviceName,
  description,
  priceRange,
  url,
}: LocalVoiceSearchSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}#localbusiness`,
    name: `Instant Roof Estimate - ${city}, ${stateAbbr}`,
    description: description,
    url: url,
    areaServed: {
      '@type': 'City',
      name: city,
      containedInPlace: {
        '@type': 'State',
        name: state,
        containedInPlace: {
          '@type': 'Country',
          name: 'United States',
        },
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: serviceName,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Free Roof Estimate',
            description: `Get a free instant roof estimate in ${city}, ${stateAbbr}`,
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '0',
            priceCurrency: 'USD',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Roof Replacement',
            description: `Professional roof replacement services in ${city}`,
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
            priceCurrency: 'USD',
          },
        },
      ],
    },
    // Voice search optimization
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: url,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
          'http://schema.googleapis.com/GoogleAssistant',
        ],
      },
      name: `Get Roof Estimate in ${city}`,
    },
    // Sample voice queries
    keywords: [
      `roof estimate ${city}`,
      `roofing contractor ${city} ${stateAbbr}`,
      `roof replacement ${city}`,
      `roof repair near me ${city}`,
      `how much does a roof cost in ${city}`,
    ].join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface QuickAnswerSchemaProps {
  question: string;
  answer: string;
  speakableAnswer: string;
  sourceUrl: string;
  topic: string;
}

/**
 * Quick Answer Schema for Featured Snippets and Voice Results
 * Optimized for position zero and voice assistant responses
 */
export function QuickAnswerSchema({
  question,
  answer,
  speakableAnswer,
  sourceUrl,
  topic,
}: QuickAnswerSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: question,
      text: question,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
        // Short version for voice
        description: speakableAnswer,
        dateCreated: new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: 'Instant Roof Estimate',
          url: 'https://instantroofestimate.ai',
        },
        upvoteCount: 0,
      },
      about: {
        '@type': 'Thing',
        name: topic,
      },
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.question-text', '.answer-summary', '.quick-answer'],
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
 * All Voice Search Schemas Combined for a Page
 */
export function VoiceSearchOptimizedPage({
  pageUrl,
  headline,
  summary,
  topic,
  faqs,
  city,
  state,
  stateAbbr,
}: {
  pageUrl: string;
  headline: string;
  summary: string;
  topic: string;
  faqs: { question: string; answer: string }[];
  city?: string;
  state?: string;
  stateAbbr?: string;
}) {
  return (
    <>
      <ConversationalContentSchema
        headline={headline}
        summary={summary}
        keyPoints={faqs.slice(0, 3).map(f => f.answer.split('.')[0] + '.')}
        pageUrl={pageUrl}
        topic={topic}
      />
      <VoiceOptimizedFAQSchema
        faqs={faqs}
        pageUrl={pageUrl}
        pageTopic={topic}
      />
      <VoiceActionSchema
        actionType="get_estimate"
        targetUrl={pageUrl}
        description={`Get a free instant roof estimate for ${topic}`}
      />
      {city && state && stateAbbr && (
        <LocalVoiceSearchSchema
          city={city}
          state={state}
          stateAbbr={stateAbbr}
          serviceName="Roof Estimation Services"
          description={summary}
          priceRange={{ min: 5000, max: 15000 }}
          url={pageUrl}
        />
      )}
    </>
  );
}
