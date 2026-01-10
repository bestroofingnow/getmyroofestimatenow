// County FAQs Generator for SEO/AEO
// Generates 10 unique FAQs per county for Answer Engine Optimization

import { CountyData } from './countyData';

export interface FAQ {
  question: string;
  answer: string;
}

export function generateCountyFaqs(county: CountyData): FAQ[] {
  const { name, countySeat, population, climate, avgRoofCost, popularMaterials, roofingConsiderations, cities, landmarks, state } = county;

  const cityList = cities.slice(0, 5).map(c => c.replace(/-nc$/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(', ');
  const materialList = popularMaterials.slice(0, 3).join(', ');
  const challengeList = roofingConsiderations.slice(0, 3);
  const landmarkMention = landmarks.length > 0 ? landmarks[0] : countySeat;

  return [
    {
      question: `How much does a new roof cost in ${name}, NC?`,
      answer: `A new roof in ${name} costs $${avgRoofCost.low.toLocaleString()} to $${avgRoofCost.high.toLocaleString()}. Most people pay about $${avgRoofCost.mid.toLocaleString()}.

Your price depends on:
• How big your roof is
• What materials you pick
• How tricky your roof shape is

Type in your address to get a free price in 60 seconds.`
    },
    {
      question: `What are the best roof materials for ${name} County homes?`,
      answer: `The most popular materials in ${name} County are ${materialList}.

The ${climate.toLowerCase()} weather here means you need materials that can handle ${roofingConsiderations[0]?.toLowerCase() || 'tough weather'}.

• Asphalt shingles cost the least
• Metal roofs last the longest
• Fancy shingles look nice and work well`
    },
    {
      question: `Do I need a permit to replace my roof in ${name} County?`,
      answer: `Yes, ${name} County needs you to get a building permit. You can get one from the ${countySeat} building office or ${name} County Building Inspections.

Good news: Most roofers get the permit for you. Permits usually cost $100 to $400.`
    },
    {
      question: `How do I find good roofers in ${name} County, NC?`,
      answer: `To find good roofers in ${name} County:
• Get quotes from 3 or more roofers
• Make sure they have an NC contractor license
• Check reviews from people in ${cityList}
• Ask to see their insurance

Our free tool connects you with trusted roofers in ${name} County.`
    },
    {
      question: `What roof problems are common in ${name} County?`,
      answer: `${name} County homes often have these problems:
• ${challengeList[0] || 'Storm damage'}
${challengeList[1] ? `• ${challengeList[1]}` : ''}
${challengeList[2] ? `• ${challengeList[2]}` : ''}

The ${climate.toLowerCase()} weather can be tough on roofs. Check your roof every year, especially after storms.`
    },
    {
      question: `How long do roofs last in ${name}, North Carolina?`,
      answer: `How long your roof lasts depends on what it's made of:
• Asphalt shingles: 20 to 30 years
• Metal roofing: 40 to 70 years
• Tile or slate: 50+ years

The ${climate.toLowerCase()} weather affects how long roofs last. Good airflow and regular care help your roof last longer.`
    },
    {
      question: `When is the best time to replace a roof in ${name} County?`,
      answer: `The best times are:
• Late spring (nice weather)
• Summer (before storms)
• Early fall (still warm)

Try not to schedule during hurricane season (August to October). Spring is great because shingles stick better in warm weather.`
    },
    {
      question: `Will my insurance pay for roof damage in ${name} County?`,
      answer: `Home insurance usually covers roof damage from:
• Storms
• Hail
• Falling trees

Insurance may NOT cover:
• Normal wear and tear
• Roofs over 20 years old
• Damage you ignored

After a storm, take photos right away and call your insurance company fast.`
    },
    {
      question: `What cities are in ${name} County?`,
      answer: `${name} County includes ${cityList} and more.

About ${population} people live here. The county has all kinds of homes, from old historic houses in ${countySeat} to brand new ones. Some areas have HOA rules about what your roof can look like.`
    },
    {
      question: `How can I get a free roof price in ${name} County?`,
      answer: `Getting a free roof price in ${name} County is easy!

Just type in your address on our website. We use satellite photos to measure your roof. You'll get a price in 60 seconds.

• It's 100% free
• No one needs to visit your house
• No pressure to buy anything`
    }
  ];
}

// Generate FAQ schema for structured data
export function generateCountyFaqSchema(faqs: FAQ[]): object {
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
