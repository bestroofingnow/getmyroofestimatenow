/**
 * Blog System Types
 * Defines all types for the automated blog creation system
 */

// Blog post metadata
export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  category: BlogCategory;
  tags: string[];
  keywords: string[];
  readingTime: number;
  status: 'draft' | 'published' | 'scheduled';
  scheduledFor?: string;
}

// Full blog post with content
export interface BlogPost extends BlogPostMeta {
  content: string;
  htmlContent: string;
}

// Blog categories
export type BlogCategory =
  | 'roof-replacement'
  | 'roof-repair'
  | 'roofing-materials'
  | 'storm-damage'
  | 'roof-maintenance'
  | 'cost-guides'
  | 'local-guides'
  | 'industry-news';

// Google Search Console data
export interface SearchConsoleKeyword {
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SearchConsoleData {
  topKeywords: SearchConsoleKeyword[];
  lowHangingFruit: SearchConsoleKeyword[]; // High impressions, low clicks
  risingKeywords: SearchConsoleKeyword[];
  fetchedAt: string;
}

// Brightdata SERP research
export interface SerpResult {
  title: string;
  url: string;
  description: string;
  position: number;
}

export interface CompetitorAnalysis {
  keyword: string;
  topResults: SerpResult[];
  commonTopics: string[];
  avgWordCount: number;
  commonHeadings: string[];
  relatedQuestions: string[];
  fetchedAt: string;
}

// Gemini content generation
export interface ContentGenerationRequest {
  keyword: string;
  targetCategory: BlogCategory;
  competitorData: CompetitorAnalysis;
  internalLinks: { keyword: string; url: string }[];
  tone: 'professional' | 'friendly' | 'educational';
  readingLevel: number; // Target grade level (5 for 5th grade)
  targetWordCount: number;
  includeImages: boolean;
}

export interface GeneratedContent {
  title: string;
  excerpt: string;
  content: string;
  suggestedTags: string[];
  suggestedKeywords: string[];
  imagePrompts: string[];
  estimatedReadingTime: number;
}

// Image generation/sourcing
export interface BlogImage {
  url: string;
  alt: string;
  caption?: string;
  source: 'generated' | 'stock' | 'custom';
  width: number;
  height: number;
}

// Blog automation job
export interface BlogAutomationJob {
  id: string;
  status: 'pending' | 'researching' | 'generating' | 'reviewing' | 'published' | 'failed';
  keyword: string;
  category: BlogCategory;
  searchConsoleData?: SearchConsoleKeyword;
  competitorAnalysis?: CompetitorAnalysis;
  generatedContent?: GeneratedContent;
  finalPost?: BlogPost;
  createdAt: string;
  updatedAt: string;
  error?: string;
}

// API configuration
export interface BlogAutomationConfig {
  googleSearchConsole: {
    enabled: boolean;
    siteUrl: string;
    credentialsPath: string;
  };
  brightdata: {
    enabled: boolean;
    apiKey: string;
    zone: string;
  };
  gemini: {
    enabled: boolean;
    apiKey: string;
    model: string;
  };
  imageGeneration: {
    enabled: boolean;
    provider: 'gemini' | 'unsplash' | 'pexels';
    apiKey: string;
  };
  defaults: {
    author: string;
    readingLevel: number;
    targetWordCount: number;
    autoPublish: boolean;
  };
}
