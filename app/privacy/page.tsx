import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Fitastic",
  description:
    "How Fitastic collects and uses personal information in the Fitastic app and on fitastic.cc.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="October 21, 2026">
      <LegalSection title="Overview">
        <p>
          This Privacy Policy explains how Fitastic (“we”, “us”) handles
          personal information when you use the Fitastic mobile app (the “App”),
          related backend services, and the marketing website at{" "}
          <a href="https://fitastic.cc">fitastic.cc</a> (the “Site”).
        </p>
        <p>
          The App accesses, collects, and uses <strong>Location</strong> and{" "}
          <strong>Health</strong> data only with your permission, for the
          purposes in{" "}
          <a href="#location-data">Location data</a> and{" "}
          <a href="#health-data">Health data</a>. You can refuse or revoke
          either permission in your device settings, and you can turn the
          related features off in the App.
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
            <strong>Location</strong> — precise location from your device when
            you allow it, including in the background if you turn on Auto gym
            check-in. We access, collect, and use it only as described in{" "}
            <a href="#location-data">Location data</a>.
          </li>
          <li>
            <strong>Health</strong> — heart rate, resting heart rate, heart rate
            variability (HRV), steps, active energy, and sleep that you choose
            to share from Apple Health or Health Connect. We access, collect,
            and use it only as described in <a href="#health-data">Health data</a>.
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

      <LegalSection title="Location data" id="location-data">
        <p>
          <strong>How we access Location.</strong> The App requests your
          device&apos;s precise location permission (while the App is in use,
          and, only if you turn on Auto gym check-in, access all the time,
          including when the App is closed or not in use). We do not access
          Location until you grant that permission.
        </p>
        <p>
          <strong>How we collect and use Location.</strong> We use it only for
          the features below. You can change or revoke location access at any
          time in your device settings.
        </p>
        <ul>
          <li>
            <strong>Auto gym check-in (optional, off by default)</strong> — when
            you turn it on in Profile › Account Settings and allow location
            access all the time, the App collects your device&apos;s precise
            location, including when the App is closed or not in use, to detect
            when you are within about 50 m of your gym. When you arrive, we
            record a check-in in your attendance history and show a notification
            about your gym; when you leave, the notification is removed. Your
            location is compared with your gym&apos;s location on your device
            and is not sent to our servers — only the check-in (gym and time) is
            saved to your account. The App does not track your location
            continuously. Turning Auto gym check-in off stops all background
            location use.
          </li>
          <li>
            <strong>At-your-gym status</strong> — while the App is open, it may
            use your location to show whether you are at your gym. This stays on
            your device.
          </li>
          <li>
            <strong>Nearby places with Morgan</strong> — when you ask Morgan,
            our in-app coach, for nearby places, your current location is sent
            with that request so we can return relevant results.
          </li>
        </ul>
        <p>
          We do not sell Location data, share it for advertising, or use it for
          analytics. We do not build a location history on our servers.
        </p>
      </LegalSection>

      <LegalSection title="Health data" id="health-data">
        <p>
          <strong>How we access Health.</strong> If you turn on “Share Health
          data with Morgan” (Profile) and allow the system permission, the App
          reads health and fitness data you already store in Apple Health
          (including Apple Watch) or Health Connect. We request access to:
        </p>
        <ul>
          <li>heart rate, resting heart rate, and heart rate variability (HRV);</li>
          <li>steps;</li>
          <li>active energy (calories burned from activity);</li>
          <li>sleep.</li>
        </ul>
        <p>
          We do not access Health until you opt in. We do not read clinical or
          medical records, and we do not write data back to Apple Health or
          Health Connect.
        </p>
        <p>
          <strong>How we collect Health.</strong> When sharing is on, the App
          uploads a daily summary for today and yesterday (the measures above,
          including hourly step and heart-rate rollups where available, plus
          the time zone and whether the source was Apple Health or Health
          Connect). That summary is stored with your Fitastic account so Morgan
          can use it later. If you decline or turn sharing off, we stop
          collecting new Health data.
        </p>
        <p>
          <strong>How we use Health.</strong> We use it to:
        </p>
        <ul>
          <li>
            show activity context in the App (such as steps and energy on Stats
            and Home);
          </li>
          <li>
            let Morgan, the in-app coach, answer with your own numbers and send
            a morning report about the previous day;
          </li>
          <li>
            improve coaching using de-identified, aggregated patterns that are
            not tied to your name or shown as your individual numbers.
          </li>
        </ul>
        <p>
          Health data is fitness and wellness context. It is not a medical
          diagnosis, and Morgan is not a medical device. We do not sell Health
          data, share it for advertising, or use it to make decisions about
          credit, insurance, or employment. You can turn sharing off anytime in
          Profile → Share Health data with Morgan, and you can revoke Health
          access in Apple Health or Health Connect settings.
        </p>
      </LegalSection>

      <LegalSection title="How we use it">
        <p>We use this information to:</p>
        <ul>
          <li>authenticate you and sync your data across devices;</li>
          <li>
            provide dashboards, coaching features, live classes, rewards, and
            other App functionality;
          </li>
          <li>
            check you in to your gym automatically when you turn on Auto gym
            check-in, and return nearby places when you ask Morgan;
          </li>
          <li>
            coach you from Health data you choose to share (steps, energy,
            heart rate, HRV, and sleep), including Morgan&apos;s morning report;
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
          leave the Site waitlist. You can also stop using the App and delete
          your account in the App (Profile) or on the Site at{" "}
          <a href="/delete-account">fitastic.cc/delete-account</a>.
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
