import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, ArrowRight, Home, ExternalLink } from 'lucide-react';
import { fetchBlogPosts } from '@/lib/blog';
import { BreadcrumbSchema, ArticleSchema } from '@/components/StructuredData';
import {
  processContentWithLinks,
  getRelatedContent,
  extractSEOKeywords,
  RelatedContent,
} from '@/lib/internalLinking';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await fetchBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  // Extract keywords for meta tags
  const keywords = extractSEOKeywords(post.content);

  return {
    title: post.title,
    description: post.excerpt,
    keywords: keywords.length > 0 ? keywords : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://getmyroofestimatenow.com/blog/${post.slug}`,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await fetchBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Related Content Component
function RelatedContentSection({ items }: { items: RelatedContent[] }) {
  if (items.length === 0) return null;

  const getTypeIcon = (type: RelatedContent['type']) => {
    switch (type) {
      case 'service':
        return '🛠️';
      case 'material':
        return '🏠';
      case 'location':
        return '📍';
      case 'comparison':
        return '⚖️';
      default:
        return '📄';
    }
  };

  const getTypeLabel = (type: RelatedContent['type']) => {
    switch (type) {
      case 'service':
        return 'Service';
      case 'material':
        return 'Material Guide';
      case 'location':
        return 'Local Info';
      case 'comparison':
        return 'Comparison';
      default:
        return 'Related';
    }
  };

  return (
    <aside className="bg-slate-100 rounded-2xl p-6 mb-8" aria-labelledby="related-content-heading">
      <h2 id="related-content-heading" className="text-lg font-bold text-slate-900 mb-4">
        Related Resources
      </h2>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all group"
          >
            <span className="text-2xl" aria-hidden="true">{getTypeIcon(item.type)}</span>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
                {getTypeLabel(item.type)}
              </span>
              <p className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {item.title}
              </p>
              <p className="text-sm text-slate-600 truncate">{item.description}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 flex-shrink-0 mt-1" />
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = await fetchBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Process content with internal links
  const processedContent = processContentWithLinks(post.content, {
    maxLinksPerKeyword: 1,
    maxTotalLinks: 8,
    excludeInHeadings: true,
    excludeInLinks: true,
  });

  // Get related content suggestions
  const relatedContent = getRelatedContent(post.content, 4);

  // Extract keywords for structured data
  const extractedKeywords = extractSEOKeywords(post.content);

  // Find next and previous posts
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  const breadcrumbs = [
    { name: 'Home', url: 'https://getmyroofestimatenow.com' },
    { name: 'Blog', url: 'https://getmyroofestimatenow.com/blog' },
    { name: post.title, url: `https://getmyroofestimatenow.com/blog/${post.slug}` },
  ];

  const postUrl = `https://getmyroofestimatenow.com/blog/${post.slug}`;

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        content={post.content}
        url={postUrl}
        image={post.featuredImage}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        author={post.author}
        keywords={extractedKeywords}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header role="banner" className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
                <Image
                  src="/logo.png"
                  alt=""
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                <span className="font-bold text-xl text-slate-900">Get My Roof Estimate Now</span>
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back to Blog
              </Link>
            </div>
          </div>
        </header>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center gap-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-emerald-600 flex items-center gap-1">
                  <Home className="w-4 h-4" aria-hidden="true" />
                  Home
                </Link>
              </li>
              <li className="text-slate-400" aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-emerald-600">
                  Blog
                </Link>
              </li>
              <li className="text-slate-400" aria-hidden="true">/</li>
              <li className="text-slate-900 font-medium truncate max-w-[200px]" aria-current="page">
                {post.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* Article */}
        <main id="main-content" role="main">
          <article className="py-12" itemScope itemType="https://schema.org/Article">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                {/* Article Header */}
                <header className="mb-8">
                  {/* Speakable headline for voice search */}
                  <h1
                    className="speakable-headline text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight"
                    itemProp="headline"
                  >
                    {post.title}
                  </h1>

                  {/* Article summary for AEO */}
                  <p className="article-summary speakable-summary text-xl text-slate-600 mb-6">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-slate-600">
                    <span className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <User className="w-5 h-5" aria-hidden="true" />
                      <span itemProp="name">{post.author}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" aria-hidden="true" />
                      <time itemProp="datePublished" dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                    </span>
                  </div>
                </header>

                {/* Featured Image */}
                {post.featuredImage && (
                  <figure className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-lg">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                      itemProp="image"
                    />
                  </figure>
                )}

                {/* Related Content - Above article */}
                {relatedContent.length > 0 && (
                  <RelatedContentSection items={relatedContent} />
                )}

                {/* Article Content with Auto-Links */}
                <div
                  className="prose prose-lg prose-slate max-w-none mb-12
                    prose-headings:font-bold prose-headings:text-slate-900
                    prose-p:text-slate-700 prose-p:leading-relaxed
                    prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-slate-900
                    prose-ul:text-slate-700 prose-ol:text-slate-700
                    prose-li:marker:text-slate-400
                    prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:py-1 prose-blockquote:not-italic
                    prose-img:rounded-xl prose-img:shadow-lg
                    [&_.internal-link]:text-emerald-600 [&_.internal-link]:font-medium"
                  itemProp="articleBody"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />

                {/* Keywords Display for SEO */}
                {extractedKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {extractedKeywords.slice(0, 6).map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Box */}
                <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-8 text-white text-center mb-12">
                  <h2 className="text-2xl font-bold mb-4">
                    Ready to Get Your Free Roof Estimate?
                  </h2>
                  <p className="text-emerald-100 mb-6">
                    Get an instant price using satellite photos. Takes just 60 seconds. 100% free.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    Get Your Free Estimate
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </Link>
                </div>

                {/* Post Navigation */}
                <nav aria-label="Article navigation" className="flex flex-col sm:flex-row gap-4 justify-between">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="flex-1 group bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 transition-colors"
                      rel="prev"
                    >
                      <span className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        Previous Article
                      </span>
                      <span className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {prevPost.title}
                      </span>
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}
                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="flex-1 group bg-white rounded-xl p-6 border border-slate-200 hover:border-emerald-300 transition-colors text-right"
                      rel="next"
                    >
                      <span className="flex items-center justify-end gap-2 text-sm text-slate-500 mb-2">
                        Next Article
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {nextPost.title}
                      </span>
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}
                </nav>
              </div>
            </div>
          </article>
        </main>

        {/* Footer */}
        <footer role="contentinfo" className="bg-slate-900 text-slate-400 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Get My Roof Estimate Now. All rights reserved.</p>
            <nav aria-label="Footer navigation" className="flex justify-center gap-6 mt-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
