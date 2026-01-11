import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Clock, DollarSign, Leaf } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { FAQSection, FAQSchema, FAQ } from '@/components/FAQSection';

const materialsFaqs: FAQ[] = [
  {
    question: 'What is the best roofing material for my home?',
    answer: 'The best roofing material depends on your budget, climate, and preferences. Asphalt shingles offer excellent value and work in most climates ($3-$7/sq ft). Metal roofing provides longevity and energy savings ($8-$16/sq ft). Tile and slate offer luxury and extreme durability ($10-$30/sq ft). Consider your local weather conditions and long-term plans.',
  },
  {
    question: 'How much does each roofing material cost?',
    answer: 'Roofing costs per square foot installed: Asphalt shingles: $3-$7, Metal roofing: $8-$16, Tile roofing: $10-$20, Slate roofing: $15-$30. For an average 2,000 sq ft roof, expect: asphalt $6,000-$14,000, metal $16,000-$32,000, tile $20,000-$40,000, slate $30,000-$60,000.',
  },
  {
    question: 'How long does each roofing material last?',
    answer: 'Average lifespan by material: 3-tab asphalt shingles: 15-20 years, architectural shingles: 25-30 years, metal roofing: 40-70 years, tile roofing: 50-100 years, slate roofing: 75-150+ years. Proper installation and maintenance can extend these lifespans significantly.',
  },
  {
    question: 'Which roofing material is most energy efficient?',
    answer: 'Metal roofing is the most energy efficient, reflecting solar heat and reducing cooling costs by 10-25%. "Cool roof" shingles and tiles with reflective coatings also improve efficiency. Light-colored materials perform better in hot climates. Proper attic ventilation and insulation are also essential.',
  },
  {
    question: 'What roofing material is best for hurricanes and high winds?',
    answer: 'Metal roofing offers the best wind resistance, rated for winds up to 140-180 mph. Hurricane-rated asphalt shingles can withstand 110-130 mph winds. Tile roofing performs well when properly secured. Avoid wood shakes in hurricane zones. Look for products that meet your area\'s building codes.',
  },
  {
    question: 'Which roofing materials are fire resistant?',
    answer: 'Class A fire-rated materials include: metal roofing, clay/concrete tiles, slate, and specially treated asphalt shingles. Wood shakes have the lowest fire resistance unless chemically treated. Fire-resistant roofing may be required in WUI (wildland-urban interface) zones.',
  },
  {
    question: 'Can I install new roofing over old shingles?',
    answer: 'In many cases, yes for asphalt-to-asphalt overlays (one layer only). This saves tear-off costs. However, it\'s not recommended for: more than one existing layer, damaged decking, or when switching to heavier materials. Full tear-off allows proper deck inspection and typically provides better results.',
  },
  {
    question: 'Which roofing material requires the least maintenance?',
    answer: 'Metal roofing requires the least maintenance - just occasional inspections and gutter cleaning. Slate and tile also need minimal care but require careful walking. Asphalt shingles need regular inspections for damage and moss/algae treatment. Wood shakes require the most maintenance.',
  },
  {
    question: 'What roofing material is best for resale value?',
    answer: 'Metal roofing typically provides the best ROI, adding 1-6% to home value due to its longevity and energy efficiency. High-quality architectural shingles add 1-3%. Slate and tile add significant value to luxury homes. Any new roof adds value compared to an aging roof.',
  },
  {
    question: 'How do I choose between roofing materials?',
    answer: 'Consider: 1) Budget - upfront cost vs. lifetime value, 2) Climate - rain, snow, heat, or hurricanes, 3) Aesthetics - traditional vs. modern look, 4) Longevity - how long you\'ll stay in the home, 5) Maintenance - time and cost for upkeep, 6) HOA rules - some communities restrict materials. Get our free estimate to compare costs.',
  },
];

export const metadata: Metadata = {
  title: 'Roofing Materials Guide | Compare Types, Costs & Durability',
  description: 'Compare roofing materials: asphalt shingles, metal roofing, tile, and slate. See costs, lifespan, pros & cons to choose the best option for your home.',
  keywords: [
    'roofing materials',
    'types of roofing',
    'roofing material comparison',
    'best roofing materials',
    'roof material types',
    'roofing options',
    'residential roofing materials',
    'roof shingles types',
    'metal vs shingles',
    'roofing material costs',
  ],
  openGraph: {
    title: 'Roofing Materials Guide | Compare All Options',
    description: 'Complete guide to roofing materials. Compare costs, durability, and find the best option for your home.',
    type: 'website',
    url: 'https://getmyroofestimatenow.com/roofing-materials',
  },
  alternates: {
    canonical: 'https://getmyroofestimatenow.com/roofing-materials',
  },
};

const materials = [
  {
    name: 'Asphalt Shingles',
    slug: 'asphalt-shingles',
    cost: '$3-$7/sq ft',
    lifespan: '15-30 years',
    description: 'The most popular roofing choice in America. Affordable, versatile, and available in many styles.',
    color: 'bg-amber-500',
    pros: ['Most affordable', 'Easy installation', '100+ colors'],
  },
  {
    name: 'Metal Roofing',
    slug: 'metal-roofing',
    cost: '$8-$16/sq ft',
    lifespan: '40-70 years',
    description: 'Premium durability with energy efficiency. Standing seam and metal shingles available.',
    color: 'bg-zinc-500',
    pros: ['Longest lifespan', 'Energy efficient', 'Low maintenance'],
  },
  {
    name: 'Tile Roofing',
    slug: 'tile-roofing',
    cost: '$10-$20/sq ft',
    lifespan: '50-100 years',
    description: 'Classic Mediterranean and Spanish style. Clay or concrete options available.',
    color: 'bg-orange-600',
    pros: ['Exceptional durability', 'Fire resistant', 'Classic aesthetics'],
  },
  {
    name: 'Slate Roofing',
    slug: 'slate-roofing',
    cost: '$15-$30/sq ft',
    lifespan: '75-150 years',
    description: 'The ultimate luxury roofing material. Natural stone with unmatched longevity.',
    color: 'bg-slate-600',
    pros: ['Century+ lifespan', 'Natural beauty', 'Highest value'],
  },
];

export default function RoofingMaterialsPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://getmyroofestimatenow.com' },
    { name: 'Roofing Materials', url: 'https://getmyroofestimatenow.com/roofing-materials' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={materialsFaqs} />

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Get My Roof Estimate Now" width={48} height={48} className="w-12 h-12" />
                <span className="font-bold text-xl text-slate-900">Get My Roof Estimate Now</span>
              </Link>
              <Link href="/" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                Get Free Estimate
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Roofing Materials Guide</h1>
              <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                Compare costs, durability, and features of every roofing material to find the perfect option for your home.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors">
                Get Estimate for Any Material <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Materials Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Choose Your Roofing Material</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {materials.map((material) => (
                  <Link key={material.slug} href={`/roofing-materials/${material.slug}`} className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 ${material.color} rounded-xl`}></div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{material.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>{material.cost}</span>
                          <span>•</span>
                          <span>{material.lifespan}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-4">{material.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {material.pros.map((pro) => (
                        <span key={pro} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">{pro}</span>
                      ))}
                    </div>
                    <div className="mt-4 text-emerald-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Link */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Not Sure Which to Choose?</h2>
              <p className="text-slate-600 mb-6">Our detailed comparison guides help you decide between popular options.</p>
              <Link href="/compare/metal-vs-shingles" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-500 transition-colors">
                Compare Metal vs Shingles <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          faqs={materialsFaqs}
          title="Roofing Materials FAQs"
          description="Common questions about choosing the right roofing material for your home."
          bgColor="bg-slate-50"
        />

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare Costs for Your Roof</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Get instant pricing for any roofing material based on your actual roof size.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors text-lg">
              Get My Free Estimate <ArrowRight className="w-5 h-5" />
            </Link>
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
