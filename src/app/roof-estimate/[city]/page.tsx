import { redirect } from 'next/navigation';
import { getLocationBySlug, getAllLocationSlugs } from '@/lib/locations';
import { getStateSlugByAbbr } from '@/lib/stateData';

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return getAllLocationSlugs().map((city) => ({ city }));
}

export default async function CityRedirectPage({ params }: PageProps) {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    // If not a valid city, let it 404
    redirect('/roof-estimate');
  }

  const stateSlug = getStateSlugByAbbr(location.stateAbbr);

  if (!stateSlug) {
    redirect('/roof-estimate');
  }

  // Permanent redirect to new URL structure
  redirect(`/roof-estimate/state/${stateSlug}/${city}`);
}
