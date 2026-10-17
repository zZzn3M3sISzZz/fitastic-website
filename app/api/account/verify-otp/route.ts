import { NextResponse } from "next/server";
import { apiMessage, callFitasticApi } from "@/lib/fitastic-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { phoneNumber?: string; session?: string; code?: string };
  try {
    body = (await request.json()) as {
      phoneNumber?: string;
      session?: string;
      code?: string;
    };
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const phoneNumber = body.phoneNumber?.trim();
  const session = body.session?.trim();
  const code = body.code?.trim();
  if (!phoneNumber || !session || !code) {
    return NextResponse.json(
      { message: "phoneNumber, session, and code are required" },
      { status: 400 },
    );
  }

  try {
    const { status, body: upstream } = await callFitasticApi("/auth/phone/verify-otp", {
      method: "POST",
      jsonBody: { phoneNumber, session, code },
    });
    if (status >= 400 || typeof upstream.idToken !== "string") {
      return NextResponse.json(
        { message: apiMessage(upstream, "Invalid or expired OTP") },
        { status: status >= 400 ? status : 401 },
      );
    }
    return NextResponse.json(
      {
        idToken: upstream.idToken,
        message: "Signed in. You can confirm account deletion.",
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Could not reach Fitastic. Try again shortly." },
      { status: 502 },
    );
  }
}
