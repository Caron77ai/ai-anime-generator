import AnimeGenerator from "@/components/AnimeGenerator";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Feature from "@/components/home/Feature";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import ScrollingLogos from "@/components/home/ScrollingLogos";
import SocialProof from "@/components/home/SocialProof";
import WallOfLove from "@/components/home/WallOfLove";
import { defaultLocale, getDictionary } from "@/lib/i18n";

export default async function LangHome({
  params: { lang },
}: {
  params: { lang: string };
}) {
  // const langName = (lang && lang[0]) || defaultLocale;
  let langName =
    lang && lang[0] && lang[0] !== "index" ? lang[0] : defaultLocale;

  const dict = await getDictionary(langName);

  return (
    <>
      {/* Hero Section */}
      <Hero locale={dict.Hero} />

      {/* AnimeGenerator Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-slate-900 rounded-lg shadow-md my-6 border border-blue-50 dark:border-blue-900">
        <AnimeGenerator locale={dict.AnimeGenerator} />
      </section>

      {/* 减少SocialProof和其他组件之间的间距 */}
      <div className="py-4">
        <SocialProof locale={dict.SocialProof} />
      </div>

      {/* display technology stack, partners, project honors, etc. */}
      <div className="py-4">
        <ScrollingLogos />
      </div>

      {/* USP (Unique Selling Proposition) - 减少间距 */}
      <div className="py-4">
        <Feature id="Features" locale={dict.Feature} langName={langName} />
      </div>

      {/* Pricing - 减少间距 */}
      <div className="py-4">
        <Pricing id="Pricing" locale={dict.Pricing} langName={langName} />
      </div>

      {/* Testimonials / Wall of Love - 减少间距 */}
      <div className="py-4">
        <WallOfLove id="WallOfLove" locale={dict.WallOfLove} />
      </div>

      {/* FAQ (Frequently Asked Questions) - 减少间距 */}
      <div className="py-4">
        <FAQ id="FAQ" locale={dict.FAQ} langName={langName} />
      </div>

      {/* CTA (Call to Action) - 减少间距 */}
      <div className="py-4">
        <CTA locale={dict.CTA} />
      </div>
    </>
  );
}
