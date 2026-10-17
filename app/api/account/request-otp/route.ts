import { NextResponse } from "next/server";
import { apiMessage, callFitasticApi } from "@/lib/fitastic-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { phoneNumber?: string };
  try {
    body = (await request.json()) as { phoneNumber?: string };
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const phoneNumber = body.phoneNumber?.trim();
  if (!phoneNumber) {
    return NextResponse.json({ message: "phoneNumber is required" }, { status: 400 });
  }

  try {
    const { status, body: upstream } = await callFitasticApi("/auth/phone/request-otp", {
      method: "POST",
      jsonBody: { phoneNumber },
    });
    return NextResponse.json(
      {
        session: upstream.session,
        challengeName: upstream.challengeName,
        message: apiMessage(upstream, status >= 400 ? "Could not send OTP" : "OTP sent successfully"),
      },
      { status },
    );
  } catch {
    return NextResponse.json(
      { message: "Could not reach Fitastic. Try again shortly." },
      { status: 502 },
    );
  }
}
