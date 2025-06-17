import { NextRequest, NextResponse } from "next/server";

// Allowed origins (edit for production use)
const ALLOWED_ORIGINS = ["http://localhost:3000"];

// Set cache forever: s-maxage=31536000 (1 year), immutable
const CACHE_FOREVER_HEADER = "public, s-maxage=31536000, immutable";

export function validateRequest(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);

  return {
    isAllowedOrigin,
    origin,
  };
}

export function addCorsHeaders(res: NextResponse, isAllowedOrigin: boolean, origin: string) {
  if (isAllowedOrigin) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    res.headers.append("Vary", "Origin");
  }
  return res;
}

export { CACHE_FOREVER_HEADER };
