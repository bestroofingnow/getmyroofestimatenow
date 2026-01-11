import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, AlertTriangle, Shield, Phone, Clock, FileText, CloudRain, Zap } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Storm & Hail Damage Roof Repair Charlotte NC | Free Inspection | Get My Roof Estimate Now',
  description: 'Charlotte NC storm damage roof repair and hail damage assessment. Free inspections in Charlotte, Huntersville, Matthews, Concord & surrounding areas. Insurance claim assistance and 24/7 emergency roof repairs.',
  keywords: [
    'storm damage roof repair Charlotte NC',
    'hail damage roof Charlotte',
    'roof storm damage Charlotte NC',
    'hail damage roof repair Charlotte',
    'roof damage insurance claim NC',
    'emergency roof repair Charlotte',
    'wind damage roof Charlotte NC',
    'storm damage inspection Charlotte',
    'hail damage shingles Charlotte',
    'roof leak after storm Charlotte',
    'Charlotte roof hail damage',
    'Mecklenburg County storm damage',
    'Charlotte metro roof repair',
    'storm damage contractor Charlotte NC',
    'hail damage assessment Charlotte',
    'Huntersville storm damage roof',
    'Matthews hail damage roof',
    'Concord NC storm damage',
    'Fort Mill SC roof repair',
    'Lake Norman storm damage',
  ],
  openGraph: {
    title: 'Storm & Hail Damage Roof Repair | Free Inspection',
    description: 'Expert storm damage roof repair. Free inspections and insurance claim assistance available.',
    type: 'website',
    url: 'https://getmyroofestimatenow.com/services/storm-damage',
  },
  alternates: {
    canonical: 'https://getmyroofestimatenow.com/services/storm-damage',
  },
};

const damageTypes = [
  {
    icon: CloudRain,
    name: 'Hail Damage',
    signs: ['Dented or bruised shingles', 'Granule loss in gutters', 'Cracked or broken shingles', 'Dented vents and flashing'],
    urgency: 'High',
  },
  {
    icon: Zap,
    name: 'Wind Damage',
    signs: ['Missing shingles', 'Lifted or curled shingles', 'Exposed underlayment', 'Debris on roof'],
    urgency: 'High',
  },
  {
    icon: CloudRain,
    name: 'Water Damage',
    signs: ['Water stains on ceiling', 'Mold or mildew growth', 'Sagging roof deck', 'Damaged insulation'],
    urgency: 'Critical',
  },
  {
    icon: AlertTriangle,
    name: 'Structural Damage',
    signs: ['Visible sagging', 'Collapsed sections', 'Fallen trees or branches', 'Major leaks'],
    urgency: 'Emergency',
  },
];

const insuranceSteps = [
  {
    step: 1,
    title: 'Document the Damage',
    description: 'Take photos and videos of all visible damage before making any repairs. Include wide shots and close-ups.',
  },
  {
    step: 2,
    title: 'File Your Claim Promptly',
    description: 'Contact your insurance company within 24-48 hours. Most policies have time limits for filing claims.',
  },
  {
    step: 3,
    title: 'Get a Professional Inspection',
    description: 'Have a licensed roofing contractor inspect and document all damage. This supports your claim.',
  },
  {
    step: 4,
    title: 'Meet with the Adjuster',
    description: 'Be present when the insurance adjuster inspects. Have your contractor\'s report ready.',
  },
  {
    step: 5,
    title: 'Review Your Settlement',
    description: 'Compare the adjuster\'s findings with your contractor\'s assessment. You can negotiate or appeal.',
  },
  {
    step: 6,
    title: 'Complete Repairs',
    description: 'Use a licensed, insured contractor. Keep all receipts and documentation for your records.',
  },
];

const faqs = [
  {
    question: 'How do I know if my roof has storm damage?',
    answer: 'Look for missing, cracked, or curled shingles; dents in metal components; granules in gutters; and leaks or water stains inside. Hail damage often shows as dark spots or bruises on shingles. When in doubt, get a free professional inspection - damage isn\'t always visible from the ground.',
  },
  {
    question: 'Should I file an insurance claim for roof damage?',
    answer: 'Yes, if damage exceeds your deductible. Most homeowner policies cover storm, hail, and wind damage. File promptly (within 24-48 hours if possible) and document everything. Even if you\'re unsure about damage extent, an inspection helps determine if a claim is worthwhile.',
  },
  {
    question: 'How long do I have to file a roof damage claim?',
    answer: 'Time limits vary by policy and state - typically 1-2 years from the damage date. However, waiting can cause additional damage and weaken your claim. File as soon as possible after discovering storm damage. Some insurers may deny claims for old damage.',
  },
  {
    question: 'Will my insurance cover a full roof replacement?',
    answer: 'If storm damage is extensive enough, yes. Insurance covers the cost to restore your roof to pre-damage condition. If damage is widespread or affects the roof\'s integrity, full replacement may be approved. The adjuster and your contractor\'s assessments determine coverage.',
  },
  {
    question: 'How much does storm damage roof repair cost?',
    answer: 'Minor repairs cost $200-$500, moderate damage runs $1,000-$3,000, and severe damage requiring replacement costs $8,000-$25,000+. If covered by insurance, you typically only pay your deductible ($500-$2,500 for most policies).',
  },
  {
    question: 'Can I repair storm damage myself?',
    answer: 'For safety and insurance reasons, professional repair is recommended. DIY repairs can void warranties, lead to improper fixes that worsen damage, and may not be covered if problems persist. Insurance companies also prefer documented professional repairs.',
  },
  {
    question: 'What size hail causes roof damage?',
    answer: 'Hail as small as 1 inch (quarter-sized) can damage asphalt shingles. Golf ball-sized hail (1.75 inches) typically causes significant damage. Larger hail can crack tiles, dent metal, and even penetrate roofing materials. Impact-resistant (Class 4) shingles withstand larger hailstones.',
  },
  {
    question: 'How long does storm damage repair take?',
    answer: 'Emergency tarping is typically same-day or next-day. Minor repairs take 1-2 days. Major repairs or partial replacement may take 3-5 days. Full roof replacement after storm damage typically takes 1-3 days once materials arrive. Insurance approval can add time to the process.',
  },
  {
    question: 'What should I do while waiting for insurance adjuster?',
    answer: 'Document all damage with photos and videos before any repairs. Make temporary repairs only to prevent further damage (tarping, boarding). Save damaged materials for the adjuster to examine. Keep all receipts for emergency repairs. Do not sign contracts until after the adjuster\'s assessment.',
  },
  {
    question: 'Can I choose my own contractor for insurance repairs?',
    answer: 'Yes, you have the right to choose your own licensed contractor regardless of what the insurance company suggests. Many insurance companies have preferred contractor programs, but participation is voluntary. Choose a contractor with storm damage experience and insurance claim expertise.',
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

function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Storm & Hail Damage Roof Repair',
    provider: {
      '@type': 'Organization',
      name: 'Get My Roof Estimate Now',
    },
    description: 'Professional storm damage assessment, hail damage repair, and insurance claim assistance for residential roofing.',
    areaServed: 'United States',
    serviceType: 'Roof Repair',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function StormDamagePage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://getmyroofestimatenow.com' },
    { name: 'Services', url: 'https://getmyroofestimatenow.com/services' },
    { name: 'Storm & Hail Damage', url: 'https://getmyroofestimatenow.com/services/storm-damage' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema />
      <ServiceSchema />

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
                className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Get Free Estimate
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-full px-4 py-2 mb-6">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-200">Free Storm Damage Inspections</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Storm & Hail Damage Roof Repair
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl">
                Fast response for storm-damaged roofs. Free inspections, insurance claim assistance, and expert repairs when you need them most.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Get Free Damage Assessment
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/roof-estimate"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Find Local Contractor
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
                <div className="text-3xl font-bold text-orange-600">Free</div>
                <div className="text-sm text-slate-600">Damage Inspections</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">24-48hr</div>
                <div className="text-sm text-slate-600">Response Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-slate-600">Claim Assistance</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">Licensed</div>
                <div className="text-sm text-slate-600">& Insured</div>
              </div>
            </div>
          </div>
        </section>

        {/* Charlotte Metro Storm Info */}
        <section className="py-12 bg-gradient-to-r from-orange-50 to-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                Storm Damage Roof Repair in Charlotte & Surrounding Areas
              </h2>
              <p className="text-slate-600 text-center mb-6">
                The Charlotte metro area experiences <strong>40+ hail events</strong> and <strong>over 100 severe weather warnings</strong> annually.
                From April through September, severe thunderstorms bring damaging hail, high winds, and heavy rain that can cause significant roof damage.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-red-600">40+</div>
                  <div className="text-sm text-slate-600">Hail Events Per Year</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-orange-600">Apr-Sep</div>
                  <div className="text-sm text-slate-600">Peak Storm Season</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-orange-600">151+</div>
                  <div className="text-sm text-slate-600">Hail Radar Detections</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
                <span className="text-slate-500">Serving:</span>
                <Link href="/roof-estimate/state/north-carolina/charlotte" className="text-orange-600 hover:underline">Charlotte</Link>
                <span className="text-slate-300">•</span>
                <Link href="/roof-estimate/state/north-carolina/huntersville" className="text-orange-600 hover:underline">Huntersville</Link>
                <span className="text-slate-300">•</span>
                <Link href="/roof-estimate/state/north-carolina/matthews" className="text-orange-600 hover:underline">Matthews</Link>
                <span className="text-slate-300">•</span>
                <Link href="/roof-estimate/state/north-carolina/concord" className="text-orange-600 hover:underline">Concord</Link>
                <span className="text-slate-300">•</span>
                <Link href="/roof-estimate/state/south-carolina/fort-mill" className="text-orange-600 hover:underline">Fort Mill</Link>
                <span className="text-slate-300">•</span>
                <Link href="/roof-estimate/state/north-carolina/mooresville" className="text-orange-600 hover:underline">Mooresville</Link>
                <span className="text-slate-300">•</span>
                <Link href="/roof-estimate" className="text-orange-600 hover:underline">All Areas →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Damage Types */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                Types of Storm Damage
              </h2>
              <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
                Identify the signs of storm damage and understand the urgency level for repairs.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {damageTypes.map((type) => (
                  <div key={type.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <type.icon className="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{type.name}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        type.urgency === 'Emergency' ? 'bg-red-100 text-red-700' :
                        type.urgency === 'Critical' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {type.urgency}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Signs to Look For:</h4>
                    <ul className="space-y-2">
                      {type.signs.map((sign, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                          <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Claim Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                Filing a Roof Damage Insurance Claim
              </h2>
              <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
                Follow these steps to maximize your insurance claim and get your roof repaired properly.
              </p>

              <div className="space-y-6">
                {insuranceSteps.map((item) => (
                  <div key={item.step} className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{item.step}</span>
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
                Why Homeowners Trust Us for Storm Damage
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 text-center border border-slate-200">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Fast Response</h3>
                  <p className="text-slate-600 text-sm">24-48 hour response for damage inspections. Emergency tarping available.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center border border-slate-200">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Insurance Experts</h3>
                  <p className="text-slate-600 text-sm">We work directly with insurance adjusters to maximize your claim.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center border border-slate-200">
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Licensed & Insured</h3>
                  <p className="text-slate-600 text-sm">Fully licensed contractors with comprehensive liability coverage.</p>
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
                Storm Damage FAQs
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
        <section className="py-16 bg-gradient-to-br from-orange-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Your Free Storm Damage Inspection
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Don't wait - storm damage can worsen quickly. Get a free professional inspection and repair estimate today.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors text-lg"
            >
              Get My Free Estimate
              <ArrowRight className="w-5 h-5" />
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
