import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, DollarSign, Clock, Shield, Zap, Thermometer, Volume2, Home } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Metal Roofing Guide 2025 | Costs, Pros & Cons, Types | Instant Roof Estimate',
  description: 'Complete metal roofing guide: costs ($8-$16/sq ft), pros and cons, standing seam vs corrugated, lifespan (40-70 years), and whether metal roofing is right for your home.',
  keywords: [
    'metal roofing',
    'metal roof cost',
    'metal roofing pros and cons',
    'standing seam metal roofing',
    'metal roof lifespan',
    'metal roof vs shingles',
    'corrugated metal roofing',
    'metal roof installation',
    'metal roof price per square foot',
    'best metal roofing',
    'residential metal roofing',
    'metal roof colors',
    'metal roof styles',
    'metal roof durability',
    'metal roof energy efficiency',
  ],
  openGraph: {
    title: 'Metal Roofing Guide 2025 | Complete Cost & Buying Guide',
    description: 'Everything you need to know about metal roofing: costs, types, pros and cons, and whether it\'s right for your home.',
    type: 'article',
    url: 'https://instantroofestimate.ai/roofing-materials/metal-roofing',
  },
  alternates: {
    canonical: 'https://instantroofestimate.ai/roofing-materials/metal-roofing',
  },
};

const metalRoofTypes = [
  {
    name: 'Standing Seam',
    priceRange: '$10-$16',
    description: 'Premium option with raised seams that interlock for superior weather protection.',
    lifespan: '50-70 years',
    bestFor: 'Modern homes, high-end installations',
  },
  {
    name: 'Corrugated Metal',
    priceRange: '$5-$10',
    description: 'Classic wavy profile, economical and durable for various applications.',
    lifespan: '40-60 years',
    bestFor: 'Budget-conscious, agricultural, industrial',
  },
  {
    name: 'Metal Shingles',
    priceRange: '$8-$14',
    description: 'Designed to mimic traditional shingles while offering metal durability.',
    lifespan: '40-70 years',
    bestFor: 'Traditional aesthetics with metal benefits',
  },
  {
    name: 'Stone-Coated Steel',
    priceRange: '$9-$15',
    description: 'Steel panels coated with stone granules for enhanced appearance and protection.',
    lifespan: '40-70 years',
    bestFor: 'Hurricane zones, hail-prone areas',
  },
];

const prosAndCons = {
  pros: [
    { title: 'Exceptional Longevity', description: 'Metal roofs last 40-70 years, 2-3x longer than asphalt shingles' },
    { title: 'Energy Efficient', description: 'Reflects solar heat, reducing cooling costs by 10-25%' },
    { title: 'Low Maintenance', description: 'Resistant to rot, insects, and mildew with minimal upkeep required' },
    { title: 'Fire Resistant', description: 'Class A fire rating provides superior fire protection' },
    { title: 'Environmentally Friendly', description: '25-95% recycled content and 100% recyclable at end of life' },
    { title: 'Weather Resistant', description: 'Withstands winds up to 140 mph and sheds snow easily' },
    { title: 'Increases Home Value', description: 'Can increase resale value by 1-6% compared to asphalt' },
  ],
  cons: [
    { title: 'Higher Initial Cost', description: '2-3x more expensive upfront than asphalt shingles' },
    { title: 'Noise Concerns', description: 'Can be louder during rain/hail without proper insulation' },
    { title: 'Denting Potential', description: 'Some metals can dent from large hail or fallen branches' },
    { title: 'Expansion/Contraction', description: 'Metal expands and contracts with temperature changes' },
    { title: 'Installation Complexity', description: 'Requires specialized skills; fewer qualified installers' },
    { title: 'Color Matching', description: 'Difficult to match colors if repairs needed years later' },
  ],
};

const faqs = [
  {
    question: 'How much does a metal roof cost in 2025?',
    answer: 'Metal roofing costs range from $8-$16 per square foot installed, or $12,000-$30,000 for an average home. Standing seam costs more ($10-$16/sq ft) while corrugated metal is more affordable ($5-$10/sq ft). The total cost depends on roof size, pitch, material type, and your location.',
  },
  {
    question: 'How long does a metal roof last?',
    answer: 'Metal roofs typically last 40-70 years with proper installation and maintenance. Standing seam and stone-coated steel can last 50-70 years, while corrugated metal averages 40-60 years. This is 2-3 times longer than traditional asphalt shingles.',
  },
  {
    question: 'Is a metal roof worth it?',
    answer: 'Yes, for most homeowners. While the upfront cost is higher, metal roofs pay for themselves through energy savings (10-25% on cooling), minimal maintenance, insurance discounts (up to 35% in some states), and increased home value. If you plan to stay in your home 10+ years, metal roofing is often the better investment.',
  },
  {
    question: 'Are metal roofs noisy when it rains?',
    answer: 'Modern metal roofs with proper underlayment and insulation are no louder than other roofing types. The noise concern comes from older installations without adequate sound dampening. Quality installation includes solid sheathing and insulation that effectively reduces rain noise.',
  },
  {
    question: 'Can you put a metal roof over shingles?',
    answer: 'Yes, in many cases. Installing metal over existing shingles can save on tear-off costs and disposal fees. However, you should check local building codes, ensure the existing roof is in decent condition, and verify your structure can handle the additional weight. Some warranties may be affected.',
  },
  {
    question: 'Do metal roofs attract lightning?',
    answer: 'No, metal roofs do not attract lightning. While metal conducts electricity, lightning strikes the highest point in an area regardless of material. If lightning does strike, a metal roof actually disperses the energy more safely than other materials and won\'t catch fire.',
  },
  {
    question: 'What types of metal roofing are available?',
    answer: 'Common metal roofing types include: standing seam (premium, concealed fasteners), corrugated metal (economical), metal shingles/tiles (traditional look), stone-coated steel (tile appearance with metal durability). Materials include steel, aluminum (best for coastal areas), copper, and zinc.',
  },
  {
    question: 'How energy efficient are metal roofs?',
    answer: 'Metal roofs reduce cooling costs by 10-25% by reflecting solar heat. Cool metal roofing with reflective coatings can reflect up to 70% of solar energy. In hot climates, homeowners often see significant energy savings. Some utility companies offer rebates for cool roof installations.',
  },
  {
    question: 'Can metal roofs be damaged by hail?',
    answer: 'Metal roofs are highly resistant to hail but not immune. Steel and aluminum roofs can dent from large hailstones. Stone-coated steel offers the best hail protection. Many metal roofs carry Class 4 impact ratings. Cosmetic denting rarely affects performance or causes leaks.',
  },
  {
    question: 'What colors are available for metal roofs?',
    answer: 'Metal roofs come in virtually any color. Popular options include charcoal, gray, bronze, copper, green, blue, and red. PVDF/Kynar coatings resist fading for 30+ years. Cool colors reflect more heat. Stone-coated steel offers natural tile and shake appearances.',
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

function ArticleSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Metal Roofing Guide 2025: Costs, Types, Pros & Cons',
    description: 'Complete guide to metal roofing including costs, types, benefits, drawbacks, and whether it\'s right for your home.',
    author: {
      '@type': 'Organization',
      name: 'Instant Roof Estimate',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Instant Roof Estimate',
      url: 'https://instantroofestimate.ai',
    },
    datePublished: '2025-01-04',
    dateModified: '2025-01-04',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function MetalRoofingPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://instantroofestimate.ai' },
    { name: 'Roofing Materials', url: 'https://instantroofestimate.ai/roofing-materials' },
    { name: 'Metal Roofing', url: 'https://instantroofestimate.ai/roofing-materials/metal-roofing' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema />
      <ArticleSchema />

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
        <section className="bg-gradient-to-br from-zinc-700 to-zinc-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <nav className="flex items-center gap-2 text-zinc-300 text-sm mb-6">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <Link href="/roofing-materials" className="hover:text-white">Roofing Materials</Link>
                <span>/</span>
                <span className="text-white">Metal Roofing</span>
              </nav>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Metal Roofing Guide 2025
              </h1>
              <p className="text-xl md:text-2xl text-zinc-200 mb-8 max-w-2xl">
                Everything you need to know about metal roofing: costs, types, pros and cons, and whether it's right for your home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Get Metal Roof Estimate
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/compare/metal-vs-shingles"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Compare to Shingles
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
                <div className="text-3xl font-bold text-blue-600">$8-$16</div>
                <div className="text-sm text-slate-600">Per Sq Ft Installed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">40-70</div>
                <div className="text-sm text-slate-600">Year Lifespan</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">10-25%</div>
                <div className="text-sm text-slate-600">Energy Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">140 mph</div>
                <div className="text-sm text-slate-600">Wind Resistance</div>
              </div>
            </div>
          </div>
        </section>

        {/* Metal Roof Types */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                Types of Metal Roofing
              </h2>
              <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
                Compare the four main types of metal roofing to find the best option for your home and budget.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {metalRoofTypes.map((type) => (
                  <div key={type.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900">{type.name}</h3>
                      <span className="text-lg font-semibold text-blue-600">{type.priceRange}/sq ft</span>
                    </div>
                    <p className="text-slate-600 mb-4">{type.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Lifespan: <strong className="text-slate-700">{type.lifespan}</strong></span>
                      <span className="text-slate-500">Best for: <strong className="text-slate-700">{type.bestFor}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
                Metal Roofing Pros and Cons
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Pros */}
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

                {/* Cons */}
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

        {/* Cost Breakdown */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                Metal Roof Cost Breakdown
              </h2>
              <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
                Understand what goes into the cost of a metal roof installation.
              </p>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div>
                      <h4 className="font-semibold text-slate-900">Materials</h4>
                      <p className="text-sm text-slate-500">Metal panels, underlayment, fasteners, flashing</p>
                    </div>
                    <span className="text-lg font-bold text-slate-900">40-50%</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div>
                      <h4 className="font-semibold text-slate-900">Labor</h4>
                      <p className="text-sm text-slate-500">Installation by certified professionals</p>
                    </div>
                    <span className="text-lg font-bold text-slate-900">35-45%</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div>
                      <h4 className="font-semibold text-slate-900">Tear-off & Disposal</h4>
                      <p className="text-sm text-slate-500">Removing old roof (if applicable)</p>
                    </div>
                    <span className="text-lg font-bold text-slate-900">5-10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">Permits & Overhead</h4>
                      <p className="text-sm text-slate-500">Building permits, insurance, company overhead</p>
                    </div>
                    <span className="text-lg font-bold text-slate-900">5-10%</span>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-2">Average Total Cost (2,000 sq ft roof)</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-600">$16,000 - $32,000</span>
                    <span className="text-slate-500">depending on material and location</span>
                  </div>
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
              Get Your Free Metal Roof Estimate
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              See exactly what a metal roof would cost for your home. Instant results using satellite measurements.
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
                <Link href="/compare/metal-vs-shingles" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors group">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 mb-2">Metal vs. Shingles</h3>
                  <p className="text-sm text-slate-600">Compare costs, durability, and value</p>
                </Link>
                <Link href="/roofing-materials/asphalt-shingles" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors group">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 mb-2">Asphalt Shingles Guide</h3>
                  <p className="text-sm text-slate-600">The most popular roofing option</p>
                </Link>
                <Link href="/roof-cost-calculator" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors group">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 mb-2">Cost Calculator</h3>
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
              <Link href="/" className="hover:text-white transition-colors">
                Get Free Estimate
              </Link>
              <Link href="/roof-estimate" className="hover:text-white transition-colors">
                All Locations
              </Link>
              <Link href="/roof-cost-calculator" className="hover:text-white transition-colors">
                Cost Calculator
              </Link>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
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
