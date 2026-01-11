/**
 * Internal Linking System for SEO and AEO Optimization
 *
 * Automatically links keywords in blog content to relevant service,
 * material, and location pages for improved SEO and user navigation.
 */

import { locations } from './locations';

const BASE_URL = 'https://getmyroofestimatenow.com';

// ============================================================
// KEYWORD MAPS - Keywords to Internal Pages
// ============================================================

export interface KeywordLink {
  keywords: string[];  // Keywords/phrases to match
  url: string;         // Target URL
  title: string;       // Link title attribute for accessibility
  priority: number;    // Higher = linked first (prevents over-linking)
}

// Service page keywords
export const serviceKeywords: KeywordLink[] = [
  {
    keywords: ['roof replacement', 'replace your roof', 'replacing a roof', 'new roof', 'roof installation'],
    url: '/roof-estimate',
    title: 'Get a free roof replacement estimate',
    priority: 10,
  },
  {
    keywords: ['storm damage', 'hail damage', 'wind damage', 'hurricane damage', 'tornado damage', 'storm damaged roof'],
    url: '/services/storm-damage',
    title: 'Storm damage roof repair services',
    priority: 9,
  },
  {
    keywords: ['roof estimate', 'roof quote', 'roofing estimate', 'roofing quote', 'roof cost estimate'],
    url: '/',
    title: 'Get your free instant roof estimate',
    priority: 10,
  },
  {
    keywords: ['roof cost calculator', 'roofing calculator', 'roof price calculator'],
    url: '/roof-cost-calculator',
    title: 'Calculate your roof replacement cost',
    priority: 8,
  },
  {
    keywords: ['roof repair', 'fix a roof', 'repair your roof', 'roof repairs'],
    url: '/services',
    title: 'Professional roofing services',
    priority: 7,
  },
  {
    keywords: ['roof inspection', 'roofing inspection', 'inspect your roof'],
    url: '/services',
    title: 'Professional roof inspection services',
    priority: 6,
  },
];

// Material page keywords
export const materialKeywords: KeywordLink[] = [
  {
    keywords: ['asphalt shingles', 'asphalt roofing', 'shingle roof', 'architectural shingles', '3-tab shingles', 'dimensional shingles'],
    url: '/roofing-materials/asphalt-shingles',
    title: 'Learn about asphalt shingle roofing',
    priority: 8,
  },
  {
    keywords: ['metal roof', 'metal roofing', 'steel roof', 'aluminum roof', 'standing seam', 'metal shingles'],
    url: '/roofing-materials/metal-roofing',
    title: 'Learn about metal roofing options',
    priority: 8,
  },
  {
    keywords: ['roofing materials', 'roof materials', 'types of roofing', 'roofing options'],
    url: '/roofing-materials',
    title: 'Compare roofing materials',
    priority: 7,
  },
  {
    keywords: ['tile roof', 'clay tiles', 'concrete tiles', 'tile roofing', 'spanish tiles'],
    url: '/roofing-materials',
    title: 'Learn about tile roofing',
    priority: 6,
  },
  {
    keywords: ['slate roof', 'slate roofing', 'natural slate'],
    url: '/roofing-materials',
    title: 'Learn about slate roofing',
    priority: 6,
  },
  {
    keywords: ['cedar shakes', 'wood shingles', 'wood roofing', 'cedar roofing'],
    url: '/roofing-materials',
    title: 'Learn about wood roofing',
    priority: 6,
  },
  {
    keywords: ['flat roof', 'flat roofing', 'TPO roofing', 'EPDM roofing', 'low-slope roof'],
    url: '/roofing-materials',
    title: 'Learn about flat roofing systems',
    priority: 6,
  },
];

// Comparison page keywords
export const comparisonKeywords: KeywordLink[] = [
  {
    keywords: ['metal vs shingles', 'shingles vs metal', 'metal or shingles', 'asphalt vs metal'],
    url: '/compare/metal-vs-shingles',
    title: 'Compare metal roofing vs asphalt shingles',
    priority: 9,
  },
];

// Generate location keywords from locations data
export function generateLocationKeywords(): KeywordLink[] {
  return locations.map((loc) => ({
    keywords: [
      `${loc.city}`,
      `${loc.city}, ${loc.stateAbbr}`,
      `${loc.city} ${loc.stateAbbr}`,
      `roofing in ${loc.city}`,
      `roofers in ${loc.city}`,
      `${loc.city} roofing`,
      `${loc.city} roofers`,
    ],
    url: `/roof-estimate/state/${loc.state.toLowerCase().replace(/\s+/g, '-')}/${loc.slug}`,
    title: `Roof estimates in ${loc.city}, ${loc.stateAbbr}`,
    priority: 5, // Lower priority than services/materials
  }));
}

// State keywords
export function generateStateKeywords(): KeywordLink[] {
  const states = [...new Set(locations.map((loc) => ({ state: loc.state, abbr: loc.stateAbbr })))];
  const uniqueStates = states.filter((state, index, self) =>
    index === self.findIndex((s) => s.state === state.state)
  );

  return uniqueStates.map((state) => ({
    keywords: [
      `${state.state}`,
      `${state.abbr}`,
      `roofing in ${state.state}`,
      `${state.state} roofing`,
      `${state.state} roofers`,
    ],
    url: `/roof-estimate/state/${state.state.toLowerCase().replace(/\s+/g, '-')}`,
    title: `Roof estimates in ${state.state}`,
    priority: 4,
  }));
}

// ============================================================
// CONTENT PROCESSOR - Auto-link keywords in content
// ============================================================

interface ProcessingOptions {
  maxLinksPerKeyword?: number;  // Max times to link same keyword (default: 1)
  maxTotalLinks?: number;       // Max total links to add (default: 10)
  excludeInHeadings?: boolean;  // Don't link text in headings (default: true)
  excludeInLinks?: boolean;     // Don't link text already in links (default: true)
  addNofollow?: boolean;        // Add rel="nofollow" (default: false for internal)
  openInNewTab?: boolean;       // Add target="_blank" (default: false for internal)
}

const defaultOptions: ProcessingOptions = {
  maxLinksPerKeyword: 1,
  maxTotalLinks: 10,
  excludeInHeadings: true,
  excludeInLinks: true,
  addNofollow: false,
  openInNewTab: false,
};

/**
 * Process HTML content and add internal links to keywords
 */
export function processContentWithLinks(
  htmlContent: string,
  options: ProcessingOptions = {}
): string {
  const opts = { ...defaultOptions, ...options };

  // Combine all keyword maps
  const allKeywords: KeywordLink[] = [
    ...serviceKeywords,
    ...materialKeywords,
    ...comparisonKeywords,
    ...generateLocationKeywords(),
    ...generateStateKeywords(),
  ].sort((a, b) => b.priority - a.priority); // Sort by priority (highest first)

  let processedContent = htmlContent;
  let totalLinksAdded = 0;
  const linkedKeywords = new Set<string>();

  for (const keywordLink of allKeywords) {
    if (totalLinksAdded >= (opts.maxTotalLinks || 10)) break;

    for (const keyword of keywordLink.keywords) {
      if (totalLinksAdded >= (opts.maxTotalLinks || 10)) break;
      if (linkedKeywords.has(keyword.toLowerCase())) continue;

      // Create regex for the keyword (case insensitive, whole word)
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(
        `(?<!<[^>]*)(\\b)(${escapedKeyword})(\\b)(?![^<]*>)`,
        'gi'
      );

      // Check if keyword exists and is not already in a link or heading
      const matches = processedContent.match(regex);
      if (!matches) continue;

      // Find first match that's not in a link or heading
      let replaced = false;
      processedContent = processedContent.replace(regex, (match, pre, word, post, offset) => {
        if (replaced) return match;

        // Check if inside existing link
        const beforeMatch = processedContent.substring(0, offset);
        const afterMatch = processedContent.substring(offset);

        // Skip if inside <a> tag
        if (opts.excludeInLinks) {
          const lastOpenA = beforeMatch.lastIndexOf('<a ');
          const lastCloseA = beforeMatch.lastIndexOf('</a>');
          if (lastOpenA > lastCloseA) return match;
        }

        // Skip if inside heading tag
        if (opts.excludeInHeadings) {
          const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
          for (const tag of headingTags) {
            const lastOpen = beforeMatch.lastIndexOf(`<${tag}`);
            const lastClose = beforeMatch.lastIndexOf(`</${tag}>`);
            if (lastOpen > lastClose) return match;
          }
        }

        // Create the link
        replaced = true;
        totalLinksAdded++;
        linkedKeywords.add(keyword.toLowerCase());

        const attrs = [
          `href="${keywordLink.url}"`,
          `title="${keywordLink.title}"`,
          'class="internal-link text-blue-600 hover:underline"',
        ];

        if (opts.addNofollow) attrs.push('rel="nofollow"');
        if (opts.openInNewTab) attrs.push('target="_blank" rel="noopener noreferrer"');

        return `${pre}<a ${attrs.join(' ')}>${word}</a>${post}`;
      });

      if (replaced) break; // Move to next keyword group
    }
  }

  return processedContent;
}

// ============================================================
// RELATED CONTENT SUGGESTIONS
// ============================================================

export interface RelatedContent {
  type: 'service' | 'material' | 'location' | 'comparison';
  title: string;
  url: string;
  description: string;
}

/**
 * Analyze content and suggest related internal pages
 */
export function getRelatedContent(
  content: string,
  maxSuggestions: number = 5
): RelatedContent[] {
  const contentLower = content.toLowerCase();
  const suggestions: RelatedContent[] = [];
  const addedUrls = new Set<string>();

  // Check for service-related content
  for (const service of serviceKeywords) {
    if (suggestions.length >= maxSuggestions) break;
    for (const keyword of service.keywords) {
      if (contentLower.includes(keyword.toLowerCase()) && !addedUrls.has(service.url)) {
        suggestions.push({
          type: 'service',
          title: service.title,
          url: service.url,
          description: `Learn more about ${keyword}`,
        });
        addedUrls.add(service.url);
        break;
      }
    }
  }

  // Check for material-related content
  for (const material of materialKeywords) {
    if (suggestions.length >= maxSuggestions) break;
    for (const keyword of material.keywords) {
      if (contentLower.includes(keyword.toLowerCase()) && !addedUrls.has(material.url)) {
        suggestions.push({
          type: 'material',
          title: material.title,
          url: material.url,
          description: `Explore ${keyword} options`,
        });
        addedUrls.add(material.url);
        break;
      }
    }
  }

  // Check for comparison content
  for (const comparison of comparisonKeywords) {
    if (suggestions.length >= maxSuggestions) break;
    for (const keyword of comparison.keywords) {
      if (contentLower.includes(keyword.toLowerCase()) && !addedUrls.has(comparison.url)) {
        suggestions.push({
          type: 'comparison',
          title: comparison.title,
          url: comparison.url,
          description: `See our detailed comparison`,
        });
        addedUrls.add(comparison.url);
        break;
      }
    }
  }

  // Check for location mentions
  const locationKeywords = generateLocationKeywords();
  for (const location of locationKeywords) {
    if (suggestions.length >= maxSuggestions) break;
    for (const keyword of location.keywords) {
      if (contentLower.includes(keyword.toLowerCase()) && !addedUrls.has(location.url)) {
        suggestions.push({
          type: 'location',
          title: location.title,
          url: location.url,
          description: `Get local roofing estimates`,
        });
        addedUrls.add(location.url);
        break;
      }
    }
  }

  return suggestions;
}

// ============================================================
// TOPIC CLUSTERS - For Pillar Page Strategy
// ============================================================

export interface TopicCluster {
  pillarPage: string;
  pillarTitle: string;
  clusterTopics: {
    keyword: string;
    url: string;
    title: string;
  }[];
}

export const topicClusters: TopicCluster[] = [
  {
    pillarPage: '/roofing-materials',
    pillarTitle: 'Complete Guide to Roofing Materials',
    clusterTopics: [
      { keyword: 'asphalt shingles', url: '/roofing-materials/asphalt-shingles', title: 'Asphalt Shingles Guide' },
      { keyword: 'metal roofing', url: '/roofing-materials/metal-roofing', title: 'Metal Roofing Guide' },
      { keyword: 'metal vs shingles', url: '/compare/metal-vs-shingles', title: 'Metal vs Shingles Comparison' },
    ],
  },
  {
    pillarPage: '/roof-estimate',
    pillarTitle: 'Get Your Free Roof Estimate',
    clusterTopics: [
      { keyword: 'roof cost calculator', url: '/roof-cost-calculator', title: 'Roof Cost Calculator' },
      { keyword: 'storm damage', url: '/services/storm-damage', title: 'Storm Damage Services' },
    ],
  },
];

/**
 * Get cluster links for a given page URL
 */
export function getClusterLinks(currentUrl: string): TopicCluster | null {
  // Check if current page is a pillar page
  const asPillar = topicClusters.find((c) => c.pillarPage === currentUrl);
  if (asPillar) return asPillar;

  // Check if current page is a cluster topic
  for (const cluster of topicClusters) {
    const isClusterTopic = cluster.clusterTopics.some((t) => t.url === currentUrl);
    if (isClusterTopic) return cluster;
  }

  return null;
}

// ============================================================
// SEO UTILITIES
// ============================================================

/**
 * Generate internal link suggestions for content editors
 */
export function suggestInternalLinks(content: string): string[] {
  const suggestions: string[] = [];
  const contentLower = content.toLowerCase();

  const allKeywords = [
    ...serviceKeywords,
    ...materialKeywords,
    ...comparisonKeywords,
  ];

  for (const kw of allKeywords) {
    for (const keyword of kw.keywords) {
      if (contentLower.includes(keyword.toLowerCase())) {
        suggestions.push(`Consider linking "${keyword}" to ${kw.url}`);
      }
    }
  }

  return [...new Set(suggestions)]; // Remove duplicates
}

/**
 * Extract keywords from content for SEO analysis
 */
export function extractSEOKeywords(content: string): string[] {
  const contentLower = content.toLowerCase();
  const foundKeywords: string[] = [];

  const allKeywords = [
    ...serviceKeywords,
    ...materialKeywords,
    ...comparisonKeywords,
  ];

  for (const kw of allKeywords) {
    for (const keyword of kw.keywords) {
      if (contentLower.includes(keyword.toLowerCase())) {
        foundKeywords.push(keyword);
      }
    }
  }

  return [...new Set(foundKeywords)];
}
