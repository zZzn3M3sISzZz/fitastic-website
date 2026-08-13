import { FaqSection } from "@/components/faq-section";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <a
        href="#movement"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <div id="top">
        <Header />
        <main>
          <Hero />
          <FaqSection />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
