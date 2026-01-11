import Link from 'next/link';
import { MapPin, Home } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface SharedFooterProps {
  showStateLinks?: boolean;
  showCityLinks?: boolean;
}

const popularStates: FooterLink[] = [
  { label: 'Texas', href: '/roof-estimate/state/texas' },
  { label: 'Florida', href: '/roof-estimate/state/florida' },
  { label: 'California', href: '/roof-estimate/state/california' },
  { label: 'North Carolina', href: '/roof-estimate/state/north-carolina' },
  { label: 'Georgia', href: '/roof-estimate/state/georgia' },
  { label: 'Arizona', href: '/roof-estimate/state/arizona' },
  { label: 'Colorado', href: '/roof-estimate/state/colorado' },
  { label: 'Tennessee', href: '/roof-estimate/state/tennessee' },
];

const popularCities: FooterLink[] = [
  { label: 'Houston, TX', href: '/roof-estimate/state/texas/houston-tx' },
  { label: 'Dallas, TX', href: '/roof-estimate/state/texas/dallas-tx' },
  { label: 'Phoenix, AZ', href: '/roof-estimate/state/arizona/phoenix-az' },
  { label: 'Charlotte, NC', href: '/roof-estimate/state/north-carolina/charlotte-nc' },
  { label: 'Atlanta, GA', href: '/roof-estimate/state/georgia/atlanta-ga' },
  { label: 'Denver, CO', href: '/roof-estimate/state/colorado/denver-co' },
  { label: 'Miami, FL', href: '/roof-estimate/state/florida/miami-fl' },
  { label: 'Tampa, FL', href: '/roof-estimate/state/florida/tampa-fl' },
];

const quickLinks: FooterLink[] = [
  { label: 'Get Free Estimate', href: '/' },
  { label: 'Find Your City', href: '/roof-estimate' },
  { label: 'Cost Calculator', href: '/roof-cost-calculator' },
  { label: 'Roofing Materials', href: '/roofing-materials' },
  { label: 'Our Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
];

const legalLinks: FooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
];

export function SharedFooter({ showStateLinks = true, showCityLinks = true }: SharedFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-slate-900 text-slate-400">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-white">Get My Roof Estimate Now</span>
            </Link>
            <p className="text-sm mb-4">
              Get a free roof estimate in 60 seconds. We use space photos to measure your roof.
              No one needs to climb on your house.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Serving all 50 states
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <nav aria-label="Quick links">
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Popular States */}
          {showStateLinks && (
            <div>
              <h3 className="font-semibold text-white mb-4">Popular States</h3>
              <nav aria-label="State links">
                <ul className="space-y-2">
                  {popularStates.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Popular Cities */}
          {showCityLinks && (
            <div>
              <h3 className="font-semibold text-white mb-4">Popular Cities</h3>
              <nav aria-label="City links">
                <ul className="space-y-2">
                  {popularCities.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              &copy; {currentYear} Get My Roof Estimate Now. All rights reserved.
            </p>
            <nav aria-label="Legal links">
              <ul className="flex items-center gap-6">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
