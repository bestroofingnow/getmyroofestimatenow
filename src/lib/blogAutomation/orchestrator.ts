/**
 * Blog Automation Orchestrator
 *
 * Coordinates the entire automated blog creation process:
 * 1. Identify keyword opportunities from Search Console
 * 2. Research competitors with Brightdata
 * 3. Generate content with Gemini
 * 4. Source/generate images
 * 5. Create and save blog post
 */

import {
  BlogPost,
  BlogPostMeta,
  BlogCategory,
  BlogAutomationJob,
  ContentGenerationRequest,
  SearchConsoleKeyword,
} from './types';
import {
  getSearchConsoleData,
  getRoofingKeywordOpportunities,
  getMockSearchConsoleData,
  isSearchConsoleConfigured,
} from './searchConsole';
import {
  getSerpAnalysis,
  getMockCompetitorAnalysis,
  isBrightdataConfigured,
} from './brightdata';
import {
  generateBlogContent,
  getMockGeneratedContent,
  getInternalLinkingKeywords,
  isGeminiConfigured,
} from './gemini';
import {
  getImagesForBlog,
  getFeaturedImage,
  getMockImages,
  getConfiguredImageSources,
} from './images';
import { processContentWithLinks } from '../internalLinking';

// ============================================================
// BLOG STORAGE
// ============================================================

// In-memory storage for development
// In production, use a database or file system
const blogJobs: Map<string, BlogAutomationJob> = new Map();
const publishedBlogs: Map<string, BlogPost> = new Map();

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `blog-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generate a URL-friendly slug
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
}

/**
 * Detect category from keyword
 */
function detectCategory(keyword: string): BlogCategory {
  const lower = keyword.toLowerCase();

  if (lower.includes('cost') || lower.includes('price') || lower.includes('how much')) {
    return 'cost-guides';
  }
  if (lower.includes('storm') || lower.includes('hail') || lower.includes('damage')) {
    return 'storm-damage';
  }
  if (lower.includes('metal') || lower.includes('shingle') || lower.includes('tile') || lower.includes('material')) {
    return 'roofing-materials';
  }
  if (lower.includes('repair') || lower.includes('fix') || lower.includes('leak')) {
    return 'roof-repair';
  }
  if (lower.includes('replace') || lower.includes('new roof') || lower.includes('installation')) {
    return 'roof-replacement';
  }
  if (lower.includes('maintain') || lower.includes('clean') || lower.includes('care')) {
    return 'roof-maintenance';
  }

  return 'roof-replacement'; // Default
}

// ============================================================
// ORCHESTRATION FUNCTIONS
// ============================================================

/**
 * Start a new blog automation job
 */
export async function startBlogJob(keyword: string): Promise<BlogAutomationJob> {
  const job: BlogAutomationJob = {
    id: generateId(),
    status: 'pending',
    keyword,
    category: detectCategory(keyword),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  blogJobs.set(job.id, job);

  // Start the automation process asynchronously
  const jobId = job.id;
  processJob(jobId).catch(error => {
    const failedJob = blogJobs.get(jobId);
    if (failedJob) {
      failedJob.status = 'failed';
      failedJob.error = error.message;
      failedJob.updatedAt = new Date().toISOString();
    }
  });

  return job;
}

/**
 * Process a blog automation job
 */
async function processJob(jobId: string): Promise<void> {
  const job = blogJobs.get(jobId);
  if (!job) throw new Error('Job not found');

  try {
    // Step 1: Research phase
    job.status = 'researching';
    job.updatedAt = new Date().toISOString();

    console.log(`[${jobId}] Researching keyword: ${job.keyword}`);

    // Get competitor analysis
    const competitorAnalysis = isBrightdataConfigured()
      ? await getSerpAnalysis(job.keyword)
      : getMockCompetitorAnalysis(job.keyword);

    job.competitorAnalysis = competitorAnalysis;

    // Step 2: Content generation phase
    job.status = 'generating';
    job.updatedAt = new Date().toISOString();

    console.log(`[${jobId}] Generating content...`);

    const contentRequest: ContentGenerationRequest = {
      keyword: job.keyword,
      targetCategory: job.category,
      competitorData: competitorAnalysis,
      internalLinks: getInternalLinkingKeywords(),
      tone: 'friendly',
      readingLevel: 5,
      targetWordCount: 1500,
      includeImages: true,
    };

    const generatedContent = isGeminiConfigured()
      ? await generateBlogContent(contentRequest)
      : getMockGeneratedContent(job.keyword);

    job.generatedContent = generatedContent;

    // Step 3: Get images
    console.log(`[${jobId}] Sourcing images...`);

    const images = getConfiguredImageSources().length > 0
      ? await getImagesForBlog(job.keyword, 3)
      : getMockImages(job.keyword);

    const featuredImage = images[0] || null;

    // Step 4: Process content with internal links
    const processedContent = processContentWithLinks(generatedContent.content, {
      maxLinksPerKeyword: 1,
      maxTotalLinks: 8,
      excludeInHeadings: true,
      excludeInLinks: true,
    });

    // Step 5: Create final blog post
    const slug = generateSlug(generatedContent.title);
    const now = new Date().toISOString();

    const blogPost: BlogPost = {
      slug,
      title: generatedContent.title,
      excerpt: generatedContent.excerpt,
      author: 'Instant Roof Estimate',
      publishedAt: now,
      updatedAt: now,
      featuredImage: featuredImage?.url,
      featuredImageAlt: featuredImage?.alt,
      category: job.category,
      tags: generatedContent.suggestedTags,
      keywords: generatedContent.suggestedKeywords,
      readingTime: generatedContent.estimatedReadingTime,
      status: 'draft',
      content: generatedContent.content,
      htmlContent: processedContent,
    };

    job.finalPost = blogPost;
    job.status = 'reviewing';
    job.updatedAt = new Date().toISOString();

    console.log(`[${jobId}] Blog post ready for review: ${blogPost.title}`);

  } catch (error) {
    job.status = 'failed';
    job.error = error instanceof Error ? error.message : 'Unknown error';
    job.updatedAt = new Date().toISOString();
    console.error(`[${jobId}] Job failed:`, error);
    throw error;
  }
}

/**
 * Get a job by ID
 */
export function getJob(jobId: string): BlogAutomationJob | undefined {
  return blogJobs.get(jobId);
}

/**
 * Get all jobs
 */
export function getAllJobs(): BlogAutomationJob[] {
  return Array.from(blogJobs.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Publish a blog post
 */
export function publishBlogPost(jobId: string): BlogPost | null {
  const job = blogJobs.get(jobId);
  if (!job || !job.finalPost) return null;

  job.finalPost.status = 'published';
  job.finalPost.publishedAt = new Date().toISOString();
  job.status = 'published';
  job.updatedAt = new Date().toISOString();

  publishedBlogs.set(job.finalPost.slug, job.finalPost);

  return job.finalPost;
}

/**
 * Get published blogs
 */
export function getPublishedBlogs(): BlogPost[] {
  return Array.from(publishedBlogs.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get a published blog by slug
 */
export function getBlogBySlug(slug: string): BlogPost | undefined {
  return publishedBlogs.get(slug);
}

/**
 * Delete a job
 */
export function deleteJob(jobId: string): boolean {
  return blogJobs.delete(jobId);
}

/**
 * Update blog post content
 */
export function updateBlogPost(jobId: string, updates: Partial<BlogPost>): BlogPost | null {
  const job = blogJobs.get(jobId);
  if (!job || !job.finalPost) return null;

  Object.assign(job.finalPost, updates);
  job.finalPost.updatedAt = new Date().toISOString();
  job.updatedAt = new Date().toISOString();

  return job.finalPost;
}

// ============================================================
// KEYWORD OPPORTUNITIES
// ============================================================

/**
 * Get keyword opportunities from Search Console
 */
export async function getKeywordOpportunities(): Promise<SearchConsoleKeyword[]> {
  if (isSearchConsoleConfigured()) {
    return getRoofingKeywordOpportunities();
  }

  // Return mock data for development
  const mockData = getMockSearchConsoleData();
  return [...mockData.lowHangingFruit, ...mockData.risingKeywords];
}

/**
 * Auto-generate blogs from top keyword opportunities
 */
export async function autoGenerateFromOpportunities(
  count: number = 3
): Promise<BlogAutomationJob[]> {
  const opportunities = await getKeywordOpportunities();
  const jobs: BlogAutomationJob[] = [];

  for (let i = 0; i < Math.min(count, opportunities.length); i++) {
    const keyword = opportunities[i].keyword;
    const job = await startBlogJob(keyword);
    jobs.push(job);
  }

  return jobs;
}

// ============================================================
// SYSTEM STATUS
// ============================================================

/**
 * Get system configuration status
 */
export function getSystemStatus() {
  return {
    searchConsole: {
      configured: isSearchConsoleConfigured(),
      description: 'Google Search Console API for keyword research',
    },
    brightdata: {
      configured: isBrightdataConfigured(),
      description: 'Brightdata SERP API for competitor analysis',
    },
    gemini: {
      configured: isGeminiConfigured(),
      description: 'Google Gemini API for content generation',
    },
    images: {
      configured: getConfiguredImageSources().length > 0,
      sources: getConfiguredImageSources(),
      description: 'Image sourcing (Unsplash, Pexels, or Gemini)',
    },
    jobCount: blogJobs.size,
    publishedCount: publishedBlogs.size,
  };
}
