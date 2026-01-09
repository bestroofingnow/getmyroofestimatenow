import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Shield, Clock, DollarSign, Home, Palette, Award } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Asphalt Shingles Guide 2025 | Costs, Types & Best Brands | Instant Roof Estimate',
  description: 'Complete asphalt shingles guide: costs ($3-$7/sq ft), architectural vs 3-tab, top brands (GAF, Owens Corning, CertainTeed), and 20-30 year warranty options.',
  keywords: [
    'asphalt shingles',
    'asphalt shingle cost',
    'architectural shingles',
    '3-tab shingles',
    'best asphalt shingles',
    'asphalt shingle roof',
    'shingle roof cost',
    'GAF shingles',
    'Owens Corning shingles',
    'CertainTeed shingles',
    'dimensional shingles',
    'asphalt roof lifespan',
    'shingle colors',
    'laminated shingles',
    'asphalt roof replacement',
  ],
  openGraph: {
    title: 'Asphalt Shingles Guide 2025 | Complete Cost & Buying Guide',
    description: 'Everything you need to know about asphalt shingles: costs, types, best brands, and how to choose the right option.',
    type: 'article',
    url: 'https://instantroofestimate.ai/roofing-materials/asphalt-shingles',
  },
  alternates: {
    canonical: 'https://instantroofestimate.ai/roofing-materials/asphalt-shingles',
  },
};

const shingleTypes = [
  {
    name: '3-Tab Shingles',
    priceRange: '$3-$5',
    description: 'Basic, single-layer shingles with a flat appearance. Most economical option.',
    lifespan: '15-20 years',
    warranty: '20-25 years',
    bestFor: 'Budget renovations, rental properties',
  },
  {
    name: 'Architectural Shingles',
    priceRange: '$4-$7',
    description: 'Multi-layer dimensional shingles with enhanced depth and texture. Most popular choice.',
    lifespan: '25-30 years',
    warranty: '30-50 years',
    bestFor: 'Most homeowners, best value',
  },
  {
    name: 'Designer/Premium Shingles',
    priceRange: '$6-$10',
    description: 'Luxury shingles that mimic slate, cedar, or tile with superior performance.',
    lifespan: '30-50 years',
    warranty: 'Lifetime',
    bestFor: 'High-end homes, curb appeal',
  },
  {
    name: 'Impact-Resistant Shingles',
    priceRange: '$5-$8',
    description: 'Class 4 rated shingles designed to withstand hail and storm damage.',
    lifespan: '25-30 years',
    warranty: '30-50 years',
    bestFor: 'Hail-prone areas, insurance discounts',
  },
];

const topBrands = [
  {
    name: 'GAF',
    description: 'North America\'s largest roofing manufacturer. Known for Timberline series.',
    warranty: 'Lifetime limited warranty with Golden Pledge option',
    popular: 'Timberline HDZ, Timberline NS',
  },
  {
    name: 'Owens Corning',
    description: 'Premium shingles with TruDefinition color technology.',
    warranty: 'Lifetime limited warranty with Platinum Protection',
    popular: 'Duration, TruDefinition Duration',
  },
  {
    name: 'CertainTeed',
    description: 'Wide range of styles and colors with excellent warranties.',
    warranty: 'Lifetime limited with SureStart Plus',
    popular: 'Landmark, Landmark Pro',
  },
  {
    name: 'Tamko',
    description: 'Value-oriented brand with solid performance.',
    warranty: 'Limited lifetime warranty',
    popular: 'Heritage, Elite Glass-Seal',
  },
];

const prosAndCons = {
  pros: [
    { title: 'Affordable', description: 'Lowest upfront cost of any roofing material at $3-$7/sq ft' },
    { title: 'Easy Installation', description: 'Widely available contractors; faster installation time' },
    { title: 'Variety of Styles', description: 'Hundreds of colors and styles to match any home' },
    { title: 'Easy Repairs', description: 'Individual shingles can be replaced without full re-roof' },
    { title: 'Proven Performance', description: 'Decades of proven track record in all climates' },
    { title: 'Good Warranties', description: 'Manufacturer warranties up to lifetime available' },
  ],
  cons: [
    { title: 'Shorter Lifespan', description: 'Lasts 15-30 years vs 40-70 for metal or tile' },
    { title: 'Weather Vulnerability', description: 'Can be damaged by hail, high winds, and UV exposure' },
    { title: 'Not Eco-Friendly', description: 'Petroleum-based and less recyclable than alternatives' },
    { title: 'Heat Absorption', description: 'Dark colors absorb heat, increasing cooling costs' },
    { title: 'Algae Growth', description: 'Can develop black streaks in humid climates' },
  ],
};

const faqs = [
  {
    question: 'How much do asphalt shingles cost in 2025?',
    answer: 'Asphalt shingles cost $3-$7 per square foot installed, or $6,000-$15,000 for an average home. 3-tab shingles are cheapest ($3-$5/sq ft), architectural shingles are mid-range ($4-$7/sq ft), and designer shingles are premium ($6-$10/sq ft). Total cost depends on roof size, pitch, and your location.',
  },
  {
    question: 'How long do asphalt shingles last?',
    answer: '3-tab shingles typically last 15-20 years, while architectural shingles last 25-30 years. Designer and premium shingles can last 30-50 years with proper maintenance. Climate, ventilation, and installation quality significantly impact actual lifespan.',
  },
  {
    question: 'What\'s the difference between 3-tab and architectural shingles?',
    answer: '3-tab shingles are single-layer, flat, and less expensive ($3-$5/sq ft). Architectural (dimensional) shingles have multiple layers, creating a 3D textured appearance, better durability, and longer warranties ($4-$7/sq ft). Most homeowners choose architectural for the better value.',
  },
  {
    question: 'Which asphalt shingle brand is best?',
    answer: 'GAF, Owens Corning, and CertainTeed are the top three brands, each offering excellent quality. GAF Timberline HDZ is the most popular shingle in America. Owens Corning Duration offers superior color technology. CertainTeed Landmark provides excellent value. All three offer lifetime warranties.',
  },
  {
    question: 'Are architectural shingles worth the extra cost?',
    answer: 'Yes, for most homeowners. Architectural shingles cost about $1-$2 more per square foot but last 10+ years longer, look better, come with longer warranties, and often qualify for insurance credits. The extra investment typically pays for itself.',
  },
  {
    question: 'Can you put new shingles over old ones?',
    answer: 'Yes, in many cases. Installing over existing shingles (called a "re-roof") saves tear-off costs. However, most areas only allow one layer over the original, the existing roof must be in decent condition, and it may void some warranties. Full tear-off is recommended for best results.',
  },
  {
    question: 'What color asphalt shingles should I choose?',
    answer: 'Choose colors that complement your home\'s exterior. Darker shingles (charcoal, black) hide stains and suit cooler climates. Lighter colors (tan, gray) reflect heat and are better for hot regions. Blend colors work well with most homes. Consider your neighborhood and HOA requirements.',
  },
  {
    question: 'How do I prevent algae and moss on shingles?',
    answer: 'Install algae-resistant shingles containing copper granules. Keep trees trimmed to reduce shade and debris. Clean gutters regularly. Zinc or copper strips at the ridge line release metal ions during rain that inhibit growth. For existing growth, use specialized roof cleaners.',
  },
  {
    question: 'What warranty should I expect with asphalt shingles?',
    answer: 'Premium architectural shingles offer lifetime limited warranties covering manufacturing defects. Look for workmanship coverage (typically 10-25 years) from your contractor. Enhanced warranties like GAF Golden Pledge or Owens Corning Platinum Protection offer additional coverage when installed by certified contractors.',
  },
  {
    question: 'When is the best time to install asphalt shingles?',
    answer: 'Ideal installation temperatures are between 45-85°F. Shingles installed in extreme cold may crack, while extreme heat makes them too pliable. Late spring and early fall are typically best. However, experienced contractors can work year-round with proper techniques.',
  },
];

function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function AsphaltShinglesPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://instantroofestimate.ai' },
    { name: 'Roofing Materials', url: 'https://instantroofestimate.ai/roofing-materials' },
    { name: 'Asphalt Shingles', url: 'https://instantroofestimate.ai/roofing-materials/asphalt-shingles' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema />

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
                href="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Get Free Estimate
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-600 to-amber-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <nav className="flex items-center gap-2 text-amber-200 text-sm mb-6">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <Link href="/roofing-materials" className="hover:text-white">Roofing Materials</Link>
                <span>/</span>
                <span className="text-white">Asphalt Shingles</span>
              </nav>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Asphalt Shingles Guide 2025
              </h1>
              <p className="text-xl md:text-2xl text-amber-100 mb-8 max-w-2xl">
                The most popular roofing choice in America. Learn about types, costs, top brands, and whether shingles are right for your home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-white text-amber-700 font-semibold px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors"
                >
                  Get Shingle Roof Estimate
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/compare/metal-vs-shingles"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Compare to Metal
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-amber-600">$3-$7</div>
                <div className="text-sm text-slate-600">Per Sq Ft Installed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600">15-30</div>
                <div className="text-sm text-slate-600">Year Lifespan</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600">80%</div>
                <div className="text-sm text-slate-600">Market Share</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600">100+</div>
                <div className="text-sm text-slate-600">Color Options</div>
              </div>
            </div>
          </div>
        </section>

        {/* Shingle Types */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                Types of Asphalt Shingles
              </h2>
              <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
                Compare the four main types of asphalt shingles to find the best option for your budget and needs.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {shingleTypes.map((type) => (
                  <div key={type.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900">{type.name}</h3>
                      <span className="text-lg font-semibold text-amber-600">{type.priceRange}/sq ft</span>
                    </div>
                    <p className="text-slate-600 mb-4">{type.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Lifespan:</span>
                        <strong className="text-slate-700">{type.lifespan}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Warranty:</span>
                        <strong className="text-slate-700">{type.warranty}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Best for:</span>
                        <strong className="text-slate-700">{type.bestFor}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Top Brands */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                Top Asphalt Shingle Brands
              </h2>
              <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
                The leading manufacturers trusted by contractors and homeowners nationwide.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {topBrands.map((brand) => (
                  <div key={brand.name} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-8 h-8 text-amber-600" />
                      <h3 className="text-xl font-bold text-slate-900">{brand.name}</h3>
                    </div>
                    <p className="text-slate-600 mb-4">{brand.description}</p>
                    <div className="space-y-2 text-sm">
                      <p><strong className="text-slate-700">Popular Lines:</strong> {brand.popular}</p>
                      <p><strong className="text-slate-700">Warranty:</strong> {brand.warranty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
                Asphalt Shingles Pros and Cons
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Advantages
                  </h3>
                  <ul className="space-y-4">
                    {prosAndCons.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">{pro.title}</strong>
                          <p className="text-slate-600 text-sm">{pro.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                  <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Considerations
                  </h3>
                  <ul className="space-y-4">
                    {prosAndCons.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-red-600 text-xs font-bold">!</span>
                        </div>
                        <div>
                          <strong className="text-slate-900">{con.title}</strong>
                          <p className="text-slate-600 text-sm">{con.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Your Free Shingle Roof Estimate
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              See exactly what a new asphalt shingle roof would cost for your home. Instant results using satellite measurements.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg"
            >
              Get My Free Estimate
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                Related Guides
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/compare/metal-vs-shingles" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-amber-300 transition-colors group">
                  <h3 className="font-semibold text-slate-900 group-hover:text-amber-600 mb-2">Metal vs. Shingles</h3>
                  <p className="text-sm text-slate-600">Compare costs, durability, and value</p>
                </Link>
                <Link href="/roofing-materials/metal-roofing" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-amber-300 transition-colors group">
                  <h3 className="font-semibold text-slate-900 group-hover:text-amber-600 mb-2">Metal Roofing Guide</h3>
                  <p className="text-sm text-slate-600">Premium alternative to shingles</p>
                </Link>
                <Link href="/roof-cost-calculator" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-amber-300 transition-colors group">
                  <h3 className="font-semibold text-slate-900 group-hover:text-amber-600 mb-2">Cost Calculator</h3>
                  <p className="text-sm text-slate-600">Calculate costs for any material</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <p>&copy; {new Date().getFullYear()} Instant Roof Estimate. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Get Free Estimate</Link>
              <Link href="/roof-estimate" className="hover:text-white transition-colors">All Locations</Link>
              <Link href="/roof-cost-calculator" className="hover:text-white transition-colors">Cost Calculator</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
