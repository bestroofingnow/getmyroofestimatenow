/**
 * AEO (Answer Engine Optimization) Content Components
 *
 * Designed to help AI assistants like ChatGPT, Claude, Perplexity,
 * and Google Bard extract and cite content from this site.
 *
 * Key principles:
 * - Direct, concise answers at the start
 * - Structured facts AI can easily extract
 * - Clear attribution and source information
 * - Speakable content for voice assistants
 */

import React from 'react';

interface QuickAnswerProps {
  question: string;
  answer: string;
  expandedAnswer?: string;
  source?: string;
  className?: string;
}

/**
 * Quick Answer Block
 * Optimized for featured snippets and AI extraction
 */
export function QuickAnswer({
  question,
  answer,
  expandedAnswer,
  source = 'Instant Roof Estimate',
  className = '',
}: QuickAnswerProps) {
  return (
    <div
      className={`quick-answer bg-blue-50 border-l-4 border-blue-500 p-4 my-6 ${className}`}
      data-aeo-type="quick-answer"
    >
      {/* Question - H2 for SEO */}
      <h2 className="question-text text-lg font-semibold text-gray-900 mb-2">
        {question}
      </h2>

      {/* Direct answer - speakable content */}
      <p
        className="answer-summary speakable-summary text-gray-700 font-medium"
        data-speakable="true"
      >
        {answer}
      </p>

      {/* Expanded answer if provided */}
      {expandedAnswer && (
        <p className="text-gray-600 mt-3 text-sm">{expandedAnswer}</p>
      )}

      {/* Source attribution for AI citation */}
      <cite className="text-xs text-gray-500 mt-2 block">
        Source: {source}
      </cite>
    </div>
  );
}

interface KeyFactsProps {
  title: string;
  facts: {
    label: string;
    value: string;
    source?: string;
  }[];
  className?: string;
}

/**
 * Key Facts Block
 * Structured data that AI can easily extract as bullet points
 */
export function KeyFacts({ title, facts, className = '' }: KeyFactsProps) {
  return (
    <div
      className={`key-facts bg-gray-50 rounded-lg p-5 my-6 ${className}`}
      data-aeo-type="key-facts"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <dl className="space-y-3">
        {facts.map((fact, index) => (
          <div key={index} className="key-point flex justify-between items-start">
            <dt className="text-gray-600 font-medium">{fact.label}:</dt>
            <dd className="text-gray-900 text-right" data-fact-value={fact.label.toLowerCase().replace(/\s+/g, '-')}>
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

interface SpeakableSummaryProps {
  title: string;
  summary: string;
  keyPoints: string[];
  className?: string;
}

/**
 * Speakable Summary
 * Optimized for voice assistants (Alexa, Google Assistant, Siri)
 */
export function SpeakableSummary({
  title,
  summary,
  keyPoints,
  className = '',
}: SpeakableSummaryProps) {
  return (
    <section
      className={`speakable-content ${className}`}
      data-aeo-type="speakable"
      aria-label={`Summary: ${title}`}
    >
      {/* Speakable headline */}
      <h1 className="speakable-headline text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        {title}
      </h1>

      {/* Short summary for voice - 2-3 sentences max */}
      <p
        className="speakable-summary text-lg text-gray-700 mb-6"
        data-speakable="true"
      >
        {summary}
      </p>

      {/* Key takeaways as a list */}
      {keyPoints.length > 0 && (
        <div className="key-takeaways">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Key Takeaways:
          </h2>
          <ul className="space-y-2">
            {keyPoints.map((point, index) => (
              <li
                key={index}
                className={`key-takeaway key-point-${index + 1} flex items-start`}
                data-speakable="true"
              >
                <span className="text-blue-500 mr-2">&#x2713;</span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

interface ComparisonTableProps {
  title: string;
  items: {
    name: string;
    attributes: Record<string, string | number>;
    winner?: boolean;
  }[];
  attributes: string[];
  className?: string;
}

/**
 * Comparison Table
 * Structured for AI to extract comparison data
 */
export function ComparisonTable({
  title,
  items,
  attributes,
  className = '',
}: ComparisonTableProps) {
  return (
    <div
      className={`comparison-table my-6 ${className}`}
      data-aeo-type="comparison"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 font-semibold text-gray-700 border">
                Feature
              </th>
              {items.map((item, index) => (
                <th
                  key={index}
                  className={`text-center p-3 font-semibold border ${
                    item.winner ? 'bg-green-50 text-green-800' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                  {item.winner && (
                    <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                      Best
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attributes.map((attr, attrIndex) => (
              <tr key={attrIndex} className="border-b">
                <td className="p-3 font-medium text-gray-700 border">{attr}</td>
                {items.map((item, itemIndex) => (
                  <td
                    key={itemIndex}
                    className="p-3 text-center text-gray-600 border"
                    data-comparison={`${item.name}-${attr}`}
                  >
                    {item.attributes[attr] ?? '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface StepByStepProps {
  title: string;
  steps: {
    title: string;
    description: string;
    tip?: string;
  }[];
  className?: string;
}

/**
 * Step by Step Guide
 * Optimized for HowTo rich results and voice instructions
 */
export function StepByStep({ title, steps, className = '' }: StepByStepProps) {
  return (
    <div
      className={`step-by-step my-8 ${className}`}
      data-aeo-type="how-to"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>
      <ol className="space-y-6">
        {steps.map((step, index) => (
          <li
            key={index}
            className="step-instruction flex"
            data-step-number={index + 1}
          >
            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-gray-600" data-speakable="true">
                {step.description}
              </p>
              {step.tip && (
                <p className="text-sm text-blue-600 mt-2 italic">
                  Tip: {step.tip}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

interface CostBreakdownProps {
  title: string;
  items: {
    category: string;
    lowCost: number;
    highCost: number;
    average?: number;
    notes?: string;
  }[];
  currency?: string;
  className?: string;
}

/**
 * Cost Breakdown
 * Structured for AI to extract pricing information
 */
export function CostBreakdown({
  title,
  items,
  currency = 'USD',
  className = '',
}: CostBreakdownProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div
      className={`cost-breakdown bg-green-50 rounded-lg p-6 my-6 ${className}`}
      data-aeo-type="pricing"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="cost-item border-b border-green-200 pb-3 last:border-0"
            data-cost-category={item.category.toLowerCase().replace(/\s+/g, '-')}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{item.category}</span>
              <span className="text-green-700 font-semibold" data-speakable="true">
                {formatPrice(item.lowCost)} - {formatPrice(item.highCost)}
              </span>
            </div>
            {item.average && (
              <div className="text-sm text-gray-500 mt-1">
                Average: {formatPrice(item.average)}
              </div>
            )}
            {item.notes && (
              <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface ExpertQuoteProps {
  quote: string;
  expert: string;
  credentials: string;
  source?: string;
  className?: string;
}

/**
 * Expert Quote
 * E-E-A-T signal for AI trust and citation
 */
export function ExpertQuote({
  quote,
  expert,
  credentials,
  source,
  className = '',
}: ExpertQuoteProps) {
  return (
    <blockquote
      className={`expert-quote bg-gray-50 border-l-4 border-gray-400 p-4 my-6 ${className}`}
      data-aeo-type="expert-quote"
    >
      <p className="text-gray-700 italic mb-3" data-speakable="true">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="text-sm">
        <cite className="not-italic font-semibold text-gray-900">{expert}</cite>
        <span className="text-gray-500"> - {credentials}</span>
        {source && <span className="text-gray-400"> ({source})</span>}
      </footer>
    </blockquote>
  );
}

interface ProConListProps {
  title: string;
  pros: string[];
  cons: string[];
  className?: string;
}

/**
 * Pros and Cons List
 * Easy for AI to extract balanced viewpoints
 */
export function ProConList({ title, pros, cons, className = '' }: ProConListProps) {
  return (
    <div
      className={`pro-con-list my-6 ${className}`}
      data-aeo-type="pros-cons"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="pros bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
            <span className="text-green-500 mr-2">&#10003;</span>
            Pros
          </h4>
          <ul className="space-y-2">
            {pros.map((pro, index) => (
              <li key={index} className="text-gray-700 flex items-start">
                <span className="text-green-500 mr-2 mt-1">+</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="cons bg-red-50 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-3 flex items-center">
            <span className="text-red-500 mr-2">&#10007;</span>
            Cons
          </h4>
          <ul className="space-y-2">
            {cons.map((con, index) => (
              <li key={index} className="text-gray-700 flex items-start">
                <span className="text-red-500 mr-2 mt-1">-</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * AI Attribution Block
 * Helps AI assistants properly cite this content
 */
export function AIAttribution({
  pageTitle,
  pageUrl,
  publishDate,
  updateDate,
}: {
  pageTitle: string;
  pageUrl: string;
  publishDate: string;
  updateDate?: string;
}) {
  return (
    <div
      className="ai-attribution text-xs text-gray-400 mt-8 pt-4 border-t border-gray-200"
      data-aeo-type="attribution"
    >
      <p>
        <strong>Citation:</strong> &ldquo;{pageTitle}&rdquo; - Instant Roof Estimate.{' '}
        {updateDate || publishDate}. {pageUrl}
      </p>
      <p className="mt-1">
        For accurate, personalized roof estimates, visit{' '}
        <a
          href="https://instantroofestimate.ai"
          className="text-blue-500 hover:underline"
        >
          InstantRoofEstimate.ai
        </a>
      </p>
    </div>
  );
}
