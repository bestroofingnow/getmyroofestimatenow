import { MetadataRoute } from 'next';

const BASE_URL = 'https://getmyroofestimatenow.com';

// Sitemap Index - points to all category sitemaps
export default function sitemap(): MetadataRoute.Sitemap {
  // Return sitemap index entries
  // Note: Next.js will automatically generate proper sitemap index format
  return [
    {
      url: `${BASE_URL}/sitemaps/core`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sitemaps/locations`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sitemaps/counties`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sitemaps/zipcodes`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sitemaps/services`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sitemaps/materials`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sitemaps/blog`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sitemaps/images`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sitemaps/videos`,
      lastModified: new Date(),
    },
  ];
}
