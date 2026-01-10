/**
 * Blog Image Sourcing System
 *
 * Sources images for blog posts from:
 * - Unsplash (free stock photos)
 * - Pexels (free stock photos)
 * - Gemini (AI generated)
 *
 * Setup:
 * - UNSPLASH_ACCESS_KEY for Unsplash API
 * - PEXELS_API_KEY for Pexels API
 * - GEMINI_API_KEY for AI image generation
 */

import { BlogImage } from './types';

// ============================================================
// UNSPLASH INTEGRATION
// ============================================================

const UNSPLASH_API = 'https://api.unsplash.com';

interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  description: string;
  width: number;
  height: number;
  user: {
    name: string;
    links: {
      html: string;
    };
  };
}

/**
 * Search Unsplash for relevant photos
 */
async function searchUnsplash(query: string, count: number = 3): Promise<BlogImage[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    console.log('Unsplash not configured');
    return [];
  }

  const response = await fetch(
    `${UNSPLASH_API}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
    {
      headers: {
        'Authorization': `Client-ID ${accessKey}`,
      },
    }
  );

  if (!response.ok) {
    console.error('Unsplash API error:', await response.text());
    return [];
  }

  const data = await response.json();
  const photos: UnsplashPhoto[] = data.results;

  return photos.map(photo => ({
    url: photo.urls.regular,
    alt: photo.alt_description || photo.description || query,
    caption: `Photo by ${photo.user.name} on Unsplash`,
    source: 'stock' as const,
    width: photo.width,
    height: photo.height,
  }));
}

// ============================================================
// PEXELS INTEGRATION
// ============================================================

const PEXELS_API = 'https://api.pexels.com/v1';

interface PexelsPhoto {
  id: number;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
  };
  alt: string;
  width: number;
  height: number;
  photographer: string;
}

/**
 * Search Pexels for relevant photos
 */
async function searchPexels(query: string, count: number = 3): Promise<BlogImage[]> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    console.log('Pexels not configured');
    return [];
  }

  const response = await fetch(
    `${PEXELS_API}/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
    {
      headers: {
        'Authorization': apiKey,
      },
    }
  );

  if (!response.ok) {
    console.error('Pexels API error:', await response.text());
    return [];
  }

  const data = await response.json();
  const photos: PexelsPhoto[] = data.photos;

  return photos.map(photo => ({
    url: photo.src.large,
    alt: photo.alt || query,
    caption: `Photo by ${photo.photographer} on Pexels`,
    source: 'stock' as const,
    width: photo.width,
    height: photo.height,
  }));
}

// ============================================================
// GEMINI IMAGE GENERATION
// ============================================================

/**
 * Generate image using Gemini's Imagen
 * Note: As of 2025, Gemini's image generation capabilities
 * may require different endpoints or models
 */
async function generateWithGemini(prompt: string): Promise<BlogImage | null> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.log('Gemini not configured for image generation');
    return null;
  }

  // Gemini image generation endpoint
  // This is a placeholder - adjust based on actual Gemini API capabilities
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a professional, photorealistic image for a roofing website: ${prompt}. Style: Clean, modern, high-quality stock photo look. No text overlays.`
            }]
          }],
          generationConfig: {
            responseModalities: ['image', 'text'],
          },
        }),
      }
    );

    if (!response.ok) {
      console.error('Gemini image generation error:', await response.text());
      return null;
    }

    const data = await response.json();

    // Extract image from response
    const imagePart = data.candidates?.[0]?.content?.parts?.find(
      (part: { inlineData?: { data: string; mimeType: string } }) => part.inlineData
    );

    if (imagePart?.inlineData) {
      // Convert base64 to data URL
      const dataUrl = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;

      return {
        url: dataUrl,
        alt: prompt,
        source: 'generated',
        width: 1024,
        height: 576, // 16:9 aspect ratio
      };
    }

    return null;
  } catch (error) {
    console.error('Gemini image generation failed:', error);
    return null;
  }
}

// ============================================================
// IMAGE DOWNLOAD AND OPTIMIZATION
// ============================================================

/**
 * Download image and save to public folder
 * Returns the local path
 */
export async function downloadAndSaveImage(
  imageUrl: string,
  filename: string
): Promise<string> {
  // In a real implementation, you would:
  // 1. Fetch the image
  // 2. Optimize it (resize, compress)
  // 3. Save to public/blog/images/
  // 4. Return the public path

  // For now, return the original URL
  // In production, use sharp or similar for optimization
  return imageUrl;
}

// ============================================================
// MAIN IMAGE SOURCING FUNCTION
// ============================================================

/**
 * Get images for a blog post
 * Tries multiple sources in order of preference
 */
export async function getImagesForBlog(
  keyword: string,
  count: number = 3
): Promise<BlogImage[]> {
  const images: BlogImage[] = [];

  // Build roofing-specific search queries
  const queries = [
    `roof ${keyword}`,
    `roofing ${keyword}`,
    `house roof`,
  ];

  // Try Unsplash first (higher quality photos)
  for (const query of queries) {
    if (images.length >= count) break;

    const unsplashImages = await searchUnsplash(query, count - images.length);
    images.push(...unsplashImages);
  }

  // Try Pexels if we need more
  if (images.length < count) {
    for (const query of queries) {
      if (images.length >= count) break;

      const pexelsImages = await searchPexels(query, count - images.length);
      images.push(...pexelsImages);
    }
  }

  // Generate with AI if still need more
  if (images.length < count) {
    const aiImage = await generateWithGemini(keyword);
    if (aiImage) {
      images.push(aiImage);
    }
  }

  return images.slice(0, count);
}

/**
 * Get a featured image for a blog post
 */
export async function getFeaturedImage(keyword: string): Promise<BlogImage | null> {
  const images = await getImagesForBlog(keyword, 1);
  return images[0] || null;
}

/**
 * Check which image sources are configured
 */
export function getConfiguredImageSources(): string[] {
  const sources: string[] = [];

  if (process.env.UNSPLASH_ACCESS_KEY) sources.push('unsplash');
  if (process.env.PEXELS_API_KEY) sources.push('pexels');
  if (process.env.GEMINI_API_KEY) sources.push('gemini');

  return sources;
}

/**
 * Mock images for development
 */
export function getMockImages(keyword: string): BlogImage[] {
  return [
    {
      url: '/blog/images/placeholder-roof-1.jpg',
      alt: `${keyword} - Professional roofing example`,
      caption: 'Professional roofing installation',
      source: 'stock',
      width: 1200,
      height: 675,
    },
    {
      url: '/blog/images/placeholder-roof-2.jpg',
      alt: `${keyword} - Before and after comparison`,
      caption: 'Roof transformation',
      source: 'stock',
      width: 1200,
      height: 675,
    },
    {
      url: '/blog/images/placeholder-roof-3.jpg',
      alt: `${keyword} - Cost breakdown infographic`,
      caption: 'Understanding roof costs',
      source: 'stock',
      width: 1200,
      height: 675,
    },
  ];
}
