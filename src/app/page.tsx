'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AddressInput } from '@/components/AddressInput';
import { FAQSection, faqData } from '@/components/FAQSection';
import { FAQSchema } from '@/components/StructuredData';
import { SEOContent } from '@/components/SEOContent';
import { Shield, Clock, DollarSign, CheckCircle, Sparkles, ArrowRight, Zap, Award } from 'lucide-react';

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
      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900 text-white overflow-hidden">
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
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors shadow-lg shadow-emerald-500/25"
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
              <span className="text-sm font-medium text-emerald-100">Trusted by homeowners nationwide</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300"> Roof Quote </span>
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
                <Shield className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                <span>Zero Cost, Zero Obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" aria-hidden="true" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-400" aria-hidden="true" />
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
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">Simple Process</span>
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
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <span className="text-3xl" aria-hidden="true">🏠</span>
              </div>
              <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-200 to-transparent hidden md:block" style={{ transform: 'translateX(50%)' }}></div>
              <div className="text-emerald-600 font-bold text-sm mb-2">STEP 1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Enter Your Property</h3>
              <p className="text-slate-600">
                Simply type your address and our system locates your home using high-resolution imagery.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-500/20 group-hover:scale-105 transition-transform">
                <span className="text-3xl" aria-hidden="true">📐</span>
              </div>
              <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-teal-200 to-transparent hidden md:block" style={{ transform: 'translateX(50%)' }}></div>
              <div className="text-teal-600 font-bold text-sm mb-2">STEP 2</div>
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

      {/* Trust Section */}
      <section aria-labelledby="trust-heading" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">Why Choose Us</span>
              <h2 id="trust-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                The Smarter Way to Get Roof Estimates
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: CheckCircle, title: "Precision Technology", desc: "Satellite-powered measurements ensure accuracy within inches of your actual roof dimensions", color: "emerald" },
                { icon: Shield, title: "Verified Contractors", desc: "Every contractor in our network is licensed, insured, and background-checked", color: "teal" },
                { icon: Zap, title: "Lightning Fast", desc: "Why wait days? Get comprehensive pricing delivered to you in under 60 seconds", color: "amber" },
                { icon: DollarSign, title: "Transparent Pricing", desc: "No surprises or hidden fees. See exactly what your new roof will cost upfront", color: "emerald" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-200 transition-all">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.color === 'emerald' ? 'bg-emerald-100' :
                      item.color === 'teal' ? 'bg-teal-100' : 'bg-amber-100'
                    }`}>
                      <item.icon className={`w-6 h-6 ${
                        item.color === 'emerald' ? 'text-emerald-600' :
                        item.color === 'teal' ? 'text-teal-600' : 'text-amber-600'
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
      <section aria-labelledby="cta-heading" className="py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700">
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Your Personalized Quote Today
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of smart homeowners who discovered the easiest way to plan their roof project.
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-8 py-4 rounded-full hover:bg-emerald-50 transition-colors shadow-xl"
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
              <a href="/roof-estimate" className="hover:text-emerald-400 transition-colors">All Locations</a>
              <a href="/roof-cost-calculator" className="hover:text-emerald-400 transition-colors">Cost Calculator</a>
              <a href="/blog" className="hover:text-emerald-400 transition-colors">Blog</a>
              <a href="/privacy-policy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            </nav>
          </div>

          {/* State Links */}
          <div className="border-t border-slate-800 mt-8 pt-8">
            <h3 className="text-white font-semibold text-center mb-4">Roof Estimates by State</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 text-sm text-center mb-4">
              <a href="/roof-estimate/state/texas" className="hover:text-emerald-400 transition-colors">Texas</a>
              <a href="/roof-estimate/state/florida" className="hover:text-emerald-400 transition-colors">Florida</a>
              <a href="/roof-estimate/state/california" className="hover:text-emerald-400 transition-colors">California</a>
              <a href="/roof-estimate/state/north-carolina" className="hover:text-emerald-400 transition-colors">North Carolina</a>
              <a href="/roof-estimate/state/georgia" className="hover:text-emerald-400 transition-colors">Georgia</a>
              <a href="/roof-estimate/state/arizona" className="hover:text-emerald-400 transition-colors">Arizona</a>
              <a href="/roof-estimate/state/colorado" className="hover:text-emerald-400 transition-colors">Colorado</a>
              <a href="/roof-estimate/state/tennessee" className="hover:text-emerald-400 transition-colors">Tennessee</a>
              <a href="/roof-estimate/state/ohio" className="hover:text-emerald-400 transition-colors">Ohio</a>
              <a href="/roof-estimate/state/illinois" className="hover:text-emerald-400 transition-colors">Illinois</a>
              <a href="/roof-estimate/state/pennsylvania" className="hover:text-emerald-400 transition-colors">Pennsylvania</a>
              <a href="/roof-estimate/state/virginia" className="hover:text-emerald-400 transition-colors">Virginia</a>
              <a href="/roof-estimate/state/washington" className="hover:text-emerald-400 transition-colors">Washington</a>
              <a href="/roof-estimate/state/new-york" className="hover:text-emerald-400 transition-colors">New York</a>
              <a href="/roof-estimate/state/massachusetts" className="hover:text-emerald-400 transition-colors">Massachusetts</a>
              <a href="/roof-estimate/state/nevada" className="hover:text-emerald-400 transition-colors">Nevada</a>
            </div>
            <div className="text-center">
              <a href="/roof-estimate" className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                View all locations <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* City Links */}
          <div className="border-t border-slate-800 mt-8 pt-8">
            <h3 className="text-white font-semibold text-center mb-4">Top Cities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm text-center">
              <a href="/roof-estimate/state/north-carolina/charlotte-nc" className="hover:text-emerald-400 transition-colors">Charlotte, NC</a>
              <a href="/roof-estimate/state/texas/houston-tx" className="hover:text-emerald-400 transition-colors">Houston, TX</a>
              <a href="/roof-estimate/state/texas/dallas-tx" className="hover:text-emerald-400 transition-colors">Dallas, TX</a>
              <a href="/roof-estimate/state/arizona/phoenix-az" className="hover:text-emerald-400 transition-colors">Phoenix, AZ</a>
              <a href="/roof-estimate/state/california/los-angeles-ca" className="hover:text-emerald-400 transition-colors">Los Angeles, CA</a>
              <a href="/roof-estimate/state/california/san-diego-ca" className="hover:text-emerald-400 transition-colors">San Diego, CA</a>
              <a href="/roof-estimate/state/colorado/denver-co" className="hover:text-emerald-400 transition-colors">Denver, CO</a>
              <a href="/roof-estimate/state/florida/miami-fl" className="hover:text-emerald-400 transition-colors">Miami, FL</a>
              <a href="/roof-estimate/state/florida/tampa-fl" className="hover:text-emerald-400 transition-colors">Tampa, FL</a>
              <a href="/roof-estimate/state/florida/orlando-fl" className="hover:text-emerald-400 transition-colors">Orlando, FL</a>
              <a href="/roof-estimate/state/georgia/atlanta-ga" className="hover:text-emerald-400 transition-colors">Atlanta, GA</a>
              <a href="/roof-estimate/state/illinois/chicago-il" className="hover:text-emerald-400 transition-colors">Chicago, IL</a>
              <a href="/roof-estimate/state/nevada/las-vegas-nv" className="hover:text-emerald-400 transition-colors">Las Vegas, NV</a>
              <a href="/roof-estimate/state/washington/seattle-wa" className="hover:text-emerald-400 transition-colors">Seattle, WA</a>
              <a href="/roof-estimate/state/tennessee/nashville-tn" className="hover:text-emerald-400 transition-colors">Nashville, TN</a>
              <a href="/roof-estimate/state/pennsylvania/philadelphia-pa" className="hover:text-emerald-400 transition-colors">Philadelphia, PA</a>
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
