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
  {
    question: 'How long does roof replacement take?',
    answer: 'Most residential roof replacements take 1-3 days, depending on roof size, complexity, weather conditions, and material type. A standard asphalt shingle roof on a single-family home typically takes 1-2 days. Larger homes or complex roof designs may take 3-5 days. Metal and tile roofs often require additional time.',
  },
  {
    question: 'What is a roofing square?',
    answer: 'A roofing square is a unit of measurement equal to 100 square feet of roof area. Contractors use squares to estimate materials and labor. For example, a 2,000 square foot roof equals 20 squares. This standardized measurement helps ensure accurate pricing across the roofing industry.',
  },
  {
    question: 'What is the best roofing material for my home?',
    answer: 'The best roofing material depends on your budget, climate, and aesthetic preferences. Asphalt shingles offer the best value and work well in most climates. Metal roofing excels in areas with extreme weather. Clay and concrete tiles suit hot, dry climates. Slate provides unmatched durability and elegance but at premium cost.',
  },
  {
    question: 'Does homeowners insurance cover roof replacement?',
    answer: 'Homeowners insurance typically covers roof replacement if damage is caused by covered perils like storms, hail, fire, or falling trees. Normal wear and tear, age-related deterioration, and lack of maintenance are usually not covered. Document any storm damage immediately and file claims promptly.',
  },
  {
    question: 'When is the best time to replace a roof?',
    answer: 'The best time to replace a roof is late spring through early fall when temperatures are between 45-85°F and rain is less likely. However, roofing can be done year-round in most climates. Scheduling during off-peak seasons (late winter or early spring) may result in better pricing and faster scheduling.',
  },
  {
    question: 'How do I choose a reliable roofing contractor?',
    answer: 'Choose a roofing contractor by verifying they are licensed, bonded, and insured in your state. Check online reviews and ask for references. Get multiple written estimates. Ensure they offer warranties on both materials and labor. Avoid contractors who demand large upfront payments or only accept cash.',
  },
  {
    question: 'What is the difference between a roof estimate and a quote?',
    answer: 'A roof estimate is an approximate cost based on available information, like our satellite-based instant estimate. A quote is a detailed, binding price after an in-person inspection. Estimates help you budget and compare options, while quotes lock in final pricing before work begins.',
  },
  {
    question: 'What factors affect roof replacement cost?',
    answer: 'Roof replacement cost is affected by: roof size and pitch (steeper roofs cost more), material choice, number of layers to remove, structural repairs needed, local labor rates, permit requirements, accessibility, and roof complexity (dormers, skylights, valleys). Our estimate considers these factors.',
  },
  {
    question: 'Do I need a permit for roof replacement?',
    answer: 'Most jurisdictions require a building permit for roof replacement. Permits ensure the work meets local building codes and safety standards. Your roofing contractor typically handles permit acquisition. Working without a permit can result in fines and complications when selling your home.',
  },
  {
    question: 'How can I finance a new roof?',
    answer: 'Roof financing options include: home equity loans or HELOCs (often lowest rates), personal loans, roofing company financing plans, credit cards (for smaller amounts), and FHA Title 1 loans. Some contractors offer 0% interest promotions. Compare rates and terms before deciding.',
  },
  {
    question: 'What is included in a roof replacement?',
    answer: 'A complete roof replacement typically includes: removal of old roofing materials, inspection and repair of decking, installation of underlayment and ice/water shield, new shingles or roofing material, flashing around penetrations, ridge vents or other ventilation, and cleanup with debris removal.',
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
