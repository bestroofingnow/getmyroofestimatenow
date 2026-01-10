/**
 * Blog Automation System
 *
 * Complete automated blog creation using:
 * - Google Search Console for keyword research
 * - Brightdata for competitor analysis
 * - Gemini AI for content generation
 * - Multiple sources for images
 *
 * Usage:
 *
 * // Start a new blog job
 * const job = await startBlogJob('roof replacement cost');
 *
 * // Check job status
 * const status = getJob(job.id);
 *
 * // Publish when ready
 * const post = publishBlogPost(job.id);
 *
 * // Get keyword opportunities
 * const keywords = await getKeywordOpportunities();
 *
 * // Auto-generate multiple blogs
 * const jobs = await autoGenerateFromOpportunities(5);
 */

// Types
export type {
  BlogPost,
  BlogPostMeta,
  BlogCategory,
  BlogAutomationJob,
  SearchConsoleData,
  SearchConsoleKeyword,
  CompetitorAnalysis,
  ContentGenerationRequest,
  GeneratedContent,
  BlogImage,
  BlogAutomationConfig,
} from './types';

// Orchestrator (main entry point)
export {
  startBlogJob,
  getJob,
  getAllJobs,
  publishBlogPost,
  getPublishedBlogs,
  getBlogBySlug,
  deleteJob,
  updateBlogPost,
  getKeywordOpportunities,
  autoGenerateFromOpportunities,
  getSystemStatus,
} from './orchestrator';

// Search Console
export {
  getSearchConsoleData,
  getRoofingKeywordOpportunities,
  isSearchConsoleConfigured,
} from './searchConsole';

// Brightdata
export {
  getSerpAnalysis,
  isBrightdataConfigured,
} from './brightdata';

// Gemini
export {
  generateBlogContent,
  isGeminiConfigured,
  simplifyContent,
  generateImageAlt,
  getInternalLinkingKeywords,
} from './gemini';

// Images
export {
  getImagesForBlog,
  getFeaturedImage,
  getConfiguredImageSources,
  downloadAndSaveImage,
} from './images';
