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
    answer: 'Our estimates are based on satellite imagery and advanced AI analysis, typically achieving 90-95% accuracy for roof measurements. However, final pricing may vary based on factors only visible during an in-person inspection, such as roof condition, accessibility, and local material costs.',
  },
  {
    question: 'Is the roof estimate really free?',
    answer: 'Yes, our instant roof estimate is 100% free with no obligation. We use satellite technology to measure your roof remotely, so there are no hidden fees or surprise charges. You only pay if you decide to move forward with a roofing contractor.',
  },
  {
    question: 'How long does it take to get my roof estimate?',
    answer: 'You can receive your instant roof estimate in about 60 seconds. Simply enter your address, and our AI technology will analyze satellite imagery of your roof to calculate the size, pitch, and provide a cost estimate.',
  },
  {
    question: 'What information do I need to get an estimate?',
    answer: 'All you need is your property address. Our satellite technology handles the rest by automatically measuring your roof dimensions and calculating the estimate. We will ask for your contact information so a roofing specialist can follow up with a detailed quote.',
  },
  {
    question: 'How is the roof cost calculated?',
    answer: 'We calculate your roof cost based on several factors: roof square footage (measured via satellite), estimated roof pitch and complexity, current material costs in your area, and typical labor rates. We provide low, mid, and high estimates for different material quality levels.',
  },
  {
    question: 'Will a contractor contact me after I get my estimate?',
    answer: 'Yes, after receiving your estimate, a licensed roofing contractor in your area will reach out to discuss your project, answer questions, and schedule an in-person inspection if you are interested in moving forward. You are under no obligation to proceed.',
  },
  {
    question: 'How much does a new roof cost in 2025?',
    answer: 'The average cost of a new roof in 2025 ranges from $8,000 to $25,000 for a typical single-family home, depending on size, materials, and location. Asphalt shingle roofs typically cost $4-8 per square foot, while premium materials like metal or tile can range from $10-25 per square foot. Get your free instant estimate to see exact pricing for your home.',
  },
  {
    question: 'How long does a roof last?',
    answer: 'Roof lifespan varies by material: asphalt shingles last 20-30 years, architectural shingles 25-35 years, metal roofs 40-70 years, tile roofs 50-100 years, and slate roofs can last over 100 years. Factors like climate, maintenance, and installation quality also affect longevity.',
  },
  {
    question: 'What are the signs I need a new roof?',
    answer: 'Key signs you need a new roof include: shingles that are curling, cracking, or missing; granules collecting in gutters; visible daylight through roof boards; sagging roof deck; water stains on ceilings; your roof is over 20 years old; or increasing energy bills. If you notice any of these, get a free estimate to assess your options.',
  },
  {
    question: 'Should I repair or replace my roof?',
    answer: 'Consider repair if damage is localized, your roof is under 15 years old, and less than 30% needs work. Choose replacement if damage is widespread, your roof is over 20 years old, you are experiencing frequent leaks, or repairs would cost more than 50% of replacement. Our free estimate helps you make an informed decision.',
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
              <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">FAQ</span>
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
