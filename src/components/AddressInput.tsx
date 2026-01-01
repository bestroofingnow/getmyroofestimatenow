'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';

interface AddressInputProps {
  onAddressSelect: (address: string, lat: number, lng: number, placeDetails: google.maps.places.PlaceResult) => void;
  isLoading?: boolean;
}

declare global {
  interface Window {
    google: typeof google;
    initGooglePlaces: () => void;
  }
}

export function AddressInput({ onAddressSelect, isLoading = false }: AddressInputProps) {
  const [address, setAddress] = useState('');
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const initAutocomplete = useCallback(() => {
    if (!inputRef.current || !window.google) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
      fields: ['formatted_address', 'geometry', 'address_components'],
    });

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();

      if (place?.geometry?.location && place.formatted_address) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setAddress(place.formatted_address);
        onAddressSelect(place.formatted_address, lat, lng, place);
      }
    });
  }, [onAddressSelect]);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google?.maps?.places) {
      setIsScriptLoaded(true);
      initAutocomplete();
      return;
    }

    // Load Google Maps script
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('Google API key not found');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsScriptLoaded(true);
      initAutocomplete();
    };

    script.onerror = () => {
      console.error('Failed to load Google Maps script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup listener if component unmounts
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [initAutocomplete]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-slate-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={isScriptLoaded ? "Enter your home address..." : "Loading..."}
          disabled={!isScriptLoaded || isLoading}
          className="w-full pl-12 pr-32 py-4 text-lg border-2 border-slate-200 rounded-xl
                     focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                     disabled:bg-slate-50 disabled:cursor-not-allowed
                     transition-all duration-200 outline-none"
        />
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
          <button
            type="button"
            disabled={!address || isLoading}
            className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg
                       hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed
                       transition-colors duration-200 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>Get Estimate</span>
              </>
            )}
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-500 mt-2 text-center">
        Start typing your address and select from the dropdown
      </p>
    </div>
  );
}
