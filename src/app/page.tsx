'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AddressInput } from '@/components/AddressInput';
import { FAQSection, faqData } from '@/components/FAQSection';
import { FAQSchema } from '@/components/StructuredData';
import { SEOContent } from '@/components/SEOContent';
import { Shield, Clock, DollarSign, CheckCircle, Sparkles, ArrowRight, Zap, Award, TrendingUp, MapPin, Ruler, Layers } from 'lucide-react';

interface PlaceDetails {
  formatted_address: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
  postalCode: string;
}

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddressSelect = async (
    address: string,
    lat: number,
    lng: number,
    placeDetails: PlaceDetails
  ) => {
    setIsLoading(true);

    // Store in session storage for the calculating page
    sessionStorage.setItem('addressData', JSON.stringify({
      address,
      lat,
      lng,
      city: placeDetails.city,
      state: placeDetails.state,
      postalCode: placeDetails.postalCode,
    }));

    // Navigate to calculating page
    router.push(`/calculating?address=${encodeURIComponent(address)}&lat=${lat}&lng=${lng}`);
  };

  return (
    <main id="main-content" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Header/Nav */}
        <header role="banner" className="relative z-20 container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Get My Roof Estimate Now"
                width={48}
                height={48}
                className="w-12 h-12"
                priority
              />
              <span className="text-xl font-bold text-white hidden sm:inline">GetMyRoofEstimateNow</span>
            </div>
            <a
              href="#get-estimate"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('address-input')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors shadow-lg shadow-orange-500/25"
            >
              Start Free Estimate
            </a>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span className="text-sm font-medium text-blue-100">Trusted by homeowners nationwide</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300"> Roof Quote </span>
              in Under a Minute
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Advanced satellite technology measures your roof instantly. Get accurate pricing without anyone stepping foot on your property.
            </p>

            {/* Address Input */}
            <div id="address-input" className="mb-10">
              <AddressInput
                onAddressSelect={handleAddressSelect}
                isLoading={isLoading}
              />
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" aria-hidden="true" />
                <span>Zero Cost, Zero Obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" aria-hidden="true" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-400" aria-hidden="true" />
                <span>Precision Accuracy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Curved Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="none" className="w-full h-16 md:h-24">
            <path d="M0 100C240 100 240 40 480 40C720 40 720 100 960 100C1200 100 1200 40 1440 40V100H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section aria-labelledby="how-it-works-heading" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wide">Simple Process</span>
            <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Three Steps to Your Quote
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our streamlined process delivers accurate estimates faster than ever
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <span className="text-3xl" aria-hidden="true">🏠</span>
              </div>
              <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent hidden md:block" style={{ transform: 'translateX(50%)' }}></div>
              <div className="text-blue-600 font-bold text-sm mb-2">STEP 1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Enter Your Property</h3>
              <p className="text-slate-600">
                Simply type your address and our system locates your home using high-resolution imagery.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <span className="text-3xl" aria-hidden="true">📐</span>
              </div>
              <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-200 to-transparent hidden md:block" style={{ transform: 'translateX(50%)' }}></div>
              <div className="text-blue-600 font-bold text-sm mb-2">STEP 2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Automated Analysis</h3>
              <p className="text-slate-600">
                Our technology calculates precise measurements including size, pitch, and complexity.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <span className="text-3xl" aria-hidden="true">✨</span>
              </div>
              <div className="text-amber-600 font-bold text-sm mb-2">STEP 3</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Receive Your Quote</h3>
              <p className="text-slate-600">
                Get detailed pricing for multiple materials. Connect with vetted local contractors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Average Roof Costs Section */}
      <section aria-labelledby="pricing-heading" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wide">Transparent Pricing</span>
              <h2 id="pricing-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Average Roof Costs in 2025
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Most homeowners pay <strong className="text-slate-900">$8,000 - $25,000</strong> for a full roof replacement. Here&apos;s what drives that price.
              </p>
            </div>

            {/* Material Pricing Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { name: 'Architectural Shingles', range: '$6.00 - $6.50', total: '$12,000 - $13,000', tag: 'Most Popular', tagColor: 'bg-orange-100 text-orange-700', highlight: true },
                { name: 'Metal Roofing', range: '$11.75 - $12.25', total: '$23,500 - $24,500', tag: 'Longest Lasting', tagColor: 'bg-blue-100 text-blue-700', highlight: false },
                { name: 'Synthetic Roofing', range: '$9.25 - $9.75', total: '$18,500 - $19,500', tag: 'Premium Look', tagColor: 'bg-purple-100 text-purple-700', highlight: false },
                { name: 'Roof Coatings', range: '$3.50 - $4.00', total: '$7,000 - $8,000', tag: 'Budget Friendly', tagColor: 'bg-green-100 text-green-700', highlight: false },
              ].map((material, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl p-5 border transition-shadow hover:shadow-md ${
                    material.highlight
                      ? 'bg-white border-orange-300 shadow-md ring-1 ring-orange-200'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${material.tagColor}`}>
                    {material.tag}
                  </span>
                  <h3 className="font-bold text-slate-900 mb-3">{material.name}</h3>
                  <div className="text-sm text-slate-500 mb-1">Per sq ft</div>
                  <div className="text-lg font-bold text-slate-900 mb-3">{material.range}</div>
                  <div className="border-t border-slate-100 pt-3">
                    <div className="text-xs text-slate-500">Avg home (2,000 sq ft roof)</div>
                    <div className="text-base font-semibold text-orange-600">{material.total}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Regional Pricing Snapshot */}
            <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white mb-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-orange-400" aria-hidden="true" />
                    <span className="text-orange-400 font-semibold text-sm uppercase tracking-wide">Your Location Matters</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Regional Price Differences</h3>
                  <p className="text-slate-400 text-sm">
                    Labor rates and material costs vary across the country. Here&apos;s how regions compare to the national average.
                  </p>
                </div>
                <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { region: 'West Coast', diff: '+25-35%', color: 'text-red-400' },
                    { region: 'Northeast', diff: '+15-30%', color: 'text-orange-400' },
                    { region: 'Southeast', diff: 'Average', color: 'text-green-400' },
                    { region: 'Midwest', diff: '-5%', color: 'text-blue-400' },
                  ].map((r, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-3 text-center">
                      <div className="text-sm text-slate-300 mb-1">{r.region}</div>
                      <div className={`text-lg font-bold ${r.color}`}>{r.diff}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing CTA */}
            <div className="text-center">
              <p className="text-sm text-slate-500 mb-4">
                Prices shown are national averages. Your actual cost depends on your roof size, pitch, and location.
              </p>
              <a
                href="#get-estimate"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('address-input')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg shadow-orange-500/20"
              >
                Get Your Exact Price
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What Affects Your Roof Cost Section */}
      <section aria-labelledby="cost-factors-heading" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wide">Know Before You Buy</span>
              <h2 id="cost-factors-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                What Affects Your Roof Cost?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Four key factors determine your final price. Our satellite tool accounts for all of them.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Ruler,
                  title: 'Roof Size',
                  desc: 'Measured in "squares" (100 sq ft each). The average home has 15-25 squares. Bigger roof means more materials and labor.',
                  color: 'blue',
                },
                {
                  icon: Layers,
                  title: 'Material Choice',
                  desc: 'The biggest price factor. Basic shingles start around $6/sqft. Metal and premium materials can be double or more.',
                  color: 'orange',
                },
                {
                  icon: TrendingUp,
                  title: 'Roof Pitch',
                  desc: 'Steeper roofs are harder and more dangerous to work on. A steep pitch can add 20-50% to labor costs.',
                  color: 'amber',
                },
                {
                  icon: MapPin,
                  title: 'Your Location',
                  desc: 'Labor rates, material availability, and local demand all vary. Coastal and urban areas typically cost more.',
                  color: 'blue',
                },
              ].map((factor, i) => (
                <div key={i} className="text-center group">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-105 ${
                    factor.color === 'orange' ? 'bg-orange-100' :
                    factor.color === 'amber' ? 'bg-amber-100' : 'bg-blue-100'
                  }`}>
                    <factor.icon className={`w-7 h-7 ${
                      factor.color === 'orange' ? 'text-orange-600' :
                      factor.color === 'amber' ? 'text-amber-600' : 'text-blue-600'
                    }`} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{factor.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{factor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section aria-labelledby="trust-heading" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-orange-600 font-semibold text-sm uppercase tracking-wide">Why Choose Us</span>
              <h2 id="trust-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                The Smarter Way to Get Roof Estimates
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: CheckCircle, title: "Precision Technology", desc: "Satellite-powered measurements ensure accuracy within inches of your actual roof dimensions", color: "orange" },
                { icon: Shield, title: "Verified Contractors", desc: "Every contractor in our network is licensed, insured, and background-checked", color: "blue" },
                { icon: Zap, title: "Lightning Fast", desc: "Why wait days? Get comprehensive pricing delivered to you in under 60 seconds", color: "amber" },
                { icon: DollarSign, title: "Transparent Pricing", desc: "No surprises or hidden fees. See exactly what your new roof will cost upfront", color: "orange" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-orange-200 transition-all">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.color === 'orange' ? 'bg-orange-100' :
                      item.color === 'blue' ? 'bg-blue-100' : 'bg-amber-100'
                    }`}>
                      <item.icon className={`w-6 h-6 ${
                        item.color === 'orange' ? 'text-orange-600' :
                        item.color === 'blue' ? 'text-blue-600' : 'text-amber-600'
                      }`} aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContent />

      {/* FAQ Section */}
      <FAQSection />
      <FAQSchema faqs={faqData} />

      {/* CTA Section */}
      <section aria-labelledby="cta-heading" className="py-20 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Your Personalized Quote Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of smart homeowners who discovered the easiest way to plan their roof project.
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold px-8 py-4 rounded-full hover:bg-orange-400 transition-colors shadow-xl"
          >
            Start My Free Estimate
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer role="contentinfo" className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <Image
                src="/logo.png"
                alt="Get My Roof Estimate Now"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div>
                <div className="text-xl font-bold text-white mb-1">GetMyRoofEstimateNow</div>
                <p className="text-sm">Instant roof quotes, trusted contractors.</p>
              </div>
            </div>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 text-sm">
              <a href="/roof-estimate" className="hover:text-orange-400 transition-colors">All Locations</a>
              <a href="/roof-cost-calculator" className="hover:text-orange-400 transition-colors">Cost Calculator</a>
              <a href="/blog" className="hover:text-orange-400 transition-colors">Blog</a>
              <a href="/privacy-policy" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            </nav>
          </div>

          {/* State Links */}
          <div className="border-t border-slate-800 mt-8 pt-8">
            <h3 className="text-white font-semibold text-center mb-4">Roof Estimates by State</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 text-sm text-center mb-4">
              <a href="/roof-estimate/state/texas" className="hover:text-orange-400 transition-colors">Texas</a>
              <a href="/roof-estimate/state/florida" className="hover:text-orange-400 transition-colors">Florida</a>
              <a href="/roof-estimate/state/california" className="hover:text-orange-400 transition-colors">California</a>
              <a href="/roof-estimate/state/north-carolina" className="hover:text-orange-400 transition-colors">North Carolina</a>
              <a href="/roof-estimate/state/georgia" className="hover:text-orange-400 transition-colors">Georgia</a>
              <a href="/roof-estimate/state/arizona" className="hover:text-orange-400 transition-colors">Arizona</a>
              <a href="/roof-estimate/state/colorado" className="hover:text-orange-400 transition-colors">Colorado</a>
              <a href="/roof-estimate/state/tennessee" className="hover:text-orange-400 transition-colors">Tennessee</a>
              <a href="/roof-estimate/state/ohio" className="hover:text-orange-400 transition-colors">Ohio</a>
              <a href="/roof-estimate/state/illinois" className="hover:text-orange-400 transition-colors">Illinois</a>
              <a href="/roof-estimate/state/pennsylvania" className="hover:text-orange-400 transition-colors">Pennsylvania</a>
              <a href="/roof-estimate/state/virginia" className="hover:text-orange-400 transition-colors">Virginia</a>
              <a href="/roof-estimate/state/washington" className="hover:text-orange-400 transition-colors">Washington</a>
              <a href="/roof-estimate/state/new-york" className="hover:text-orange-400 transition-colors">New York</a>
              <a href="/roof-estimate/state/massachusetts" className="hover:text-orange-400 transition-colors">Massachusetts</a>
              <a href="/roof-estimate/state/nevada" className="hover:text-orange-400 transition-colors">Nevada</a>
            </div>
            <div className="text-center">
              <a href="/roof-estimate" className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 text-sm font-medium">
                View all locations <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* City Links */}
          <div className="border-t border-slate-800 mt-8 pt-8">
            <h3 className="text-white font-semibold text-center mb-4">Top Cities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm text-center">
              <a href="/roof-estimate/state/north-carolina/charlotte-nc" className="hover:text-orange-400 transition-colors">Charlotte, NC</a>
              <a href="/roof-estimate/state/texas/houston-tx" className="hover:text-orange-400 transition-colors">Houston, TX</a>
              <a href="/roof-estimate/state/texas/dallas-tx" className="hover:text-orange-400 transition-colors">Dallas, TX</a>
              <a href="/roof-estimate/state/arizona/phoenix-az" className="hover:text-orange-400 transition-colors">Phoenix, AZ</a>
              <a href="/roof-estimate/state/california/los-angeles-ca" className="hover:text-orange-400 transition-colors">Los Angeles, CA</a>
              <a href="/roof-estimate/state/california/san-diego-ca" className="hover:text-orange-400 transition-colors">San Diego, CA</a>
              <a href="/roof-estimate/state/colorado/denver-co" className="hover:text-orange-400 transition-colors">Denver, CO</a>
              <a href="/roof-estimate/state/florida/miami-fl" className="hover:text-orange-400 transition-colors">Miami, FL</a>
              <a href="/roof-estimate/state/florida/tampa-fl" className="hover:text-orange-400 transition-colors">Tampa, FL</a>
              <a href="/roof-estimate/state/florida/orlando-fl" className="hover:text-orange-400 transition-colors">Orlando, FL</a>
              <a href="/roof-estimate/state/georgia/atlanta-ga" className="hover:text-orange-400 transition-colors">Atlanta, GA</a>
              <a href="/roof-estimate/state/illinois/chicago-il" className="hover:text-orange-400 transition-colors">Chicago, IL</a>
              <a href="/roof-estimate/state/nevada/las-vegas-nv" className="hover:text-orange-400 transition-colors">Las Vegas, NV</a>
              <a href="/roof-estimate/state/washington/seattle-wa" className="hover:text-orange-400 transition-colors">Seattle, WA</a>
              <a href="/roof-estimate/state/tennessee/nashville-tn" className="hover:text-orange-400 transition-colors">Nashville, TN</a>
              <a href="/roof-estimate/state/pennsylvania/philadelphia-pa" className="hover:text-orange-400 transition-colors">Philadelphia, PA</a>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} GetMyRoofEstimateNow.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
