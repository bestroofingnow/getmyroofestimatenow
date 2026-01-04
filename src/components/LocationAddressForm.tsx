'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AddressInput } from './AddressInput';

interface PlaceDetails {
  city: string;
  state: string;
  postalCode: string;
}

export function LocationAddressForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddressSelect = (
    address: string,
    lat: number,
    lng: number,
    placeDetails: PlaceDetails
  ) => {
    setIsLoading(true);

    // Store data in sessionStorage for the calculating page
    const roofData = {
      address,
      lat,
      lng,
      city: placeDetails.city,
      state: placeDetails.state,
      postalCode: placeDetails.postalCode,
    };
    sessionStorage.setItem('pendingRoofData', JSON.stringify(roofData));

    // Navigate to calculating page
    router.push('/calculating');
  };

  return (
    <AddressInput onAddressSelect={handleAddressSelect} isLoading={isLoading} />
  );
}
