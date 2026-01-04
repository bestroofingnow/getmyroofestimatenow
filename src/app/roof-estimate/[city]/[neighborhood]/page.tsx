import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Home, ArrowRight, CheckCircle, Phone, Clock, Shield, ChevronRight, DollarSign, HelpCircle, Wrench, Star } from 'lucide-react';
import { neighborhoods, getNeighborhood, getNeighborhoodsByCity, NeighborhoodData } from '@/lib/neighborhoods';
import { locations } from '@/lib/locations';
import { getStateSlugByAbbr } from '@/lib/stateData';
import { LocationAddressForm } from '@/components/LocationAddressForm';
import { BreadcrumbSchema } from '@/components/StructuredData';

// Generate neighborhood-specific FAQs
function generateNeighborhoodFAQs(neighborhood: NeighborhoodData, cityData: typeof locations[0] | undefined) {
  const avgCost = cityData ? cityData.avgRoofCost.mid : 12000;
  return [
    {
      question: `How much does a new roof cost in ${neighborhood.name}?`,
      answer: `Roof replacement costs in ${neighborhood.name}, ${neighborhood.city} typically range from $${(avgCost * 0.7).toLocaleString()} to $${(avgCost * 1.5).toLocaleString()} depending on your home's size, roof complexity, and material choice. ${neighborhood.housingTypes[0]} homes in the area often fall in the mid-range of these estimates.`
    },
    {
      question: `What roofing materials are best for ${neighborhood.name} homes?`,
      answer: `For ${neighborhood.name} homes, we recommend materials suited to the local ${neighborhood.characteristics.includes('Historic') || neighborhood.characteristics.some(c => c.toLowerCase().includes('historic')) ? 'historic character and' : ''} climate. Popular choices include architectural shingles for their durability and aesthetic appeal, and ${cityData?.popularMaterials?.[0] || 'metal roofing'} which performs well in this area.`
    },
    {
      question: `How long does a roof replacement take in ${neighborhood.name}?`,
      answer: `Most ${neighborhood.name} roof replacements are completed in 1-3 days, depending on roof size and complexity. ${neighborhood.housingTypes.some(t => t.toLowerCase().includes('historic') || t.toLowerCase().includes('estate')) ? 'Larger estate homes or historic properties may require additional time.' : 'Standard single-family homes typically complete in 1-2 days.'}`
    },
    {
      question: `Do I need permits for roofing work in ${neighborhood.name}?`,
      answer: `Yes, roofing permits are typically required in ${neighborhood.city} for ${neighborhood.name} properties. ${neighborhood.roofingConsiderations.some(c => c.toLowerCase().includes('hoa')) ? 'Additionally, HOA approval may be required in this neighborhood.' : ''} Our connected contractors handle all permit requirements.`
    },
    {
      question: `What should ${neighborhood.name} homeowners know about roof inspections?`,
      answer: `${neighborhood.name} homeowners should schedule annual roof inspections, especially given ${neighborhood.roofingConsiderations[0]?.toLowerCase() || 'local weather conditions'}. With average home ages of ${neighborhood.avgHomeAge}, regular inspections can catch issues early and extend roof life.`
    }
  ];
}

interface PageProps {
  params: Promise<{ city: string; neighborhood: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, neighborhood: neighborhoodSlug } = await params;
  const neighborhoodData = getNeighborhood(neighborhoodSlug, city);

  if (!neighborhoodData) {
    return { title: 'Neighborhood Not Found' };
  }

  const title = `${neighborhoodData.name} Roof Estimate | ${neighborhoodData.city}, ${neighborhoodData.stateAbbr} Roofing Costs`;
  const description = `Get an instant roof replacement estimate for ${neighborhoodData.name} in ${neighborhoodData.city}, ${neighborhoodData.stateAbbr}. Free satellite-based quotes for ${neighborhoodData.housingTypes.slice(0, 3).join(', ')}. Local roofing costs and expert recommendations.`;

  return {
    title,
    description,
    keywords: [
      `${neighborhoodData.name} roof estimate`,
      `${neighborhoodData.name} roofing cost`,
      `${neighborhoodData.name} roof replacement`,
      `${neighborhoodData.city} ${neighborhoodData.name} roofers`,
      `roof repair ${neighborhoodData.name}`,
      `roofing contractors ${neighborhoodData.name} ${neighborhoodData.stateAbbr}`,
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://instantroofestimate.ai/roof-estimate/${city}/${neighborhoodSlug}`,
    },
  };
}

export async function generateStaticParams() {
  return neighborhoods.map((neighborhood) => ({
    city: neighborhood.citySlug,
    neighborhood: neighborhood.slug,
  }));
}

export default async function NeighborhoodPage({ params }: PageProps) {
  const { city, neighborhood: neighborhoodSlug } = await params;
  const neighborhoodData = getNeighborhood(neighborhoodSlug, city);

  if (!neighborhoodData) {
    notFound();
  }

  // Get parent city data
  const cityData = locations.find(loc => loc.slug === city);
  const stateSlug = cityData ? getStateSlugByAbbr(cityData.stateAbbr) : undefined;

  // Get nearby neighborhoods for internal linking
  const nearbyNeighborhoods = neighborhoods.filter(n =>
    neighborhoodData.nearbyNeighborhoods.some(nearby =>
      n.name.toLowerCase().includes(nearby.toLowerCase()) ||
      nearby.toLowerCase().includes(n.name.toLowerCase())
    ) && n.slug !== neighborhoodSlug
  ).slice(0, 4);

  // Get other neighborhoods in same city
  const sameCityNeighborhoods = getNeighborhoodsByCity(city)
    .filter(n => n.slug !== neighborhoodSlug)
    .slice(0, 6);

  const breadcrumbs = [
    { name: 'Home', url: 'https://instantroofestimate.ai' },
    { name: 'Roof Estimates', url: 'https://instantroofestimate.ai/roof-estimate' },
    { name: `${neighborhoodData.city}, ${neighborhoodData.stateAbbr}`, url: `https://instantroofestimate.ai/roof-estimate/${city}` },
    { name: neighborhoodData.name, url: `https://instantroofestimate.ai/roof-estimate/${city}/${neighborhoodSlug}` },
  ];

  // Generate FAQs
  const faqs = generateNeighborhoodFAQs(neighborhoodData, cityData);

  // Local Business Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Instant Roof Estimate - ${neighborhoodData.name}`,
    description: `Free instant roof replacement estimates for ${neighborhoodData.name} homeowners in ${neighborhoodData.city}, ${neighborhoodData.stateAbbr}`,
    url: `https://instantroofestimate.ai/roof-estimate/${city}/${neighborhoodSlug}`,
    areaServed: {
      '@type': 'Place',
      name: `${neighborhoodData.name}, ${neighborhoodData.city}, ${neighborhoodData.stateAbbr}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: neighborhoodData.city,
        addressRegion: neighborhoodData.stateAbbr,
        postalCode: neighborhoodData.zipCodes[0],
      },
    },
    priceRange: '$$-$$$$',
    serviceType: 'Roof Replacement Estimates',
  };

  // FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Instant Roof Estimate"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="font-bold text-lg text-slate-900 hidden sm:inline">Instant Roof Estimate</span>
              </Link>
              <nav className="flex items-center gap-4 text-sm">
                <Link href={`/roof-estimate/${city}`} className="text-slate-600 hover:text-blue-600">
                  {neighborhoodData.city}
                </Link>
                <Link href="/roof-estimate" className="text-slate-600 hover:text-blue-600">
                  All Locations
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Breadcrumb Navigation */}
        <nav className="bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex items-center gap-2 text-sm text-slate-600 flex-wrap">
              <li>
                <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <li>
                <Link href="/roof-estimate" className="hover:text-blue-600">
                  Roof Estimates
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <li>
                <Link href={`/roof-estimate/${city}`} className="hover:text-blue-600">
                  {neighborhoodData.city}, {neighborhoodData.stateAbbr}
                </Link>
              </li>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <li className="text-slate-900 font-medium">{neighborhoodData.name}</li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-blue-200" />
                <span className="text-blue-200 font-medium">
                  {neighborhoodData.name} • {neighborhoodData.city}, {neighborhoodData.stateAbbr}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Free Roof Estimate for {neighborhoodData.name}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
                Get an instant, accurate roof replacement estimate for your {neighborhoodData.name} home using satellite imagery. Takes just 60 seconds.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4" /> Free Estimate
                </span>
                <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" /> 60 Seconds
                </span>
                <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                  <Shield className="w-4 h-4" /> No Obligation
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Address Form Section */}
        <section className="py-10 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">
                Enter your {neighborhoodData.name} address to get started
              </h2>
              <LocationAddressForm />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* About the Neighborhood */}
                  <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      About {neighborhoodData.name}
                    </h2>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      {neighborhoodData.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2">Neighborhood Characteristics</h3>
                        <ul className="space-y-1">
                          {neighborhoodData.characteristics.map((char, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {char}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2">Common Housing Types</h3>
                        <ul className="space-y-1">
                          {neighborhoodData.housingTypes.map((type, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-600">
                              <Home className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              {type}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Roofing Considerations */}
                  <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      Roofing Considerations for {neighborhoodData.name}
                    </h2>
                    <p className="text-slate-700 mb-4">
                      With average home ages of {neighborhoodData.avgHomeAge} and home values ranging from {neighborhoodData.avgHomeValue}, {neighborhoodData.name} homeowners have specific roofing needs to consider:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {neighborhoodData.roofingConsiderations.map((consideration, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-semibold text-sm">{i + 1}</span>
                          </div>
                          <span className="text-slate-700">{consideration}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Local Landmarks */}
                  {neighborhoodData.landmarks.length > 0 && (
                    <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                      <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Near These {neighborhoodData.name} Landmarks
                      </h2>
                      <p className="text-slate-600 mb-4">
                        We provide roof estimates for homes throughout {neighborhoodData.name}, including properties near:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {neighborhoodData.landmarks.map((landmark, i) => (
                          <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm">
                            {landmark}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Zip Codes Served */}
                  <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-3">
                      Zip Codes We Serve in {neighborhoodData.name}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {neighborhoodData.zipCodes.map((zip, i) => (
                        <span key={i} className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium shadow-sm">
                          {zip}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* Pricing Section */}
                  {cityData && (
                    <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">
                          Roof Replacement Costs in {neighborhoodData.name}
                        </h2>
                      </div>
                      <p className="text-slate-700 mb-6">
                        Based on {neighborhoodData.city} market data and typical {neighborhoodData.name} home sizes, here are estimated roof replacement costs for the area:
                      </p>
                      <div className="grid sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
                          <div className="text-sm font-medium text-slate-500 mb-1">Budget</div>
                          <div className="text-2xl font-bold text-slate-900">${cityData.avgRoofCost.low.toLocaleString()}</div>
                          <div className="text-xs text-slate-500 mt-1">3-tab shingles</div>
                        </div>
                        <div className="bg-blue-600 rounded-xl p-4 text-center text-white">
                          <div className="text-sm font-medium text-blue-200 mb-1">Most Popular</div>
                          <div className="text-2xl font-bold">${cityData.avgRoofCost.mid.toLocaleString()}</div>
                          <div className="text-xs text-blue-200 mt-1">Architectural shingles</div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
                          <div className="text-sm font-medium text-slate-500 mb-1">Premium</div>
                          <div className="text-2xl font-bold text-slate-900">${cityData.avgRoofCost.high.toLocaleString()}</div>
                          <div className="text-xs text-slate-500 mt-1">Designer/Premium</div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500">
                        *Estimates based on average {neighborhoodData.name} roof sizes. Your actual cost depends on roof size, pitch, and condition. Get your personalized estimate above.
                      </p>
                    </section>
                  )}

                  {/* Roofing Services Section */}
                  <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-purple-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        Roofing Services for {neighborhoodData.name} Homes
                      </h2>
                    </div>
                    <p className="text-slate-700 mb-6">
                      Our network of licensed roofing contractors serving {neighborhoodData.name} provides comprehensive services tailored to {neighborhoodData.housingTypes[0]} and other local home styles:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-900">Complete Roof Replacement</h4>
                          <p className="text-sm text-slate-600">Full tear-off and installation of new roofing system</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-900">Roof Repairs</h4>
                          <p className="text-sm text-slate-600">Leak repairs, shingle replacement, and damage fixes</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-900">Storm Damage Assessment</h4>
                          <p className="text-sm text-slate-600">Insurance claim assistance and emergency repairs</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-slate-900">Free Roof Inspections</h4>
                          <p className="text-sm text-slate-600">Comprehensive evaluation of your roof&apos;s condition</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* FAQ Section */}
                  <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <HelpCircle className="w-6 h-6 text-orange-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {neighborhoodData.name} Roofing FAQs
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                          <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                          <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Why Choose Us Section */}
                  <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Star className="w-6 h-6 text-yellow-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        Why {neighborhoodData.name} Homeowners Choose Us
                      </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Instant Estimates</h4>
                          <p className="text-sm text-slate-600">Get accurate pricing in 60 seconds using satellite technology</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">100% Free</h4>
                          <p className="text-sm text-slate-600">No cost, no obligation to get your roof estimate</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Local Contractors</h4>
                          <p className="text-sm text-slate-600">Connect with vetted {neighborhoodData.city} area roofers</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Shield className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Quality Guaranteed</h4>
                          <p className="text-sm text-slate-600">Licensed, insured contractors with proven track records</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* CTA Card */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white sticky top-24">
                    <h3 className="text-xl font-bold mb-3">
                      Get Your Free Estimate
                    </h3>
                    <p className="text-blue-100 mb-4 text-sm">
                      Join {neighborhoodData.name} homeowners who have gotten instant roof estimates.
                    </p>
                    <Link
                      href="/"
                      className="block w-full bg-white text-blue-600 text-center font-semibold py-3 rounded-xl hover:bg-blue-50 transition-colors"
                    >
                      Start Now
                    </Link>
                    <div className="mt-4 pt-4 border-t border-blue-500/30">
                      <div className="flex items-center gap-2 text-blue-100 text-sm">
                        <Phone className="w-4 h-4" />
                        <span>Questions? We&apos;re here to help</span>
                      </div>
                    </div>
                  </div>

                  {/* Other Neighborhoods in City */}
                  {sameCityNeighborhoods.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h3 className="font-bold text-slate-900 mb-4">
                        Other {neighborhoodData.city} Neighborhoods
                      </h3>
                      <ul className="space-y-2">
                        {sameCityNeighborhoods.map((n) => (
                          <li key={n.slug}>
                            <Link
                              href={`/roof-estimate/${n.citySlug}/${n.slug}`}
                              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors py-2 border-b border-slate-100 last:border-0"
                            >
                              <MapPin className="w-4 h-4" />
                              {n.name}
                              <ArrowRight className="w-4 h-4 ml-auto" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/roof-estimate/${city}`}
                        className="mt-4 block text-center text-blue-600 font-medium hover:text-blue-700"
                      >
                        View All {neighborhoodData.city} Areas →
                      </Link>
                    </div>
                  )}

                  {/* Parent City Link */}
                  {cityData && (
                    <div className="bg-slate-100 rounded-2xl p-6">
                      <h3 className="font-bold text-slate-900 mb-2">
                        {neighborhoodData.city} Roofing Information
                      </h3>
                      <p className="text-slate-600 text-sm mb-4">
                        Learn about roofing costs, materials, and considerations for the greater {neighborhoodData.city} area.
                      </p>
                      <Link
                        href={`/roof-estimate/${city}`}
                        className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-medium py-3 rounded-xl hover:bg-slate-800 transition-colors"
                      >
                        {neighborhoodData.city} Roof Estimates
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Nearby Neighborhoods Section */}
              {nearbyNeighborhoods.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Nearby Neighborhoods
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {nearbyNeighborhoods.map((n) => (
                      <Link
                        key={n.slug}
                        href={`/roof-estimate/${n.citySlug}/${n.slug}`}
                        className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-slate-200 group"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {n.name}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">{n.city}, {n.stateAbbr}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Bottom CTA */}
              <section className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Get Your {neighborhoodData.name} Roof Estimate?
                </h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Our satellite-based estimates are accurate, instant, and completely free. See what your roof replacement could cost in just 60 seconds.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg"
                >
                  Get Your Free Estimate Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <Link href="/" className="flex items-center gap-2 mb-4">
                    <Image
                      src="/logo.png"
                      alt="Instant Roof Estimate"
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                    <span className="font-bold text-white">Instant Roof Estimate</span>
                  </Link>
                  <p className="text-sm">
                    Free, instant roof replacement estimates using satellite technology.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">{neighborhoodData.city} Areas</h4>
                  <ul className="space-y-2 text-sm">
                    {getNeighborhoodsByCity(city).slice(0, 5).map((n) => (
                      <li key={n.slug}>
                        <Link href={`/roof-estimate/${n.citySlug}/${n.slug}`} className="hover:text-white transition-colors">
                          {n.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href={`/roof-estimate/${city}`} className="text-blue-400 hover:text-blue-300">
                        View all →
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-4">Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="/roof-cost-calculator" className="hover:text-white transition-colors">
                        Roof Cost Calculator
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="hover:text-white transition-colors">
                        Roofing Blog
                      </Link>
                    </li>
                    {stateSlug && cityData && (
                      <li>
                        <Link href={`/roof-estimate/state/${stateSlug}`} className="hover:text-white transition-colors">
                          {cityData.state} Roofing
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link href="/roof-estimate" className="hover:text-white transition-colors">
                        All Locations
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-8 border-t border-slate-800 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Instant Roof Estimate. All rights reserved.</p>
                <div className="flex justify-center gap-6 mt-4">
                  <Link href="/privacy-policy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
