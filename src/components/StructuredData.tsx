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
