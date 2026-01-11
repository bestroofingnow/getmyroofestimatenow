import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import { fetchBlogPosts } from '@/lib/blog';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { BlogList } from '@/components/BlogList';

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
    url: 'https://getmyroofestimatenow.com/blog',
  },
};

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  const breadcrumbs = [
    { name: 'Home', url: 'https://getmyroofestimatenow.com' },
    { name: 'Blog', url: 'https://getmyroofestimatenow.com/blog' },
  ];

  // Blog structured data
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Get My Roof Estimate Now Blog',
    description: 'Expert roofing tips, guides, and advice for homeowners',
    url: 'https://getmyroofestimatenow.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Get My Roof Estimate Now',
      url: 'https://getmyroofestimatenow.com',
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
      url: `https://getmyroofestimatenow.com/blog/${post.slug}`,
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
                alt="Get My Roof Estimate Now"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <span className="font-bold text-xl text-slate-900">Get My Roof Estimate Now</span>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 to-blue-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <BookOpen className="w-6 h-6" />
                <span className="text-orange-200 font-medium">Roofing Blog</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Expert Roofing Tips & Guides
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Everything you need to know about roof replacement, repairs, materials, and costs.
                Make informed decisions for your home.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors"
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
              <div className="max-w-4xl mx-auto">
                {/* Coming Soon Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center mb-12">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-10 h-10 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Expert Roofing Content Coming Soon
                  </h2>
                  <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                    We&apos;re preparing in-depth guides, cost breakdowns, and expert advice to help
                    homeowners make informed roofing decisions. In the meantime, get your free
                    instant roof estimate.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-orange-500 transition-colors text-lg"
                  >
                    Get Your Free Roof Estimate
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                {/* Topics Preview */}
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
                  Topics We&apos;ll Cover
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Roof Replacement Costs',
                      description: 'Detailed cost breakdowns by material, location, and roof size to help you budget effectively.',
                    },
                    {
                      title: 'Roofing Materials Guide',
                      description: 'Compare asphalt shingles, metal roofing, tile, and more to find the best fit for your home.',
                    },
                    {
                      title: 'Repair vs. Replacement',
                      description: 'Learn when it makes sense to repair your roof and when full replacement is the better investment.',
                    },
                    {
                      title: 'Finding a Contractor',
                      description: 'Tips for vetting roofing contractors, getting quotes, and avoiding common scams.',
                    },
                    {
                      title: 'Insurance Claims',
                      description: 'Navigate the roof insurance claim process and understand what&apos;s covered.',
                    },
                    {
                      title: 'Maintenance Tips',
                      description: 'Extend your roof&apos;s lifespan with proper maintenance and seasonal inspections.',
                    },
                  ].map((topic) => (
                    <div
                      key={topic.title}
                      className="bg-white rounded-xl p-6 border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all"
                    >
                      <h4 className="font-semibold text-slate-900 mb-2">{topic.title}</h4>
                      <p className="text-slate-600 text-sm">{topic.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <BlogList posts={posts} />
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
              className="inline-flex items-center gap-2 bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-orange-500 transition-colors text-lg"
            >
              Get Your Free Estimate Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Get My Roof Estimate Now. All rights reserved.</p>
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
