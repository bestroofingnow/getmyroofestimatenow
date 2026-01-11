'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, Gift, Clock, MapPin, Search, Loader2 } from 'lucide-react';

interface ExitIntentPopupProps {
  delay?: number;
}

interface Prediction {
  place_id: string;
  description: string;
  main_text: string;
  secondary_text: string;
}

interface PlaceDetails {
  formatted_address: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
  postalCode: string;
}

export function ExitIntentPopup({ delay = 5000 }: ExitIntentPopupProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  // Address form state
  const [address, setAddress] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState<PlaceDetails | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Mark as shown with timestamp - expires after 24 hours
    const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
    localStorage.setItem('exitPopupShown', expiryTime.toString());
  }, []);

  useEffect(() => {
    // Check if popup was already shown today (within 24 hours)
    const storedExpiry = localStorage.getItem('exitPopupShown');
    if (storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);
      if (Date.now() < expiryTime) {
        // Still within 24-hour window, don't show popup
        return;
      }
      // Expired, remove the old entry
      localStorage.removeItem('exitPopupShown');
    }

    const enableTimer = setTimeout(() => {
      setIsEnabled(true);
    }, delay);

    return () => clearTimeout(enableTimer);
  }, [delay]);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isVisible) {
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [isEnabled, isVisible]);

  // Escape key disabled - user must click X to close

  // Focus input when popup opens
  useEffect(() => {
    if (isVisible && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isVisible]);

  // Fetch autocomplete predictions
  const fetchPredictions = async (input: string) => {
    if (input.length < 3) {
      setPredictions([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`/api/places-autocomplete?input=${encodeURIComponent(input)}`);
      const data = await res.json();
      setPredictions(data.predictions || []);
      setShowDropdown(true);
    } catch {
      setPredictions([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    setSelectedIndex(-1);
    setSelectedPlaceDetails(null);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      fetchPredictions(value);
    }, 300);
  };

  const handleSelect = async (prediction: Prediction) => {
    setAddress(prediction.description);
    setShowDropdown(false);
    setPredictions([]);

    try {
      const res = await fetch(`/api/places-details?place_id=${encodeURIComponent(prediction.place_id)}`);
      const details: PlaceDetails = await res.json();

      if (details.lat && details.lng) {
        setSelectedPlaceDetails(details);
        // Auto-submit after selection
        handleSubmit(details);
      }
    } catch {
      // Error handling
    }
  };

  const handleSubmit = async (details?: PlaceDetails) => {
    const placeDetails = details || selectedPlaceDetails;

    if (!address.trim()) return;

    setIsSubmitting(true);

    try {
      let finalDetails = placeDetails;

      // If no place details, try geocoding
      if (!finalDetails) {
        const res = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
        const data = await res.json();

        if (data.lat && data.lng) {
          finalDetails = {
            formatted_address: data.formatted_address || address,
            lat: data.lat,
            lng: data.lng,
            city: data.city || '',
            state: data.state || '',
            postalCode: data.postalCode || '',
          };
        }
      }

      if (finalDetails) {
        // Store in session storage
        sessionStorage.setItem('addressData', JSON.stringify({
          address: finalDetails.formatted_address,
          lat: finalDetails.lat,
          lng: finalDetails.lng,
          city: finalDetails.city,
          state: finalDetails.state,
          postalCode: finalDetails.postalCode,
        }));

        // Close popup and navigate
        handleClose();
        router.push(`/calculating?address=${encodeURIComponent(finalDetails.formatted_address)}&lat=${finalDetails.lat}&lng=${finalDetails.lng}`);
      } else {
        alert('Please enter a valid address');
        setIsSubmitting(false);
      }
    } catch {
      alert('Could not find that address. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || predictions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < predictions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && predictions[selectedIndex]) {
          handleSelect(predictions[selectedIndex]);
        } else {
          handleSubmit();
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - no click to close, user must use X button */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-scale-in overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-800 px-6 py-6 text-white text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-full mb-3">
            <Gift className="w-7 h-7" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Wait! Get Your Free Quote
          </h2>
          <p className="text-blue-100">
            Enter your address for an instant roof estimate
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Address Form */}
          <div className="relative mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-slate-400" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={address}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => predictions.length > 0 && setShowDropdown(true)}
                placeholder="Enter your home address..."
                disabled={isSubmitting}
                autoComplete="off"
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all duration-200 outline-none"
              />
            </div>

            {/* Autocomplete Dropdown */}
            {showDropdown && predictions.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden max-h-48 overflow-y-auto"
              >
                {predictions.map((prediction, index) => (
                  <button
                    key={prediction.place_id}
                    type="button"
                    onClick={() => handleSelect(prediction)}
                    className={`w-full px-4 py-3 text-left flex items-start gap-3 transition-colors ${index === selectedIndex ? 'bg-orange-50' : 'hover:bg-slate-50'} ${index !== 0 ? 'border-t border-slate-100' : ''}`}
                  >
                    <MapPin className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm">{prediction.main_text}</div>
                      <div className="text-xs text-slate-500">{prediction.secondary_text}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={!address.trim() || isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Getting Estimate...</span>
              </>
            ) : isSearching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Get My Free Estimate</span>
              </>
            )}
          </button>

          {/* Benefits */}
          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-1">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs text-slate-600">100% Free</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-xs text-slate-600">60 Seconds</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xs text-slate-600">No Obligation</span>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            Join 10,000+ homeowners who've saved on their roofs
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
