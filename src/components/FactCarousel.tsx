'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Fact {
  icon: string;
  title: string;
  content: string;
}

const facts: Fact[] = [
  // Did You Know facts
  { icon: "🏠", title: "Did You Know?", content: "The average roof replacement takes just 1-3 days to complete." },
  { icon: "💰", title: "Did You Know?", content: "A new roof can increase your home's value by up to $15,000." },
  { icon: "🌡️", title: "Did You Know?", content: "Proper roof ventilation can reduce cooling costs by up to 30%." },
  { icon: "📋", title: "Did You Know?", content: "Insurance may cover storm damage replacement - always file a claim first." },
  { icon: "🏆", title: "Did You Know?", content: "Architectural shingles last 25-30 years vs 15-20 for 3-tab shingles." },
  { icon: "🛡️", title: "Did You Know?", content: "Most roof warranties last 25-50 years with proper installation." },
  { icon: "🌧️", title: "Did You Know?", content: "Your roof protects against 100+ inches of rain annually in some areas." },

  // DIY Tips
  { icon: "🔍", title: "DIY Tip", content: "Inspect your roof twice yearly - spring and fall - for early problem detection." },
  { icon: "🍂", title: "DIY Tip", content: "Clean gutters regularly to prevent water backup and roof edge damage." },
  { icon: "✂️", title: "DIY Tip", content: "Trim tree branches within 10 feet of your roof to prevent damage." },
  { icon: "🔦", title: "DIY Tip", content: "Check your attic for daylight, water stains, or sagging - signs of roof issues." },
  { icon: "🌬️", title: "DIY Tip", content: "Ensure attic vents are clear - proper airflow extends roof life significantly." },
  { icon: "❄️", title: "DIY Tip", content: "Proper insulation prevents ice buildup at roof edges in winter." },
];

export function FactCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % facts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 min-h-[180px] flex items-center border border-emerald-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="text-center w-full"
        >
          <span className="text-5xl mb-4 block">{facts[index].icon}</span>
          <h4 className="font-semibold text-emerald-900 mb-2 text-lg">{facts[index].title}</h4>
          <p className="text-emerald-800 leading-relaxed">{facts[index].content}</p>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {facts.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              i === index ? 'bg-emerald-500' : 'bg-emerald-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
