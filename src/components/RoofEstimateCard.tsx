'use client';

import { RoofEstimate } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/calculations';
import { Home, Ruler, TrendingUp } from 'lucide-react';

interface RoofEstimateCardProps {
  estimate: RoofEstimate;
  address?: string;
}

const MATERIAL_COLORS = [
  { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', badge: 'bg-teal-600' },
  { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', badge: 'bg-slate-600' },
  { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-600' },
  { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-600' },
];

export function RoofEstimateCard({ estimate, address }: RoofEstimateCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-1">Your Roof Estimate</h2>
        {address && (
          <p className="text-emerald-100 flex items-center gap-2">
            <Home className="w-4 h-4" />
            {address}
          </p>
        )}
      </div>

      {/* Roof Details */}
      <div className="p-6 bg-gradient-to-b from-slate-50 to-white border-b">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <Ruler className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
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

      {/* Disclaimer */}
      <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> This is an automated estimate based on satellite imagery.
          Final pricing may vary based on material selection, roof complexity, and local factors.
          A roofing specialist will contact you to provide a detailed quote.
        </p>
      </div>
    </div>
  );
}
