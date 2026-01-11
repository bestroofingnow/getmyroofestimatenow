/**
 * Regional Pricing Data
 *
 * Pricing multipliers based on regional construction costs, labor rates,
 * and roofing market conditions. Updated based on 2024-2025 market data.
 *
 * Base multiplier of 1.0 = national average
 * Multipliers account for: labor costs, material availability,
 * permit costs, and regional demand
 */

export interface RegionalPricingData {
  multiplier: number;  // Price multiplier vs national average
  laborCostIndex: number;  // Labor cost relative index
  marketDemand: 'low' | 'moderate' | 'high' | 'very_high';
  avgPermitCost: number;  // Average roofing permit cost
  notes?: string;
}

// State-level pricing data
const STATE_PRICING: Record<string, RegionalPricingData> = {
  // High cost states
  'california': { multiplier: 1.35, laborCostIndex: 1.45, marketDemand: 'very_high', avgPermitCost: 500, notes: 'High labor/material costs' },
  'hawaii': { multiplier: 1.55, laborCostIndex: 1.50, marketDemand: 'high', avgPermitCost: 400, notes: 'Island shipping costs' },
  'new york': { multiplier: 1.30, laborCostIndex: 1.40, marketDemand: 'high', avgPermitCost: 450 },
  'massachusetts': { multiplier: 1.25, laborCostIndex: 1.35, marketDemand: 'high', avgPermitCost: 350 },
  'connecticut': { multiplier: 1.22, laborCostIndex: 1.30, marketDemand: 'moderate', avgPermitCost: 300 },
  'new jersey': { multiplier: 1.25, laborCostIndex: 1.32, marketDemand: 'high', avgPermitCost: 400 },
  'washington': { multiplier: 1.18, laborCostIndex: 1.25, marketDemand: 'high', avgPermitCost: 300 },
  'oregon': { multiplier: 1.12, laborCostIndex: 1.15, marketDemand: 'moderate', avgPermitCost: 250 },
  'alaska': { multiplier: 1.45, laborCostIndex: 1.35, marketDemand: 'moderate', avgPermitCost: 300, notes: 'Remote location premium' },
  'colorado': { multiplier: 1.15, laborCostIndex: 1.18, marketDemand: 'very_high', avgPermitCost: 250, notes: 'High storm damage demand' },

  // Above average cost states
  'maryland': { multiplier: 1.15, laborCostIndex: 1.20, marketDemand: 'moderate', avgPermitCost: 300 },
  'virginia': { multiplier: 1.10, laborCostIndex: 1.12, marketDemand: 'moderate', avgPermitCost: 250 },
  'illinois': { multiplier: 1.12, laborCostIndex: 1.18, marketDemand: 'moderate', avgPermitCost: 300 },
  'minnesota': { multiplier: 1.08, laborCostIndex: 1.10, marketDemand: 'high', avgPermitCost: 200 },
  'michigan': { multiplier: 1.05, laborCostIndex: 1.08, marketDemand: 'moderate', avgPermitCost: 200 },
  'pennsylvania': { multiplier: 1.08, laborCostIndex: 1.10, marketDemand: 'moderate', avgPermitCost: 250 },
  'rhode island': { multiplier: 1.18, laborCostIndex: 1.22, marketDemand: 'moderate', avgPermitCost: 275 },
  'vermont': { multiplier: 1.12, laborCostIndex: 1.15, marketDemand: 'low', avgPermitCost: 200 },
  'new hampshire': { multiplier: 1.10, laborCostIndex: 1.12, marketDemand: 'moderate', avgPermitCost: 200 },
  'maine': { multiplier: 1.05, laborCostIndex: 1.08, marketDemand: 'low', avgPermitCost: 175 },
  'delaware': { multiplier: 1.08, laborCostIndex: 1.10, marketDemand: 'moderate', avgPermitCost: 225 },
  'district of columbia': { multiplier: 1.35, laborCostIndex: 1.45, marketDemand: 'high', avgPermitCost: 500 },
  'nevada': { multiplier: 1.10, laborCostIndex: 1.12, marketDemand: 'high', avgPermitCost: 250 },
  'arizona': { multiplier: 1.05, laborCostIndex: 1.08, marketDemand: 'very_high', avgPermitCost: 200, notes: 'High storm demand' },

  // Average cost states
  'florida': { multiplier: 1.08, laborCostIndex: 1.05, marketDemand: 'very_high', avgPermitCost: 300, notes: 'Hurricane demand' },
  'texas': { multiplier: 0.98, laborCostIndex: 0.95, marketDemand: 'very_high', avgPermitCost: 150, notes: 'High storm demand, competitive market' },
  'georgia': { multiplier: 1.02, laborCostIndex: 1.00, marketDemand: 'high', avgPermitCost: 175 },
  'north carolina': { multiplier: 1.00, laborCostIndex: 0.98, marketDemand: 'high', avgPermitCost: 175, notes: 'Growing market' },
  'south carolina': { multiplier: 0.95, laborCostIndex: 0.92, marketDemand: 'high', avgPermitCost: 150 },
  'tennessee': { multiplier: 0.95, laborCostIndex: 0.93, marketDemand: 'high', avgPermitCost: 150 },
  'utah': { multiplier: 1.05, laborCostIndex: 1.05, marketDemand: 'high', avgPermitCost: 200 },
  'wisconsin': { multiplier: 1.02, laborCostIndex: 1.00, marketDemand: 'moderate', avgPermitCost: 175 },
  'iowa': { multiplier: 0.95, laborCostIndex: 0.92, marketDemand: 'high', avgPermitCost: 125, notes: 'Storm damage market' },
  'ohio': { multiplier: 0.98, laborCostIndex: 0.95, marketDemand: 'moderate', avgPermitCost: 175 },
  'indiana': { multiplier: 0.95, laborCostIndex: 0.92, marketDemand: 'moderate', avgPermitCost: 150 },
  'missouri': { multiplier: 0.95, laborCostIndex: 0.90, marketDemand: 'high', avgPermitCost: 125 },
  'kansas': { multiplier: 0.92, laborCostIndex: 0.88, marketDemand: 'high', avgPermitCost: 100, notes: 'Storm corridor' },
  'nebraska': { multiplier: 0.92, laborCostIndex: 0.88, marketDemand: 'high', avgPermitCost: 100 },
  'new mexico': { multiplier: 0.95, laborCostIndex: 0.92, marketDemand: 'moderate', avgPermitCost: 150 },
  'idaho': { multiplier: 1.00, laborCostIndex: 1.00, marketDemand: 'moderate', avgPermitCost: 175 },
  'montana': { multiplier: 1.00, laborCostIndex: 0.98, marketDemand: 'low', avgPermitCost: 150 },
  'wyoming': { multiplier: 0.98, laborCostIndex: 0.95, marketDemand: 'low', avgPermitCost: 125 },
  'north dakota': { multiplier: 0.95, laborCostIndex: 0.90, marketDemand: 'moderate', avgPermitCost: 100 },
  'south dakota': { multiplier: 0.92, laborCostIndex: 0.88, marketDemand: 'moderate', avgPermitCost: 100 },

  // Below average cost states
  'louisiana': { multiplier: 0.92, laborCostIndex: 0.88, marketDemand: 'high', avgPermitCost: 125, notes: 'Hurricane market' },
  'alabama': { multiplier: 0.88, laborCostIndex: 0.85, marketDemand: 'moderate', avgPermitCost: 100 },
  'mississippi': { multiplier: 0.85, laborCostIndex: 0.82, marketDemand: 'moderate', avgPermitCost: 75 },
  'arkansas': { multiplier: 0.88, laborCostIndex: 0.85, marketDemand: 'moderate', avgPermitCost: 100 },
  'oklahoma': { multiplier: 0.90, laborCostIndex: 0.88, marketDemand: 'very_high', avgPermitCost: 100, notes: 'Tornado alley demand' },
  'kentucky': { multiplier: 0.90, laborCostIndex: 0.88, marketDemand: 'moderate', avgPermitCost: 125 },
  'west virginia': { multiplier: 0.88, laborCostIndex: 0.85, marketDemand: 'low', avgPermitCost: 100 },
};

// Major metro area adjustments (applied on top of state)
const METRO_ADJUSTMENTS: Record<string, number> = {
  // California metros
  'san francisco': 1.25,
  'los angeles': 1.15,
  'san diego': 1.10,
  'san jose': 1.20,
  'oakland': 1.15,

  // Texas metros
  'houston': 1.08,
  'dallas': 1.10,
  'austin': 1.15,
  'san antonio': 1.02,
  'fort worth': 1.08,

  // Florida metros
  'miami': 1.18,
  'tampa': 1.08,
  'orlando': 1.05,
  'jacksonville': 1.02,

  // Northeast metros
  'new york city': 1.20,
  'boston': 1.15,
  'philadelphia': 1.08,
  'washington dc': 1.15,
  'baltimore': 1.05,

  // Midwest metros
  'chicago': 1.12,
  'minneapolis': 1.08,
  'detroit': 1.02,
  'cleveland': 1.00,
  'denver': 1.12,

  // Southeast metros
  'atlanta': 1.10,
  'charlotte': 1.08,
  'nashville': 1.10,
  'raleigh': 1.05,

  // West metros
  'seattle': 1.15,
  'portland': 1.10,
  'phoenix': 1.05,
  'las vegas': 1.08,
  'salt lake city': 1.05,
};

/**
 * Get regional pricing data for a location
 */
export function getRegionalPricing(state?: string, city?: string): RegionalPricingData {
  // Default national average
  const defaultPricing: RegionalPricingData = {
    multiplier: 1.0,
    laborCostIndex: 1.0,
    marketDemand: 'moderate',
    avgPermitCost: 200,
  };

  if (!state) {
    return defaultPricing;
  }

  // Normalize state name
  const normalizedState = state.toLowerCase().trim();
  const statePricing = STATE_PRICING[normalizedState];

  if (!statePricing) {
    return defaultPricing;
  }

  // Apply metro adjustment if applicable
  let finalMultiplier = statePricing.multiplier;

  if (city) {
    const normalizedCity = city.toLowerCase().trim();
    const metroAdjustment = METRO_ADJUSTMENTS[normalizedCity];

    if (metroAdjustment) {
      // Metro adjustment is applied as a multiplier on the state base
      // But capped to prevent extreme values
      finalMultiplier = Math.min(statePricing.multiplier * metroAdjustment, 1.75);
    }
  }

  return {
    ...statePricing,
    multiplier: finalMultiplier,
  };
}

/**
 * Apply regional pricing to base estimates
 */
export function applyRegionalPricing(
  baseEstimate: { low: number; mid: number; high: number },
  regionalData: RegionalPricingData
): { low: number; mid: number; high: number } {
  return {
    low: Math.round(baseEstimate.low * regionalData.multiplier),
    mid: Math.round(baseEstimate.mid * regionalData.multiplier),
    high: Math.round(baseEstimate.high * regionalData.multiplier),
  };
}

/**
 * Get market condition description for display
 */
export function getMarketDescription(demand: RegionalPricingData['marketDemand']): string {
  switch (demand) {
    case 'low':
      return 'Lower than average contractor demand - competitive pricing available';
    case 'moderate':
      return 'Average market conditions';
    case 'high':
      return 'High contractor demand - book early for best rates';
    case 'very_high':
      return 'Very high demand market - expect longer wait times';
    default:
      return 'Average market conditions';
  }
}

/**
 * Get state abbreviation from full name
 */
export function getStateAbbreviation(stateName: string): string {
  const stateMap: Record<string, string> = {
    'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR',
    'california': 'CA', 'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE',
    'florida': 'FL', 'georgia': 'GA', 'hawaii': 'HI', 'idaho': 'ID',
    'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA', 'kansas': 'KS',
    'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
    'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS',
    'missouri': 'MO', 'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV',
    'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM', 'new york': 'NY',
    'north carolina': 'NC', 'north dakota': 'ND', 'ohio': 'OH', 'oklahoma': 'OK',
    'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
    'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT',
    'vermont': 'VT', 'virginia': 'VA', 'washington': 'WA', 'west virginia': 'WV',
    'wisconsin': 'WI', 'wyoming': 'WY', 'district of columbia': 'DC',
  };

  return stateMap[stateName.toLowerCase().trim()] || stateName.substring(0, 2).toUpperCase();
}
