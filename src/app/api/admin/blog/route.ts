/**
 * Blog Admin API Routes
 *
 * POST /api/admin/blog - Create new blog job
 * GET /api/admin/blog - Get all jobs
 *
 * Protected by admin secret (set ADMIN_SECRET env variable)
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  startBlogJob,
  getAllJobs,
  getSystemStatus,
  getKeywordOpportunities,
  autoGenerateFromOpportunities,
} from '@/lib/blogAutomation';

/**
 * Verify admin authentication
 */
function verifyAdmin(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;

  // In development, allow without auth
  if (process.env.NODE_ENV === 'development' && !adminSecret) {
    return true;
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;

  const token = authHeader.replace('Bearer ', '');
  return token === adminSecret;
}

/**
 * GET /api/admin/blog
 * Get all blog jobs and system status
 */
export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');

  try {
    // Get keyword opportunities
    if (action === 'opportunities') {
      const opportunities = await getKeywordOpportunities();
      return NextResponse.json({
        success: true,
        opportunities,
      });
    }

    // Get system status
    if (action === 'status') {
      const status = getSystemStatus();
      return NextResponse.json({
        success: true,
        status,
      });
    }

    // Default: Get all jobs
    const jobs = getAllJobs();
    const status = getSystemStatus();

    return NextResponse.json({
      success: true,
      jobs,
      status,
    });

  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog data' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/blog
 * Create new blog job(s)
 */
export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, keyword, count } = body;

    // Auto-generate from opportunities
    if (action === 'auto-generate') {
      const jobs = await autoGenerateFromOpportunities(count || 3);
      return NextResponse.json({
        success: true,
        message: `Started ${jobs.length} blog jobs`,
        jobs,
      });
    }

    // Create single job from keyword
    if (action === 'create' && keyword) {
      const job = await startBlogJob(keyword);
      return NextResponse.json({
        success: true,
        message: 'Blog job started',
        job,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "create" with keyword or "auto-generate"' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog job' },
      { status: 500 }
    );
  }
}
