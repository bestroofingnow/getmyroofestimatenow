/**
 * Blog Job API Routes
 *
 * GET /api/admin/blog/[id] - Get job by ID
 * PUT /api/admin/blog/[id] - Update job (publish, edit content)
 * DELETE /api/admin/blog/[id] - Delete job
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getJob,
  publishBlogPost,
  updateBlogPost,
  deleteJob,
} from '@/lib/blogAutomation';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * Verify admin authentication
 */
function verifyAdmin(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;

  if (process.env.NODE_ENV === 'development' && !adminSecret) {
    return true;
  }

  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;

  const token = authHeader.replace('Bearer ', '');
  return token === adminSecret;
}

/**
 * GET /api/admin/blog/[id]
 * Get a specific job
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const job = getJob(id);

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      job,
    });

  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/blog/[id]
 * Update a job (publish or edit)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { action, updates } = body;

    // Publish the post
    if (action === 'publish') {
      const post = publishBlogPost(id);

      if (!post) {
        return NextResponse.json(
          { error: 'Job not found or not ready to publish' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Blog published successfully',
        post,
      });
    }

    // Update post content
    if (action === 'update' && updates) {
      const post = updateBlogPost(id, updates);

      if (!post) {
        return NextResponse.json(
          { error: 'Job not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Blog updated successfully',
        post,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "publish" or "update" with updates object' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/blog/[id]
 * Delete a job
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const deleted = deleteJob(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully',
    });

  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
