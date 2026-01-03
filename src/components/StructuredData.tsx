export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Instant Roof Estimate',
    url: 'https://instantroofestimate.ai',
    logo: 'https://instantroofestimate.ai/logo.png',
    description: 'Get instant, accurate roof replacement estimates using satellite imagery. Free, fast, and no obligation.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [],
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
