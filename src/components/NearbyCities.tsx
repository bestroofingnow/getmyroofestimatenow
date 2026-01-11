import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { LocationData, formatCurrency } from '@/lib/locations';
import { getStateSlugByAbbr } from '@/lib/stateData';

interface NearbyCitiesProps {
  cities: LocationData[];
  currentCity: string;
  currentState: string;
}

export function NearbyCities({ cities, currentCity, currentState }: NearbyCitiesProps) {
  if (cities.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Roof Estimates in Nearby Cities
            </h2>
            <p className="text-slate-600">
              Looking for roofing services near {currentCity}? Check out estimates for these nearby areas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((city) => {
              const stateSlug = getStateSlugByAbbr(city.stateAbbr);
              return (
                <Link
                  key={city.slug}
                  href={`/roof-estimate/state/${stateSlug}/${city.slug}`}
                  className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-md border border-slate-200 hover:border-orange-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      <span className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                        {city.city}, {city.stateAbbr}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <div className="text-sm text-slate-600 mb-2">
                    Average roof cost:
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    {formatCurrency(city.avgRoofCost.low)} - {formatCurrency(city.avgRoofCost.high)}
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    {city.region}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/roof-estimate"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              View All Cities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Compact version for sidebar or smaller sections
export function NearbyCitiesCompact({ cities, currentCity }: { cities: LocationData[]; currentCity: string }) {
  if (cities.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-orange-600" />
        Nearby Cities
      </h3>
      <ul className="space-y-2">
        {cities.slice(0, 5).map((city) => {
          const stateSlug = getStateSlugByAbbr(city.stateAbbr);
          return (
            <li key={city.slug}>
              <Link
                href={`/roof-estimate/state/${stateSlug}/${city.slug}`}
                className="flex items-center justify-between text-sm text-slate-600 hover:text-orange-600 transition-colors py-1"
              >
                <span>{city.city}, {city.stateAbbr}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        href="/roof-estimate"
        className="block text-center text-sm text-orange-600 hover:text-orange-700 font-medium mt-4 pt-4 border-t border-slate-100"
      >
        View All Cities
      </Link>
    </div>
  );
}
