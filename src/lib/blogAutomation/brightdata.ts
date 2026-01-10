/**
 * Brightdata SERP Research Integration
 *
 * Uses Brightdata's SERP API to analyze competitor content:
 * - Top ranking pages for target keywords
 * - Common topics and headings
 * - Content gaps and opportunities
 * - Related questions (People Also Ask)
 *
 * Setup:
 * 1. Create Brightdata account at brightdata.com
 * 2. Set up SERP API zone
 * 3. Get API credentials
 * 4. Set BRIGHTDATA_API_KEY and BRIGHTDATA_ZONE env variables
 */

import { CompetitorAnalysis, SerpResult } from './types';

const BRIGHTDATA_API = 'https://api.brightdata.com/serp';

interface BrightdataSerpRequest {
  query: string;
  country?: string;
  language?: string;
  num_results?: number;
}

interface BrightdataSerpResponse {
  organic_results: {
    position: number;
    title: string;
    link: string;
    snippet: string;
    displayed_link: string;
  }[];
  related_questions?: {
    question: string;
    snippet: string;
  }[];
  related_searches?: {
    query: string;
  }[];
}

/**
 * Fetch SERP results from Brightdata
 */
async function fetchSerpResults(query: string): Promise<BrightdataSerpResponse> {
  const apiKey = process.env.BRIGHTDATA_API_KEY;
  const zone = process.env.BRIGHTDATA_ZONE || 'serp';

  if (!apiKey) {
    throw new Error('BRIGHTDATA_API_KEY not configured');
  }

  const response = await fetch(`${BRIGHTDATA_API}/google`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      country: 'us',
      language: 'en',
      num_results: 10,
      zone,
    } as BrightdataSerpRequest),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Brightdata API error: ${error}`);
  }

  return response.json();
}

/**
 * Extract common topics from competitor content
 */
function extractCommonTopics(results: SerpResult[]): string[] {
  const allText = results.map(r => `${r.title} ${r.description}`).join(' ').toLowerCase();

  // Common roofing topics to look for
  const topicPatterns = [
    { pattern: /cost|price|budget|afford/i, topic: 'Cost & Pricing' },
    { pattern: /material|shingle|metal|tile/i, topic: 'Materials' },
    { pattern: /repair|fix|damage|leak/i, topic: 'Repairs' },
    { pattern: /install|replacement|new roof/i, topic: 'Installation' },
    { pattern: /warranty|guarantee/i, topic: 'Warranty' },
    { pattern: /contractor|company|pro/i, topic: 'Finding Contractors' },
    { pattern: /diy|yourself/i, topic: 'DIY vs Professional' },
    { pattern: /sign|when|time/i, topic: 'When to Replace' },
    { pattern: /maintain|care|clean/i, topic: 'Maintenance' },
    { pattern: /insur|claim|cover/i, topic: 'Insurance' },
    { pattern: /storm|hail|wind|weather/i, topic: 'Storm Damage' },
    { pattern: /life|last|dura/i, topic: 'Lifespan & Durability' },
  ];

  const foundTopics: string[] = [];
  for (const { pattern, topic } of topicPatterns) {
    if (pattern.test(allText)) {
      foundTopics.push(topic);
    }
  }

  return foundTopics;
}

/**
 * Extract common heading patterns from titles
 */
function extractCommonHeadings(results: SerpResult[]): string[] {
  const headingPatterns: string[] = [];

  for (const result of results) {
    const title = result.title.toLowerCase();

    // Common heading patterns
    if (title.includes('how to')) headingPatterns.push('How-To Guide');
    if (title.includes('cost of') || title.includes('how much')) headingPatterns.push('Cost Breakdown');
    if (title.includes('best')) headingPatterns.push('Best Options');
    if (title.includes('vs') || title.includes('versus')) headingPatterns.push('Comparison');
    if (title.includes('guide')) headingPatterns.push('Complete Guide');
    if (title.includes('tips')) headingPatterns.push('Tips & Advice');
    if (title.match(/\d+\s*(things|tips|ways|reasons)/)) headingPatterns.push('Numbered List');
    if (title.includes('what is') || title.includes('what are')) headingPatterns.push('Explainer');
    if (title.includes('pros and cons')) headingPatterns.push('Pros & Cons');
    if (title.includes('faq') || title.includes('questions')) headingPatterns.push('FAQ Style');
  }

  return [...new Set(headingPatterns)];
}

/**
 * Estimate average word count from snippets (rough estimate)
 * In production, you'd fetch and analyze full page content
 */
function estimateWordCount(results: SerpResult[]): number {
  // SERP snippets are typically 150-160 chars
  // Average blog post for these queries is typically 1500-2500 words
  // Based on position and snippet quality, estimate
  const avgSnippetLength = results.reduce((sum, r) => sum + r.description.length, 0) / results.length;

  if (avgSnippetLength > 150) return 2000;
  if (avgSnippetLength > 120) return 1500;
  return 1200;
}

/**
 * Analyze competitor content for a keyword
 */
export async function analyzeCompetitors(keyword: string): Promise<CompetitorAnalysis> {
  const serpData = await fetchSerpResults(keyword);

  const topResults: SerpResult[] = serpData.organic_results.map(result => ({
    title: result.title,
    url: result.link,
    description: result.snippet,
    position: result.position,
  }));

  const relatedQuestions = serpData.related_questions?.map(q => q.question) || [];

  return {
    keyword,
    topResults,
    commonTopics: extractCommonTopics(topResults),
    avgWordCount: estimateWordCount(topResults),
    commonHeadings: extractCommonHeadings(topResults),
    relatedQuestions,
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Check if Brightdata is configured
 */
export function isBrightdataConfigured(): boolean {
  return !!process.env.BRIGHTDATA_API_KEY;
}

/**
 * Mock data for development/testing
 */
export function getMockCompetitorAnalysis(keyword: string): CompetitorAnalysis {
  return {
    keyword,
    topResults: [
      {
        title: `How Much Does a ${keyword} Cost in 2025? Complete Guide`,
        url: 'https://example.com/roof-cost',
        description: `Learn about ${keyword} costs, factors affecting price, and how to save money on your roofing project. Get free estimates from local contractors.`,
        position: 1,
      },
      {
        title: `${keyword}: Everything You Need to Know`,
        url: 'https://example.com/roof-guide',
        description: `Comprehensive guide to ${keyword}. Covers materials, installation, maintenance, and more. Updated for 2025.`,
        position: 2,
      },
      {
        title: `10 Things to Know Before Getting a ${keyword}`,
        url: 'https://example.com/roof-tips',
        description: `Essential tips for homeowners considering ${keyword}. Avoid costly mistakes with our expert advice.`,
        position: 3,
      },
      {
        title: `${keyword} vs Alternatives: Pros and Cons Compared`,
        url: 'https://example.com/roof-comparison',
        description: `Compare ${keyword} with other options. See which is best for your home, climate, and budget.`,
        position: 4,
      },
      {
        title: `Best ${keyword} Companies Near You [2025 Reviews]`,
        url: 'https://example.com/roof-companies',
        description: `Find top-rated ${keyword} contractors in your area. Read reviews, compare prices, and get free quotes.`,
        position: 5,
      },
    ],
    commonTopics: ['Cost & Pricing', 'Materials', 'Installation', 'Finding Contractors', 'Lifespan & Durability'],
    avgWordCount: 1800,
    commonHeadings: ['Complete Guide', 'Numbered List', 'Comparison', 'Pros & Cons'],
    relatedQuestions: [
      `How much does ${keyword} cost?`,
      `How long does ${keyword} last?`,
      `Is ${keyword} worth it?`,
      `What are the pros and cons of ${keyword}?`,
      `How do I find a good ${keyword} contractor?`,
    ],
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Get SERP data (uses mock if Brightdata not configured)
 */
export async function getSerpAnalysis(keyword: string): Promise<CompetitorAnalysis> {
  if (isBrightdataConfigured()) {
    return analyzeCompetitors(keyword);
  }

  console.log('Brightdata not configured, using mock data');
  return getMockCompetitorAnalysis(keyword);
}
