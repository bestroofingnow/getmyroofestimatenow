import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const placeId = searchParams.get('place_id');

  if (!placeId) {
    return NextResponse.json(
      { error: 'place_id is required' },
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

  try {
    // Use the new Places API (New) endpoint
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'formattedAddress,location,addressComponents',
      },
    });

    const data = await response.json();

    if (data.error) {
      console.error('Places Details error:', data.error.message);
      return NextResponse.json(
        { error: 'Failed to get place details' },
        { status: 400 }
      );
    }

    // Extract address components from the new API format
    let city = '';
    let state = '';
    let postalCode = '';

    data.addressComponents?.forEach((component: {
      types: string[];
      longText: string;
      shortText: string;
    }) => {
      if (component.types.includes('locality')) {
        city = component.longText;
      }
      if (component.types.includes('administrative_area_level_1')) {
        state = component.shortText;
      }
      if (component.types.includes('postal_code')) {
        postalCode = component.longText;
      }
    });

    return NextResponse.json({
      formatted_address: data.formattedAddress,
      lat: data.location?.latitude,
      lng: data.location?.longitude,
      city,
      state,
      postalCode,
    });
  } catch (error) {
    console.error('Places Details error:', error);
    return NextResponse.json(
      { error: 'Failed to get place details' },
      { status: 500 }
    );
  }
}
