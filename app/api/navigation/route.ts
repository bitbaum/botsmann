import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const navigationPath = path.join(process.cwd(), 'content', 'navigation', 'main.json');
    const navigationData = JSON.parse(fs.readFileSync(navigationPath, 'utf8'));
    return NextResponse.json(navigationData);
  } catch (error) {
    console.error('Error reading navigation:', error);
    return NextResponse.json({ items: [] });
  }
}
