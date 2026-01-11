'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AddressInput } from '@/components/AddressInput';
import { FAQSection, faqData } from '@/components/FAQSection';
import { FAQSchema } from '@/components/StructuredData';
import { SEOContent } from '@/components/SEOContent';
import { Shield, Clock, DollarSign, CheckCircle, Star, ArrowRight } from 'lucide-react';

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
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Header/Nav */}
        <header role="banner" className="relative z-20 container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt=""
                width={56}
                height={56}
                className="w-14 h-14"
              />
              <span className="text-xl font-bold text-white hidden sm:inline">GetMyRoofEstimateNow.com</span>
            </div>
            <a
              href="#get-estimate"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('address-input')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Get Free Estimate
            </a>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              <span className="text-sm font-medium text-blue-100">Millions of people trust our roof measurements</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Get Your Free
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Roof Estimate </span>
              in 60 Seconds
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto">
              We measure your roof from space photos. Get your price fast. No one needs to climb on your roof.
            </p>

            {/* Address Input */}
            <div id="address-input" className="mb-8">
              <AddressInput
                onAddressSelect={handleAddressSelect}
                isLoading={isLoading}
              />
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" aria-hidden="true" />
                <span>No Credit Card Needed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" aria-hidden="true" />
                <span>Results in 60 Seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                <span>100% Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section aria-labelledby="how-it-works-heading" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get your roof price in three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl" aria-hidden="true">📍</span>
              </div>
              <div className="text-blue-600 font-semibold text-sm mb-2">STEP 1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Type Your Address</h3>
              <p className="text-slate-600">
                Enter your home address. We find your house using satellite photos from space.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl" aria-hidden="true">🛰️</span>
              </div>
              <div className="text-green-600 font-semibold text-sm mb-2">STEP 2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">We Measure Your Roof</h3>
              <p className="text-slate-600">
                Smart tools look at your roof from above. They figure out the size and shape.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl" aria-hidden="true">💰</span>
              </div>
              <div className="text-orange-600 font-semibold text-sm mb-2">STEP 3</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Get Your Price</h3>
              <p className="text-slate-600">
                See your roof cost right away. A roofer near you can tell you more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section aria-labelledby="trust-heading" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="trust-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why People Trust Us
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: CheckCircle, title: "Right Measurements", desc: "We use satellite photos to measure your roof the right way" },
                { icon: Shield, title: "Good Roofers", desc: "We connect you with roofers who have licenses and insurance" },
                { icon: Clock, title: "Fast Results", desc: "Get your price in 60 seconds. No waiting for days" },
                { icon: DollarSign, title: "No Hidden Costs", desc: "Free estimates. We show you clear, fair prices" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex-shrink-0">
                    <item.icon className="w-8 h-8 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
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
      <section aria-labelledby="cta-heading" className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Your Estimate?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Thousands of homeowners already got their free roof estimate. Get yours now.
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Get My Free Estimate
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
                alt=""
                width={56}
                height={56}
                className="w-14 h-14"
              />
              <div>
                <div className="text-xl font-bold text-white mb-1">GetMyRoofEstimateNow.com</div>
                <p className="text-sm">Get roof prices in seconds.</p>
              </div>
            </div>
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 text-sm">
              <a href="/roof-estimate" className="hover:text-white transition-colors">All Locations</a>
              <a href="/roof-cost-calculator" className="hover:text-white transition-colors">Cost Calculator</a>
              <a href="/blog" className="hover:text-white transition-colors">Blog</a>
              <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </nav>
          </div>

          {/* State Links */}
          <div className="border-t border-slate-800 mt-8 pt-8">
            <h3 className="text-white font-semibold text-center mb-4">Roof Estimates by State</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 text-sm text-center mb-4">
              <a href="/roof-estimate/state/texas" className="hover:text-white transition-colors">Texas</a>
              <a href="/roof-estimate/state/florida" className="hover:text-white transition-colors">Florida</a>
              <a href="/roof-estimate/state/california" className="hover:text-white transition-colors">California</a>
              <a href="/roof-estimate/state/north-carolina" className="hover:text-white transition-colors">North Carolina</a>
              <a href="/roof-estimate/state/georgia" className="hover:text-white transition-colors">Georgia</a>
              <a href="/roof-estimate/state/arizona" className="hover:text-white transition-colors">Arizona</a>
              <a href="/roof-estimate/state/colorado" className="hover:text-white transition-colors">Colorado</a>
              <a href="/roof-estimate/state/tennessee" className="hover:text-white transition-colors">Tennessee</a>
              <a href="/roof-estimate/state/ohio" className="hover:text-white transition-colors">Ohio</a>
              <a href="/roof-estimate/state/illinois" className="hover:text-white transition-colors">Illinois</a>
              <a href="/roof-estimate/state/pennsylvania" className="hover:text-white transition-colors">Pennsylvania</a>
              <a href="/roof-estimate/state/virginia" className="hover:text-white transition-colors">Virginia</a>
              <a href="/roof-estimate/state/washington" className="hover:text-white transition-colors">Washington</a>
              <a href="/roof-estimate/state/new-york" className="hover:text-white transition-colors">New York</a>
              <a href="/roof-estimate/state/massachusetts" className="hover:text-white transition-colors">Massachusetts</a>
              <a href="/roof-estimate/state/nevada" className="hover:text-white transition-colors">Nevada</a>
            </div>
            <div className="text-center">
              <a href="/roof-estimate" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium">
                View all locations <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* City Links */}
          <div className="border-t border-slate-800 mt-8 pt-8">
            <h3 className="text-white font-semibold text-center mb-4">Top Cities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm text-center">
              <a href="/roof-estimate/state/north-carolina/charlotte-nc" className="hover:text-white transition-colors">Charlotte, NC</a>
              <a href="/roof-estimate/state/texas/houston-tx" className="hover:text-white transition-colors">Houston, TX</a>
              <a href="/roof-estimate/state/texas/dallas-tx" className="hover:text-white transition-colors">Dallas, TX</a>
              <a href="/roof-estimate/state/arizona/phoenix-az" className="hover:text-white transition-colors">Phoenix, AZ</a>
              <a href="/roof-estimate/state/california/los-angeles-ca" className="hover:text-white transition-colors">Los Angeles, CA</a>
              <a href="/roof-estimate/state/california/san-diego-ca" className="hover:text-white transition-colors">San Diego, CA</a>
              <a href="/roof-estimate/state/colorado/denver-co" className="hover:text-white transition-colors">Denver, CO</a>
              <a href="/roof-estimate/state/florida/miami-fl" className="hover:text-white transition-colors">Miami, FL</a>
              <a href="/roof-estimate/state/florida/tampa-fl" className="hover:text-white transition-colors">Tampa, FL</a>
              <a href="/roof-estimate/state/florida/orlando-fl" className="hover:text-white transition-colors">Orlando, FL</a>
              <a href="/roof-estimate/state/georgia/atlanta-ga" className="hover:text-white transition-colors">Atlanta, GA</a>
              <a href="/roof-estimate/state/illinois/chicago-il" className="hover:text-white transition-colors">Chicago, IL</a>
              <a href="/roof-estimate/state/nevada/las-vegas-nv" className="hover:text-white transition-colors">Las Vegas, NV</a>
              <a href="/roof-estimate/state/washington/seattle-wa" className="hover:text-white transition-colors">Seattle, WA</a>
              <a href="/roof-estimate/state/tennessee/nashville-tn" className="hover:text-white transition-colors">Nashville, TN</a>
              <a href="/roof-estimate/state/pennsylvania/philadelphia-pa" className="hover:text-white transition-colors">Philadelphia, PA</a>
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
