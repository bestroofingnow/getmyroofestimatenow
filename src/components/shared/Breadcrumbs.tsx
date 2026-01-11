import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-3 px-4 bg-slate-50 border-b border-slate-200 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-600 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-1 text-slate-400" aria-hidden="true" />
            )}
            {index === 0 && (
              <Home className="w-4 h-4 mr-1 text-slate-400" aria-hidden="true" />
            )}
            {index === items.length - 1 ? (
              <span
                aria-current="page"
                className="text-slate-900 font-medium truncate max-w-[200px]"
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="hover:text-emerald-600 transition-colors truncate max-w-[150px]"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
