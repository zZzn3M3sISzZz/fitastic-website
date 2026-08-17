import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";

type LegalPageProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <>
      <Header />
      <main className="bg-canvas">
        <article className="mx-auto max-w-page px-gutter pb-20 pt-36">
          <h1 className="font-display text-[clamp(40px,6vw,64px)] uppercase leading-[1.1] text-lime-bright">
            {title}
          </h1>
          <p className="mt-4 text-base leading-[1.4] text-muted">
            Last updated: August 2026
          </p>
          <div className="mt-10 flex max-w-[720px] flex-col gap-10 text-base leading-[1.6] text-white">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-[clamp(22px,3vw,33px)] uppercase leading-[1.2] text-lime">
        {title}
      </h2>
      <div className="flex flex-col gap-4 [&_a]:text-lime-bright [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-opacity [&_a]:duration-tap [&_a]:hover:opacity-70 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
