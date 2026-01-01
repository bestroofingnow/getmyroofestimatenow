'use client';

import { RoofEstimate } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/calculations';
import { Home, Ruler, TrendingUp, Calendar } from 'lucide-react';

interface RoofEstimateCardProps {
  estimate: RoofEstimate;
  address?: string;
}

export function RoofEstimateCard({ estimate, address }: RoofEstimateCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-1">Your Roof Estimate</h2>
        {address && (
          <p className="text-blue-100 flex items-center gap-2">
            <Home className="w-4 h-4" />
            {address}
          </p>
        )}
      </div>

      {/* Estimate Range */}
      <div className="p-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center mb-6">
          <p className="text-slate-600 mb-2">Estimated Replacement Cost</p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-sm text-slate-500">Low</p>
              <p className="text-2xl font-bold text-slate-700">{formatCurrency(estimate.estimate.low)}</p>
            </div>
            <div className="text-center px-6 py-2 bg-blue-50 rounded-xl border-2 border-blue-200">
              <p className="text-sm text-blue-600 font-medium">Average</p>
              <p className="text-3xl font-bold text-blue-700">{formatCurrency(estimate.estimate.mid)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500">High</p>
              <p className="text-2xl font-bold text-slate-700">{formatCurrency(estimate.estimate.high)}</p>
            </div>
          </div>
        </div>

        {/* Roof Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <Ruler className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Roof Area</p>
            <p className="text-lg font-bold text-slate-800">{formatNumber(estimate.roofSqFt)} sq ft</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Roof Pitch</p>
            <p className="text-lg font-bold text-slate-800">{estimate.pitchRatio}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <Home className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Squares</p>
            <p className="text-lg font-bold text-slate-800">{estimate.squares}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <Calendar className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Imagery Date</p>
            <p className="text-lg font-bold text-slate-800">{estimate.imageryDate || 'Recent'}</p>
          </div>
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
