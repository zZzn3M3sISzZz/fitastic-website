import { Suspense } from "react";
import AttendClient from "./attend-client";

export default function AttendPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-canvas px-6 text-white">
          <p className="text-base text-white/70">Loading check-in…</p>
        </main>
      }
    >
      <AttendClient />
    </Suspense>
  );
}
