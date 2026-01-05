import { NextResponse } from 'next/server';

const BASE_URL = 'https://instantroofestimate.ai';

interface VideoEntry {
  pageUrl: string;
  video: {
    thumbnailLoc: string;
    title: string;
    description: string;
    contentLoc?: string;
    playerLoc?: string;
    duration?: number; // in seconds
    publicationDate?: string;
    familyFriendly?: boolean;
    category?: string;
    tag?: string[];
  };
}

function generateVideoSitemapXml(entries: VideoEntry[]): string {
  const urls = entries
    .map(
      (entry) => `
  <url>
    <loc>${entry.pageUrl}</loc>
    <video:video>
      <video:thumbnail_loc>${entry.video.thumbnailLoc}</video:thumbnail_loc>
      <video:title>${escapeXml(entry.video.title)}</video:title>
      <video:description>${escapeXml(entry.video.description)}</video:description>${entry.video.contentLoc ? `
      <video:content_loc>${entry.video.contentLoc}</video:content_loc>` : ''}${entry.video.playerLoc ? `
      <video:player_loc>${entry.video.playerLoc}</video:player_loc>` : ''}${entry.video.duration ? `
      <video:duration>${entry.video.duration}</video:duration>` : ''}${entry.video.publicationDate ? `
      <video:publication_date>${entry.video.publicationDate}</video:publication_date>` : ''}
      <video:family_friendly>${entry.video.familyFriendly !== false ? 'yes' : 'no'}</video:family_friendly>${entry.video.category ? `
      <video:category>${escapeXml(entry.video.category)}</video:category>` : ''}${entry.video.tag?.map((t) => `
      <video:tag>${escapeXml(t)}</video:tag>`).join('') || ''}
    </video:video>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
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
  // Video content entries - add actual videos as they are created
  const videoEntries: VideoEntry[] = [
    // How to get a roof estimate video
    {
      pageUrl: BASE_URL,
      video: {
        thumbnailLoc: `${BASE_URL}/videos/thumbnails/how-to-get-estimate.jpg`,
        title: 'How to Get an Instant Roof Estimate',
        description: 'Learn how to get a free, instant roof estimate using our AI-powered satellite measurement tool. Get accurate pricing in under 60 seconds.',
        playerLoc: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
        duration: 120,
        publicationDate: '2025-01-01',
        category: 'Home Improvement',
        tag: ['roof estimate', 'roofing', 'home improvement', 'roof cost'],
      },
    },
    // Roof inspection guide
    {
      pageUrl: `${BASE_URL}/services/storm-damage`,
      video: {
        thumbnailLoc: `${BASE_URL}/videos/thumbnails/storm-damage-inspection.jpg`,
        title: 'How to Identify Storm Damage on Your Roof',
        description: 'A comprehensive guide to identifying hail damage, wind damage, and other storm-related roof damage. Learn what to look for and when to call a professional.',
        playerLoc: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
        duration: 300,
        publicationDate: '2025-01-01',
        category: 'Home Improvement',
        tag: ['storm damage', 'roof inspection', 'hail damage', 'wind damage', 'roof repair'],
      },
    },
    // Metal vs Shingles comparison
    {
      pageUrl: `${BASE_URL}/compare/metal-vs-shingles`,
      video: {
        thumbnailLoc: `${BASE_URL}/videos/thumbnails/metal-vs-shingles.jpg`,
        title: 'Metal Roofing vs Asphalt Shingles: Which is Right for You?',
        description: 'Compare the pros and cons of metal roofing versus asphalt shingles. Learn about costs, durability, energy efficiency, and aesthetics to make the best choice for your home.',
        playerLoc: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
        duration: 420,
        publicationDate: '2025-01-01',
        category: 'Home Improvement',
        tag: ['metal roofing', 'asphalt shingles', 'roofing comparison', 'roof replacement'],
      },
    },
    // Roof replacement process
    {
      pageUrl: `${BASE_URL}/roofing-materials`,
      video: {
        thumbnailLoc: `${BASE_URL}/videos/thumbnails/roof-replacement-process.jpg`,
        title: 'Complete Roof Replacement Process Explained',
        description: 'Step-by-step guide to the roof replacement process. Learn what to expect from start to finish, including material selection, installation, and final inspection.',
        playerLoc: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
        duration: 480,
        publicationDate: '2025-01-01',
        category: 'Home Improvement',
        tag: ['roof replacement', 'roofing process', 'new roof', 'roofing installation'],
      },
    },
    // Insurance claim guide
    {
      pageUrl: `${BASE_URL}/services/storm-damage`,
      video: {
        thumbnailLoc: `${BASE_URL}/videos/thumbnails/insurance-claim-guide.jpg`,
        title: 'How to File a Roof Insurance Claim',
        description: 'Expert tips on filing a successful roof insurance claim. Learn about documentation, adjuster meetings, and getting the most from your claim.',
        playerLoc: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
        duration: 360,
        publicationDate: '2025-01-01',
        category: 'Home Improvement',
        tag: ['insurance claim', 'roof damage', 'homeowners insurance', 'storm damage claim'],
      },
    },
  ];

  const xml = generateVideoSitemapXml(videoEntries);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 hour cache
    },
  });
}
