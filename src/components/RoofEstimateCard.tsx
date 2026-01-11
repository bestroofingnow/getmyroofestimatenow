'use client';

import { RoofEstimate } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/calculations';
import { Home, Ruler, TrendingUp, MapPin, TrendingDown, Minus, Info } from 'lucide-react';

interface RoofEstimateCardProps {
  estimate: RoofEstimate;
  address?: string;
}

const MATERIAL_COLORS = [
  { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-600' },
  { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', badge: 'bg-slate-600' },
  { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-600' },
  { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-600' },
];

export function RoofEstimateCard({ estimate, address }: RoofEstimateCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-1">Your Roof Estimate</h2>
        {address && (
          <p className="text-blue-100 flex items-center gap-2">
            <Home className="w-4 h-4" />
            {address}
          </p>
        )}
      </div>

      {/* Roof Details */}
      <div className="p-6 bg-gradient-to-b from-slate-50 to-white border-b">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <Ruler className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Roof Area</p>
            <p className="text-lg font-bold text-slate-800">{formatNumber(estimate.roofSqFt)} sq ft</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Roof Pitch</p>
            <p className="text-lg font-bold text-slate-800">{estimate.pitchRatio}</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <Home className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Squares</p>
            <p className="text-lg font-bold text-slate-800">{estimate.squares}</p>
          </div>
        </div>
      </div>

      {/* Material Packages */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
          Choose Your Roofing Material
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {estimate.materialEstimates.map((material, index) => {
            const colors = MATERIAL_COLORS[index % MATERIAL_COLORS.length];
            return (
              <div
                key={material.name}
                className={`${colors.bg} ${colors.border} border-2 rounded-xl p-4`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-semibold ${colors.text}`}>{material.name}</h4>
                  <span className={`${colors.badge} text-white text-xs px-2 py-1 rounded-full`}>
                    ${material.pricePerSqFt.low}-${material.pricePerSqFt.high}/sf
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/70 rounded-lg p-2">
                    <p className="text-xs text-slate-500 uppercase">Low</p>
                    <p className={`text-sm font-bold ${colors.text}`}>
                      {formatCurrency(material.estimate.low)}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm ring-2 ring-offset-1 ring-slate-200">
                    <p className="text-xs text-slate-600 uppercase font-medium">Mid</p>
                    <p className={`text-base font-bold ${colors.text}`}>
                      {formatCurrency(material.estimate.mid)}
                    </p>
                  </div>
                  <div className="bg-white/70 rounded-lg p-2">
                    <p className="text-xs text-slate-500 uppercase">High</p>
                    <p className={`text-sm font-bold ${colors.text}`}>
                      {formatCurrency(material.estimate.high)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Regional Pricing Info */}
      {estimate.regionalPricing && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-slate-800">Local Market Pricing</span>
                {estimate.regionalPricing.multiplier > 1.05 ? (
                  <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {Math.round((estimate.regionalPricing.multiplier - 1) * 100)}% above avg
                  </span>
                ) : estimate.regionalPricing.multiplier < 0.95 ? (
                  <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    <TrendingDown className="w-3 h-3" />
                    {Math.round((1 - estimate.regionalPricing.multiplier) * 100)}% below avg
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    <Minus className="w-3 h-3" />
                    National avg
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600">
                {estimate.regionalPricing.marketDemand === 'very_high' && (
                  <>Very high contractor demand in your area. Book early for best rates.</>
                )}
                {estimate.regionalPricing.marketDemand === 'high' && (
                  <>High contractor demand. Multiple quotes recommended.</>
                )}
                {estimate.regionalPricing.marketDemand === 'moderate' && (
                  <>Average market conditions with competitive pricing.</>
                )}
                {estimate.regionalPricing.marketDemand === 'low' && (
                  <>Lower demand market - competitive pricing available.</>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            This estimate uses satellite imagery and local market data for your area.
            Final pricing may vary based on roof accessibility, material selection, and specific conditions.
            A roofing specialist will contact you with a detailed quote.
          </p>
        </div>
      </div>
    </div>
  );
}
