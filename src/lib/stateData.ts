import { locations, LocationData } from './locations';

export interface StateData {
  slug: string;
  name: string;
  abbr: string;
  description: string;
  climate: string;
  roofingConsiderations: string[];
  popularMaterials: string[];
  averageCostRange: { low: number; high: number };
  majorMetros: string[];
  licensingInfo: string;
  insuranceNotes: string;
}

export const stateData: Record<string, StateData> = {
  'texas': {
    slug: 'texas',
    name: 'Texas',
    abbr: 'TX',
    description: 'Texas is the second-largest state in the US, with diverse climate zones ranging from humid subtropical in the east to semi-arid in the west. The state experiences significant roofing challenges including severe hail storms, hurricanes along the Gulf Coast, and intense summer heat.',
    climate: 'Varies from humid subtropical to semi-arid desert',
    roofingConsiderations: [
      'Severe hail damage is common, especially in North Texas (Hail Alley)',
      'Hurricane and tropical storm damage along the Gulf Coast',
      'Extreme summer heat accelerates roof aging',
      'Impact-resistant shingles often qualify for insurance discounts',
      'Proper attic ventilation is critical due to heat',
    ],
    popularMaterials: ['Impact-Resistant Shingles', 'Metal Roofing', 'Clay Tiles', 'Architectural Shingles', 'TPO for flat roofs'],
    averageCostRange: { low: 7500, high: 23000 },
    majorMetros: ['Houston', 'Dallas', 'San Antonio', 'Austin', 'Fort Worth'],
    licensingInfo: 'Texas does not require a state roofing license, but many cities require permits and some require local contractor registration.',
    insuranceNotes: 'Many Texas insurers offer discounts for Class 4 impact-resistant shingles. Hail and wind damage claims are common.',
  },
  'florida': {
    slug: 'florida',
    name: 'Florida',
    abbr: 'FL',
    description: 'Florida presents unique roofing challenges due to its tropical and subtropical climate, frequent hurricanes, and strict building codes. The state has some of the most stringent roofing requirements in the nation to protect against high winds and storm damage.',
    climate: 'Tropical and humid subtropical',
    roofingConsiderations: [
      'Florida Building Code requires hurricane-resistant roofing in most areas',
      'Wind ratings up to 150+ mph may be required in coastal zones',
      'Salt air corrosion is a concern in coastal areas',
      'High humidity promotes algae and mold growth',
      'Annual inspections are often required for insurance',
    ],
    popularMaterials: ['Metal Roofing', 'Concrete Tiles', 'Hurricane-Rated Shingles', 'TPO for flat roofs', 'Standing Seam Metal'],
    averageCostRange: { low: 8000, high: 28000 },
    majorMetros: ['Miami', 'Tampa', 'Orlando', 'Jacksonville'],
    licensingInfo: 'Florida requires a state roofing contractor license. Contractors must pass exams and carry insurance.',
    insuranceNotes: 'Many Florida insurers require roof inspections before issuing policies. Roofs over 15-20 years may need replacement for coverage.',
  },
  'california': {
    slug: 'california',
    name: 'California',
    abbr: 'CA',
    description: 'California offers diverse roofing conditions from Mediterranean climates in the south to cooler, wetter conditions in the north. Title 24 energy efficiency requirements and fire-resistant material mandates in many areas make roofing particularly specialized.',
    climate: 'Mediterranean to oceanic, varies by region',
    roofingConsiderations: [
      'Title 24 energy efficiency requirements affect material choices',
      'Fire-resistant Class A roofing required in many WUI zones',
      'Cool roof requirements in many jurisdictions',
      'Seismic considerations for heavy tile roofs',
      'Drought conditions can stress wood roofing',
    ],
    popularMaterials: ['Spanish Tiles', 'Metal Roofing', 'Cool Roofing', 'Flat Roofing Systems', 'Concrete Tiles'],
    averageCostRange: { low: 11000, high: 35000 },
    majorMetros: ['Los Angeles', 'San Diego', 'San Francisco', 'San Jose'],
    licensingInfo: 'California requires a C-39 Roofing Contractor license through the Contractors State License Board (CSLB).',
    insuranceNotes: 'Fire insurance is increasingly difficult to obtain in high-risk areas. Fire-resistant roofing materials may be required.',
  },
  'north-carolina': {
    slug: 'north-carolina',
    name: 'North Carolina',
    abbr: 'NC',
    description: 'North Carolina offers a moderate humid subtropical climate ideal for most roofing materials. The state experiences all four seasons, occasional hurricanes in coastal areas, and has a rapidly growing population creating high demand for roofing services.',
    climate: 'Humid subtropical with four distinct seasons',
    roofingConsiderations: [
      'Hurricane and tropical storm damage possible, especially in coastal regions',
      'Humid conditions can promote algae growth on shingles',
      'Occasional ice and snow in western mountains and Piedmont',
      'Strong thunderstorms are common in spring and summer',
      'Tree debris from storms is a common cause of damage',
    ],
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Slate', 'Cedar Shakes', 'Designer Shingles'],
    averageCostRange: { low: 6800, high: 24000 },
    majorMetros: ['Charlotte', 'Raleigh', 'Lake Norman', 'Concord', 'Gastonia'],
    licensingInfo: 'North Carolina requires roofing contractors to be licensed through the NC Licensing Board for General Contractors for projects over $30,000.',
    insuranceNotes: 'Coastal counties may have higher insurance requirements. Wind and hail deductibles are common.',
  },
  'georgia': {
    slug: 'georgia',
    name: 'Georgia',
    abbr: 'GA',
    description: 'Georgia features a humid subtropical climate with hot summers and mild winters. The state is known for severe thunderstorms, occasional tornadoes, and high humidity that affects roofing longevity.',
    climate: 'Humid subtropical',
    roofingConsiderations: [
      'Severe thunderstorms and occasional tornadoes',
      'High humidity promotes mold and algae growth',
      'Heavy rainfall requires proper drainage',
      'Hot summers accelerate shingle aging',
      'Tree debris from storms is common',
    ],
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Slate', 'Asphalt Shingles'],
    averageCostRange: { low: 7000, high: 21000 },
    majorMetros: ['Atlanta', 'Savannah', 'Augusta', 'Columbus'],
    licensingInfo: 'Georgia requires residential and general contractors to be licensed. Requirements vary by county.',
    insuranceNotes: 'Standard homeowner policies cover most storm damage. Hail damage claims are common in North Georgia.',
  },
  'arizona': {
    slug: 'arizona',
    name: 'Arizona',
    abbr: 'AZ',
    description: 'Arizona presents extreme desert conditions with intense heat, UV exposure, and monsoon storms. The state requires roofing materials specifically designed to handle temperature extremes and occasional flash flooding.',
    climate: 'Hot desert to semi-arid',
    roofingConsiderations: [
      'Extreme heat (110°F+) requires heat-resistant materials',
      'Intense UV exposure accelerates material degradation',
      'Monsoon storms bring flash flooding and wind damage',
      'Thermal shock from rapid temperature changes',
      'Cool roofing is highly beneficial for energy savings',
    ],
    popularMaterials: ['Clay Tiles', 'Concrete Tiles', 'Metal Roofing', 'TPO Flat Roofing', 'Cool Roofing'],
    averageCostRange: { low: 8000, high: 20000 },
    majorMetros: ['Phoenix', 'Tucson', 'Mesa', 'Scottsdale'],
    licensingInfo: 'Arizona requires roofing contractors to hold a CR-42 Roofing license from the Arizona Registrar of Contractors.',
    insuranceNotes: 'Monsoon damage is typically covered. UV damage is considered normal wear and not typically covered.',
  },
  'colorado': {
    slug: 'colorado',
    name: 'Colorado',
    abbr: 'CO',
    description: 'Colorado is notorious for severe hail storms, heavy snow, and intense UV exposure at altitude. The state consistently ranks among the highest for hail damage claims in the nation.',
    climate: 'Semi-arid continental with heavy snow',
    roofingConsiderations: [
      'Severe hail damage is extremely common',
      'Heavy snow loads require sturdy roofing systems',
      'Ice dam formation in winter',
      'Intense UV at high altitude accelerates aging',
      'Rapid temperature swings cause thermal stress',
    ],
    popularMaterials: ['Impact-Resistant Shingles', 'Metal Roofing', 'Slate', 'Architectural Shingles'],
    averageCostRange: { low: 9000, high: 24000 },
    majorMetros: ['Denver', 'Colorado Springs', 'Aurora', 'Boulder'],
    licensingInfo: 'Colorado does not require a state roofing license, but many municipalities require local licensing.',
    insuranceNotes: 'Impact-resistant (Class 4) shingles often qualify for significant insurance discounts. Hail claims are extremely common.',
  },
  'tennessee': {
    slug: 'tennessee',
    name: 'Tennessee',
    abbr: 'TN',
    description: 'Tennessee has a humid subtropical climate with all four seasons. The state experiences severe thunderstorms, tornadoes, and rapid growth in major cities creating high demand for roofing services.',
    climate: 'Humid subtropical',
    roofingConsiderations: [
      'Severe thunderstorms and tornado risk',
      'High humidity promotes algae growth',
      'Temperature fluctuations between seasons',
      'Heavy rainfall requires good drainage',
      'Rapid development increases contractor demand',
    ],
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Cedar Shakes', 'Asphalt Shingles'],
    averageCostRange: { low: 7000, high: 20000 },
    majorMetros: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga'],
    licensingInfo: 'Tennessee requires contractors to be licensed through the State Board for Licensing Contractors for projects over $25,000.',
    insuranceNotes: 'Storm damage coverage is standard. Tornado damage claims occur regularly in West and Middle Tennessee.',
  },
  'south-carolina': {
    slug: 'south-carolina',
    name: 'South Carolina',
    abbr: 'SC',
    description: 'South Carolina features a humid subtropical climate with hot summers and mild winters. Coastal areas face hurricane threats, while the entire state experiences strong thunderstorms and high humidity.',
    climate: 'Humid subtropical',
    roofingConsiderations: [
      'Hurricane and tropical storm damage in coastal areas',
      'High humidity promotes mold and algae growth',
      'Strong thunderstorms and occasional hail',
      'Salt air corrosion near the coast',
      'Hot summers accelerate shingle aging',
    ],
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Hurricane-Rated Shingles', 'Slate'],
    averageCostRange: { low: 6800, high: 23000 },
    majorMetros: ['Charleston', 'Columbia', 'Greenville', 'Rock Hill', 'Fort Mill'],
    licensingInfo: 'South Carolina requires residential contractor licensing through SC LLR for projects over $5,000.',
    insuranceNotes: 'Coastal areas have higher wind deductibles. Hurricane damage claims are common in the Lowcountry.',
  },
  'new-york': {
    slug: 'new-york',
    name: 'New York',
    abbr: 'NY',
    description: 'New York features diverse roofing challenges from harsh winters upstate to unique urban conditions in New York City. The state requires specialized approaches for historic buildings, flat roofs, and snow load management.',
    climate: 'Humid continental with cold winters',
    roofingConsiderations: [
      'Heavy snow loads in upstate regions',
      'Ice dam formation is common',
      'Many flat roofs in urban areas require specialized systems',
      'Historic preservation requirements in some districts',
      'High labor costs in NYC metro area',
    ],
    popularMaterials: ['Architectural Shingles', 'EPDM Flat Roofing', 'Metal Roofing', 'Slate', 'TPO'],
    averageCostRange: { low: 9000, high: 35000 },
    majorMetros: ['New York City', 'Buffalo', 'Rochester', 'Albany'],
    licensingInfo: 'New York City requires contractor licensing. Upstate requirements vary by municipality.',
    insuranceNotes: 'Wind and hail coverage standard. Flood insurance may be required in some areas.',
  },
  'massachusetts': {
    slug: 'massachusetts',
    name: 'Massachusetts',
    abbr: 'MA',
    description: 'Massachusetts experiences harsh New England winters with heavy snow, ice storms, and nor\'easters. The state has many historic homes requiring specialized roofing approaches and materials.',
    climate: 'Humid continental with harsh winters',
    roofingConsiderations: [
      'Heavy snow loads and ice dams are major concerns',
      'Nor\'easters bring significant wind and precipitation',
      'Historic home preservation requirements',
      'Coastal areas face salt air corrosion',
      'Short roofing season due to weather',
    ],
    popularMaterials: ['Architectural Shingles', 'Slate', 'Metal Roofing', 'Cedar Shakes', 'EPDM'],
    averageCostRange: { low: 10000, high: 30000 },
    majorMetros: ['Boston', 'Worcester', 'Springfield', 'Cambridge'],
    licensingInfo: 'Massachusetts requires roofing contractors to be registered with the state and carry insurance.',
    insuranceNotes: 'Wind damage from nor\'easters is commonly covered. Ice dam damage may require separate endorsements.',
  },
  'washington': {
    slug: 'washington',
    name: 'Washington',
    abbr: 'WA',
    description: 'Washington state has dramatic climate differences between the wet western region and the drier eastern interior. The Pacific Northwest\'s famous rain requires exceptional waterproofing and moss prevention.',
    climate: 'Oceanic in west, semi-arid in east',
    roofingConsiderations: [
      'Frequent rain requires excellent water resistance',
      'Moss and algae growth is common in western WA',
      'Snow loads in mountain and eastern regions',
      'Cool, damp conditions affect material longevity',
      'Green building practices are popular',
    ],
    popularMaterials: ['Metal Roofing', 'Composition Shingles', 'Cedar Shakes', 'TPO', 'Architectural Shingles'],
    averageCostRange: { low: 8500, high: 27000 },
    majorMetros: ['Seattle', 'Tacoma', 'Spokane', 'Vancouver'],
    licensingInfo: 'Washington requires roofing contractors to be registered and bonded through L&I.',
    insuranceNotes: 'Water damage coverage is essential. Moss damage is typically not covered as it\'s preventable maintenance.',
  },
  'ohio': {
    slug: 'ohio',
    name: 'Ohio',
    abbr: 'OH',
    description: 'Ohio experiences all four seasons with cold, snowy winters and hot, humid summers. Lake effect snow in northern regions and severe thunderstorms statewide create diverse roofing challenges.',
    climate: 'Humid continental',
    roofingConsiderations: [
      'Lake effect snow in northern Ohio',
      'Ice dam formation in winter',
      'Severe thunderstorms and occasional hail',
      'Humid summers promote algae growth',
      'Freeze-thaw cycles stress roofing materials',
    ],
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Asphalt Shingles', 'EPDM', 'Slate'],
    averageCostRange: { low: 7000, high: 20000 },
    majorMetros: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo'],
    licensingInfo: 'Ohio does not require a state roofing license, but many municipalities have local requirements.',
    insuranceNotes: 'Wind and hail damage are commonly covered. Lake effect snow damage claims occur in northern Ohio.',
  },
  'michigan': {
    slug: 'michigan',
    name: 'Michigan',
    abbr: 'MI',
    description: 'Michigan\'s Great Lakes location creates unique roofing challenges including heavy lake effect snow, high humidity, and harsh winters. The state requires roofing systems designed for significant snow loads.',
    climate: 'Humid continental with lake effect',
    roofingConsiderations: [
      'Heavy lake effect snow requires sturdy roofing',
      'Ice dam prevention is critical',
      'High humidity promotes algae and moss',
      'Freeze-thaw cycles cause material stress',
      'Short optimal roofing season',
    ],
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Asphalt Shingles', 'EPDM'],
    averageCostRange: { low: 7500, high: 20000 },
    majorMetros: ['Detroit', 'Grand Rapids', 'Ann Arbor', 'Lansing'],
    licensingInfo: 'Michigan requires residential builders to be licensed. Roofing falls under this category.',
    insuranceNotes: 'Wind and hail coverage standard. Ice dam damage may require additional endorsement.',
  },
  'louisiana': {
    slug: 'louisiana',
    name: 'Louisiana',
    abbr: 'LA',
    description: 'Louisiana faces significant roofing challenges from its tropical climate, frequent hurricanes, and extreme humidity. The state requires wind-resistant roofing in most areas.',
    climate: 'Humid subtropical to tropical',
    roofingConsiderations: [
      'Hurricane and tropical storm damage is common',
      'Extreme humidity promotes mold and algae',
      'Heavy rainfall requires excellent drainage',
      'Wind-resistant materials are essential',
      'Salt air corrosion in coastal areas',
    ],
    popularMaterials: ['Metal Roofing', 'Hurricane-Rated Shingles', 'Slate', 'Architectural Shingles'],
    averageCostRange: { low: 8000, high: 25000 },
    majorMetros: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette'],
    licensingInfo: 'Louisiana requires contractor licensing through the Louisiana State Licensing Board for Contractors.',
    insuranceNotes: 'Hurricane deductibles are common. Many insurers require recent roof inspections for coastal properties.',
  },
  'alabama': {
    slug: 'alabama',
    name: 'Alabama',
    abbr: 'AL',
    description: 'Alabama has a humid subtropical climate with hot summers and risk of tornadoes and severe storms. The state is in Tornado Alley\'s southeastern extension.',
    climate: 'Humid subtropical',
    roofingConsiderations: [
      'Tornado risk is significant, especially in spring',
      'Severe thunderstorms with high winds',
      'High humidity promotes algae growth',
      'Hot summers stress roofing materials',
      'Hurricane impacts possible in southern regions',
    ],
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Impact-Resistant Shingles', 'Asphalt Shingles'],
    averageCostRange: { low: 7000, high: 19000 },
    majorMetros: ['Birmingham', 'Montgomery', 'Huntsville', 'Mobile'],
    licensingInfo: 'Alabama requires contractors to be licensed for projects over $50,000. Local requirements vary.',
    insuranceNotes: 'Storm and tornado damage commonly covered. Wind deductibles may apply.',
  },
};

// Get state data by slug
export function getStateBySlug(slug: string): StateData | undefined {
  return stateData[slug];
}

// Get all state slugs
export function getAllStateSlugs(): string[] {
  return Object.keys(stateData);
}

// Get cities in a state
export function getCitiesInStateBySlug(stateSlug: string): LocationData[] {
  const state = stateData[stateSlug];
  if (!state) return [];

  return locations.filter(loc => loc.stateAbbr === state.abbr);
}

// Format state name for URL
export function stateNameToSlug(stateName: string): string {
  return stateName.toLowerCase().replace(/\s+/g, '-');
}
