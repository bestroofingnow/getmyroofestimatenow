import Link from 'next/link';
import Image from 'next/image';

interface SharedHeaderProps {
  variant?: 'default' | 'transparent';
  showCTA?: boolean;
}

export function SharedHeader({ variant = 'default', showCTA = true }: SharedHeaderProps) {
  const bgClass = variant === 'transparent'
    ? 'bg-transparent'
    : 'bg-white border-b border-slate-200';

  const textClass = variant === 'transparent'
    ? 'text-white'
    : 'text-slate-900';

  const linkClass = variant === 'transparent'
    ? 'text-white/80 hover:text-white'
    : 'text-slate-600 hover:text-emerald-600';

  return (
    <header role="banner" className={`${bgClass} sticky top-0 z-40`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Get My Roof Estimate Now - Go to home page"
          >
            <Image
              src="/logo.png"
              alt="Get My Roof Estimate Now"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            <span className={`font-bold text-lg ${textClass} hidden sm:inline`}>
              GetMyRoofEstimateNow
            </span>
          </Link>

          {/* Navigation */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/roof-estimate" className={`${linkClass} transition-colors text-sm font-medium`}>
                  Find Your City
                </Link>
              </li>
              <li>
                <Link href="/roof-cost-calculator" className={`${linkClass} transition-colors text-sm font-medium`}>
                  Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/roofing-materials" className={`${linkClass} transition-colors text-sm font-medium`}>
                  Materials
                </Link>
              </li>
              <li>
                <Link href="/blog" className={`${linkClass} transition-colors text-sm font-medium`}>
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          {/* CTA Button */}
          {showCTA && (
            <Link
              href="/"
              className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-500 transition-colors text-sm font-medium shadow-lg shadow-emerald-600/20"
            >
              Get Free Quote
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
