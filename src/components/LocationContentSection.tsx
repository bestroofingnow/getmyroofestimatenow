import { LocationContentSection as ContentSection } from '@/lib/locationContent';
import { BookOpen, Cloud, Home, Layers, DollarSign, Users } from 'lucide-react';

interface LocationContentProps {
  sections: ContentSection[];
  cityName: string;
}

const sectionIcons: Record<string, React.ReactNode> = {
  'roofing-guide': <BookOpen className="w-6 h-6" />,
  'climate-impact': <Cloud className="w-6 h-6" />,
  'neighborhoods': <Home className="w-6 h-6" />,
  'materials-guide': <Layers className="w-6 h-6" />,
  'cost-factors': <DollarSign className="w-6 h-6" />,
  'choosing-contractor': <Users className="w-6 h-6" />,
};

const sectionColors: Record<string, { bg: string; icon: string; border: string }> = {
  'roofing-guide': { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200' },
  'climate-impact': { bg: 'bg-cyan-50', icon: 'text-cyan-600', border: 'border-cyan-200' },
  'neighborhoods': { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-200' },
  'materials-guide': { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-200' },
  'cost-factors': { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200' },
  'choosing-contractor': { bg: 'bg-rose-50', icon: 'text-rose-600', border: 'border-rose-200' },
};

function formatContent(content: string): React.ReactNode {
  // Split content into paragraphs
  const paragraphs = content.split('\n\n');

  return paragraphs.map((paragraph, index) => {
    // Check if it's a header (starts with **)
    if (paragraph.startsWith('**') && paragraph.includes('**:')) {
      const [header, ...rest] = paragraph.split('**:');
      const headerText = header.replace(/^\*\*/, '');
      return (
        <div key={index} className="mb-4">
          <h4 className="font-semibold text-slate-900 mb-1">{headerText}</h4>
          <p className="text-slate-600 leading-relaxed">{rest.join(':').trim()}</p>
        </div>
      );
    }

    // Check if it's a bold section header
    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
      return (
        <h4 key={index} className="font-semibold text-slate-900 mt-6 mb-3">
          {paragraph.replace(/\*\*/g, '')}
        </h4>
      );
    }

    // Check if it's a list (starts with •)
    if (paragraph.includes('\n•') || paragraph.startsWith('•')) {
      const items = paragraph.split('\n').filter(item => item.trim().startsWith('•'));
      return (
        <ul key={index} className="list-none space-y-2 my-4">
          {items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start gap-2 text-slate-600">
              <span className="text-blue-500 mt-1">•</span>
              <span className="leading-relaxed">
                {formatBoldText(item.replace(/^•\s*/, ''))}
              </span>
            </li>
          ))}
        </ul>
      );
    }

    // Regular paragraph with potential bold text
    return (
      <p key={index} className="text-slate-600 leading-relaxed mb-4">
        {formatBoldText(paragraph)}
      </p>
    );
  });
}

function formatBoldText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function LocationContentDisplay({ sections, cityName }: LocationContentProps) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Table of Contents */}
          <div className="bg-white rounded-2xl p-6 mb-12 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {cityName} Roofing Guide Contents
            </h2>
            <nav className="grid md:grid-cols-2 gap-3">
              {sections.map((section) => {
                const colors = sectionColors[section.id] || { bg: 'bg-slate-50', icon: 'text-slate-600', border: 'border-slate-200' };
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`flex items-center gap-3 p-3 rounded-xl ${colors.bg} ${colors.border} border hover:shadow-md transition-shadow`}
                  >
                    <span className={colors.icon}>
                      {sectionIcons[section.id]}
                    </span>
                    <span className="text-sm font-medium text-slate-700 line-clamp-1">
                      {section.title}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Content Sections */}
          {sections.map((section) => {
            const colors = sectionColors[section.id] || { bg: 'bg-slate-50', icon: 'text-slate-600', border: 'border-slate-200' };
            return (
              <article
                key={section.id}
                id={section.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-8 overflow-hidden scroll-mt-24"
              >
                <div className={`${colors.bg} ${colors.border} border-b px-6 py-4`}>
                  <div className="flex items-center gap-3">
                    <div className={`${colors.icon}`}>
                      {sectionIcons[section.id]}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  {formatContent(section.content)}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
