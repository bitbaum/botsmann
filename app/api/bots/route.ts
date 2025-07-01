import { NextRequest, NextResponse } from 'next/server';
import { generateSlug } from '@/src/lib/slug';

export async function POST(req: NextRequest) {
  try {
    const { name, description } = await req.json();
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const slug = generateSlug(name);
    // In a real app we would save to DB here
    return NextResponse.json({ name, description, slug }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
