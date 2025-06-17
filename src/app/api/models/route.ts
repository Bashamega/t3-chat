import { NextRequest, NextResponse } from "next/server";
import { validateRequest, addCorsHeaders, CACHE_FOREVER_HEADER } from "@/lib/api-security";
import { getFreeModels } from "@/lib/models";

export async function GET(req: NextRequest) {
  const { isAllowedOrigin, origin } = validateRequest(req);

  // Return 403 if origin is not allowed
  if (!isAllowedOrigin) {
    return new NextResponse(null, { status: 403 });
  }

  try {
    const data = await getFreeModels();

    const res = NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": CACHE_FOREVER_HEADER,
        Vary: "Origin",
      },
    });

    return addCorsHeaders(res, isAllowedOrigin, origin);
  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export function OPTIONS(req: NextRequest) {
  const { isAllowedOrigin, origin } = validateRequest(req);
  const res = new NextResponse(null, { status: 204 });
  return addCorsHeaders(res, isAllowedOrigin, origin);
}
