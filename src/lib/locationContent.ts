import { LocationData, formatCurrency } from './locations';
import { CityExtendedData } from './cityData';

export interface LocationContentSection {
  title: string;
  content: string;
  id: string;
}

export function generateLocationContent(
  location: LocationData,
  extendedData: CityExtendedData | null
): LocationContentSection[] {
  const { city, state, stateAbbr, climate, avgRoofCost, popularMaterials, seasonalNotes, region } = location;

  // Use extended data if available, otherwise use smart defaults
  const population = extendedData?.population || 'growing community';
  const neighborhoods = extendedData?.neighborhoods || [`Downtown ${city}`, `${city} suburbs`];
  const landmarks = extendedData?.landmarks || [];
  const weatherStats = extendedData?.weatherStats || {
    avgSummerHigh: '88°F',
    avgWinterLow: '30°F',
    annualRainfall: '44 inches',
    stormSeason: 'spring through fall'
  };
  const roofingChallenges = extendedData?.roofingChallenges || [
    'Seasonal temperature variations',
    'Storm-related damage',
    'UV exposure',
    'Moisture and humidity'
  ];
  const localFacts = extendedData?.localFacts || [];
  const countyName = extendedData?.countyName || `${city} County`;
  const nearbyAreas = extendedData?.nearbyAreas || [];
  const nickname = extendedData?.nickname || '';

  const sections: LocationContentSection[] = [
    {
      id: 'roofing-guide',
      title: `Roofing Guide for ${city}, ${stateAbbr}`,
      content: generateRoofingGuide(city, stateAbbr, state, population, nickname, localFacts, countyName, climate, avgRoofCost, region)
    },
    {
      id: 'climate-impact',
      title: `How ${city} Weather Affects Your Roof`,
      content: generateClimateSection(city, stateAbbr, climate, weatherStats, roofingChallenges, seasonalNotes)
    },
    {
      id: 'neighborhoods',
      title: `Roofing Help in ${city} Neighborhoods`,
      content: generateNeighborhoodSection(city, stateAbbr, neighborhoods, landmarks, region)
    },
    {
      id: 'materials-guide',
      title: `Best Roof Materials for ${city} Homes`,
      content: generateMaterialsSection(city, stateAbbr, climate, popularMaterials, weatherStats, avgRoofCost)
    },
    {
      id: 'cost-factors',
      title: `Roof Costs in ${city}`,
      content: generateCostSection(city, stateAbbr, avgRoofCost, countyName, nearbyAreas)
    },
    {
      id: 'choosing-contractor',
      title: `How to Pick a Roofer in ${city}`,
      content: generateContractorSection(city, stateAbbr, state, countyName)
    }
  ];

  return sections;
}

function generateRoofingGuide(
  city: string,
  stateAbbr: string,
  state: string,
  population: string,
  nickname: string,
  localFacts: string[],
  countyName: string,
  climate: string,
  avgRoofCost: { low: number; mid: number; high: number },
  region: string
): string {
  const nicknameText = nickname ? ` People call it "${nickname}."` : '';
  const factsText = localFacts.length > 0
    ? ` ${city} is known for being ${localFacts.slice(0, 2).join(' and ').toLowerCase()}.`
    : '';

  return `${city} is home to ${population} people in ${countyName}, ${state}.${nicknameText}${factsText}

**What makes ${city} roofing special?**

${city} is in the ${region} region. This means your roof faces weather that is different from other places. Local roofers know what works best here.

**How much does a new roof cost in ${city}?**

Most people pay ${formatCurrency(avgRoofCost.low)} to ${formatCurrency(avgRoofCost.high)}. The average price is about ${formatCurrency(avgRoofCost.mid)} for nice shingles. These prices match what ${stateAbbr} roofers charge.

**Who can help with my roof?**

${city} has many good roofers. They can fix storm damage fast. They can also put on a brand new roof. These roofers know local building rules. They know what materials work best in ${climate} weather.

**Why pick a local roofer?**

Local roofers understand ${city} homes. They know the weather here. They know what styles look good. A good local roofer makes sure your roof lasts for many years.`;
}

function generateClimateSection(
  city: string,
  stateAbbr: string,
  climate: string,
  weatherStats: {
    avgSummerHigh: string;
    avgWinterLow: string;
    annualRainfall: string;
    snowfall?: string;
    stormSeason?: string;
  },
  roofingChallenges: string[],
  seasonalNotes: string
): string {
  const snowText = weatherStats.snowfall
    ? `\n\n**Winter snow**: ${city} gets about ${weatherStats.snowfall} of snow each year. Snow can cause ice dams if your attic does not have good air flow.`
    : '';

  const challengesList = roofingChallenges.map(c => `• ${c}`).join('\n');

  return `${city} has ${climate} weather. This affects how long your roof lasts.

**${city} weather facts:**
• Summer highs: ${weatherStats.avgSummerHigh}
• Winter lows: ${weatherStats.avgWinterLow}
• Yearly rain: ${weatherStats.annualRainfall}

Your roof goes through big temperature changes all year. It must handle both hot summers and cold winters.

**Why rain matters:**

${city} gets ${weatherStats.annualRainfall} of rain each year. Your roof needs to keep all that water out. ${seasonalNotes}${snowText}

**Roof problems in ${city}:**

${challengesList}

These things affect what materials you should pick. They also affect how you take care of your roof.

${weatherStats.stormSeason ? `**Storm season**: Storms usually happen from ${weatherStats.stormSeason}. During this time, you might see high winds and hail. Heavy rain is common too. Many ${city} roofers get busy fixing storm damage during this time.` : ''}

**Why air flow matters:**

Your attic needs good air flow. Without it, heat and moisture build up. This makes shingles wear out faster. Good air flow keeps your roof healthy longer. It also helps lower your energy bills.

Local ${stateAbbr} building codes tell you how much air flow you need. Many ${city} homes do better with even more air flow than the rules require.`;
}

function generateNeighborhoodSection(
  city: string,
  stateAbbr: string,
  neighborhoods: string[],
  landmarks: string[],
  region: string
): string {
  const neighborhoodList = neighborhoods.slice(0, 6);
  const landmarkText = landmarks.length > 0
    ? `${city} has famous places like ${landmarks.slice(0, 2).join(' and ')}. `
    : '';

  return `${landmarkText}We help people in every part of ${city} and nearby ${region} areas.

Each neighborhood has its own look and needs. Here is what we see in different areas:

**${neighborhoodList[0] || 'Downtown Area'}**

Downtown ${city} has both shops and homes. Many buildings are older. Some have special designs that need expert care. Roofers here know how to keep old buildings safe while making them look good.

**${neighborhoodList[1] || 'Suburban Communities'}**

The suburbs have newer homes. These houses have modern roof systems. Many have HOA rules about what colors and materials you can use.

${neighborhoodList[2] ? `**${neighborhoodList[2]}**

This area has many different kinds of homes. Some are starter homes for young families. Others are bigger houses for growing families. Roof needs range from small fixes to full replacements.` : ''}

${neighborhoodList[3] ? `**${neighborhoodList[3]}**

This neighborhood has nice homes and is great for families. People here want quality work. Roofers need to use good materials and do careful work.` : ''}

**We cover all of ${city}:**

It does not matter where in ${city} you live. Local roofers can help you. They know how to work with all kinds of homes, old and new.

**Get your price now:**

Our tool works for any address in ${city}, ${stateAbbr}. Just type in your address. We use satellite photos to measure your roof. You get a price made just for your home.`;
}

function generateMaterialsSection(
  city: string,
  stateAbbr: string,
  climate: string,
  popularMaterials: string[],
  weatherStats: { avgSummerHigh: string; avgWinterLow: string; annualRainfall: string },
  avgRoofCost: { low: number; mid: number; high: number }
): string {
  const materialDescriptions: Record<string, string> = {
    'Architectural Shingles': 'These are the most popular choice here. They look great and last 25-30 years. You can pick from many colors to match your home.',
    'Metal Roofing': 'Metal roofs are getting more popular. They last 40-70 years. They also reflect sun heat, which lowers your cooling bills.',
    'Asphalt Shingles': 'These cost less than other options. They still protect your home well. Basic shingles last 15-25 years.',
    'Slate': 'Slate is natural stone. It can last 75-100 years or more. It costs more but looks beautiful on nice homes.',
    'Cedar Shakes': 'Cedar is real wood. It gives your home a rustic look. It needs more care in wet weather.',
    'Designer Shingles': 'These fancy shingles look like slate or cedar. They cost less than the real thing. They come with better warranties.',
    'Clay Tiles': 'Clay tiles work great on Spanish-style homes. They last a very long time. They help keep your home cool.',
    'Concrete Tiles': 'Concrete tiles can look like clay, slate, or wood. They cost less than those materials. They resist fire and last many years.',
    'Impact-Resistant Shingles': 'These shingles can take hail hits better. In storm areas, you might get a discount on your home insurance.',
    'TPO Flat Roofing': 'This works well on flat roofs. It saves energy. Many businesses and some homes use it.',
    'Cool Roofing': 'Cool roofs reflect sunlight. This keeps your home cooler. It works great in hot places.'
  };

  const materialsContent = popularMaterials.map(material => {
    const description = materialDescriptions[material] || `This works well in ${city} weather.`;
    return `**${material}**: ${description}`;
  }).join('\n\n');

  return `Picking the right roof material matters in ${city}. Your roof needs to handle ${climate} weather. Summers get up to ${weatherStats.avgSummerHigh}. The area gets ${weatherStats.annualRainfall} of rain each year.

**Popular materials in ${city}:**

${materialsContent}

**How to pick the right material:**

• **Weather**: Pick materials that can handle ${city} heat, cold, and rain
• **Energy bills**: Light colors and reflective materials lower cooling costs
• **How long it lasts**: Spending more now often means fewer problems later
• **How it looks**: Your roof should match your home and neighborhood
• **Your budget**: ${city} roofs cost ${formatCurrency(avgRoofCost.low)} to ${formatCurrency(avgRoofCost.high)}

**Get expert help:**

${city} roofers can help you pick the best material. Most give free advice. They will look at your home and tell you what works best. Then they give you a price.`;
}

function generateCostSection(
  city: string,
  stateAbbr: string,
  avgRoofCost: { low: number; mid: number; high: number },
  countyName: string,
  nearbyAreas: string[]
): string {
  const nearbyText = nearbyAreas.length > 0
    ? `${city} prices may differ from ${nearbyAreas.slice(0, 3).join(', ')}. Local costs depend on workers, materials, and how busy roofers are.`
    : '';

  return `Most ${city} homeowners pay ${formatCurrency(avgRoofCost.low)} to ${formatCurrency(avgRoofCost.high)} for a new roof. Here is what changes your price.

**What makes the price go up or down:**

**Roof size**: Bigger roofs need more materials and work. Most ${city} homes have 1,500-2,500 square feet of roofing.

**Roof shape**: Simple roofs cost less. Roofs with many angles and peaks take longer to do.

**Materials you pick**: Basic shingles cost less than fancy shingles, metal, or slate. What you pick affects your total cost the most.

**How steep your roof is**: Steep roofs need special safety gear. Workers go slower on steep roofs. This adds to the cost.

**Old roof removal**: If your roof has many layers, it costs more to remove. ${stateAbbr} rules limit how many layers you can have.

**Permits**: ${countyName} needs permits for roof work. Good roofers include this in their price. They handle the paperwork too.

**Hidden damage**: Sometimes workers find rotted wood under old shingles. Fixing this adds to the cost. Good roofers tell you about possible extra costs upfront.

${nearbyText}

**How to get a good price:**

Our online tool gives ${city} homeowners a quick price. We measure your roof from satellite photos. For an exact quote, local roofers come look at your home for free.

**Ways to pay:**

Many ${city} roofers let you make payments over time. Some have 0% interest deals. Ask about payment plans when you get quotes.`;
}

function generateContractorSection(
  city: string,
  stateAbbr: string,
  state: string,
  countyName: string
): string {
  return `Picking the right roofer is a big choice. A good roofer protects your home for many years. A bad one can cause problems fast.

**What to look for in a ${city} roofer:**

**License**: Make sure they have a ${state} license. You can check this online at the ${stateAbbr} Licensing Board website.

**Insurance**: Ask for proof of insurance. They need liability insurance and workers compensation. This protects you if someone gets hurt on your property.

**Good reviews**: Look for roofers who have done lots of work in ${city}. Read online reviews. Ask for names of past customers you can call.

**Training**: Top roofers get special training from companies like GAF, Owens Corning, and CertainTeed. This training means they know how to do the job right.

**Written quotes**: Good roofers give you a paper that lists everything. It should show materials, labor, timeline, and total cost. Do not trust someone who only tells you a price out loud.

**Questions to ask:**

• How long have you worked in ${city}?
• Can I talk to people you did work for recently?
• What promises do you make about your work?
• Will you get the ${countyName} permits?
• What if you find hidden damage?
• When will you finish the job?

**Warning signs to watch for:**

• They push you to sign right away
• They want a lot of money upfront (10-20% is normal)
• They have no real office address
• They will not show you insurance papers
• Their price is way lower than others (they might cut corners)

**We check roofers for you:**

Our partner roofers in ${city} are already checked. We make sure they have licenses and insurance. We make sure past customers were happy. When you use our service, we connect you with roofers who do quality work.`;
}
