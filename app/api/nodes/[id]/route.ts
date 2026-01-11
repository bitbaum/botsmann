import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Node from '@/lib/models/Node';
import mongoose from 'mongoose';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ============================================
// GET /api/nodes/[id] - Get a single node
// ============================================

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();

    // Try to find by ID or slug
    let node;
    if (mongoose.Types.ObjectId.isValid(id)) {
      node = await Node.findById(id);
    }
    if (!node) {
      node = await Node.findOne({ slug: id });
    }

    if (!node) {
      return NextResponse.json(
        { success: false, error: 'Node not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { node: node.toJSON() }
    });

  } catch (error) {
    console.error('Error fetching node:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch node' },
      { status: 500 }
    );
  }
}

// ============================================
// PATCH /api/nodes/[id] - Update a node
// ============================================

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const updates = await request.json();

    await connectDB();

    // Find the node
    let node;
    if (mongoose.Types.ObjectId.isValid(id)) {
      node = await Node.findById(id);
    }
    if (!node) {
      node = await Node.findOne({ slug: id });
    }

    if (!node) {
      return NextResponse.json(
        { success: false, error: 'Node not found' },
        { status: 404 }
      );
    }

    // Allowed update fields
    const allowedUpdates = [
      'personality',
      'knowledge',
      'capabilities',
      'privacy',
      'deployment',
      'status',
      'tags',
      'category'
    ];

    // Apply updates
    for (const key of allowedUpdates) {
      if (updates[key] !== undefined) {
        if (key === 'personality' || key === 'privacy' || key === 'deployment') {
          // Merge nested objects
          const nodeObj = node as unknown as Record<string, Record<string, unknown>>;
          nodeObj[key] = {
            ...nodeObj[key],
            ...updates[key]
          };
        } else {
          const nodeObj = node as unknown as Record<string, unknown>;
          nodeObj[key] = updates[key];
        }
      }
    }

    // Increment version
    node.version += 1;

    await node.save();

    return NextResponse.json({
      success: true,
      data: {
        node: node.toJSON(),
        message: 'Node updated successfully'
      }
    });

  } catch (error) {
    console.error('Error updating node:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update node' },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE /api/nodes/[id] - Archive a node
// ============================================

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const hardDelete = searchParams.get('hard') === 'true';

    await connectDB();

    // Find the node
    let node;
    if (mongoose.Types.ObjectId.isValid(id)) {
      node = await Node.findById(id);
    }
    if (!node) {
      node = await Node.findOne({ slug: id });
    }

    if (!node) {
      return NextResponse.json(
        { success: false, error: 'Node not found' },
        { status: 404 }
      );
    }

    if (hardDelete) {
      // Permanently delete
      await Node.findByIdAndDelete(node._id);
      return NextResponse.json({
        success: true,
        data: { message: 'Node permanently deleted' }
      });
    } else {
      // Soft delete (archive)
      node.status = 'archived';
      await node.save();
      return NextResponse.json({
        success: true,
        data: {
          node: node.toJSON(),
          message: 'Node archived successfully'
        }
      });
    }

  } catch (error) {
    console.error('Error deleting node:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete node' },
      { status: 500 }
    );
  }
}
