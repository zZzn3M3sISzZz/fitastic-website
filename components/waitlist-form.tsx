"use client";

import { FormEvent, useState } from "react";
import { PillButton } from "@/components/pill-button";

const WAITLIST_URL = process.env.NEXT_PUBLIC_WAITLIST_API_URL ?? "";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("Enter a valid email address.");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!valid) {
      setErrorMessage("Enter a valid email address.");
      setStatus("error");
      return;
    }

    if (!WAITLIST_URL) {
      setErrorMessage("Waitlist is not configured yet. Try again soon.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(WAITLIST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source: "website" }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrorMessage(body.error || "Could not join the waitlist. Try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMessage("Could not join the waitlist. Try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="max-w-[422px] text-base leading-[1.4] text-lime-bright" role="status">
        You’re on the list. We’ll send launch updates to {email}.
      </p>
    );
  }

  return (
    <form
      onSubmit={(event) => void onSubmit(event)}
      className="flex w-full max-w-[422px] flex-col gap-3"
      noValidate
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label className="sr-only" htmlFor="waitlist-email">
          Email address
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          disabled={status === "submitting"}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Enter your email address"
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "waitlist-email-error" : undefined}
          className="h-11 w-full rounded-full bg-surface px-4 py-3 text-base leading-[1.4] text-white placeholder:text-soft sm:w-[335px]"
        />
        <PillButton
          type="submit"
          tone="bright"
          disabled={status === "submitting"}
          className="shrink-0 whitespace-nowrap px-4 py-2 sm:self-stretch"
        >
          {status === "submitting" ? "JOINING…" : "I’M IN"}
        </PillButton>
      </div>
      {status === "error" ? (
        <p id="waitlist-email-error" className="text-sm text-[#f5a8a8]" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
