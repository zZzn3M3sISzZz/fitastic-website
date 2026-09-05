"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PillButton } from "@/components/pill-button";

const APP_SCHEME_PREFIX = "fitastic://gym-checkin";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.fitastic.mobile";
const APP_STORE_URL = "https://apps.apple.com/app/fitastic";

function buildCustomSchemeUrl(p: string): string {
  return `${APP_SCHEME_PREFIX}?p=${encodeURIComponent(p)}`;
}

function buildAttendHttpsUrl(p: string): string {
  return `https://fitastic.cc/attend?p=${encodeURIComponent(p)}`;
}

export default function AttendClient() {
  const searchParams = useSearchParams();
  const payload = searchParams.get("p")?.trim() ?? "";
  const [attemptedOpen, setAttemptedOpen] = useState(false);

  const customSchemeUrl = useMemo(
    () => (payload ? buildCustomSchemeUrl(payload) : ""),
    [payload],
  );
  const httpsUrl = useMemo(
    () => (payload ? buildAttendHttpsUrl(payload) : ""),
    [payload],
  );

  useEffect(() => {
    if (!payload || attemptedOpen) return;
    setAttemptedOpen(true);
    window.location.href = customSchemeUrl;
  }, [payload, customSchemeUrl, attemptedOpen]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 py-16 text-center text-white">
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Gym check-in
        </h1>
        {payload ? (
          <>
            <p className="text-base leading-relaxed text-white/70">
              Opening Fitastic to complete your check-in…
            </p>
            <div className="flex w-full flex-col gap-3">
              <PillButton
                href={customSchemeUrl}
                tone="bright"
                className="w-full"
              >
                Open in Fitastic
              </PillButton>
              <PillButton href={httpsUrl} tone="lime" className="w-full">
                Retry universal link
              </PillButton>
            </div>
            <p className="text-sm text-white/50">
              Don&apos;t have the app yet?
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <PillButton href={APP_STORE_URL} tone="lime" className="w-full">
                App Store
              </PillButton>
              <PillButton href={PLAY_STORE_URL} tone="lime" className="w-full">
                Google Play
              </PillButton>
            </div>
          </>
        ) : (
          <p className="text-base leading-relaxed text-white/70">
            This link is missing a check-in code. Scan the QR posted at your gym
            front desk.
          </p>
        )}
      </div>
    </main>
  );
}
