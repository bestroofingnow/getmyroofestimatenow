import { BlogPost } from '@/types/blog';
import { getStaticBlogPosts } from './staticBlogPosts';

// Parse RSS feed from GoHighLevel or any RSS source
export async function fetchBlogPostsFromRSS(rssUrl: string): Promise<BlogPost[]> {
  try {
    const response = await fetch(rssUrl, { next: { revalidate: 3600 } }); // Cache for 1 hour
    const xml = await response.text();

    // Simple RSS parsing
    const posts: BlogPost[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const itemXml = match[1];

      const getTagContent = (tag: string): string => {
        const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i');
        const tagMatch = itemXml.match(regex);
        return tagMatch ? tagMatch[1].trim() : '';
      };

      const title = getTagContent('title');
      const link = getTagContent('link');
      const description = getTagContent('description');
      const content = getTagContent('content:encoded') || getTagContent('content') || description;
      const pubDate = getTagContent('pubDate');
      const creator = getTagContent('dc:creator') || getTagContent('author') || 'Get My Roof Estimate Now';

      // Extract featured image from content or media:content
      const imageMatch = itemXml.match(/<media:content[^>]*url="([^"]+)"/i) ||
                        itemXml.match(/<enclosure[^>]*url="([^"]+)"/i) ||
                        content.match(/<img[^>]*src="([^"]+)"/i);

      // Generate slug from link or title
      const slug = link.split('/').filter(Boolean).pop() ||
                   title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

      if (title) {
        posts.push({
          id: slug,
          title: decodeHTMLEntities(title),
          slug,
          excerpt: decodeHTMLEntities(stripHtml(description).slice(0, 200) + '...'),
          content: content,
          featuredImage: imageMatch ? imageMatch[1] : undefined,
          author: decodeHTMLEntities(creator),
          publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        });
      }
    }

    return posts;
  } catch (error) {
    console.error('Error fetching blog RSS:', error);
    return [];
  }
}

// Fetch from GoHighLevel API (if using their blog API)
export async function fetchBlogPostsFromGHL(): Promise<BlogPost[]> {
  const apiUrl = process.env.GHL_BLOG_API_URL;
  const apiKey = process.env.GHL_API_KEY;

  if (!apiUrl) {
    console.warn('GHL_BLOG_API_URL not configured');
    return [];
  }

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(apiUrl, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GHL API error: ${response.status}`);
    }

    const data = await response.json();

    // Map GHL response to our BlogPost format
    // Adjust this mapping based on actual GHL API response structure
    return (data.blogs || data.posts || data).map((post: Record<string, unknown>) => ({
      id: String(post.id || post._id),
      title: String(post.title || ''),
      slug: String(post.slug || post.id || post._id),
      excerpt: String(post.excerpt || post.description || '').slice(0, 200),
      content: String(post.content || post.body || ''),
      featuredImage: String(post.featuredImage || post.image || post.thumbnail || ''),
      author: String(post.author || 'Get My Roof Estimate Now'),
      publishedAt: String(post.publishedAt || post.createdAt || new Date().toISOString()),
      updatedAt: post.updatedAt ? String(post.updatedAt) : undefined,
      categories: Array.isArray(post.categories) ? post.categories.map(String) : [],
      tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
    }));
  } catch (error) {
    console.error('Error fetching from GHL API:', error);
    return [];
  }
}

// Main function to fetch blog posts - combines static posts with API/RSS posts
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  // Start with static pillar posts
  const staticPosts = getStaticBlogPosts();

  // Try GHL API
  let externalPosts = await fetchBlogPostsFromGHL();

  // Fall back to RSS if API returns nothing
  if (externalPosts.length === 0 && process.env.GHL_BLOG_RSS_URL) {
    externalPosts = await fetchBlogPostsFromRSS(process.env.GHL_BLOG_RSS_URL);
  }

  // Combine static and external posts, avoiding duplicates by slug
  const staticSlugs = new Set(staticPosts.map(p => p.slug));
  const uniqueExternalPosts = externalPosts.filter(p => !staticSlugs.has(p.slug));

  const allPosts = [...staticPosts, ...uniqueExternalPosts];

  // Sort by date, newest first
  return allPosts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// Get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const allPosts = await fetchBlogPosts();
  return allPosts.find(post => post.slug === slug) || null;
}

// Helper to strip HTML tags
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// Helper to decode HTML entities
function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
  };

  return text.replace(/&[^;]+;/g, (entity) => entities[entity] || entity);
}
