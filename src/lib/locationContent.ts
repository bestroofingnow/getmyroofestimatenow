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
      title: `Complete Guide to Roofing in ${city}, ${stateAbbr}`,
      content: generateRoofingGuide(city, stateAbbr, state, population, nickname, localFacts, countyName, climate, avgRoofCost, region)
    },
    {
      id: 'climate-impact',
      title: `How ${city}'s Climate Affects Your Roof`,
      content: generateClimateSection(city, stateAbbr, climate, weatherStats, roofingChallenges, seasonalNotes)
    },
    {
      id: 'neighborhoods',
      title: `Roofing Services Across ${city} Neighborhoods`,
      content: generateNeighborhoodSection(city, stateAbbr, neighborhoods, landmarks, region)
    },
    {
      id: 'materials-guide',
      title: `Best Roofing Materials for ${city} Homes`,
      content: generateMaterialsSection(city, stateAbbr, climate, popularMaterials, weatherStats, avgRoofCost)
    },
    {
      id: 'cost-factors',
      title: `Understanding Roof Replacement Costs in ${city}`,
      content: generateCostSection(city, stateAbbr, avgRoofCost, countyName, nearbyAreas)
    },
    {
      id: 'choosing-contractor',
      title: `How to Choose a Roofing Contractor in ${city}`,
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
  const nicknameText = nickname ? `, known as "${nickname},"` : '';
  const factsText = localFacts.length > 0
    ? `${city} is notable for being ${localFacts.slice(0, 2).join(' and ').toLowerCase()}.`
    : '';

  return `${city}${nicknameText} is a vibrant community of ${population} residents in ${countyName}, ${state}. ${factsText} As part of the ${region} region, ${city} homeowners face unique roofing challenges that require local expertise and knowledge.

The roofing industry in ${city}, ${stateAbbr} has evolved significantly over the years, adapting to both changing construction standards and the specific demands of our ${climate} climate. Whether you own a historic home in one of ${city}'s established neighborhoods or a newly constructed property in a growing subdivision, understanding your roofing options is essential for protecting your investment.

Roof replacement in ${city} typically costs between ${formatCurrency(avgRoofCost.low)} and ${formatCurrency(avgRoofCost.high)}, with most homeowners paying around ${formatCurrency(avgRoofCost.mid)} for quality architectural shingles. These costs reflect the local market conditions, including labor rates, material availability, and the specific requirements of ${stateAbbr} building codes.

${city} homeowners have access to numerous qualified roofing contractors who understand the specific needs of properties in our area. From emergency storm damage repairs to complete roof replacements, local roofers provide comprehensive services designed to protect your home against the elements.

When considering a roof replacement or repair in ${city}, it's important to work with contractors who are familiar with local regulations, weather patterns, and architectural styles. This ensures your new roof not only looks great but also performs well for decades to come.`;
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
    ? `Winter brings occasional snow, averaging ${weatherStats.snowfall}, which can contribute to ice dam formation on improperly ventilated roofs.`
    : '';

  const challengesList = roofingChallenges.map(c => c.toLowerCase()).join(', ');

  return `${city}'s ${climate} climate presents specific challenges for residential roofing. With summer temperatures averaging ${weatherStats.avgSummerHigh} and winter lows around ${weatherStats.avgWinterLow}, your roof must withstand significant temperature fluctuations throughout the year.

The area receives approximately ${weatherStats.annualRainfall} of rainfall annually, making water resistance a top priority for ${city} roofing systems. ${seasonalNotes} ${snowText}

Local roofing challenges in ${city} include ${challengesList}. Each of these factors influences material selection, installation techniques, and maintenance requirements for roofs in the area.

${weatherStats.stormSeason ? `Storm season in ${city} typically runs from ${weatherStats.stormSeason}, bringing the potential for high winds, hail, and heavy rainfall. During this period, ${city} roofing contractors see increased demand for emergency repairs and storm damage assessments.` : ''}

Understanding these climate factors helps ${city} homeowners make informed decisions about roofing materials and maintenance schedules. Choosing materials specifically designed for our local conditions can significantly extend your roof's lifespan and reduce long-term maintenance costs.

Proper attic ventilation is particularly important in ${city}'s climate. Without adequate airflow, heat and moisture can accumulate, leading to premature shingle deterioration, ice dams in winter, and increased cooling costs in summer. Local building codes in ${stateAbbr} specify minimum ventilation requirements, but many ${city} homes benefit from exceeding these standards.`;
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
    ? `From iconic locations like ${landmarks.slice(0, 2).join(' and ')} to residential areas throughout the city, `
    : '';

  return `${landmarkText}our roofing services extend to every corner of ${city} and the surrounding ${region} area. Each neighborhood in ${city} has its own character and roofing needs.

**${neighborhoodList[0] || 'Downtown Area'}**: The heart of ${city} features a mix of commercial buildings and residential properties, many with unique architectural requirements. Historic structures may need specialized roofing approaches to maintain their character while meeting modern performance standards.

**${neighborhoodList[1] || 'Suburban Communities'}**: ${city}'s growing suburbs feature newer construction with contemporary roofing systems. These neighborhoods often have HOA requirements that influence material and color choices.

${neighborhoodList[2] ? `**${neighborhoodList[2]}**: This popular area of ${city} showcases the community's residential diversity, from starter homes to established family residences. Roofing needs here range from basic repairs to complete system replacements.` : ''}

${neighborhoodList[3] ? `**${neighborhoodList[3]}**: Known for quality housing and family-friendly amenities, this ${city} neighborhood demands reliable roofing contractors who understand local expectations for craftsmanship and materials.` : ''}

No matter which ${city} neighborhood you call home, local roofing professionals can provide tailored solutions that respect your property's unique characteristics. Whether your home was built decades ago or just completed, ${city} contractors have the expertise to maintain, repair, or replace your roof.

Our instant estimate tool works for any address in ${city}, ${stateAbbr}, providing accurate pricing based on satellite measurements of your specific property. Simply enter your address to receive a customized estimate for your roof replacement project.`;
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
    'Architectural Shingles': 'Offering excellent durability and aesthetic appeal, architectural shingles are the most popular choice in the area. They typically last 25-30 years and come in numerous colors and styles to complement any home.',
    'Metal Roofing': 'Growing in popularity due to its exceptional longevity (40-70 years) and energy efficiency. Metal roofs reflect solar heat, reducing cooling costs during hot summers.',
    'Asphalt Shingles': 'An economical choice providing reliable protection at a lower price point. Modern 3-tab shingles offer improved wind resistance and 15-25 year lifespans.',
    'Slate': 'Premium natural stone roofing that can last 75-100+ years. While expensive, slate provides unmatched beauty and durability for upscale homes.',
    'Cedar Shakes': 'Natural wood roofing offering a distinctive rustic appearance. Cedar provides good insulation but requires more maintenance in humid climates.',
    'Designer Shingles': 'Premium shingles that mimic the appearance of slate or cedar at a fraction of the cost. These offer enhanced warranties and superior performance.',
    'Clay Tiles': 'Traditional roofing excellent for Mediterranean-style homes. Clay tiles are extremely durable and help keep homes cool in hot climates.',
    'Concrete Tiles': 'A versatile option offering the appearance of clay, slate, or wood at a more accessible price point. Concrete tiles are fire-resistant and long-lasting.',
    'Impact-Resistant Shingles': 'Specially engineered to withstand hail damage, these shingles often qualify for insurance discounts in storm-prone areas.',
    'TPO Flat Roofing': 'Energy-efficient membrane roofing ideal for flat or low-slope commercial and residential applications.',
    'Cool Roofing': 'Reflective roofing materials designed to minimize heat absorption, reducing energy costs in hot climates.'
  };

  const materialsContent = popularMaterials.map(material => {
    const description = materialDescriptions[material] || `A popular choice in ${city} known for its durability and performance in local conditions.`;
    return `**${material}**: ${description}`;
  }).join('\n\n');

  return `Selecting the right roofing materials for your ${city} home requires understanding how different options perform in our ${climate} climate. With summer highs of ${weatherStats.avgSummerHigh} and annual rainfall of ${weatherStats.annualRainfall}, ${city} roofs must balance durability, weather resistance, and energy efficiency.

${materialsContent}

When choosing materials for your ${city} roof, consider these factors:

• **Climate compatibility**: Materials should withstand local temperature extremes and moisture levels
• **Energy efficiency**: Reflective or light-colored roofing can reduce cooling costs significantly
• **Longevity expectations**: Higher upfront costs often translate to longer lifespans and better warranties
• **Aesthetic preferences**: Your roof should complement your home's architectural style and neighborhood character
• **Budget considerations**: ${city} roof replacements range from ${formatCurrency(avgRoofCost.low)} to ${formatCurrency(avgRoofCost.high)}

Local ${city} roofing contractors can help you evaluate these factors based on your specific home and priorities. Many offer free consultations to discuss material options and provide detailed estimates for your project.`;
}

function generateCostSection(
  city: string,
  stateAbbr: string,
  avgRoofCost: { low: number; mid: number; high: number },
  countyName: string,
  nearbyAreas: string[]
): string {
  const nearbyText = nearbyAreas.length > 0
    ? `Compared to nearby areas like ${nearbyAreas.slice(0, 3).join(', ')}, ${city} pricing reflects local market conditions including labor availability, material delivery costs, and demand patterns.`
    : '';

  return `Understanding the factors that influence roof replacement costs in ${city}, ${stateAbbr} helps homeowners budget effectively and avoid surprises. The average ${city} homeowner pays between ${formatCurrency(avgRoofCost.low)} and ${formatCurrency(avgRoofCost.high)} for a complete roof replacement.

**Factors affecting your ${city} roof replacement cost:**

**Roof Size and Complexity**: Larger roofs require more materials and labor. Complex designs with multiple valleys, dormers, or penetrations increase installation time and cost. The average ${city} home has 1,500-2,500 square feet of roofing.

**Material Selection**: Basic 3-tab shingles cost less than premium architectural shingles, metal roofing, or slate. Your material choice represents the largest variable in your total project cost.

**Roof Pitch**: Steeper roofs require additional safety equipment and slower installation, increasing labor costs. Most ${city} homes have moderate pitches that don't significantly impact pricing.

**Removal Requirements**: If your existing roof has multiple layers, removal costs increase. ${stateAbbr} building codes limit the number of shingle layers allowed on a roof.

**Permits and Inspections**: ${countyName} requires permits for roof replacements. Reputable ${city} contractors include permit fees in their estimates and handle the application process.

**Current Condition**: Underlying damage to decking or structure, discovered during tear-off, can add to project costs. Quality contractors provide allowances for potential repairs.

${nearbyText}

**Getting accurate estimates**: Our satellite-based instant estimate tool provides ${city} homeowners with reliable pricing based on actual roof measurements. For detailed quotes, local contractors offer free on-site assessments that account for all cost factors specific to your property.

**Financing options**: Many ${city} roofing companies offer financing plans, allowing homeowners to spread payments over time. Some options include 0% interest promotional periods for qualified buyers.`;
}

function generateContractorSection(
  city: string,
  stateAbbr: string,
  state: string,
  countyName: string
): string {
  return `Selecting the right roofing contractor is one of the most important decisions ${city} homeowners make. A quality installation protects your home for decades, while poor workmanship can lead to costly problems within years.

**Essential qualifications for ${city} roofing contractors:**

**Licensing**: Verify your contractor holds a valid ${state} contractor's license. The ${stateAbbr} Licensing Board maintains online records you can check before signing any contract.

**Insurance**: Require proof of both general liability and workers' compensation insurance. This protects you from liability if accidents occur on your property during the project.

**Local reputation**: Look for contractors with established track records in ${city}. Check online reviews, ask for local references, and verify they have completed projects in your area.

**Manufacturer certifications**: Leading roofing manufacturers like GAF, Owens Corning, and CertainTeed certify contractors who meet their training and installation standards. These certifications often enable extended warranty options.

**Written estimates**: Professional ${city} contractors provide detailed written estimates specifying materials, labor, timeline, and total cost. Avoid contractors who provide only verbal quotes.

**Questions to ask potential contractors:**

• How long have you been operating in ${city}?
• Can you provide references from recent local projects?
• What warranties do you offer on materials and workmanship?
• Will you obtain the necessary ${countyName} permits?
• How do you handle unexpected repairs or issues discovered during the project?
• What is your estimated timeline for completion?

**Red flags to watch for:**

• Pressure to sign immediately or accept "limited time" pricing
• Requests for large upfront deposits (10-20% is standard)
• No physical business address or only a P.O. Box
• Reluctance to provide references or proof of insurance
• Significantly lower bids than competitors (may indicate cut corners)

Our partner contractors in ${city} are pre-screened for licensing, insurance, and reputation. When you receive an estimate through our system and choose to move forward, we connect you with qualified local professionals who meet our standards for quality and customer service.`;
}
