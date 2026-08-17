import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use | Fitastic",
  description:
    "Terms of Use for the Fitastic marketing website and waitlist at fitastic.cc.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <LegalSection title="About these terms">
        <p>
          These Terms of Use govern your access to the Fitastic marketing website
          at{" "}
          <a href="https://fitastic.cc">fitastic.cc</a> (the “Site”). Fitastic is
          a consumer fitness app currently in development. This Site is for
          information and waitlist sign-up only. It is not a gym, studio, or
          membership portal, and it does not sell or bill for gym memberships,
          class packs, or in-app subscriptions.
        </p>
        <p>
          By using the Site, joining the waitlist, or contacting us, you agree
          to these Terms. If you do not agree, please do not use the Site.
        </p>
      </LegalSection>

      <LegalSection title="Who we are">
        <p>
          The Site is operated by Fitastic. For questions about these Terms,
          email{" "}
          <a href="mailto:admin@fitastic.cc">admin@fitastic.cc</a>.
        </p>
      </LegalSection>

      <LegalSection title="The waitlist">
        <p>
          Joining the waitlist is free and optional. It is not a paid
          subscription, purchase, or contract for the Fitastic app. When you
          submit your email, you ask us to send launch updates, early-access
          notes, and related Fitastic news. You can ask us to stop at any time
          by emailing{" "}
          <a href="mailto:admin@fitastic.cc">admin@fitastic.cc</a>.
        </p>
        <p>
          Waitlist sign-up does not guarantee a launch date, pricing, features,
          or access to the Fitastic app. We may change, delay, or cancel
          early-access plans without notice.
        </p>
      </LegalSection>

      <LegalSection title="Using the site">
        <p>You agree to use the Site only for lawful purposes. You must not:</p>
        <ul>
          <li>attempt to disrupt, scrape, or overload the Site or waitlist;</li>
          <li>submit false or someone else’s email without permission;</li>
          <li>
            copy, reverse engineer, or reuse Fitastic branding, copy, or assets
            except as allowed by law.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The Fitastic name, logo, wordmark, and Site content are owned by
          Fitastic or our licensors. You may browse and share links to the
          Site. You may not reproduce the Site or our marks for commercial use
          without our written permission.
        </p>
      </LegalSection>

      <LegalSection title="As-is availability">
        <p>
          The Site is provided as-is and as-available. We do not warrant that it
          will be uninterrupted, error-free, or that waitlist emails will always
          arrive. Pre-launch product descriptions, visuals, and timelines are
          illustrative and may change.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Fitastic is not liable for
          indirect, incidental, or consequential damages arising from your use
          of the Site or waitlist, including missed launch communications or
          changes to the product. Our total liability for claims relating to
          the Site is limited to the amount you paid us to use it — which is
          zero.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update these Terms from time to time. The “Last updated” date
          at the top of this page will change when we do. Continued use of the
          Site after an update means you accept the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these Terms:{" "}
          <a href="mailto:admin@fitastic.cc">admin@fitastic.cc</a>. See also our{" "}
          <a href="/privacy">Privacy Policy</a> and{" "}
          <a href="/cookies">Cookie Policy</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
