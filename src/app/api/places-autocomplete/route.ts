import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get('input');

  if (!input) {
    return NextResponse.json({ predictions: [] });
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
    const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
      body: JSON.stringify({
        input: input,
        includedPrimaryTypes: ['street_address', 'subpremise', 'premise'],
        includedRegionCodes: ['us'],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Places Autocomplete error:', data.error.message);
      return NextResponse.json({ predictions: [] });
    }

    // Map the new API response format to our expected format
    const predictions = (data.suggestions || []).map((s: {
      placePrediction?: {
        placeId: string;
        text: { text: string };
        structuredFormat?: {
          mainText: { text: string };
          secondaryText: { text: string };
        };
      };
    }) => {
      const p = s.placePrediction;
      if (!p) return null;
      return {
        place_id: p.placeId,
        description: p.text?.text || '',
        main_text: p.structuredFormat?.mainText?.text || p.text?.text || '',
        secondary_text: p.structuredFormat?.secondaryText?.text || '',
      };
    }).filter(Boolean);

    return NextResponse.json({ predictions });
  } catch (error) {
    console.error('Places Autocomplete error:', error);
    return NextResponse.json({ predictions: [] });
  }
}
