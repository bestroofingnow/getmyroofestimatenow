import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin, DollarSign, Sun, Shield, Clock, CheckCircle } from 'lucide-react';
import { getLocationBySlug, getAllLocationSlugs, formatCurrency, LocationData, getNearbyCities, locations } from '@/lib/locations';
import { getNeighborhoodsByCity } from '@/lib/neighborhoods';
import { getStateSlugByAbbr, stateData } from '@/lib/stateData';
import { generateLocationFaqs } from '@/lib/locationFaqs';
import { generateLocationContent } from '@/lib/locationContent';
import { getCityExtendedData } from '@/lib/cityData';
import { getCountyByCitySlug } from '@/lib/countyData';
import { BreadcrumbSchema, LocalBusinessSchema } from '@/components/StructuredData';
import { LocalVoiceSearchSchema, QuickAnswerSchema } from '@/components/VoiceSearchSchema';
import { LocationAddressForm } from '@/components/LocationAddressForm';
import { LocationFAQSection, LocationFAQSchema } from '@/components/LocationFAQSection';
import { LocationContentDisplay } from '@/components/LocationContentSection';
import { NearbyCities } from '@/components/NearbyCities';

interface PageProps {
  params: Promise<{ state: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    return { title: 'Location Not Found' };
  }

  const stateSlug = getStateSlugByAbbr(location.stateAbbr);
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
      url: `https://getmyroofestimatenow.com/roof-estimate/state/${stateSlug}/${location.slug}`,
    },
    alternates: {
      canonical: `https://getmyroofestimatenow.com/roof-estimate/state/${stateSlug}/${location.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const params: { state: string; city: string }[] = [];

  locations.forEach((location) => {
    const stateSlug = getStateSlugByAbbr(location.stateAbbr);
    if (stateSlug) {
      params.push({
        state: stateSlug,
        city: location.slug,
      });
    }
  });

  return params;
}

function LocationServiceSchema({ location, stateSlug }: { location: LocationData; stateSlug: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Roof Estimate Service in ${location.city}, ${location.stateAbbr}`,
    serviceType: 'Roof Estimation',
    provider: {
      '@type': 'Organization',
      name: 'Get My Roof Estimate Now',
      url: 'https://getmyroofestimatenow.com',
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
    url: `https://getmyroofestimatenow.com/roof-estimate/state/${stateSlug}/${location.slug}`,
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
  const { state: stateParam, city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    notFound();
  }

  // Verify the state matches
  const stateSlug = getStateSlugByAbbr(location.stateAbbr);
  if (!stateSlug || stateSlug !== stateParam) {
    notFound();
  }

  // Get county data for internal linking
  const countyData = getCountyByCitySlug(location.slug);

  const breadcrumbs = [
    { name: 'Home', url: 'https://getmyroofestimatenow.com' },
    { name: 'Roof Estimates', url: 'https://getmyroofestimatenow.com/roof-estimate' },
    { name: location.state, url: `https://getmyroofestimatenow.com/roof-estimate/state/${stateSlug}` },
    { name: `${location.city}, ${location.stateAbbr}`, url: `https://getmyroofestimatenow.com/roof-estimate/state/${stateSlug}/${location.slug}` },
  ];

  // Generate location-specific FAQs
  const locationFaqs = generateLocationFaqs(location);

  // Get extended city data and generate content sections
  const extendedData = getCityExtendedData(location.slug);
  const contentSections = generateLocationContent(location, extendedData);

  // Get nearby cities for internal linking
  const nearbyCities = getNearbyCities(location.slug, 6);

  // Get neighborhoods for this city (if any exist)
  const cityNeighborhoods = getNeighborhoodsByCity(location.slug);

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <LocalBusinessSchema />
      <LocationServiceSchema location={location} stateSlug={stateSlug} />
      <LocationFAQSchema faqs={locationFaqs} />
      {/* Voice Search & AI Optimization Schemas */}
      <LocalVoiceSearchSchema
        city={location.city}
        state={location.state}
        stateAbbr={location.stateAbbr}
        serviceName="Roof Estimation Services"
        description={`Get free instant roof estimates in ${location.city}, ${location.stateAbbr}. Average roof replacement costs ${formatCurrency(location.avgRoofCost.low)} to ${formatCurrency(location.avgRoofCost.high)}.`}
        priceRange={{ min: location.avgRoofCost.low, max: location.avgRoofCost.high }}
        url={`https://getmyroofestimatenow.com/roof-estimate/state/${stateSlug}/${location.slug}`}
      />
      <QuickAnswerSchema
        question={`How much does a roof replacement cost in ${location.city}, ${location.stateAbbr}?`}
        answer={`A roof replacement in ${location.city}, ${location.stateAbbr} typically costs between ${formatCurrency(location.avgRoofCost.low)} and ${formatCurrency(location.avgRoofCost.high)}, with the most popular option around ${formatCurrency(location.avgRoofCost.mid)}. Costs vary based on roof size, materials, and complexity. Get a free instant estimate at GetMyRoofEstimateNow.com.`}
        speakableAnswer={`In ${location.city}, a roof replacement typically costs ${formatCurrency(location.avgRoofCost.low)} to ${formatCurrency(location.avgRoofCost.high)}. The average is around ${formatCurrency(location.avgRoofCost.mid)}.`}
        sourceUrl={`https://getmyroofestimatenow.com/roof-estimate/state/${stateSlug}/${location.slug}`}
        topic="Roof Replacement Cost"
      />

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
                <span className="text-sm font-medium">{location.city}, {location.stateAbbr}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-emerald-200" />
                <span className="text-emerald-200 font-medium">{location.city}, {location.state}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Free Roof Estimate in {location.city}, {location.stateAbbr}
              </h1>
              <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-2xl">
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
                <div className="bg-emerald-600 rounded-2xl p-6 text-center text-white transform scale-105 shadow-xl">
                  <div className="text-sm font-medium text-emerald-200 mb-2">Most Popular</div>
                  <div className="text-3xl font-bold mb-2">
                    {formatCurrency(location.avgRoofCost.mid)}
                  </div>
                  <div className="text-sm text-emerald-100">Architectural shingles, quality materials</div>
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
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Sun className="w-6 h-6 text-emerald-600" />
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
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-emerald-600" />
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

        {/* In-Depth Content Sections */}
        <LocationContentDisplay
          sections={contentSections}
          cityName={location.city}
        />

        {/* FAQ Section */}
        <LocationFAQSection
          faqs={locationFaqs}
          cityName={location.city}
          stateAbbr={location.stateAbbr}
        />

        {/* County Link Section */}
        {countyData && (
          <section className="py-12 bg-emerald-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-slate-600 mb-4">
                  {location.city} is located in {countyData.name}, North Carolina
                </p>
                <Link
                  href={`/roof-estimate/county/${countyData.slug}`}
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  View all of {countyData.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Nearby Cities Section */}
        {nearbyCities.length > 0 && (
          <NearbyCities
            cities={nearbyCities}
            currentCity={location.city}
            currentState={location.state}
          />
        )}

        {/* Neighborhoods Section */}
        {cityNeighborhoods.length > 0 && (
          <section className="py-16 bg-white border-t border-slate-200">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    {location.city} Neighborhoods We Serve
                  </h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Get hyper-local roof estimates for your specific {location.city} neighborhood
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {cityNeighborhoods.map((neighborhood) => (
                    <Link
                      key={neighborhood.slug}
                      href={`/roof-estimate/state/${stateSlug}/${location.slug}/${neighborhood.slug}`}
                      className="flex items-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-colors group border border-slate-200 hover:border-emerald-300"
                    >
                      <MapPin className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 flex-shrink-0" />
                      <span className="font-medium">{neighborhood.name}</span>
                      <ArrowRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-emerald-500" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Free Roof Estimate?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of {location.city} homeowners who have used our instant roof estimate tool.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors text-lg"
            >
              Get Your Free Estimate Now
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
                Serving {location.city}, {location.stateAbbr} and the {location.region} region
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="/" className="hover:text-white transition-colors">
                Get Free Estimate
              </Link>
              <Link href="/roof-estimate" className="hover:text-white transition-colors">
                All Locations
              </Link>
              <Link href={`/roof-estimate/state/${stateSlug}`} className="hover:text-white transition-colors">
                {location.state} Roofing
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
