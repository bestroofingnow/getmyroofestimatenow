'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQ {
  question: string;
  answer: string;
}

// Default FAQs for homepage
const defaultFaqs: FAQ[] = [
  {
    question: 'How accurate is the instant roof estimate?',
    answer: 'Our estimates are 90-95% accurate. We use satellite photos and smart technology to measure your roof.\n\nThe final price may change a little based on things we can only see in person, like how your roof looks up close.',
  },
  {
    question: 'Is the roof estimate really free?',
    answer: 'Yes! Our instant roof estimate is 100% free.\n\nThere are no hidden fees. We measure your roof using satellite photos. You only pay if you decide to hire a roofer.',
  },
  {
    question: 'How long does it take to get my roof estimate?',
    answer: 'About 60 seconds!\n\nJust type in your address. Our smart tools look at satellite photos of your roof. They figure out the size and give you a price.',
  },
  {
    question: 'What do I need to get an estimate?',
    answer: 'Just your address! That is all.\n\nOur satellite tools measure your roof for you. We will ask for your phone or email so a roofer can send you more details.',
  },
  {
    question: 'How do you figure out the roof cost?',
    answer: 'We look at:\n• How big your roof is (from satellite photos)\n• How steep your roof is\n• Material prices in your area\n• What roofers charge near you\n\nWe show you low, middle, and high prices for different quality levels.',
  },
  {
    question: 'Will a roofer call me after I get my estimate?',
    answer: 'Yes, a licensed roofer near you will call or text. They can:\n• Answer your questions\n• Come look at your roof in person\n• Give you a detailed quote\n\nYou do not have to say yes. There is no pressure.',
  },
  {
    question: 'How much does a new roof cost?',
    answer: 'A new roof costs $8,000 to $25,000 for most homes.\n\nBasic shingles cost $4 to $8 per square foot. Fancy materials like metal or tile cost $10 to $25 per square foot.\n\nGet your free estimate to see your exact price.',
  },
  {
    question: 'How long does a roof last?',
    answer: 'It depends on what your roof is made of:\n• Basic shingles: 20 to 30 years\n• Fancy shingles: 25 to 35 years\n• Metal roofs: 40 to 70 years\n• Tile roofs: 50 to 100 years\n• Slate roofs: 100+ years\n\nGood care helps your roof last longer.',
  },
  {
    question: 'How do I know if I need a new roof?',
    answer: 'Watch for these warning signs:\n• Shingles that are curling, cracking, or missing\n• Shingle bits in your gutters\n• Light coming through roof boards\n• Saggy spots on your roof\n• Water stains on your ceiling\n• Your roof is over 20 years old\n• High energy bills\n\nIf you see any of these, get a free estimate.',
  },
  {
    question: 'Should I fix my roof or get a new one?',
    answer: 'Fix your roof if:\n• The damage is in one small area\n• Your roof is less than 15 years old\n• Less than 30% needs work\n\nGet a new roof if:\n• Damage is all over\n• Your roof is over 20 years old\n• You keep getting leaks\n• Repairs would cost more than half a new roof\n\nOur free estimate helps you decide.',
  },
];

interface FAQSectionProps {
  faqs?: FAQ[];
  title?: string;
  description?: string;
  showIcon?: boolean;
  bgColor?: string;
}

export function FAQSection({
  faqs = defaultFaqs,
  title = 'Frequently Asked Questions',
  description = 'Everything you need to know about getting your free roof estimate',
  showIcon = true,
  bgColor = 'bg-white',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {showIcon && (
              <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 mb-4">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800">FAQ</span>
              </div>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openIndex === index ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Schema component for structured data (AEO optimization)
export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
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

// Export default FAQs for backward compatibility
export const faqData = defaultFaqs;
