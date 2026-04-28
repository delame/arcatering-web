import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  // TODO: Replace with real Zoho Creator webhook endpoint
  // const zohoRes = await fetch(process.env.ZOHO_CREATOR_WEBHOOK_URL!, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.ZOHO_AUTH_TOKEN}` },
  //   body: JSON.stringify(payload),
  // });

  console.log("[Quote submission]", JSON.stringify(payload, null, 2));

  // Simulate processing delay
  await new Promise(r => setTimeout(r, 500));

  return NextResponse.json({ ok: true, message: "Quote received" });
}
