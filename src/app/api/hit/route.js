import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Increments the writing-page counter. Called once per browser session by the
// counter component; the number it produces is the real one.
const client = createClient({
  projectId: '1igdvz19',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-01',
  token: process.env.SANITY_API_TOKEN,
});

export async function POST() {
  if (!process.env.SANITY_API_TOKEN) {
    // No write token in this environment (local dev, previews). Report the
    // current count rather than inventing one.
    const pageviews = await client.fetch(`*[_id == "siteStats"][0].pageviews`);
    return NextResponse.json({ pageviews: pageviews ?? 0, counted: false });
  }

  try {
    const updated = await client
      .patch('siteStats')
      .setIfMissing({ pageviews: 0 })
      .inc({ pageviews: 1 })
      .commit();
    return NextResponse.json({ pageviews: updated.pageviews, counted: true });
  } catch (error) {
    console.error('hit counter failed:', error);
    return NextResponse.json({ pageviews: null, counted: false }, { status: 500 });
  }
}
