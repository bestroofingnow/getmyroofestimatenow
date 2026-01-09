import { StateData } from './stateData';
import { formatCurrency } from './locations';

export interface StateFaq {
  question: string;
  answer: string;
}

export function generateStateFaqs(state: StateData): StateFaq[] {
  const {
    name,
    abbr,
    climate,
    roofingConsiderations,
    popularMaterials,
    averageCostRange,
    majorMetros,
    licensingInfo,
    insuranceNotes,
  } = state;

  const topMaterials = popularMaterials.slice(0, 3).join(', ');
  const topCities = majorMetros.slice(0, 3).join(', ');
  const mainConsideration = roofingConsiderations[0];

  return [
    {
      question: `How much does a new roof cost in ${name}?`,
      answer: `Roof replacement costs in ${name} typically range from ${formatCurrency(averageCostRange.low)} to ${formatCurrency(averageCostRange.high)} depending on roof size, material choice, and complexity. Major metro areas like ${topCities} may have slightly higher labor costs. The most common choice, architectural shingles, falls in the middle of this range.`,
    },
    {
      question: `What are the best roofing materials for ${name}'s climate?`,
      answer: `Given ${name}'s ${climate} climate, the most popular roofing materials are ${topMaterials}. These materials are specifically chosen to handle local conditions including ${mainConsideration.toLowerCase()}. Your local contractor can recommend the best option based on your specific location within ${abbr}.`,
    },
    {
      question: `Do I need a roofing license to work in ${name}?`,
      answer: `${licensingInfo} Always verify your contractor's credentials and ask for proof of insurance. Licensed contractors provide better protection for homeowners through proper bonding and accountability.`,
    },
    {
      question: `Will my ${name} homeowners insurance cover roof replacement?`,
      answer: `${insuranceNotes} Most standard homeowner policies in ${abbr} cover roof damage from storms, hail, and wind. Contact your insurance company to understand your specific coverage, deductibles, and any requirements for roof age or material types.`,
    },
    {
      question: `How long does a roof last in ${name}?`,
      answer: `Roof lifespan in ${name} varies by material: asphalt shingles typically last 15-25 years, architectural shingles 25-30 years, and metal roofing 40-70 years. ${name}'s ${climate} climate can affect longevity - ${mainConsideration.toLowerCase()} are factors that may impact your roof's lifespan.`,
    },
    {
      question: `When is the best time to replace a roof in ${name}?`,
      answer: `The ideal roofing season in ${name} depends on regional climate. Generally, spring and fall offer moderate temperatures best for shingle installation. However, experienced ${abbr} contractors can work year-round when necessary. Avoid scheduling during peak storm seasons if possible.`,
    },
    {
      question: `What roofing challenges are specific to ${name}?`,
      answer: `${name} homeowners face unique roofing challenges including: ${roofingConsiderations.slice(0, 3).join('; ')}. Working with local contractors familiar with these conditions ensures your roof is built to handle ${abbr}'s specific weather patterns.`,
    },
    {
      question: `How do I find a reputable roofing contractor in ${name}?`,
      answer: `When searching for a roofer in ${name}, look for: verified state licensing, liability insurance and workers' comp, local references from ${topCities} or your area, manufacturer certifications (GAF, Owens Corning, CertainTeed), and written warranties. Get at least 3 quotes and check reviews before deciding.`,
    },
    {
      question: `Are there energy-efficient roofing options in ${name}?`,
      answer: `Yes, ${name} homeowners have several energy-efficient roofing options. Cool roofs, reflective shingles, and metal roofing can significantly reduce cooling costs. Given ${name}'s ${climate} climate, energy-efficient materials may provide substantial savings on utility bills. Some ${abbr} utilities offer rebates for energy-efficient upgrades.`,
    },
    {
      question: `What questions should I ask a ${name} roofing contractor?`,
      answer: `Essential questions for ${abbr} roofers: Are you licensed and insured in ${name}? Can you provide local references? What warranty do you offer on labor and materials? Will you handle permits? How do you address ${mainConsideration.toLowerCase()}? What's included in your written estimate? How long will the project take?`,
    },
  ];
}
