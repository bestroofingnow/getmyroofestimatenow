export interface LocationData {
  slug: string;
  city: string;
  state: string;
  stateAbbr: string;
  region: string;
  avgRoofCost: {
    low: number;
    mid: number;
    high: number;
  };
  climate: string;
  popularMaterials: string[];
  seasonalNotes: string;
}

// Location data for top roofing markets
export const locations: LocationData[] = [
  {
    slug: 'houston-tx',
    city: 'Houston',
    state: 'Texas',
    stateAbbr: 'TX',
    region: 'Gulf Coast',
    avgRoofCost: { low: 8500, mid: 14000, high: 22000 },
    climate: 'humid subtropical',
    popularMaterials: ['Asphalt Shingles', 'Metal Roofing', 'Clay Tiles'],
    seasonalNotes: 'Hurricane season (June-November) drives high demand. Best to schedule roof inspections before storm season.',
  },
  {
    slug: 'dallas-tx',
    city: 'Dallas',
    state: 'Texas',
    stateAbbr: 'TX',
    region: 'North Texas',
    avgRoofCost: { low: 8000, mid: 13500, high: 21000 },
    climate: 'humid subtropical with frequent hail',
    popularMaterials: ['Impact-Resistant Shingles', 'Metal Roofing', 'Architectural Shingles'],
    seasonalNotes: 'Hail storms are common in spring. Consider impact-resistant materials for insurance discounts.',
  },
  {
    slug: 'san-antonio-tx',
    city: 'San Antonio',
    state: 'Texas',
    stateAbbr: 'TX',
    region: 'South Central Texas',
    avgRoofCost: { low: 7500, mid: 12500, high: 19500 },
    climate: 'humid subtropical',
    popularMaterials: ['Asphalt Shingles', 'Metal Roofing', 'Clay Tiles'],
    seasonalNotes: 'Hot summers make light-colored or reflective roofing materials popular for energy savings.',
  },
  {
    slug: 'austin-tx',
    city: 'Austin',
    state: 'Texas',
    stateAbbr: 'TX',
    region: 'Central Texas',
    avgRoofCost: { low: 8500, mid: 14500, high: 23000 },
    climate: 'humid subtropical',
    popularMaterials: ['Metal Roofing', 'Architectural Shingles', 'Solar Roofing'],
    seasonalNotes: 'Growing green building movement makes solar-ready and energy-efficient roofing popular.',
  },
  {
    slug: 'phoenix-az',
    city: 'Phoenix',
    state: 'Arizona',
    stateAbbr: 'AZ',
    region: 'Southwest',
    avgRoofCost: { low: 8000, mid: 13000, high: 20000 },
    climate: 'hot desert',
    popularMaterials: ['Clay Tiles', 'Concrete Tiles', 'Metal Roofing'],
    seasonalNotes: 'Extreme heat requires heat-reflective materials. Tile roofing is popular for its longevity in desert climate.',
  },
  {
    slug: 'los-angeles-ca',
    city: 'Los Angeles',
    state: 'California',
    stateAbbr: 'CA',
    region: 'Southern California',
    avgRoofCost: { low: 12000, mid: 20000, high: 35000 },
    climate: 'Mediterranean',
    popularMaterials: ['Spanish Tiles', 'Metal Roofing', 'Flat Roofing Systems'],
    seasonalNotes: 'Fire-resistant materials are essential in many areas. Title 24 energy requirements affect material choices.',
  },
  {
    slug: 'san-diego-ca',
    city: 'San Diego',
    state: 'California',
    stateAbbr: 'CA',
    region: 'Southern California',
    avgRoofCost: { low: 11000, mid: 18000, high: 30000 },
    climate: 'semi-arid Mediterranean',
    popularMaterials: ['Clay Tiles', 'Concrete Tiles', 'Cool Roofing'],
    seasonalNotes: 'Mild climate allows year-round roofing work. Energy-efficient cool roofs are increasingly popular.',
  },
  {
    slug: 'denver-co',
    city: 'Denver',
    state: 'Colorado',
    stateAbbr: 'CO',
    region: 'Front Range',
    avgRoofCost: { low: 9000, mid: 15000, high: 24000 },
    climate: 'semi-arid continental with heavy snow',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Slate'],
    seasonalNotes: 'Heavy snow loads require sturdy roofing. Hail is common in summer months.',
  },
  {
    slug: 'miami-fl',
    city: 'Miami',
    state: 'Florida',
    stateAbbr: 'FL',
    region: 'South Florida',
    avgRoofCost: { low: 10000, mid: 17000, high: 28000 },
    climate: 'tropical monsoon',
    popularMaterials: ['Metal Roofing', 'Concrete Tiles', 'Hurricane-Rated Shingles'],
    seasonalNotes: 'Florida Building Code requires hurricane-resistant roofing. Wind ratings are critical.',
  },
  {
    slug: 'tampa-fl',
    city: 'Tampa',
    state: 'Florida',
    stateAbbr: 'FL',
    region: 'Tampa Bay',
    avgRoofCost: { low: 9000, mid: 15000, high: 25000 },
    climate: 'humid subtropical',
    popularMaterials: ['Metal Roofing', 'Architectural Shingles', 'Tile Roofing'],
    seasonalNotes: 'Hurricane preparedness is essential. Many insurers require recent roof inspections.',
  },
  {
    slug: 'orlando-fl',
    city: 'Orlando',
    state: 'Florida',
    stateAbbr: 'FL',
    region: 'Central Florida',
    avgRoofCost: { low: 8500, mid: 14000, high: 23000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Tile Roofing'],
    seasonalNotes: 'Afternoon thunderstorms are common. Proper drainage and water resistance are priorities.',
  },
  {
    slug: 'jacksonville-fl',
    city: 'Jacksonville',
    state: 'Florida',
    stateAbbr: 'FL',
    region: 'Northeast Florida',
    avgRoofCost: { low: 8000, mid: 13500, high: 21000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Tile Roofing'],
    seasonalNotes: 'Coastal areas require corrosion-resistant materials. Wind resistance is important.',
  },
  {
    slug: 'atlanta-ga',
    city: 'Atlanta',
    state: 'Georgia',
    stateAbbr: 'GA',
    region: 'Southeast',
    avgRoofCost: { low: 8000, mid: 13500, high: 21000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Slate'],
    seasonalNotes: 'Four seasons allow flexible scheduling. Spring storms may cause hail damage.',
  },
  {
    slug: 'chicago-il',
    city: 'Chicago',
    state: 'Illinois',
    stateAbbr: 'IL',
    region: 'Midwest',
    avgRoofCost: { low: 9000, mid: 15000, high: 25000 },
    climate: 'humid continental with harsh winters',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'EPDM Flat Roofing'],
    seasonalNotes: 'Freeze-thaw cycles stress roofing. Ice dam prevention is crucial. Best to roof in late spring to fall.',
  },
  {
    slug: 'indianapolis-in',
    city: 'Indianapolis',
    state: 'Indiana',
    stateAbbr: 'IN',
    region: 'Midwest',
    avgRoofCost: { low: 7500, mid: 12500, high: 20000 },
    climate: 'humid continental',
    popularMaterials: ['Asphalt Shingles', 'Metal Roofing', 'Architectural Shingles'],
    seasonalNotes: 'Four-season climate requires versatile materials. Spring and fall are ideal roofing seasons.',
  },
  {
    slug: 'kansas-city-mo',
    city: 'Kansas City',
    state: 'Missouri',
    stateAbbr: 'MO',
    region: 'Midwest',
    avgRoofCost: { low: 7500, mid: 12500, high: 20000 },
    climate: 'humid continental with severe storms',
    popularMaterials: ['Impact-Resistant Shingles', 'Metal Roofing', 'Architectural Shingles'],
    seasonalNotes: 'Tornado Alley location means impact-resistant materials can provide insurance discounts.',
  },
  {
    slug: 'las-vegas-nv',
    city: 'Las Vegas',
    state: 'Nevada',
    stateAbbr: 'NV',
    region: 'Southwest',
    avgRoofCost: { low: 8500, mid: 14000, high: 22000 },
    climate: 'hot desert',
    popularMaterials: ['Tile Roofing', 'Metal Roofing', 'TPO Flat Roofing'],
    seasonalNotes: 'Extreme heat requires UV-resistant materials. Light colors help reduce cooling costs.',
  },
  {
    slug: 'charlotte-nc',
    city: 'Charlotte',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 7500, mid: 12500, high: 20000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Slate'],
    seasonalNotes: 'Mild climate allows year-round roofing. Occasional hurricanes reach the area.',
  },
  {
    slug: 'concord-nc',
    city: 'Concord',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 7200, mid: 12000, high: 19000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Asphalt Shingles'],
    seasonalNotes: 'Part of the growing Charlotte metro. Spring and fall are ideal for roof work.',
  },
  {
    slug: 'gastonia-nc',
    city: 'Gastonia',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 7000, mid: 11500, high: 18500 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Asphalt Shingles'],
    seasonalNotes: 'Affordable roofing market west of Charlotte. Mild winters allow flexible scheduling.',
  },
  {
    slug: 'huntersville-nc',
    city: 'Huntersville',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 8000, mid: 13500, high: 21500 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Designer Shingles'],
    seasonalNotes: 'Affluent suburb with demand for premium roofing materials and quality craftsmanship.',
  },
  {
    slug: 'mooresville-nc',
    city: 'Mooresville',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 7800, mid: 13000, high: 21000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Slate'],
    seasonalNotes: 'Lake Norman area with growing housing market. Quality roofing is in high demand.',
  },
  {
    slug: 'lake-norman-nc',
    city: 'Lake Norman',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 8500, mid: 14500, high: 24000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Slate', 'Designer Shingles'],
    seasonalNotes: 'Lakefront properties often require premium materials. High-end homes demand quality craftsmanship and durable roofing.',
  },
  {
    slug: 'cornelius-nc',
    city: 'Cornelius',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 8200, mid: 14000, high: 23000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Slate'],
    seasonalNotes: 'Lake Norman community with upscale homes. Premium roofing materials are popular.',
  },
  {
    slug: 'davidson-nc',
    city: 'Davidson',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 8000, mid: 13500, high: 22000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Cedar Shakes'],
    seasonalNotes: 'College town with mix of historic and modern homes. Quality and aesthetics are priorities.',
  },
  {
    slug: 'kannapolis-nc',
    city: 'Kannapolis',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 7000, mid: 11500, high: 18500 },
    climate: 'humid subtropical',
    popularMaterials: ['Asphalt Shingles', 'Architectural Shingles', 'Metal Roofing'],
    seasonalNotes: 'Revitalized city with mix of historic and new homes requiring various roofing solutions.',
  },
  {
    slug: 'rock-hill-sc',
    city: 'Rock Hill',
    state: 'South Carolina',
    stateAbbr: 'SC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 6800, mid: 11000, high: 17500 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Asphalt Shingles'],
    seasonalNotes: 'Just south of Charlotte with competitive pricing. Hot summers make ventilation important.',
  },
  {
    slug: 'fort-mill-sc',
    city: 'Fort Mill',
    state: 'South Carolina',
    stateAbbr: 'SC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 7500, mid: 12500, high: 20000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Designer Shingles'],
    seasonalNotes: 'Fast-growing suburb with many new construction homes and premium roofing needs.',
  },
  {
    slug: 'indian-trail-nc',
    city: 'Indian Trail',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 7200, mid: 12000, high: 19000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Asphalt Shingles'],
    seasonalNotes: 'Growing Union County suburb. Many newer homes with modern roofing requirements.',
  },
  {
    slug: 'matthews-nc',
    city: 'Matthews',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 7500, mid: 12500, high: 20000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Cedar Shakes'],
    seasonalNotes: 'Established suburb with mix of older and newer homes. Quality workmanship valued.',
  },
  {
    slug: 'hickory-nc',
    city: 'Hickory',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Western Piedmont',
    avgRoofCost: { low: 6800, mid: 11000, high: 17500 },
    climate: 'humid subtropical',
    popularMaterials: ['Asphalt Shingles', 'Architectural Shingles', 'Metal Roofing'],
    seasonalNotes: 'Foothills location with slightly cooler temperatures. Affordable roofing market.',
  },
  {
    slug: 'statesville-nc',
    city: 'Statesville',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 6800, mid: 11000, high: 17500 },
    climate: 'humid subtropical',
    popularMaterials: ['Asphalt Shingles', 'Architectural Shingles', 'Metal Roofing'],
    seasonalNotes: 'North of Charlotte with growing population. Competitive roofing prices.',
  },
  {
    slug: 'monroe-nc',
    city: 'Monroe',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Charlotte Metro',
    avgRoofCost: { low: 6800, mid: 11000, high: 17500 },
    climate: 'humid subtropical',
    popularMaterials: ['Asphalt Shingles', 'Architectural Shingles', 'Metal Roofing'],
    seasonalNotes: 'Union County seat with steady growth. Mix of rural and suburban roofing needs.',
  },
  {
    slug: 'raleigh-nc',
    city: 'Raleigh',
    state: 'North Carolina',
    stateAbbr: 'NC',
    region: 'Southeast',
    avgRoofCost: { low: 7500, mid: 12500, high: 20000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Cedar Shakes'],
    seasonalNotes: 'Growing tech hub with increasing demand for premium roofing options.',
  },
  {
    slug: 'columbus-oh',
    city: 'Columbus',
    state: 'Ohio',
    stateAbbr: 'OH',
    region: 'Midwest',
    avgRoofCost: { low: 7500, mid: 12000, high: 19000 },
    climate: 'humid continental',
    popularMaterials: ['Asphalt Shingles', 'Metal Roofing', 'Architectural Shingles'],
    seasonalNotes: 'Cold winters require proper attic ventilation. Ice dam prevention is important.',
  },
  {
    slug: 'oklahoma-city-ok',
    city: 'Oklahoma City',
    state: 'Oklahoma',
    stateAbbr: 'OK',
    region: 'Great Plains',
    avgRoofCost: { low: 7000, mid: 11500, high: 18500 },
    climate: 'humid subtropical with severe storms',
    popularMaterials: ['Impact-Resistant Shingles', 'Metal Roofing', 'Architectural Shingles'],
    seasonalNotes: 'Tornado Alley location. Impact-resistant shingles are strongly recommended.',
  },
  {
    slug: 'portland-or',
    city: 'Portland',
    state: 'Oregon',
    stateAbbr: 'OR',
    region: 'Pacific Northwest',
    avgRoofCost: { low: 9000, mid: 15000, high: 24000 },
    climate: 'oceanic with heavy rainfall',
    popularMaterials: ['Metal Roofing', 'Architectural Shingles', 'Slate'],
    seasonalNotes: 'Moss growth is common. Regular maintenance and moss-resistant treatments are recommended.',
  },
  {
    slug: 'philadelphia-pa',
    city: 'Philadelphia',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    region: 'Northeast',
    avgRoofCost: { low: 9000, mid: 15000, high: 25000 },
    climate: 'humid subtropical with cold winters',
    popularMaterials: ['Architectural Shingles', 'Slate', 'Metal Roofing'],
    seasonalNotes: 'Historic homes often require specialized roofing. Slate is popular for traditional aesthetics.',
  },
  {
    slug: 'nashville-tn',
    city: 'Nashville',
    state: 'Tennessee',
    stateAbbr: 'TN',
    region: 'Southeast',
    avgRoofCost: { low: 7500, mid: 12500, high: 20000 },
    climate: 'humid subtropical',
    popularMaterials: ['Architectural Shingles', 'Metal Roofing', 'Cedar Shakes'],
    seasonalNotes: 'Rapid growth means high contractor demand. Book early for best scheduling.',
  },
  {
    slug: 'memphis-tn',
    city: 'Memphis',
    state: 'Tennessee',
    stateAbbr: 'TN',
    region: 'Mid-South',
    avgRoofCost: { low: 7000, mid: 11500, high: 18500 },
    climate: 'humid subtropical',
    popularMaterials: ['Asphalt Shingles', 'Metal Roofing', 'Architectural Shingles'],
    seasonalNotes: 'Hot, humid summers make proper ventilation essential for roof longevity.',
  },
  {
    slug: 'fort-worth-tx',
    city: 'Fort Worth',
    state: 'Texas',
    stateAbbr: 'TX',
    region: 'North Texas',
    avgRoofCost: { low: 8000, mid: 13000, high: 20500 },
    climate: 'humid subtropical with hail',
    popularMaterials: ['Impact-Resistant Shingles', 'Metal Roofing', 'Architectural Shingles'],
    seasonalNotes: 'Part of DFW hail alley. Impact-resistant materials qualify for insurance discounts.',
  },
  {
    slug: 'seattle-wa',
    city: 'Seattle',
    state: 'Washington',
    stateAbbr: 'WA',
    region: 'Pacific Northwest',
    avgRoofCost: { low: 10000, mid: 16500, high: 27000 },
    climate: 'oceanic with frequent rain',
    popularMaterials: ['Metal Roofing', 'Composition Shingles', 'Cedar Shakes'],
    seasonalNotes: 'Rain-resistance is crucial. Metal roofing is increasingly popular for durability.',
  },
];

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((loc) => loc.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return locations.map((loc) => loc.slug);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Get nearby cities based on region and state
export function getNearbyCities(currentSlug: string, limit: number = 6): LocationData[] {
  const currentLocation = getLocationBySlug(currentSlug);
  if (!currentLocation) return [];

  // Priority 1: Same region (excluding current city)
  const sameRegion = locations.filter(
    (loc) => loc.region === currentLocation.region && loc.slug !== currentSlug
  );

  // Priority 2: Same state but different region
  const sameState = locations.filter(
    (loc) =>
      loc.state === currentLocation.state &&
      loc.region !== currentLocation.region &&
      loc.slug !== currentSlug
  );

  // Priority 3: Neighboring states (based on common regions)
  const neighboringRegions = getNeighboringRegions(currentLocation.region);
  const nearbyRegions = locations.filter(
    (loc) =>
      neighboringRegions.includes(loc.region) &&
      loc.slug !== currentSlug &&
      !sameRegion.includes(loc) &&
      !sameState.includes(loc)
  );

  // Combine and limit results
  const combined = [...sameRegion, ...sameState, ...nearbyRegions];
  return combined.slice(0, limit);
}

// Get cities in the same state
export function getCitiesInState(stateAbbr: string, excludeSlug?: string): LocationData[] {
  return locations.filter(
    (loc) => loc.stateAbbr === stateAbbr && loc.slug !== excludeSlug
  );
}

// Helper function to determine neighboring regions
function getNeighboringRegions(region: string): string[] {
  const regionNeighbors: Record<string, string[]> = {
    'Charlotte Metro': ['Western Piedmont', 'Southeast'],
    'Western Piedmont': ['Charlotte Metro', 'Southeast'],
    'Southeast': ['Charlotte Metro', 'Mid-South', 'Tampa Bay', 'South Florida', 'Central Florida', 'Northeast Florida'],
    'Gulf Coast': ['South Central Texas', 'South Florida'],
    'North Texas': ['Central Texas', 'South Central Texas', 'Great Plains'],
    'Central Texas': ['North Texas', 'South Central Texas', 'Gulf Coast'],
    'South Central Texas': ['Central Texas', 'North Texas', 'Gulf Coast'],
    'Southwest': ['Southern California'],
    'Southern California': ['Southwest'],
    'Front Range': ['Great Plains', 'Southwest'],
    'South Florida': ['Tampa Bay', 'Central Florida', 'Gulf Coast'],
    'Tampa Bay': ['South Florida', 'Central Florida', 'Southeast'],
    'Central Florida': ['Tampa Bay', 'South Florida', 'Northeast Florida'],
    'Northeast Florida': ['Central Florida', 'Southeast'],
    'Midwest': ['Great Plains', 'Northeast'],
    'Great Plains': ['Midwest', 'North Texas'],
    'Northeast': ['Midwest'],
    'Mid-South': ['Southeast', 'Midwest'],
    'Pacific Northwest': [],
  };

  return regionNeighbors[region] || [];
}
