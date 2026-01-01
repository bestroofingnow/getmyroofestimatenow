import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | InstantRoofEstimate.ai',
  description: 'Terms of Service for InstantRoofEstimate.ai',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 mb-4">
              By accessing and using InstantRoofEstimate.ai, you accept and agree to be bound by
              these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Service Description</h2>
            <p className="text-slate-600 mb-4">
              InstantRoofEstimate.ai provides automated roof measurement and estimation services using
              satellite imagery and publicly available data. Our estimates are for informational purposes
              only and should not be considered as formal quotes or bids.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Estimate Accuracy</h2>
            <p className="text-slate-600 mb-4">
              While we strive for accuracy, our estimates are automated calculations based on satellite
              data and may not reflect actual conditions. Final pricing will be determined by the
              roofing contractor after an in-person inspection. We do not guarantee the accuracy of
              our estimates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. User Responsibilities</h2>
            <p className="text-slate-600 mb-4">
              You agree to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to circumvent any security measures</li>
              <li>Not use automated systems to access the service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Third-Party Contractors</h2>
            <p className="text-slate-600 mb-4">
              We may connect you with third-party roofing contractors. We are not responsible for
              the quality, pricing, or performance of any contractor. Any agreement between you and
              a contractor is solely between those parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-slate-600 mb-4">
              To the maximum extent permitted by law, InstantRoofEstimate.ai shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages arising from your
              use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Intellectual Property</h2>
            <p className="text-slate-600 mb-4">
              All content, features, and functionality of our website are owned by InstantRoofEstimate.ai
              and are protected by intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Changes to Terms</h2>
            <p className="text-slate-600 mb-4">
              We reserve the right to modify these terms at any time. Continued use of the service
              after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Governing Law</h2>
            <p className="text-slate-600 mb-4">
              These terms shall be governed by the laws of the United States, without regard to
              conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Contact Us</h2>
            <p className="text-slate-600">
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-slate-600 mt-2">
              Email: legal@instantroofestimate.ai
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
