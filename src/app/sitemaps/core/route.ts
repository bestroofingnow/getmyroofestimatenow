import { NextResponse } from 'next/server';

const BASE_URL = 'https://instantroofestimate.ai';
const STATIC_LAST_MOD = '2025-01-04';

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
  const corePages: SitemapEntry[] = [
    {
      url: BASE_URL,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      url: `${BASE_URL}/roof-estimate`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      url: `${BASE_URL}/roof-cost-calculator`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      url: `${BASE_URL}/blog`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '0.8',
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'yearly',
      priority: '0.2',
    },
    {
      url: `${BASE_URL}/terms`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'yearly',
      priority: '0.2',
    },
  ];

  const xml = generateSitemapXml(corePages);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
