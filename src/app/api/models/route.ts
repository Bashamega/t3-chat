import { NextRequest, NextResponse } from "next/server";
import { validateRequest, addCorsHeaders, CACHE_FOREVER_HEADER } from "@/lib/api-security";
import { getFreeModels } from "@/lib/models";
export async function GET(req: NextRequest) {
  const validation = validateRequest(req);

  try {
    const data = await getFreeModels();

    const res = NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": CACHE_FOREVER_HEADER,
        Vary: "Origin",
      },
    });

    return addCorsHeaders(res, validation.isAllowedOrigin ?? false, validation.origin ?? "");
  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export function OPTIONS(req: NextRequest) {
  const validation = validateRequest(req);
  const res = new NextResponse(null, { status: 204 });
  return addCorsHeaders(res, validation.isAllowedOrigin ?? false, validation.origin ?? "");
}
