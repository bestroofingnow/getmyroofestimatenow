export interface RoofSegment {
  pitchDegrees: number;
  azimuthDegrees: number;
  stats: {
    areaMeters2: number;
    sunshineQuantiles: number[];
    groundAreaMeters2: number;
  };
}

export interface SolarData {
  solarPotential: {
    maxArrayPanelsCount: number;
    panelCapacityWatts: number;
    panelHeightMeters: number;
    panelWidthMeters: number;
    panelLifetimeYears: number;
    maxArrayAreaMeters2: number;
    maxSunshineHoursPerYear: number;
    carbonOffsetFactorKgPerMwh: number;
    wholeRoofStats: {
      areaMeters2: number;
      sunshineQuantiles: number[];
      groundAreaMeters2: number;
    };
    buildingStats: {
      areaMeters2: number;
      sunshineQuantiles: number[];
      groundAreaMeters2: number;
    };
    roofSegmentStats: RoofSegment[];
  };
  imageryDate: {
    year: number;
    month: number;
    day: number;
  };
  imageryProcessedDate: {
    year: number;
    month: number;
    day: number;
  };
  center: {
    latitude: number;
    longitude: number;
  };
}

export interface PriceRange {
  low: number;
  mid: number;
  high: number;
}

export interface MaterialEstimate {
  name: string;
  pricePerSqFt: { low: number; mid: number; high: number };
  estimate: PriceRange;
}

export interface RoofEstimate {
  groundSqFt: number;
  roofSqFt: number;
  squares: number;
  pitchDegrees: number;
  pitchRatio: string;
  estimate: PriceRange; // Default/primary estimate (architectural shingles)
  materialEstimates: MaterialEstimate[];
  address?: string;
  imageryDate?: string;
}

export interface LeadData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city?: string;
  state?: string;
  postalCode?: string;
  tcpaConsent: boolean;
  consentTimestamp: string;
}

export interface GHLWebhookPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  source: string;
  tags: string[];
  customField: {
    roof_square_feet: number;
    roof_squares: number;
    roof_pitch: string;
    // Architectural Shingles
    shingles_low: number;
    shingles_mid: number;
    shingles_high: number;
    // Metal Roofing
    metal_low: number;
    metal_mid: number;
    metal_high: number;
    // Synthetic Roofing
    synthetic_low: number;
    synthetic_mid: number;
    synthetic_high: number;
    // Roof Coatings
    coatings_low: number;
    coatings_mid: number;
    coatings_high: number;
    // TCPA
    tcpa_consent: string;
    consent_timestamp: string;
  };
}

export interface GeocodeResult {
  lat: number;
  lng: number;
  formattedAddress: string;
  city: string;
  state: string;
  postalCode: string;
}
