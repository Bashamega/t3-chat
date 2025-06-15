import { NextRequest, NextResponse } from "next/server";

// Allowed origins (edit for production use)
const ALLOWED_ORIGINS = ["http://localhost:3000"];

// Set cache forever: s-maxage=31536000 (1 year), immutable
const CACHE_FOREVER_HEADER = "public, s-maxage=31536000, immutable";
interface FullModel extends Model {
  pricing: {
    prompt: string;
    completion: string;
  };
}
export async function GET(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/models/", {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 });
    }

    const models: { data: FullModel[] } = await response.json();
    const data = models.data
      .filter(
        (model) => Number(model.pricing?.prompt) === 0 && Number(model.pricing?.completion) === 0
      )
      .map((model) => {
        return {
          id: model.id,
          name: model.name.replace(" (free)", ""),
          description: model.description,
        };
      });

    const res = NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": CACHE_FOREVER_HEADER,
        Vary: "Origin",
      },
    });

    if (isAllowedOrigin) {
      res.headers.set("Access-Control-Allow-Origin", origin);
      res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
      res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    }

    return res;
  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);

  const res = new NextResponse(null, { status: 204 });

  if (isAllowedOrigin) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  }

  return res;
}
