import { NextResponse } from 'next/server';
import { getAllCountySlugs } from '@/lib/countyData';

const BASE_URL = 'https://instantroofestimate.ai';
const STATIC_LAST_MOD = '2025-01-09';

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
  const countyEntries: SitemapEntry[] = [];

  // County pages - important for local SEO
  getAllCountySlugs().forEach((countySlug) => {
    countyEntries.push({
      url: `${BASE_URL}/roof-estimate/county/${countySlug}`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.75',
    });
  });

  const xml = generateSitemapXml(countyEntries);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
