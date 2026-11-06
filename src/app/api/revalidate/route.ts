import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: "Webhook is not configured." }, { status: 503 });
  try {
    const { isValidSignature } = await parseBody(request, secret);
    if (!isValidSignature) return NextResponse.json({ message: "Invalid webhook signature." }, { status: 401 });
    revalidateTag("madrasha-public-content", "max");
    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
  } catch {
    return NextResponse.json({ message: "Invalid webhook request." }, { status: 400 });
  }
}
