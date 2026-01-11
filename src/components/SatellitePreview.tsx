'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle, XCircle, RefreshCw, MapPin } from 'lucide-react';

interface SatellitePreviewProps {
  lat: number;
  lng: number;
  address: string;
  onConfirm: () => void;
  onReject: () => void;
}

export function SatellitePreview({
  lat,
  lng,
  address,
  onConfirm,
  onReject,
}: SatellitePreviewProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use server-side proxy to hide API key from client
  const imageUrl = `/api/static-map?lat=${lat}&lng=${lng}`;

  if (imageError) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Satellite Preview Unavailable
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            We couldn&apos;t load the satellite image, but don&apos;t worry - we can still calculate your estimate.
          </p>
          <p className="text-slate-500 text-xs mb-6">
            Address: {address}
          </p>
          <button
            onClick={onConfirm}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Continue with This Address
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Is this your property?
        </h3>
        <p className="text-sm text-slate-600">
          Please confirm this is the correct location before we calculate your estimate.
        </p>
      </div>

      {/* Satellite Image */}
      <div className="relative aspect-[3/2] bg-slate-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-slate-400 animate-spin" />
          </div>
        )}
        <Image
          src={imageUrl}
          alt={`Satellite view of ${address}`}
          fill
          className={`object-cover transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImageError(true);
            setIsLoading(false);
          }}
          unoptimized // Required for external URLs
        />

        {/* Address overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center gap-2 text-white">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium truncate">{address}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 md:p-6 space-y-3">
        <button
          onClick={onConfirm}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          <CheckCircle className="w-5 h-5" />
          Yes, This is My Property
        </button>
        <button
          onClick={onReject}
          className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          <XCircle className="w-5 h-5" />
          No, Try a Different Address
        </button>
      </div>
    </div>
  );
}
