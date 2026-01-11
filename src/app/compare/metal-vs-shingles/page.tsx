import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, X, DollarSign, Clock, Shield, Zap, Thermometer, Volume2, Palette, Recycle } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Metal Roofing vs Asphalt Shingles: 2025 Cost & Comparison Guide',
  description: 'Compare metal roofing vs asphalt shingles: costs, lifespan, pros & cons, and ROI. See which roofing material is best for your home with our detailed comparison.',
  keywords: [
    'metal roof vs shingles',
    'metal roofing vs asphalt shingles',
    'shingles vs metal roof',
    'metal roof vs asphalt',
    'metal vs shingle roof cost',
    'metal roofing vs shingles cost',
    'is metal roofing better than shingles',
    'metal roof or shingles',
    'asphalt shingles vs metal roof',
    'which is better metal or shingle roof',
    'metal roof compared to shingles',
    'shingle roof vs metal roof',
    'metal vs asphalt roof',
    'roofing material comparison',
  ],
  openGraph: {
    title: 'Metal Roofing vs Asphalt Shingles: Complete 2025 Comparison',
    description: 'Detailed comparison of metal roofing and asphalt shingles including costs, lifespan, and which is best for your home.',
    type: 'article',
    url: 'https://getmyroofestimatenow.com/compare/metal-vs-shingles',
  },
  alternates: {
    canonical: 'https://getmyroofestimatenow.com/compare/metal-vs-shingles',
  },
};

const comparisonData = [
  {
    category: 'Upfront Cost',
    icon: DollarSign,
    metal: '$8-$16 per sq ft',
    shingles: '$3-$7 per sq ft',
    metalScore: 3,
    shingleScore: 5,
    winner: 'shingles',
    notes: 'Shingles cost 40-60% less upfront. For a 2,000 sq ft roof: Metal = $16,000-$32,000, Shingles = $6,000-$14,000.',
  },
  {
    category: 'Lifespan',
    icon: Clock,
    metal: '40-70 years',
    shingles: '15-30 years',
    metalScore: 5,
    shingleScore: 3,
    winner: 'metal',
    notes: 'Metal lasts 2-3x longer. You may need 2-3 shingle roofs in the time one metal roof lasts.',
  },
  {
    category: 'Durability',
    icon: Shield,
    metal: 'Excellent',
    shingles: 'Good',
    metalScore: 5,
    shingleScore: 3,
    winner: 'metal',
    notes: 'Metal withstands 140+ mph winds, fire-resistant. Shingles vulnerable to hail, wind, and UV damage.',
  },
  {
    category: 'Energy Efficiency',
    icon: Thermometer,
    metal: '10-25% cooling savings',
    shingles: 'Standard',
    metalScore: 5,
    shingleScore: 3,
    winner: 'metal',
    notes: 'Metal reflects solar heat; shingles absorb it. Significant savings in hot climates.',
  },
  {
    category: 'Maintenance',
    icon: Zap,
    metal: 'Very Low',
    shingles: 'Moderate',
    metalScore: 5,
    shingleScore: 3,
    winner: 'metal',
    notes: 'Metal needs minimal upkeep. Shingles may need repairs, moss removal, and more frequent inspections.',
  },
  {
    category: 'Aesthetics',
    icon: Palette,
    metal: 'Modern, limited styles',
    shingles: '100+ colors & styles',
    metalScore: 3,
    shingleScore: 5,
    winner: 'shingles',
    notes: 'Shingles offer more variety and traditional looks. Metal suits modern or specific architectural styles.',
  },
  {
    category: 'Noise',
    icon: Volume2,
    metal: 'Louder (with poor install)',
    shingles: 'Standard',
    metalScore: 3,
    shingleScore: 4,
    winner: 'shingles',
    notes: 'Metal can be noisier during rain without proper insulation. Modern installs minimize this.',
  },
  {
    category: 'Eco-Friendly',
    icon: Recycle,
    metal: '25-95% recycled, 100% recyclable',
    shingles: 'Limited recyclability',
    metalScore: 5,
    shingleScore: 2,
    winner: 'metal',
    notes: 'Metal is highly sustainable. Millions of tons of shingles go to landfills annually.',
  },
];

const costComparison = {
  metal: {
    initialCost: 24000,
    lifespan: 55,
    maintenance: 100,
    energySavings: 200,
  },
  shingles: {
    initialCost: 10000,
    lifespan: 22,
    maintenance: 300,
    energySavings: 0,
  },
};

const faqs = [
  {
    question: 'Is a metal roof cheaper than shingles in the long run?',
    answer: 'Yes, typically. While metal costs 2-3x more upfront, it lasts 2-3x longer and requires less maintenance. Over 50 years, a metal roof often costs less than replacing asphalt shingles 2-3 times. Add energy savings and potential insurance discounts, and metal usually wins on lifetime cost.',
  },
  {
    question: 'Which roofing material adds more home value?',
    answer: 'Metal roofing typically adds 1-6% to home value vs 1-3% for shingles. Metal\'s durability, longevity, and energy efficiency are attractive to buyers. However, both add value compared to an aging roof.',
  },
  {
    question: 'Should I get a metal roof or shingles?',
    answer: 'Choose metal if: you plan to stay 10+ years, value energy savings, want minimal maintenance, or live in a high-wind/fire area. Choose shingles if: budget is tight, you want more style options, plan to sell soon, or prefer traditional aesthetics.',
  },
  {
    question: 'Can you put a metal roof over existing shingles?',
    answer: 'Yes, often you can. This saves on tear-off costs. However, check local codes, ensure the roof deck is sound, and verify it won\'t void warranties. Most contractors recommend proper tear-off for best results.',
  },
  {
    question: 'Are metal roofs louder than shingles?',
    answer: 'Not with modern installation. Older metal roofs installed directly on rafters could be noisy. Today\'s installations include solid sheathing and underlayment that reduce rain noise to similar levels as shingles.',
  },
  {
    question: 'Which lasts longer in extreme weather?',
    answer: 'Metal outperforms in most extreme conditions. It\'s rated for 140+ mph winds vs ~70-130 for shingles. Metal is also fire-resistant (Class A) while shingles are not. In hail, impact-resistant options of both materials perform similarly.',
  },
  {
    question: 'Which is better for energy efficiency: metal or shingles?',
    answer: 'Metal roofing is significantly more energy efficient. Metal reflects solar heat, reducing cooling costs by 10-25%. Asphalt shingles absorb heat, making your attic hotter. Cool metal roofing and reflective coatings maximize savings in hot climates.',
  },
  {
    question: 'How do maintenance requirements compare?',
    answer: 'Metal roofing requires minimal maintenance - occasional inspections and gutter cleaning. Asphalt shingles need more attention: checking for damaged/missing shingles, moss/algae treatment, and replacing weathered sections. Over time, shingle maintenance costs add up.',
  },
  {
    question: 'Which is more environmentally friendly?',
    answer: 'Metal roofing is more eco-friendly. It\'s 25-95% recycled content and 100% recyclable at end of life. Metal\'s long lifespan means fewer replacements. Asphalt shingles are petroleum-based, rarely recycled, and 20 billion pounds end up in landfills annually in the US.',
  },
  {
    question: 'Do insurance companies prefer metal or shingles?',
    answer: 'Many insurers offer discounts for metal roofing (up to 35%) due to fire resistance and wind ratings. Impact-resistant shingles (Class 4) also qualify for discounts in hail-prone areas. Metal\'s durability typically results in lower premiums. Check with your insurer for specific discounts.',
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

function ComparisonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Metal Roofing vs Asphalt Shingles: Complete 2025 Comparison',
    description: 'Detailed comparison of metal roofing and asphalt shingles including costs, lifespan, durability, and ROI.',
    author: {
      '@type': 'Organization',
      name: 'Get My Roof Estimate Now',
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

export default function MetalVsShinglesPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://getmyroofestimatenow.com' },
    { name: 'Compare', url: 'https://getmyroofestimatenow.com/compare' },
    { name: 'Metal vs Shingles', url: 'https://getmyroofestimatenow.com/compare/metal-vs-shingles' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema />
      <ComparisonSchema />

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
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
              <Link
                href="/"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Get Free Estimate
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <nav className="flex items-center justify-center gap-2 text-emerald-200 text-sm mb-6">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white">Metal vs Shingles</span>
              </nav>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Metal Roofing vs Asphalt Shingles
              </h1>
              <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                The definitive 2025 comparison guide. See costs, durability, ROI, and which roofing material is best for your home.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                Compare Prices for Your Home
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Verdict */}
        <section className="py-8 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-zinc-50 rounded-xl p-6 border-2 border-zinc-300">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Choose Metal Roofing If:</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />You plan to stay 10+ years</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Energy efficiency matters</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />You want minimal maintenance</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />You're in a high-wind/fire area</li>
                  </ul>
                </div>
                <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-300">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Choose Asphalt Shingles If:</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Budget is a top priority</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />You want many style options</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />You may sell in &lt;10 years</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Traditional aesthetics preferred</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                Head-to-Head Comparison
              </h2>
              <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
                How metal and shingles compare across every important factor.
              </p>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-4 bg-slate-100 p-4 border-b border-slate-200">
                  <div className="font-bold text-slate-700">Category</div>
                  <div className="font-bold text-zinc-700 text-center">Metal</div>
                  <div className="font-bold text-amber-700 text-center">Shingles</div>
                  <div className="font-bold text-slate-700 text-center">Winner</div>
                </div>

                {/* Rows */}
                {comparisonData.map((row, i) => (
                  <div key={row.category} className={`grid grid-cols-4 p-4 ${i < comparisonData.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <div className="flex items-center gap-2">
                      <row.icon className="w-5 h-5 text-slate-500" />
                      <span className="font-medium text-slate-900">{row.category}</span>
                    </div>
                    <div className="text-center text-slate-700">{row.metal}</div>
                    <div className="text-center text-slate-700">{row.shingles}</div>
                    <div className="text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        row.winner === 'metal' ? 'bg-zinc-100 text-zinc-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {row.winner === 'metal' ? 'Metal' : 'Shingles'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cost Analysis */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                50-Year Cost Analysis
              </h2>
              <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
                Which really costs more? Let's look at the total cost of ownership over 50 years.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Metal */}
                <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-3 h-3 bg-zinc-500 rounded-full"></div>
                    Metal Roof (50 Years)
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Initial Cost (2,000 sq ft)</span>
                      <span className="font-semibold">$24,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Maintenance (50 yrs @ $100/yr)</span>
                      <span className="font-semibold">$5,000</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Energy Savings (50 yrs @ $200/yr)</span>
                      <span className="font-semibold">-$10,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Replacements Needed</span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="pt-4 border-t border-zinc-300">
                      <div className="flex justify-between text-lg">
                        <span className="font-bold text-slate-900">Total 50-Year Cost</span>
                        <span className="font-bold text-zinc-700">$19,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shingles */}
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    Asphalt Shingles (50 Years)
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Initial Cost (2,000 sq ft)</span>
                      <span className="font-semibold">$10,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Maintenance (50 yrs @ $300/yr)</span>
                      <span className="font-semibold">$15,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Energy Savings</span>
                      <span className="font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Replacements Needed (2x @ $12,000)</span>
                      <span className="font-semibold">$24,000</span>
                    </div>
                    <div className="pt-4 border-t border-amber-300">
                      <div className="flex justify-between text-lg">
                        <span className="font-bold text-slate-900">Total 50-Year Cost</span>
                        <span className="font-bold text-amber-700">$49,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <p className="text-lg font-semibold text-slate-900">
                  Over 50 years, metal roofing can save <span className="text-emerald-600">$30,000</span> compared to asphalt shingles
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  *Based on average costs for a 2,000 sq ft roof. Actual savings vary by location and usage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See What Both Options Cost for Your Home
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Get instant estimates for metal and shingle roofing based on your actual roof size. Compare and decide.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors text-lg"
            >
              Get My Free Comparison
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                Learn More About Each Option
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/roofing-materials/metal-roofing" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors group">
                  <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 mb-2">Metal Roofing Guide</h3>
                  <p className="text-sm text-slate-600">Complete guide to metal roof types, costs, and installation</p>
                </Link>
                <Link href="/roofing-materials/asphalt-shingles" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors group">
                  <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 mb-2">Asphalt Shingles Guide</h3>
                  <p className="text-sm text-slate-600">Everything about shingle types, brands, and costs</p>
                </Link>
                <Link href="/roof-cost-calculator" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors group">
                  <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 mb-2">Cost Calculator</h3>
                  <p className="text-sm text-slate-600">Calculate costs for any roofing material</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <p>&copy; {new Date().getFullYear()} Get My Roof Estimate Now. All rights reserved.</p>
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
