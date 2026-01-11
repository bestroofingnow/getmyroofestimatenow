import { NextResponse } from 'next/server';
import { getUniqueZipCodes } from '@/lib/zipCodeData';

const BASE_URL = 'https://getmyroofestimatenow.com';
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
  const zipCodeEntries: SitemapEntry[] = [];

  // Zip code pages - hyper-local SEO
  getUniqueZipCodes().forEach((zipData) => {
    zipCodeEntries.push({
      url: `${BASE_URL}/roof-estimate/zip/${zipData.zipCode}`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.65',
    });
  });

  const xml = generateSitemapXml(zipCodeEntries);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
