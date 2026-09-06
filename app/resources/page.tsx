import { Header } from "@/components/header";
import { ResourcesPartnershipSection } from "@/components/resources/resources-partnership-section";
import { ResourcesSlide } from "@/components/resources/resources-slide";
import { ResourcesWorkflowSection } from "@/components/resources/resources-workflow-section";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | Fitastic Marketplace Partnership",
  description:
    "Discover how brands, trainers, and businesses grow with the Fitastic marketplace and fitness ecosystem.",
};

export default function ResourcesPage() {
  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <div id="top">
        <Header />
        <main>
          <ResourcesSlide
            id="hero"
            src="/assets/resources/01-hero.png"
            alt="Fitastic marketplace partnership hero with contact details"
            className="pt-[88px] lg:pt-[100px]"
          />
          <ResourcesPartnershipSection />
          <ResourcesSlide
            id="index"
            src="/assets/resources/03-index.png"
            alt="Index — discover how your brand can grow with Fitastic"
          />
          <ResourcesSlide
            id="ecosystem"
            src="/assets/resources/04-ecosystem.png"
            alt="The Fitastic Ecosystem"
          />
          <ResourcesWorkflowSection />
          <ResourcesSlide
            id="two-ways"
            src="/assets/resources/06-two-ways.png"
            alt="Two Ways for Businesses to Grow"
          />
          <ResourcesSlide
            id="expertise"
            src="/assets/resources/07-expertise.png"
            alt="Turn Your Expertise Into Income"
          />
          <ResourcesSlide
            id="why-partner"
            src="/assets/resources/08-why-partner.png"
            alt="Why Partner With Fitastic?"
          />
          <ResourcesSlide
            id="community"
            src="/assets/resources/09-community.png"
            alt="A Community Where Opportunities Move"
          />
          <ResourcesSlide
            id="crm"
            src="/assets/resources/10-crm.png"
            alt="The Strategic Core | CRM"
          />
          <ResourcesSlide
            id="cta"
            src="/assets/resources/11-cta.png"
            alt="Ready to Put Your Products in Front of the Right Audience?"
          />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
