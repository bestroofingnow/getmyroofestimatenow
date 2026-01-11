import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roof Cost Calculator | Estimate Your Roof Replacement Cost',
  description: 'Free roof cost calculator. Estimate your roof replacement cost based on size, materials, pitch, and location. Get instant results for asphalt, metal, tile, and slate roofing.',
  keywords: [
    'roof cost calculator',
    'roof replacement calculator',
    'roofing cost estimator',
    'new roof cost calculator',
    'roof price calculator',
    'roofing estimate calculator',
    'shingle roof cost',
    'metal roof cost calculator',
  ],
  openGraph: {
    title: 'Roof Cost Calculator | Estimate Your Roof Replacement Cost',
    description: 'Free roof cost calculator. Estimate your roof replacement cost based on size, materials, and location.',
    type: 'website',
    url: 'https://getmyroofestimatenow.com/roof-cost-calculator',
  },
  alternates: {
    canonical: 'https://getmyroofestimatenow.com/roof-cost-calculator',
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
