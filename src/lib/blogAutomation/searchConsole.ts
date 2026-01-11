/**
 * Google Search Console API Integration
 *
 * Fetches keyword data to identify content opportunities:
 * - High impression, low click keywords (content gaps)
 * - Rising keywords (trending topics)
 * - Top performing keywords (content to expand)
 *
 * Required Environment Variables:
 * - GOOGLE_CLIENT_ID: OAuth client ID
 * - GOOGLE_CLIENT_SECRET: OAuth client secret
 * - GOOGLE_REFRESH_TOKEN: OAuth refresh token (get from /api/admin/google/auth)
 */

import { SearchConsoleData, SearchConsoleKeyword } from './types';

const SEARCH_CONSOLE_API = 'https://searchconsole.googleapis.com/webmasters/v3';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SITE_URL = 'https://getmyroofestimatenow.com';

interface SearchAnalyticsRequest {
  startDate: string;
  endDate: string;
  dimensions: string[];
  rowLimit?: number;
  startRow?: number;
}

interface SearchAnalyticsRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

// Cache for access token
let cachedAccessToken: string | null = null;
let tokenExpiresAt: number = 0;

/**
 * Get an access token using OAuth refresh token
 */
async function getAccessToken(): Promise<string> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret) {
    throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET not configured.');
  }

  if (!refreshToken) {
    throw new Error('GOOGLE_REFRESH_TOKEN not configured. Visit /api/admin/google/auth to set up OAuth.');
  }

  // Return cached token if still valid
  if (cachedAccessToken && Date.now() < tokenExpiresAt - 60000) {
    return cachedAccessToken;
  }

  // Get new access token using refresh token
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to refresh Google access token: ${error}`);
  }

  const data: TokenResponse = await response.json();

  // Cache the token
  cachedAccessToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in * 1000);

  return data.access_token;
}

/**
 * Fetch search analytics data from Search Console
 */
async function fetchSearchAnalytics(
  request: SearchAnalyticsRequest
): Promise<SearchAnalyticsRow[]> {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${SEARCH_CONSOLE_API}/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Search Console API error: ${error}`);
  }

  const data = await response.json();
  return data.rows || [];
}

/**
 * Get date range for the last N days
 */
function getDateRange(days: number): { startDate: string; endDate: string } {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 3); // Data has 3-day delay

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days);

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
}

/**
 * Transform API rows to SearchConsoleKeyword format
 */
function transformToKeywords(rows: SearchAnalyticsRow[]): SearchConsoleKeyword[] {
  return rows.map(row => ({
    keyword: row.keys[0],
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
  }));
}

/**
 * Find low-hanging fruit keywords
 * High impressions but low CTR = content opportunity
 */
function findLowHangingFruit(keywords: SearchConsoleKeyword[]): SearchConsoleKeyword[] {
  return keywords
    .filter(kw =>
      kw.impressions > 100 && // Good visibility
      kw.ctr < 0.02 && // Low click rate (under 2%)
      kw.position > 5 && kw.position < 30 // Not top 5, but on page 1-3
    )
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20);
}

/**
 * Find rising keywords by comparing recent vs older data
 */
async function findRisingKeywords(): Promise<SearchConsoleKeyword[]> {
  const recentRange = getDateRange(7);
  const olderRange = {
    startDate: getDateRange(28).startDate,
    endDate: getDateRange(7).startDate,
  };

  const [recentData, olderData] = await Promise.all([
    fetchSearchAnalytics({
      ...recentRange,
      dimensions: ['query'],
      rowLimit: 500,
    }),
    fetchSearchAnalytics({
      ...olderRange,
      dimensions: ['query'],
      rowLimit: 500,
    }),
  ]);

  const recentKeywords = new Map(
    recentData.map(row => [row.keys[0], row])
  );
  const olderKeywords = new Map(
    olderData.map(row => [row.keys[0], row])
  );

  const rising: SearchConsoleKeyword[] = [];

  for (const [keyword, recent] of recentKeywords) {
    const older = olderKeywords.get(keyword);

    if (older) {
      // Check for significant growth
      const impressionGrowth = (recent.impressions - older.impressions) / older.impressions;
      const positionImprovement = older.position - recent.position;

      if (impressionGrowth > 0.5 || positionImprovement > 5) {
        rising.push({
          keyword,
          clicks: recent.clicks,
          impressions: recent.impressions,
          ctr: recent.ctr,
          position: recent.position,
        });
      }
    } else if (recent.impressions > 50) {
      // New keyword with decent impressions
      rising.push({
        keyword,
        clicks: recent.clicks,
        impressions: recent.impressions,
        ctr: recent.ctr,
        position: recent.position,
      });
    }
  }

  return rising
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20);
}

/**
 * Main function to get all Search Console insights
 */
export async function getSearchConsoleData(): Promise<SearchConsoleData> {
  const dateRange = getDateRange(28); // Last 28 days

  // Fetch all keywords
  const allRows = await fetchSearchAnalytics({
    ...dateRange,
    dimensions: ['query'],
    rowLimit: 1000,
  });

  const allKeywords = transformToKeywords(allRows);

  // Get top keywords by clicks
  const topKeywords = [...allKeywords]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 50);

  // Find low-hanging fruit
  const lowHangingFruit = findLowHangingFruit(allKeywords);

  // Find rising keywords
  const risingKeywords = await findRisingKeywords();

  return {
    topKeywords,
    lowHangingFruit,
    risingKeywords,
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Get roofing-related keyword opportunities
 * Filters for keywords relevant to roofing business
 */
export async function getRoofingKeywordOpportunities(): Promise<SearchConsoleKeyword[]> {
  const data = await getSearchConsoleData();

  const roofingTerms = [
    'roof', 'roofing', 'shingle', 'metal roof', 'tile roof',
    'leak', 'repair', 'replacement', 'estimate', 'cost',
    'contractor', 'roofer', 'storm damage', 'hail',
  ];

  const isRoofingKeyword = (keyword: string): boolean => {
    const lower = keyword.toLowerCase();
    return roofingTerms.some(term => lower.includes(term));
  };

  // Combine opportunities and filter for roofing
  const opportunities = [
    ...data.lowHangingFruit,
    ...data.risingKeywords,
  ].filter(kw => isRoofingKeyword(kw.keyword));

  // Deduplicate
  const seen = new Set<string>();
  return opportunities.filter(kw => {
    if (seen.has(kw.keyword)) return false;
    seen.add(kw.keyword);
    return true;
  });
}

/**
 * Check if Search Console is properly configured
 */
export function isSearchConsoleConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  );
}

/**
 * Get OAuth authorization URL for initial setup
 */
export function getGoogleAuthUrl(redirectUri: string): string {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID not configured');
  }

  const scopes = [
    'https://www.googleapis.com/auth/webmasters.readonly',
  ];

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scopes.join(' '),
    access_type: 'offline',
    prompt: 'consent',
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

/**
 * Exchange authorization code for tokens
 */
export async function exchangeCodeForTokens(
  code: string,
  redirectUri: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET not configured');
  }

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to exchange code for tokens: ${error}`);
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
}
