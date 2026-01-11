import { NextResponse } from 'next/server';

const BASE_URL = 'https://getmyroofestimatenow.com';
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
  const servicePages: SitemapEntry[] = [
    {
      url: `${BASE_URL}/services`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.85',
    },
    {
      url: `${BASE_URL}/services/storm-damage`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      url: `${BASE_URL}/services/roof-repair`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      url: `${BASE_URL}/services/roof-inspection`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      url: `${BASE_URL}/services/roof-replacement`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      url: `${BASE_URL}/services/emergency-roof-repair`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.75',
    },
    {
      url: `${BASE_URL}/services/gutter-installation`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.7',
    },
  ];

  const xml = generateSitemapXml(servicePages);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
