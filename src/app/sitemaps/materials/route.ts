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
  const materialPages: SitemapEntry[] = [
    // Main materials hub
    {
      url: `${BASE_URL}/roofing-materials`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.85',
    },
    // Individual material guides
    {
      url: `${BASE_URL}/roofing-materials/asphalt-shingles`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      url: `${BASE_URL}/roofing-materials/metal-roofing`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      url: `${BASE_URL}/roofing-materials/tile-roofing`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      url: `${BASE_URL}/roofing-materials/slate-roofing`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      url: `${BASE_URL}/roofing-materials/cedar-shake`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.75',
    },
    {
      url: `${BASE_URL}/roofing-materials/flat-roofing`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.75',
    },
    {
      url: `${BASE_URL}/roofing-materials/synthetic-roofing`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.75',
    },
    // Comparison pages
    {
      url: `${BASE_URL}/compare/metal-vs-shingles`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      url: `${BASE_URL}/compare/tile-vs-shingles`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.75',
    },
    {
      url: `${BASE_URL}/compare/metal-vs-tile`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.75',
    },
    {
      url: `${BASE_URL}/compare/architectural-vs-3-tab`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.75',
    },
  ];

  const xml = generateSitemapXml(materialPages);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
