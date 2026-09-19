"use client";

import { FormEvent, useId, useState } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

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

type ResourcesEnquireSectionProps = {
  /** Unique section anchor — top uses `enquire`, bottom uses `enquire-bottom`. */
  sectionId?: string;
};

export function ResourcesEnquireSection({
  sectionId = "enquire",
}: ResourcesEnquireSectionProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 });
  const uid = useId();
  const [fields, setFields] = useState<EnquireFields>(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("Something went wrong. Try again.");

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
    "h-12 w-full rounded-xl border border-white/25 bg-black/60 px-4 text-[15px] text-white placeholder:text-white/40 outline-none transition-[border-color] focus:border-[#bbf247]";

  return (
    <section
      id={sectionId}
      ref={ref}
      className={cn(
        "resources-enquire relative overflow-hidden bg-black py-[clamp(64px,10vh,120px)]",
        inView && "is-in",
      )}
    >
      <div className="relative mx-auto w-full max-w-[920px] px-5 sm:px-8">
        <div className="border-l-[3px] border-[#bbf247] pl-5 sm:pl-6">
          <h2 className="resources-enquire-title text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.03em] text-white">
            Partner with Fitastic
          </h2>
          <p className="resources-enquire-sub mt-3 max-w-[560px] text-[clamp(15px,1.4vw,20px)] font-light leading-snug text-[#bcbaba]">
            Tell us about your business and we&apos;ll get back to you about joining the
            marketplace.
          </p>
        </div>

        {status === "success" ? (
          <p
            className="mt-10 rounded-2xl border border-[#bbf247]/40 bg-[#bbf247]/10 px-5 py-6 text-[clamp(15px,1.3vw,18px)] leading-snug text-[#bbf247]"
            role="status"
          >
            Thanks — we received your enquiry. Our team will reach out shortly.
          </p>
        ) : (
          <form
            onSubmit={(event) => void onSubmit(event)}
            className="mt-10 grid gap-4 sm:grid-cols-2"
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
        )}
      </div>
    </section>
  );
}
