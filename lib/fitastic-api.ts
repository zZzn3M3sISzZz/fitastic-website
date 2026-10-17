/**
 * Fitastic backend base URL (API Gateway execute-api or CloudFront).
 * Prefer execute-api for auth (same as the mobile app's preferExecuteApi path).
 */
export function fitasticApiBaseUrl(): string {
  const fromEnv =
    process.env.FITASTIC_API_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_FITASTIC_API_BASE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  // Production Fitastic API (matches mobile ApiConfig.executeApiBaseUrl).
  return "https://i7v4y5jrgl.execute-api.us-east-1.amazonaws.com/prod";
}

export type FitasticApiJson = {
  status: number;
  body: Record<string, unknown>;
};

export async function callFitasticApi(
  path: string,
  init: {
    method: string;
    jsonBody?: unknown;
    idToken?: string;
  },
): Promise<FitasticApiJson> {
  const url = `${fitasticApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (init.jsonBody !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (init.idToken) {
    const token = init.idToken.replace(/^(Bearer\s+)+/i, "").trim();
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: init.method,
    headers,
    body: init.jsonBody !== undefined ? JSON.stringify(init.jsonBody) : undefined,
    cache: "no-store",
  });

  const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { status: res.status, body };
}

export function apiMessage(
  body: Record<string, unknown>,
  fallback: string,
): string {
  const message = body.message;
  if (typeof message === "string" && message.trim()) return message.trim();
  const error = body.error;
  if (typeof error === "string" && error.trim()) return error.trim();
  return fallback;
}
