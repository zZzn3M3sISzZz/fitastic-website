import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use | Fitastic",
  description:
    "Terms of Use (EULA) for the Fitastic mobile app, auto-renewable subscriptions, and the fitastic.cc website.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" lastUpdated="September 2026">
      <LegalSection title="About these terms">
        <p>
          These Terms of Use (“Terms”) are the end-user license agreement (EULA)
          for the Fitastic mobile application (the “App”) and related services
          operated by Fitastic, including the marketing website at{" "}
          <a href="https://fitastic.cc">fitastic.cc</a> (the “Site”).
        </p>
        <p>
          By downloading, installing, accessing, or using the App, creating an
          account, purchasing or restoring a subscription, or using the Site,
          you agree to these Terms. If you do not agree, do not use the App or
          Site.
        </p>
        <p>
          If you obtained the App from the Apple App Store, your use is also
          subject to Apple’s Licensed Application End User License Agreement
          where it applies, and Apple’s media services terms for billing
          mediated by Apple. Payment for App Store subscriptions is charged by
          Apple; Fitastic does not receive your full Apple ID payment
          credentials.
        </p>
      </LegalSection>

      <LegalSection title="Who we are">
        <p>
          Fitastic provides a consumer fitness platform: member accounts,
          workouts, nutrition tools, gym and trainer features, live classes
          (“Floor”), a rewards shop, community features, and optional paid
          subscriptions. For questions about these Terms, email{" "}
          <a href="mailto:admin@fitastic.cc">admin@fitastic.cc</a> or{" "}
          <a href="mailto:support@fitastic.cc">support@fitastic.cc</a>.
        </p>
      </LegalSection>

      <LegalSection title="The App and license">
        <p>
          Subject to these Terms, Fitastic grants you a limited,
          non-exclusive, non-transferable, revocable license to use the App on
          devices you own or control, solely for your personal, non-commercial
          use (or, if you are a trainer or gym partner, for the business
          purposes enabled by your Fitastic account).
        </p>
        <p>You must not:</p>
        <ul>
          <li>
            copy, modify, reverse engineer, or create derivative works of the
            App except where mandatory law allows;
          </li>
          <li>
            rent, sublicense, or commercially exploit the App except as
            expressly permitted;
          </li>
          <li>
            attempt to disrupt, scrape, overload, or bypass security or
            payment systems;
          </li>
          <li>
            use the App for unlawful purposes or to harass, harm, or defraud
            others.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Accounts">
        <p>
          You may need an account (for example via phone OTP or other supported
          sign-in) to use core features. You are responsible for keeping your
          credentials secure and for activity under your account. Provide
          accurate information and update it when it changes.
        </p>
      </LegalSection>

      <LegalSection title="Auto-renewable subscriptions">
        <p>
          Fitastic offers optional auto-renewable subscriptions, which may
          include (names and availability may vary by store and region):
        </p>
        <ul>
          <li>
            <strong>Fitastic App</strong> tiers such as Silver, Gold, and
            Platinum (member platform features);
          </li>
          <li>
            <strong>Fitastic Creators</strong> plans such as Creators,
            Creators Pro, and Creators Max;
          </li>
          <li>
            <strong>Fitastic Trainer</strong> SaaS plans such as Silver, Gold,
            Platinum, and Diamond.
          </li>
        </ul>
        <p>
          Subscription length, price, and display name are shown in the App and
          on the applicable store product page before you purchase. Payment is
          charged to your Apple ID (or Google Play account on Android) at
          confirmation of purchase.
        </p>
        <p>
          Subscriptions <strong>renew automatically</strong> unless you cancel
          at least 24 hours before the end of the current period. Your account
          will be charged for renewal within 24 hours prior to the end of the
          current period at the then-current rate. You can manage or cancel
          subscriptions in your device account settings (for example, iOS:
          Settings → Apple ID → Subscriptions). Deleting the App does not
          cancel a subscription.
        </p>
        <p>
          Any unused portion of a free trial, where offered, is forfeited when
          you purchase a subscription, where allowed by Apple’s rules. Promo
          discounts shown in the App (for example a strikethrough list price)
          are display promotions; the amount charged by the store is the store
          product price configured for that subscription.
        </p>
        <p>
          Subscriptions unlock digital features in the App. They are not a gym
          membership, medical service, insurance, or a guarantee of fitness
          results. Gym-specific memberships or fees billed by a gym partner may
          be separate and subject to that gym’s terms.
        </p>
      </LegalSection>

      <LegalSection title="Other paid features">
        <p>
          Separate from auto-renewable subscriptions, the App may offer
          one-time or session purchases (for example paid Floor live classes or
          Reward Shop items). Those purchases are governed by the in-app Terms
          of Service and checkout disclosures at the time of payment, including
          platform fees and partner/vendor policies where applicable.
        </p>
      </LegalSection>

      <LegalSection title="Health and safety">
        <p>
          Fitastic content involves physical activity. You participate at your
          own risk and should consult a qualified professional if you have
          medical concerns. Fitastic is not medical advice, physiotherapy, or
          clinical care.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The Fitastic name, logo, App, Site content, and related materials are
          owned by Fitastic or our licensors. You may not use our marks for
          commercial purposes without written permission, except as needed to
          use the App under these Terms.
        </p>
      </LegalSection>

      <LegalSection title="Privacy">
        <p>
          How we handle personal information is described in our{" "}
          <a href="/privacy">Privacy Policy</a>. By using the App or Site, you
          acknowledge that policy.
        </p>
      </LegalSection>

      <LegalSection title="The Site and waitlist">
        <p>
          The Site may include marketing information and an optional waitlist.
          Joining the waitlist is free and is not a paid subscription. Waitlist
          sign-up does not guarantee pricing, features, or launch timing.
        </p>
      </LegalSection>

      <LegalSection title="As-is availability">
        <p>
          The App and Site are provided as-is and as-available. We do not
          warrant uninterrupted or error-free service. Features, pricing, and
          availability may change.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Fitastic is not liable for
          indirect, incidental, special, punitive, or consequential damages
          arising from your use of the App, Site, subscriptions, or related
          services. Fitastic’s total aggregate liability for claims relating to
          the App or a subscription will not exceed the amount you paid Fitastic
          (or, for App Store–billed subscriptions, the amount attributable to
          Fitastic for the relevant period) in the twelve months before the
          claim, or zero if you paid nothing.
        </p>
        <p>
          Nothing in these Terms excludes liability that cannot be excluded
          under applicable law.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update these Terms from time to time. The “Last updated” date
          at the top of this page will change when we do. Continued use of the
          App or Site after an update means you accept the revised Terms where
          permitted by law. Material changes to subscriptions will be handled
          as required by Apple, Google, and applicable law.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these Terms:{" "}
          <a href="mailto:admin@fitastic.cc">admin@fitastic.cc</a> /{" "}
          <a href="mailto:support@fitastic.cc">support@fitastic.cc</a>. See
          also our <a href="/privacy">Privacy Policy</a> and{" "}
          <a href="/cookies">Cookie Policy</a>.
        </p>
        <p>
          Apple standard EULA (reference):{" "}
          <a
            href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
            rel="noopener noreferrer"
            target="_blank"
          >
            apple.com/legal/…/stdeula
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
