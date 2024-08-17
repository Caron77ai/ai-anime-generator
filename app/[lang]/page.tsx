import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Feature from "@/components/home/Feature";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import ScrollingLogos from "@/components/home/ScrollingLogos";
import SocialProof from "@/components/home/SocialProof";
import WallOfLove from "@/components/home/WallOfLove";
import { defaultLocale, getDictionary } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/session";
import Link from 'next/link';

export default async function LangHome({
  params: { lang },
}: {
  params: { lang: string };
}) {
  console.log("Rendering LangHome (HomePage)", { lang });

  // 简化语言处理逻辑
  const langName = lang !== "index" ? lang : defaultLocale;

  console.log("Determined langName:", langName);

  const dict = await getDictionary(langName);

  // 获取当前登录的用户信息
  const user = await getCurrentUser();

  return (
    <>
      {/* Header with User Info and Login/Logout Button */}
      <header>
        <nav>
          {user ? (
            <>
              <p>Welcome, {user.name || user.email}!</p>
              <Link href="/api/auth/signout">
                <button>Logout</button>
              </Link>
            </>
          ) : (
            <Link href="/api/auth/signin">
              <button>Login</button>
            </Link>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <Hero locale={dict.Hero} CTALocale={dict.CTAButton} />
      <SocialProof locale={dict.SocialProof} />
      {/* display technology stack, partners, project honors, etc. */}
      <ScrollingLogos />

      {/* USP (Unique Selling Proposition) */}
      <Feature id="Features" locale={dict.Feature} langName={langName} />

      {/* Pricing */}
      <Pricing id="Pricing" locale={dict.Pricing} langName={langName} />

      {/* Testimonials / Wall of Love */}
      <WallOfLove id="WallOfLove" locale={dict.WallOfLove} />

      {/* FAQ (Frequently Asked Questions) */}
      <FAQ id="FAQ" locale={dict.FAQ} langName={langName} />

      {/* CTA (Call to Action) */}
      <CTA locale={dict.CTA} CTALocale={dict.CTAButton} />
    </>
  );
}