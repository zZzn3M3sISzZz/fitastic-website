import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Fitastic",
  description:
    "How Fitastic collects and uses personal information in the Fitastic app and on fitastic.cc.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="September 2026">
      <LegalSection title="Overview">
        <p>
          This Privacy Policy explains how Fitastic (“we”, “us”) handles
          personal information when you use the Fitastic mobile app (the “App”),
          related backend services, and the marketing website at{" "}
          <a href="https://fitastic.cc">fitastic.cc</a> (the “Site”).
        </p>
        <p>
          Questions or requests:{" "}
          <a href="mailto:admin@fitastic.cc">admin@fitastic.cc</a> or{" "}
          <a href="mailto:support@fitastic.cc">support@fitastic.cc</a>.
        </p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <p>Depending on how you use Fitastic, we may collect:</p>
        <ul>
          <li>
            <strong>Account details</strong> — phone number and authentication
            data used to sign you in; optional email if you provide it or join
            the Site waitlist.
          </li>
          <li>
            <strong>Profile and preferences</strong> — name, photo, goals, body
            metrics you choose to enter, and similar fields you save.
          </li>
          <li>
            <strong>Activity in the App</strong> — workouts, nutrition-related
            entries, gym check-ins, community content you post, and related
            timestamps.
          </li>
          <li>
            <strong>Subscription and billing context</strong> — plan tier,
            product identifiers, purchase/restore metadata, gym or partner
            association, and status needed to unlock paid features. App Store /
            Play Billing process payment; we do not store your full card
            numbers from those stores.
          </li>
          <li>
            <strong>Device and diagnostics</strong> — app version, device
            platform, and error logs to keep the service reliable and secure.
          </li>
          <li>
            <strong>Site technical data</strong> — standard web logs (such as IP
            address and pages requested) when you browse fitastic.cc.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How we use it">
        <p>We use this information to:</p>
        <ul>
          <li>authenticate you and sync your data across devices;</li>
          <li>
            provide dashboards, coaching features, live classes, rewards, and
            other App functionality;
          </li>
          <li>process and validate subscriptions and other purchases;</li>
          <li>send waitlist or service communications you request;</li>
          <li>improve stability, prevent abuse, and meet legal obligations.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Sharing and processors">
        <p>
          We do not sell your personal information. We share data only as needed
          to operate the product — for example with cloud hosting (such as AWS),
          push/notification providers, analytics where enabled, and payment
          providers (Apple, Google, Razorpay) under contracts that require them
          to protect your data. We may disclose information if required by law
          or to protect the rights and safety of our users.
        </p>
      </LegalSection>

      <LegalSection title="Retention">
        <p>
          We keep information for as long as your account is active and as
          needed to provide the service, comply with law, resolve disputes, and
          enforce our agreements. You may ask us to delete certain data where
          applicable law allows. Waitlist emails are kept until launch
          communications finish, you ask us to delete them, or we no longer need
          them for that purpose.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          We use industry-standard safeguards designed to protect data in
          transit and at rest. No method of transmission over the internet is
          completely secure; we work to reduce risk but cannot guarantee
          absolute security.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          You can update much of your profile in the App. Email{" "}
          <a href="mailto:admin@fitastic.cc">admin@fitastic.cc</a> to request
          access, correction, export, or deletion where the law allows, or to
          leave the Site waitlist. You can also stop using the App and, where
          supported, delete your account.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          The Site does not run third-party advertising analytics by default.
          Hosting and the Site may use strictly necessary cookies so pages can
          load. Details are in our <a href="/cookies">Cookie Policy</a>.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          Fitastic is not directed at children under the age where parental
          consent is required in your region. We do not knowingly collect
          personal information from those children.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update this policy from time to time. The “Last updated” date
          at the top of this page will change when we do. Continued use after
          changes means you accept the updated policy where permitted by law.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Privacy questions:{" "}
          <a href="mailto:admin@fitastic.cc">admin@fitastic.cc</a>. Related:{" "}
          <a href="/terms">Terms of Use</a> and{" "}
          <a href="/cookies">Cookie Policy</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
