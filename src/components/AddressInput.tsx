'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';

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

interface AddressInputProps {
  onAddressSelect: (address: string, lat: number, lng: number, placeDetails: PlaceDetails) => void;
  isLoading?: boolean;
}

export function AddressInput({ onAddressSelect, isLoading = false }: AddressInputProps) {
  const [address, setAddress] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isGeocodingAddress, setIsGeocodingAddress] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState<PlaceDetails | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch autocomplete predictions from our server
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
    } catch (error) {
      console.error('Autocomplete error:', error);
      setPredictions([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    setSelectedIndex(-1);
    // Clear selected details when user modifies the address
    setSelectedPlaceDetails(null);

    // Debounce the API call
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      fetchPredictions(value);
    }, 300);
  };

  // Handle selection of a prediction
  const handleSelect = async (prediction: Prediction) => {
    setAddress(prediction.description);
    setShowDropdown(false);
    setPredictions([]);

    try {
      const res = await fetch(`/api/places-details?place_id=${encodeURIComponent(prediction.place_id)}`);
      const details: PlaceDetails = await res.json();

      if (details.lat && details.lng) {
        // Store the selected details for button click
        setSelectedPlaceDetails(details);
        // Immediately trigger the address selection (navigate)
        onAddressSelect(details.formatted_address, details.lat, details.lng, details);
      }
    } catch (error) {
      console.error('Place details error:', error);
    }
  };

  // Handle Get Estimate button click - uses geocoding if no address selected from dropdown
  const handleButtonClick = async () => {
    if (!address.trim()) return;

    // If we already have selected place details, use them
    if (selectedPlaceDetails) {
      onAddressSelect(
        selectedPlaceDetails.formatted_address,
        selectedPlaceDetails.lat,
        selectedPlaceDetails.lng,
        selectedPlaceDetails
      );
      return;
    }

    // Otherwise, try to geocode the typed address
    setIsGeocodingAddress(true);
    try {
      const res = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
      const data = await res.json();

      if (data.lat && data.lng) {
        const details: PlaceDetails = {
          formatted_address: data.formatted_address || address,
          lat: data.lat,
          lng: data.lng,
          city: data.city || '',
          state: data.state || '',
          postalCode: data.postalCode || '',
        };
        setSelectedPlaceDetails(details);
        onAddressSelect(details.formatted_address, details.lat, details.lng, details);
      } else {
        // If geocoding fails, show an alert
        alert('Could not find that address. Please select an address from the dropdown suggestions.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Could not find that address. Please select an address from the dropdown suggestions.');
    } finally {
      setIsGeocodingAddress(false);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || predictions.length === 0) return;

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
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => predictions.length > 0 && setShowDropdown(true)}
          placeholder="Enter your home address..."
          disabled={isLoading}
          autoComplete="off"
          className="w-full pl-12 pr-32 py-4 text-lg border-2 border-slate-200 rounded-xl
                     focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                     disabled:bg-slate-50 disabled:cursor-not-allowed
                     transition-all duration-200 outline-none"
        />
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={!address || isLoading || isGeocodingAddress}
            className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg
                       hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed
                       transition-colors duration-200 flex items-center gap-2"
          >
            {isLoading || isGeocodingAddress ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : isSearching ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Searching...</span>
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

      {/* Autocomplete Dropdown */}
      {showDropdown && predictions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden"
        >
          {predictions.map((prediction, index) => (
            <button
              key={prediction.place_id}
              type="button"
              onClick={() => handleSelect(prediction)}
              className={`w-full px-4 py-3 text-left flex items-start gap-3 transition-colors
                ${index === selectedIndex ? 'bg-blue-50' : 'hover:bg-slate-50'}
                ${index !== 0 ? 'border-t border-slate-100' : ''}`}
            >
              <MapPin className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-slate-900">{prediction.main_text}</div>
                <div className="text-sm text-slate-500">{prediction.secondary_text}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      <p className="text-sm text-slate-500 mt-2 text-center">
        Start typing your address and select from the dropdown
      </p>
    </div>
  );
}
