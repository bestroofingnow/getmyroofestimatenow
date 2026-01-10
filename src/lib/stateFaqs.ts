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
      answer: `A new roof in ${name} costs ${formatCurrency(averageCostRange.low)} to ${formatCurrency(averageCostRange.high)}.

Your price depends on:
• How big your roof is
• What materials you pick
• How tricky your roof shape is

Big cities like ${topCities} may cost a bit more for labor. Nice shingles usually fall in the middle of this price range.`,
    },
    {
      question: `What are the best roofing materials for ${name}'s weather?`,
      answer: `The most popular materials in ${name} are ${topMaterials}.

These work best for ${name}'s ${climate} weather. They handle ${mainConsideration.toLowerCase()} well.

A local roofer can help you pick the best choice for where you live in ${abbr}.`,
    },
    {
      question: `Do roofers need a license in ${name}?`,
      answer: `${licensingInfo}

Always ask to see a roofer's license and insurance. Licensed roofers give you better protection if something goes wrong.`,
    },
    {
      question: `Will my insurance pay for a new roof in ${name}?`,
      answer: `${insuranceNotes}

Most home insurance in ${abbr} covers roof damage from storms, hail, and wind.

Call your insurance company to learn:
• What your policy covers
• How much your deductible is
• Any rules about roof age or materials`,
    },
    {
      question: `How long do roofs last in ${name}?`,
      answer: `How long your roof lasts depends on the material:
• Basic shingles: 15 to 25 years
• Fancy shingles: 25 to 30 years
• Metal roofing: 40 to 70 years

${name}'s ${climate} weather affects how long your roof lasts. ${mainConsideration} can wear out roofs faster.`,
    },
    {
      question: `When is the best time to get a new roof in ${name}?`,
      answer: `Spring and fall are usually best in ${name}. The weather is nice and shingles stick better.

But good ${abbr} roofers can work all year if needed. Try to avoid the busiest storm seasons when you can.`,
    },
    {
      question: `What roofing problems are common in ${name}?`,
      answer: `${name} homes often deal with:
• ${roofingConsiderations[0]}
${roofingConsiderations[1] ? `• ${roofingConsiderations[1]}` : ''}
${roofingConsiderations[2] ? `• ${roofingConsiderations[2]}` : ''}

Local roofers know how to handle ${abbr}'s weather. They build roofs that last longer here.`,
    },
    {
      question: `How do I find a good roofer in ${name}?`,
      answer: `Look for a ${name} roofer who has:
• A valid state license
• Insurance (both types)
• Good reviews from people in ${topCities} or your area
• Certification from shingle makers like GAF or Owens Corning
• Written warranties

Get at least 3 quotes. Read reviews before you decide.`,
    },
    {
      question: `Are there energy-saving roof options in ${name}?`,
      answer: `Yes! ${name} homeowners can get:
• Cool roofs (reflect heat away)
• Light-colored shingles
• Metal roofing

These can lower your power bills a lot. ${name}'s ${climate} weather makes these a smart choice. Some ${abbr} power companies give rebates for energy-saving roofs.`,
    },
    {
      question: `What should I ask a ${name} roofer?`,
      answer: `Good questions to ask:
• Are you licensed and insured in ${name}?
• Can I talk to past customers?
• What warranty do you offer?
• Will you get the permits?
• How do you handle ${mainConsideration.toLowerCase()}?
• What's included in your price?
• How long will it take?`,
    },
  ];
}
