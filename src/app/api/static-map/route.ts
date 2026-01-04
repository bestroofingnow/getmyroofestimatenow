import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIP, RATE_LIMITS } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  // Rate limiting
  const clientIP = getClientIP(request);
  const rateLimit = checkRateLimit(`static-map:${clientIP}`, RATE_LIMITS.staticMap);

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
        },
      }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  // Validate coordinates
  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Missing coordinates' },
      { status: 400 }
    );
  }

  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);

  // Validate coordinate ranges
  if (isNaN(latNum) || isNaN(lngNum) || latNum < -90 || latNum > 90 || lngNum < -180 || lngNum > 180) {
    return NextResponse.json(
      { error: 'Invalid coordinates' },
      { status: 400 }
    );
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API not configured' },
      { status: 500 }
    );
  }

  try {
    // Fetch the static map image from Google
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latNum},${lngNum}&zoom=20&size=600x400&maptype=satellite&markers=color:red%7C${latNum},${lngNum}&key=${apiKey}`;

    const response = await fetch(mapUrl);

    if (!response.ok) {
      console.error('Static map error:', response.status);
      return NextResponse.json(
        { error: 'Failed to fetch map' },
        { status: 502 }
      );
    }

    // Get the image buffer
    const imageBuffer = await response.arrayBuffer();

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Static map fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch map' },
      { status: 500 }
    );
  }
}
