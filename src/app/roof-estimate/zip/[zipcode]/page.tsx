import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Home, ArrowRight, CheckCircle, Clock, Shield, ChevronRight, DollarSign, Building2, Calendar, Tag } from 'lucide-react';
import { getZipCodeData, getUniqueZipCodes, getZipCodesByCity, ZipCodeData } from '@/lib/zipCodeData';
import { generateZipCodeFaqs, generateZipCodeFaqSchema } from '@/lib/zipCodeFaqs';
import { getCountyBySlug } from '@/lib/countyData';
import { getStateSlugByAbbr } from '@/lib/stateData';
import { locations } from '@/lib/locations';
import { getNeighborhoodsByCity } from '@/lib/neighborhoods';
import { LocationAddressForm } from '@/components/LocationAddressForm';
import { BreadcrumbSchema } from '@/components/StructuredData';

interface PageProps {
  params: Promise<{ zipcode: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { zipcode } = await params;
  const zipData = getZipCodeData(zipcode);

  if (!zipData) {
    return { title: 'Zip Code Not Found' };
  }

  const title = `${zipcode} Roof Estimate | Roofing Costs in ${zipData.cityName}, ${zipData.stateAbbr}`;
  const description = `Get instant roof replacement estimates for ${zipcode} in ${zipData.cityName}, ${zipData.stateAbbr}. Average costs $${zipData.avgRoofCost.low.toLocaleString()}-$${zipData.avgRoofCost.high.toLocaleString()}. ${zipData.roofingNotes}`;

  return {
    title,
    description,
    keywords: [
      `${zipcode} roof estimate`,
      `${zipcode} roofing cost`,
      `roof replacement ${zipcode}`,
      `${zipData.cityName} ${zipcode} roofers`,
      `roofing contractors ${zipcode}`,
      `${zipData.countyName} roofing`,
      `free roof estimate ${zipcode}`,
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://getmyroofestimatenow.com/roof-estimate/zip/${zipcode}`,
    },
    alternates: {
      canonical: `https://getmyroofestimatenow.com/roof-estimate/zip/${zipcode}`,
    },
  };
}

export async function generateStaticParams() {
  return getUniqueZipCodes().map((zip) => ({
    zipcode: zip.zipCode,
  }));
}

export default async function ZipCodePage({ params }: PageProps) {
  const { zipcode } = await params;
  const zipData = getZipCodeData(zipcode);

  if (!zipData) {
    notFound();
  }

  // Get related data
  const cityData = locations.find(loc => loc.slug === zipData.citySlug);
  const countyData = getCountyBySlug(zipData.countySlug);
  const cityNeighborhoods = getNeighborhoodsByCity(zipData.citySlug).slice(0, 6);
  const otherCityZips = getZipCodesByCity(zipData.citySlug)
    .filter(z => z.zipCode !== zipcode)
    .slice(0, 6);

  // Generate FAQs
  const faqs = generateZipCodeFaqs(zipData);
  const faqSchema = generateZipCodeFaqSchema(faqs);

  const stateSlug = getStateSlugByAbbr(zipData.stateAbbr);
  const breadcrumbs = [
    { name: 'Home', url: 'https://getmyroofestimatenow.com' },
    { name: 'Roof Estimates', url: 'https://getmyroofestimatenow.com/roof-estimate' },
    { name: zipData.stateAbbr === 'NC' ? 'North Carolina' : 'South Carolina', url: `https://getmyroofestimatenow.com/roof-estimate/state/${stateSlug}` },
    { name: zipData.cityName, url: `https://getmyroofestimatenow.com/roof-estimate/state/${stateSlug}/${zipData.citySlug}` },
    { name: zipcode, url: `https://getmyroofestimatenow.com/roof-estimate/zip/${zipcode}` },
  ];

  // Service Area Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Roof Estimate Service for ${zipcode}`,
    description: `Free instant roof replacement estimates for zip code ${zipcode} in ${zipData.cityName}, ${zipData.stateAbbr}`,
    url: `https://getmyroofestimatenow.com/roof-estimate/zip/${zipcode}`,
    provider: {
      '@type': 'Organization',
      name: 'Get My Roof Estimate Now',
      url: 'https://getmyroofestimatenow.com',
    },
    areaServed: {
      '@type': 'PostalCodeRangeSpecification',
      postalCode: zipcode,
      addressLocality: zipData.cityName,
      addressRegion: zipData.stateAbbr,
      addressCountry: 'US',
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
            <nav className="flex items-center gap-2 text-sm text-blue-200 mb-8 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/roof-estimate" className="hover:text-white transition-colors">Roof Estimates</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/roof-estimate/state/${stateSlug}/${zipData.citySlug}`} className="hover:text-white transition-colors">{zipData.cityName}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{zipcode}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
                  <Tag className="w-4 h-4" />
                  <span>Zip Code {zipcode}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Roof Estimates for<br />
                  <span className="text-blue-300">{zipcode}</span>
                </h1>

                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Get an instant roof replacement estimate for any address in the {zipcode} zip code.
                  Serving {zipData.cityName}, {zipData.stateAbbr} in {zipData.countyName}.
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
                  Get Your {zipcode} Roof Estimate
                </h2>
                <p className="text-slate-600 mb-6">
                  Enter your address for instant pricing
                </p>
                <LocationAddressForm />
              </div>
            </div>
          </div>
        </section>

        {/* Zip Code Stats */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">${zipData.avgRoofCost.mid.toLocaleString()}</div>
                <div className="text-sm text-slate-600">Average Roof Cost</div>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <Home className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-slate-900">{zipData.avgHomeValue}</div>
                <div className="text-sm text-slate-600">Home Values</div>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900">{zipData.avgHomeAge}</div>
                <div className="text-sm text-slate-600">Home Age</div>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-slate-900">{zipData.housingTypes[0]}</div>
                <div className="text-sm text-slate-600">Primary Housing</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Zip Code */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Roofing in {zipcode} ({zipData.cityName})
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {zipData.roofingNotes}
                </p>
                <p className="text-slate-600 mb-6">
                  The {zipcode} zip code is located in {zipData.countyName}, with homes averaging {zipData.avgHomeAge} old.
                  Common housing types include {zipData.housingTypes.join(', ')}. Home values typically range from {zipData.avgHomeValue}.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mb-4">Housing Types in {zipcode}</h3>
                <ul className="space-y-3 mb-8">
                  {zipData.housingTypes.map((type, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Home className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{type}</span>
                    </li>
                  ))}
                </ul>

                {countyData && (
                  <Link
                    href={`/roof-estimate/county/${zipData.countySlug}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all of {zipData.countyName}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>

              <div>
                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Roof Cost Range in {zipcode}</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-slate-900">${zipData.avgRoofCost.low.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">Budget</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-blue-600">${zipData.avgRoofCost.mid.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">Average</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-slate-900">${zipData.avgRoofCost.high.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">Premium</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Location Details</h4>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-slate-500">City</dt>
                      <dd className="font-medium text-slate-900">
                        <Link href={`/roof-estimate/state/${stateSlug}/${zipData.citySlug}`} className="text-blue-600 hover:underline">
                          {zipData.cityName}
                        </Link>
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-500">County</dt>
                      <dd className="font-medium text-slate-900">
                        <Link href={`/roof-estimate/county/${zipData.countySlug}`} className="text-blue-600 hover:underline">
                          {zipData.countyName}
                        </Link>
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-500">State</dt>
                      <dd className="font-medium text-slate-900">{zipData.state}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-slate-500">Average Home Age</dt>
                      <dd className="font-medium text-slate-900">{zipData.avgHomeAge}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        {cityNeighborhoods.length > 0 && (
          <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Neighborhoods in {zipData.cityName}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cityNeighborhoods.map((neighborhood) => (
                  <Link
                    key={neighborhood.slug}
                    href={`/roof-estimate/state/${stateSlug}/${zipData.citySlug}/${neighborhood.slug}`}
                    className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-slate-900">{neighborhood.name}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions About {zipcode}
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

        {/* Other Zip Codes */}
        {otherCityZips.length > 0 && (
          <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Other Zip Codes in {zipData.cityName}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {otherCityZips.map((zip) => (
                  <Link
                    key={zip.zipCode}
                    href={`/roof-estimate/zip/${zip.zipCode}`}
                    className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-center"
                  >
                    <div className="text-lg font-bold text-blue-600 group-hover:text-blue-700">{zip.zipCode}</div>
                    <div className="text-sm text-slate-500">${zip.avgRoofCost.mid.toLocaleString()} avg</div>
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
              Ready for Your {zipcode} Roof Estimate?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get instant pricing for your address in {zipData.cityName}. Free, fast, and no obligation.
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
