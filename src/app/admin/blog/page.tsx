'use client';

/**
 * Blog Admin Dashboard
 *
 * Manage automated blog creation:
 * - View keyword opportunities
 * - Create new blog posts
 * - Review and publish content
 * - Configure API connections
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Settings,
  RefreshCw,
  Sparkles,
  FileText,
  Check,
  AlertCircle,
  Clock,
  Loader2,
  Search,
  Zap,
  Plus,
  Eye,
  Trash2,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

interface BlogJob {
  id: string;
  status: 'pending' | 'researching' | 'generating' | 'reviewing' | 'published' | 'failed';
  keyword: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  error?: string;
  finalPost?: {
    title: string;
    excerpt: string;
    content: string;
    htmlContent: string;
  };
}

interface KeywordOpportunity {
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface SystemStatus {
  searchConsole: { configured: boolean };
  brightdata: { configured: boolean };
  gemini: { configured: boolean };
  images: { configured: boolean; sources: string[] };
  jobCount: number;
  publishedCount: number;
}

export default function BlogAdminPage() {
  const [jobs, setJobs] = useState<BlogJob[]>([]);
  const [opportunities, setOpportunities] = useState<KeywordOpportunity[]>([]);
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'jobs' | 'opportunities' | 'config'>('jobs');
  const [newKeyword, setNewKeyword] = useState('');
  const [creating, setCreating] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      // Fetch jobs and status
      const jobsRes = await fetch('/api/admin/blog');
      const jobsData = await jobsRes.json();
      if (jobsData.success) {
        setJobs(jobsData.jobs || []);
        setStatus(jobsData.status);
      }

      // Fetch opportunities
      const oppsRes = await fetch('/api/admin/blog?action=opportunities');
      const oppsData = await oppsRes.json();
      if (oppsData.success) {
        setOpportunities(oppsData.opportunities || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  }

  async function createBlogJob(keyword: string) {
    setCreating(true);
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', keyword }),
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => [data.job, ...prev]);
        setNewKeyword('');
      }
    } catch (error) {
      console.error('Failed to create job:', error);
    }
    setCreating(false);
  }

  async function autoGenerate(count: number) {
    setCreating(true);
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'auto-generate', count }),
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => [...data.jobs, ...prev]);
      }
    } catch (error) {
      console.error('Failed to auto-generate:', error);
    }
    setCreating(false);
  }

  async function publishJob(jobId: string) {
    try {
      const res = await fetch(`/api/admin/blog/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'publish' }),
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'published' } : j));
      }
    } catch (error) {
      console.error('Failed to publish:', error);
    }
  }

  async function deleteJob(jobId: string) {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const res = await fetch(`/api/admin/blog/${jobId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => prev.filter(j => j.id !== jobId));
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  }

  const getStatusIcon = (status: BlogJob['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-slate-400" />;
      case 'researching':
      case 'generating':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'reviewing':
        return <Eye className="w-4 h-4 text-amber-500" />;
      case 'published':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: BlogJob['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'researching':
        return 'Researching';
      case 'generating':
        return 'Generating';
      case 'reviewing':
        return 'Ready for Review';
      case 'published':
        return 'Published';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Site</span>
              </Link>
              <div className="h-6 w-px bg-slate-200" />
              <h1 className="text-xl font-bold text-slate-900">Blog Admin</h1>
            </div>
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Status Cards */}
        {status && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-slate-500">Gemini AI</span>
              </div>
              <span className={`text-lg font-bold ${status.gemini.configured ? 'text-green-600' : 'text-red-600'}`}>
                {status.gemini.configured ? 'Connected' : 'Not Configured'}
              </span>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Search className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-slate-500">Search Console</span>
              </div>
              <span className={`text-lg font-bold ${status.searchConsole.configured ? 'text-green-600' : 'text-amber-600'}`}>
                {status.searchConsole.configured ? 'Connected' : 'Using Mock Data'}
              </span>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-green-500" />
                <span className="text-sm text-slate-500">Blog Jobs</span>
              </div>
              <span className="text-lg font-bold text-slate-900">{status.jobCount}</span>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-slate-500">Published</span>
              </div>
              <span className="text-lg font-bold text-slate-900">{status.publishedCount}</span>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'jobs'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Blog Jobs
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'opportunities'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Keyword Opportunities
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'config'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Configuration
          </button>
        </div>

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            {/* Create New */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Create New Blog</h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Enter keyword (e.g., roof replacement cost)"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={() => createBlogJob(newKeyword)}
                  disabled={!newKeyword || creating}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Create
                </button>
                <button
                  onClick={() => autoGenerate(3)}
                  disabled={creating}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  Auto-Generate (3)
                </button>
              </div>
            </div>

            {/* Jobs List */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-bold text-slate-900">Blog Jobs ({jobs.length})</h2>
              </div>
              {jobs.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  No blog jobs yet. Create one above or auto-generate from keyword opportunities.
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {jobs.map((job) => (
                    <div key={job.id} className="px-6 py-4 flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(job.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">
                          {job.finalPost?.title || job.keyword}
                        </p>
                        <p className="text-sm text-slate-500">
                          {getStatusLabel(job.status)} • {job.category} • {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                        {job.error && (
                          <p className="text-sm text-red-500">{job.error}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {job.status === 'reviewing' && (
                          <button
                            onClick={() => publishJob(job.id)}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Publish
                          </button>
                        )}
                        <Link
                          href={`/admin/blog/${job.id}`}
                          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">
                Keyword Opportunities ({opportunities.length})
              </h2>
              <p className="text-sm text-slate-500">
                Keywords with high impressions but low clicks - perfect for new blog posts
              </p>
            </div>
            {opportunities.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                {status?.searchConsole.configured
                  ? 'No keyword opportunities found. Check back later.'
                  : 'Connect Google Search Console to see real keyword opportunities.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Keyword
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Impressions
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Clicks
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        CTR
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {opportunities.map((kw, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-slate-900 font-medium">
                          {kw.keyword}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-600">
                          {kw.impressions.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-600">
                          {kw.clicks}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-600">
                          {(kw.ctr * 100).toFixed(2)}%
                        </td>
                        <td className="px-6 py-4 text-right text-slate-600">
                          {kw.position.toFixed(1)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => createBlogJob(kw.keyword)}
                            disabled={creating}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            Create Blog
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Config Tab */}
        {activeTab === 'config' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4">API Configuration</h2>
              <p className="text-slate-600 mb-6">
                Add these environment variables to your <code className="bg-slate-100 px-2 py-1 rounded">.env.local</code> file to enable all features.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-medium text-slate-900 mb-2">Gemini AI (Content Generation)</h3>
                  <code className="text-sm text-slate-600">GEMINI_API_KEY=your_api_key</code>
                  <p className="text-sm text-slate-500 mt-1">
                    Get your API key from <a href="https://aistudio.google.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google AI Studio</a>
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-medium text-slate-900 mb-2">Google Search Console (Keyword Research)</h3>
                  <code className="text-sm text-slate-600">GOOGLE_ACCESS_TOKEN=your_oauth_token</code>
                  <p className="text-sm text-slate-500 mt-1">
                    Set up OAuth credentials in <a href="https://console.cloud.google.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Cloud Console</a>
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-medium text-slate-900 mb-2">Brightdata (Competitor Analysis)</h3>
                  <code className="text-sm text-slate-600">BRIGHTDATA_API_KEY=your_api_key</code>
                  <p className="text-sm text-slate-500 mt-1">
                    Get your API key from <a href="https://brightdata.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Brightdata</a>
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-medium text-slate-900 mb-2">Image Providers</h3>
                  <code className="text-sm text-slate-600">UNSPLASH_ACCESS_KEY=your_key</code><br />
                  <code className="text-sm text-slate-600">PEXELS_API_KEY=your_key</code>
                  <p className="text-sm text-slate-500 mt-1">
                    Free stock photos from Unsplash and Pexels
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-medium text-slate-900 mb-2">Admin Secret</h3>
                  <code className="text-sm text-slate-600">ADMIN_SECRET=your_secure_secret</code>
                  <p className="text-sm text-slate-500 mt-1">
                    Required for API authentication in production
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
