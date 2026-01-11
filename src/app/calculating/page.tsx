'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FactCarousel } from '@/components/FactCarousel';
import { CalculationProgress } from '@/components/CalculationProgress';
import { LeadCaptureForm, LeadFormData } from '@/components/LeadCaptureForm';
import { SatellitePreview } from '@/components/SatellitePreview';
import { RoofEstimate } from '@/types';
import { MapPin, ArrowLeft } from 'lucide-react';

function CalculatingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const address = searchParams.get('address') || '';
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [roofData, setRoofData] = useState<RoofEstimate | null>(null);
  const [apiComplete, setApiComplete] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LeadFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch roof data after address is confirmed
  useEffect(() => {
    async function fetchData() {
      if (!lat || !lng || !addressConfirmed) {
        return;
      }

      try {
        // Get location data from session storage for regional pricing
        const addressDataStr = sessionStorage.getItem('addressData');
        const addressData = addressDataStr ? JSON.parse(addressDataStr) : {};

        const res = await fetch('/api/roof-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            state: addressData.state || '',
            city: addressData.city || '',
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to fetch roof data');
        }

        const data = await res.json();
        setRoofData(data);
        setApiComplete(true);
      } catch (error) {
        console.error('Failed to fetch roof data:', error);
        setApiError('Unable to analyze this property. Please try a different address.');
      }
    }

    fetchData();
  }, [lat, lng, addressConfirmed]);

  // Handle address confirmation
  const handleAddressConfirm = () => {
    setAddressConfirmed(true);
  };

  // Handle address rejection - go back to home
  const handleAddressReject = () => {
    router.push('/');
  };

  // Handle form submission + redirect
  async function handleFormSubmit(data: LeadFormData) {
    setFormData(data);

    // If API is already complete, proceed with submission
    if (apiComplete && roofData) {
      await submitAndRedirect(data, roofData);
    }
    // Otherwise, the useEffect below will handle it when API completes
  }

  // Watch for both form data and API completion
  useEffect(() => {
    if (formData && apiComplete && roofData && !isSubmitting) {
      submitAndRedirect(formData, roofData);
    }
  }, [apiComplete, formData, roofData, isSubmitting]); // eslint-disable-line react-hooks/exhaustive-deps

  async function submitAndRedirect(data: LeadFormData, estimate: RoofEstimate) {
    setIsSubmitting(true);

    try {
      // Get additional address data from session storage
      const addressDataStr = sessionStorage.getItem('addressData');
      const addressData = addressDataStr ? JSON.parse(addressDataStr) : {};

      // Submit lead to GHL
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          address,
          city: addressData.city || '',
          state: addressData.state || '',
          postalCode: addressData.postalCode || '',
          roofData: estimate,
        }),
      });

      // Store estimate in session storage for results page
      sessionStorage.setItem('roofEstimate', JSON.stringify({
        ...estimate,
        address,
      }));

      // Navigate to results
      router.push('/estimate/results');
    } catch (error) {
      console.error('Failed to submit lead:', error);
      // Still redirect even if lead submission fails
      sessionStorage.setItem('roofEstimate', JSON.stringify({
        ...roofData,
        address,
      }));
      router.push('/estimate/results');
    }
  }

  // Determine button text based on state
  const getButtonText = () => {
    if (isSubmitting) return 'Preparing Your Estimate...';
    if (apiComplete) return 'View My Free Estimate';
    if (formData) return 'Calculating...';
    return 'Get My Estimate';
  };

  // Handle missing location data
  if (!lat || !lng) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Missing Location Data</h1>
          <p className="text-slate-600 mb-6">Please try entering your address again.</p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </main>
    );
  }

  // Handle error state
  if (apiError) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Oops! Something Went Wrong</h1>
          <p className="text-slate-600 mb-6">{apiError}</p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Try Another Address
          </button>
        </div>
      </main>
    );
  }

  // Step 1: Show satellite preview for address confirmation
  if (!addressConfirmed) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Confirm Your Property
            </h1>
            <p className="text-slate-600 max-w-xl mx-auto">
              Before we calculate your estimate, please verify this is the correct property.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <SatellitePreview
              lat={parseFloat(lat)}
              lng={parseFloat(lng)}
              address={address}
              onConfirm={handleAddressConfirm}
              onReject={handleAddressReject}
            />
          </div>
        </div>
      </main>
    );
  }

  // Step 2: Show calculation progress and lead form
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Calculating Your Estimate
          </h1>
          <div className="inline-flex items-center gap-2 text-slate-600 bg-white px-4 py-2 rounded-full shadow-sm">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span className="text-sm md:text-base">{address}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Progress + Facts */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="font-semibold text-lg mb-6 text-slate-800 flex items-center gap-2">
                <span className="text-2xl">🛰️</span>
                Analyzing Your Roof
              </h3>
              <CalculationProgress isComplete={apiComplete} />

              {apiComplete && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="text-xl">✅</span>
                    <span className="font-medium">Analysis Complete!</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    Fill out the form to view your detailed estimate.
                  </p>
                </div>
              )}
            </div>

            {/* Facts Carousel */}
            <div className="relative">
              <FactCarousel />
            </div>

            {/* Mobile: Show mini stats if API complete */}
            {apiComplete && roofData && (
              <div className="lg:hidden bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-emerald-600">Roof Size</p>
                    <p className="text-lg font-bold text-emerald-900">{roofData.roofSqFt.toLocaleString()} sq ft</p>
                  </div>
                  <div>
                    <p className="text-sm text-emerald-600">Est. Range</p>
                    <p className="text-lg font-bold text-emerald-900">
                      ${roofData.estimate.low.toLocaleString()} - ${roofData.estimate.high.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Lead Capture Form */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  Almost there! 🎉
                </h3>
                <p className="text-slate-600">
                  While we crunch the numbers, tell us where to send your detailed estimate:
                </p>
              </div>

              <LeadCaptureForm
                address={address}
                onSubmit={handleFormSubmit}
                isLoading={isSubmitting}
                buttonText={getButtonText()}
                disabled={isSubmitting}
              />

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <span>🔒</span>
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>✉️</span>
                    <span>No Spam</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💯</span>
                    <span>100% Free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CalculatingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </main>
    }>
      <CalculatingContent />
    </Suspense>
  );
}
