import { Header } from "@/components/header";
import { ResourcesEcosystemSection } from "@/components/resources/resources-ecosystem-section";
import { ResourcesExpertiseSection } from "@/components/resources/resources-expertise-section";
import { ResourcesHeroSection } from "@/components/resources/resources-hero-section";
import { ResourcesIndexSection } from "@/components/resources/resources-index-section";
import { ResourcesMarketplaceSection } from "@/components/resources/resources-marketplace-section";
import { ResourcesPartnershipSection } from "@/components/resources/resources-partnership-section";
import { ResourcesSlide } from "@/components/resources/resources-slide";
import { ResourcesTwoWaysSection } from "@/components/resources/resources-two-ways-section";
import { ResourcesWhyPartnerSection } from "@/components/resources/resources-why-partner-section";
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
        <main className="resources-page bg-black">
          <ResourcesHeroSection />
          <ResourcesPartnershipSection />
          <ResourcesIndexSection />
          <ResourcesEcosystemSection />
          <ResourcesMarketplaceSection />
          <ResourcesTwoWaysSection />
          <ResourcesExpertiseSection />
          <ResourcesWhyPartnerSection />
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
