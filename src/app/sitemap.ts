import { MetadataRoute } from 'next';
import { locations } from '@/lib/locations';
import { stateData } from '@/lib/stateData';
import { fetchBlogPosts } from '@/lib/blog';

const BASE_URL = 'https://instantroofestimate.ai';

// Last modified date for static content (update when content changes)
const STATIC_LAST_MOD = new Date('2025-01-04');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static pages - highest priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/roof-estimate`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/roof-cost-calculator`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: STATIC_LAST_MOD,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  // 2. State pages - high priority for geo-targeting
  const statePages: MetadataRoute.Sitemap = Object.keys(stateData).map((stateSlug) => ({
    url: `${BASE_URL}/roof-estimate/state/${stateSlug}`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 3. City/Location pages - core local SEO pages
  const locationPages: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${BASE_URL}/roof-estimate/${location.slug}`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. Blog posts (from CMS when available)
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await fetchBlogPosts();
    blogPages = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Combine all pages
  return [
    ...staticPages,
    ...statePages,
    ...locationPages,
    ...blogPages,
  ];
}
