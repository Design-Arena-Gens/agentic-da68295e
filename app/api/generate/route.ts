import { NextResponse } from 'next/server';
import { generateContent } from '../../../lib/generator';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topic = String(body?.topic ?? '').trim();
    const emotion = String(body?.emotion ?? 'Motivation');
    const style = String(body?.style ?? 'General');
    const durationSec = Number(body?.durationSec ?? 45);

    if (!topic || topic.length < 3) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const result = generateContent({ topic, emotion, style, durationSec });
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Unexpected error' }, { status: 500 });
  }
}
