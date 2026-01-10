/**
 * Google Search Console API Integration
 *
 * Fetches keyword data to identify content opportunities:
 * - High impression, low click keywords (content gaps)
 * - Rising keywords (trending topics)
 * - Top performing keywords (content to expand)
 *
 * Setup:
 * 1. Create a Google Cloud project
 * 2. Enable the Search Console API
 * 3. Create a service account and download credentials
 * 4. Add the service account email to Search Console property
 * 5. Set GOOGLE_APPLICATION_CREDENTIALS env variable
 */

import { SearchConsoleData, SearchConsoleKeyword } from './types';

const SEARCH_CONSOLE_API = 'https://searchconsole.googleapis.com/webmasters/v3';
const SITE_URL = 'https://instantroofestimate.ai';

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

/**
 * Get an access token using service account credentials
 */
async function getAccessToken(): Promise<string> {
  // In production, use googleapis library with service account
  // For now, we'll use the access token from environment
  const token = process.env.GOOGLE_ACCESS_TOKEN;

  if (!token) {
    throw new Error('GOOGLE_ACCESS_TOKEN not configured. Set up Google Cloud service account.');
  }

  return token;
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
  return !!process.env.GOOGLE_ACCESS_TOKEN;
}

/**
 * Mock data for development/testing
 */
export function getMockSearchConsoleData(): SearchConsoleData {
  return {
    topKeywords: [
      { keyword: 'roof replacement cost', clicks: 450, impressions: 12000, ctr: 0.0375, position: 4.2 },
      { keyword: 'metal roof vs shingles', clicks: 320, impressions: 8500, ctr: 0.0376, position: 5.1 },
      { keyword: 'roof estimate', clicks: 280, impressions: 9200, ctr: 0.0304, position: 6.3 },
      { keyword: 'how much does a roof cost', clicks: 250, impressions: 15000, ctr: 0.0167, position: 8.4 },
      { keyword: 'storm damage roof repair', clicks: 180, impressions: 4200, ctr: 0.0429, position: 3.8 },
    ],
    lowHangingFruit: [
      { keyword: 'best roofing material for florida', clicks: 12, impressions: 2400, ctr: 0.005, position: 12.5 },
      { keyword: 'roof replacement timeline', clicks: 8, impressions: 1800, ctr: 0.0044, position: 15.2 },
      { keyword: 'signs you need a new roof', clicks: 15, impressions: 3200, ctr: 0.0047, position: 11.8 },
      { keyword: 'roof warranty what is covered', clicks: 5, impressions: 1500, ctr: 0.0033, position: 18.3 },
      { keyword: 'how long does roof replacement take', clicks: 22, impressions: 2800, ctr: 0.0079, position: 9.7 },
    ],
    risingKeywords: [
      { keyword: 'ai roof estimate', clicks: 45, impressions: 800, ctr: 0.0563, position: 4.5 },
      { keyword: 'satellite roof measurement', clicks: 38, impressions: 650, ctr: 0.0585, position: 5.2 },
      { keyword: '2025 roofing trends', clicks: 25, impressions: 1200, ctr: 0.0208, position: 8.1 },
    ],
    fetchedAt: new Date().toISOString(),
  };
}
