'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RoofEstimateCard } from '@/components/RoofEstimateCard';
import { RoofEstimate } from '@/types';
import { Phone, Mail, CheckCircle, ArrowLeft, Home } from 'lucide-react';

export default function ResultsPage() {
  const router = useRouter();
  const [estimate, setEstimate] = useState<RoofEstimate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get estimate from session storage
    const storedEstimate = sessionStorage.getItem('roofEstimate');

    if (storedEstimate) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setEstimate(JSON.parse(storedEstimate));
      } catch (error) {
        console.error('Failed to parse estimate:', error);
      }
    }

     
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your estimate...</p>
        </div>
      </main>
    );
  }

  if (!estimate) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">🏠</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">No Estimate Found</h1>
          <p className="text-slate-600 mb-6">
            It looks like you haven&apos;t generated an estimate yet. Enter your address to get started.
          </p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Get My Estimate
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-4">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Estimate Complete!</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Your Roof Estimate is Ready
          </h1>
          <p className="text-green-100 text-lg">
            A roofing specialist will contact you within 24 hours
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Estimate Card */}
          <div className="mb-8">
            <RoofEstimateCard estimate={estimate} address={estimate.address} />
          </div>

          {/* What's Next Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">What Happens Next?</h2>

            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  title: "We'll Call You",
                  desc: "A local roofing specialist will call you within 24 hours to discuss your project.",
                  color: "blue",
                },
                {
                  icon: CheckCircle,
                  title: "Free Inspection",
                  desc: "Schedule a free, no-obligation roof inspection at your convenience.",
                  color: "green",
                },
                {
                  icon: Mail,
                  title: "Detailed Quote",
                  desc: "Receive a comprehensive quote with material options and warranty details.",
                  color: "purple",
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                    ${step.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      step.color === 'green' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'}`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{step.title}</h3>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Tips While You Wait
            </h2>
            <ul className="space-y-3 text-amber-800">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                Take photos of any visible damage or problem areas on your roof
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                Check your homeowner&apos;s insurance policy for coverage details
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                Make note of any specific concerns or questions you have
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                Review recent storms or weather events that may have caused damage
              </li>
            </ul>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Get Another Estimate
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-lg font-bold text-white mb-2">InstantRoofEstimate.ai</div>
          <p className="text-sm mb-4">Get accurate roof estimates in seconds.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div className="border-t border-slate-800 mt-6 pt-6 text-sm">
            <p>&copy; {new Date().getFullYear()} InstantRoofEstimate.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
