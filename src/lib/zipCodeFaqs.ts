// Zip Code FAQs Generator for SEO/AEO
// Generates 10 unique FAQs per zip code for Answer Engine Optimization

import { ZipCodeData } from './zipCodeData';

export interface FAQ {
  question: string;
  answer: string;
}

export function generateZipCodeFaqs(zipCode: ZipCodeData): FAQ[] {
  const { zipCode: zip, cityName, countyName, avgRoofCost, housingTypes, avgHomeAge, avgHomeValue, roofingNotes, neighborhoods, stateAbbr } = zipCode;

  const housingList = housingTypes.slice(0, 3).join(', ');
  const neighborhoodMention = neighborhoods.length > 0
    ? neighborhoods[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : cityName;

  const neighborhoodNames = neighborhoods.slice(0, 4).map(n => n.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(', ') || neighborhoodMention;

  return [
    {
      question: `How much does a new roof cost in ${zip} (${cityName})?`,
      answer: `A new roof in the ${zip} area costs $${avgRoofCost.low.toLocaleString()} to $${avgRoofCost.high.toLocaleString()}. Most people pay about $${avgRoofCost.mid.toLocaleString()}.

${roofingNotes}

Type in your address to get a free price in 60 seconds.`
    },
    {
      question: `What neighborhoods are in ${zip}?`,
      answer: `The ${zip} zip code covers parts of ${cityName}, including ${neighborhoodNames}.

Each neighborhood has different kinds of homes. This can change what your roof costs and what materials work best.`
    },
    {
      question: `What kinds of homes are in ${zip}?`,
      answer: `The ${zip} area mostly has ${housingList}.

${roofingNotes}

Home prices here range from ${avgHomeValue}. Knowing your home type helps pick the best roof.`
    },
    {
      question: `What roof materials work best for ${zip}?`,
      answer: `For homes in ${zip}, the best choices are:

• Nice asphalt shingles (most popular, good value)
• Metal roofing (lasts longest)
• Premium shingles (extra protection)

Since homes here are about ${avgHomeAge} old, many need new roofs soon. The best choice depends on your budget and what your home looks like.`
    },
    {
      question: `How old are most homes in ${zip}?`,
      answer: `Most homes in ${zip} are ${avgHomeAge} old.

Many homes in ${cityName} are getting close to needing a new roof. Roofs usually last 20 to 25 years.

If your home is in this age range, get a free roof check to look for problems.`
    },
    {
      question: `Do I need a permit to get a new roof in ${zip}?`,
      answer: `Yes, you need a permit to replace your roof in ${zip}. You can get one from:
• ${countyName} building office
• ${cityName} building department

Good roofers get the permit for you. Permits usually cost $100 to $400.`
    },
    {
      question: `How much are homes worth in ${zip}?`,
      answer: `Homes in ${zip} are usually worth ${avgHomeValue}.

A new roof is a smart investment because:
• It protects your home
• It makes your home worth more
• Buyers like homes with new roofs`
    },
    {
      question: `How long does it take to replace a roof in ${zip}?`,
      answer: `Most roof jobs in ${zip} take 1 to 3 days for ${housingTypes[0]?.toLowerCase() || 'regular'} homes.

Bigger or tricky roofs may take longer. Weather in ${countyName} can slow things down too.

Your roofer will tell you exactly how long after looking at your house.`
    },
    {
      question: `What county is ${zip} in?`,
      answer: `${zip} is in ${countyName}, ${stateAbbr}. The main city is ${cityName}.

Knowing your county matters because:
• Different permit rules
• Need to find roofers who work in your area`
    },
    {
      question: `How do I get a roof price for my ${zip} home?`,
      answer: `Getting a roof price for your ${zip} home is easy and free!

Just type in your address on our website. We use satellite photos to measure your roof. You get a price in under 60 seconds.

• No waiting for someone to come to your house
• No sales calls
• Just a quick, honest price for ${cityName} homes`
    }
  ];
}

// Generate FAQ schema for structured data
export function generateZipCodeFaqSchema(faqs: FAQ[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
