import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Fitastic",
  description:
    "How Fitastic collects and uses waitlist emails and other information on fitastic.cc.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <LegalSection title="Overview">
        <p>
          This Privacy Policy explains how Fitastic handles information on the
          marketing website at{" "}
          <a href="https://fitastic.cc">fitastic.cc</a> (the “Site”). The Site
          is a waitlist and product preview. It does not create gym membership
          accounts, take payments, or bill for subscriptions.
        </p>
        <p>
          Questions or requests:{" "}
          <a href="mailto:admin@fitastic.cc">admin@fitastic.cc</a>.
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <p>We collect only what we need to run the Site and the waitlist:</p>
        <ul>
          <li>
            <strong>Waitlist email.</strong> If you join, we store the email
            address you submit, along with a source note that it came from this
            website.
          </li>
          <li>
            <strong>Technical request data.</strong> Our hosting provider may
            log standard web-server information (such as IP address, browser
            type, and pages requested) to operate and secure the Site.
          </li>
        </ul>
        <p>
          We do not collect payment card details, gym membership numbers, or
          workout data on this Site. You do not need an account to browse.
        </p>
      </LegalSection>

      <LegalSection title="How we use it">
        <p>We use waitlist emails to:</p>
        <ul>
          <li>send launch updates and early-access information about Fitastic;</li>
          <li>manage the waitlist (for example, avoiding duplicate sign-ups);</li>
          <li>respond if you contact us.</li>
        </ul>
        <p>
          We use technical logs only to keep the Site running, debug issues, and
          protect against abuse.
        </p>
      </LegalSection>

      <LegalSection title="What we do not do">
        <p>
          We do not sell your email or other personal information. We do not
          use it to run advertising profiles, and we do not share it with
          unrelated third parties for their own marketing.
        </p>
      </LegalSection>

      <LegalSection title="Who processes it">
        <p>
          Emails are sent from your browser to our waitlist API and stored so
          we can contact you at launch. The Site is hosted on AWS Amplify. Those
          providers process data on our behalf to deliver the service. They are
          not given permission to sell your information.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          This Site does not run third-party analytics (such as Google
          Analytics). The waitlist form does not set a tracking cookie; it
          submits your email over HTTPS. Hosting and the Next.js app may use
          strictly necessary cookies so the Site can load. Details are in our{" "}
          <a href="/cookies">Cookie Policy</a>.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          We keep waitlist emails until we have finished launch communications,
          you ask us to delete them, or we no longer need them for the purpose
          you signed up. Technical logs are retained only as long as our host
          keeps them for operations and security.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          Email{" "}
          <a href="mailto:admin@fitastic.cc">admin@fitastic.cc</a> to ask us to
          stop sending updates, to correct your address, or to delete your
          waitlist entry. We will handle requests as promptly as we reasonably
          can.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          The Site is aimed at adults interested in the Fitastic app. We do not
          knowingly collect emails from children. If you believe a child has
          joined the waitlist, contact us and we will remove the address.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update this policy as the product launches or the Site
          changes. The “Last updated” date at the top of this page will change
          when we do.
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
