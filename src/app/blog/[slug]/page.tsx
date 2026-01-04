import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { fetchBlogPosts } from '@/lib/blog';
import { BreadcrumbSchema } from '@/components/StructuredData';

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

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://instantroofestimate.ai/blog/${post.slug}`,
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = await fetchBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find next and previous posts
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  const breadcrumbs = [
    { name: 'Home', url: 'https://instantroofestimate.ai' },
    { name: 'Blog', url: 'https://instantroofestimate.ai/blog' },
    { name: post.title, url: `https://instantroofestimate.ai/blog/${post.slug}` },
  ];

  // Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Instant Roof Estimate',
      url: 'https://instantroofestimate.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://instantroofestimate.ai/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://instantroofestimate.ai/blog/${post.slug}`,
    },
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Instant Roof Estimate"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                <span className="font-bold text-xl text-slate-900">Instant Roof Estimate</span>
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </div>
        </header>

        {/* Breadcrumb Navigation */}
        <nav className="bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center gap-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </li>
              <li className="text-slate-400">/</li>
              <li>
                <Link href="/blog" className="hover:text-blue-600">
                  Blog
                </Link>
              </li>
              <li className="text-slate-400">/</li>
              <li className="text-slate-900 font-medium truncate max-w-[200px]">
                {post.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* Article */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Article Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-600">
                  <span className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
              </header>

              {/* Featured Image */}
              {post.featuredImage && (
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-lg">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Article Content */}
              <div
                className="prose prose-lg prose-slate max-w-none mb-12
                  prose-headings:font-bold prose-headings:text-slate-900
                  prose-p:text-slate-700 prose-p:leading-relaxed
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-slate-900
                  prose-ul:text-slate-700 prose-ol:text-slate-700
                  prose-li:marker:text-slate-400
                  prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:not-italic
                  prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* CTA Box */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">
                  Ready to Get Your Free Roof Estimate?
                </h2>
                <p className="text-blue-100 mb-6">
                  Get an instant, accurate estimate using satellite imagery. Takes just 60 seconds.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Get Your Free Estimate
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Post Navigation */}
              <nav className="flex flex-col sm:flex-row gap-4 justify-between">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="flex-1 group bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 transition-colors"
                  >
                    <span className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                      <ArrowLeft className="w-4 h-4" />
                      Previous Article
                    </span>
                    <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="flex-1 group bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 transition-colors text-right"
                  >
                    <span className="flex items-center justify-end gap-2 text-sm text-slate-500 mb-2">
                      Next Article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                    <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
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

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Instant Roof Estimate. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
