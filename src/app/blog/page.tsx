import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { fetchBlogPosts } from '@/lib/blog';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Roofing Tips & Guides | Expert Advice for Homeowners',
  description: 'Expert roofing tips, guides, and advice to help you make informed decisions about roof replacement, repairs, and maintenance. Learn about costs, materials, and more.',
  keywords: [
    'roofing tips',
    'roof replacement guide',
    'roofing advice',
    'roof maintenance',
    'roofing materials comparison',
    'roof repair vs replacement',
    'how to choose a roofer',
    'roof cost guide',
  ],
  openGraph: {
    title: 'Roofing Tips & Guides | Expert Advice for Homeowners',
    description: 'Expert roofing tips and guides to help you make informed decisions about your roof.',
    type: 'website',
    url: 'https://instantroofestimate.ai/blog',
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  const breadcrumbs = [
    { name: 'Home', url: 'https://instantroofestimate.ai' },
    { name: 'Blog', url: 'https://instantroofestimate.ai/blog' },
  ];

  // Blog structured data
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Instant Roof Estimate Blog',
    description: 'Expert roofing tips, guides, and advice for homeowners',
    url: 'https://instantroofestimate.ai/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Instant Roof Estimate',
      url: 'https://instantroofestimate.ai',
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      url: `https://instantroofestimate.ai/blog/${post.slug}`,
      image: post.featuredImage,
    })),
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-4">
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
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <BookOpen className="w-6 h-6" />
                <span className="text-blue-200 font-medium">Roofing Blog</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Expert Roofing Tips & Guides
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Everything you need to know about roof replacement, repairs, materials, and costs.
                Make informed decisions for your home.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Get Your Free Estimate
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <main className="py-16">
          <div className="container mx-auto px-4">
            {posts.length === 0 ? (
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white rounded-2xl shadow-lg p-12">
                  <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Blog Coming Soon
                  </h2>
                  <p className="text-slate-600 mb-8">
                    We are working on creating valuable content to help you make informed decisions
                    about your roofing project. Check back soon for expert tips and guides.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Get Your Free Roof Estimate
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {post.featuredImage && (
                      <div className="relative aspect-video">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* CTA Section */}
        <section className="bg-white py-16 border-t border-slate-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ready for Your Free Roof Estimate?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Get an instant, accurate roof replacement estimate using satellite imagery.
              No obligation, takes just 60 seconds.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors text-lg"
            >
              Get Your Free Estimate Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

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
