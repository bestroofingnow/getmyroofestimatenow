import { redirect } from 'next/navigation';
import { neighborhoods, getNeighborhood } from '@/lib/neighborhoods';
import { getStateSlugByAbbr } from '@/lib/stateData';

interface PageProps {
  params: Promise<{ city: string; neighborhood: string }>;
}

export async function generateStaticParams() {
  return neighborhoods.map((neighborhood) => ({
    city: neighborhood.citySlug,
    neighborhood: neighborhood.slug,
  }));
}

export default async function NeighborhoodRedirectPage({ params }: PageProps) {
  const { city, neighborhood: neighborhoodSlug } = await params;
  const neighborhoodData = getNeighborhood(neighborhoodSlug, city);

  if (!neighborhoodData) {
    redirect('/roof-estimate');
  }

  const stateSlug = getStateSlugByAbbr(neighborhoodData.stateAbbr);

  if (!stateSlug) {
    redirect('/roof-estimate');
  }

  // Permanent redirect to new URL structure
  redirect(`/roof-estimate/state/${stateSlug}/${city}/${neighborhoodSlug}`);
}
