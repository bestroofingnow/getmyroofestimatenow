import { NextRequest, NextResponse } from 'next/server';
import { calculateEstimate } from '@/lib/calculations';
import { SolarData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { lat, lng } = await request.json();

    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google API key not configured' },
        { status: 500 }
      );
    }

    // Call Google Solar API
    const solarUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&requiredQuality=HIGH&key=${apiKey}`;

    const response = await fetch(solarUrl);

    if (!response.ok) {
      // If HIGH quality fails, try MEDIUM
      const mediumResponse = await fetch(
        `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&requiredQuality=MEDIUM&key=${apiKey}`
      );

      if (!mediumResponse.ok) {
        console.error('Solar API error:', await mediumResponse.text());
        return NextResponse.json(
          { error: 'Unable to analyze this property. Solar data not available.' },
          { status: 400 }
        );
      }

      const mediumData: SolarData = await mediumResponse.json();
      const estimate = calculateEstimate(mediumData);
      return NextResponse.json(estimate);
    }

    const solarData: SolarData = await response.json();

    // Validate that we have the required data
    if (!solarData.solarPotential?.roofSegmentStats?.length) {
      return NextResponse.json(
        { error: 'Insufficient roof data available for this property' },
        { status: 400 }
      );
    }

    // Calculate the estimate
    const estimate = calculateEstimate(solarData);

    return NextResponse.json(estimate);
  } catch (error) {
    console.error('Roof data error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch roof data' },
      { status: 500 }
    );
  }
}
