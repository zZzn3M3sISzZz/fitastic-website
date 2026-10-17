"use client";

import { FormEvent, useState } from "react";
import { PillButton } from "@/components/pill-button";
import { cn } from "@/lib/cn";

type Step = "identify" | "otp" | "confirm" | "done";
type AuthMode = "phone" | "email";

type ApiErrorBody = { message?: string };

async function postJson<T>(url: string, body: unknown): Promise<{ ok: boolean; status: number; data: T & ApiErrorBody }> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as T & ApiErrorBody;
  return { ok: res.ok, status: res.status, data };
}

const inputClass =
  "h-11 w-full rounded-full bg-surface px-4 py-3 text-base leading-[1.4] text-white placeholder:text-soft disabled:opacity-60";

export function DeleteAccountForm() {
  const [authMode, setAuthMode] = useState<AuthMode>("phone");
  const [step, setStep] = useState<Step>("identify");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [session, setSession] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const resetIdentity = () => {
    setStep("identify");
    setSession(null);
    setIdToken(null);
    setOtp("");
    setConfirmText("");
    setPassword("");
    setError(null);
    setInfo(null);
  };

  const onRequestOtp = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setInfo(null);
    const phoneNumber = phone.trim();
    if (phoneNumber.replace(/\D/g, "").length < 10) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setBusy(true);
    try {
      const { ok, data } = await postJson<{ session?: string; message?: string }>(
        "/api/account/request-otp",
        { phoneNumber },
      );
      if (!ok || typeof data.session !== "string") {
        setError(data.message || "Could not send OTP. Try again.");
        return;
      }
      setSession(data.session);
      setStep("otp");
      setInfo(data.message || "OTP sent. Check your SMS.");
    } catch {
      setError("Could not send OTP. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const onVerifyOtp = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setInfo(null);
    if (!session) {
      setError("Session expired. Request a new OTP.");
      setStep("identify");
      return;
    }
    const code = otp.trim();
    if (code.length < 4) {
      setError("Enter the OTP from your SMS.");
      return;
    }
    setBusy(true);
    try {
      const { ok, data } = await postJson<{ idToken?: string; message?: string }>(
        "/api/account/verify-otp",
        { phoneNumber: phone.trim(), session, code },
      );
      if (!ok || typeof data.idToken !== "string") {
        setError(data.message || "Invalid or expired OTP.");
        return;
      }
      setIdToken(data.idToken);
      setStep("confirm");
      setInfo("Signed in. Confirm below to permanently delete your account.");
    } catch {
      setError("Could not verify OTP. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const onEmailLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setInfo(null);
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || !password) {
      setError("Enter your Fitastic email and password.");
      return;
    }
    setBusy(true);
    try {
      const { ok, data } = await postJson<{ idToken?: string; message?: string }>(
        "/api/account/login",
        { email: value, password },
      );
      if (!ok || typeof data.idToken !== "string") {
        setError(data.message || "Invalid email or password.");
        return;
      }
      setIdToken(data.idToken);
      setStep("confirm");
      setInfo("Signed in. Confirm below to permanently delete your account.");
    } catch {
      setError("Could not sign in. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!idToken) {
      setError("Please sign in again to delete your account.");
      resetIdentity();
      return;
    }
    if (confirmText.trim().toUpperCase() !== "DELETE") {
      setError('Type DELETE to confirm.');
      return;
    }
    setBusy(true);
    try {
      const { ok, data } = await postJson<{ message?: string; processorNote?: string }>(
        "/api/account/delete",
        { idToken },
      );
      if (!ok) {
        setError(data.message || "Could not delete your account. Try again.");
        return;
      }
      setIdToken(null);
      setSession(null);
      setStep("done");
      setInfo(
        typeof data.processorNote === "string" && data.processorNote
          ? data.processorNote
          : null,
      );
    } catch {
      setError("Could not delete your account. Try again.");
    } finally {
      setBusy(false);
    }
  };

  if (step === "done") {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-surface/60 p-6">
        <p className="text-lg font-semibold text-lime-bright" role="status">
          Your Fitastic account has been deleted.
        </p>
        <p className="text-base leading-[1.6] text-muted">
          Your profile and associated app data for this account were removed. You
          are signed out. If you had an active store subscription, cancel it in
          the App Store or Google Play as well.
        </p>
        {info ? (
          <p className="text-sm leading-[1.5] text-soft">{info}</p>
        ) : null}
        <a
          href="/"
          className="text-lime-bright underline underline-offset-2 transition-opacity duration-tap hover:opacity-70"
        >
          Back to Fitastic
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface/60 p-6">
      {step === "identify" || step === "otp" ? (
        <div className="flex gap-2">
          {(
            [
              ["phone", "Phone OTP"],
              ["email", "Email"],
            ] as const
          ).map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              disabled={busy || step === "otp"}
              onClick={() => {
                setAuthMode(mode);
                setError(null);
                setInfo(null);
              }}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-tap",
                authMode === mode
                  ? "bg-lime text-navy"
                  : "bg-canvas text-muted hover:text-white",
                (busy || step === "otp") && "opacity-60",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}

      {step === "identify" && authMode === "phone" ? (
        <form onSubmit={(e) => void onRequestOtp(e)} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm text-soft" htmlFor="delete-phone">
            Phone number on your Fitastic account
            <input
              id="delete-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              disabled={busy}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98xxxxxxxx"
              className={inputClass}
            />
          </label>
          <PillButton type="submit" tone="bright" disabled={busy} className="w-full sm:w-auto">
            {busy ? "SENDING…" : "SEND OTP"}
          </PillButton>
        </form>
      ) : null}

      {step === "identify" && authMode === "email" ? (
        <form onSubmit={(e) => void onEmailLogin(e)} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm text-soft" htmlFor="delete-email">
            Email
            <input
              id="delete-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={busy}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-soft" htmlFor="delete-password">
            Password
            <input
              id="delete-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={busy}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Fitastic password"
              className={inputClass}
            />
          </label>
          <PillButton type="submit" tone="bright" disabled={busy} className="w-full sm:w-auto">
            {busy ? "SIGNING IN…" : "CONTINUE"}
          </PillButton>
        </form>
      ) : null}

      {step === "otp" ? (
        <form onSubmit={(e) => void onVerifyOtp(e)} className="flex flex-col gap-4">
          <p className="text-sm text-muted">
            Enter the code sent to <span className="text-white">{phone.trim()}</span>.
          </p>
          <label className="flex flex-col gap-2 text-sm text-soft" htmlFor="delete-otp">
            One-time password
            <input
              id="delete-otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              disabled={busy}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit code"
              className={inputClass}
            />
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PillButton type="submit" tone="bright" disabled={busy} className="w-full sm:w-auto">
              {busy ? "VERIFYING…" : "VERIFY OTP"}
            </PillButton>
            <button
              type="button"
              disabled={busy}
              onClick={resetIdentity}
              className="text-sm text-muted underline underline-offset-2 transition-opacity duration-tap hover:opacity-70 disabled:opacity-50"
            >
              Use a different number
            </button>
          </div>
        </form>
      ) : null}

      {step === "confirm" ? (
        <form onSubmit={(e) => void onDelete(e)} className="flex flex-col gap-4">
          <p className="text-base leading-[1.6] text-white">
            This permanently deletes your Fitastic profile, workouts, nutrition,
            friends, and other data tied to this account. This cannot be undone.
          </p>
          <label className="flex flex-col gap-2 text-sm text-soft" htmlFor="delete-confirm">
            Type <span className="font-semibold text-white">DELETE</span> to confirm
            <input
              id="delete-confirm"
              name="confirm"
              type="text"
              autoComplete="off"
              required
              disabled={busy}
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              className={inputClass}
            />
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={busy || confirmText.trim().toUpperCase() !== "DELETE"}
              className={cn(
                "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-base font-semibold transition-opacity duration-tap",
                "bg-[#e46c6c] text-white hover:opacity-90",
                (busy || confirmText.trim().toUpperCase() !== "DELETE") &&
                  "pointer-events-none opacity-50",
              )}
            >
              {busy ? "Deleting…" : "Delete account"}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={resetIdentity}
              className="text-sm text-muted underline underline-offset-2 transition-opacity duration-tap hover:opacity-70 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {info ? (
        <p className="text-sm text-lime-bright" role="status">
          {info}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-[#f5a8a8]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
