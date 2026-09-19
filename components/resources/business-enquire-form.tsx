"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const ENQUIRE_URL = process.env.NEXT_PUBLIC_BUSINESS_ENQUIRE_API_URL ?? "";

type EnquireFields = {
  name: string;
  phone: string;
  businessName: string;
  email: string;
};

const EMPTY: EnquireFields = {
  name: "",
  phone: "",
  businessName: "",
  email: "",
};

type BusinessEnquireFormProps = {
  className?: string;
  /** When true, scroll the form into view on mount (after expand). */
  autoFocus?: boolean;
};

export function BusinessEnquireForm({
  className,
  autoFocus = false,
}: BusinessEnquireFormProps) {
  const uid = useId();
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [fields, setFields] = useState<EnquireFields>(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("Something went wrong. Try again.");

  useEffect(() => {
    if (!autoFocus) return;
    const t = window.setTimeout(() => {
      firstInputRef.current?.focus({ preventScroll: true });
      firstInputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [autoFocus]);

  const setField = (key: keyof EnquireFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (status === "error") setStatus("idle");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = fields.name.trim();
    const phone = fields.phone.trim();
    const businessName = fields.businessName.trim();
    const email = fields.email.trim().toLowerCase();

    if (name.length < 2) {
      setErrorMessage("Enter your name.");
      setStatus("error");
      return;
    }
    if (businessName.length < 2) {
      setErrorMessage("Enter your business name.");
      setStatus("error");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setErrorMessage("Enter a valid phone number.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Enter a valid email address.");
      setStatus("error");
      return;
    }
    if (!ENQUIRE_URL) {
      setErrorMessage("Enquiry form is not configured yet. Try again soon.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(ENQUIRE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          businessName,
          email,
          source: "website_resources",
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrorMessage(body.error || "Could not submit your enquiry. Try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMessage("Could not submit your enquiry. Try again.");
      setStatus("error");
    }
  };

  const inputClass =
    "h-12 w-full rounded-xl border border-white/25 bg-black/55 px-4 text-[15px] text-white placeholder:text-white/40 outline-none transition-[border-color] focus:border-[#bbf247]";

  if (status === "success") {
    return (
      <p
        className={cn(
          "rounded-2xl border border-[#bbf247]/40 bg-[#bbf247]/10 px-5 py-5 text-[clamp(15px,1.3vw,18px)] leading-snug text-[#bbf247]",
          className,
        )}
        role="status"
      >
        Thanks — we received your enquiry. Our team will reach out shortly.
      </p>
    );
  }

  return (
    <form
      onSubmit={(event) => void onSubmit(event)}
      className={cn("grid gap-4 sm:grid-cols-2", className)}
      noValidate
    >
      <div className="flex flex-col gap-1.5">
        <label
          className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/55"
          htmlFor={`${uid}-name`}
        >
          Name
        </label>
        <input
          ref={firstInputRef}
          id={`${uid}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={fields.name}
          disabled={status === "submitting"}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="Your name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/55"
          htmlFor={`${uid}-phone`}
        >
          Phone number
        </label>
        <input
          id={`${uid}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          value={fields.phone}
          disabled={status === "submitting"}
          onChange={(e) => setField("phone", e.target.value)}
          placeholder="+91 98765 43210"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/55"
          htmlFor={`${uid}-business`}
        >
          Business name
        </label>
        <input
          id={`${uid}-business`}
          name="businessName"
          type="text"
          autoComplete="organization"
          required
          value={fields.businessName}
          disabled={status === "submitting"}
          onChange={(e) => setField("businessName", e.target.value)}
          placeholder="Your business or brand"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-[12px] font-medium uppercase tracking-[0.06em] text-white/55"
          htmlFor={`${uid}-email`}
        >
          Email address
        </label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={fields.email}
          disabled={status === "submitting"}
          onChange={(e) => setField("email", e.target.value)}
          placeholder="you@business.com"
          className={inputClass}
        />
      </div>

      <div className="sm:col-span-2">
        {status === "error" ? (
          <p className="mb-3 text-sm text-[#f5a8a8]" role="alert">
            {errorMessage}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex h-12 min-w-[180px] items-center justify-center rounded-full bg-[#bbf247] px-6 text-[15px] font-semibold tracking-[-0.02em] text-black transition-opacity hover:opacity-85",
            status === "submitting" && "pointer-events-none opacity-70",
          )}
        >
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
