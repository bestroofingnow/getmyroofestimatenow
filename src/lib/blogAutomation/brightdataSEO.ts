/**
 * Enhanced Brightdata SEO/AEO/Voice Search Integration
 *
 * Provides comprehensive SEO research capabilities:
 * - Voice Search Optimization (natural language queries)
 * - AEO (Answer Engine Optimization) for AI assistants
 * - Featured Snippet Analysis
 * - People Also Ask extraction
 * - AI Search Engine Compatibility
 * - Content Gap Detection
 * - SERP Feature Analysis
 *
 * Setup:
 * 1. Create Brightdata account at brightdata.com
 * 2. Set up SERP API zone
 * 3. Get API credentials
 * 4. Set BRIGHTDATA_API_KEY and BRIGHTDATA_ZONE env variables
 */

import { CompetitorAnalysis, SerpResult } from './types';

const BRIGHTDATA_API = 'https://api.brightdata.com/serp';

// ============================================================
// TYPES FOR ENHANCED SEO/AEO ANALYSIS
// ============================================================

export interface VoiceSearchQuery {
  query: string;
  type: 'question' | 'command' | 'conversational';
  intent: 'informational' | 'navigational' | 'transactional' | 'local';
  keywords: string[];
}

export interface FeaturedSnippet {
  type: 'paragraph' | 'list' | 'table' | 'video';
  content: string;
  sourceUrl: string;
  sourceTitle: string;
}

export interface PeopleAlsoAsk {
  question: string;
  snippet: string;
  sourceUrl?: string;
  relatedQuestions?: string[];
}

export interface AISearchOptimization {
  primaryAnswer: string;
  supportingFacts: string[];
  citationOpportunities: string[];
  entityMentions: string[];
  recommendedSchema: string[];
}

export interface SerpFeatures {
  hasFeaturedSnippet: boolean;
  hasPeopleAlsoAsk: boolean;
  hasLocalPack: boolean;
  hasKnowledgePanel: boolean;
  hasVideoCarousel: boolean;
  hasImagePack: boolean;
  hasSitelinks: boolean;
  hasReviews: boolean;
  featuredSnippet?: FeaturedSnippet;
  peopleAlsoAsk: PeopleAlsoAsk[];
  relatedSearches: string[];
}

export interface ContentGap {
  topic: string;
  competitorsCovering: number;
  averagePosition: number;
  opportunity: 'high' | 'medium' | 'low';
  suggestedHeading: string;
  suggestedContent: string;
}

export interface SEOAnalysis {
  keyword: string;
  serpFeatures: SerpFeatures;
  voiceSearchOpportunities: VoiceSearchQuery[];
  aeoRecommendations: AISearchOptimization;
  contentGaps: ContentGap[];
  competitorAnalysis: CompetitorAnalysis;
  fetchedAt: string;
}

// ============================================================
// BRIGHTDATA API FUNCTIONS
// ============================================================

interface BrightdataEnhancedResponse {
  organic_results: {
    position: number;
    title: string;
    link: string;
    snippet: string;
    displayed_link: string;
    rich_snippet?: {
      type: string;
      content: string;
    };
    sitelinks?: {
      title: string;
      link: string;
    }[];
  }[];
  featured_snippet?: {
    type: string;
    content: string;
    source: string;
    link: string;
  };
  people_also_ask?: {
    question: string;
    snippet: string;
    link?: string;
  }[];
  related_searches?: {
    query: string;
  }[];
  knowledge_panel?: {
    title: string;
    type: string;
    description: string;
  };
  local_results?: {
    title: string;
    address: string;
    rating: number;
    reviews: number;
  }[];
}

/**
 * Fetch enhanced SERP results from Brightdata
 */
async function fetchEnhancedSerpResults(query: string): Promise<BrightdataEnhancedResponse> {
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
      // Request additional SERP features
      include_featured_snippet: true,
      include_people_also_ask: true,
      include_related_searches: true,
      include_knowledge_panel: true,
      include_local_results: true,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Brightdata API error: ${error}`);
  }

  return response.json();
}

// ============================================================
// VOICE SEARCH OPTIMIZATION
// ============================================================

/**
 * Generate voice search query variations
 */
export function generateVoiceSearchQueries(keyword: string): VoiceSearchQuery[] {
  const queries: VoiceSearchQuery[] = [];
  const keywordLower = keyword.toLowerCase();

  // Question-based queries (Alexa, Siri, Google Assistant)
  const questionStarters = [
    { prefix: 'how much does', suffix: 'cost', type: 'question' as const, intent: 'transactional' as const },
    { prefix: 'what is the average cost of', suffix: '', type: 'question' as const, intent: 'informational' as const },
    { prefix: 'how do I', suffix: '', type: 'question' as const, intent: 'informational' as const },
    { prefix: 'what is', suffix: '', type: 'question' as const, intent: 'informational' as const },
    { prefix: 'where can I find', suffix: 'near me', type: 'question' as const, intent: 'local' as const },
    { prefix: 'who is the best', suffix: 'contractor', type: 'question' as const, intent: 'local' as const },
    { prefix: 'when should I', suffix: '', type: 'question' as const, intent: 'informational' as const },
    { prefix: 'why does', suffix: '', type: 'question' as const, intent: 'informational' as const },
    { prefix: 'is it worth', suffix: '', type: 'question' as const, intent: 'informational' as const },
    { prefix: 'should I', suffix: '', type: 'question' as const, intent: 'informational' as const },
  ];

  // Command-based queries
  const commandPatterns = [
    { prefix: 'find', suffix: 'near me', type: 'command' as const, intent: 'local' as const },
    { prefix: 'get', suffix: 'estimate', type: 'command' as const, intent: 'transactional' as const },
    { prefix: 'compare', suffix: 'prices', type: 'command' as const, intent: 'transactional' as const },
    { prefix: 'show me', suffix: 'options', type: 'command' as const, intent: 'informational' as const },
  ];

  // Conversational queries (ChatGPT, Claude, Perplexity)
  const conversationalPatterns = [
    { prefix: 'I need help with', suffix: '', type: 'conversational' as const, intent: 'informational' as const },
    { prefix: 'Tell me about', suffix: '', type: 'conversational' as const, intent: 'informational' as const },
    { prefix: 'Can you explain', suffix: '', type: 'conversational' as const, intent: 'informational' as const },
    { prefix: 'What should I know about', suffix: '', type: 'conversational' as const, intent: 'informational' as const },
    { prefix: 'Help me understand', suffix: '', type: 'conversational' as const, intent: 'informational' as const },
  ];

  // Generate all variations
  [...questionStarters, ...commandPatterns, ...conversationalPatterns].forEach(pattern => {
    const query = `${pattern.prefix} ${keywordLower} ${pattern.suffix}`.trim().replace(/\s+/g, ' ');
    queries.push({
      query,
      type: pattern.type,
      intent: pattern.intent,
      keywords: extractKeywords(query),
    });
  });

  // Add roofing-specific voice queries
  if (keywordLower.includes('roof')) {
    queries.push(
      {
        query: 'how long does a roof replacement take',
        type: 'question',
        intent: 'informational',
        keywords: ['roof', 'replacement', 'time', 'duration'],
      },
      {
        query: 'what are signs I need a new roof',
        type: 'question',
        intent: 'informational',
        keywords: ['roof', 'signs', 'new', 'damage'],
      },
      {
        query: 'how often should a roof be replaced',
        type: 'question',
        intent: 'informational',
        keywords: ['roof', 'replaced', 'frequency', 'lifespan'],
      },
      {
        query: 'does insurance cover roof replacement',
        type: 'question',
        intent: 'informational',
        keywords: ['insurance', 'roof', 'coverage', 'replacement'],
      },
      {
        query: 'find a roofing contractor near me',
        type: 'command',
        intent: 'local',
        keywords: ['roofing', 'contractor', 'near me', 'local'],
      }
    );
  }

  return queries;
}

function extractKeywords(text: string): string[] {
  const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'up', 'about', 'into', 'over', 'after', 'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am']);

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
}

// ============================================================
// AEO (ANSWER ENGINE OPTIMIZATION)
// ============================================================

/**
 * Generate AEO recommendations for AI search engines
 */
export function generateAEORecommendations(
  keyword: string,
  serpResults: SerpResult[],
  peopleAlsoAsk: PeopleAlsoAsk[]
): AISearchOptimization {
  // Extract key facts from top results
  const allSnippets = serpResults.map(r => r.description).join(' ');

  // Generate primary answer (concise, direct answer for AI assistants)
  const primaryAnswer = generateConciseAnswer(keyword, serpResults);

  // Extract supporting facts
  const supportingFacts = extractSupportingFacts(allSnippets, keyword);

  // Identify citation opportunities (sources AI might cite)
  const citationOpportunities = identifyCitationOpportunities(serpResults);

  // Extract entity mentions for knowledge graph connections
  const entityMentions = extractEntityMentions(allSnippets);

  // Recommend schema types
  const recommendedSchema = recommendSchemaTypes(keyword, peopleAlsoAsk);

  return {
    primaryAnswer,
    supportingFacts,
    citationOpportunities,
    entityMentions,
    recommendedSchema,
  };
}

function generateConciseAnswer(keyword: string, results: SerpResult[]): string {
  const keywordLower = keyword.toLowerCase();

  // Cost-related queries
  if (keywordLower.includes('cost') || keywordLower.includes('price') || keywordLower.includes('how much')) {
    return `The average ${keywordLower.replace('cost', '').replace('price', '').trim()} typically costs between $5,000 and $15,000 for an average-sized home, depending on materials, labor costs in your area, and roof complexity. Get a free instant estimate at InstantRoofEstimate.ai for accurate pricing based on your specific roof.`;
  }

  // How-to queries
  if (keywordLower.includes('how to') || keywordLower.includes('how do')) {
    return `To ${keywordLower.replace('how to', '').replace('how do i', '').trim()}, follow these steps: 1) Get multiple estimates from licensed contractors, 2) Check reviews and references, 3) Verify insurance and licensing, 4) Compare materials and warranties, 5) Schedule the work during optimal weather conditions.`;
  }

  // What-is queries
  if (keywordLower.includes('what is') || keywordLower.includes('what are')) {
    return `${keyword.replace('what is', '').replace('what are', '').trim()} refers to the roofing industry term for ${results[0]?.description.substring(0, 150) || 'professional roofing services and materials'}. Learn more with a free roof assessment at InstantRoofEstimate.ai.`;
  }

  // Default informational answer
  return `${keyword} is an important consideration for homeowners. Key factors include cost, material quality, contractor expertise, and local climate conditions. Get personalized information by entering your address at InstantRoofEstimate.ai for a free instant estimate.`;
}

function extractSupportingFacts(text: string, keyword: string): string[] {
  const facts: string[] = [];
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);

  // Look for sentences with numbers (statistics, costs, timeframes)
  const numberPattern = /\d+/;
  const factSentences = sentences.filter(s => numberPattern.test(s));

  factSentences.slice(0, 5).forEach(sentence => {
    const cleaned = sentence.trim();
    if (cleaned.length > 30 && cleaned.length < 200) {
      facts.push(cleaned);
    }
  });

  // Add roofing-specific facts
  if (keyword.toLowerCase().includes('roof')) {
    facts.push('The average roof replacement takes 1-3 days for a typical home');
    facts.push('Most asphalt shingle roofs last 20-30 years with proper maintenance');
    facts.push('Metal roofs can last 40-70 years and offer better energy efficiency');
    facts.push('Roof replacement can increase home value by 60-70% of the project cost');
  }

  return [...new Set(facts)].slice(0, 6);
}

function identifyCitationOpportunities(results: SerpResult[]): string[] {
  const opportunities: string[] = [];

  // High-authority domains that AI assistants commonly cite
  const authorityDomains = [
    'wikipedia.org',
    'gov',
    '.edu',
    'forbes.com',
    'nytimes.com',
    'wsj.com',
    'consumerreports.org',
    'homeadvisor.com',
    'angi.com',
    'houzz.com',
  ];

  results.forEach(result => {
    const url = result.url.toLowerCase();
    if (authorityDomains.some(domain => url.includes(domain))) {
      opportunities.push(`Cite or reference: ${result.title} (${result.url})`);
    }
  });

  // Add recommendations for our content
  opportunities.push('Include original data or statistics to become a citable source');
  opportunities.push('Add expert quotes with credentials for E-E-A-T signals');
  opportunities.push('Reference industry standards (NRCA, GAF, CertainTeed)');

  return opportunities.slice(0, 5);
}

function extractEntityMentions(text: string): string[] {
  const entities: string[] = [];

  // Roofing-related entities
  const roofingEntities = [
    'asphalt shingles', 'metal roofing', 'tile roof', 'slate roof',
    'GAF', 'CertainTeed', 'Owens Corning', 'TAMKO',
    'NRCA', 'National Roofing Contractors Association',
    'roof replacement', 'roof repair', 'roof inspection',
    'storm damage', 'hail damage', 'wind damage',
    'homeowners insurance', 'roof warranty',
  ];

  const textLower = text.toLowerCase();
  roofingEntities.forEach(entity => {
    if (textLower.includes(entity.toLowerCase())) {
      entities.push(entity);
    }
  });

  return [...new Set(entities)];
}

function recommendSchemaTypes(keyword: string, paa: PeopleAlsoAsk[]): string[] {
  const schemas: string[] = ['FAQPage', 'Article'];

  const keywordLower = keyword.toLowerCase();

  if (keywordLower.includes('cost') || keywordLower.includes('price')) {
    schemas.push('Product', 'Offer', 'PriceSpecification');
  }

  if (keywordLower.includes('how to') || keywordLower.includes('steps')) {
    schemas.push('HowTo', 'HowToStep');
  }

  if (keywordLower.includes('near me') || keywordLower.includes('local')) {
    schemas.push('LocalBusiness', 'Service', 'GeoCoordinates');
  }

  if (keywordLower.includes('compare') || keywordLower.includes('vs')) {
    schemas.push('ItemList', 'Product');
  }

  if (paa.length > 0) {
    schemas.push('QAPage', 'Question', 'Answer');
  }

  // Always include speakable for voice search
  schemas.push('SpeakableSpecification');

  return [...new Set(schemas)];
}

// ============================================================
// CONTENT GAP ANALYSIS
// ============================================================

/**
 * Identify content gaps based on competitor analysis
 */
export function identifyContentGaps(
  keyword: string,
  results: SerpResult[],
  peopleAlsoAsk: PeopleAlsoAsk[]
): ContentGap[] {
  const gaps: ContentGap[] = [];

  // Analyze competitor content for common topics
  const topicCoverage = analyzeTopicCoverage(results);

  // Find topics with high coverage but opportunity
  topicCoverage.forEach(topic => {
    if (topic.count >= 3) { // At least 3 competitors cover this
      gaps.push({
        topic: topic.name,
        competitorsCovering: topic.count,
        averagePosition: topic.avgPosition,
        opportunity: topic.avgPosition > 5 ? 'high' : topic.avgPosition > 3 ? 'medium' : 'low',
        suggestedHeading: generateHeadingSuggestion(topic.name, keyword),
        suggestedContent: generateContentSuggestion(topic.name, keyword),
      });
    }
  });

  // Add gaps from People Also Ask
  peopleAlsoAsk.forEach(paa => {
    // Check if we already cover this question
    const alreadyCovered = gaps.some(g =>
      g.topic.toLowerCase().includes(paa.question.toLowerCase().slice(0, 20))
    );

    if (!alreadyCovered) {
      gaps.push({
        topic: paa.question,
        competitorsCovering: 1,
        averagePosition: 0,
        opportunity: 'high', // PAA questions are high opportunity
        suggestedHeading: paa.question,
        suggestedContent: generateAnswerSuggestion(paa.question, keyword),
      });
    }
  });

  // Sort by opportunity
  return gaps.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.opportunity] - order[b.opportunity];
  }).slice(0, 10);
}

interface TopicCoverage {
  name: string;
  count: number;
  avgPosition: number;
}

function analyzeTopicCoverage(results: SerpResult[]): TopicCoverage[] {
  const topics: Map<string, { count: number; positions: number[] }> = new Map();

  const topicPatterns = [
    { pattern: /cost|price|budget|afford|expensive|cheap/i, name: 'Cost & Pricing' },
    { pattern: /material|shingle|metal|tile|slate/i, name: 'Materials' },
    { pattern: /repair|fix|damage|leak|patch/i, name: 'Repairs' },
    { pattern: /install|replace|new/i, name: 'Installation' },
    { pattern: /warranty|guarantee/i, name: 'Warranty' },
    { pattern: /contractor|company|pro|hire/i, name: 'Finding Contractors' },
    { pattern: /diy|yourself/i, name: 'DIY' },
    { pattern: /sign|symptom|when|indicator/i, name: 'Warning Signs' },
    { pattern: /maintain|care|clean|inspect/i, name: 'Maintenance' },
    { pattern: /insur|claim|cover/i, name: 'Insurance' },
    { pattern: /storm|hail|wind|weather/i, name: 'Storm Damage' },
    { pattern: /life|last|dura|long/i, name: 'Lifespan' },
    { pattern: /energy|efficien|save/i, name: 'Energy Efficiency' },
    { pattern: /permit|code|regulation/i, name: 'Permits & Codes' },
    { pattern: /estimate|quote|bid/i, name: 'Getting Estimates' },
  ];

  results.forEach(result => {
    const text = `${result.title} ${result.description}`.toLowerCase();

    topicPatterns.forEach(({ pattern, name }) => {
      if (pattern.test(text)) {
        const existing = topics.get(name) || { count: 0, positions: [] };
        existing.count++;
        existing.positions.push(result.position);
        topics.set(name, existing);
      }
    });
  });

  return Array.from(topics.entries()).map(([name, data]) => ({
    name,
    count: data.count,
    avgPosition: data.positions.reduce((a, b) => a + b, 0) / data.positions.length,
  }));
}

function generateHeadingSuggestion(topic: string, keyword: string): string {
  const headings: Record<string, string> = {
    'Cost & Pricing': `How Much Does ${keyword} Cost? (${new Date().getFullYear()} Pricing Guide)`,
    'Materials': `Best Materials for ${keyword}: Complete Comparison`,
    'Repairs': `${keyword} Repair vs Replacement: Which Do You Need?`,
    'Installation': `${keyword} Installation: What to Expect`,
    'Warranty': `Understanding Your ${keyword} Warranty`,
    'Finding Contractors': `How to Find the Best ${keyword} Contractor Near You`,
    'DIY': `Can You DIY ${keyword}? Pros, Cons & Considerations`,
    'Warning Signs': `5 Signs You Need ${keyword}`,
    'Maintenance': `${keyword} Maintenance: Extend Your Roof's Life`,
    'Insurance': `Does Insurance Cover ${keyword}?`,
    'Storm Damage': `Storm Damage and ${keyword}: What's Covered?`,
    'Lifespan': `How Long Does ${keyword} Last?`,
    'Energy Efficiency': `${keyword} and Energy Efficiency: What to Know`,
    'Permits & Codes': `${keyword} Permits: Requirements & Process`,
    'Getting Estimates': `How to Get Accurate ${keyword} Estimates`,
  };

  return headings[topic] || `${topic}: What You Need to Know About ${keyword}`;
}

function generateContentSuggestion(topic: string, keyword: string): string {
  const suggestions: Record<string, string> = {
    'Cost & Pricing': 'Include average costs, price ranges by material, factors affecting price, and a cost calculator CTA.',
    'Materials': 'Compare at least 4 material types with pros/cons, costs, and lifespan. Add comparison table.',
    'Repairs': 'Cover common repair types, costs, when repair vs replacement makes sense, and DIY vs professional.',
    'Installation': 'Detail the installation process step-by-step, timeline, and what homeowners should expect.',
    'Warranty': 'Explain manufacturer vs workmanship warranties, what voids warranties, and how to file claims.',
    'Finding Contractors': 'Include vetting checklist, red flags, questions to ask, and how to compare quotes.',
    'DIY': 'Be honest about risks, required skills, tools needed, and when to call professionals.',
    'Warning Signs': 'List visible signs with photos, when each sign indicates repair vs replacement needed.',
    'Maintenance': 'Provide seasonal maintenance checklist, inspection tips, and preventive measures.',
    'Insurance': 'Explain coverage types, claim process, depreciation, and when to file.',
    'Storm Damage': 'Cover damage assessment, documentation for claims, emergency repairs, and contractor selection.',
    'Lifespan': 'Compare lifespans by material, factors affecting longevity, and maintenance impact.',
    'Energy Efficiency': 'Discuss cool roofs, insulation, ventilation, and potential energy savings.',
    'Permits & Codes': 'Explain when permits are required, how to obtain them, and code compliance.',
    'Getting Estimates': 'Guide on what should be in an estimate, comparing quotes, and red flags.',
  };

  return suggestions[topic] || `Create comprehensive content covering ${topic} as it relates to ${keyword}. Include FAQs, data, and actionable advice.`;
}

function generateAnswerSuggestion(question: string, keyword: string): string {
  // Generate a suggested answer format
  return `Provide a direct, concise answer (40-60 words) followed by supporting details. Use bullet points for key facts. End with a CTA to get a free estimate.`;
}

// ============================================================
// SERP FEATURES ANALYSIS
// ============================================================

/**
 * Analyze SERP features for a keyword
 */
export function analyzeSerpFeatures(response: BrightdataEnhancedResponse): SerpFeatures {
  const features: SerpFeatures = {
    hasFeaturedSnippet: !!response.featured_snippet,
    hasPeopleAlsoAsk: (response.people_also_ask?.length || 0) > 0,
    hasLocalPack: (response.local_results?.length || 0) > 0,
    hasKnowledgePanel: !!response.knowledge_panel,
    hasVideoCarousel: response.organic_results.some(r => r.link.includes('youtube.com')),
    hasImagePack: false, // Would need specific API support
    hasSitelinks: response.organic_results.some(r => r.sitelinks && r.sitelinks.length > 0),
    hasReviews: response.organic_results.some(r => r.rich_snippet?.type === 'review'),
    peopleAlsoAsk: (response.people_also_ask || []).map(paa => ({
      question: paa.question,
      snippet: paa.snippet,
      sourceUrl: paa.link,
    })),
    relatedSearches: (response.related_searches || []).map(rs => rs.query),
  };

  if (response.featured_snippet) {
    features.featuredSnippet = {
      type: response.featured_snippet.type as 'paragraph' | 'list' | 'table' | 'video',
      content: response.featured_snippet.content,
      sourceUrl: response.featured_snippet.link,
      sourceTitle: response.featured_snippet.source,
    };
  }

  return features;
}

// ============================================================
// MAIN ANALYSIS FUNCTION
// ============================================================

/**
 * Perform comprehensive SEO/AEO analysis for a keyword
 */
export async function performSEOAnalysis(keyword: string): Promise<SEOAnalysis> {
  const apiKey = process.env.BRIGHTDATA_API_KEY;

  if (!apiKey) {
    // Return mock analysis if API not configured
    return getMockSEOAnalysis(keyword);
  }

  const serpResponse = await fetchEnhancedSerpResults(keyword);

  const serpResults: SerpResult[] = serpResponse.organic_results.map(r => ({
    title: r.title,
    url: r.link,
    description: r.snippet,
    position: r.position,
  }));

  const serpFeatures = analyzeSerpFeatures(serpResponse);

  const competitorAnalysis: CompetitorAnalysis = {
    keyword,
    topResults: serpResults,
    commonTopics: analyzeTopicCoverage(serpResults).map(t => t.name),
    avgWordCount: 1800, // Estimated
    commonHeadings: extractCommonHeadings(serpResults),
    relatedQuestions: serpFeatures.peopleAlsoAsk.map(p => p.question),
    fetchedAt: new Date().toISOString(),
  };

  return {
    keyword,
    serpFeatures,
    voiceSearchOpportunities: generateVoiceSearchQueries(keyword),
    aeoRecommendations: generateAEORecommendations(keyword, serpResults, serpFeatures.peopleAlsoAsk),
    contentGaps: identifyContentGaps(keyword, serpResults, serpFeatures.peopleAlsoAsk),
    competitorAnalysis,
    fetchedAt: new Date().toISOString(),
  };
}

function extractCommonHeadings(results: SerpResult[]): string[] {
  const headings: string[] = [];

  results.forEach(result => {
    const title = result.title.toLowerCase();

    if (title.includes('how to')) headings.push('How-To Guide');
    if (title.includes('cost of') || title.includes('how much')) headings.push('Cost Breakdown');
    if (title.includes('best')) headings.push('Best Options');
    if (title.includes('vs') || title.includes('versus')) headings.push('Comparison');
    if (title.includes('guide')) headings.push('Complete Guide');
    if (title.includes('tips')) headings.push('Tips & Advice');
    if (title.match(/\d+\s*(things|tips|ways|reasons)/)) headings.push('Numbered List');
    if (title.includes('pros and cons')) headings.push('Pros & Cons');
    if (title.includes('faq')) headings.push('FAQ Style');
  });

  return [...new Set(headings)];
}

/**
 * Mock SEO analysis for development/testing
 */
function getMockSEOAnalysis(keyword: string): SEOAnalysis {
  return {
    keyword,
    serpFeatures: {
      hasFeaturedSnippet: true,
      hasPeopleAlsoAsk: true,
      hasLocalPack: keyword.includes('near me'),
      hasKnowledgePanel: false,
      hasVideoCarousel: true,
      hasImagePack: true,
      hasSitelinks: true,
      hasReviews: true,
      featuredSnippet: {
        type: 'paragraph',
        content: `The average ${keyword} costs between $5,000 and $15,000...`,
        sourceUrl: 'https://example.com/roof-cost',
        sourceTitle: 'Example Roofing Guide',
      },
      peopleAlsoAsk: [
        { question: `How much does ${keyword} cost?`, snippet: 'Costs vary based on...' },
        { question: `How long does ${keyword} take?`, snippet: 'Typically 1-3 days...' },
        { question: `Is ${keyword} worth it?`, snippet: 'Yes, for most homeowners...' },
        { question: `What are signs I need ${keyword}?`, snippet: 'Look for missing shingles...' },
      ],
      relatedSearches: [
        `${keyword} near me`,
        `${keyword} cost calculator`,
        `best ${keyword} companies`,
        `${keyword} reviews`,
      ],
    },
    voiceSearchOpportunities: generateVoiceSearchQueries(keyword),
    aeoRecommendations: {
      primaryAnswer: `The average ${keyword} costs between $5,000 and $15,000 depending on materials and home size. Get a free instant estimate at InstantRoofEstimate.ai.`,
      supportingFacts: [
        'Average roof replacement takes 1-3 days',
        'Most asphalt roofs last 20-30 years',
        'Metal roofs can last 40-70 years',
        'Roof replacement adds 60-70% ROI to home value',
      ],
      citationOpportunities: [
        'Include original cost data to become a citable source',
        'Add expert quotes with credentials',
        'Reference NRCA industry standards',
      ],
      entityMentions: ['asphalt shingles', 'metal roofing', 'roof replacement', 'NRCA'],
      recommendedSchema: ['FAQPage', 'HowTo', 'Product', 'LocalBusiness', 'SpeakableSpecification'],
    },
    contentGaps: [
      {
        topic: 'Cost & Pricing',
        competitorsCovering: 8,
        averagePosition: 4.2,
        opportunity: 'medium',
        suggestedHeading: `How Much Does ${keyword} Cost? (2025 Guide)`,
        suggestedContent: 'Include cost calculator, price ranges by material, and local pricing factors.',
      },
      {
        topic: 'Insurance',
        competitorsCovering: 5,
        averagePosition: 6.1,
        opportunity: 'high',
        suggestedHeading: `Does Insurance Cover ${keyword}?`,
        suggestedContent: 'Cover claim process, depreciation, and documentation requirements.',
      },
    ],
    competitorAnalysis: {
      keyword,
      topResults: [
        { title: `${keyword} Cost Guide 2025`, url: 'https://example.com/1', description: 'Complete guide to costs...', position: 1 },
        { title: `Best ${keyword} Options`, url: 'https://example.com/2', description: 'Compare top options...', position: 2 },
      ],
      commonTopics: ['Cost & Pricing', 'Materials', 'Installation', 'Finding Contractors'],
      avgWordCount: 1800,
      commonHeadings: ['Complete Guide', 'Cost Breakdown', 'How-To Guide'],
      relatedQuestions: [`How much does ${keyword} cost?`, `How long does ${keyword} take?`],
      fetchedAt: new Date().toISOString(),
    },
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Check if Brightdata is configured
 */
export function isBrightdataSEOConfigured(): boolean {
  return !!process.env.BRIGHTDATA_API_KEY;
}
