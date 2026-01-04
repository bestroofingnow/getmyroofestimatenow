import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin, DollarSign, Sun, Shield, Clock, CheckCircle } from 'lucide-react';
import { getLocationBySlug, getAllLocationSlugs, formatCurrency, LocationData } from '@/lib/locations';
import { BreadcrumbSchema, LocalBusinessSchema } from '@/components/StructuredData';
import { LocationAddressForm } from '@/components/LocationAddressForm';

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    return { title: 'Location Not Found' };
  }

  const title = `Free Roof Estimate ${location.city}, ${location.stateAbbr} | Instant Quote in 60 Seconds`;
  const description = `Get a free, instant roof estimate in ${location.city}, ${location.stateAbbr}. Average roof replacement costs ${formatCurrency(location.avgRoofCost.low)} - ${formatCurrency(location.avgRoofCost.high)}. No obligation, satellite-based measurements.`;

  return {
    title,
    description,
    keywords: [
      `roof estimate ${location.city}`,
      `roofing cost ${location.city} ${location.stateAbbr}`,
      `roof replacement ${location.city}`,
      `roofing contractor ${location.city}`,
      `roof repair ${location.city}`,
      `new roof cost ${location.city}`,
      `roofing quote ${location.city}`,
      `${location.city} roofers`,
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://instantroofestimate.ai/roof-estimate/${location.slug}`,
    },
    alternates: {
      canonical: `https://instantroofestimate.ai/roof-estimate/${location.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return getAllLocationSlugs().map((city) => ({ city }));
}

function LocationServiceSchema({ location }: { location: LocationData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Roof Estimate Service in ${location.city}, ${location.stateAbbr}`,
    serviceType: 'Roof Estimation',
    provider: {
      '@type': 'Organization',
      name: 'Instant Roof Estimate',
      url: 'https://instantroofestimate.ai',
    },
    areaServed: {
      '@type': 'City',
      name: location.city,
      containedInPlace: {
        '@type': 'State',
        name: location.state,
      },
    },
    description: `Free instant roof estimates in ${location.city}, ${location.stateAbbr}. Get accurate roof replacement costs using satellite imagery.`,
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

export default async function LocationPage({ params }: PageProps) {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://instantroofestimate.ai' },
    { name: 'Roof Estimates', url: 'https://instantroofestimate.ai/roof-estimate' },
    { name: `${location.city}, ${location.stateAbbr}`, url: `https://instantroofestimate.ai/roof-estimate/${location.slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <LocalBusinessSchema />
      <LocationServiceSchema location={location} />

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
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{location.city}, {location.stateAbbr}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-blue-200" />
                <span className="text-blue-200 font-medium">{location.city}, {location.state}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Free Roof Estimate in {location.city}, {location.stateAbbr}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl">
                Get an instant, accurate roof replacement estimate for your {location.city} home.
                Using satellite imagery, no appointment needed.
              </p>

              {/* Address Input */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-xl">
                <h2 className="text-slate-900 font-semibold text-lg mb-4">
                  Enter your {location.city} address to get started
                </h2>
                <LocationAddressForm />
              </div>
            </div>
          </div>
        </section>

        {/* Local Pricing Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Roof Replacement Costs in {location.city}
                </h2>
                <p className="text-xl text-slate-600">
                  Average pricing for {location.city}, {location.stateAbbr} based on local market data
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200">
                  <div className="text-sm font-medium text-slate-500 mb-2">Budget</div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    {formatCurrency(location.avgRoofCost.low)}
                  </div>
                  <div className="text-sm text-slate-600">3-tab shingles, basic materials</div>
                </div>
                <div className="bg-blue-600 rounded-2xl p-6 text-center text-white transform scale-105 shadow-xl">
                  <div className="text-sm font-medium text-blue-200 mb-2">Most Popular</div>
                  <div className="text-3xl font-bold mb-2">
                    {formatCurrency(location.avgRoofCost.mid)}
                  </div>
                  <div className="text-sm text-blue-100">Architectural shingles, quality materials</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200">
                  <div className="text-sm font-medium text-slate-500 mb-2">Premium</div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    {formatCurrency(location.avgRoofCost.high)}
                  </div>
                  <div className="text-sm text-slate-600">Designer shingles, premium materials</div>
                </div>
              </div>

              <p className="text-center text-slate-500 text-sm mt-6">
                *Prices are estimates based on a typical {location.city} home. Your actual cost depends on roof size, pitch, and condition.
              </p>
            </div>
          </div>
        </section>

        {/* Local Considerations Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Roofing Considerations for {location.city} Homeowners
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Sun className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Local Climate</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    {location.city} has a {location.climate} climate. {location.seasonalNotes}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Popular Materials</h3>
                  </div>
                  <p className="text-slate-600 mb-2">Top choices for {location.city} homes:</p>
                  <ul className="space-y-2">
                    {location.popularMaterials.map((material) => (
                      <li key={material} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                Why {location.city} Homeowners Choose Us
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">60-Second Estimates</h3>
                  <p className="text-slate-600">
                    Get instant pricing without waiting for an appointment or in-home visit.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">100% Free</h3>
                  <p className="text-slate-600">
                    No cost, no obligation. Just accurate estimates for your {location.city} home.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Local Contractors</h3>
                  <p className="text-slate-600">
                    Connect with licensed {location.city} roofing contractors who know the area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Free Roof Estimate?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of {location.city} homeowners who have used our instant roof estimate tool.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg"
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
            <p className="mt-2 text-sm">
              Serving {location.city}, {location.stateAbbr} and the {location.region} region
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
