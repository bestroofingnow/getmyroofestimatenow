'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calculator, ArrowRight, Home, Ruler, DollarSign, Info } from 'lucide-react';

interface CalculatorResult {
  low: number;
  mid: number;
  high: number;
  squares: number;
}

const materialCosts: Record<string, { low: number; mid: number; high: number; name: string }> = {
  'asphalt-3tab': { low: 150, mid: 200, high: 250, name: '3-Tab Asphalt Shingles' },
  'asphalt-architectural': { low: 250, mid: 350, high: 450, name: 'Architectural Shingles' },
  'asphalt-designer': { low: 400, mid: 500, high: 650, name: 'Designer Shingles' },
  'metal-standing-seam': { low: 500, mid: 700, high: 900, name: 'Standing Seam Metal' },
  'metal-corrugated': { low: 350, mid: 450, high: 550, name: 'Corrugated Metal' },
  'tile-concrete': { low: 400, mid: 550, high: 700, name: 'Concrete Tile' },
  'tile-clay': { low: 600, mid: 800, high: 1000, name: 'Clay Tile' },
  'slate': { low: 800, mid: 1200, high: 1600, name: 'Natural Slate' },
};

const pitchMultipliers: Record<string, number> = {
  'flat': 1.0,
  'low': 1.05,
  'medium': 1.15,
  'steep': 1.30,
  'very-steep': 1.50,
};

const regionMultipliers: Record<string, { multiplier: number; name: string }> = {
  'southeast': { multiplier: 1.0, name: 'Southeast (NC, GA, TN, SC)' },
  'northeast': { multiplier: 1.15, name: 'Northeast (PA, NY, NJ, MA)' },
  'midwest': { multiplier: 0.95, name: 'Midwest (OH, IN, IL, MO)' },
  'southwest': { multiplier: 1.05, name: 'Southwest (AZ, NV, NM)' },
  'west-coast': { multiplier: 1.25, name: 'West Coast (CA, OR, WA)' },
  'texas': { multiplier: 1.0, name: 'Texas' },
  'florida': { multiplier: 1.10, name: 'Florida' },
  'mountain': { multiplier: 1.10, name: 'Mountain (CO, UT)' },
};

export default function RoofCostCalculator() {
  const [squareFeet, setSquareFeet] = useState<string>('');
  const [material, setMaterial] = useState<string>('asphalt-architectural');
  const [pitch, setPitch] = useState<string>('medium');
  const [region, setRegion] = useState<string>('southeast');
  const [tearOff, setTearOff] = useState<boolean>(true);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateCost = () => {
    const sqft = parseFloat(squareFeet);
    if (isNaN(sqft) || sqft <= 0) return;

    const squares = sqft / 100;
    const materialCost = materialCosts[material];
    const pitchMult = pitchMultipliers[pitch];
    const regionMult = regionMultipliers[region].multiplier;
    const tearOffCost = tearOff ? 100 : 0; // per square

    const low = Math.round(squares * (materialCost.low + tearOffCost) * pitchMult * regionMult);
    const mid = Math.round(squares * (materialCost.mid + tearOffCost) * pitchMult * regionMult);
    const high = Math.round(squares * (materialCost.high + tearOffCost) * pitchMult * regionMult);

    setResult({ low, mid, high, squares: Math.round(squares * 10) / 10 });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
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
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Get Accurate Estimate
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calculator className="w-6 h-6" />
              <span className="text-orange-200 font-medium">Free Tool</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Roof Cost Calculator
            </h1>
            <p className="text-xl text-orange-100">
              Estimate your roof replacement cost based on size, materials, and location.
              For a more accurate estimate, use our <Link href="/" className="underline hover:text-white">satellite-based tool</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Home className="w-5 h-5 text-orange-600" />
                    Your Roof Details
                  </h2>

                  {/* Square Footage */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Roof Square Footage
                    </label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="number"
                        value={squareFeet}
                        onChange={(e) => setSquareFeet(e.target.value)}
                        placeholder="e.g., 2000"
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Tip: Average US home has 1,500-2,500 sq ft of roofing
                    </p>
                  </div>

                  {/* Material */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Roofing Material
                    </label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <optgroup label="Asphalt Shingles">
                        <option value="asphalt-3tab">3-Tab Asphalt (Budget)</option>
                        <option value="asphalt-architectural">Architectural Shingles (Popular)</option>
                        <option value="asphalt-designer">Designer Shingles (Premium)</option>
                      </optgroup>
                      <optgroup label="Metal Roofing">
                        <option value="metal-corrugated">Corrugated Metal</option>
                        <option value="metal-standing-seam">Standing Seam Metal</option>
                      </optgroup>
                      <optgroup label="Tile Roofing">
                        <option value="tile-concrete">Concrete Tile</option>
                        <option value="tile-clay">Clay Tile</option>
                      </optgroup>
                      <optgroup label="Premium">
                        <option value="slate">Natural Slate</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Roof Pitch */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Roof Pitch (Steepness)
                    </label>
                    <select
                      value={pitch}
                      onChange={(e) => setPitch(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="flat">Flat or Low Slope (0-2/12)</option>
                      <option value="low">Low Pitch (3-4/12)</option>
                      <option value="medium">Medium Pitch (5-7/12) - Most Common</option>
                      <option value="steep">Steep Pitch (8-10/12)</option>
                      <option value="very-steep">Very Steep (11-12/12+)</option>
                    </select>
                  </div>

                  {/* Region */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Your Region
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      {Object.entries(regionMultipliers).map(([key, { name }]) => (
                        <option key={key} value={key}>{name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Tear Off */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tearOff}
                        onChange={(e) => setTearOff(e.target.checked)}
                        className="w-5 h-5 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm text-slate-700">
                        Include old roof tear-off (+$100/square)
                      </span>
                    </label>
                  </div>

                  <button
                    onClick={calculateCost}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-5 h-5" />
                    Calculate Estimate
                  </button>
                </div>

                {/* Results Section */}
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Estimated Cost
                  </h2>

                  {result ? (
                    <div className="space-y-6">
                      <div className="bg-slate-50 rounded-xl p-6">
                        <div className="text-sm text-slate-600 mb-2">Your roof is approximately</div>
                        <div className="text-3xl font-bold text-slate-900">{result.squares} squares</div>
                        <div className="text-sm text-slate-500">(1 square = 100 sq ft)</div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-100 rounded-xl p-4 text-center">
                          <div className="text-xs text-slate-500 mb-1">Budget</div>
                          <div className="text-xl font-bold text-slate-900">{formatCurrency(result.low)}</div>
                        </div>
                        <div className="bg-orange-600 rounded-xl p-4 text-center text-white">
                          <div className="text-xs text-orange-200 mb-1">Average</div>
                          <div className="text-xl font-bold">{formatCurrency(result.mid)}</div>
                        </div>
                        <div className="bg-slate-100 rounded-xl p-4 text-center">
                          <div className="text-xs text-slate-500 mb-1">Premium</div>
                          <div className="text-xl font-bold text-slate-900">{formatCurrency(result.high)}</div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <div className="flex gap-3">
                          <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-yellow-800">
                            <strong>This is a rough estimate.</strong> Actual costs vary based on roof complexity,
                            local labor rates, and current material prices. For a more accurate estimate,
                            use our <Link href="/" className="underline font-medium">satellite-based measurement tool</Link>.
                          </div>
                        </div>
                      </div>

                      <Link
                        href="/"
                        className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors text-center"
                      >
                        Get Accurate Satellite Estimate
                        <ArrowRight className="inline w-5 h-5 ml-2" />
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-xl p-8 text-center">
                      <Calculator className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-600">
                        Enter your roof details and click "Calculate Estimate" to see pricing.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              How Roof Costs Are Calculated
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-3">Factors That Affect Cost</h3>
                <ul className="space-y-2 text-slate-600">
                  <li><strong>Roof Size:</strong> Measured in "squares" (100 sq ft each)</li>
                  <li><strong>Material:</strong> From basic shingles to premium slate</li>
                  <li><strong>Pitch:</strong> Steeper roofs require more labor</li>
                  <li><strong>Complexity:</strong> Valleys, dormers, and penetrations add cost</li>
                  <li><strong>Location:</strong> Labor rates vary by region</li>
                  <li><strong>Tear-off:</strong> Removing old roofing adds cost</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3">Why Estimates Vary</h3>
                <p className="text-slate-600 mb-4">
                  This calculator provides a general estimate based on national averages.
                  Your actual cost may differ due to:
                </p>
                <ul className="space-y-1 text-slate-600 text-sm">
                  <li>- Current material prices in your area</li>
                  <li>- Local contractor availability and rates</li>
                  <li>- Roof accessibility and complexity</li>
                  <li>- Permit and inspection requirements</li>
                  <li>- Structural repairs needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location CTAs */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Get Local Pricing for Your City
            </h2>
            <p className="text-slate-600 mb-8">
              We provide location-specific estimates for major cities across the US.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/roof-estimate/charlotte-nc" className="px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-colors text-sm">Charlotte, NC</Link>
              <Link href="/roof-estimate/lake-norman-nc" className="px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-colors text-sm">Lake Norman, NC</Link>
              <Link href="/roof-estimate/houston-tx" className="px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-colors text-sm">Houston, TX</Link>
              <Link href="/roof-estimate/dallas-tx" className="px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-colors text-sm">Dallas, TX</Link>
              <Link href="/roof-estimate/miami-fl" className="px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-colors text-sm">Miami, FL</Link>
              <Link href="/roof-estimate/phoenix-az" className="px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-colors text-sm">Phoenix, AZ</Link>
              <Link href="/roof-estimate/atlanta-ga" className="px-4 py-2 bg-white rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-colors text-sm">Atlanta, GA</Link>
              <Link href="/roof-estimate" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors text-sm">View All Cities</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-br from-orange-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want a More Accurate Estimate?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Our satellite-based tool measures your actual roof and provides pricing
            based on your specific property - not just averages.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors text-lg"
          >
            Get Your Free Satellite Estimate
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Get My Roof Estimate Now. All rights reserved.</p>
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
  );
}
