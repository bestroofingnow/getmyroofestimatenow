import { NextResponse } from 'next/server';
import { fetchBlogPosts } from '@/lib/blog';

const BASE_URL = 'https://instantroofestimate.ai';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function generateSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (entry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function GET() {
  const blogEntries: SitemapEntry[] = [];

  // Blog index page
  blogEntries.push({
    url: `${BASE_URL}/blog`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '0.8',
  });

  // Fetch blog posts from CMS
  try {
    const posts = await fetchBlogPosts();
    posts.forEach((post) => {
      blogEntries.push({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastmod: new Date(post.updatedAt || post.publishedAt).toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.6',
      });
    });
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Add static blog topic pages (if any)
  const blogTopics = [
    'roof-maintenance',
    'roof-repair-tips',
    'roofing-costs',
    'storm-damage',
    'energy-efficiency',
    'choosing-materials',
  ];

  blogTopics.forEach((topic) => {
    blogEntries.push({
      url: `${BASE_URL}/blog/category/${topic}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.5',
    });
  });

  const xml = generateSitemapXml(blogEntries);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800', // 30 min cache for blog
    },
  });
}
