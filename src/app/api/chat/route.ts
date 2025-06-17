import { NextRequest, NextResponse } from "next/server";
import { validateRequest, addCorsHeaders } from "@/lib/api-security";
import { getFreeModels } from "@/lib/models";

export async function POST(req: NextRequest) {
  const { isAllowedOrigin, origin } = validateRequest(req);

  // Return 403 if origin is not allowed
  if (!isAllowedOrigin) {
    return new NextResponse(null, { status: 403 });
  }

  const { model, text } = await req.json();

  if (!model || !text) {
    return NextResponse.json({ error: "Missing model or text" }, { status: 400 });
  }

  try {
    // Validate that the model is free
    const freeModels = await getFreeModels();
    const selectedModel = freeModels.find((m) => m.id === model);
    if (!selectedModel) {
      return NextResponse.json(
        { error: "Invalid model. Only free models are allowed." },
        { status: 400 }
      );
    }
    const token = process.env.OPENROUTER_API_KEY;
    if (!token) {
      return NextResponse.json({ error: "Token undefined" }, { status: 400 });
    }
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedModel.id,
        messages: [{ role: "user", content: text }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    const res = NextResponse.json({ result: data.choices[0].message.content });
    return addCorsHeaders(res, isAllowedOrigin, origin);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
  }
}

export function OPTIONS(req: NextRequest) {
  const { isAllowedOrigin, origin } = validateRequest(req);
  const res = new NextResponse(null, { status: 204 });
  return addCorsHeaders(res, isAllowedOrigin, origin);
}
