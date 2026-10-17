import type { Metadata } from "next";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { DeleteAccountForm } from "@/components/delete-account-form";

export const metadata: Metadata = {
  title: "Delete account | Fitastic",
  description:
    "Permanently delete your Fitastic account and associated app data from fitastic.cc.",
};

export default function DeleteAccountPage() {
  return (
    <>
      <Header />
      <main className="bg-canvas">
        <article className="mx-auto max-w-page px-gutter pb-20 pt-36">
          <h1 className="font-display text-[clamp(40px,6vw,64px)] uppercase leading-[1.1] text-lime-bright">
            Delete account
          </h1>
          <p className="mt-4 max-w-[640px] text-base leading-[1.6] text-muted">
            Use this page if you want to erase your Fitastic account without
            opening the app. You will verify with the same phone OTP or email
            sign-in you use in Fitastic, then we call the same account-deletion
            API the app uses.
          </p>

          <div className="mt-10 flex max-w-[560px] flex-col gap-8">
            <section className="flex flex-col gap-3 text-base leading-[1.6] text-white">
              <h2 className="font-display text-[clamp(22px,3vw,28px)] uppercase leading-[1.2] text-lime">
                What gets deleted
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-muted">
                <li>Your Fitastic profile and sign-in for this account</li>
                <li>Workouts, nutrition, friends, and related in-app data</li>
                <li>Community content and device tokens tied to the account</li>
              </ul>
              <p className="text-muted">
                Store subscriptions (App Store / Google Play) are billed by Apple
                or Google — cancel those separately if needed. Questions:{" "}
                <a
                  href="mailto:support@fitastic.cc"
                  className="text-lime-bright underline underline-offset-2 transition-opacity duration-tap hover:opacity-70"
                >
                  support@fitastic.cc
                </a>
                .
              </p>
            </section>

            <DeleteAccountForm />
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
