import { LocationData, formatCurrency } from './locations';

export interface LocationFaq {
  question: string;
  answer: string;
}

export function generateLocationFaqs(location: LocationData): LocationFaq[] {
  const { city, state, stateAbbr, climate, avgRoofCost, popularMaterials, seasonalNotes, region } = location;

  // Get climate-specific advice
  const climateAdvice = getClimateAdvice(climate);
  const bestSeason = getBestSeason(climate, seasonalNotes);
  const warrantyYears = getWarrantyYears(climate);

  return [
    {
      question: `How much does a new roof cost in ${city}, ${stateAbbr}?`,
      answer: `A new roof in ${city} costs ${formatCurrency(avgRoofCost.low)} to ${formatCurrency(avgRoofCost.high)}. Most people pay about ${formatCurrency(avgRoofCost.mid)} for nice shingles.

What changes your price?
• How big your roof is
• How steep your roof is
• How easy it is to reach your roof
• What materials you pick`
    },
    {
      question: `What are the best roofing materials for ${city}'s weather?`,
      answer: `The best materials for ${city}'s ${climate} weather are ${popularMaterials.join(', ')}. ${climateAdvice.materialReason}

Local roofers in ${city} pick these because they last longer in the ${region} area.`
    },
    {
      question: `How long does it take to replace a roof in ${city}?`,
      answer: `Most roof jobs in ${city} take 1 to 3 days. Bigger houses or tricky roof shapes may take 4 to 5 days.

Weather can slow things down. ${seasonalNotes} Good roofers work fast but still do quality work.`
    },
    {
      question: `When is the best time to replace a roof in ${city}, ${stateAbbr}?`,
      answer: `${bestSeason}

Shingles stick better in nice weather. But good ${city} roofers can work any time of year if needed. They always help with emergencies.`
    },
    {
      question: `Do I need a permit to replace my roof in ${city}?`,
      answer: `Yes, you need a building permit for most roof jobs in ${city}. Good roofers will get the permit for you.

Why permits matter:
• Makes sure your roof follows ${state} safety rules
• Helps with insurance claims
• Makes selling your home easier later`
    },
    {
      question: `How do I find a good roofer in ${city}?`,
      answer: `Look for ${city} roofers who:
• Have a license and insurance in ${stateAbbr}
• Have good reviews from local people
• Give you a written price quote
• Offer a warranty on their work
• Can show you past jobs in ${city}

Our free tool connects you with trusted ${city} roofers.`
    },
    {
      question: `Will my insurance pay for a new roof in ${city}?`,
      answer: `Home insurance in ${city} usually covers roof damage from storms, hail, and wind. ${climateAdvice.insuranceNote}

What to do:
• Take photos of any damage
• Call your insurance company right away
• Many ${city} roofers help with insurance claims for free`
    },
    {
      question: `How long do roofs last in ${city}, ${stateAbbr}?`,
      answer: `How long your roof lasts depends on what it's made of:
• Basic shingles: 15 to 25 years
• Fancy shingles: 25 to 30 years
• Metal roofing: 40 to 70 years
• Tile or slate: 50+ years

${city}'s weather ${climateAdvice.lifespanImpact}. Taking care of small problems helps your roof last longer.`
    },
    {
      question: `How do I know if I need a new roof in ${city}?`,
      answer: `Warning signs to look for:
• Missing or broken shingles
• Shingle pieces in your gutters
• Parts of the roof that look saggy
• Water stains on your ceiling
• Light coming through roof boards
• Moss or green stuff growing on the roof
• Your roof is over 20 years old

${city}'s ${climate} weather can wear out roofs faster. Check your roof once a year.`
    },
    {
      question: `Can I get a roof estimate in ${city} without someone coming to my house?`,
      answer: `Yes! Our tool uses satellite photos to measure your roof. Just type in your ${city} address and get a price in 60 seconds.

The price is based on your real roof size. If you want someone to look at your roof in person, local ${city} roofers do free visits too.`
    },
    {
      question: `What roof warranties can I get in ${city}?`,
      answer: `${city} homeowners can get two types of warranties:
• Material warranty: 25 to 50 years (from the shingle maker)
• Work warranty: ${warrantyYears} (from your roofer)

Big brands like GAF, Owens Corning, and CertainTeed have the longest warranties. Ask your roofer to sign you up.`
    },
    {
      question: `How does ${city}'s weather affect roof prices?`,
      answer: `${city}'s ${climate} weather changes what your roof costs. ${climateAdvice.costImpact}

Local ${city} roofers know what materials work best here. Getting a quote before the busy season can save you money.`
    },
    {
      question: `Should I fix my roof or get a new one in ${city}?`,
      answer: `Here's how to decide:
• If fixes cost more than 30% of a new roof, get a new one
• If your roof is over 20 years old, a new one usually makes more sense
• If the damage is small and your roof is newer, fixing it is fine

A ${city} roofer can look at your roof and give honest advice.`
    },
    {
      question: `What is the average roof size in ${city}?`,
      answer: `Most homes in ${city} have roofs between 1,500 and 2,500 square feet. Bigger homes may have 3,000+ square feet.

Roofers measure roofs in "squares." One square equals 100 square feet. Our tool measures your exact roof from satellite photos.`
    },
    {
      question: `Are there energy-saving roof options in ${city}?`,
      answer: `Yes! Energy-saving options include:
• Cool roofs (reflect heat)
• Light-colored shingles
• Metal roofing

These can cut your cooling bills by 10% to 25%. ${climateAdvice.energyAdvice}

Some ${stateAbbr} power companies give rebates for energy-saving roofs.`
    },
    {
      question: `How do I get my ${city} home ready for a new roof?`,
      answer: `Before the roofers come:
• Move your cars away from the house
• Put away outdoor furniture
• Cover things in your attic
• Take pictures off the walls (there will be shaking)
• Cut back tree branches near the roof
• Make sure roofers can get to your house easily

Your ${city} roofer will tell you exactly what to do.`
    },
    {
      question: `How can I pay for a new roof in ${city}?`,
      answer: `Ways to pay for your roof:
• Home equity loan (uses your home value)
• Personal loan from a bank
• Credit card with 0% interest offer
• Payment plan from your roofer

Many ${city} roofing companies offer no-interest plans. Ask about payment options when you get your quote.`
    },
    {
      question: `How do ${city} roofers handle storm damage?`,
      answer: `${city} roofers help with storms by:
• Putting up a tarp fast to stop more damage
• Taking photos for your insurance
• Working directly with your insurance company
• Fixing everything completely

${climateAdvice.stormNote} Call right away to stop water damage from getting worse.`
    },
    {
      question: `What should I ask a ${city} roofing company?`,
      answer: `Good questions to ask:
• Are you licensed and insured in ${stateAbbr}?
• How long have you worked in ${city}?
• Can I see past work or talk to past customers?
• What warranties do you offer?
• Will you get the permits?
• What's included in your price?
• What if you find hidden damage?
• Are you certified by shingle makers?`
    },
    {
      question: `Why should I hire a local ${city} roofer?`,
      answer: `Local ${city} roofers are better because they:
• Know ${city} building rules
• Understand ${climate} weather problems
• Know good local suppliers
• Can come quickly when you need help
• Care about their reputation in ${city}
• Know what ${region} homes look like
• Will be around for future repairs`
    }
  ];
}

function getClimateAdvice(climate: string): {
  materialReason: string;
  insuranceNote: string;
  lifespanImpact: string;
  costImpact: string;
  energyAdvice: string;
  stormNote: string;
} {
  if (climate.includes('humid subtropical')) {
    return {
      materialReason: 'These handle heat, humidity, and bad storms well.',
      insuranceNote: 'Storm damage claims happen a lot here because of thunderstorms and sometimes hurricanes.',
      lifespanImpact: 'can wear roofs faster because of heat and humidity',
      costImpact: 'You may pay more for materials that fight heat and algae, but they last longer.',
      energyAdvice: 'Light-colored roofs really help keep your home cool in the hot summers here.',
      stormNote: 'Bad storms and hurricanes mean you need fast help.'
    };
  } else if (climate.includes('desert') || climate.includes('hot')) {
    return {
      materialReason: 'These stand up to extreme heat and strong sun.',
      insuranceNote: 'Big storms are rare, but monsoon season can bring damaging rain.',
      lifespanImpact: 'needs sun-blocking materials because the sun is so strong',
      costImpact: 'Heat-blocking materials cost more but are worth it in this climate.',
      energyAdvice: 'Reflective roofs are super important here to keep your home cool and save on AC.',
      stormNote: 'Monsoon storms can come suddenly and need quick repairs.'
    };
  } else if (climate.includes('continental') || climate.includes('cold') || climate.includes('snow')) {
    return {
      materialReason: 'These handle freezing, thawing, and snow piling up.',
      insuranceNote: 'Ice dams and winter storm damage are common insurance claims here.',
      lifespanImpact: 'puts stress on roofs from freezing and thawing',
      costImpact: 'You need ice protection and good airflow, which adds to the cost.',
      energyAdvice: 'Good insulation and airflow matter as much as the roof material.',
      stormNote: 'Winter storms and ice need roofers who know cold weather repairs.'
    };
  } else if (climate.includes('oceanic') || climate.includes('rain')) {
    return {
      materialReason: 'These keep water out and stop moss from growing.',
      insuranceNote: 'Water leaks and wind damage are the most common claims here.',
      lifespanImpact: 'can grow moss and algae, so you need regular cleaning',
      costImpact: 'Waterproof layers and moss treatment add to your cost.',
      energyAdvice: 'Good airflow and moisture control are most important in rainy weather.',
      stormNote: 'Heavy rain and wind need quick fixes to stop water damage.'
    };
  } else if (climate.includes('Mediterranean')) {
    return {
      materialReason: 'These resist fire and work well in dry, warm weather.',
      insuranceNote: 'Fire protection ratings matter for insurance in fire-prone areas.',
      lifespanImpact: 'is usually easy on roofs, but fire safety is the main concern',
      costImpact: 'Fire-safe materials and meeting fire codes may cost more.',
      energyAdvice: 'Cool roofs are popular here to reduce heat during dry summers.',
      stormNote: 'Storms are rare, but fire damage help is important here.'
    };
  }

  // Default
  return {
    materialReason: 'These give good protection and value for local weather.',
    insuranceNote: 'Weather claims depend on your policy and local conditions.',
    lifespanImpact: 'causes normal wear, and good care helps roofs last longer',
    costImpact: 'Material choice and local labor costs affect your price most.',
    energyAdvice: 'Think about both heating and cooling when picking materials.',
    stormNote: 'Storm help depends on local weather patterns.'
  };
}

function getBestSeason(climate: string, seasonalNotes: string): string {
  if (climate.includes('hot') || climate.includes('desert')) {
    return 'The best time is October through April when it\'s cooler.';
  } else if (climate.includes('continental') || climate.includes('cold') || climate.includes('snow')) {
    return 'Late spring through early fall (May to September) is best. Avoid winter freezing.';
  } else if (climate.includes('oceanic') || climate.includes('rain')) {
    return 'The dry summer months (June to September) are best, but pros can work all year.';
  } else if (climate.includes('subtropical')) {
    if (seasonalNotes.toLowerCase().includes('hurricane')) {
      return 'Spring and early summer are best, before hurricane season. Fall after storms pass is good too.';
    }
    return 'Spring and fall are best, with nice temperatures and less humidity.';
  }

  return 'Spring through fall is usually best, with nice weather and fewer rain delays.';
}

function getWarrantyYears(climate: string): string {
  if (climate.includes('desert') || climate.includes('hot')) {
    return '5 to 10 years because of tough conditions';
  } else if (climate.includes('continental') || climate.includes('cold')) {
    return '5 to 10 years, some offer longer';
  } else if (climate.includes('oceanic') || climate.includes('rain')) {
    return '5 to 10 years, with a focus on waterproofing';
  }
  return '5 to 15 years depending on the roofer';
}
