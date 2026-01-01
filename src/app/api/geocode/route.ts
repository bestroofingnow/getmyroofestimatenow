import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
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

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    const response = await fetch(geocodeUrl);
    const data = await response.json();

    if (data.status !== 'OK' || !data.results?.[0]) {
      return NextResponse.json(
        { error: 'Unable to geocode address' },
        { status: 400 }
      );
    }

    const result = data.results[0];
    const { lat, lng } = result.geometry.location;

    // Extract address components
    let city = '';
    let state = '';
    let postalCode = '';

    result.address_components?.forEach((component: { types: string[]; long_name: string; short_name: string }) => {
      if (component.types.includes('locality')) {
        city = component.long_name;
      }
      if (component.types.includes('administrative_area_level_1')) {
        state = component.short_name;
      }
      if (component.types.includes('postal_code')) {
        postalCode = component.long_name;
      }
    });

    return NextResponse.json({
      lat,
      lng,
      formattedAddress: result.formatted_address,
      city,
      state,
      postalCode,
    });
  } catch (error) {
    console.error('Geocode error:', error);
    return NextResponse.json(
      { error: 'Failed to geocode address' },
      { status: 500 }
    );
  }
}
