import type { NextRequest } from 'next/server';
import supabase from '@/src/lib/supabase';

export async function POST(req: NextRequest) {
  if (!supabase) {
    return new Response(
      JSON.stringify({ error: 'Supabase not configured' }),
      { status: 501, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const data = await req.json();
    const { error } = await supabase.from('bots').insert({
      ...data,
      created_at: new Date().toISOString()
    });
    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save bot' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Bot register error:', err);
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
