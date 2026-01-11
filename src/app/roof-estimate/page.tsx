import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Search } from 'lucide-react';
import { locations, formatCurrency } from '@/lib/locations';
import { stateData, stateNameToSlug } from '@/lib/stateData';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Roof Estimates by City | Find Your Location',
  description: 'Get a free instant roof estimate in your city. We serve major cities across the United States with accurate, satellite-based roof measurements and pricing.',
  keywords: [
    'roof estimate by city',
    'local roof estimate',
    'roofing cost by location',
    'roof replacement near me',
    'roofing contractors near me',
    'free roof quote',
  ],
  openGraph: {
    title: 'Roof Estimates by City | Find Your Location',
    description: 'Get a free instant roof estimate in your city. We serve major cities across the United States.',
    type: 'website',
    url: 'https://getmyroofestimatenow.com/roof-estimate',
  },
  alternates: {
    canonical: 'https://getmyroofestimatenow.com/roof-estimate',
  },
};

// Group locations by state
function groupByState() {
  const grouped: Record<string, typeof locations> = {};

  locations.forEach((location) => {
    const state = location.state;
    if (!grouped[state]) {
      grouped[state] = [];
    }
    grouped[state].push(location);
  });

  // Sort states alphabetically
  const sortedStates = Object.keys(grouped).sort();
  const sortedGrouped: Record<string, typeof locations> = {};

  sortedStates.forEach((state) => {
    // Sort cities within each state alphabetically
    sortedGrouped[state] = grouped[state].sort((a, b) => a.city.localeCompare(b.city));
  });

  return sortedGrouped;
}

export default function RoofEstimateHubPage() {
  const locationsByState = groupByState();
  const totalCities = locations.length;
  const totalStates = Object.keys(locationsByState).length;

  const breadcrumbs = [
    { name: 'Home', url: 'https://getmyroofestimatenow.com' },
    { name: 'Roof Estimates', url: 'https://getmyroofestimatenow.com/roof-estimate' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

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
        <section className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-emerald-500/30 rounded-full px-4 py-2 mb-6">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-medium">Serving {totalCities} Cities Across {totalStates} States</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Free Roof Estimates Nationwide
              </h1>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                Find your city below to get local roofing pricing, contractor information, and an instant estimate using satellite imagery.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                <Search className="w-5 h-5" />
                Enter Your Address for Instant Estimate
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-600">{totalCities}+</div>
                <div className="text-sm text-slate-600">Cities Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">{totalStates}</div>
                <div className="text-sm text-slate-600">States Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">60s</div>
                <div className="text-sm text-slate-600">Instant Estimates</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600">100%</div>
                <div className="text-sm text-slate-600">Free Service</div>
              </div>
            </div>
          </div>
        </section>

        {/* Cities by State */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Select Your City
              </h2>

              <div className="space-y-12">
                {Object.entries(locationsByState).map(([state, cities]) => {
                  const stateSlug = stateNameToSlug(state);
                  const hasStatePage = stateSlug in stateData;
                  return (
                  <div key={state} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-emerald-600" />
                        {state}
                        <span className="text-sm font-normal text-slate-500 ml-2">
                          ({cities.length} {cities.length === 1 ? 'city' : 'cities'})
                        </span>
                      </h3>
                      {hasStatePage && (
                        <Link
                          href={`/roof-estimate/state/${stateSlug}`}
                          className="text-sm text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1"
                        >
                          View all {state}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {cities.map((location) => (
                        <Link
                          key={location.slug}
                          href={`/roof-estimate/state/${stateSlug}/${location.slug}`}
                          className="group flex flex-col p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                              {location.city}
                            </span>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                          </div>
                          <div className="text-sm text-slate-500">
                            From {formatCurrency(location.avgRoofCost.low)}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Don't See Your City CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Don't See Your City Listed?
              </h2>
              <p className="text-slate-600 mb-6">
                No problem! Our satellite-based roof estimation works for any address in the United States.
                Enter your address on our homepage to get an instant estimate.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-500 transition-colors"
              >
                Get Your Free Estimate
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Browse by State Section */}
        <section className="py-16 bg-slate-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Browse Roof Estimates by State
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {Object.entries(stateData).map(([slug, state]) => (
                  <Link
                    key={slug}
                    href={`/roof-estimate/state/${slug}`}
                    className="bg-white p-3 rounded-lg text-center hover:bg-emerald-50 hover:text-emerald-600 transition-colors border border-slate-200 hover:border-emerald-300"
                  >
                    <span className="font-medium text-sm">{state.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-slate">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Why Local Roof Estimates Matter
              </h2>
              <p className="text-slate-600 mb-4">
                Roof replacement costs vary significantly based on your location. Factors like local labor rates,
                material availability, climate considerations, and building codes all affect the final price of your
                roofing project. That's why we provide city-specific estimates tailored to your local market.
              </p>
              <p className="text-slate-600 mb-4">
                Our instant roof estimate tool uses satellite imagery to accurately measure your roof's dimensions,
                then applies local pricing data to give you a realistic estimate. Whether you're in a major
                metropolitan area like Houston or Los Angeles, or a growing community like Lake Norman or Fort Mill,
                we have the local data you need.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">
                What Affects Roof Costs by Location?
              </h3>
              <ul className="text-slate-600 space-y-2">
                <li><strong>Climate:</strong> Areas prone to hurricanes, hail, or heavy snow require specialized materials</li>
                <li><strong>Labor costs:</strong> Contractor rates vary based on local cost of living and demand</li>
                <li><strong>Material availability:</strong> Some materials are more common in certain regions</li>
                <li><strong>Building codes:</strong> Local regulations may require specific materials or installation methods</li>
                <li><strong>Market demand:</strong> High-growth areas often see higher prices due to contractor availability</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">
                How Our Estimate Process Works
              </h3>
              <ol className="text-slate-600 space-y-2">
                <li><strong>Enter your address</strong> - We locate your property using Google Maps</li>
                <li><strong>Satellite analysis</strong> - Our technology measures your roof's dimensions and pitch</li>
                <li><strong>Local pricing</strong> - We apply current market rates for your area</li>
                <li><strong>Instant results</strong> - Get your estimate in about 60 seconds</li>
              </ol>
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
              <Link href="/" className="hover:text-white transition-colors">
                Get Free Estimate
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
