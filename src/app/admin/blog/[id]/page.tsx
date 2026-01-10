'use client';

/**
 * Blog Job Detail Page
 *
 * View and edit individual blog posts:
 * - Preview generated content
 * - Edit title, excerpt, and content
 * - Publish or delete
 */

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Check,
  Clock,
  Loader2,
  Eye,
  AlertCircle,
  Save,
  Trash2,
  Send,
  RefreshCw,
} from 'lucide-react';

interface BlogJob {
  id: string;
  status: 'pending' | 'researching' | 'generating' | 'reviewing' | 'published' | 'failed';
  keyword: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  error?: string;
  competitorAnalysis?: {
    keyword: string;
    topResults: Array<{
      title: string;
      url: string;
      description: string;
      position: number;
    }>;
    commonTopics: string[];
    relatedQuestions: string[];
  };
  generatedContent?: {
    title: string;
    excerpt: string;
    imagePrompts: string[];
  };
  finalPost?: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    htmlContent: string;
    category: string;
    tags: string[];
    keywords: string[];
    readingTime: number;
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BlogJobDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [job, setJob] = useState<BlogJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedExcerpt, setEditedExcerpt] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [id]);

  async function fetchJob() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog/${id}`);
      const data = await res.json();
      if (data.success && data.job) {
        setJob(data.job);
        if (data.job.finalPost) {
          setEditedTitle(data.job.finalPost.title);
          setEditedExcerpt(data.job.finalPost.excerpt);
          setEditedContent(data.job.finalPost.content);
        }
      }
    } catch (error) {
      console.error('Failed to fetch job:', error);
    }
    setLoading(false);
  }

  async function saveChanges() {
    if (!job) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          updates: {
            title: editedTitle,
            excerpt: editedExcerpt,
            content: editedContent,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setJob(prev => prev ? { ...prev, finalPost: data.post } : null);
      }
    } catch (error) {
      console.error('Failed to save:', error);
    }
    setSaving(false);
  }

  async function publishPost() {
    if (!job) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish' }),
      });
      const data = await res.json();
      if (data.success) {
        setJob(prev => prev ? { ...prev, status: 'published' } : null);
      }
    } catch (error) {
      console.error('Failed to publish:', error);
    }
    setSaving(false);
  }

  async function deleteJob() {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/blog');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  }

  const getStatusIcon = (status: BlogJob['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-slate-400" />;
      case 'researching':
      case 'generating':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'reviewing':
        return <Eye className="w-5 h-5 text-amber-500" />;
      case 'published':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <AlertCircle className="w-12 h-12 text-slate-400 mb-4" />
        <p className="text-slate-600 mb-4">Job not found</p>
        <Link href="/admin/blog" className="text-blue-600 hover:underline">
          Back to Blog Admin
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/blog"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
              <div className="h-6 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                {getStatusIcon(job.status)}
                <span className="font-medium text-slate-900 capitalize">{job.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchJob}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              {job.status === 'reviewing' && (
                <>
                  <button
                    onClick={saveChanges}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save
                  </button>
                  <button
                    onClick={publishPost}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    Publish
                  </button>
                </>
              )}
              <button
                onClick={deleteJob}
                className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Excerpt */}
            {job.finalPost && (
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      disabled={job.status === 'published'}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Excerpt
                    </label>
                    <textarea
                      value={editedExcerpt}
                      onChange={(e) => setEditedExcerpt(e.target.value)}
                      disabled={job.status === 'published'}
                      rows={2}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            {job.finalPost && (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">Content</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowPreview(false)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        !showPreview ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setShowPreview(true)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        showPreview ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {showPreview ? (
                    <div
                      className="prose prose-slate max-w-none"
                      dangerouslySetInnerHTML={{ __html: job.finalPost.htmlContent || editedContent }}
                    />
                  ) : (
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      disabled={job.status === 'published'}
                      rows={20}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Processing State */}
            {['pending', 'researching', 'generating'].includes(job.status) && (
              <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                <p className="text-lg font-medium text-slate-900 capitalize mb-2">
                  {job.status === 'pending' && 'Starting job...'}
                  {job.status === 'researching' && 'Researching competitors...'}
                  {job.status === 'generating' && 'Generating content...'}
                </p>
                <p className="text-slate-500">This may take a few minutes</p>
              </div>
            )}

            {/* Failed State */}
            {job.status === 'failed' && (
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-red-900 mb-2">Job Failed</h3>
                    <p className="text-red-700">{job.error || 'Unknown error occurred'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Info */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Job Details</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-slate-500">Keyword</dt>
                  <dd className="font-medium text-slate-900">{job.keyword}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Category</dt>
                  <dd className="font-medium text-slate-900 capitalize">{job.category}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Created</dt>
                  <dd className="font-medium text-slate-900">
                    {new Date(job.createdAt).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Updated</dt>
                  <dd className="font-medium text-slate-900">
                    {new Date(job.updatedAt).toLocaleString()}
                  </dd>
                </div>
                {job.finalPost && (
                  <>
                    <div>
                      <dt className="text-slate-500">Reading Time</dt>
                      <dd className="font-medium text-slate-900">
                        {job.finalPost.readingTime} min
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Slug</dt>
                      <dd className="font-medium text-slate-900 break-all">
                        {job.finalPost.slug}
                      </dd>
                    </div>
                  </>
                )}
              </dl>
            </div>

            {/* Tags & Keywords */}
            {job.finalPost && (
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Tags & Keywords</h3>
                <div className="space-y-4">
                  <div>
                    <dt className="text-sm text-slate-500 mb-2">Tags</dt>
                    <div className="flex flex-wrap gap-2">
                      {job.finalPost.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <dt className="text-sm text-slate-500 mb-2">SEO Keywords</dt>
                    <div className="flex flex-wrap gap-2">
                      {job.finalPost.keywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Competitor Analysis */}
            {job.competitorAnalysis && (
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Competitor Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <dt className="text-sm text-slate-500 mb-2">Common Topics</dt>
                    <div className="flex flex-wrap gap-2">
                      {job.competitorAnalysis.commonTopics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <dt className="text-sm text-slate-500 mb-2">Related Questions</dt>
                    <ul className="space-y-1 text-sm text-slate-600">
                      {job.competitorAnalysis.relatedQuestions.slice(0, 5).map((q, i) => (
                        <li key={i}>• {q}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Image Prompts */}
            {job.generatedContent?.imagePrompts && (
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Image Ideas</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {job.generatedContent.imagePrompts.map((prompt, i) => (
                    <li key={i} className="p-2 bg-slate-50 rounded-lg">
                      {prompt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
