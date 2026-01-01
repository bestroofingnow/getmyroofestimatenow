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

export interface RoofEstimate {
  groundSqFt: number;
  roofSqFt: number;
  squares: number;
  pitchDegrees: number;
  pitchRatio: string;
  estimate: {
    low: number;
    mid: number;
    high: number;
  };
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
    estimate_low: number;
    estimate_mid: number;
    estimate_high: number;
    roof_pitch: string;
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
