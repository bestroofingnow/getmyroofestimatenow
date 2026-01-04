import { MetadataRoute } from 'next';
import { fetchBlogPosts } from '@/lib/blog';

// Top cities for roofing services - for location-based SEO pages
const topCities = [
  'houston-tx',
  'dallas-tx',
  'san-antonio-tx',
  'austin-tx',
  'phoenix-az',
  'los-angeles-ca',
  'san-diego-ca',
  'denver-co',
  'miami-fl',
  'tampa-fl',
  'orlando-fl',
  'jacksonville-fl',
  'atlanta-ga',
  'chicago-il',
  'indianapolis-in',
  'kansas-city-mo',
  'las-vegas-nv',
  'charlotte-nc',
  'raleigh-nc',
  'columbus-oh',
  'oklahoma-city-ok',
  'portland-or',
  'philadelphia-pa',
  'nashville-tn',
  'memphis-tn',
  'san-antonio-tx',
  'fort-worth-tx',
  'seattle-wa',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://instantroofestimate.ai';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await fetchBlogPosts();
    blogPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Location pages
  const locationPages: MetadataRoute.Sitemap = topCities.map((city) => ({
    url: `${baseUrl}/roof-estimate/${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...locationPages];
}
