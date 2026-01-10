/**
 * Google Gemini AI Content Generation
 *
 * Generates SEO and AEO optimized blog content:
 * - 5th grade reading level
 * - Includes internal linking opportunities
 * - Structured for featured snippets
 * - Voice search optimized
 *
 * Setup:
 * 1. Get Gemini API key from Google AI Studio
 * 2. Set GEMINI_API_KEY env variable
 */

import { ContentGenerationRequest, GeneratedContent, CompetitorAnalysis } from './types';
import { serviceKeywords, materialKeywords, comparisonKeywords } from '../internalLinking';

const GEMINI_API = 'https://generativelanguage.googleapis.com/v1beta/models';
const DEFAULT_MODEL = 'gemini-1.5-pro';

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface GeminiRequest {
  contents: GeminiMessage[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

/**
 * Call Gemini API
 */
async function callGemini(prompt: string, systemPrompt?: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  const messages: GeminiMessage[] = [];

  if (systemPrompt) {
    messages.push({
      role: 'user',
      parts: [{ text: systemPrompt }],
    });
    messages.push({
      role: 'model',
      parts: [{ text: 'Understood. I will follow these instructions.' }],
    });
  }

  messages.push({
    role: 'user',
    parts: [{ text: prompt }],
  });

  const response = await fetch(
    `${GEMINI_API}/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      } as GeminiRequest),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${error}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/**
 * Build the content generation system prompt
 */
function buildSystemPrompt(request: ContentGenerationRequest): string {
  return `You are an expert SEO content writer for a roofing company website. Your content must:

READING LEVEL (CRITICAL):
- Write at a 5th grade reading level (Flesch-Kincaid Grade 5 or lower)
- Use simple, everyday words
- Keep sentences to 10-15 words maximum
- Keep paragraphs to 2-3 sentences
- Use active voice only
- Avoid jargon - explain any technical terms simply

SEO OPTIMIZATION:
- Include the target keyword naturally 3-5 times
- Use keyword variations and related terms
- Structure with H2 and H3 headings for featured snippets
- Include a clear answer in the first paragraph (for AI search)
- Add bullet points and numbered lists
- Make content scannable

AEO (Answer Engine Optimization):
- Start with a direct answer to the main question
- Use conversational, question-answer format
- Include "People Also Ask" style Q&A sections
- Write content that can be read aloud naturally
- Include clear, quotable statements

INTERNAL LINKING:
- Naturally mention these topics where relevant (for linking later):
${request.internalLinks.map(l => `  - ${l.keyword}`).join('\n')}

CONTENT STRUCTURE:
1. Opening paragraph with direct answer (2-3 sentences)
2. Key points section with bullets
3. Main content sections with H2 headings
4. FAQ section with 3-5 common questions
5. Summary/conclusion with call to action

OUTPUT FORMAT:
Return valid HTML content with proper heading tags (h2, h3), paragraphs (p), lists (ul, ol, li), and bold text (strong) for key points.`;
}

/**
 * Build the content generation prompt
 */
function buildContentPrompt(request: ContentGenerationRequest): string {
  const { keyword, competitorData, targetWordCount } = request;

  let prompt = `Write a comprehensive blog post about "${keyword}" for a roofing estimate website.

TARGET:
- Word count: approximately ${targetWordCount} words
- Tone: ${request.tone}
- Reading level: ${request.readingLevel}th grade

COMPETITOR INSIGHTS:
- Top competitors cover: ${competitorData.commonTopics.join(', ')}
- Common heading styles: ${competitorData.commonHeadings.join(', ')}
- Related questions people ask:
${competitorData.relatedQuestions.map(q => `  - ${q}`).join('\n')}

CONTENT REQUIREMENTS:
1. Answer the main question clearly in the first paragraph
2. Cover all the topics competitors mention, but better and simpler
3. Include a FAQ section answering the related questions
4. End with a clear call to action to get a free roof estimate

Remember: Keep it simple! A 10-year-old should understand every sentence.`;

  return prompt;
}

/**
 * Generate blog content using Gemini
 */
export async function generateBlogContent(
  request: ContentGenerationRequest
): Promise<GeneratedContent> {
  const systemPrompt = buildSystemPrompt(request);
  const contentPrompt = buildContentPrompt(request);

  // Generate main content
  const content = await callGemini(contentPrompt, systemPrompt);

  // Generate title and excerpt
  const metaPrompt = `Based on this blog content, create:
1. A compelling, SEO-optimized title (50-60 characters)
2. A meta description/excerpt (150-160 characters)
3. 5-7 relevant tags
4. 5-7 SEO keywords

Content topic: ${request.keyword}

Return as JSON:
{
  "title": "...",
  "excerpt": "...",
  "tags": ["...", "..."],
  "keywords": ["...", "..."]
}`;

  const metaResponse = await callGemini(metaPrompt);

  // Parse meta response
  let meta = { title: '', excerpt: '', tags: [] as string[], keywords: [] as string[] };
  try {
    // Extract JSON from response
    const jsonMatch = metaResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      meta = JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    // Fallback
    meta = {
      title: `Guide to ${request.keyword}`,
      excerpt: `Learn everything about ${request.keyword}. Get expert tips and free estimates.`,
      tags: [request.keyword, 'roofing', 'home improvement'],
      keywords: [request.keyword, 'roof', 'estimate', 'cost'],
    };
  }

  // Generate image prompts
  const imagePrompts = [
    `Professional roofing photo showing ${request.keyword}, high quality, realistic`,
    `Before and after roof ${request.keyword} comparison, split image`,
    `Infographic showing ${request.keyword} process or costs`,
  ];

  // Calculate reading time (average 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const estimatedReadingTime = Math.ceil(wordCount / 200);

  return {
    title: meta.title,
    excerpt: meta.excerpt,
    content,
    suggestedTags: meta.tags,
    suggestedKeywords: meta.keywords,
    imagePrompts,
    estimatedReadingTime,
  };
}

/**
 * Check if Gemini is configured
 */
export function isGeminiConfigured(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

/**
 * Generate image description for alt text
 */
export async function generateImageAlt(imageContext: string): Promise<string> {
  if (!isGeminiConfigured()) {
    return `Roofing image - ${imageContext}`;
  }

  const prompt = `Write a brief, descriptive alt text (10-15 words) for a roofing website image about: ${imageContext}. Be specific and descriptive for accessibility.`;

  const response = await callGemini(prompt);
  return response.trim().replace(/^["']|["']$/g, '');
}

/**
 * Simplify existing content to 5th grade reading level
 */
export async function simplifyContent(content: string): Promise<string> {
  if (!isGeminiConfigured()) {
    return content;
  }

  const prompt = `Rewrite this content at a 5th grade reading level. Keep ALL the same information and facts. Just use simpler words and shorter sentences.

Rules:
- Maximum 15 words per sentence
- Maximum 3 sentences per paragraph
- Use everyday words (e.g., "use" not "utilize", "about" not "approximately")
- Active voice only
- Keep all facts, numbers, and key information

Content to simplify:
${content}`;

  return callGemini(prompt);
}

/**
 * Get internal linking suggestions from our keyword maps
 */
export function getInternalLinkingKeywords(): { keyword: string; url: string }[] {
  const links: { keyword: string; url: string }[] = [];

  for (const service of serviceKeywords) {
    links.push({
      keyword: service.keywords[0],
      url: service.url,
    });
  }

  for (const material of materialKeywords) {
    links.push({
      keyword: material.keywords[0],
      url: material.url,
    });
  }

  for (const comparison of comparisonKeywords) {
    links.push({
      keyword: comparison.keywords[0],
      url: comparison.url,
    });
  }

  return links;
}

/**
 * Mock content generation for development
 */
export function getMockGeneratedContent(keyword: string): GeneratedContent {
  return {
    title: `${keyword}: A Simple Guide for Homeowners`,
    excerpt: `Learn about ${keyword} in simple terms. Get tips, costs, and free estimates for your home.`,
    content: `<h2>What is ${keyword}?</h2>
<p>${keyword} is an important part of keeping your home safe. Let me explain it in simple terms.</p>

<h2>Key Things to Know</h2>
<ul>
<li>Most homes need this service every 20-30 years</li>
<li>Costs range from $5,000 to $15,000 for most homes</li>
<li>The job usually takes 1-3 days to finish</li>
<li>Good contractors offer warranties</li>
</ul>

<h2>How Much Does It Cost?</h2>
<p>The price depends on your roof size. Bigger roofs cost more. The type of materials matters too.</p>
<p>Here's a quick breakdown:</p>
<ul>
<li><strong>Small roof (1,000 sq ft):</strong> $5,000 - $8,000</li>
<li><strong>Medium roof (2,000 sq ft):</strong> $8,000 - $12,000</li>
<li><strong>Large roof (3,000+ sq ft):</strong> $12,000 - $20,000</li>
</ul>

<h2>Common Questions</h2>

<h3>How long does ${keyword} take?</h3>
<p>Most jobs take 1-3 days. Bad weather can cause delays. Complex roofs take longer.</p>

<h3>How do I find a good contractor?</h3>
<p>Look for licensed contractors with good reviews. Get at least 3 quotes. Ask about their warranty.</p>

<h3>When is the best time for ${keyword}?</h3>
<p>Spring and fall are best. The weather is mild. Contractors are less busy in these seasons.</p>

<h2>Get Your Free Estimate</h2>
<p>Ready to learn your costs? We can give you a free estimate using satellite photos. It takes just 60 seconds. No one needs to climb on your roof.</p>`,
    suggestedTags: [keyword, 'roofing', 'home improvement', 'cost guide'],
    suggestedKeywords: [keyword, 'roof cost', 'roofing estimate', 'home repair'],
    imagePrompts: [
      `Professional photo of ${keyword} in progress`,
      `Before and after ${keyword} comparison`,
      `Cost infographic for ${keyword}`,
    ],
    estimatedReadingTime: 4,
  };
}
