import { NextResponse } from 'next/server';

const BASE_URL = 'https://getmyroofestimatenow.com';

interface ImageEntry {
  pageUrl: string;
  images: {
    loc: string;
    title: string;
    caption?: string;
    geoLocation?: string;
    license?: string;
  }[];
}

function generateImageSitemapXml(entries: ImageEntry[]): string {
  const urls = entries
    .map(
      (entry) => `
  <url>
    <loc>${entry.pageUrl}</loc>${entry.images
        .map(
          (img) => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>${img.caption ? `
      <image:caption>${escapeXml(img.caption)}</image:caption>` : ''}${img.geoLocation ? `
      <image:geo_location>${escapeXml(img.geoLocation)}</image:geo_location>` : ''}
    </image:image>`
        )
        .join('')}
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const imageEntries: ImageEntry[] = [
    // Homepage images
    {
      pageUrl: BASE_URL,
      images: [
        {
          loc: `${BASE_URL}/logo.png`,
          title: 'Get My Roof Estimate Now Logo',
          caption: 'Get instant AI-powered roof estimates for your home',
        },
        {
          loc: `${BASE_URL}/hero-roof.jpg`,
          title: 'Professional Roof Replacement',
          caption: 'Expert roofing contractors providing quality roof replacement services',
        },
      ],
    },
    // Roofing Materials page images
    {
      pageUrl: `${BASE_URL}/roofing-materials`,
      images: [
        {
          loc: `${BASE_URL}/images/asphalt-shingles.jpg`,
          title: 'Asphalt Shingle Roof',
          caption: 'Popular asphalt shingle roofing options for residential homes',
        },
        {
          loc: `${BASE_URL}/images/metal-roofing.jpg`,
          title: 'Standing Seam Metal Roof',
          caption: 'Durable metal roofing with 50+ year lifespan',
        },
        {
          loc: `${BASE_URL}/images/tile-roofing.jpg`,
          title: 'Clay Tile Roof',
          caption: 'Beautiful clay tile roofing for Mediterranean-style homes',
        },
        {
          loc: `${BASE_URL}/images/slate-roofing.jpg`,
          title: 'Natural Slate Roof',
          caption: 'Premium natural slate roofing that lasts over 100 years',
        },
      ],
    },
    // Metal Roofing page
    {
      pageUrl: `${BASE_URL}/roofing-materials/metal-roofing`,
      images: [
        {
          loc: `${BASE_URL}/images/standing-seam-metal.jpg`,
          title: 'Standing Seam Metal Roof Installation',
          caption: 'Professional standing seam metal roof installation',
        },
        {
          loc: `${BASE_URL}/images/metal-roof-colors.jpg`,
          title: 'Metal Roofing Color Options',
          caption: 'Wide variety of metal roofing colors and finishes',
        },
      ],
    },
    // Asphalt Shingles page
    {
      pageUrl: `${BASE_URL}/roofing-materials/asphalt-shingles`,
      images: [
        {
          loc: `${BASE_URL}/images/architectural-shingles.jpg`,
          title: 'Architectural Asphalt Shingles',
          caption: 'Dimensional architectural shingles with enhanced curb appeal',
        },
        {
          loc: `${BASE_URL}/images/3-tab-shingles.jpg`,
          title: '3-Tab Asphalt Shingles',
          caption: 'Affordable 3-tab asphalt shingle roofing option',
        },
      ],
    },
    // Storm Damage page
    {
      pageUrl: `${BASE_URL}/services/storm-damage`,
      images: [
        {
          loc: `${BASE_URL}/images/hail-damage-roof.jpg`,
          title: 'Hail Damaged Roof',
          caption: 'Roof damage caused by severe hail storm',
        },
        {
          loc: `${BASE_URL}/images/wind-damage-shingles.jpg`,
          title: 'Wind Damaged Shingles',
          caption: 'Missing and lifted shingles from high winds',
        },
        {
          loc: `${BASE_URL}/images/roof-inspection.jpg`,
          title: 'Professional Roof Inspection',
          caption: 'Certified inspector evaluating storm damage to roof',
        },
      ],
    },
    // Comparison page
    {
      pageUrl: `${BASE_URL}/compare/metal-vs-shingles`,
      images: [
        {
          loc: `${BASE_URL}/images/metal-vs-shingles-comparison.jpg`,
          title: 'Metal Roof vs Asphalt Shingles Comparison',
          caption: 'Side by side comparison of metal roofing and asphalt shingles',
        },
      ],
    },
  ];

  const xml = generateImageSitemapXml(imageEntries);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 hour cache
    },
  });
}
