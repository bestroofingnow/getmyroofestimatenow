import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Wrench, CloudRain, Search, Shield, Home, AlertTriangle } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { FAQSection, FAQSchema, FAQ } from '@/components/FAQSection';

const servicesFaqs: FAQ[] = [
  {
    question: 'What roofing services do you offer?',
    answer: 'We connect homeowners with licensed contractors for all roofing needs including: complete roof replacement, roof repair, storm and hail damage repair, roof inspections, emergency tarping, gutter installation, and skylight services. Our network covers residential roofing in all materials.',
  },
  {
    question: 'How do I know if I need roof repair or replacement?',
    answer: 'Consider repair if damage is localized, your roof is under 15 years old, and less than 30% of the surface is affected. Choose replacement if damage is widespread, your roof is over 20 years old, you have recurring leaks, or repairs would cost more than 50% of replacement. Our free estimate helps you decide.',
  },
  {
    question: 'What should I do after storm damage to my roof?',
    answer: 'After a storm: 1) Document damage with photos and videos, 2) Make temporary repairs to prevent further damage (tarping), 3) Contact your insurance company within 24-48 hours, 4) Get a professional inspection, 5) Get written estimates before repairs. Avoid permanent repairs until after the insurance adjuster visits.',
  },
  {
    question: 'How much does a roof inspection cost?',
    answer: 'Many roofing contractors offer free roof inspections, especially when evaluating storm damage or providing repair estimates. Professional inspections that include detailed reports and drone footage may cost $150-$400. Our instant estimate provides a free preliminary assessment using satellite imagery.',
  },
  {
    question: 'Do I need a permit for roof repairs?',
    answer: 'Minor repairs typically don\'t require permits, but major repairs and full replacements usually do. Permit requirements vary by location. Reputable contractors handle permit acquisition as part of their service, ensuring work meets local building codes and passes inspection.',
  },
  {
    question: 'How long does roof repair take?',
    answer: 'Simple repairs like patching leaks or replacing a few shingles take a few hours to one day. More extensive repairs may take 2-3 days. Full roof replacement typically takes 1-3 days for average homes. Complex roofs or weather delays can extend timelines.',
  },
  {
    question: 'Will insurance cover my roof repair or replacement?',
    answer: 'Homeowners insurance typically covers roof damage from covered perils like storms, hail, wind, fire, and fallen trees. Normal wear and tear, age-related deterioration, and maintenance issues are usually not covered. Document damage promptly and file claims as soon as possible.',
  },
  {
    question: 'What is emergency roof repair?',
    answer: 'Emergency roof repair includes immediate services to prevent further damage, such as emergency tarping after storm damage, temporary leak repairs, securing loose materials, and board-up services. Many contractors offer 24/7 emergency response for urgent situations.',
  },
  {
    question: 'How do I choose the right roofing contractor?',
    answer: 'Look for: valid state licensing and insurance, positive local reviews and references, manufacturer certifications (GAF, Owens Corning), written warranties on labor and materials, detailed written estimates, and clear communication. Get at least 3 quotes and verify credentials before signing.',
  },
  {
    question: 'What does a roofing warranty cover?',
    answer: 'Roofing warranties typically include two components: manufacturer warranty covering material defects (25-50 years) and contractor workmanship warranty covering installation issues (2-25 years). Premium warranties may cover both. Always get warranty details in writing and understand exclusions.',
  },
];

export const metadata: Metadata = {
  title: 'Roofing Services | Repair, Replacement & Storm Damage | Get My Roof Estimate Now',
  description: 'Professional roofing services: roof repair, replacement, storm damage repair, inspections, and more. Free estimates and insurance claim assistance.',
  keywords: [
    'roofing services',
    'roof repair',
    'roof replacement',
    'storm damage repair',
    'roof inspection',
    'roofing contractor',
    'emergency roof repair',
    'hail damage repair',
    'roof leak repair',
    'residential roofing services',
  ],
  openGraph: {
    title: 'Roofing Services | Complete Solutions for Your Home',
    description: 'Professional roofing services including repair, replacement, and storm damage. Free estimates available.',
    type: 'website',
    url: 'https://getmyroofestimatenow.com/services',
  },
  alternates: {
    canonical: 'https://getmyroofestimatenow.com/services',
  },
};

const services = [
  {
    name: 'Storm & Hail Damage',
    slug: 'storm-damage',
    icon: CloudRain,
    description: 'Fast response for storm-damaged roofs. Free inspections and insurance claim assistance.',
    features: ['Free damage inspection', 'Insurance claim help', '24-48hr response'],
    urgent: true,
  },
  {
    name: 'Roof Repair',
    slug: 'roof-repair',
    icon: Wrench,
    description: 'Fix leaks, damaged shingles, flashing issues, and more. Extend your roof\'s life.',
    features: ['Leak repair', 'Shingle replacement', 'Flashing repair'],
    urgent: false,
  },
  {
    name: 'Roof Inspection',
    slug: 'roof-inspection',
    icon: Search,
    description: 'Comprehensive roof inspections for buyers, sellers, and annual maintenance.',
    features: ['Detailed reports', 'Photo documentation', 'Repair recommendations'],
    urgent: false,
  },
];

export default function ServicesPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://getmyroofestimatenow.com' },
    { name: 'Services', url: 'https://getmyroofestimatenow.com/services' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={servicesFaqs} />

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Get My Roof Estimate Now" width={48} height={48} className="w-12 h-12" />
                <span className="font-bold text-xl text-slate-900">Get My Roof Estimate Now</span>
              </Link>
              <Link href="/" className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                Get Free Estimate
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Roofing Services</h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Professional roofing services for every need. From emergency repairs to full replacements, we connect you with trusted contractors.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-orange-500 transition-colors">
                Get Free Estimate <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Our Services</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all relative">
                    {service.urgent && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Urgent</span>
                    )}
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2">{service.name}</h3>
                    <p className="text-slate-600 mb-4">{service.description}</p>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                          <Shield className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-orange-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          faqs={servicesFaqs}
          title="Roofing Services FAQs"
          description="Common questions about professional roofing services and repairs."
        />

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-orange-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Roofing Help?</h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Get a free estimate for any roofing service. Instant results, no obligation.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors text-lg">
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
              <Link href="/roofing-materials" className="hover:text-white transition-colors">Materials Guide</Link>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
