'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
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
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about getting your free roof estimate
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const faqData = faqs;
