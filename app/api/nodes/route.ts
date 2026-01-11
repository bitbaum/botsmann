import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/mongodb';
import Node from '@/lib/models/Node';
import { CreateNodeSchema, BUILT_IN_CAPABILITIES, DEFAULT_NODE_PRIVACY, DEFAULT_NODE_LIMITS } from '@/types/node';
import { nanoid } from 'nanoid';

// ============================================
// GET /api/nodes - List nodes
// ============================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ownerId = searchParams.get('ownerId');
    const status = searchParams.get('status');
    const visibility = searchParams.get('visibility');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    await connectDB();

    // Build query
    const query: Record<string, unknown> = {};

    if (ownerId) {
      query.ownerId = ownerId;
    } else if (visibility === 'public') {
      // Only show public nodes if no owner specified
      query['privacy.visibility'] = 'public';
      query.status = 'active';
    }

    if (status && ownerId) {
      query.status = status;
    }

    const [nodes, total] = await Promise.all([
      Node.find(query)
        .sort({ updatedAt: -1 })
        .skip(offset)
        .limit(limit)
        .lean(),
      Node.countDocuments(query)
    ]);

    // Transform _id to id
    const transformedNodes = nodes.map(node => ({
      ...node,
      id: node._id.toString(),
      _id: undefined
    }));

    return NextResponse.json({
      success: true,
      data: {
        nodes: transformedNodes,
        total,
        limit,
        offset,
        hasMore: offset + nodes.length < total
      }
    });

  } catch (error) {
    console.error('Error fetching nodes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch nodes' },
      { status: 500 }
    );
  }
}

// ============================================
// POST /api/nodes - Create a new node
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = CreateNodeSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationResult.error.errors
        },
        { status: 400 }
      );
    }

    const { personality, deployment, privacy } = validationResult.data;

    await connectDB();

    // Generate unique slug
    const baseSlug = personality.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    let slug = baseSlug;
    let attempts = 0;

    // Ensure unique slug
    while (await Node.findOne({ slug })) {
      attempts++;
      slug = `${baseSlug}-${nanoid(4)}`;
      if (attempts > 5) {
        slug = `${baseSlug}-${nanoid(8)}`;
        break;
      }
    }

    // Create the node
    const node = new Node({
      slug,
      ownerId: body.ownerId || 'anonymous', // TODO: Get from auth
      personality,
      deployment: {
        ...deployment,
        region: deployment.region || 'auto'
      },
      privacy: privacy || DEFAULT_NODE_PRIVACY,
      capabilities: BUILT_IN_CAPABILITIES.map(cap => ({
        ...cap,
        enabled: body.enabledCapabilities?.includes(cap.id) ?? cap.enabled
      })),
      limits: body.limits || DEFAULT_NODE_LIMITS,
      status: 'draft',
      usage: {
        messagesThisMonth: 0,
        tokensThisMonth: 0,
        knowledgeStorageMB: 0
      },
      version: 1
    });

    await node.save();

    return NextResponse.json({
      success: true,
      data: {
        node: node.toJSON(),
        message: 'Node created successfully'
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating node:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create node' },
      { status: 500 }
    );
  }
}
