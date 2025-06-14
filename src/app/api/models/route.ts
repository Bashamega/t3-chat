import { NextRequest, NextResponse } from 'next/server';

// Allowed origins (edit for production use)
const ALLOWED_ORIGINS = ['http://localhost:3000'];

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin') || '';
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/models/?max_price=0', {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
    }

    const models = await response.json();
    const data = models.filter(
        (model: any) =>
          model.pricing?.prompt === 0 &&
          model.pricing?.completion === 0
      );      

    const res = NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=60',
      },
    });

    if (isAllowedOrigin) {
      res.headers.set('Access-Control-Allow-Origin', origin);
      res.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    }

    return res;
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') || '';
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);

  const res = new NextResponse(null, { status: 204 });

  if (isAllowedOrigin) {
    res.headers.set('Access-Control-Allow-Origin', origin);
    res.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  }

  return res;
}
