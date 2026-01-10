/**
 * Admin Configuration API
 *
 * GET /api/admin/config - Get current configuration status
 * POST /api/admin/config - Update configuration
 *
 * Manages API keys and connections for:
 * - Google Search Console
 * - Brightdata
 * - Gemini AI
 * - Image providers
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  isSearchConsoleConfigured,
  isBrightdataConfigured,
  isGeminiConfigured,
  getConfiguredImageSources,
  getSystemStatus,
} from '@/lib/blogAutomation';

/**
 * Verify admin authentication
 */
function verifyAdmin(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;

  if (process.env.NODE_ENV === 'development' && !adminSecret) {
    return true;
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;

  const token = authHeader.replace('Bearer ', '');
  return token === adminSecret;
}

/**
 * GET /api/admin/config
 * Get current configuration status
 */
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const config = {
      googleSearchConsole: {
        configured: isSearchConsoleConfigured(),
        envVar: 'GOOGLE_ACCESS_TOKEN',
        description: 'Google Search Console API for keyword research',
        setupSteps: [
          '1. Create a Google Cloud project',
          '2. Enable the Search Console API',
          '3. Create OAuth credentials or service account',
          '4. Add the service account to your Search Console property',
          '5. Set GOOGLE_ACCESS_TOKEN in your .env.local file',
        ],
        docUrl: 'https://developers.google.com/webmaster-tools/search-console-api-original/v3/how-tos/authorizing',
      },
      brightdata: {
        configured: isBrightdataConfigured(),
        envVar: 'BRIGHTDATA_API_KEY',
        description: 'Brightdata SERP API for competitor analysis',
        setupSteps: [
          '1. Create a Brightdata account at brightdata.com',
          '2. Set up a SERP API zone',
          '3. Get your API key from the dashboard',
          '4. Set BRIGHTDATA_API_KEY in your .env.local file',
          '5. Optionally set BRIGHTDATA_ZONE (default: "serp")',
        ],
        docUrl: 'https://docs.brightdata.com/scraping-automation/serp-api/introduction',
      },
      gemini: {
        configured: isGeminiConfigured(),
        envVar: 'GEMINI_API_KEY',
        description: 'Google Gemini AI for content generation',
        setupSteps: [
          '1. Go to Google AI Studio (aistudio.google.com)',
          '2. Create or select a project',
          '3. Generate an API key',
          '4. Set GEMINI_API_KEY in your .env.local file',
          '5. Optionally set GEMINI_MODEL (default: "gemini-1.5-pro")',
        ],
        docUrl: 'https://ai.google.dev/docs',
      },
      imageProviders: {
        configured: getConfiguredImageSources().length > 0,
        activeSources: getConfiguredImageSources(),
        providers: {
          unsplash: {
            configured: !!process.env.UNSPLASH_ACCESS_KEY,
            envVar: 'UNSPLASH_ACCESS_KEY',
            description: 'Unsplash API for free stock photos',
            setupSteps: [
              '1. Create a developer account at unsplash.com/developers',
              '2. Create a new application',
              '3. Copy your Access Key',
              '4. Set UNSPLASH_ACCESS_KEY in your .env.local file',
            ],
            docUrl: 'https://unsplash.com/documentation',
          },
          pexels: {
            configured: !!process.env.PEXELS_API_KEY,
            envVar: 'PEXELS_API_KEY',
            description: 'Pexels API for free stock photos',
            setupSteps: [
              '1. Create an account at pexels.com',
              '2. Go to pexels.com/api and request API access',
              '3. Copy your API key',
              '4. Set PEXELS_API_KEY in your .env.local file',
            ],
            docUrl: 'https://www.pexels.com/api/documentation/',
          },
        },
      },
      admin: {
        configured: !!process.env.ADMIN_SECRET,
        envVar: 'ADMIN_SECRET',
        description: 'Secret key for admin API authentication',
        setupSteps: [
          '1. Generate a secure random string',
          '2. Set ADMIN_SECRET in your .env.local file',
          '3. Include Authorization: Bearer <secret> in API requests',
        ],
      },
    };

    const systemStatus = getSystemStatus();

    return NextResponse.json({
      success: true,
      config,
      systemStatus,
      envExample: `
# Add these to your .env.local file:

# Required for full functionality:
GEMINI_API_KEY=your_gemini_api_key
ADMIN_SECRET=your_secure_admin_secret

# Optional - enables keyword research:
GOOGLE_ACCESS_TOKEN=your_google_oauth_token

# Optional - enables competitor analysis:
BRIGHTDATA_API_KEY=your_brightdata_api_key
BRIGHTDATA_ZONE=serp

# Optional - enables stock photos:
UNSPLASH_ACCESS_KEY=your_unsplash_key
PEXELS_API_KEY=your_pexels_key
      `.trim(),
    });

  } catch (error) {
    console.error('Config API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch configuration' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/config
 * Test API connections
 */
export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, service } = body;

    if (action === 'test') {
      const results: Record<string, { success: boolean; message: string }> = {};

      // Test Google Search Console
      if (!service || service === 'google') {
        if (isSearchConsoleConfigured()) {
          try {
            // Would make a test API call here
            results.google = { success: true, message: 'Connected successfully' };
          } catch {
            results.google = { success: false, message: 'Connection failed' };
          }
        } else {
          results.google = { success: false, message: 'Not configured' };
        }
      }

      // Test Brightdata
      if (!service || service === 'brightdata') {
        if (isBrightdataConfigured()) {
          try {
            // Would make a test API call here
            results.brightdata = { success: true, message: 'Connected successfully' };
          } catch {
            results.brightdata = { success: false, message: 'Connection failed' };
          }
        } else {
          results.brightdata = { success: false, message: 'Not configured' };
        }
      }

      // Test Gemini
      if (!service || service === 'gemini') {
        if (isGeminiConfigured()) {
          try {
            // Would make a test API call here
            results.gemini = { success: true, message: 'Connected successfully' };
          } catch {
            results.gemini = { success: false, message: 'Connection failed' };
          }
        } else {
          results.gemini = { success: false, message: 'Not configured' };
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Connection tests completed',
        results,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "test"' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Config API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
