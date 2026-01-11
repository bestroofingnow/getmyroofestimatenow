import { NextResponse } from 'next/server';
import { locations } from '@/lib/locations';
import { stateData, getStateSlugByAbbr } from '@/lib/stateData';
import { neighborhoods } from '@/lib/neighborhoods';

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
  const locationEntries: SitemapEntry[] = [];

  // State pages - high priority for geo-targeting
  Object.keys(stateData).forEach((stateSlug) => {
    locationEntries.push({
      url: `${BASE_URL}/roof-estimate/state/${stateSlug}`,
      lastmod: STATIC_LAST_MOD,
      changefreq: 'monthly',
      priority: '0.8',
    });
  });

  // City/Location pages - core local SEO pages
  locations.forEach((location) => {
    const stateSlug = getStateSlugByAbbr(location.stateAbbr);
    if (stateSlug) {
      locationEntries.push({
        url: `${BASE_URL}/roof-estimate/state/${stateSlug}/${location.slug}`,
        lastmod: STATIC_LAST_MOD,
        changefreq: 'monthly',
        priority: '0.7',
      });
    }
  });

  // Neighborhood pages - hyper-local SEO pages
  neighborhoods.forEach((neighborhood) => {
    const stateSlug = getStateSlugByAbbr(neighborhood.stateAbbr);
    if (stateSlug) {
      locationEntries.push({
        url: `${BASE_URL}/roof-estimate/state/${stateSlug}/${neighborhood.citySlug}/${neighborhood.slug}`,
        lastmod: STATIC_LAST_MOD,
        changefreq: 'monthly',
        priority: '0.65',
      });
    }
  });

  const xml = generateSitemapXml(locationEntries);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
