import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin, DollarSign, Shield, CheckCircle, FileText, AlertTriangle } from 'lucide-react';
import { getStateBySlug, getAllStateSlugs, getCitiesInStateBySlug, StateData } from '@/lib/stateData';
import { formatCurrency } from '@/lib/locations';
import { generateStateFaqs } from '@/lib/stateFaqs';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { FAQSection, FAQSchema } from '@/components/FAQSection';

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params;
  const stateInfo = getStateBySlug(state);

  if (!stateInfo) {
    return { title: 'State Not Found' };
  }

  const title = `Free Roof Estimates in ${stateInfo.name} | ${stateInfo.abbr} Roofing Costs & Contractors`;
  const description = `Get a free instant roof estimate anywhere in ${stateInfo.name}. Average roof replacement costs ${formatCurrency(stateInfo.averageCostRange.low)} - ${formatCurrency(stateInfo.averageCostRange.high)}. Serving ${stateInfo.majorMetros.join(', ')} and more.`;

  return {
    title,
    description,
    keywords: [
      `roof estimate ${stateInfo.name}`,
      `roofing cost ${stateInfo.abbr}`,
      `roof replacement ${stateInfo.name}`,
      `roofing contractor ${stateInfo.name}`,
      `${stateInfo.abbr} roofers`,
      `new roof cost ${stateInfo.name}`,
      ...stateInfo.majorMetros.map(city => `roof estimate ${city} ${stateInfo.abbr}`),
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://getmyroofestimatenow.com/roof-estimate/state/${stateInfo.slug}`,
    },
    alternates: {
      canonical: `https://getmyroofestimatenow.com/roof-estimate/state/${stateInfo.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

function StateServiceSchema({ state }: { state: StateData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Roof Estimate Service in ${state.name}`,
    serviceType: 'Roof Estimation',
    provider: {
      '@type': 'Organization',
      name: 'Get My Roof Estimate Now',
      url: 'https://getmyroofestimatenow.com',
    },
    areaServed: {
      '@type': 'State',
      name: state.name,
      containedInPlace: {
        '@type': 'Country',
        name: 'United States',
      },
    },
    description: `Free instant roof estimates throughout ${state.name}. Get accurate roof replacement costs using satellite imagery.`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free instant roof estimate',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function StatePage({ params }: PageProps) {
  const { state } = await params;
  const stateInfo = getStateBySlug(state);

  if (!stateInfo) {
    notFound();
  }

  const cities = getCitiesInStateBySlug(state);
  const stateFaqs = generateStateFaqs(stateInfo);

  const breadcrumbs = [
    { name: 'Home', url: 'https://getmyroofestimatenow.com' },
    { name: 'Roof Estimates', url: 'https://getmyroofestimatenow.com/roof-estimate' },
    { name: stateInfo.name, url: `https://getmyroofestimatenow.com/roof-estimate/state/${stateInfo.slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <StateServiceSchema state={stateInfo} />
      <FAQSchema faqs={stateFaqs} />

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
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{stateInfo.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 to-blue-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-orange-200" />
                <span className="text-orange-200 font-medium">{stateInfo.name} ({stateInfo.abbr})</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Free Roof Estimates in {stateInfo.name}
              </h1>
              <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Get an instant, accurate roof estimate for your {stateInfo.name} home.
                Serving {stateInfo.majorMetros.slice(0, 3).join(', ')}, and {cities.length}+ cities statewide.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors text-lg"
              >
                Get Your Free Estimate
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* State Stats */}
        <section className="py-8 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-600">{cities.length}+</div>
                <div className="text-sm text-slate-600">Cities Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">{formatCurrency(stateInfo.averageCostRange.low)}</div>
                <div className="text-sm text-slate-600">Starting Cost</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">{formatCurrency(stateInfo.averageCostRange.high)}</div>
                <div className="text-sm text-slate-600">Premium Cost</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">60s</div>
                <div className="text-sm text-slate-600">Instant Results</div>
              </div>
            </div>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                Roof Estimates in {stateInfo.name} Cities
              </h2>
              <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
                Select your city for local pricing, roofing information, and instant estimates.
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/roof-estimate/state/${state}/${city.slug}`}
                    className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-md border border-slate-200 hover:border-orange-300 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                        {city.city}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 transition-colors" />
                    </div>
                    <div className="text-sm text-slate-500">
                      {formatCurrency(city.avgRoofCost.low)} - {formatCurrency(city.avgRoofCost.high)}
                    </div>
                  </Link>
                ))}
              </div>

              {cities.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl">
                  <p className="text-slate-600 mb-4">
                    We're expanding our coverage in {stateInfo.name}.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-500 transition-colors"
                  >
                    Enter Your Address for an Estimate
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* State Climate & Roofing Info */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Roofing in {stateInfo.name}: What You Need to Know
              </h2>

              <div className="prose prose-slate max-w-none mb-12">
                <p className="text-lg text-slate-600 leading-relaxed">
                  {stateInfo.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Roofing Considerations */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{stateInfo.name} Roofing Challenges</h3>
                  </div>
                  <ul className="space-y-3">
                    {stateInfo.roofingConsiderations.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600">
                        <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Popular Materials */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Popular Materials</h3>
                  </div>
                  <ul className="space-y-3">
                    {stateInfo.popularMaterials.map((material, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Licensing & Insurance */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                {stateInfo.name} Roofing Licensing & Insurance
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Contractor Licensing</h3>
                  </div>
                  <p className="text-slate-600">
                    {stateInfo.licensingInfo}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Insurance Considerations</h3>
                  </div>
                  <p className="text-slate-600">
                    {stateInfo.insuranceNotes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-slate">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                About Roof Replacement in {stateInfo.name}
              </h2>
              <p className="text-slate-600 mb-4">
                {stateInfo.name} homeowners face unique roofing challenges due to the state's {stateInfo.climate} climate.
                Understanding local conditions is essential when planning a roof replacement project.
              </p>
              <p className="text-slate-600 mb-4">
                The average roof replacement cost in {stateInfo.name} ranges from {formatCurrency(stateInfo.averageCostRange.low)} for
                basic materials to {formatCurrency(stateInfo.averageCostRange.high)} for premium options. Factors affecting
                your final cost include roof size, pitch, material choice, and local labor rates.
              </p>
              <p className="text-slate-600 mb-4">
                Major metropolitan areas like {stateInfo.majorMetros.join(', ')} have robust networks of licensed roofing
                contractors. Our instant estimate tool works for any address in {stateInfo.name}, providing accurate pricing
                based on satellite measurements of your specific property.
              </p>
              <p className="text-slate-600">
                Whether you're dealing with storm damage, an aging roof, or planning a new construction project,
                getting multiple estimates is important. Start with our free instant estimate to understand your
                potential costs, then connect with local contractors for detailed quotes.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          faqs={stateFaqs}
          title={`${stateInfo.name} Roofing FAQs`}
          description={`Common questions about roof replacement and roofing contractors in ${stateInfo.name}.`}
          bgColor="bg-slate-50"
        />

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-orange-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Your Free {stateInfo.name} Roof Estimate
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Enter your address to receive an instant, accurate estimate for your roof replacement.
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
              <p className="mt-2 text-sm">
                Serving {stateInfo.name} and all 50 states
              </p>
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
