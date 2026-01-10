import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Home, ArrowRight, CheckCircle, Clock, Shield, ChevronRight, DollarSign, Building2, Users, Thermometer } from 'lucide-react';
import { ncCounties, getCountyBySlug, getAllCountySlugs, getNearbyCounties, CountyData } from '@/lib/countyData';
import { getStateSlugByAbbr } from '@/lib/stateData';
import { generateCountyFaqs, generateCountyFaqSchema } from '@/lib/countyFaqs';
import { locations } from '@/lib/locations';
import { LocationAddressForm } from '@/components/LocationAddressForm';
import { BreadcrumbSchema } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ county: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { county: countySlug } = await params;
  const countyData = getCountyBySlug(countySlug);

  if (!countyData) {
    return { title: 'County Not Found' };
  }

  const title = `${countyData.name} Roof Estimate | Free Roofing Quotes in ${countyData.name}, NC`;
  const description = `Get instant roof replacement estimates in ${countyData.name}, North Carolina. Free satellite-based quotes for ${countyData.countySeat}, ${countyData.cities.slice(0, 2).map(c => c.replace(/-nc$/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(', ')} and all ${countyData.name} communities. Average costs $${countyData.avgRoofCost.low.toLocaleString()}-$${countyData.avgRoofCost.high.toLocaleString()}.`;

  return {
    title,
    description,
    keywords: [
      `${countyData.name} roof estimate`,
      `${countyData.name} NC roofing cost`,
      `roof replacement ${countyData.name}`,
      `${countyData.countySeat} roofers`,
      `roofing contractors ${countyData.name} NC`,
      `${countyData.name} roof repair`,
      `free roof estimate ${countyData.name}`,
      `${countyData.name} North Carolina roofing`,
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://instantroofestimate.ai/roof-estimate/county/${countySlug}`,
    },
    alternates: {
      canonical: `https://instantroofestimate.ai/roof-estimate/county/${countySlug}`,
    },
  };
}

export async function generateStaticParams() {
  return getAllCountySlugs().map((slug) => ({
    county: slug,
  }));
}

export default async function CountyPage({ params }: PageProps) {
  const { county: countySlug } = await params;
  const countyData = getCountyBySlug(countySlug);

  if (!countyData) {
    notFound();
  }

  // Get cities in this county that have pages
  const countyCities = locations.filter(loc =>
    countyData.cities.includes(loc.slug)
  );

  // Get nearby counties for internal linking
  const nearbyCounties = getNearbyCounties(countySlug).slice(0, 4);

  // Generate FAQs
  const faqs = generateCountyFaqs(countyData);
  const faqSchema = generateCountyFaqSchema(faqs);

  const breadcrumbs = [
    { name: 'Home', url: 'https://instantroofestimate.ai' },
    { name: 'Roof Estimates', url: 'https://instantroofestimate.ai/roof-estimate' },
    { name: 'North Carolina', url: 'https://instantroofestimate.ai/roof-estimate/state/north-carolina' },
    { name: countyData.name, url: `https://instantroofestimate.ai/roof-estimate/county/${countySlug}` },
  ];

  // Service Area Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Roof Estimate Service in ${countyData.name}, NC`,
    description: `Free instant roof replacement estimates for ${countyData.name}, North Carolina homeowners`,
    url: `https://instantroofestimate.ai/roof-estimate/county/${countySlug}`,
    provider: {
      '@type': 'Organization',
      name: 'Instant Roof Estimate',
      url: 'https://instantroofestimate.ai',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: countyData.name,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'NC',
        addressCountry: 'US',
      },
    },
    serviceType: 'Roof Replacement Estimate',
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-blue-200 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/roof-estimate" className="hover:text-white transition-colors">Roof Estimates</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/roof-estimate/state/north-carolina" className="hover:text-white transition-colors">North Carolina</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{countyData.name}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
                  <MapPin className="w-4 h-4" />
                  <span>Serving All of {countyData.name}, NC</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Free Roof Estimates in<br />
                  <span className="text-blue-300">{countyData.name}</span>
                </h1>

                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Get an instant, accurate roof replacement estimate for any address in {countyData.name}, North Carolina.
                  Serving {countyData.countySeat} and {countyData.cities.length} communities county-wide.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-blue-100">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>100% Free</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <Clock className="w-5 h-5 text-green-400" />
                    <span>60-Second Results</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span>No Obligation</span>
                  </div>
                </div>
              </div>

              {/* Address Form */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Get Your {countyData.name} Roof Estimate
                </h2>
                <p className="text-slate-600 mb-6">
                  Enter any address in {countyData.name} County for instant pricing
                </p>
                <LocationAddressForm />
              </div>
            </div>
          </div>
        </section>

        {/* County Stats */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">${countyData.avgRoofCost.mid.toLocaleString()}</div>
                <div className="text-sm text-slate-600">Average Roof Cost</div>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{countyData.population}</div>
                <div className="text-sm text-slate-600">Population</div>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{countyData.cities.length}</div>
                <div className="text-sm text-slate-600">Cities Served</div>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <Thermometer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900 text-base">{countyData.climate.split(' ').slice(0, 2).join(' ')}</div>
                <div className="text-sm text-slate-600">Climate</div>
              </div>
            </div>
          </div>
        </section>

        {/* About County */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Roofing Services in {countyData.name}, NC
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {countyData.description}
                </p>
                <p className="text-slate-600 mb-6">
                  With the county seat in {countyData.countySeat}, {countyData.name} encompasses diverse communities
                  from urban centers to suburban neighborhoods. The {countyData.climate.toLowerCase()} climate presents
                  unique challenges for roofing, making proper material selection essential.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mb-4">Common Roofing Challenges</h3>
                <ul className="space-y-3">
                  {countyData.roofingConsiderations.map((consideration, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{consideration}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Popular Roofing Materials</h3>
                <div className="space-y-4 mb-8">
                  {countyData.popularMaterials.map((material, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                        {index + 1}
                      </div>
                      <span className="text-slate-700 font-medium">{material}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Roof Cost Range in {countyData.name}</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-slate-900">${countyData.avgRoofCost.low.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">Budget</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">${countyData.avgRoofCost.mid.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">Average</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-900">${countyData.avgRoofCost.high.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">Premium</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cities in County */}
        {countyCities.length > 0 && (
          <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Cities We Serve in {countyData.name}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {countyCities.map((city) => {
                  const stateSlug = getStateSlugByAbbr(city.stateAbbr);
                  return (
                    <Link
                      key={city.slug}
                      href={`/roof-estimate/state/${stateSlug}/${city.slug}`}
                      className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-slate-900">{city.city}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
              {countyData.cities.length > countyCities.length && (
                <p className="text-center text-slate-500 mt-6">
                  Plus {countyData.cities.length - countyCities.length} additional communities throughout {countyData.name}
                </p>
              )}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions About Roofing in {countyData.name}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold text-slate-900 pr-4">{faq.question}</h3>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Counties */}
        {nearbyCounties.length > 0 && (
          <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Nearby Counties
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {nearbyCounties.map((county) => (
                  <Link
                    key={county.slug}
                    href={`/roof-estimate/county/${county.slug}`}
                    className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-900">{county.name}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="text-sm text-slate-500 mt-1">County seat: {county.countySeat}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your {countyData.name} Roof Estimate?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get instant pricing for any address in {countyData.name}, NC. Free, fast, and no obligation.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Get Your Free Estimate
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
