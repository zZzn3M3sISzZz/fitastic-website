import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy | Fitastic",
  description:
    "How Fitastic uses cookies on the marketing website at fitastic.cc.",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy">
      <LegalSection title="Overview">
        <p>
          This Cookie Policy explains how Fitastic uses cookies and similar
          technologies on{" "}
          <a href="https://fitastic.cc">fitastic.cc</a> (the “Site”). It covers
          the marketing waitlist site only — not the Fitastic consumer app,
          which is not yet generally available.
        </p>
        <p>
          Questions:{" "}
          <a href="mailto:admin@fitastic.cc">admin@fitastic.cc</a>.
        </p>
      </LegalSection>

      <LegalSection title="What we actually use">
        <p>
          We keep this Site small. After reviewing the current marketing site:
        </p>
        <ul>
          <li>
            We do <strong>not</strong> run third-party analytics (no Google
            Analytics, Mixpanel, or similar tags).
          </li>
          <li>
            We do <strong>not</strong> set advertising or social-media tracking
            cookies.
          </li>
          <li>
            The waitlist form does <strong>not</strong> store a cookie in your
            browser. It sends your email to our waitlist API over HTTPS so we
            can email launch updates.
          </li>
          <li>
            The Site is built with Next.js and hosted on AWS Amplify. Those
            platforms may set strictly necessary cookies (for example, to
            route traffic, balance load, or protect the Site). We do not use
            those for marketing.
          </li>
          <li>
            Display type is loaded from Google Fonts (Anton SC). That is a
            request to Google’s servers for a stylesheet and font files, not a
            cookie we set ourselves. Body type (Inter) is served from this Site.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Essential cookies">
        <p>
          If a cookie is set, it is only to make the Site work: serving pages,
          remembering nothing about your workouts, and not building an ad
          profile. You can block cookies in your browser; the waitlist may
          still work because sign-up does not depend on a client cookie.
        </p>
      </LegalSection>

      <LegalSection title="If this changes">
        <p>
          If we add analytics or other optional cookies later, we will update
          this page and, where required, ask for consent. Until then, treat
          this Site as essential-only.
        </p>
      </LegalSection>

      <LegalSection title="More information">
        <p>
          How we handle emails and other data is in our{" "}
          <a href="/privacy">Privacy Policy</a>. Site use is covered by our{" "}
          <a href="/terms">Terms of Use</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
