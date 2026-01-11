import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Get My Roof Estimate Now collects, uses, and protects your personal information. Read our privacy policy for details on data handling and your rights.',
  alternates: {
    canonical: 'https://getmyroofestimatenow.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Get My Roof Estimate Now',
    description: 'Learn how we protect your personal information and handle your data.',
    url: 'https://getmyroofestimatenow.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://getmyroofestimatenow.com' },
          { name: 'Privacy Policy', url: 'https://getmyroofestimatenow.com/privacy-policy' },
        ]}
      />
      <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Information We Collect</h2>
            <p className="text-slate-600 mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Property address and location data</li>
              <li>Information about your roofing needs</li>
              <li>Communications you send to us</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Provide you with roof estimates and related services</li>
              <li>Connect you with qualified roofing contractors</li>
              <li>Communicate with you about our services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Information Sharing</h2>
            <p className="text-slate-600 mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Roofing contractors who may provide services to you</li>
              <li>Service providers who assist in our operations</li>
              <li>As required by law or to protect our rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. TCPA Consent</h2>
            <p className="text-slate-600 mb-4">
              By providing your phone number and checking the consent box, you agree to receive
              calls, text messages, and emails from us and our partner contractors regarding your
              roofing estimate and related services. You may opt out at any time by replying STOP
              to any text message or by contacting us directly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Data Security</h2>
            <p className="text-slate-600 mb-4">
              We implement appropriate security measures to protect your personal information.
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Your Rights</h2>
            <p className="text-slate-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Access your personal information</li>
              <li>Request correction of your information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Contact Us</h2>
            <p className="text-slate-600">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-slate-600 mt-2">
              Email: privacy@getmyroofestimatenow.com
            </p>
          </section>
        </div>
      </div>
    </main>
    </>
  );
}
