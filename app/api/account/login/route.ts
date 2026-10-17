import { NextResponse } from "next/server";
import { apiMessage, callFitasticApi } from "@/lib/fitastic-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const email = body.email?.trim();
  const password = body.password ?? "";
  if (!email || !password) {
    return NextResponse.json(
      { message: "email and password are required" },
      { status: 400 },
    );
  }

  try {
    const { status, body: upstream } = await callFitasticApi("/auth/login", {
      method: "POST",
      jsonBody: { email, password },
    });
    if (typeof upstream.challengeName === "string") {
      return NextResponse.json(
        {
          message:
            upstream.challengeName === "NEW_PASSWORD_REQUIRED"
              ? "You must set a new password in the Fitastic app before deleting your account here."
              : `Additional sign-in step required (${upstream.challengeName}). Use the Fitastic app.`,
        },
        { status: 400 },
      );
    }
    if (status >= 400 || typeof upstream.idToken !== "string") {
      return NextResponse.json(
        { message: apiMessage(upstream, "Invalid email or password") },
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
