import { NextResponse } from "next/server";
import { apiMessage, callFitasticApi } from "@/lib/fitastic-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONFIRM = "DELETE_MY_FITASTIC_ACCOUNT";

export async function POST(request: Request) {
  let body: { idToken?: string };
  try {
    body = (await request.json()) as { idToken?: string };
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const idToken = body.idToken?.trim();
  if (!idToken) {
    return NextResponse.json(
      { message: "Sign in with your phone OTP before deleting your account." },
      { status: 401 },
    );
  }

  try {
    const { status, body: upstream } = await callFitasticApi(
      `/users/me?confirm=${CONFIRM}`,
      {
        method: "DELETE",
        idToken,
      },
    );
    return NextResponse.json(
      {
        message: apiMessage(
          upstream,
          status >= 400
            ? "Could not delete your account. Try again."
            : "Account and associated data deleted",
        ),
        processorPaymentsRemain: upstream.processorPaymentsRemain,
        processorNote: upstream.processorNote,
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
